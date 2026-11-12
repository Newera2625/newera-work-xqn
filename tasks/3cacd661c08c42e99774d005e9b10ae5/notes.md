# 实现说明 · Notes

## 1. 文件结构

```
index.html              单文件博客首页（HTML + 内联 <style> + 内联 <script>，零依赖）
style-guide.md          配色与 CSS 变量取值说明
notes.md                本文件
QA-REPORT.md            验收结果与修复建议
screenshots/
  desktop-1440x900.svg         桌面 1440×900
  mobile-390x844-hero.svg      移动 390×844 首屏
  mobile-390x844-posts.svg     移动 390×844 文章区
  README.md                    截图说明
```

直接双击 `index.html` 即可运行，无需服务器、无需构建。

## 2. QQ 头像链路（F1）

```
<img src="https://q1.qlogo.cn/g?b=qq&nk=3627236036&s=640">
      │ onerror
      ▼
https://q2.qlogo.cn/g?b=qq&nk=3627236036&s=640
      │ onerror
      ▼
内联 SVG 人形占位头像（主色渐变底 + 主色人形，role="img"，aria-label="默认头像"）
```

- 加载中容器带 `.is-loading`，显示主色浅底的微光扫掠动画；`load` 事件后移除。
- 兜底走的是 `createElementNS` 注入真实 SVG 节点，不是图片占位，因此不会出现浏览器破图图标。
- 头像是页面唯一的外部请求，图片不下载入库。

## 3. QQ 号复制（F2）

页面共 3 个 QQ 复制入口（Hero 胶囊、关于面板、联系区卡片），共用同一套逻辑：

1. `navigator.clipboard.writeText('3627236036')`
2. 失败 → `document.execCommand('copy')`（临时 textarea + `select()`）
3. 再失败 → 提示「复制失败，请手动选择」，2.4 秒后复原

成功态：按钮加 `.is-copied`（主色描边 + 浅主色底），文案变「已复制」，2 秒后复原。

## 4. 导航与滚动高亮（F3）

- 5 个锚点：首页 / 文章 / 项目 / 关于 / 联系我，HTML `scroll-behavior: smooth` + `scroll-padding-top` 处理吸顶遮挡。
- 当前项高亮用 `IntersectionObserver`（阈值 0/0.15/0.35/0.6/0.9，`rootMargin: -72px 0px -45% 0px`），取可见比例最大的区块。
- 移动端（≤834px）导航转为抽屉：汉堡按钮 `aria-expanded` 切换，点击任意链接或按 Esc 自动收起，窗口放大到 834px 以上自动收起。
- 页面内跳转由浏览器原生处理 hash 同步。

## 5. 文章列表与加载更多（F5 / F7）

- 初始渲染 4 条，首条带「置顶」标记。
- 「加载更多」追加 2 条（共 6 条），计数文案同步为「已显示 4 / 6 篇 → 6 / 6 篇」。
- 再点击时按钮进入 `disabled` 态并显示「没有更多了」（`opacity .45` + `cursor:not-allowed`）。
- hover：卡片上移 2px、阴影加深、左侧主色竖线淡入、标题转主色、右侧圆形箭头填充主色。

## 6. 无障碍（F10）

- 全部交互元素使用原生 `button` / `a`，可 Tab 聚焦。
- 全局 `:focus-visible` 焦点环：2px 主色 + 3px 偏移。
- 图标按钮带 `aria-label`；头像 `alt` 文本包含 QQ 号；抽屉按钮 `aria-expanded` / `aria-controls` 联动。
- 装饰性 SVG 一律 `aria-hidden="true"`；跳转链接 `.visually-hidden`。
- `prefers-reduced-motion: reduce` 下关闭所有过渡与动画。

## 7. 约束遵守自查

- 无 emoji（全站文案、注释、按钮文字均为纯文字或内联 SVG）。
- 配色仅一个主色 `#B4531A` + 中性黑白灰，未出现第二强调色与彩色渐变。
- 组件样式未硬编码颜色，色值全部来自 `:root` 变量（唯一例外是兜底 SVG 内的渐变 stop，因为它是运行时注入的字符串，已与主色保持一致）。
- 除 `q1/q2.qlogo.cn` 头像接口外无任何外部请求，无 Web Font、无 CDN、无第三方脚本。
- 字体使用系统栈与系统等宽栈。

## 8. 已知取舍

- 「加载更多」的最后一档通过重复点击进入禁用态，而非首屏即禁用，以保证交互反馈可见。
- 关于面板中的 GitHub / 知乎链接为占位地址（`#contact`），替换为真实链接即可。
- 移动端抽屉未做焦点陷阱，属于常规移动导航实现；若需严格 WCAG 可补充 inert 逻辑。
