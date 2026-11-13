/* =========================================================
   1. 常量与文章数据
   ========================================================= */
var SITE = {
  name: 'NewEra',
  qq: '3627236036',
  avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3627236036&s=640'
};

/* 封面只使用主色深浅变体与中性色，保证全站色相克制 */
var COVER_THEMES = {
  brand:   { a: 'var(--brand)', b: 'var(--brand-strong)', shape: 'rgba(255,255,255,.34)', shape2: 'rgba(255,255,255,.16)', text: '#fff' },
  neutral: { a: 'var(--bg-elevated)', b: 'var(--border)', shape: 'rgba(74,91,214,.28)', shape2: 'rgba(74,91,214,.10)', text: 'var(--text)' },
  soft:    { a: 'var(--brand-soft)', b: 'var(--bg-elevated)', shape: 'rgba(74,91,214,.22)', shape2: 'rgba(74,91,214,.08)', text: 'var(--brand-strong)' }
};

var POSTS = [
  {
    id: 'single-file-blog',
    title: '把博客压缩进一个 HTML 文件',
    summary: '用原生 HTML、CSS 与 JavaScript 搭建一个零依赖的单文件站点，双击即可运行，也能直接丢到任意静态托管上。',
    date: '2024-05-12',
    dateText: '2024 年 5 月 12 日',
    readingTime: 8,
    tags: ['前端', '教程'],
    cover: { from: 'brand', to: 'brand' },
    body: [
      { type: 'h2', text: '为什么选择单文件' },
      { type: 'p', text: '写博客最容易滑向的路线是：先搭框架，再装依赖，接着配置构建，最后为了一个静态页面引入一整套工具链。页面本身可能不到两百行，配置文件却要写上几百行。' },
      { type: 'p', text: '单文件的方式把复杂度重新压回内容本身。样式写进一个 style 标签，脚本写在 body 末尾，读写顺序清晰，也没有构建产物需要维护。' },
      { type: 'ul', items: ['零外部依赖，双击 index.html 就能打开', '没有构建步骤，改完刷新即可看到结果', '可以直接托管在任意静态空间，不需要服务端'] },
      { type: 'h2', text: '结构怎么组织' },
      { type: 'p', text: '我习惯把内容数据放在脚本最前面，渲染函数放在后面。这样只要替换数据数组，页面的展示逻辑完全不需要动，协作时也更容易分工。' },
      { type: 'code', lang: 'html', text: '<header class="site-header">\n  <nav aria-label="主导航">...</nav>\n</header>\n<main id="main">\n  <section id="home"></section>\n</main>' },
      { type: 'h2', text: '需要注意的地方' },
      { type: 'p', text: '单文件并不意味着可以忽略工程习惯。变量命名、模块划分、注释习惯依然重要，否则文件超过一千行之后，维护成本会迅速上升。' },
      { type: 'quote', text: '工具是为了让内容更容易被维护，而不是让内容看起来很忙。' }
    ]
  },
  {
    id: 'daily-scripts',
    title: '我常用的五个效率脚本',
    summary: '批量改名、整理下载目录、生成占位图——这些每天都会重复一遍的操作，最后都被我收进了几个几十行的脚本里。',
    date: '2024-04-28',
    dateText: '2024 年 4 月 28 日',
    readingTime: 6,
    tags: ['工具'],
    cover: { from: 'neutral', to: 'neutral' },
    body: [
      { type: 'h2', text: '重复三次以上的操作值得写下来' },
      { type: 'p', text: '我给自己定了一条很简单的标准：一个操作如果一个月内要重复三次以上，就应该把它变成脚本。哪怕脚本只有十几行，也比每次手动点更省心。' },
      { type: 'h2', text: '整理下载目录' },
      { type: 'p', text: '下载文件夹是最容易失控的地方。我写了一个小脚本，按文件扩展名自动归类，遇到同名文件时自动追加序号，整个过程不需要任何交互。' },
      { type: 'code', lang: 'bash', text: '#!/usr/bin/env bash\nfor f in "$1"/*; do\n  ext="${f##*.}"\n  mkdir -p "$1/$ext" && mv "$f" "$1/$ext/"\ndone' },
      { type: 'h2', text: '批量重命名' },
      { type: 'p', text: '把文件名中的空格换成短横线、去掉中文括号、统一日期前缀——这类需求用一段 for 循环加 sed 就够了，不必去找图形化工具。' },
      { type: 'ol', items: ['先在测试目录跑一遍，确认结果符合预期', '再把脚本收进固定目录，用别名调用', '给脚本写一行注释，说明它解决什么问题'] },
      { type: 'quote', text: '脚本不是为了炫技，是为了让你在下午三点少做一次重复劳动。' }
    ]
  },
  {
    id: 'slow-thinking',
    title: '关于专注与慢思考',
    summary: '写得越快不一定读得越多。记录一些关于注意力分配、输入节奏与延迟满足的朴素体会。',
    date: '2024-03-19',
    dateText: '2024 年 3 月 19 日',
    readingTime: 5,
    tags: ['随笔'],
    cover: { from: 'soft', to: 'soft' },
    body: [
      { type: 'h2', text: '快是一种错觉' },
      { type: 'p', text: '信息流把读得快包装成一种能力，但我越来越怀疑这种能力的价值。真正被记住的东西，往往来自在某段内容上停留得足够久。' },
      { type: 'p', text: '当我读完一篇文章立刻能说出三个要点时，那篇文章大概率只是被扫了一遍。能复述结构、举出反例、在别的场景里想起它，才谈得上消化。' },
      { type: 'h2', text: '给自己留一点延迟' },
      { type: 'ul', items: ['看完一个主题，隔一天再写自己的总结', '不追热点，把想写的东西先存进草稿', '每天只读一个主题，读透比读多重要'] },
      { type: 'h2', text: '慢一点的代价' },
      { type: 'p', text: '慢当然有代价：更新频率会下降，读者会觉得你没有跟上节奏。但我发现，写一篇真正想清楚的随笔，比一周发五篇零散的笔记更让人记得住。' },
      { type: 'quote', text: '把速度当成目标时，方向就容易被忽略了。' }
    ]
  },
  {
    id: 'css-custom-properties',
    title: 'CSS 自定义属性：一套令牌走天下',
    summary: '把颜色、间距、圆角和字号收进一组变量，主题切换与整体换肤就变成改一行声明的事。',
    date: '2024-02-27',
    dateText: '2024 年 2 月 27 日',
    readingTime: 9,
    tags: ['前端'],
    cover: { from: 'brand', to: 'soft' },
    body: [
      { type: 'h2', text: '变量是设计系统的最小单位' },
      { type: 'p', text: '自定义属性最大的价值不是省事，而是让设计决定从代码里独立出来。颜色不再散落在各个组件中，而是集中在一个可以被整体替换的地方。' },
      { type: 'code', lang: 'css', text: ':root {\n  --brand: #4a5bd6;\n  --space-4: 16px;\n  --radius-md: 10px;\n}\n\n.btn {\n  padding: 10px 20px;\n  border-radius: var(--radius-md);\n  color: var(--brand);\n}' },
      { type: 'h2', text: '深色主题怎么写' },
      { type: 'p', text: '深色模式不应该是一套独立重写，而应该是同一批语义的另一组取值。用属性选择器覆盖变量，组件样式一行都不用改。' },
      { type: 'code', lang: 'css', text: '[data-theme="dark"] {\n  --bg: #0f1115;\n  --text: #e8eaef;\n  --brand: #7c8af0;\n}' },
      { type: 'h2', text: '命名要有语义' },
      { type: 'ul', items: ['用 --text-muted 而不是 --gray-500', '让变量名描述用途，值可以随时替换', '同一种语义只保留一个变量名，避免出现近义重复'] },
      { type: 'h2', text: '一点实践心得' },
      { type: 'p', text: '主题切换时要注意首屏闪白的问题。我在 head 里放一小段脚本，先把主题属性写到 html 上，再由主脚本接管后续逻辑，这样切换几乎没有跳变。' }
    ]
  },
  {
    id: 'reading-progress-bar',
    title: '从零写一个阅读进度条',
    summary: '一行进度其实只依赖两件事：正文区间的滚动比例，以及一个 requestAnimationFrame 的节流更新。',
    date: '2024-01-15',
    dateText: '2024 年 1 月 15 日',
    readingTime: 7,
    tags: ['教程', '前端'],
    cover: { from: 'soft', to: 'neutral' },
    body: [
      { type: 'h2', text: '进度条要表达什么' },
      { type: 'p', text: '进度条不是装饰，它回答的是这篇还剩多少。因此计算基准应该是正文内容的高度，而不是整个文档的高度，否则图片和页脚会让进度提前跑满。' },
      { type: 'h2', text: '计算比例' },
      { type: 'p', text: '用正文容器的顶边位置减去视口顶边位置作为已滚动的距离，再除以正文总高度减去视口高度，就得到了 0 到 1 的比例。' },
      { type: 'code', lang: 'javascript', text: 'function getProgress() {\n  const rect = body.getBoundingClientRect();\n  const total = rect.height - window.innerHeight;\n  if (total <= 0) return 1;\n  const passed = -rect.top;\n  return Math.min(1, Math.max(0, passed / total));\n}' },
      { type: 'h2', text: '用 transform 而不是 width' },
      { type: 'p', text: '把进度条做成 scaleX 的变换，比不断修改 width 性能更好，因为它不会触发布局，只做合成层的工作。' },
      { type: 'code', lang: 'css', text: '.reading-progress__bar {\n  height: 100%;\n  width: 100%;\n  transform: scaleX(0);\n  transform-origin: left;\n}' },
      { type: 'h2', text: '别忘了节流' },
      { type: 'p', text: '滚动事件触发频率很高，直接在事件里计算会造成不必要的抖动。用 requestAnimationFrame 合并多次触发，就能在保持跟手的同时把开销压下来。' }
    ]
  },
  {
    id: 'year-in-review',
    title: '写给自己的年度总结',
    summary: '不追热点、不列数字，只记录这一年真正改变了工作方式的几个瞬间。',
    date: '2023-12-30',
    dateText: '2023 年 12 月 30 日',
    readingTime: 4,
    tags: ['随笔'],
    cover: { from: 'neutral', to: 'soft' },
    body: [
      { type: 'h2', text: '一个没有主角的年份' },
      { type: 'p', text: '回头看这一年，没有某个项目一锤定音，也没有一次彻底推翻重来。大部分时间都花在把东西做得更顺手这类小事上，而这些小事累积成了习惯。' },
      { type: 'h2', text: '三个留下来的改变' },
      { type: 'ol', items: ['把阅读和写作固定在同一时段，效率比熬夜更稳定', '所有重复操作都收敛成了脚本，桌面干净了很多', '开始认真写注释，写给三个月后的自己看'] },
      { type: 'h2', text: '还没做好的部分' },
      { type: 'p', text: '输出仍然不稳定，好的时候一个月能写三篇，差的时候一个月一篇也没有。问题不在时间，而在于我总是想把每篇文章都写完整，于是迟迟不动笔。' },
      { type: 'quote', text: '允许自己写得不完美，往往更容易开始。' }
    ]
  }
];

/* =========================================================
   2. 工具函数
   ========================================================= */
function qs(sel, root) { return (root || document).querySelector(sel); }
function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
function el(tag, cls, text) {
  var node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
}
function clamp(v, min, max) { return v < min ? min : (v > max ? max : v); }

/* =========================================================
   3. 状态
   ========================================================= */
var STATE = {
  view: 'list',
  activeTag: 'all',
  keyword: '',
  theme: 'light',
  currentPostId: null,
  listScrollY: 0
};

/* =========================================================
   4. 头像加载与降级
   ========================================================= */
var FALLBACK_SVG =
  '<svg viewBox="0 0 120 120" role="presentation" aria-hidden="true">' +
  '<defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#4a5bd6"/><stop offset="1" stop-color="#3a49b8"/>' +
  '</linearGradient></defs>' +
  '<rect width="120" height="120" fill="url(#ag)"/>' +
  '<circle cx="60" cy="60" r="40" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"/>' +
  '<rect x="52" y="34" width="16" height="52" rx="4" fill="rgba(255,255,255,.85)" transform="rotate(18 60 60)"/>' +
  '</svg>';

function initAvatar(img) {
  if (!img) return;
  img.setAttribute('referrerpolicy', 'no-referrer');
  if (img.complete && img.naturalWidth === 0) handleAvatarError(img);
  img.addEventListener('error', function () { handleAvatarError(img); });
}

function handleAvatarError(img) {
  if (img.dataset.fallback === '1') return;
  img.dataset.fallback = '1';
  var holder = img.parentNode;
  if (!holder) return;
  var fb = el('span', 'avatar-fallback');
  fb.setAttribute('aria-hidden', 'true');
  fb.innerHTML = FALLBACK_SVG;
  img.style.display = 'none';
  holder.appendChild(fb);
  /* 仅在 Hero 处给出一次失败提示，避免重复 */
  var hero = qs('.hero__avatar-wrap');
  if (hero && !qs('.avatar-note', hero)) {
    var note = el('p', 'avatar-note', '头像加载失败，已使用默认头像');
    hero.appendChild(note);
  }
}

/* =========================================================
   5. 主题
   ========================================================= */
function readTheme() {
  var t = 'light';
  try { t = localStorage.getItem('theme') || ''; } catch (e) { t = ''; }
  if (t !== 'light' && t !== 'dark') {
    t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  return t;
}
function applyTheme(theme, persist) {
  STATE.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  var meta = qs('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f1115' : '#ffffff');
  var btn = qs('#theme-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.setAttribute('aria-label', theme === 'dark' ? '切换浅色模式' : '切换深色模式');
  }
  if (persist) { try { localStorage.setItem('theme', theme); } catch (e) {} }
}

/* =========================================================
   6. Toast
   ========================================================= */
var toastTimer = null;
function showToast(msg, success) {
  var toast = qs('#toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.toggle('toast--success', !!success);
  toast.classList.add('is-visible');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
}

/* =========================================================
   7. 复制 QQ 号
   ========================================================= */
function legacyCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', 'readonly');
  ta.style.position = 'fixed';
  ta.style.top = '-1000px';
  document.body.appendChild(ta);
  ta.select();
  var ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  document.body.removeChild(ta);
  return ok;
}

function handleCopy(btn) {
  var text = btn.getAttribute('data-copy') || SITE.qq;
  var done = function () {
    btn.classList.add('is-copied');
    var label = qs('.copy-inline__text', btn);
    if (label) label.textContent = '已复制';
    showToast('已复制到剪贴板', true);
    setTimeout(function () {
      btn.classList.remove('is-copied');
      var l = qs('.copy-inline__text', btn);
      if (l) l.textContent = '复制';
    }, 1500);
  };
  var fail = function () {
    var num = qs('#qq-number');
    if (num) num.classList.add('is-highlight');
    showToast('复制失败，请手动复制：' + text, false);
    setTimeout(function () { if (num) num.classList.remove('is-highlight'); }, 2200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () {
      if (legacyCopy(text)) done(); else fail();
    });
  } else if (legacyCopy(text)) {
    done();
  } else {
    fail();
  }
}

/* =========================================================
   8. 列表渲染
   ========================================================= */
function coverVars(cover) {
  var a = COVER_THEMES[cover.from] || COVER_THEMES.brand;
  var b = COVER_THEMES[cover.to] || a;
  return { a: a.a, b: b.a, shape: b.shape, shape2: b.shape2, text: b.text };
}

function filteredPosts() {
  var kw = STATE.keyword.trim().toLowerCase();
  return POSTS.filter(function (p) {
    var tagOk = STATE.activeTag === 'all' || p.tags.indexOf(STATE.activeTag) !== -1;
    var kwOk = !kw || (p.title + p.summary + p.tags.join('')).toLowerCase().indexOf(kw) !== -1;
    return tagOk && kwOk;
  });
}

function renderList() {
  var grid = qs('#post-grid');
  var empty = qs('#empty-state');
  var count = qs('#posts-count');
  var list = filteredPosts();

  grid.innerHTML = '';
  list.forEach(function (p) {
    var card = el('article', 'post-card');
    card.setAttribute('data-id', p.id);

    var cover = el('div', 'post-card__cover');
    var vars = coverVars(p.cover);
    cover.style.setProperty('--cover-a', vars.a);
    cover.style.setProperty('--cover-b', vars.b);
    cover.style.setProperty('--cover-shape', vars.shape);
    cover.style.setProperty('--cover-shape-2', vars.shape2);
    cover.style.setProperty('--cover-text', vars.text);
    cover.appendChild(el('span', null, p.tags[0] || 'Note'));
    card.appendChild(cover);

    var body = el('div', 'post-card__body');

    var h3 = el('h3', 'post-card__title');
    var link = el('a', null, p.title);
    link.href = '#post/' + p.id;
    link.setAttribute('data-post-link', p.id);
    h3.appendChild(link);
    body.appendChild(h3);

    body.appendChild(el('p', 'post-card__summary', p.summary));

    var meta = el('div', 'post-card__meta');
    var time = el('time', null, p.dateText);
    time.setAttribute('datetime', p.date);
    meta.appendChild(time);
    meta.appendChild(el('span', null, '·'));
    meta.appendChild(el('span', null, p.readingTime + ' 分钟阅读'));
    body.appendChild(meta);

    var tags = el('div', 'post-card__tags');
    p.tags.forEach(function (t) { tags.appendChild(el('span', 'pill', t)); });
    body.appendChild(tags);

    card.appendChild(body);

    /* 点击卡片空白区域等价于点击标题链接 */
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      openPost(p.id);
    });

    grid.appendChild(card);
  });

  if (count) {
    if (!list.length) count.textContent = '没有找到相关文章';
    else if (list.length === POSTS.length) count.textContent = '共 ' + list.length + ' 篇文章';
    else count.textContent = '找到 ' + list.length + ' 篇';
  }
  if (empty) empty.hidden = list.length !== 0;

  /* 同步筛选按钮激活态 */
  qsa('.filter__btn').forEach(function (b) {
    var on = b.getAttribute('data-tag') === STATE.activeTag;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

/* =========================================================
   9. 详情渲染
   ========================================================= */
function renderBody(post) {
  var host = qs('#detail-body');
  host.innerHTML = '';
  var tocItems = [];
  var h2Index = 0;

  post.body.forEach(function (block) {
    var node;
    switch (block.type) {
      case 'h2':
        h2Index += 1;
        node = el('h2', null, block.text);
        node.id = 'sec-' + post.id + '-' + h2Index;
        tocItems.push({ id: node.id, text: block.text });
        break;
      case 'h3':
        node = el('h3', null, block.text);
        break;
      case 'ul':
      case 'ol':
        node = el(block.type);
        (block.items || []).forEach(function (it) {
          var li = el('li', null, it);
          node.appendChild(li);
        });
        break;
      case 'quote':
        node = el('blockquote');
        node.appendChild(el('p', null, block.text));
        break;
      case 'code':
        node = el('pre');
        node.setAttribute('data-lang', block.lang || 'code');
        var code = el('code', null, block.text);
        node.appendChild(code);
        break;
      default:
        node = el('p', null, block.text);
    }
    host.appendChild(node);
  });

  /* 目录 */
  var tocList = qs('#toc-list');
  tocList.innerHTML = '';
  tocItems.forEach(function (item) {
    var li = el('li');
    var a = el('a', null, item.text);
    a.href = '#sec-' + item.id.replace('sec-' + post.id + '-', 'sec-' + post.id + '-');
    a.setAttribute('data-toc', item.id);
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(item.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });

  return tocItems;
}

function navPair(post) {
  var list = filteredPosts();
  var arr = list.length ? list : POSTS;
  var idx = -1;
  for (var i = 0; i < arr.length; i++) { if (arr[i].id === post.id) { idx = i; break; } }
  if (idx === -1) {
    arr = POSTS;
    for (var j = 0; j < arr.length; j++) { if (arr[j].id === post.id) { idx = j; break; } }
  }
  return {
    prev: idx > 0 ? arr[idx - 1] : null,
    next: idx >= 0 && idx < arr.length - 1 ? arr[idx + 1] : null
  };
}

function renderDetail(post) {
  STATE.currentPostId = post.id;

  qs('#detail-title').textContent = post.title;
  var time = qs('#detail-date');
  time.textContent = post.dateText;
  time.setAttribute('datetime', post.date);
  qs('#detail-reading').textContent = post.readingTime + ' 分钟阅读';

  var tags = qs('#detail-tags');
  tags.innerHTML = '';
  post.tags.forEach(function (t) { tags.appendChild(el('span', 'pill', t)); });

  var cover = qs('#detail-cover');
  var vars = coverVars(post.cover);
  cover.style.setProperty('--cover-a', vars.a);
  cover.style.setProperty('--cover-b', vars.b);
  cover.style.setProperty('--cover-shape', vars.shape);
  cover.style.setProperty('--cover-shape-2', vars.shape2);

  renderBody(post);

  var pair = navPair(post);
  var prevBtn = qs('#prev-post');
  var nextBtn = qs('#next-post');
  prevBtn.disabled = !pair.prev;
  nextBtn.disabled = !pair.next;
  prevBtn.setAttribute('aria-disabled', pair.prev ? 'false' : 'true');
  nextBtn.setAttribute('aria-disabled', pair.next ? 'false' : 'true');
  qs('strong', prevBtn).textContent = pair.prev ? pair.prev.title : '没有更多了';
  qs('strong', nextBtn).textContent = pair.next ? pair.next.title : '没有更多了';
  prevBtn.setAttribute('data-post-id', pair.prev ? pair.prev.id : '');
  nextBtn.setAttribute('data-post-id', pair.next ? pair.next.id : '');
}

/* =========================================================
   10. 视图切换与路由
   ========================================================= */
function setView(view) {
  STATE.view = view;
  var home = qs('#home');
  var posts = qs('#posts');
  var detail = qs('#post-detail');
  var progress = qs('#reading-progress');

  if (view === 'detail') {
    home.hidden = true;
    posts.hidden = true;
    detail.hidden = false;
    progress.hidden = false;
  } else {
    home.hidden = false;
    posts.hidden = false;
    detail.hidden = true;
    progress.hidden = true;
    var bar = qs('#reading-progress-bar');
    bar.style.transform = 'scaleX(0)';
    progress.setAttribute('aria-valuenow', '0');
  }
}

function openPost(id) {
  var post = null;
  for (var i = 0; i < POSTS.length; i++) { if (POSTS[i].id === id) { post = POSTS[i]; break; } }
  if (!post) return;
  if (STATE.view !== 'detail') STATE.listScrollY = window.scrollY || 0;
  if (location.hash !== '#post/' + id) {
    history.pushState({ post: id }, '', '#post/' + id);
  }
  renderDetail(post);
  setView('detail');
  window.scrollTo(0, 0);
  updateProgress();
}

function goBackToList(restoreScroll) {
  if (location.hash.indexOf('#post/') === 0) {
    history.pushState({ list: true }, '', '#posts');
  }
  setView('list');
  renderList();
  if (restoreScroll) {
    requestAnimationFrame(function () { window.scrollTo(0, STATE.listScrollY); });
  }
}

function route() {
  var hash = location.hash || '';
  var m = hash.match(/^#post\/(.+)$/);
  if (m) {
    var post = null;
    for (var i = 0; i < POSTS.length; i++) { if (POSTS[i].id === m[1]) { post = POSTS[i]; break; } }
    if (post) {
      if (STATE.view !== 'detail') STATE.listScrollY = window.scrollY || 0;
      renderDetail(post);
      setView('detail');
      window.scrollTo(0, 0);
      updateProgress();
      return;
    }
    goBackToList(false);
    return;
  }
  if (STATE.view === 'detail') {
    setView('list');
    renderList();
    requestAnimationFrame(function () { window.scrollTo(0, STATE.listScrollY); });
    return;
  }
  if (hash === '#posts' || hash === '#home' || hash === '#about') {
    var target = document.getElementById(hash.slice(1));
    if (target) {
      requestAnimationFrame(function () {
        var top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    }
  }
}

/* =========================================================
   11. 阅读进度条
   ========================================================= */
var progressRaf = null;
function updateProgress() {
  if (progressRaf) return;
  progressRaf = requestAnimationFrame(function () {
    progressRaf = null;
    if (STATE.view !== 'detail') return;
    var detail = qs('#post-detail');
    var bar = qs('#reading-progress-bar');
    var wrap = qs('#reading-progress');
    if (!detail || !bar) return;
    var rect = detail.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    var p = 0;
    if (total > 0) p = clamp(-rect.top / total, 0, 1);
    else p = rect.top <= 0 ? 1 : 0;
    var pct = Math.round(p * 100);
    bar.style.transform = 'scaleX(' + p + ')';
    wrap.setAttribute('aria-valuenow', String(pct));
    updateTocActive();
  });
}

function updateTocActive() {
  var links = qsa('#toc-list a');
  if (!links.length) return;
  var current = null;
  links.forEach(function (a) {
    var target = document.getElementById(a.getAttribute('data-toc'));
    if (target && target.getBoundingClientRect().top <= 140) current = a;
  });
  links.forEach(function (a) { a.classList.toggle('is-active', a === current); });
}

/* =========================================================
   12. 导航
   ========================================================= */
function initHeader() {
  var header = qs('#site-header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', (window.scrollY || 0) > 8);
  };
  window.addEventListener('scroll', function () {
    onScroll();
    updateProgress();
  }, { passive: true });
  onScroll();

  /* 滚动高亮 */
  var links = qsa('.nav__link');
  var sections = ['home', 'posts', 'about'].map(function (id) { return document.getElementById(id); });
  function setActive(target) {
    links.forEach(function (l) {
      l.classList.toggle('is-active', l.getAttribute('data-target') === target);
    });
    qsa('.nav-panel__list a').forEach(function (l) {
      l.classList.toggle('is-active', l.getAttribute('data-target') === target);
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { if (s) io.observe(s); });
  }

  /* 汉堡菜单 */
  var toggle = qs('#nav-toggle');
  var panel = qs('#nav-panel');
  function closePanel() {
    panel.classList.remove('is-open');
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开菜单');
    document.body.classList.remove('is-locked');
  }
  function openPanel() {
    panel.hidden = false;
    /* 先显示再添加类，保证过渡生效 */
    requestAnimationFrame(function () { panel.classList.add('is-open'); });
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '关闭菜单');
    document.body.classList.add('is-locked');
  }
  toggle.addEventListener('click', function () {
    if (toggle.getAttribute('aria-expanded') === 'true') closePanel(); else openPanel();
  });
  qsa('.nav-panel__list a').forEach(function (a) {
    a.addEventListener('click', function () {
      closePanel();
      var t = a.getAttribute('data-target');
      if (t === 'contact') {
        var contact = qs('#contact');
        if (contact) {
          requestAnimationFrame(function () {
            contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
            contact.setAttribute('tabindex', '-1');
            contact.focus({ preventScroll: true });
          });
        }
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closePanel();
  });

  return { closePanel: closePanel };
}

/* =========================================================
   13. 滚动淡入
   ========================================================= */
function initReveal() {
  var nodes = qsa('.reveal');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    nodes.forEach(function (n) { n.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  nodes.forEach(function (n) { io.observe(n); });
}

/* =========================================================
   14. 初始化
   ========================================================= */
function init() {
  applyTheme(readTheme(), false);

  qsa('img.avatar-img').forEach(initAvatar);

  renderList();

  /* 主题按钮 */
  qs('#theme-toggle').addEventListener('click', function () {
    applyTheme(STATE.theme === 'dark' ? 'light' : 'dark', true);
  });

  /* 筛选按钮 */
  qsa('.filter__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      STATE.activeTag = btn.getAttribute('data-tag');
      renderList();
    });
  });

  /* 搜索 */
  var input = qs('#search-input');
  input.addEventListener('input', function () {
    STATE.keyword = input.value || '';
    renderList();
  });

  /* 清空筛选 */
  qs('#reset-filters').forEach = null;
  qs('#reset-filters').addEventListener('click', function () {
    STATE.activeTag = 'all';
    STATE.keyword = '';
    input.value = '';
    renderList();
    input.focus();
  });

  /* 复制按钮 */
  qsa('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () { handleCopy(btn); });
  });

  /* 返回列表 */
  qs('#back-to-posts').addEventListener('click', function () {
    goBackToList(true);
  });
  qs('#back-to-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  qs('#footer-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* 上一篇 / 下一篇 */
  qs('#prev-post').addEventListener('click', function () {
    var id = this.getAttribute('data-post-id');
    if (id) openPost(id);
  });
  qs('#next-post').addEventListener('click', function () {
    var id = this.getAttribute('data-post-id');
    if (id) openPost(id);
  });

  /* 年份 */
  qs('#year').textContent = String(new Date().getFullYear());

  /* 路由 */
  window.addEventListener('hashchange', route);
  window.addEventListener('popstate', function () {
    if (STATE.view === 'detail' && location.hash.indexOf('#post/') !== 0) {
      setView('list');
      renderList();
      requestAnimationFrame(function () { window.scrollTo(0, STATE.listScrollY); });
    } else {
      route();
    }
  });

  initHeader();
  initReveal();

  /* 首次进入：按 hash 决定视图 */
  route();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
