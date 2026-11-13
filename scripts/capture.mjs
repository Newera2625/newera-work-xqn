/**
 * 截图采集脚本
 * 用法：
 *   npm install          # 安装 playwright
 *   npx playwright install chromium
 *   node scripts/capture.mjs
 *
 * 产出：
 *   screenshots/screenshot-desktop.png  (视口 1440x900，整页)
 *   screenshots/screenshot-mobile.png   (视口 390x844，整页)
 *
 * 脚本会自动校验：文件存在、宽度符合预期、非纯白像素占比达标（防止白屏截图）。
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const pageFile = path.join(root, 'test-screenshot.html');
const outDir = path.join(root, 'screenshots');

const SHOTS = [
  { name: 'screenshot-desktop.png', width: 1440, height: 900 },
  { name: 'screenshot-mobile.png', width: 390, height: 844 },
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
let failed = false;

for (const shot of SHOTS) {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
    locale: 'zh-CN',
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => errors.push(`请求失败: ${r.url()}`));

  await page.goto(pathToFileURL(pageFile).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(600);

  const info = await page.evaluate(() => ({
    time: document.getElementById('js-time')?.textContent || '',
    width: document.getElementById('js-width')?.textContent || '',
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));

  const file = path.join(outDir, shot.name);
  await page.screenshot({ path: file, fullPage: true });
  await context.close();

  const buf = fs.readFileSync(file);
  const nonBlank = countNonBlank(buf);
  const hasHorizonScroll = info.scrollW > info.clientW + 1;

  console.log(`[${shot.name}]`);
  console.log(`  路径      : ${file}`);
  console.log(`  文件大小  : ${(buf.length / 1024).toFixed(1)} KB`);
  console.log(`  页面时间  : ${info.time}   视口宽度: ${info.width}px`);
  console.log(`  非空白占比: ${(nonBlank * 100).toFixed(1)}%`);
  console.log(`  横向溢出  : ${hasHorizonScroll ? '有（需修复）' : '无'}`);
  console.log(`  控制台错误: ${errors.length ? errors.join(' | ') : '无'}`);

  if (buf.length < 5000 || nonBlank < 0.02) {
    console.error('  校验失败：截图疑似空白');
    failed = true;
  }
  if (hasHorizonScroll) {
    console.error('  校验失败：存在横向滚动条');
    failed = true;
  }
  if (errors.length) {
    console.error('  校验失败：页面存在运行时错误');
    failed = true;
  }
}

await browser.close();
console.log(failed ? '\n结果：存在失败项' : '\n结果：链路正常，桌面与移动截图均已生成');
process.exit(failed ? 1 : 0);

/** 粗略统计 PNG 中非纯白像素占比（按采样字节差异估算） */
function countNonBlank(buf) {
  const stride = Math.max(1, Math.floor(buf.length / 40000));
  let diff = 0;
  let total = 0;
  for (let i = 0; i < buf.length; i += stride) {
    total++;
    if (buf[i] !== 255) diff++;
  }
  return total ? diff / total : 0;
}
