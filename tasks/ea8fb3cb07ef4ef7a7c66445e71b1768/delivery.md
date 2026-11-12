# 交付结果



## UI-设计师

# SSO 统一身份认证登录模块 —— UI 设计交付

已按 F14 文件命名重新整理交付，并修复 Tab 指示条与移动端键盘适配问题。

## 文件清单

```text
.
├── index.html
├── styles.css
├── app.html
├── 401.html
├── 403.html
└── 404.html
```

实现说明：

- `index.html` 为统一登录入口，包含账号密码、短信验证码、扫码登录三种状态。
- `styles.css` 与正式前端共用，使用统一设计变量。
- Tab 指示条由 JavaScript 根据选中项设置 `transform: translateX()`，不再硬编码位置。
- 移动端使用 `100dvh`、`env(safe-area-inset-bottom)`，输入框聚焦后自动滚动到可见区域。
- `app.html` 为受保护工作台设计稿。
- `401.html`、`403.html`、`404.html` 为统一异常页设计稿。
- 原 `design/` 下的拆分设计稿不再作为 F14 主交付入口。

---

```html file=index.html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="description" content="企业统一身份认证登录">
  <title>登录 - 统一身份认证</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="login-shell">
    <section class="brand-panel" aria-labelledby="brand-title">
      <div class="brand-content">
        <div class="brand-mark brand-mark--large" aria-hidden="true">
          <svg viewBox="0 0 64 64" role="img">
            <rect x="10" y="10" width="44" height="44" rx="13" fill="currentColor" opacity=".18"></rect>
            <path d="M20 33.5 29 42 45 24" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <p class="brand-product">NewEra 统一身份认证</p>
        <h1 id="brand-title">一个账号，安全访问企业全部服务</h1>
        <p class="brand-lead">统一管理身份、权限与访问体验，让每一次连接都更简单、更可靠。</p>
        <ul class="feature-list">
          <li>
            <span class="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20">
                <path d="M10 2.5 16 5v4.4c0 3.8-2.5 6.7-6 8.1-3.5-1.4-6-4.3-6-8.1V5l6-2.5Z"></path>
                <path d="m7.2 10 1.8 1.8 3.8-4"></path>
              </svg>
            </span>
            <span>
              <strong>统一安全认证</strong>
              <small>一次认证，安全访问多个业务系统</small>
            </span>
          </li>
          <li>
            <span class="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20">
                <rect x="3" y="8" width="14" height="9" rx="2"></rect>
                <path d="M6.5 8V6a3.5 3.5 0 0 1 7 0v2"></path>
                <path d="M10 11v3"></path>
              </svg>
            </span>
            <span>
              <strong>细粒度权限</strong>
              <small>基于角色与资源策略保护关键数据</small>
            </span>
          </li>
          <li>
            <span class="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="7"></circle>
                <path d="M10 6v4l2.7 1.7"></path>
              </svg>
            </span>
            <span>
              <strong>全程可追溯</strong>
              <small>记录关键登录与访问事件，便于审计</small>
            </span>
          </li>
        </ul>
      </div>
      <p class="brand-footer">NewEra Identity Platform</p>
    </section>

    <section class="form-panel" aria-label="登录区域">
      <div class="login-card">
        <div id="page-alert" class="alert" role="status" aria-live="polite" hidden>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="8"></circle>
            <path d="M10 9v5M10 6.2v.1"></path>
          </svg>
          <span id="page-alert-text"></span>
        </div>

        <header class="card-heading">
          <h2>登录</h2>
          <p>使用企业统一身份继续</p>
        </header>

        <div class="login-tabs" role="tablist" aria-label="登录方式">
          <button class="tab is-active" id="tab-password" type="button" role="tab" aria-selected="true" aria-controls="panel-password" data-tab-index="0">
            账号密码
          </button>
          <button class="tab" id="tab-sms" type="button" role="tab" aria-selected="false" aria-controls="panel-sms" data-tab-index="1" tabindex="-1">
            短信验证码
          </button>
          <button class="tab" id="tab-qr" type="button" role="tab" aria-selected="false" aria-controls="panel-qr" data-tab-index="2" tabindex="-1">
            扫码登录
          </button>
          <span class="tab-indicator" id="tab-indicator" aria-hidden="true"></span>
        </div>

        <section id="panel-password" class="tab-panel is-active" role="tabpanel" aria-labelledby="tab-password">
          <form class="login-form" id="password-form" novalidate>
            <div class="field">
              <label for="password-account">账号</label>
              <div class="input-wrap">
                <span class="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <circle cx="10" cy="6" r="3"></circle>
                    <path d="M4.5 16c.7-3 2.5-4.5 5.5-4.5s4.8 1.5 5.5 4.5"></path>
                  </svg>
                </span>
                <input id="password-account" name="account" type="text" autocomplete="username" placeholder="请输入邮箱或用户名" aria-describedby="password-account-message">
              </div>
              <p class="field-message" id="password-account-message" aria-live="polite"></p>
            </div>

            <div class="field">
              <label for="password-secret">密码</label>
              <div class="input-wrap">
                <span class="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <rect x="3" y="8" width="14" height="9" rx="2"></rect>
                    <path d="M6.5 8V6a3.5 3.5 0 0 1 7 0v2"></path>
                  </svg>
                </span>
                <input id="password-secret" name="password" type="password" autocomplete="current-password" placeholder="请输入密码" aria-describedby="password-secret-message">
                <button class="icon-button" id="password-visibility" type="button" aria-label="显示密码" aria-pressed="false">
                  <svg class="eye-open" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2.5 10s2.7-4.5 7.5-4.5 7.5 4.5 7.5 4.5-2.7 4.5-7.5 4.5S2.5 10 2.5 10Z"></path>
                    <circle cx="10" cy="10" r="2"></circle>
                  </svg>
                  <svg class="eye-closed" viewBox="0 0 20 20" aria-hidden="true" hidden>
                    <path d="m3 3 14 14"></path>
                    <path d="M8.3 5.7A8 8 0 0 1 10 5.5c4.8 0 7.5 4.5 7.5 4.5a13 13 0 0 1-2.1 2.7M12.3 14.3c-.7.2-1.5.2-2.3.2-4.8 0-7.5-4.5-7.5-4.5a12 12 0 0 1 2.6-3"></path>
                  </svg>
                </button>
              </div>
              <p class="field-message" id="password-secret-message" aria-live="polite"></p>
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input id="remember-account" type="checkbox">
                <span class="checkbox" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <path d="m4.5 10 3.3 3.2 7.7-7.4"></path>
                  </svg>
                </span>
                <span>记住账号</span>
              </label>
              <a class="text-link" href="#">忘记密码</a>
            </div>

            <button class="button button--primary button--full" id="password-submit" type="submit">
              <span class="spinner" aria-hidden="true" hidden></span>
              <span class="button-label">登录</span>
            </button>
          </form>
        </section>

        <section id="panel-sms" class="tab-panel" role="tabpanel" aria-labelledby="tab-sms" hidden>
          <form class="login-form" id="sms-form" novalidate>
            <div class="field">
              <label for="sms-phone">手机号</label>
              <div class="input-wrap">
                <span class="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <rect x="5.5" y="2.5" width="9" height="15" rx="2"></rect>
                    <path d="M8.5 5h3M9 14.5h2"></path>
                  </svg>
                </span>
                <input id="sms-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" maxlength="11" placeholder="请输入 11 位手机号" aria-describedby="sms-phone-message">
              </div>
              <p class="field-message" id="sms-phone-message" aria-live="polite"></p>
            </div>

            <div class="field">
              <label for="sms-code">验证码</label>
              <div class="input-wrap input-wrap--action">
                <span class="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <path d="M5 3h10v4H5zM5 13h10v4H5z"></path>
                    <path d="M7 5h6M7 15h6"></path>
                  </svg>
                </span>
                <input id="sms-code" name="code" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="请输入 6 位验证码" aria-describedby="sms-code-message">
                <button class="input-action" id="send-code" type="button">获取验证码</button>
              </div>
              <p class="field-message" id="sms-code-message" aria-live="polite"></p>
            </div>

            <p class="sms-note">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="8"></circle>
                <path d="M10 9v5M10 6.2v.1"></path>
              </svg>
              <span>验证码将发送至已绑定的企业手机号</span>
            </p>

            <button class="button button--primary button--full" id="sms-submit" type="submit">
              <span class="spinner" aria-hidden="true" hidden></span>
              <span class="button-label">登录</span>
            </button>
          </form>
        </section>

        <section id="panel-qr" class="tab-panel" role="tabpanel" aria-labelledby="tab-qr" hidden>
          <div class="qr-panel" aria-live="polite">
            <div class="qr-state is-active" data-qr-state="waiting">
              <div class="qr-code-wrap">
                <div class="qr-code" aria-label="模拟二维码">
                  <span class="finder finder--tl"></span>
                  <span class="finder finder--tr"></span>
                  <span class="finder finder--bl"></span>
                  <span class="qr-data qr-data--one"></span>
                  <span class="qr-data qr-data--two"></span>
                  <span class="qr-data qr-data--three"></span>
                  <span class="qr-center">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <rect x="4" y="7" width="12" height="9" rx="2"></rect>
                      <path d="M7 7V5.5a2.5 2.5 0 0 1 5 0V7M8 11h4"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <h3>请使用企业移动端扫码</h3>
              <p>打开移动端扫描二维码，确认登录</p>
              <small>二维码将在 <span id="qr-countdown">60</span> 秒后失效</small>
              <div class="qr-actions qr-actions--below">
                <button class="text-button" id="refresh-qr" type="button">刷新二维码</button>
                <span aria-hidden="true"></span>
                <button class="text-button text-button--muted" id="switch-account" type="button">切换账号</button>
              </div>
            </div>

            <div class="qr-state" data-qr-state="scanned" hidden>
              <div class="qr-code-wrap qr-code-wrap--active">
                <div class="qr-code" aria-label="模拟二维码">
                  <span class="finder finder--tl"></span>
                  <span class="finder finder--tr"></span>
                  <span class="finder finder--bl"></span>
                  <span class="qr-data qr-data--one"></span>
                  <span class="qr-data qr-data--two"></span>
                  <span class="qr-data qr-data--three"></span>
                  <span class="qr-center">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <rect x="4" y="7" width="12" height="9" rx="2"></rect>
                      <path d="M7 7V5.5a2.5 2.5 0 0 1 5 0V7M8 11h4"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <h3>扫描成功，等待确认</h3>
              <p>请在移动端确认本次登录</p>
              <small>确认后将在当前设备自动登录</small>
              <div class="qr-actions qr-actions--below">
                <button class="text-button" id="refresh-qr-scanned" type="button">刷新二维码</button>
                <span aria-hidden="true"></span>
                <button class="text-button text-button--muted" id="switch-account-scanned" type="button">切换账号</button>
              </div>
            </div>

            <div class="qr-state" data-qr-state="success" hidden>
              <div class="qr-success-mark" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <path d="m4.5 10 3.2 3.2 7.8-7.5"></path>
                </svg>
              </div>
              <h3>确认成功</h3>
              <p>正在进入工作台</p>
            </div>
          </div>
        </section>

        <div class="divider" id="social-divider">其他登录方式</div>
        <div class="social-actions" id="social-actions">
          <button class="social-button" type="button" aria-label="企业通讯录登录" title="企业通讯录登录">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="6" r="3"></circle>
              <path d="M4.5 16c.7-3 2.5-4.5 5.5-4.5s4.8 1.5 5.5 4.5"></path>
            </svg>
          </button>
          <button class="social-button" type="button" aria-label="企业邮箱登录" title="企业邮箱登录">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <rect x="2.5" y="4" width="15" height="12" rx="2"></rect>
              <path d="m3 5 7 5 7-5"></path>
            </svg>
          </button>
          <button class="social-button" type="button" aria-label="安全令牌登录" title="安全令牌登录">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6 7V5a4 4 0 0 1 8 0v2"></path>
              <rect x="4" y="7" width="12" height="10" rx="2"></rect>
              <path d="M10 10v4M8 12h4"></path>
            </svg>
          </button>
        </div>

        <div class="agreement">
          <label class="checkbox-label checkbox-label--agreement">
            <input id="agreement" type="checkbox">
            <span class="checkbox" aria-hidden="true">
              <svg viewBox="0 0 20 20">
                <path d="m4.5 10 3.3 3.2 7.7-7.4"></path>
              </svg>
            </span>
            <span>我已阅读并同意<a href="#">《服务条款》</a><a href="#">《隐私政策》</a></span>
          </label>
          <p class="agreement-message" id="agreement-message" aria-live="polite"></p>
        </div>
      </div>
    </section>
  </main>

  <script>
    (() => {
      const tabs = [...document.querySelectorAll('[role="tab"]')];
      const panels = [...document.querySelectorAll('[role="tabpanel"]')];
      const indicator = document.getElementById('tab-indicator');
      const pageAlert = document.getElementById('page-alert');
      const pageAlertText = document.getElementById('page-alert-text');
      const agreement = document.getElementById('agreement');
      const agreementMessage = document.getElementById('agreement-message');

      function moveIndicator(index, immediate = false) {
        indicator.style.transition = immediate ? 'none' : '';
        indicator.style.transform = `translateX(${index * 100}%)`;
        if (immediate) {
          requestAnimationFrame(() => {
            indicator.style.transition = '';
          });
        }
      }

      function selectTab(index, focus = false) {
        tabs.forEach((tab, tabIndex) => {
          const active = tabIndex === index;
          tab.classList.toggle('is-active', active);
          tab.setAttribute('aria-selected', String(active));
          tab.tabIndex = active ? 0 : -1;
        });

        panels.forEach((panel, panelIndex) => {
          const active = panelIndex === index;
          panel.hidden = !active;
          panel.classList.toggle('is-active', active);
        });

        moveIndicator(index);
        if (focus) tabs[index].focus();
        clearMessages();
      }

      function clearMessages() {
        pageAlert.hidden = true;
        pageAlert.className = 'alert';
        pageAlertText.textContent = '';
        agreementMessage.textContent = '';
        document.querySelectorAll('.field-message').forEach(message => {
          message.textContent = '';
        });
        document.querySelectorAll('.input-wrap').forEach(input => {
          input.classList.remove('is-error');
        });
      }

      function showAlert(message, type = 'info') {
        pageAlert.hidden = false;
        pageAlert.className = `alert alert--${type}`;
        pageAlertText.textContent = message;
      }

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectTab(index));
        tab.addEventListener('keydown', event => {
          let nextIndex = index;
          if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
          if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
          if (event.key === 'Home') nextIndex = 0;
          if (event.key === 'End') nextIndex = tabs.length - 1;
          if (nextIndex !== index) {
            event.preventDefault();
            selectTab(nextIndex, true);
          }
        });
      });

      moveIndicator(0, true);

      const redirect = new URLSearchParams(location.search).get('redirect');
      if (redirect) {
        showAlert('登录后将继续访问原请求页面。');
      }

      const rememberedAccount = localStorage.getItem('sso-remembered-account');
      const rememberAccount = document.getElementById('remember-account');
      if (rememberedAccount) {
        document.getElementById('password-account').value = rememberedAccount;
        rememberAccount.checked = true;
      }

      rememberAccount.addEventListener('change', () => {
        if (rememberAccount.checked) {
          const account = document.getElementById('password-account').value.trim();
          if (account) localStorage.setItem('sso-remembered-account', account);
        } else {
          localStorage.removeItem('sso-remembered-account');
        }
      });

      document.getElementById('password-account').addEventListener('change', () => {
        if (rememberAccount.checked) {
          localStorage.setItem('sso-remembered-account', document.getElementById('password-account').value.trim());
        }
      });

      const passwordInput = document.getElementById('password-secret');
      const visibilityButton = document.getElementById('password-visibility');
      visibilityButton.addEventListener('click', () => {
        const visible = passwordInput.type === 'text';
        passwordInput.type = visible ? 'password' : 'text';
        visibilityButton.setAttribute('aria-label', visible ? '显示密码' : '隐藏密码');
        visibilityButton.setAttribute('aria-pressed', String(!visible));
        visibilityButton.querySelector('.eye-open').hidden = !visible;
        visibilityButton.querySelector('.eye-closed').hidden = visible;
        passwordInput.focus();
      });

      function validateAgreement() {
        if (!agreement.checked) {
          agreementMessage.textContent = '请先阅读并同意服务条款与隐私政策';
          return false;
        }
        agreementMessage.textContent = '';
        return true;
      }

      agreement.addEventListener('change', () => {
        if (agreement.checked) agreementMessage.textContent = '';
      });

      function setLoading(button, loading, label) {
        const spinner = button.querySelector('.spinner');
        const buttonLabel = button.querySelector('.button-label');
        button.disabled = loading;
        spinner.hidden = !loading;
        buttonLabel.textContent = loading ? label : button.dataset.idleLabel || buttonLabel.textContent;
        if (!button.dataset.idleLabel) button.dataset.idleLabel = buttonLabel.textContent;
      }

      document.getElementById('password-form').addEventListener('submit', event => {
        event.preventDefault();
        if (!validateAgreement()) return;

        const account = document.getElementById('password-account').value.trim();
        const secret = passwordInput.value;

        if (!account) {
          document.getElementById('password-account-message').textContent = '请输入账号';
          return;
        }
        if (secret.length < 6) {
          document.getElementById('password-secret-message').textContent = '密码至少为 6 位';
          return;
        }

        const button = document.getElementById('password-submit');
        setLoading(button, true, '正在登录');
        window.setTimeout(() => {
          setLoading(button, false);
          if (secret.toLowerCase() === 'wrong') {
            showAlert('密码错误，请重新输入', 'error');
            document.getElementById('password-secret-message').textContent = '密码错误';
            passwordInput.value = '';
            passwordInput.focus();
            return;
          }
          showAlert('登录成功，正在进入工作台', 'success');
          if (rememberAccount.checked) localStorage.setItem('sso-remembered-account', account);
          window.setTimeout(() => {
            location.href = redirect || 'app.html';
          }, 600);
        }, 700);
      });

      const sendCodeButton = document.getElementById('send-code');
      let codeTimer = null;
      let codeSeconds = 60;

      sendCodeButton.addEventListener('click', () => {
        const phone = document.getElementById('sms-phone').value.trim();
        if (!/^1\d{10}$/.test(phone)) {
          document.getElementById('sms-phone-message').textContent = '请输入正确的 11 位手机号';
          return;
        }
        document.getElementById('sms-phone-message').textContent = '';
        codeSeconds = 60;
        sendCodeButton.disabled = true;
        sendCodeButton.textContent = '60s 后重试';
        showAlert('验证码已发送，请注意查收', 'success');

        codeTimer = window.setInterval(() => {
          codeSeconds -= 1;
          sendCodeButton.textContent = `${codeSeconds}s 后重试`;
          if (codeSeconds <= 0) {
            window.clearInterval(codeTimer);
            sendCodeButton.disabled = false;
            sendCodeButton.textContent = '获取验证码';
          }
        }, 1000);
      });

      document.getElementById('sms-form').addEventListener('submit', event => {
        event.preventDefault();
        if (!validateAgreement()) return;

        const phone = document.getElementById('sms-phone').value.trim();
        const code = document.getElementById('sms-code').value.trim();

        if (!/^1\d{10}$/.test(phone)) {
          document.getElementById('sms-phone-message').textContent = '请输入正确的 11 位手机号';
          return;
        }
        if (!/^\d{6}$/.test(code)) {
          document.getElementById('sms-code-message').textContent = '请输入 6 位验证码';
          return;
        }

        const button = document.getElementById('sms-submit');
        setLoading(button, true, '正在登录');
        window.setTimeout(() => {
          setLoading(button, false);
          if (code !== '123456') {
            showAlert('验证码错误或已过期', 'error');
            document.getElementById('sms-code-message').textContent = '验证码错误或已过期';
            return;
          }
          showAlert('登录成功，正在进入工作台', 'success');
          window.setTimeout(() => {
            location.href = redirect || 'app.html';
          }, 600);
        }, 700);
      });

      const qrStates = [...document.querySelectorAll('[data-qr-state]')];
      const qrCountdown = document.getElementById('qr-countdown');
      let qrTimer = null;
      let qrSeconds = 60;

      function setQrState(state) {
        qrStates.forEach(element => {
          const active = element.dataset.qrState === state;
          element.hidden = !active;
          element.classList.toggle('is-active', active);
        });
      }

      function resetQr() {
        window.clearInterval(qrTimer);
        qrSeconds = 60;
        qrCountdown.textContent = '60';
        setQrState('waiting');
        qrTimer = window.setInterval(() => {
          qrSeconds -= 1;
          qrCountdown.textContent = String(qrSeconds);
          if (qrSeconds <= 0) {
            window.clearInterval(qrTimer);
            showAlert('二维码已失效，请刷新后重试', 'error');
          }
        }, 1000);

        window.setTimeout(() => {
          if (qrSeconds > 0) setQrState('scanned');
        }, 3000);
      }

      document.getElementById('refresh-qr').addEventListener('click', resetQr);
      document.getElementById('refresh-qr-scanned').addEventListener('click', resetQr);
      document.getElementById('switch-account').addEventListener('click', () => selectTab(0));
      document.getElementById('switch-account-scanned').addEventListener('click', () => selectTab(0));

      document.querySelectorAll('.social-button').forEach(button => {
        button.addEventListener('click', () => {
          showAlert('该登录方式将在企业身份服务接入后开放。');
        });
      });

      document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => {
          window.requestAnimationFrame(() => {
            input.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          });
        });
      });
    })();
  </script>
</body>
</html>
```

```css file=styles.css
:root {
  --color-primary: #1f5eff;
  --color-primary-hover: #1a51e0;
  --color-primary-active: #1645bd;
  --color-primary-subtle: #edf3ff;
  --color-primary-border: #a9c2ff;
  --color-primary-contrast: #ffffff;
  --color-primary-deep: #0b2f8f;

  --color-bg: #f5f7fa;
  --color-surface: #ffffff;
  --color-surface-alt: #f8fafc;
  --color-border: #e3e8ef;
  --color-border-strong: #cdd5df;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-tertiary: #94a3b8;
  --color-text-inverse: #ffffff;

  --color-success: #0f7a4d;
  --color-success-subtle: #e8f5ee;
  --color-success-border: #b8dfcc;
  --color-danger: #c0392b;
  --color-danger-subtle: #fdeceb;
  --color-danger-border: #efb8b2;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  --radius-input: 8px;
  --radius-button: 8px;
  --radius-card: 12px;
  --radius-pill: 999px;

  --shadow-card: 0 8px 24px rgba(15, 23, 42, .08);
  --shadow-overlay: 0 16px 48px rgba(15, 23, 42, .16);

  --fs-xs: 12px;
  --fs-sm: 13px;
  --fs-base: 14px;
  --fs-md: 16px;
  --fs-lg: 20px;
  --fs-xl: 28px;
  --fs-2xl: 32px;

  --font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  --duration-fast: 120ms;
  --duration-base: 180ms;
  --ease: cubic-bezier(.2, .8, .2, 1);
  --safe-area-bottom: env(safe-area-inset-bottom, 0px);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  color-scheme: light;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  color: var(--color-text-primary);
  background: var(--color-bg);
  font-family: var(--font-family);
  font-size: var(--fs-base);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

button,
input {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  color: var(--color-primary-hover);
}

svg {
  display: block;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2,
h3 {
  line-height: 1.3;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

::selection {
  color: var(--color-primary-contrast);
  background: var(--color-primary);
}

[hidden] {
  display: none !important;
}

.login-shell {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 1fr);
}

.brand-panel {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: var(--space-8);
  color: var(--color-text-inverse);
  background: linear-gradient(
    160deg,
    var(--color-primary) 0%,
    var(--color-primary-deep) 100%
  );
}

.brand-panel::after {
  content: "";
  position: absolute;
  width: 420px;
  height: 420px;
  right: -180px;
  bottom: -210px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 50%;
  box-shadow:
    0 0 0 64px rgba(255, 255, 255, .04),
    0 0 0 128px rgba(255, 255, 255, .025);
  pointer-events: none;
}

.brand-content {
  position: relative;
  z-index: 1;
  max-width: 540px;
}

.brand-mark {
  display: grid;
  place-items: center;
  color: currentColor;
}

.brand-mark--large {
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-6);
}

.brand-mark--large svg {
  width: 64px;
  height: 64px;
}

.brand-product {
  margin-bottom: var(--space-3);
  font-size: var(--fs-md);
  font-weight: 600;
}

.brand-panel h1 {
  max-width: 12em;
  margin-bottom: var(--space-4);
  font-size: var(--fs-2xl);
  font-weight: 650;
  letter-spacing: .2px;
}

.brand-lead {
  max-width: 24ch;
  margin-bottom: var(--space-8);
  color: rgba(255, 255, 255, .82);
  font-size: var(--fs-md);
}

.feature-list {
  display: grid;
  gap: var(--space-5);
  padding: 0;
  margin: 0;
  list-style: none;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.feature-list strong,
.feature-list small {
  display: block;
}

.feature-list strong {
  margin-bottom: var(--space-1);
  font-size: var(--fs-md);
  font-weight: 600;
}

.feature-list small {
  color: rgba(255, 255, 255, .72);
  font-size: var(--fs-sm);
}

.feature-icon {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-input);
  background: rgba(255, 255, 255, .14);
}

.feature-icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.brand-footer {
  position: relative;
  z-index: 1;
  margin: 0;
  color: rgba(255, 255, 255, .60);
  font-size: var(--fs-xs);
}

.form-panel {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: var(--space-8) var(--space-6);
}

.login-card {
  width: min(100%, 420px);
  padding: var(--space-7) var(--space-7) var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.card-heading {
  margin-bottom: var(--space-5);
}

.card-heading h2 {
  margin-bottom: var(--space-2);
  font-size: var(--fs-xl);
  font-weight: 600;
}

.card-heading p {
  margin: 0;
  color: var(--color-text-secondary);
}

.alert {
  min-height: 44px;
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-input);
  color: var(--color-text-secondary);
  background: var(--color-surface-alt);
  font-size: var(--fs-sm);
}

.alert svg {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.alert--success {
  border-color: var(--color-success-border);
  color: var(--color-success);
  background: var(--color-success-subtle);
}

.alert--error {
  border-color: var(--color-danger-border);
  color: var(--color-danger);
  background: var(--color-danger-subtle);
}

.alert--info {
  border-color: var(--color-primary-border);
  color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.login-tabs {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.tab {
  height: 44px;
  padding: 0 var(--space-2);
  border: 0;
  color: var(--color-text-secondary);
  background: transparent;
  font-size: var(--fs-base);
  transition: color var(--duration-fast) var(--ease);
}

.tab:hover {
  color: var(--color-text-primary);
}

.tab.is-active {
  color: var(--color-primary);
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 33.333%;
  height: 2px;
  background: var(--color-primary);
  transform: translateX(0);
  transition: transform var(--duration-base) var(--ease);
  will-change: transform;
}

.tab-panel {
  min-width: 0;
}

.login-form {
  display: grid;
  gap: var(--space-4);
}

.field {
  min-width: 0;
}

.field label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--fs-base);
  font-weight: 600;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-input);
  background: var(--color-surface);
  transition:
    border-color var(--duration-fast) var(--ease),
    box-shadow var(--duration-fast) var(--ease),
    background-color var(--duration-fast) var(--ease);
}

.input-wrap:hover {
  border-color: var(--color-border-strong);
}

.input-wrap:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.input-wrap.is-error {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 3px var(--color-danger-subtle);
}

.input-icon {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  margin-left: var(--space-3);
  color: var(--color-text-tertiary);
}

.input-icon svg,
.icon-button svg,
.social-button svg,
.user-menu svg,
.feature-card__icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.input-wrap input {
  min-width: 0;
  flex: 1;
  height: 100%;
  padding: 0 var(--space-3);
  border: 0;
  outline: 0;
  color: var(--color-text-primary);
  background: transparent;
}

.input-wrap input::placeholder {
  color: var(--color-text-tertiary);
}

.input-wrap input:disabled {
  color: var(--color-text-tertiary);
}

.icon-button {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  margin-right: var(--space-1);
  padding: 0;
  border: 0;
  border-radius: var(--radius-button);
  color: var(--color-text-secondary);
  background: transparent;
  transition:
    color var(--duration-fast) var(--ease),
    background-color var(--duration-fast) var(--ease);
}

.icon-button:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-alt);
}

.icon-button:active {
  background: var(--color-primary-subtle);
}

.field-message {
  min-height: 20px;
  margin: var(--space-1) 0 0;
  color: var(--color-danger);
  font-size: var(--fs-xs);
  line-height: 20px;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.checkbox-label {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 24px;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.checkbox-label input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.checkbox {
  width: 16px;
  height: 16px;
  display: grid;
  flex: 0 0 16px;
  place-items: center;
  border: 1px solid var(--color-border-strong);
  border-radius: 4px;
  background: var(--color-surface);
  transition:
    background-color var(--duration-fast) var(--ease),
    border-color var(--duration-fast) var(--ease);
}

.checkbox svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--color-primary-contrast);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.checkbox-label input:checked + .checkbox {
  border-color: var(--color-primary);
  background: var(--color-primary);
}

.checkbox-label:hover .checkbox {
  border-color: var(--color-primary);
}

.checkbox-label input:focus-visible + .checkbox {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.text-link {
  color: var(--color-primary);
  font-size: var(--fs-base);
}

.text-link:hover {
  text-decoration: underline;
}

.button {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 0 var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-button);
  font-weight: 600;
  transition:
    color var(--duration-fast) var(--ease),
    background-color var(--duration-fast) var(--ease),
    border-color var(--duration-fast) var(--ease),
    box-shadow var(--duration-fast) var(--ease),
    transform var(--duration-fast) var(--ease);
}

.button--primary {
  color: var(--color-primary-contrast);
  background: var(--color-primary);
}

.button--primary:hover {
  color: var(--color-primary-contrast);
  background: var(--color-primary-hover);
}

.button--primary:active {
  color: var(--color-primary-contrast);
  background: var(--color-primary-active);
  transform: scale(.995);
}

.button--primary:disabled {
  color: rgba(255, 255, 255, .60);
  background: var(--color-border-strong);
}

.button--secondary {
  border-color: var(--color-border);
  color: var(--color-primary);
  background: var(--color-surface);
}

.button--secondary:hover {
  border-color: var(--color-border-strong);
  background: var(--color-surface-alt);
}

.button--secondary:active {
  border-color: var(--color-primary-border);
  background: var(--color-primary-subtle);
}

.button--secondary:disabled {
  color: var(--color-text-tertiary);
  background: var(--color-surface-alt);
}

.button--full {
  width: 100%;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, .4);
  border-top-color: var(--color-primary-contrast);
  border-radius: 50%;
  animation: spin .8s linear infinite;
}

.divider {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin: var(--space-5) 0 var(--space-4);
  color: var(--color-text-tertiary);
  font-size: var(--fs-xs);
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.social-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
}

.social-button {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-secondary);
  background: var(--color-surface-alt);
  transition:
    color var(--duration-fast) var(--ease),
    background-color var(--duration-fast) var(--ease),
    border-color var(--duration-fast) var(--ease),
    transform var(--duration-fast) var(--ease);
}

.social-button:hover {
  border-color: var(--color-primary-border);
  color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.social-button:active {
  transform: scale(.95);
}

.social-button:disabled {
  color: var(--color-text-tertiary);
  opacity: .65;
}

.agreement {
  margin-top: var(--space-4);
}

.checkbox-label--agreement {
  align-items: flex-start;
  line-height: 20px;
}

.agreement-message {
  min-height: 20px;
  margin: var(--space-1) 0 0 24px;
  color: var(--color-danger);
  font-size: var(--fs-xs);
  line-height: 20px;
}

.sms-note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin-top: calc(var(--space-1) * -1);
  color: var(--color-text-tertiary);
  font-size: var(--fs-xs);
  line-height: 20px;
}

.sms-note svg {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.input-wrap--action {
  padding-right: var(--space-1);
}

.input-action {
  min-width: 96px;
  height: 36px;
  flex: 0 0 auto;
  padding: 0 var(--space-2);
  border: 0;
  border-radius: 6px;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  font-size: var(--fs-xs);
  font-weight: 600;
}

.input-action:hover {
  color: var(--color-primary-hover);
  background: var(--color-border);
}

.input-action:active {
  color: var(--color-primary-active);
  background: var(--color-primary-border);
}

.input-action:disabled {
  color: var(--color-text-tertiary);
  background: var(--color-surface-alt);
}

.qr-panel {
  display: grid;
  gap: var(--space-5);
  justify-items: center;
  min-height: 448px;
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface-alt);
  text-align: center;
}

.qr-state {
  display: grid;
  width: 100%;
  align-content: start;
  justify-items: center;
}

.qr-code-wrap {
  position: relative;
  width: 208px;
  height: 208px;
  display: grid;
  place-items: center;
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.qr-code-wrap--active {
  border-color: var(--color-primary-border);
}

.qr-code {
  position: relative;
  width: 176px;
  height: 176px;
  overflow: hidden;
  background-color: var(--color-surface);
  background-image:
    linear-gradient(90deg, var(--color-text-primary) 12px, transparent 12px),
    linear-gradient(var(--color-text-primary) 12px, transparent 12px);
  background-size: 24px 24px;
  background-position: 0 0, 12px 12px;
  opacity: .88;
}

.finder {
  position: absolute;
  width: 44px;
  height: 44px;
  border: 8px solid var(--color-text-primary);
  background: var(--color-surface);
}

.finder--tl {
  top: 0;
  left: 0;
}

.finder--tr {
  top: 0;
  right: 0;
}

.finder--bl {
  bottom: 0;
  left: 0;
}

.qr-data {
  position: absolute;
  width: 24px;
  height: 24px;
  background: var(--color-text-primary);
}

.qr-data--one {
  top: 52px;
  left: 52px;
}

.qr-data--two {
  top: 76px;
  right: 52px;
}

.qr-data--three {
  bottom: 52px;
  left: 76px;
}

.qr-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 4px solid var(--color-surface);
  border-radius: var(--radius-input);
  color: var(--color-primary-contrast);
  background: var(--color-primary);
  transform: translate(-50%, -50%);
}

.qr-center svg {
  width: 26px;
  height: 26px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.qr-state h3 {
  margin-bottom: var(--space-2);
  font-size: var(--fs-lg);
  font-weight: 600;
}

.qr-state p {
  margin-bottom: var(--space-4);
  color: var(--color-text-secondary);
}

.qr-state small {
  display: block;
  margin-top: var(--space-3);
  color: var(--color-text-tertiary);
  font-size: var(--fs-xs);
}

.qr-actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
}

.qr-actions--below {
  margin-top: var(--space-3);
}

.qr-actions > span {
  width: 1px;
  height: 16px;
  background: var(--color-border);
}

.text-button {
  min-height: 36px;
  padding: var(--space-1);
  border: 0;
  color: var(--color-primary);
  background: transparent;
  font-size: var(--fs-base);
}

.text-button:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.text-button:active {
  color: var(--color-primary-active);
}

.text-button--muted {
  color: var(--color-text-secondary);
}

.text-button--muted:hover {
  color: var(--color-text-primary);
}

.qr-success-mark {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  margin-bottom: var(--space-4);
  border-radius: 50%;
  color: var(--color-success);
  background: var(--color-success-subtle);
}

.qr-success-mark svg {
  width: 36px;
  height: 36px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.app-page {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-bg);
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-7);
  border-bottom: 1px solid var(--color-border);
  background: rgba(255, 255, 255, .92);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.app-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-primary);
  font-weight: 650;
}

.app-brand:hover {
  color: var(--color-primary);
}

.brand-mark--small {
  width: 32px;
  height: 32px;
  color: var(--color-primary);
}

.brand-mark--small svg {
  width: 32px;
  height: 32px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.user-menu-wrap {
  position: relative;
}

.user-trigger {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2);
  border: 1px solid transparent;
  border-radius: var(--radius-button);
  color: var(--color-text-primary);
  background: transparent;
}

.user-trigger:hover {
  border-color: var(--color-border);
  background: var(--color-surface-alt);
}

.user-trigger:active {
  background: var(--color-primary-subtle);
}

.avatar {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.avatar svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.chevron {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.user-menu {
  position: absolute;
  top: calc(100% + var(--space-2));
  right: 0;
  width: 248px;
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-overlay);
}

.user-menu__meta {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3);
}

.user-menu__meta strong {
  font-size: var(--fs-base);
}

.user-menu__meta span {
  overflow-wrap: anywhere;
  color: var(--color-text-secondary);
  font-size: var(--fs-xs);
}

.user-menu__divider {
  height: 1px;
  margin: var(--space-2) 0;
  background: var(--color-border);
}

.user-menu > button {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-3);
  border: 0;
  border-radius: var(--radius-button);
  color: var(--color-text-secondary);
  background: transparent;
  text-align: left;
}

.user-menu > button:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-alt);
}

.user-menu > button:active {
  background: var(--color-primary-subtle);
}

.user-menu > button svg {
  flex: 0 0 20px;
}

.danger-menu-item {
  color: var(--color-danger) !important;
}

.app-main {
  width: min(100% - var(--space-7), 1180px);
  margin: 0 auto;
  padding: var(--space-7) 0;
}

.welcome-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-7);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.welcome-card h1 {
  margin-bottom: var(--space-3);
  font-size: var(--fs-xl);
}

.welcome-card p:last-child {
  max-width: 560px;
  margin-bottom: 0;
  color: var(--color-text-secondary);
}

.welcome-actions {
  display: flex;
  flex: 0 0 auto;
  gap: var(--space-2);
}

.feature-section {
  margin-top: var(--space-6);
}

.section-heading--inline {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

.feature-card {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.feature-card__icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  margin-bottom: var(--space-4);
  border-radius: var(--radius-input);
  color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.feature-card__icon svg {
  width: 28px;
  height: 28px;
}

.feature-card h3 {
  margin-bottom: var(--space-2);
  font-size: var(--fs-md);
}

.feature-card p {
  margin-bottom: var(--space-4);
  color: var(--color-text-secondary);
}

.feature-card .text-link {
  margin-top: auto;
}

.error-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: var(--space-5);
}

.error-card {
  width: min(100%, 520px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-7) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  text-align: center;
}

.error-graphic {
  width: 96px;
  height: 96px;
  display: grid;
  place-items: center;
  margin-bottom: var(--space-4);
  border-radius: 50%;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.error-graphic--danger {
  color: var(--color-danger);
  background: var(--color-danger-subtle);
}

.error-graphic--neutral {
  color: var(--color-text-secondary);
  background: var(--color-surface-alt);
}

.error-graphic svg {
  width: 56px;
  height: 56px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.error-code {
  margin-bottom: var(--space-2);
  color: var(--color-primary);
  font-size: var(--fs-sm);
  font-weight: 700;
  letter-spacing: .08em;
}

.error-card h1 {
  margin-bottom: var(--space-3);
  font-size: var(--fs-xl);
}

.error-card > p:not(.error-code) {
  max-width: 390px;
  margin-bottom: var(--space-5);
  color: var(--color-text-secondary);
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
}

@media (max-width: 1023px) {
  .login-shell {
    grid-template-columns: 1fr;
  }

  .brand-panel {
    min-height: auto;
    padding: var(--space-7);
  }

  .brand-panel h1 {
    font-size: var(--fs-xl);
  }

  .brand-lead {
    margin-bottom: var(--space-6);
  }

  .feature-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
  }

  .feature-list li {
    display: block;
  }

  .feature-icon {
    margin-bottom: var(--space-2);
  }

  .brand-footer {
    display: none;
  }

  .form-panel {
    min-height: auto;
    padding: var(--space-7) var(--space-4);
  }

  .feature-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .login-shell {
    display: block;
  }

  .brand-panel {
    min-height: auto;
    padding: var(--space-5) var(--space-4);
  }

  .brand-panel::after {
    width: 240px;
    height: 240px;
    right: -120px;
    bottom: -140px;
  }

  .brand-content {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: var(--space-3);
  }

  .brand-mark--large {
    width: 44px;
    height: 44px;
    margin: 0;
    grid-row: 1 / 3;
  }

  .brand-mark--large svg {
    width: 44px;
    height: 44px;
  }

  .brand-product {
    margin: 0;
    font-size: var(--fs-base);
  }

  .brand-panel h1 {
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: 500;
  }

  .brand-lead,
  .feature-list,
  .brand-footer {
    display: none;
  }

  .form-panel {
    min-height: 100dvh;
    align-items: start;
    padding: var(--space-4);
    padding-bottom: calc(var(--space-4) + var(--safe-area-bottom));
  }

  .login-card {
    width: 100%;
    padding: var(--space-5) var(--space-4);
  }

  .card-heading {
    margin-bottom: var(--space-4);
  }

  .login-tabs {
    margin-bottom: var(--space-4);
  }

  .tab {
    font-size: var(--fs-sm);
  }

  .qr-panel {
    min-height: 0;
    padding: var(--space-4);
  }

  .qr-code-wrap {
    width: 184px;
    height: 184px;
  }

  .qr-code {
    width: 152px;
    height: 152px;
    background-size: 20px 20px;
  }

  .finder {
    width: 38px;
    height: 38px;
    border-width: 7px;
  }

  .qr-data {
    width: 20px;
    height: 20px;
  }

  .qr-data--one {
    top: 46px;
    left: 46px;
  }

  .qr-data--two {
    top: 66px;
    right: 46px;
  }

  .qr-data--three {
    bottom: 46px;
    left: 66px;
  }

  .qr-center {
    width: 42px;
    height: 42px;
  }

  .app-header {
    padding: var(--space-3) var(--space-4);
  }

  .app-main {
    width: 100%;
    padding: var(--space-4);
    padding-bottom: calc(var(--space-4) + var(--safe-area-bottom));
  }

  .welcome-card {
    align-items: flex-start;
    padding: var(--space-5);
  }

  .welcome-actions {
    flex-direction: column;
  }

  .feature-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 374px) {
  .login-shell {
    display: block;
  }

  .brand-panel {
    display: none;
  }

  .form-panel {
    min-height: 100dvh;
    align-items: start;
    padding: var(--space-3) var(--space-2);
    padding-bottom: calc(var(--space-5) + var(--safe-area-bottom));
  }

  .login-card {
    padding: var(--space-4) var(--space-3);
    border-radius: var(--radius-input);
  }

  .card-heading {
    margin-bottom: var(--space-3);
  }

  .card-heading h2 {
    font-size: var(--fs-lg);
  }

  .login-tabs {
    margin-bottom: var(--space-3);
  }

  .tab {
    height: 44px;
    padding: 0;
    font-size: var(--fs-xs);
  }

  .login-form {
    gap: var(--space-3);
  }

  .field-message,
  .agreement-message {
    font-size: var(--fs-xs);
  }

  .form-options {
    align-items: flex-start;
  }

  .divider {
    margin: var(--space-4) 0 var(--space-3);
  }

  .qr-panel {
    padding: var(--space-3);
  }

  .qr-code-wrap {
    width: 176px;
    height: 176px;
  }

  .qr-code {
    width: 144px;
    height: 144px;
  }

  .qr-state h3 {
    font-size: var(--fs-md);
  }

  .qr-actions {
    gap: var(--space-2);
  }

  .input-action {
    min-width: 84px;
    padding: 0 6px;
  }

  .app-header {
    padding: var(--space-2) var(--space-3);
  }

  .app-main {
    padding: var(--space-3);
    padding-bottom: calc(var(--space-3) + var(--safe-area-bottom));
  }

  .welcome-card {
    display: block;
    padding: var(--space-4);
  }

  .welcome-actions {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: var(--space-4);
  }

  .section-heading--inline {
    display: block;
  }

  .section-heading--inline .text-link {
    display: inline-block;
    margin-top: var(--space-2);
  }

  .feature-card {
    padding: var(--space-4);
  }

  .user-menu {
    right: -2px;
    width: min(248px, calc(100vw - var(--space-4)));
  }

  .error-card {
    padding: var(--space-6) var(--space-3);
  }

  .error-actions {
    width: 100%;
    flex-direction: column;
  }
}

@media (max-width: 319px) {
  body {
    min-width: 288px;
  }

  .form-panel {
    padding-right: 0;
    padding-left: 0;
  }

  .login-card {
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }

  .tab {
    font-size: 11px;
  }

  .input-action {
    min-width: 78px;
  }
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .app-header {
    background: var(--color-surface);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

```html file=app.html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>工作台 - 统一身份认证</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-page">
    <header class="app-header">
      <a class="app-brand" href="app.html" aria-label="NewEra 统一身份认证工作台">
        <span class="brand-mark brand-mark--small" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <rect x="4" y="4" width="24" height="24" rx="7"></rect>
            <path d="m10 16 4 4 8-9"></path>
          </svg>
        </span>
        <span>NewEra 身份平台</span>
      </a>

      <div class="user-menu-wrap">
        <button class="user-trigger" id="user-trigger" type="button" aria-expanded="false" aria-controls="user-menu">
          <span class="avatar" aria-hidden="true">
            <svg viewviewBox="0 0 24 24">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.2 0-7 2.2-7 5v1h14v-1c0-2.8-2.8-5-7-5Z"></path>
            </svg>
          </span>
          <span class="user-trigger__copy">
            <strong>Alex Chen</strong>
            <small>产品设计师</small>
          </span>
          <svg class="chevron" viewBox="0 0 20 20" aria-hidden="true">
            <path d="m5.5 7.5 4.5 4.5 4.5-4.5"></path>
          </svg>
        </button>

        <div class="user-menu" id="user-menu" role="menu" hidden>
          <div class="user-menu__header">
            <strong>Alex Chen</strong>
            <span>alex.chen@newera.cn</span>
          </div>
          <div class="user-menu__divider"></div>
          <a class="user-menu__item" href="profile.html" role="menuitem">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 2c-3.5 0-6 1.8-6 4.5V18h12v-1.5c0-2.7-2.5-4.5-6-4.5Z"></path>
            </svg>
            个人资料
          </a>
          <a class="user-menu__item" href="settings.html" role="menuitem">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M8.2 2.5h3.6l.5 2.1 1.4.8 2-.7 1.8 3.1-1.5 1.5v1.4l1.5 1.5-1.8 3.1-2-.7-1.4.8-.5 2.1H8.2l-.5-2.1-1.4-.8-2 .7-1.8-3.1 1.5-1.5V9.3L2.5 7.8l1.8-3.1 2 .7 1.4-.8.5-2.1Zm1.8 5.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Z"></path>
            </svg>
            账户设置
          </a>
          <div class="user-menu__divider"></div>
          <button class="user-menu__item user-menu__item--danger" type="button" id="logout-button" role="menuitem">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M8 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4v-2H5V5h3V3Zm5.2 1.6-1.4 1.4 1.8 1.8H8v2h5.6l-1.8 1.8 1.4 1.4L17 9l-3.8-4.4Z"></path>
            </svg>
            退出登录
          </button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <section class="welcome-card" aria-labelledby="welcome-title">
        <div class="welcome-copy">
          <p class="eyebrow">统一身份认证工作台</p>
          <h1 id="welcome-title">下午好，Alex</h1>
          <p>集中管理账户、应用权限与安全策略，让每一次访问都清晰可控。</p>
        </div>
        <div class="welcome-actions">
          <a class="button button--primary" href="users.html">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM3.5 16.5v-.7c0-3.2 2.9-5.2 6.5-5.2s6.5 2 6.5 5.2v.7h-13Z"></path>
            </svg>
            管理用户
          </a>
          <a class="button button--secondary" href="applications.html">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 3h5v5H3V3Zm9 0h5v5h-5V3ZM3 12h5v5H3v-5Zm9 0h5v5h-5v-5Z"></path>
            </svg>
            查看应用
          </a>
        </div>
      </section>

      <section class="section" aria-labelledby="overview-title">
        <div class="section-heading section-heading--inline">
          <div>
            <p class="eyebrow">平台概览</p>
            <h2 id="overview-title">关键指标</h2>
          </div>
          <span class="status-badge">
            <span class="status-dot" aria-hidden="true"></span>
            系统运行正常
          </span>
        </div>

        <div class="metric-grid">
          <article class="metric-card">
            <div class="metric-card__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.3-8 5.2V21h16v-1.8c0-2.9-3.6-5.2-8-5.2Z"></path>
              </svg>
            </div>
            <div>
              <span class="metric-card__label">活跃用户</span>
              <strong class="metric-card__value">12,486</strong>
              <span class="metric-card__trend">较上月增长 8.4%</span>
            </div>
          </article>

          <article class="metric-card">
            <div class="metric-card__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z"></path>
              </svg>
            </div>
            <div>
              <span class="metric-card__label">接入应用</span>
              <strong class="metric-card__value">28</strong>
              <span class="metric-card__trend">本月新增 2 个</span>
            </div>
          </article>

          <article class="metric-card">
            <div class="metric-card__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 2 8 3v6c0 5.1-3.4 9.4-8 11-4.6-1.6-8-5.9-8-11V5l8-3Zm0 5.1-3 3 2.1 2.1 5.9-5.8 1.4 1.4-7.3 7.2-3.5-3.4L5.2 10l5.4 5.3 7.8-7.7-1.4-1.4-5 4.9-.9-.9Z"></path>
              </svg>
            </div>
            <div>
              <span class="metric-card__label">安全评分</span>
              <strong class="metric-card__value">96.8</strong>
              <span class="metric-card__trend">高于安全目标</span>
            </div>
          </article>

          <article class="metric-card">
            <div class="metric-card__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16v2H4V5Zm1 4h14v2H5V9Zm2 4h10v2H7v-2Zm3 4h4v2h-4v-2Z"></path>
              </svg>
            </div>
            <div>
              <span class="metric-card__label">待处理事项</span>
              <strong class="metric-card__value">7</strong>
              <span class="metric-card__trend">3 项需要今天处理</span>
            </div>
          </article>
        </div>
      </section>

      <div class="content-grid">
        <section class="panel" aria-labelledby="activity-title">
          <div class="section-heading">
            <div>
              <p class="eyebrow">最近动态</p>
              <h2 id="activity-title">账户活动</h2>
            </div>
            <a class="text-link" href="activity.html">查看全部</a>
          </div>

          <div class="activity-list">
            <article class="activity-item">
              <span class="activity-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <path d="M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 2c-3.5 0-6 1.8-6 4.5V18h12v-1.5c0-2.7-2.5-4.5-6-4.5Z"></path>
                </svg>
              </span>
              <div class="activity-copy">
                <strong>新增用户 Morgan Lee</strong>
                <p>由 Alex Chen 创建并分配基础角色</p>
              </div>
              <time datetime="2025-03-08T14:32:00+08:00">12 分钟前</time>
            </article>

            <article class="activity-item">
              <span class="activity-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <path d="M10 2.5 16 5v4.7c0 3.8-2.5 6.9-6 8.3-3.5-1.4-6-4.5-6-8.3V5l6-2.5Zm0 4.7-1.4 2.8 3 .1-2.3 2.2.9 2.8-2.2-1.7-2.2 1.7.9-2.8L4.4 8l3-.1L10 7.2Z"></path>
                </svg>
              </span>
              <div class="activity-copy">
                <strong>安全策略已更新</strong>
                <p>单点登录会话上限调整为 24 小时</p>
              </div>
              <time datetime="2025-03-08T13:50:00+08:00">54 分钟前</time>
            </article>

            <article class="activity-item">
              <span class="activity-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <path d="M3.5 4.5h13v11h-13v-11Zm2 2v7h9v-7h-9ZM6 8h8v1.5H6V8Zm0 3h5v1.5H6V11Z"></path>
                </svg>
              </span>
              <div class="activity-copy">
                <strong>应用权限已同步</strong>
                <p>协作平台完成 1,280 个用户权限同步</p>
              </div>
              <time datetime="2025-03-08T11:20:00+08:00">3 小时前</time>
            </article>

            <article class="activity-item">
              <span class="activity-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <path d="M10 2.5 16 5v4.7c0 3.8-2.5 6.9-6 8.3-3.5-1.4-6-4.5-6-8.3V5l6-2.5Zm-1.1 9.8 4.1-4.1-1.4-1.4-2.7 2.7-1.3-1.3-1.4 1.4 2.7 2.7Z"></path>
                </svg>
              </span>
              <div class="activity-copy">
                <strong>权限审查已完成</strong>
                <p>本周共审查 48 个高权限账户</p>
              </div>
              <time datetime="2025-03-07T16:40:00+08:00">昨天</time>
            </article>
          </div>
        </section>

        <aside class="panel" aria-labelledby="tasks-title">
          <div class="section-heading">
            <div>
              <p class="eyebrow">需要关注</p>
              <h2 id="tasks-title">待办事项</h2>
            </div>
            <span class="count-badge">3</span>
          </div>

          <div class="task-list">
            <a class="task-item" href="users.html?filter=pending">
              <span class="task-marker task-marker--priority" aria-hidden="true"></span>
              <span class="task-copy">
                <strong>审核待激活账户</strong>
                <small>2 个账户等待管理员确认</small>
              </span>
              <svg class="task-arrow" viewBox="0 0 20 20" aria-hidden="true">
                <path d="m7.5 4.5 5.5 5.5-5.5 5.5"></path>
              </svg>
            </a>

            <a class="task-item" href="applications.html">
              <span class="task-marker" aria-hidden="true"></span>
              <span class="task-copy">
                <strong>检查应用授权范围</strong>
                <small>1 个应用的权限范围需要复核</small>
              </span>
              <svg class="task-arrow" viewBox="0 0 20 20" aria-hidden="true">
                <path d="m7.5 4.5 5.5 5.5-5.5 5.5"></path>
              </svg>
            </a>

            <a class="task-item" href="settings.html#mfa">
              <span class="task-marker" aria-hidden="true"></span>
              <span class="task-copy">
                <strong>配置多因素认证</strong>
                <small>为管理员角色启用强制验证</small>
              </span>
              <svg class="task-arrow" viewBox="0 0 20 20" aria-hidden="true">
                <path d="m7.5 4.5 5.5 5.5-5.5 5.5"></path>
              </svg>
            </a>
          </div>

          <div class="security-note">
            <div class="security-note__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m12 2 8 3v6c0 5.1-3.4 9.4-8 11-4.6-1.6-8-5.9-8-11V5l8-3Zm0 5.1-3 3 2.1 2.1 5.9-5.8 1.4 1.4-7.3 7.2-3.5-3.4L5.2 10l5.4 5.3 7.8-7.7-1.4-1.4-5 4.9-.9-.9Z"></path>
              </svg>
            </div>
            <div>
              <strong>安全提醒</strong>
              <p>建议在本周内完成高权限账户复核。</p>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <footer class="app-footer">
      <p>NewEra 统一身份认证平台</p>
      <p>安全访问 · 统一管理 · 持续保护</p>
    </footer>
  </div>

  <script>
    const userTrigger = document.getElementById("user-trigger");
    const userMenu = document.getElementById("user-menu");
    const logoutButton = document.getElementById("logout-button");

    function setMenuState(open) {
      userMenu.hidden = !open;
      userTrigger.setAttribute("aria-expanded", String(open));
    }

    userTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenuState(userMenu.hidden);
    });

    document.addEventListener("click", (event) => {
      if (!userMenu.hidden && !userMenu.contains(event.target)) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !userMenu.hidden) {
        setMenuState(false);
        userTrigger.focus();
      }
    });

    logoutButton.addEventListener("click", () => {
      setMenuState(false);
      window.location.href = "index.html";
    });
  </script>
</body>
</html>
```

```html file=login.html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>登录 - NewEra 统一身份认证</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="auth-page">
  <main class="auth-layout">
    <section class="auth-showcase" aria-labelledby="showcase-title">
      <a class="app-brand app-brand--light" href="index.html" aria-label="NewEra 统一身份认证首页">
        <span class="brand-mark brand-mark--light" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <rect x="4" y="4" width="24" height="24" rx="7"></rect>
            <path d="m10 16 4 4 8-9"></path>
          </svg>
        </span>
        <span>NewEra 身份平台</span>
      </a>

      <div class="showcase-copy">
        <p class="eyebrow eyebrow--light">安全、统一的访问体验</p>
        <h1 id="showcase-title">一个身份，连接每一种工作方式</h1>
        <p>通过统一身份认证保护企业账户，集中管理访问权限与安全策略。</p>
      </div>

      <div class="trust-list" aria-label="平台特性">
        <div class="trust-item">
          <span class="trust-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m12 2 8 3v6c0 5.1-3.4 9.4-8 11-4.6-1.6-8-5.9-8-11V5l8-3Zm0 5.1-3 3 2.1 2.1 5.9-5.8 1.4 1.4-7.3 7.2-3.5-3.4L5.2 10l5.4 5.3 7.8-7.7-1.4-1.4-5 4.9-.9-.9Z"></path>
            </svg>
          </span>
          <div>
            <strong>统一安全策略</strong>
            <p>集中配置认证规则与会话策略</p>
          </div>
        </div>

        <div class="trust-item">
          <span class="trust-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z"></path>
            </svg>
          </span>
          <div>
            <strong>应用权限管理</strong>
            <p>清晰掌握每个账户的访问范围</p>
          </div>
        </div>

        <div class="trust-item">
          <span class="trust-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.3-8 5.2V21h16v-1.8c0-2.9-3.6-5.2-8-5.2Z"></path>
            </svg>
          </span>
          <div>
            <strong>可审计账户活动</strong>
            <p>完整记录关键操作与登录事件</p>
          </div>
        </div>
      </div>
    </section>

    <section class="auth-panel" aria-labelledby="login-title">
      <div class="auth-panel__mobile-brand">
        <a class="app-brand" href="index.html" aria-label="NewEra 统一身份认证首页">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <rect x="4" y="4" width="24" height="24" rx="7"></rect>
              <path d="m10 16 4 4 8-9"></path>
            </svg>
          </span>
          <span>NewEra 身份平台</span>
        </a>
      </div>

      <div class="login-card">
        <div class="auth-heading">
          <p class="eyebrow">账户验证</p>
          <h2 id="login-title">欢迎回来</h2>
          <p>请输入您的企业账户信息以继续。</p>
        </div>

        <div class="tabs" role="tablist" aria-label="登录方式">
          <button class="tab is-active" id="password-tab" type="button" role="tab" aria-selected="true" aria-controls="password-panel">密码登录</button>
          <button class="tab" id="sms-tab" type="button" role="tab" aria-selected="false" aria-controls="sms-panel" tabindex="-1">短信登录</button>
        </div>

        <div class="tab-panel" id="password-panel" role="tabpanel" aria-labelledby="password-tab">
          <form class="auth-form" id="login-form" novalidate>
            <div class="form-field">
              <label for="email">企业邮箱</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2.5 5.5h15v10h-15v-10Zm1.5 1.5 6 4 6-4H4Z"></path>
                </svg>
                <input id="email" name="email" type="email" autocomplete="email" placeholder="name@company.com" required>
              </div>
              <p class="field-error" id="email-error" aria-live="polite"></p>
            </div>

            <div class="form-field">
              <div class="field-label-row">
                <label for="password">密码</label>
                <a href="reset-password.html">忘记密码？</a>
              </div>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5.5 8V6.5a4.5 4.5 0 0 1 9 0V8h1v8h-11V8h1Zm1.5 0h6V6.5a3 3 0 0 0-6 0V8Zm.5 3v2h1v-2H7Zm4 0v2h1v-2h-1Z"></path>
                </svg>
                <input id="password" name="password" type="password" autocomplete="current-password" placeholder="输入密码" required>
                <button class="input-action" id="toggle-password" type="button" aria-label="显示密码" aria-pressed="false">显示</button>
              </div>
              <p class="field-error" id="password-error" aria-live="polite"></p>
            </div>

            <label class="checkbox-row">
              <input type="checkbox" name="remember">
              <span class="checkbox-custom" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="m3.5 8 3 3 6-6"></path>
                </svg>
              </span>
              <span>在此设备上保持登录</span>
            </label>

            <button class="button button--primary button--full" type="submit">
              <span>安全登录</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m7.5 4.5 5.5 5.5-5.5 5.5"></path>
              </svg>
            </button>

            <p class="form-message" id="login-message" role="status" aria-live="polite"></p>
          </form>
        </div>

        <div class="tab-panel" id="sms-panel" role="tabpanel" aria-labelledby="sms-tab" hidden>
          <form class="auth-form" id="sms-form" novalidate>
            <div class="form-field">
              <label for="phone">手机号码</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6 2.5h8v15H6v-15Zm2 2v1h4v-1H8Zm0 4v1h4v-1H8Zm0 4v1h4v-1H8Z"></path>
                </svg>
                <input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="输入手机号码" required>
              </div>
              <p class="field-error" id="phone-error" aria-live="polite"></p>
            </div>

            <div class="form-field">
              <label for="sms-code">短信验证码</label>
              <div class="input-wrap input-wrap--action">
                <svg class="input-icon" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 3h12v14H4V3Zm2.5 4 3.5 3 3.5-3h-7Z"></path>
                </svg>
                <input id="sms-code" name="sms-code" inputmode="numeric" autocomplete="one-time-code" placeholder="6 位验证码" maxlength="6" required>
                <button class="input-action input-action--send" id="send-code-button" type="button">获取验证码</button>
              </div>
              <p class="field-error" id="sms-code-error" aria-live="polite"></p>
            </div>

            <button class="button button--primary button--full" type="submit">
              <span>验证并登录</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m7.5 4.5 5.5 5.5-5.5 5.5"></path>
              </svg>
            </button>

            <p class="form-message" id="sms-message" role="status" aria-live="polite"></p>
          </form>
        </div>

        <div class="divider"><span>企业单点登录</span></div>

        <button class="sso-button" type="button" id="sso-button">
          <span class="sso-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 5h7v7H9V7H4V5Zm9 0h7v7h-2V7h-5V5ZM4 12h7v7H9v-5H4v-2Zm9 0h7v7h-2v-5h-5v-2Z"></path>
            </svg>
          </span>
          使用企业统一身份登录
        </button>

        <p class="auth-help">无法登录？请联系您的系统管理员</p>
      </div>

      <p class="auth-footer">登录即表示您同意企业的安全访问策略</p>
    </section>
  </main>

  <script>
    const passwordTab = document.getElementById("password-tab");
    const smsTab = document.getElementById("sms-tab");
    const passwordPanel = document.getElementById("password-panel");
    const smsPanel = document.getElementById("sms-panel");

    function activateTab(tab, panel) {
      const isPassword = tab === passwordTab;

      passwordTab.classList.toggle("is-active", isPassword);
      smsTab.classList.toggle("is-active", !isPassword);
      passwordTab.setAttribute("aria-selected", String(isPassword));
      smsTab.setAttribute("aria-selected", String(!isPassword));
      passwordTab.tabIndex = isPassword ? 0 : -1;
      smsTab.tabIndex = isPassword ? -1 : 0;
      passwordPanel.hidden = !isPassword;
      smsPanel.hidden = isPassword;
    }

    passwordTab.addEventListener("click", () => activateTab(passwordTab, passwordPanel));
    smsTab.addEventListener("click", () => activateTab(smsTab, smsPanel));

    [passwordTab, smsTab].forEach((tab) => {
      tab.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          activateTab(smsTab, smsPanel);
          smsTab.focus();
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          activateTab(passwordTab, passwordPanel);
          passwordTab.focus();
        }
      });
    });

    const togglePassword = document.getElementById("toggle-password");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", () => {
      const shouldShow = passwordInput.type === "password";
      passwordInput.type = shouldShow ? "text" : "password";
      togglePassword.textContent = shouldShow ? "隐藏" : "显示";
      togglePassword.setAttribute("aria-label", shouldShow ? "隐藏密码" : "显示密码");
      togglePassword.setAttribute("aria-pressed", String(shouldShow));
      passwordInput.focus();
    });

    function showError(input, errorElement, message) {
      const group = input.closest(".form-field");
      group.classList.add("has-error");
      input.setAttribute("aria-invalid", "true");
      errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
      const group = input.closest(".form-field");
      group.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
      errorElement.textContent = "";
    }

    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordField = document.getElementById("password");

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailError = document.getElementById("email-error");
      const passwordError = document.getElementById("password-error");
      const message = document.getElementById("login-message");
      let valid = true;

      clearError(emailInput, emailError);
      clearError(passwordField, passwordError);
      message.textContent = "";
      message.className = "form-message";

      if (!emailInput.value.trim()) {
        showError(emailInput, emailError, "请输入企业邮箱");
        valid = false;
      } else if (!emailInput.validity.valid) {
        showError(emailInput, emailError, "请输入有效的企业邮箱地址");
        valid = false;
      }

      if (!passwordField.value) {
        showError(passwordField, passwordError, "请输入密码");
        valid = false;
      } else if (passwordField.value.length < 6) {
        showError(passwordField, passwordError, "密码至少需要 6 个字符");
        valid = false;
      }

      if (!valid) {
        message.textContent = "请检查表单中的提示信息。";
        message.classList.add("is-error");
        return;
      }

      message.textContent = "验证成功，正在进入工作台。";
      message.classList.add("is-success");
      window.setTimeout(() => {
        window.location.href = "app.html";
      }, 500);
    });

    const smsForm = document.getElementById("sms-form");
    const phoneInput = document.getElementById("phone");
    const codeInput = document.getElementById("sms-code");
    const sendCodeButton = document.getElementById("send-code-button");

    sendCodeButton.addEventListener("click", () => {
      const phoneError = document.getElementById("phone-error");
      clearError(phoneInput, phoneError);

      if (!/^1\d{10}$/.test(phoneInput.value.trim())) {
        showError(phoneInput, phoneError, "请输入有效的 11 位手机号码");
        phoneInput.focus();
        return;
      }

      sendCodeButton.disabled = true;
      let seconds = 60;
      sendCodeButton.textContent = seconds + " 秒后重发";

      const timer = window.setInterval(() => {
        seconds -= 1;
        sendCodeButton.textContent = seconds + " 秒后重发";
        if (seconds <= 0) {
          window.clearInterval(timer);
          sendCodeButton.disabled = false;
          sendCodeButton.textContent = "重新获取";
        }
      }, 1000);
    });

    smsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const phoneError = document.getElementById("phone-error");
      const codeError = document.getElementById("sms-code-error");
      const message = document.getElementById("sms-message");
      let valid = true;

      clearError(phoneInput, phoneError);
      clearError(codeInput, codeError);
      message.textContent = "";
      message.className = "form-message";

      if (!/^1\d{10}$/.test(phoneInput.value.trim())) {
        showError(phoneInput, phoneError, "请输入有效的 11 位手机号码");
        valid = false;
      }

      if (!/^\d{6}$/.test(codeInput.value.trim())) {
        showError(codeInput, codeError, "请输入 6 位短信验证码");
        valid = false;
      }

      if (!valid) {
        message.textContent = "请检查表单中的提示信息。";
        message.classList.add("is-error");
        return;
      }

      message.textContent = "验证成功，正在进入工作台。";
      message.classList.add("is-success");
      window.setTimeout(() => {
        window.location.href = "app.html";
      }, 500);
    });

    document.getElementById("sso-button").addEventListener("click", () => {
      const message = document.getElementById("login-message");
      activateTab(passwordTab, passwordPanel);
      message.textContent = "正在连接企业统一身份服务。";
      message.classList.add("is-success");
    });
  </script>
</body>
</html>
```

```html file=register.html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>创建账户 - NewEra 统一身份认证</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="auth-page">
  <main class="auth-layout auth-layout--register">
    <section class="auth-showcase" aria-labelledby="showcase-title">
      <a class="app-brand app-brand--light" href="index.html" aria-label="NewEra 统一身份认证首页">
        <span class="brand-mark brand-mark--light" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <rect x="4" y="4" width="24" height="24" rx="7"></rect>
            <path d="m10 16 4 4 8-9"></path>
          </svg>
        </span>
        <span>NewEra 身份平台</span>
      </a>

      <div class="showcase-copy">
        <p class="eyebrow eyebrow--light">开始安全连接</p>
        <h1 id="showcase-title">创建您的统一身份账户</h1>
        <p>只需几步即可加入企业身份体系，并安全访问已授权的工作应用。</p>
      </div>

      <ol class="steps-list" aria-label="注册流程">
        <li class="steps-item is-active">
          <span>1</span>
          <div>
            <strong>填写账户信息</strong>
            <p>验证您的企业身份</p>
          </div>
        </li>
        <li class="steps-item">
          <span>2</span>
          <div>
            <strong>安全验证</strong>
            <p>确认您的注册邮箱</p>
          </div>
        </li>
        <li class="steps-item">
          <span>3</span>
          <div>
            <strong>设置安全选项</strong>
            <p>完成账户安全配置</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="auth-panel" aria-labelledby="register-title">
      <div class="auth-panel__mobile-brand">
        <a class="app-brand" href="index.html" aria-label="NewEra 统一身份认证首页">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <rect x="4" y="4" width="24" height="24" rx="7"></rect>
              <path d="m10 16 4 4 8-9"></path>
            </svg>
          </span>
          <span>NewEra 身份平台</span>
        </a>
      </div>

      <div class="login-card login-card--register">
        <div class="auth-heading">
          <p class="eyebrow">账户注册</p>
          <h2 id="register-title">创建新账户</h2>
          <p>请使用企业邮箱注册，账户创建后需由管理员完成审核。</p>
        </div>

        <form class="auth-form" id="register-form" novalidate>
          <div class="form-grid">
            <div class="form-field">
              <label for="first-name">名字</label>
              <input id="first-name" name="first-name" type="text" autocomplete="given-name" placeholder="请输入名字" required>
              <p class="field-error" id="first-name-error" aria-live="polite"></p>
            </div>

            <div class="form-field">
              <label for="last-name">姓氏</label>
              <input id="last-name" name="last-name" type="text" autocomplete="family-name" placeholder="请输入姓氏" required>
              <p class="field-error" id="last-name-error" aria-live="polite"></p>
            </div>
          </div>

          <div class="form-field">
            <label for="register-email">企业邮箱</label>
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2.5 5.5h15v10h-15v-10Zm1.5 1.5 6 4 6-4H4Z"></path>
              </svg>
              <input id="register-email" name="register-email" type="email" autocomplete="email" placeholder="name@company.com" required>
            </div>
            <p class="field-error" id="register-email-error" aria-live="polite"></p>
          </div>

          <div class="form-field">
            <label for="register-password">设置密码</label>
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.5 8V6.5a4.5 4.5 0 0 1 9 0V8h1v8h-11V8h1Zm1.5 0h6V6.5a3 3 0 0 0-6 0V8Zm.5 3v2h1v-2H7Zm4 0v2h1v-2h-1Z"></path>
              </svg>
              <input id="register-password" name="register-password" type="password" autocomplete="new-password" placeholder="至少 8 个字符" required>
              <button class="input-action" id="toggle-register-password" type="button" aria-label="显示密码" aria-pressed="false">显示</button>
            </div>
            <div class="password-meter" id="password-meter" aria-label="密码强度">
              <span></span><span></span><span></span><span></span>
            </div>
            <p class="field-hint" id="password-hint">建议包含大小写字母、数字与符号</p>
            <p class="field-error" id="register-password-error" aria-live="polite"></p>
          </div>

          <div class="form-field">
            <label for="confirm-password">确认密码</label>
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.5 8V6.5a4.5 4.5 0 0 1 9 0V8h1v8h-11V8h1Zm1.5 0h6V6.5a3 3 0 0 0-6 0V8Zm.5 3v2h1v-2H7Zm4 0v2h1v-2h-1Z"></path>
              </svg>
              <input id="confirm-password" name="confirm-password" type="password" autocomplete="new-password" placeholder="再次输入密码" required>
            </div>
            <p class="field-error" id="confirm-password-error" aria-live="polite"></p>
          </div>

          <label class="checkbox-row checkbox-row--terms">
            <input id="terms-checkbox" name="terms" type="checkbox" required>
            <span class="checkbox-custom" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="m3.5 8 3 3 6-6"></path>
              </svg>
            </span>
            <span>我已阅读并同意<a href="terms.html">服务条款</a>与<a href="privacy.html">隐私政策</a></span>
          </label>
          <p class="field-error field-error--standalone" id="terms-error" aria-live="polite"></p>

          <button class="button button--primary button--full" type="submit">
            <span>创建账户</span>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m7.5 4.5 5.5 5.5-5.5 5.5"></path>
            </svg>
          </button>

          <p class="form-message" id="register-message" role="status" aria-live="polite"></p>
        </form>

        <p class="auth-switch">已有账户？<a href="login.html">直接登录</a></p>
      </div>

      <p class="auth-footer">您的账户信息将按照企业安全策略进行保护</p>
    </section>
  </main>

  <script>
    const registerForm = document.getElementById("register-form");
    const registerPassword = document.getElementById("register-password");
    const confirmPassword = document.getElementById("confirm-password");
    const passwordMeter = document.getElementById("password-meter");
    const passwordHint = document.getElementById("password-hint");
    const toggleRegisterPassword = document.getElementById("toggle-register-password");

    function showError(input, errorId, message) {
      const group = input.closest(".form-field");
      group.classList.add("has-error");
      input.setAttribute("aria-invalid", "true");
      document.getElementById(errorId).textContent = message;
    }

    function clearError(input, errorId) {
      const group = input.closest(".form-field");
      group.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
      document.getElementById(errorId).textContent = "";
    }

    toggleRegisterPassword.addEventListener("click", () => {
      const shouldShow = registerPassword.type === "password";
      registerPassword.type = shouldShow ? "text" : "password";
      toggleRegisterPassword.textContent = shouldShow ? "隐藏" : "显示";
      toggleRegisterPassword.setAttribute("aria-label", shouldShow ? "隐藏密码" : "显示密码");
      toggleRegisterPassword.setAttribute("aria-pressed", String(shouldShow));
      registerPassword.focus();
    });

    registerPassword.addEventListener("input", () => {
      const value = registerPassword.value;
      let score = 0;

      if (value.length >= 8) score += 1;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
      if (/\d/.test(value)) score += 1;
      if (/[^A-Za-z0-9]/.test(value)) score += 1;

      passwordMeter.dataset.strength = String(score);
      passwordMeter.setAttribute("aria-label", "密码强度：" + score + " 级");

      if (score <= 1) {
        passwordHint.textContent = "建议包含大小写字母、数字与符号";
      } else if (score === 2) {
        passwordHint.textContent = "密码强度：中等，可继续增加字符种类";
      } else if (score === 3) {
        passwordHint.textContent = "密码强度：良好";
      } else {
        passwordHint.textContent = "密码强度：优秀";
      }
    });

    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.getElementById("register-message");
      const termsCheckbox = document.getElementById("terms-checkbox");
      const fields = [
        { input: document.getElementById("first-name"), errorId: "first-name-error", label: "名字" },
        { input: document.getElementById("last-name"), errorId: "last-name-error", label: "姓氏" },
        { input: document.getElementById("register-email"), errorId: "register-email-error", label: "企业邮箱" },
        { input: registerPassword, errorId: "register-password-error", label: "密码" },
        { input: confirmPassword, errorId: "confirm-password-error", label: "确认密码" }
      ];

      fields.forEach((field) => clearError(field.input, field.errorId));
      document.getElementById("terms-error").textContent = "";
      message.textContent = "";
      message.className = "form-message";
      let valid = true;

      fields.forEach((field) => {
        if (!field.input.value.trim()) {
          showError(field.input, field.errorId, "请输入" + field.label);
          valid = false;
        }
      });

      const email = document.getElementById("register-email");
      if (email.value && !email.validity.valid) {
        showError(email, "register-email-error", "请输入有效的企业邮箱地址");
        valid = false;
      }

      if (registerPassword.value && registerPassword.value.length < 8) {
        showError(registerPassword, "register-password-error", "密码至少需要 8 个字符");
        valid = false;
      }

      if (confirmPassword.value && confirmPassword.value !== registerPassword.value) {
        showError(confirmPassword, "confirm-password-error", "两次输入的密码不一致");
        valid = false;
      }

      if (!termsCheckbox.checked) {
        document.getElementById("terms-error").textContent = "请阅读并同意服务条款与隐私政策";
        valid = false;
      }

      if (!valid) {
        message.textContent = "请检查表单中的提示信息。";
        message.classList.add("is-error");
        return;
      }

      message.textContent = "注册申请已提交，请前往企业邮箱完成验证。";
      message.classList.add("is-success");
      window.setTimeout(() => {
        window.location.href = "login.html";
      }, 900);
    });
  </script>
</body>
</html>
```

```html file=users.html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>用户管理 - NewEra 统一身份认证</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-page">
    <header class="app-header">
      <a class="app-brand" href="app.html" aria-label="NewEra 统一身份认证工作台">
        <span class="brand-mark brand-mark--small" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <rect x="4" y="4" width="24" height="24" rx="7"></rect>
            <path d="m10 16 4 4 8-9"></path>
          </svg>
        </span>
        <span>NewEra 身份平台</span>
      </a>

      <nav class="top-nav" aria-label="主要导航">
        <a href="app.html">工作台</a>
        <a href="users.html" class="is-active">用户</a>
        <a href="applications.html">应用</a>
        <a href="activity.html">审计日志</a>
      </nav>

      <div class="user-menu-wrap">
        <button class="user-trigger user-trigger--compact" id="user-trigger" type="button" aria-expanded="false" aria-controls="user-menu">
          <span class="avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.2 0-7 2.2-7 5v1h14v-1c0-2.8-2.8-5-7-5Z"></path>
            </svg>
          </span>
          <span class="user-trigger__copy">
            <strong>Alex Chen</strong>
            <small>管理员</small>
          </span>
          <svg class="chevron" viewBox="0 0 20 20" aria-hidden="true">
            <path d="m5.5 7.5 4.5 4.5 4.5-4.5"></path>
          </svg>
        </button>

        <div class="user-menu" id="user-menu" role="menu" hidden>
          <div class="user-menu__header">
            <strong>Alex Chen</strong>
            <span>alex.chen@newera.cn</span>
          </div>
          <div class="user-menu__divider"></div>
          <a class="user-menu__item" href="profile.html" role="menuitem">个人资料</a>
          <a class="user-menu__item" href="settings.html" role="menuitem">账户设置</a>
          <div class="user-menu__divider"></div>
          <button class="user-menu__item user-menu__item--danger" id="logout-button" type="button" role="menuitem">退出登录</button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <div class="page-heading">
        <div>
          <p class="eyebrow">身份目录</p>
          <h1>用户管理</h1>
          <p>管理企业用户、账户状态与角色权限。</p>
        </div>
        <button class="button button--primary" id="invite-user-button" type="button">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9 3h2v6h6v2h-6v6H9v-6H3V9h6V3Z"></path>
          </svg>
          邀请用户
        </button>
      </div>

      <section class="panel table-panel" aria-labelledby="users-table-title">
        <div class="table-toolbar">
          <div>
            <h2 id="users-table-title">全部用户</h2>
            <p>共 12,486 位用户</p>
          </div>
          <div class="toolbar-actions">
            <label class="search-box">
              <span class="sr-only">搜索用户</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m14.5 13.2 3.7 3.7-1.3 1.3-3.7-3.7a6.5 6.5 0 1 1 1.3-1.3ZM8.5 13A4.5 4.5 0 1 0 8.5 4a4.5 4.5 0 0 0 0 9Z"></path>
              </svg>
              <input id="user-search" type="search" placeholder="搜索姓名或邮箱">
            </label>
            <button class="button button--secondary button--small" id="filter-button" type="button" aria-expanded="false" aria-controls="filter-panel">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 4h14v2l-5.5 6V17l-3-1.5v-3.5L3 6V4Z"></path>
              </svg>
              筛选
            </button>
          </div>
        </div>

        <div class="filter-panel" id="filter-panel" hidden>
          <label>
            <span>账户状态</span>
            <select id="status-filter">
              <option value="all">全部状态</option>
              <option value="active">已激活</option>
              <option value="pending">待审核</option>
              <option value="suspended">已停用</option>
            </select>
          </label>
          <label>
            <span>用户角色</span>
            <select id="role-filter">
              <option value="all">全部角色</option>
              <option value="管理员">管理员</option>
              <option value="普通用户">普通用户</option>
              <option value="审计员">审计员</option>
            </select>
          </label>
          <button class="text-link" id="reset-filter-button" type="button">清除筛选</button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">用户</th>
                <th scope="col">角色</th>
                <th scope="col">状态</th>
                <th scope="col">最近登录</th>
                <th scope="col"><span class="sr-only">操作</span></th>
              </tr>
            </thead>
            <tbody id="users-table-body">
              <tr data-name="Morgan Lee" data-email="morgan.lee@newera.cn" data-status="active" data-role="普通用户">
                <td>
                  <div class="user-cell">
                    <span class="avatar avatar--soft">ML</span>
                    <div>
                      <strong>Morgan Lee</strong>
                      <span>morgan.lee@newera.cn</span>
                    </div>
                  </div>
                </td>
                <td>普通用户</td>
                <td><span class="status-badge status-badge--active"><span class="status-dot"></span>已激活</span></td>
                <td>12 分钟前</td>
                <td>
                  <button class="icon-button" type="button" aria-label="查看 Morgan Lee">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 5c-4.5 0-7.5 4.4-8.2 5 .7.6 3.7 5 8.2 5s7.5-4.4 8.2-5c-.7-.6-3.7-5-8.2-5Zm0 7.5A2.5 2.5 0 1 1 10 7.5a2.5 2.5 0 0 1 0 5Zm0-2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>

              <tr data-name="Olivia Wang" data-email="olivia.wang@newera.cn" data-status="active" data-role="管理员">
                <td>
                  <div class="user-cell">
                    <span class="avatar avatar--soft">OW</span>
                    <div>
                      <strong>Olivia Wang</strong>
                      <span>olivia.wang@newera.cn</span>
                    </div>
                  </div>
                </td>
                <td>管理员</td>
                <td><span class="status-badge status-badge--active"><span class="status-dot"></span>已激活</span></td>
                <td>1 小时前</td>
                <td>
                  <button class="icon-button" type="button" aria-label="查看 Olivia Wang">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 5c-4.5 0-7.5 4.4-8.2 5 .7.6 3.7 5 8.2 5s7.5-4.4 8.2-5c-.7-.6-3.7-5-8.2-5Zm0 7.5A2.5 2.5 0 1 1 10 7.5a2.5 2.5 0 0 1 0 5Zm0-2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>

              <tr data-name="Ethan Zhang" data-email="ethan.zhang@newera.cn" data-status="pending" data-role="普通用户">
                <td>
                  <div class="user-cell">
                    <span class="avatar avatar--soft">EZ</span>
                    <div>
                      <strong>Ethan Zhang</strong>
                      <span>ethan.zhang@newera.cn</span>
                    </div>
                  </div>
                </td>
                <td>普通用户</td>
                <td><span class="status-badge status-badge--pending"><span class="status-dot"></span>待审核</span></td>
                <td>尚未登录</td>
                <td>
                  <button class="icon-button" type="button" aria-label="查看 Ethan Zhang">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 5c-4.5 0-7.5 4.4-8.2 5 .7.6 3.7 5 8.2 5s7.5-4.4 8.2-5c-.7-.6-3.7-5-8.2-5Zm0 7.5A2.5 2.5 0 1 1 10 7.5a2.5 2.5 0 0 1 0 5Zm0-2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>

              <tr data-name="Sophia Liu" data-email="sophia.liu@newera.cn" data-status="suspended" data-role="审计员">
                <td>
                  <div class="user-cell">
                    <span class="avatar avatar--soft">SL</span>
                    <div>
                      <strong>Sophia Liu</strong>
                      <span>sophia.liu@newera.cn</span>
                    </div>
                  </div>
                </td>
                <td>审计员</td>
                <td><span class="status-badge status-badge--suspended"><span class="status-dot"></span>已停用</span></td>
                <td>8 天前</td>
                <td>
                  <button class="icon-button" type="button" aria-label="查看 Sophia Liu">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 5c-4.5 0-7.5 4.4-8.2 5 .7.6 3.7 5 8.2 5s7.5-4.4 8.2-5c-.7-.6-3.7-5-8.2-5Zm0 7.5A2.5 2.5 0 1 1 10 7.5a2.5 2.5 0 0 1 0 5Zm0-2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>

              <tr data-name="Noah Wilson" data-email="noah.wilson@newera.cn" data-status="active" data-role="普通用户">
                <td>
                  <div class="user-cell">
                    <span class="avatar avatar--soft">NW</span>
                    <div>
                      <strong>Noah Wilson</strong>
                      <span>noah.wilson@newera.cn</span>
                    </div>
                  </div>
                </td>
                <td>普通用户</td>
                <td><span class="status-badge status-badge--active"><span class="status-dot"></span>已激活</span></td>
                <td>昨天</td>
                <td>
                  <button class="icon-button" type="button" aria-label="查看 Noah Wilson">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 5c-4.5 0-7.5 4.4-8.2 5 .7.6 3.7 5 8.2 5s7.5-4.4 8.2-5c-.7-.6-3.7-5-8.2-5Zm0 7.5A2.5 2.5 0 1 1 10 7.5a2.5 2.5 0 0 1 0 5Zm0-2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="empty-state" id="users-empty-state" hidden>
          <span aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M16 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 14c-6.2 0-10 3.2-10 7v3h20v-3c0-3.8-3.8-7-10-7Z"></path>
            </svg>
          </span>
          <h3>未找到匹配用户</h3>
          <p>请调整搜索词或筛选条件后重试。</p>
        </div>

        <div class="table-footer">
          <p>显示 1–5 条，共 12,486 条</p>
          <div class="pagination" aria-label="分页">
            <button type="button" disabled aria-label="上一页">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m12.5 4.5-5.5 5.5 5.5 5.5"></path>
              </svg>
            </button>
            <button type="button" class="is-active" aria-current="page">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <span aria-hidden="true">…</span>
            <button type="button">2498</button>
            <button type="button" aria-label="下一页">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m7.5 4.5 5.5 5.5-5.5 5.5"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>

    <div class="modal-backdrop" id="invite-modal" hidden>
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="invite-modal-title">
        <div class="modal__header">
          <div>
            <p class="eyebrow">添加成员</p>
            <h2 id="invite-modal-title">邀请新用户</h2>
          </div>
          <button class="icon-button" id="close-invite-modal" type="button" aria-label="关闭邀请窗口">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 6.6 1.4-1.4L10 8.8l3.6-3.6L15 6.6 11.4 10 15 13.4l-1.4 1.4L10 11.2l-3.6 3.6L5 13.4 8.6 10 5 6.6Z"></path>
            </svg>
          </button>
        </div>

        <form id="invite-form" novalidate>
          <div class="form-field">
            <label for="invite-email">企业邮箱</label>
            <input id="invite-email" name="invite-email" type="email" placeholder="name@company.com" required>
            <p class="field-error" id="invite-email-error" aria-live="polite"></p>
          </div>

          <div class="form-field">
            <label for="invite-role">分配角色</label>
            <select id="invite-role" name="invite-role">
              <option value="普通用户">普通用户</option>
              <option value="管理员">管理员</option>
              <option value="审计员">审计员</option>
            </select>
          </div>

          <div class="modal__actions">
            <button class="button button--secondary" id="cancel-invite" type="button">取消</button>
            <button class="button button--primary" type="submit">发送邀请</button>
          </div>
        </form>
      </section>
    </div>

    <div class="toast" id="toast" role="status" aria-live="polite" hidden>
      <span class="toast__icon" aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <path d="m10 2.5 2 5.2 5.5.2-4.3 3.4 1.5 5.3-4.7-3.1L5.3 16.6l1.5-5.3L2.5 7.9l5.5-.2 2-5.2Z"></path>
        </svg>
      </span>
      <span id="toast-message">操作成功</span>
    </div>
  </div>

  <script>
    const userTrigger = document.getElementById("user-trigger");
    const userMenu = document.getElementById("user-menu");

    function setMenuState(open) {
      userMenu.hidden = !open;
      userTrigger.setAttribute("aria-expanded", String(open));
    }

    userTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenuState(userMenu.hidden);
    });

    document.addEventListener("click", (event) => {
      if (!userMenu.hidden && !userMenu.contains(event.target)) {
        setMenuState(false);
      }
    });

    document.getElementById("logout-button").addEventListener("click", () => {
      window.location.href = "index.html";
    });

    const filterButton = document.getElementById("filter-button");
    const filterPanel = document.getElementById("filter-panel");
    const searchInput = document.getElementById("user-search");
    const statusFilter = document.getElementById("status-filter");
    const roleFilter = document.getElementById("role-filter");
    const tableBody = document.getElementById("users-table-body");
    const emptyState = document.getElementById("users-empty-state");

    filterButton.addEventListener("click", () => {
      const open = filterPanel.hidden;
      filterPanel.hidden = !open;
      filterButton.setAttribute("aria-expanded", String(open));
    });

    function filterRows() {
      const query = searchInput.value.trim().toLowerCase();
      const status = statusFilter.value;
      const role = roleFilter.value;
      const rows = Array.from(tableBody.querySelectorAll("tr"));
      let visibleCount = 0;

      rows.forEach((row) => {
        const name = row.dataset.name.toLowerCase();
        const email = row.dataset.email.toLowerCase();
        const matchesQuery = !query || name.includes(query) || email.includes(query);
        const matchesStatus = status === "all" || row.dataset.status === status;
        const matchesRole = role === "all" || row.dataset.role === role;
        const visible = matchesQuery && matchesStatus && matchesRole;

        row.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      emptyState.hidden = visibleCount !== 0;
    }

    searchInput.addEventListener("input", filterRows);
    statusFilter.addEventListener("change", filterRows);
    roleFilter.addEventListener("change", filterRows);

    document.getElementById("reset-filter-button").addEventListener("click", () => {
      searchInput.value = "";
      statusFilter.value = "all";
      roleFilter.value = "all";
      filterRows();
    });

    const inviteModal = document.getElementById("invite-modal");
    const inviteButton = document.getElementById("```js
const inviteButton = document.getElementById("invite-button");
    const inviteCloseButton = document.getElementById("invite-close-button");
    const inviteForm = document.getElementById("invite-form");
    const inviteEmail = document.getElementById("invite-email");
    const inviteRole = document.getElementById("invite-role");
    const inviteModalTitle = document.getElementById("invite-modal-title");
    const inviteSubmitButton = document.getElementById("invite-submit-button");

    function openInviteModal() {
      inviteModal.hidden = false;
      document.body.classList.add("modal-open");
      inviteModalTitle.textContent = "邀请新成员";
      inviteSubmitButton.textContent = "发送邀请";
      inviteForm.reset();
      inviteEmail.focus();
    }

    function closeInviteModal() {
      inviteModal.hidden = true;
      document.body.classList.remove("modal-open");
      inviteButton.focus();
    }

    inviteButton.addEventListener("click", openInviteModal);
    inviteCloseButton.addEventListener("click", closeInviteModal);

    inviteModal.addEventListener("click", (event) => {
      if (event.target === inviteModal) {
        closeInviteModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (!inviteModal.hidden) {
          closeInviteModal();
        }

        if (!userMenu.hidden) {
          setMenuState(false);
          userTrigger.focus();
        }
      }
    });

    inviteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = inviteEmail.value.trim();
      const role = inviteRole.value;
      const row = document.createElement("tr");

      row.dataset.name = email.split("@")[0] || "新成员";
      row.dataset.email = email;
      row.dataset.status = "pending";
      row.dataset.role = role;

      const roleLabel = role === "admin" ? "管理员" : role === "editor" ? "编辑者" : "观察者";

      row.innerHTML = `
        <td>
          <div class="user-cell">
            <div class="user-avatar user-avatar-muted" aria-hidden="true">新</div>
            <div>
              <strong>${row.dataset.name}</strong>
              <span class="user-email">${email}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="role-badge">${roleLabel}</span>
        </td>
        <td>
          <span class="status-badge status-pending">待接受</span>
        </td>
        <td>刚刚</td>
        <td>
          <button class="icon-button danger-button" type="button" aria-label="删除 ${email}" title="删除成员">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
            </svg>
          </button>
        </td>
      `;

      tableBody.appendChild(row);
      emptyState.hidden = true;
      closeInviteModal();
      filterRows();
    });

    tableBody.addEventListener("click", (event) => {
      const deleteButton = event.target.closest(".danger-button");

      if (!deleteButton) {
        return;
      }

      const row = deleteButton.closest("tr");
      const userName = row.dataset.name;
      const userEmail = row.dataset.email;
      const confirmModal = document.getElementById("confirm-modal");
      const confirmTitle = document.getElementById("confirm-modal-title");
      const confirmMessage = document.getElementById("confirm-modal-message");
      const confirmDeleteButton = document.getElementById("confirm-delete-button");
      const confirmCancelButton = document.getElementById("confirm-cancel-button");
      const confirmCloseButton = document.getElementById("confirm-close-button");

      confirmTitle.textContent = "删除成员";
      confirmMessage.textContent = `确定要删除 ${userName}（${userEmail}）吗？此操作无法撤销。`;
      confirmModal.hidden = false;
      document.body.classList.add("modal-open");

      const closeConfirmModal = () => {
        confirmModal.hidden = true;
        document.body.classList.remove("modal-open");
        deleteButton.focus();
      };

      const handleConfirm = () => {
        row.remove();
        closeConfirmModal();

        const remainingRows = Array.from(tableBody.querySelectorAll("tr"));
        emptyState.hidden = remainingRows.length !== 0;
      };

      confirmDeleteButton.onclick = handleConfirm;
      confirmCancelButton.onclick = closeConfirmModal;
      confirmCloseButton.onclick = closeConfirmModal;

      confirmModal.onclick = (event) => {
        if (event.target === confirmModal) {
          closeConfirmModal();
        }
      };
    });

    filterButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        filterButton.click();
      }
    });

    const toast = document.getElementById("toast");
    let toastTimer;

    function showToast(message) {
      toast.textContent = message;
      toast.hidden = false;
      window.clearTimeout(toastTimer);

      toastTimer = window.setTimeout(() => {
        toast.hidden = true;
      }, 3000);
    }

    document.querySelectorAll("[data-demo-action]").forEach((button) => {
      button.addEventListener("click", () => {
        showToast(button.dataset.demoAction);
      });
    });
  </script>
</body>
</html>
```

```css file=users.css
:root {
  --color-primary: #1f6b5b;
  --color-primary-dark: #174f43;
  --color-primary-light: #e8f2ef;
  --color-text: #17211f;
  --color-text-muted: #68736f;
  --color-border: #dce4e1;
  --color-surface: #ffffff;
  --color-surface-muted: #f5f7f6;
  --color-danger: #a64646;
  --color-danger-light: #f9eeee;
  --color-warning: #8a6a2f;
  --color-warning-light: #fbf5e8;
  --shadow-sm: 0 1px 2px rgba(23, 33, 31, 0.05);
  --shadow-md: 0 10px 30px rgba(23, 33, 31, 0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --font-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  background: var(--color-surface-muted);
}

body {
  min-height: 100vh;
  margin: 0;
  color: var(--color-text);
  background: var(--color-surface-muted);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

body.modal-open {
  overflow: hidden;
}

button,
input,
select {
  font: inherit;
}

button,
select {
  cursor: pointer;
}

button:disabled,
input:disabled,
select:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
a:focus-visible {
  outline: 3px solid rgba(31, 107, 91, 0.2);
  outline-offset: 2px;
}

[hidden] {
  display: none !important;
}

.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: var(--space-6) var(--space-4);
  color: #edf5f2;
  background: #163b34;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-3);
  color: #ffffff;
  text-decoration: none;
}

.brand-mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  color: #173b34;
  background: #e8f2ef;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
}

.brand-mark svg {
  width: 22px;
  height: 22px;
}

.brand-copy {
  min-width: 0;
}

.brand-copy strong,
.brand-copy span {
  display: block;
}

.brand-copy strong {
  font-size: 15px;
  letter-spacing: 0.01em;
}

.brand-copy span {
  margin-top: 1px;
  color: rgba(237, 245, 242, 0.62);
  font-size: 11px;
}

.sidebar-nav {
  display: grid;
  gap: var(--space-1);
  margin-top: var(--space-10);
}

.nav-label {
  margin: 0 var(--space-3) var(--space-2);
  color: rgba(237, 245, 242, 0.42);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 42px;
  padding: 0 var(--space-3);
  color: rgba(237, 245, 242, 0.72);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color 160ms ease, background 160ms ease, transform 160ms ease;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.07);
}

.nav-link:active {
  transform: translateY(1px);
}

.nav-link.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}

.nav-link.active::before {
  position: absolute;
  left: -16px;
  width: 3px;
  height: 22px;
  content: "";
  background: #b8d9d0;
  border-radius: 0 3px 3px 0;
}

.nav-link svg {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
}

.nav-count {
  min-width: 22px;
  margin-left: auto;
  padding: 1px 6px;
  color: #dcebe7;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  font-size: 11px;
  text-align: center;
}

.sidebar-footer {
  margin-top: auto;
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
}

.sidebar-footer strong {
  display: block;
  color: #ffffff;
  font-size: 13px;
}

.sidebar-footer p {
  margin: var(--space-1) 0 var(--space-3);
  color: rgba(237, 245, 242, 0.56);
  font-size: 12px;
}

.sidebar-footer a {
  color: #dcebe7;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.sidebar-footer a:hover {
  text-decoration: underline;
}

.main-area {
  min-width: 0;
}

.topbar {
  position: sticky;
  z-index: 10;
  top: 0;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-8);
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: 13px;
}

.breadcrumb svg {
  width: 14px;
  height: 14px;
}

.breadcrumb strong {
  color: var(--color-text);
  font-weight: 650;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.icon-button,
.avatar-button {
  display: inline-grid;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition: color 160ms ease, background 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.icon-button:hover,
.avatar-button:hover {
  color: var(--color-primary);
  background: var(--color-primary-light);
  border-color: rgba(31, 107, 91, 0.12);
}

.icon-button:active,
.avatar-button:active {
  transform: translateY(1px);
}

.icon-button svg {
  width: 19px;
  height: 19px;
}

.user-menu-wrap {
  position: relative;
}

.avatar-button {
  width: auto;
  padding: 0 var(--space-1) 0 var(--space-1);
  gap: var(--space-2);
  color: var(--color-text);
}

.user-avatar {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  color: #ffffff;
  background: var(--color-primary);
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
}

.user-avatar-muted {
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
}

.avatar-button .chevron {
  width: 14px;
  height: 14px;
  margin-right: var(--space-1);
}

.user-menu {
  position: absolute;
  z-index: 30;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  padding: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.menu-profile {
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.menu-profile strong,
.menu-profile span {
  display: block;
}

.menu-profile strong {
  font-size: 13px;
}

.menu-profile span {
  margin-top: 2px;
  color: var(--color-text-muted);
  font-size: 12px;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 38px;
  margin-top: var(--space-1);
  padding: 0 var(--space-3);
  color: var(--color-text);
  background: transparent;
  border: 0;
  border-radius: var(--radius-sm);
  text-align: left;
}

.menu-item:hover {
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
}

.menu-item svg {
  width: 17px;
  height: 17px;
}

.menu-item-danger {
  color: var(--color-danger);
}

.menu-item-danger:hover {
  color: var(--color-danger);
  background: var(--color-danger-light);
}

.page-content {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: var(--space-8);
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.page-header h1 {
  margin: 0;
  font-size: clamp(24px, 3vw, 30px);
  line-height: 1.25;
  letter-spacing: -0.025em;
}

.page-header p {
  max-width: 620px;
  margin: var(--space-2) 0 0;
  color: var(--color-text-muted);
  font-size: 14px;
}

.button {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 0 var(--space-4);
  color: #ffffff;
  background: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  font-size: 13px;
  font-weight: 650;
  white-space: nowrap;
  transition: background 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.button:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  box-shadow: 0 4px 12px rgba(31, 107, 91, 0.16);
}

.button:active {
  transform: translateY(1px);
  box-shadow: none;
}

.button svg {
  width: 17px;
  height: 17px;
}

.button-secondary {
  color: var(--color-text);
  background: var(--color-surface);
  border-color: var(--color-border);
}

.button-secondary:hover {
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border-color: rgba(31, 107, 91, 0.22);
  box-shadow: none;
}

.button-danger {
  color: #ffffff;
  background: var(--color-danger);
  border-color: var(--color-danger);
}

.button-danger:hover {
  color: #ffffff;
  background: #8e3939;
  border-color: #8e3939;
  box-shadow: 0 4px 12px rgba(166, 70, 70, 0.16);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.metric-card {
  min-width: 0;
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.metric-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.metric-label {
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
}

.metric-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: var(--color-primary);
  background: var(--color-primary-light);
  border-radius: 9px;
}

.metric-icon svg {
  width: 17px;
  height: 17px;
}

.metric-value {
  display: block;
  margin-top: var(--space-3);
  font-size: 27px;
  font-weight: 720;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.metric-note {
  display: block;
  margin-top: var(--space-1);
  color: var(--color-text-muted);
  font-size: 12px;
}

.content-card {
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.card-heading {
  min-width: 0;
}

.card-heading h2 {
  margin: 0;
  font-size: 16px;
  letter-spacing: -0.01em;
}

.card-heading p {
  margin: var(--space-1) 0 0;
  color: var(--color-text-muted);
  font-size: 12px;
}

.filter-button {
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-3);
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  transition: color 160ms ease, background 160ms ease, border-color 160ms ease;
}

.filter-button:hover {
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border-color: rgba(31, 107, 91, 0.22);
}

.filter-button svg {
  width: 16px;
  height: 16px;
}

.filter-button .chevron {
  width: 13px;
  height: 13px;
  transition: transform 160ms ease;
}

.filter-button[aria-expanded="true"] .chevron {
  transform: rotate(180deg);
}

.filter-panel {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 180px 180px auto;
  align-items: end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  background: var(--color-surface-muted);
  border-bottom: 1px solid var(--color-border);
}

.field {
  display: grid;
  gap: 6px;
}

.field label {
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 600;
}

.input-wrap {
  position: relative;
}

.input-wrap svg {
  position: absolute;
  top: 50%;
  left: 11px;
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  transform: translateY(-50%);
  pointer-events: none;
}

.text-input,
.select-input {
  width: 100%;
  height: 40px;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.text-input {
  padding: 0 var(--space-3) 0 36px;
}

.select-input {
  padding: 0 34px 0 var(--space-3);
}

.text-input:hover,
.select-input:hover {
  border-color: #b9c7c3;
}

.text-input:focus,
.select-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(31, 107, 91, 0.1);
  outline: none;
}

.text-input::placeholder {
  color: #929c98;
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: var(--space-4) var(--space-6);
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid var(--color-border);
}

.users-table th {
  color: var(--color-text-muted);
  background: #fbfcfc;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.users-table td {
  color: #46514e;
  font-size: 13px;
}

.users-table tbody tr {
  transition: background 140ms ease;
}

.users-table tbody tr:hover {
  background: #fafcfb;
}

.users-table tbody tr:last-child td {
  border-bottom: 0;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 210px;
}

.user-cell strong,
.user-cell span {
  display: block;
}

.user-cell strong {
  color: var(--color-text);
  font-size: 13px;
  font-weight: 650;
}

.user-email {
  max-width: 220px;
  margin-top: 2px;
  overflow: hidden;
  color: var(--color-text-muted);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.role-badge,
.status-badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 650;
  white-space: nowrap;
}

.role-badge {
  color: #53605c;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
}

.status-active {
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
}

.status-inactive {
  color: #626a68;
  background: #f0f2f1;
}

.status-pending {
  color: var(--color-warning);
  background: var(--color-warning-light);
}

.status-dot {
  width: 6px;
  height: 6px;
  margin-right: 6px;
  background: currentColor;
  border-radius: 50%;
}

.danger-button:hover {
  color: var(--color-danger);
  background: var(--color-danger-light);
  border-color: rgba(166, 70, 70, 0.12);
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  color: var(--color-text-muted);
  background: #fbfcfc;
  border-top: 1px solid var(--color-border);
  font-size: 12px;
}

.pagination {
  display: flex;
  gap: var(--space-2);
}

.page-button {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  padding: 0;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 7px;
  font-size: 12px;
}

.page-button:hover:not(:disabled) {
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border-color: rgba(31, 107, 91, 0.22);
}

.page-button.active {
  color: #ffffff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.empty-state {
  padding: var(--space-12) var(--space-6);
  text-align: center;
}

.empty-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  margin: 0 auto var(--space-3);
  color: var(--color-primary);
  background: var(--color-primary-light);
  border-radius: 50%;
}

.empty-icon svg {
  width: 22px;
  height: 22px;
}

.empty-state h3 {
  margin: 0;
  font-size: 15px;
}

.empty-state p {
  margin: var(--space-2) 0 0;
  color: var(--color-text-muted);
  font-size: 13px;
}

.modal {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  padding: var(--space-4);
  background: rgba(17, 28, 25, 0.5);
  backdrop-filter: blur(3px);
}

.modal-dialog {
  width: min(460px, 100%);
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 70px rgba(15, 27, 23, 0.24);
  animation: modal-in 160ms ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-6) var(--space-4);
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  letter-spacing: -0.015em;
}

.modal-header p {
  margin: var(--space-2) 0 0;
  color: var(--color-text-muted);
  font-size: 13px;
}

.modal-close {
  flex: 0 0 auto;
}

.modal-body {
  padding: 0 var(--space-6) var(--space-6);
}

.form-stack {
  display: grid;
  gap: var(--space-4);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
}

.confirm-dialog {
  width: min(420px, 100%);
}

.confirm-message {
  margin: 0;
  color: #46514e;
  font-size: 14px;
}

.toast {
  position: fixed;
  z-index: 150;
  right: var(--space-6);
  bottom: var(--space-6);
  max-width: min(360px, calc(100vw - 32px));
  padding: var(--space-3) var(--space-4);
  color: #ffffff;
  background: #20312d;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  font-size: 13px;
  animation: toast-in 180ms ease-out;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 76px minmax(0, 1fr);
  }

  .sidebar {
    padding-inline: var(--space-3);
  }

  .brand {
    justify-content: center;
    padding: 0;
  }

  .brand-copy,
  .nav-label,
  .nav-link span,
  .nav-count,
  .sidebar-footer {
    display: none;
  }

  .nav-link {
    justify-content: center;
    padding: 0;
  }

  .nav-link.active::before {
    left: -12px;
  }

  .filter-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter-panel .field:first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 720px) {
  .app-shell {
    display: block;
  }

  .sidebar {
    position: fixed;
    z-index: 50;
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 64px;
    display: block;
    padding: var(--space-2) var(--space-3);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 0;
  }

  .brand,
  .sidebar-footer {
    display: none;
  }

  .sidebar-nav {
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    gap: var(--space-1);
    margin: 0;
  }

  .nav-label {
    display: none;
  }

  .nav-link {
    min-width: 54px;
    min-height: 48px;
    display: grid;
    place-items: center;
    gap: 0;
  }

  .nav-link.active::before {
    top: -8px;
    left: 50%;
    width: 22px;
    height: 3px;
    border-radius: 0 0 3px 3px;
    transform: translateX(-50%);
  }

  .main-area {
    padding-bottom: 64px;
  }

  .topbar {
    height: 60px;
    padding: 0 var(--space-4);
  }

  .breadcrumb span,
  .breadcrumb svg {
    display: none;
  }

  .page-content {
    padding: var(--space-6) var(--space-4);
  }

  .page-header {
    align-items: stretch;
    flex-direction: column;
    gap: var(--space-4);
  }

  .page-header .button {
    align-self: flex-start;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .metric-card {
    padding: var(--space-4);
  }

  .metric-value {
    margin-top: var(--space-2);
    font-size: 24px;
  }

  .card-header {
    align-items: flex-start;
    padding: var(--space-4);
  }

  .filter-panel {
    grid-template-columns: 1fr;
    padding: var(--space-4);
  }

  .filter-panel .field:first-child {
    grid-column: auto;
  }

  .users-table th,
  .users-table td {
    padding: var(--space-3) var(--space-4);
  }

  .table-footer {
    padding: var(--space-4);
  }

  .modal-header {
    padding: var(--space-5) var(--space-5) var(--space-4);
  }

  .modal-body {
    padding: 0 var(--space-5) var(--space-5);
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .modal-actions .button {
    width: 100%;
  }

  .toast {
    right: var(--space-4);
    bottom: 80px;
    left: var(--space-4);
    max-width: none;
  }
}

@media (max-width: 460px) {
  .avatar-button .chevron,
  .avatar-button .user-avatar + span {
    display: none;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .card-header {
    flex-direction: column;
  }

  .filter-button {
    width: 100%;
    justify-content: center;
  }

  .users-table {
    min-width: 760px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

```html file=users.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="NewEra Copilot 团队成员管理页面">
  <title>成员管理 | NewEra Copilot</title>
  <link rel="stylesheet" href="users.css">
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar" aria-label="主导航">
      <a class="brand" href="index.html" aria-label="NewEra Copilot 首页">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 7.5 12 3l6 4.5v9L12 21l-6-4.5z" />
            <path d="m9 9 3-2 3 2v4l-3 2-3-2z" />
          </svg>
        </span>
        <span class="brand-copy">
          <strong>NewEra</strong>
          <span>Copilot Workspace</span>
        </span>
      </a>

      <nav class="sidebar-nav">
        <p class="nav-label">工作区</p>
        <a class="nav-link" href="index.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 11.5 12 4l9 7.5" />
            <path d="M5.5 10v10h13V10M9 20v-6h6v6" />
          </svg>
          <span>概览</span>
        </a>
        <a class="nav-link" href="projects.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 6.5h7l2 2h9v10H3z" />
          </svg>
          <span>项目</span>
          <span class="nav-count">6</span>
        </a>
        <a class="nav-link" href="tasks.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="m8 9 1.5 1.5L12 8M8 15h8M8 18h5" />
          </svg>
          <span>任务</span>
          <span class="nav-count">12</span>
        </a>
        <a class="nav-link" href="documents.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 3h8l4 4v14H6z" />
            <path d="M14 3v5h4M9 12h6M9 16h6" />
          </svg>
          <span>文档</span>
        </a>
        <a class="nav-link active" href="users.html" aria-current="page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 19c.4-4 2.2-6 5.5-6s5.1 2 5.5 6M16 7.5a2.5 2.5 0 1 1 0 5M17 14c2.1.5 3.3 2.1 3.5 5" />
          </svg>
          <span>成员</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <strong>团队空间已启用</strong>
        <p>邀请成员并统一管理访问权限。</p>
        <a href="users.html#team-settings">管理空间设置</a>
      </div>
    </aside>

    <div class="main-area">
      <header class="topbar">
        <div class="breadcrumb" aria-label="面包屑">
          <span>设置</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <strong>成员管理</strong>
        </div>

        <div class="topbar-actions">
          <button class="icon-button" type="button" aria-label="帮助中心" title="帮助中心" data-demo-action="帮助中心功能正在准备中">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M9.8 9a2.4 2.4 0 1 1 3.2 2.3c-.8.4-1 .8-1 1.7M12 17h.01" />
            </svg>
          </button>

          <div class="user-menu-wrap">
            <button class="avatar-button" id="user-menu-trigger" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="user-menu">
              <span class="user-avatar" aria-hidden="true">陈</span>
              <span>陈思远</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div class="user-menu" id="user-menu" role="menu" hidden>
              <div class="menu-profile">
                <strong>陈思远</strong>
                <span>工作区管理员</span>
              </div>
              <button class="menu-item" type="button" role="menuitem" data-demo-action="个人资料功能正在准备中">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="3" />
                  <path d="M5 20c.5-4 2.8-6 7-6s6.5 2 7 6" />
                </svg>
                个人资料
              </button>
              <button class="menu-item menu-item-danger" id="logout-button" type="button" role="menuitem">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10" />
                </svg>
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="page-content">
        <section class="page-header" aria-labelledby="page-title">
          <div>
            <h1 id="page-title">成员管理</h1>
            <p>管理工作区成员、角色和访问状态。邀请链接将在成员接受邀请后自动失效。</p>
          </div>
          <button class="button" id="invite-button" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            邀请成员
          </button>
        </section>

        <section class="metrics-grid" aria-label="成员统计">
          <article class="metric-card">
            <div class="metric-top">
              <span class="metric-label">全部成员</span>
              <span class="metric-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3.5 19c.4-4 2.2-6 5.5-6s5.1 2 5.5 6M16 7.5a2.5 2.5 0 1 1 0 5M17 14c2.1.5 3.3 2.1 3.5 5" />
                </svg>
              </span>
            </div>
            <strong class="metric-value">24</strong>
            <span class="metric-note">本工作区成员总数</span>
          </article>

          <article class="metric-card">
            <div class="metric-top">
              <span class="metric-label">活跃成员</span>
              <span class="metric-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m5 12 4 4L19 6" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </span>
            </div>
            <strong class="metric-value">21</strong>
            <span class="metric-note">过去 30 天保持活跃</span>
          </article>

          <article class="metric-card">
            <div class="metric-top">
              <span class="metric-label">待接受邀请</span>
              <span class="metric-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
            </div>
            <strong class="metric-value">3</strong>
            <span class="metric-note">邀请将在 7 天后失效</span>
          </article>
        </section>

        <section class="content-card" aria-labelledby="members-heading">
          <div class="card-header">
            <div class="card-heading">
              <h2 id="members-heading">工作区成员</h2>
              <p>共 24 名成员，当前显示 7 条记录</p>
            </div>

            <button class="filter-button" id="filter-button" type="button" aria-expanded="false" aria-controls="filter-panel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              筛选
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          <div class="filter-panel" id="filter-panel" hidden>
            <div class="field">
              <label for="user-search">搜索成员</label>
              <div class="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="6" />
                  <path d="m16 16 4 4" />
                </svg>
                <input class="text-input" id="user-search" type="search" placeholder="输入姓名或邮箱">
              </div>
            </div>

            <div class="field">
              <label for="status-filter">成员状态</label>
              <select class="select-input" id="status-filter">
                <option value="all">全部状态</option>
                <option value="active">活跃</option>
                <option value="inactive">已停用</option>
                <option value="pending">待接受</option>
              </select>
            </div>

            <div class="field">
              <label for="role-filter">成员角色</label>
              <select class="select-input" id="role-filter">
                <option value="all">全部角色</option>
                <option value="admin">管理员</option>
                <option value="editor">编辑者</option>
                <option value="viewer">观察者</option>
              </select>
            </div>

            <button class="button button-secondary" id="reset-filter-button" type="button">重置筛选</button>
          </div>

          <div class="table-wrap">
            <table class="users-table">
              <thead>
                <tr>
                  <th scope="col">成员</th>
                  <th scope="col">角色</th>
                  <th scope="col">状态</th>
                  <th scope="col">最近活跃</th>
                  <th scope="col"><span class="sr-only">操作</span></th>
                </tr>
              </thead>
              <tbody id="users-table-body">
                <tr data-name="陈思远" data-email="siyuan.chen@newera.cn" data-status="active" data-role="admin">
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar" aria-hidden="true">陈</div>
                      <div>
                        <strong>陈思远</strong>
                        <span class="user-email">siyuan.chen@newera.cn</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="role-badge">管理员</span></td>
                  <td><span class="status-badge status-active"><span class="status-dot"></span>活跃</span></td>
                  <td>刚刚</td>
                  <td>
                    <button class="icon-button danger-button" type="button" aria-label="删除 陈思远" title="删除成员">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </td>
                </tr>

                <tr data-name="林若涵" data-email="ruohan.lin@newera.cn" data-status="active" data-role="editor">
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar" aria-hidden="true">林</div>
                      <div>
                        <strong>林若涵</strong>
                        <span class="user-email">ruohan.lin@newera.cn</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="role-badge">编辑者</span></td>
                  <td><span class="status-badge status-active"><span class="status-dot"></span>活跃</span></td>
                  <td>5 分钟前</td>
                  <td>
                    <button class="icon-button danger-button" type="button" aria-label="删除 林若涵" title="删除成员">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </td>
                </tr>

                <tr data-name="周景行" data-email="jingxing.zhou@newera.cn" data-status="active" data-role="editor">
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar" aria-hidden="true">周</div>
                      <div>
                        <strong>周景行</strong>
                        <span class="user-email">jingxing.zhou@newera.cn</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="role-badge">编辑者</span></td>
                  <td><span class="status-badge status-active"><span class="status-dot"></span>活跃</span></td>
                  <td>32 分钟前</td>
                  <td>
                    <button class="icon-button danger-button" type="button" aria-label="删除 周景行" title="删除成员">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </td>
                </tr>

                <tr data-name="许安然" data-email="anran.xu@newera.cn" data-status="inactive" data-role="viewer">
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar user-avatar-muted" aria-hidden="true">许</div>
                      <div>
                        <strong>许安然</strong>
                        <span class="user-email">anran.xu@newera.cn</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="role-badge">观察者</span></td>
                  <td><span class="status-badge status-inactive"><span class="status-dot"></span>已停用</span></td>
                  <td>12 天前</td>
                  <td>
                    <button class="icon-button danger-button" type="button" aria-label="删除 许安然" title="删除成员">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </td>
                </tr>

                <tr data-name="沈嘉宁" data-email="jianing.shen@newera.cn" data-status="pending" data-role="editor">
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar user-avatar-muted" aria-hidden="true">沈</div>
                      <div>
                        <strong>沈嘉宁</strong>
                        <span class="user-email">jianing.shen@newera.cn</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="role-badge">编辑者</span></td>
                  <td><span class="status-badge status-pending"><span class="status-dot"></span>待接受</span></td>
                  <td>尚未登录</td>
                  <td>
                    <button class="icon-button danger-button" type="button" aria-label="删除 沈嘉宁" title="删除成员">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </td>
                </tr>

                <tr data-name="顾言川" data-email="yanchuan.gu@newera.cn" data-status="active" data-role="viewer">
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar" aria-hidden="true">顾</div>
                      <div>
                        <strong>顾言川</strong>
                        <span class="user-email">yanchuan.gu@newera.cn</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="role-badge">观察者</span></td>
                  <td><span class="status-badge status-active"><span class="status-dot"></span>活跃</span></td>
                  <td>昨天</td>
                  <td>
                    <button class="icon-button danger-button" type="button" aria-label="删除 顾言川" title="删除成员">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </td>
                </tr>

                <tr data-name="宋知夏" data-email="zhixia.song@newera.cn" data-status="pending" data-role="viewer">
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar user-avatar-muted" aria-hidden="true">宋</div>
                      <div>
                        <strong>宋知夏</strong>
                        <span class="user-email">zhixia.song@newera.cn</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="role-badge">观察者</span></td>
                  <td><span class="status-badge status-pending"><span class="status-dot"></span>待接受</span></td>
                  <td>尚未登录</td>
                  <td>
                    <button class="icon-button danger-button" type="button" aria-label="删除 宋知夏" title="删除成员">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="empty-state" id="users-empty-state" hidden>
            <span class="empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="6" />
                <path d="m16 16 4 4M8.5 11h5" />
              </svg>
            </span>
            <h3>没有找到匹配的成员</h3>
            <p>请调整搜索关键词或筛选条件后重试。</p>
          </div>

          <div class="table-footer">
            <span>显示 1–7 条，共 24 条</span>
            <div class="pagination" aria-label="分页">
              <button class="page-button" type="button" aria-label="上一页" disabled>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button class="page-button active" type="button" aria-current="page">1</button>
              <button class="page-button" type="button">2</button>
              <button class="page-button" type="button">3</button>
              <button class="page-button" type="button">4</button>
              <button class="page-button" type="button" aria-label="下一页">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>

  <div class="modal" id="invite-modal" role="dialog" aria-modal="true" aria-labelledby="invite-modal-title" hidden>
    <div class="modal-dialog">
      <div class="modal-header">
        <div>
          <h2 id="invite-modal-title">邀请新成员</h2>
          <p>成员将收到一封包含工作区访问链接的邀请邮件。</p>
        </div>
        <button class="icon-button modal-close" id="invite-close-button" type="button" aria-label="关闭邀请窗口">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <form class="form-stack" id="invite-form">
          <div class="field">
            <label for="invite-email">邮箱地址</label>
            <input class="text-input" id="invite-email" name="email" type="email" autocomplete="email" placeholder="name@company.com" required>
          </div>

          <div class="field">
            <label for="invite-role">成员角色</label>
            <select class="select-input" id="invite-role" name="role" required>
              <option value="viewer">观察者，可查看工作区内容</option>
              <option value="editor">编辑者，可创建和修改内容</option>
              <option value="admin">管理员，可管理成员和设置</option>
            </select>
          </div>

          <div class="modal-actions">
            <button class="button button-secondary" id="invite-cancel-button" type="button">取消</button>
            <button class="button" id="invite-submit-button" type="submit">发送邀请</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title" hidden>
    <div class="modal-dialog confirm-dialog">
      <div class="modal-header">
        <div>
          <h2 id="confirm-modal-title">删除成员</h2>
        </div>
        <button class="icon-button modal-close" id="confirm-close-button" type="button" aria-label="关闭确认窗口">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <p class="confirm-message" id="confirm-modal-message"></p>
        <div class="modal-actions">
          <button class="button button-secondary" id="confirm-cancel-button" type="button">取消</button>
          <button class="button button-danger" id="confirm-delete-button" type="button">确认删除</button>
        </div>
      </div>
    </div>
  </div>

  <div class="toast" id="toast" role="status" aria-live="polite" hidden></div>

  <script>
    const userTrigger = document.getElementById("user-menu-trigger");
    const userMenu = document.getElementById("user-menu");

    function setMenuState(open) {
      userMenu.hidden = !open;
      userTrigger.setAttribute("aria-expanded", String(open));
    }

    userTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenuState(userMenu.hidden);
    });

    document.addEventListener("click", (event) => {
      if (!userMenu.hidden && !userMenu.contains(event.target)) {
        setMenuState(false);
      }
    });

    document.getElementById("logout-button").addEventListener("click", () => {
      window.location.href = "index.html";
    });

    const filterButton = document.getElementById("filter-button");
    const filterPanel = document.getElementById("filter-panel");
    const searchInput = document.getElementById("user-search");
    const statusFilter = document.getElementById("status-filter");
    const roleFilter = document.getElementById("role-filter");
    const tableBody = document.getElementById("users-table-body");
    const emptyState = document.getElementById("users-empty-state");

    filterButton.addEventListener("click", () => {
      const open = filterPanel.hidden;
      filterPanel.hidden = !open;
      filterButton.setAttribute("aria-expanded", String(open));
    });

    function filterRows() {
      const query = searchInput.value.trim().toLowerCase();
      const status = statusFilter.value;
      const role = roleFilter.value;
      const rows = Array.from(tableBody.querySelectorAll("tr"));
      let visibleCount = 0;

      rows.forEach((row) => {
        const name = row.dataset.name.toLowerCase();
        const email = row.dataset.email.toLowerCase();
        const matchesQuery = !query || name.includes(query) || email.includes(query);
        const matchesStatus = status === "all" || row.dataset.status === status;
        const matchesRole = role === "all" || row.dataset.role === role;
        const visible = matchesQuery && matchesStatus && matchesRole;

        row.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      emptyState.hidden = visibleCount !== 0;
    }

    searchInput.addEventListener("input", filterRows);
    statusFilter.addEventListener("change", filterRows);
    roleFilter.addEventListener("change", filterRows);

    document.getElementById("reset-filter-button").addEventListener("click", () => {
      searchInput.value = "";
      statusFilter.value = "all";
      roleFilter.value = "all";
      filterRows();
    });

    const inviteModal = document.getElementById("invite-modal");
    const inviteButton = document.getElementById("invite-button");
    const inviteCloseButton = document.getElementById("invite-close-button");
    const inviteForm = document.getElementById("invite-form");
    const inviteEmail = document.getElementById("invite-email");
    const inviteRole = document.getElementById("invite-role");
    const inviteModalTitle = document.getElementById("invite-modal-title");
    const inviteSubmitButton = document.getElementById("invite-submit-button");

    function openInviteModal() {
      inviteModal.hidden = false;
      document.body.classList.add("modal-open");
      inviteModalTitle.textContent = "邀请新成员";
      inviteSubmitButton.textContent = "发送邀请";
      inviteForm.reset();
      inviteEmail.focus();
    }

    function closeInviteModal() {
      inviteModal.hidden = true;
      document.body.classList.remove("modal-open");
      inviteButton.focus();
    }

    inviteButton.addEventListener("click", openInviteModal);
    inviteCloseButton.addEventListener("click", closeInviteModal);

    inviteModal.addEventListener("click", (event) => {
      if (event.target === inviteModal) {
        closeInviteModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (!inviteModal.hidden) {
          closeInviteModal();
        }

        if (!userMenu.hidden) {
          setMenuState(false);
          userTrigger.focus();
        }
      }
    });

    inviteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = inviteEmail.value.trim();
      const role = inviteRole.value;
      const row = document.createElement("tr");

      row.dataset.name = email.split("@")[0] || "新成员";
      row.dataset.email = email;
      row.dataset.status = "pending";
      row.dataset.role = role;

      const roleLabel = role === "admin" ? "管理员" : role === "editor" ? "编辑者" : "观察者";

      row.innerHTML = `
        <td>
          <div class="user-cell">
            <div class="user-avatar user-avatar-muted" aria-hidden="true">新</div>
            <div>
              <strong>${row.dataset.name}</strong>
              <span class="user-email">${email}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="role-badge">${roleLabel}</span>
        </td>
        <td>
          <span class="status-badge status-pending">待接受</span>
        </td>
        <td>刚刚</td>
        <td>
          <button class="icon-button danger-button" type="button" aria-label="删除 ${email}" title="删除成员">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
            </svg>
          </button>
        </td>
      `;

      tableBody.appendChild(row);
      emptyState.hidden = true;
      closeInviteModal();
      filterRows();
    });

    tableBody.addEventListener("click", (event) => {
      const deleteButton = event.target.closest(".danger-button");

      if (!deleteButton) {
        return;
      }

      const row = deleteButton.closest("tr");
      const userName = row.dataset.name;
      const userEmail = row.dataset.email;
      const confirmModal = document.getElementById("confirm-modal");
      const confirmTitle = document.getElementById("confirm-modal-title");
      const confirmMessage = document.getElementById("confirm-modal-message");
      const confirmDeleteButton = document.getElementById("confirm-delete-button");
      const confirmCancelButton = document.getElementById("confirm-cancel-button");
      const confirmCloseButton = document.getElementById("confirm

## 前端工程师

下面是修订后的完整可运行成果。`app.js` 已补全，并加入确定性测试钩子；CSS 焦点状态、设计变量、品牌区和二维码结构均已调整。

## 文件清单

- `index.html`
- `styles.css`
- `app.js`
- `app.html`
- `401.html`
- `403.html`
- `404.html`
- `terms.html`
- `privacy.html`
- `README.md`
- `TEST_REPORT.md`
- `screenshots/README.md`

---

```html file=index.html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>登录 - NewEra Copilot</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="login-page">
  <div class="page-notice" id="topNotice" role="status" aria-live="polite" hidden>
    <div class="page-notice-inner">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 11v5M12 8h.01"></path>
      </svg>
      <span id="topNoticeText"></span>
      <button type="button" class="notice-close" id="noticeClose" aria-label="关闭提示">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m7 7 10 10M17 7 7 17"></path>
        </svg>
      </button>
    </div>
  </div>

  <main class="login-shell">
    <section class="brand-panel" aria-label="产品介绍">
      <div class="brand-content">
        <a class="brand" href="index.html" aria-label="NewEra Copilot 首页">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M8 23V9h5.2l5.6 8.2V9H24v14h-5.1l-5.7-8.3V23H8Z" fill="currentColor"></path>
            </svg>
          </span>
          <span>NewEra Copilot</span>
        </a>

        <div class="brand-copy">
          <p class="eyebrow">企业智能协作平台</p>
          <h1>一个身份，安全访问<br>所有工作空间</h1>
          <p>统一管理团队账号与访问权限，让每一次协作都简单、可靠。</p>
        </div>

        <ul class="feature-list">
          <li>
            <span class="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3 4.5 6v5.5c0 4.5 3 8.1 7.5 9.5 4.5-1.4 7.5-5 7.5-9.5V6L12 3Z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </span>
            <span>
              <strong>统一身份</strong>
              <small>一次登录，安全访问全部服务</small>
            </span>
          </li>
          <li>
            <span class="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="10" width="14" height="10" rx="2"></rect>
                <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
              </svg>
            </span>
            <span>
              <strong>权限可控</strong>
              <small>清晰的角色与访问边界</small>
            </span>
          </li>
          <li>
            <span class="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 7v5l3 2"></path>
              </svg>
            </span>
            <span>
              <strong>持续在线</strong>
              <small>稳定的会话与跨设备体验</small>
            </span>
          </li>
        </ul>
      </div>
      <div class="brand-decoration" aria-hidden="true"></div>
    </section>

    <section class="form-panel">
      <div class="mobile-brand" aria-label="NewEra Copilot">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M8 23V9h5.2l5.6 8.2V9H24v14h-5.1l-5.7-8.3V23H8Z" fill="currentColor"></path>
          </svg>
        </span>
        <span>NewEra Copilot</span>
      </div>

      <div class="login-card">
        <header class="card-header">
          <h2>登录</h2>
          <p>使用企业统一身份继续</p>
        </header>

        <div class="tabs" role="tablist" aria-label="登录方式">
          <span class="tab-indicator" id="tabIndicator" aria-hidden="true"></span>
          <button id="passwordTab" class="tab is-active" role="tab" aria-selected="true" aria-controls="passwordPanel" type="button">
            账号密码
          </button>
          <button id="smsTab" class="tab" role="tab" aria-selected="false" aria-controls="smsPanel" type="button">
            短信验证码
          </button>
          <button id="qrTab" class="tab" role="tab" aria-selected="false" aria-controls="qrPanel" type="button">
            扫码登录
          </button>
        </div>

        <div id="passwordPanel" class="auth-panel" role="tabpanel" aria-labelledby="passwordTab">
          <form id="passwordForm" novalidate>
            <div class="field">
              <label for="account">账号</label>
              <div class="input-shell" id="accountShell">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4"></circle>
                  <path d="M5 20a7 7 0 0 1 14 0"></path>
                </svg>
                <input id="account" name="account" type="text" autocomplete="username" placeholder="请输入邮箱或用户名" aria-describedby="accountError">
              </div>
              <p class="field-error" id="accountError" aria-live="polite"></p>
            </div>

            <div class="field">
              <label for="password">密码</label>
              <div class="input-shell" id="passwordShell">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="10" rx="2"></rect>
                  <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
                </svg>
                <input id="password" name="password" type="password" autocomplete="current-password" placeholder="请输入密码" aria-describedby="passwordError">
                <button class="input-action" id="togglePassword" type="button" aria-label="显示密码" aria-pressed="false">
                  <svg class="eye-open" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"></path>
                    <circle cx="12" cy="12" r="2.5"></circle>
                  </svg>
                  <svg class="eye-closed" viewBox="0 0 24 24" aria-hidden="true" hidden>
                    <path d="m4 4 16 16M10.6 6.1A8 8 0 0 1 12 6c5.5 0 9 6 9 6a13 13 0 0 1-2.1 2.7M6.2 6.2C4 8 3 12 3 12s3.5 6 9 6c1 0 2-.2 2.8-.5"></path>
                  </svg>
                </button>
              </div>
              <p class="field-error" id="passwordError" aria-live="polite"></p>
            </div>

            <div class="form-row">
              <label class="checkbox-label">
                <input id="rememberAccount" type="checkbox">
                <span class="checkbox" aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="m3 8 3 3 7-7"></path>
                  </svg>
                </span>
                <span>记住账号</span>
              </label>
              <button type="button" class="text-button" id="forgotPassword">忘记密码？</button>
            </div>

            <button class="primary-button" id="passwordSubmit" type="submit">
              <span class="button-label">登录</span>
              <span class="spinner" aria-hidden="true"></span>
            </button>
          </form>
        </div>

        <div id="smsPanel" class="auth-panel" role="tabpanel" aria-labelledby="smsTab" hidden>
          <form id="smsForm" novalidate>
            <div class="field">
              <label for="phone">手机号</label>
              <div class="input-shell" id="phoneShell">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="7" y="3" width="10" height="18" rx="2"></rect>
                  <path d="M10 6h4M11 18h2"></path>
                </svg>
                <input id="phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" maxlength="11" placeholder="请输入 11 位手机号" aria-describedby="phoneError">
              </div>
              <p class="field-error" id="phoneError" aria-live="polite"></p>
            </div>

            <div class="field">
              <label for="smsCode">短信验证码</label>
              <div class="input-shell code-shell" id="smsCodeShell">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 5h14v14H5z"></path>
                  <path d="M8 9h8M8 12h5M8 15h3"></path>
                </svg>
                <input id="smsCode" name="smsCode" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="请输入 6 位验证码" aria-describedby="smsCodeError">
                <button id="sendCode" class="code-button" type="button">获取验证码</button>
              </div>
              <p class="field-error" id="smsCodeError" aria-live="polite"></p>
              <p class="field-hint">演示验证码：123456</p>
            </div>

            <button class="primary-button" id="smsSubmit" type="submit">
              <span class="button-label">登录</span>
              <span class="spinner" aria-hidden="true"></span>
            </button>
          </form>
        </div>

        <div id="qrPanel" class="auth-panel qr-panel" role="tabpanel" aria-labelledby="qrTab" hidden>
          <div class="qr-code" id="qrCode" aria-label="模拟登录二维码">
            <div class="qr-pattern" aria-hidden="true"></div>
            <span class="qr-corner qr-corner-top-left" aria-hidden="true"></span>
            <span class="qr-corner qr-corner-top-right" aria-hidden="true"></span>
            <span class="qr-corner qr-corner-bottom-left" aria-hidden="true"></span>
            <div class="qr-center" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3 4.5 6v5.5c0 4.5 3 8.1 7.5 9.5 4.5-1.4 7.5-5 7.5-9.5V6L12 3Z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
          </div>

          <div class="qr-status" id="qrStatus" aria-live="polite">
            <span class="status-dot" aria-hidden="true"></span>
            <strong id="qrStatusTitle">请使用企业微信扫码</strong>
            <p id="qrStatusText">扫码后将在手机上确认登录</p>
          </div>

          <button class="primary-button" id="qrSubmit" type="button" disabled>
            <span class="button-label">等待扫码</span>
            <span class="spinner" aria-hidden="true"></span>
          </button>

          <div class="qr-actions">
            <button type="button" class="text-button" id="refreshQr">刷新二维码</button>
            <span aria-hidden="true"></span>
            <button type="button" class="text-button" id="switchAccount">切换账号</button>
          </div>
        </div>

        <div class="divider"><span>其他登录方式</span></div>

        <div class="social-buttons" aria-label="第三方登录">
          <button type="button" aria-label="使用企业微信登录" data-social="企业微信">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.5 8.5c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2H8.7c-1.2 0-2.2-1-2.2-2.2S7.5 8.5 8.7 8.5h5.8Z"></path>
              <path d="M5.7 8.5c0-1.2 1-2.2 2.2-2.2h5.8c1.2 0 2.2 1 2.2 2.2v1.1H8.8a3.1 3.1 0 0 0-3.1 3.1v1.3H5.7v-5.5Z"></path>
              <path d="M18.3 14.5c0 1.2-1 2.2-2.2 2.2h-5.8c-1.2 0-2.2-1-2.2-2.2v-1.1h5.8a3.1 3.1 0 0 0 3.1-3.1v-1.3h1.3v5.5Z"></path>
            </svg>
          </button>
          <button type="button" aria-label="使用企业邮箱登录" data-social="企业邮箱">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2"></rect>
              <path d="m4 7 8 6 8-6"></path>
            </svg>
          </button>
          <button type="button" aria-label="使用组织账号登录" data-social="组织账号">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20V8l8-5 8 5v12M8 20v-6h8v6M9 9h.01M12 9h.01M15 9h.01"></path>
            </svg>
          </button>
        </div>

        <div class="agreement">
          <label class="checkbox-label">
            <input id="agreement" type="checkbox">
            <span class="checkbox" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="m3 8 3 3 7-7"></path>
              </svg>
            </span>
            <span>我已阅读并同意 <a href="terms.html" target="_blank" rel="noopener">《服务条款》</a><a href="privacy.html" target="_blank" rel="noopener">《隐私政策》</a></span>
          </label>
          <p class="field-error agreement-error" id="agreementError" aria-live="polite"></p>
        </div>
      </div>

      <p class="copyright">© 2026 NewEra Copilot. 安全连接企业数字工作空间。</p>
    </section>
  </main>

  <script src="app.js"></script>
</body>
</html>
```

```css file=styles.css
:root {
  --color-primary: #1f5eff;
  --color-primary-dark: #174bc7;
  --color-primary-soft: #edf3ff;
  --color-primary-softest: #f7f9ff;
  --color-text: #172033;
  --color-text-secondary: #667085;
  --color-text-muted: #98a2b3;
  --color-border: #d9deea;
  --color-border-strong: #b8c1d3;
  --color-surface: #ffffff;
  --color-surface-subtle: #f7f8fb;
  --color-surface-muted: #eef1f6;
  --color-success: #237a57;
  --color-success-soft: #edf8f3;
  --color-danger: #c43d4b;
  --color-danger-soft: #fff1f2;
  --color-on-primary-muted: rgba(255, 255, 255, .12);
  --color-on-primary-subtle: rgba(255, 255, 255, .18);
  --color-on-primary-soft: rgba(255, 255, 255, .08);
  --color-on-primary-faint: rgba(255, 255, 255, .10);
  --color-overlay: rgba(15, 23, 42, .48);
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 24px;
  --spacing-6: 32px;
  --spacing-7: 48px;
  --spacing-8: 64px;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-input: 8px;
  --radius-button: 8px;
  --radius-card: 12px;
  --radius-pill: 999px;
  --shadow-card: 0 8px 24px rgba(15, 23, 42, .08);
  --shadow-overlay: 0 16px 48px rgba(15, 23, 42, .16);
  --font-sans: system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 28px;
  --font-size-xxl: 32px;
  --transition: 180ms ease;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-surface-subtle);
}

body {
  margin: 0;
  min-height: 100vh;
  font-size: var(--font-size-base);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

body.modal-open {
  overflow: hidden;
}

button,
input {
  font: inherit;
}

button,
a,
input {
  -webkit-tap-highlight-color: transparent;
}

button {
  color: inherit;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

button:disabled {
  cursor: not-allowed;
}

[hidden] {
  display: none !important;
}

.login-page {
  overflow-x: hidden;
  background: var(--color-surface);
}

.page-notice {
  position: fixed;
  z-index: 90;
  top: 0;
  right: 0;
  left: 0;
  min-height: 48px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  background: var(--color-surface-subtle);
  box-shadow: var(--shadow-card);
}

.page-notice.is-success {
  border-color: var(--color-success);
  color: var(--color-success);
  background: var(--color-success-soft);
}

.page-notice.is-error {
  border-color: var(--color-danger);
  color: var(--color-danger);
  background: var(--color-danger-soft);
}

.page-notice-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--spacing-3);
  width: min(100% - 48px, 1440px);
  min-height: 48px;
  margin: 0 auto;
  font-size: var(--font-size-sm);
}

.page-notice svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.notice-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-input);
  color: currentColor;
  background: transparent;
  cursor: pointer;
  transition: background var(--transition);
}

.notice-close:hover {
  background: var(--color-surface-muted);
}

.login-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(420px, .65fr);
  min-height: 100vh;
}

.brand-panel {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: var(--spacing-8);
  color: var(--color-surface);
  background: linear-gradient(145deg, var(--color-primary-dark), var(--color-primary));
}

.brand-panel::before,
.brand-panel::after {
  position: absolute;
  content: "";
  border: 1px solid var(--color-on-primary-muted);
  border-radius: var(--radius-pill);
}

.brand-panel::before {
  width: 460px;
  height: 460px;
  right: -160px;
  top: -180px;
}

.brand-panel::after {
  width: 620px;
  height: 620px;
  right: -240px;
  top: -260px;
}

.brand-content {
  position: relative;
  z-index: 1;
  width: min(560px, 100%);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-3);
  color: var(--color-surface);
  font-size: var(--font-size-lg);
  font-weight: 700;
  letter-spacing: -.02em;
}

.brand:hover {
  text-decoration: none;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: var(--radius-input);
  color: var(--color-primary);
  background: var(--color-surface);
}

.brand-mark svg {
  width: 28px;
  height: 28px;
}

.brand-copy {
  margin-top: var(--spacing-8);
}

.eyebrow {
  margin: 0 0 var(--spacing-3);
  font-size: var(--font-size-sm);
  font-weight: 700;
  letter-spacing: .12em;
  opacity: .76;
}

.brand-copy h1 {
  margin: 0;
  font-size: clamp(var(--font-size-xxl), 3.2vw, 48px);
  line-height: 1.25;
  letter-spacing: -.035em;
}

.brand-copy > p:last-child {
  max-width: 480px;
  margin: var(--spacing-5) 0 0;
  font-size: var(--font-size-md);
  line-height: 1.8;
  opacity: .78;
}

.feature-list {
  display: grid;
  gap: var(--spacing-5);
  margin: var(--spacing-8) 0 0;
  padding: 0;
  list-style: none;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  border: 1px solid var(--color-on-primary-subtle);
  border-radius: var(--radius-card);
  background: var(--color-on-primary-faint);
}

.feature-icon svg,
.input-shell > svg,
.input-action svg,
.page-notice svg,
.social-buttons svg,
.modal-icon svg,
.app-card-icon svg,
.error-illustration svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.feature-list strong,
.feature-list small {
  display: block;
}

.feature-list strong {
  font-size: var(--font-size-base);
}

.feature-list small {
  margin-top: var(--spacing-1);
  font-size: var(--font-size-sm);
  opacity: .68;
}

.brand-decoration {
  position: absolute;
  right: 10%;
  bottom: 12%;
  width: 120px;
  height: 120px;
  border: 24px solid var(--color-on-primary-soft);
  transform: rotate(45deg);
}

.form-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: var(--spacing-7) var(--spacing-6);
  background: var(--color-surface);
}

.login-card {
  width: min(100%, 420px);
  padding: var(--spacing-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.mobile-brand {
  display: none;
}

.card-header h2 {
  margin: 0;
  font-size: var(--font-size-xxl);
  line-height: 1.3;
  letter-spacing: -.03em;
}

.card-header p {
  margin: var(--spacing-2) 0 0;
  color: var(--color-text-secondary);
}

.tabs {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: var(--spacing-6) 0 var(--spacing-5);
  border-bottom: 1px solid var(--color-border);
}

.tab {
  position: relative;
  z-index: 1;
  min-height: 44px;
  padding: 0 var(--spacing-2) var(--spacing-3);
  border: 0;
  color: var(--color-text-secondary);
  background: transparent;
  font-weight: 600;
  cursor: pointer;
  transition: color var(--transition);
}

.tab:hover {
  color: var(--color-primary);
}

.tab.is-active {
  color: var(--color-primary);
}

.tab-indicator {
  position: absolute;
  z-index: 0;
  bottom: -1px;
  left: 0;
  width: 33.333%;
  height: 2px;
  background: var(--color-primary);
  transition: transform var(--transition);
}

.auth-panel {
  min-height: 316px;
}

.field {
  margin-bottom: var(--spacing-4);
}

.field label {
  display: inline-block;
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: 650;
}

.input-shell {
  display: flex;
  align-items: center;
  min-height: 46px;
  padding: 0 var(--spacing-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-input);
  color: var(--color-text-muted);
  background: var(--color-surface);
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
}

.input-shell:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
}

.input-shell.has-error {
  border-color: var(--color-danger);
  background: var(--color-danger-soft);
}

.input-shell input {
  width: 100%;
  min-width: 0;
  height: 44px;
  padding: 0 var(--spacing-3);
  border: 0;
  outline: 0;
  color: var(--color-text);
  background: transparent;
}

.input-shell input::placeholder {
  color: var(--color-text-muted);
}

.input-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  border-radius: var(--radius-input);
  color: var(--color-text-muted);
  background: transparent;
  cursor: pointer;
  transition: color var(--transition), background var(--transition);
}

.input-action:hover {
  color: var(--color-text-secondary);
  background: var(--color-surface-subtle);
}

.field-error {
  min-height: 18px;
  margin: var(--spacing-1) 0 0;
  color: var(--color-danger);
  font-size: var(--font-size-xs);
  line-height: 18px;
}

.field-hint {
  min-height: 18px;
  margin: var(--spacing-1) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  margin: var(--spacing-1) 0 var(--spacing-5);
}

.checkbox-label {
  display: inline-flex !important;
  align-items: flex-start;
  gap: var(--spacing-2);
  margin: 0 !important;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 400 !important;
  cursor: pointer;
}

.checkbox-label input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  margin-top: 2px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  color: var(--color-surface);
  background: var(--color-surface);
  transition: background var(--transition), border-color var(--transition);
}

.checkbox svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.checkbox-label input:checked + .checkbox {
  border-color: var(--color-primary);
  background: var(--color-primary);
}

.checkbox-label input:focus-visible + .checkbox {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.text-button {
  padding: var(--spacing-1) 0;
  border: 0;
  color: var(--color-primary);
  background: transparent;
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
}

.text-button:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  width: 100%;
  min-height: 44px;
  padding: 0 var(--spacing-5);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-button);
  color: var(--color-surface);
  background: var(--color-primary);
  font-weight: 700;
  cursor: pointer;
  transition: background var(--transition), border-color var(--transition), transform var(--transition);
}

.primary-button:hover:not(:disabled) {
  border-color: var(--color-primary-dark);
  background: var(--color-primary-dark);
}

.primary-button:active:not(:disabled) {
  transform: translateY(1px);
}

.primary-button:disabled {
  border-color: var(--color-border);
  color: var(--color-text-muted);
  background: var(--color-surface-muted);
}

.spinner {
  display: none;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: var(--radius-pill);
  animation: spin .7s linear infinite;
}

.is-loading .spinner {
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.code-shell {
  padding-right: var(--spacing-1);
}

.code-button {
  min-width: 104px;
  min-height: 36px;
  padding: 0 var(--spacing-3);
  border: 0;
  border-left: 1px solid var(--color-border);
  color: var(--color-primary);
  background: transparent;
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: color var(--transition), background var(--transition);
}

.code-button:hover:not(:disabled) {
  color: var(--color-primary-dark);
}

.code-button:disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.qr-panel {
  text-align: center;
}

.qr-code {
  position: relative;
  width: 176px;
  height: 176px;
  margin: 0 auto var(--spacing-4);
  padding: var(--spacing-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.qr-pattern {
  position: absolute;
  inset: var(--spacing-3);
  background:
    linear-gradient(90deg, var(--color-text) 10%, transparent 10% 20%, var(--color-text) 20% 30%, transparent 30% 40%, var(--color-text) 40% 50%, transparent 50% 60%, var(--color-text) 60% 70%, transparent 70% 80%, var(--color-text) 80% 90%, transparent 90%),
    linear-gradient(var(--color-text) 10%, transparent 10% 20%, var(--color-text) 20% 30%, transparent 30% 40%, var(--color-text) 40% 50%, transparent 50% 60%, var(--color-text) 60% 70%, transparent 70% 80%, var(--color-text) 80% 90%, transparent 90%);
  background-size: 24px 24px;
  opacity: .9;
}

.qr-corner {
  position: absolute;
  z-index: 1;
  width: 42px;
  height: 42px;
  border: 7px solid var(--color-text);
  background: var(--color-surface);
}

.qr-corner::after {
  position: absolute;
  inset: 7px;
  content: "";
  border: 6px solid var(--color-text);
}

.qr-corner-top-left {
  top: var(--spacing-3);
  left: var(--spacing-3);
}

.qr-corner-top-right {
  top: var(--spacing-3);
  right: var(--spacing-3);
}

.qr-corner-bottom-left {
  bottom: var(--spacing-3);
  left: var(--spacing-3);
}

.qr-center {
  position: absolute;
  z-index: 2;
  inset: 50% auto auto 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 4px solid var(--color-surface);
  border-radius: var(--radius-input);
  color: var(--color-surface);
  background: var(--color-primary);
  transform: translate(-50%, -50%);
}

.qr-center svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.qr-status {
  margin-bottom: var(--spacing-4);
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: var(--spacing-2);
  border-radius: var(--radius-pill);
  background: var(--color-text-muted);
}

.qr-status.is-ready .status-dot {
  background: var(--color-success);
}

.qr-status strong {
  font-size: var(--font-size-base);
}

.qr-status p {
  margin: var(--spacing-1) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.qr-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-3);
}

.qr-actions span {
  width: 1px;
  height: 16px;
  background: var(--color-border);
}

.divider {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin: var(--spacing-5) 0 var(--spacing-4);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.divider::before,
.divider::after {
  content: "";
  height: 1px;
  flex: 1;
  background: var(--color-border);
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
}

.social-buttons button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text-secondary);
  background: var(--color-surface-subtle);
  cursor: pointer;
  transition: color var(--transition), background var(--transition), transform var(--transition);
}

.social-buttons button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-softest);
}

.social-buttons button:active {
  transform: scale(.96);
}

.agreement {
  margin-top: var(--spacing-5);
}

.agreement .checkbox-label {
  line-height: 22px;
}

.agreement .field-error {
  margin-left: 24px;
}

.copyright {
  margin: var(--spacing-7) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  text-align: center;
}

.app-page {
  background: var(--color-surface-subtle);
}

.app-header {
  position: sticky;
  z-index: 20;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0 var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
  background: rgba(255, 255, 255, .94);
  backdrop-filter: blur(12px);
}

.app-header .brand {
  color: var(--color-text);
}

.app-header .brand-mark {
  color: var(--color-surface);
  background: var(--color-primary);
}

.app-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
  margin-left: auto;
  margin-right: var(--spacing-6);
}

.app-nav a {
  color: var(--color-text-secondary);
  font-weight: 600;
}

.app-nav a:hover,
.app-nav a.is-active {
  color: var(--color-primary);
  text-decoration: none;
}

.user-menu {
  position: relative;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  min-height: 40px;
  padding: var(--spacing-1) var(--spacing-2);
  border: 0;
  border-radius: var(--radius-input);
  background: transparent;
  cursor: pointer;
  transition: background var(--transition);
}

.user-trigger:hover,
.user-trigger[aria-expanded="true"] {
  background: var(--color-surface-subtle);
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-pill);
  color: var(--color-primary-dark);
  background: var(--color-primary-soft);
}

.avatar svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

.chevron {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--color-text-muted);
  stroke-width: 1.5;
  transition: transform var(--transition);
}

.user-trigger[aria-expanded="true"] .chevron {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + var(--spacing-2));
  right: 0;
  width: 190px;
  padding: var(--spacing-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-overlay);
}

.user-dropdown-meta {
  padding: var(--spacing-3);
  border-bottom: 1px solid var(--color-border);
}

.user-dropdown-meta strong,
.user-dropdown-meta small {
  display: block;
}

.user-dropdown-meta small {
  margin-top: var(--spacing-1);
  color: var(--color-text-secondary);
}

.logout-button {
  width: 100%;
  margin-top: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  border: 0;
  border-radius: var(--radius-input);
  color: var(--color-danger);
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.logout-button:hover {
  background: var(--color-danger-soft);
}

.app-main {
  width: min(100% - 48px, 1120px);
  margin: 0 auto;
  padding: var(--spacing-7) 0;
}

.welcome-card {
  position: relative;
  overflow: hidden;
  padding: var(--spacing-7);
  border-radius: var(--radius-card);
  color: var(--color-surface);
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  box-shadow: var(--shadow-card);
}

.welcome-card::after {
  position: absolute;
  content: "";
  width: 240px;
  height: 240px;
  right: -80px;
  top: -100px;
  border: 36px solid var(--color-on-primary-soft);
  border-radius: var(--radius-pill);
}

.welcome-card p {
  margin: 0 0 var(--spacing-2);
  opacity: .72;
}

.welcome-card h1 {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: var(--font-size-xxl);
}

.session-meta {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-top: var(--spacing-5);
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-on-primary-subtle);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  background: var(--color-on-primary-faint);
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--spacing-6) 0 var(--spacing-4);
}

.section-heading h2 {
  margin: 0;
  font-size: var(--font-size-lg);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-4);
}

.app-card {
  min-height: 190px;
  padding: var(--spacing-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.app-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: var(--spacing-4);
  border-radius: var(--radius-input);
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.app-card h3 {
  margin: 0 0 var(--spacing-2);
  font-size: var(--font-size-md);
}

.app-card p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.app-card a {
  display: inline-block;
  margin-top: var(--spacing-4);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-5);
  background: var(--color-surface-subtle);
}

.error-card {
  width: min(100%, 560px);
  padding: var(--spacing-7);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  text-align: center;
}

.error-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  margin: 0 auto var(--spacing-5);
  border-radius: var(--radius-card);
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.error-illustration svg {
  width: 56px;
  height: 56px;
}

.error-code {
  margin: 0;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 700;
  letter-spacing: .12em;
}

.error-card h1 {
  margin: var(--spacing-2) 0 var(--spacing-3);
  font-size: var(--font-size-xl);
}

.error-card p {
  margin: 0 auto var(--spacing-5);
  max-width: 400px;
  color: var(--color-text-secondary);
}

.error-card .primary-button {
  width: auto;
  min-width: 148px;
}

.modal-backdrop {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  background: var(--color-overlay);
  backdrop-filter: blur(4px);
}

.modal {
  width: min(100%, 420px);
  padding: var(--spacing-6);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-overlay);
  text-align: center;
}

.modal-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: var(--spacing-4);
  border-radius: var(--radius-pill);
  color: var(--color-danger);
  background: var(--color-danger-soft);
}

.modal h2 {
  margin: 0;
  font-size: var(--font-size-xl);
}

.modal p {
  margin: var(--spacing-3) 0 var(--spacing-5);
  color: var(--color-text-secondary);
}

.policy-page {
  background: var(--color-surface-subtle);
}

.policy-header {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}

.policy-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 48px, 960px);
  min-height: 68px;
  margin: 0 auto;
}

.policy-content {
  width: min(100% - 48px, 760px);
  margin: 0 auto;
  padding: var(--spacing-7) 0;
}

.policy-content article {
  padding: var(--spacing-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.policy-content h1 {
  margin: 0 0 var(--spacing-5);
  font-size: var(--font-size-xl);
}

.policy-content h2 {
  margin: var(--spacing-6) 0 var(--spacing-3);
  font-size: var(--font-size-lg);
}

.policy-content p,
.policy-content li {
  color: var(--color-text-secondary);
}

.policy-content li {
  margin-bottom: var(--spacing-2);
}

@media (max-width: 1023px) {
  .login-shell {
    grid-template-columns: 1fr;
  }

  .brand-panel {
    display: none;
  }

  .form-panel {
    min-height: 100vh;
    padding: var(--spacing-6) var(--spacing-5);
  }

  .mobile-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    width: min(100%, 420px);
    margin-bottom: var(--spacing-6);
    color: var(--color-text);
    font-size: var(--font-size-md);
    font-weight: 700;
  }

  .mobile-brand .brand-mark {
    width: 34px;
    height: 34px;
    color: var(--color-surface);
    background: var(--color-primary);
  }

  .app-nav {
    display: none;
  }
}

@media (max-width: 640px) {
  .page-notice-inner,
  .policy-header-inner {
    width: min(100% - 32px, 1440px);
  }

  .form-panel {
    justify-content: flex-start;
    padding: var(--spacing-5) var(--spacing-4);
  }

  .mobile-brand {
    justify-content: flex-start;
    margin-bottom: var(--spacing-5);
  }

  .login-card {
    width: 100%;
    padding: var(--spacing-5);
  }

  .card-header h2 {
    font-size: var(--font-size-xl);
  }

  .tabs {
    margin-top: var(--spacing-5);
  }

  .auth-panel {
    min-height: 310px;
  }

  .copyright {
    margin-top: var(--spacing-6);
  }

  .app-header {
    height: 60px;
    padding: 0 var(--spacing-4);
  }

  .app-header .brand {
    font-size: var(--font-size-base);
  }

  .app-header .brand-mark {
    width: 32px;
    height: 32px;
  }

  .user-name {
    display: none;
  }

  .app-main {
    width: min(100% - 32px, 1120px);
    padding: var(--spacing-5) 0;
  }

  .welcome-card {
    padding: var(--spacing-5);
  }

  .welcome-card h1 {
    font-size: var(--font-size-xl);
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .app-card {
    min-height: 170px;
  }

  .policy-content {
    width: min(100% - 32px, 760px);
    padding: var(--spacing-5) 0;
  }

  .policy-content article {
    padding: var(--spacing-5);
  }
}

@media (max-width: 374px) {
  .form-panel {
    padding: var(--spacing-4) var(--spacing-3);
  }

  .login-card {
    padding: var(--spacing-4);
  }

  .tab {
    padding-right: 0;
    padding-left: 0;
    font-size: var(--font-size-sm);
  }

  .input-shell input {
    padding-right: var(--spacing-2);
    padding-left: var(--spacing-2);
  }

  .code-button {
    min-width: 92px;
    padding: 0 var(--spacing-2);
    font-size: var(--font-size-xs);
  }

  .agreement .checkbox-label {
    font-size: var(--font-size-xs);
  }

  .modal {
    padding: var(--spacing-5);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

```javascript file=app.js
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
```

## 文件：`login.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="NewEra Copilot SSO 登录">
  <title>登录 | NewEra Copilot</title>
  <style>
    :root {
      --color-primary: #3347b0;
      --color-primary-dark: #26398f;
      --color-primary-light: #eef1ff;
      --color-primary-soft: #f7f8ff;
      --color-text: #172033;
      --color-text-secondary: #647087;
      --color-text-tertiary: #929bae;
      --color-border: #dfe4ed;
      --color-border-strong: #c9d0dc;
      --color-background: #f4f6fa;
      --color-surface: #ffffff;
      --color-surface-muted: #f8f9fc;
      --color-success: #287a52;
      --color-success-light: #edf8f2;
      --color-error: #b43c48;
      --color-error-light: #fff1f2;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      --spacing-2xl: 48px;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --radius-pill: 999px;
      --shadow-card: 0 18px 50px rgba(24, 35, 64, 0.08);
      --shadow-button: 0 6px 16px rgba(51, 71, 176, 0.2);
      --font-family: Inter, "PingFang SC", "Microsoft YaHei", sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    html {
      min-width: 320px;
      background: var(--color-background);
    }

    body {
      min-height: 100vh;
      margin: 0;
      color: var(--color-text);
      background:
        radial-gradient(circle at 12% 18%, rgba(51, 71, 176, 0.08), transparent 30%),
        linear-gradient(135deg, #f8f9fc 0%, var(--color-background) 58%, #eef1f8 100%);
      font-family: var(--font-family);
      -webkit-font-smoothing: antialiased;
    }

    button,
    input {
      font: inherit;
    }

    button,
    a,
    label {
      -webkit-tap-highlight-color: transparent;
    }

    button {
      cursor: pointer;
    }

    button:disabled {
      cursor: not-allowed;
    }

    a {
      color: var(--color-primary);
      text-decoration: none;
    }

    a:hover {
      color: var(--color-primary-dark);
      text-decoration: underline;
    }

    .page-shell {
      position: relative;
      display: grid;
      min-height: 100vh;
      grid-template-columns: minmax(0, 1.05fr) minmax(440px, 0.95fr);
      overflow: hidden;
    }

    .brand-panel {
      position: relative;
      display: flex;
      min-height: 100vh;
      flex-direction: column;
      justify-content: space-between;
      padding: clamp(32px, 5vw, 72px);
      color: #ffffff;
      background:
        linear-gradient(145deg, rgba(38, 57, 143, 0.94), rgba(51, 71, 176, 0.82)),
        var(--color-primary);
    }

    .brand-panel::before,
    .brand-panel::after {
      position: absolute;
      content: "";
      pointer-events: none;
    }

    .brand-panel::before {
      top: 16%;
      right: -15%;
      width: 460px;
      height: 460px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 50%;
    }

    .brand-panel::after {
      right: 8%;
      bottom: 11%;
      width: 210px;
      height: 210px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 40px;
      transform: rotate(18deg);
    }

    .brand-header,
    .brand-content,
    .brand-footer {
      position: relative;
      z-index: 1;
    }

    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .brand-logo:hover {
      color: #ffffff;
      text-decoration: none;
    }

    .brand-logo-mark {
      display: grid;
      width: 40px;
      height: 40px;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
    }

    .brand-logo-mark svg {
      width: 23px;
      height: 23px;
    }

    .brand-content {
      width: min(560px, 100%);
      margin: auto 0;
      padding: 80px 0;
    }

    .brand-kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 var(--spacing-lg);
      color: rgba(255, 255, 255, 0.78);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .brand-kicker::before {
      width: 28px;
      height: 1px;
      content: "";
      background: rgba(255, 255, 255, 0.48);
    }

    .brand-title {
      max-width: 680px;
      margin: 0;
      font-size: clamp(36px, 4.4vw, 62px);
      font-weight: 700;
      line-height: 1.16;
      letter-spacing: -0.04em;
    }

    .brand-description {
      max-width: 540px;
      margin: var(--spacing-lg) 0 0;
      color: rgba(255, 255, 255, 0.74);
      font-size: 17px;
      line-height: 1.8;
    }

    .feature-list {
      display: grid;
      max-width: 560px;
      margin: var(--spacing-2xl) 0 0;
      padding: 0;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--spacing-md);
      list-style: none;
    }

    .feature-item {
      display: flex;
      min-height: 96px;
      flex-direction: column;
      justify-content: center;
      padding: var(--spacing-md) var(--spacing-lg);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.07);
      backdrop-filter: blur(8px);
    }

    .feature-title {
      margin: 0;
      font-size: 15px;
      font-weight: 650;
    }

    .feature-text {
      margin: 6px 0 0;
      color: rgba(255, 255, 255, 0.64);
      font-size: 13px;
      line-height: 1.5;
    }

    .brand-footer {
      color: rgba(255, 255, 255, 0.55);
      font-size: 13px;
    }

    .login-panel {
      position: relative;
      display: flex;
      min-height: 100vh;
      align-items: center;
      justify-content: center;
      padding: clamp(24px, 5vw, 64px);
      background: rgba(255, 255, 255, 0.6);
    }

    .login-card {
      width: min(440px, 100%);
      padding: clamp(28px, 4vw, 42px);
      border: 1px solid rgba(223, 228, 237, 0.9);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      box-shadow: var(--shadow-card);
    }

    .mobile-brand {
      display: none;
      margin-bottom: var(--spacing-xl);
      color: var(--color-text);
    }

    .mobile-brand:hover {
      color: var(--color-text);
      text-decoration: none;
    }

    .mobile-brand .brand-logo-mark {
      border-color: var(--color-border);
      background: var(--color-primary-light);
    }

    .mobile-brand .brand-logo-mark svg {
      color: var(--color-primary);
    }

    .login-header {
      margin-bottom: var(--spacing-xl);
    }

    .login-title {
      margin: 0;
      color: var(--color-text);
      font-size: 30px;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.025em;
    }

    .login-subtitle {
      margin: var(--spacing-sm) 0 0;
      color: var(--color-text-secondary);
      font-size: 14px;
      line-height: 1.65;
    }

    .login-form {
      display: grid;
      gap: var(--spacing-lg);
    }

    .field-group {
      display: grid;
      gap: var(--spacing-sm);
    }

    .field-label-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-md);
    }

    .field-label {
      color: var(--color-text);
      font-size: 14px;
      font-weight: 650;
    }

    .required-mark {
      margin-left: 3px;
      color: var(--color-error);
    }

    .field-link {
      color: var(--color-primary);
      font-size: 13px;
      font-weight: 600;
    }

    .input-shell {
      position: relative;
      display: flex;
      min-height: 48px;
      align-items: center;
      border: 1px solid var(--color-border-strong);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
    }

    .input-shell:hover {
      border-color: #aeb7c7;
    }

    .input-shell:focus-within {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(51, 71, 176, 0.12);
    }

    .input-shell.has-error {
      border-color: var(--color-error);
      background: var(--color-error-light);
    }

    .input-shell.has-error:focus-within {
      box-shadow: 0 0 0 3px rgba(180, 60, 72, 0.1);
    }

    .input-leading {
      display: grid;
      width: 46px;
      flex: 0 0 46px;
      place-items: center;
      color: var(--color-text-tertiary);
    }

    .input-leading svg {
      width: 19px;
      height: 19px;
    }

    .field-input {
      width: 100%;
      min-width: 0;
      height: 46px;
      padding: 0 var(--spacing-md) 0 0;
      border: 0;
      outline: 0;
      color: var(--color-text);
      background: transparent;
      font-size: 15px;
    }

    .field-input::placeholder {
      color: var(--color-text-tertiary);
    }

    .field-input:-webkit-autofill {
      transition: background-color 9999s ease-out;
      -webkit-text-fill-color: var(--color-text);
      box-shadow: 0 0 0 1000px var(--color-surface) inset;
    }

    .field-error {
      min-height: 18px;
      margin: -2px 0 0;
      color: var(--color-error);
      font-size: 12px;
      line-height: 1.5;
    }

    .password-wrap {
      position: relative;
      flex: 1;
      min-width: 0;
    }

    .password-wrap .field-input {
      padding-right: 72px;
    }

    .visibility-button {
      position: absolute;
      top: 50%;
      right: 6px;
      display: inline-flex;
      min-height: 36px;
      align-items: center;
      gap: 5px;
      padding: 0 8px;
      border: 0;
      border-radius: var(--radius-sm);
      color: var(--color-text-secondary);
      background: transparent;
      font-size: 12px;
      transform: translateY(-50%);
    }

    .visibility-button:hover {
      color: var(--color-primary);
      background: var(--color-primary-light);
    }

    .visibility-button:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 1px;
    }

    .visibility-button svg {
      width: 17px;
      height: 17px;
    }

    .password-strength {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 3px;
    }

    .strength-bar {
      height: 3px;
      overflow: hidden;
      border-radius: var(--radius-pill);
      background: var(--color-border);
    }

    .strength-bar::after {
      display: block;
      width: 0;
      height: 100%;
      content: "";
      border-radius: inherit;
      background: var(--color-primary);
      transition: width 180ms ease;
    }

    .password-strength[data-level="1"] .strength-bar.is-active::after,
    .password-strength[data-level="2"] .strength-bar.is-active::after {
      width: 100%;
    }

    .password-strength[data-level="3"] .strength-bar.is-active::after,
    .password-strength[data-level="4"] .strength-bar.is-active::after {
      width: 100%;
    }

    .strength-text {
      margin: 4px 0 0;
      color: var(--color-text-tertiary);
      font-size: 11px;
    }

    .sms-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 120px;
      gap: var(--spacing-sm);
    }

    .send-code-button {
      min-height: 48px;
      padding: 0 var(--spacing-sm);
      border: 1px solid var(--color-primary);
      border-radius: var(--radius-md);
      color: var(--color-primary);
      background: var(--color-primary-soft);
      font-size: 13px;
      font-weight: 650;
      transition: background 160ms ease, color 160ms ease, border-color 160ms ease, transform 160ms ease;
    }

    .send-code-button:hover:not(:disabled) {
      border-color: var(--color-primary-dark);
      color: var(--color-primary-dark);
      background: var(--color-primary-light);
    }

    .send-code-button:active:not(:disabled) {
      transform: translateY(1px);
    }

    .send-code-button:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    .send-code-button:disabled {
      border-color: var(--color-border);
      color: var(--color-text-tertiary);
      background: var(--color-surface-muted);
    }

    .form-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-md);
      margin-top: -4px;
    }

    .checkbox-label,
    .agreement-label {
      display: inline-flex;
      align-items: flex-start;
      gap: 9px;
      color: var(--color-text-secondary);
      cursor: pointer;
      font-size: 13px;
      line-height: 1.55;
    }

    .checkbox-label input,
    .agreement-label input {
      width: 16px;
      height: 16px;
      flex: 0 0 16px;
      margin: 2px 0 0;
      accent-color: var(--color-primary);
    }

    .checkbox-label input:focus-visible,
    .agreement-label input:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    .agreement-box {
      display: grid;
      gap: 5px;
    }

    .agreement-label {
      align-items: flex-start;
    }

    .agreement-error {
      min-height: 18px;
      margin: 0;
      color: var(--color-error);
      font-size: 12px;
      line-height: 1.5;
    }

    .submit-button {
      position: relative;
      display: inline-flex;
      width: 100%;
      min-height: 50px;
      align-items: center;
      justify-content: center;
      gap: 9px;
      border: 1px solid var(--color-primary);
      border-radius: var(--radius-md);
      color: #ffffff;
      background: var(--color-primary);
      box-shadow: var(--shadow-button);
      font-size: 15px;
      font-weight: 700;
      transition: background 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    }

    .submit-button:hover:not(:disabled) {
      border-color: var(--color-primary-dark);
      background: var(--color-primary-dark);
      box-shadow: 0 8px 20px rgba(51, 71, 176, 0.26);
    }

    .submit-button:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 3px 8px rgba(51, 71, 176, 0.2);
    }

    .submit-button:focus-visible {
      outline: 3px solid rgba(51, 71, 176, 0.24);
      outline-offset: 2px;
    }

    .submit-button:disabled {
      border-color: var(--color-border-strong);
      color: var(--color-text-tertiary);
      background: var(--color-border);
      box-shadow: none;
    }

    .loading-spinner {
      display: none;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.42);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 700ms linear infinite;
    }

    .submit-button.is-loading .loading-spinner {
      display: inline-block;
    }

    .login-divider {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin: var(--spacing-lg) 0;
      color: var(--color-text-tertiary);
      font-size: 12px;
    }

    .login-divider::before,
    .login-divider::after {
      height: 1px;
      flex: 1;
      content: "";
      background: var(--color-border);
    }

    .sso-button {
      display: inline-flex;
      width: 100%;
      min-height: 48px;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border: 1px solid var(--color-border-strong);
      border-radius: var(--radius-md);
      color: var(--color-text);
      background: var(--color-surface);
      font-size: 14px;
      font-weight: 650;
      transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
    }

    .sso-button:hover {
      border-color: var(--color-primary);
      background: var(--color-primary-soft);
    }

    .sso-button:active {
      transform: translateY(1px);
    }

    .sso-button:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    .sso-button svg {
      width: 20px;
      height: 20px;
      color: var(--color-primary);
    }

    .login-footer {
      margin: var(--spacing-xl) 0 0;
      color: var(--color-text-tertiary);
      font-size: 12px;
      line-height: 1.7;
      text-align: center;
    }

    .top-notice {
      position: fixed;
      z-index: 20;
      top: 22px;
      left: 50%;
      width: min(420px, calc(100vw - 32px));
      padding: 12px 16px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      color: var(--color-text);
      background: var(--color-surface);
      box-shadow: 0 12px 32px rgba(24, 35, 64, 0.14);
      font-size: 13px;
      line-height: 1.5;
      opacity: 0;
      pointer-events: none;
      transform: translate(-50%, -12px);
      transition: opacity 180ms ease, transform 180ms ease;
    }

    .top-notice.is-visible {
      opacity: 1;
      transform: translate(-50%, 0);
    }

    .top-notice.is-success {
      border-color: rgba(40, 122, 82, 0.25);
      color: var(--color-success);
      background: var(--color-success-light);
    }

    .top-notice.is-error {
      border-color: rgba(180, 60, 72, 0.25);
      color: var(--color-error);
      background: var(--color-error-light);
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 920px) {
      .page-shell {
        display: block;
      }

      .brand-panel {
        display: none;
      }

      .login-panel {
        min-height: 100vh;
        padding: 24px;
      }

      .mobile-brand {
        display: inline-flex;
      }
    }

    @media (max-width: 520px) {
      .login-panel {
        align-items: flex-start;
        padding: 0;
        background: var(--color-background);
      }

      .login-card {
        width: 100%;
        min-height: 100vh;
        padding: 28px 20px;
        border: 0;
        border-radius: 0;
        box-shadow: none;
      }

      .login-title {
        font-size: 27px;
      }

      .sms-row {
        grid-template-columns: minmax(0, 1fr) 108px;
      }

      .form-options {
        align-items: flex-start;
        flex-direction: column;
        gap: var(--spacing-sm);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <div class="top-notice" id="topNotice" aria-live="polite"></div>

  <main class="page-shell">
    <section class="brand-panel" aria-labelledby="brandTitle">
      <header class="brand-header">
        <a class="brand-logo" href="/" aria-label="NewEra Copilot 首页">
          <span class="brand-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 6.5h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-4l-4.5 3v-3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M8.5 10.5h7M8.5 14h4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </span>
          <span>NewEra Copilot</span>
        </a>
      </header>

      <div class="brand-content">
        <p class="brand-kicker">Enterprise AI Workspace</p>
        <h1 class="brand-title" id="brandTitle">让智能协作，成为团队的日常</h1>
        <p class="brand-description">
          统一安全访问企业知识、工具与智能工作流，在一个可信、清晰的工作空间内完成每一次创造。
        </p>

        <ul class="feature-list" aria-label="平台特点">
          <li class="feature-item">
            <p class="feature-title">统一身份认证</p>
            <p class="feature-text">安全、便捷地访问企业工作空间</p>
          </li>
          <li class="feature-item">
            <p class="feature-title">企业级安全</p>
            <p class="feature-text">全链路保护账号与数据安全</p>
          </li>
          <li class="feature-item">
            <p class="feature-title">跨端协同</p>
            <p class="feature-text">随时随地保持团队进度同步</p>
          </li>
          <li class="feature-item">
            <p class="feature-title">智能工作流</p>
            <p class="feature-text">让复杂任务更简单、更高效</p>
          </li>
        </ul>
      </div>

      <footer class="brand-footer">
        © 2026 NewEra. 保留所有权利。
      </footer>
    </section>

    <section class="login-panel" aria-labelledby="loginTitle">
      <div class="login-card">
        <a class="brand-logo mobile-brand" href="/" aria-label="NewEra Copilot 首页">
          <span class="brand-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 6.5h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-4l-4.5 3v-3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M8.5 10.5h7M8.5 14h4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </span>
          <span>NewEra Copilot</span>
        </a>

        <header class="login-header">
          <h2 class="login-title" id="loginTitle">欢迎回来</h2>
          <p class="login-subtitle">使用您的企业账号登录，继续访问智能工作空间。</p>
        </header>

        <form class="login-form" id="loginForm" novalidate>
          <div class="field-group">
            <div class="field-label-row">
              <label class="field-label" for="account">
                企业账号<span class="required-mark" aria-hidden="true">*</span>
              </label>
              <a class="field-link" href="/support/account-help">无法获取账号？</a>
            </div>

            <div class="input-shell" id="accountShell">
              <span class="input-leading" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M5.5 19c.8-3.2 3.1-4.8 6.5-4.8s5.7 1.6 6.5 4.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </span>
              <input
                class="field-input"
                id="account"
                name="account"
                type="text"
                inputmode="email"
                autocomplete="username"
                placeholder="请输入企业账号"
                aria-describedby="accountError"
                required
              >
            </div>
            <p class="field-error" id="accountError" aria-live="polite"></p>
          </div>

          <div class="field-group">
            <div class="field-label-row">
              <label class="field-label" for="password">
                登录密码<span class="required-mark" aria-hidden="true">*</span>
              </label>
              <a class="field-link" href="/support/reset-password">忘记密码？</a>
            </div>

            <div class="input-shell" id="passwordShell">
              <span class="input-leading" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </span>
              <div class="password-wrap">
                <input
                  class="field-input"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="请输入登录密码"
                  aria-describedby="passwordError"
                  required
                >
                <button
                  class="visibility-button"
                  type="button"
                  data-password-target="password"
                  data-password-text
                  aria-label="显示密码"
                  aria-pressed="false"
                >
                  <svg data-eye-icon viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.7"/>
                  </svg>
                  <svg data-eye-off-icon viewBox="0 0 24 24" fill="none" aria-hidden="true" hidden>
                    <path d="m4 4 16 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M9.5 7.4A8.8 8.8 0 0 1 12 7c5.5 0 8.5 5 8.5 5a12.8 12.8 0 0 1-2.2 2.8M14.2 16.1c-.7.2-1.4.4-2.2.4-5.5 0-8.5-5-8.5-5a12.7 12.7 0 0 1 2.4-2.9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                  </svg>
                  <span>显示密码</span>
                </button>
              </div>
            </div>

            <div class="password-strength" id="passwordStrength" data-level="0" aria-hidden="true">
              <span class="strength-bar" data-strength-item="1"></span>
              <span class="strength-bar" data-strength-item="2"></span>
              <span class="strength-bar" data-strength-item="3"></span>
              <span class="strength-bar" data-strength-item="4"></span>
            </div>
            <p class="strength-text" id="passwordStrengthText">建议包含字母、数字与符号</p>
            <p class="field-error" id="passwordError" aria-live="polite"></p>
          </div>

          <div class="field-group">
            <div class="field-label-row">
              <label class="field-label" for="smsCode">
                短信验证码<span class="required-mark" aria-hidden="true">*</span>
              </label>
            </div>

            <div class="sms-row">
              <div class="input-shell" id="smsCodeShell">
                <span class="input-leading" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="7" y="3.5" width="10" height="17" rx="2.5" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M10 6.5h4M10 17.5h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  </svg>
                </span>
                <input
                  class="field-input"
                  id="smsCode"
                  name="smsCode"
                  type="text"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  maxlength="6"
                  placeholder="输入 6 位验证码"
                  aria-describedby="smsCodeError"
                  required
                >
              </div>
              <button class="send-code-button" id="sendCode" type="button">获取验证码</button>
            </div>
            <p class="field-error" id="smsCodeError" aria-live="polite"></p>
          </div>

          <div class="agreement-box">
            <label class="agreement-label" for="agreement">
              <input id="agreement" name="agreement" type="checkbox" required>
              <span>我已阅读并同意 <a href="/terms">服务条款</a> 与 <a href="/privacy">隐私政策</a></span>
            </label>
            <p class="agreement-error" id="agreementError" aria-live="polite"></p>
          </div>

          <div class="form-options">
            <label class="checkbox-label" for="rememberMe">
              <input id="rememberMe" name="rememberMe" type="checkbox">
              <span>保持登录状态</span>
            </label>
          </div>

          <button class="submit-button" id="submitButton" type="submit">
            <span class="loading-spinner" aria-hidden="true"></span>
            <span>登录</span>
          </button>
        </form>

        <div class="login-divider">或使用以下方式</div>

        <button class="sso-button" id="ssoButton" type="button">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5.5h6.5v6H4v-6Zm9.5 0H20v6h-6.5v-6ZM4 14.5h6.5v6H4v-6Zm9.5 0H20v6h-6.5v-6Z" fill="currentColor" opacity="0.18"/>
            <path d="M4 5.5h6.5v6H4v-6Zm9.5 0H20v6h-6.5v-6ZM4 14.5h6.5v6H4v-6Zm9.5 0H20v6h-6.5v-6Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span>企业单点登录</span>
        </button>

        <p class="login-footer">
          登录即表示您同意 NewEra Copilot 使用必要的 Cookie 维持会话安全。
        </p>
      </div>
    </section>
  </main>

  <script src="./login.js"></script>
</body>
</html>
```

## 文件：`README.md`

```markdown
# NewEra Copilot SSO 登录前端

## 文件说明

- `login.html`：SSO 登录页面，包含账号、密码、短信验证码、协议确认、企业单点登录入口及响应式布局。
- `login.js`：表单校验、密码显隐、密码强度提示、验证码倒计时、提交状态和接口调用。

## 运行方式

直接打开 `login.html` 可查看页面结构。完整登录功能需要后端接口，建议通过静态服务器运行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/login.html
```

## 接口约定

页面默认请求同源接口：

- `POST /api/auth/login`
- `POST /api/auth/sms-code`

如需修改接口地址，请编辑 `login.js` 顶部的 `API_CONFIG`。

### 登录接口

请求：

```json
{
  "account": "user@example.com",
  "password": "Example123!",
  "smsCode": "123456",
  "rememberMe": false
}
```

成功响应示例：

```json
{
  "success": true,
  "data": {
    "redirectUrl": "/workspace"
  }
}
```

后端也可返回 HTTP `200` 且直接使用 `redirectUrl` 字段：

```json
{
  "redirectUrl": "/workspace"
}
```

失败响应示例：

```json
{
  "code": "INVALID_CREDENTIALS",
  "message": "密码错误",
  "remaining": 4
}
```

支持的错误码：

- `ACCOUNT_NOT_FOUND`：账号不存在。
- `ACCOUNT_LOCKED`：账号锁定，可附带 `expiresAt` 毫秒时间戳。
- `INVALID_CREDENTIALS`：账号或密码校验失败。

### 验证码接口

请求：

```json
{
  "account": "user@example.com"
}
```

成功响应示例：

```json
{
  "success": true,
  "data": {
    "countdown": 60
  }
}
```

## 实现假设

- 页面由后端托管于 NewEra Copilot 主站，接口默认使用同源相对路径。
- 账号支持字母、数字及 `_ . @ -`，长度为 4 至 32 个字符。
- 密码至少 8 位，并同时包含字母和数字。
- 短信验证码必须为 6 位数字。
- 登录成功后优先跳转到响应中的 `redirectUrl`，未提供时跳转至 `/workspace`。
- 页面未引入外部图片、字体或 CDN 资源，图标均使用内联 SVG。
```
```

交付说明：

- 已完成 SSO 登录页面及前端交互逻辑。
- 文件清单：`login.html`、`login.js`、`README.md`。
- 页面使用单主色与中性色，包含桌面端和移动端响应式布局。
- 登录与验证码接口暂按同源 `/api/auth/login`、`/api/auth/sms-code` 实现，可根据后端实际接口调整。

## 测试工程师

下面给出修订后的完整测试交付成果。由于当前对话没有提供可操作的本地项目目录、静态服务或 Chromium 执行环境，我不能诚实地声称已生成 PNG 或完成浏览器实测。为避免继续留下不可执行的模板，本次将交付调整为：

1. 提供可运行、零依赖的截图生成器：使用 Node.js 启动静态服务并调用系统 Chromium，避免依赖 npm、CDN 或外部图片。
2. 截图脚本严格使用前端实际存储键 `newera.sso.session`，同时清理 `newera.sso.rememberedAccount`、`newera.sso.passwordFailures`、`newera.sso.passwordLocks`。
3. 每张截图执行前清理 localStorage 和 sessionStorage。
4. 实际结果不伪造；当前统一标记为“阻塞”，并明确阻塞原因、责任人和解除条件。
5. 提供截图生成后的自动索引回填机制和报告回填清单。

文件清单：

```text
screenshots/README.md
TEST_REPORT.md
tests/capture-screenshots.js
```

## `screenshots/README.md`

```markdown
# SSO 统一身份认证模块截图索引

## 1. 交付状态

当前版本已完成截图执行方案、场景契约、截图脚本和索引结构，但当前交付环境未提供可操作的项目根目录、Node.js 运行上下文、系统 Chromium 可执行文件或浏览器自动化环境，因此尚未生成 PNG 实体文件。

本索引不将未执行的截图伪标记为通过。所有未执行项目均明确标记为“阻塞”。

阻塞信息：

| 项目 | 内容 |
|---|---|
| 阻塞编号 | BLOCK-SHOT-001 |
| 阻塞原因 | 缺少可执行的项目文件落盘位置以及 Chromium 浏览器执行环境 |
| 责任角色 | 测试工程师负责执行；项目维护者负责提供可运行项目、Chromium 路径和静态服务权限 |
| 解除条件 | 在项目根目录执行 `node tests/capture-screenshots.js` 并成功生成 PNG |
| 影响范围 | F15、验收标准 14，以及工作台、会话、过期等依赖浏览器状态的截图 |
| 当前结论 | 阻塞，不通过 |

## 2. 测试基准

- 浏览器：Chromium 或 Chrome 最新稳定版。
- 桌面视口：1440 × 900。
- 移动端视口：375 × 667。
- 设备像素比：1。
- 色彩方案：light。
- 区域设置：zh-CN。
- 页面缩放：100%。
- 图片格式：PNG。
- 截图范围：viewport，不使用 fullPage。
- 测试地址：脚本自动启动 `http://127.0.0.1:8080`。
- 每条用例独立创建 BrowserContext。
- 每条用例执行前清空 localStorage 和 sessionStorage。
- 截图前统一等待页面字体、样式和异步状态稳定。

## 3. 前端会话存储键契约

截图脚本必须与前端 `app.js` 使用相同的存储键。

已确认契约：

| 用途 | localStorage key | 截图脚本处理 |
|---|---|---|
| 登录会话 | `newera.sso.session` | 工作台截图前写入 |
| 记住账号 | `newera.sso.rememberedAccount` | 每条用例前删除 |
| 密码失败计数 | `newera.sso.passwordFailures` | 每条用例前删除 |
| 密码锁定记录 | `newera.sso.passwordLocks` | 每条用例前删除 |

会话对象结构：

```json
{
  "token": "test-token",
  "user": {
    "id": "test-user",
    "name": "测试用户",
    "account": "tester@example.com",
    "role": "管理员"
  },
  "issuedAt": 0,
  "expiresAt": 0
}
```

其中 `issuedAt` 和 `expiresAt` 必须由截图脚本按当前时间动态生成，不允许写入固定过期时间。

## 4. 测试参数

截图脚本使用以下公开参数创建确定性场景：

| 参数 | 示例 | 用途 |
|---|---|---|
| `tab` | `?tab=sms` | 初始显示短信验证码登录 |
| `tab` | `?tab=qr` | 初始显示扫码登录 |
| `qrState` | `?tab=qr&qrState=scanned` | 初始进入已扫描待确认状态 |
| `error` | `?error=password` | 初始注入密码错误状态 |
| `error` | `?error=locked` | 初始注入账号锁定状态 |
| `smsCountdown` | `?tab=sms&smsCountdown=60` | 初始进入短信倒计时 |
| `success` | `?success=1` | 初始进入登录成功反馈 |
| `expired` | `?expired=1` | 写入已过期会话并显示过期模态框 |
| `sessionSeconds` | `?sessionSeconds=60` | 缩短新签发会话有效期 |
| `lockSeconds` | `?lockSeconds=300` | 设置密码锁定时长 |

安全要求：

- 测试参数只应在本地或测试环境启用。
- 参数值必须进行白名单和范围校验。
- `redirect` 只允许站内相对路径。
- 不得在生产环境暴露真实密钥、真实用户信息或可绕过真实认证策略的接口。

## 5. 截图清单

| 序号 | 文件名 | 用例编号 | 场景与执行入口 | 视口 | 预期 | 实际 | 结论 | 缺陷编号 |
|---|---|---|---|---|---|---|---|---|
| 01 | `01-desktop-login.png` | TC-01 | 桌面端默认密码登录页：`/index.html` | 1440 × 900 | 左侧品牌区与右侧登录卡片完整；默认选中账号密码；输入框、协议和主按钮可见；无横向滚动 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 02 | `02-desktop-tab-sms.png` | TC-02 | 桌面端短信验证码页：`/index.html?tab=sms` | 1440 × 900 | 短信 Tab 激活；显示手机号、验证码、获取验证码按钮和协议行；旧错误状态清除 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 03 | `03-desktop-tab-qr.png` | TC-03 | 桌面端扫码待扫描：`/index.html?tab=qr` | 1440 × 900 | 扫码 Tab 激活；显示 CSS 二维码占位、待扫描状态、刷新二维码和切换账号链接 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 04 | `04-desktop-qr-confirm.png` | TC-04 | 桌面端扫码已扫描待确认：`/index.html?tab=qr&qrState=scanned` | 1440 × 900 | 状态显示“已扫描待确认”；主按钮变为“确认登录”且可操作 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 05 | `05-desktop-error-password.png` | TC-05 | 桌面端密码错误：`/index.html?error=password` | 1440 × 900 | 顶部提示和密码字段错误提示出现；密码框标红；页面结构无明显跳动 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 06 | `06-desktop-lock.png` | TC-06 | 桌面端失败锁定：`/index.html?error=locked&lockSeconds=300` | 1440 × 900 | 显示账号锁定提示；登录按钮禁用并显示 5 分钟倒计时 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 07 | `07-desktop-sms-countdown.png` | TC-07 | 桌面端短信倒计时：`/index.html?tab=sms&smsCountdown=60` | 1440 × 900 | 获取验证码按钮禁用；文案为“60s 后重试”；倒计时持续递减 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 08 | `08-desktop-login-success.png` | TC-08 | 桌面端登录成功：`/index.html?success=1` | 1440 × 900 | 显示成功提示；按 redirect 跳转或进入工作台 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 09 | `09-desktop-app.png` | TC-09 | 桌面端工作台：`/app.html`，执行前写入 `newera.sso.session` | 1440 × 900 | 顶部导航、用户菜单、欢迎卡片和三个功能卡片完整显示；不会被守卫重定向 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 10 | `10-desktop-guard-redirect.png` | TC-10 | 未登录访问受保护页：`/app.html` | 1440 × 900 | 重定向至登录页；URL 保留 `redirect=app.html`；显示“登录后将继续访问…”提示 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 11 | `11-desktop-session-expired.png` | TC-11 | 会话过期：`/app.html?expired=1` | 1440 × 900 | 显示“会话已过期”模态框；背景滚动锁定；提供重新登录按钮 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 12 | `12-desktop-403.png` | TC-12 | 无权限页：`/403.html` | 1440 × 900 | 显示 403 标题、说明、返回按钮和统一内联 SVG 图形 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 13 | `13-mobile-login.png` | TC-M01 | 移动端默认密码登录：`/index.html` | 375 × 667 | 品牌区隐藏或压缩；卡片满宽；输入控件高度不小于 44px；无横向滚动 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 14 | `14-mobile-sms.png` | TC-M02 | 移动端短信登录：`/index.html?tab=sms` | 375 × 667 | 短信表单完整；Tab、输入框、获取验证码按钮、协议和主按钮无截断 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 15 | `15-mobile-app.png` | TC-M03 | 移动端工作台：`/app.html`，执行前写入 `newera.sso.session` | 375 × 667 | 顶部导航和工作台卡片自适应；用户菜单可操作；无横向滚动和文字截断 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |

## 6. 补充截图清单

以下截图用于提高错误分支、状态恢复和异常页覆盖度。

| 序号 | 文件名 | 用例编号 | 场景与执行入口 | 视口 | 预期 | 实际 | 结论 | 缺陷编号 |
|---|---|---|---|---|---|---|---|---|
| 16 | `16-desktop-error-empty.png` | TC-21 | 桌面端必填校验：`/index.html` | 1440 × 900 | 顶部提示和字段提示明确；协议行下显示未同意提示 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 17 | `17-desktop-tab-switch.png` | TC-20 | 密码 Tab 输入内容后切换到短信 Tab | 1440 × 900 | 已输入密码账号内容保留；旧错误提示消失；Tab 指示正确 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 18 | `18-desktop-guard-redirect.png` | TC-10 | 未登录访问带目标参数的工作台 | 1440 × 900 | 登录页 URL 保留安全的站内 redirect 参数 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 19 | `19-desktop-session-persist.png` | TC-09 | 写入有效 `newera.sso.session` 后刷新 `/app.html` | 1440 × 900 | 刷新后仍显示工作台和用户信息，不跳回登录页 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 20 | `20-desktop-logout.png` | TC-12 | 打开工作台用户菜单 | 1440 × 900 | 用户菜单完整显示；可点击“退出登录” | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |
| 21 | `21-desktop-404.png` | TC-15 | 页面不存在：`/404.html` | 1440 × 900 | 显示 404 标题、说明和返回按钮 | 阻塞：当前环境未执行浏览器捕获 | 阻塞 | BLOCK-SHOT-001 |

## 7. 自动截图执行方式

### 7.1 环境要求

必须具备：

1. Node.js 18 或更高版本。
2. Chromium 或 Chrome 浏览器。
3. 可写的项目根目录和 `screenshots/` 目录。
4. 完整的前端项目文件，包括 `index.html`、`app.html`、`app.js`、`styles.css` 和异常页。

### 7.2 Chromium 路径

脚本按以下顺序查找 Chromium：

1. 环境变量 `CHROMIUM_PATH`。
2. `/usr/bin/chromium`。
3. `/usr/bin/chromium-browser`。
4. `/usr/bin/google-chrome`。
5. `/usr/bin/google-chrome-stable`。
6. macOS 常见路径：
   - `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
   - `/Applications/Chromium.app/Contents/MacOS/Chromium`
7. Windows 常见路径：
   - `C:\Program Files\Google\Chrome\Application\chrome.exe`
   - `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`

示例：

```bash
CHROMIUM_PATH=/usr/bin/chromium node tests/capture-screenshots.js
```

### 7.3 执行命令

在项目根目录执行：

```bash
node tests/capture-screenshots.js
```

脚本将自动：

1. 启动项目静态服务。
2. 查找 Chromium。
3. 为每条用例创建独立 BrowserContext。
4. 清理 localStorage 和 sessionStorage。
5. 根据场景写入或删除测试状态。
6. 访问指定 URL。
7. 等待异步状态稳定。
8. 捕获 PNG。
9. 检查 PNG 文件尺寸。
10. 收集 Console 错误和页面异常。
11. 生成 `screenshots/EXECUTION_RESULTS.json`。
12. 关闭静态服务。

### 7.4 PNG 尺寸核对

脚本会读取 PNG 的 IHDR 区块并核对像素尺寸。

预期：

- 桌面截图：1440 × 900。
- 移动截图：375 × 667。

若尺寸不一致，脚本退出码为非零。

## 8. 执行结果文件

执行完成后将生成：

```text
screenshots/EXECUTION_RESULTS.json
```

文件内容包含：

- 场景文件名。
- URL。
- 视口。
- 截图路径。
- PNG 实际尺寸。
- 是否成功捕获。
- Console 错误。
- 页面异常。
- 截图后的当前 URL。
- 横向滚动检测结果。
- 执行时间。

该文件可作为回填 `screenshots/README.md` 和 `TEST_REPORT.md` 的事实依据。

## 9. 人工复核清单

- [ ] 21 张 PNG 文件全部存在。
- [ ] 15 张必需截图全部存在。
- [ ] 桌面 PNG 尺寸为 1440 × 900。
- [ ] 移动 PNG 尺寸为 375 × 667。
- [ ] 09 和 15 号截图展示工作台而不是登录页。
- [ ] 10 号截图展示守卫重定向后的登录页。
- [ ] 11 号截图展示会话过期模态框。
- [ ] 页面无横向滚动。
- [ ] 页面无文字截断或控件遮挡。
- [ ] 输入框均关联 label。
- [ ] 错误提示使用 aria-live。
- [ ] 禁用按钮具有清晰视觉状态。
- [ ] 页面无 emoji 或表情符号。
- [ ] 页面无外链图片、字体或 CDN 资源。
- [ ] Console 无未处理异常。
- [ ] 所有图标均为内联 SVG 或 CSS 绘制。
- [ ] 配色符合单主色、中性色及辅助状态色要求。
- [ ] `EXECUTION_RESULTS.json` 中所有场景捕获成功。
```

## `TEST_REPORT.md`

```markdown
# SSO 统一身份认证模块测试报告

## 1. 报告信息

| 项目 | 内容 |
|---|---|
| 项目名称 | SSO 统一身份认证登录模块 |
| 测试版本 | 待项目维护者提供版本号或提交哈希 |
| 测试日期 | 未执行 |
| 测试人员 | 测试工程师 |
| 测试环境 | Chromium 或 Chrome 最新稳定版，待执行时记录具体版本 |
| 桌面视口 | 1440 × 900 |
| 移动端视口 | 375 × 667 |
| 浏览器缩放 | 100% |
| 测试地址 | 截图脚本自动启动 `http://127.0.0.1:8080` |
| 报告状态 | 阻塞 |
| 当前结论 | 不通过 |

## 2. 结论摘要

本轮已完成以下测试交付：

1. 21 个功能测试用例定义。
2. 6 个移动端测试用例定义。
3. 14 项验收标准检查表。
4. 15 张必需截图场景定义。
5. 6 张补充截图场景定义。
6. 零 npm 依赖的 Node.js 截图执行脚本。
7. 与前端一致的 localStorage 会话键 `newera.sso.session`。
8. 每条用例前清理 localStorage 和 sessionStorage。
9. PNG 像素尺寸自动校验。
10. Console 错误和页面异常采集。
11. 执行结果 JSON 输出。
12. 缺陷复现步骤、责任边界和解除条件。

当前未能形成通过结论，原因如下：

- 当前交付环境未提供可操作的项目文件落盘目录。
- 当前交付环境未提供可调用的 Chromium 或 Chrome 浏览器。
- 因此尚未生成 21 张 PNG 实体截图。
- 因此尚未对页面执行真实交互、Console、网络、键盘和响应式验证。
- 因此 21 条功能用例、6 条移动端用例和 AC-01 至 AC-14 不能给出通过结论。

本报告不将“待执行”当作通过，也不伪造实际结果。

## 3. 阻塞项

### BLOCK-SHOT-001 浏览器执行与 PNG 截图未落盘

| 属性 | 内容 |
|---|---|
| 严重程度 | 阻塞 |
| 优先级 | P0 |
| 状态 | 开放 |
| 发现版本 | 当前交付版本 |
| 关联需求 | F15、F16 |
| 关联验收 | 验收标准 14 |
| 责任角色 | 测试工程师负责执行；项目维护者负责提供可运行项目、浏览器路径和写权限 |
| 解除条件 | 成功生成 PNG 并完成执行结果回填 |

#### 复现步骤

1. 打开交付目录。
2. 检查 `screenshots/`。
3. 查找 `01-desktop-login.png` 至 `21-desktop-404.png`。
4. 打开 `screenshots/EXECUTION_RESULTS.json`。
5. 查看各场景的 `captured`、PNG 尺寸、Console 错误和页面异常。

#### 实际结果

- 当前仅有截图索引和执行脚本。
- 当前没有 PNG 实体文件。
- 当前没有 `EXECUTION_RESULTS.json`。
- 当前无法验证页面功能和浏览器运行状态。

#### 预期结果

- `screenshots/` 中存在至少 12 张真实 PNG。
- 本需求清单要求覆盖 21 个场景，即 15 张必需截图和 6 张补充截图。
- 桌面截图尺寸为 1440 × 900。
- 移动截图尺寸为 375 × 667。
- 每张截图与对应用例和场景一致。
- 索引中的实际和结论根据真实执行结果回填。

#### 修复和执行步骤

1. 将完整前端项目及 `tests/capture-screenshots.js` 放在同一项目根目录。
2. 安装或提供 Chromium 或 Chrome。
3. 执行：

```bash
CHROMIUM_PATH=/path/to/chromium node tests/capture-screenshots.js
```

4. 检查 `screenshots/EXECUTION_RESULTS.json`。
5. 核对所有 PNG 尺寸和场景。
6. 根据真实结果回填本报告和截图索引。
7. 对失败场景登记独立缺陷。
8. 修复后重新生成对应截图并复测。

### BLOCK-SESSION-001 会话键一致性需在执行时验证

| 属性 | 内容 |
|---|---|
| 严重程度 | 严重 |
| 优先级 | P1 |
| 状态 | 待验证 |
| 发现版本 | 当前交付版本 |
| 关联需求 | F9、F10、F11、F15、F16 |
| 责任角色 | 前端维护者确认实现；测试工程师执行验证 |

#### 复现步骤

1. 打开前端 `app.js`。
2. 搜索 `newera.sso.session`。
3. 启动截图脚本。
4. 检查 09、15、19 号截图是否展示工作台。
5. 检查 `EXECUTION_RESULTS.json` 中对应场景的最终 URL。

#### 实际结果

- 本轮截图脚本已统一使用 `newera.sso.session`。
- 截图脚本不再使用错误的 `sso_session`。
- 由于浏览器尚未执行，仍需确认真实前端 `app.js` 使用相同键。

#### 预期结果

- 前端会话读写和截图脚本注入均使用 `newera.sso.session`。
- 09、15、19 号截图显示工作台。
- 登出后该 key 被清理。

## 4. 测试范围

本报告覆盖：

1. 账号密码登录。
2. 短信验证码登录。
3. 扫码登录状态机。
4. Tab 切换。
5. 输入校验与错误提示。
6. 连续失败锁定。
7. 按钮加载态。
8. 短信验证码倒计时。
9. 会话持久化。
10. 路由守卫和登录回跳。
11. 会话过期模态框。
12. 登出。
13. 401、403、404 页面。
14. 桌面端和移动端响应式布局。
15. 键盘可达性、焦点状态和浏览器 Console。
16. 视觉一致性及禁止项检查。
17. 截图实体文件及像素尺寸检查。

## 5. 不在本次范围

- 真实后端接口兼容性。
- 真实短信网关发送及计费。
- 真实身份提供商或第三方 OAuth。
- 渗透测试、压力测试和长时间稳定性测试。
- 已上线环境的生产数据验证。

## 6. 测试环境与执行要求

### 6.1 静态服务

推荐由项目维护者执行：

```bash
python3 -m http.server 8080
```

也可直接运行零依赖截图脚本，由脚本自动启动服务：

```bash
node tests/capture-screenshots.js
```

### 6.2 浏览器清理要求

每条独立用例开始前执行：

```javascript
localStorage.clear();
sessionStorage.clear();
```

会话持久化、用户菜单和登出类用例除外，但仍通过独立 BrowserContext 保证隔离。

### 6.3 浏览器检查要求

每次执行至少检查：

- Console 是否存在 error。
- 页面是否发生未捕获异常。
- 外链资源请求是否失败。
- `document.documentElement.scrollWidth` 是否大于视口宽度。
- 交互元素是否可通过键盘到达。
- 焦点轮廓是否可见。
- 截图后的 URL 是否符合场景。
- PNG 像素尺寸是否正确。

### 6.4 横向溢出检查

```javascript
const viewportWidth = document.documentElement.clientWidth;
const scrollWidth = document.documentElement.scrollWidth;

console.log({
  viewportWidth,
  scrollWidth,
  hasHorizontalOverflow: scrollWidth > viewportWidth,
});
```

## 7. 前端存储契约

### 7.1 存储键

| 用途 | localStorage key | 处理要求 |
|---|---|---|
| 登录会话 | `newera.sso.session` | 前端与截图脚本必须一致 |
| 记住账号 | `newera.sso.rememberedAccount` | 每条用例前清理 |
| 密码失败计数 | `newera.sso.passwordFailures` | 每条用例前清理 |
| 密码锁定记录 | `newera.sso.passwordLocks` | 每条用例前清理 |

### 7.2 会话结构

```json
{
  "token": "test-token",
  "user": {
    "id": "test-user",
    "name": "测试用户",
    "account": "tester@example.com",
    "role": "管理员"
  },
  "issuedAt": 0,
  "expiresAt": 0
}
```

时间字段必须使用当前时间动态生成。

## 8. 测试数据

| 数据类型 | 测试值 | 说明 |
|---|---|---|
| 有效账号 | `tester@example.com` | 模拟服务接受的账号 |
| 无效账号 | `missing@example.com` | 模拟账号不存在 |
| 有效密码 | `Test1234` | 至少 6 位 |
| 错误密码 | `Wrong123` | 用于失败分支 |
| 有效手机号 | `13800138000` | 11 位测试手机号 |
| 无效手机号 | `1380013800` | 10 位，用于格式校验 |
| 有效短信验证码 | `123456` | 模拟验证码 |
| 错误短信验证码 | `000000` | 模拟验证码错误 |
| 扫码账号 | 页面当前绑定账号 | 用于扫码确认成功 |
| 过期会话 | `?expired=1` | 展示过期模态框 |

## 9. 桌面及功能测试用例

下表中的实际结果必须依据浏览器真实执行记录填写。当前统一阻塞原因见 BLOCK-SHOT-001，解除后逐条更新，不能批量伪改为通过。

| 用例编号 | 需求编号 | 场景 | 前置条件 | 操作步骤 | 预期结果 | 实际结果 | 结论 | 缺陷编号 |
|---|---|---|---|---|---|---|---|---|
| TC-01 | F1、F4、页面 3.1 | 默认账号密码登录页 | 清理存储，打开 `/index.html` | 检查默认 Tab、品牌区、登录卡片、输入项和按钮 | 默认选中账号密码；桌面端品牌区可见；卡片宽度不超过 420px；控件完整且无横向滚动 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-02 | F2、F4 | 切换短信验证码登录 | 打开登录页 | 点击“短信验证码”Tab | Tab 激活；显示手机号、验证码、获取验证码按钮；按钮文案和图标联动；旧错误清除 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-03 | F3 | 扫码登录待扫描 | 打开登录页 | 点击“扫码登录” Tab | 显示 CSS 方格二维码占位、中心图标、待扫描状态、刷新链接和切换账号链接 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-04 | F3 | 扫码状态变为已扫描待确认 | 进入扫码登录 | 等待 3 秒或打开 `?tab=qr&qrState=scanned` | 状态文案变为“已扫描待确认”；主按钮变为“确认登录”且可操作 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-05 | F5、F6 | 密码错误提示 | 有效账号已输入 | 输入错误密码并提交 | 顶部提示和密码框下提示出现；密码框 `aria-invalid=true` 并标红；密码清空；焦点回到密码框 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-06 | F6 | 连续五次密码失败锁定 | 有效账号已输入 | 连续提交 5 次错误密码 | 第 5 次后账号锁定 5 分钟；按钮禁用并显示剩余时间；不能继续登录 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-07 | F2 | 短信验证码 60 秒倒计时 | 手机号格式有效 | 点击“获取验证码” | 按钮立即禁用；显示“60s 后重试”；每秒递减；期间不能重复发送 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-08 | F1、F2、F7 | 登录成功与加载态 | 协议已勾选，输入有效数据 | 点击登录 | 按钮显示旋转指示和加载文案且不可重复点击；成功后显示成功提示并进入工作台或 redirect 目标 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-09 | F10 | 会话持久化 | 已登录 | 刷新 `/app.html` | localStorage 中会话仍存在；刷新后用户信息和工作台正常显示，不跳回登录页 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001、BLOCK-SESSION-001 |
| TC-10 | F11、F12 | 路由守卫与登录回跳 | 未登录 | 直接访问 `/app.html`，完成登录 | 先重定向至 `/index.html?redirect=app.html`；提示“登录后将继续访问…”；成功后回到 `/app.html` | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-11 | F8、F10 | 会话过期 | 已进入工作台 | 使用 `?expired=1` 或等待短会话到期 | 自动弹出“会话已过期”模态框；背景滚动锁定；确认重新登录后清理会话并返回登录页 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-12 | F9 | 登出与存储清理 | 已登录 | 打开用户菜单，点击“退出登录” | localStorage 中 token、用户信息、过期时间被清理；返回登录页；刷新不会恢复登录态 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-13 | F13 | 403 无权限页面 | 可访问静态异常页 | 打开 `/403.html` | 显示 403、说明和返回按钮；风格与登录模块一致；无外链资源 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-14 | F13 | 401 未认证页面 | 可访问静态异常页 | 打开 `/401.html` | 显示 401、说明和返回按钮；风格与登录模块一致；无外链资源 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-15 | F13 | 404 页面不存在 | 可访问静态异常页 | 打开 `/404.html` | 显示 404、说明和返回按钮；风格与登录模块一致；无外链资源 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-16 | F1 | 账号格式与密码长度校验 | 已进入密码登录 | 分别输入非法账号和 5 位密码并失焦 | 失焦后显示准确错误文案；输入框标红；提示区域固定，不引起布局明显跳动 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-17 | F1 | 密码可见性切换 | 已输入密码 | 点击密码框可见性按钮两次 | 第一次切换为明文，第二次切回密文；按钮具备可访问名称和焦点状态 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-18 | F1 | 记住账号 | 已输入账号 | 勾选“记住账号”，刷新登录页 | 账号从 `newera.sso.rememberedAccount` 恢复；未勾选时不应恢复 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-19 | F2 | 短信验证码错误 | 手机号有效且验证码已输入 | 输入错误验证码并提交 | 显示“验证码错误或已过期”；顶部和字段提示均出现；不签发会话 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-20 | F4 | Tab 切换保留输入并清错 | 密码 Tab 已输入账号密码且存在错误提示 | 切换到短信 Tab，再切回密码 Tab | 已输入内容保留；旧错误提示清空；Tab 指示位置正确 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-21 | F5、交互流程 4.1 | 协议未勾选 | 输入有效账号密码 | 不勾选协议直接提交 | 提交被阻止；协议行下显示明确提示；顶部提示说明原因 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |

## 10. 移动端测试用例

| 用例编号 | 需求编号 | 场景 | 前置条件 | 操作步骤 | 预期结果 | 实际结果 | 结论 | 缺陷编号 |
|---|---|---|---|---|---|---|---|---|
| TC-M01 | 验收标准 11、页面 3.1 | 375 × 667 密码登录页 | 移动视口，清理存储 | 打开 `/index.html` | 品牌区隐藏或压缩；卡片满宽；输入控件高度不小于 44px；无横向滚动；按钮不被遮挡 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-M02 | F2、验收标准 11 | 375 × 667 短信登录 | 移动视口 | 打开 `?tab=sms` | 短信表单完整显示；Tab 不截断；输入框、验证码按钮、协议和主按钮可见；无横向滚动 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-M03 | 验收标准 11、页面 3.3 | 375 × 667 工作台 | 移动视口，有效会话 | 打开 `/app.html` | 顶部导航和工作台卡片自适应；用户菜单可操作；无横向滚动和文字截断 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001、BLOCK-SESSION-001 |
| TC-M04 | 验收标准 11 | 375 × 667 扫码登录 | 移动视口 | 打开 `?tab=qr` | 二维码占位完整；状态、刷新和切换账号链接可见；主按钮不被遮挡 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-M05 | 验收标准 12 | 移动端键盘可达性 | 移动视口 | 使用 Tab、Shift+Tab 和 Enter 遍历 | 焦点顺序合理；焦点可见；可操作按钮和链接；输入框关联 label | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| TC-M06 | 验收标准 12 | 移动端焦点和错误提示 | 移动视口，触发错误 | 提交空表单并浏览错误 | 错误通过 aria-live 宣告；焦点移动到合理位置；顶部和字段提示均可见 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |

## 11. 验收标准检查

| 编号 | 验收项 | 检查方法 | 实际结果 | 结论 | 缺陷编号 |
|---|---|---|---|---|---|
| AC-01 | `index.html` 双击或本地服务可运行，资源全部本地化 | 检查 Network 和页面源码 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-02 | 三种登录方式完整可用，Tab 切换保留输入并清错 | 执行 TC-01 至 TC-04、TC-19、TC-20 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-03 | 错误提示明确且位置固定；连续 5 次失败锁定 5 分钟 | 执行 TC-05、TC-06、TC-16、TC-21 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-04 | 短信倒计时期间按钮禁用且实时递减 | 执行 TC-07 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-05 | 登录刷新保持登录态；登出后刷新回登录页；守卫可回跳 | 执行 TC-09、TC-10、TC-12 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001、BLOCK-SESSION-001 |
| AC-06 | 会话过期显示模态框，确认后回登录页 | 执行 TC-11 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-07 | 页面无 emoji；图标为内联 SVG 或 CSS | 检查所有页面源码和截图 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-08 | 配色符合单主色、中性色和辅助状态色限制 | 检查 CSS 变量与截图 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-09 | 颜色、间距、圆角、阴影、字体使用全局变量 | 检查 `styles.css` | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-10 | 交互元素具备 hover、focus、active、disabled 状态 | 键盘与鼠标逐项检查 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-11 | 1440 × 900 和 375 × 667 无横向滚动、截断和按钮遮挡 | 执行桌面与移动用例 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-12 | 键盘可达；label 关联；错误提示有 aria-live | 执行 TC-M05、TC-M06 | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-13 | 浏览器 Console 无报错 | 执行全部用例时监听 Console | 阻塞：未执行浏览器验证 | 阻塞 | BLOCK-SHOT-001 |
| AC-14 | `screenshots/` 至少有 12 张真实 PNG，并建立索引 | 检查目录、PNG 像素尺寸和 `EXECUTION_RESULTS.json` | 当前无 PNG，执行脚本已提供但未运行 | 失败 | BLOCK-SHOT-001 |

## 12. 截图资产验收

| 检查项 | 要求 | 实际结果 | 结论 | 缺陷编号 |
|---|---|---|---|---|
| 必需截图数量 | 至少 12 张 | 已定义 15 张，当前 0 张实体 PNG | 失败 | BLOCK-SHOT-001 |
| 补充截图数量 | 不设最低值 | 已定义 6 张，当前 0 张实体 PNG | 失败 | BLOCK-SHOT-001 |
| 桌面截图尺寸 | 1440 × 900 | 未生成，脚本已实现自动核对 | 阻塞 | BLOCK-SHOT-001 |
| 移动截图尺寸 | 375 × 667 | 未生成，脚本已实现自动核对 | 阻塞 | BLOCK-SHOT-001 |
| 截图索引 | 用例编号、预期、实际、结论完整 | 索引结构完整；实际和结论按真实阻塞状态登记 | 部分完成 | BLOCK-SHOT-001 |
| 图片可读性 | PNG 文件存在且可打开 | 当前无 PNG 文件 | 失败 | BLOCK-SHOT-001 |
| 截图场景覆盖 | 覆盖 15 项必需场景 | 已定义，尚未捕获 | 失败 | BLOCK-SHOT-001 |
| 工作台会话键 | 使用 `newera.sso.session` | 脚本已统一，等待真实执行确认 | 待验证 | BLOCK-SESSION-001 |
| 执行证据 | 存在 `EXECUTION_RESULTS.json` | 当前不存在 | 失败 | BLOCK-SHOT-001 |

## 13. 截图执行结果登记模板

执行脚本生成 `EXECUTION_RESULTS.json` 后，应按以下格式回填本节。

| 文件名 | PNG 尺寸 | 捕获结果 | 最终 URL | 横向滚动 | Console 错误 | 页面异常 | 人工场景核对 | 结论 | 缺陷编号 |
|---|---|---|---|---|---|---|---|---|---|
| `01-desktop-login.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `02-desktop-tab-sms.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `03-desktop-tab-qr.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `04-desktop-qr-confirm.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `05-desktop-error-password.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `06-desktop-lock.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `07-desktop-sms-countdown.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `08-desktop-login-success.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `09-desktop-app.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `10-desktop-guard-redirect.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `11-desktop-session-expired.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `12-desktop-403.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `13-mobile-login.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `14-mobile-sms.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `15-mobile-app.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `16-desktop-error-empty.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `17-desktop-tab-switch.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `18-desktop-guard-redirect.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `19-desktop-session-persist.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `20-desktop-logout.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |
| `21-desktop-404.png` | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待回填 | 待判定 | 待回填 |

## 14. 复测计划

### 14.1 复测范围

- BLOCK-SHOT-001。
- BLOCK-SESSION-001。
- TC-01 至 TC-21。
- TC-M01 至 TC-M06。
- AC-01 至 AC-14。
- 15 张必需截图。
- 6 张补充截图。
- PNG 文件尺寸。
- 工作台会话恢复。
- 路由守卫。
- 会话过期。
- 登出。
- 桌面端和移动端横向溢出。
- Console 错误。
- 键盘焦点和 aria-live。

### 14.2 复测环境

| 项目 | 要求 |
|---|---|
| 浏览器 | Chromium 或 Chrome 最新稳定版，并记录具体版本 |
| 桌面视口 | 1440 × 900 |
| 移动视口 | 375 × 667 |
| 本地服务 | 截图脚本自动启动或按项目约定启动 |
| 数据清理 | 每条独立用例前清理 localStorage 和 sessionStorage |
| 会话键 | `newera.sso.session` |
| 截图 | 重新覆盖所有场景 |
| 执行证据 | `screenshots/EXECUTION_RESULTS.json` |

### 14.3 复测步骤

1. 确认前端已实现并记录测试参数。
2. 确认前端 `app.js` 使用 `newera.sso.session`。
3. 提供 Chromium 或 Chrome 路径。
4. 执行截图脚本。
5. 检查脚本退出码。
6. 检查 `EXECUTION_RESULTS.json`。
7. 确认所有 PNG 均生成。
8. 核对所有 PNG 尺寸。
9. 人工核对每个场景内容。
10. 执行全部功能用例和移动端用例。
11. 检查 Console、页面异常、键盘焦点和横向溢出。
12. 回填 `screenshots/README.md`。
13. 回填本报告的实际结果、结论、缺陷和复测结论。
14. 对失败场景登记独立缺陷并执行修复复测。

## 15. 复测结论

当前复测结论：

```text
复测日期：未执行
复测版本：待提供
复测浏览器及版本：待执行时填写
复测执行人：测试工程师
复测结果：阻塞
截图复核：阻塞
Console 检查：阻塞
缺陷关闭情况：BLOCK-SHOT-001 开放；BLOCK-SESSION-001 待验证
残余风险：
1. F15 未达到 PNG 实体截图交付要求。
2. F16 未达到真实执行结论要求。
3. 页面功能、视觉、响应式、键盘和浏览器稳定性尚未获得实测证据。
最终结论：不通过
```

解除 BLOCK-SHOT-001 后，必须替换为真实结论：

```text
复测日期：YYYY-MM-DD
复测版本：版本号或提交哈希
复测浏览器及版本：Chromium/Chrome x.x.x
复测执行人：姓名
复测结果：通过 / 不通过
截图复核：通过 / 不通过
Console 检查：通过 / 不通过
缺陷关闭情况：逐项填写
残余风险：无 / 列出风险
最终结论：通过 / 有条件通过 / 不通过
```

## 16. 退出准则

满足以下全部条件后，测试方可给出最终通过结论：

- BLOCK-SHOT-001 已关闭。
- BLOCK-SESSION-001 已验证并关闭或转为已接受风险。
- 21 个功能用例全部通过。
- 6 个移动端用例全部通过。
- AC-01 至 AC-14 全部通过。
- `screenshots/` 中存在至少 12 张真实可打开的 PNG。
- 本项目清单对应的 21 个场景全部生成 PNG。
- 桌面图为 1440 × 900，移动图为 375 × 667。
- 截图索引中的实际和结论已按真实结果回填。
- 浏览器 Console 无未处理错误。
- 测试报告包含真实实际结果、缺陷清单、复现步骤、复测过程和最终结论。
- 测试参数在项目 README.md 中公开并与实现一致。
- 前端会话 key 与测试脚本统一为 `newera.sso.session`。

## 17. 当前总结

### 17.1 已完成

- 完成 21 个功能用例定义。
- 完成 6 个移动端用例定义。
- 完成 14 项验收标准检查表。
- 完成 15 张必需截图和 6 张补充截图的场景定义。
- 提供零 npm 依赖截图脚本。
- 脚本自动启动静态服务。
- 脚本自动发现 Chromium 或 Chrome。
- 脚本自动创建独立 BrowserContext。
- 脚本每条用例前清理 localStorage 和 sessionStorage。
- 脚本使用正确的 `newera.sso.session`。
- 脚本自动核对 PNG 像素尺寸。
- 脚本采集 Console 错误和页面异常。
- 脚本输出 `EXECUTION_RESULTS.json`。
- 明确阻塞项、责任角色、解除条件和复测步骤。

### 17.2 未完成及原因

当前交付环境未提供可操作的项目文件落盘目录及 Chromium 浏览器执行环境，因而：

- 尚未生成 PNG 实体截图。
- 尚未执行页面功能测试。
- 尚未检查真实 Console、Network、键盘焦点和横向溢出。
- 尚未形成真实通过结论。
- 尚未执行缺陷复测。

### 17.3 当前测试结论

```text
当前结论：不通过。

主要原因：
1. F15 未达成，screenshots/ 目录当前没有 PNG 实体截图。
2. F16 尚未完成真实执行，21 条功能用例、6 条移动端用例和 AC-01 至 AC-14 均被明确标记为阻塞。
3. 截图脚本已修复会话键错误，统一使用 newera.sso.session，但需在真实浏览器执行中确认。
```

本结论不否定页面功能质量，但表示当前可验证交付尚未满足验收要求。
```

## `tests/capture-screenshots.js`

```javascript
'use strict';

const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');
const { spawn, spawnSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, 'screenshots');
const HOST = '127.0.0.1';
const PORT = Number.parseInt(process.env.PORT || '8080', 10);
const BASE_URL = `http://${HOST}:${PORT}`;
const SESSION_KEY = 'newera.sso.session';
const REMEMBERED_ACCOUNT_KEY = 'newera.sso.rememberedAccount';
const PASSWORD_FAILURES_KEY = 'newera.sso.passwordFailures';
const PASSWORD_LOCKS_KEY = 'newera.sso.passwordLocks';

const DESKTOP_VIEWPORT = {
  width: 1440,
  height: 900,
};

const MOBILE_VIEWPORT = {
  width: 375,
  height: 667,
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

function print(message) {
  process.stdout.write(`${message}\n`);
}

function fail(message) {
  process.stderr.write(`${message}\n`);
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function findChromiumExecutable() {
  const candidates = [];

  if (process.env.CHROMIUM_PATH) {
    candidates.push(process.env.CHROMIUM_PATH);
  }

  candidates.push(
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  );

  for (const candidate of candidates) {
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      return candidate;
    } catch (error) {
      if (process.platform !== 'win32') {
        continue;
      }

      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  const executableNames = [
    'chromium',
    'chromium-browser',
    'google-chrome',
    'google-chrome-stable',
  ];

  for (const executableName of executableNames) {
    const result = spawnSync('which', [executableName], {
      encoding: 'utf8',
    });

    if (result.status === 0) {
      const executablePath = result.stdout.trim();

      if (executablePath) {
        return executablePath;
      }
    }
  }

  return null;
}

function getRequestPath(requestUrl) {
  const url = new URL(requestUrl, BASE_URL);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  return pathname;
}

function resolveProjectPath(requestPath) {
  const normalizedPath = path.posix.normalize(requestPath);
  const relativePath = normalizedPath.replace(/^\/+/, '');
  const absolutePath = path.resolve(PROJECT_ROOT, relativePath);
  const rootPrefix = `${PROJECT_ROOT}${path.sep}`;

  if (absolutePath !== PROJECT_ROOT && !absolutePath.startsWith(rootPrefix)) {
    return null;
  }

  return absolutePath;
}

function createStaticServer() {
  return http.createServer(async (request, response) => {
    try {
      const requestPath = getRequestPath(request.url || '/');
      const absolutePath = resolveProjectPath(requestPath);

      if (!absolutePath) {
        response.writeHead(403, {
          'Content-Type': 'text/plain; charset=utf-8',
        });
        response.end('Forbidden');
        return;
      }

      let filePath = absolutePath;
      let fileStats;

      try {
        fileStats = await fsp.stat(filePath);
      } catch (error) {
        fileStats = null;
      }

      if (fileStats && fileStats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        fileStats = await fsp.stat(filePath);
      }

      if (!fileStats || !fileStats.isFile()) {
        const notFoundPage = path.join(PROJECT_ROOT, '404.html');

        if (fs.existsSync(notFoundPage)) {
          const content = await fsp.readFile(notFoundPage);
          response.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8',
          });
          response.end(content);
          return;
        }

        response.writeHead(404, {
          'Content-Type': 'text/plain; charset=utf-8',
        });
        response.end('Not Found');
        return;
      }

      const extension = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[extension] || 'application/octet-stream';

      response.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      });

      fs.createReadStream(filePath).pipe(response);
    } catch (error) {
      response.writeHead(500, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      response.end('Internal Server Error');
    }
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, HOST, () => {
      resolve();
    });
  });
}

function closeServer(server) {
  return new Promise((resolve) => {
    if (!server) {
      resolve();
      return;
    }

    server.close(() => {
      resolve();
    });
  });
}

async function connectToChromium(executablePath) {
  const { spawn: chromiumSpawn } = require('child_process');

  const userDataDir = await fsp.mkdtemp(
    path.join(os.tmpdir(), 'newera-sso-chromium-'),
  );

  const debugPort = 9222 + Math.floor(Math.random() * 1000);

  const child = chromiumSpawn(
    executablePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-background-networking',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--metrics-recording-only',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-features=Translate,MediaRouter',
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  let stderr = '';
  child.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  const endpoint = `http://127.0.0.1:${debugPort}`;

  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`${endpoint}/json/version`);

      if (response.ok) {
        const version = await response.json();

        return {
          child,
          endpoint,
          version,
          userDataDir,
          stderr: () => stderr,
        };
      }
    } catch (error) {
      await sleep(100);
    }
  }

  child.kill('SIGKILL');

  try {
    await fsp.rm(userDataDir, {
      recursive: true,
      force: true,
    });
  } catch (error) {
    fail(`清理 Chromium 临时目录失败：${error.message}`);
  }

  throw new Error(
    `无法连接 Chromium 调试端口 ${debugPort}。\n${stderr.slice(-4000)}`,
  );
}

async function createCdpClient(webSocketDebuggerUrl) {
  const { WebSocket } = require('ws');
  const webSocket = new WebSocket(webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('连接 Chrome DevTools Protocol 超时'));
    }, 10000);

    webSocket.once('open', () => {
      clearTimeout(timeout);
      resolve();
    });

    webSocket.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });

  let nextId = 1;
  const pending = new Map();
  const eventHandlers = new Map();

  webSocket.on('message', (rawMessage) => {
    let message;

    try {
      message = JSON.parse(rawMessage.toString());
    } catch (error) {
      return;
    }

    if (message.id && pending.has(message.id)) {
      const pendingRequest = pending.get(message.id);
      pending.delete(message.id);

      if (message.error) {
        pendingRequest.reject(
          new Error(
            `${pendingRequest.method}: ${message.error.message || '未知 CDP 错误'}`,
          ),
        );
      } else {
        pendingRequest.resolve(message.result || {});
      }

      return;
    }

    if (message.method && eventHandlers.has(message.method)) {
      const handlers = eventHandlers.get(message.method);

      for (const handler of handlers) {
        handler(message.params || {});
      }
    }
  });

  function send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const id = nextId;
      nextId += 1;

      pending.set(id, {
        resolve,
        reject,
        method,
      });

      const message = {
        id,
        method,
        params,
      };

      if (sessionId) {
        message.sessionId = sessionId;
      }

      webSocket.send(JSON.stringify(message));
    });
  }

  function on(method, handler) {
    if (!eventHandlers.has(method)) {
      eventHandlers.set(method, []);
    }

    eventHandlers.get(method).push(handler);
  }

  function close() {
    webSocket.close();
  }

  return {
    send,
    on,
    close,
  };
}

async function sendCommand(client, sessionId, method, params = {}) {
  return client.send(method, params, sessionId);
}

async function evaluate(client, sessionId, expression) {
  const result = await sendCommand(client, sessionId, 'Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    const description =
      result.exceptionDetails.exception &&
      result.exceptionDetails.exception.description;

    throw new Error(description || '页面脚本执行失败');
  }

  return result.result.value;
}

async function navigate(client, sessionId, url) {
  const loadPromise = new Promise((resolve) => {
    const handler = (params) => {
      if (params.frameId) {
        resolve();
      }
    };

    client.on('Page.loadEventFired', handler);
  });

  await sendCommand(client, sessionId, 'Page.navigate', {
    url,
  });

  await Promise.race([
    loadPromise,
    sleep(15000),
  ]);
}

async function waitForPageReady(client, sessionId) {
  await evaluate(
    client,
    sessionId,
    `new Promise((resolve) => {
      const finish = () => {
        document.documentElement.setAttribute('data-screenshot-ready', 'true');
        resolve({
          readyState: document.readyState,
          url: location.href,
          title: document.title
        });
      };

      if (document.readyState === 'complete') {
        requestAnimationFrame(() => requestAnimationFrame(finish));
      } else {
        window.addEventListener('load', () => {
          requestAnimationFrame(() => requestAnimationFrame(finish));
        }, { once: true });
      }
    })`,
  );

  await sleep(700);
}

async function createBrowserContext(client, viewport) {
  const result = await sendCommand(client, 'Target.createBrowserContext', {
    disposeOnDetach: false,
  });

  const browserContextId = result.browserContextId;

  const targetResult = await sendCommand(
    client,
    'Target.createTarget',
    {
      url: 'about:blank',
      width: viewport.width,
      height: viewport.height,
      browserContextId,
    },
  );

  const targetId = targetResult.targetId;

  const attachResult = await sendCommand(client, 'Target.attachToTarget', {
    targetId,
    flatten: true,
  });

  const sessionId = attachResult.sessionId;

  await sendCommand(client, sessionId, 'Page.enable');
  await sendCommand(client, sessionId, 'Runtime.enable');
  await sendCommand(client, sessionId, 'Log.enable');
  await sendCommand(client, sessionId, 'Network.enable');

  await sendCommand(client, sessionId, 'Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width < 600,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });

  await sendCommand(client, sessionId, 'Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [
      {
        name: 'prefers-color-scheme',
        value: 'light',
      },
      {
        name: 'prefers-reduced-motion',
        value: 'no-preference',
      },
    ],
  });

  return {
    browserContextId,
    targetId,
    sessionId,
  };
}

async function disposeBrowserContext(client, browserContextId) {
  try {
    await sendCommand(client, 'Target.disposeBrowserContext', {
      browserContextId,
    });
  } catch (error) {
    fail(`关闭 BrowserContext 失败：${error.message}`);
  }
}

async function clearBrowserStorage(client, sessionId) {
  await evaluate(
    client,
    sessionId,
    `(() => {
      localStorage.clear();
      sessionStorage.clear();
      return true;
    })()`,
  );
}

async function injectValidSession(client, sessionId) {
  await evaluate(
    client,
    sessionId,
    `(() => {
      const now = Date.now();
      const session = {
        token: 'test-token',
        user: {
          id: 'test-user',
          name: '测试用户',
          account: 'tester@example.com',
          role: '管理员'
        },
        issuedAt: now,
        expiresAt: now + 2 * 60 * 60 * 1000
      };

      localStorage.setItem(${JSON.stringify(SESSION_KEY)}, JSON.stringify(session));
      return session;
    })()`,
  );
}

async function injectRememberedPasswordTabState(client, sessionId) {
  await evaluate(
    client,
    sessionId,
    `(() => {
      const passwordInput = document.querySelector('#password');
      const accountInput = document.querySelector('#account');

      if (accountInput) {
        accountInput.value = 'tester@example.com';
        accountInput.dispatchEvent(new Event('input', { bubbles: true }));
        accountInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (passwordInput) {
        passwordInput.value = 'Test1234';
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
        passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      return true;
    })()`,
  );
}

async function measurePage(client, sessionId) {
  return evaluate(
    client,
    sessionId,
    `(() => {
      const root = document.documentElement;
      const viewportWidth = root.clientWidth;
      const scrollWidth = root.scrollWidth;

      return {
        url: location.href,
        title: document.title,
        viewportWidth,
        scrollWidth,
        hasHorizontalOverflow: scrollWidth > viewportWidth,
        readyState: document.readyState
      };
    })()`,
  );
}

function readPngDimensions(buffer) {
  const signature = '89504e470d0a1a0a';

  if (
    buffer.length < 24 ||
    buffer.subarray(0, 8).toString('hex') !== signature
  ) {
    throw new Error('输出文件不是有效 PNG');
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  return {
    width,
    height,
  };
}

async function captureScreenshot(client, sessionId, outputPath) {
  const result = await sendCommand(client, sessionId, 'Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
    optimizeForSpeed: false,
  });

  const buffer = Buffer.from(result.data, 'base64');
  await fsp.writeFile(outputPath, buffer);

  return readPngDimensions(buffer);
}

function createTestCases() {
  return [
    {
      file: '01-desktop-login.png',
      url: '/index.html',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '02-desktop-tab-sms.png',
      url: '/index.html?tab=sms',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '03-desktop-tab-qr.png',
      url: '/index.html?tab=qr',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '04-desktop-qr-confirm.png',
      url: '/index.html?tab=qr&qrState=scanned',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '05-desktop-error-password.png',
      url: '/index.html?error=password',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '06-desktop-lock.png',
      url: '/index.html?error=locked&lockSeconds=300',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '07-desktop-sms-countdown.png',
      url: '/index.html?tab=sms&smsCountdown=60',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '08-desktop-login-success.png',
      url: '/index.html?success=1',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '09-desktop-app.png',
      url: '/app.html',
      viewport: DESKTOP_VIEWPORT,
      setupSession: true,
    },
    {
      file: '10-desktop-guard-redirect.png',
      url: '/app.html',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '11-desktop-session-expired.png',
      url: '/app.html?expired=1',
      viewport: DESKTOP_VIEWPORT,
      setupExpiredSession: true,
    },
    {
      file: '12-desktop-403.png',
      url: '/403.html',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '13-mobile-login.png',
      url: '/index.html',
      viewport: MOBILE_VIEWPORT,
    },
    {
      file: '14-mobile-sms.png',
      url: '/index.html?tab=sms',
      viewport: MOBILE_VIEWPORT,
    },
    {
      file: '15-mobile-app.png',
      url: '/app.html',
      viewport: MOBILE_VIEWPORT,
      setupSession: true,
    },
    {
      file: '16-desktop-error-empty.png',
      url: '/index.html',
      viewport: DESKTOP_VIEWPORT,
      setupEmptyError: true,
    },
    {
      file: '17-desktop-tab-switch.png',
      url: '/index.html',
      viewport: DESKTOP_VIEWPORT,
      setupTabSwitch: true,
    },
    {
      file: '18-desktop-guard-redirect.png',
      url: '/app.html?redirect=app.html',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '19-desktop-session-persist.png',
      url: '/app.html',
      viewport: DESKTOP_VIEWPORT,
      setupSession: true,
      reloadAfterSetup: true,
    },
    {
      file: '20-desktop-logout.png',
      url: '/app.html',
      viewport: DESKTOP_VIEWPORT,
      setupSession: true,
      openUserMenu: true,
    },
    {
      file: '21-desktop-404.png',
      url: '/404.html',
      viewport: DESKTOP_VIEWPORT,
    },
  ];
}

async function applyTestPreparation(
  client,
  sessionId,
  testCase,
) {
  if (testCase.setupSession) {
    await injectValidSession(client, sessionId);
  }

  if (testCase.setupExpiredSession) {
    await evaluate(
      client,
      sessionId,
      `(() => {
        const now = Date.now();
        const session = {
          token: 'test-token',
          user: {
            id: 'test-user',
            name: '测试用户',
            account: 'tester@example.com',
            role: '管理员'
          },
          issuedAt: now - 3 * 60 * 60 * 1000,
          expiresAt: now - 60 * 1000
        };

        localStorage.setItem(${JSON.stringify(SESSION_KEY)}, JSON.stringify(session));
        return true;
      })()`,
    );
  }

  if (testCase.setupEmptyError) {
    await evaluate(
      client,
      sessionId,
      `(() => {
        const form = document.querySelector('form');
        const account = document.querySelector('#account');
        const password = document.querySelector('#password');

        if (account) {
          account.setAttribute('aria-invalid', 'true');
        }

        if (password) {
          password.setAttribute('aria-invalid', 'true');
        }

        if (form) {
          form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', {
            bubbles: true,
            cancelable: true
          }));
        }

        return true;
      })()`,
    );
    await sleep(300);
  }

  if (testCase.setupTabSwitch) {
    await injectRememberedPasswordTabState(client, sessionId);

    await evaluate(
      client,
      sessionId,
      `(() => {
        const smsTab = document.querySelector('[data-tab="sms"]');
        const passwordTab = document.querySelector('[data-tab="password"]');

        if (smsTab) {
          smsTab.click();
        }

        return {
          clickedSms: Boolean(smsTab),
          foundPasswordTab: Boolean(passwordTab)
        };
      })()`,
    );
    await sleep(300);
  }

  if (testCase.openUserMenu) {
    await evaluate(
      client,
      sessionId,
      `(() => {
        const selectors = [
          '[data-user-menu-button]',
          '#user-menu-button',
          '.user-menu-button',
          'button[aria-haspopup="menu"]'
        ];

        for (const selector of selectors) {
          const button = document.querySelector(selector);

          if (button) {
            button.click();
            break;
          }
        }

        return true;
      })()`,
    );
    await sleep(300);
  }
}

async function runCase(
  client,
  testCase,
  executionResults,
) {
  const result = {
    file: testCase.file,
    url: `${BASE_URL}${testCase.url}`,
    requestedViewport: testCase.viewport,
    captured: false,
    png: null,
    finalUrl: null,
    title: null,
    hasHorizontalOverflow: null,
    consoleErrors: [],
    pageExceptions: [],
    runtimeErrors: [],
    capturedAt: new Date().toISOString(),
    error: null,
  };

  let browserContext;

  try {
    browserContext = await createBrowserContext(
      client,
      testCase.viewport,
    );

    const { sessionId } = browserContext;

    client.on('Runtime.consoleAPICalled', (params) => {
      if (params.type !== 'error') {
        return;
      }

      const text = (params.args || [])
        .map((argument) => {
          if (
            argument.type === 'string' ||
            argument.value !== undefined
          ) {
            return String(argument.value);
          }

          return argument.description || argument.type;
        })
        .join(' ');

      result.consoleErrors.push(text);
    });

    client.on('Runtime.exceptionThrown', (params) => {
      const details = params.exceptionDetails || {};
      const description =
        details.exception &&
        details.exception.description;```js
        result.pageExceptions.push(
          description || details.text || 'Unknown page exception',
        );
      });
    });

    await evaluate(
      client,
      sessionId,
      `(() => {
        window.__TEST_RUNTIME_ERRORS__ = [];

        window.addEventListener(
          'error',
          (event) => {
            window.__TEST_RUNTIME_ERRORS__.push(
              event.message || 'Unknown window error',
            );
          },
          true,
        );

        window.addEventListener(
          'unhandledrejection',
          (event) => {
            const reason = event.reason;

            window.__TEST_RUNTIME_ERRORS__.push(
              reason && reason.message
                ? reason.message
                : String(reason || 'Unhandled promise rejection'),
            );
          },
          true,
        );

        return true;
      })()`,
    );

    const navigation = await navigate(
      client,
      sessionId,
      `${BASE_URL}${testCase.url}`,
    );

    if (!navigation.ok) {
      throw new Error(
        `Navigation failed with status ${navigation.status}`,
      );
    }

    await waitForDocumentReady(client, sessionId);
    await sleep(testCase.settleTime || 400);

    await preparePage(client, sessionId, testCase);

    const screenshot = await captureScreenshot(
      client,
      sessionId,
    );

    result.png = screenshot;
    result.captured = Boolean(screenshot);

    const pageState = await evaluate(
      client,
      sessionId,
      `(() => {
        const root = document.documentElement;
        const body = document.body;

        return {
          finalUrl: window.location.href,
          title: document.title || '',
          hasHorizontalOverflow:
            root.scrollWidth > root.clientWidth + 1 ||
            (body && body.scrollWidth > root.clientWidth + 1),
          runtimeErrors:
            Array.isArray(window.__TEST_RUNTIME_ERRORS__)
              ? window.__TEST_RUNTIME_ERRORS__.slice()
              : []
        };
      })()`,
    );

    result.finalUrl = pageState.finalUrl;
    result.title = pageState.title;
    result.hasHorizontalOverflow = pageState.hasHorizontalOverflow;
    result.runtimeErrors = pageState.runtimeErrors || [];
  } catch (error) {
    result.error =
      error && error.message
        ? error.message
        : String(error);
  } finally {
    if (browserContext) {
      await closeBrowserContext(
        client,
        browserContext.sessionId,
      );
    }
  }

  executionResults.push(result);

  process.stdout.write(
    `${result.captured ? 'PASS' : 'FAIL'} ${testCase.file}\n`,
  );

  return result;
}

async function runAllCases() {
  const client = await connectToBrowser();

  const executionResults = [];

  try {
    for (const testCase of TEST_CASES) {
      await runCase(
        client,
        testCase,
        executionResults,
      );
    }
  } finally {
    await disconnectFromBrowser(client);
  }

  const failedCases = executionResults.filter(
    (result) =>
      !result.captured ||
      result.error ||
      result.consoleErrors.length > 0 ||
      result.pageExceptions.length > 0 ||
      result.runtimeErrors.length > 0 ||
      result.hasHorizontalOverflow,
  );

  const report = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    total: executionResults.length,
    passed: executionResults.length - failedCases.length,
    failed: failedCases.length,
    results: executionResults,
  };

  await fs.writeFile(
    REPORT_FILE,
    `${JSON.stringify(report, null, 2)}\n`,
    'utf8',
  );

  process.stdout.write(
    `\nCompleted ${report.total} cases: ${report.passed} passed, ${report.failed} failed.\n`,
  );

  if (failedCases.length > 0) {
    process.exitCode = 1;
  }
}

runAllCases().catch(async (error) => {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });

  const fallbackReport = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    total: 0,
    passed: 0,
    failed: 1,
    fatalError:
      error && error.message
        ? error.message
        : String(error),
    results: [],
  };

  await fs.writeFile(
    REPORT_FILE,
    `${JSON.stringify(fallbackReport, null, 2)}\n`,
    'utf8',
  );

  console.error(error);
  process.exitCode = 1;
});
```

```json file=package.json
{
  "name": "newera-copilot-ui-regression",
  "version": "1.0.0",
  "private": true,
  "description": "Visual and runtime regression checks for the NewEra Copilot interface.",
  "scripts": {
    "test": "node tests/run-visual-tests.mjs",
    "test:headed": "HEADLESS=false node tests/run-visual-tests.mjs"
  },
  "engines": {
    "node": ">=18.17.0"
  }
}
```

```bash file=tests/run-visual-tests.sh
#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' 'Node.js is required to run the visual tests.' >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  printf '%s\n' 'curl is required to start the local server.' >&2
  exit 1
fi

PORT="${PORT:-4173}"
BASE_URL="${BASE_URL:-http://127.0.0.1:${PORT}}"
SERVER_LOG="$(mktemp)"
SERVER_PID=""

cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi

  rm -f "$SERVER_LOG"
}

trap cleanup EXIT

if [[ -z "${BASE_URL:-}" ]]; then
  node scripts/serve-static.mjs "$PORT" >"$SERVER_LOG" 2>&1 &
  SERVER_PID=$!

  for _ in $(seq 1 50); do
    if curl --silent --fail "$BASE_URL" >/dev/null 2>&1; then
      break
    fi

    if ! kill -0 "$SERVER_PID" 2>/dev/null; then
      cat "$SERVER_LOG" >&2
      exit 1
    fi

    sleep 0.1
  done
fi

BASE_URL="$BASE_URL" npm test
```

```js file=scripts/serve-static.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const port = Number(process.argv[2] || 4173);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function sendFile(response, filePath, statusCode = 200) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      response.end('Not found');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();

    response.writeHead(statusCode, {
      'Content-Type':
        mimeTypes[extension] ||
        'application/octet-stream',
      'Cache-Control': 'no-store'
    });

    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(
    request.url || '/',
    `http://${request.headers.host || '127.0.0.1'}`
  );

  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/') {
    pathname = '/index.html';
  }

  const normalizedPath = path
    .normalize(pathname)
    .replace(/^(\.\.(\/|\\|$))+/, '');

  const requestedPath = path.join(rootDir, normalizedPath);

  if (!requestedPath.startsWith(rootDir)) {
    response.writeHead(403, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    response.end('Forbidden');
    return;
  }

  fs.stat(requestedPath, (statError, stats) => {
    if (!statError && stats.isFile()) {
      sendFile(response, requestedPath);
      return;
    }

    sendFile(response, path.join(rootDir, 'index.html'), 404);
  });
});

server.listen(port, '127.0.0.1', () => {
  process.stdout.write(
    `Static server listening at http://127.0.0.1:${port}\n`
  );
});
```

```md file=tests/README.md
# NewEra Copilot UI regression tests

## Purpose

This suite checks the NewEra Copilot web interface for:

- Successful document rendering
- Desktop and mobile viewport coverage
- Browser console errors
- Uncaught page exceptions
- Unhandled promise rejections
- Horizontal page overflow
- Repeatable screenshot capture

The test runner uses the browser debugging protocol already available in the execution environment. It does not install a browser automation package and does not download external assets.

## Requirements

- Node.js 18.17 or newer
- Chromium or Chrome running with remote debugging enabled
- The application server running locally, or the included static server script

## Run locally

Start the included server:

```bash
node scripts/serve-static.mjs 4173
```

In another terminal, start Chromium with remote debugging:

```bash
chromium --remote-debugging-port=9222 --user-data-dir=/tmp/newera-copilot-chrome
```

Run the suite:

```bash
BASE_URL=http://127.0.0.1:4173 npm test
```

The shell wrapper starts the static server when `BASE_URL` is not already set:

```bash
chmod +x tests/run-visual-tests.sh
./tests/run-visual-tests.sh
```

## Output

Screenshots are written to:

```text
tests/output/screenshots/
```

The machine-readable report is written to:

```text
tests/output/report.json
```

A case fails when any of the following conditions is present:

- The page cannot be navigated to
- The screenshot cannot be captured
- The browser console contains an error
- The page throws an exception
- The page produces an unhandled promise rejection
- The document has horizontal overflow

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `BASE_URL` | `http://127.0.0.1:4173` | Application origin |
| `BROWSER_DEBUG_URL` | `http://127.0.0.1:9222` | Browser debugging endpoint |
| `HEADLESS` | `true` | Reserved for environment-specific browser startup behavior |

## Assumptions

- The application routes described in the test matrix are available in the deployment.
- The browser debugging endpoint permits local WebSocket connections.
- Login-protected routes may display the authenticated application shell or the organization-provided sign-in page depending on the deployment session.
```

交付说明：

- 完成了视觉回归测试运行器的剩余代码、依赖配置、本地静态服务器、Shell 启动脚本及测试说明。
- 文件清单：
  - `tests/run-visual-tests.mjs`：续接后的完整测试执行部分。
  - `package.json`：测试命令与运行环境。
  - `tests/run-visual-tests.sh`：自动启动服务并执行测试。
  - `scripts/serve-static.mjs`：无外部依赖的本地静态服务器。
  - `tests/README.md`：执行方式、输出位置、判定规则与假设。
- 注意事项：测试依赖本机 Chrome/Chromium 的远程调试端口 `9222`；截图和 JSON 报告输出至 `tests/output/`。未修改其他员工职责范围内的文件。

## 验收报告

{
  "passed": false,
  "summary": "本轮验收不通过。主要原因：(1) F15/F16 完全未达成——screenshots/ 目录 0 张 PNG 实体截图，TEST_REPORT.md 中 27 条用例与 14 项验收标准全部标记为“阻塞/待回填”，无任何实测证据；(2) 前端工程师成果中 app.js 全文未提供，导致 F2/F5/F6/F7/F8/F9/F10/F11/F12 等核心逻辑（模拟后端 authService、失败锁定 5 分钟倒计时、会话过期模态框与 30s 定时校验、登出清理、路由守卫与 redirect 回跳、Tab 状态机、测试钩子参数）全部无法核验；(3) UI 设计师交付缺少 F14 要求的 app.js，且其 index.html 内联脚本使用 `sso-remembered-account` 等自有存储键，与测试工程师约定的 `newera.sso.*` 契约存在冲突风险；双方存储键未统一前，F15 截图注入会话必然失败。好的一面：UI 视觉层面表现优秀——已交付代码中未发现任何 emoji/表情符号，图标全部为内联 SVG；配色为单一主色 #1f5eff 深浅变体 + 中性黑白灰 + 绿/红辅助状态色，无彩虹渐变；间距/圆角/阴影/字体全部走 CSS 变量，卡片 12px、输入框 8px、按钮 8px、阴影仅 2 级，符合 6.2 规范；布局层级清晰、栅格与留白一致，无明显模板拼凑感。综合判定：不通过，需补齐 app.js、统一存储键契约并实际执行截图与测试回归。",
  "checklist": [
    {
      "item": "F1 账号密码登录：账号/密码格式校验、密码可见性切换、记住账号",
      "status": "warn",
      "note": "前端 index.html 有账号+密码输入框、内联 SVG 图标、aria-describedby 错误位、眼睛切换按钮与记住账号复选框；ui-designer 版另有 6 位长度校验与 localStorage 记忆。但最终 app.js 未提供，无法确认前端是否做邮箱/用户名格式校验、密码 6 位校验与记住账号是否真正写入存储并回填。"
    },
    {
      "item": "F2 短信验证码登录：11 位校验、60s 倒计时禁用、6 位校验",
      "status": "warn",
      "note": "前端 index.html 有手机号(maxlength=11)、获取验证码按钮、6 位验证码输入与演示码提示；ui-designer 内联脚本实现了正则 /^1\\d{10}$/ 与 60s 倒计时禁用递减（文案“60s 后重试”）。前端侧逻辑位于未提供的 app.js，无法验证。"
    },
    {
      "item": "F3 扫码登录状态机：待扫描→已扫描待确认→确认成功 + 刷新/切换账号",
      "status": "warn",
      "note": "前端 index.html 提供 CSS 绘制 qr-pattern 二维码占位、中心内联 SVG 徽标、qrStatus 状态区、disabled 的 qrSubmit（“等待扫码”）、刷新二维码/切换账号链接，并有 qrState=scanned 测试参数约定；实际状态机在 app.js，未提供。ui-designer 实现了三态 DOM（waiting/scanned/success）与 3s 自动切换。"
    },
    {
      "item": "F4 Tab 切换：保留输入、清空错误、按钮文案联动",
      "status": "warn",
      "note": "前端 index.html 有 role=tablist/tab/tabpanel 与 tabIndicator，CSS 为 .tab-indicator 33.333% 宽 + transform 过渡，但 index.html 内联脚本缺失、app.js 未提供，指示条位置与“保留输入/清错”逻辑无法核验。ui-designer 的 selectTab() 有 clearMessages()，但该实现随内联脚本存在被覆盖风险。"
    },
    {
      "item": "F5 错误提示条：输入框下方红色细提示 + 顶部浅色提示条，均带 aria-live",
      "status": "pass",
      "note": "前端 index.html：顶部 page-notice（role=status aria-live=polite，含 is-success/is-error 变体）+ 每个 .field-error（aria-live=polite，min-height 18px 预留高度不跳动）；ui-designer 同构实现（#page-alert + .field-message）。"
    },
    {
      "item": "F6 失败锁定：连续 5 次密码错误锁定 5 分钟，按钮倒计时禁用态",
      "status": "fail",
      "note": "两份成果中均无锁定逻辑。前端 index.html 无锁定文案元素，锁定应实现在未提供的 app.js；ui-designer 内联脚本仅用 secret==='wrong' 判错，无失败计数与锁定。若 app.js 未实现则 F6 直接不达标。"
    },
    {
      "item": "F7 按钮加载态：CSS 旋转指示 + 文案变化 + 防重复点击",
      "status": "pass",
      "note": "前端 .primary-button 含 .spinner（@keyframes spin，is-loading 时显示）+ .button-label 文案位，HTML 中 spinner 与 label 分离，可被 app.js 切换文案；ui-designer 同构。"
    },
    {
      "item": "F8 会话过期模态框：标题“会话已过期”+ 重新登录 + 锁定背景滚动",
      "status": "warn",
      "note": "styles.css 定义了 .modal-backdrop/.modal/.modal-icon 与 body.modal-open{overflow:hidden}，说明前端已规划该模态框，但 index.html 无模态结构、无“会话已过期”文案、无过期定时器与 window.focus 校验逻辑——依赖未提供的 app.js。"
    },
    {
      "item": "F9 登出：用户菜单退出登录并清理存储回登录页",
      "status": "warn",
      "note": "styles.css 有 .user-dropdown/.logout-button（危险色），app.html 内容未提供、app.js 未提供，无法确认登出是否清理 token/用户信息/过期时间并跳转登录页。"
    },
    {
      "item": "F10 会话持久化：Token+用户信息+签发/过期时间写入 localStorage",
      "status": "warn",
      "note": "测试工程师已确认前端约定键为 newera.sso.session 并定义结构 {token,user,issuedAt,expiresAt}；但前端 app.js 未提供，实际读写代码不可核验；且 ui-designer 使用的键为 sso-remembered-account，存在契约不统一风险。"
    },
    {
      "item": "F11 路由守卫：未登录访问受保护页重定向 /index.html?redirect=目标",
      "status": "warn",
      "note": "依赖 app.js；前端 index.html 未显示 redirect 提示文案元素（page-notice 可承载，但文案“登录后将继续访问…”在未提供的 app.js 中）。"
    },
    {
      "item": "F12 登录回跳：按 redirect 返回原目标页，无 redirect 进 app.html",
      "status": "warn",
      "note": "依赖未提供的 app.js；测试脚本已约定 redirect 仅允许站内相对路径，但前端是否做白名单校验未知。"
    },
    {
      "item": "F13 权限页 401/403/404，风格统一",
      "status": "warn",
      "note": "前端与 ui-designer 均列出 401.html/403.html/404.html，styles.css 提供统一 .error-page/.error-card/.error-illustration 样式；但 HTML 正文未提供，内容与插画 SVG 无法核对。"
    },
    {
      "item": "F14 交付文件齐全（index/styles/app.js/app/401/403/404/README）",
      "status": "fail",
      "note": "前端成果列出全部文件，但 app.js、app.html、401/403/404.html、README.md 正文均未随成果提交（仅 CSS/HTML 片段且 styles.css 在 .code-bu 处截断）；ui-designer 明确无 app.js，缺 F14 要求的 README.md。"
    },
    {
      "item": "F15 screenshots/ ≥12 张截图 + README 索引表",
      "status": "fail",
      "note": "screenshots/ 目录仅有 README.md 索引（结构完整、用例编号/预期/实际/结论齐全），0 张 PNG 实体文件；测试工程师自述因环境缺失阻塞，F15 未达成。"
    },
    {
      "item": "F16 TEST_REPORT.md：用例表、缺陷清单、复测结论",
      "status": "fail",
      "note": "报告框架完整（21+6 用例、AC-01~14、缺陷含复现步骤/责任角色/解除条件/复测计划），但“实际结果/结论”全部为“阻塞/待回填”，无任何实测结论，不满足 F16。"
    },
    {
      "item": "验收1：双击可运行、全部资源本地化、无外链 CDN/图片/字体",
      "status": "pass",
      "note": "已提供 HTML 中仅有本地 styles.css/app.js 与内联 SVG，无 http(s) 外链、无外链字体；字体使用系统字体栈。"
    },
    {
      "item": "验收7：全部页面不出现任何 emoji/表情符号",
      "status": "pass",
      "note": "逐页检查已提供的 HTML/CSS/JS 文本，未发现任何 emoji 或表情符号，图标均为内联 SVG 或纯 CSS（二维码为 CSS 渐变方格）。"
    },
    {
      "item": "验收8：单主色 + 中性色 + 辅助色，无彩虹渐变/多高饱和色混用",
      "status": "pass",
      "note": "前端主色 #1f5eff（含 dark/soft 变体），仅绿 #237a57 与红 #c43d4b 作成功/错误辅助；渐变仅用于品牌区/欢迎卡的主色深浅渐层，无彩虹渐变；无多高饱和色混用。"
    },
    {
      "item": "验收9：全局 CSS 变量统一管理颜色/间距/圆角/阴影/字体",
      "status": "pass",
      "note": "两份 styles.css 均以 :root 变量集中定义 color/spacing/radius/shadow/font，组件内未写死独立色值（仅 rgba(255,255,255,.x) 白字透明变体，属主色衍生）。"
    },
    {
      "item": "验收10：交互元素具备 hover/focus/active/disabled 状态，焦点可见",
      "status": "pass",
      "note": "前端定义了 :focus-visible outline 2px、button:hover/:active/:disabled、input-shell:focus-within、code-button:disabled、primary-button:hover:not(:disabled)/:active:not(:disabled)，覆盖较完整。"
    },
    {
      "item": "验收12：键盘可达、label 关联、错误提示 aria-live",
      "status": "pass",
      "note": "所有输入均有 <label for> 关联，错误位 aria-live=\"polite\"，Tab 面板 role=tablist/tab/tabpanel，checkbox-label 包裹可键盘操作；ui-designer 版另有方向键切换 Tab。"
    },
    {
      "item": "验收14：screenshots/ ≥12 张真实截图覆盖全部分支",
      "status": "fail",
      "note": "0 张实体 PNG，14 项验收中 AC-01~13 全部因未执行浏览器验证而标记阻塞。"
    },
    {
      "item": "UI 质量：布局统一、层级清晰、非模板拼凑",
      "status": "pass",
      "note": "前端版为品牌区 + 420px 卡片两栏栅格，层级明确（eyebrow→h1→说明→特性列表），间距节奏统一、装饰性元素克制，具备商业级 SaaS 观感；ui-designer 版同属一风格体系。"
    },
    {
      "item": "一致性：两份成果之间的存储键/视觉/文案冲突",
      "status": "fail",
      "note": "ui-designer 版 index.html 使用 sso-remembered-account 且样式体系（--color-primary-subtle 等变量名）与前端 styles.css（--color-primary-soft）不同，两套 HTML/CSS 混用会导致样式与存储双份不一致，F15 截图注入会话键 newera.sso.session 也会与 designer 版不匹配。"
    }
  ],
  "issues": [
    {
      "worker_key": "前端工程师",
      "problem": "成果中 app.js 全文未提供，导致会话管理、路由守卫、登出、会话过期模态框与定时校验、失败锁定、扫码状态机、Tab 指示条等全部核心逻辑无法核验，F6/F8/F9/F10/F11/F12 无法判定为通过。",
      "suggestion": "完整提交 app.js 源码，并在 README.md 中说明：1) 会话读写键必须为 newera.sso.session（结构含 token/user/issuedAt/expiresAt）；2) 实现 5 次失败锁定 5 分钟并在登录按钮上显示剩余秒数；3) 每 30s + window.focus 校验会话，过期弹“会话已过期”模态并锁定背景滚动；4) 登出清理 newera.sso.* 全部键；5) 实现测试参数钩子 ?tab=sms|qr、?qrState=scanned、?error=password|locked、?lockSeconds=、?smsCountdown=、?success=1、?expired=1、?sessionSeconds=，并对 redirect 做站内相对路径白名单校验。"
    },
    {
      "worker_key": "测试工程师",
      "problem": "screenshots/ 目录 0 张 PNG，TEST_REPORT.md 全部用例与 AC 均为“阻塞/待回填”，F15/F16 与验收标准 14 未达成，无任何实测证据。",
      "suggestion": "在具备 Node.js 与 Chromium 的环境中执行 node tests/capture-screenshots.js，生成全部 21 张 PNG 并回填 screenshots/README.md 的“实际/结论”与 TEST_REPORT.md 的实际结果；不可执行时须由项目维护方提供浏览器与落盘目录，不得以脚本存在代替截图交付。同时确认前端真实存储键与脚本一致，关闭 BLOCK-SESSION-001。"
    },
    {
      "worker_key": "UI-设计师",
      "problem": "交付缺少 F14 要求的 app.js 与 README.md；且其 index.html 内联脚本使用 sso-remembered-account，与前端/测试约定的 newera.sso.* 契约冲突，两套 HTML+CSS 变量体系并存会造成样式与状态双份不一致。",
      "suggestion": "将设计稿收敛为单一最终交付：index.html 保留结构与内联 SVG，逻辑统一收敛到前端 app.js；存储键统一为 newera.sso.rememberedAccount 等 newera.sso.* 前缀；CSS 变量名与最终 styles.css 对齐（--color-primary-soft/-dark），避免两套变量同时存在；补交 README.md 说明结构与运行方式。"
    },
    {
      "worker_key": "前端工程师",
      "problem": "index.html 中缺少锁定期按钮文案、扫码“确认登录”按钮文案、会话过期模态结构与 redirect 提示等静态内容占位，依赖未提供的 app.js 动态生成；且 F5 要求的 aria-invalid 未在 HTML 中体现（仅有 aria-describedby）。",
      "suggestion": "在输入框上补充 aria-invalid=\"true/false\" 的动态切换；为扫码按钮预留“等待扫码/确认登录”文案切换；为锁定期按钮预留倒计时文案；会话过期模态建议直接写入 HTML 并由 app.js 控制显隐，便于无脚本时也有可核对结构。"
    },
    {
      "worker_key": "UI-设计师",
      "problem": "部分细节偏离 6.2 规范：品牌区标题使用 clamp(...,48px) 超出 12/13/14/16/20/28/32 字号阶梯；label 使用 font-weight:650（非标准字重）；输入框内 icon 尺寸 24px 而规范要求 20x20 viewBox、1.5px 描边。",
      "suggestion": "将品牌标题改为 32px（--font-size-xxl），去掉 clamp；字重改用 400/600/700；所有图标统一为 20x20 viewBox + stroke-width 1.5。"
    }
  ]
}