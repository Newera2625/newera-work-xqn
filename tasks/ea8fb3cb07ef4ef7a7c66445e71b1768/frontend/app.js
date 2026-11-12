(() => {
  "use strict";

  const STORAGE = {
    session: "newera.sso.session",
    remembered: "newera.sso.rememberedAccount",
    failures: "newera.sso.passwordFailures",
    locks: "newera.sso.passwordLocks"
  };

  const DEFAULT_SESSION_SECONDS = 2 * 60 * 60;
  const DEFAULT_LOCK_SECONDS = 5 * 60;
  const DEFAULT_SMS_SECONDS = 60;
  const DEFAULT_QR_SECONDS = 3;
  const MAX_FAILURES = 5;
  const VALID_TABS = ["password", "sms", "qr"];
  const VALID_QR_STATES = ["waiting", "scanned", "confirmed"];
  const VALID_ERRORS = ["password", "account", "locked", "sms", "guard"];
  const VALID_SUCCESS_STATES = ["none", "true"];

  const query = new URLSearchParams(window.location.search);

  function readBoundedNumber(name, fallback, min, max) {
    const raw = query.get(name);
    if (raw === null || raw === "") {
      return fallback;
    }

    const value = Number(raw);
    if (!Number.isFinite(value)) {
      return fallback;
    }

    const integer = Math.floor(value);
    return Math.min(max, Math.max(min, integer));
  }

  function readEnum(name, allowed, fallback) {
    const value = query.get(name);
    return allowed.includes(value) ? value : fallback;
  }

  const testConfig = Object.freeze({
    sessionSeconds: readBoundedNumber("sessionSeconds", DEFAULT_SESSION_SECONDS, 1, 86400),
    lockSeconds: readBoundedNumber("lockSeconds", DEFAULT_LOCK_SECONDS, 1, 86400),
    smsSeconds: readBoundedNumber("smsSeconds", DEFAULT_SMS_SECONDS, 1, 3600),
    qrSeconds: readBoundedNumber("qrSeconds", DEFAULT_QR_SECONDS, 1, 3600),
    tab: readEnum("tab", VALID_TABS, "password"),
    qrState: readEnum("qrState", VALID_QR_STATES, "waiting"),
    error: readEnum("error", VALID_ERRORS, "none"),
    smsCountdown: readBoundedNumber("smsCountdown", 0, 0, 3600),
    success: readEnum("success", VALID_SUCCESS_STATES, "none") === "true",
    expired: query.get("expired") === "true"
  });

  function delay(minimum = 300, maximum = 800) {
    const duration = Math.max(minimum, Math.min(maximum, Math.floor(Math.random() * (maximum - minimum + 1)) + minimum));
    return new Promise((resolve) => window.setTimeout(resolve, duration));
  }

  function safeJsonParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function readStorageObject(key) {
    return safeJsonParse(window.localStorage.getItem(key), {});
  }

  function writeStorageObject(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function removeStorageItems(keys) {
    keys.forEach((key) => window.localStorage.removeItem(key));
  }

  function normalizeAccount(value) {
    return String(value || "").trim().toLowerCase();
  }

  function isValidAccount(value) {
    const account = value.trim();
    return /^[A-Za-z0-9._-]{3,32}$/.test(account) ||
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(account);
  }

  function isValidPhone(value) {
    return /^1[3-9]\d{9}$/.test(value);
  }

  function isValidPassword(value) {
    return value.length >= 6;
  }

  function isValidSmsCode(value) {
    return /^\d{6}$/.test(value);
  }

  function createToken() {
    const random = window.crypto && typeof window.crypto.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `demo_${random}`;
  }

  function getUserFromAccount(account) {
    const normalized = account.trim();
    if (normalized.includes("@")) {
      const name = normalized.split("@")[0];
      return {
        id: `user_${normalized}`,
        name: name || "企业用户",
        account: normalized,
        role: "workspace-member"
      };
    }

    return {
      id: `user_${normalized.toLowerCase()}`,
      name: normalized,
      account: normalized,
      role: "workspace-member"
    };
  }

  const authService = {
    async loginWithPassword(account, password) {
      await delay();

      const normalized = normalizeAccount(account);
      const failures = readStorageObject(STORAGE.failures);
      const locks = readStorageObject(STORAGE.locks);
      const lock = locks[normalized];
      const now = Date.now();

      if (lock && lock.expiresAt > now) {
        const error = new Error("账号已锁定");
        error.code = "ACCOUNT_LOCKED";
        error.expiresAt = lock.expiresAt;
        throw error;
      }

      if (lock && lock.expiresAt <= now) {
        delete locks[normalized];
        delete failures[normalized];
        writeStorageObject(STORAGE.locks, locks);
        writeStorageObject(STORAGE.failures, failures);
      }

      if (password === "wrong") {
        const count = (failures[normalized] || 0) + 1;
        failures[normalized] = count;
        writeStorageObject(STORAGE.failures, failures);

        if (count >= MAX_FAILURES) {
          locks[normalized] = {
            lockedAt: now,
            expiresAt: now + testConfig.lockSeconds * 1000
          };
          writeStorageObject(STORAGE.locks, locks);
          const error = new Error("账号已锁定");
          error.code = "ACCOUNT_LOCKED";
          error.expiresAt = locks[normalized].expiresAt;
          throw error;
        }

        const error = new Error("密码错误");
        error.code = "INVALID_PASSWORD";
        error.remaining = MAX_FAILURES - count;
        throw error;
      }

      if (password === "locked") {
        locks[normalized] = {
          lockedAt: now,
          expiresAt: now + testConfig.lockSeconds * 1000
        };
        writeStorageObject(STORAGE.locks, locks);
        const error = new Error("账号已锁定");
        error.code = "ACCOUNT_LOCKED";
        error.expiresAt = locks[normalized].expiresAt;
        throw error;
      }

      if (normalized === "unknown" || password === "unknown") {
        const error = new Error("账号不存在");
        error.code = "ACCOUNT_NOT_FOUND";
        throw error;
      }

      delete failures[normalized];
      delete locks[normalized];
      writeStorageObject(STORAGE.failures, failures);
      writeStorageObject(STORAGE.locks, locks);

      return getUserFromAccount(account);
    },

    async sendSmsCode(phone) {
      await delay(250, 550);

      if (!isValidPhone(phone)) {
        const error = new Error("请输入有效的 11 位手机号");
        error.code = "INVALID_PHONE";
        throw error;
      }

      return {
        phone,
        code: "123456",
        expiresAt: Date.now() + testConfig.smsSeconds * 1000
      };
    },

    async loginWithSms(phone, code) {
      await delay();

      if (!isValidPhone(phone)) {
        const error = new Error("请输入有效的 11 位手机号");
        error.code = "INVALID_PHONE";
        throw error;
      }

      if (!isValidSmsCode(code)) {
        const error = new Error("验证码错误或已过期");
        error.code = "INVALID_SMS_CODE";
        throw error;
      }

      if (code !== "123456") {
        const error = new Error("验证码错误或已过期");
        error.code = "INVALID_SMS_CODE";
        throw error;
      }

      return {
        id: `user_sms_${phone}`,
        name: `用户${phone.slice(-4)}`,
        account: phone,
        role: "workspace-member"
      };
    },

    async confirmQrLogin() {
      await delay();
      return {
        id: "user_qr_demo",
        name: "扫码用户",
        account: "qr-demo",
        role: "workspace-member"
      };
    }
  };

  const sessionService = {
    create(user, durationSeconds = testConfig.sessionSeconds) {
      const now = Date.now();
      const session = {
        token: createToken(),
        user,
        issuedAt: now,
        expiresAt: now + durationSeconds * 1000
      };
      writeStorageObject(STORAGE.session, session);
      return session;
    },

    get() {
      const session = readStorageObject(STORAGE.session);
      if (!session || !session.token || !session.user || !session.expiresAt) {
        return null;
      }
      return session;
    },

    isValid() {
      const session = this.get();
      return Boolean(session && session.expiresAt > Date.now());
    },

    clear() {
      window.localStorage.removeItem(STORAGE.session);
    },

    getRemainingSeconds() {
      const session = this.get();
      if (!session) {
        return 0;
      }
      return Math.max(0, Math.ceil((session.expiresAt - Date.now()) / 1000));
    }
  };

  function getElement(id) {
    return document.getElementById(id);
  }

  function showTopNotice(message, type = "info") {
    const notice = getElement("topNotice");
    const text = getElement("topNoticeText");
    if (!notice || !text) {
      return;
    }

    notice.classList.remove("is-success", "is-error");
    if (type === "success") {
      notice.classList.add("is-success");
    } else if (type === "error") {
      notice.classList.add("is-error");
    }
    text.textContent = message;
    notice.hidden = false;
  }

  function hideTopNotice() {
    const notice = getElement("topNotice");
    if (notice) {
      notice.hidden = true;
    }
  }

  function setFieldError(inputId, errorId, shellId, message) {
    const input = getElement(inputId);
    const error = getElement(errorId);
    const shell = getElement(shellId);
    if (!input || !error || !shell) {
      return;
    }

    error.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
    shell.classList.toggle("has-error", Boolean(message));
  }

  function clearFieldErrors() {
    [
      ["account", "accountError", "accountShell"],
      ["password", "passwordError", "passwordShell"],
      ["phone", "phoneError", "phoneShell"],
      ["smsCode", "smsCodeError", "smsCodeShell"]
    ].forEach(([inputId, errorId, shellId]) => {
      setFieldError(inputId, errorId, shellId, "");
    });

    const agreementError = getElement("agreementError");
    if (agreementError) {
      agreementError.textContent = "";
    }
  }

  function setButtonLoading(button, loading, loadingText = "处理中") {
    if (!button) {
      return;
    }
    button.disabled = loading;
    button.classList.toggle("is-loading", loading);
    const label = button.querySelector(".button-label");
    if (label) {
      label.textContent = loading ? loadingText : button.dataset.idleLabel || label.textContent;
    }
  }

  function getRedirectTarget() {
    const redirect = query.get("redirect");
    if (!redirect) {
      return "app.html";
    }

    try {
      const decoded = decodeURIComponent(redirect);
      const url = new URL(decoded, window.location.href);
      const allowed = new Set(["app.html", "401.html", "403.html", "404.html"]);
      const fileName = url.pathname.split("/").pop();
      return allowed.has(fileName) ? fileName : "app.html";
    } catch (error) {
      return "app.html";
    }
  }

  function rememberAccount(account, shouldRemember) {
    if (shouldRemember) {
      window.localStorage.setItem(STORAGE.remembered, account);
    } else {
      window.localStorage.removeItem(STORAGE.remembered);
    }
  }

  function setActiveTab(tabName) {
    const panels = {
      password: getElement("passwordPanel"),
      sms: getElement("smsPanel"),
      qr: getElement("qrPanel")
    };

    const tabs = {
      password: getElement("passwordTab"),
      sms: getElement("smsTab"),
      qr: getElement("qrTab")
    };

    Object.keys(panels).forEach((key) => {
      const active = key === tabName;
      if (panels[key]) {
        panels[key].hidden = !active;
      }
      if (tabs[key]) {
        tabs[key].classList.toggle("is-active", active);
        tabs[key].setAttribute("aria-selected", active ? "true" : "false");
        tabs[key].tabIndex = active ? 0 : -1;
      }
    });

    const indicator = getElement("tabIndicator");
    if (indicator) {
      const index = VALID_TABS.indexOf(tabName);
      indicator.style.transform = `translateX(${index * 100}%)`;
    }

    clearFieldErrors();
    hideTopNotice();
  }

  function validateAccount() {
    const account = getElement("account");
    if (!account || !account.value.trim()) {
      setFieldError("account", "accountError", "accountShell", "请输入账号");
      return false;
    }
    if (!isValidAccount(account.value)) {
      setFieldError("account", "accountError", "accountShell", "请输入有效的邮箱或用户名");
      return false;
    }
    setFieldError("account", "accountError", "accountShell", "");
    return true;
  }

  function validatePassword() {
    const password = getElement("password");
    if (!password || !password.value) {
      setFieldError("password", "passwordError", "passwordShell", "请输入密码");
      return false;
    }
    if (!isValidPassword(password.value)) {
      setFieldError("password", "passwordError", "passwordShell", "密码至少 6 位");
      return false;
    }
    setFieldError("password", "passwordError", "passwordShell", "");
    return true;
  }

  function validatePhone() {
    const phone = getElement("phone");
    if (!phone || !phone.value.trim()) {
      setFieldError("phone", "phoneError", "phoneShell", "请输入手机号");
      return false;
    }
    if (!isValidPhone(phone.value.trim())) {
      setFieldError("phone", "phoneError", "phoneShell", "请输入有效的 11 位手机号");
      return false;
    }
    setFieldError("phone", "phoneError", "phoneShell", "");
    return true;
  }

  function validateSmsCode() {
    const code = getElement("smsCode");
    if (!code || !code.value.trim()) {
      setFieldError("smsCode", "smsCodeError", "smsCodeShell", "请输入验证码");
      return false;
    }
    if (!isValidSmsCode(code.value.trim())) {
      setFieldError("smsCode", "smsCodeError", "smsCodeShell", "验证码必须为 6 位数字");
      return false;
    }
    setFieldError("smsCode", "smsCodeError", "smsCodeShell", "");
    return true;
  }

  function validateAgreement() {
    const agreement = getElement("agreement");
    const error = getElement("agreementError");
    if (!agreement || !error) {
      return false;
    }
    if (!agreement.checked) {
      error.textContent = "请先阅读并同意服务条款与隐私政策";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function applyPasswordError(error) {
    const password = getElement("password");
    const passwordShell = getElement("passwordShell");
    const passwordError = getElement("passwordError");
    const account = getElement("account");

    if (error.code === "ACCOUNT_NOT_FOUND") {
      setFieldError("account", "accountError", "accountShell", "账号不存在");
      showTopNotice("账号不存在，请检查后重试", "error");
    } else if (error.code === "ACCOUNT_LOCKED") {
      const remaining = Math.max(0, Math.ceil((error.expiresAt - Date.now()) / 1000));
      setFieldError("account", "accountError", "accountShell", `账号已锁定，${formatDuration(remaining)}后可重试`);
      showTopNotice("账号已锁定，请稍后再试", "error");
    } else {
      const remaining = error.remaining !== undefined ? `还可尝试 ${error.remaining} 次` : "请检查密码后重试";
      setFieldError("password", "passwordError", "passwordShell", error.message || "密码错误");
      showTopNotice(error.message || "密码错误", "error");
    }

    if (password) {
      password.value = "";
      password.focus();
    }
    if (passwordShell) {
      passwordShell.classList.add("has-error");
    }
    if (passwordError) {
      passwordError.textContent = error.code === "ACCOUNT_LOCKED" ? "账号当前处于锁定状态" : (error.message || "密码错误");
    }
    if (account && error.code === "ACCOUNT_NOT_FOUND") {
      account.focus();
    }
  }

  function formatDuration(totalSeconds) {
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    if (minutes <= 0) {
      return `${remainder} 秒`;
    }
    return `${minutes} 分 ${remainder} 秒`;
  }

  function setSmsCountdown(seconds) {
    const button = getElement("sendCode");
    if (!button) {
      return;
    }
    if (seconds > 0) {
      button.disabled = trueif (seconds > 0) {
      button.disabled = true;
      button.textContent = `${seconds} 秒后重试`;
      button.setAttribute("aria-disabled", "true");
    } else {
      button.disabled = false;
      button.textContent = "获取验证码";
      button.removeAttribute("aria-disabled");
    }
  }

  function resetCountdown() {
    if (countdownTimer) {
      window.clearInterval(countdownTimer);
      countdownTimer = null;
    }
    setSmsCountdown(0);
  }

  function startSmsCountdown(seconds) {
    resetCountdown();
    let remaining = Math.max(1, Number(seconds) || 60);
    setSmsCountdown(remaining);
    countdownTimer = window.setInterval(() => {
      remaining -= 1;
      setSmsCountdown(remaining);
    }, 1000);
  }

  function setLoading(button, loading, loadingText) {
    if (!button) {
      return;
    }
    if (loading) {
      button.dataset.originalText = button.textContent;
      button.textContent = loadingText || "处理中";
      button.disabled = true;
      button.classList.add("is-loading");
      button.setAttribute("aria-busy", "true");
    } else {
      button.textContent = button.dataset.originalText || button.textContent;
      button.disabled = false;
      button.classList.remove("is-loading");
      button.removeAttribute("aria-busy");
    }
  }

  function getPasswordStrength(password) {
    const value = password || "";
    let score = 0;

    if (value.length >= 8) {
      score += 1;
    }
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
      score += 1;
    }
    if (/\d/.test(value)) {
      score += 1;
    }
    if (/[^A-Za-z0-9]/.test(value)) {
      score += 1;
    }

    return Math.min(score, 4);
  }

  function updatePasswordStrength() {
    const password = getElement("password");
    const strength = getElement("passwordStrength");
    const strengthText = getElement("passwordStrengthText");
    const strengthItems = document.querySelectorAll("[data-strength-item]");

    if (!password || !strength || !strengthText) {
      return;
    }

    const value = password.value;
    const score = getPasswordStrength(value);

    strength.dataset.level = String(score);
    strengthText.textContent = value ? getStrengthLabel(score) : "建议包含字母、数字与符号";
    strengthItems.forEach((item) => {
      const itemLevel = Number(item.dataset.strengthItem);
      item.classList.toggle("is-active", score >= itemLevel && itemLevel <= score);
    });
  }

  function getStrengthLabel(score) {
    if (score <= 1) {
      return "密码强度较弱";
    }
    if (score === 2) {
      return "密码强度一般";
    }
    if (score === 3) {
      return "密码强度较强";
    }
    return "密码强度很强";
  }

  function togglePasswordVisibility(button) {
    const targetId = button.dataset.passwordTarget;
    const input = targetId ? getElement(targetId) : null;
    const eyeIcon = button.querySelector("[data-eye-icon]");
    const eyeOffIcon = button.querySelector("[data-eye-off-icon]");
    const text = button.querySelector("[data-password-text]");

    if (!input) {
      return;
    }

    const isVisible = input.type === "text";
    input.type = isVisible ? "password" : "text";
    input.setAttribute("aria-label", isVisible ? "显示密码" : "隐藏密码");
    button.setAttribute("aria-label", isVisible ? "显示密码" : "隐藏密码");
    button.setAttribute("aria-pressed", String(!isVisible));

    if (eyeIcon && eyeOffIcon) {
      eyeIcon.hidden = !isVisible;
      eyeOffIcon.hidden = isVisible;
    }
    if (text) {
      text.textContent = isVisible ? "显示密码" : "隐藏密码";
    }
  }

  function getElement(id) {
    return document.getElementById(id);
  }

  async function submitLogin(event) {
    event.preventDefault();

    const accountValid = validateAccount();
    const passwordValid = validatePassword();
    const smsCodeValid = validateSmsCode();
    const agreementValid = validateAgreement();

    if (!accountValid || !passwordValid || !smsCodeValid || !agreementValid) {
      const firstInvalid = document.querySelector(".has-error");
      if (firstInvalid) {
        const focusTarget = firstInvalid.querySelector("input");
        if (focusTarget) {
          focusTarget.focus();
        }
      }
      return;
    }

    const submitButton = getElement("submitButton");
    const account = getElement("account");
    const password = getElement("password");
    const smsCode = getElement("smsCode");

    setLoading(submitButton, true, "正在登录");

    try {
      await login({
        account: account.value.trim(),
        password: password.value,
        smsCode: smsCode.value.trim(),
        rememberMe: getElement("rememberMe")?.checked || false
      });
    } catch (error) {
      applyPasswordError(error);
    } finally {
      setLoading(submitButton, false);
    }
  }

  async function sendSmsCode() {
    const account = getElement("account");
    const sendButton = getElement("sendCode");

    if (!account) {
      return;
    }

    if (!validateAccount()) {
      account.focus();
      return;
    }

    setLoading(sendButton, true, "发送中");

    try {
      const response = await requestSmsCode(account.value.trim());
      startSmsCountdown(response.countdown || 60);
      showTopNotice("验证码已发送，请注意查收", "success");
    } catch (error) {
      showTopNotice(error.message || "验证码发送失败，请稍后重试", "error");
    } finally {
      if (sendButton.disabled === false) {
        setLoading(sendButton, false);
      }
    }
  }

  function showTopNotice(message, type) {
    const notice = getElement("topNotice");
    if (!notice) {
      return;
    }

    notice.textContent = message;
    notice.className = `top-notice is-visible is-${type === "success" ? "success" : "error"}`;
    notice.setAttribute("role", type === "success" ? "status" : "alert");

    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => {
      notice.className = "top-notice";
    }, 4000);
  }

  function setFieldError(inputId, errorId, shellId, message) {
    const input = getElement(inputId);
    const error = getElement(errorId);
    const shell = getElement(shellId);

    if (shell) {
      shell.classList.toggle("has-error", Boolean(message));
    }

    if (error) {
      error.textContent = message || "";
    }

    if (input) {
      input.setAttribute("aria-invalid", String(Boolean(message)));
    }
  }

  function validateAccount() {
    const account = getElement("account");
    if (!account) {
      return false;
    }

    const value = account.value.trim();
    if (!value) {
      setFieldError("account", "accountError", "accountShell", "请输入账号");
      return false;
    }

    if (value.length < 4 || value.length > 32) {
      setFieldError("account", "accountError", "accountShell", "账号长度应为 4 至 32 个字符");
      return false;
    }

    if (!/^[A-Za-z0-9_.@-]+$/.test(value)) {
      setFieldError("account", "accountError", "accountShell", "账号仅支持字母、数字及 _ . @ -");
      return false;
    }

    setFieldError("account", "accountError", "accountShell", "");
    return true;
  }

  function validatePassword() {
    const password = getElement("password");
    if (!password) {
      return false;
    }

    if (!password.value) {
      setFieldError("password", "passwordError", "passwordShell", "请输入密码");
      return false;
    }

    if (password.value.length < 8) {
      setFieldError("password", "passwordError", "passwordShell", "密码至少需要 8 个字符");
      return false;
    }

    if (!/[A-Za-z]/.test(password.value) || !/\d/.test(password.value)) {
      setFieldError("password", "passwordError", "passwordShell", "密码需同时包含字母和数字");
      return false;
    }

    setFieldError("password", "passwordError", "passwordShell", "");
    return true;
  }

  function validateSmsCode() {
    const code = getElement("smsCode");
    if (!code) {
      return false;
    }

    if (!code.value.trim()) {
      setFieldError("smsCode", "smsCodeError", "smsCodeShell", "请输入验证码");
      return false;
    }

    if (!isValidSmsCode(code.value.trim())) {
      setFieldError("smsCode", "smsCodeError", "smsCodeShell", "验证码必须为 6 位数字");
      return false;
    }

    setFieldError("smsCode", "smsCodeError", "smsCodeShell", "");
    return true;
  }

  function validateAgreement() {
    const agreement = getElement("agreement");
    const error = getElement("agreementError");
    if (!agreement || !error) {
      return false;
    }

    if (!agreement.checked) {
      error.textContent = "请先阅读并同意服务条款与隐私政策";
      return false;
    }

    error.textContent = "";
    return true;
  }

  function applyPasswordError(error) {
    const password = getElement("password");
    const passwordShell = getElement("passwordShell");
    const passwordError = getElement("passwordError");
    const account = getElement("account");

    if (error.code === "ACCOUNT_NOT_FOUND") {
      setFieldError("account", "accountError", "accountShell", "账号不存在");
      showTopNotice("账号不存在，请检查后重试", "error");
    } else if (error.code === "ACCOUNT_LOCKED") {
      const remaining = Math.max(0, Math.ceil((error.expiresAt - Date.now()) / 1000));
      setFieldError("account", "accountError", "accountShell", `账号已锁定，${formatDuration(remaining)}后可重试`);
      showTopNotice("账号已锁定，请稍后再试", "error");
    } else {
      const remaining = error.remaining !== undefined ? `还可尝试 ${error.remaining} 次` : "请检查密码后重试";
      setFieldError("password", "passwordError", "passwordShell", error.message || "密码错误");
      showTopNotice(error.message || "密码错误", "error");
    }

    if (password) {
      password.value = "";
      password.focus();
    }
    if (passwordShell) {
      passwordShell.classList.add("has-error");
    }
    if (passwordError) {
      passwordError.textContent = error.code === "ACCOUNT_LOCKED" ? "账号当前处于锁定状态" : (error.message || "密码错误");
    }
    if (account && error.code === "ACCOUNT_NOT_FOUND") {
      account.focus();
    }
  }

  function formatDuration(totalSeconds) {
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    if (minutes <= 0) {
      return `${remainder} 秒`;
    }
    return `${minutes} 分 ${remainder} 秒`;
  }

  function setSmsCountdown(seconds) {
    const button = getElement("sendCode");
    if (!button) {
      return;
    }
    if (seconds > 0) {
      button.disabled = true;
      button.textContent = `${seconds} 秒后重试`;
      button.setAttribute("aria-disabled", "true");
    } else {
      button.disabled = false;
      button.textContent = "获取验证码";
      button.removeAttribute("aria-disabled");
    }
  }

  function resetCountdown() {
    if (countdownTimer) {
      window.clearInterval(countdownTimer);
      countdownTimer = null;
    }
    setSmsCountdown(0);
  }

  function startSmsCountdown(seconds) {
    resetCountdown();
    let remaining = Math.max(1, Number(seconds) || 60);
    setSmsCountdown(remaining);
    countdownTimer = window.setInterval(() => {
      remaining -= 1;
      setSmsCountdown(remaining);
    }, 1000);
  }

  function setLoading(button, loading, loadingText) {
    if (!button) {
      return;
    }
    if (loading) {
      button.dataset.originalText = button.textContent;
      button.textContent = loadingText || "处理中";
      button.disabled = true;
      button.classList.add("is-loading");
      button.setAttribute("aria-busy", "true");
    } else {
      button.textContent = button.dataset.originalText || button.textContent;
      button.disabled = false;
      button.classList.remove("is-loading");
      button.removeAttribute("aria-busy");
    }
  }

  function getPasswordStrength(password) {
    const value = password || "";
    let score = 0;

    if (value.length >= 8) {
      score += 1;
    }
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
      score += 1;
    }
    if (/\d/.test(value)) {
      score += 1;
    }
    if (/[^A-Za-z0-9]/.test(value)) {
      score += 1;
    }

    return Math.min(score, 4);
  }

  function updatePasswordStrength() {
    const password = getElement("password");
    const strength = getElement("passwordStrength");
    const strengthText = getElement("passwordStrengthText");
    const strengthItems = document.querySelectorAll("[data-strength-item]");

    if (!password || !strength || !strengthText) {
      return;
    }

    const value = password.value;
    const score = getPasswordStrength(value);

    strength.dataset.level = String(score);
    strengthText.textContent = value ? getStrengthLabel(score) : "建议包含字母、数字与符号";
    strengthItems.forEach((item) => {
      const itemLevel = Number(item.dataset.strengthItem);
      item.classList.toggle("is-active", score >= itemLevel && itemLevel <= score);
    });
  }

  function getStrengthLabel(score) {
    if (score <= 1) {
      return "密码强度较弱";
    }
    if (score === 2) {
      return "密码强度一般";
    }
    if (score === 3) {
      return "密码强度较强";
    }
    return "密码强度很强";
  }

  function togglePasswordVisibility(button) {
    const targetId = button.dataset.passwordTarget;
    const input = targetId ? getElement(targetId) : null;
    const eyeIcon = button.querySelector("[data-eye-icon]");
    const eyeOffIcon = button.querySelector("[data-eye-off-icon]");
    const text = button.querySelector("[data-password-text]");

    if (!input) {
      return;
    }

    const isVisible = input.type === "text";
    input.type = isVisible ? "password" : "text";
    input.setAttribute("aria-label", isVisible ? "显示密码" : "隐藏密码");
    button.setAttribute("aria-label", isVisible ? "显示密码" : "隐藏密码");
    button.setAttribute("aria-pressed", String(!isVisible));

    if (eyeIcon && eyeOffIcon) {
      eyeIcon.hidden = !isVisible;
      eyeOffIcon.hidden = isVisible;
    }
    if (text) {
      text.textContent = isVisible ? "显示密码" : "隐藏密码";
    }
  }

  function getElement(id) {
    return document.getElementById(id);
  }

  async function submitLogin(event) {
    event.preventDefault();

    const accountValid = validateAccount();
    const passwordValid = validatePassword();
    const smsCodeValid = validateSmsCode();
    const agreementValid = validateAgreement();

    if (!accountValid || !passwordValid || !smsCodeValid || !agreementValid) {
      const firstInvalid = document.querySelector(".has-error");
      if (firstInvalid) {
        const focusTarget = firstInvalid.querySelector("input");
        if (focusTarget) {
          focusTarget.focus();
        }
      }
      return;
    }

    const submitButton = getElement("submitButton");
    const account = getElement("account");
    const password = getElement("password");
    const smsCode = getElement("smsCode");

    setLoading(submitButton, true, "正在登录");

    try {
      await login({
        account: account.value.trim(),
        password: password.value,
        smsCode: smsCode.value.trim(),
        rememberMe: getElement("rememberMe")?.checked || false
      });
    } catch (error) {
      applyPasswordError(error);
    } finally {
      setLoading(submitButton, false);
    }
  }

  async function sendSmsCode() {
    const account = getElement("account");
    const sendButton = getElement("sendCode");

    if (!account) {
      return;
    }

    if (!validateAccount()) {
      account.focus();
      return;
    }

    setLoading(sendButton, true, "发送中");

    try {
      const response = await requestSmsCode(account.value.trim());
      startSmsCountdown(response.countdown || 60);
      showTopNotice("验证码已发送，请注意查收", "success");
    } catch (error) {
      showTopNotice(error.message || "验证码发送失败，请稍后重试", "error");
    } finally {
      if (sendButton.disabled === false) {
        setLoading(sendButton, false);
      }
    }
  }

  function showTopNotice(message, type) {
    const notice = getElement("topNotice");
    if (!notice) {
      return;
    }

    notice.textContent = message;
    notice.className = `top-notice is-visible is-${type === "success" ? "success" : "error"}`;
    notice.setAttribute("role", type === "success" ? "status" : "alert");

    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => {
      notice.className = "top-notice";
    }, 4000);
  }

  function setFieldError(inputId, errorId, shellId, message) {
    const input = getElement(inputId);
    const error = getElement(errorId);
    const shell = getElement(shellId);

    if (shell) {
      shell.classList.toggle("has-error", Boolean(message));
    }

    if (error) {
      error.textContent = message || "";
    }

    if (input) {
      input.setAttribute("aria-invalid", String(Boolean(message)));
    }
  }
})();
