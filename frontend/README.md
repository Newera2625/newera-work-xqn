# Demo SSO · 简单单点登录演示站

一个零依赖、零外部资源的纯前端 SSO（Single Sign-On，单点登录）演示项目。
完整演示：**跳转登录 → 认证中心校验 → 建立会话 → 访问受保护资源 → 单点登出** 的闭环。

---

## 1. 如何打开

### 方式一：直接双击

直接双击 `index.html` 即可。全部逻辑使用普通 `<script>` 标签加载（非 ES Module），
因此在 `file://` 协议下也能正常运行，不受 CORS 限制。

### 方式二：本地静态服务器（推荐）

```bash
# 任选其一，在项目根目录执行
python3 -m http.server 8000
npx serve .
```

然后访问 `http://localhost:8000/index.html`。

---

## 2. 目录结构

```
/
├── index.html        # 首页：概念介绍 + 流程图 + 演示账号 + 当前状态
├── login.html        # 统一登录页
├── accounts.html     # 身份选择页（模拟同一浏览器中已保存的多个账号）
├── app.html          # 受保护资源页（会话信息 + 已接入应用）
├── denied.html       # 需要登录 / 无权访问提示页
├── assets/
│   ├── style.css     # 全局样式与 CSS 变量
│   ├── auth.js       # 认证与会话逻辑（所有页面共用，挂载 window.DemoSSO）
│   └── app.js        # 各页面 DOM 交互绑定
└── README.md
```

---

## 3. 演示账号

| 账号 | 密码 | 角色 | 说明 |
|---|---|---|---|
| `admin@demo.com` | `demo123` | 管理员 | 拥有全部应用的访问与管理权限 |
| `user@demo.com` | `demo123` | 成员 | 可访问已接入的日常业务应用 |
| `guest@demo.com` | `demo123` | 访客 | 仅可查看公开信息与演示数据 |

---

## 4. SSO 流程说明

### 4.1 登录主流程

1. 用户点击「登录 / 进入应用」，进入 `login.html`。
2. 用户直接访问 `app.html` 且未登录 → 守卫拦截，跳转 `login.html?redirect=app.html`。
3. 提交表单后前端先做格式校验（邮箱格式、密码非空），通过后调用 `DemoSSO.login(email, password, remember)`：
   - 校验失败 → 显示错误提示条「账号或密码不正确，请重试」，输入框进入错误态。
   - 校验成功 → 写入 `localStorage['sso.session']`：
     ```json
     {
       "token": "sso_" + "32 位随机十六进制",
       "email": "admin@demo.com",
       "name": "林知远",
       "role": "管理员",
       "issuedAt": 1710000000000,
       "expiresAt": 1710001800000,
       "remember": true,
       "issuer": "Demo SSO 认证中心"
     }
     ```
4. 登录成功后读取 `?redirect=`：命中站内白名单（`app.html` / `index.html`）则回跳该地址，否则进入 `app.html`。
5. `app.html` 的守卫校验会话存在且未过期 → 渲染用户信息与应用列表。

### 4.2 单点登出流程

1. 点击「退出登录」→ 出现内联确认条（非系统 `confirm`）。
2. 确认后清除 `localStorage['sso.session']`，跳转 `login.html?logout=1`，页面显示「已安全退出」。
3. 再次访问 `app.html` 会被守卫拦截。

### 4.3 会话过期流程

会话有效期 **30 分钟**。守卫检测到 `Date.now() > expiresAt` 时清除会话，
跳转 `login.html?expired=1&redirect=app.html`，登录页显示「登录状态已过期，请重新登录」，
登录成功后自动回到 `app.html`。

> 验证方式：在浏览器控制台执行以下语句即可立即触发过期流程。
> ```js
> var s = JSON.parse(localStorage['sso.session']);
> s.expiresAt = Date.now() - 1000;
> localStorage['sso.session'] = JSON.stringify(s);
> location.reload();
> ```

### 4.4 剩余时间提示

导航栏与会话面板实时展示剩余时长（每秒刷新）。剩余不足 **5 分钟** 时，
时间文案切换为辅助色（琥珀）并出现「即将过期」徽章。

---

## 5. 视觉与工程约定

- **配色**：单一主色靛蓝 `#3B5BDB`（含深浅变体）+ 中性色（`#0F172A` / `#475569` / `#94A3B8` / `#E2E8F0` / `#F8FAFC` / `#FFFFFF`）
  + 单一辅助色琥珀 `#B45309` / `#FEF3C7`（仅用于「即将过期」与警示提示）。
- **图标**：全部为内联 SVG，`stroke="currentColor"`、`stroke-width="1.75"`、24×24 viewBox，无 emoji、无图片、无图标字体。
- **外部资源**：无 CDN、无在线字体、无外部图片请求。
- **设计令牌**：颜色、间距（4px 基准）、圆角（12px 卡片 / 10px 按钮与输入框）、阴影（两级）、字体统一由 `assets/style.css` 顶部的 `:root` 变量提供。
- **可访问性**：表单 label 与输入框关联，错误提示条 `role="alert" aria-live="polite"`，
  全局 `:focus-visible` 描边清晰，可纯键盘完成登录全流程。
- **响应式**：360px 手机到 1440px 桌面均无横向滚动；首页内容最大宽度 1080px 居中，登录卡片最大宽度 420px。

---

## 6. 接入真实后端

`assets/auth.js` 中的 `login` / `logout` / `getSession` 三个函数是唯一与「认证中心」耦合的位置，
替换这三个函数即可对接真实服务，其余页面代码无需改动。

### 6.1 `login(email, password, remember)`

当前实现：查本地账号表 → 生成 Token → 写入 `localStorage`。

替换为真实接口（示意）：

```js
function login(email, password, remember) {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, remember: remember })
  })
    .then(function (res) {
      if (!res.ok) return { ok: false, message: "账号或密码不正确，请重试" };
      return res.json();
    })
    .then(function (data) {
      setSession({
        token: data.token,
        email: data.email,
        name: data.name,
        role: data.role,
        issuedAt: Date.now(),
        expiresAt: Date.now() + SESSION_TTL,
        remember: !!remember,
        issuer: data.issuer
      });
      return { ok: true, session: getSession() };
    });
}
```

> 注意：真实项目应改用 `HttpOnly` Cookie 承载会话，前端不再保存 Token，
> 此时 `getSession()` 只需调用 `GET /api/auth/session` 判断是否登录。

### 6.2 `logout()`

当前实现：清除 `localStorage`。

替换为真实接口：

```js
function logout() {
  return fetch("/api/auth/logout", { method: "POST" }).finally(function () {
    clearSession();
  });
}
```

### 6.3 `getSession()` / `getValidSession()`

当前实现：读取并校验 `localStorage['sso.session']` 的 `expiresAt`。
真实后端场景可改为读取 Cookie 或调用 `GET /api/auth/session`，
保持对外签名不变（返回会话对象或 `null`），页面逻辑即可无缝复用。

### 6.4 需要同步调整的白名单

```js
var PROTECTED_PAGES = ["app.html"];          // 受保护页面列表
var REDIRECT_ALLOWLIST = ["app.html", "index.html"]; // 允许回跳的目标
```

---

## 7. 验收自查

| 项 | 说明 |
|---|---|
| 直接打开可用 | `file://` 双击 `index.html`，全部功能可用，无控制台报错 |
| 正确凭据 | `admin@demo.com / demo123` 登录成功 |
| 错误凭据 | `admin@demo.com / wrong` 显示错误提示条 |
| 守卫拦截 | 未登录访问 `app.html` → 跳转 `login.html?redirect=app.html` |
| 登录回跳 | 登录成功后自动回到 `app.html` |
| 登出生效 | 退出后再次访问 `app.html` 仍被拦截 |
| 过期可验 | 修改 `expiresAt` 为过去时间即触发过期跳转与提示 |
| 状态展示 | 导航区显示用户名与剩余时间，剩余 <5 分钟出现「即将过期」徽章 |
| 响应式 | 375×667 与 1440×900 均无横向滚动、无重叠 |
| 资源纯净 | 无 emoji、无外部图片/字体/CDN 请求 |
| 配色 | 单主色 + 中性色 + 单一辅助色，无彩虹配色 |
| 键盘可达 | Tab 顺序合理，focus-visible 描边清晰，错误经 aria-live 播报 |
