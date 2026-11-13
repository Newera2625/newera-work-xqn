/* =============================================================
   avatar.js — QQ 头像获取与回退
   通过 QQ 官方头像接口动态获取头像，失败/超时自动回退为内联 SVG 字母头像。
   ============================================================= */
(function (global) {
  "use strict";

  var QQ_NUMBER = "3627236036";
  var AVATAR_API = "https://q1.qlogo.cn/g?b=qq&nk=" + QQ_NUMBER + "&s=640";
  var TIMEOUT_MS = 1000;

  /* 生成内联 SVG 字母头像（主色背景 + 白色首字母），转成 data URI */
  function buildFallbackAvatar(initial) {
    var letter = (initial || "Y").trim().charAt(0) || "Y";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#2f8f77"/><stop offset="100%" stop-color="#17564a"/>' +
      "</linearGradient></defs>" +
      '<rect width="160" height="160" fill="url(#g)"/>' +
      '<text x="80" y="80" text-anchor="middle" dominant-baseline="central" ' +
      'dy="0.35em" ' +
      'font-family="Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial, sans-serif" ' +
      'font-size="70" font-weight="600" fill="#ffffff">' +
      letter +
      "</text></svg>";

    return (
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg)
    );
  }

  /* 用回退头像替换某个 img 元素。
     若图片其实已经成功加载（naturalWidth > 0），则保留真实头像。 */
  function applyFallback(img, initial) {
    if (!img || img.dataset.fallbackApplied === "1") {
      return;
    }
    if (img.complete && img.naturalWidth > 0) {
      return;
    }
    img.dataset.fallbackApplied = "1";
    img.src = buildFallbackAvatar(initial);
    img.setAttribute("data-fallback", "1");
  }

  /* 预加载一张图片，1 秒 / 3 秒超时则走回退 */
  function preload(src) {
    return new Promise(function (resolve, reject) {
      var probe = new Image();
      var settled = false;

      var timer = setTimeout(function () {
        if (!settled) {
          settled = true;
          probe.src = "";
          reject(new Error("avatar timeout"));
        }
      }, TIMEOUT_MS);

      probe.onload = function () {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(src);
      };

      probe.onerror = function () {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(new Error("avatar load error"));
      };

      probe.src = src;
    });
  }

  /**
   * 初始化头像：给所有带 data-avatar-qq 的 img 注入 QQ 头像地址，
   * 加载失败或超时后回退为内联 SVG 字母头像。
   */
  function initAvatars(options) {
    var opts = options || {};
    var qq = opts.qq || QQ_NUMBER;
    var initial = opts.initial || "云";
    var selector = opts.selector || "[data-avatar-qq]";
    var images = Array.prototype.slice.call(document.querySelectorAll(selector));

    if (!images.length) {
      return Promise.resolve(false);
    }

    var apiUrl =
      "https://q1.qlogo.cn/g?b=qq&nk=" + encodeURIComponent(qq) + "&s=640";

    images.forEach(function (img) {
      img.dataset.avatarQq = qq;
      /* 先绑定错误处理，避免加载失败时出现破图图标 */
      img.addEventListener("error", function () {
        applyFallback(img, initial);
      });
      /* 同步注入真实头像地址，保证 img 的 src 始终指向 QQ 头像接口 */
      img.setAttribute("src", apiUrl);
      img.setAttribute("data-avatar-source", "q1.qlogo.cn");
    });

    return preload(apiUrl)
      .then(function () {
        return true;
      })
      .catch(function () {
        images.forEach(function (img) {
          applyFallback(img, initial);
        });
        return false;
      });
  }

  global.QQBlog = global.QQBlog || {};
  global.QQBlog.QQ_NUMBER = QQ_NUMBER;
  global.QQBlog.AVATAR_API = AVATAR_API;
  global.QQBlog.initAvatars = initAvatars;
  global.QQBlog.buildFallbackAvatar = buildFallbackAvatar;

  /* 尽早启动头像加载：脚本位于 body 末尾时立即执行，
     否则在 DOMContentLoaded 后执行，保证 1 秒内完成加载或回退。 */
  function autoInit() {
    initAvatars({
      qq: QQ_NUMBER,
      initial: "云",
      selector: "[data-avatar-qq]"
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }
})(window);
