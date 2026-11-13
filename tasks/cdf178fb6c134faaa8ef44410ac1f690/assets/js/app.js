/* =============================================================
   app.js — 博客主逻辑
   文章数据渲染 / 标签筛选 / 详情抽屉 / 主题切换 / 导航 / 回到顶部
   ============================================================= */
(function () {
  "use strict";

  var QQ_NUMBER = "3627236036";
  var THEME_KEY = "yunzhou-blog-theme";

  /* ---------------- 文章数据 ---------------- */
  var POSTS = [
    {
      id: "p1",
      title: "从零实现一个响应式栅格布局系统",
      excerpt:
        "用 CSS Grid 加上自定义属性，做一套既能固定分栏又能自适应断点的栅格，并聊聊它在多端项目里的取舍。",
      category: "前端",
      date: "2024-05-12",
      read: 6,
      tags: ["前端", "CSS", "响应式"],
      tone: 1,
      content: [
        "很多项目里的栅格系统最后都长成了同一副样子：一堆 flex 容器，一串 margin-left，一份谁也不敢改的变量表。于是当设计稿从四栏变成三栏，我们开始手写 nth-child 选择器。",
        "这次我想试试更笨但更稳的做法：用 CSS Grid 承担所有分栏逻辑，把列数、间距和断点全部抽成自定义属性。这样做的第一收益是，布局的变化不再需要改动结构，容器只负责声明意图。",
        "断点部分我没有引入任何 JavaScript，而是用媒体查询覆盖同一批变量。这样做的好处是首屏渲染时不会出现布局抖动，缺点是无法读取当前生效的断点值，需要靠 data 属性在 JS 侧同步。",
        "整个方案大概三十行 CSS，我把它整理成了一个可以直接抄走的 mixin。真正难的从来不是栅格本身，而是决定什么时候该放弃它。"
      ]
    },
    {
      id: "p2",
      title: "关于暗色模式的一点实践笔记",
      excerpt:
        "暗色模式不是把颜色反过来那么简单。从对比度、阴影语义到图片处理，聊聊一套可维护的主题变量方案。",
      category: "前端",
      date: "2024-04-28",
      read: 8,
      tags: ["前端", "CSS", "设计"],
      tone: 2,
      content: [
        "第一次做暗色模式时，我的做法是给每个元素加一个 dark 后缀类名。结果一周之后，项目里多出了六种深浅不同的灰，任何一次调整都要改十几个文件。",
        "后来我把思路整个翻过来：先定义语义，而不是定义颜色。--color-text 到底应该是纯白还是接近纯白，取决于背景有多深，一旦用语义变量表达，这些判断就只需要做一次。",
        "阴影在暗色模式下几乎不可见，取而代之的是边框和背景层级。我给每一层背景都指定了微小的明度差，于是页面在任何主题下都能保持清晰的层次关系。",
        "还有一个小细节：图片在暗色背景上会显得过于刺眼，加一点点透明度或轻微的滤镜就能解决。这些经验都不复杂，但只有真的做过一遍才会记住。"
      ]
    },
    {
      id: "p3",
      title: "我的一天，从一杯手冲和一段旧代码开始",
      excerpt:
        "不谈技术的一篇。聊聊规律作息、代码考古，以及那些看起来毫无产出却让我受益很久的日常。",
      category: "生活",
      date: "2024-04-03",
      read: 5,
      tags: ["生活", "随笔"],
      tone: 3,
      content: [
        "早上八点半，我会先烧一壶手冲。不是因为多懂咖啡，而是那六分钟里我不用看任何屏幕，脑子可以慢慢从睡眠里醒过来。",
        "接着我会打开昨天没写完的那段代码。老实说，很多所谓的昨晚写不完，其实只是当时没想清楚，于是第二天用清醒的脑子再读一遍，问题往往就自己浮出来了。",
        "中午会去楼下走一圈。这不是刻意的锻炼，只是发现坐久了之后，下午的效率会明显下降。走十分钟，把下午还给自己。",
        "晚上十点之后基本不再碰工作相关的东西。博客更新大多在早上——人清醒的时候写东西更容易说人话。"
      ]
    },
    {
      id: "p4",
      title: "用原生 JS 写一个图片懒加载",
      excerpt:
        "IntersectionObserver 加上一点点降级处理，让图片懒加载既简单又可靠，顺便聊聊加载占位图的设计。",
      category: "前端",
      date: "2024-03-15",
      read: 7,
      tags: ["前端", "JavaScript", "性能"],
      tone: 4,
      content: [
        "懒加载的原理并不复杂：图片的 src 先留空，等到它即将进入视口时再填上真正的地址。难点在于‘即将’这个判断，以及在老浏览器上怎么优雅地退回去。",
        "IntersectionObserver 让这件事变得相当直接。设置一个 rootMargin，让元素在进入视口之前一点距离就开始加载，用户几乎察觉不到延迟。",
        "至于降级，我选择在不支持时直接加载全部图片。这个场景下性能可能差一些，但至少不会白屏。对于内容为主的博客站点，这个取舍是划算的。",
        "占位图同样值得花点心思。一块纯色的骨架屏加上微妙的渐变动画，能让加载过程显得从容，而不是突然蹦出来。"
      ]
    },
    {
      id: "p5",
      title: "写给自己的写作方法论",
      excerpt:
        "把一件事讲清楚并不需要多高的文采，需要的是结构、取舍和一点点删减的勇气。",
      category: "随笔",
      date: "2023-11-20",
      read: 9,
      tags: ["随笔", "写作", "方法论"],
      tone: 5,
      content: [
        "我曾经以为写作是天赋，后来发现它更接近工程：一套可复用的结构，加上持续的练习。",
        "结构上，我习惯用三段式：先说明问题是什么，再讲我尝试过哪些方案，最后给出我选择的理由和代价。读者最关心的往往不是结论，而是结论背后的取舍。",
        "取舍是最难的部分。一篇文章同时想讲三个主题，等于一个主题都没讲透。我通常会列一个提纲，然后强迫自己只保留最能说明问题的那一条主线，其余的留到以后再写。",
        "删减更考验勇气。写完之后放一天，第二天再读，你会发现有三分之一的话其实可以整段删掉。删掉它们，文章不会变弱，反而会更锋利。"
      ]
    },
    {
      id: "p6",
      title: "一次线上事故的复盘",
      excerpt:
        "一个看似不起眼的配置项，导致整站样式在特定浏览器下错乱。复盘这次事故，也聊聊排查思路。",
      category: "技术",
      date: "2023-08-09",
      read: 10,
      tags: ["前端", "CSS", "复盘"],
      tone: 6,
      content: [
        "事故发生在周五下午五点，现象是部分用户反馈页面排版完全错乱，而开发环境一切正常。这类问题的第一反应往往是缓存，但这次的元凶是一个只有生产环境才会启用的样式压缩配置。",
        "排查从最小复现开始。我把线上构建产物拉到本地，逐层对比样式表，直到发现某条规则被压缩工具错误地合并了顺序，而这条规则恰好依赖层叠顺序。",
        "定位之后，修复本身只花了几分钟，但更重要的是流程上的调整：我们给样式构建加了产物比对，并在上线前用真实的生产配置跑一次视觉回归。",
        "这次事故让我记住一件事：配置也是代码，也值得被测试。很多事故的根因，是某个‘只改了一行’的地方。"
      ]
    }
  ];

  /* ---------------- DOM 引用 ---------------- */
  var $ = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  var els = {};
  var currentTag = "全部";
  var currentPostId = null;
  var lastTrigger = null;

  /* ---------------- 工具 ---------------- */
  function formatCount(n) {
    return n + " 篇";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function tagsToChips(tags) {
    return tags
      .map(function (t, i) {
        var cls = "tag-chip" + (i === 0 ? " accent" : "");
        return '<span class="' + cls + '">#' + escapeHtml(t) + "</span>";
      })
      .join("");
  }

  /* ---------------- 文章卡片渲染 ---------------- */
  function renderPosts() {
    var list = POSTS.filter(function (p) {
      return currentTag === "全部" || p.tags.indexOf(currentTag) !== -1;
    });

    els.grid.innerHTML = list
      .map(function (p) {
        var coverTone = "post-cover tone-" + (p.tone || 1);
        return (
          '<article class="post-card" role="button" tabindex="0" data-post-id="' +
          p.id +
          '" aria-label="阅读文章：' +
          escapeHtml(p.title) +
          '">' +
          '<div class="' + coverTone + '"><span class="post-badge">' +
          escapeHtml(p.category) +
          "</span></div>" +
          '<div class="post-body">' +
          '<h3 class="post-title">' +
          escapeHtml(p.title) +
          "</h3>" +
          '<p class="post-excerpt">' +
          escapeHtml(p.excerpt) +
          "</p>" +
          '<div class="post-tags">' +
          tagsToChips(p.tags) +
          "</div>" +
          '<div class="post-meta"><time datetime="' +
          p.date +
          '">' +
          p.date +
          '</time><span class="meta-sep" aria-hidden="true">·</span><span>' +
          p.read +
          " 分钟阅读</span></div>" +
          "</div></article>"
        );
      })
      .join("");

    els.empty.hidden = list.length !== 0;
    els.filterCount.textContent =
      list.length === POSTS.length
        ? "共 " + POSTS.length + " 篇文章"
        : "筛选出 " + formatCount(list.length);

    $$(".post-card", els.grid).forEach(function (card) {
      card.addEventListener("click", function () {
        openDrawer(card.dataset.postId);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          openDrawer(card.dataset.postId);
        }
      });
    });
  }

  /* ---------------- 标签筛选 ---------------- */
  function collectTags() {
    var map = {};
    POSTS.forEach(function (p) {
      p.tags.forEach(function (t) {
        map[t] = (map[t] || 0) + 1;
      });
    });
    return map;
  }

  function renderFilterPills() {
    var counts = collectTags();
    var names = Object.keys(counts);
    var html =
      '<button class="pill is-active" type="button" data-tag="全部" aria-pressed="true">全部<span class="pill-num">' +
      POSTS.length +
      "</span></button>";

    names.forEach(function (name) {
      html +=
        '<button class="pill" type="button" data-tag="' +
        escapeHtml(name) +
        '" aria-pressed="false">' +
        escapeHtml(name) +
        '<span class="pill-num">' +
        counts[name] +
        "</span></button>";
    });

    els.pills.innerHTML = html;

    $$(".pill", els.pills).forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTag = btn.dataset.tag;
        $$(".pill", els.pills).forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });
        renderPosts();
      });
    });
  }

  function renderTagCloud() {
    var counts = collectTags();
    els.tagCloud.innerHTML = Object.keys(counts)
      .map(function (name) {
        return (
          '<button class="cloud-tag" type="button" data-cloud-tag="' +
          escapeHtml(name) +
          '">#' +
          escapeHtml(name) +
          '<span class="cloud-num">' +
          counts[name] +
          "</span></button>"
        );
      })
      .join("");

    $$(".cloud-tag", els.tagCloud).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.dataset.cloudTag;
        currentTag = name;
        $$(".pill", els.pills).forEach(function (b) {
          var active = b.dataset.tag === name;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });
        renderPosts();
        scrollToEl(els.postsSection);
      });
    });
  }

  function renderArchives() {
    var years = {};
    POSTS.forEach(function (p) {
      var y = p.date.slice(0, 4);
      years[y] = (years[y] || 0) + 1;
    });
    var names = Object.keys(years).sort(function (a, b) {
      return b - a;
    });

    els.archiveList.innerHTML = names
      .map(function (y) {
        return (
          '<li><a class="archive-item" href="#posts"><span class="archive-year">' +
          y +
          '年</span><span class="archive-num">' +
          years[y] +
          " 篇</span></a></li>"
        );
      })
      .join("");

    els.statArchives.textContent = names.length;
  }

  /* ---------------- 详情抽屉 ---------------- */
  function findPost(id) {
    for (var i = 0; i < POSTS.length; i++) {
      if (POSTS[i].id === id) return POSTS[i];
    }
    return null;
  }

  function openDrawer(id) {
    var post = findPost(id);
    if (!post) return;
    currentPostId = id;

    els.drawerBadge.textContent = post.category;
    els.drawerTitle.textContent = post.title;
    els.drawerDate.textContent = post.date;
    els.drawerRead.textContent = post.read + " 分钟阅读";
    els.drawerContent.innerHTML = post.content
      .map(function (para) {
        return "<p>" + escapeHtml(para) + "</p>";
      })
      .join("");
    els.drawerTags.innerHTML = tagsToChips(post.tags);

    var idx = POSTS.indexOf(post);
    var prev = POSTS[(idx - 1 + POSTS.length) % POSTS.length];
    var next = POSTS[(idx + 1) % POSTS.length];
    els.prevPost.dataset.target = prev.id;
    els.nextPost.dataset.target = next.id;

    els.overlay.hidden = false;
    els.drawer.hidden = false;
    els.drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");

    requestAnimationFrame(function () {
      els.overlay.classList.add("is-open");
      els.drawer.classList.add("is-open");
    });

    els.drawerClose.focus();
  }

  function closeDrawer() {
    if (els.drawer.hidden) return;
    els.overlay.classList.remove("is-open");
    els.drawer.classList.remove("is-open");
    els.drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");

    var finish = function () {
      els.overlay.hidden = true;
      els.drawer.hidden = true;
      currentPostId = null;
    };
    window.setTimeout(finish, 300);

    var active = $(".post-card.is-focused");
    if (active) active.focus();
  }

  /* ---------------- 主题切换 ---------------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var isDark = theme === "dark";
    els.themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    els.themeToggle.setAttribute(
      "aria-label",
      isDark ? "切换到浅色主题" : "切换到深色主题"
    );
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* 忽略隐私模式下的存储异常 */
    }
  }

  function initTheme() {
    var saved = null;
    try {
      saved = window.localStorage.getItem(THEME_KEY);
    } catch (e) {
      saved = null;
    }
    if (saved !== "dark" && saved !== "light") {
      var prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      saved = prefersDark ? "dark" : "light";
    }
    applyTheme(saved);
  }

  /* ---------------- 复制 QQ 号 ---------------- */
  function copyQQ(text, button) {
    var done = function () {
      var label = button.querySelector(".btn-label") || button;
      var original = label.textContent;
      label.textContent = "已复制";
      button.classList.add("is-copied");
      window.setTimeout(function () {
        label.textContent = original;
        button.classList.remove("is-copied");
      }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text, done);
      });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "readonly");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      done();
    } catch (e) {
      /* 复制失败时保持静默 */
    }
    document.body.removeChild(ta);
  }

  /* ---------------- 滚动与导航高亮 ---------------- */
  function scrollToEl(target) {
    if (!target) return;
    var top =
      target.getBoundingClientRect().top + window.pageYOffset - (headerHeight() + 16);
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  function headerHeight() {
    var header = $("#site-header");
    return header ? header.offsetHeight : 68;
  }

  var navSections = [];

  function initNavHighlight() {
    navSections = ["home", "posts", "tags", "about"]
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    var onScroll = function () {
      var y = window.pageYOffset;
      var header = $("#site-header");
      if (header) header.classList.toggle("is-scrolled", y > 8);

      var toTop = els.toTop;
      if (y > 400) {
        toTop.hidden = false;
        requestAnimationFrame(function () {
          toTop.classList.add("is-visible");
        });
      } else {
        toTop.classList.remove("is-visible");
        window.setTimeout(function () {
          if (window.pageYOffset <= 400) toTop.hidden = true;
        }, 200);
      }

      var currentId = "home";
      var probe = y + headerHeight() + 100;
      navSections.forEach(function (sec) {
        if (sec.offsetTop <= probe) currentId = sec.id;
      });
      // 页面底部时强制高亮最后一个区块
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 4
      ) {
        currentId = navSections.length
          ? navSections[navSections.length - 1].id
          : currentId;
      }

      $$(".nav-link").forEach(function (link) {
        link.classList.toggle("is-active", link.dataset.nav === currentId);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---------------- 移动端菜单 ---------------- */
  function initMobileNav() {
    var toggle = els.navToggle;
    var nav = els.nav;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "收起导航菜单" : "展开导航菜单");
    });

    $$(".nav-link", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "展开导航菜单");
      });
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "展开导航菜单");
    });
  }

  /* ---------------- 锚点平滑滚动 ---------------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.getElementById(id.slice(1));
        if (!target) return;
        e.preventDefault();
        scrollToEl(target);
        if (history.replaceState) {
          history.replaceState(null, "", id);
        }
      });
    });
  }

  /* ---------------- 初始化 ---------------- */
  function init() {
    els.grid = $("#posts-grid");
    els.empty = $("#empty-state");
    els.pills = $("#filter-pills");
    els.tagCloud = $("#tag-cloud");
    els.archiveList = $("#archive-list");
    els.filterCount = $("#filter-count");
    els.statPosts = $("#stat-posts");
    els.statTags = $("#stat-tags");
    els.statArchives = $("#stat-archives");
    els.postsSection = $("#posts");

    els.overlay = $("#drawer-overlay");
    els.drawer = $("#drawer");
    els.drawerClose = $("#drawer-close");
    els.drawerTitle = $("#drawer-title");
    els.drawerDate = $("#drawer-date");
    els.drawerRead = $("#drawer-read");
    els.drawerContent = $("#drawer-content");
    els.drawerTags = $("#drawer-tags");
    els.drawerBadge = $("#drawer-badge");
    els.prevPost = $("#prev-post");
    els.nextPost = $("#next-post");

    els.themeToggle = $("#theme-toggle");
    els.navToggle = $("#nav-toggle");
    els.toTop = $("#to-top");

    if (!els.grid) return;

    /* 主题 */
    initTheme();
    els.themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });

    /* 头像（QQ 官方接口，失败自动回退 SVG）由 avatar.js 自动初始化 */

    /* 数据渲染 */
    els.statPosts.textContent = POSTS.length;
    els.statTags.textContent = Object.keys(collectTags()).length;
    renderFilterPills();
    renderPosts();
    renderTagCloud();
    renderArchives();

    /* 抽屉事件 */
    els.drawerClose.addEventListener("click", closeDrawer);
    els.overlay.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
        closeDrawer();
      }
    });
    els.prevPost.addEventListener("click", function () {
      if (els.prevPost.dataset.target) openDrawer(els.prevPost.dataset.target);
    });
    els.nextPost.addEventListener("click", function () {
      if (els.nextPost.dataset.target) openDrawer(els.nextPost.dataset.target);
    });

    /* 复制 QQ 号 */
    $$("[data-copy-qq]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        copyQQ(btn.dataset.copyQq, btn);
      });
    });
    var copyBtn = $("#copy-qq");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        copyQQ(copyBtn.dataset.qq || QQ_NUMBER, copyBtn);
      });
    }

    /* 回到顶部 */
    els.toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    initAnchors();
    initMobileNav();
    initNavHighlight();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
