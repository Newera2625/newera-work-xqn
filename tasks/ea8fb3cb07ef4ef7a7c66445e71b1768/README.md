# 制作一个s so登录，并且把这些测试截图给我

- 对话 ID：`ea8fb3cb07ef4ef7a7c66445e71b1768`
- 生成时间：2026-11-12 14:53

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
{"passed": false, "summary": "本轮验收不通过。核心问题有三：(1) 交付物中完全没有 screenshots/ 的 PNG 实体截图，F15 与验收标准 14 未达成，TEST_REPORT.md 中 27 条用例与 14 项验收检查全部处于\"待执行/待判定\"，F16 要求的\"用例结论齐全、缺陷有复现步骤\"未满足（缺陷复现步骤有，但结论全缺），属于交付阻塞；(2) 前端 app.js 交付内容在关键处被截断，F3 扫码状态机、F6 失败锁定、F8 会话过期、F10 会话持久化、F11/F12 守卫与回跳、F1 记住账号等核心逻辑无法验证，仅 index.html 静态结构不足以支撑\"三种登录方式可完整走通\"的验收；(3) 前端与设计师各自提供了一套互不相同的 styles.css（变量名、圆角、阴影、品牌区结构均不同），存在明显拼凑/风格不统一的交付风险。此外发现若干具体缺陷：前端焦点轮廓使用极浅蓝 --color-primary-soft 导致 focus 不可见；组件内存在写死的 rgba()/hex 颜色与硬编码圆角，违反 6.4 禁止事项与 AC-09；测试脚本注入的 localStorage key 与前端实际 key 不一致会导致工作台截图失真；测试工程师提出的测试钩子（sessionSeconds/lockSeconds/qrState 等）前端未实现，前后端契约未闭环。全量代码中未发现 emoji，未见彩虹渐变，配色为单主色+中性色+成功/错误辅助色，色彩一项通过。", "checklist": [{"item": "F1 账号密码登录：账号格式校验、密码≥6位、可见性切换、记住账号", "status": "warn", "note": "index.html 中可见 label 关联、密码可见切换按钮（aria-pressed）、记住账号复选框；app.js 交付内容被截断，格式校验、6位校验、localStorage 记住账号的实现无法验证"}, {"item": "F2 短信验证码登录：11位校验、60s倒计时禁用、6位校验", "status": "warn", "note": "结构与 code-button 禁用样式具备，倒计时逻辑在未提供的 app.js 片段中，无法验证"}, {"item": "F3 扫码登录状态机：待扫描→已扫描待确认→确认成功，刷新二维码/切换账号", "status": "warn", "note": "HTML 含 qr-status/刷新/切换账号，状态机 JS 未提供；且二维码占位为 49 个 span 随机 nth-child 置浅色，视觉偏噪点"}, {"item": "F4 Tab 切换：保留输入、清空错误、按钮文案与图标联动", "status": "warn", "note": "三 Tab 结构与主色指示条齐备，切换逻辑在未提供的 app.js 中；按钮文案联动（含图标）无法确认"}, {"item": "F5 错误提示条：输入框下红色提示 + 顶部浅色提示条，均 aria-live", "status": "pass", "note": "index.html 中 field-error 与 page-notice 均为 aria-live=\"polite\"，位置固定（field-error min-height 18px）"}, {"item": "F6 失败锁定：5 次密码错误锁定 5 分钟，按钮倒计时禁用", "status": "warn", "note": "app.js 被截断，STORAGE 中虽有 locks 项但计数与锁定时长逻辑不可见"}, {"item": "F7 按钮加载态：CSS 旋转指示 + 文案变化 + 防重复点击", "status": "pass", "note": "styles.css 定义 .spinner/@keyframes spin，.is-loading 控制显隐，primary-button 有 disabled 样式"}, {"item": "F8 会话过期模态框（遮罩+居中卡片+重新登录+锁滚动）", "status": "warn", "note": "styles.css 有 modal-backdrop/modal 与 body.modal-open{overflow:hidden}，但触发逻辑未提供"}, {"item": "F9 登出：用户菜单退出登录并清理存储回登录页", "status": "warn", "note": "app.html 结构含 user-trigger/user-dropdown/logout-button，清理与跳转逻辑未提供"}, {"item": "F10 会话持久化（token/用户/签发与过期时间写入 localStorage）", "status": "warn", "note": "app.js 截断处可见 STORAGE.session='newera.sso.session'，写入字段不可见"}, {"item": "F11 路由守卫：未登录访问受保护页重定向 index.html?redirect=", "status": "warn", "note": "守卫代码未提供，无法验证"}, {"item": "F12 登录回跳：按 redirect 回原页，否则进 app.html", "status": "warn", "note": "未提供实现"}, {"item": "F13 权限页 401/403/404 风格统一", "status": "pass", "note": "styles.css 提供统一 .error-page/.error-card/.error-illustration 体系；三个页面文件已列入交付清单"}, {"item": "F14 交付文件清单完整（index/styles/app/app/401/403/404/README）", "status": "pass", "note": "前端清单齐备并额外含 terms.html/privacy.html（协议链接落地，是加分项）"}, {"item": "F15 screenshots/ 12+ 张 PNG + 索引表", "status": "fail", "note": "仅有 screenshots/README.md 索引，目录中无任何 PNG 实体文件，验收标准 14 不成立"}, {"item": "F16 TEST_REPORT.md 用例表/缺陷清单/复测结论齐全", "status": "fail", "note": "用例表与缺陷清单（含复现步骤）质量高，但 27 条用例与 14 项 AC 全部为\"待执行/待判定\"，复测结论为\"未执行复测\"，结论不齐"}, {"item": "验收1 双击可运行、全部资源本地化、无外链 CDN/图片/字体", "status": "pass", "note": "index.html/styles.css/app
```

## 文件

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
