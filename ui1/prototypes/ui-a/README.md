# UI-A · 极简文字排版风原型（Typographic Editorial）

- **员工**：UI-A
- **方向**：视觉方向一 —— 极简文字排版风
- **交付物**：`prototypes/ui-a/index.html`（单文件，双击即可打开，内联全部 CSS / JS）
- **唯一外部资源**：QQ 头像图片 `https://q1.qlogo.cn/g?b=qq&nk=3627236036&s=640`（带 `referrerpolicy="no-referrer"`，加载失败自动降级为内联 SVG 默认头像）
- **无任何外部 CSS / JS / 字体 / CDN 请求**；全文无 emoji；所有图标为内联 SVG。

---

## 一、风格原则

1. **纵向单栏居中排布**：正文与列表区最大宽度 `720px`（`--content-max`），导航容器 `1120px`（`--wide-max`）。
2. **细分割线是唯一分组手段**：条目之间 `1px solid var(--c-line)`，替代边框卡片与阴影块；常态元素**无阴影**。
3. **超大标题字重对比**：Hero 昵称 `--fs-display` + 字重 300 + `letter-spacing:-.03em` + `--font-serif`，与正文形成明显层级落差。
4. **克制的强调**：主色只出现在当前导航项、链接 hover、按钮主态、标签激活态、进度条、章节标题竖线。
5. **小圆角体系**：常态圆角 4–6px，胶囊仅用于标签胶囊与按钮。
6. **零 emoji**：图标一律内联 SVG，`stroke` 风格、`stroke-width:1.5`、`currentColor` 继承。

---

## 二、调色板变量表

颜色**只允许**出现在 `:root` 与 `[data-theme="dark"]` 两个定义块内，组件一律通过变量引用。

| 变量 | 浅色 | 深色 | 用途 |
|---|---|---|---|
| `--c-primary` | `#4a5bd6` | `#7b89e8` | 唯一主色 |
| `--c-primary-hover` | `#3f4ec0` | `#8f9bf0` | 主色 hover |
| `--c-primary-active` | `#33409e` | `#a5aff5` | 主色 active / 强调文字 |
| `--c-primary-soft` | `#eef0fd` | `#1d2140` | 标签激活底色 |
| `--c-primary-fade` | `rgba(74,91,214,.12)` | `rgba(123,137,232,.16)` | 进度条底槽 / 焦点光环 / 引用底色 |
| `--c-on-primary` | `#ffffff` | `#0f1115` | 主色上的文字 |
| `--c-bg` | `#ffffff` | `#0f1115` | 页面底色 |
| `--c-bg-sub` | `#fafafa` | `#14161b` | 分区底 / hover 底 / 搜索框底 |
| `--c-text` | `#16181d` | `#e9eaee` | 主文字 |
| `--c-text-2` | `#4b5058` | `#b0b5be` | 次级文字 / 摘要 |
| `--c-text-3` | `#858b94` | `#7d838d` | 元信息 / 日期 / 占位符 |
| `--c-line` | `#e6e8ec` | `#24272e` | 主分割线 / 边框 |
| `--c-line-2` | `#f0f1f4` | `#1c1f25` | 次级分割线 / 行内代码边框 |
| `--c-accent` | `#b5703c` | `#d59a63` | **唯一辅助色**，仅用于「已复制 / 请手动复制」一次性状态提示 |
| `--shadow-xs` | `0 1px 2px rgba(16,18,22,.04)` | `0 1px 2px rgba(0,0,0,.35)` | 头像 / 极轻浮起 |
| `--shadow-pop` | `0 8px 28px rgba(16,18,22,.10)` | `0 8px 28px rgba(0,0,0,.45)` | 浮层（预留） |

> 主题切换通过 `<html data-theme="dark">` 驱动，localStorage key = `newera-theme`；首次访问跟随 `prefers-color-scheme`。

---

## 三、字号 / 间距 / 圆角表

### 字号（`--fs-*`）

| Token | 桌面 | 移动（≤768px） | 字重 | 行高 | 字距 |
|---|---|---|---|---|---|
| `--fs-display` | `clamp(2.75rem,8vw,5.5rem)` | 同左 | 300 | 1.05 | -0.03em |
| `--fs-h1` | `2.25rem` | `1.75rem` | 400 | 1.3 | -0.02em |
| `--fs-h2` | `1.5rem` | `1.25rem` | 400 | 1.35 | -0.01em |
| `--fs-h3` | `1.125rem` | `1.125rem` | 400 / 500 | 1.45 | 0 |
| `--fs-body` | `1rem` | `1rem` | 400 | 1.8 | 0 |
| `--fs-sm` | `.875rem` | `.875rem` | 400 | 1.6 | 0 |
| `--fs-xs` | `.75rem` | `.75rem` | 400 | 1.5 | .04em |

### 间距（`--sp-*`）

`--sp-1:4px` `--sp-2:8px` `--sp-3:12px` `--sp-4:16px` `--sp-5:24px` `--sp-6:32px` `--sp-7:48px` `--sp-8:64px` `--sp-9:96px` `--sp-10:128px`

### 圆角 / 阴影

`--radius-sm:4px` `--radius-md:6px` `--radius-pill:999px`
焦点环统一为 `outline:2px solid var(--c-primary); outline-offset:4px`；搜索框聚焦额外叠加 `0 0 0 3px var(--c-primary-fade)`。

### 字体栈

```
--font-sans : -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Source Han Sans SC", sans-serif;
--font-serif: "Songti SC", "SimSun", Georgia, "Times New Roman", serif;   /* 仅 Hero 昵称 */
--font-mono : ui-monospace, SFMono-Regular, Menlo, Consolas, "Courier New", monospace;
```

---

## 四、模块 class 命名表

| 模块 | 关键 class / id | 说明 |
|---|---|---|
| 顶栏 | `.site-header` `#siteHeader` | sticky 64px；`.is-scrolled` 切换毛玻璃 |
| 顶栏容器 | `.header-inner` | flex，最大宽 1120px |
| 品牌 | `.brand` `.brand-avatar` `.brand-name` | 26px 圆形小头像 |
| 导航 | `.nav` `.nav-link` `.is-active` | 激活项主色 + 2px 短横线 |
| 移动菜单 | `#navToggle` `#mobileMenu` `.mobile-menu` `.is-open` | 下拉面板，汉堡 morph 成叉 |
| 图标按钮 | `.icon-btn` `.theme-toggle` | 36×36 |
| 进度条 | `#scrollProgress` `.scroll-progress` `.is-active` | `--p` 变量驱动 `scaleX` |
| Hero | `#home` `.hero` `.hero-avatar` `.hero-eyebrow` `.hero-name` `.hero-qq` `.hero-signature` `.hero-actions` `.scroll-hint` | 单栏居中 |
| 章节头 | `.section-head` `.section-eyebrow` `.section-title` `.section-sub` `.rule` | 眉标 + 标题 + 细线 |
| 列表区 | `#posts` `.posts` `.post-toolbar` `.tag-filter` `.search` | 工具栏 |
| 标签胶囊 | `.tag` `.is-active` `data-tag="all|前端|随笔|工具|教程"` | 单选切换 |
| 搜索 | `#searchInput` | 输入即过滤 |
| 列表 | `#postList` `.post-list` `.post-item` `.post-item-inner` `.post-body` `.post-meta` `.post-title` `.post-excerpt` `.post-tags` | 条目间用 `border-top` 分隔 |
| 标签小胶囊 | `.tag-xs` | 无边框，浅底 + 主色圆点 |
| 纯 CSS 封面 | `.post-cover` + `.cover-1` … `.cover-6` | 通过 `--cover` / `--cover2` 变量切换 6 种几何变体 |
| 空态 | `#emptyState` `.empty-state` `.empty-illustration` `.empty-title` `#clearFilter` | 内联 SVG 插画 |
| 详情视图 | `#post-detail` `.post-detail` `.detail-inner` `.back-link` `.detail-title` `.detail-meta` `.detail-content` | 默认 `hidden` |
| 上/下一篇 | `.post-nav` `.post-nav-item` `.post-nav-label` `.post-nav-title` `.is-disabled` | 两栏 Grid，中间竖线 |
| 关于区 | `#about` `.about` `.about-grid` `.about-avatar` `.about-text` `.skill-list` | |
| QQ 复制 | `.qq-row` `.copy-btn` `.is-copied` `.is-error` `#copyQQ` `#copyQQText` | 成功变「已复制」 |
| 社交 | `.social-list` `.ext` | 外链带 `target="_blank" rel="noopener noreferrer"` |
| 联系 | `#contact` `.contact` | 锚点区 |
| 页脚 | `.site-footer` `.footer-avatar` `.footer-sig` `.footer-copy` `#year` | 年份 JS 生成 |
| 返回顶部 | `#toTop` `.to-top` `.is-hidden` | 固定右下 36px 圆形 |
| 头像容器 | `[data-avatar]` | 三处复用（Hero / 关于 / 页脚） |
| 降级提示 | `.avatar-fallback-note` `.is-fallback` | 文案：头像加载失败，已使用默认头像 |
| 入场动效 | `.reveal` `.is-visible` | IntersectionObserver |

---

## 五、JS 接入点（写给接手实现的人）

原型内已实现：主题切换 + 持久化、头像注入与降级、年份生成、锚点平滑滚动、IntersectionObserver 淡入、滚动区块高亮、进度条计算、复制反馈、详情视图显隐演示。

**未实现（需由 JS 方向员工补齐）**：

| 功能 | 需要挂载的元素 / 属性 | 说明 |
|---|---|---|
| 标签筛选 | `.tag[data-tag]` + `#postList .post-item[data-post-id]` | 单选，激活项加 `.is-active`，更新 `#postCount` |
| 搜索过滤 | `#searchInput` | 匹配标题 / 摘要 / 标签，大小写不敏感 |
| 空态 | `#emptyState` + `#clearFilter` | 无结果时取消 `hidden`，「清空筛选」复位标签与输入 |
| Hash 路由 | `#post-detail` | hash 形如 `#post/{id}`，需前进后退同步 |
| 详情数据绑定 | `.detail-title` `.detail-meta` `.detail-content` `.post-nav-item` | 用真实文章数据替换占位 |
| 上一篇 / 下一篇 | `.post-nav-item` | 数据驱动，首篇 / 末篇加 `.is-disabled` |
| 详情显隐 | `window.newEraView.showDetail()` / `.showList()` | 原型暴露的演示入口，可直接替换 |

> 隐藏 / 显示统一使用 `hidden` 属性，并已附带 `[hidden]{display:none !important;}` 兜底规则，避免 `display:flex/grid` 覆盖 `hidden`。

---

## 六、可复用片段

### 1. 头像注入 + 降级（已内置）

```js
var AVATAR_URL = 'https://q1.qlogo.cn/g?b=qq&nk=3627236036&s=640';
// 所有 [data-avatar] 容器注入 <img referrerpolicy="no-referrer">
// onerror 时替换为内联 SVG data URI，并插入 .avatar-fallback-note 提示
```

默认头像 SVG：圆形径向渐变底（同色相 `#4a5bd6` / `#6b78e2` 系）+ 弧线几何构成 + 实心圆点 + 字母 N，深色主题自动切换为深色系取值。

### 2. 纯 CSS 几何封面

```html
<div class="post-cover cover-1"></div>
```
`.cover-1` … `.cover-6` 通过 `--cover` / `--cover2` 两个自定义属性注入 `linear-gradient` / `radial-gradient` / `repeating-linear-gradient` / `conic-gradient`，全部基于主色低透明度叠加，不引入任何外部图片，也保持单色系。

### 3. 章节头（眉标 + 标题 + 细线）

```html
<div class="section-head">
  <p class="section-eyebrow">Articles</p>
  <h2 class="section-title">文章</h2>
  <hr class="rule">
</div>
```

---

## 七、与 UI-B 的差异说明

| 维度 | UI-A（极简文字排版风） | UI-B（另一方向） |
|---|---|---|
| 布局 | 单栏居中，最大宽 720px，纵向线性阅读 | 由 UI-B 定义 |
| 分组手段 | 细分割线 + 留白 | 由 UI-B 定义 |
| 常态阴影 | 无 | 由 UI-B 定义 |
| 圆角 | 4–6px 小圆角，胶囊仅用于标签/按钮 | 由 UI-B 定义 |
| 强调色用法 | 主色仅用于当前态与交互反馈 | 由 UI-B 定义 |

**协作边界**：
- 两人**不得共用同一文件**，不得改动对方目录（`prototypes/ui-b/` 不属于 UI-A）。
- 本目录内的 CSS 变量命名、class 语义命名尽量通用，便于集成时挑选。
- 最终 `index.html` 的组装与取舍由集成交接人决定；UI-A 只交付独立原型与本 README。
- `prototypes/ui-a/_part_body.html` 与 `_part_script.js` 是构建过程中的中间分片文件，**不参与交付**，集成时可直接忽略或删除。

---

## 八、已知假设

1. 社交链接真实 URL 未提供，统一使用 `https://example.com/chat` / `.../zone` / `.../github` 占位，替换为真实链接即可。
2. 站点签名统一为「写代码，也写字。记录一些值得回看的想法。」，可按需替换。
3. 技能标签为示例集合（HTML / CSS / JavaScript / 响应式布局 / 无障碍 / 性能优化）。
4. 6 篇文章为**排版占位文本**，真实正文与数据由内容 / JS 方向员工填充。
5. 邮箱 `example@example.com` 为占位地址。

---

## 九、DoD 自检

- [x] `index.html` 单文件，双击可打开，除 `q1.qlogo.cn` 头像图片外无任何外部请求
- [x] 吸顶导航（桌面四项 + 汉堡 + 主题按钮）、滚动毛玻璃、当前项高亮
- [x] Hero：QQ 头像、昵称 `NewEra`、QQ 号 `3627236036`、签名、「查看文章」「联系我」两按钮、向下箭头
- [x] 文章列表：6 条 + 标签胶囊组 + 搜索框 + 计数 + 纯 CSS 封面 + 空态插画
- [x] 文章详情视图：返回按钮、标题、元信息、正文层级 / 列表 / 代码块 / 引用、上一篇 / 下一篇
- [x] 关于区：简介、技能标签、QQ 号 + 复制按钮、3 个社交链接（内联 SVG 图标）
- [x] 页脚：头像 + 签名 + 动态年份 + 返回顶部
- [x] 主题切换写入 localStorage，刷新后保持；首次访问跟随系统
- [x] 头像加载失败自动降级为内联 SVG，无破图图标，并显示失败提示
- [x] 响应式：375 / 768 / 1440 三档无横向滚动；≤768px 汉堡生效，桌面隐藏
- [x] 全文无 emoji，所有图标为内联 SVG
