/**
 * 生成离线预览页（HTML），用于在未安装浏览器自动化环境时核对页面外观。
 * 用法： node scripts/make-preview.mjs
 * 产出： screenshots/preview-desktop.html  (1440px 视口宽度 iframe)
 *        screenshots/preview-mobile.html   (390px 视口宽度 iframe)
 *
 * 说明：预览页以 iframe 载入 test-screenshot.html 真实源文件，渲染结果与实际截图一致；
 * 它不是位图截图，PNG 请运行 node scripts/capture.mjs 获取。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

const views = [
  { name: 'preview-desktop.html', width: 1440, height: 2200, label: '桌面视口 1440px',
    note: '桌面宽度下卡片为三列栅格，表单为两列布局，表格完整铺满内容区。' },
  { name: 'preview-mobile.html', width: 390, height: 2600, label: '移动视口 390px',
    note: '390px 下卡片栅格降为单列，导航换行至第二行，表单纵向堆叠，页面无横向滚动条。' },
];

for (const v of views) {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>预览 · ${v.label}</title>
<style>
  :root{
    --c-primary:#2F5D62;
    --c-bg:#E7EBEB;
    --c-surface:#FFFFFF;
    --c-text:#1B2223;
    --c-muted:#5F6B6D;
    --space-4:16px;
    --space-5:24px;
    --radius-sm:8px;
    --fs-sm:13px;
    --font-sans:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;background:var(--c-bg);color:var(--c-text);font-family:var(--font-sans);}
  .bar{
    position:sticky;top:0;z-index:10;
    background:var(--c-primary);color:#fff;
    padding:12px var(--space-5);
    display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);flex-wrap:wrap;
    font-size:var(--fs-sm);font-weight:600;
  }
  .bar em{font-style:normal;font-weight:400;opacity:.8;}
  .stage{padding:var(--space-5);display:flex;justify-content:center;}
  .frame{
    width:${v.width}px;max-width:100%;
    background:var(--c-surface);
    border:1px solid #D5DCDC;
    border-radius:var(--radius-sm);
    overflow:hidden;
    box-shadow:0 1px 2px rgba(27,34,35,.05),0 12px 32px rgba(27,34,35,.10);
  }
  .frame iframe{display:block;width:${v.width}px;height:${v.height}px;border:0;}
  .note{max-width:760px;margin:0 auto var(--space-5);padding:0 var(--space-5);color:var(--c-muted);font-size:var(--fs-sm);line-height:1.7;}
</style>
</head>
<body>
  <div class="bar">
    <span>${v.label} · 预览渲染</span>
    <em>真实 PNG 截图请执行： node scripts/capture.mjs</em>
  </div>
  <p class="note">${v.note}</p>
  <div class="stage">
    <div class="frame">
      <iframe src="../test-screenshot.html" title="${v.label}预览" scrolling="no"></iframe>
    </div>
  </div>
</body>
</html>`;
  const file = path.join(outDir, v.name);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`已生成: ${file}`);
}
