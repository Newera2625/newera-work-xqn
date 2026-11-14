```text
file=about.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>关于我 · 知远手记</title>
  <meta name="description" content="关于林知远：前端工程师、写作爱好者，这里有个人简介、技能、经历与联系方式。">
  <link rel="stylesheet" href="style.css">
</head>
<body data-page="about">
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="logo" href="index.html">
        <span class="logo__mark" aria-hidden="true">N</span>
        <span>N.LOGO</span>
      </a>
      <button class="nav__toggle" id="navToggle" type="button" aria-label="展开导航菜单" aria-expanded="false" aria-controls="siteNav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7"></line>
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="17" x2="20" y2="17"></line>
        </svg>
      </button>
      <nav class="nav" id="siteNav" aria-label="主导航">
        <a class="nav__link" data-nav="home" href="index.html">首页</a>
        <a class="nav__link" data-nav="blog" href="blog.html">文章</a>
        <a class="nav__link" data-nav="about" href="about.html">关于我</a>
      </nav>
    </div>
  </header>

  <main>
    <div class="container">
      <section class="profile">
        <div class="avatar" role="img" aria-label="林知远的字母头像">
          <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
            <defs>
              <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#2f4472"></stop>
                <stop offset="100%" stop-color="#1b2a4a"></stop>
              </linearGradient>
            </defs>
            <rect width="120" height="120" fill="url(#avatarBg)"></rect>
            <circle cx="60" cy="47" r="19" fill="#eef1f7"></circle>
            <path d="M60 72c-19 0-34 12-37 29a4 4 0 0 0 4 4h66a4 4 0 0 0 4-4c-3-17-18-29-37-29z" fill="#eef1f7"></path>
            <path d="M22 18h14v4H26v12h-4zM96 18h-14v4h10v12h4z" fill="#7f92bb"></path>
          </svg>
        </div>
        <div class="profile__info">
          <span class="eyebrow">About</span>
          <h1>林知远</h1>
          <p class="profile__role">前端工程师 / 独立开发者 · 杭州</p>
          <div class="profile__links">
            <a href="mailto:hi@zhiyuan.dev">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <polyline points="3.5 6.5 12 13 20.5 6.5"></polyline>
              </svg>
              hi@zhiyuan.dev
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.51c.53.1.72-.23.72-.5v-1.9c-2.9.63-3.52-1.4-3.52-1.4-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.44 1.14 3.03.87.1-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.17 0-1.14.41-2.07 1.08-2.8-.11-.27-.47-1.33.1-2.77 0 0 .88-.28 2.88 1.07a10 10 0 0 1 5.25 0c2-1.35 2.88-1.07 2.88-1.07.57 1.44.21 2.5.1 2.77.67.73 1.08 1.66 1.08 2.8 0 4.02-2.45 4.9-4.78 5.16.37.32.71.96.71 1.94v2.87c0 .27.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"></path>
              </svg>
              GitHub
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 5.9c-.7.3-1.5.5-2.4.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.5 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.7 2.1 2.9 3.9 3 1.4 1.1 3.2 1.6 5.1 1.6 6.1 0 9.5-5.1 9.3-9.6.7-.5 1.3-1.1 1.7-1.8z"></path>
              </svg>
              Twitter
            </a>
          </div>
        </div>
      </section>

      <section class="about-block">
        <h2>个人简介</h2>
        <p>我叫林知远，是一名前端工程师。日常工作是把设计稿变成可用的界面：搭建设计系统、写组件库、盯性能指标，也常常花大量时间在一个按钮的间距上较劲。</p>
        <p>我从 2014 年开始写博客，起初只是记录踩过的坑，后来逐渐变成一种思考方式——只有把一件事讲清楚，才算真的理解它。这个博客里的文章大多来自实际项目：踩过的坑、改过的方案、读过的书和偶尔的随笔。</p>
        <p>除了写代码，我在意界面是否干净、信息是否清楚、节奏是否舒服。工作中我习惯用最少的元素表达最完整的意图，这既是产品的标准，也是我写作时的偏好。</p>
      </section>

      <section class="about-block">
        <h2>技能</h2>
        <div class="skills" id="skillTags"></div>
      </section>

      <section class="about-block">
        <h2>经历</h2>
        <ul class="timeline" id="timeline"></ul>
      </section>

      <section class="about-block" style="padding-bottom: var(--space-3xl);">
        <h2>联系方式</h2>
        <div class="contact-grid" id="contactList"></div>
      </section>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="footer-links">
        <a href="mailto:hi@zhiyuan.dev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <polyline points="3.5 6.5 12 13 20.5 6.5"></polyline>
          </svg>
          hi@zhiyuan.dev
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.51c.53.1.72-.23.72-.5v-1.9c-2.9.63-3.52-1.4-3.52-1.4-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.44 1.14 3.03.87.1-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.17 0-1.14.41-2.07 1.08-2.8-.11-.27-.47-1.33.1-2.77 0 0 .88-.28 2.88 1.07a10 10 0 0 1 5.25 0c2-1.35 2.88-1.07 2.88-1.07.57 1.44.21 2.5.1 2.77.67.73 1.08 1.66 1.08 2.8 0 4.02-2.45 4.9-4.78 5.16.37.32.71.96.71 1.94v2.87c0 .27.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"></path>
          </svg>
          GitHub
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 5.9c-.7.3-1.5.5-2.4.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.5 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.7 2.1 2.9 3.9 3 1.4 1.1 3.2 1.6 5.1 1.6 6.1 0 9.5-5.1 9.3-9.6.7-.5 1.3-1.1 1.7-1.8z"></path>
          </svg>
          Twitter
        </a>
      </div>
      <p class="site-footer__copy">© 2025 N.LOGO · 保留所有权利</p>
    </div>
  </footer>

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>

```

```text
file=app.js
/* 全站交互：导航折叠、首页渲染、文章列表筛选与搜索、文章详情渲染与目录 */
(function () {
  "use strict";

  var DATA = window.BLOG_DATA || { posts: [], site: {} };
  var posts = (DATA.posts || []).slice().sort(function (a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });

  /* ---------- 工具函数 ---------- */
  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHTML(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(iso) {
    var parts = String(iso).split("-");
    if (parts.length !== 3) return iso;
    return parts[0] + " 年 " + parseInt(parts[1], 10) + " 月 " + parseInt(parts[2], 10) + " 日";
  }

  function shortDate(iso) {
    return String(iso).replace(/-/g, ".");
  }

  var ICONS = {
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 14"></polyline></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13h4l2 3h6l2-3h4"></path><path d="M5 5h14l2 8v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z"></path></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.51c.53.1.72-.23.72-.5v-1.9c-2.9.63-3.52-1.4-3.52-1.4-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.44 1.14 3.03.87.1-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.17 0-1.14.41-2.07 1.08-2.8-.11-.27-.47-1.33.1-2.77 0 0 .88-.28 2.88 1.07a10 10 0 0 1 5.25 0c2-1.35 2.88-1.07 2.88-1.07.57 1.44.21 2.5.1 2.77.67.73 1.08 1.66 1.08 2.8 0 4.02-2.45 4.9-4.78 5.16.37.32.71.96.71 1.94v2.87c0 .27.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"></path></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.9c-.7.3-1.5.5-2.4.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.5 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.7 2.1 2.9 3.9 3 1.4 1.1 3.2 1.6 5.1 1.6 6.1 0 9.5-5.1 9.3-9.6.7-.5 1.3-1.1 1.7-1.8z"></path></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><polyline points="3.5 6.5 12 13 20.5 6.5"></polyline></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"></path><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"></path></svg>'
  };

  /* ---------- 导航 ---------- */
  function initNav() {
    var toggle = byId("navToggle");
    var nav = byId("siteNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initActiveNav() {
    var page = document.body.getAttribute("data-page");
    var links = document.querySelectorAll(".nav__link[data-nav]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === page) {
        links[i].classList.add("is-active");
        links[i].setAttribute("aria-current", "page");
      }
    }
  }

  /* ---------- 首页 ---------- */
  function cardHTML(post) {
    return (
      '<article class="card">' +
      '<div class="card__meta">' +
      '<span class="card__category">' + escapeHTML(post.category) + "</span>" +
      "<span>" + escapeHTML(shortDate(post.date)) + "</span>" +
      "</div>" +
      '<h3><a href="post.html?id=' + post.id + '">' + escapeHTML(post.title) + "</a></h3>" +
      '<p class="card__excerpt">' + escapeHTML(post.excerpt) + "</p>" +
      '<a class="card__more" href="post.html?id=' + post.id + '">阅读 ' + post.readingTime + " 分钟 " + ICONS.arrowRight + "</a>" +
      "</article>"
    );
  }

  function initHome() {
    var featuredWrap = byId("featuredGrid");
    if (featuredWrap) {
      var featured = posts.filter(function (p) { return p.featured; }).slice(0, 3);
      if (featured.length < 3) {
        featured = posts.slice(0, 3);
      }
      featuredWrap.innerHTML = featured.map(cardHTML).join("");
    }

    var latestWrap = byId("latestList");
    if (latestWrap) {
      latestWrap.innerHTML = posts.slice(0, 6).map(function (p) {
        return (
          '<a class="post-list__item" href="post.html?id=' + p.id + '">' +
          '<span class="post-list__meta">' +
          '<span class="post-list__date">' + escapeHTML(shortDate(p.date)) + "</span>" +
          '<span class="post-list__category card__category">' + escapeHTML(p.category) + "</span>" +
          "</span>" +
          '<span class="post-list__title">' + escapeHTML(p.title) + "</span>" +
          '<span class="post-list__arrow">' + ICONS.arrowRight + "</span>" +
          "</a>"
        );
      }).join("");
    }

    var stats = byId("heroStats");
    if (stats) {
      var cats = {};
      posts.forEach(function (p) { cats[p.category] = true; });
      var total = posts.reduce(function (sum, p) { return sum + (p.readingTime || 0); }, 0);
      stats.innerHTML =
        '<div><strong>' + posts.length + '</strong>篇文章</div>' +
        '<div><strong>' + Object.keys(cats).length + '</strong>个分类</div>' +
        '<div><strong>' + total + '</strong>分钟阅读量</div>';
    }
  }

  /* ---------- 文章列表页 ---------- */
  var blogState = { category: "全部", keyword: "" };

  function matches(post) {
    if (blogState.category !== "全部" && post.category !== blogState.category) return false;
    if (!blogState.keyword) return true;
    var kw = blogState.keyword.toLowerCase();
    return (
      String(post.title).toLowerCase().indexOf(kw) !== -1 ||
      String(post.excerpt).toLowerCase().indexOf(kw) !== -1
    );
  }

  function renderBlog() {
    var grid = byId("blogGrid");
    if (!grid) return;
    var list = posts.filter(matches);
    grid.innerHTML = list.map(cardHTML).join("");

    var count = byId("resultCount");
    if (count) {
      count.textContent = "共 " + list.length + " 篇文章";
    }

    var empty = byId("emptyState");
    if (empty) {
      empty.classList.toggle("is-visible", list.length === 0);
    }
    var gridWrap = byId("blogGridWrap");
    if (gridWrap) {
      gridWrap.style.display = list.length === 0 ? "none" : "";
    }
  }

  function initBlog() {
    var grid = byId("blogGrid");
    if (!grid) return;

    var filterWrap = byId("filters");
    var categories = (DATA.site && DATA.site.categories) || ["全部", "随笔", "技术", "设计", "读书"];
    if (filterWrap) {
      filterWrap.innerHTML = categories.map(function (c) {
        return (
          '<button type="button" class="filter' + (c === "全部" ? " is-active" : "") + '" data-category="' +
          escapeHTML(c) + '" aria-pressed="' + (c === "全部" ? "true" : "false") + '">' +
          escapeHTML(c) + "</button>"
        );
      }).join("");

      filterWrap.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-category]");
        if (!btn) return;
        blogState.category = btn.getAttribute("data-category");
        var all = filterWrap.querySelectorAll("button[data-category]");
        for (var i = 0; i < all.length; i++) {
          var on = all[i] === btn;
          all[i].classList.toggle("is-active", on);
          all[i].setAttribute("aria-pressed", on ? "true" : "false");
        }
        renderBlog();
      });
    }

    var input = byId("searchInput");
    var clearBtn = byId("searchClear");
    if (input) {
      input.addEventListener("input", function () {
        blogState.keyword = input.value.trim();
        if (clearBtn) clearBtn.classList.toggle("is-visible", input.value.length > 0);
        renderBlog();
      });
    }
    if (clearBtn && input) {
      clearBtn.addEventListener("click", function () {
        input.value = "";
        blogState.keyword = "";
        clearBtn.classList.remove("is-visible");
        renderBlog();
        input.focus();
      });
    }

    var resetBtn = byId("resetFilters");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        blogState.category = "全部";
        blogState.keyword = "";
        if (input) input.value = "";
        if (clearBtn) clearBtn.classList.remove("is-visible");
        if (filterWrap) {
          var all = filterWrap.querySelectorAll("button[data-category]");
          for (var i = 0; i < all.length; i++) {
            var on = all[i].getAttribute("data-category") === "全部";
            all[i].classList.toggle("is-active", on);
            all[i].setAttribute("aria-pressed", on ? "true" : "false");
          }
        }
        renderBlog();
      });
    }

    renderBlog();
  }

  /* ---------- 文章详情页 ---------- */
  function getQueryId() {
    var match = window.location.search.match(/[?&]id=(\d+)/);
    return match ? parseInt(match[1], 10) : NaN;
  }

  function renderNotFound() {
    var wrap = byId("postMissing");
    if (wrap) wrap.classList.add("is-visible");
    var layout = byId("postLayout");
    if (layout) layout.style.display = "none";
    var nav = byId("postNav");
    if (nav) nav.style.display = "none";
    var head = byId("postHeader");
    if (head) head.style.display = "none";
  }

  function initPost() {
    var body = byId("postContent");
    if (!body) return;

    var id = getQueryId();
    var post = null;
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id === id) { post = posts[i]; break; }
    }

    if (!post) {
      renderNotFound();
      return;
    }

    var missing = byId("postMissing");
    if (missing) missing.classList.remove("is-visible");

    var head = byId("postHeader");
    if (head) {
      head.style.display = "";
      head.innerHTML =
        '<div class="post-header__meta">' +
        '<span class="card__category">' + escapeHTML(post.category) + "</span>" +
        '<span class="dot"></span><span>' + escapeHTML(formatDate(post.date)) + "</span>" +
        '<span class="dot"></span><span>约 ' + post.readingTime + " 分钟阅读</span>" +
        "</div>" +
        "<h1>" + escapeHTML(post.title) + "</h1>" +
        '<p class="post-header__excerpt">' + escapeHTML(post.excerpt) + "</p>";
    }

    var tocItems = [];
    var html = "";
    var headingIndex = 0;
    for (var j = 0; j < post.body.length; j++) {
      var block = post.body[j];
      if (block.type === "h2" || block.type === "h3") {
        headingIndex++;
        var anchor = "section-" + headingIndex;
        tocItems.push({ level: block.type, text: block.text, anchor: anchor });
        html +=
          '<h' + (block.type === "h2" ? "2" : "3") + ' id="' + anchor + '">' +
          escapeHTML(block.text) + "</h" + (block.type === "h2" ? "2" : "3") + ">";
      } else if (block.type === "p") {
        html += "<p>" + escapeHTML(block.text) + "</p>";
      } else if (block.type === "ul") {
        html += "<ul>" + (block.items || []).map(function (item) {
          return "<li>" + escapeHTML(item) + "</li>";
        }).join("") + "</ul>";
      } else if (block.type === "code") {
        html += "<pre><code>" + escapeHTML(block.text) + "</code></pre>";
      } else if (block.type === "quote") {
        html += "<blockquote>" + escapeHTML(block.text) + "</blockquote>";
      }
    }
    body.innerHTML = html;

    var toc = byId("postToc");
    if (toc && tocItems.length) {
      var list = tocItems.map(function (item, idx) {
        var cls = item.level === "h3" ? ' class="toc__sub"' : "";
        return (
          "<li" + cls + '><a href="#' + item.anchor + '" data-anchor="' + item.anchor + '">' +
          escapeHTML(item.text) + "</a></li>"
        );
      }).join("");
      toc.innerHTML = '<p class="toc__title">目录</p><ul class="toc__list">' + list + "</ul>";

      toc.addEventListener("click", function (e) {
        var link = e.target.closest("a[data-anchor]");
        if (!link) return;
        e.preventDefault();
        var target = byId(link.getAttribute("data-anchor"));
        if (!target) return;
        var top = target.getBoundingClientRect().top + window.pageYOffset - 92;
        window.scrollTo({ top: top, behavior: "smooth" });
        try {
          history.replaceState(null, "", "#" + link.getAttribute("data-anchor"));
        } catch (err) {
          window.location.hash = link.getAttribute("data-anchor");
        }
      });

      // 滚动高亮当前目录项
      var links = toc.querySelectorAll("a[data-anchor]");
      function onScroll() {
        var current = null;
        for (var k = 0; k < tocItems.length; k++) {
          var el = byId(tocItems[k].anchor);
          if (!el) continue;
          if (el.getBoundingClientRect().top - 120 <= 0) current = tocItems[k].anchor;
        }
        for (var m = 0; m < links.length; m++) {
          links[m].classList.toggle("is-active", links[m].getAttribute("data-anchor") === current);
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // 上一篇 / 下一篇
    var navWrap = byId("postNav");
    if (navWrap) {
      var index = posts.findIndex(function (p) { return p.id === post.id; });
      var prev = index > 0 ? posts[index - 1] : null;
      var next = index < posts.length - 1 ? posts[index + 1] : null;
      navWrap.innerHTML =
        (prev
          ? '<a class="post-nav__item" href="post.html?id=' + prev.id + '">' +
            '<span class="post-nav__label">上一篇</span>' +
            '<span class="post-nav__title">' + escapeHTML(prev.title) + "</span></a>"
          : '<div class="post-nav__item"><span class="post-nav__label">上一篇</span>' +
            '<span class="post-nav__empty">已经是最新一篇</span></div>') +
        (next
          ? '<a class="post-nav__item post-nav__item--next" href="post.html?id=' + next.id + '">' +
            '<span class="post-nav__label">下一篇</span>' +
            '<span class="post-nav__title">' + escapeHTML(next.title) + "</span></a>"
          : '<div class="post-nav__item post-nav__item--next"><span class="post-nav__label">下一篇</span>' +
            '<span class="post-nav__empty">已经是最后一篇</span></div>');
    }

    document.title = post.title + " · " + ((DATA.site && DATA.site.name) || "博客");
  }

  /* ---------- 关于我 ---------- */
  function initAbout() {
    var skills = byId("skillTags");
    if (skills) {
      var list = ["JavaScript", "TypeScript", "HTML / CSS", "React", "Node.js", "构建工具", "界面设计", "信息架构", "写作与编辑", "性能优化"];
      skills.innerHTML = list.map(function (s) {
        return '<span class="skill">' + escapeHTML(s) + "</span>";
      }).join("");
    }

    var timeline = byId("timeline");
    if (timeline) {
      var items = [
        { year: "2023 — 至今", role: "高级前端工程师 · 某科技公司", desc: "负责中后台产品的前端架构与设计系统建设，推动组件库统一落地，并主导首屏性能优化，使关键页面加载时间下降约 40%。" },
        { year: "2020 — 2023", role: "前端工程师 · 初创团队", desc: "从零搭建产品的前端基础框架，参与设计系统从 Sketch 到代码的转化流程，独立完成官网与后台管理系统的重构。" },
        { year: "2018 — 2020", role: "前端开发 · 外包与自由职业", desc: "承接多个企业站点与活动页面的开发工作，打下扎实的手写 HTML 与 CSS 基本功，也养成了独立交付的习惯。" },
        { year: "2014 — 2018", role: "计算机科学与技术 · 在读", desc: "系统学习数据结构、编译原理与人机交互，毕业后开始走上前端这条道路，并一直保持写博客的习惯。" }
      ];
      timeline.innerHTML = items.map(function (it) {
        return (
          '<li class="timeline__item">' +
          '<div class="timeline__year">' + escapeHTML(it.year) + "</div>" +
          '<div class="timeline__role">' + escapeHTML(it.role) + "</div>" +
          '<p class="timeline__desc">' + escapeHTML(it.desc) + "</p>" +
          "</li>"
        );
      }).join("");
    }

    var contact = byId("contactList");
    if (contact) {
      var author = (DATA.site && DATA.site.author) || {};
      var rows = [
        { icon: "mail", label: "邮箱", value: author.email || "hi@zhiyuan.dev", href: "mailto:" + (author.email || "") },
        { icon: "github", label: "GitHub", value: author.github || "github.com/zhiyuan", href: "https://" + (author.github || "") },
        { icon: "twitter", label: "Twitter", value: author.twitter || "twitter.com/zhiyuan_dev", href: "https://" + (author.twitter || "") }
      ];
      contact.innerHTML = rows.map(function (r) {
        return (
          '<a class="contact" href="' + escapeHTML(r.href) + '" target="_blank" rel="noopener noreferrer">' +
          ICONS[r.icon] +
          "<span><span class=\"contact__label\">" + escapeHTML(r.label) + "</span>" +
          '<span class="contact__value">' + escapeHTML(r.value) + "</span></span></a>"
        );
      }).join("");
    }
  }

  /* ---------- 启动 ---------- */
  function boot() {
    initNav();
    initActiveNav();
    initHome();
    initBlog();
    initPost();
    initAbout();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

```

```text
file=blog.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>文章 · 知远手记</title>
  <meta name="description" content="全部文章列表，支持按分类筛选与关键词搜索。">
  <link rel="stylesheet" href="style.css">
</head>
<body data-page="blog">
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="logo" href="index.html">
        <span class="logo__mark" aria-hidden="true">N</span>
        <span>N.LOGO</span>
      </a>
      <button class="nav__toggle" id="navToggle" type="button" aria-label="展开导航菜单" aria-expanded="false" aria-controls="siteNav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7"></line>
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="17" x2="20" y2="17"></line>
        </svg>
      </button>
      <nav class="nav" id="siteNav" aria-label="主导航">
        <a class="nav__link" data-nav="home" href="index.html">首页</a>
        <a class="nav__link" data-nav="blog" href="blog.html">文章</a>
        <a class="nav__link" data-nav="about" href="about.html">关于我</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Writing</span>
        <h1>文章</h1>
        <p>工程实践、设计观察与阅读片段，按分类筛选，或用关键词搜索标题与摘要。</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="toolbar">
          <div class="search">
            <span class="search__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
              </svg>
            </span>
            <label class="visually-hidden" for="searchInput">搜索文章标题或摘要</label>
            <input type="search" id="searchInput" placeholder="搜索标题或摘要..." autocomplete="off">
            <button class="search__clear" id="searchClear" type="button" aria-label="清除搜索关键词">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <p class="result-count" id="resultCount" role="status" aria-live="polite"></p>
        </div>

        <div class="filters" id="filters" role="group" aria-label="按分类筛选"></div>

        <div id="blogGridWrap">
          <div class="card-grid" id="blogGrid"></div>
        </div>

        <div class="empty" id="emptyState">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 13h4l2 3h6l2-3h4"></path>
            <path d="M5 5h14l2 8v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z"></path>
          </svg>
          <h3>没有找到匹配的文章</h3>
          <p>换一个关键词试试，或者清除当前的分类与搜索条件。</p>
          <button class="btn btn--primary" id="resetFilters" type="button">清除筛选</button>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="footer-links">
        <a href="mailto:hi@zhiyuan.dev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <polyline points="3.5 6.5 12 13 20.5 6.5"></polyline>
          </svg>
          hi@zhiyuan.dev
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.51c.53.1.72-.23.72-.5v-1.9c-2.9.63-3.52-1.4-3.52-1.4-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.44 1.14 3.03.87.1-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.17 0-1.14.41-2.07 1.08-2.8-.11-.27-.47-1.33.1-2.77 0 0 .88-.28 2.88 1.07a10 10 0 0 1 5.25 0c2-1.35 2.88-1.07 2.88-1.07.57 1.44.21 2.5.1 2.77.67.73 1.08 1.66 1.08 2.8 0 4.02-2.45 4.9-4.78 5.16.37.32.71.96.71 1.94v2.87c0 .27.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"></path>
          </svg>
          GitHub
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 5.9c-.7.3-1.5.5-2.4.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.5 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.7 2.1 2.9 3.9 3 1.4 1.1 3.2 1.6 5.1 1.6 6.1 0 9.5-5.1 9.3-9.6.7-.5 1.3-1.1 1.7-1.8z"></path>
          </svg>
          Twitter
        </a>
      </div>
      <p class="site-footer__copy">© 2025 N.LOGO · 保留所有权利</p>
    </div>
  </footer>

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>

```

```text
file=data.js
/* 站点静态数据：文章、站点信息、页面配置 */
window.BLOG_DATA = {
  site: {
    name: "知远手记",
    logoText: "N.LOGO",
    title: "写代码，也写生活",
    subtitle: "一名前端工程师的私人笔记，记录工程实践、设计观察与阅读片段。",
    author: {
      name: "林知远",
      role: "前端工程师 / 独立开发者",
      email: "hi@zhiyuan.dev",
      github: "github.com/zhiyuan",
      twitter: "twitter.com/zhiyuan_dev",
      location: "杭州 · 中国"
    },
    categories: ["全部", "随笔", "技术", "设计", "读书"],
    social: [
      { label: "GitHub", href: "https://github.com/", icon: "github" },
      { label: "Twitter", href: "https://twitter.com/", icon: "twitter" },
      { label: "邮箱", href: "mailto:hi@zhiyuan.dev", icon: "mail" }
    ]
  },

  posts: [
    {
      id: 1,
      title: "从零搭建一个静态博客的前端架构",
      date: "2025-06-18",
      category: "技术",
      readingTime: 6,
      featured: true,
      excerpt: "不依赖任何框架，用原生 HTML、CSS 与 JavaScript 拆分页面职责，也是一种值得练手的架构练习。",
      body: [
        { type: "h2", text: "为什么选择原生实现" },
        { type: "p", text: "很多前端同学的第一站是某个框架的脚手架：一条命令生成目录，一堆约定好的配置文件，几十秒就能跑起来。但当你真正理解「页面由什么组成、数据从哪里来、状态如何流动」之后，回头再去看框架的源码，反而会轻松很多。这篇文章记录了我从零搭建博客时的取舍。" },
        { type: "p", text: "静态博客的结构非常清晰：四个页面、一个样式表、一个数据文件、一个交互脚本。除此之外再无依赖，所有资源都在本地，打开文件就能看。" },
        { type: "h2", text: "职责划分" },
        { type: "p", text: "我把文件分成四层。HTML 只负责语义结构与骨架，不写任何业务逻辑；CSS 负责视觉表现，用变量统一颜色、间距与圆角；data.js 提供内容；app.js 只做两件事——挂载事件与渲染数据。" },
        { type: "ul", items: ["index.html：首页，聚合展示精选与最新文章", "blog.html：文章列表，支持分类筛选与关键词搜索", "post.html：文章详情，通过 URL 参数读取正文", "about.html：关于我，介绍个人经历与联系方式"] },
        { type: "h3", text: "数据层的设计" },
        { type: "p", text: "文章数据统一放在 data.js 中，每篇文章包含 id、标题、发布日期、分类、阅读时长、摘要以及正文块数组。正文用「块」而不是整段 HTML 字符串来描述，这样目录生成、阅读时长估算都能自动完成，也避免了拼接字符串带来的注入风险。" },
        { type: "h2", text: "一个必须注意的细节" },
        { type: "p", text: "多页面共享同一个 data.js 时，如果某个页面因为路径问题加载失败脚本，页面并不会报错，只是内容为空。所以我给每个渲染函数都加了兜底：找不到目标节点就直接返回，绝不抛异常。这样的健壮性在长期维护中非常省心。" },
        { type: "h3", text: "样式变量的价值" },
        { type: "p", text: "把主色、灰阶、间距、圆角、阴影全部收进 :root 里的 CSS 变量之后，调整主题只需要改一处。深色的文字层级、浅色的背景层次、克制的边框，都能靠变量自然协调出来。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "整站不到一千行代码，却覆盖了导航、筛选、搜索、目录、滚动定位、移动端折叠菜单等常见需求。工程能力的成长，往往就藏在这些看起来「不值得用框架」的小项目里。" }
      ]
    },
    {
      id: 2,
      title: "CSS 变量让主题切换变得简单",
      date: "2025-05-30",
      category: "技术",
      readingTime: 5,
      featured: true,
      excerpt: "把颜色与尺寸抽成变量之后，深色模式只需要重新赋值，而不是重写一遍样式规则。",
      body: [
        { type: "h2", text: "从硬编码到变量" },
        { type: "p", text: "早期写样式时，十六进制色值散落在十几个文件里，想换一个主色就得全局搜索。CSS 自定义属性出现后，情况彻底改变了：先定义一层语义化的变量，再由具体组件去引用它。" },
        { type: "code", text: ":root {\n  --color-primary: #1b2a4a;\n  --color-text: #12151c;\n  --color-muted: #667085;\n  --space-md: 16px;\n}" },
        { type: "h2", text: "语义化比颜色名更重要" },
        { type: "p", text: "直接把变量命名为 --blue-500 并不理想，它只描述了颜色本身。更推荐用 --color-primary、--color-surface 这类语义名，这样将来把主色从蓝色换成墨绿，只需要改一个值。" },
        { type: "h3", text: "深色模式示例" },
        { type: "p", text: "深色模式只需要在媒体查询里重新赋值，而不需要重写任何组件样式。这就是变量带来的解耦。" },
        { type: "code", text: "@media (prefers-color-scheme: dark) {\n  :root {\n    --color-text: #e8eaed;\n    --color-surface: #15181f;\n  }\n}" },
        { type: "h2", text: "间距也应该变量化" },
        { type: "p", text: "间距、圆角、阴影同理。把 8、12、16、24 这类数值抽象成 --space-sm 到 --space-xl，整站的呼吸感就会变得统一，而不是每张卡片各写各的。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "变量是成本极低、收益极高的重构手段。哪怕项目很小，也值得从第一行样式就养成这个习惯。" }
      ]
    },
    {
      id: 3,
      title: "移动端优先的响应式布局实践",
      date: "2025-05-12",
      category: "技术",
      readingTime: 7,
      featured: true,
      excerpt: "与其不断修补桌面版，不如从窄屏开始设计，再逐级向上扩展。",
      body: [
        { type: "h2", text: "从窄屏开始" },
        { type: "p", text: "移动端优先意味着基础样式服务于小屏幕，然后用 min-width 媒体查询逐级增强。相比先写桌面版再用 max-width 修补，前者能避免大量无意义的覆盖规则。" },
        { type: "h3", text: "关键断点" },
        { type: "p", text: "本站只设置了一个主要断点：768px。低于它使用单列布局与折叠菜单，高于它切换为多列网格与横向导航。断点越少，布局越可预测。" },
        { type: "h2", text: "避免横向滚动" },
        { type: "p", text: "375px 宽度下出现横向滚动，往往是某个固定宽度的元素造成的。可长文本使用 overflow-wrap: break-word，弹性布局使用 minmax 而非固定宽度，图标与装饰元素设置 flex-shrink: 0，都能有效避免。" },
        { type: "ul", items: ["长英文单词使用 word-break: break-word", "网格使用 repeat(auto-fit, minmax(260px, 1fr))", "装饰性元素不参与布局宽度计算", "统一设置 box-sizing: border-box"] },
        { type: "h2", text: "触摸目标" },
        { type: "p", text: "可点击元素的实际尺寸建议不小于 44×44 像素。汉堡按钮、导航链接都留出足够的 padding，在手机上才不会被误触。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "响应式不是把布局缩小，而是为不同设备重新安排信息密度。窄屏下保留最关键的内容，其余内容通过后续交互展开。" }
      ]
    },
    {
      id: 4,
      title: "关于可读性：正文排版的七个细节",
      date: "2025-04-22",
      category: "设计",
      readingTime: 6,
      featured: false,
      excerpt: "行宽、行高、字号与段间距，这几个数字决定了读者是否愿意读完一篇文章。",
      body: [
        { type: "h2", text: "行宽控制在 60 到 80 个字符" },
        { type: "p", text: "中文正文以 640 到 720 像素宽度最为舒适，过宽会让视线在换行时失去锚点。本站的正文列宽设为 720 像素，右侧留给目录栏。" },
        { type: "h2", text: "行高决定呼吸感" },
        { type: "p", text: "中文行高建议 1.7 到 1.8 倍字号，英文可略低。行高不足会让段落挤成一片，读者很快疲劳。" },
        { type: "h3", text: "字号不要太小" },
        { type: "p", text: "正文保持在 16 到 17 像素，辅助信息不低于 13 像素。灰色次要文字虽然可以弱化，但对比度仍需保证可读。" },
        { type: "h2", text: "段间距与标题间距" },
        { type: "p", text: "段间距通常取 1.2 到 1.5 倍行高，标题上方的留白要明显大于下方，让每个小节有清晰的起点。" },
        { type: "ul", items: ["段落之间使用 margin-bottom 而不是空行", "标题使用 margin-top 建立层级", "列表使用统一的缩进与符号", "引用块使用左侧竖线与浅色背景"] },
        { type: "h2", text: "颜色的层次" },
        { type: "p", text: "标题用接近纯黑，正文用稍浅的深灰，辅助信息再用更浅一档。同一种主色只用于链接与强调，不要让每个元素都抢注意力。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "排版是看不见的设计。读者只会觉得「这篇文章读起来很舒服」，而不会意识到原因是什么。" }
      ]
    },
    {
      id: 5,
      title: "设计系统中的留白与网格",
      date: "2025-04-03",
      category: "设计",
      readingTime: 5,
      featured: false,
      excerpt: "留白不是空着的地方，而是承载节奏与秩序的空间。",
      body: [
        { type: "h2", text: "留白的功能" },
        { type: "p", text: "留白承担分组、对比与引导视线的作用。元素之间的空隙越大，它们的关联越弱；空隙越小，越容易被看作一个整体。" },
        { type: "h3", text: "间距阶梯" },
        { type: "p", text: "合理的间距体系通常基于一个基准单位：4、8、12、16、24、32、48、64。所有间距都取自阶梯，页面才会显得协调。" },
        { type: "h2", text: "网格与对齐" },
        { type: "p", text: "统一的左侧对齐比居中排版更利于扫描。居中适合短文本与标题，长段落左对齐能让读者的视线在每次刷新时回到同一个起点。" },
        { type: "h2", text: "视觉重量" },
        { type: "p", text: "元素越重要，周围留白越多；次要信息可以更紧凑。这条规则能让你在排版时快速判断轻重缓急。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "把间距写进变量，把对齐写进规则，页面的秩序感自然就会出现。" }
      ]
    },
    {
      id: 6,
      title: "重构旧项目时我关注的六件事",
      date: "2025-03-12",
      category: "技术",
      readingTime: 8,
      featured: false,
      excerpt: "接手一个没有文档的项目时，先摸清边界，再动手改写。",
      body: [
        { type: "h2", text: "先跑起来" },
        { type: "p", text: "任何改动之前，先让项目能稳定构建、跑通主流程。无法运行的项目里，任何「优化」都无法验证。" },
        { type: "h3", text: "画出依赖关系" },
        { type: "p", text: "梳理模块之间的调用方向，找到循环依赖与隐藏耦合点。这些通常就是后续崩溃的源头。" },
        { type: "h2", text: "小步提交" },
        { type: "p", text: "把重构切成几十个小提交，每一步都可回滚。大爆炸式的重写一旦出问题，定位成本极高。" },
        { type: "ul", items: ["先补测试再改结构", "每一步都保持可运行", "删除死代码而不是注释掉", "为边界条件补充用例"] },
        { type: "h2", text: "命名与注释" },
        { type: "p", text: "命名承担了大部分文档职责。一个准确的函数名，往往比三行注释更有用。" },
        { type: "h2", text: "关注性能预算" },
        { type: "p", text: "重构时顺手记录关键路径的耗时变化，避免用更优雅的写法换来更慢的运行速度。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "重构的本质是降低未来修改的成本，而不是让代码看起来更漂亮。" }
      ]
    },
    {
      id: 7,
      title: "关于慢下来：一份周末散步笔记",
      date: "2025-02-20",
      category: "随笔",
      readingTime: 4,
      featured: false,
      excerpt: "把手机放进口袋，沿着熟悉的河岸走了一个下午。",
      body: [
        { type: "h2", text: "出门" },
        { type: "p", text: "周六下午三点，出门时没有定目的地。沿着小区外的河岸一直走，路上遇到一家修自行车的铺子，老板正把一台旧车拆开换零件。" },
        { type: "h3", text: "修车铺的下午" },
        { type: "p", text: "我在旁边站了五分钟。他手上全是油，却把每一颗螺丝按顺序排在工具布上。那种从容让我想起调试程序时应有的节奏。" },
        { type: "h2", text: "河边" },
        { type: "p", text: "河面上有光有影，风把水面推成细碎的皱纹。有人在对岸钓鱼，浮漂一动不动。城市在周末依然运转，只是节奏慢了下来。" },
        { type: "h2", text: "回到桌前" },
        { type: "p", text: "傍晚回到桌前，打开编辑器，发现下午想不通的那个问题，换个写法竟然就通了。慢下来并不是逃避思考，而是给思考留出空隙。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "效率来自专注，而专注的前提是有余裕。周末的意义，也许就是用来补上这一点。" }
      ]
    },
    {
      id: 8,
      title: "读《设计中的设计》：形式追随意义",
      date: "2025-01-28",
      category: "读书",
      readingTime: 6,
      featured: false,
      excerpt: "好看只是结果，好设计必须先回答「为什么存在」。",
      body: [
        { type: "h2", text: "从一张纸开始" },
        { type: "p", text: "书中提到，平面设计师真正的起点不是电脑，而是纸、笔和手感。先理解形状、材料与印刷，再谈像素与图层。" },
        { type: "h3", text: "重新设计一张海报" },
        { type: "p", text: "书里给了一个练习：选一张旧海报，先做减法，删掉所有装饰元素，只留下信息本身，看看还剩下什么。很多人删到一半就慌了，因为删掉之后才发现自己原本的设计没有结构。" },
        { type: "h2", text: "形式与意义" },
        { type: "p", text: "作者主张「形式追随意义」：形式不是意义的装饰，而是意义的延伸。好的设计里，形状与它所承载的内容共享同一种逻辑。" },
        { type: "ul", items: ["先问清楚为谁设计、解决什么问题", "让结构先于装饰出现", "用最少的元素表达完整的意图", "拒绝为了显得专业而堆砌细节"] },
        { type: "h2", text: "对做界面的人意味着什么" },
        { type: "p", text: "界面设计中常见的「装饰性渐变」「多余动画」正是形式脱离意义的表现。删掉它们，界面往往会更清楚，也更快。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "这本书适合每隔一段时间重读一次，每次都能发现上一遍忽略的地方。" }
      ]
    },
    {
      id: 9,
      title: "键盘可达性：把网站用键盘走一遍",
      date: "2024-12-15",
      category: "技术",
      readingTime: 5,
      featured: false,
      excerpt: "只用 Tab、回车和方向键，能完成网站的主要操作吗？",
      body: [
        { type: "h2", text: "为什么要用键盘检查" },
        { type: "p", text: "使用鼠标的人感受不到焦点环的存在，但键盘用户完全依赖它。一个没有可见焦点的按钮，对他们来说等于不存在。" },
        { type: "h2", text: "基本的可达性要求" },
        { type: "ul", items: ["所有可交互元素都是真实的 button 或 a 标签", "焦点顺序与视觉顺序一致", "焦点环清晰可见且不被遮挡", "折叠菜单在展开后能正确管理焦点"] },
        { type: "h3", text: "语义化优于 div" },
        { type: "p", text: "用 div 加上点击事件模拟按钮，在键盘上完全无法触发，也不会有正确的角色播报。语义标签是免费的可访问性。" },
        { type: "h2", text: "检查方法" },
        { type: "p", text: "拔掉鼠标，只用 Tab 键从头走到尾。如果中途迷路、看不到当前位置，或者某个按钮跳过了，说明还需要改进。" },
        { type: "h2", text: "小结" },
        { type: "p", text: "可达性不是为少数人做的特殊功能，而是更稳健的工程实践。" }
      ]
    },
    {
      id: 10,
      title: "写给一年后的自己：三个小目标",
      date: "2024-11-08",
      category: "随笔",
      readingTime: 3,
      featured: false,
      excerpt: "不比别人，只和去年年底的自己比一比。",
      body: [
        { type: "h2", text: "第一个目标：写满一百篇" },
        { type: "p", text: "写作是逼自己把理解说清楚的方式。一百篇听起来不多，平均每周一篇多一点，坚持下来比想象中难。" },
        { type: "h3", text: "第二个目标：做一个真正有人用的产品" },
        { type: "p", text: "不是练习项目，也不是简历上的描述，而是有人每天打开、并且愿意回来使用的东西。" },
        { type: "h2", text: "第三个目标：多睡一点" },
        { type: "p", text: "身体是最先垮掉的部分。把睡眠当成目标而不是奖励，这件事我想了很久才想明白。" },
        { type: "h2", text: "写下来" },
        { type: "p", text: "目标写下来之后就不再模糊。年底再打开这篇，看看完成了多少，剩下的部分，或许就是明年的方向。" }
      ]
    },
    {
      id: 11,
      title: "浏览器渲染流水线入门",
      date: "2024-10-19",
      category: "技术",
      readingTime: 7,
      featured: false,
      excerpt: "从 HTML 到像素，中间到底发生了什么。",
      body: [
        { type: "h2", text: "解析与样式计算" },
        { type: "p", text: "浏览器先把 HTML 解析成 DOM，把 CSS 解析成 CSSOM，然后结合两者计算出每个元素的最终样式。这一阶段称为渲染树构建之前的步骤。" },
        { type: "h2", text: "布局与绘制" },
        { type: "p", text: "布局阶段计算每个元素的几何位置与尺寸，绘制阶段把内容画进图层，合成阶段把图层拼接成最终画面。任何一帧超过 16 毫秒，用户就会感知到掉帧。" },
        { type: "h3", text: "如何减少重排" },
        { type: "ul", items: ["批量读写样式，避免反复触发布局", "尽量只改变 transform 与 opacity 这类合成属性", "用 will-change 提示浏览器提前准备图层", "避免在循环中查询 offsetTop 等布局属性"] },
        { type: "h2", text: "小结" },
        { type: "p", text: "理解这条流水线之后，很多性能问题就变成了可以定位的具体环节。" }
      ]
    },
    {
      id: 12,
      title: "记一次失败的产品改版",
      date: "2024-09-05",
      category: "随笔",
      readingTime: 4,
      featured: false,
      excerpt: "我们以为用户在抱怨配色，其实他们在抱怨找不到按钮。",
      body: [
        { type: "h2", text: "反馈听起来很清晰" },
        { type: "p", text: "反馈里最常出现的是「这个颜色太刺眼了」。于是我们把主色换成更柔和的灰蓝，重新设计了按钮样式，发布两周后，收到的反馈几乎没变。" },
        { type: "h3", text: "真正的问题" },
        { type: "p", text: "访谈后才发现，用户抱怨的是核心操作入口不显眼，浅色背景上的按钮几乎融进了页面。我们一直在改错的东西。" },
        { type: "h2", text: "教训" },
        { type: "p", text: "用户会用他们认为最直观的方式描述问题，而那个描述未必指向真实的成因。把「他们说了什么」和「他们想完成什么」分开，是产品工作里最重要的一步。" },
        { type: "h2", text: "下一次" },
        { type: "p", text: "下次收到反馈时，我会先问一句：你当时想做什么？答案往往比描述本身更有价值。" }
      ]
    }
  ]
};

```

```text
file=index.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>知远手记 · 写代码，也写生活</title>
  <meta name="description" content="一名前端工程师的私人笔记，记录工程实践、设计观察与阅读片段。">
  <link rel="stylesheet" href="style.css">
</head>
<body data-page="home">
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="logo" href="index.html">
        <span class="logo__mark" aria-hidden="true">N</span>
        <span>N.LOGO</span>
      </a>
      <button class="nav__toggle" id="navToggle" type="button" aria-label="展开导航菜单" aria-expanded="false" aria-controls="siteNav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7"></line>
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="17" x2="20" y2="17"></line>
        </svg>
      </button>
      <nav class="nav" id="siteNav" aria-label="主导航">
        <a class="nav__link" data-nav="home" href="index.html">首页</a>
        <a class="nav__link" data-nav="blog" href="blog.html">文章</a>
        <a class="nav__link" data-nav="about" href="about.html">关于我</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container hero__inner">
        <span class="eyebrow">Personal Blog</span>
        <h1>写代码，也写生活</h1>
        <p>一名前端工程师的私人笔记，记录工程实践、设计观察与阅读片段。这里没有速成的结论，只有慢慢积累的判断。</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="blog.html">
            查看文章
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a class="btn btn--ghost" href="about.html">关于我</a>
        </div>
        <div class="hero__meta" id="heroStats"></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">精选文章<span>Selected</span></h2>
          <a class="card__more" href="blog.html">查看全部
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
        <div class="card-grid" id="featuredGrid"></div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">最新文章<span>Latest</span></h2>
          <a class="card__more" href="blog.html">全部文章
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
        <div class="post-list" id="latestList"></div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="footer-links">
        <a href="mailto:hi@zhiyuan.dev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <polyline points="3.5 6.5 12 13 20.5 6.5"></polyline>
          </svg>
          hi@zhiyuan.dev
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.51c.53.1.72-.23.72-.5v-1.9c-2.9.63-3.52-1.4-3.52-1.4-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.44 1.14 3.03.87.1-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.17 0-1.14.41-2.07 1.08-2.8-.11-.27-.47-1.33.1-2.77 0 0 .88-.28 2.88 1.07a10 10 0 0 1 5.25 0c2-1.35 2.88-1.07 2.88-1.07.57 1.44.21 2.5.1 2.77.67.73 1.08 1.66 1.08 2.8 0 4.02-2.45 4.9-4.78 5.16.37.32.71.96.71 1.94v2.87c0 .27.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"></path>
          </svg>
          GitHub
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 5.9c-.7.3-1.5.5-2.4.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.5 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.7 2.1 2.9 3.9 3 1.4 1.1 3.2 1.6 5.1 1.6 6.1 0 9.5-5.1 9.3-9.6.7-.5 1.3-1.1 1.7-1.8z"></path>
          </svg>
          Twitter
        </a>
      </div>
      <p class="site-footer__copy">© 2025 N.LOGO · 保留所有权利</p>
    </div>
  </footer>

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>

```

```text
file=post.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>文章详情 · 知远手记</title>
  <meta name="description" content="文章正文阅读页，包含自动生成的目录与上下篇导航。">
  <link rel="stylesheet" href="style.css">
</head>
<body data-page="blog">
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="logo" href="index.html">
        <span class="logo__mark" aria-hidden="true">N</span>
        <span>N.LOGO</span>
      </a>
      <button class="nav__toggle" id="navToggle" type="button" aria-label="展开导航菜单" aria-expanded="false" aria-controls="siteNav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7"></line>
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="17" x2="20" y2="17"></line>
        </svg>
      </button>
      <nav class="nav" id="siteNav" aria-label="主导航">
        <a class="nav__link" data-nav="home" href="index.html">首页</a>
        <a class="nav__link" data-nav="blog" href="blog.html">文章</a>
        <a class="nav__link" data-nav="about" href="about.html">关于我</a>
      </nav>
    </div>
  </header>

  <main>
    <div class="container">
      <a class="post-back" href="blog.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        全部文章
      </a>
    </div>

    <article>
      <div class="container">
        <header class="post-header" id="postHeader"></header>
      </div>

      <div class="container">
        <div class="empty empty--post is-visible" id="postMissing">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 13h4l2 3h6l2-3h4"></path>
            <path d="M5 5h14l2 8v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z"></path>
          </svg>
          <h3>文章不存在或已被移除</h3>
          <p>你访问的链接可能已经失效，或者文章已被删除。可以回到列表看看其他内容。</p>
          <a class="btn btn--primary" href="blog.html">返回文章列表</a>
        </div>
      </div>

      <div class="container">
        <div class="post-layout" id="postLayout">
          <div class="post-body" id="postContent"></div>
          <aside class="toc" id="postToc" aria-label="文章目录"></aside>
        </div>
      </div>
    </article>

    <div class="container">
      <nav class="post-nav" id="postNav" aria-label="上下篇文章"></nav>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="footer-links">
        <a href="mailto:hi@zhiyuan.dev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <polyline points="3.5 6.5 12 13 20.5 6.5"></polyline>
          </svg>
          hi@zhiyuan.dev
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.51c.53.1.72-.23.72-.5v-1.9c-2.9.63-3.52-1.4-3.52-1.4-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.44 1.14 3.03.87.1-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.17 0-1.14.41-2.07 1.08-2.8-.11-.27-.47-1.33.1-2.77 0 0 .88-.28 2.88 1.07a10 10 0 0 1 5.25 0c2-1.35 2.88-1.07 2.88-1.07.57 1.44.21 2.5.1 2.77.67.73 1.08 1.66 1.08 2.8 0 4.02-2.45 4.9-4.78 5.16.37.32.71.96.71 1.94v2.87c0 .27.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"></path>
          </svg>
          GitHub
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 5.9c-.7.3-1.5.5-2.4.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.5 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.7 2.1 2.9 3.9 3 1.4 1.1 3.2 1.6 5.1 1.6 6.1 0 9.5-5.1 9.3-9.6.7-.5 1.3-1.1 1.7-1.8z"></path>
          </svg>
          Twitter
        </a>
      </div>
      <p class="site-footer__copy">© 2025 N.LOGO · 保留所有权利</p>
    </div>
  </footer>

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>

```

```text
file=style.css
:root {
  --color-primary: #1b2a4a;
  --color-primary-soft: #2f4472;
  --color-primary-tint: #eef1f7;
  --color-text: #1a1d24;
  --color-text-secondary: #4d5563;
  --color-text-muted: #7c8598;
  --color-bg: #ffffff;
  --color-bg-soft: #f7f8fa;
  --color-border: #e4e7ec;
  --color-border-strong: #cfd4dd;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 72px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-pill: 999px;
  --shadow-sm: 0 1px 2px rgba(16, 24, 40, 0.04);
  --shadow-md: 0 6px 20px rgba(16, 24, 40, 0.07);
  --shadow-lg: 0 14px 40px rgba(16, 24, 40, 0.1);
  --container: 1080px;
  --content-width: 720px;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  --transition: 180ms ease;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 96px;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.75;
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

img,
svg {
  max-width: 100%;
  display: block;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition);
}

a:hover {
  color: var(--color-primary-soft);
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: 4px;
}

h1, h2, h3, h4 {
  line-height: 1.35;
  color: var(--color-text);
  margin: 0 0 var(--space-md);
  font-weight: 650;
  letter-spacing: -0.01em;
}

p {
  margin: 0 0 var(--space-md);
}

.container {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.container--narrow {
  max-width: 840px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* ---------- 导航 ---------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  gap: var(--space-md);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0.06em;
  color: var(--color-primary);
}

.logo:hover {
  color: var(--color-primary);
}

.logo__mark {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.nav__link {
  position: relative;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-size: 15px;
  color: var(--color-text-secondary);
  transition: color var(--transition), background-color var(--transition);
}

.nav__link:hover {
  color: var(--color-primary);
  background: var(--color-primary-tint);
}

.nav__link.is-active {
  color: var(--color-primary);
  font-weight: 600;
  background: var(--color-primary-tint);
}

.nav__toggle {
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  cursor: pointer;
  transition: border-color var(--transition), background-color var(--transition);
}

.nav__toggle:hover {
  background: var(--color-primary-tint);
  border-color: var(--color-border-strong);
}

.nav__toggle svg {
  width: 20px;
  height: 20px;
}

/* ---------- 通用区块 ---------- */
.section {
  padding: var(--space-3xl) 0;
}

.section--soft {
  background: var(--color-bg-soft);
}

.section__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.section__title {
  font-size: 24px;
  margin: 0;
}

.section__title span {
  color: var(--color-text-muted);
  font-weight: 400;
  font-size: 15px;
  margin-left: var(--space-sm);
}

.eyebrow {
  display: inline-block;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.page-header {
  padding: var(--space-3xl) 0 var(--space-xl);
  border-bottom: 1px solid var(--color-border);
}

.page-header h1 {
  font-size: 34px;
  margin-bottom: var(--space-sm);
}

.page-header p {
  color: var(--color-text-secondary);
  max-width: 640px;
  margin: 0;
}

/* ---------- 按钮 ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 11px 22px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color var(--transition), color var(--transition), border-color var(--transition), transform var(--transition);
}

.btn--primary {
  background: var(--color-primary);
  color: #fff;
}

.btn--primary:hover {
  background: var(--color-primary-soft);
  color: #fff;
  transform: translateY(-1px);
}

.btn--ghost {
  background: transparent;
  border-color: var(--color-border-strong);
  color: var(--color-primary);
}

.btn--ghost:hover {
  background: var(--color-primary-tint);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn svg {
  width: 16px;
  height: 16px;
}

/* ---------- Hero ---------- */
.hero {
  padding: var(--space-3xl) 0 var(--space-3xl);
  background:
    radial-gradient(circle at 78% 18%, var(--color-primary-tint) 0%, rgba(238, 241, 247, 0) 55%),
    var(--color-bg);
}

.hero__inner {
  max-width: 760px;
}

.hero h1 {
  font-size: clamp(34px, 6vw, 52px);
  margin-bottom: var(--space-md);
}

.hero p {
  font-size: 18px;
  color: var(--color-text-secondary);
  max-width: 560px;
  margin-bottom: var(--space-xl);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  margin-top: var(--space-3xl);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text-muted);
}

.hero__meta strong {
  display: block;
  font-size: 22px;
  color: var(--color-primary);
  font-weight: 650;
}

/* ---------- 卡片 ---------- */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
}

.card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.card__category {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  background: var(--color-primary-tint);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
}

.card h3 {
  font-size: 19px;
  margin-bottom: var(--space-sm);
}

.card h3 a {
  color: var(--color-text);
}

.card h3 a:hover {
  color: var(--color-primary);
}

.card__excerpt {
  color: var(--color-text-secondary);
  font-size: 15px;
  margin-bottom: var(--space-lg);
  flex: 1;
}

.card__more {
  font-size: 14px;
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.card__more svg {
  width: 14px;
  height: 14px;
  transition: transform var(--transition);
}

.card:hover .card__more svg {
  transform: translateX(3px);
}

/* ---------- 最新文章列表 ---------- */
.post-list {
  border-top: 1px solid var(--color-border);
}

.post-list__item {
  display: grid;
  grid-template-columns: 180px 1fr 20px;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  transition: background-color var(--transition);
}

.post-list__meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-width: 0;
}

.post-list__item:hover {
  background: var(--color-bg-soft);
  color: var(--color-text);
}

.post-list__date {
  font-size: 14px;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.post-list__title {
  font-size: 16px;
  font-weight: 550;
}

.post-list__arrow {
  color: var(--color-text-muted);
  transition: transform var(--transition), color var(--transition);
}

.post-list__item:hover .post-list__arrow {
  color: var(--color-primary);
  transform: translateX(3px);
}

.post-list__arrow svg {
  width: 16px;
  height: 16px;
}

/* ---------- 工具栏 / 筛选 ---------- */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
}

.search {
  position: relative;
  flex: 1 1 320px;
  max-width: 460px;
}

.search input {
  width: 100%;
  padding: 11px 40px 11px 40px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-family: inherit;
  color: var(--color-text);
  background: var(--color-bg);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.search input::placeholder {
  color: var(--color-text-muted);
}

.search input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(27, 42, 74, 0.12);
}

.search__icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search__clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  display: none;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: var(--color-bg-soft);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.search__clear.is-visible {
  display: inline-flex;
}

.search__clear:hover {
  background: var(--color-primary-tint);
  color: var(--color-primary);
}

.search__clear svg {
  width: 13px;
  height: 13px;
}

.result-count {
  font-size: 14px;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  padding-bottom: var(--space-xl);
}

.filter {
  padding: 7px 16px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition);
}

.filter:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-tint);
}

.filter.is-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

/* ---------- 空状态 ---------- */
.empty {
  display: none;
  text-align: center;
  padding: var(--space-3xl) var(--space-lg);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
  background: var(--color-bg-soft);
}

.empty.is-visible {
  display: block;
}

.empty--post {
  margin-top: var(--space-2xl);
}

.empty svg {
  width: 40px;
  height: 40px;
  margin: 0 auto var(--space-md);
  color: var(--color-text-muted);
}

.empty h3 {
  font-size: 18px;
  margin-bottom: var(--space-sm);
}

.empty p {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
}

/* ---------- 文章详情 ---------- */
.post-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--color-text-secondary);
  padding: var(--space-lg) 0 0;
}

.post-back:hover {
  color: var(--color-primary);
}

.post-back svg {
  width: 15px;
  height: 15px;
}

.post-header {
  padding: var(--space-xl) 0 var(--space-xl);
  border-bottom: 1px solid var(--color-border);
}

.post-header__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.post-header__meta .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-border-strong);
}

.post-header h1 {
  font-size: clamp(28px, 4.5vw, 40px);
  margin-bottom: var(--space-md);
}

.post-header__excerpt {
  font-size: 18px;
  color: var(--color-text-secondary);
  max-width: var(--content-width);
  margin: 0;
}

.post-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: var(--space-2xl);
  padding: var(--space-2xl) 0;
  align-items: start;
}

.post-body {
  max-width: var(--content-width);
  font-size: 17px;
  color: var(--color-text-secondary);
}

.post-body h2 {
  font-size: 24px;
  color: var(--color-text);
  margin: var(--space-2xl) 0 var(--space-md);
  padding-top: var(--space-sm);
}

.post-body h2:first-child {
  margin-top: 0;
}

.post-body h3 {
  font-size: 19px;
  color: var(--color-text);
  margin: var(--space-xl) 0 var(--space-sm);
}

.post-body ul {
  margin: 0 0 var(--space-lg);
  padding-left: 1.2em;
}

.post-body li {
  margin-bottom: var(--space-sm);
}

.post-body pre {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0 0 var(--space-lg);
}

.post-body code {
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.toc {
  position: sticky;
  top: 96px;
  border-left: 1px solid var(--color-border);
  padding-left: var(--space-md);
}

.toc__title {
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.toc__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc__list a {
  display: block;
  padding: 5px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  border-left: 2px solid transparent;
  margin-left: -1px;
  padding-left: var(--space-md);
  transition: color var(--transition), border-color var(--transition);
}

.toc__list a:hover {
  color: var(--color-primary);
  border-left-color: var(--color-border-strong);
}

.toc__list a.is-active {
  color: var(--color-primary);
  font-weight: 600;
  border-left-color: var(--color-primary);
}

.toc__list .toc__sub a {
  font-size: 13px;
  padding-left: var(--space-xl);
  color: var(--color-text-muted);
}

/* 上一篇 / 下一篇 */
.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  padding: var(--space-xl) 0 var(--space-3xl);
  border-top: 1px solid var(--color-border);
}

.post-nav__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.post-nav__item:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.post-nav__item--next {
  text-align: right;
}

.post-nav__label {
  font-size: 13px;
  color: var(--color-text-muted);
  display: block;
  margin-bottom: var(--space-sm);
}

.post-nav__title {
  font-size: 16px;
  font-weight: 550;
  color: var(--color-text);
}

.post-nav__item:hover .post-nav__title {
  color: var(--color-primary);
}

.post-nav__empty {
  opacity: 0.5;
  font-size: 15px;
  color: var(--color-text-muted);
}

/* ---------- 关于我 ---------- */
.profile {
  display: flex;
  gap: var(--space-xl);
  align-items: center;
  padding: var(--space-3xl) 0;
  flex-wrap: wrap;
}

.avatar {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.profile__info h1 {
  font-size: 32px;
  margin-bottom: var(--space-xs);
}

.profile__role {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

.profile__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  font-size: 14px;
}

.profile__links a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-secondary);
}

.profile__links a:hover {
  color: var(--color-primary);
}

.profile__links svg {
  width: 15px;
  height: 15px;
}

.about-block {
  padding: var(--space-2xl) 0;
  border-top: 1px solid var(--color-border);
}

.about-block h2 {
  font-size: 22px;
  margin-bottom: var(--space-lg);
}

.about-block p {
  color: var(--color-text-secondary);
  max-width: 720px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.skill {
  padding: 7px 15px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background: var(--color-bg-soft);
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: border-color var(--transition), color var(--transition);
}

.skill:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.timeline {
  position: relative;
  margin: 0;
  padding-left: var(--space-xl);
  list-style: none;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: var(--color-border-strong);
}

.timeline__item {
  position: relative;
  padding-bottom: var(--space-xl);
}

.timeline__item:last-child {
  padding-bottom: 0;
}

.timeline__item::before {
  content: "";
  position: absolute;
  left: calc(-1 * var(--space-xl) - 1px);
  top: 9px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-primary);
}

.timeline__year {
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.timeline__role {
  font-size: 17px;
  font-weight: 600;
  margin: 2px 0 var(--space-sm);
}

.timeline__desc {
  color: var(--color-text-secondary);
  font-size: 15px;
  margin: 0;
  max-width: 640px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.contact {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.contact:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.contact svg {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.contact__label {
  font-size: 13px;
  color: var(--color-text-muted);
}

.contact__value {
  font-size: 15px;
  color: var(--color-text);
}

/* ---------- 页脚 ---------- */
.site-footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-soft);
  padding: var(--space-2xl) 0;
}

.site-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  font-size: 14px;
}

.footer-links a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-secondary);
}

.footer-links a:hover {
  color: var(--color-primary);
}

.footer-links svg {
  width: 16px;
  height: 16px;
}

.site-footer__copy {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
}

/* ---------- 响应式 ---------- */
@media (max-width: 900px) {
  .post-layout {
    grid-template-columns: 1fr;
  }

  .toc {
    position: static;
    border-left: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    background: var(--color-bg-soft);
  }

  .toc__list a {
    padding-left: var(--space-md);
  }

  .toc__list .toc__sub a {
    padding-left: var(--space-xl);
  }
}

@media (max-width: 768px) {
  .nav__toggle {
    display: inline-flex;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
    padding: var(--space-md) var(--space-lg);
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
    display: none;
  }

  .nav.is-open {
    display: flex;
  }

  .nav__link {
    padding: 12px 14px;
    border-radius: var(--radius-sm);
  }

  .section {
    padding: var(--space-2xl) 0;
  }

  .page-header {
    padding: var(--space-2xl) 0 var(--space-lg);
  }

  .page-header h1 {
    font-size: 28px;
  }

  .hero {
    padding: var(--space-2xl) 0;
  }

  .hero__meta {
    margin-top: var(--space-2xl);
  }

  .card-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .post-list__item {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "meta arrow"
      "title title";
    gap: var(--space-sm) var(--space-md);
    padding: var(--space-md) 0;
  }

  .post-list__meta { grid-area: meta; }
  .post-list__title { grid-area: title; }
  .post-list__arrow { grid-area: arrow; }

  .post-nav {
    grid-template-columns: 1fr;
  }

  .post-nav__item--next {
    text-align: left;
  }

  .profile {
    text-align: center;
    justify-content: center;
    flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-2xl) 0;
  }

  .profile__links {
    justify-content: center;
  }

  .post-body {
    font-size: 16px;
  }

  .post-header h1 {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 var(--space-md);
  }

  .hero__actions .btn {
    width: 100%;
    justify-content: center;
  }

  .site-footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

```