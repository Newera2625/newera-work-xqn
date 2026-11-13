/* ==========================================================================
   Demo SSO · 页面交互绑定
   职责：
   - 依据页面上的 data 属性挂载各页交互
   - 导航栏会话状态渲染与倒计时
   - 登录表单校验、密码可见性、提交态
   - 身份选择、应用打开模拟、登出确认
   ========================================================================== */
(function (global) {
  "use strict";

  var SSO = global.DemoSSO;

  /* ---------- 通用工具 ---------- */

  /**
   * 选择单个元素
   * @param {string} selector 选择器
   * @param {Element} root 根节点
   * @returns {Element|null}
   */
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  /**
   * 选择多个元素并转为数组
   * @param {string} selector 选择器
   * @param {Element} root 根节点
   * @returns {Array<Element>}
   */
  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /**
   * 通过 textContent 设置文本
   * @param {Element} el 元素
   * @param {string} text 文本
   */
  function setText(el, text) {
    if (el) el.textContent = text;
  }

  /**
   * 创建内联 SVG 图标
   * @param {string} pathData 路径数据
   * @param {number} viewSize viewBox 尺寸
   * @returns {SVGElement}
   */
  function makeIcon(pathData, viewSize) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    var path = document.createElementNS(ns, "path");
    svg.setAttribute("viewBox", "0 0 " + (viewSize || 24) + " " + (viewSize || 24));
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.75");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
    return svg;
  }

  /* ---------- 1. 导航栏会话状态 ---------- */

  /**
   * 渲染导航栏中的用户信息与剩余时间
   */
  function renderNavSession() {
    var chip = $("[data-nav-user]");
    var timeEl = $("[data-nav-time]");
    var session = SSO.getValidSession();

    if (!session) {
      if (chip) chip.hidden = true;
      if (timeEl) timeEl.hidden = true;
      return;
    }

    if (chip) {
      chip.hidden = false;
      var avatar = $("[data-nav-initial]", chip);
      var name = $("[data-nav-name]", chip);
      var role = $("[data-nav-role]", chip);
      setText(avatar, SSO.getInitial(session));
      setText(name, session.email);
      setText(role, session.role);
    }

    if (timeEl) {
      timeEl.hidden = false;
      startCountdown(timeEl, session);
    }
  }

  /**
   * 启动会话倒计时（每秒刷新一次）
   * @param {Element} el 时间显示元素
   * @param {Object} session 会话
   */
  function startCountdown(el, session) {
    var container = el.closest(".nav-time") || el.parentNode || document;
    var badge = $("[data-nav-badge]", container);
    var textEl = $("[data-nav-time-text]", el) || el;
    var EXPIRY_THRESHOLD = 5 * 60 * 1000;

    function paint() {
      var remaining = SSO.getRemaining(session);
      setText(textEl, "会话剩余 " + SSO.formatRemaining(remaining));
      el.classList.toggle("is-warning", remaining < EXPIRY_THRESHOLD);
      if (badge) badge.hidden = remaining >= EXPIRY_THRESHOLD;
    }

    paint();
    global.setInterval(function () {
      var remaining = SSO.getRemaining(session);
      if (remaining <= 0) {
        SSO.clearSession();
        SSO.redirectToLogin("app.html", true);
        return;
      }
      paint();
    }, 1000);
  }

  /* ---------- 2. 首页 ---------- */

  /**
   * 首页：按登录态切换按钮文案与状态面板
   */
  function initIndexPage() {
    var session = SSO.getValidSession();
    var heroTitle = $("[data-hero-title]");
    var heroLead = $("[data-hero-lead]");
    var primaryBtn = $("[data-hero-primary]");
    var primaryBtnText = $("[data-hero-primary-text]");
    var statusTitle = $("[data-status-title]");
    var statusDesc = $("[data-status-desc]");
    var statusBody = $("[data-status-body]");
    var statusActions = $("[data-status-actions]");
    var guestPanel = $("[data-guest-panel]");

    if (session) {
      setText(heroTitle, "欢迎回来，" + session.name + "，会话已就绪");
      setText(
        heroLead,
        "当前账号 " +
          session.email +
          " 已完成单点登录，所有已接入应用可直接访问，无需重复输入凭据。"
      );
      setText(primaryBtnText, "进入控制台");
      if (primaryBtn) primaryBtn.setAttribute("href", "app.html");

      if (statusTitle) setText(statusTitle, "当前会话状态");
      if (statusDesc)
        setText(statusDesc, "以下信息来自认证中心签发的会话凭据。");
      if (guestPanel) guestPanel.hidden = true;

      if (statusBody) {
        statusBody.hidden = false;
        setText($("[data-status-name]"), session.name);
        setText($("[data-status-email]"), session.email);
        setText($("[data-status-issued]"), SSO.formatTime(session.issuedAt));
        setText(
          $("[data-status-remaining]"),
          SSO.formatRemaining(SSO.getRemaining(session))
        );
      }
      if (statusActions) statusActions.hidden = false;
    } else {
      if (statusTitle) setText(statusTitle, "尚未登录");
      if (statusDesc)
        setText(
          statusDesc,
          "登录一次即可访问全部已接入应用。会话有效期为 30 分钟。"
        );
      if (statusBody) statusBody.hidden = true;
      if (statusActions) statusActions.hidden = true;
      if (guestPanel) guestPanel.hidden = false;
    }

    // 演示账号卡片：跳转身份选择页并高亮对应账号
    $$("[data-account-email]").forEach(function (card) {
      function go() {
        var email = card.getAttribute("data-account-email");
        global.location.href =
          "accounts.html?pick=" + encodeURIComponent(email);
      }
      card.addEventListener("click", go);
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          go();
        }
      });
    });
  }

  /* ---------- 3. 登录页 ---------- */

  /**
   * 登录页：错误提示、密码可见性、表单提交
   */
  function initLoginPage() {
    var form = $("[data-login-form]");
    if (!form) return;

    var emailInput = $("[data-email]", form);
    var passwordInput = $("[data-password]", form);
    var rememberInput = $("[data-remember]", form);
    var submitBtn = $("[data-submit]", form);
    var errorBox = $("[data-form-error]");
    var errorText = $("[data-form-error-text]");
    var emailError = $("[data-email-error]");
    var passwordError = $("[data-password-error]");
    var toggleBtn = $("[data-toggle-password]");

    /* 3.1 顶部状态提示（redirect / expired / logout） */
    var query = SSO.getQuery();
    var alertsBox = $("[data-login-alerts]");
    var redirectPath = query.redirect;

    if (alertsBox) {
      if (query.logout === "1") {
        alertsBox.appendChild(
          buildNotice(
            "notice--info",
            "M9 12l2 2 4-4M12 3l7 3v6c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6l7-3z",
            "已安全退出，你的会话已在所有应用间清除。"
          )
        );
      }
      if (query.expired === "1") {
        alertsBox.appendChild(
          buildNotice(
            "notice--warning",
            "M12 9v4m0 4h.01M10.3 3.9L2.4 17.5A2 2 0 004.1 20h15.8a2 2 0 001.7-2.5L13.7 3.9a2 2 0 00-3.4 0z",
            "登录状态已过期，请重新登录。"
          )
        );
      }
      if (redirectPath && SSO.isProtectedTarget(redirectPath)) {
        var name = redirectPath.split("?")[0].split("#")[0];
        alertsBox.appendChild(
          buildNotice(
            "notice--muted",
            "M4 12h16m-8-8v16",
            "登录后将返回：",
            name
          )
        );
      }
    }

    /* 3.2 密码显示 / 隐藏 */
    if (toggleBtn && passwordInput) {
      var iconOpen = toggleBtn.querySelector("[data-icon-eye]");
      var iconClosed = toggleBtn.querySelector("[data-icon-eye-off]");
      toggleBtn.addEventListener("click", function () {
        var revealed = passwordInput.type === "text";
        passwordInput.type = revealed ? "password" : "text";
        toggleBtn.setAttribute("aria-label", revealed ? "显示密码" : "隐藏密码");
        toggleBtn.setAttribute("aria-pressed", revealed ? "false" : "true");
        if (iconOpen) iconOpen.hidden = !revealed;
        if (iconClosed) iconClosed.hidden = revealed;
        passwordInput.focus();
      });
    }

    /* 3.3 错误提示辅助 */
    function showError(message) {
      if (errorBox && errorText) {
        setText(errorText, message);
        errorBox.hidden = false;
      }
    }

    function clearError() {
      if (errorBox) errorBox.hidden = true;
      if (emailInput) emailInput.classList.remove("is-invalid");
      if (passwordInput) passwordInput.classList.remove("is-invalid");
      if (emailError) emailError.hidden = true;
      if (passwordError) passwordError.hidden = true;
    }

    if (emailInput) {
      emailInput.addEventListener("input", function () {
        emailInput.classList.remove("is-invalid");
        if (emailError) emailError.hidden = true;
      });
    }
    if (passwordInput) {
      passwordInput.addEventListener("input", function () {
        passwordInput.classList.remove("is-invalid");
        if (passwordError) passwordError.hidden = true;
      });
    }

    /* 3.4 表单提交 */
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearError();

      var email = (emailInput && emailInput.value) || "";
      var password = (passwordInput && passwordInput.value) || "";
      var valid = true;

      if (!email.trim()) {
        valid = false;
        if (emailInput) emailInput.classList.add("is-invalid");
        if (emailError) {
          setText(emailError, "请输入邮箱地址");
          emailError.hidden = false;
        }
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        valid = false;
        if (emailInput) emailInput.classList.add("is-invalid");
        if (emailError) {
          setText(emailError, "邮箱格式不正确");
          emailError.hidden = false;
        }
      }

      if (!password) {
        valid = false;
        if (passwordInput) passwordInput.classList.add("is-invalid");
        if (passwordError) {
          setText(passwordError, "请输入密码");
          passwordError.hidden = false;
        }
      }

      if (!valid) {
        showError("请检查表单中的输入项");
        var firstInvalid = $(".is-invalid", form);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      /* 提交中状态 */
      setSubmitting(true);

      global.setTimeout(function () {
        var result = SSO.login(
          email.trim(),
          password,
          rememberInput ? rememberInput.checked : false
        );

        if (!result.ok) {
          setSubmitting(false);
          showError(result.message);
          if (emailInput) emailInput.classList.add("is-invalid");
          if (passwordInput) passwordInput.classList.add("is-invalid");
          if (passwordInput) passwordInput.focus();
          return;
        }

        global.location.href = SSO.resolveRedirect();
      }, 600);
    });

    /**
     * 切换提交按钮的 loading 状态
     * @param {boolean} loading 是否加载中
     */
    function setSubmitting(loading) {
      if (!submitBtn) return;
      var label = $("[data-submit-label]", submitBtn);
      var spinner = $("[data-submit-spinner]", submitBtn);
      submitBtn.disabled = loading;
      setText(label, loading ? "登录中…" : "登录");
      if (spinner) spinner.hidden = !loading;
    }
  }

  /**
   * 构建一个提示条节点
   * @param {string} variant 样式变体
   * @param {string} iconPath 图标路径
   * @param {string} text 主文案
   * @param {string} [strong] 加粗文案
   * @returns {Element}
   */
  function buildNotice(variant, iconPath, text, strong) {
    var notice = document.createElement("div");
    notice.className = "notice " + variant;
    notice.appendChild(makeIcon(iconPath, 24));
    var body = document.createElement("div");
    body.className = "notice__text";
    body.appendChild(document.createTextNode(text));
    if (strong) {
      var b = document.createElement("strong");
      b.textContent = strong;
      body.appendChild(b);
    }
    notice.appendChild(body);
    return notice;
  }

  /* ---------- 4. 身份选择页 ---------- */

  /**
   * 身份选择页：点击卡片直接以该身份登录
   */
  function initAccountsPage() {
    var query = SSO.getQuery();
    var pick = query.pick ? query.pick.toLowerCase() : "";

    $$("[data-identity-email]").forEach(function (card) {
      var email = card.getAttribute("data-identity-email");
      var user = SSO.findUser(email);
      if (user) {
        setText($("[data-identity-name]", card), user.email);
        setText($("[data-identity-desc]", card), user.description);
        setText($("[data-identity-initial]", card), user.name.charAt(0));
      }
      if (pick && email.toLowerCase() === pick) {
        card.classList.add("is-highlighted");
      }

      card.addEventListener("click", function () {
        card.setAttribute("aria-busy", "true");
        var result = SSO.login(email, "demo123", true);
        if (result.ok) {
          global.location.href = SSO.resolveRedirect();
        } else {
          card.removeAttribute("aria-busy");
        }
      });
    });
  }

  /* ---------- 5. 受保护资源页 ---------- */

  /**
   * 受保护资源页：守卫 + 会话信息 + 应用打开模拟 + 登出
   */
  function initAppPage() {
    var session = SSO.requireSession("app.html", false);
    if (!session) return; /* 已被重定向 */

    var EXPIRY_THRESHOLD = 5 * 60 * 1000;

    /* 5.1 用户信息 */
    setText($("[data-app-initial]"), SSO.getInitial(session));
    setText($("[data-app-name]"), session.name);
    setText($("[data-app-email]"), session.email);
    setText($("[data-app-role]"), session.role);
    setText($("[data-app-token]"), session.token);
    setText($("[data-app-issued]"), SSO.formatTime(session.issuedAt));
    setText($("[data-app-issuer]"), session.issuer || SSO.ISSUER);

    var remainingEl = $("[data-app-remaining]");
    var badgeWarning = $("[data-app-badge]");
    var badgeOk = $("[data-app-badge-ok]");
    var lastAccess = $("[data-app-last-access]");

    function paintRemaining() {
      var remaining = SSO.getRemaining(session);
      setText(remainingEl, SSO.formatRemaining(remaining));
      if (remainingEl) {
        remainingEl.classList.toggle("is-warning", remaining < EXPIRY_THRESHOLD);
      }
      if (badgeWarning) badgeWarning.hidden = remaining >= EXPIRY_THRESHOLD;
      if (badgeOk) badgeOk.hidden = remaining < EXPIRY_THRESHOLD;
    }
    paintRemaining();

    global.setInterval(function () {
      var remaining = SSO.getRemaining(session);
      if (remaining <= 0) {
        SSO.clearSession();
        SSO.redirectToLogin("app.html", true);
        return;
      }
      paintRemaining();
    }, 1000);

    /* 5.2 应用打开模拟 */
    $$("[data-app-open]").forEach(function (btn) {
      var card = btn.closest("[data-app-card]");
      var stateEl = $("[data-app-state]", card);
      var label = $("[data-open-label]", btn);
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        btn.disabled = true;
        setText(label, "打开中…");
        if (stateEl) {
          stateEl.className = "app-card__state is-loading";
          stateEl.textContent = "";
          var skeleton = document.createElement("span");
          skeleton.className = "skeleton";
          stateEl.appendChild(skeleton);
        }
        global.setTimeout(function () {
          btn.disabled = false;
          setText(label, "已进入");
          if (stateEl) {
            stateEl.className = "app-card__state is-done";
            setText(stateEl, "已建立应用会话");
          }
          var fresh = SSO.getSession();
          if (fresh) {
            fresh.lastAccessAt = Date.now();
            SSO.setSession(fresh);
          }
          if (lastAccess) setText(lastAccess, SSO.formatTime(Date.now()));
        }, 1200);
      });
    });

    /* 5.3 登出确认条 */
    var logoutBtn = $("[data-logout]");
    var confirmBar = $("[data-confirm-bar]");
    var confirmYes = $("[data-confirm-yes]");
    var confirmNo = $("[data-confirm-no]");

    if (logoutBtn && confirmBar) {
      logoutBtn.addEventListener("click", function () {
        confirmBar.hidden = false;
        if (confirmYes) confirmYes.focus();
      });
      if (confirmNo) {
        confirmNo.addEventListener("click", function () {
          confirmBar.hidden = true;
          logoutBtn.focus();
        });
      }
      if (confirmYes) {
        confirmYes.addEventListener("click", function () {
          SSO.logout();
          SSO.redirectToLogin("app.html", false, true);
        });
      }
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !confirmBar.hidden) {
          confirmBar.hidden = true;
          logoutBtn.focus();
        }
      });
    }
  }

  /* ---------- 6. 提示页 ---------- */

  /**
   * 提示页：前往登录并携带 redirect
   */
  function initDeniedPage() {
    var query = SSO.getQuery();
    var redirect =
      query.redirect && SSO.isAllowedRedirect(query.redirect)
        ? query.redirect
        : "app.html";
    var btn = $("[data-denied-login]");
    if (btn) {
      btn.setAttribute(
        "href",
        "login.html?redirect=" + encodeURIComponent(redirect)
      );
    }
  }

  /* ---------- 启动 ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page");

    renderNavSession();

    if (page === "index") initIndexPage();
    if (page === "login") initLoginPage();
    if (page === "accounts") initAccountsPage();
    if (page === "app") initAppPage();
    if (page === "denied") initDeniedPage();
  });
})(window);
