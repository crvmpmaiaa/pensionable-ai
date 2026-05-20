# maiaa.ai Full Site Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild maiaa.ai as a full-service digital marketing studio with healthytogether.co aesthetics — lavender-tinted light theme, massive Inter typography, Lenis smooth scroll, five services including AI Consulting.

**Architecture:** Full rewrite of `index.html`, `css/main.css`, and `js/main.js`. The old dark theme, GSAP canvas, loader, custom cursor, magnetic buttons, and tilt effects are removed entirely. Lenis (via CDN) replaces GSAP for scroll, and IntersectionObserver replaces ScrollTrigger for reveal animations. `portfolio.html` gets a colour-scheme update only — no structural changes.

**Tech Stack:** Vanilla HTML/CSS/JS, Inter (Google Fonts), Lenis 1.x (`cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js`), IntersectionObserver API, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-05-12-maiaa-full-overhaul-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `index.html` | Full rewrite | All page HTML: nav, hero, brag bar, services, process, portfolio teaser, dark CTA |
| `css/main.css` | Full rewrite | Design tokens, layout, typography, components, animations, responsive breakpoints |
| `js/main.js` | Full rewrite | Lenis init, IntersectionObserver reveal, mobile nav toggle, anchor scroll |
| `js/effects.js` | Delete | No longer needed |
| `portfolio.html` | Style update | Swap font imports and CSS variable references to match new design system |

---

## Task 1: Delete effects.js and strip the old HTML shell

**Files:**
- Delete: `js/effects.js`
- Modify: `index.html` (full replace)

Remove the old file and replace `index.html` with a clean semantic shell — correct `<head>`, new font imports, new script tags, empty `<body>` placeholders. No content yet; this task just establishes the document structure so every subsequent task can add a section.

- [ ] **Step 1: Delete effects.js**

```bash
rm "/Users/admin/Desktop/3D website/js/effects.js"
```

- [ ] **Step 2: Replace index.html with the new shell**

Replace the entire file at `/Users/admin/Desktop/3D website/index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/png" href="assets/maiaa.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>maiaa.ai — Profitable Marketing for the AI Generation</title>
  <meta name="description" content="Full-service digital marketing studio. Websites, SEO, paid ads, digital strategy, and AI consulting — from one team.">
  <meta property="og:title" content="maiaa.ai — Profitable Marketing for the AI Generation">
  <meta property="og:description" content="No jargon. No fluff. Just smart ideas and sharp execution from a team that gets it.">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>

  <!-- Nav -->
  <nav class="nav" id="nav"></nav>

  <!-- Mobile menu overlay -->
  <div class="mobile-menu" id="mobileMenu"></div>

  <main>
    <!-- Hero -->
    <section class="hero" id="hero"></section>

    <!-- Brag bar -->
    <div class="brag-bar"></div>

    <!-- Services -->
    <section class="services" id="services"></section>

    <!-- Process -->
    <section class="process" id="process"></section>

    <!-- Portfolio teaser -->
    <section class="portfolio-teaser" id="portfolio-teaser"></section>

    <!-- Dark CTA -->
    <section class="cta-dark"></section>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Open index.html in browser, verify no dark theme flash, blank white/lavender page loads**

- [ ] **Step 4: Commit**

```bash
cd "/Users/admin/Desktop/3D website"
git add index.html
git rm js/effects.js
git commit -m "chore: replace index shell, remove effects.js"
```

---

## Task 2: Write the new CSS — design tokens and base styles

**Files:**
- Modify: `css/main.css` (full rewrite — replace all content)

Write the complete stylesheet. This is the largest single task. Do it all at once so tokens are available for every subsequent HTML task.

- [ ] **Step 1: Replace css/main.css entirely with the following**

```css
/* ============================================================
   maiaa.ai — Main Stylesheet
   ============================================================ */

/* --- Design Tokens --- */
:root {
  --bg:           #F5F3FF;
  --white:        #FFFFFF;
  --dark:         #101722;
  --purple:       #6C47FF;
  --purple-deep:  #2D1599;
  --purple-light: #EDE9FF;
  --muted:        #6B7280;
  --border:       rgba(108, 71, 255, 0.12);
  --container:    1280px;
  --radius-card:  20px;
  --radius-btn:   12px;
}

/* --- Reset --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; } /* Lenis handles smooth scroll */
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--dark);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
img { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }

/* --- Container --- */
.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 64px;
}
@media (max-width: 768px) { .container { padding: 0 24px; } }

/* --- Scroll Reveal --- */
.fade-up {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 0.75s ease, transform 0.75s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }

/* --- Buttons --- */
.btn-fill {
  display: inline-block;
  background: var(--purple);
  color: #fff;
  padding: 16px 34px;
  border-radius: var(--radius-btn);
  font-size: 16px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-fill:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(108, 71, 255, 0.35);
}

.btn-ghost {
  display: inline-block;
  background: transparent;
  color: var(--dark);
  padding: 14px 32px;
  border-radius: var(--radius-btn);
  font-size: 16px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  border: 2px solid #D1D5DB;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.btn-ghost:hover { border-color: var(--purple); }

.btn-dark {
  display: inline-block;
  background: var(--dark);
  color: #fff;
  padding: 10px 22px;
  border-radius: var(--radius-btn);
  font-size: 14px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
.btn-dark:hover { opacity: 0.85; }

.btn-white {
  display: inline-block;
  background: #fff;
  color: var(--purple-deep);
  padding: 18px 40px;
  border-radius: var(--radius-btn);
  font-size: 17px;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

/* --- Nav --- */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 22px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(245, 243, 255, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-logo {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--dark);
}
.nav-logo span { color: var(--purple); }
.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
}
.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  transition: color 0.15s ease;
}
.nav-link:hover { color: var(--dark); }
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.nav-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--dark);
  border-radius: 2px;
  transition: all 0.25s ease;
}
.nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; }
.nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .nav { padding: 20px 24px; }
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
}

/* --- Mobile Menu --- */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: var(--dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.mobile-menu.open {
  opacity: 1;
  pointer-events: all;
}
.mobile-menu-link {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  transition: color 0.15s ease;
}
.mobile-menu-link:hover { color: var(--purple); }
.mobile-menu-link.mobile-menu-cta {
  background: var(--purple);
  color: #fff;
  padding: 14px 32px;
  border-radius: var(--radius-btn);
  font-size: 18px;
}

/* --- Hero --- */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 160px 64px 100px;
  position: relative;
  overflow: hidden;
}
.hero-blob {
  position: absolute;
  top: -180px; right: -300px;
  width: 900px; height: 900px;
  background: radial-gradient(circle, rgba(108,71,255,0.14) 0%, rgba(108,71,255,0.05) 45%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: blob-pulse 8s ease-in-out infinite;
}
.hero-blob-2 {
  position: absolute;
  bottom: -200px; left: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(108,71,255,0.08) 0%, transparent 65%);
  border-radius: 50%;
  pointer-events: none;
  animation: blob-pulse 10s ease-in-out 2s infinite;
}
@keyframes blob-pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}
.hero-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--purple);
  margin-bottom: 28px;
}
.hero h1 {
  font-size: clamp(64px, 8.5vw, 112px);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -0.05em;
  max-width: 920px;
}
.hero h1 em {
  font-style: normal;
  color: var(--purple);
}
.hero-sub {
  font-size: 18px;
  line-height: 1.65;
  color: var(--muted);
  max-width: 540px;
  margin-top: 32px;
}
.hero-actions {
  margin-top: 44px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .hero {
    padding: 120px 24px 80px;
    min-height: auto;
  }
  .hero-blob, .hero-blob-2 { display: none; }
  .hero-sub { font-size: 16px; }
  .hero-actions { flex-direction: column; }
  .hero-actions .btn-fill,
  .hero-actions .btn-ghost { text-align: center; }
}

/* --- Brag Bar --- */
.brag-bar {
  padding: 28px 64px;
  background: rgba(255, 255, 255, 0.6);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.brag-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9CA3AF;
  margin-bottom: 16px;
}
.brag-logos {
  display: flex;
  gap: 48px;
  align-items: center;
  flex-wrap: wrap;
}
.brag-logo {
  font-size: 15px;
  font-weight: 700;
  color: #C4B5FD;
  letter-spacing: -0.01em;
}
@media (max-width: 768px) {
  .brag-bar { padding: 24px; }
  .brag-logos { gap: 24px; }
}

/* --- Services --- */
.services {
  padding: 160px 64px;
  background: var(--white);
}
.section-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--purple);
  margin-bottom: 20px;
}
.section-title {
  font-size: clamp(44px, 6vw, 80px);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1.0;
  max-width: 800px;
  margin-bottom: 80px;
}
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.service-card {
  padding: 44px;
  background: var(--bg);
  border-radius: var(--radius-card);
  border: 1.5px solid transparent;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.service-card:hover {
  border-color: rgba(108, 71, 255, 0.3);
  background: var(--purple-light);
  transform: translateY(-4px);
}
.service-num {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--purple);
  margin-bottom: 20px;
}
.service-card h3 {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  color: var(--dark);
}
.service-card p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--muted);
}
@media (max-width: 1024px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .services { padding: 80px 24px; }
  .services-grid { grid-template-columns: 1fr; }
  .section-title { margin-bottom: 48px; }
}

/* --- Process --- */
.process {
  padding: 160px 64px;
  background: var(--bg);
}
.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 80px;
}
.process-step {
  padding: 40px;
  background: var(--white);
  border-radius: var(--radius-card);
  border: 1.5px solid var(--border);
}
.step-num {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #E9E4FF;
  margin-bottom: 20px;
  line-height: 1;
}
.process-step h3 {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}
.process-step p {
  font-size: 14px;
  line-height: 1.7;
  color: var(--muted);
}
@media (max-width: 1024px) {
  .process-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .process { padding: 80px 24px; }
  .process-grid { grid-template-columns: 1fr; margin-top: 48px; }
}

/* --- Portfolio Teaser --- */
.portfolio-teaser {
  padding: 160px 64px;
  background: var(--white);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.portfolio-copy .section-eyebrow { margin-bottom: 20px; }
.portfolio-copy h2 {
  font-size: clamp(40px, 5.5vw, 72px);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1.0;
  margin-bottom: 32px;
}
.portfolio-thumb-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.portfolio-thumb {
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
  background: var(--purple-light);
}
.portfolio-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.portfolio-thumb:hover img { transform: scale(1.04); }
@media (max-width: 1024px) {
  .portfolio-teaser {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
@media (max-width: 768px) {
  .portfolio-teaser { padding: 80px 24px; }
  .portfolio-thumb-grid { gap: 10px; }
}

/* --- Dark CTA --- */
.cta-dark {
  background: var(--purple-deep);
  color: #fff;
  padding: 160px 64px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-blob {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 800px;
  background: radial-gradient(circle, rgba(108,71,255,0.4) 0%, transparent 65%);
  border-radius: 50%;
  pointer-events: none;
}
.cta-inner {
  position: relative;
  z-index: 1;
}
.cta-dark h2 {
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1.0;
  max-width: 900px;
  margin: 0 auto 32px;
}
.cta-dark p {
  font-size: 20px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.55);
  max-width: 480px;
  margin: 0 auto 44px;
}
@media (max-width: 768px) {
  .cta-dark { padding: 80px 24px; }
  .cta-dark p { font-size: 16px; }
}
```

- [ ] **Step 2: Open index.html in browser — verify lavender background, Inter font loaded, no old styles**

- [ ] **Step 3: Commit**

```bash
cd "/Users/admin/Desktop/3D website"
git add css/main.css
git commit -m "feat: new design system CSS — tokens, layout, all components"
```

---

## Task 3: Build the Nav and Mobile Menu HTML

**Files:**
- Modify: `index.html` — fill in `<nav>` and `.mobile-menu` sections

- [ ] **Step 1: Replace the empty `<nav class="nav" id="nav"></nav>` in index.html with:**

```html
<nav class="nav" id="nav">
  <a href="index.html" class="nav-logo">maiaa<span>.ai</span></a>
  <div class="nav-links">
    <a href="#services" class="nav-link">Services</a>
    <a href="portfolio.html" class="nav-link">Portfolio</a>
    <a href="#process" class="nav-link">Process</a>
    <a href="https://calendar.app.google/mcwL3QfnGBo8TwRH8" target="_blank" rel="noopener" class="btn-dark">Book a Call</a>
  </div>
  <button class="nav-hamburger" id="navHamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
</nav>
```

- [ ] **Step 2: Replace the empty `.mobile-menu` div with:**

```html
<div class="mobile-menu" id="mobileMenu">
  <a href="#services" class="mobile-menu-link">Services</a>
  <a href="portfolio.html" class="mobile-menu-link">Portfolio</a>
  <a href="#process" class="mobile-menu-link">Process</a>
  <a href="https://calendar.app.google/mcwL3QfnGBo8TwRH8" target="_blank" rel="noopener" class="mobile-menu-link mobile-menu-cta">Book a Call</a>
</div>
```

- [ ] **Step 3: Open browser — verify nav renders, logo shows with purple `.ai`, "Book a Call" button is dark filled**

- [ ] **Step 4: Resize to mobile width — verify hamburger icon appears, nav links hide**

- [ ] **Step 5: Commit**

```bash
cd "/Users/admin/Desktop/3D website"
git add index.html
git commit -m "feat: nav and mobile menu HTML"
```

---

## Task 4: Build the Hero section HTML

**Files:**
- Modify: `index.html` — fill in `<section class="hero">` 

- [ ] **Step 1: Replace the empty `.hero` section with:**

```html
<section class="hero" id="hero">
  <div class="hero-blob"></div>
  <div class="hero-blob-2"></div>
  <div class="hero-eyebrow fade-up">Digital Marketing Studio</div>
  <h1 class="fade-up" style="transition-delay: 0.08s">
    Profitable marketing<br>for the <em>AI generation.</em>
  </h1>
  <p class="hero-sub fade-up" style="transition-delay: 0.18s">
    No jargon. No fluff. Just smart ideas and sharp execution from a team that gets it.
  </p>
  <div class="hero-actions fade-up" style="transition-delay: 0.28s">
    <a href="https://calendar.app.google/mcwL3QfnGBo8TwRH8" target="_blank" rel="noopener" class="btn-fill">Start a Project</a>
    <a href="portfolio.html" class="btn-ghost">See Our Work</a>
  </div>
</section>
```

- [ ] **Step 2: Open browser — verify hero renders with blobs, large Inter headline, purple "AI generation." accent**

- [ ] **Step 3: Check mobile (≤768px) — blobs hidden, text scales down, buttons stack**

- [ ] **Step 4: Commit**

```bash
cd "/Users/admin/Desktop/3D website"
git add index.html
git commit -m "feat: hero section HTML"
```

---

## Task 5: Build Brag Bar, Services, and Process HTML

**Files:**
- Modify: `index.html` — fill in brag bar, services, and process sections

- [ ] **Step 1: Replace the empty `.brag-bar` div with:**

```html
<div class="brag-bar">
  <div class="brag-label">Trusted by</div>
  <div class="brag-logos">
    <span class="brag-logo">Miracle of Aloe</span>
    <span class="brag-logo">Spencer Lynch</span>
    <span class="brag-logo">Native Nature</span>
  </div>
</div>
```

- [ ] **Step 2: Replace the empty `.services` section with:**

```html
<section class="services" id="services">
  <div class="section-eyebrow fade-up">What we do</div>
  <h2 class="section-title fade-up" style="transition-delay: 0.07s">Everything your brand<br>needs online.</h2>
  <div class="services-grid">
    <div class="service-card fade-up" style="transition-delay: 0s">
      <div class="service-num">01</div>
      <h3>Website Design</h3>
      <p>Premium sites delivered in 3 days. Fixed price, no delays, pixel-perfect every time.</p>
    </div>
    <div class="service-card fade-up" style="transition-delay: 0.07s">
      <div class="service-num">02</div>
      <h3>SEO Campaigns</h3>
      <p>Long-term organic growth that compounds. We build authority that outlasts algorithm changes.</p>
    </div>
    <div class="service-card fade-up" style="transition-delay: 0.14s">
      <div class="service-num">03</div>
      <h3>Paid Advertising</h3>
      <p>Immediate visibility across Google and social with optimized return on ad spend.</p>
    </div>
    <div class="service-card fade-up" style="transition-delay: 0.07s">
      <div class="service-num">04</div>
      <h3>Digital Strategy</h3>
      <p>A tailored roadmap that connects your channels and turns activity into measurable revenue.</p>
    </div>
    <div class="service-card fade-up" style="transition-delay: 0.14s">
      <div class="service-num">05</div>
      <h3>AI Consulting</h3>
      <p>Navigate the AI shift. We help businesses understand and apply AI to their marketing — so you stay ahead, not behind.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Replace the empty `.process` section with:**

```html
<section class="process" id="process">
  <div class="section-eyebrow fade-up">How it works</div>
  <h2 class="section-title fade-up" style="transition-delay: 0.07s">Simple process.<br>Real results.</h2>
  <div class="process-grid">
    <div class="process-step fade-up" style="transition-delay: 0s">
      <div class="step-num">01</div>
      <h3>Brief</h3>
      <p>Share your vision. We nail down scope, goals, and what success looks like for you.</p>
    </div>
    <div class="process-step fade-up" style="transition-delay: 0.07s">
      <div class="step-num">02</div>
      <h3>Strategy</h3>
      <p>We build a plan — which channels, which tactics, and in what order to move the needle.</p>
    </div>
    <div class="process-step fade-up" style="transition-delay: 0.14s">
      <div class="step-num">03</div>
      <h3>Execute</h3>
      <p>Fast, clean delivery. Sites, campaigns, content — on time without the back-and-forth.</p>
    </div>
    <div class="process-step fade-up" style="transition-delay: 0.21s">
      <div class="step-num">04</div>
      <h3>Grow</h3>
      <p>We track what's working, double down on results, and keep improving every month.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Open browser — verify brag bar, all 5 service cards, and 4 process steps render correctly**

- [ ] **Step 5: Check services on mobile — 1 column layout**

- [ ] **Step 6: Check process on mobile — 1 column, 2 columns at 768px**

- [ ] **Step 7: Commit**

```bash
cd "/Users/admin/Desktop/3D website"
git add index.html
git commit -m "feat: brag bar, services section, process section HTML"
```

---

## Task 6: Build Portfolio Teaser and Dark CTA HTML

**Files:**
- Modify: `index.html` — fill in portfolio teaser and dark CTA sections

- [ ] **Step 1: Replace the empty `.portfolio-teaser` section with:**

```html
<section class="portfolio-teaser" id="portfolio-teaser">
  <div class="portfolio-copy">
    <div class="section-eyebrow fade-up">Our work</div>
    <h2 class="fade-up" style="transition-delay: 0.07s">Results you<br>can see.</h2>
    <a href="portfolio.html" class="btn-fill fade-up" style="transition-delay: 0.14s">View Portfolio</a>
  </div>
  <div class="portfolio-thumb-grid fade-up" style="transition-delay: 0.1s">
    <div class="portfolio-thumb">
      <img src="assets/portfolio/spengali.png" alt="Spencer Lynch" loading="lazy">
    </div>
    <div class="portfolio-thumb">
      <img src="assets/portfolio/blueshed.png" alt="Blue Shed" loading="lazy">
    </div>
    <div class="portfolio-thumb">
      <img src="assets/portfolio/dfc.png" alt="DFC" loading="lazy">
    </div>
    <div class="portfolio-thumb">
      <img src="assets/portfolio/wabc.png" alt="WABC" loading="lazy">
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace the empty `.cta-dark` section with:**

```html
<section class="cta-dark">
  <div class="cta-blob"></div>
  <div class="cta-inner">
    <h2 class="fade-up">Ready to grow your<br>business online?</h2>
    <p class="fade-up" style="transition-delay: 0.1s">No fluff. Just a straight conversation about what's right for you.</p>
    <a href="https://calendar.app.google/mcwL3QfnGBo8TwRH8" target="_blank" rel="noopener" class="btn-white fade-up" style="transition-delay: 0.2s">Book a Free Call</a>
  </div>
</section>
```

- [ ] **Step 3: Open browser — scroll to bottom, verify portfolio thumbs load with hover zoom, dark CTA renders with indigo background and radial blob**

- [ ] **Step 4: Check that all 4 portfolio images load (no broken images)**

- [ ] **Step 5: Commit**

```bash
cd "/Users/admin/Desktop/3D website"
git add index.html
git commit -m "feat: portfolio teaser and dark CTA HTML"
```

---

## Task 7: Write the new main.js — Lenis, scroll reveals, mobile nav

**Files:**
- Modify: `js/main.js` (full rewrite)

- [ ] **Step 1: Replace js/main.js entirely with:**

```js
/* ============================================================
   maiaa.ai — Main Script
   ============================================================ */

(function () {
  'use strict';

  /* --- Lenis Smooth Scroll --- */
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    infinite: false,
    gestureOrientation: 'vertical',
    normalizeWheel: false,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* --- Anchor link smooth scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    });
  });

  /* --- Scroll reveal (IntersectionObserver) --- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

  /* --- Hero elements: trigger on load (no scroll needed) --- */
  const heroEls = document.querySelectorAll('.hero .fade-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 100);
  });

  /* --- Mobile nav toggle --- */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

})();
```

- [ ] **Step 2: Open browser and scroll the page — verify the Lenis buttery scroll is active (slight lag vs native)**

- [ ] **Step 3: Scroll down past the fold — verify service cards, process steps, and CTA fade up as they enter the viewport**

- [ ] **Step 4: Click a nav anchor link (e.g. "Services") — verify smooth scroll to section with 80px offset for fixed nav**

- [ ] **Step 5: Resize to mobile — tap hamburger, verify overlay opens; tap a link, verify overlay closes**

- [ ] **Step 6: Commit**

```bash
cd "/Users/admin/Desktop/3D website"
git add js/main.js
git commit -m "feat: Lenis scroll, IntersectionObserver reveals, mobile nav"
```

---

## Task 8: Update portfolio.html to match new design system

**Files:**
- Modify: `portfolio.html` — swap font imports, fix CSS variable references, remove dark-theme inline styles

The portfolio page uses inline `<style>` blocks that reference old CSS variables like `--bg-primary`, `--accent-primary`, `--text-secondary`, `--container-max`. These need to be updated to the new tokens. The page structure and grid stay the same.

- [ ] **Step 1: In portfolio.html, replace the Google Fonts link:**

Old (lines 11-12):
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

New:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

- [ ] **Step 2: In the portfolio.html inline `<style>` block, replace old variable references:**

| Old token | New token |
|-----------|-----------|
| `var(--bg-primary)` | `var(--dark)` |
| `var(--accent-primary)` | `var(--purple)` |
| `var(--text-secondary)` | `var(--muted)` |
| `var(--container-max)` | `var(--container)` |
| `var(--bg-secondary)` | `var(--bg)` |
| `var(--text-primary)` | `var(--dark)` |
| `var(--border-color)` | `var(--border)` |

Also update the `font-family` in any inline styles from `Space Grotesk` / `Plus Jakarta Sans` to `Inter`.

- [ ] **Step 3: Update the `<title>` tag:**

```html
<title>Portfolio — maiaa.ai</title>
```
(no change needed — already correct)

- [ ] **Step 4: Add Lenis CDN and updated script tag before `</body>`:**

```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script src="js/main.js"></script>
```

Remove any existing GSAP/ScrollTrigger script tags from `portfolio.html`.

- [ ] **Step 5: Open portfolio.html in browser — verify Inter font loads, cards render with new colour scheme, no broken variables**

- [ ] **Step 6: Commit**

```bash
cd "/Users/admin/Desktop/3D website"
git add portfolio.html
git commit -m "feat: update portfolio.html to new design system"
```

---

## Task 9: Final QA pass

**Files:** none — verification only

- [ ] **Step 1: Desktop QA checklist**

Open `index.html` in browser and verify each item:

- [ ] No dark theme flash on load
- [ ] Lavender background visible before first scroll
- [ ] Nav fixed, blurred, correct logo with purple `.ai`
- [ ] Hero headline renders at full size with purple accent
- [ ] "Book a Call" and "Start a Project" links open Google Calendar in new tab
- [ ] "See Our Work" links to `portfolio.html`
- [ ] Brag bar shows 3 client names
- [ ] All 5 service cards present with correct numbers and copy
- [ ] All 4 process steps present with correct copy
- [ ] 4 portfolio thumbnails load with no broken images
- [ ] "View Portfolio" links to `portfolio.html`
- [ ] Dark CTA section is deep indigo with radial blob
- [ ] "Book a Free Call" opens Google Calendar in new tab

- [ ] **Step 2: Scroll QA**

- [ ] Lenis smooth scroll active (slight lag vs native)
- [ ] Service cards fade up on scroll
- [ ] Process steps fade up on scroll
- [ ] Dark CTA fades up on scroll
- [ ] Hero elements visible immediately on load (no scroll needed)

- [ ] **Step 3: Mobile QA (resize to 375px)**

- [ ] Nav shows hamburger, hides links
- [ ] Hamburger opens full-screen dark overlay
- [ ] Overlay links close the menu
- [ ] Hero text scales down, no overflow
- [ ] Service cards stack to 1 column
- [ ] Process steps stack to 1 column
- [ ] Portfolio teaser stacks vertically
- [ ] Buttons full-width in hero

- [ ] **Step 4: portfolio.html QA**

- [ ] Inter font loads
- [ ] Cards render with new colour scheme (no dark background)
- [ ] Filter buttons use `--purple` for active state
- [ ] No console errors about missing CSS variables

- [ ] **Step 5: Commit final state**

```bash
cd "/Users/admin/Desktop/3D website"
git add -A
git commit -m "feat: maiaa.ai full overhaul complete — light theme, 5 services, Lenis scroll"
```
