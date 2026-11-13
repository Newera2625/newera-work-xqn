/* ===== 页面通用交互 ===== */
(function () {
  "use strict";

  const auth = window.DemoSSO;

  /**
   * 获取页面元素。
   */
  function getElement(selector, root) {
    return (root || document).querySelector(selector);
  }

  /**
   * 获取全部页面元素。
   */
  function getElements(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  /**
   * 创建状态提示元素。
   */
  function createNotice(title, text) {
    const notice = document.createElement("div");
    notice.className = "notice";
    notice.setAttribute("role", "status");
    notice.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M12 9v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" ' +
      'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<div><span class="notice__title"></span><span class="notice__text"></span></div>';

    getElement(".notice__title", notice).textContent = title;
    getElement(".notice__text", notice).textContent = text;
    return notice;
  }

  /**
   * 首页登录状态区域。
   */
  function initHome() {
    const stateSection = getElement("[data-home-state]");

    if (!stateSection) {
      return;
    }

    const session = auth.getSession();
    const loginLink = getElement("[data-home-login-link]");
    const accountLink = getElement("[data-home-account-link]");
    const stateIcon = getElement("[data-state-icon]");
    const stateTitle = getElement("[data-state-title]");
    const stateText = getElement("[data-state-text]");
    const stateGrid = getElement("[data-state-grid]");

    if (loginLink) {
      loginLink.href = session ? "app.html" : "login.html";
      loginLink.textContent = session ? "进入控制台" : "登录";
    }

    if (accountLink) {
      accountLink.href = session ? "app.html" : "accounts.html";
    }

    if (!session) {
      if (stateTitle) {
        stateTitle.textContent = "当前未登录";
      }
      if (stateText) {
        stateText.textContent = "选择一个演示账号，体验完整单点登录流程。";
      }
      if (stateIcon) {
        stateIcon.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-8 11a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z" ' +
          'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      }
      return;
    }

    const remaining = Math.max(0, session.expiresAt - Date.now());

    if (stateTitle) {
      stateTitle.textContent = "你已安全登录";
    }
    if (stateText) {
      stateText.textContent = "统一会话已经建立，可以直接访问所有已接入应用。";
    }
    if (stateIcon) {
      stateIcon.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="m9 12 2 2 4-4m7 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" ' +
        'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    if (stateGrid) {
      stateGrid.innerHTML =
        '<div class="state-item"><span class="state-item__label">当前用户</span>' +
        '<span class="state-item__value"></span></div>' +
        '<div class="state-item"><span class="state-item__label">登录时间</span>' +
        '<span class="state-item__value"></span></div>' +
        '<div class="state-item"><span class="state-item__label">剩余有效时间</span>' +
        '<span class="state-item__value"></span></div>';

      getElement(".state-item__value", stateGrid).textContent = session.name;
      getElements(".state-item__value", stateGrid)[1].textContent = auth.formatDateTime(session.issuedAt);
      getElements(".state-item__value", stateGrid)[2].textContent = auth.formatRemaining(remaining);
    }
  }

  /**
   * 登录页状态提示与表单交互。
   */
  function initLogin() {
    const form = getElement("[data-login-form]");

    if (!form) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const noticeSlot = getElement("[data-login-notices]");
    const emailInput = getElement("#email");
    const passwordInput = getElement("#password");
    const rememberInput = getElement("#remember");
    const passwordToggle = getElement("[data-password-toggle]");
    const submitButton = getElement("[data-login-submit]");
    const errorBox = getElement("[data-login-error]");
    const errorText = getElement("[data-login-error-text]");

    if (noticeSlot) {
      if (params.get("logout") === "1") {
        noticeSlot.appendChild(createNotice("已安全退出", "你已退出当前单点登录会话。"));
      }

      if (params.get("expired") === "1") {
        noticeSlot.appendChild(createNotice("登录状态已过期", "请重新登录后继续访问受保护应用。"));
      }

      const redirect = auth.getSafeRedirect(params.get("redirect"));

      if (redirect) {
        const redirectName = redirect === "app.html" ? "应用控制台" : "首页";
        noticeSlot.appendChild(createNotice("登录后将返回", redirectName));
      }
    }

    function setFieldError(input, invalid) {
      if (!input) {
        return;
      }

      input.classList.toggle("input--error", invalid);
      input.setAttribute("aria-invalid", String(invalid));
    }

    function clearErrors() {
      setFieldError(emailInput, false);
      setFieldError(passwordInput, false);
      if (errorBox) {
        errorBox.hidden = true;
      }
      if (errorText) {
        errorText.textContent = "";
      }
    }

    function showError(message) {
      if (errorText) {
        errorText.textContent = message;
      }
      if (errorBox) {
        errorBox.hidden = false;
      }
    }

    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener("click", function () {
        const isVisible = passwordInput.type === "text";

        passwordInput.type = isVisible ? "password" : "text";
        passwordToggle.setAttribute("aria-label", isVisible ? "显示密码" : "隐藏密码");
        passwordToggle.setAttribute("aria-pressed", String(!isVisible));
        passwordInput.focus();
      });
    }

    getElements("[data-fill-account]").forEach(function (button) {
      button.addEventListener("click", function () {
        const account = auth.ACCOUNTS.find(function (item) {
          return item.email === button.getAttribute("data-fill-account");
        });

        if (!account) {
          return;
        }

        if (emailInput) {
          emailInput.value = account.email;
        }
        if (passwordInput) {
          passwordInput.value = account.password;
        }
        clearErrors();
        emailInput.focus();
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors();

      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      setFieldError(emailInput, !emailValid);
      setFieldError(passwordInput, !password);

      if (!emailValid) {
        showError("请输入有效的邮箱地址");
        if (emailInput) {
          emailInput.focus();
        }
        return;
      }

      if (!password) {
        showError("请输入密码");
        if (passwordInput) {
          passwordInput.focus();
        }
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute("aria-busy", "true");
        submitButton.innerHTML =
          '<span class="loading-dots" aria-hidden="true"><span></span><span></span><span></span></span>' +
          '<span>登录中</span>';
      }

      window.setTimeout(function () {
        const result = auth.login(email, password, rememberInput ? rememberInput.checked : false);

        if (!result.ok) {
          showError(result.message);
          setFieldError(emailInput, true);
          setFieldError(passwordInput, true);

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.removeAttribute("aria-busy");
            submitButton.textContent = "登录";
          }
          return;
        }

        const redirect = auth.getRedirectFromLocation();
        window.location.href = redirect || "app.html";
      }, 600);
    });
  }

  /**
   * 身份选择页。
   */
  function initAccounts() {
    const cards = getElements("[data-account-email]");

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        const email = card.getAttribute("data-account-email");
        const account = auth.ACCOUNTS.find(function (item) {
          return item.email === email;
        });

        if (!account) {
          return;
        }

        card.setAttribute("aria-busy", "true");
        card.disabled = true;

        const result = auth.login(account.email, account.password, true);

        if (!result.ok) {
          card.removeAttribute("aria-busy");
          card.disabled = false;
          return;
        }

        window.setTimeout(function () {
          window.location.href = "app.html";
        }, 180);
      });
    });
  }

  /**
   * 受保护资源页守卫及交互。
   */
  function initProtectedApp() {
    const appRoot = getElement("[data-protected-app]");

    if (!appRoot) {
      return;
    }

    const currentRedirect = window.location.pathname.split("/").pop() || "app.html";
    const session = auth.getSession();

    if (!session) {
      const params = new URLSearchParams();
      params.set("redirect", currentRedirect);

      if (currentRedirect === "app.html") {
        window.location.replace("login.html?expired=1&redirect=app.html");
      } else {
        window.location.replace("login.html?" + params.toString());
      }
      return;
    }

    const userName = getElement("[data-user-name]");
    const userRole = getElement("[data-user-role]");
    const userInitial = getElement("[data-user-initial]");
    const sessionToken = getElement("[data-session-token]");
    const sessionIssuedAt = getElement("[data-session-issued-at]");
    const sessionRemaining = getElement("[data-session-remaining]");
    const sessionIssuer = getElement("[data-session-issuer]");
    const remainingBadge = getElement("[data-remaining-badge]");
    const logoutButton = getElement("[data-logout-button]");
    const logoutConfirm = getElement("[data-logout-confirm]");
    const logoutCancel = getElement("[data-logout-cancel]");
    const logoutConfirmButton = getElement("[data-logout-confirm-button]");

    function setUserText(element, value) {
      if (element) {
        element.textContent = value;
      }
    }

    setUserText(userName, session.name);
    setUserText(userRole, session.role);
    setUserText(userInitial, session.name ? session.name.charAt(0).toUpperCase() : "U");
    setUserText(sessionToken, session.token);
    setUserText(sessionIssuedAt, auth.formatDateTime(session.issuedAt));
    setUserText(sessionIssuer, session.issuer);

    function updateRemaining() {
      const activeSession = auth.getSession();

      if (!activeSession) {
        window.location.replace("login.html?expired=1&redirect=app.html");
        return;
      }

      const remaining = Math.max(0, activeSession.expiresAt - Date.now());
      const isExpiring = remaining < 5 * 60 * 1000;

      setUserText(sessionRemaining, auth.formatRemaining(remaining));

      if (remainingBadge) {
        remainingBadge.hidden = !isExpiring;
        remainingBadge.textContent = "即将过期";
      }

      if (sessionRemaining) {
        sessionRemaining.style.color = isExpiring ? "var(--color-warning)" : "";
      }
    }

    updateRemaining();
    window.setInterval(updateRemaining, 1000);

    if (logoutButton && logoutConfirm) {
      logoutButton.addEventListener("click", function () {
        logoutConfirm.classList.add("is-visible");
        logoutConfirm.setAttribute("aria-hidden", "false");
        if (logoutCancel) {
          logoutCancel.focus();
        }
      });
    }

    if (logoutCancel && logoutConfirm) {
      logoutCancel.addEventListener("click", function () {
        logoutConfirm.classList.remove("is-visible");
        logoutConfirm.setAttribute("aria-hidden", "true");
        if (logoutButton) {
          logoutButton.focus();
        }
      });
    }

    if (logoutConfirmButton) {
      logoutConfirmButton.addEventListener("click", function () {
        logoutConfirmButton.disabled = true;
        logoutConfirmButton.textContent = "正在退出";
        auth.logout(true);
      });
    }

    getElements("[data-open-app]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (button.disabled) {
          return;
        }

        const originalText = button.getAttribute("data-label") || "打开";
        button.disabled = true;
        button.setAttribute("aria-busy", "true");
        button.innerHTML =
          '<span class="loading-dots" aria-hidden="true"><span></span><span></span><span></span></span>' +
          '<span>正在进入</span>';

        window.setTimeout(function () {
          auth.touchSession();
          button.disabled = false;
          button.removeAttribute("aria-busy");
          button.textContent = "已进入";
          button.classList.add("button--secondary");

          const appName = button.getAttribute("data-app-name") || "应用";
          const status = getElement('[data-app-status="' + appName + '"]');

          if (status) {
            status.textContent = "访问于 " + auth.formatDateTime(Date.now());
          }
        }, 1200);
      });
    });
  }

  /**
   * 提示页回跳地址。
   */
  function initDenied() {
    const loginLink = getElement("[data-denied-login]");

    if (loginLink) {
      const currentRedirect = window.location.pathname.split("/").pop() || "app.html";
      const safeRedirect = auth.getSafeRedirect(currentRedirect);
      loginLink.href = "login.html?redirect=" + encodeURIComponent(safeRedirect || "app.html");
    }
  }

  /**
   * 页面初始化。
   */
  function init() {
    initHome();
    initLogin();
    initAccounts();
    initProtectedApp();
    initDenied();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
