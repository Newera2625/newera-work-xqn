(() => {
  "use strict";

  const STORAGE = {
    session: "newera.sso.session",
    remembered: "newera.sso.rememberedAccount",
    failures: "newera.sso.passwordFailures",
    locks: "newera.sso.passwordLocks"
  };

  const DEFAULT_SESSION_DURATION = 2 * 60 * 60 * 1000;
  const LOCK_DURATION = 5 * 60 * 1000;
  const SMS_COUNTDOWN_DURATION = 60;
  const QR_CONFIRM_DELAY = 3000;

  const ERROR_MESSAGES = {
    ACCOUNT_NOT_FOUND: "账号不存在，请检查后重试",
    INVALID_PASSWORD: "密码错误，请重新输入",
    ACCOUNT_LOCKED: "账号已锁定，请稍后再试",
    INVALID_SMS_CODE: "验证码错误或已过期",
    INVALID_PHONE: "手机号格式不正确",
    NETWORK_ERROR: "服务暂时不可用，请稍后重试"
  };

  const page = document.body.dataset.page;
  const byId = (id) => document.getElementById(id);

  const sleep = (milliseconds) => new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });

  function safeParse(value, fallback) {
    try {
      return JSON.parse(value) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function getJson(key, fallback) {
    return safeParse(localStorage.getItem(key), fallback);
  }

  function setJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function createToken() {
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      const values = new Uint8Array(24);
      window.crypto.getRandomValues(values);
      return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
    }

    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  }

  function getRequestedSessionDuration() {
    const params = new URLSearchParams(window.location.search);
    const requested = Number(params.get("session"));
    const stored = Number(localStorage.getItem("newera.sso.sessionDuration"));

    if (Number.isFinite(requested) && requested > 0) {
      const duration = Math.max(10, requested) * 1000;
      localStorage.setItem("newera.sso.sessionDuration", String(duration));
      return duration;
    }

    if (Number.isFinite(stored) && stored > 0) {
      return stored;
    }

    return DEFAULT_SESSION_DURATION;
  }

  function createSession(user, duration = getRequestedSessionDuration()) {
    const issuedAt = Date.now();
    return {
      token: createToken(),
      user,
      issuedAt,
      expiresAt: issuedAt + duration
    };
  }

  function getSession() {
    return getJson(STORAGE.session, null);
  }

  function isSessionValid(session = getSession()) {
    return Boolean(
      session &&
      session.token &&
      session.user &&
      typeof session.expiresAt === "number" &&
      session.expiresAt > Date.now()
    );
  }

  function saveSession(user, duration = getRequestedSessionDuration()) {
    const session = createSession(user, duration);
    setJson(STORAGE.session, session);
    return session;
  }

  function clearSession() {
    localStorage.removeItem(STORAGE.session);
  }

  function normalizeAccount(account) {
    return String(account || "").trim().toLowerCase();
  }

  function getRedirectTarget(defaultTarget = "app.html") {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    return redirect && redirect.trim() ? redirect.trim() : defaultTarget;
  }

  function isSafeRedirect(target) {
    if (!target) {
      return false;
    }

    if (/^https?:\/\//i.test(target) || /^javascript:/i.test(target)) {
      return false;
    }

    return target.startsWith("app.html") || target.startsWith("403.html") || target.startsWith("404.html");
  }

  function redirectToLogin(redirect = "app.html") {
    const currentUrl = new URL(window.location.href);
    const currentFile = currentUrl.pathname.split("/").pop() || "app.html";
    const target = currentFile === "index.html" ? redirect : `${currentFile}${currentUrl.search}`;
    const loginUrl = new URL("index.html", currentUrl.href);
    loginUrl.searchParams.set("redirect", target);
    window.location.replace(loginUrl.href);
  }

  function redirectAfterLogin() {
    const target = getRedirectTarget("app.html");
    window.location.assign(isSafeRedirect(target) ? target : "app.html");
  }

  function getFailureRecord(account) {
    const records = getJson(STORAGE.failures, {});
    return records[account] || { count: 0, updatedAt: 0 };
  }

  function setFailureRecord(account, record) {
    const records = getJson(STORAGE.failures, {});
    records[account] = record;
    setJson(STORAGE.failures, records);
  }

  function clearFailureRecord(account) {
    const records = getJson(STORAGE.failures, {});
    delete records[account];
    setJson(STORAGE.failures, records);
  }

  function getLockRecord(account) {
    const records = getJson(STORAGE.locks, {});
    return records[account] || null;
  }

  function setLockRecord(account, lockedUntil) {
    const records = getJson(STORAGE.locks, {});
    records[account] = { lockedUntil };
    setJson(STORAGE.locks, records);
  }

  function clearLockRecord(account) {
    const records = getJson(STORAGE.locks, {});
    delete records[account];
    setJson(STORAGE.locks, records);
  }

  function getRemainingLockSeconds(account) {
    const lock = getLockRecord(account);
    if (!lock || !lock.lockedUntil) {
      return 0;
    }

    const remaining = Math.ceil((lock.lockedUntil - Date.now()) / 1000);
    if (remaining <= 0) {
      clearLockRecord(account);
      clearFailureRecord(account);
      return 0;
    }

    return remaining;
  }

  const authService = {
    async loginWithPassword(account, password) {
      await sleep(500 + Math.floor(Math.random() * 301));
      const normalized = normalizeAccount(account);

      if (getRemainingLockSeconds(normalized) > 0) {
        throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
      }

      if (normalized === "locked" || normalized === "locked@newera.cn") {
        throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
      }

      if (normalized === "missing" || normalized === "missing@newera.cn") {
        throw new Error(ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      if (password !== "newera2026") {
        const failure = getFailureRecord(normalized);
        const count = failure.count + 1;
        const updatedAt = Date.now();

        if (count >= 5) {
          setFailureRecord(normalized, { count: 0, updatedAt });
          setLockRecord(normalized, Date.now() + LOCK_DURATION);
          throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
        }

        setFailureRecord(normalized, { count, updatedAt });
        throw new Error(ERROR_MESSAGES.INVALID_PASSWORD);
      }

      clearFailureRecord(normalized);
      clearLockRecord(normalized);

      const name = normalized.includes("@")
        ? normalized.split("@")[0]
        : normalized;

      return saveSession({
        id: normalized,
        name: name || "企业用户",
        role: "企业成员"
      });
    },

    async sendSmsCode(phone) {
      await sleep(450);

      if (!/^1\d{10}$/.test(phone)) {
        throw new Error(ERROR_MESSAGES.INVALID_PHONE);
      }

      return {
        sent: true,
        expiresIn: 300,
        demoCode: "123456"
      };
    },

    async loginWithSms(phone, code) {
      await sleep(450 + Math.floor(Math.random() * 201));

      if (!/^1\d{10}$/.test(phone)) {
        throw new Error(ERROR_MESSAGES.INVALID_PHONE);
      }

      if (code !== "123456") {
        throw new Error(ERROR_MESSAGES.INVALID_SMS_CODE);
      }

      return saveSession({
        id: phone,
        name: `企业用户${phone.slice(-4)}`,
        role: "企业成员"
      });
    },

    async confirmQrLogin() {
      await sleep(500);
      return saveSession({
        id: "qr-user@newera.cn",
        name: "扫码用户",
        role: "企业成员"
      });
    }
  };

  function initializeLoginPage() {
    const topNotice = byId("topNotice");
    const topNoticeText = byId("topNoticeText");
    const noticeClose = byId("noticeClose");
    const tabs = {
      password: byId("passwordTab"),
      sms: byId("smsTab"),
      qr: byId("qrTab")
    };
    const panels = {
      password: byId("passwordPanel"),
      sms: byId("smsPanel"),
      qr: byId("qrPanel")
    };
    const tabIndicator = byId("tabIndicator");
    const accountInput = byId("account");
    const passwordInput = byId("password");
    const phoneInput = byId("phone");
    const smsCodeInput = byId("smsCode");
    const agreement = byId("agreement");
    const passwordForm = byId("passwordForm");
    const smsForm = byId("smsForm");
    const passwordSubmit = byId("passwordSubmit");
    const smsSubmit = byId("smsSubmit");
    const sendCode = byId("sendCode");
    const qrSubmit = byId("qrSubmit");
    const qrStatus = byId("qrStatus");
    const qrStatusTitle = byId("qrStatusTitle");
    const qrStatusText = byId("qrStatusText");

    let activeTab = "password";
    let codeCountdownTimer = null;
    let qrTimer = null;
    let qrReady = false;

    const redirectTarget = getRedirectTarget("app.html");

    function showTopNotice(message, type = "info") {
      topNoticeText.textContent = message;
      topNotice.classList.remove("is-success", "is-error");
      if (type === "success") {
        topNotice.classList.add("is-success");
      } else if (type === "error") {
        topNotice.classList.add("is-error");
      }
      topNotice.hidden = false;
    }

    if (new URLSearchParams(window.location.search).has("redirect")) {
      showTopNotice(`登录后将继续访问：${redirectTarget}`, "info");
    }

    noticeClose.addEventListener("click", () => {
      topNotice.hidden = true;
    });

    const rememberedAccount = localStorage.getItem(STORAGE.remembered);
    if (rememberedAccount) {
      accountInput.value = rememberedAccount;
      byId("rememberAccount").checked = true;
    }

    function setFieldError(inputId, errorId, message) {
      const input = byId(inputId);
      const error = byId(errorId);
      const shell = input.closest(".input-shell");

      error.textContent = message;
      input.setAttribute("aria-invalid", message ? "true" : "false");
      shell.classList.toggle("has-error", Boolean(message));
    }

    function clearAllErrors() {
      setFieldError("account", "accountError", "");
      setFieldError("password", "passwordError", "");
      setFieldError("phone", "phoneError", "");
      setFieldError("smsCode", "smsCodeError", "");
      byId("agreementError").textContent = "";
      topNotice.hidden = true;
    }

    function validateAccount(showError = true) {
      const account = accountInput.value.trim();
      let message = "";

      if (!account) {
        message = "请输入账号";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account) && !/^[a-zA-Z0-9._-]{3,32}$/.test(account)) {
        message = "请输入有效的邮箱或用户名";
      }

      if (showError) {
        setFieldError("account", "accountError", message);
      }

      return !message;
    }

    function validatePassword(showError = true) {
      const password = passwordInput.value;
      let message = "";

      if (!password) {
        message = "请输入密码";
      } else if (password.length < 6) {
        message = "密码至少需要 6 位";
      }

      if (showError) {
        setFieldError("password", "passwordError", message);
      }

      return !message;
    }

    function validatePhone(showError = true) {
      const phone = phoneInput.value.trim();
      const message = /^1\d{10}$/.test(phone) ? "" : "请输入有效的 11 位手机号";

      if (showError) {
        setFieldError("phone", "phoneError", message);
      }

      return !message;
    }

    function validateSmsCode(showError = true) {
      const code = smsCodeInput.value.trim();
      const message = /^\d{6}$/.test(code) ? "" : "请输入 6 位数字验证码";

      if (showError) {
        setFieldError("smsCode", "smsCodeError", message);
      }

      return !message;
    }

    function validateAgreement() {
      const valid = agreement.checked;
      byId("agreementError").textContent = valid ? "" : "请先阅读并同意服务条款与隐私政策";
      return valid;
    }

    function setLoading(button, loading, label) {
      button.disabled = loading;
      button.classList.toggle("is-loading", loading);
      const labelElement = button.querySelector(".button-label");
      if (labelElement) {
        labelElement.textContent = loading ? label : button.dataset.defaultLabel || labelElement.textContent;
      }
    }

    passwordSubmit.dataset.defaultLabel = "登录";
    smsSubmit.dataset.defaultLabel = "登录";
    qrSubmit.dataset.defaultLabel = "确认登录";

    function updateLockButton() {
      const account = normalizeAccount(accountInput.value);
      const remaining = getRemainingLockSeconds(account);

      if (remaining > 0) {
        passwordSubmit.disabled = true;
        passwordSubmit.querySelector(".button-label").textContent = `已锁定，${remaining}s 后重试`;
        setFieldError("account", "accountError", `账号已锁定，请在 ${remaining} 秒后重试`);
        return;
      }

      if (passwordSubmit.classList.contains("is-loading")) {
        return;
      }

      passwordSubmit.disabled = false;
      passwordSubmit.querySelector(".button-label").textContent = "登录";
    }

    function switchTab(tabName) {
      if (!tabs[tabName]) {
        return;
      }

      activeTab = tabName;
      clearAllErrors();

      Object.keys(tabs).forEach((key) => {
        const isActive = key === tabName;
        tabs[key].classList.toggle("is-active", isActive);
        tabs[key].setAttribute("aria-selected", String(isActive));
        tabs[key].setAttribute("tabindex", isActive ? "0" : "-1");
        panels[key].hidden = !isActive;
      });

      const tabOrder = ["password", "sms", "qr"];
      const activeIndex = tabOrder.indexOf(tabName);
      tabIndicator.style.transform = `translateX(${activeIndex * 100}%)`;

      if (tabName === "qr") {
        startQrState();
      } else {
        stopQrState();
      }

      if (tabName === "password") {
        updateLockButton();
      }
    }

    tabs.password.addEventListener("click", () => switchTab("password"));
    tabs.sms.addEventListener("click", () => switchTab("sms"));
    tabs.qr.addEventListener("click", () => switchTab("qr"));

    Object.keys(tabs).forEach((key) => {
      tabs[key].addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          return;
        }

        event.preventDefault();
        const order = ["password", "sms", "qr"];
        const currentIndex = order.indexOf(key);
        let nextIndex = currentIndex;

        if (event.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + order.length) % order.length;
        } else if (event.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % order.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = order.length - 1;
        }

        switchTab(order[nextIndex]);
        tabs[order[nextIndex]].focus();
      });
    });

    accountInput.addEventListener("blur", () => validateAccount(true));
    passwordInput.addEventListener("blur", () => validatePassword(true));
    phoneInput.addEventListener("blur", () => validatePhone(true));
    smsCodeInput.addEventListener("blur", () => validateSmsCode(true));

    accountInput.addEventListener("input", () => {
      if (accountInput.getAttribute("aria-invalid") === "true") {
        validateAccount(true);
      }
      updateLockButton();
    });

    passwordInput.addEventListener("input", () => {
      if (passwordInput.getAttribute("aria-invalid") === "true") {
        validatePassword(true);
      }
    });

    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 11);
      if (phoneInput.getAttribute("aria-invalid") === "true") {
        validatePhone(true);
      }
    });

    smsCodeInput.addEventListener("input", () => {
      smsCodeInput.value = smsCodeInput.value.replace(/\D/g, "").slice(0, 6);
      if (smsCodeInput.getAttribute("aria-invalid") === "true") {
        validateSmsCode(true);
      }
    });

    agreement.addEventListener("change", () => {
      if (agreement.checked) {
        byId("agreementError").textContent = "";
      }
    });

    byId("togglePassword").addEventListener("click", () => {
      const visible = passwordInput.type === "text";
      passwordInput.type = visible ? "password" : "text";
      byId("togglePassword").setAttribute("aria-pressed", String(!visible));
      byId("togglePassword").setAttribute("aria-label", visible ? "显示密码" : "隐藏密码");
      byId("togglePassword").querySelector(".eye-open").hidden = !visible;
      byId("togglePassword").querySelector(".eye-closed").hidden = visible;
    });

    byId("forgotPassword").addEventListener("click", () => {
      showTopNotice("请联系企业管理员重置密码，或使用短信验证码登录", "info");
    });

    document.querySelectorAll("[data-social]").forEach((button) => {
      button.addbutton.addEventListener("click", () => {
        showTopNotice("该企业暂未配置此登录方式", "info");
      });
    });

    byId("loginForm").addEventListener("submit", (event) => {
      event.preventDefault();

      const accountValid = validateAccount(true);
      const passwordValid = validatePassword(true);
      const phoneValid = validatePhone(true);
      const smsValid = validateSmsCode(true);
      const agreementValid = validateAgreement();

      if (!accountValid || !passwordValid || !phoneValid || !smsValid || !agreementValid) {
        const firstInvalid = loginForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      setLoading(true, "正在验证登录信息");

      window.setTimeout(() => {
        setLoading(false);
        showTopNotice("登录信息已提交，正在进入工作台", "success");
        byId("continueButton").hidden = false;
        byId("continueButton").focus();
      }, 800);
    });

    byId("continueButton").addEventListener("click", () => {
      showTopNotice("演示环境已完成登录，可继续访问企业系统", "success");
    });
  }

  function setLoading(isLoading, text) {
    const submitButton = byId("submitButton");
    const buttonLabel = byId("submitLabel");
    const buttonSpinner = byId("submitSpinner");

    submitButton.disabled = isLoading;
    buttonLabel.textContent = isLoading ? text : "登录";
    buttonSpinner.hidden = !isLoading;
    loginForm.setAttribute("aria-busy", String(isLoading));
  }

  function validateAccount(showError = false) {
    const value = accountInput.value.trim();
    let message = "";

    if (!value) {
      message = "请输入账号";
    } else if (value.length < 4) {
      message = "账号至少需要 4 个字符";
    }

    updateFieldState(accountInput, byId("accountError"), message, showError);
    return !message;
  }

  function validatePassword(showError = false) {
    const value = passwordInput.value;
    let message = "";

    if (!value) {
      message = "请输入密码";
    } else if (value.length < 8) {
      message = "密码至少需要 8 个字符";
    } else if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
      message = "密码需同时包含字母和数字";
    }

    updateFieldState(passwordInput, byId("passwordError"), message, showError);
    return !message;
  }

  function validatePhone(showError = false) {
    const value = phoneInput.value.trim();
    let message = "";

    if (!value) {
      message = "请输入手机号";
    } else if (!/^1[3-9]\d{9}$/.test(value)) {
      message = "请输入有效的 11 位手机号";
    }

    updateFieldState(phoneInput, byId("phoneError"), message, showError);
    return !message;
  }

  function validateSmsCode(showError = false) {
    const value = smsCodeInput.value.trim();
    let message = "";

    if (!value) {
      message = "请输入短信验证码";
    } else if (!/^\d{6}$/.test(value)) {
      message = "请输入 6 位数字验证码";
    }

    updateFieldState(smsCodeInput, byId("smsCodeError"), message, showError);
    return !message;
  }

  function validateAgreement() {
    const errorElement = byId("agreementError");
    if (!agreement.checked) {
      errorElement.textContent = "请阅读并同意服务协议和隐私政策";
      return false;
    }

    errorElement.textContent = "";
    return true;
  }

  function updateFieldState(input, errorElement, message, showError) {
    const hasError = Boolean(message);

    input.setAttribute("aria-invalid", String(hasError));
    input.closest(".field").classList.toggle("has-error", hasError);

    if (showError) {
      errorElement.textContent = message;
    } else if (!hasError) {
      errorElement.textContent = "";
    }

    return !hasError;
  }

  function updateLockButton() {
    const locked = !accountInput.value.trim() || !passwordInput.value;
    byId("submitButton").disabled = locked;
  }

  function showTopNotice(message, type) {
    const notice = byId("topNotice");
    const noticeIcon = byId("noticeIcon");
    const noticeText = byId("noticeText");

    notice.hidden = false;
    notice.dataset.type = type;
    noticeText.textContent = message;

    if (type === "success") {
      noticeIcon.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <path d="m8.2 12.2 2.5 2.5 5.2-5.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    } else {
      noticeIcon.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <path d="M12 7.4v5.4M12 16.3v.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }
  }
</script>
</body>
</html>
