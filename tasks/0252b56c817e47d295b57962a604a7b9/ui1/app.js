/* ===== Demo SSO 全局命名空间 ===== */
window.DemoSSO = (function () {
  "use strict";

  const SESSION_KEY = "sso.session";
  const SESSION_DURATION = 30 * 60 * 1000;
  const SAFE_REDIRECTS = ["app.html", "index.html"];

  const ACCOUNTS = [
    {
      email: "admin@demo.com",
      password: "demo123",
      name: "系统管理员",
      role: "管理员"
    },
    {
      email: "user@demo.com",
      password: "demo123",
      name: "演示成员",
      role: "成员"
    },
    {
      email: "guest@demo.com",
      password: "demo123",
      name: "访客用户",
      role: "访客"
    }
  ];

  /**
   * 生成 32 位随机十六进制 Token。
   */
  function createToken() {
    const bytes = new Uint8Array(16);

    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let index = 0; index < bytes.length; index += 1) {
        bytes[index] = Math.floor(Math.random() * 256);
      }
    }

    return Array.from(bytes, function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }

  /**
   * 校验站内安全回跳地址。
   */
  function getSafeRedirect(redirect) {
    if (!redirect) {
      return "";
    }

    const cleanValue = String(redirect).replace(/^\/+/, "");
    const pathname = cleanValue.split(/[?#]/)[0];

    if (SAFE_REDIRECTS.includes(pathname)) {
      return cleanValue;
    }

    return "";
  }

  /**
   * 登录并建立本地模拟会话。
   */
  function login(email, password, remember) {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const account = ACCOUNTS.find(function (item) {
      return item.email === normalizedEmail && item.password === password;
    });

    if (!account) {
      return {
        ok: false,
        message: "账号或密码不正确，请重试"
      };
    }

    const issuedAt = Date.now();
    const session = {
      token: "sso_" + createToken(),
      email: account.email,
      name: account.name,
      role: account.role,
      issuedAt: issuedAt,
      expiresAt: issuedAt + SESSION_DURATION,
      remember: Boolean(remember),
      lastVisitedAt: issuedAt,
      issuer: "Demo SSO 认证中心"
    };

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      return {
        ok: false,
        message: "浏览器无法保存登录状态，请检查隐私设置后重试"
      };
    }

    return {
      ok: true,
      session: session
    };
  }

  /**
   * 获取当前会话；发现过期时自动清理。
   */
  function getSession() {
    let rawSession = null;

    try {
      rawSession = localStorage.getItem(SESSION_KEY);
    } catch (error) {
      return null;
    }

    if (!rawSession) {
      return null;
    }

    let session = null;

    try {
      session = JSON.parse(rawSession);
    } catch (error) {
      logout(false);
      return null;
    }

    if (!session || !session.token || !session.email || !session.expiresAt) {
      logout(false);
      return null;
    }

    if (Date.now() >= Number(session.expiresAt)) {
      logout(false);
      return null;
    }

    return session;
  }

  /**
   * 清除本地会话。
   */
  function logout(redirect) {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      // 存储不可用时保持页面可用。
    }

    if (redirect !== false) {
      window.location.href = "login.html?logout=1";
    }
  }

  /**
   * 更新会话最后访问时间。
   */
  function touchSession() {
    const session = getSession();

    if (!session) {
      return null;
    }

    session.lastVisitedAt = Date.now();

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      return session;
    }

    return session;
  }

  /**
   * 格式化剩余有效时间。
   */
  function formatRemaining(remainingMs) {
    const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  }

  /**
   * 格式化日期时间。
   */
  function formatDateTime(timestamp) {
    if (!timestamp) {
      return "—";
    }

    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date(timestamp));
  }

  /**
   * 获取当前页面安全回跳参数。
   */
  function getRedirectFromLocation() {
    const params = new URLSearchParams(window.location.search);
    return getSafeRedirect(params.get("redirect"));
  }

  return {
    ACCOUNTS: ACCOUNTS,
    SESSION_KEY: SESSION_KEY,
    SESSION_DURATION: SESSION_DURATION,
    login: login,
    logout: logout,
    getSession: getSession,
    touchSession: touchSession,
    getSafeRedirect: getSafeRedirect,
    getRedirectFromLocation: getRedirectFromLocation,
    formatRemaining: formatRemaining,
    formatDateTime: formatDateTime
  };
})();
