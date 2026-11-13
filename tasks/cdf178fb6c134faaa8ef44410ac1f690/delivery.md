```text
file=assets/css/style.css
/* ==========================================================================
   云舟的个人博客 · 样式表
   配色：主色 墨绿 #1f6f5c，辅助色 暖棕 #b45309，其余为中性色
   ========================================================================== */

/* ---------- 1. 设计令牌 ---------- */
:root {
  /* 主色（墨绿） */
  --color-primary: #1f6f5c;
  --color-primary-dark: #17564a;
  --color-primary-light: #2f8f77;
  --color-primary-soft: rgba(31, 111, 92, 0.10);
  --color-primary-softer: rgba(31, 111, 92, 0.06);

  /* 辅助色（暖棕，仅小面积强调） */
  --color-accent: #b45309;
  --color-accent-soft: rgba(180, 83, 9, 0.12);

  /* 中性色 */
  --color-bg: #f7f8f7;
  --color-bg-elevated: #ffffff;
  --color-bg-subtle: #eef1ef;
  --color-surface: #ffffff;
  --color-text: #17211e;
  --color-text-soft: #55635e;
  --color-text-faint: #85918d;
  --color-border: #e2e7e4;
  --color-border-strong: #cfd6d2;
  --color-overlay: rgba(14, 22, 20, 0.46);

  /* 间距 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 88px;

  /* 圆角 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-pill: 999px;

  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(20, 35, 30, 0.05), 0 1px 3px rgba(20, 35, 30, 0.04);
  --shadow-md: 0 2px 6px rgba(20, 35, 30, 0.06), 0 10px 24px rgba(20, 35, 30, 0.06);
  --shadow-lg: 0 8px 20px rgba(20, 35, 30, 0.10), 0 24px 60px rgba(20, 35, 30, 0.12);

  /* 字体 */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  --font-mono: SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;

  --font-xs: 12px;
  --font-sm: 13px;
  --font-base: 15px;
  --font-md: 17px;
  --font-lg: 20px;
  --font-xl: 26px;
  --font-2xl: 34px;
  --font-3xl: 44px;

  /* 布局 */
  --container: 1180px;
  --header-h: 68px;
  --transition: 180ms cubic-bezier(0.4, 0, 0.2, 1);
}

html[data-theme="dark"] {
  --color-primary: #4fbfa2;
  --color-primary-dark: #6ed3b7;
  --color-primary-light: #3aa88d;
  --color-primary-soft: rgba(79, 191, 162, 0.14);
  --color-primary-softer: rgba(79, 191, 162, 0.07);

  --color-accent: #e59a4b;
  --color-accent-soft: rgba(229, 154, 75, 0.16);

  --color-bg: #101715;
  --color-bg-elevated: #16201d;
  --color-bg-subtle: #1b2623;
  --color-surface: #16201d;
  --color-text: #e6ecea;
  --color-text-soft: #a8b6b1;
  --color-text-faint: #7d8b87;
  --color-border: #263330;
  --color-border-strong: #33423e;
  --color-overlay: rgba(3, 8, 7, 0.66);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.42), 0 12px 28px rgba(0, 0, 0, 0.38);
  --shadow-lg: 0 10px 24px rgba(0, 0, 0, 0.48), 0 28px 68px rgba(0, 0, 0, 0.5);
}

/* ---------- 2. 基础重置 ---------- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--header-h) + 16px);
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--font-base);
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background-color var(--transition), color var(--transition);
}

body.is-locked {
  overflow: hidden;
}

h1, h2, h3, h4 {
  margin: 0;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.01em;
}

p {
  margin: 0;
}

ul, ol, dl, dd {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

button {
  font: inherit;
  color: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

::selection {
  background: var(--color-primary-soft);
  color: var(--color-text);
}

.container {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 200;
  background: var(--color-primary);
  color: #fff;
  padding: var(--space-3) var(--space-4);
  border-radius: 0 0 var(--radius-sm) 0;
}
.skip-link:focus {
  left: 0;
}

/* ---------- 3. 按钮 ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  font-size: var(--font-base);
  font-weight: 600;
  line-height: 1.2;
  border: 1px solid transparent;
  transition: background-color var(--transition), color var(--transition),
    border-color var(--transition), transform var(--transition), box-shadow var(--transition);
  white-space: nowrap;
}

.btn-primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-sm);
}
html[data-theme="dark"] .btn-primary {
  color: #0d1512;
}
.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn-primary:active {
  transform: translateY(0);
}

.btn-ghost {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border-strong);
}
.btn-ghost:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-softer);
}
.btn-ghost:active {
  background: var(--color-primary-soft);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn.is-copied {
  background: var(--color-primary-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.btn-primary.is-copied {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  color: #fff;
}
html[data-theme="dark"] .btn-primary.is-copied {
  color: #0d1512;
}

.btn-block {
  width: 100%;
}

.link-btn {
  color: var(--color-primary);
  font-size: var(--font-sm);
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition);
}
.link-btn:hover {
  background: var(--color-primary-soft);
}

/* ---------- 4. 顶部导航 ---------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 90;
  background: color-mix(in srgb, var(--color-bg) 88%, transparent);
  backdrop-filter: saturate(1.4) blur(12px);
  -webkit-backdrop-filter: saturate(1.4) blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition), box-shadow var(--transition), background-color var(--transition);
}
.site-header.is-scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

.header-inner {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}
.logo-mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #fff;
}
html[data-theme="dark"] .logo-mark {
  color: #0d1512;
}
.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.logo-text strong {
  font-size: var(--font-md);
  letter-spacing: 0.01em;
}
.logo-text small {
  font-size: var(--font-xs);
  color: var(--color-text-faint);
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}
.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.nav-link {
  position: relative;
  display: inline-block;
  padding: 8px 12px;
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--color-text-soft);
  border-radius: var(--radius-sm);
  transition: color var(--transition), background-color var(--transition);
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition);
}
.nav-link:hover {
  color: var(--color-primary);
  background: var(--color-primary-softer);
}
.nav-link.is-active {
  color: var(--color-primary);
  font-weight: 600;
}
.nav-link.is-active::after {
  transform: scaleX(1);
}

.theme-toggle {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  color: var(--color-text-soft);
  transition: color var(--transition), border-color var(--transition), background-color var(--transition), transform var(--transition);
}
.theme-toggle:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
}
.theme-toggle:active {
  transform: scale(0.94);
}
.theme-toggle .icon-moon {
  display: none;
}
html[data-theme="dark"] .theme-toggle .icon-sun {
  display: none;
}
html[data-theme="dark"] .theme-toggle .icon-moon {
  display: block;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 0 9px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
}
.nav-toggle-bar {
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 2px;
  background: var(--color-text);
  transition: transform var(--transition), opacity var(--transition);
}
.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(2) {
  opacity: 0;
}
.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ---------- 5. Hero ---------- */
.hero {
  padding: var(--space-9) 0 var(--space-8);
  background:
    radial-gradient(900px 420px at 12% 0%, var(--color-primary-softer), transparent 70%),
    radial-gradient(700px 380px at 92% 10%, var(--color-primary-softer), transparent 72%);
}

.hero-inner {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: var(--space-8);
}

.hero-avatar-wrap {
  position: relative;
  width: 168px;
  height: 168px;
  flex-shrink: 0;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-primary);
  box-shadow: 0 0 0 6px var(--color-primary-softer), var(--shadow-md);
  transition: transform var(--transition), box-shadow var(--transition);
}
.avatar-lg {
  width: 168px;
  height: 168px;
}
.avatar-sm {
  width: 56px;
  height: 56px;
  box-shadow: 0 0 0 4px var(--color-primary-softer), var(--shadow-sm);
}
.avatar-ring {
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  border: 1px dashed var(--color-border-strong);
  pointer-events: none;
  animation: spin 26s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.hero-body {
  max-width: 640px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 5px 14px;
  border-radius: var(--radius-pill);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: var(--font-sm);
  font-weight: 600;
  letter-spacing: 0.02em;
}
.hero-eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}

.hero-title {
  margin: var(--space-4) 0 var(--space-4);
  font-size: var(--font-3xl);
  letter-spacing: -0.02em;
}
.hero-qq {
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
  position: relative;
  white-space: nowrap;
}
.hero-qq::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 8px;
  background: var(--color-primary-soft);
  border-radius: 4px;
  z-index: -1;
}

.hero-desc {
  color: var(--color-text-soft);
  font-size: var(--font-md);
  max-width: 56ch;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.social-list {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
}
.social-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-soft);
  transition: color var(--transition), border-color var(--transition), transform var(--transition), background-color var(--transition);
}
.social-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
  transform: translateY(-2px);
}
.social-btn:active {
  transform: translateY(0);
}

/* ---------- 6. 标签筛选条 ---------- */
.filter-bar {
  padding: var(--space-6) 0;
  background: var(--color-bg-subtle);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.filter-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}
.section-title {
  font-size: var(--font-xl);
}
.filter-count {
  font-size: var(--font-sm);
  color: var(--color-text-faint);
  font-variant-numeric: tabular-nums;
}

.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 7px 16px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  color: var(--color-text-soft);
  font-size: var(--font-sm);
  font-weight: 500;
  transition: color var(--transition), border-color var(--transition), background-color var(--transition), transform var(--transition);
}
.pill:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}
.pill.is-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
html[data-theme="dark"] .pill.is-active {
  color: #0d1512;
}
.pill .pill-num {
  font-size: var(--font-xs);
  font-variant-numeric: tabular-nums;
  opacity: 0.72;
}

/* ---------- 7. 内容区布局 ---------- */
.content {
  padding: var(--space-8) 0 var(--space-9);
}
.content-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: var(--space-7);
  align-items: start;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

.empty-state {
  padding: var(--space-8) var(--space-5);
  text-align: center;
  color: var(--color-text-faint);
  background: var(--color-surface);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
}

/* ---------- 8. 文章卡片 ---------- */
.post-card {
  display: flex;
  flex-direction: column;
  text-align: left;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-strong);
}
.post-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.post-cover {
  position: relative;
  height: 132px;
  display: flex;
  align-items: flex-end;
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  overflow: hidden;
}
.post-cover::before {
  content: "";
  position: absolute;
  width: 190px;
  height: 190px;
  right: -50px;
  top: -70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
}
.post-cover::after {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  left: -30px;
  bottom: -66px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.10);
}
.post-cover.tone-2 {
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
}
.post-cover.tone-3 {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-soft));
  background-color: var(--color-bg-subtle);
}
.post-cover.tone-4 {
  background: linear-gradient(135deg, #2b3a36, var(--color-primary));
}
.post-cover.tone-5 {
  background: linear-gradient(135deg, var(--color-primary), #0f3f34);
}
.post-cover.tone-6 {
  background: linear-gradient(135deg, #3a6a5e, var(--color-primary-light));
}

.post-badge {
  position: relative;
  z-index: 1;
  padding: 4px 11px;
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  color: #fff;
  font-size: var(--font-xs);
  font-weight: 600;
  letter-spacing: 0.02em;
}
html[data-theme="dark"] .post-badge {
  color: #1b1205;
}

.post-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--space-5);
  gap: var(--space-3);
}
.post-title {
  font-size: var(--font-lg);
  line-height: 1.45;
}
.post-card:hover .post-title {
  color: var(--color-primary);
}
.post-excerpt {
  color: var(--color-text-soft);
  font-size: var(--font-sm);
  line-height: 1.8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-xs);
  color: var(--color-text-faint);
  margin-top: auto;
  padding-top: var(--space-2);
}
.post-meta .meta-sep {
  opacity: 0.5;
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag-chip {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: var(--font-xs);
  font-weight: 500;
}
.tag-chip.accent {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

/* ---------- 9. 侧栏 ---------- */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: sticky;
  top: calc(var(--header-h) + var(--space-5));
}
.side-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
}
.side-title {
  font-size: var(--font-base);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
  letter-spacing: 0.02em;
}
.side-text {
  font-size: var(--font-sm);
  color: var(--color-text-soft);
  margin-bottom: var(--space-4);
}

.about-profile {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.about-name {
  font-weight: 700;
  font-size: var(--font-md);
}
.about-role {
  font-size: var(--font-xs);
  color: var(--color-text-faint);
}
.about-bio {
  font-size: var(--font-sm);
  color: var(--color-text-soft);
  margin-bottom: var(--space-4);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}
.stat {
  text-align: center;
}
.stat dt {
  font-size: var(--font-xs);
  color: var(--color-text-faint);
}
.stat dd {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.cloud-tag {
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  color: var(--color-text-soft);
  font-size: var(--font-xs);
  transition: color var(--transition), border-color var(--transition), background-color var(--transition);
}
.cloud-tag:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
}
.cloud-tag .cloud-num {
  opacity: 0.65;
  margin-left: 3px;
}

.archive-list {
  display: flex;
  flex-direction: column;
}
.archive-list li + li {
  border-top: 1px solid var(--color-border);
}
.archive-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: 10px 4px;
  font-size: var(--font-sm);
  color: var(--color-text-soft);
  transition: color var(--transition);
}
.archive-item:hover {
  color: var(--color-primary);
}
.archive-year {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.archive-num {
  font-size: var(--font-xs);
  color: var(--color-text-faint);
  padding: 1px 9px;
  border-radius: var(--radius-pill);
  background: var(--color-bg-subtle);
}

/* ---------- 10. 关于区块 ---------- */
.about {
  padding: var(--space-9) 0;
  background: var(--color-bg-subtle);
  border-top: 1px solid var(--color-border);
}
.about-head {
  margin-bottom: var(--space-6);
}
.eyebrow {
  display: inline-block;
  font-size: var(--font-xs);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-2);
}
.about-cols {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: var(--space-8);
}
.about-prose p {
  color: var(--color-text-soft);
  margin-bottom: var(--space-4);
  font-size: var(--font-base);
  line-height: 1.95;
}
.about-prose p:last-child {
  margin-bottom: 0;
}
.meta-title {
  font-size: var(--font-base);
  margin-bottom: var(--space-3);
}
.skill-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}
.skill-pill {
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  font-size: var(--font-sm);
  color: var(--color-text-soft);
  transition: color var(--transition), border-color var(--transition), transform var(--transition);
}
.skill-pill:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.contact-list {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.contact-list li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 12px var(--space-4);
  font-size: var(--font-sm);
}
.contact-list li + li {
  border-top: 1px solid var(--color-border);
}
.contact-label {
  width: 44px;
  flex-shrink: 0;
  color: var(--color-text-faint);
  font-size: var(--font-xs);
}
.contact-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

/* ---------- 11. 页脚 ---------- */
.site-footer {
  padding: var(--space-6) 0;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
.footer-copy {
  font-size: var(--font-sm);
  color: var(--color-text-faint);
}
.footer-links {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-sm);
  color: var(--color-text-faint);
  margin-top: 4px;
}
.footer-links a:hover {
  color: var(--color-primary);
}

.to-top {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-md);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity var(--transition), transform var(--transition), background-color var(--transition);
}
html[data-theme="dark"] .to-top {
  color: #0d1512;
}
.to-top.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.to-top:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
}

/* ---------- 12. 详情抽屉 ---------- */
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--color-overlay);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 240ms ease;
}
.drawer-overlay.is-open {
  opacity: 1;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 101;
  width: min(520px, 100vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-elevated);
  border-left: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  transform: translateX(100%);
  transition: transform 280ms cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer.is-open {
  transform: translateX(0);
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}
.drawer-badge {
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: var(--font-xs);
  font-weight: 600;
}
.drawer-close {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  color: var(--color-text-soft);
  transition: background-color var(--transition), color var(--transition);
}
.drawer-close:hover {
  background: var(--color-bg-subtle);
  color: var(--color-text);
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6) var(--space-5);
}
.drawer-title {
  font-size: var(--font-xl);
  line-height: 1.45;
}
.drawer-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-sm);
  color: var(--color-text-faint);
  margin: var(--space-3) 0 var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  font-variant-numeric: tabular-nums;
}
.drawer-content p {
  color: var(--color-text-soft);
  line-height: 2;
  margin-bottom: var(--space-4);
  font-size: var(--font-base);
}
.drawer-content h3 {
  font-size: var(--font-md);
  margin: var(--space-5) 0 var(--space-3);
  color: var(--color-text);
}
.drawer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.drawer-foot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
  flex-shrink: 0;
}

/* ---------- 13. 响应式 ---------- */
@media (max-width: 1023px) {
  .content-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
  }
  .sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
  }
  .about-card,
  .subscribe-card {
    grid-column: 1 / -1;
  }
  .hero-inner {
    gap: var(--space-6);
  }
  .about-cols {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
  }
}

@media (max-width: 767px) {
  .container {
    padding: 0 var(--space-4);
  }
  .nav {
    position: fixed;
    top: var(--header-h);
    left: 0;
    right: 0;
    z-index: 88;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
    padding: var(--space-4);
    background: var(--color-bg-elevated);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
    transform: translateY(-12px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity var(--transition), transform var(--transition), visibility var(--transition);
  }
  .nav.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }
  .nav-list {
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
  }
  .nav-link {
    padding: 12px 14px;
    border-radius: var(--radius-md);
  }
  .nav-link::after {
    display: none;
  }
  .nav-link.is-active {
    background: var(--color-primary-soft);
  }
  .theme-toggle {
    align-self: flex-start;
  }
  .nav-toggle {
    display: flex;
  }
  .logo-text small {
    display: none;
  }

  .hero {
    padding: var(--space-7) 0 var(--space-7);
  }
  .hero-inner {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    text-align: center;
    gap: var(--space-5);
  }
  .hero-avatar-wrap {
    width: 116px;
    height: 116px;
  }
  .avatar-lg {
    width: 116px;
    height: 116px;
  }
  .avatar-ring {
    inset: -10px;
  }
  .hero-title {
    font-size: var(--font-2xl);
  }
  .hero-desc {
    font-size: var(--font-base);
  }
  .hero-actions {
    justify-content: center;
    width: 100%;
  }
  .hero-actions .btn {
    flex: 1 1 auto;
  }
  .social-list {
    justify-content: center;
  }

  .filter-head {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
  }
  .pill-row {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: var(--space-2);
    margin: 0 calc(-1 * var(--space-4));
    padding-left: var(--space-4);
    padding-right: var(--space-4);
    scrollbar-width: none;
  }
  .pill-row::-webkit-scrollbar {
    display: none;
  }
  .pill {
    flex-shrink: 0;
  }

  .posts-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .sidebar {
    grid-template-columns: minmax(0, 1fr);
  }
  .about-card,
  .subscribe-card {
    grid-column: auto;
  }
  .post-cover {
    height: 118px;
  }

  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-4);
  }
  .footer-links {
    justify-content: center;
    flex-wrap: wrap;
  }
  .to-top {
    position: static;
    opacity: 1;
    transform: none;
  }
  .to-top[hidden] {
    display: none;
  }
  .drawer {
    width: 100vw;
  }
  .drawer-foot {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .hero-title {
    font-size: 26px;
  }
  .hero-actions .btn {
    width: 100%;
    flex: none;
  }
  .btn {
    padding: 10px 16px;
    font-size: var(--font-sm);
  }
  .section-title {
    font-size: var(--font-lg);
  }
  .stats {
    gap: var(--space-1);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

```

```text
file=assets/js/app.js
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

```

```text
file=assets/js/avatar.js
/* =============================================================
   avatar.js — QQ 头像获取与回退
   通过 QQ 官方头像接口动态获取头像，失败/超时自动回退为内联 SVG 字母头像。
   ============================================================= */
(function (global) {
  "use strict";

  var QQ_NUMBER = "3627236036";
  var AVATAR_API = "https://q1.qlogo.cn/g?b=qq&nk=" + QQ_NUMBER + "&s=640";
  var TIMEOUT_MS = 1000;

  /* 生成内联 SVG 字母头像（主色背景 + 白色首字母），转成 data URI */
  function buildFallbackAvatar(initial) {
    var letter = (initial || "Y").trim().charAt(0) || "Y";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#2f8f77"/><stop offset="100%" stop-color="#17564a"/>' +
      "</linearGradient></defs>" +
      '<rect width="160" height="160" fill="url(#g)"/>' +
      '<text x="80" y="80" text-anchor="middle" dominant-baseline="central" ' +
      'dy="0.35em" ' +
      'font-family="Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial, sans-serif" ' +
      'font-size="70" font-weight="600" fill="#ffffff">' +
      letter +
      "</text></svg>";

    return (
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg)
    );
  }

  /* 用回退头像替换某个 img 元素。
     若图片其实已经成功加载（naturalWidth > 0），则保留真实头像。 */
  function applyFallback(img, initial) {
    if (!img || img.dataset.fallbackApplied === "1") {
      return;
    }
    if (img.complete && img.naturalWidth > 0) {
      return;
    }
    img.dataset.fallbackApplied = "1";
    img.src = buildFallbackAvatar(initial);
    img.setAttribute("data-fallback", "1");
  }

  /* 预加载一张图片，1 秒 / 3 秒超时则走回退 */
  function preload(src) {
    return new Promise(function (resolve, reject) {
      var probe = new Image();
      var settled = false;

      var timer = setTimeout(function () {
        if (!settled) {
          settled = true;
          probe.src = "";
          reject(new Error("avatar timeout"));
        }
      }, TIMEOUT_MS);

      probe.onload = function () {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(src);
      };

      probe.onerror = function () {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(new Error("avatar load error"));
      };

      probe.src = src;
    });
  }

  /**
   * 初始化头像：给所有带 data-avatar-qq 的 img 注入 QQ 头像地址，
   * 加载失败或超时后回退为内联 SVG 字母头像。
   */
  function initAvatars(options) {
    var opts = options || {};
    var qq = opts.qq || QQ_NUMBER;
    var initial = opts.initial || "云";
    var selector = opts.selector || "[data-avatar-qq]";
    var images = Array.prototype.slice.call(document.querySelectorAll(selector));

    if (!images.length) {
      return Promise.resolve(false);
    }

    var apiUrl =
      "https://q1.qlogo.cn/g?b=qq&nk=" + encodeURIComponent(qq) + "&s=640";

    images.forEach(function (img) {
      img.dataset.avatarQq = qq;
      /* 先绑定错误处理，避免加载失败时出现破图图标 */
      img.addEventListener("error", function () {
        applyFallback(img, initial);
      });
      /* 同步注入真实头像地址，保证 img 的 src 始终指向 QQ 头像接口 */
      img.setAttribute("src", apiUrl);
      img.setAttribute("data-avatar-source", "q1.qlogo.cn");
    });

    return preload(apiUrl)
      .then(function () {
        return true;
      })
      .catch(function () {
        images.forEach(function (img) {
          applyFallback(img, initial);
        });
        return false;
      });
  }

  global.QQBlog = global.QQBlog || {};
  global.QQBlog.QQ_NUMBER = QQ_NUMBER;
  global.QQBlog.AVATAR_API = AVATAR_API;
  global.QQBlog.initAvatars = initAvatars;
  global.QQBlog.buildFallbackAvatar = buildFallbackAvatar;

  /* 尽早启动头像加载：脚本位于 body 末尾时立即执行，
     否则在 DOMContentLoaded 后执行，保证 1 秒内完成加载或回退。 */
  function autoInit() {
    initAvatars({
      qq: QQ_NUMBER,
      initial: "云",
      selector: "[data-avatar-qq]"
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }
})(window);

```

```text
file=index.html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>云舟的博客 · 3627236036</title>
<meta name="description" content="个人博客：云舟的写字空间，记录前端、生活与随笔。QQ：3627236036">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<a class="skip-link" href="#main">跳转到主要内容</a>

<!-- ============ 顶部导航 ============ -->
<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a class="logo" href="#home">
      <span class="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 17c2.5 0 3-6 6-6s3.5 6 6 6 3-3 6-3"/>
          <path d="M3 11c2.5 0 3-6 6-6s3.5 6 6 6 3-3 6-3"/>
        </svg>
      </span>
      <span class="logo-text">
        <strong>云舟</strong>
        <small>写代码，也写生活</small>
      </span>
    </a>

    <nav class="nav" id="primary-nav" aria-label="主导航">
      <ul class="nav-list">
        <li><a class="nav-link is-active" href="#home" data-nav="home">首页</a></li>
        <li><a class="nav-link" href="#posts" data-nav="posts">文章</a></li>
        <li><a class="nav-link" href="#tags" data-nav="tags">标签</a></li>
        <li><a class="nav-link" href="#about" data-nav="about">关于</a></li>
      </ul>
      <button class="theme-toggle" id="theme-toggle" type="button" aria-label="切换深色 / 浅色主题" aria-pressed="false">
        <svg class="icon-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2"/>
          <path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M6.3 6.3 4.8 4.8M19.2 19.2l-1.5-1.5M17.7 6.3l1.5-1.5M4.8 19.2l1.5-1.5"/>
        </svg>
        <svg class="icon-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a6.8 6.8 0 0 0 10.8 10.8Z"/>
        </svg>
      </button>
    </nav>

    <button class="nav-toggle" id="nav-toggle" type="button" aria-label="展开导航菜单" aria-expanded="false" aria-controls="primary-nav">
      <span class="nav-toggle-bar" aria-hidden="true"></span>
      <span class="nav-toggle-bar" aria-hidden="true"></span>
      <span class="nav-toggle-bar" aria-hidden="true"></span>
    </button>
  </div>
</header>

<main id="main">

  <!-- ============ Hero 首屏 ============ -->
  <section class="hero" id="home">
    <div class="container hero-inner">
      <div class="hero-avatar-wrap">
        <img class="avatar avatar-lg" id="hero-avatar" alt="博主云舟的 QQ 头像" data-avatar-qq="3627236036" width="168" height="168">
        <span class="avatar-ring" aria-hidden="true"></span>
      </div>

      <div class="hero-body">
        <p class="hero-eyebrow">
          <span class="dot" aria-hidden="true"></span>
          写代码 / 写点碎碎念
        </p>
        <h1 class="hero-title">你好，我是 <span class="hero-qq">3627236036</span></h1>
        <p class="hero-desc">
          一名前端开发者，喜欢把复杂的问题拆成简单的组件。这里存放我写过的一些代码片段、
          关于生活的片段记录，以及偶尔不合时宜的碎碎念。
        </p>

        <div class="hero-actions">
          <a class="btn btn-primary" href="#posts">
            浏览文章
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </a>
          <button class="btn btn-ghost" id="copy-qq" type="button" data-qq="3627236036" aria-label="复制 QQ 号 3627236036">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="2.4"/>
              <path d="M5 15V6a2 2 0 0 1 2-2h9"/>
            </svg>
            <span class="btn-label">复制 QQ 号</span>
          </button>
        </div>

        <ul class="social-list" aria-label="社交链接">
          <li>
            <a class="social-btn" href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.89c.51.09.7-.22.7-.49l-.01-1.9c-2.72.6-3.3-1.16-3.3-1.16-.45-1.13-1.1-1.43-1.1-1.43-.89-.61.07-.6.07-.6.98.07 1.5 1.01 1.5 1.01.88 1.5 2.3 1.07 2.86.82.09-.64.34-1.07.62-1.32-2.17-.25-4.45-1.09-4.45-4.84 0-1.07.38-1.94 1.01-2.62-.1-.25-.44-1.24.1-2.59 0 0 .82-.26 2.69 1a9.3 9.3 0 0 1 4.9 0c1.86-1.26 2.68-1 2.68-1 .55 1.35.21 2.34.1 2.59.63.68 1.01 1.55 1.01 2.62 0 3.76-2.29 4.59-4.47 4.83.36.31.67.91.67 1.85l-.01 2.75c0 .27.18.59.7.49A10.2 10.2 0 0 0 12 1.8Z"/>
              </svg>
            </a>
          </li>
          <li>
            <a class="social-btn" href="mailto:3627236036@qq.com" aria-label="发送邮件">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.4"/>
                <path d="m3.4 7 7.5 5.4a2 2 0 0 0 2.2 0L20.6 7"/>
              </svg>
            </a>
          </li>
          <li>
            <a class="social-btn" href="https://wpa.qq.com/msgrd?v=3&amp;uin=3627236036&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer" aria-label="QQ 聊天">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10.4c0 4.4-4 8-9 8-1 0-2-.15-2.9-.43L4 20l1.2-3.5C3.8 15.2 3 12.9 3 10.4c0-4.4 4-8 9-8s9 3.6 9 8Z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ============ 标签筛选 ============ -->
  <section class="filter-bar" id="tags">
    <div class="container filter-inner">
      <div class="filter-head">
        <h2 class="section-title">文章标签</h2>
        <p class="filter-count" id="filter-count" aria-live="polite">共 6 篇文章</p>
      </div>
      <div class="pill-row" id="filter-pills" role="group" aria-label="按标签筛选文章"></div>
    </div>
  </section>

  <!-- ============ 文章区 + 侧栏 ============ -->
  <section class="content" id="posts">
    <div class="container content-inner">

      <div class="posts-column">
        <div class="posts-grid" id="posts-grid"></div>
        <p class="empty-state" id="empty-state" hidden>该标签下暂时还没有文章，换个标签试试。</p>
      </div>

      <aside class="sidebar" aria-label="侧边栏">

        <section class="side-card about-card">
          <h3 class="side-title">关于我</h3>
          <div class="about-profile">
            <img class="avatar avatar-sm" id="side-avatar" alt="博主云舟的 QQ 头像（小图）" data-avatar-qq="3627236036" width="56" height="56">
            <div>
              <p class="about-name">云舟</p>
              <p class="about-role">前端开发者 / 长期写作者</p>
            </div>
          </div>
          <p class="about-bio">
            用键盘敲代码，用笔记录生活。相信好的作品来自持续的微小积累，
            这里是我把过程整理下来的地方。
          </p>
          <dl class="stats" id="stats">
            <div class="stat">
              <dt>文章</dt>
              <dd id="stat-posts">6</dd>
            </div>
            <div class="stat">
              <dt>标签</dt>
              <dd id="stat-tags">4</dd>
            </div>
            <div class="stat">
              <dt>归档</dt>
              <dd id="stat-archives">2</dd>
            </div>
          </dl>
        </section>

        <section class="side-card">
          <h3 class="side-title">标签云</h3>
          <div class="tag-cloud" id="tag-cloud"></div>
        </section>

        <section class="side-card">
          <h3 class="side-title">归档</h3>
          <ul class="archive-list" id="archive-list"></ul>
        </section>

        <section class="side-card subscribe-card">
          <h3 class="side-title">订阅 RSS</h3>
          <p class="side-text">新文章发布时，第一时间送达你的阅读器。</p>
          <a class="btn btn-block btn-ghost" href="#subscribe" id="rss-link" aria-label="订阅 RSS 订阅源">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4.5 11.5a8 8 0 0 1 8 8M4.5 4.8a14.7 14.7 0 0 1 14.7 14.7"/>
              <circle cx="5.2" cy="18.8" r="1.4" fill="currentColor" stroke="none"/>
            </svg>
            订阅源地址
          </a>
        </section>

      </aside>
    </div>
  </section>

  <!-- ============ 关于区块 ============ -->
  <section class="about" id="about">
    <div class="container about-inner">
      <div class="about-head">
        <p class="eyebrow">关于</p>
        <h2 class="section-title">关于我与这个博客</h2>
      </div>

      <div class="about-cols">
        <div class="about-prose">
          <p>
            你好，我是云舟，一个常年混迹于前端生态的开发者。日常工作里写组件、调样式、
            排查那些只在某个特定浏览器里才会出现的诡异问题；下了班则喜欢写点技术随笔，
            把踩过的坑再写一遍，好让下一次的自己少摔一跤。
          </p>
          <p>
            这个博客诞生于一个很简单的想法：踩过的坑不该只留在自己的脑子里。
            所以我把工程实践、读书笔记和日常观察都放在这里，尽量用平实的语言，
            把一件事讲清楚。
          </p>
          <p>
            如果你在某篇文章里找到了帮助，欢迎加我 QQ 交流；如果没有，也欢迎随时吐槽。
            写作对我来说更像是一场长跑，慢一点没关系，别停下就好。
          </p>
        </div>

        <div class="about-meta">
          <h3 class="meta-title">技能与兴趣</h3>
          <div class="skill-row">
            <span class="skill-pill">HTML / 语义化</span>
            <span class="skill-pill">CSS / 响应式</span>
            <span class="skill-pill">JavaScript</span>
            <span class="skill-pill">Vue</span>
            <span class="skill-pill">Node.js</span>
            <span class="skill-pill">界面设计</span>
            <span class="skill-pill">摄影</span>
            <span class="skill-pill">骑行</span>
          </div>

          <h3 class="meta-title">联系方式</h3>
          <ul class="contact-list">
            <li>
              <span class="contact-label">QQ</span>
              <span class="contact-value">3627236036</span>
              <button class="link-btn" type="button" data-copy-qq="3627236036" aria-label="复制 QQ 号 3627236036">复制</button>
            </li>
            <li>
              <span class="contact-label">邮箱</span>
              <span class="contact-value">3627236036@qq.com</span>
              <a class="link-btn" href="mailto:3627236036@qq.com" aria-label="发送邮件到 3627236036@qq.com">写信</a>
            </li>
            <li>
              <span class="contact-label">主页</span>
              <span class="contact-value">blog.yunzhou.dev</span>
              <a class="link-btn" href="#home" aria-label="返回首页">前往</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- ============ 页脚 ============ -->
<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-info">
      <p class="footer-copy">© 2024 云舟 · 3627236036 · 用心写字，好好生活</p>
      <p class="footer-links">
        <a href="#home">首页</a>
        <span aria-hidden="true">·</span>
        <a href="#posts">文章</a>
        <span aria-hidden="true">·</span>
        <a href="#tags">标签</a>
        <span aria-hidden="true">·</span>
        <a href="#about">关于</a>
        <span aria-hidden="true">·</span>
        <a href="mailto:3627236036@qq.com">联系</a>
      </p>
    </div>
    <button class="to-top" id="to-top" type="button" aria-label="回到页面顶部" hidden>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6"/>
      </svg>
    </button>
  </div>
</footer>

<!-- ============ 文章详情抽屉 ============ -->
<div class="drawer-overlay" id="drawer-overlay" hidden></div>
<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" aria-hidden="true" hidden>
  <div class="drawer-head">
    <span class="drawer-badge" id="drawer-badge">分类</span>
    <button class="drawer-close" id="drawer-close" type="button" aria-label="关闭文章详情">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18"/>
      </svg>
    </button>
  </div>

  <div class="drawer-body">
    <h2 class="drawer-title" id="drawer-title">文章标题</h2>
    <p class="drawer-meta">
      <span id="drawer-date">2024-05-12</span>
      <span class="meta-sep" aria-hidden="true">·</span>
      <span id="drawer-read">6 分钟阅读</span>
    </p>
    <div class="drawer-content" id="drawer-content"></div>
    <div class="drawer-tags" id="drawer-tags"></div>
  </div>

  <div class="drawer-foot">
    <button class="btn btn-ghost btn-block" id="prev-post" type="button">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M19 12H5M11 6l-6 6 6 6"/>
      </svg>
      上一篇
    </button>
    <button class="btn btn-ghost btn-block" id="next-post" type="button">
      下一篇
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6"/>
      </svg>
    </button>
  </div>
</aside>

<script src="assets/js/avatar.js"></script>
<script src="assets/js/app.js"></script>
</body>
</html>

```