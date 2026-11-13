/* ============================================================
   avatar.js · QQ 头像获取与降级
   降级链：q1.qlogo.cn → q2.qlogo.cn → 本地生成 SVG
   全站所有头像共用同一实例，保证风格统一。
   ============================================================ */
(function (global) {
  'use strict';

  var QQ = '3627236036';

  var REMOTE_SOURCES = [
    'https://q1.qlogo.cn/g?b=qq&nk=' + QQ + '&s=640',
    'https://q2.qlogo.cn/g?b=qq&nk=' + QQ + '&s=640'
  ];

  /**
   * 生成本地兜底头像：灰底 + QQ 号后四位
   * 用 data URI 内联，无需任何外部请求
   */
  function buildFallbackAvatar(qq) {
    var tail = String(qq).slice(-4);
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">' +
      '<defs>' +
      '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#9ca3af"/>' +
      '<stop offset="100%" stop-color="#4b5563"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<rect width="320" height="320" fill="url(#g)"/>' +
      '<text x="160" y="160" text-anchor="middle" dominant-baseline="central" ' +
      'font-family="-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" ' +
      'font-size="104" font-weight="700" fill="#ffffff" letter-spacing="2">' +
      tail +
      '</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  var FALLBACK_SRC = buildFallbackAvatar(QQ);

  /**
   * 把一张 <img> 接入降级链
   * @param {HTMLImageElement} img
   */
  function applyToImage(img) {
    if (!img || img.dataset.avatarBound === '1') return;
    img.dataset.avatarBound = '1';

    var sources = REMOTE_SOURCES.slice();
    var fallbackApplied = false;

    function useFallback() {
      if (fallbackApplied) return;
      fallbackApplied = true;
      img.src = FALLBACK_SRC;
      img.classList.add('avatar--fallback');
    }

    img.addEventListener('error', function handleError() {
      if (sources.length) {
        img.src = sources.shift();
      } else {
        useFallback();
      }
    });

    // 兜底：若 8 秒内既未成功也未失败，直接使用本地头像
    var settled = false;
    var timer = setTimeout(function () {
      if (!settled) useFallback();
    }, 8000);

    img.addEventListener('load', function () {
      settled = true;
      clearTimeout(timer);
      img.classList.remove('avatar--fallback');
    }, { once: true });

    img.src = sources.shift();
  }

  /**
   * 扫描文档内所有 [data-avatar] 元素并绑定
   */
  function mount(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-avatar]');
    for (var i = 0; i < nodes.length; i++) {
      applyToImage(nodes[i]);
    }
    return nodes.length;
  }

  /**
   * 克隆一张已加载好的头像到新节点（用于弹层，避免重复请求）
   */
  function inheritSource(from, to) {
    if (!from || !to) return;
    if (from.dataset.avatarBound === '1' && from.currentSrc && from.currentSrc.indexOf('data:') !== 0) {
      to.src = from.currentSrc;
    } else {
      to.src = FALLBACK_SRC;
    }
  }

  global.Avatar = {
    qq: QQ,
    fallbackSrc: FALLBACK_SRC,
    sources: REMOTE_SOURCES.slice(),
    mount: mount,
    applyToImage: applyToImage,
    inheritSource: inheritSource,
    buildFallbackAvatar: buildFallbackAvatar
  };
})(window);
