# 设计规范 · Style Guide

> 对应文件：`index.html`（单文件自包含，样式全部内联于 `<style>` 标签）

---

## 1. 设计方向

采用「暖调杂志排版」与「极简开发者风」的融合版本：

- **底色**：暖纸白（`#FBF8F4`），而非纯白，降低长时间阅读的刺眼感。
- **主色**：单一暖橘 `#B4531A`，全站唯一强调色，只用于「当前项、按钮、链接、图标强调、数据数字」。
- **文字**：墨黑 `#1A1714 / #0E0C0A`，辅助信息统一 13px 灰 `#6E6760`。
- **排版**：杂志式大标题 + 等宽字体标注技术栈与日期，形成「内容优先、技术感点缀」的层次。
- **图片**：不做插画式装饰，仅用头像周围的虚线圆环作为唯一装饰元素。

全站**只使用一个主色 + 中性色**，未出现第二强调色、彩色渐变或彩虹标签。

---

## 2. 颜色令牌（`:root`）

| 变量 | 取值 | 用途 |
|---|---|---|
| `--color-primary` | `#B4531A` | 主色：主按钮、强调文字、图标、数字 |
| `--color-primary-strong` | `#8E3E11` | 主色深变体：hover、置顶标记、强调态文字 |
| `--color-primary-soft` | `#F6E9DF` | 主色浅变体：标签底、图标底、骨架屏 |
| `--color-primary-line` | `#E8CDB8` | 主色描边：分隔线、hover 边框 |
| `--color-bg` | `#FBF8F4` | 页面底色 |
| `--color-surface` | `#FFFFFF` | 卡片、导航抽屉表面 |
| `--color-surface-alt` | `#F4EFE8` | 交替区块底、浅色胶囊 |
| `--color-text` | `#1A1714` | 正文 |
| `--color-text-strong` | `#0E0C0A` | 标题 |
| `--color-muted` | `#6E6760` | 摘要、说明文字 |
| `--color-muted-light` | `#948C83` | 日期、标签等弱信息 |
| `--color-border` | `#E8E1D7` | 常规描边 |
| `--color-border-strong` | `#D9D0C3` | hover 描边、按钮次级边框 |

组件样式中不出现任何硬编码色值，仅允许 `transparent`、`rgba(0,0,0,.x)` 与变量引用。

---

## 3. 间距令牌（8px 基准）

| 变量 | 取值 | 典型用途 |
|---|---|---|
| `--space-1` | 8px | 标签间隙、图标与文字间距 |
| `--space-2` | 16px | 卡片内边距、按钮间隙 |
| `--space-3` | 24px | 容器横向内边距、列表行内边距 |
| `--space-4` | 32px | 区块内元素间距 |
| `--space-5` | 40px | Hero 栅格间隙 |
| `--space-6` | 48px | 区块标题下间距、面板内边距 |
| `--space-7` | 64px | Hero 栅格列间距、页脚上间距 |
| `--space-8` | 96px | 区块上下间距（桌面）；834px→72px；560px→56px |

区块统一节奏：桌面 `96px` / 平板 `72px` / 手机 `56px`。

---

## 4. 圆角与阴影

| 变量 | 取值 | 用途 |
|---|---|---|
| `--radius-sm` | 8px | 图标底、标签、品牌标、小按钮 |
| `--radius-md` | 12px | 社交行、统计块、输入控件 |
| `--radius-lg` | 20px | 文章卡片、项目卡片、关于面板、联系卡片 |
| `--radius-pill` | 999px | 按钮、胶囊标签、头像徽章 |
| `--shadow-1` | `0 1px 2px rgba(26,23,20,.05), 0 2px 8px rgba(26,23,20,.04)` | 静置卡片 |
| `--shadow-2` | `0 2px 6px rgba(26,23,20,.06), 0 14px 30px rgba(26,23,20,.08)` | hover 卡片 |
| `--shadow-3` | `0 6px 14px rgba(26,23,20,.08), 0 22px 48px rgba(26,23,20,.12)` | 头像、主 CTA |

---

## 5. 字号与字体

| 变量 | 取值 | 用途 |
|---|---|---|
| `--font-xs` | 12px | 日期、标签、眉标、页脚 |
| `--font-sm` | 13px | 摘要、按钮、导航、社交链接 |
| `--font-base` | 16px | 正文 |
| `--font-lg` | 18px | 卡片标题、联系值 |
| `--font-xl` | 22px | 统计数字（移动端） |
| `--font-2xl` | 30px | 区块标题、统计数字 |
| `--font-display` | `clamp(30px, 5vw, 46px)` | Hero 主标题 |

字体栈：
- 无衬线：`-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif`
- 等宽：`ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace`（用于日期、技术栈、QQ 号）

不加载任何 Web Font。

---

## 6. 交互状态规范

| 元素 | hover | focus-visible | active | disabled |
|---|---|---|---|---|
| 主按钮 | 底色加深 + 上移 1px + 阴影升级 | 2px 主色外框，偏移 3px | 回落原位、阴影减弱 | `opacity .45`、灰底、`cursor:not-allowed` |
| 次按钮 | 主色描边 + 主色文字 + 浅主色底 | 同上 | 回落 | 同上 |
| 导航链接 | 文字加深 + 浅灰底 | 主色焦点环 | — | — |
| 文章卡片 | 上移 2px + 阴影加深 + 左侧主色竖线 + 标题变主色 + 右侧箭头填主色 | 焦点环 | — | — |
| QQ 复制按钮 | 边框转主色 + 上移 1px | 焦点环 | 回落 | — |
| 社交/页脚图标 | 主色浅底 + 上移 2px | 焦点环 | 回落 | — |

焦点环统一使用 `:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px }`，键盘可达性完整。

---

## 7. 头像实现规范（F1）

1. 主源 `https://q1.qlogo.cn/g?b=qq&nk=3627236036&s=640`
2. 备用源 `https://q2.qlogo.cn/g?b=qq&nk=3627236036&s=640`
3. 均失败 → 注入内联 SVG 人形占位头像（主色渐变底 + 主色人形，`aria-label="默认头像"`）

加载期间头像容器带 `.is-loading`，显示主色浅底的微光扫掠动画；图片 `load` 后移除该类。
任何情况下都不会出现浏览器默认的破图图标。

---

## 8. 响应式断点

| 断点 | 关键变化 |
|---|---|
| `> 1024px` | Hero 两列 `300px + 1fr`，头像 236px，项目三列 |
| `≤ 1024px` | Hero 两列 `240px + 1fr`，头像 200px |
| `≤ 834px` | 导航转抽屉（汉堡），Hero 单列，头像 180px，项目两列，文章卡三列转两列信息区 |
| `≤ 560px` | 区块间距 56px，文章卡转单列堆叠，项目/联系单列，隐藏品牌后缀与箭头图标 |

容器最大宽 `1120px`，水平内边距 24px（移动 18px），三视口均无横向滚动。
