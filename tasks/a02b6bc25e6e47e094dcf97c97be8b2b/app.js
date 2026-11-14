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
