# 截图链路测试

一次性能力验证任务：产出「真实由浏览器渲染的截图」，用于确认页面渲染正常 + 截图链路可用。

## 文件清单

| 文件 | 说明 |
| --- | --- |
| `test-screenshot.html` | 自包含测试页面（内联 CSS/JS/SVG，无外链资源），可离线双击打开 |
| `scripts/capture.mjs` | Playwright 采集脚本，输出桌面 1440px 与移动 390px 两张整页 PNG，并自动校验非空白、无横向溢出、无控制台错误 |
| `scripts/capture-chrome.sh` | 免安装依赖方案：调用本机 Chrome/Chromium 无头模式截图 |
| `scripts/make-preview.mjs` | 生成离线预览页（iframe 载入真实源文件），无浏览器环境时快速核对布局 |
| `screenshots/preview-desktop.html` | 1440px 视口预览页 |
| `screenshots/preview-mobile.html` | 390px 视口预览页 |

## 生成真实 PNG 截图

方式一（推荐，跨平台）：

```bash
npm install
npx playwright install chromium
node scripts/capture.mjs
```

方式二（使用本机 Chrome，无需 npm 依赖）：

```bash
bash scripts/capture-chrome.sh
```

## 截图产出路径

- `<项目根目录>/screenshots/screenshot-desktop.png` — 视口 1440 × 900，整页截图
- `<项目根目录>/screenshots/screenshot-mobile.png` — 视口 390 × 844，整页截图

## 截图覆盖区块（两图一致）

1. 顶部导航条：内联 SVG 圆形 Logo、首页/文档/关于导航（首页为选中态）、主按钮「新建项目」、圆形头像占位
2. 横幅区：主标题「截图链路测试页面」、副标题、主次按钮、浅色信息条（实时时间 / 视口宽度 / 渲染状态）
3. 卡片网格区：3 张卡片（折线图 / 盾牌 / 齿轮 内联 SVG 图标），其中一张带「已启用」标签
4. 表单区：文本输入框（placeholder + 聚焦高亮）、下拉选择、复选框组、提交按钮与禁用按钮
5. 数据表格区：4 列表格 5 行数据，状态胶囊、表头浅灰底、斑马纹、操作文字按钮
6. 页脚：说明文字 + 3 个文字链接

移动截图差异：卡片栅格降为单列，导航换行至第二行，表单纵向堆叠，表格容器内部横向滚动，页面本身无横向滚动条。

## 页面自检要点

- 配色：主色 `#2F5D62`（深浅变体）+ 中性黑白灰 + 辅助色 `#8A5A16`（仅用于「已启用」标签），无彩虹渐变
- 令牌：`--c-*`、`--space-*`、`--radius-*`（8/10/14px）、`--shadow-soft`（单档）、`--fs-*` 统一管理
- 按钮四态：hover / active / focus-visible / disabled 均具备可见差异
- 无障碍：所有表单控件均绑定 label，焦点态有可见轮廓，正文对比度满足 WCAG AA
- 全文无 emoji，图标均为内联 SVG
