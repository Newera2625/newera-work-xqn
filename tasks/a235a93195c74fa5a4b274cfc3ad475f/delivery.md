```text
file=about.html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>关于我 · Lin Notes</title>
<meta name="description" content="关于 Lin Notes 的作者：简介、技能、经历与联系方式。">
<link rel="stylesheet" href="css/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%232f4bff'/%3E%3Cpath d='M8 24h16M12 19V9M17 19V6M22 19v-8' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E">
</head>
<body>
<a class="skip-link" href="#main">跳到主要内容</a>

<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
      </span>
      <span class="brand__text">Lin Notes<small>记录工程实践与设计思考</small></span>
    </a>

    <nav class="site-nav" aria-label="主导航">
      <ul class="site-nav__list">
        <li><a class="site-nav__link" href="index.html">首页</a></li>
        <li><a class="site-nav__link" href="articles.html">文章</a></li>
        <li><a class="site-nav__link is-active" href="about.html" aria-current="page">关于</a></li>
      </ul>
    </nav>

    <div class="header-actions">
      <button class="icon-btn" type="button" data-theme-toggle aria-label="切换主题" aria-pressed="false">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
      <button class="icon-btn nav-toggle" type="button" data-nav-toggle aria-label="打开菜单" aria-expanded="false" aria-controls="mobile-nav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>

  <div class="mobile-nav" id="mobile-nav">
    <div class="container">
      <ul>
        <li><a href="index.html">首页</a></li>
        <li><a href="articles.html">文章</a></li>
        <li><a class="is-active" href="about.html" aria-current="page">关于</a></li>
      </ul>
    </div>
  </div>
</header>

<main id="main">
  <div class="container">
    <section class="about-hero" id="about-hero"></section>
  </div>

  <section class="section section--alt">
    <div class="container">
      <div class="section__head">
        <div>
          <span class="eyebrow">技能</span>
          <h2 class="section__title">我的技能</h2>
          <p class="section__desc">工具只是手段，真正决定质量的是对问题的拆解方式。</p>
        </div>
      </div>

      <div class="skill-group">
        <h3 class="skill-group__label">前端</h3>
        <div class="skill-tags">
          <span class="tag">HTML / 语义化</span>
          <span class="tag">CSS / 架构</span>
          <span class="tag">JavaScript / ES2023</span>
          <span class="tag">TypeScript</span>
          <span class="tag">React</span>
          <span class="tag">响应式布局</span>
          <span class="tag">Web 性能</span>
        </div>
      </div>
      <div class="skill-group">
        <h3 class="skill-group__label">工程</h3>
        <div class="skill-tags">
          <span class="tag">构建工具</span>
          <span class="tag">设计系统</span>
          <span class="tag">CI / CD</span>
          <span class="tag">单元测试</span>
          <span class="tag">可访问性</span>
          <span class="tag">Git 工作流</span>
        </div>
      </div>
      <div class="skill-group">
        <h3 class="skill-group__label">设计</h3>
        <div class="skill-tags">
          <span class="tag">界面设计</span>
          <span class="tag">设计令牌</span>
          <span class="tag">排版与网格</span>
          <span class="tag">交互原型</span>
          <span class="tag">Figma</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <span class="eyebrow">经历</span>
          <h2 class="section__title">时间线</h2>
          <p class="section__desc">从实习到独立负责，走过的每一步都留下了痕迹。</p>
        </div>
      </div>

      <div class="timeline">
        <div class="timeline__item">
          <div class="timeline__period">2023 — 至今</div>
          <div class="timeline__role">高级前端工程师</div>
          <div class="timeline__company">云栖科技 · 体验基础架构组</div>
          <p class="timeline__desc">主导跨端设计系统建设，把分散在多个产品线的组件统一到同一套令牌与规范上；搭建前端发布流水线，将主干发布耗时从 40 分钟压缩到 12 分钟。</p>
        </div>
        <div class="timeline__item">
          <div class="timeline__period">2020 — 2023</div>
          <div class="timeline__role">前端工程师</div>
          <div class="timeline__company">明川互动 · 产品研发部</div>
          <p class="timeline__desc">负责中后台产品的前端实现与性能优化，主导列表页虚拟滚动与增量渲染方案；同时参与设计评审，推动组件库在视觉与交互上收敛。</p>
        </div>
        <div class="timeline__item">
          <div class="timeline__period">2018 — 2020</div>
          <div class="timeline__role">前端开发实习生</div>
          <div class="timeline__company">白塔工作室 · 数字产品组</div>
          <p class="timeline__desc">从切图与静态页做起，学会了把设计稿的每一处间距还原到位；也开始写下第一篇工程笔记，从此保持写作的习惯。</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section__head">
        <div>
          <span class="eyebrow">联系</span>
          <h2 class="section__title">联系方式</h2>
          <p class="section__desc">如果文章对你有帮助，或者想聊聊某个话题，欢迎随时联系。</p>
        </div>
      </div>
      <ul class="contact-list" id="contact-list"></ul>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="brand footer__brand">
          <span class="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
          </span>
          <span class="brand__text">Lin Notes</span>
        </div>
        <p class="footer__about">一个关于前端工程、界面设计与独立思考的个人博客。</p>
      </div>
      <div>
        <h3 class="footer__title">导航</h3>
        <ul class="footer__list">
          <li><a href="index.html">首页</a></li>
          <li><a href="articles.html">文章</a></li>
          <li><a href="about.html">关于我</a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer__title">联系方式</h3>
        <ul class="footer__list">
          <li><a href="mailto:hello@linnotes.dev">hello@linnotes.dev</a></li>
          <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.zhihu.com/" target="_blank" rel="noopener noreferrer">知乎</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span id="footer-year">2024</span> Lin Notes. 保留所有权利。</span>
      <span>以简洁为荣，用文字记录。</span>
    </div>
  </div>
</footer>

<script src="js/data.js"></script>
<script src="js/app.js"></script>
</body>
</html>

```

```text
file=article.html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>文章详情 · Lin Notes</title>
<meta name="description" content="Lin Notes 的文章详情页。">
<link rel="stylesheet" href="css/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%232f4bff'/%3E%3Cpath d='M8 24h16M12 19V9M17 19V6M22 19v-8' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E">
</head>
<body>
<a class="skip-link" href="#main">跳到主要内容</a>

<div class="progress" id="progress" role="progressbar" aria-label="阅读进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>

<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
      </span>
      <span class="brand__text">Lin Notes<small>记录工程实践与设计思考</small></span>
    </a>

    <nav class="site-nav" aria-label="主导航">
      <ul class="site-nav__list">
        <li><a class="site-nav__link" href="index.html">首页</a></li>
        <li><a class="site-nav__link is-active" href="articles.html" aria-current="page">文章</a></li>
        <li><a class="site-nav__link" href="about.html">关于</a></li>
      </ul>
    </nav>

    <div class="header-actions">
      <button class="icon-btn" type="button" data-theme-toggle aria-label="切换主题" aria-pressed="false">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
      <button class="icon-btn nav-toggle" type="button" data-nav-toggle aria-label="打开菜单" aria-expanded="false" aria-controls="mobile-nav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>

  <div class="mobile-nav" id="mobile-nav">
    <div class="container">
      <ul>
        <li><a href="index.html">首页</a></li>
        <li><a class="is-active" href="articles.html" aria-current="page">文章</a></li>
        <li><a href="about.html">关于</a></li>
      </ul>
    </div>
  </div>
</header>

<main id="main">
  <div class="container" id="article-root">
    <div class="article-head" id="article-head" hidden></div>

    <div class="notice" id="article-notice" hidden>
      <h1 class="notice__title">文章不存在</h1>
      <p class="notice__text" data-notice-text>没有找到这篇文章，它可能已被移除或链接有误。</p>
      <p class="notice__action">
        <a class="btn btn--primary" href="articles.html">
          返回文章列表
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </p>
    </div>

    <div class="article-layout" id="article-layout" hidden>
      <aside class="toc" aria-label="文章目录">
        <h2 class="toc__title">目录</h2>
        <ul class="toc__list" id="toc-list"></ul>
      </aside>

      <div>
        <article class="prose" id="article-prose"></article>

        <div class="author-card" id="author-card"></div>

        <nav class="prev-next" id="prev-next" aria-label="上一篇与下一篇"></nav>
      </div>
    </div>
  </div>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="brand footer__brand">
          <span class="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
          </span>
          <span class="brand__text">Lin Notes</span>
        </div>
        <p class="footer__about">一个关于前端工程、界面设计与独立思考的个人博客。</p>
      </div>
      <div>
        <h3 class="footer__title">导航</h3>
        <ul class="footer__list">
          <li><a href="index.html">首页</a></li>
          <li><a href="articles.html">文章</a></li>
          <li><a href="about.html">关于我</a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer__title">联系方式</h3>
        <ul class="footer__list">
          <li><a href="mailto:hello@linnotes.dev">hello@linnotes.dev</a></li>
          <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.zhihu.com/" target="_blank" rel="noopener noreferrer">知乎</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span id="footer-year">2024</span> Lin Notes. 保留所有权利。</span>
      <span>以简洁为荣，用文字记录。</span>
    </div>
  </div>
</footer>

<script src="js/data.js"></script>
<script src="js/app.js"></script>
</body>
</html>

```

```text
file=articles.html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>文章 · Lin Notes</title>
<meta name="description" content="Lin Notes 的全部文章：前端工程、界面设计与思考记录。">
<link rel="stylesheet" href="css/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%232f4bff'/%3E%3Cpath d='M8 24h16M12 19V9M17 19V6M22 19v-8' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E">
</head>
<body>
<a class="skip-link" href="#main">跳到主要内容</a>

<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
      </span>
      <span class="brand__text">Lin Notes<small>记录工程实践与设计思考</small></span>
    </a>

    <nav class="site-nav" aria-label="主导航">
      <ul class="site-nav__list">
        <li><a class="site-nav__link" href="index.html">首页</a></li>
        <li><a class="site-nav__link is-active" href="articles.html" aria-current="page">文章</a></li>
        <li><a class="site-nav__link" href="about.html">关于</a></li>
      </ul>
    </nav>

    <div class="header-actions">
      <button class="icon-btn" type="button" data-theme-toggle aria-label="切换主题" aria-pressed="false">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
      <button class="icon-btn nav-toggle" type="button" data-nav-toggle aria-label="打开菜单" aria-expanded="false" aria-controls="mobile-nav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>

  <div class="mobile-nav" id="mobile-nav">
    <div class="container">
      <ul>
        <li><a href="index.html">首页</a></li>
        <li><a class="is-active" href="articles.html" aria-current="page">文章</a></li>
        <li><a href="about.html">关于</a></li>
      </ul>
    </div>
  </div>
</header>

<main id="main">
  <div class="container">
    <section class="page-head">
      <span class="eyebrow">归档</span>
      <h1 class="page-head__title">文章</h1>
      <p class="page-head__desc">全部文章都在这里。可以按分类浏览，也可以直接搜索标题、摘要或标签。</p>
    </section>

    <div class="toolbar">
      <div class="filters" id="filters" role="group" aria-label="按分类筛选"></div>
      <div class="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <label for="search-input" class="sr-only">搜索文章标题或标签</label>
        <input id="search-input" type="search" placeholder="搜索文章标题或标签…" autocomplete="off">
      </div>
    </div>

    <p class="result-count" id="result-count"></p>

    <section class="section section--flush">
      <div class="card-grid" id="article-grid"></div>

      <div class="empty-state" id="empty-state" hidden>
        <svg class="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/><path d="M8.5 11h5"/></svg>
        <h2 class="empty-state__title">没有找到匹配的文章</h2>
        <p class="empty-state__text">换一个关键词试试，或者清除当前筛选条件查看全部文章。</p>
        <button class="btn btn--primary" type="button" id="clear-filters">清除筛选</button>
      </div>
    </section>
  </div>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="brand footer__brand">
          <span class="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
          </span>
          <span class="brand__text">Lin Notes</span>
        </div>
        <p class="footer__about">一个关于前端工程、界面设计与独立思考的个人博客。</p>
      </div>
      <div>
        <h3 class="footer__title">导航</h3>
        <ul class="footer__list">
          <li><a href="index.html">首页</a></li>
          <li><a href="articles.html">文章</a></li>
          <li><a href="about.html">关于我</a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer__title">联系方式</h3>
        <ul class="footer__list">
          <li><a href="mailto:hello@linnotes.dev">hello@linnotes.dev</a></li>
          <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.zhihu.com/" target="_blank" rel="noopener noreferrer">知乎</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span id="footer-year">2024</span> Lin Notes. 保留所有权利。</span>
      <span>以简洁为荣，用文字记录。</span>
    </div>
  </div>
</footer>

<script src="js/data.js"></script>
<script src="js/app.js"></script>
</body>
</html>

```

```text
file=assets/avatar.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320" role="img" aria-label="作者头像">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eef1ff"/>
      <stop offset="100%" stop-color="#dfe4ff"/>
    </linearGradient>
    <clipPath id="round">
      <circle cx="160" cy="160" r="160"/>
    </clipPath>
  </defs>
  <g clip-path="url(#round)">
    <rect width="320" height="320" fill="url(#bg)"/>
    <circle cx="160" cy="132" r="52" fill="#2f4bff" opacity="0.9"/>
    <path d="M52 320c0-59.6 48.4-108 108-108s108 48.4 108 108z" fill="#2f4bff"/>
    <path d="M52 320c0-59.6 48.4-108 108-108s108 48.4 108 108z" fill="#1b31b8" opacity="0.35"/>
    <circle cx="160" cy="132" r="62" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
  </g>
</svg>

```

```text
file=css/style.css
/* ============ Lin Notes · 全局样式 ============ */
:root {
  --color-primary: #2f4bff;
  --color-primary-hover: #2440e0;
  --color-primary-soft: #eef1ff;
  --color-primary-ring: rgba(47, 75, 255, 0.28);

  --color-accent: #6b7ba8;          /* 辅助色：分类标签灰蓝 */

  --color-bg: #ffffff;
  --color-bg-alt: #f7f8fb;
  --color-surface: #ffffff;
  --color-border: #e6e8ef;
  --color-border-strong: #d7dae4;
  --color-text: #14171f;
  --color-text-secondary: #4b5163;
  --color-text-muted: #7c8399;

  --shadow-sm: 0 1px 2px rgba(16, 24, 40, 0.06);
  --shadow-md: 0 4px 16px rgba(16, 24, 40, 0.07);
  --shadow-lg: 0 12px 32px rgba(16, 24, 40, 0.09);

  --radius-sm: 8px;
  --radius: 12px;
  --radius-lg: 18px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
    "Liberation Mono", "Courier New", monospace;

  --container: 1120px;
  --content: 720px;
  --header-h: 68px;
  --transition: 180ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --color-primary: #8ea2ff;
  --color-primary-hover: #a6b5ff;
  --color-primary-soft: rgba(142, 162, 255, 0.14);
  --color-primary-ring: rgba(142, 162, 255, 0.35);

  --color-accent: #9aa6c9;

  --color-bg: #0e1017;
  --color-bg-alt: #12151e;
  --color-surface: #161a24;
  --color-border: #262b38;
  --color-border-strong: #333a4a;
  --color-text: #eceef4;
  --color-text-secondary: #b3b9c9;
  --color-text-muted: #868da0;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.42);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.5);
}

*,
*::before,
*::after { box-sizing: border-box; }

html { scroll-behavior: smooth; scroll-padding-top: calc(var(--header-h) + 20px); }

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}

img, svg { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; }
h1, h2, h3, h4 { line-height: 1.3; margin: 0; font-weight: 700; letter-spacing: -0.01em; }
p { margin: 0; }
ul, ol { margin: 0; padding-left: 1.25em; }

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: 4px;
}

.container {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--color-primary);
  color: #fff;
  padding: 10px 16px;
  border-radius: 0 0 var(--radius-sm) 0;
  z-index: 200;
}
.skip-link:focus { left: 0; }

[hidden] { display: none !important; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ---------------- 头部导航 ---------------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--color-bg) 88%, transparent);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.01em;
}
.brand__mark {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--color-primary);
  display: grid;
  place-items: center;
  color: #fff;
  flex: none;
}
.brand__mark svg { width: 17px; height: 17px; }
.brand__text small {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
  line-height: 1.2;
}

.site-nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}
.site-nav__link {
  display: inline-block;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 14.5px;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: background var(--transition), color var(--transition);
}
.site-nav__link:hover { background: var(--color-bg-alt); color: var(--color-text); }
.site-nav__link:active { transform: translateY(1px); }
.site-nav__link.is-active {
  color: var(--color-primary);
  background: var(--color-primary-soft);
  font-weight: 600;
}

.header-actions { display: flex; align-items: center; gap: var(--space-2); }

.icon-btn {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 10px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background var(--transition), color var(--transition),
    border-color var(--transition), transform var(--transition);
}
.icon-btn:hover { background: var(--color-bg-alt); color: var(--color-primary); border-color: var(--color-border-strong); }
.icon-btn:active { transform: scale(0.94); }
.icon-btn svg { width: 18px; height: 18px; }
.icon-btn .icon-moon { display: none; }
[data-theme="dark"] .icon-btn .icon-moon { display: block; }
[data-theme="dark"] .icon-btn .icon-sun { display: none; }

.nav-toggle { display: none; }

.mobile-nav {
  display: none;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
}
.mobile-nav.is-open { display: block; }
.mobile-nav ul { list-style: none; margin: 0; padding: var(--space-3) 0 var(--space-4); }
.mobile-nav a {
  display: block;
  padding: 11px 4px;
  font-weight: 500;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}
.mobile-nav li:last-child a { border-bottom: none; }
.mobile-nav a:hover { color: var(--color-primary); }
.mobile-nav a.is-active { color: var(--color-primary); font-weight: 600; }

/* ---------------- 通用组件 ---------------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 12px 22px;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition), color var(--transition),
    border-color var(--transition), box-shadow var(--transition), transform var(--transition);
}
.btn svg { width: 16px; height: 16px; }
.btn--primary { background: var(--color-primary); color: #fff; box-shadow: var(--shadow-sm); }
.btn--primary:hover { background: var(--color-primary-hover); box-shadow: var(--shadow-md); }
.btn--primary:active { transform: translateY(1px); }
.btn--ghost { background: var(--color-surface); color: var(--color-text); border-color: var(--color-border-strong); }
.btn--ghost:hover { border-color: var(--color-primary); color: var(--color-primary); }
.btn--ghost:active { transform: translateY(1px); }

.section { padding: var(--space-16) 0; }
.section--alt { background: var(--color-bg-alt); }
.section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
}
.section__title { font-size: 26px; }
.section__desc { color: var(--color-text-secondary); font-size: 15px; margin-top: var(--space-2); }
.eyebrow {
  display: inline-block;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.link-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--color-primary);
}
.link-more svg { width: 15px; height: 15px; transition: transform var(--transition); }
.link-more:hover svg { transform: translateX(3px); }
.link-more:active { opacity: 0.75; }

.tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-accent);
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.7;
}
.tag--plain { background: var(--color-bg-alt); color: var(--color-text-muted); }
[data-theme="dark"] .tag--plain { background: rgba(255, 255, 255, 0.05); }

/* ---------------- 首页 Hero ---------------- */
.hero {
  padding: var(--space-20) 0 var(--space-16);
  text-align: center;
}
.hero__inner { max-width: 760px; margin: 0 auto; }
.hero__title {
  font-size: clamp(34px, 6vw, 54px);
  letter-spacing: -0.03em;
  line-height: 1.18;
}
.hero__title em { font-style: normal; color: var(--color-primary); }
.hero__lead {
  margin-top: var(--space-5);
  font-size: clamp(15.5px, 2.2vw, 18px);
  color: var(--color-text-secondary);
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}
.hero__actions {
  margin-top: var(--space-8);
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* ---------------- 文章卡片 ---------------- */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition), transform var(--transition),
    border-color var(--transition);
}
/* 整张卡片可点击：标题链接铺满卡片区域 */
.card__title a::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  z-index: 2;
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
  border-color: var(--color-border-strong);
}
.card:focus-within {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md), 0 0 0 3px var(--color-primary-ring);
}
.card:active { transform: translateY(-1px); }
.card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 12.5px;
  color: var(--color-text-muted);
  flex-wrap: wrap;
}
.card__meta .cat { color: var(--color-accent); font-weight: 600; }
.card__meta .dot { width: 3px; height: 3px; border-radius: 50%; background: currentColor; opacity: 0.5; }
.sep { color: var(--color-text-muted); opacity: 0.7; }
.card__title { font-size: 19px; }
.card__title a { transition: color var(--transition); }
.card__title a:hover { color: var(--color-primary); }
.card__summary {
  color: var(--color-text-secondary);
  font-size: 14.5px;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card__foot {
  margin-top: auto;
  padding-top: var(--space-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
  border-top: 1px solid var(--color-border);
}
.card__tags { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.card__foot-right {
  display: inline-flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}
.card__read { font-size: 12.5px; color: var(--color-text-muted); white-space: nowrap; }
.card__more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-primary);
  white-space: nowrap;
}
.card__more svg { width: 15px; height: 15px; transition: transform var(--transition); }
.card:hover .card__more svg { transform: translateX(3px); }

/* 精选大卡 */
.feature {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-8);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition), border-color var(--transition);
}
.feature:hover { box-shadow: var(--shadow-lg); border-color: var(--color-border-strong); }
.feature__title { font-size: clamp(22px, 3vw, 28px); margin-top: var(--space-3); }
.feature__summary {
  margin-top: var(--space-4);
  color: var(--color-text-secondary);
  font-size: 15px;
}
.feature__visual {
  aspect-ratio: 16 / 10;
  border-radius: var(--radius);
  background: linear-gradient(135deg, var(--color-primary-soft), var(--color-bg-alt));
  border: 1px solid var(--color-border);
  display: grid;
  place-items: center;
  color: var(--color-primary);
}
.feature__visual svg { width: 46%; height: auto; }

/* 关于摘要 */
.about-summary {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: var(--space-8);
  align-items: center;
}
.about-summary__avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  background: var(--color-surface);
}
.about-summary__title { font-size: 24px; }
.about-summary__role { color: var(--color-text-muted); font-size: 14.5px; margin-top: 4px; }
.about-summary__text {
  color: var(--color-text-secondary);
  margin-top: var(--space-4);
  max-width: 640px;
}
.about-summary__actions { margin-top: var(--space-5); }

/* ---------------- 页脚 ---------------- */
.site-footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  padding: var(--space-12) 0 var(--space-8);
  margin-top: var(--space-16);
}
.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: var(--space-8);
}
.footer__title { font-size: 14px; font-weight: 700; margin-bottom: var(--space-4); }
.footer__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.footer__list a, .footer__list span {
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: color var(--transition);
}
.footer__list a:hover { color: var(--color-primary); }
.footer__list a:active { opacity: 0.75; }
.footer__about { font-size: 14px; color: var(--color-text-secondary); max-width: 340px; margin-top: var(--space-3); }
.footer__bottom {
  margin-top: var(--space-8);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--color-text-muted);
}

/* ---------------- 列表页 ---------------- */
.page-head {
  padding: var(--space-12) 0 var(--space-8);
  border-bottom: 1px solid var(--color-border);
}
.page-head__title { font-size: clamp(28px, 4.5vw, 38px); }
.page-head__desc { margin-top: var(--space-3); color: var(--color-text-secondary); font-size: 15.5px; }

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-6) 0;
  flex-wrap: wrap;
}
.filters { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.filter-btn {
  padding: 7px 15px;
  border-radius: 999px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition), color var(--transition),
    border-color var(--transition), transform var(--transition);
}
.filter-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.filter-btn:active { transform: scale(0.96); }
.filter-btn.is-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  font-weight: 600;
}

.search {
  position: relative;
  flex: 1 1 260px;
  max-width: 340px;
}
.search svg {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  pointer-events: none;
}
.search input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border-radius: 10px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-size: 14.5px;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.search input::placeholder { color: var(--color-text-muted); }
.search input:hover { border-color: var(--color-border-strong); }
.search input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-ring);
}

.result-count { font-size: 13.5px; color: var(--color-text-muted); margin-bottom: var(--space-6); }
.section--flush { padding-top: 0; }
.footer__brand { gap: var(--space-3); }
.feature__link { margin-top: var(--space-4); }
.author-card__link { margin-top: var(--space-3); }

.empty-state {
  text-align: center;
  padding: var(--space-16) var(--space-6);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}
.empty-state__icon { color: var(--color-text-muted); margin: 0 auto var(--space-4); width: 56px; height: 56px; }
.empty-state__title { font-size: 19px; }
.empty-state__text { color: var(--color-text-secondary); margin-top: var(--space-2); font-size: 14.5px; }
.empty-state .btn { margin-top: var(--space-5); }

/* ---------------- 详情页 ---------------- */
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: var(--color-primary);
  z-index: 150;
  transition: width 90ms linear;
}

.article-head { padding: var(--space-12) 0 var(--space-8); }
.article-head__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  font-size: 13.5px;
  color: var(--color-text-muted);
}
.article-head__meta .cat { color: var(--color-accent); font-weight: 600; }
.article-head__title {
  margin-top: var(--space-4);
  font-size: clamp(28px, 5vw, 42px);
  line-height: 1.22;
  letter-spacing: -0.02em;
}
.article-head__tags { margin-top: var(--space-5); display: flex; gap: var(--space-2); flex-wrap: wrap; }

.article-layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: var(--space-10);
  align-items: start;
  padding-bottom: var(--space-12);
  max-width: 1000px;
  margin: 0 auto;
}
.article-layout > div { min-width: 0; }
.toc {
  position: sticky;
  top: calc(var(--header-h) + 24px);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
}
.toc__title {
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}
.toc__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
.toc__link {
  display: block;
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  border-left: 2px solid transparent;
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: color var(--transition), background var(--transition), border-color var(--transition);
}
.toc__link:hover { color: var(--color-primary); background: var(--color-bg-alt); }
.toc__link:active { opacity: 0.75; }
.toc__link.is-active {
  color: var(--color-primary);
  font-weight: 600;
  border-left-color: var(--color-primary);
  background: var(--color-primary-soft);
}

.prose { max-width: var(--content); font-size: 16.5px; }
.prose > * + * { margin-top: var(--space-5); }
.prose section + section { margin-top: var(--space-10); }
.prose section > * + * { margin-top: var(--space-5); }
.prose h2 {
  font-size: 23px;
  margin-top: var(--space-2);
  padding-top: var(--space-2);
  scroll-margin-top: calc(var(--header-h) + 24px);
}
.prose section:first-child h2 { margin-top: 0; padding-top: 0; }
.prose p { color: var(--color-text-secondary); }
.prose strong { color: var(--color-text); }
.prose a { color: var(--color-primary); text-decoration: underline; text-underline-offset: 3px; }
.prose a:hover { color: var(--color-primary-hover); }
.prose ul, .prose ol { color: var(--color-text-secondary); padding-left: 1.4em; }
.prose li + li { margin-top: var(--space-2); }
.prose li::marker { color: var(--color-primary); }
.prose blockquote {
  margin: var(--space-6) 0;
  padding: var(--space-4) var(--space-5);
  border-left: 3px solid var(--color-primary);
  background: var(--color-bg-alt);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--color-text-secondary);
  font-size: 15.5px;
}
.prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 2px 6px;
  color: var(--color-primary);
}
.prose pre {
  margin: 0;
  padding: var(--space-5);
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow-x: auto;
}
.prose pre code {
  background: none;
  border: none;
  padding: 0;
  color: var(--color-text-secondary);
  font-size: 13.5px;
  line-height: 1.7;
  white-space: pre;
}

.author-card {
  display: flex;
  gap: var(--space-5);
  align-items: center;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  margin-top: var(--space-10);
  max-width: var(--content);
}
.author-card__avatar { width: 64px; height: 64px; border-radius: 50%; flex: none; border: 1px solid var(--color-border); }
.author-card__name { font-size: 17px; }
.author-card__bio { font-size: 14px; color: var(--color-text-secondary); margin-top: 4px; }

.prev-next {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-top: var(--space-8);
  max-width: var(--content);
}
.pn-card {
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
}
.pn-card:hover { border-color: var(--color-primary); box-shadow: var(--shadow-md); transform: translateY(-2px); }
.pn-card:active { transform: translateY(0); }
.pn-card__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: var(--color-text-muted);
  margin-bottom: 6px;
}
.pn-card__label svg { width: 14px; height: 14px; }
.pn-card__title { font-size: 15.5px; font-weight: 600; }
.pn-card--next { text-align: right; }
.pn-card--placeholder { opacity: 0.55; pointer-events: none; }

.notice {
  text-align: center;
  padding: var(--space-16) var(--space-6);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}
.notice__title { font-size: 22px; }
.notice__text { margin-top: var(--space-3); color: var(--color-text-secondary); }
.notice__action { margin-top: var(--space-6); }
.notice__action .btn { margin-top: 0; }
.notice .btn { margin-top: var(--space-6); }

/* ---------------- 关于页 ---------------- */
.about-hero {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-10);
  align-items: center;
  padding: var(--space-12) 0 var(--space-16);
}
.about-hero__avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  background: var(--color-surface);
}
.about-hero__title { font-size: clamp(26px, 4.5vw, 34px); }
.about-hero__meta { color: var(--color-text-muted); font-size: 15px; margin-top: var(--space-2); }
.about-hero__motto {
  margin-top: var(--space-4);
  font-size: 17px;
  color: var(--color-text);
  font-weight: 500;
}
.about-hero__bio { margin-top: var(--space-5); color: var(--color-text-secondary); max-width: 640px; }
.about-hero__bio + .about-hero__bio { margin-top: var(--space-4); }
.about-hero__bio strong { color: var(--color-primary); font-weight: 600; }

.skill-group { margin-bottom: var(--space-6); }
.skill-group__label { font-size: 14px; font-weight: 700; margin-bottom: var(--space-3); }
.skill-tags { display: flex; gap: var(--space-2); flex-wrap: wrap; }

.timeline { position: relative; padding-left: var(--space-8); }
.timeline::before {
  content: "";
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--color-border);
}
.timeline__item { position: relative; padding-bottom: var(--space-8); }
.timeline__item:last-child { padding-bottom: 0; }
.timeline__item::before {
  content: "";
  position: absolute;
  left: calc(-1 * var(--space-8) + 1px);
  top: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-primary);
}
.timeline__period { font-size: 13px; font-weight: 600; color: var(--color-primary); }
.timeline__role { font-size: 17px; margin-top: 2px; }
.timeline__company { font-size: 14.5px; color: var(--color-text-muted); }
.timeline__desc { margin-top: var(--space-3); color: var(--color-text-secondary); font-size: 15px; max-width: 640px; }

.contact-list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }
.contact-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  font-size: 15px;
  transition: border-color var(--transition), color var(--transition), box-shadow var(--transition), transform var(--transition);
}
.contact-item svg { width: 18px; height: 18px; color: var(--color-primary); flex: none; }
.contact-item:hover { border-color: var(--color-primary); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
.contact-item:active { transform: translateY(0); }
.contact-item span { color: var(--color-text-secondary); }
.contact-item:hover span { color: var(--color-text); }

/* ---------------- 响应式 ---------------- */
@media (max-width: 960px) {
  .footer__grid { grid-template-columns: 1fr 1fr; }
  .about-summary { grid-template-columns: 140px 1fr; gap: var(--space-6); }
  .about-summary__avatar { width: 140px; height: 140px; }
  .feature { grid-template-columns: 1fr; gap: var(--space-6); }
  .article-layout { grid-template-columns: 1fr; gap: var(--space-6); }
  .toc { position: static; }
}

@media (max-width: 640px) {
  :root { --header-h: 60px; }
  .container { padding: 0 var(--space-4); }
  .site-nav { display: none; }
  .nav-toggle { display: grid; }
  .brand__text small { display: none; }
  .hero { padding: var(--space-12) 0 var(--space-10); }
  .section { padding: var(--space-10) 0; }
  .section__title { font-size: 22px; }
  .card-grid { grid-template-columns: 1fr; gap: var(--space-4); }
  .about-summary { grid-template-columns: 1fr; text-align: left; }
  .about-summary__avatar { width: 120px; height: 120px; }
  .about-hero { grid-template-columns: 1fr; gap: var(--space-6); text-align: left; padding: var(--space-8) 0 var(--space-12); }
  .about-hero__avatar { width: 140px; height: 140px; }
  .prev-next { grid-template-columns: 1fr; }
  .pn-card--next { text-align: left; }
  .footer__grid { grid-template-columns: 1fr; gap: var(--space-6); }
  .search { max-width: none; width: 100%; }
  .toolbar { gap: var(--space-3); }
  .prose { font-size: 16px; }
  .prose pre { padding: var(--space-4); }
  .author-card { flex-direction: column; align-items: flex-start; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { transition: none !important; animation: none !important; }
}

```

```text
file=index.html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lin Notes · 一个关于前端与设计的个人博客</title>
<meta name="description" content="Lin Notes：一个关于前端工程、界面设计与独立思考的个人博客。">
<link rel="stylesheet" href="css/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%232f4bff'/%3E%3Cpath d='M8 24h16M12 19V9M17 19V6M22 19v-8' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E">
</head>
<body>
<a class="skip-link" href="#main">跳到主要内容</a>

<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
      </span>
      <span class="brand__text">Lin Notes<small>记录工程实践与设计思考</small></span>
    </a>

    <nav class="site-nav" aria-label="主导航">
      <ul class="site-nav__list">
        <li><a class="site-nav__link is-active" href="index.html" aria-current="page">首页</a></li>
        <li><a class="site-nav__link" href="articles.html">文章</a></li>
        <li><a class="site-nav__link" href="about.html">关于</a></li>
      </ul>
    </nav>

    <div class="header-actions">
      <button class="icon-btn" type="button" data-theme-toggle aria-label="切换主题" aria-pressed="false">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
      <button class="icon-btn nav-toggle" type="button" data-nav-toggle aria-label="打开菜单" aria-expanded="false" aria-controls="mobile-nav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>

  <div class="mobile-nav" id="mobile-nav">
    <div class="container">
      <ul>
        <li><a class="is-active" href="index.html" aria-current="page">首页</a></li>
        <li><a href="articles.html">文章</a></li>
        <li><a href="about.html">关于</a></li>
      </ul>
    </div>
  </div>
</header>

<main id="main">
  <section class="hero">
    <div class="container hero__inner">
      <span class="eyebrow">个人博客</span>
      <h1 class="hero__title">把复杂的问题，<br>写成<em>清晰的界面</em>。</h1>
      <p class="hero__lead">这里记录我在前端工程、界面设计与独立思考上的实践与心得，尽量把话说清楚。</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="articles.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
          开始阅读
        </a>
        <a class="btn btn--ghost" href="articles.html">
          全部文章
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <span class="eyebrow">最新文章</span>
          <h2 class="section__title">最近写下的几篇</h2>
          <p class="section__desc">围绕工程实践、体验设计与思考方式的一些记录。</p>
        </div>
        <a class="link-more" href="articles.html">
          查看更多
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div class="card-grid" id="latest-grid"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section__head">
        <div>
          <span class="eyebrow">精选文章</span>
          <h2 class="section__title">值得反复读的一篇</h2>
        </div>
      </div>
      <div id="featured-wrap"></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="about-summary">
        <img class="about-summary__avatar" src="assets/avatar.svg" alt="作者头像" width="180" height="180">
        <div>
          <h2 class="about-summary__title">关于我</h2>
          <p class="about-summary__role">林知远 · 前端工程师 / 界面设计爱好者 · 杭州</p>
          <p class="about-summary__text">我把博客当作一台检验理解的机器：把踩过的坑整理成可复用的方案，也乐于在代码之外讨论体验与美学。每篇文章都尽量说清楚「为什么这样做」。</p>
          <p class="about-summary__actions">
            <a class="btn btn--ghost" href="about.html">
              查看全部
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="brand footer__brand">
          <span class="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M8 15V7"/><path d="M12 15V4"/><path d="M16 15v-6"/></svg>
          </span>
          <span class="brand__text">Lin Notes</span>
        </div>
        <p class="footer__about">一个关于前端工程、界面设计与独立思考的个人博客。</p>
      </div>
      <div>
        <h3 class="footer__title">导航</h3>
        <ul class="footer__list">
          <li><a href="index.html">首页</a></li>
          <li><a href="articles.html">文章</a></li>
          <li><a href="about.html">关于我</a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer__title">联系方式</h3>
        <ul class="footer__list">
          <li><a href="mailto:hello@linnotes.dev">hello@linnotes.dev</a></li>
          <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.zhihu.com/" target="_blank" rel="noopener noreferrer">知乎</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span id="footer-year">2024</span> Lin Notes. 保留所有权利。</span>
      <span>以简洁为荣，用文字记录。</span>
    </div>
  </div>
</footer>

<script src="js/data.js"></script>
<script src="js/app.js"></script>
</body>
</html>

```

```text
file=js/app.js
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

```

```text
file=js/data.js
/* 站点与文章数据（本地静态数据，无后端接口） */
window.SITE = {
  name: 'Lin Notes',
  title: 'Lin Notes · 一个关于前端与设计的个人博客',
  tagline: '记录工程实践与设计思考',
  description: '一个关于前端工程、界面设计与独立思考的个人博客。',
  author: {
    name: '林 知远',
    role: '前端工程师 / 界面设计爱好者',
    location: '杭州 · 中国',
    motto: '把复杂的问题，写成清晰的界面。',
    bio: [
      '我是一名专注前端的工程师，工作内容涵盖界面实现、设计系统与工程化建设。日常喜欢把踩过的坑整理成可复用的方案，也乐于在代码之外讨论体验与美学。',
      '这个博客是我的一部分：左边是技术实现，右边是设计判断。我希望每一次输出都能让你少踩一次坑，或者多看清一点。'
    ],
    email: 'hello@linnotes.dev',
    links: [
      { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
      { label: '知乎', href: 'https://www.zhihu.com/', icon: 'link' }
    ]
  }
};

window.ARTICLES = [
  {
    slug: 'design-system-tokens',
    title: '设计系统里的 Design Token：从命名到落地',
    category: '设计',
    date: '2024-11-18',
    readTime: 6,
    tags: ['设计系统', 'CSS 变量', '协作'],
    featured: true,
    summary: 'Token 不是一组颜色变量，而是一套跨设计、跨端、跨团队的沟通语言。本文聊聊命名分层、主题切换与落地时的取舍。',
    sections: [
      {
        id: 'why-token',
        title: '为什么需要 Token',
        blocks: [
          { type: 'p', text: '当设计稿里写着 #2F4BFF，代码里写着 #2f4bff，设计系统里又写着 --color-primary，三个地方就出现了三份真相。Token 的意义不是"少写几个变量"，而是把决策收敛到唯一一处。' },
          { type: 'p', text: '一个成熟的 Token 体系通常分三层：原始值（原始色板）、语义值（用途命名）、组件值（组件专属覆盖）。原始值只增不改，语义值可以被替换，组件值只在必要时出现。' }
        ]
      },
      {
        id: 'naming',
        title: '命名的取舍',
        blocks: [
          { type: 'p', text: '常见的命名争议集中在"按用途"还是"按外观"。我的经验是：语义优先。同一种蓝可能出现在按钮背景和链接文字上，用 --blue-500 命名的方案在换肤时会立刻失效。' },
          { type: 'ul', items: ['基础层：--blue-600、--gray-100，描述事实', '语义层：--color-primary、--color-text-muted，描述用途', '组件层：--button-bg，仅在覆盖语义层时使用'] },
          { type: 'quote', text: '好的 Token 名字应该让使用者不需要打开设计稿就知道该用哪一个。' }
        ]
      },
      {
        id: 'implementation',
        title: '实现层：CSS 变量的能力边界',
        blocks: [
          { type: 'p', text: 'CSS 自定义属性天然支持在 :root 上切换主题，这是最省成本的做法。需要注意的是，CSS 变量不能直接参与部分颜色函数之外的计算，必要时用 color-mix() 或相对颜色语法。' },
          { type: 'code', lang: 'css', text: ':root {\n  --color-primary: #2f4bff;\n  --color-surface: #ffffff;\n}\n\n[data-theme="dark"] {\n  --color-primary: #8ea2ff;\n  --color-surface: #11141c;\n}' },
          { type: 'p', text: '配合 prefers-color-scheme 媒体查询做默认主题，再把用户显式选择写入 localStorage，就能在"跟随系统"和"固定深色"之间平滑切换。' }
        ]
      },
      {
        id: 'migration',
        title: '迁移策略',
        blocks: [
          { type: 'ol', items: ['先建立语义层，不改任何现有硬编码', '按页面逐步替换，观察视觉回归', '最后下线原始层中的冗余值'] },
          { type: 'p', text: '渐进迁移的最大好处是：任何一步都可以停下来发布，不会出现"全站一起改、一起翻车"的时刻。' }
        ]
      }
    ]
  },
  {
    slug: 'css-container-queries',
    title: '容器查询：组件终于可以自己决定布局',
    category: '前端',
    date: '2024-10-02',
    readTime: 5,
    tags: ['CSS', '响应式', '组件化'],
    summary: '媒体查询关心的是视口，而组件真正关心的是自己被放进了多大的容器。容器查询让卡片、侧栏、卡片网格都能独立响应。',
    sections: [
      {
        id: 'problem',
        title: '媒体查询的局限',
        blocks: [
          { type: 'p', text: '同一个卡片组件可能出现在主内容区，也可能出现在窄侧栏。用 @media 判断视口宽度时，你只能靠父级传类名或加前缀来打补丁，很快就会失控。' }
        ]
      },
      {
        id: 'syntax',
        title: '语法与降级',
        blocks: [
          { type: 'code', lang: 'css', text: '.card-host {\n  container-type: inline-size;\n  container-name: card;\n}\n\n@container card (min-width: 420px) {\n  .card { grid-template-columns: 120px 1fr; }\n}' },
          { type: 'p', text: '所有现代浏览器已支持容器查询，但老项目仍建议保留媒体查询作为兜底，先写基础布局，再用 @container 做增强。' }
        ]
      },
      {
        id: 'practice',
        title: '实践建议',
        blocks: [
          { type: 'ul', items: ['container-type 只设置在真正需要的容器上，设置过多会影响布局性能', '容器查询无法查询自身样式，只能查询祖先容器', '命名容器有助于避免歧义'] },
          { type: 'quote', text: '组件化的终点，是让组件不必知道自己在哪。' }
        ]
      }
    ]
  },
  {
    slug: 'frontend-build-tooling',
    title: '前端工程化：把构建速度当成产品指标',
    category: '工程化',
    date: '2024-08-21',
    readTime: 7,
    tags: ['构建', '性能', '工程化'],
    summary: '当构建耗时超过一分钟，开发者就开始绕过它。与其优化一切，不如先测量，再决定值不值得。',
    sections: [
      {
        id: 'measure',
        title: '先测量',
        blocks: [
          { type: 'p', text: '在没有数据之前谈优化都是玄学。把本地冷启动、热更新、CI 全量构建分别计时，并记录在看板里，比任何经验判断都可靠。' },
          { type: 'code', lang: 'bash', text: 'npm run build -- --profile\n# 关注 chunks 体积、模块转换耗时、最慢的三个插件' }
        ]
      },
      {
        id: 'bottleneck',
        title: '常见瓶颈',
        blocks: [
          { type: 'ul', items: ['TypeScript 全量类型检查阻塞打包', '大体积依赖被打进主 chunk', 'Source Map 处理拖慢构建', '容器里依赖重复安装'] },
          { type: 'p', text: '其中最容易被忽略的是类型检查：多数场景下，把它挪到 CI 而不是本地开发流程中，体验会立刻改善。' }
        ]
      },
      {
        id: 'strategy',
        title: '策略与取舍',
        blocks: [
          { type: 'p', text: '优化永远有边界。一个 90 秒但可预测的构建，远好过一个偶尔 5 秒、却经常莫名失败的构建。稳定性本身就是速度的一部分。' },
          { type: 'ol', items: ['拆分开发与生产构建配置', '对大依赖做按需加载或外置', '缓存构建产物并在 CI 之间共享', '为构建失败设置快速反馈通道'] }
        ]
      }
    ]
  },
  {
    slug: 'accessible-forms',
    title: '表单可用性：那些用户看不见却必须存在的细节',
    category: '前端',
    date: '2024-06-09',
    readTime: 4,
    tags: ['可访问性', '表单', '交互'],
    summary: 'label 关联、错误提示、焦点管理，是表单体验的三根支柱，也是最常被跳过的地方。',
    sections: [
      {
        id: 'label',
        title: 'label 必须可点击',
        blocks: [
          { type: 'p', text: '用 for 与 id 关联 label 与输入框，用户点击文字即可聚焦输入框。这是一行代码的改动，却能显著减少小屏上的操作成本。' },
          { type: 'code', lang: 'html', text: '<label for="email">邮箱</label>\n<input id="email" name="email" type="email" autocomplete="email" />' }
        ]
      },
      {
        id: 'error',
        title: '错误提示要靠近来源',
        blocks: [
          { type: 'p', text: '错误信息应该紧跟出错字段，并使用 aria-describedby 与字段建立关联，让读屏软件也能读到。提交后要把焦点移到第一个错误项。' },
          { type: 'quote', text: '如果一个错误只有在仔细阅读页面时才能发现，它就等于没有提示。' }
        ]
      },
      {
        id: 'keyboard',
        title: '键盘可达',
        blocks: [
          { type: 'ul', items: ['所有交互元素都能用 Tab 到达', '焦点环清晰可见，不要用 outline: none 抹掉', '模态框打开时锁定焦点，关闭后归还焦点'] }
        ]
      }
    ]
  },
  {
    slug: 'minimal-ui-principles',
    title: '简洁不等于简单：克制的界面如何建立层级',
    category: '设计',
    date: '2024-03-27',
    readTime: 5,
    tags: ['视觉设计', '留白', '层级'],
    summary: '删掉装饰之后，剩下的只有间距、对比与顺序。真正难的是决定什么该留下。',
    sections: [
      {
        id: 'hierarchy',
        title: '层级来自对比',
        blocks: [
          { type: 'p', text: '当所有元素都同样醒目时，读者就找不到重点。层级不是靠装饰堆出来的，而是靠字号、字重、颜色明度与留白之间的对比关系建立。' }
        ]
      },
      {
        id: 'spacing',
        title: '间距系统',
        blocks: [
          { type: 'p', text: '间距应当来自一组固定刻度，而不是随手取值。统一的刻度让节奏稳定，也让多人协作时更容易保持一致。' },
          { type: 'code', lang: 'css', text: ':root {\n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n  --space-12: 48px;\n}' }
        ]
      },
      {
        id: 'color',
        title: '克制的用色',
        blocks: [
          { type: 'p', text: '一个主色加上中性灰白，足以支撑整个产品。颜色越少，界面越像一个有观点的设计，而不是集齐所有流行色的组件库。' }
        ]
      }
    ]
  },
  {
    slug: 'reading-and-notes',
    title: '如何阅读与记录：我的信息处理流程',
    category: '思考',
    date: '2024-01-15',
    readTime: 4,
    tags: ['学习方法', '笔记', '思考'],
    summary: '收集不是目的，遗忘也不是失败。一套能长期运转的输入输出流程，比任何工具都重要。',
    sections: [
      {
        id: 'collect',
        title: '收集：设一个闸门',
        blocks: [
          { type: 'p', text: '收藏夹无限膨胀，是因为保存的门槛太低。给自己设一条规则：只有能说清"为什么值得存"的链接才进入收集箱，其余的一律路过。' }
        ]
      },
      {
        id: 'process',
        title: '处理：用自己的话重写',
        blocks: [
          { type: 'p', text: '复制粘贴的原文不会真正变成你的知识。合上原文，用三句话复述核心观点并写下一个自己的应用场景，这一步比任何标签系统都有效。' },
          { type: 'ol', items: ['读：只读与当前问题相关的部分', '写：用自己的语言复述', '用：找一个真实场景去验证'] }
        ]
      },
      {
        id: 'output',
        title: '输出：让知识接受检验',
        blocks: [
          { type: 'p', text: '写下文章的那一刻，才知道自己是真的懂了还是只是觉得懂了。博客对我来说不是展示窗口，而是一台检验理解的机器。' },
          { type: 'quote', text: '如果一个观点无法被写成一篇博客，那它大概率还没有被你真正理解。' }
        ]
      }
    ]
  }
];

```