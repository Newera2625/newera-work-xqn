```text
file=index.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="个人介绍与作品展示主页">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%236366f1'/%3E%3Cstop offset='.5' stop-color='%23a855f7'/%3E%3Cstop offset='1' stop-color='%23ec4899'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='18' fill='url(%23g)'/%3E%3Ctext x='32' y='43' text-anchor='middle' font-size='32' fill='white' font-family='sans-serif'%3EN%3C/text%3E%3C/svg%3E">

  <script>
    /*
     * ============================================================
     * 可编辑配置区
     * 请将下面的示例内容替换为你的真实信息。
     * 除头像外，页面不需要访问任何外部资源。
     * ============================================================
     */
    const CONFIG = {
      // 基本信息
      name: "你的昵称",
      initials: "N",
      qq: "3627236036",
      greeting: " 你好，我是",
      bio: "一位热爱创造、持续探索的开发者，用代码把想法变成真实的作品。",

      // 首页标签
      tags: ["Web 开发", "UI 设计", "持续学习", "热爱开源"],

      // 关于我：建议填写 2～3 段
      about: [
        "你好！这里是你的个人介绍区域。你可以在这里介绍自己的性格、热爱、正在做的事情，以及希望认识怎样的人。",
        "平时喜欢研究新的技术，也享受把一个想法从无到有做出来的过程。我相信好的作品既要有实用的价值，也要有属于自己的风格。",
        "如果你也喜欢代码、设计或创造有趣的东西，欢迎通过联系方式和我交流，一起发现更多可能性。"
      ],

      // 信息卡片
      info: [
        { icon: "", label: "昵称", value: "你的昵称" },
        { icon: "", label: "所在地", value: "你的城市" },
        { icon: "", label: "身份", value: "开发者 / 设计师" },
        { icon: "", label: "邮箱", value: "yourname@example.com" },
        { icon: "", label: "QQ", value: "3627236036" }
      ],

      // 技能：level 为 0～100
      skills: [
        {
          icon: "",
          name: "Web 开发",
          level: 90,
          desc: "能够使用原生 JavaScript 和现代框架构建完整、清晰的 Web 应用。"
        },
        {
          icon: "",
          name: "UI 设计",
          level: 82,
          desc: "关注视觉层次、交互反馈与细节，让页面兼具美感和易用性。"
        },
        {
          icon: "",
          name: "前端工程化",
          level: 76,
          desc: "了解代码组织、构建优化、版本管理与团队协作流程。"
        },
        {
          icon: "",
          name: "问题解决",
          level: 88,
          desc: "善于拆解复杂需求，并通过分析、验证和迭代寻找可靠方案。"
        },
        {
          icon: "",
          name: "产品思维",
          level: 74,
          desc: "从用户需求出发组织信息架构，平衡体验、功能与实现成本。"
        },
        {
          icon: "",
          name: "学习能力",
          level: 92,
          desc: "保持好奇，快速理解新工具，并把它们转化为实际生产能力。"
        }
      ],

      // 作品：url 留空时不会渲染访问链接
      projects: [
        {
          title: "个人主页",
          desc: "一个强调个人表达与响应式体验的单页名片项目。",
          tags: ["HTML", "CSS", "JavaScript"],
          url: ""
        },
        {
          title: "设计作品集",
          desc: "用于集中展示界面设计、交互方案和项目过程的视觉空间。",
          tags: ["UI Design", "Portfolio"],
          url: ""
        },
        {
          title: "灵感实验室",
          desc: "记录代码实验、交互创意和日常灵感的小型实验项目。",
          tags: ["Experiment", "Creative"],
          url: ""
        }
      ],

      // 联系方式
      // type 可使用：email、link
      // url 留空时只展示文字，不生成链接
      contacts: [
        {
          icon: "",
          label: "邮箱",
          value: "yourname@example.com",
          type: "email",
          url: "mailto:yourname@example.com"
        },
        {
          icon: "",
          label: "GitHub",
          value: "GitHub（请替换）",
          type: "link",
          url: "https://github.com/yourname"
        },
        {
          icon: "",
          label: "博客",
          value: "我的博客（请替换）",
          type: "link",
          url: "https://yourname.github.io"
        },
        {
          icon: "",
          label: "微信",
          value: "微信号（请替换）",
          type: "link",
          url: ""
        }
      ]
    };
  </script>

  <script>
    // 在页面绘制前设置主题，避免刷新时闪烁
    (() => {
      let theme = null;
      try {
        theme = localStorage.getItem("theme");
      } catch (_) {}

      if (theme !== "light" && theme !== "dark") {
        theme = window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }

      document.documentElement.dataset.theme = theme;
    })();
  </script>

  <style>
    :root {
      --bg: #f7f8fc;
      --bg-soft: #eef0ff;
      --surface: rgba(255, 255, 255, 0.88);
      --surface-solid: #ffffff;
      --surface-muted: #f1f3f9;
      --text: #171a2b;
      --text-soft: #62677d;
      --text-faint: #9095a9;
      --border: rgba(100, 105, 135, 0.15);
      --primary: #6366f1;
      --primary-2: #a855f7;
      --primary-3: #ec4899;
      --gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 52%, #ec4899 100%);
      --shadow-sm: 0 8px 24px rgba(45, 48, 85, 0.08);
      --shadow-md: 0 18px 48px rgba(45, 48, 85, 0.13);
      --shadow-lg: 0 26px 70px rgba(68, 55, 130, 0.18);
      --header: rgba(247, 248, 252, 0.76);
      --ease: cubic-bezier(.22, 1, .36, 1);
    }

    [data-theme="dark"] {
      --bg: #0b1020;
      --bg-soft: #11172c;
      --surface: rgba(20, 26, 47, 0.86);
      --surface-solid: #151b30;
      --surface-muted: #1c233b;
      --text: #f4f5ff;
      --text-soft: #b5bad0;
      --text-faint: #8087a2;
      --border: rgba(255, 255, 255, 0.1);
      --shadow-sm: 0 8px 26px rgba(0, 0, 0, 0.18);
      --shadow-md: 0 18px 48px rgba(0, 0, 0, 0.28);
      --shadow-lg: 0 28px 80px rgba(0, 0, 0, 0.38);
      --header: rgba(11, 16, 32, 0.78);
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      scroll-padding-top: 92px;
    }

    body {
      margin: 0;
      min-width: 320px;
      overflow-x: hidden;
      color: var(--text);
      background:
        radial-gradient(circle at 8% 8%, rgba(99, 102, 241, 0.12), transparent 29rem),
        radial-gradient(circle at 92% 22%, rgba(236, 72, 153, 0.1), transparent 26rem),
        var(--bg);
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei",
        "Segoe UI", Roboto, sans-serif;
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
      transition: background-color .3s var(--ease), color .3s var(--ease);
    }

    button,
    input,
    textarea {
      font: inherit;
    }

    button,
    a {
      -webkit-tap-highlight-color: transparent;
    }

    button {
      color: inherit;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    img {
      display: block;
      max-width: 100%;
    }

    ::selection {
      color: #fff;
      background: #7c3aed;
    }

    :focus-visible {
      outline: 3px solid rgba(99, 102, 241, 0.45);
      outline-offset: 4px;
    }

    .container {
      width: min(1160px, calc(100% - 40px));
      margin-inline: auto;
    }

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

    .icon {
      width: 18px;
      height: 18px;
      flex: 0 0 auto;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* 顶部导航 */
    .site-header {
      position: fixed;
      inset: 0 0 auto;
      z-index: 100;
      height: 76px;
      border-bottom: 1px solid transparent;
      background: transparent;
      transition:
        height .3s var(--ease),
        background-color .3s var(--ease),
        border-color .3s var(--ease),
        box-shadow .3s var(--ease);
    }

    .site-header.scrolled {
      height: 68px;
      background: var(--header);
      border-color: var(--border);
      box-shadow: var(--shadow-sm);
      backdrop-filter: blur(18px) saturate(150%);
      -webkit-backdrop-filter: blur(18px) saturate(150%);
    }

    .nav-inner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 11px;
      min-width: 0;
      font-weight: 750;
      letter-spacing: -.02em;
    }

    .brand-name {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .nav-right,
    .nav-links {
      display: flex;
      align-items: center;
    }

    .nav-right {
      gap: 12px;
    }

    .nav-links {
      gap: 5px;
    }

    .nav-link {
      position: relative;
      padding: 9px 13px;
      border-radius: 999px;
      color: var(--text-soft);
      font-size: 14px;
      font-weight: 600;
      transition: color .25s var(--ease), background .25s var(--ease);
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--text);
      background: var(--surface-muted);
    }

    .nav-link.active::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 2px;
      width: 16px;
      height: 2px;
      border-radius: 99px;
      background: var(--gradient);
      transform: translateX(-50%);
    }

    .icon-button {
      width: 42px;
      height: 42px;
      display: inline-grid;
      place-items: center;
      flex: 0 0 auto;
      padding: 0;
      border: 1px solid var(--border);
      border-radius: 50%;
      background: var(--surface);
      box-shadow: var(--shadow-sm);
      cursor: pointer;
      transition: transform .25s var(--ease), border-color .25s var(--ease);
    }

    .icon-button:hover {
      border-color: rgba(99, 102, 241, .45);
      transform: translateY(-2px) rotate(-4deg);
    }

    .icon-button .icon {
      width: 19px;
      height: 19px;
    }

    /* Hero */
    .hero {
      position: relative;
      min-height: 100svh;
      display: grid;
      align-items: center;
      padding: 140px 0 88px;
      isolation: isolate;
    }

    .hero::before,
    .hero::after {
      content: "";
      position: absolute;
      z-index: -1;
      border-radius: 50%;
      filter: blur(2px);
      pointer-events: none;
    }

    .hero::before {
      width: 420px;
      height: 420px;
      top: 13%;
      right: -170px;
      border: 1px solid rgba(168, 85, 247, .18);
      box-shadow:
        0 0 0 55px rgba(168, 85, 247, .035),
        0 0 0 110px rgba(168, 85, 247, .025);
    }

    .hero::after {
      width: 240px;
      height: 240px;
      left: -120px;
      bottom: 8%;
      background: rgba(99, 102, 241, .06);
    }

    .hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(350px, .92fr);
      align-items: center;
      gap: clamp(48px, 8vw, 100px);
    }

    .hero-copy {
      min-width: 0;
    }

    .greeting {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 13px;
      padding: 7px 13px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--text-soft);
      background: var(--surface);
      box-shadow: var(--shadow-sm);
      font-size: 14px;
      font-weight: 650;
      backdrop-filter: blur(12px);
    }

    .hero-title {
      margin: 0;
      font-size: clamp(48px, 7vw, 86px);
      line-height: 1.06;
      letter-spacing: -.065em;
      font-weight: 850;
    }

    .gradient-text {
      color: transparent;
      background: var(--gradient);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-bio {
      max-width: 650px;
      margin: 24px 0 0;
      color: var(--text-soft);
      font-size: clamp(16px, 2vw, 19px);
      line-height: 1.85;
    }

    .hero-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin: 28px 0;
    }

    .tag {
      padding: 6px 13px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--text-soft);
      background: var(--surface);
      font-size: 13px;
      font-weight: 600;
      transition: color .25s var(--ease), border-color .25s var(--ease), transform .25s var(--ease);
    }

    .tag:hover {
      color: var(--primary);
      border-color: rgba(99, 102, 241, .4);
      transform: translateY(-2px);
    }

    .hero-actions,
    .hero-mini-actions {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .hero-mini-actions {
      margin-top: 18px;
      gap: 18px;
    }

    .button {
      min-height: 48px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 0 22px;
      border: 0;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 750;
      cursor: pointer;
      transition:
        transform .28s var(--ease),
        box-shadow .28s var(--ease),
        background-color .28s var(--ease),
        border-color .28s var(--ease);
    }

    .button:hover {
      transform: translateY(-3px);
    }

    .button-primary {
      color: #fff;
      background: var(--gradient);
      box-shadow: 0 12px 28px rgba(99, 102, 241, .28);
    }

    .button-primary:hover {
      box-shadow: 0 16px 34px rgba(99, 102, 241, .36);
    }

    .button-secondary {
      color: var(--text);
      border: 1px solid var(--border);
      background: var(--surface);
      box-shadow: var(--shadow-sm);
    }

    .button-secondary:hover {
      border-color: rgba(99, 102, 241, .35);
      box-shadow: var(--shadow-md);
    }

    .text-action {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0;
      border: 0;
      color: var(--text-soft);
      background: transparent;
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      transition: color .25s var(--ease);
    }

    .text-action:hover {
      color: var(--primary);
    }

    .text-action .icon {
      width: 15px;
      height: 15px;
    }

    /* QQ 头像 */
    .hero-visual {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 0;
    }

    .avatar-frame {
      position: relative;
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      overflow: hidden;
      border: 4px solid transparent;
      border-radius: 50%;
      background:
        linear-gradient(var(--surface-solid), var(--surface-solid)) padding-box,
        var(--gradient) border-box;
      box-shadow: var(--shadow-lg), 0 0 38px rgba(124, 58, 237, .18);
      isolation: isolate;
    }

    .avatar-frame--hero {
      width: clamp(250px, 28vw, 330px);
      aspect-ratio: 1;
    }

    .avatar-frame--small {
      width: 42px;
      height: 42px;
      border-width: 2px;
      box-shadow: 0 5px 15px rgba(99, 102, 241, .18);
    }

    .avatar-frame img,
    .avatar-fallback {
      position: absolute;
      inset: 4px;
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      border-radius: 50%;
    }

    .avatar-frame--small img,
    .avatar-frame--small .avatar-fallback {
      inset: 2px;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
    }

    .avatar-frame img {
      z-index: 2;
      object-fit: cover;
      opacity: 0;
      transform: scale(.985);
      transition: opacity .3s var(--ease), transform .35s var(--ease);
    }

    .avatar-frame img.loaded {
      opacity: 1;
      transform: scale(1);
    }

    .avatar-frame:hover img {
      transform: scale(1.045);
    }

    .avatar-fallback {
      z-index: 2;
      display: grid;
      place-items: center;
      overflow: hidden;
      background: var(--surface-muted);
    }

    .avatar-fallback[hidden] {
      display: none;
    }

    .avatar-fallback svg {
      width: 100%;
      height: 100%;
    }

    .avatar-frame.is-loading::after {
      content: "";
      position: absolute;
      z-index: 4;
      inset: 4px;
      border-radius: 50%;
      background: linear-gradient(
        110deg,
        transparent 20%,
        rgba(255, 255, 255, .45) 45%,
        rgba(255, 255, 255, .12) 60%,
        transparent 80%
      );
      background-size: 200% 100%;
      animation: avatar-shimmer 1.45s infinite linear;
      pointer-events: none;
    }

    @keyframes avatar-shimmer {
      from { background-position: 180% 0; }
      to { background-position: -40% 0; }
    }

    .qq-float {
      position: absolute;
      right: -10px;
      bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 11px 10px 16px;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--surface);
      box-shadow: var(--shadow-md);
      backdrop-filter: blur(14px);
      transform: rotate(-2deg);
    }

    .qq-float-label {
      color: var(--text-soft);
      font-size: 12px;
      line-height: 1.25;
    }

    .qq-float-label strong {
      display: block;
      color: var(--text);
      font-size: 14px;
    }

    .qq-float-actions {
      display: flex;
      gap: 5px;
    }

    .qq-float .icon-button {
      width: 33px;
      height: 33px;
      box-shadow: none;
      background: var(--surface-muted);
    }

    /* 通用区块 */
    .section {
      position: relative;
      padding: 108px 0;
    }

    .section-heading {
      max-width: 680px;
      margin-bottom: 44px;
    }

    .section-kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: var(--primary);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
    }

    .section-kicker::before {
      content: "";
      width: 24px;
      height: 2px;
      border-radius: 99px;
      background: var(--gradient);
    }

    .section-title {
      margin: 0;
      font-size: clamp(32px, 5vw, 48px);
      line-height: 1.2;
      letter-spacing: -.045em;
    }

    .section-desc {
      margin: 12px 0 0;
      color: var(--text-soft);
      font-size: 16px;
    }

    .surface-card {
      border: 1px solid var(--border);
      border-radius: 20px;
      background: var(--surface);
      box-shadow: var(--shadow-sm);
      backdrop-filter: blur(14px);
    }

    /* 关于 */
    .about-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.12fr) minmax(310px, .88fr);
      gap: 28px;
      align-items: stretch;
    }

    .about-story {
      padding: clamp(28px, 5vw, 46px);
    }

    .about-story p {
      margin: 0 0 18px;
      color: var(--text-soft);
      font-size: 16px;
      line-height: 2;
    }

    .about-story p:last-child {
      margin-bottom: 0;
    }

    .about-quote {
      position: relative;
      margin-top: 28px !important;
      padding: 18px 20px 18px 24px;
      border-radius: 14px;
      color: var(--text) !important;
      background: var(--surface-muted);
      font-weight: 650;
    }

    .about-quote::before {
      content: "";
      position: absolute;
      inset: 13px auto 13px 0;
      width: 4px;
      border-radius: 99px;
      background: var(--gradient);
    }

    .info-list {
      display: grid;
      gap: 10px;
      padding: 16px;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
      padding: 15px 16px;
      border: 1px solid transparent;
      border-radius: 15px;
      background: var(--surface-solid);
      transition: border-color .25s var(--ease), transform .25s var(--ease);
    }

    .info-row:hover {
      border-color: rgba(99, 102, 241, .22);
      transform: translateX(3px);
    }

    .info-icon {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      border-radius: 12px;
      background: var(--bg-soft);
      font-size: 19px;
    }

    .info-content {
      min-width: 0;
    }

    .info-label {
      display: block;
      margin-bottom: 1px;
      color: var(--text-faint);
      font-size: 12px;
    }

    .info-value {
      display: block;
      overflow: hidden;
      color: var(--text);
      font-size: 14px;
      font-weight: 650;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* 技能 */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .skill-card {
      padding: 26px;
      transition: transform .3s var(--ease), box-shadow .3s var(--ease), border-color .3s var(--ease);
    }

    .skill-card:hover {
      border-color: rgba(99, 102, 241, .28);
      box-shadow: var(--shadow-md);
      transform: translateY(-5px);
    }

    .skill-top {
      display: flex;
      align-items: center;
      gap: 13px;
      margin-bottom: 18px;
    }

    .skill-icon {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      border-radius: 14px;
      background: var(--bg-soft);
      font-size: 24px;
    }

    .skill-name {
      margin: 0;
      font-size: 17px;
    }

    .skill-level {
      color: var(--text-faint);
      font-size: 12px;
    }

    .skill-meter {
      height: 7px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--surface-muted);
    }

    .skill-fill {
      display: block;
      width: 0;
      height: 100%;
      border-radius: inherit;
      background: var(--gradient);
      transition: width .9s var(--ease);
    }

    .skill-card.in-view .skill-fill {
      width: var(--level);
    }

    .skill-desc {
      margin: 15px 0 0;
      color: var(--text-soft);
      font-size: 14px;
      line-height: 1.8;
    }

    /* 作品 */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    .project-card {
      overflow: hidden;
      transition: transform .32s var(--ease), box-shadow .32s var(--ease), border-color .32s var(--ease);
    }

    .project-card:hover {
      border-color: rgba(99, 102, 241, .26);
      box-shadow: var(--shadow-md);
      transform: translateY(-6px);
    }

    .project-cover {
      position: relative;
      height: 190px;
      overflow: hidden;
      isolation: isolate;
    }

    .project-cover::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.13) 1px, transparent 1px);
      background-size: 28px 28px;
      mask-image: linear-gradient(to bottom right, #000, transparent 80%);
    }

    .project-cover::after {
      content: "";
      position: absolute;
      width: 150px;
      height: 150px;
      right: -30px;
      top: -45px;
      border: 24px solid rgba(255, 255, 255, .12);
      border-radius: 50%;
      transition: transform .5s var(--ease);
    }

    .project-card:hover .project-cover::after {
      transform: scale(1.18) rotate(18deg);
    }

    .project-cover-inner {
      position: absolute;
      z-index: 2;
      inset: 0;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 20px;
      color: #fff;
    }

    .project-symbol {
      font-size: 42px;
      line-height: 1;
      filter: drop-shadow(0 8px 12px rgba(0, 0, 0, .15));
      transition: transform .4s var(--ease);
    }

    .project-card:hover .project-symbol {
      transform: scale(1.1) rotate(-5deg);
    }

    .project-index {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .16em;
      opacity: .72;
    }

    .gradient-0 { background: linear-gradient(135deg, #6366f1, #a855f7); }
    .gradient-1 { background: linear-gradient(135deg, #0ea5e9, #6366f1); }
    .gradient-2 { background: linear-gradient(135deg, #a855f7, #ec4899); }
    .gradient-3 { background: linear-gradient(135deg, #f97316, #ec4899); }
    .gradient-4 { background: linear-gradient(135deg, #14b8a6, #6366f1); }
    .gradient-5 { background: linear-gradient(135deg, #8b5cf6, #3b82f6); }

    .project-body {
      padding: 23px;
    }

    .project-title {
      margin: 0;
      font-size: 19px;
      letter-spacing: -.02em;
    }

    .project-desc {
      min-height: 50px;
      margin: 9px 0 17px;
      color: var(--text-soft);
      font-size: 14px;
      line-height: 1.8;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 18px;
    }

    .project-tag {
      padding: 3px 9px;
      border-radius: 999px;
      color: var(--text-soft);
      background: var(--surface-muted);
      font-size: 11px;
      font-weight: 650;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: var(--primary);
      font-size: 13px;
      font-weight: 750;
    }

    .project-link:hover {
      color: var(--primary-3);
    }

    /* 联系 */
    .contact-wrap {
      max-width: 860px;
      margin-inline: auto;
    }

    .contact-card {
      position: relative;
      overflow: hidden;
      padding: clamp(34px, 7vw, 68px);
      text-align: center;
    }

    .contact-card::before {
      content: "";
      position: absolute;
      width: 300px;
      height: 300px;
      top: -200px;
      right: -100px;
      border-radius: 50%;
      background: rgba(168, 85, 247, .1);
    }

    .contact-card::after {
      content: "";
      position: absolute;
      width: 240px;
      height: 240px;
      left: -140px;
      bottom: -160px;
      border-radius: 50%;
      background: rgba(99, 102, 241, .1);
    }

    .contact-content {
      position: relative;
      z-index: 1;
    }

    .contact-title {
      margin: 0;
      font-size: clamp(32px, 5vw, 48px);
      letter-spacing: -.045em;
    }

    .contact-desc {
      margin: 12px auto 28px;
      color: var(--text-soft);
    }

    .contact-primary {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 26px;
    }

    .contact-chip {
      min-height: 52px;
      display: inline-flex;
      align-items: center;
      gap: 11px;
      padding: 0 16px;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--surface-solid);
      box-shadow: var(--shadow-sm);
    }

    .contact-chip-label {
      color: var(--text-faint);
      font-size: 12px;
    }

    .contact-chip-value {
      font-size: 14px;
      font-weight: 750;
    }

    .contact-chip .icon-button {
      width: 34px;
      height: 34px;
      box-shadow: none;
      background: var(--surface-muted);
    }

    .contact-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 30px;
    }

    .contact-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 14px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--text-soft);
      background: var(--surface-solid);
      font-size: 13px;
      font-weight: 650;
      transition: color .25s var(--ease), border-color .25s var(--ease), transform .25s var(--ease);
    }

    .contact-link:hover {
      color: var(--primary);
      border-color: rgba(99, 102, 241, .35);
      transform: translateY(-2px);
    }

    .
```