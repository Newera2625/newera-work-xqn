```html
file=index.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="个人介绍与作品展示主页">
  <meta name="theme-color" content="#6366f1">
  <title>个人主页</title>

  <script>
    /*
     * ============================================================
     * 页面配置区：以后需要修改昵称、简介、标签、技能、作品和联系方式时，
     * 只需要修改下方 CONFIG 对象即可，无需改动页面 HTML 结构。
     * 请将示例内容替换为你的真实信息。
     * ============================================================
     */
    const CONFIG = {
      // 昵称与拼音首字母
      name: "你好呀",
      initials: "N",
      role: "创意开发者 / 终身学习者",

      // QQ 号：头像、复制按钮和加好友链接都会自动使用此号码
      qq: "3627236036",

      // 一句话简介
      bio: "把想法变成作品，把热爱变成成长。这里记录我的技能、灵感和正在创造的一切。",

      // 首页标签
      tags: ["Web 开发", "UI 设计", "持续学习", "创造美好"],

      // 关于我
      about: [
        "你好，欢迎来到我的个人主页！我喜欢探索新技术，也热衷于把抽象的想法变成真实、可用的产品。",
        "在这里，你可以了解我的技能与兴趣、查看最近的作品，并通过 QQ 随时和我交流。很高兴认识你！"
      ],

      // 关于我右侧的信息卡片；name / qq / email 会自动读取上方配置
      info: [
        { icon: "👋", label: "昵称", type: "name" },
        { icon: "📍", label: "所在地", value: "中国 · 你的城市" },
        { icon: "💼", label: "身份", type: "role" },
        { icon: "✉️", label: "邮箱", type: "email" },
        { icon: "💬", label: "QQ", type: "qq" }
      ],

      // 邮箱
      email: "yourname@example.com",

      // 技能：level 为 0～100
      skills: [
        {
          icon: "💻",
          name: "Web 开发",
          level: 88,
          desc: "使用 HTML、CSS 和 JavaScript 构建响应式网页。"
        },
        {
          icon: "🎨",
          name: "UI 设计",
          level: 76,
          desc: "注重细节、交互体验与清晰的信息层级。"
        },
        {
          icon: "⚡",
          name: "前端工程",
          level: 82,
          desc: "关注性能、代码质量以及良好的工程实践。"
        },
        {
          icon: "🧠",
          name: "逻辑思维",
          level: 85,
          desc: "善于分析问题、拆解需求并设计合理方案。"
        },
        {
          icon: "🛠️",
          name: "工具应用",
          level: 80,
          desc: "能够熟练使用常见开发、设计和效率工具。"
        },
        {
          icon: "🌱",
          name: "持续学习",
          level: 92,
          desc: "保持好奇，不断学习并分享新的知识与灵感。"
        }
      ],

      // 作品：href 为空时不渲染“访问作品”按钮
      projects: [
        {
          icon: "✨",
          title: "个人品牌主页",
          desc: "一个简洁、现代且响应式的个人作品展示网站。",
          tags: ["HTML", "CSS", "JavaScript"],
          gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 52%, #ec4899 100%)",
          href: "",
          linkLabel: "查看详情"
        },
        {
          icon: "📊",
          title: "数据可视化面板",
          desc: "将复杂数据转化为清晰直观的可视化展示体验。",
          tags: ["交互设计", "数据展示", "响应式"],
          gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 55%, #6366f1 100%)",
          href: "https://github.com/",
          linkLabel: "访问作品"
        },
        {
          icon: "🚀",
          title: "效率工具集合",
          desc: "为日常开发与工作流程打造的轻量实用工具。",
          tags: ["效率", "自动化", "工具设计"],
          gradient: "linear-gradient(135deg, #f97316 0%, #ec4899 48%, #8b5cf6 100%)",
          href: "",
          linkLabel: "查看详情"
        }
      ],

      // 联系方式：type 为 name / qq / email 时自动读取对应配置
      contacts: [
        {
          icon: "💬",
          label: "QQ",
          type: "qq",
          copy: true
        },
        {
          icon: "✉️",
          label: "邮箱",
          type: "email",
          href: "mailto:yourname@example.com"
        },
        {
          icon: "💻",
          label: "GitHub",
          value: "github.com/yourname",
          href: "https://github.com/yourname"
        },
        {
          icon: "🌐",
          label: "个人博客",
          value: "blog.example.com",
          href: "https://example.com/"
        },
        {
          icon: "☁️",
          label: "微信",
          value: "your_wechat_id",
          href: ""
        }
      ]
    };

    // 在页面绘制前应用主题，避免刷新时出现主题闪烁
    (function applyInitialTheme() {
      let savedTheme = "";
      try {
        savedTheme = localStorage.getItem("theme") || "";
      } catch (_) {}

      const preferredTheme = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      document.documentElement.setAttribute("data-theme", savedTheme || preferredTheme);
      document.documentElement.classList.add("js");
    })();
  </script>

  <style>
    :root {
      --primary: #6366f1;
      --primary-2: #a855f7;
      --primary-3: #ec4899;
      --gradient: linear-gradient(135deg, var(--primary), var(--primary-2) 52%, var(--primary-3));
      --bg: #f7f8fc;
      --bg-soft: #eef0fa;
      --surface: rgba(255, 255, 255, 0.86);
      --surface-solid: #ffffff;
      --surface-hover: #f8f8ff;
      --text: #171a2b;
      --text-soft: #5f6478;
      --text-faint: #8b90a4;
      --border: rgba(99, 102, 241, 0.13);
      --shadow: 0 18px 50px rgba(37, 42, 80, 0.10);
      --shadow-hover: 0 24px 64px rgba(67, 56, 202, 0.16);
      --header-bg: rgba(247, 248, 252, 0.72);
      --ring: rgba(99, 102, 241, 0.22);
      --radius: 20px;
      --ease: cubic-bezier(.22, 1, .36, 1);
    }

    [data-theme="dark"] {
      --bg: #0b1020;
      --bg-soft: #12192d;
      --surface: rgba(20, 27, 48, 0.86);
      --surface-solid: #151c31;
      --surface-hover: #1b2440;
      --text: #f4f5fb;
      --text-soft: #b1b7ca;
      --text-faint: #7f879e;
      --border: rgba(167, 139, 250, 0.15);
      --shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
      --shadow-hover: 0 26px 70px rgba(0, 0, 0, 0.38);
      --header-bg: rgba(11, 16, 32, 0.72);
      --ring: rgba(168, 85, 247, 0.25);
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      scroll-padding-top: 100px;
    }

    body {
      margin: 0;
      min-width: 0;
      overflow-x: hidden;
      color: var(--text);
      background:
        radial-gradient(circle at 10% 8%, rgba(99, 102, 241, 0.12), transparent 25rem),
        radial-gradient(circle at 90% 22%, rgba(236, 72, 153, 0.10), transparent 25rem),
        var(--bg);
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei",
        "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
      transition: background-color .3s ease, color .3s ease;
    }

    button, a {
      font: inherit;
    }

    button {
      color: inherit;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    img, svg {
      display: block;
      max-width: 100%;
    }

    ::selection {
      color: #fff;
      background: var(--primary);
    }

    :focus-visible {
      outline: 3px solid rgba(99, 102, 241, 0.38);
      outline-offset: 4px;
    }

    .container {
      width: min(1160px, calc(100% - 40px));
      margin-inline: auto;
    }

    .section {
      position: relative;
      padding: 92px 0;
    }

    .section-head {
      max-width: 680px;
      margin: 0 auto 42px;
      text-align: center;
    }

    .section-kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      color: var(--primary);
      font-size: .82rem;
      font-weight: 800;
      letter-spacing: .14em;
      text-transform: uppercase;
    }

    .section-kicker::before {
      width: 22px;
      height: 2px;
      border-radius: 2px;
      background: var(--gradient);
      content: "";
    }

    .section-title {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1.2;
      letter-spacing: -.04em;
    }

    .section-desc {
      margin: 15px 0 0;
      color: var(--text-soft);
      font-size: 1.02rem;
    }

    /* 顶部导航 */
    .site-header {
      position: fixed;
      z-index: 100;
      top: 0;
      right: 0;
      left: 0;
      border-bottom: 1px solid transparent;
      background: transparent;
      transition: background .3s ease, box-shadow .3s ease, border-color .3s ease;
    }

    .site-header.scrolled,
    .site-header.nav-open {
      border-color: var(--border);
      background: var(--header-bg);
      box-shadow: 0 10px 34px rgba(24, 28, 58, 0.08);
      -webkit-backdrop-filter: blur(18px) saturate(150%);
      backdrop-filter: blur(18px) saturate(150%);
    }

    .nav-inner {
      display: flex;
      min-height: 76px;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .brand {
      display: inline-flex;
      min-width: 0;
      align-items: center;
      gap: 11px;
      font-weight: 800;
    }

    .brand-name {
      overflow: hidden;
      max-width: 170px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .brand-avatar {
      position: relative;
      width: 40px;
      height: 40px;
      flex: 0 0 40px;
      overflow: hidden;
      border: 2px solid rgba(99, 102, 241, 0.55);
      border-radius: 50%;
      background: var(--bg-soft);
      box-shadow: 0 5px 16px var(--ring);
    }

    .brand-avatar img,
    .brand-avatar .fallback-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .brand-avatar img {
      opacity: 0;
      transition: opacity .3s ease;
    }

    .brand-avatar.loaded img {
      opacity: 1;
    }

    .brand-avatar .fallback-avatar[hidden],
    .avatar-shell .fallback-avatar[hidden] {
      display: none;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-left: auto;
    }

    .nav-link {
      position: relative;
      padding: 9px 13px;
      border-radius: 999px;
      color: var(--text-soft);
      font-size: .94rem;
      font-weight: 700;
      transition: color .25s ease, background .25s ease;
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--primary);
      background: rgba(99, 102, 241, 0.09);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-btn,
    .menu-btn {
      display: inline-grid;
      width: 42px;
      height: 42px;
      flex: 0 0 42px;
      place-items: center;
      border: 1px solid var(--border);
      border-radius: 50%;
      background: var(--surface);
      cursor: pointer;
      transition: transform .25s var(--ease), border-color .25s ease, background .25s ease;
    }

    .icon-btn:hover,
    .menu-btn:hover {
      border-color: rgba(99, 102, 241, 0.38);
      background: var(--surface-hover);
      transform: translateY(-2px);
    }

    .theme-icon {
      font-size: 1.1rem;
      line-height: 1;
    }

    .menu-btn {
      display: none;
      font-size: 1.2rem;
    }

    /* 通用按钮 */
    .btn {
      display: inline-flex;
      min-height: 48px;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 0 22px;
      border: 1px solid transparent;
      border-radius: 999px;
      font-weight: 800;
      cursor: pointer;
      transition: transform .25s var(--ease), box-shadow .25s ease,
        background .25s ease, border-color .25s ease, color .25s ease;
    }

    .btn:hover {
      transform: translateY(-3px);
    }

    .btn-primary {
      color: #fff;
      background: var(--gradient);
      box-shadow: 0 12px 28px rgba(99, 102, 241, 0.28);
    }

    .btn-primary:hover {
      box-shadow: 0 16px 34px rgba(99, 102, 241, 0.38);
    }

    .btn-soft {
      border-color: var(--border);
      color: var(--text);
      background: var(--surface);
    }

    .btn-soft:hover {
      border-color: rgba(99, 102, 241, 0.34);
      background: var(--surface-hover);
      box-shadow: var(--shadow);
    }

    .btn-sm {
      min-height: 40px;
      padding: 0 16px;
      font-size: .9rem;
    }

    .btn.copied {
      color: #fff;
      border-color: #22c55e;
      background: #22c55e;
    }

    /* Hero */
    .hero {
      position: relative;
      display: grid;
      min-height: 100vh;
      align-items: center;
      padding: 130px 0 100px;
      overflow: hidden;
    }

    .hero::before {
      position: absolute;
      z-index: -1;
      top: 8%;
      left: 50%;
      width: 720px;
      height: 720px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.10), transparent 68%);
      transform: translate(-50%, -50%);
      content: "";
      pointer-events: none;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(340px, .92fr);
      align-items: center;
      gap: clamp(48px, 8vw, 110px);
    }

    .hero-copy {
      min-width: 0;
    }

    .greeting {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      margin: 0 0 15px;
      padding: 7px 13px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--text-soft);
      background: var(--surface);
      font-size: .94rem;
      font-weight: 700;
    }

    .greeting-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0