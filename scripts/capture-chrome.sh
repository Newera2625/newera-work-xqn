#!/usr/bin/env bash
# 使用本机已安装的 Chrome / Chromium 无头模式采集截图，无需 npm 依赖。
# 用法： bash scripts/capture-chrome.sh
# 产出： screenshots/screenshot-desktop.png
#        screenshots/screenshot-mobile.png
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/screenshots"
PAGE="$ROOT/test-screenshot.html"
mkdir -p "$OUT"

CHROME=""
for bin in google-chrome google-chrome-stable chromium chromium-browser "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  if command -v "$bin" >/dev/null 2>&1; then CHROME="$bin"; break; fi
  if [ -x "$bin" ]; then CHROME="$bin"; break; fi
done

if [ -z "$CHROME" ]; then
  echo "未找到 Chrome / Chromium，请改用： npm install && npx playwright install chromium && node scripts/capture.mjs"
  exit 1
fi

echo "使用浏览器: $CHROME"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=1440,900 \
  --screenshot="$OUT/screenshot-desktop.png" \
  --virtual-time-budget=3000 \
  "file://$PAGE"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=390,844 \
  --screenshot="$OUT/screenshot-mobile.png" \
  --virtual-time-budget=3000 \
  "file://$PAGE"

ls -lh "$OUT"
echo "截图已输出到: $OUT"
