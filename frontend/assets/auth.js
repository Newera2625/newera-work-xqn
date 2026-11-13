/* 认证与会话逻辑 */
(function (window, document) {
  "use strict";

  var STORAGE_KEY = "sso.session";
  var SESSION_TTL = 30 * 60 * 1000;
  var SAFE_REDIRECTS = ["app.html", "index.html"];
  var accounts = {
    "admin@demo.com": {
      email: "admin@demo.com",
      password: "demo123",
      name: "系统管理员",
      role: "管理员"
    },
    "user@demo.com": {
      email: "user@demo.com",
      password: "demo123",
      name: "团队成员",
      role: "成员"
    },
    "guest@demo.com": {
      email: "guest@demo.com",
      password: "demo123",
      name: "访客用户",
      role: "访客"
    }
  };

  /**
   * 读取并解析会话。
   */
  function getSession() {
    var raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      var session = JSON.parse(raw);
      if (!session || !session.token || !session.expiresAt) {
        window.localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      if (Date.now() >= session.expiresAt) {
        window.localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return session;
    } catch (error) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  /**
   * 生成 sso_ 加 32 位随机十六进制字符的访问令牌。
   */
  function createToken() {
    var bytes = new Uint8Array(16);
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      window.crypto.getRandomValues(bytes);
    } else {
      for (var i = 0; i < bytes.length; i += 1) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
    }

    return "sso_" + Array.prototype.map.call(bytes, function (value) {
      return value.toString(16).padStart(2, "0");
    }).join("");
  }

  /**
   * 校验账号和密码并建立 30 分钟会话。
   */
  function login(email, password, remember) {
    var normalizedEmail = String(email || "").trim().toLowerCase();
    var account = accounts[normalizedEmail];

    if (!account || String(password || "") !== account.password) {
      throw new Error("账号或密码不正确，请重试");
    }

    var issuedAt = Date.now();
    var session = {
      token: createToken(),
      email: account.email,
      name: account.name,
      role: account.role,
      issuedAt: issuedAt,
      expiresAt: issuedAt + SESSION_TTL,
      remember: Boolean(remember)
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  /**
   * 清除当前会话。
   */
  function logout() {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * 返回允许的回跳地址，防止开放重定向。
   */
  function getSafeRedirect(value) {
    var candidate = String(value || "").trim();
    if (SAFE_REDIRECTS.indexOf(candidate) !== -1) {
      return candidate;
    }
    return "";
  }

  /**
   * 获取预置账号的公开信息，密码不会暴露给页面。
   */
  function getDemoAccounts() {
    return Object.keys(accounts).map(function (email) {
      return {
        email: accounts[email].email,
        name: accounts[email].name,
        role: accounts[email].role
      };
    });
  }

  /**
   * 受保护页面守卫。会话过期时先清除会话，再携带原因和 redirect 参数跳转。
   */
  function requireAuth(redirectPath) {
    var raw = window.localStorage.getItem(STORAGE_KEY);
    var session = getSession();

    if (session) {
      return session;
    }

    var expired = false