(() => {
  "use strict";

  const STORAGE = {
    session: "newera.sso.session",
    remembered: "newera.sso.rememberedAccount",
    failures: "newera.sso.passwordFailures"
  };

  const SESSION_DURATION = 2 * 60 * 60 * 1000;
  const LOCK_DURATION = 5 * 60 * 1000;
  const ERROR_MESSAGES = {
    ACCOUNT_NOT_FOUND: "账号不存在，请检查后重试",
    INVALID_PASSWORD: "密码错误，请重新输入",
    ACCOUNT_LOCKED: "账号已锁定，请稍后再试",
    INVALID_SMS_CODE: "验证码错误或已过期",
    INVALID_PHONE: "手机号格式不正确",
    NETWORK_ERROR: "服务暂时不可用，请稍后重试"
  };

  const byId = (id) => document.getElementById(id);
  const page = document.body.dataset.page;

  const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

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
    const values = new Uint8Array(24);
    crypto.getRandomValues(values);
    return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
  }

  function createSession(user) {
    const issuedAt = Date.now();
    return {
      token: createToken(),
      user,
      issuedAt,
      expiresAt: issuedAt + SESSION_DURATION
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

  function saveSession(user) {
    const session = createSession(user);
    setJson(STORAGE.session, session);
    return session;
  }

  function clearSession() {
    localStorage.removeItem(STORAGE.session);
  }

  function redirectToLogin(redirect = "app.html") {
    const locationUrl = new URL(window.location.href);
    const target = `${locationUrl.pathname.split("/").pop()}${locationUrl.search}`;
    const loginUrl = new URL("index.html", locationUrl.href);
    loginUrl.searchParams.set("redirect", redirect || target);
    window.location.replace(loginUrl.href);
  }

  const authService = {
    async loginWithPassword(account, password) {
      await sleep(500 + Math.floor(Math.random() * 301));
      const normalized = account.trim().toLowerCase();

      if (normalized === "locked" || normalized === "locked@newera.cn") {
        throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
      }

      if (normalized === "missing" || normalized === "missing@newera.cn") {
        throw new Error(ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      if (password !== "newera2026") {
        throw new Error(ERROR_MESSAGES.INVALID_PASSWORD);
      }

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
      return { sent: true, expiresIn: 300 };
    },

    async loginWithSms(phone, code) {
      await sleep(500 + Math.floor(Math.random() * 301));
      if (!/^\d{6}$/.test(code) || code !== "123456") {
        throw new Error(ERROR_MESSAGES.INVALID_SMS_CODE);
      }
      return saveSession({
        id: phone,
        name: `用户${phone.slice(-4)}`,
        role: "企业成员"
      });
    },

    async confirmQrLogin() {
      await sleep(500);
      return saveSession({
        id: "qr-demo-user",
        name: "扫码用户",
        role: "企业成员"
      });
    }
  };

  function showNotice(message, type = "info") {
    const notice = byId("topNotice");
    if (!notice) return;
    byId("topNoticeText").textContent = message;
    notice.classList.toggle("is-success", type === "success");
    notice.classList.toggle("is-error", type === "error");
    notice.hidden = false;
  }

  function hideNotice() {
    const notice = byId("topNotice");
    if (notice) notice.hidden = true;
  }

  function setFieldError(inputId, errorId, message) {
    const input = byId(inputId);
    const error = byId(errorId);
    if (error) error.textContent = message || "";
    if (input) {
      input.setAttribute("aria-invalid", message ? "true" : "false");
      const shell = input.closest(".input-shell");
      if (shell) shell.classList.toggle("has-error", Boolean(message));
    }
  }

  function clearErrors() {
    [
      ["account", "accountError"],
      ["password", "passwordError"],
      ["phone", "phoneError"],
      ["smsCode", "smsCodeError"]
    ].forEach(([inputId, errorId]) => setFieldError(inputId, errorId, ""));
    const agreementError = byId("agreementError");
    if (agreementError) agreementError.textContent = "";
  }

  function setLoading(button, loading, loadingText = "处理中") {
    if (!button) return;
    button.disabled = loading;
    button.classList.toggle("is-loading", loading);
    const label = button.querySelector(".button-label");
    if (label) label.textContent = loading ? loadingText : button.dataset.defaultLabel;
  }

  function validateAccount() {
    const account = byId("account").value.trim();
    let message = "";

    if (!account) {
      message = "请输入账号";
    } else if (account.length < 3) {
      message = "账号至少需要 3 个字符";
    } else if (account.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account)) {
      message = "请输入正确的邮箱或用户名";
    }

    setFieldError("account", "accountError", message);
    return !message;
  }

  function validatePassword() {
    const password = byId("password").value;
    let message = "";

    if (!password) {
      message = "请输入密码";
    } else if (password.length < 6) {
      message = "密码至少需要 6 位";
    }

    setFieldError("password", "passwordError", message);
    return !message;
  }

  function validatePhone() {
    const phone = byId("phone").value.trim();
    const message = /^1\d{10}$/.test(phone) ? "" : "请输入正确的 11 位手机号";
    setFieldError("phone", "phoneError", message);
    return !message;
  }

  function validateSmsCode() {
    const code = byId("smsCode").value.trim();
    const message = /^\d{6}$/.test(code) ? "" : "请输入 6 位验证码";
    setFieldError("smsCode", "smsCodeError", message);
    return !message;
  }

  function validateAgreement() {
    const agreement = byId("agreement");
    const error = byId("agreementError");
    const valid = agreement.checked;
    if (error) error.textContent = valid ? "" : "请先阅读并同意服务条款与隐私政策";
    return valid;
  }

  function getRedirectTarget() {
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    if (!redirect) return "app.html";
    if (!/^[a-zA-Z0-9_./-]+\.html(?:\?[a-zA-Z0-9=&%._/-]*)?$/.test(redirect)) {
      return "app.html";
    }
    return redirect;
  }

  function goAfterLogin() {
    showNotice("登录成功，正在进入工作空间", "success");
    window.setTimeout(() => {
      window.location.href = getRedirectTarget();
    }, 650);
  }

  function getFailureRecord(account) {
    const records = getJson(STORAGE.failures, {});
    return records[account] || { count: 0, lockedUntil: 0 };
  }

  function updateFailureRecord(account, patch) {
    const records = getJson(STORAGE.failures, {});
    records[account] = { ...getFailureRecord(account), ...patch };
    setJson(STORAGE.failures, records);
    return records[account];
  }

  function renderLockState(account) {
    const record = getFailureRecord(account);
    const submit = byId("passwordSubmit");
    if (!submit) return false;

    if (record.lockedUntil > Date.now()) {
      submit.disabled = true;
      const seconds = Math.ceil((record.lockedUntil - Date.now()) / 1000);
      submit.querySelector(".button-label").textContent = `已锁定 ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
      return true;
    }

    submit.disabled = false;
    submit.querySelector(".button-label").textContent = submit.dataset.defaultLabel;
    return false;
  }

  function startLockTimer(account) {
    clearInterval(window.lockTimer);
    const update = () => {
      if (!renderLockState(account)) {
        clearInterval(window.lockTimer);
        window.lockTimer = null;
      }
    };
    update();
    window.lockTimer = window.setInterval(update, 1000);
  }

  function initLoginPage() {
    const passwordSubmit = byId("passwordSubmit");
    const smsSubmit = byId("smsSubmit");
    passwordSubmit.dataset.defaultLabel = "登录";
    smsSubmit.dataset.defaultLabel = "登录";

    const tabs = [
      { button: byId("passwordTab"), panel: byId("passwordPanel") },
      { button: byId("smsTab"), panel: byId("smsPanel") },
      { button: byId("qrTab"), panel: byId("qrPanel") }
    ];

    function activateTab(index) {
      tabs.forEach((tab, tabIndex) => {
        const active = tabIndex === index;
        tab.button.classList.toggle("is-active", active);
        tab.button.setAttribute("aria-selected", String(active));
        tab.button.tabIndex = active ? 0 : -1;
        tab.panel.hidden = !active;
      });
      byId("tabIndicator").style.transform = `translateX(${index * 100}%)`;
      clearErrors();
      hideNotice();
    }

    tabs.forEach((tab, index) => {
      tab.button.addEventListener("click", () => activateTab(index));
      tab.button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (index + direction + tabs.length) % tabs.length;
        activateTab(next);
        tabs[next].button.focus();
      });
    });

    byId("noticeClose").addEventListener("click", hideNotice);

    const remembered = localStorage.getItem(STORAGE.remembered) || "";
    if (remembered) {
      byId("account").value = remembered;
      byId("rememberAccount").checked = true;
    }

    const redirect = new URLSearchParams(window.location.search).get("redirect");
    if (redirect) {
      showNotice("登录后将继续访问原页面");
    }

    byId("account").addEventListener("blur", validateAccount);
    byId("account").addEventListener("input", () => {
      if (byId("accountError").textContent) validateAccount();
    });
    byId("password").addEventListener("blur", validatePassword);
    byId("password").addEventListener("input", () => {
      if (byId("passwordError").textContent) validatePassword();
    });
    byId("phone").addEventListener("blur", validatePhone);
    byId("phone").addEventListener("input", () => {
      byId("phone").value = byId("phone").value.replace(/\D/g, "");
      if (byId("phoneError").textContent) validatePhone();
    });
    byId("smsCode").addEventListener("blur", validateSmsCode);
    byId("smsCode").addEventListener("input", () => {
      byId("smsCode").value = byId("smsCode").value.replace(/\D/g, "");
      if (byId("smsCodeError").textContent) validateSmsCode();
    });

    byId("togglePassword").addEventListener("click", () => {
      const input = byId("password");
      const visible = input.type === "text";
      input.type = visible ? "password" : "text";
      byId("togglePassword").setAttribute("aria-label", visible ? "显示密码" : "隐藏密码");
      byId("togglePassword").setAttribute("aria-pressed", String(!visible));
      byId("togglePassword").querySelector(".eye-open").hidden = !visible;
      byId("togglePassword").querySelector(".eye-closed").hidden = visible;
    });

    byId("passwordForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      clearErrors();

      const accountValid = validateAccount();
      const passwordValid = validatePassword();
      const agreementValid = validateAgreement();

      if (!accountValid || !passwordValid) {
        const firstInvalid = document.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (!agreementValid) {
        byId("agreement").focus();
        return;
      }

      const account = byId("account").value.trim();
      const normalized = account.toLowerCase();
      const lockRecord = getFailureRecord(normalized);

      if (lockRecord.lockedUntil > Date.now()) {
        setFieldError("account", "accountError", ERROR_MESSAGES.ACCOUNT_LOCKED);
        showNotice(ERROR_MESSAGES.ACCOUNT_LOCKED, "error");
        startLockTimer(normalized);
        return;
      }

      setLoading(passwordSubmit, true, "正在登录");
      try {
        await authService.loginWithPassword(account, byId("password").value);
        const failureRecord = getFailureRecord(normalized);
        if (failureRecord.count) updateFailureRecord(normalized, { count: 0, lockedUntil: 0 });
        localStorage.setItem(STORAGE.remembered, byId("rememberAccount").checked ? account : "");
        if (!byId("rememberAccount").checked) localStorage.removeItem(STORAGE.remembered);
        goAfterLogin();
      } catch (error) {
        const record = getFailureRecord(normalized);
        const count = record.count + 1;
        const shouldLock = count >= 5;
        const lockedUntil = shouldLock ? Date.now() + LOCK_DURATION : 0;
        updateFailureRecord(normalized, { count, lockedUntil });
        setFieldError("password", "passwordError", error.message);
        showNotice(error.message, "error");
        byId("password").value = "";
        byId("password").focus();
        if (shouldLock) {
          showNotice("连续 5 次密码错误，账号已锁定 5 分钟", "error");
          startLockTimer(normalized);
        }
      } finally {
        setLoading(passwordSubmit, false);
        if (getFailureRecord(normalized).lockedUntil > Date.now()) {
          renderLockState(normalized);
        }
      }
    });

    let codeTimer = null;
    let codeRemaining = 0;

    function renderCodeTimer() {
      const button = byId("sendCode");
      if (!button) return;
      if (codeRemaining > 0) {
        button.disabled = true;
        button.textContent = `${codeRemaining}s 后重试`;
      } else {
        button.disabled = false;
        button.textContent = "获取验证码";
      }
    }

    byId("sendCode").addEventListener("click", async () => {
      if (!validatePhone()) {
        byId("phone").focus();
        return;
      }

      const button = byId("sendCode");
      button.disabled = true;
      button.textContent = "发送中";
      try {
        await authService.sendSmsCode(byId("phone").value.trim());
        codeRemaining = 60;
        renderCodeTimer();
        showNotice("验证码已发送，请注意查收", "success");
        clearInterval(codeTimer);
        codeTimer = window.setInterval(() => {
          codeRemaining -= 1;
          renderCodeTimer();
          if (codeRemaining <= 0) clearInterval(codeTimer);
        }, 1000);
      } catch (error) {
        showNotice(error.message, "error");
        renderCodeTimer();
      }
    });

    byId("smsForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      clearErrors();
      const phoneValid = validatePhone();
      const codeValid = validateSmsCode();
      const agreementValid = validateAgreement();

      if (!phoneValid || !codeValid) return;
      if (!agreementValid) {
        byId("agreement").focus();
        return;
      }

      setLoading(smsSubmit, true, "正在登录");
      try {
        await authService.loginWithSms(byId("phone").value.trim(), byId("smsCode").value.trim());
        goAfterLogin();
      } catch (error) {
        setFieldError("smsCode", "smsCodeError", error.message);
        showNotice(error.message, "error");
        byId("smsCode").value = "";
        byId("smsCode").focus();
      } finally {
        setLoading(smsSubmit, false);
      }
    });

    let qrTimer = null;
    let qrReady = false;

    function resetQr() {
      clearTimeout(qrTimer);
      qrReady = false;
      byId("qrStatus").classList.remove("is-ready");
      byId("qrStatusTitle").textContent = "请使用企业微信扫码";
      byId("qrStatusText").textContent = "扫码后将在手机上确认登录";
      byId("qrSubmit").disabled = true;
      byId("qrSubmit").querySelector(".button-label").textContent = "等待扫码";
      qrTimer = window.setTimeout(() => {
        qrReady = true;
        byId("qrStatus").classList.add("is-ready");
        byId("qrStatusTitle").textContent = "已扫描，请在手机上确认";
        byId("qrStatusText").textContent = "检测到可信设备，点击下方按钮确认登录";
        byId("qrSubmit").disabled = false;
        byId("qrSubmit").querySelector(".button-label").textContent = "确认登录";
      }, 3000);
    }

    byId("qrTab").addEventListener("click", resetQr);
    byId("refreshQr").addEventListener("click", resetQr);
    byId("switchAccount").addEventListener("click", () => {
      activateTab(0);
      byId("account").focus();
    });

    byId("qrSubmit").addEventListener("click", async () => {
      if (!qrReady) return;
      setLoading(byId("qrSubmit"), true, "正在确认");
      try {
        await authService.confirmQrLogin();
        goAfterLogin();
      } catch (error) {
        showNotice(error.message, "error");
      } finally {
        setLoading(byId("qrSubmit"), false);
        if (qrReady) byId("qrSubmit").querySelector(".button-label").textContent = "确认登录";
      }
    });

    byId("forgotPassword").addEventListener("click", () => {
      showNotice("请联系企业管理员重置密码");
    });

    document.querySelectorAll(".social-buttons button").forEach((button) => {
      button.addEventListener("click", () => {
        showNotice("该演示仅提供本地账号、短信与扫码登录");
      });
    });

    const existingSession = getSession();
    if (existingSession && existingSession.expiresAt <= Date.now()) {
      clearSession();
      showNotice("上次会话已过期，请重新登录", "error");
    }

    renderLockState(byId("account").value.trim().toLowerCase());
  }

  function initAppPage() {
    const session = getSession();

    if (!isSessionValid(session)) {
      clearSession();
      redirectToLogin("app.html");
      return;
    }

    byId("userName").textContent = session.user.name;
    byId("userRole").textContent = session.user.role;
    byId("welcomeName").textContent = session.user.name;

    const dropdown = byId("userDropdown");
    const trigger = byId("userTrigger");

    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      dropdown.hidden = expanded;
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".user-menu")) {
        dropdown.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    byId("logoutButton").addEventListener("click", () => {
      clearSession();
      window.location.replace("index.html");
    });

    const modal = byId("sessionModal");
    function openExpiredModal() {
      clearSession();
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      byId("reloginButton").focus();
    }

    byId("reloginButton").addEventListener("click", () => {
      window.location.replace("index.html");
    });

    function checkSession() {
      const current = getSession();
      if (!current || current.expiresAt <= Date.now()) {
        if (!modal.hidden) return;
        openExpiredModal();
      }
    }

    window.setInterval(checkSession, 30000);
    window.addEventListener("focus", checkSession);
  }

  function initErrorPage() {
    const backButton = byId("backButton");
    if (backButton) {
      backButton.addEventListener("click", () => {
        if (isSessionValid()) {
          window.location.href = "app.html";
        } else {
          window.location.href = "index.html";
        }
      });
    }
  }

  if (page === "if (page === "login") {
    initLoginPage();
  } else if (page === "app") {
    initAppPage();
  } else if (page === "error") {
    initErrorPage();
  }
})();
