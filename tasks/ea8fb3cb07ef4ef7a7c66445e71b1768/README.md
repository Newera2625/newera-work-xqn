# 制作一个s so登录，并且把这些测试截图给我

- 对话 ID：`ea8fb3cb07ef4ef7a7c66445e71b1768`
- 生成时间：2026-11-12 14:47

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
{"passed": false, "summary": "本次验收未通过。UI-设计师交付了较完整的登录页/扫码/工作台/异常页/模态框设计稿与设计系统 CSS（含变量、状态样板、响应式断点），视觉方向符合商业级 SaaS 观感，未发现 emoji、无彩虹渐变、配色克制，设计层面基本达标（唯一问题是 design/styles.css 文本在提交时被截断）。前端工程师交付了 index.html、styles.css、app.js 三个核心文件，但 app.js 在 `loginWithSms(p` 处被硬截断（语法错误，脚本无法执行，控制台必报错），且完全缺失需求 F14 要求的 app.html、401.html、403.html、404.html、README.md，导致 F11/F12/F13 无法验证。测试工程师仅提交了一段“无法执行”的说明，screenshots/README.md 与 TEST_REPORT.md 均未产出真实内容，15 张截图与测试报告全部缺失（唯一有截图设计的 03/04 扫码两态被合并在一张设计稿中）。综合结论：不具备验收条件，需前端补齐页面与脚本、由测试在真实浏览器环境产出截图与报告后重新验收。", "checklist": [{"item": "无 emoji/表情符号（全部图标为内联 SVG 或 CSS 绘制）", "status": "pass", "note": "设计稿与前端页面逐处检查，未出现任何 emoji；二维码为 CSS 方格绘制，图标均为内联 SVG"}, {"item": "配色克制：单主色系 + 中性灰 + 成功/错误辅助色，无彩虹渐变", "status": "pass", "note": "主色 #1f5eff（含 dark/soft 变体），成功 #237a57、错误 #c43d4b，品牌区/欢迎卡为同色系深浅渐变，符合要求"}, {"item": "UI 布局统一、层级清晰、无模板拼凑感", "status": "pass", "note": "设计稿提供了完整 Design System 样板页（输入框/按钮/复选框/Tab/提示条全状态），前端实现沿用同一套变量与组件类，视觉一致性良好"}, {"item": "F14 交付物齐全（index/styles/app.js/app/401/403/404/README）", "status": "fail", "note": "仅交付 index.html、styles.css、app.js；app.html、401.html、403.html、404.html、README.md 全部缺失"}, {"item": "app.js 完整可运行（无语法错误、控制台无报错）", "status": "fail", "note": "app.js 在 `async loginWithSms(p` 处被截断，文件语法不完整，浏览器将抛 SyntaxError，全部交互失效"}, {"item": "F1 账号密码登录（格式校验/≥6位/可见性切换/记住账号）", "status": "warn", "note": "index.html 具备可见性切换与“记住账号”复选框，但 app.js 被截断，无法确认格式校验、密码长度校验与记住账号读写逻辑"}, {"item": "F2 短信验证码登录（11位校验/60s倒计时禁用/6位校验）", "status": "warn", "note": "UI 已具备 maxlength=11/6、获取验证码按钮与独立错误位，但倒计时与禁用逻辑位于被截断的 app.js 中，未能验证"}, {"item": "F3 扫码登录状态机（待扫描→已扫描待确认→确认成功，刷新/切换账号）", "status": "warn", "note": "index.html 提供二维码占位、状态文案、刷新/切换账号按钮与确认按钮，但状态机逻辑在被截断的 app.js 内；设计稿将两态并排展示，非真实状态机"}, {"item": "F4 Tab 切换保留输入、清空错误、按钮文案联动", "status": "warn", "note": "三个 tabpanel 独立、indicator 已实现（CSS 变量与主色一致）；保留输入/清错逻辑在 app.js 中未验证"}, {"item": "F5 错误提示条（输入框下红字 + 顶部浅色提示条，均带 aria-live）", "status": "pass", "note": ".field-error 预留 min-height 18px 防跳动且带 aria-live；.notice 顶部提示条 role=status aria-live=polite，成功/错误/普通三态齐全"}, {"item": "F6 失败锁定（连续5次→锁定5分钟，按钮倒计时禁用）", "status": "warn", "note": "app.js 定义了 LOCK_DURATION=5min、STORAGE.failures 与 ACCOUNT_LOCKED 错误码，但被截断部分无法证明实现了 5 次计数与倒计时按钮禁用"}, {"item": "F7 按钮加载态（CSS 旋转 + 文案变化 + 防重复提交）", "status": "pass", "note": "spinner 为纯 CSS 旋转，.is-loading 控制显示，主按钮默认 disabled 样式已定义；文案切换在 app.js 中（已见 is-loading 结构）"}, {"item": "F8 会话过期模态框（标题/说明/重新登录/锁定背景滚动）", "status": "fail", "note": "模态框被放在 index.html 而非受保护的 app.html；缺失 app.html 无从触发过期弹窗；modal-backdrop 未设置 body 滚动锁定逻辑"}, {"item": "F9 登出（用户菜单退出登录，清理存储回登录页）", "status": "fail", "note": "styles.css 中仅有 .user-menu/.logout-button 样式，app.html 缺失导致用户菜单与退出登录功能不存在"}, {"item": "F10 会话持久化（localStorage 存 token/用户/签发与过期时间）", "status": "pass", "note": "createSession 写入 token/user/issuedAt/expiresAt 到 localStorage，getSession/isSessionValid 具备刷新恢复能力"}, {"item": "F11 路由守卫（未登录 → index.html?redirect=目标）", "status": "warn", "note": "redirectToLogin 使用 location.replace 并拼接 redirect 参数，逻辑存在，但缺少 app.html 载体无法端到端验证"}, {"item
```

## 文件

- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/app.js`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/index.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/styles-2.css`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/frontend/styles.css`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/README-2.md`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/README.md`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-1.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-10.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-11.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-12.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-13.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-14.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-15.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-2.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-4.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-5.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-6.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-7.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/qa/artifact-9.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/artifact-1.txt`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/design/login-password-2.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/design/login-password.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/design/login-qr.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/design/login-sms-2.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/design/login-sms.html`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/design/styles-2.css`
- `tasks/ea8fb3cb07ef4ef7a7c66445e71b1768/ui1/design/styles.css`

> 代码由 NewEra Copilot 多智能体工作模式生成。
