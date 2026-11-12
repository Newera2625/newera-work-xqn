# 制作一个s so登录，并且把这些测试截图给我

- 对话 ID：`ea8fb3cb07ef4ef7a7c66445e71b1768`
- 生成时间：2026-11-12 14:54

## 需求文档

# SSO 统一身份认证登录模块 —— 需求文档

## 一、目标
构建一套可直接运行、体验完整的 **SSO（单点登录）统一身份认证模块**，并提供**带说明的测试截图**作为验收依据。

核心目标：
1. 提供企业统一身份认证入口，支持 **账号密码登录、短信验证码登录、扫码登录** 三种方式。
2. 登录成功后签发会话（Token），受保护页面据此访问，**刷新页面会话不丢失**，**登出即失效**。
3. 具备完整的异常分支：错误提示、失败锁定、验证码倒计时、会话过期、权限不足页面。
4. 视觉上达到商业级 SaaS 登录页水准（非模板拼凑感）。
5. 交付 12 张以上测试截图 + 测试报告 + 截图索引。

## 二、功能清单

### 2.1 认证方式（登录页 Tab 三态）
| 编号 | 功能 | 说明 |
|---|---|---|
| F1 | 账号密码登录 | 账号（邮箱/用户名）格式校验；密码至少 6 位；密码可见性切换；"记住账号"本地存储 |
| F2 | 短信验证码登录 | 11 位手机号校验；获取验证码按钮 60s 倒计时禁用；验证码 6 位校验；倒计时期间不可重复发送 |
| F3 | 扫码登录 | 模拟二维码状态机：`待扫描` → `已扫描待确认` → `确认成功`；支持刷新二维码、"切换账号"返回 |
| F4 | Tab 切换 | 切换时保留已输入内容、清空错误提示、按钮文案与图标联动 |

### 2.2 错误与安全
| 编号 | 功能 | 说明 |
|---|---|---|
| F5 | 错误提示条 | 输入框下方红色细提示 + 顶部浅色提示条，均带 aria-live |
| F6 | 失败锁定 | 同一账号连续 5 次密码错误 → 锁定 5 分钟，按钮进入倒计时禁用态 |
| F7 | 按钮加载态 | 提交中显示 CSS 旋转指示 + 文案变化，禁用重复点击 |
| F8 | 会话过期 | Token 到期（默认 2 小时，可缩短便于演示）自动弹模态框，确认后登出回登录页 |
| F9 | 登出 | 顶部用户菜单 → 退出登录，清理存储并回到登录页 |

### 2.3 会话与路由
| 编号 | 功能 | 说明 |
|---|---|---|
| F10 | 会话持久化 | Token + 用户信息 + 签发/过期时间写入 localStorage，刷新自动恢复登录态 |
| F11 | 路由守卫 | 访问受保护页未登录 → 重定向 `/index.html?redirect=目标` |
| F12 | 登录回跳 | 登录成功后按 redirect 参数回到原目标页；无 redirect 则进入工作台 `app.html` |
| F13 | 权限页 | `401.html`（未认证）、`403.html`（无权限）、`404.html`（页面不存在），风格统一 |

### 2.4 交付物
| 编号 | 交付物 |
|---|---|
| F14 | `index.html` / `styles.css` / `app.js` / `app.html` / `401.html` / `403.html` / `404.html` / `README.md` |
| F15 | `screenshots/` 目录：12+ 张截图 + `README.md` 索引表 |
| F16 | `TEST_REPORT.md`：用例表、缺陷清单、复测结论 |

## 三、页面与模块

### 3.1 登录页 `index.html`
- **左侧品牌区（≥1024px）**：内联 SVG 品牌图形 + 产品名 + 一句话定位 + 三条特性（图形 + 文字），背景为主色深浅渐层（单主色系）。
- **右侧登录卡片（≤420px 宽）**：
  - 标题"登录"、副标题"使用企业统一身份继续"
  - Tab 组：账号密码 / 短信验证码 / 扫码登录（滑块指示条用主色）
  - 表单区：输入框（图标内联 SVG + 标签 + 下划线/描边两种风格二选一，保持统一）、密码可见切换、记住账号复选框、错误提示位（预留高度不跳动）
  - 主按钮（主色实心，通栏，高度 44px，圆角统一）
  - "其他登录方式"分隔线 + 3 个第三方图标按钮（内联 SVG，圆形浅灰底）
  - 底部协议勾选："我已阅读并同意《服务条款》《隐私政策》"，未勾选时提交提示
- **移动端（<375px）**：隐藏品牌区或压缩为顶部条；卡片满宽；Tab 贴顶；输入框高度 ≥44px；键盘弹出不遮挡按钮。

### 3.2 扫码登录态
二维码占位为 CSS 绘制的方格图形（非真实二维码），中心内联 SVG 图标；状态文案、倒计时、"刷新二维码"、"切换账号"链接。

### 3.3 工作台 `app.html`（受保护）
顶部导航 + 用户菜单（头像内联 SVG、用户名、退出登录）+ 欢迎卡片 + 3 个功能占位卡片。用于验证守卫与回跳。

### 3.4 异常页 401 / 403 / 404
统一版式：居中图形（内联 SVG）+ 标题 + 说明 + 返回按钮。

### 3.5 会话过期模态框
遮罩 + 居中卡片，标题"会话已过期"、说明、"重新登录"按钮；打开时锁定背景滚动。

## 四、交互流程

### 4.1 密码登录
1. 用户输入账号密码 → 失焦即做格式校验（错误文案实时更新）。
2. 点击"登录" → 校验非空 → 校验协议勾选 → 未勾选则在协议行下方提示。
3. 按钮进入 loading 态 → 调用 `authService.loginWithPassword`（模拟延迟 300–800ms）。
4. 成功：写入会话 → 提示条"登录成功"（浅绿辅助色）→ 按 redirect 跳转或进工作台。
5. 失败：接口错误码映射为文案（账号不存在 / 密码错误 / 账号已锁定），输入框标红、顶部提示条展示，密码框清空并聚焦。

### 4.2 短信登录
输入手机号 → 点"获取验证码" → 倒计时 60s（按钮禁用，文案"60s 后重试"）→ 输入 6 位验证码 → 提交 → 校验 → 成功流程同 4.1；验证码错误提示"验证码错误或已过期"。

### 4.3 扫码登录
进入即进入"待扫描"→ 3s 后模拟"已扫描待确认"（文案变化 + 按钮变为主色）→ 用户点"确认登录" → 成功流程同 4.1；全程提供"刷新二维码"（重置倒计时）与"切换账号"（回到密码 Tab）。

### 4.4 守卫与过期
- 打开 `app.html`：读取会话 → 无效 → `location.replace('index.html?redirect=app.html')`，登录页顶部提示"登录后将继续访问…"。
- 已登录 → 渲染用户信息。
- 运行中会话到期：定时器（每 30s）+ `window.focus` 时各校验一次 → 弹模态 → 确认 → 清理 → 回登录页。

## 五、验收标准
1. `index.html` 双击即可运行，全部资源本地化，**无任何外链 CDN / 图片 / 字体**。
2. 三种登录方式均可完整走通，Tab 切换保留输入、清空错误态。
3. 错误分支文案明确、位置固定、不引起布局跳动；连续 5 次失败出现 5 分钟锁定倒计时。
4. 短信验证码按钮在倒计时期间禁用且文案实时递减。
5. 登录后刷新页面仍处于登录态；退出后刷新回登录页；未登录访问 `app.html` 被重定向且登录后回跳。
6. 会话过期弹出模态框，确认后回到登录页。
7. 全部页面**不出现任何 emoji/表情符号**；图标均为内联 SVG 或纯 CSS。
8. 配色克制：1 个主色（含深浅变体）+ 中性黑白灰 + 1 个辅助色（仅用于成功/错误状态）；无彩虹渐变。
9. 全局 CSS 变量统一管理颜色/间距/圆角/阴影/字体，不同组件不写独立色值。
10. 所有交互元素具备 hover / focus / active / disabled 状态；焦点可见。
11. 桌面 1440x900 与移动 375x667 均无横向滚动、无文字截断、按钮不被遮挡。
12. 键盘可达：Tab 顺序合理，输入框有关联 label，错误提示 aria-live。
13. 浏览器控制台无报错。
14. `screenshots/` 内 ≥12 张截图，覆盖上表所有分支；`TEST_REPORT.md` 用例结论齐全、缺陷有复现步骤。

## 六、约束

### 6.1 技术栈
- 纯原生 HTML + CSS + JS（ES6+），无构建工具、无框架、无 npm 依赖。
- 模拟后端：`authService` 模块封装 Promise + setTimeout 模拟延迟与错误码，便于后续替换为真实接口。
- 存储：localStorage（记住账号、Token、用户信息、过期时间），可用 sessionStorage 切换。

### 6.2 UI 规范
- 字体：`system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`（系统字体栈，不外链）。
- 圆角：输入框 8px，按钮 8px，卡片 12px，徽标 999px。
- 阴影：仅 2 级 —— 卡片 `0 8px 24px rgba(15,23,42,.08)`，浮层 `0 

## 验收结果

```json
{"passed": false, "summary": "本轮验收不通过。主要原因：(1) F15/F16 完全未达成——screenshots/ 目录 0 张 PNG 实体截图，TEST_REPORT.md 中 27 条用例与 14 项验收标准全部标记为“阻塞/待回填”，无任何实测证据；(2) 前端工程师成果中 app.js 全文未提供，导致 F2/F5/F6/F7/F8/F9/F10/F11/F12 等核心逻辑（模拟后端 authService、失败锁定 5 分钟倒计时、会话过期模态框与 30s 定时校验、登出清理、路由守卫与 redirect 回跳、Tab 状态机、测试钩子参数）全部无法核验；(3) UI 设计师交付缺少 F14 要求的 app.js，且其 index.html 内联脚本使用 `sso-remembered-account` 等自有存储键，与测试工程师约定的 `newera.sso.*` 契约存在冲突风险；双方存储键未统一前，F15 截图注入会话必然失败。好的一面：UI 视觉层面表现优秀——已交付代码中未发现任何 emoji/表情符号，图标全部为内联 SVG；配色为单一主色 #1f5eff 深浅变体 + 中性黑白灰 + 绿/红辅助状态色，无彩虹渐变；间距/圆角/阴影/字体全部走 CSS 变量，卡片 12px、输入框 8px、按钮 8px、阴影仅 2 级，符合 6.2 规范；布局层级清晰、栅格与留白一致，无明显模板拼凑感。综合判定：不通过，需补齐 app.js、统一存储键契约并实际执行截图与测试回归。", "checklist": [{"item": "F1 账号密码登录：账号/密码格式校验、密码可见性切换、记住账号", "status": "warn", "note": "前端 index.html 有账号+密码输入框、内联 SVG 图标、aria-describedby 错误位、眼睛切换按钮与记住账号复选框；ui-designer 版另有 6 位长度校验与 localStorage 记忆。但最终 app.js 未提供，无法确认前端是否做邮箱/用户名格式校验、密码 6 位校验与记住账号是否真正写入存储并回填。"}, {"item": "F2 短信验证码登录：11 位校验、60s 倒计时禁用、6 位校验", "status": "warn", "note": "前端 index.html 有手机号(maxlength=11)、获取验证码按钮、6 位验证码输入与演示码提示；ui-designer 内联脚本实现了正则 /^1\\d{10}$/ 与 60s 倒计时禁用递减（文案“60s 后重试”）。前端侧逻辑位于未提供的 app.js，无法验证。"}, {"item": "F3 扫码登录状态机：待扫描→已扫描待确认→确认成功 + 刷新/切换账号", "status": "warn", "note": "前端 index.html 提供 CSS 绘制 qr-pattern 二维码占位、中心内联 SVG 徽标、qrStatus 状态区、disabled 的 qrSubmit（“等待扫码”）、刷新二维码/切换账号链接，并有 qrState=scanned 测试参数约定；实际状态机在 app.js，未提供。ui-designer 实现了三态 DOM（waiting/scanned/success）与 3s 自动切换。"}, {"item": "F4 Tab 切换：保留输入、清空错误、按钮文案联动", "status": "warn", "note": "前端 index.html 有 role=tablist/tab/tabpanel 与 tabIndicator，CSS 为 .tab-indicator 33.333% 宽 + transform 过渡，但 index.html 内联脚本缺失、app.js 未提供，指示条位置与“保留输入/清错”逻辑无法核验。ui-designer 的 selectTab() 有 clearMessages()，但该实现随内联脚本存在被覆盖风险。"}, {"item": "F5 错误提示条：输入框下方红色细提示 + 顶部浅色提示条，均带 aria-live", "status": "pass", "note": "前端 index.html：顶部 page-notice（role=status aria-live=polite，含 is-success/is-error 变体）+ 每个 .field-error（aria-live=polite，min-height 18px 预留高度不跳动）；ui-designer 同构实现（#page-alert + .field-message）。"}, {"item": "F6 失败锁定：连续 5 次密码错误锁定 5 分钟，按钮倒计时禁用态", "status": "fail", "note": "两份成果中均无锁定逻辑。前端 index.html 无锁定文案元素，锁定应实现在未提供的 app.js；ui-designer 内联脚本仅用 secret==='wrong' 判错，无失败计数与锁定。若 app.js 未实现则 F6 直接不达标。"}, {"item": "F7 按钮加载态：CSS 旋转指示 + 文案变化 + 防重复点击", "status": "pass", "note": "前端 .primary-button 含 .spinner（@keyframes spin，is-loading 时显示）+ .button-label 文案位，HTML 中 spinner 与 label 分离，可被 app.js 切换文案；ui-designer 同构。"}, {"item": "F8 会话过期模态框：标题“会话已过期”+ 重新登录 + 锁定背景滚动", "status": "warn", "note": "styles.css 定义了 .modal-backdrop/.modal/.modal-icon 与 body.modal-open{overflow:hidden}，说明前端已规划该模态框，但 index.html 无模态结构、无“会话已过期”文案、无过期定时器与 window.focus 校验逻辑——依赖未提供的 app.js。"}, {"item": "F9 登出：用户菜单退出登录并清理存储回登录页", "status": "warn", "note": "styles.css 有 .user-dropdown/.logout-button（危险色），app.html 内容未提供、app.js 未提供，无法确认登出是否清理 token/用户信息/过期时间并跳转登录页。"}, {"item": "F10 会话持久化：Token+用户信息+签发/过期时间写入 localStorage", "status": "warn", "note": "测试工程师已确认前端约定键为 newera.sso.session 并定义结构 {token,user,issuedAt,expiresAt}；但前端 a
```

## 文件

- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/delivery.md`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/README.md`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/app.js`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/artifact-10.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/artifact-11.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/artifact-12.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/artifact-13.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/artifact-6.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/artifact-7.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/artifact-8.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/artifact-9.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/index-2.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/index.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/styles.css`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/README-2.md`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/README.md`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/app.js`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-1.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-10.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-11.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-12.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-13.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-14.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-15.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-16.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-18.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-19.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-20.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-21.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-22.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-23.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-24.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-25.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-26.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-27.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-3.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-4.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-5.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-6.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-8.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-9.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/app.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/artifact-1.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/artifact-8.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/artifact-9.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/index.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/login.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/register.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/styles.css`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/users.html`

> 代码由 NewEra Copilot 多智能体工作模式生成。
