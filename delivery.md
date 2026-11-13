```text
file=avatar.js
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

```

```text
file=data.js
/* 极客笔记 · 站点数据
 * 纯静态数据源：所有文章、归档与个人信息均在此维护。
 */
window.BLOG_DATA = {
  profile: {
    nickname: '极客笔记',
    realName: '陈默',
    role: '前端工程师 / 独立开发者',
    qq: '3627236036',
    email: 'hi@geek-notes.dev',
    github: 'github.com/geeknotes',
    location: '杭州 · 中国',
    siteName: '极客笔记',
    slogan: '写代码，也写生活 —— 一个前端工程师的个人角落',
    introShort:
      '六年 Web 前端经验，专注界面工程与性能优化。相信好的产品既要有工程上的严谨，也要有内容上的温度。',
    bio: [
      '你好，我是陈默，网名「极客笔记」。白天在一家做企业级 SaaS 的公司里写前端，晚上回到自己的小出租屋继续折腾个人项目。',
      '我的工作日常和 Vue / React / TypeScript 打交道，做过组件库、设计系统、构建工具链，也做过不少可视化与数据大屏。比起追新框架，我更在意一个东西：它到底有没有让使用者少点一次鼠标、少等一秒。',
      '写作是我梳理思路的方式。每写一篇长文，我都会强迫自己把模糊的直觉写成可执行的步骤，这比写完代码更让我安心。这个博客会记录我在工程实践中的踩坑、踩坑之后的思考，以及一些与代码无关的生活碎片。',
      '如果你也在深夜改 bug，或者正在为一个组件的间距纠结，欢迎通过右下角的联系方式找我聊聊。'
    ],
    skills: [
      { name: 'TypeScript', level: 90 },
      { name: 'Vue 3 / Nuxt', level: 92 },
      { name: 'React / Next.js', level: 85 },
      { name: 'CSS 架构', level: 88 },
      { name: 'Node.js', level: 76 },
      { name: '性能优化', level: 82 },
      { name: '数据可视化', level: 74 },
      { name: '技术写作', level: 80 }
    ],
    stats: [
      { label: '累计文章', value: '11', suffix: '篇' },
      { label: '累计字数', value: '8.6', suffix: '万字' },
      { label: '建站时间', value: '2020', suffix: '年' },
      { label: '访客总数', value: '42', suffix: 'k' }
    ],
    contacts: [
      { label: 'QQ 邮箱', value: '3627236036', icon: 'qq' },
      { label: '电子邮箱', value: 'hi@geek-notes.dev', icon: 'mail' },
      { label: 'GitHub', value: 'github.com/geeknotes', icon: 'code' },
      { label: '所在城市', value: '杭州 · 中国', icon: 'pin' }
    ]
  },

  categories: ['全部', '前端', '后端', '生活', '随笔'],

  posts: [
    {
      id: 'p1',
      title: '从零搭建一个个人博客的静态站点：我的取舍清单',
      date: '2024-06-12',
      category: '前端',
      readTime: 8,
      tags: ['HTML', 'CSS', '静态站点', '工程化'],
      summary:
        '市面上的博客框架很多，但我最终还是选择了最笨的方式：手写 HTML、CSS 和一点原生 JavaScript。这篇文章记录了从目录结构、主题变量到图片降级的完整决策过程，以及那些「明明可以更简单」却依然保留的设计。',
      body: [
        { type: 'h2', text: '为什么最后还是手写了' },
        { type: 'p', text: '写博客这件事我断断续续做了五年。中间换过 Hexo、换过 VuePress、也折腾过 Gatsby，每次都花在「适配新版本依赖」和「主题样式跟不上一」上。后来我意识到，我真正想写的不是博客系统，而是文章本身。既然如此，为什么不把系统压到最薄？' },
        { type: 'p', text: '于是这次我给自己定了三条硬性约束：不引入任何构建工具、不依赖任何外部字体与图标库、除用户头像外不请求任何第三方资源。剩下的部分，用三个文件就能表达清楚。' },
        { type: 'quote', text: '工具链每多一层，内容就少一层。能把复杂度压到最小的地方，就不要留给读者。' },
        { type: 'h2', text: '目录结构：一个页面，两种视角' },
        { type: 'p', text: '整个站点只有两个 HTML 文件。index.html 承担首页、归档与关于我三个区块，post.html 承担文章详情。它们共享同一份 style.css 与 app.js，靠锚点与锚点导航互相跳转。' },
        { type: 'pre', lang: 'text', code: 'blog/\n├── index.html      # 首页：Hero / 文章 / 归档 / 关于\n├── post.html       # 文章详情页\n├── style.css       # 全站样式与主题变量\n├── app.js          # 交互逻辑\n├── data.js         # 文章数据\n└── avatar.js       # QQ 头像获取与降级' },
        { type: 'p', text: '文章正文保存在 data.js 里，用结构化对象描述标题、摘要、分类、阅读时长以及正文块。详情页按 URL 上的 id 查询并渲染，这样做的好处是：以后如果想换到任意静态托管平台，都不需要改结构。' },
        { type: 'h3', text: '正文块的三种基本形态' },
        { type: 'p', text: '我定义了段落、标题、引用、代码、列表和表格六种块类型。渲染时把它们映射成语义化标签，代码块额外挂一个复制按钮，标题额外挂锚点 id 以便生成目录。' },
        { type: 'ul', items: ['段落 p：用于绝大多数正文，行高 1.8', '标题 h2 / h3：自动生成锚点与右侧目录', '引用 quote：左侧竖线 + 灰底，用于放结论或原话', '代码 pre：深色底、等宽字体、一键复制', '列表 ul / ol：用于步骤与要点枚举', '表格 table：用于对比与参数说明'] },
        { type: 'h2', text: '主题：用 CSS 变量做一次，多端复用' },
        { type: 'p', text: '浅色和暗色并不需要两套样式表。所有颜色、间距、圆角、阴影都收敛在 :root 的变量里，暗色主题只需要覆盖其中几个语义色。切换时把主题名写进 localStorage，页面加载前先读取，避免闪烁。' },
        { type: 'pre', lang: 'css', code: ':root {\n  --color-primary: #4f46e5;\n  --color-bg: #ffffff;\n  --color-text: #0f172a;\n  --radius-md: 12px;\n  --shadow-sm: 0 1px 2px rgba(15, 23, 42, .06);\n}\n\n[data-theme="dark"] {\n  --color-bg: #0b1120;\n  --color-text: #e2e8f0;\n}' },
        { type: 'p', text: '这里有个小技巧：把主题属性挂在 html 元素上，而不是 body。上面的内联脚本在 head 里同步执行，读取 localStorage 后立刻设置属性，首屏不会闪白。' },
        { type: 'h2', text: '头像：三级降级才是完整方案' },
        { type: 'p', text: '头像走 QQ 官方接口，但网络并不总是可靠的。我的做法是准备 q1、q2 两个域名作为一级和二级来源，再准备一个本地生成的 SVG 作为最终兜底：灰色底、居中显示 QQ 号后四位。' },
        { type: 'pre', lang: 'js', code: 'const SOURCES = [\n  "https://q1.qlogo.cn/g?b=qq&nk=3627236036&s=640",\n  "https://q2.qlogo.cn/g?b=qq&nk=3627236036&s=640"\n];\n\nimg.onerror = () => {\n  const next = SOURCES.shift();\n  next ? (img.src = next) : (img.src = fallbackSVG());\n};' },
        { type: 'h2', text: '最终的效果清单' },
        { type: 'table', head: ['模块', '方案', '踩过的坑'], rows: [
          ['主题', 'CSS 变量 + localStorage', '首屏闪烁，改为 head 内联脚本'],
          ['头像', '双域名 + SVG 兜底', '接口偶发 404，需要 error 链'],
          ['目录', '渲染时扫描 h2/h3 生成', '锚点中文在部分环境需 encodeURI'],
          ['动效', 'IntersectionObserver', '首屏元素需触发一次观察'],
          ['代码高亮', '手工着色，不引库', '正则需避开字符串内的关键词']
        ] },
        { type: 'p', text: '整站跑下来，纯 HTML + CSS + 原生 JS 的体量不到 120 KB，加载几乎瞬间完成。对我这种把内容放在第一位的人来说，这比任何炫技的框架都合适。' }
      ]
    },
    {
      id: 'p2',
      title: 'Node.js 服务端渲染的取舍：什么时候该换回静态',
      date: '2024-06-05',
      category: '后端',
      readTime: 10,
      tags: ['Node.js', 'SSR', '架构', '性能'],
      summary:
        'SSR 不是银弹。这一篇从首屏时间、缓存复杂度、部署成本三个维度复盘了我做过的两个 SSR 项目，最后给出一套「先静态、确有需要再动态」的判断标准，以及我在博客上做过的具体优化。',
      body: [
        { type: 'h2', text: '两个项目，两种结果' },
        { type: 'p', text: '第一个项目是一个内容型电商站，商品页需要 SEO 和实时库存，最终选了 Nuxt 的混合渲染。当时的收益很明显：搜索引擎收录的页面 HTML 里已经带了商品信息，LCP 从 2.8 秒降到 1.4 秒。' },
        { type: 'p', text: '第二个项目是一个内部运营后台的营销页，团队也要求上 SSR，但页面数据全部来自一个内部 API，前端没有任何可静态化的部分。结果是：服务器渲染的耗时比原来的纯前端请求还多，缓存策略一上线就没人维护。' },
        { type: 'quote', text: 'SSR 解决的是「首屏可见内容」的问题。如果你本来就没有服务端才能拿到的数据，那它解决不了任何问题。' },
        { type: 'h2', text: '三个必须回答的问题' },
        { type: 'ol', items: [
          '页面是否存在「不执行 JS 就完全不可用」的场景？如果是，SSR 值得；如果只是加载慢，先做代码分割。',
          '服务端渲染带来的 HTML 能否被有效缓存？如果缓存命中率低，SSR 的成本会被放大。',
          '团队是否有能力维护渲染层的数据获取、缓存失效与降级策略？没有的话，复杂度本身就是负债。'
        ] },
        { type: 'h2', text: '缓存：SSR 最容易翻车的地方' },
        { type: 'p', text: '我们在商品页上做过一次分层缓存：先按 URL 缓存完整 HTML，再按商品维度缓存数据片段。上线第一周命中率能做到 92%，后来运营开始频繁改价，缓存失效逻辑越写越复杂，最后干脆把商品页改回了客户端渲染加预取。' },
        { type: 'pre', lang: 'js', code: 'async function getCachedPage(url) {\n  const hit = await redis.get(url);\n  if (hit) return hit;\n\n  const html = await render(url);\n  await redis.setex(url, 60, html);\n  return html;\n}' },
        { type: 'table', head: ['方案', '首屏 LCP', '运维成本', '适合场景'], rows: [
          ['纯静态', '0.6s', '极低', '博客、文档、落地页'],
          ['SSG + 增量重建', '0.9s', '低', '电商详情、活动页'],
          ['SSR + 强缓存', '1.2s', '中', '内容 SEO 敏感站'],
          ['CSR', '2.4s', '中', '后台、登录后应用']
        ] },
        { type: 'h2', text: '我的博客最终的选择' },
        { type: 'p', text: '回到这个博客。它只有十几个页面，文章更新频率以周计，几乎没有动态数据。于是纯静态是显而易见的最优解：任何 GitHub Pages、Vercel 静态托管都能部署，构建产物就是源文件本身。' },
        { type: 'ul', items: ['首屏没有任何阻塞请求，除头像外全部内联或同源', '离线时除头像外页面功能完全可用', '部署只需要一次 git push，无需服务器与数据库', '文章数据集中在 data.js，重构页面不需要迁移内容'] },
        { type: 'p', text: '如果未来这个站点加入评论、订阅或者阅读量统计，我会优先考虑「静态页面 + 独立 API」的组合，而不是把整页变成 SSR。局部动态，通常比整体动态便宜得多。' }
      ]
    },
    {
      id: 'p3',
      title: '把周末还给自己：一份不加班的四周实验记录',
      date: '2024-05-28',
      category: '生活',
      readTime: 6,
      tags: ['生活方式', '时间管理', '思考'],
      summary:
        '连续四周，我尝试把周末从「补工作」改回「过生活」。这里记录了具体的规则、真实发生的变化，以及那些我没想到的代价——包括三周之后的一次明显反弹。',
      body: [
        { type: 'h2', text: '实验的起点' },
        { type: 'p', text: '我是一个典型的「周末补偿型」选手：周一到周五写代码，周末如果进度落后，就用周末的时间补上。表面上看是自律，实际上是工作侵入了本该休息的两天。真正让我意识到问题的，是一次连续三周的高强度加班之后，我在周日晚上打开电脑，发现自己已经完全没有精力做任何事了。' },
        { type: 'quote', text: '如果周末必须用来追赶，说明工作日的节奏本身就是有问题的。' },
        { type: 'h2', text: '我定的四条规则' },
        { type: 'ol', items: [
          '周六上午不碰工作相关的一切，包括群消息和邮件通知。',
          '周末的电脑只用来写个人项目，不用来处理公司任务。',
          '每周日晚上留出一小时，写下这一周做成了什么、没做成什么。',
          '任何「非做不可」的事，写进下周的待办清单，而不是立刻打开电脑。'
        ] },
        { type: 'h2', text: '真实发生的变化' },
        { type: 'h3', text: '第一周：焦虑感很强' },
        { type: 'p', text: '第一个周六上午，我打开电脑又关掉了，一共七次。焦虑的来源很清晰：我害怕自己在偷懒，怕同事进度比我快，怕一旦松下来就再也绷不住了。但当我真的把那两个上午空出来，去超市买了菜、去河边走了走之后，那种恐慌感明显减弱了。' },
        { type: 'h3', text: '第三周：效率反而上去了' },
        { type: 'p', text: '第三周发生了一件意外的事：工作日的产出没有下降，反而比之前更高。原因并不神秘——当周末被真正还给自己之后，我在工作日更愿意集中处理需要深度思考的任务，而不是一边写代码一边焦虑周末。' },
        { type: 'table', head: ['指标', '实验前四周', '实验中四周', '变化'], rows: [
          ['周末投入工作时长', '14.5 小时', '2.0 小时', '-86%'],
          ['工作日深度任务数', '2.1 个/天', '3.4 个/天', '+62%'],
          ['睡眠达标天数', '4.2 天/周', '6.3 天/周', '+50%'],
          ['主动运动次数', '1 次/周', '3.5 次/周', '+250%']
        ] },
        { type: 'h2', text: '第三周之后：一次反弹' },
        { type: 'p', text: '第四周，项目进入了交付期，我又出现了「周末补进度」的冲动。这次我没有完全放弃规则，而是把规则改成了更有弹性的一版：允许自己占用周日下午的两个小时，但必须提前写清楚要做什么，并且在结束后关闭所有工作通知。' },
        { type: 'p', text: '这大概是我这次实验最大的收获：把周末还给自己，不是意志力问题，而是规则设计问题。允许计划内的小幅侵占，反而比「绝对不允许」更能坚持。' },
        { type: 'h2', text: '现在我的周末大致长这样' },
        { type: 'ul', items: ['周六上午：睡到自然醒，然后去一个没去过的地方走走', '周六下午：读半小时与工作无关的书，或者做一顿饭', '周日白天：处理家务、见朋友，或者彻底什么都不做', '周日晚上：写周记，复盘下周计划，顺便给博客写一篇东西'] },
        { type: 'p', text: '这个博客本身就是我这个实验的一个成果。它不是「加班产物」，它是周末的产物，这一点让我愿意一直写下去。' }
      ]
    },
    {
      id: 'p4',
      title: 'CSS 容器查询实战：组件不再关心自己身处何处',
      date: '2024-05-20',
      category: '前端',
      readTime: 9,
      tags: ['CSS', '响应式', '组件化', '布局'],
      summary:
        '媒体查询问的是「视口有多宽」，而组件真正想知道的是「我被放在了多宽的容器里」。容器查询正是补上了这块拼图，本文用卡片、侧栏与列表三个真实例子说明它如何简化组件样式。',
      body: [
        { type: 'h2', text: '媒体查询解决不了的问题' },
        { type: 'p', text: '在写组件库的时候，我经常遇到一个尴尬的对话：「这个卡片在侧栏里要变成竖排，在主内容区里要保持横排。」用媒体查询实现，你只能靠一些额外的 class 或者 data 属性来告诉组件它现在身处何处，这等于把布局信息泄漏到了组件内部。' },
        { type: 'pre', lang: 'html', code: '<!-- 过去：靠父级添加修饰类来暗示容器宽度 -->\n<div class="content is-narrow">\n  <article class="card card--stacked">...</article>\n</div>' },
        { type: 'p', text: '容器查询把判断依据换成了容器本身的尺寸，组件只需要看自己能看见的世界。' },
        { type: 'h2', text: '最小可用示例' },
        { type: 'pre', lang: 'css', code: '.card-host {\n  container-type: inline-size;\n  container-name: card;\n}\n\n.card {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n@container card (min-width: 420px) {\n  .card {\n    grid-template-columns: 180px 1fr;\n    align-items: start;\n  }\n}' },
        { type: 'h3', text: 'container-type 的三个值' },
        { type: 'ul', items: [
          'inline-size：只在行内方向建立查询容器，绝大多数场景用它',
          'size：同时约束行内与块内方向，需要显式指定高度，容易引起布局问题',
          'normal：不建立容器，仅作为默认行为'
        ] },
        { type: 'h2', text: '实战一：自适应卡片' },
        { type: 'p', text: '本站的文章卡片就是容器查询的受益者。它被放在两列栅格里，但栅格在移动端会变成单列。如果用媒体查询，就得在每个断点重复写一遍样式；用容器查询之后，卡片自己的规则只写一次。' },
        { type: 'pre', lang: 'css', code: '.post-grid {\n  container-type: inline-size;\n}\n\n.post-card { display: grid; grid-template-columns: 1fr; }\n\n@container (min-width: 640px) {\n  .post-card { grid-template-columns: 200px 1fr; }\n  .post-card__cover { aspect-ratio: 4 / 3; }\n}' },
        { type: 'h2', text: '实战二：侧栏里的内容区' },
        { type: 'p', text: '文章详情页有一个桌面端的悬浮目录，目录出现之后正文区域会变窄。传统做法是给正文加一个 padding-left，现在只需要让正文成为容器即可。' },
        { type: 'pre', lang: 'css', code: '.post-body { container-type: inline-size; }\n\n@container (min-width: 560px) {\n  .post-body { font-size: 16px; }\n}\n\n@container (max-width: 460px) {\n  .post-body { font-size: 15px; }\n  .post-body pre { font-size: 13px; }\n}' },
        { type: 'h2', text: '需要留意的地方' },
        { type: 'table', head: ['注意点', '说明', '应对方式'], rows: [
          ['尺寸查询需显式高度', 'size 模式下容器高度必须指定', '优先使用 inline-size'],
          ['容器不能是 flex/grid 子项的尺寸源', '可能造成循环依赖', '给容器设 min-width: 0'],
          ['查询单位 cqw / cqh', '1 cqw = 容器宽度的 1%', '用于流式排版非常合适'],
          ['浏览器支持', '现代浏览器已普遍支持', '旧环境降级为默认单列即可']
        ] },
        { type: 'quote', text: '好的组件不应该知道自己在页面的哪个位置。容器查询让组件第一次拥有了这种能力。' },
        { type: 'h2', text: '一点思考' },
        { type: 'p', text: '容器查询的意义不止于少写几行 CSS。它其实在推动一种组件设计思路的转变：从「页面决定组件长什么样」变成「组件根据可用空间自己决定长什么样」。这种转变对于设计系统的长期维护尤其重要。' }
      ]
    },
    {
      id: 'p5',
      title: '写代码五年后，我重新理解「效率」',
      date: '2024-05-11',
      category: '随笔',
      readTime: 7,
      tags: ['思考', '职业', '效率'],
      summary:
        '刚入行时我把效率等同于「写得更快」，现在我认为它更接近「让正确的事情更容易被做对」。这篇随笔聊聊我在工具、流程与注意力三个层面上的认知变化。',
      body: [
        { type: 'h2', text: '从「敲键盘的速度」开始' },
        { type: 'p', text: '2019 年刚工作的时候，我几乎不看编辑器快捷键的教程，代码基本靠手打。同事用 Vim 的跳转键三秒钟跳到方法定义，我需要用鼠标找三十秒。那时候我以为这就是差距的全部。' },
        { type: 'p', text: '后来我开始系统地学快捷键、装插件、折腾终端。打字速度确实上来了，一天下来能少花大概二十分钟在机械动作上。但那二十分钟从来没有真正变成产出，它们被更快的上下文切换消耗掉了。' },
        { type: 'h2', text: '效率的真实单位' },
        { type: 'p', text: '我现在更愿意把效率理解成单位时间内的「有效决策数」。写代码本身是执行，不是决策。真正的决策在于：这个方案要不要抽象、边界划在哪里、什么时候该推翻自己重写。这些决策占用的时间不一定多，但决定了你三个月的走向。' },
        { type: 'quote', text: '写代码的时间越长，真正做决定的时间越少。一个只会敲键盘的中级工程师，往往比一个知道什么时候该停下来的初级工程师更有产出。' },
        { type: 'h2', text: '三个层面的变化' },
        { type: 'h3', text: '工具层：从追求快到追求少' },
        { type: 'p', text: '我的插件数量从高峰期的三十多个降到了现在的九个。新插件不再带来兴奋感，反而带来维护成本：一个插件更新导致语法高亮错乱，一个插件占用两秒启动时间。工具的价值不在于能做什么，而在于它不在的时候你会不会立刻察觉。' },
        { type: 'h3', text: '流程层：从个人技巧到团队约定' },
        { type: 'p', text: '早期我引以为傲的是个人效率技巧：自己的目录规范、自己的命名习惯、自己的调试流程。这些在协作里几乎没有价值，甚至因为别人看不懂而增加了沟通成本。现在我更愿意把时间花在把约定写进文档、lint 规则和 CI 里。' },
        { type: 'pre', lang: 'js', code: '// 把「个人习惯」变成「团队默认」，比十篇规范文档都有效\nmodule.exports = {\n  rules: {\n    "no-console": "warn",\n    "import/order": ["warn", { "alphabetize": { "order": "asc" } }],\n    "complexity": ["warn", 12],\n    "max-lines-per-function": ["warn", 60]\n  }\n};' },
        { type: 'h3', text: '注意力层：连续时间是稀缺资源' },
        { type: 'p', text: '这是我花了最久才承认的一点。人的深度思考状态很难在十分钟内启动两次。消息通知、临时会议、甚至「看一眼邮箱」都会重置这个状态。我现在的做法是：上午只处理需要创造的任务，把沟通类事情统一放在下午三点。' },
        { type: 'ul', items: ['上午 9:30 - 11:30：不看任何消息，只做需要设计的事情', '午休后 14:00 - 14:30：集中回复消息与邮件', '下午 15:00 之后：会议、评审、协作类任务', '晚上不再打开工作 IM，周末彻底关机'] },
        { type: 'h2', text: '这和写博客有什么关系' },
        { type: 'p', text: '写博客是我能想到的、最低成本的深度思考练习。写的时候没法糊弄——一行含糊的表述在半年后一定会被自己抓住。而且写作天然需要一个完整的、不被打断的时间块，这反过来训练了我保护注意力的能力。' },
        { type: 'p', text: '效率从来不是让人做更多事，而是让人少做无效的事，同时把重要的事做得更扎实。这句话我用了五年才真正理解。' }
      ]
    },
    {
      id: 'p6',
      title: '用 Docker 压缩本地开发环境：从三台机器到一个 compose',
      date: '2024-04-26',
      category: '后端',
      readTime: 8,
      tags: ['Docker', 'DevOps', '工程效率', 'MySQL'],
      summary:
        '以前我的本地环境要开虚拟机、装数据库、跑 Redis，配置各不相同。这篇记录我用 docker compose 重构本地环境的过程，包括网络、卷、数据初始化与那些容器化之后暴露出来的新问题。',
      body: [
        { type: 'h2', text: '混乱的起点' },
        { type: 'p', text: '在折腾容器之前，我的电脑上有：一台 VirtualBox 跑着完整的测试环境（CentOS、MySQL 5.7、Redis、Nginx），本机装着一份 MySQL 8 用于开发，还有一份 Redis 跑在 6379，测试环境的 Redis 在虚拟机里的 6380。端口冲突是家常便饭。' },
        { type: 'p', text: '更麻烦的是版本差异。开发机用 MySQL 8，测试环境是 5.7，于是出现了只在部分机器上复现的 SQL 报错——典型的是默认字符集排序规则不一致导致的索引失效。' },
        { type: 'h2', text: '目标' },
        { type: 'ul', items: ['一条命令启动全部依赖', '开发与测试环境版本完全一致', '数据可随时重置，且不影响我的本地文件', '不依赖 VirtualBox，笔记本合盖就能带走'] },
        { type: 'h2', text: '最终的 compose 文件' },
        { type: 'pre', lang: 'yaml', code: 'services:\n  mysql:\n    image: mysql:8.0\n    ports: ["3306:3306"]\n    environment:\n      MYSQL_ROOT_PASSWORD: devpass\n      MYSQL_DATABASE: app_dev\n    volumes:\n      - mysql-data:/var/lib/mysql\n      - ./init:/docker-entrypoint-initdb.d\n    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_0900_ai_ci\n\n  redis:\n    image: redis:7-alpine\n    ports: ["6379:6379"]\n    command: redis-server --appendonly yes\n    volumes:\n      - redis-data:/data\n\nvolumes:\n  mysql-data:\n  redis-data:' },
        { type: 'h3', text: '几个关键点' },
        { type: 'ol', items: [
          'init 目录里的 .sql 文件会在容器首次启动时自动执行，适合放建表与种子数据。',
          '数据放在命名卷里，重建容器不会丢数据；想彻底重置就 docker compose down -v。',
          'collation-server 显式指定 utf8mb4_0900_ai_ci，避免不同机器默认值不同。',
          'redis 开启 appendonly，重启后 key 不会丢，便于断点调试。'
        ] },
        { type: 'h2', text: '容器化之后新出现的问题' },
        { type: 'p', text: '容器不是银弹，它只是把复杂度搬到了一个更可控的地方。在我迁移之后，遇到了几个新问题。' },
        { type: 'h3', text: '文件权限' },
        { type: 'p', text: 'MySQL 容器里生成的数据库文件属主是 999（mysql 用户），在 Mac 上通过挂载回宿主机时偶尔会变成只读。解决办法是把数据目录完全交给命名卷管理，不要挂载到具体路径。' },
        { type: 'pre', lang: 'bash', code: '# 不要再这样做\n# volumes:\n#   - ./data/mysql:/var/lib/mysql\n\n# 改为命名卷\nvolumes:\n  mysql-data:' },
        { type: 'h3', text: '连接地址不再是 localhost' },
        { type: 'p', text: '如果应用本身也在 compose 里，服务名就是主机名，本地开发时则用 127.0.0.1。为了不写两套配置，我用一个环境变量 DATABASE_HOST，开发环境填 127.0.0.1，容器内通过 override 文件改成 mysql。' },
        { type: 'pre', lang: 'yaml', code: 'services:\n  api:\n    build: ./api\n    environment:\n      DATABASE_HOST: mysql\n    depends_on:\n      - mysql\n      - redis' },
        { type: 'h2', text: '开发体验对比' },
        { type: 'table', head: ['维度', '迁移前', '迁移后'], rows: [
          ['环境搭建耗时', '约 2 小时', '约 5 分钟'],
          ['数据库版本一致性', '经常不一致', '完全一致'],
          ['端口冲突处理', '频繁手动排查', '统一映射，几乎无冲突'],
          ['换机成本', '重装一切', '拉代码 + 一条命令'],
          ['磁盘占用', 'VirtualBox 镜像约 12 GB', '约 1.4 GB']
        ] },
        { type: 'quote', text: '容器化最大的价值不是「跑在容器里」，而是把「环境和代码」一起版本化了。' },
        { type: 'h2', text: '给前端开发者的建议' },
        { type: 'p', text: '如果你只写前端，Docker 的收益主要在后端依赖与数据库版本统一上。同样值得做的一件事，是把开发服务器也放进容器，这样不同同事的 Node 版本就不会再打架——尤其是原生依赖在不同 Node 大版本下频繁翻车的场景。' }
      ]
    },
    {
      id: 'p7',
      title: 'TypeScript 类型体操入门，以及我为什么劝你别深入',
      date: '2024-04-15',
      category: '前端',
      readTime: 11,
      tags: ['TypeScript', '类型系统', '工程实践'],
      summary:
        '类型体操很有趣，但它在真实项目里的边际收益远低于预期。这篇从条件类型、映射类型、模板字面量三个层次讲清楚类型系统能做什么，然后给出一套「什么时候该写复杂类型」的实用判断标准。',
      body: [
        { type: 'h2', text: '类型体操的三层境界' },
        { type: 'p', text: '第一层是基础类型标注与接口定义，绝大多数项目 90% 的代码停在这里。第二层是泛型与工具类型，比如 Partial、Pick、Record。第三层才是条件类型、映射类型与模板字面量的组合，也就是社区里所说的「类型体操」。' },
        { type: 'h3', text: '第二层：泛型与工具类型' },
        { type: 'pre', lang: 'ts', code: 'interface ApiResponse<T> {\n  code: number;\n  message: string;\n  data: T;\n}\n\ntype Page<T> = {\n  list: T[];\n  total: number;\n  page: number;\n};\n\ntype UserDTO = {\n  id: number;\n  name: string;\n  avatar: string;\n  createdAt: string;\n};\n\n// 从完整实体中挑出需要的字段\ntype UserListItem = Pick<UserDTO, "id" | "name" | "avatar">;' },
        { type: 'h3', text: '第三层：条件类型与映射类型' },
        { type: 'pre', lang: 'ts', code: 'type Nullable<T> = T extends null | undefined ? T : T | null;\n\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object\n    ? DeepReadonly<T[K]>\n    : T[K];\n};\n\ntype Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};' },
        { type: 'p', text: '这段代码每一行都能看懂，但组合起来之后，任何一个环节出错都会得到一条难以阅读的错误信息。这就是类型体操最大的问题：它把类型系统变成了一个需要调试的编程语言。' },
        { type: 'h2', text: '真实项目里的收益递减' },
        { type: 'p', text: '我维护过一个使用 DeepReadonly 与复杂条件类型的 SDK，起初非常兴奋，后来遇到三个问题。' },
        { type: 'ol', items: [
          '编译速度：类型层级过深时，tsc 的检查时间从 4 秒涨到 22 秒。',
          '错误信息：使用者报错时看到的是一整段展开的类型定义，而不是清晰的提示。',
          '维护成本：每次升级 TypeScript 版本，都可能出现类型推断结果的变化，需要逐个回归。'
        ] },
        { type: 'quote', text: '类型的价值在于约束错误，而不是炫技。当一个类型需要三行注释才能解释清楚时，它已经越界了。' },
        { type: 'h2', text: '我的判断标准' },
        { type: 'table', head: ['场景', '是否值得写复杂类型', '理由'], rows: [
          ['表单字段校验', '值得', '类型直接对应运行时逻辑，收益立刻可见'],
          ['接口响应映射', '值得', '一层 Pick / Omit 就够，避免深层条件类型'],
          ['通用组件 Props', '值得', '泛型能让组件同时服务多种数据类型'],
          ['把 JSON 变成类型', '一般', '维护成本高，接口一变就要改类型'],
          ['为了「更严格」而写', '不值得', '严格不等于复杂，过度类型会拖慢迭代'],
          ['DSL / 链式 API', '偶尔', '只有当类型能大幅减少运行时校验时才值']
        ] },
        { type: 'h2', text: '更实用的替代方案' },
        { type: 'p', text: '与其在类型层面追求极致，不如在运行时做校验。Zod、Valibot 这类库可以从一份 schema 同时生成类型和校验逻辑，类型与运行时永远不会不一致。' },
        { type: 'pre', lang: 'ts', code: 'import { z } from "zod";\n\nconst UserSchema = z.object({\n  id: z.number(),\n  name: z.string().min(1),\n  avatar: z.string().url(),\n});\n\ntype User = z.infer<typeof UserSchema>;\n\n// 运行时校验与静态类型来自同一份定义\nfunction parseUser(input: unknown): User {\n  return UserSchema.parse(input);\n}' },
        { type: 'h2', text: '结语' },
        { type: 'p', text: 'TypeScript 的日常价值在于把大量运行时的「可能出错」提前到编译期发现，这一点上它无可替代。但作为类型语言去研究那些极限用法，是我个人兴趣而非工作需要。写业务代码时，我的原则是：类型注解要能被同事在三十秒内读懂，否则就换个更笨的写法。' }
      ]
    },
    {
      id: 'p8',
      title: '一个人的租房改造记录：600 元把出租屋变成能住的地方',
      date: '2024-04-02',
      category: '生活',
      readTime: 7,
      tags: ['租房', '家居', '整理'],
      summary:
        '搬家第七次之后，我终于接受了一个事实：短期内不会买房，那为什么不把租的房子住舒服一点？这篇记录了照明、收纳、色彩、绿植与动线五个方向的实际改造，以及每一样东西的花费与效果。',
      body: [
        { type: 'h2', text: '前提：不能改的东西' },
        { type: 'p', text: '租房改造有很多限制：墙不能砸、不能钉钉子（押金）、不能改电路、搬家要能带走。我给自己定的前提是：所有改造要么可逆，要么本身就不依赖墙体。' },
        { type: 'h3', text: '预算与清单' },
        { type: 'table', head: ['项目', '花费（元）', '效果'], rows: [
          ['LED 落地灯 + 台灯', '218', '夜晚不再刺眼，工作区亮度提升明显'],
          ['可移动置物架', '129', '免打孔，替代所有墙面置物'],
          ['亚麻窗帘', '156', '隔光与隐私一步到位'],
          ['地毯（可水洗）', '89', '脚感与声音都好很多'],
          ['绿植三盆', '96', '空间呼吸感提升'],
          ['收纳箱与挂钩', '90', '释放出两格衣柜'],
          ['香薰与桌灯配件', '62', '氛围提升但性价比一般']
        ] },
        { type: 'h2', text: '一、照明是最划算的一笔' },
        { type: 'p', text: '原屋只有一盏吸顶灯，白光偏冷，晚上对着电脑非常刺眼。我买了一盏可调色温的落地灯放在角落，配一盏暖光台灯放在书桌。色温从 4000K 调到 2700K 之后，晚上写东西的心情都不一样。' },
        { type: 'quote', text: '如果只能做一件事，那就换灯。灯光决定了你在家里的两小时是痛苦还是享受。' },
        { type: 'h2', text: '二、收纳靠垂直空间' },
        { type: 'p', text: '不能钉钉子，那就买免打孔的置物架。关键不是买得多，而是让每一件东西都有固定的家。我用了两个小时给所有东西贴了标签，并按照使用频率分层：常用的放在腰部高度，不常用的放顶。' },
        { type: 'ul', items: ['书桌正前方 60cm 内：只放每天用的东西', '落地架中层：换洗衣物与待洗衣物', '落地架顶层：季节性物品与备用耗材', '抽屉内部用分隔板，避免每次都要翻'] },
        { type: 'h2', text: '三、色彩只动软装' },
        { type: 'p', text: '墙面不能改色，但床品、窗帘、地毯都可以换。我的原则是：底色保持浅木与白，只用两到三个颜色做点缀，比如墨绿与砖红。避免大面积高饱和色，那会让小空间显得更拥挤。' },
        { type: 'h2', text: '四、动线决定舒适度' },
        { type: 'p', text: '我画了一张很粗糙的平面图，标出从门口到床、到书桌、到卫生间的路线。结果发现每次去卫生间都要绕过椅子，于是把椅子换成了可推入桌下的折叠款。改动几乎为零，但每天少绕十几步。' },
        { type: 'h2', text: '五、绿植要挑好养的' },
        { type: 'p', text: '我先后养死过两盆绿萝，因为出门一周忘了浇水。现在只养三盆：虎尾兰（两周浇一次）、仙人掌（一个月一次）、一盆水培的绿萝（看着就好）。原则是：宁可少而稳定，不要多而需要操心。' },
        { type: 'h2', text: '最后的一点想法' },
        { type: 'p', text: '这半年我花在改造上的钱大概不到七百块，但它把一个「睡觉的地方」变成了一个可以待着写东西的地方。居住的质量和产权无关，很多时候只是取决于你有没有认真对待那几个小时的日常。' }
      ]
    },
    {
      id: 'p9',
      title: '关于开源与个人项目的取舍',
      date: '2024-03-18',
      category: '随笔',
      readTime: 6,
      tags: ['开源', '独立开发', '思考'],
      summary:
        '我做过的三个个人项目，两个至今还在更新，一个已经四年没有提交。这篇复盘其中的差异：不是技术选型的问题，而是「有没有一个必须解决的问题」的问题。',
      body: [
        { type: 'h2', text: '两个活下来的项目' },
        { type: 'p', text: '一个是极简的 CSS 布局工具集，只解决我在公司项目里反复手写栅格的问题；另一个是一个本地 Markdown 预览脚本，用来解决我写博客时的预览需求。它们都满足一个条件：我在写它们之前，已经手动做过这件事超过二十次。' },
        { type: 'quote', text: '个人项目的起点不应该是「我想学 X」，而应该是「我被 X 烦了二十次」。' },
        { type: 'h2', text: '那个死掉的项目' },
        { type: 'p', text: '第三个项目是一个功能完整的脚手架模板，包含路由、状态管理、请求封装、权限与埋点。它死于没有真实使用场景：我搭好骨架之后，就没有什么非用它不可的理由了。半年后我给它加了一个新依赖，配置冲突，折腾一个下午，最后放弃，回到手写。' },
        { type: 'h2', text: '差异在哪里' },
        { type: 'table', head: ['维度', '活下来的项目', '死掉的项目'], rows: [
          ['起点', '重复二十次的具体麻烦', '技术栈看起来很酷'],
          ['使用者', '只有我，但每天都在用', '预期有很多，暂时只有我'],
          ['完成标准', '解决那个具体麻烦即可', '要成为完整框架'],
          ['维护动机', '用着不顺就改', '没有使用就没有反馈'],
          ['迭代节奏', '按需，随时可改', '按计划，长期承诺']
        ] },
        { type: 'h2', text: '关于开源许可证' },
        { type: 'p', text: '很多人纠结 MIT 还是 GPL。我的建议是：如果代码只是拿来用，那许可证几乎不重要；一旦有人基于它产生收益或争议，再回头调整会非常被动。所以我现在的做法是：早期工具一律 MIT，因为它足够宽松，不需要为别人的选择负责。' },
        { type: 'h2', text: '关于文档' },
        { type: 'p', text: '两个还活着的项目，README 都写得比我预期的长很多。原因很简单：如果三个月后我自己都忘了当初为什么这么设计，那这个项目的价值就只剩下代码本身了，而代码本身通常有更简单的实现方式。' },
        { type: 'ul', items: ['第一句说清楚它解决什么问题', '给出最小可运行示例', '列出已知限制，比吹嘘更有用', '写清楚为什么不推荐某些用法'] },
        { type: 'h2', text: '今年还想做一个' },
        { type: 'p', text: '我在考虑把博客里的代码块样式抽成一个独立的小工具。它解决的是我自己在写作时反复调整样式的麻烦——这符合我的第一条标准。到目前为止它还在我的待办清单上，而不是变成一个正在赶工期的项目。我觉得这样挺好。' }
      ]
    },
    {
      id: 'p10',
      title: '用 SVG 画一张图标系统：不用任何图标库',
      date: '2023-12-20',
      category: '前端',
      readTime: 7,
      tags: ['SVG', '图标', '设计系统'],
      summary:
        '图标库动辄几百 KB，却往往只用得到十几个图标。这一篇记录我如何用统一的 24 网格、笔画宽度与圆角规则，手写出一套属于自己的 SVG 图标系统。',
      body: [
        { type: 'h2', text: '为什么不用图标库' },
        { type: 'p', text: '我统计过自己项目里实际用到的图标，通常在十五到三十个之间。为了这二十个图标引入一个几百 KB 的库，还要接受它的默认风格，是一笔不太划算的账。更重要的是，图标库里的风格很难和自定义品牌完全统一。' },
        { type: 'h2', text: '统一网格与笔画' },
        { type: 'p', text: '我采用 24×24 的 viewBox，图形主体限制在 20×20 的安全区内，所有线条使用 1.75 的描边宽度，圆形与圆角使用 2 的半径。统一之后，即使出自不同图标，视觉重量也保持一致。' },
        { type: 'pre', lang: 'html', code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"\n     stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"\n     aria-hidden="true">\n  <circle cx="12" cy="12" r="4.5" />\n  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />\n</svg>' },
        { type: 'h3', text: '几个尺寸档位' },
        { type: 'table', head: ['场景', '尺寸', '描边宽度'], rows: [
          ['导航主图标', '20px', '1.75'],
          ['按钮内图标', '18px', '1.75'],
          ['辅助说明图标', '16px', '1.5'],
          ['空状态插画', '48px', '1.25']
        ] },
        { type: 'h2', text: '可访问性处理' },
        { type: 'p', text: '纯装饰性的图标加 aria-hidden="true"，让屏幕阅读器跳过；有含义的图标（比如主题切换）加 role="img" 与 aria-label，并保证按钮本身有可访问名称。同时保留一个可见的 focus 环，避免键盘用户失去位置。' },
        { type: 'pre', lang: 'css', code: 'button:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 3px;\n  border-radius: 8px;\n}' },
        { type: 'h2', text: '颜色继承' },
        { type: 'p', text: '所有图标使用 currentColor 描边，这样只要修改 color，图标的颜色就会跟着变化，暗色主题下也不需要额外的图片资源。这是使用 SVG 而不是图标字体最直接的好处。' },
        { type: 'h2', text: '维护成本' },
        { type: 'p', text: '手写图标确实比调用库函数更慢。我的应对是：先在设计工具里画好，导出路径，再统一放进一个 sprites 文件里，用 <use> 引用。整套图标加起来不到 6 KB，却覆盖了全站需求。' }
      ]
    },
    {
      id: 'p11',
      title: '写给自己的年度技术复盘模板',
      date: '2023-11-08',
      category: '随笔',
      readTime: 5,
      tags: ['复盘', '职业', '方法论'],
      summary:
        '每年年底我都会做一次技术复盘，一开始写得很长，后来发现越长越没用。这篇是我精简后的模板，只保留五个问题，一小时写完，但比之前的十页文档更能指导第二年的行动。',
      body: [
        { type: 'h2', text: '为什么复盘会写得很长' },
        { type: 'p', text: '我最初的复盘像年终总结：罗列做过的项目、掌握的技能、读过的书。写完很爽，但第二年几乎不会再打开。问题不在于不够详细，而在于没有指向任何具体的行动。' },
        { type: 'h2', text: '我的五问模板' },
        { type: 'ol', items: [
          '今年真正掌握了什么？能用一句话教会别人吗？',
          '今年最大的技术失误是什么？它的根因是知识、判断还是沟通？',
          '哪些工作我做了三次以上？如果有第四次，该产品化吗？',
          '我拒绝过哪些事？拒绝得对吗？',
          '明年的唯一一个核心目标是什么？如果只能改一件事，是哪件？'
        ] },
        { type: 'quote', text: '复盘的产出不是文档，而是下个月的第一件具体的事。' },
        { type: 'h2', text: '示例：连续三次以上的事' },
        { type: 'p', text: '把今年做过的事在脑子里过一遍，标记出重复出现三次以上的。我会发现：写需求文档、画流程图、给新人做环境配置，这三件事分别出现了十几次、九次和六次。' },
        { type: 'p', text: '于是第二年的目标非常明确：把「给新人做环境配置」写成一份可执行的脚本与文档。这个目标在年初的模板里只占一行，但它带来的实际收益超过了任何一门新课程。' },
        { type: 'h2', text: '写给自己看' },
        { type: 'p', text: '复盘文档不需要给任何人看，也不需要排版精美。我把它放在一个纯文本文件里，文件名就是「复盘-年份」。如果写的时候觉得某一段很羞愧，那通常说明它才是真正值得写下来的部分。' }
      ]
    }
  ]
};

```

```text
file=index.html
/* test */

```

```text
file=style.css
/* ============================================================
   极客笔记 · 全站样式
   设计令牌集中在 :root，主题通过 [data-theme] 覆盖语义色。
   ============================================================ */

:root {
  /* 主色：单一靛蓝，深浅变体 */
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --color-primary-soft: #eef2ff;
  --color-primary-border: #c7d2fe;
  --color-primary-contrast: #ffffff;

  /* 中性色 */
  --color-bg: #ffffff;
  --color-bg-soft: #f7f8fa;
  --color-bg-elevated: #ffffff;
  --color-text: #111827;
  --color-text-secondary: #374151;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-border-strong: #d1d5db;

  --shadow-sm: 0 1px 2px rgba(17, 24, 39, 0.05);
  --shadow-md: 0 4px 16px rgba(17, 24, 39, 0.07);
  --shadow-lg: 0 16px 48px rgba(17, 24, 39, 0.13);

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-full: 999px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  --container: 1160px;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, "Courier New", monospace;

  --transition: 180ms cubic-bezier(0.4, 0, 0.2, 1);
  --header-height: 64px;
}

[data-theme="dark"] {
  --color-primary: #818cf8;
  --color-primary-hover: #a5b4fc;
  --color-primary-soft: #1e1b4b;
  --color-primary-border: #3730a3;
  --color-primary-contrast: #0b1120;

  --color-bg: #0b1120;
  --color-bg-soft: #111827;
  --color-bg-elevated: #151d2e;
  --color-text: #e5e7eb;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #94a3b8;
  --color-border: #1f2937;
  --color-border-strong: #334155;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.6);
}

/* ---------- 基础重置 ---------- */
*,
*::before,
*::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--header-height) + 16px);
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

body.is-locked { overflow: hidden; }

img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; }

h1, h2, h3, h4 {
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.01em;
  font-weight: 700;
}

p { margin: 0; }

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: 4px;
}

::selection {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

/* ---------- 布局 ---------- */
.container {
  width: 100%;
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--space-5);
}

.section { padding-block: var(--space-9); }
.section--soft { background: var(--color-bg-soft); }

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 200;
  padding: var(--space-3) var(--space-4);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  border-radius: 0 0 var(--radius-sm) 0;
}
.skip-link:focus { left: 0; }

/* ============================================================
   顶部导航
   ============================================================ */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  background: color-mix(in srgb, var(--color-bg) 88%, transparent);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
  flex-shrink: 0;
  transition: opacity var(--transition);
}
.brand:hover { opacity: 0.75; }

.brand__avatar {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 1px solid var(--color-border);
  background: var(--color-bg-soft);
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-inline: auto;
}

.nav__link {
  position: relative;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--color-text-muted);
  font-weight: 500;
  transition: color var(--transition), background var(--transition);
}
.nav__link:hover { color: var(--color-text); background: var(--color-bg-soft); }
.nav__link.is-active { color: var(--color-primary); }
.nav__link.is-active::after {
  content: "";
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color var(--transition), border-color var(--transition), background var(--transition), transform var(--transition);
}
.icon-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-border);
  background: var(--color-primary-soft);
}
.icon-btn:active { transform: scale(0.94); }
.icon-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.icon-btn:disabled:hover { color: var(--color-text-secondary); border-color: var(--color-border); background: var(--color-bg-elevated); }
.icon-btn svg { width: 18px; height: 18px; }

/* 主题切换：亮色显示月亮，暗色显示太阳 */
.icon-moon { display: none; }
[data-theme="dark"] .icon-sun { display: none; }
[data-theme="dark"] .icon-moon { display: block; }

/* ============================================================
   Hero
   ============================================================ */
.hero {
  position: relative;
  padding-block: var(--space-9) var(--space-8);
  overflow: hidden;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 55% at 50% 0%, color-mix(in srgb, var(--color-primary) 9%, transparent), transparent 70%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-ring {
  position: relative;
  padding: 0;
  border: 0;
  background: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  line-height: 0;
  transition: transform var(--transition);
}
.avatar-ring::after {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-primary-border);
  opacity: 0;
  transition: opacity var(--transition);
}
.avatar-ring:hover { transform: translateY(-3px); }
.avatar-ring:hover::after { opacity: 1; }
.avatar-ring:active { transform: translateY(-1px) scale(0.99); }
.avatar-ring img {
  width: 132px;
  height: 132px;
  border-radius: var(--radius-full);
  object-fit: cover;
  background: var(--color-bg-soft);
  border: 3px solid var(--color-bg);
  box-shadow: var(--shadow-md);
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-6);
  padding: var(--space-1) var(--space-4);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-full);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 500;
}
.hero__eyebrow svg { width: 14px; height: 14px; }

.hero__title {
  margin-top: var(--space-4);
  font-size: clamp(30px, 5.2vw, 46px);
  letter-spacing: -0.025em;
}
.hero__title em {
  font-style: normal;
  color: var(--color-primary);
}

.hero__slogan {
  margin-top: var(--space-4);
  max-width: 620px;
  color: var(--color-text-secondary);
  font-size: 17px;
}

.hero__qq {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-5);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg-elevated);
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-text-secondary);
  box-shadow: var(--shadow-sm);
}
.hero__qq svg { width: 18px; height: 18px; color: var(--color-primary); }

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-7);
  margin-top: var(--space-7);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
  width: 100%;
  max-width: 640px;
}
.hero-stat { text-align: center; }
.hero-stat__value {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}
.hero-stat__label {
  display: block;
  margin-top: var(--space-1);
  font-size: 13px;
  color: var(--color-text-muted);
}

.scroll-hint {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-7);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.scroll-hint svg {
  width: 16px;
  height: 16px;
  animation: bounce 2.2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

/* ============================================================
   按钮
   ============================================================ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 11px var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition), color var(--transition), border-color var(--transition), transform var(--transition), box-shadow var(--transition);
}
.btn svg { width: 17px; height: 17px; flex-shrink: 0; }
.btn:active { transform: translateY(1px); }

.btn-primary {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  box-shadow: var(--shadow-sm);
}
.btn-primary:hover {
  background: var(--color-primary-hover);
  box-shadow: var(--shadow-md);
}

.btn-ghost {
  background: transparent;
  border-color: var(--color-border-strong);
  color: var(--color-text-secondary);
}
.btn-ghost:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.btn-soft {
  background: var(--color-primary-soft);
  border-color: var(--color-primary-border);
  color: var(--color-primary);
}
.btn-soft:hover { background: var(--color-primary-border); }

/* ============================================================
   区块标题
   ============================================================ */
.section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-6);
  flex-wrap: wrap;
  margin-bottom: var(--space-7);
}

.section__title {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  font-size: clamp(22px, 3vw, 28px);
}
.section__title span {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-primary);
  letter-spacing: 0.08em;
}

.section__desc {
  margin-top: var(--space-3);
  max-width: 620px;
  color: var(--color-text-muted);
  font-size: 15px;
}

.block-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  font-size: 16px;
}
.block-title::before {
  content: "";
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: var(--color-primary);
}

/* ============================================================
   分类筛选
   ============================================================ */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.filter {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 7px var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg-elevated);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}
.filter:hover {
  border-color: var(--color-primary-border);
  color: var(--color-primary);
  background: var(--color-primary-soft);
}
.filter:active { transform: scale(0.96); }
.filter:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }

.filter.is-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-contrast);
}

.filter__count {
  font-family: var(--font-mono);
  font-size: 11px;
  opacity: 0.7;
}

/* ============================================================
   文章卡片
   ============================================================ */
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-5);
}

.post-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-border);
}

.post-card__cover {
  position: relative;
  aspect-ratio: 16 / 7;
  display: flex;
  align-items: flex-end;
  padding: var(--space-4);
  overflow: hidden;
}
.post-card__cover::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 28px 28px;
}
.post-card__cover-mark {
  position: relative;
  font-family: var(--font-mono);
  font-size: 42px;
  font-weight: 700;
  line-height: 1;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.03em;
}

/* 封面用主色深浅变体，避免多彩 */
.post-card__cover--a { background: linear-gradient(135deg, #4f46e5, #6366f1); }
.post-card__cover--b { background: linear-gradient(135deg, #4338ca, #4f46e5); }
.post-card__cover--c { background: linear-gradient(135deg, #312e81, #4f46e5); }
.post-card__cover--c1 { background: linear-gradient(135deg, #4338ca, #6366f1); }

.post-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--space-5);
}

.post-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 12px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-sans);
}

.post-card__title {
  margin-top: var(--space-3);
  font-size: 18px;
  line-height: 1.45;
  transition: color var(--transition);
}
.post-card:hover .post-card__title { color: var(--color-primary); }

.post-card__summary {
  margin-top: var(--space-3);
  font-size: 14px;
  color: var(--color-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}
.post-card__tag {
  padding: 3px 9px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 11px;
  color: var(--color-text-muted);
  transition: border-color var(--transition), color var(--transition);
}
.post-card:hover .post-card__tag { border-color: var(--color-primary-border); }

.post-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-muted);
}
.post-card__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-primary);
  font-weight: 600;
}
.post-card__more svg { width: 14px; height: 14px; transition: transform var(--transition); }
.post-card:hover .post-card__more svg { transform: translateX(3px); }

/* ============================================================
   归档
   ============================================================ */
.archive {
  display: grid;
  gap: var(--space-5);
}

.archive__group {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  overflow: hidden;
}

.archive__month {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: var(--color-bg-soft);
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}
.archive__count {
  margin-left: auto;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-muted);
}

.archive__list {
  list-style: none;
  margin: 0;
  padding: var(--space-2);
}

.archive__item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-sm);
  transition: background var(--transition);
}
.archive__item:hover { background: var(--color-bg-soft); }

.archive__date {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  width: 52px;
}

.archive__title {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  transition: color var(--transition);
}
.archive__item:hover .archive__title { color: var(--color-primary); }

.archive__cat {
  font-size: 12px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

/* ============================================================
   关于我
   ============================================================ */
.about {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-7);
  align-items: start;
}

.about__card {
  position: sticky;
  top: calc(var(--header-height) + var(--space-5));
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.about__avatar {
  width: 108px;
  height: 108px;
  margin: 0 auto var(--space-4);
  border-radius: var(--radius-full);
  object-fit: cover;
  cursor: pointer;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  transition: transform var(--transition), box-shadow var(--transition);
}
.about__avatar:hover {
  transform: scale(1.04);
  box-shadow: var(--shadow-md);
}

.about__name { font-size: 19px; }
.about__role {
  margin-top: var(--space-2);
  font-size: 13px;
  color: var(--color-text-muted);
}

.about__contact {
  display: grid;
  gap: var(--space-2);
  margin-top: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  text-align: left;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: 13px;
  transition: background var(--transition);
}
.contact-row:hover { background: var(--color-bg-soft); }
.contact-row svg { width: 16px; height: 16px; color: var(--color-primary); flex-shrink: 0; }
.contact-row__label { color: var(--color-text-muted); flex-shrink: 0; }
.contact-row__value {
  margin-left: auto;
  font-weight: 500;
  word-break: break-all;
  text-align: right;
}

.about__main { display: grid; gap: var(--space-7); }

.about__bio p {
  margin-bottom: var(--space-4);
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.9;
}
.about__bio p:last-child { margin-bottom: 0; }

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.skill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 7px var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg-elevated);
  font-size: 13px;
  font-weight: 500;
  transition: border-color var(--transition), color var(--transition), background var(--transition);
}
.skill:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-soft); }
.skill__level {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-4);
}
.stat-card {
  padding: var(--space-5) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-elevated);
  text-align: center;
  transition: border-color var(--transition), transform var(--transition);
}
.stat-card:hover { border-color: var(--color-primary-border); transform: translateY(-2px); }
.stat-card__value {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}
.stat-card__label {
  margin-top: var(--space-1);
  font-size: 13px;
  color: var(--color-text-muted);
}

.note-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-1);
}
.note-list li {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-3);
  border-left: 2px solid var(--color-border);
  transition: border-color var(--transition), background var(--transition);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
.note-list li:hover { border-left-color: var(--color-primary); background: var(--color-bg-soft); }
.note-list time {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  padding-top: 3px;
}
.note-list span { font-size: 14px; color: var(--color-text-secondary); }

/* ============================================================
   页脚
   ============================================================ */
.site-footer {
  padding-block: var(--space-8) var(--space-6);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-soft);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-6);
}

.footer-brand p {
  margin-top: var(--space-4);
  max-width: 360px;
  font-size: 14px;
  color: var(--color-text-muted);
}

.footer-title {
  margin-bottom: var(--space-4);
  font-size: 14px;
}
.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-3);
}
.footer-links a {
  font-size: 14px;
  color: var(--color-text-muted);
  transition: color var(--transition);
}
.footer-links a:hover { color: var(--color-primary); }

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-7);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-muted);
}
.footer-bottom__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.to-top {
  position: fixed;
  right: var(--space-5);
  bottom: var(--space-5);
  z-index: 90;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg-elevated);
  color: var(--color-text-secondary);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition: opacity var(--transition), transform var(--transition), visibility var(--transition), color var(--transition), border-color var(--transition);
}
.to-top.is-visible { opacity: 1; visibility: visible; transform: translateY(0); }
.to-top:hover { color: var(--color-primary); border-color: var(--color-primary); }
.to-top:active { transform: translateY(2px); }
.to-top svg { width: 18px; height: 18px; }

/* ============================================================
   头像预览弹层
   ============================================================ */
.avatar-modal {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
  background: rgba(10, 14, 26, 0.72);
  backdrop-filter: blur(6px);
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition), visibility var(--transition);
}
.avatar-modal.is-open {
  opacity: 1;
  visibility: visible;
}

.avatar-modal__panel {
  position: relative;
  width: min(400px, 100%);
  padding: var(--space-7) var(--space-6) var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  text-align: center;
  transform: scale(0.94);
  transition: transform var(--transition);
}
.avatar-modal.is-open .avatar-modal__panel { transform: scale(1); }

.avatar-modal__img {
  width: 240px;
  height: 240px;
  margin: 0 auto var(--space-5);
  border-radius: var(--radius-full);
  object-fit: cover;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
}

.avatar-modal__name { font-size: 18px; }
.avatar-modal__qq {
  margin-top: var(--space-2);
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-text-muted);
}

.avatar-modal__close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color var(--transition), border-color var(--transition), background var(--transition);
}
.avatar-modal__close:hover { color: var(--color-primary); border-color: var(--color-primary); background: var(--color-primary-soft); }
.avatar-modal__close svg { width: 16px; height: 16px; }

.avatar-modal__tip {
  margin-top: var(--space-4);
  font-size: 12px;
  color: var(--color-text-muted);
}

/* ============================================================
   渐入动画
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: none; }
}

/* ============================================================
   文章详情页
   ============================================================ */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  height: 3px;
  width: 0%;
  background: var(--color-primary);
  transition: width 90ms linear;
}

.post-hero {
  padding-block: var(--space-9) var(--space-8);
  border-bottom: 1px solid var(--color-border);
  background:
    radial-gradient(ellipse 60% 60% at 20% 0%, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent 70%),
    var(--color-bg-soft);
}

.post-hero__inner { max-width: 860px; }

.post-hero__title {
  margin-top: var(--space-4);
  font-size: clamp(28px, 4.6vw, 42px);
  line-height: 1.28;
  letter-spacing: -0.025em;
}

.post-hero__summary {
  margin-top: var(--space-4);
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.post-hero__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
  font-size: 13px;
  color: var(--color-text-muted);
  flex-wrap: wrap;
}
.post-hero__avatar {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-full);
  object-fit: cover;
  cursor: pointer;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  transition: transform var(--transition);
}
.post-hero__avatar:hover { transform: scale(1.06); }
.post-hero__author { font-weight: 600; color: var(--color-text); }
.meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-border-strong);
}

.post-hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.post-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: var(--space-8);
  align-items: start;
  padding-block: var(--space-8);
}

.post-content {
  max-width: 720px;
  font-size: 16px;
  line-height: 1.9;
  color: var(--color-text-secondary);
}

.post-content h2 {
  margin-top: var(--space-7);
  margin-bottom: var(--space-4);
  font-size: 24px;
  color: var(--color-text);
  scroll-margin-top: calc(var(--header-height) + 20px);
}
.post-content h2:first-child { margin-top: 0; }

.post-content h3 {
  margin-top: var(--space-6);
  margin-bottom: var(--space-3);
  font-size: 18px;
  color: var(--color-text);
  scroll-margin-top: calc(var(--header-height) + 20px);
}

.post-content p { margin-bottom: var(--space-4); }

.post-content a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.post-content blockquote {
  margin: var(--space-5) 0;
  padding: var(--space-4) var(--space-5);
  border-left: 3px solid var(--color-primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: var(--color-bg-soft);
  color: var(--color-text);
  font-size: 15px;
}
.post-content blockquote p { margin-bottom: 0; }

.post-content ul,
.post-content ol {
  margin: 0 0 var(--space-4);
  padding-left: var(--space-5);
}
.post-content li { margin-bottom: var(--space-2); }
.post-content li::marker { color: var(--color-primary); font-weight: 600; }

.post-content pre {
  position: relative;
  margin: var(--space-5) 0;
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: #0f172a;
  color: #e2e8f0;
  font-family: var(--font-mono);
  font-size: 13.5px;
  line-height: 1.75;
  overflow-x: auto;
  border: 1px solid #1e293b;
}
.post-content pre code {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background: none;
  padding: 0;
  white-space: pre;
}

.post-content :not(pre) > code {
  padding: 2px 6px;
  border-radius: 5px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-family: var(--font-mono);
  font-size: 0.88em;
}

.copy-btn {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  padding: 5px 12px;
  border: 1px solid #334155;
  border-radius: var(--radius-sm);
  background: #1e293b;
  color: #cbd5e1;
  font-size: 12px;
  font-family: var(--font-sans);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition), color var(--transition), border-color var(--transition), background var(--transition);
}
.post-content pre:hover .copy-btn,
.copy-btn:focus-visible { opacity: 1; }
.copy-btn:hover { background: #334155; color: #ffffff; border-color: #475569; }
.copy-btn.is-copied { color: #a7f3d0; border-color: #065f46; background: #022c22; }

.post-content table {
  width: 100%;
  margin: var(--space-5) 0;
  border-collapse: collapse;
  font-size: 14px;
}
.post-content th,
.post-content td {
  padding: 11px var(--space-4);
  border: 1px solid var(--color-border);
  text-align: left;
}
.post-content th {
  background: var(--color-bg-soft);
  font-weight: 600;
  color: var(--color-text);
}
.post-content tbody tr { transition: background var(--transition); }
.post-content tbody tr:hover { background: var(--color-bg-soft); }

.table-wrap { overflow-x: auto; margin: var(--space-5) 0; }
.table-wrap table { margin: 0; min-width: 460px; }

/* 悬浮目录 */
.toc {
  position: sticky;
  top: calc(var(--header-height) + var(--space-5));
  padding-left: var(--space-5);
  border-left: 1px solid var(--color-border);
}
.toc__title {
  margin-bottom: var(--space-3);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.toc__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-1);
}
.toc__link {
  display: block;
  padding: 5px var(--space-2);
  border-radius: 5px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-muted);
  transition: color var(--transition), background var(--transition);
}
.toc__link:hover { color: var(--color-primary); background: var(--color-bg-soft); }
.toc__link.is-active { color: var(--color-primary); font-weight: 600; }
.toc__link--h3 { padding-left: var(--space-4); font-size: 12px; }

.author-box {
  display: flex;
  gap: var(--space-5);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-soft);
}
.author-box__avatar {
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  object-fit: cover;
  cursor: pointer;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  transition: transform var(--transition);
}
.author-box__avatar:hover { transform: scale(1.04); }
.author-box h3 { font-size: 17px; }
.author-box p {
  margin-top: var(--space-2);
  font-size: 14px;
  color: var(--color-text-muted);
  max-width: 620px;
}
.author-box__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-top: var(--space-6);
}
.post-nav__item {
  display: block;
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-elevated);
  transition: border-color var(--transition), background var(--transition), transform var(--transition);
}
.post-nav__item:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  transform: translateY(-2px);
}
.post-nav__item--next { text-align: right; }
.post-nav__label {
  display: block;
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: var(--space-1);
}
.post-nav__title {
  display: block;
  font-size: 15px;
  font-weight: 600;
}
.post-nav__item:empty,
.post-nav__item[hidden] { display: none; }

.back-list {
  display: flex;
  justify-content: center;
  margin-top: var(--space-7);
}

/* ============================================================
   响应式
   ============================================================ */
@media (max-width: 1024px) {
  .post-layout { grid-template-columns: minmax(0, 1fr); }
  .toc { display: none; }
  .about { grid-template-columns: 260px 1fr; gap: var(--space-5); }
}

@media (max-width: 768px) {
  :root { --space-9: 64px; --space-8: 48px; --space-7: 36px; }

  .section__head { flex-direction: column; align-items: stretch; gap: var(--space-4); }
  .filters { gap: var(--space-2); }

  .post-grid { grid-template-columns: 1fr; }

  .about { grid-template-columns: 1fr; }
  .about__card { position: static; }

  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }

  .post-nav { grid-template-columns: 1fr; }

  .author-box { flex-direction: column; align-items: flex-start; }

  .note-list li { flex-direction: column; gap: var(--space-1); }

  .archive__item { flex-wrap: wrap; }
}

@media (max-width: 480px) {
  .container { padding-inline: var(--space-4); }
  .brand__text { display: none; }
  .nav { gap: 0; }
  .nav__link { padding: var(--space-2) var(--space-2); font-size: 13px; }
  .hero__stats { gap: var(--space-5); }
  .hero-stat__value { font-size: 22px; }
  .avatar-modal__img { width: 190px; height: 190px; }
  .footer-grid { grid-template-columns: 1fr; }
  .hero__actions .btn { width: 100%; justify-content: center; }
  .post-hero__title { font-size: 26px; }
  .post-content { font-size: 15px; }
}

/* 平板与手机导航：隐藏文字标签会挤，改为保留但缩小 */
@media (max-width: 380px) {
  .nav__link { padding: var(--space-2) 6px; font-size: 12px; }
}

```