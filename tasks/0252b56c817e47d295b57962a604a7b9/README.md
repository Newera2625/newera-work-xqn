# 给我制作一个简单的s so

- 对话 ID：`0252b56c817e47d295b57962a604a7b9`
- 生成时间：2026-11-12 15:24

## 需求文档

# 简单 SSO 单点登录演示站 · 需求文档

> 说明：用户原始输入「给我制作一个简单的 s so」语义不完整，本方案按最合理解释理解为「做一个简单的 SSO（Single Sign-On，单点登录）演示项目」，以纯前端可运行的演示形式呈现单点登录的核心流程与体验。若原意为其它内容（如 "so so" 类小工具），仅需替换功能清单中的业务页面，视觉与工程骨架可复用。

## 1. 目标

1. 用一个可本地直接打开的最小项目，完整演示 SSO 的核心闭环：跳转登录 → 认证中心校验 → 建立会话 → 访问受保护资源 → 单点登出。
2. 零依赖、零外部资源：只用 HTML / CSS / 原生 JS，不引入框架、图片 CDN、在线字体。
3. 页面观感统一、克制、专业，具备真实产品的完成度（状态完整、响应式、可键盘操作），而非表单拼接的临时页面。
4. 结构清晰可扩展：认证逻辑集中在 `assets/auth.js`，样式集中在 `assets/style.css`，便于后续接入真实后端。

## 2. 功能清单

| 编号 | 功能 | 说明 |
|---|---|---|
| F1 | 统一登录页 | 账号/密码输入、显示-隐藏密码、提交、错误提示、快捷账号一键填充 |
| F2 | 身份选择页 | 列出 3 个预置账号，点击即以该账号登录（模拟"已在本设备登录过"的身份） |
| F3 | 模拟认证中心 | 校验账号密码；错误时返回中性错误文案；成功则签发会话 token |
| F4 | 会话管理 | localStorage 模拟 Cookie 会话，含 token、用户信息、登录时间、过期时间（30 分钟） |
| F5 | 受保护资源页 | 访问前做鉴权守卫；未登录/过期 → 自动跳转登录页并携带 redirect 与原因参数 |
| F6 | 登录后回跳 | 登录成功后跳回最初访问的受保护地址（`?redirect=` 参数） |
| F7 | 会话状态展示 | 导航区显示当前用户名与剩余有效时间；剩余 <5 分钟显示辅助色提示徽章 |
| F8 | 单点登出 | 清除会话、跳回登录页并提示"已安全退出"；会话过期同样回到登录页 |
| F9 | 首页入口 | 介绍 SSO 概念、流程图（内联 SVG）、进入受保护资源按钮、根据登录态显示不同文案 |
| F10 | 响应式与可访问性 | 360px 手机到 1440px 桌面正常；表单 label 关联、错误提示 aria-live、Tab 焦点可见 |

## 3. 页面 / 模块

### 3.1 文件结构

```
/
├── index.html        # 首页：介绍 + 流程图 + 入口
├── login.html        # 统一登录页
├── accounts.html     # 身份选择页（模拟多账号）
├── app.html          # 受保护资源页（示例应用 A/B 入口 + 会话信息）
├── denied.html       # 未授权 / 无权访问提示页
├── assets/
│   ├── style.css     # 全局样式与 CSS 变量
│   ├── auth.js       # 认证与会话逻辑（所有页面共用）
│   └── app.js        # 各页面交互绑定
```

### 3.2 首页 `index.html`

- 顶部导航：Logo（内联 SVG）+ 站点名「Demo SSO」，右侧根据登录态显示「进入控制台」/「登录」。
- 主体：
  - Hero：标题「一次登录，访问全部应用」+ 副标题 + 两个按钮（主按钮「登录 / 进入应用」、次按钮「选择已有身份」）。
  - 「登录流程」区：4 步流程图，用内联 SVG + 编号卡片：① 访问应用 ② 跳转认证中心 ③ 校验并建立会话 ④ 携带 Token 访问应用。
  - 「演示账号」区：3 张账号卡片，展示账号、角色、密码，点击「使用该账号登录」直接进入 accounts.html 对应身份。
  - 「当前状态」区：已登录时显示用户名、登录时间、剩余时长；未登录显示引导文案。
- 底部：极简页脚（版权说明 + 演示用途声明）。

### 3.3 登录页 `login.html`

- 布局：居中单列卡片，最大宽度 420px；卡片上方 Logo 与标题「登录 Demo SSO」，副标题「使用演示账号继续」。
- 表单：
  - 邮箱输入框（type=email，placeholder `you@demo.com`，带前置内联 SVG 邮件图标）。
  - 密码输入框（带前置锁形 SVG 图标 + 右侧"眼睛"图标切换显示/隐藏，按钮 aria-label 切换）。
  - 「记住此设备（30 天）」复选框（仅影响视觉与 localStorage 标记 `remember`，不改变会话有效期逻辑）。
  - 主按钮「登录」，宽度撑满；提交中显示 loading 文案「登录中…」并禁用。
  - 错误提示条：位于表单上方，浅色底 + 左侧警示 SVG，文案如「账号或密码不正确，请重试」，aria-live="polite"。
- 辅助区：
  - 「或使用已有身份登录」分隔线 + 链接按钮 → `accounts.html`。
  - 演示提示条：「演示环境可用账号：admin@demo.com / user@demo.com / guest@demo.com，密码 demo123」。
- 顶部状态提示（根据 URL 参数）：
  - `?redirect=` 存在且为受保护地址 → 显示「登录后将返回：<路径名>」。
  - `?expired=1` → 显示「登录状态已过期，请重新登录」。
  - `?logout=1` → 显示「已安全退出」。
- 底部返回首页链接。

### 3.4 身份选择页 `accounts.html`

- 标题「选择要登录的身份」，副标题「模拟同一浏览器中已保存的多个账号」。
- 3 张横向卡片：左侧 40px 圆形字母/首字母徽章（主色浅底 + 主色文字），中间账号名（加粗）+ 角色描述（管理员 / 成员 / 访客），右侧「继续」文字按钮 + 箭头 SVG。
- 卡片整块可点击，hover 上浮 2px + 阴影加深；focus-visible 有描边。
- 底部「使用另一个账号」文字按钮 → `login.html`。

### 3.5 受保护资源页 `app.html`

- 顶部导航栏：左 Logo + 站点名；右侧用户徽章（首字母圆标 + 用户名 + 角色）+ 会话剩余时间文案 + 「退出登录」按钮（次要样式）。
- 会话信息面板：Token（等宽字体，截断显示，hover 展开全部）、登录时间、剩余有效时间、签发中心。
- 「已接入的应用」区：2 张应用卡（示例工单系统 / 示例报表中心），每张卡含内联 SVG 图标、名称、一行描述、「打开」按钮；点击触发 1.2s 模拟加载（骨架/loading 态）后展示"已进入"状态并更新会话最后访问时间。
- 剩余时间 < 5 分钟时：时间文案变辅助色并出现「即将过期」小徽章。
- 未登录访问该页 → 由守卫跳转，不渲染内容。

### 3.6 提示页 `denied.html`

- 居中卡片：盾牌/锁形 SVG 图标、标题「需要登录后才能访问」、说明文案、主按钮「前往登录」（带 redirect 参数）、次按钮「返回首页」。

## 4. 交互流程

### 4.1 登录主流程

1. 用户在首页点击「登录 / 进入应用」→ `login.html`。
2. 用户在 `app.html` 未登录时直接访问 → 守卫读取 `?redirect=app.html` → 跳 `login.html?redirect=app.html`。
3. 提交表单 → 前端校验（邮箱格式、密码非空）→ 通过后调用 `auth.login(email, password)`：
   - 校验失败 → 错误提示条显示「账号或密码不正确，请重试」，输入框错误态描边，提交按钮恢复可用。
   - 校验成功 → 写入 `localStorage['sso.session'] = { token, email, name, role, issuedAt, expiresAt, remember }`，`token` 为 `sso_` + 32 位随机十六进制串。
4. 登录成功 → 读取 `?redirect=`：
   - 存在且为站内白名单路径（app.html / index.html）→ 跳转该地址；
   - 不存在 → 跳转 `app.html`。
5. `app.html` 守卫校验会话存在且未过期 → 渲染用户信息；否则按 F5 重新跳转登录页。

### 4.2 单点登出流程

1. 点击「退出登录」→ 二次确认（内联轻量确认条/弹层，非系统 confirm 样式亦可，但需与视觉一致）→ 清除 `localStorage['sso.session']`。
2. 跳转 `login.html?logout=1` → 显示「已安全退出」提示条。

### 4.3 会话过期流程

- 守卫检测 `Date.now() > expiresAt` → 清除会话 → 跳转 `login.html?expired=1&redirect=<原路径>` → 登录页显

## 验收结果

```json
{"passed": false, "summary": "合并后的最终文件与《需求文档》严重不符：assets/auth.js、assets/app.js、assets/style.css 实际是另一项目「Northwind Console」（英文 SaaS 后台，含用户 CRUD 仪表盘），并非 Demo SSO 演示站；且 app.js 与 style.css 文件内容在提交时被截断（语法不完整），README 与 accounts.html 属于 frontend/ 目录下的另一套实现，与 assets 不兼容。核心需求 F1–F10 几乎全部未落地：无 token、无 30 分钟会话、无 ?redirect= 回跳、无密码校验、无「即将过期」徽章、登录态展示、首页流程图等均缺失或被其它功能替代。文案大量为英文，违反简体中文要求；配色出现红/绿/靛蓝/琥珀多色，违反单一辅助色约束；同时交付目录缺少 index.html、login.html、app.html、denied.html 等必需页面文件。验收不通过。", "checklist": [{"item": "交付物文件结构：6 个 HTML + assets/style.css + assets/auth.js + assets/app.js + README.md", "status": "fail", "note": "最终文件中未见 index.html、login.html、app.html、denied.html；仅有 frontend/accounts.html 与 frontend/README.md，且目录层级为 frontend/ 而非要求根目录。"}, {"item": "F1 统一登录页（账号/密码、显隐密码、提交、错误提示、快捷填充）", "status": "fail", "note": "无 login.html，登录页完全缺失。"}, {"item": "F2 身份选择页（3 个预置账号，点击即登录）", "status": "fail", "note": "frontend/accounts.html 结构符合 F2 描述，但它依赖 assets/app.js 中的身份逻辑，而合并后的 assets/app.js 是 Northwind 版本（仪表盘/记录表/用户管理），无 identity-card 事件绑定，页面点击不会登录；同时该 HTML 引用的是 root 级 assets/ 路径，与 frontend/ 目录不符。"}, {"item": "F3 模拟认证中心（校验账号密码、中性错误文案、签发 token）", "status": "fail", "note": "auth.js 的 signIn 不校验密码：仅判断 password.length>=6，且用户表为 6 个 @northwind.io 账号（无密码字段），无 token 签发。"}, {"item": "F4 会话管理（localStorage sso.session，token/用户/登录时间/30 分钟过期）", "status": "fail", "note": "会话键为 nwc.session，结构无 token/remember，有效期为 8 小时或 30 天，无 30 分钟过期。"}, {"item": "F5 受保护资源页鉴权守卫（未登录/过期跳转登录页并带 redirect 与原因）", "status": "fail", "note": "requireAuth 使用 ?next= 参数而非 ?redirect=，且无 expired 原因参数；会话过期时未清除会话。"}, {"item": "F6 登录后按 ?redirect= 回跳（白名单 app.html/index.html）", "status": "fail", "note": "无 ?redirect= 解析与站内白名单逻辑。"}, {"item": "F7 会话状态展示（用户名 + 剩余时间，<5 分钟辅助色徽章）", "status": "fail", "note": "无剩余时间倒计时与「即将过期」徽章实现；app.js 中有 data-nav-time 相关标记但无对应逻辑（文件本身被截断）。"}, {"item": "F8 单点登出（清除会话、跳登录页并提示「已安全退出」）", "status": "fail", "note": "signOut 后直接跳 login.html，未带 ?logout=1，页面无「已安全退出」提示实现。"}, {"item": "F9 首页（概念介绍、内联 SVG 流程图、入口按钮、随登录态文案、页脚）", "status": "fail", "note": "最终文件中没有 index.html，首页与 4 步流程图、演示账号卡片、当前状态区全部缺失。"}, {"item": "F10 响应式与可访问性（360–1440px、label 关联、aria-live、focus-visible）", "status": "warn", "note": "style.css 存在断点与 focus-visible 样式，但文件在提交中被截断（.checkbox 规则处断掉），CSS 不完整；且为英文界面项目，与文档中文文案要求不符。"}, {"item": "3.5 受保护资源页 app.html（会话面板、2 张应用卡、1.2s 加载、即将过期徽章）", "status": "fail", "note": "最终项目无 app.html；Northwind 版本被替换为记录表格/仪表盘。"}, {"item": "3.6 denied.html 未授权提示页", "status": "fail", "note": "最终文件中无 denied.html。"}, {"item": "4.2 登出二次确认（内联确认条，非系统 confirm）", "status": "fail", "note": "无内联确认条实现，点击立即登出。"}, {"item": "4.4 登录中 loading 态（禁用 + 「登录中…」+ 600ms 模拟延迟）", "status": "fail", "note": "无相关实现。"}, {"item": "5.1 file:// 直接打开可用、无控制台报错", "status": "fail", "note": "assets/app.js 与 assets/style.css 内容被截断（app.js 停在 rows.sort 的 switch 内，style.css 停在 .checkbox 规则内），文件语法不完整，必然产生控制台报错且页面不可用。"}, {"item": "5.2 admin@demo.com/demo123 登录成功，wrong 显示错误提示条", "status": "fail", "note": "账号表无 demo 账号、无密码校验。"}, {"item": "5.3 未登录访问 app.html 跳 login.html?red
```

## 文件

- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/accounts.html`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/app.html`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/artifact-10.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/artifact-11.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/artifact-12.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/artifact-13.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/artifact-8.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/artifact-9.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/assets/auth.js`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/assets/css/style.css`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/assets/js/app.js`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/assets/style.css`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/denied.html`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/index.html`
- `tasks/0252b56c817e47d295b57962a604a7b9/frontend/login.html`
- `tasks/0252b56c817e47d295b57962a604a7b9/ui1/app-2.js`
- `tasks/0252b56c817e47d295b57962a604a7b9/ui1/app.js`
- `tasks/0252b56c817e47d295b57962a604a7b9/ui1/artifact-1.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/ui1/artifact-7.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/ui1/artifact-8.txt`
- `tasks/0252b56c817e47d295b57962a604a7b9/ui1/index-2.html`
- `tasks/0252b56c817e47d295b57962a604a7b9/ui1/index.html`
- `tasks/0252b56c817e47d295b57962a604a7b9/ui1/style.css`

> 代码由 NewEra Copilot 多智能体工作模式生成。
