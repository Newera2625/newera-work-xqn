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
