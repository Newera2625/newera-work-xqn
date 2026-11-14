/* ============ Lin Notes · 公共脚本 ============ */
(function () {
  'use strict';

  var STORAGE_KEY = 'linnotes-theme';

  /* ---------- 主题 ---------- */
  function getPreferredTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) { /* 忽略隐私模式下的存储异常 */ }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
      buttons[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  function initTheme() {
    applyTheme(getPreferredTheme());
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* noop */ }
      });
    }
  }

  /* ---------- 移动端菜单 ---------- */
  function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var panel = document.getElementById('mobile-nav');
    if (!toggle || !panel) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    var links = panel.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () { setOpen(false); });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 640) setOpen(false);
    });
  }

  /* ---------- 工具函数 ---------- */
  function formatDate(iso) {
    var parts = String(iso).split('-');
    if (parts.length !== 3) return iso;
    return parts[0] + '年' + Number(parts[1]) + '月' + Number(parts[2]) + '日';
  }

  function icon(name, extraClass) {
    var paths = {
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
      github: '<path d="M9 19c-4.3 1.4-4.3-2.2-6-2.7m12 5v-3.6c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.7 3 5.7 3.3 5.7 3.3a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.3 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
      link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
      rss: '<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.6"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
      layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
      spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>'
    };
    return '<svg class="' + (extraClass || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || '') + '</svg>';
  }

  function articleCard(article, extraClass) {
    var href = 'article.html?id=' + encodeURIComponent(article.slug);
    return '' +
      '<article class="card ' + (extraClass || '') + '">' +
        '<div class="card__meta">' +
          '<span class="cat">' + escapeHtml(article.category) + '</span>' +
          '<span class="dot" aria-hidden="true"></span>' +
          '<span>' + formatDate(article.date) + '</span>' +
        '</div>' +
        '<h3 class="card__title"><a href="' + href + '">' + escapeHtml(article.title) + '</a></h3>' +
        '<p class="card__summary">' + escapeHtml(article.summary) + '</p>' +
        '<div class="card__foot">' +
          '<div class="card__tags">' +
            article.tags.map(function (t) { return '<span class="tag tag--plain">' + escapeHtml(t) + '</span>'; }).join('') +
          '</div>' +
          '<div class="card__foot-right">' +
            '<span class="card__read">' + article.readTime + ' 分钟阅读</span>' +
            '<span class="card__more" aria-hidden="true">阅读全文 ' + icon('arrow') + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* ---------- 首页 ---------- */
  function initHome() {
    var latestWrap = document.getElementById('latest-grid');
    if (latestWrap && window.ARTICLES) {
      var latest = window.ARTICLES.slice(0, 3);
      latestWrap.innerHTML = latest.map(function (a) { return articleCard(a); }).join('');
    }

    var featuredWrap = document.getElementById('featured-wrap');
    if (featuredWrap && window.ARTICLES) {
      var featured = window.ARTICLES.filter(function (a) { return a.featured; })[0] || window.ARTICLES[0];
      featuredWrap.innerHTML = '' +
        '<div class="feature">' +
          '<div>' +
            '<span class="eyebrow">精选文章</span>' +
            '<h3 class="feature__title">' + escapeHtml(featured.title) + '</h3>' +
            '<p class="feature__summary">' + escapeHtml(featured.summary) + '</p>' +
            '<p class="feature__link">' +
              '<a class="link-more" href="article.html?id=' + encodeURIComponent(featured.slug) + '">阅读全文 ' + icon('arrow') + '</a>' +
            '</p>' +
          '</div>' +
          '<div class="feature__visual" aria-hidden="true">' + icon('layers') + '</div>' +
        '</div>';
    }
  }

  /* ---------- 列表页 ---------- */
  function initArticles() {
    var grid = document.getElementById('article-grid');
    if (!grid || !window.ARTICLES) return;

    var filterWrap = document.getElementById('filters');
    var searchInput = document.getElementById('search-input');
    var emptyState = document.getElementById('empty-state');
    var countEl = document.getElementById('result-count');
    if (!filterWrap) return;
    var activeCategory = '全部';
    var keyword = '';

    var categories = ['全部'];
    window.ARTICLES.forEach(function (a) {
      if (categories.indexOf(a.category) === -1) categories.push(a.category);
    });

    filterWrap.innerHTML = categories.map(function (c, i) {
      return '<button type="button" class="filter-btn' + (i === 0 ? ' is-active' : '') + '" data-category="' + c + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + c + '</button>';
    }).join('');

    var buttons = filterWrap.querySelectorAll('.filter-btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        var btn = e.currentTarget;
        activeCategory = btn.getAttribute('data-category');
        for (var j = 0; j < buttons.length; j++) {
          var on = buttons[j] === btn;
          buttons[j].classList.toggle('is-active', on);
          buttons[j].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        render();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        keyword = e.target.value.trim().toLowerCase();
        render();
      });
    }

    var clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        activeCategory = '全部';
        keyword = '';
        if (searchInput) searchInput.value = '';
        for (var j = 0; j < buttons.length; j++) {
          var on = buttons[j].getAttribute('data-category') === '全部';
          buttons[j].classList.toggle('is-active', on);
          buttons[j].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        render();
        if (searchInput) searchInput.focus();
      });
    }

    function match(article) {
      if (activeCategory !== '全部' && article.category !== activeCategory) return false;
      if (!keyword) return true;
      var haystack = [article.title, article.summary, article.category]
        .concat(article.tags)
        .join(' ')
        .toLowerCase();
      return haystack.indexOf(keyword) !== -1;
    }

    function render() {
      var list = window.ARTICLES.filter(match);
      grid.innerHTML = list.map(function (a) { return articleCard(a); }).join('');
      grid.hidden = list.length === 0;
      if (emptyState) emptyState.hidden = list.length !== 0;
      if (countEl) {
        countEl.textContent = list.length === window.ARTICLES.length
          ? '共 ' + list.length + ' 篇文章'
          : '筛选出 ' + list.length + ' 篇文章';
      }
    }

    render();
  }

  /* ---------- 详情页 ---------- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* 行内代码：用反引号包裹的片段渲染为 <code> */
  function inlineMarkup(text) {
    return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function renderBlocks(sections) {
    var html = '';
    sections.forEach(function (section) {
      html += '<section id="' + escapeHtml(section.id) + '">';
      html += '<h2>' + escapeHtml(section.title) + '</h2>';
      section.blocks.forEach(function (b) {
        if (b.type === 'p') {
          html += '<p>' + inlineMarkup(b.text) + '</p>';
        } else if (b.type === 'ul') {
          html += '<ul>' + b.items.map(function (i) { return '<li>' + inlineMarkup(i) + '</li>'; }).join('') + '</ul>';
        } else if (b.type === 'ol') {
          html += '<ol>' + b.items.map(function (i) { return '<li>' + inlineMarkup(i) + '</li>'; }).join('') + '</ol>';
        } else if (b.type === 'quote') {
          html += '<blockquote><p>' + inlineMarkup(b.text) + '</p></blockquote>';
        } else if (b.type === 'code') {
          html += '<pre><code>' + escapeHtml(b.text) + '</code></pre>';
        }
      });
      html += '</section>';
    });
    return html;
  }

  function initArticle() {
    var root = document.getElementById('article-root');
    if (!root || !window.ARTICLES) return;

    var slug = new URLSearchParams(window.location.search).get('id');
    var index = -1;
    window.ARTICLES.forEach(function (a, i) { if (a.slug === slug) index = i; });

    if (index === -1) {
      var notice = document.getElementById('article-notice');
      if (notice) {
        notice.hidden = false;
        notice.querySelector('[data-notice-text]').textContent = slug
          ? '没有找到标识为「' + slug + '」的文章，它可能已被移除或链接有误。'
          : '缺少文章标识参数，无法定位到具体文章。';
      }
      return;
    }

    var article = window.ARTICLES[index];
    var layout = document.getElementById('article-layout');
    if (layout) layout.hidden = false;
    var head = document.getElementById('article-head');
    if (head) {
      head.hidden = false;
      head.innerHTML = '' +
        '<div class="article-head__meta">' +
          '<span class="cat">' + escapeHtml(article.category) + '</span>' +
          '<span class="sep" aria-hidden="true">·</span>' +
          '<span>' + formatDate(article.date) + '</span>' +
          '<span class="sep" aria-hidden="true">·</span>' +
          '<span>' + article.readTime + ' 分钟阅读</span>' +
          '<span class="sep" aria-hidden="true">·</span>' +
          '<span>' + escapeHtml(window.SITE ? window.SITE.author.name : '') + '</span>' +
        '</div>' +
        '<h1 class="article-head__title">' + escapeHtml(article.title) + '</h1>' +
        '<div class="article-head__tags">' +
          article.tags.map(function (t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join('') +
        '</div>';
    }

    var toc = document.getElementById('toc-list');
    if (toc) {
      toc.innerHTML = article.sections.map(function (s) {
        return '<li><a class="toc__link" href="#' + encodeURIComponent(s.id) + '" data-toc="' + encodeURIComponent(s.id) + '">' + escapeHtml(s.title) + '</a></li>';
      }).join('');
    }

    var prose = document.getElementById('article-prose');
    if (prose) prose.innerHTML = renderBlocks(article.sections);

    var author = window.SITE ? window.SITE.author : null;
    var authorCard = document.getElementById('author-card');
    if (authorCard && author) {
      authorCard.innerHTML = '' +
        '<img class="author-card__avatar" src="assets/avatar.svg" alt="作者头像" width="64" height="64">' +
        '<div>' +
          '<div class="author-card__name">' + escapeHtml(author.name) + '</div>' +
          '<p class="author-card__bio">' + escapeHtml(author.role) + ' · ' + escapeHtml(author.location) + '</p>' +
          '<p class="author-card__link"><a class="link-more" href="about.html">前往关于我 ' + icon('arrow') + '</a></p>' +
        '</div>';
    }

    var prev = window.ARTICLES[index - 1];
    var next = window.ARTICLES[index + 1];
    var pn = document.getElementById('prev-next');
    pn.innerHTML = '' +
      (prev
        ? '<a class="pn-card" href="article.html?id=' + encodeURIComponent(prev.slug) + '">' +
            '<span class="pn-card__label">' + icon('arrowLeft') + '上一篇</span>' +
            '<div class="pn-card__title">' + escapeHtml(prev.title) + '</div>' +
          '</a>'
        : '<div class="pn-card pn-card--placeholder"><span class="pn-card__label">已经是第一篇</span><div class="pn-card__title">—</div></div>') +
      (next
        ? '<a class="pn-card pn-card--next" href="article.html?id=' + encodeURIComponent(next.slug) + '">' +
            '<span class="pn-card__label">下一篇' + icon('arrow') + '</span>' +
            '<div class="pn-card__title">' + escapeHtml(next.title) + '</div>' +
          '</a>'
        : '<div class="pn-card pn-card--next pn-card--placeholder"><span class="pn-card__label">已经是最后一篇</span><div class="pn-card__title">—</div></div>');

    document.title = article.title + ' · ' + (window.SITE ? window.SITE.name : '');

    /* 目录高亮 */
    var links = toc.querySelectorAll('.toc__link');
    var headings = article.sections.map(function (s) { return document.getElementById(s.id); }).filter(Boolean);

    function updateActive() {
      var offset = (window.innerWidth <= 960 ? 120 : 140);
      var activeId = headings.length ? headings[0].id : '';
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top - offset <= 0) activeId = headings[i].id;
      }
      for (var j = 0; j < links.length; j++) {
        links[j].classList.toggle('is-active', links[j].getAttribute('data-toc') === activeId);
      }
    }

    /* 目录点击平滑滚动 */
    for (var k = 0; k < links.length; k++) {
      links[k].addEventListener('click', function (e) {
        var id = e.currentTarget.getAttribute('data-toc');
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset -
          (document.querySelector('.site-header').offsetHeight + 24);
        window.scrollTo({ top: top, behavior: 'smooth' });
        try { history.replaceState(null, '', '#' + id); } catch (err) { /* 本地文件协议下可能不支持，忽略 */ }
      });
    }

    /* 阅读进度条 */
    var bar = document.getElementById('progress');
    function updateProgress() {
      var doc = document.documentElement;
      var total = doc.scrollHeight - window.innerHeight;
      var pct = total > 0 ? (window.pageYOffset / total) * 100 : 0;
      if (pct < 0) pct = 0;
      if (pct > 100) pct = 100;
      bar.style.width = pct.toFixed(2) + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
      updateActive();
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  /* ---------- 关于页 ---------- */
  function initAbout() {
    var author = window.SITE ? window.SITE.author : null;
    if (!author) return;

    var hero = document.getElementById('about-hero');
    if (!hero) return;
    hero.innerHTML = '' +
      '<img class="about-hero__avatar" src="assets/avatar.svg" alt="作者头像：' + author.name + '" width="200" height="200">' +
      '<div>' +
        '<h1 class="about-hero__title">关于我</h1>' +
        '<p class="about-hero__meta">' + author.location + ' · ' + author.role + '</p>' +
        '<p class="about-hero__motto">「' + escapeHtml(author.motto) + '」</p>' +
        '<div>' +
          author.bio.map(function (p, i) {
            var safe = escapeHtml(p);
            if (i === 0) {
              safe = safe.replace(/我是一名/g, '<strong>我是一名</strong>').replace(/日常喜欢/g, '<strong>日常喜欢</strong>');
            } else {
              safe = safe.replace(/这个博客是我的一部分/g, '<strong>这个博客是我的一部分</strong>');
            }
            return '<p class="about-hero__bio">' + safe + '</p>';
          }).join('') +
        '</div>' +
      '</div>';

    var contacts = document.getElementById('contact-list');
    if (!contacts) return;
    var items = [
      { label: author.email, href: 'mailto:' + author.email, icon: 'mail' }
    ].concat(author.links || []);
    contacts.innerHTML = items.map(function (c) {
      var external = c.href.indexOf('http') === 0;
      return '<li><a class="contact-item" href="' + escapeHtml(c.href) + '"' +
        (external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
        icon(c.icon) + '<span>' + escapeHtml(c.label) + '</span></a></li>';
    }).join('');

    var year = document.getElementById('footer-year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------- 启动 ---------- */
  function boot() {
    var tasks = [
      ['主题', initTheme],
      ['移动端菜单', initMobileNav],
      ['首页', initHome],
      ['文章列表', initArticles],
      ['文章详情', initArticle],
      ['关于页', initAbout]
    ];
    tasks.forEach(function (task) {
      try {
        task[1]();
      } catch (err) {
        if (window.console && console.error) {
          console.error('[LinNotes] ' + task[0] + '模块初始化失败：', err);
        }
      }
    });
    var y = document.getElementById('footer-year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.LinNotes = {
    formatDate: formatDate,
    icon: icon,
    articleCard: articleCard
  };
})();
