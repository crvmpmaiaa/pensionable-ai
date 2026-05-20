# pensionable.ai Site Build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete four-page pensionable.ai marketing website in vanilla HTML/CSS/JS, deployed to GitHub Pages.

**Architecture:** Single `css/main.css` with all design tokens, four HTML pages sharing a common nav/footer pattern, minimal `js/main.js` with Lenis smooth scroll and IntersectionObserver fade-ins. The Onyx audit trail HTML is embedded as an iframe on the demo page.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties), JavaScript ES6+, Lenis (CDN), Google Fonts (Inter), GitHub Pages

**Spec:** `docs/superpowers/specs/2026-05-20-pensionable-site-design.md`

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `css/main.css` | Rewrite | All design tokens, resets, components, page styles |
| `js/main.js` | Rewrite | Lenis smooth scroll + IntersectionObserver reveal |
| `index.html` | Rewrite | Home page — 8 sections |
| `how-it-works.html` | Create | 4-stage expanded process page |
| `demo.html` | Create | Onyx iframe embed page |
| `contact.html` | Create | Contact / book a call page |
| `demo/onyx-audit-trail.html` | Create (copy) | Onyx audit trail file for iframe |

Files to remove: `js/card-tilt.js`, `js/gradient-cta.js`, `js/gradient-wave.js`, `js/shader-process.js` (all maiaa-specific, not needed)

---

## Task 1: Clean up and set up the Onyx demo file

**Files:**
- Delete: `js/card-tilt.js`, `js/gradient-cta.js`, `js/gradient-wave.js`, `js/shader-process.js`
- Create: `demo/onyx-audit-trail.html` (copy from `assets/onyx-rebuild (3).html`)

- [ ] Delete the four maiaa-specific JS files:
```bash
rm /Users/admin/Desktop/pensionable/js/card-tilt.js \
   /Users/admin/Desktop/pensionable/js/gradient-cta.js \
   /Users/admin/Desktop/pensionable/js/gradient-wave.js \
   /Users/admin/Desktop/pensionable/js/shader-process.js
```

- [ ] Create the demo directory and copy the Onyx file:
```bash
mkdir -p /Users/admin/Desktop/pensionable/demo
cp "/Users/admin/Desktop/pensionable/assets/onyx-rebuild (3).html" \
   /Users/admin/Desktop/pensionable/demo/onyx-audit-trail.html
```

- [ ] Verify the file is there:
```bash
ls /Users/admin/Desktop/pensionable/demo/
```
Expected: `onyx-audit-trail.html`

- [ ] Commit:
```bash
cd /Users/admin/Desktop/pensionable && \
git add -A && \
git commit -m "chore: remove maiaa JS, add Onyx demo file"
```

---

## Task 2: Write the CSS foundation

**Files:**
- Rewrite: `css/main.css`

Write the complete `css/main.css` with:
1. Google Fonts import (Inter 400–900)
2. `:root` design tokens (all colours, radii, nav-height, container width)
3. CSS reset (`*, *::before, *::after { box-sizing: border-box }`, body margin 0)
4. Base body styles (font-family, font-size 16px, line-height 1.6, colour, antialiasing)
5. `.container` utility (max-width 1100px, centred, 40px horizontal padding, 20px on mobile)
6. `[id] { scroll-margin-top: 80px }` for sticky nav offset
7. `::selection` (purple background, white text)
8. All component styles:
   - `.nav` (sticky, frosted glass, 64px height, border-bottom rule)
   - `.wordmark` and `.wordmark .dot`
   - `.nav-links` and `.nav-link` (hover state purple), `.nav-link.active` (purple colour, used to highlight current page)
   - `.nav-cta` (outlined button)
   - `.btn-primary` (purple, hover opacity + translateY)
   - `.btn-outlined` (transparent, border, hover purple)
   - `.section` (padding 96px 0, mobile 56px 0)
   - `.section--dark` (background --dark, white text)
   - `.eyebrow` label style
   - `.card` (white, 18px radius, 32px padding, rule border)
   - `.card--dark` (dark background variant for problem pain cards)
   - `.stage-badge` (32px circle, purple bg, white text)
   - `.feature-pill` (white, rule border, 10px radius, 16px 20px padding)
   - `.trust-grid` (3+2 layout: `grid-template-columns: repeat(3, 1fr)` with last 2 centred)
   - `.callout-block` (white card, 4px left purple border)
   - `.bullet-list` (custom purple dash bullets)
   - `.reveal` animation classes and keyframes
   - Footer styles
   - `@media (max-width: 640px)` rules: 1-col grids, hidden nav links, reduced padding

- [ ] Write the complete `css/main.css` (see spec for all token values and component specs)

- [ ] Verify file saved and has no obvious syntax errors:
```bash
wc -l /Users/admin/Desktop/pensionable/css/main.css
```
Expected: 300+ lines

- [ ] Commit:
```bash
cd /Users/admin/Desktop/pensionable && \
git add css/main.css && \
git commit -m "feat: add complete CSS design system for pensionable.ai"
```

---

## Task 3: Write the JavaScript

**Files:**
- Rewrite: `js/main.js`

Write `js/main.js` with:
1. `prefers-reduced-motion` check at the top
2. Lenis init (CDN global `new Lenis()`) inside `if (!prefersReducedMotion)` block
3. Lenis RAF loop (`function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }; requestAnimationFrame(raf)`)
4. IntersectionObserver for `.reveal` elements — inside `if (!prefersReducedMotion)` block:
   - On intersection: add `.is-visible` class
   - Stagger: iterate siblings with `.reveal` class, set `style="--delay: ${i * 100}ms"` on each before observing
5. `DOMContentLoaded` wrapper around all initialisation

CSS for reveal (add to `main.css` if not already there):
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 400ms ease var(--delay, 0ms), transform 400ms ease var(--delay, 0ms);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] Write `js/main.js`

- [ ] Commit:
```bash
cd /Users/admin/Desktop/pensionable && \
git add js/main.js css/main.css && \
git commit -m "feat: add Lenis smooth scroll and reveal animation"
```

---

## Task 4: Build the shared nav and footer HTML snippet

Write the nav and footer HTML that will be copy-pasted identically into all four pages. Get this right once so all pages are consistent.

**Nav HTML:**
```html
<header class="nav">
  <div class="container nav__inner">
    <a href="index.html" class="wordmark">pensionable<span class="dot">.</span>ai</a>
    <nav class="nav-links">
      <a href="index.html" class="nav-link">Home</a>
      <a href="how-it-works.html" class="nav-link">How it works</a>
      <a href="demo.html" class="nav-link">Demo</a>
      <a href="contact.html" class="nav-link">Contact</a>
      <a href="contact.html" class="nav-cta">Book a call</a>
    </nav>
  </div>
</header>
```

**Footer HTML:**
```html
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <span class="wordmark">pensionable<span class="dot">.</span>ai</span>
      <p class="footer__tagline">Every assumption explicit. Every calculation testable.</p>
    </div>
    <nav class="footer__links">
      <a href="index.html">Home</a>
      <a href="how-it-works.html">How it works</a>
      <a href="demo.html">Demo</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="footer__contact">
      <a href="mailto:hello@pensionable.ai">hello@pensionable.ai</a>
    </div>
  </div>
  <div class="container footer__bottom">
    <p>© 2026 pensionable.ai · All rights reserved</p>
  </div>
</footer>
```

- [ ] Keep this snippet ready — it will be embedded in Tasks 5–8. No separate file needed; it is repeated inline in each HTML page.

---

## Task 5: Build index.html (home page)

**Files:**
- Rewrite: `index.html`

Full page structure — all 8 sections per spec. Each `<section>` uses `class="section"` plus a background modifier where needed. Each section's content elements get `class="reveal"`.

Page `<head>`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>pensionable.ai — Diorama Pension Calculation Engine</title>
  <meta name="description" content="Diorama turns DB scheme rules, factor tables, and worked examples into structured, auditable, scheme-specific calculation capability. Every assumption explicit. Every calculation testable.">
  <meta property="og:title" content="pensionable.ai">
  <meta property="og:description" content="The pension engine that starts from the real evidence pack.">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/main.css">
</head>
```

Sections to build (copy from spec for all copy):
1. Nav (from Task 4 snippet)
2. Hero — white, eyebrow, h1, subheadline, two CTAs
3. Problem — `section--dark`, eyebrow, h2, body para, 3 pain cards (`.card.card--dark`)
4. What Diorama does — lavender bg, eyebrow, h2, 55/45 two-col layout, 3 feature pills
5. How it works preview — white, eyebrow, h2, 4-col stage cards, "See full process →" link
6. Trust signals — `section--dark`, eyebrow, h2, `.trust-grid` 3+2 items
7. Who it's for — peach bg, eyebrow, h2, 50/50 two-col with bullet lists
8. CTA — mint bg, h2, body, primary button, secondary email text
9. Footer (from Task 4 snippet)

Scripts before `</body>`:
```html
<script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js"></script>
<script src="js/main.js"></script>
```

- [ ] Write the complete `index.html`

- [ ] Open in browser and visually check: nav is sticky, sections have correct backgrounds, fonts loaded, no broken layout
```bash
open /Users/admin/Desktop/pensionable/index.html
```

- [ ] Commit:
```bash
cd /Users/admin/Desktop/pensionable && \
git add index.html && \
git commit -m "feat: build home page"
```

---

## Task 6: Build how-it-works.html

**Files:**
- Create: `how-it-works.html`

Same `<head>` as index.html (update title to "How it works — pensionable.ai").

Sections:
1. Nav (identical snippet)
2. Intro strip — `section--dark`, eyebrow "The process", h1 headline, body
3. Stage 01 Ingest — lavender bg, badge + h2, 2 body paragraphs, callout block
4. Stage 02 Structure — mint bg, badge + h2, 2 body paragraphs, callout block
5. Stage 03 Validate — peach bg, badge + h2, 2 body paragraphs, callout block
6. Stage 04 Compute — blue bg, badge + h2, 2 body paragraphs, callout block
7. CTA — white, h2, two buttons (demo + contact)
8. Footer (identical snippet)

All copy from spec. Callout blocks use `.callout-block` component.

- [ ] Write the complete `how-it-works.html`

- [ ] Open in browser and visually check alternating pastel backgrounds, callout blocks render correctly
```bash
open /Users/admin/Desktop/pensionable/how-it-works.html
```

- [ ] Commit:
```bash
cd /Users/admin/Desktop/pensionable && \
git add how-it-works.html && \
git commit -m "feat: build how-it-works page"
```

---

## Task 7: Build demo.html

**Files:**
- Create: `demo.html`

Same `<head>` (title: "Demo — pensionable.ai").

Sections:
1. Nav
2. Intro strip — `section--dark`, eyebrow "Live audit trail", headline, body (203 values, 7 members copy)
3. Annotation cards — white, 3-col grid, each card with pastel background (lavender/mint/peach)
4. Iframe section — white, iframe wrapper div with rounded corners and shadow:
```html
<div class="demo-frame">
  <iframe
    src="demo/onyx-audit-trail.html"
    title="Onyx Audit Trail — pensionable.ai Diorama"
    class="demo-iframe">
  </iframe>
</div>
```
CSS for `.demo-frame`: `border-radius: 20px; overflow: hidden; border: 1px solid var(--rule); box-shadow: 0 4px 32px rgba(26,26,46,0.10); height: 80vh; min-height: 600px;`
CSS for `.demo-iframe`: `width: 100%; height: 100%; border: none; display: block;`
5. Bottom CTA — lavender bg, headline, primary button, secondary email
6. Footer

- [ ] Write the complete `demo.html`

- [ ] Open in browser, verify iframe loads the Onyx audit trail:
```bash
open /Users/admin/Desktop/pensionable/demo.html
```

- [ ] Check: iframe renders, annotation cards show correct pastel fills, CTA section correct

- [ ] Commit:
```bash
cd /Users/admin/Desktop/pensionable && \
git add demo.html && \
git commit -m "feat: build demo page with Onyx iframe embed"
```

---

## Task 8: Build contact.html

**Files:**
- Create: `contact.html`

Same `<head>` (title: "Contact — pensionable.ai").

Sections:
1. Nav
2. Intro strip — `section--dark`, headline "Let's talk about your scheme.", body copy
3. CTA block — lavender bg, primary button (href="#" placeholder), email link
4. Footer

- [ ] Write the complete `contact.html`

- [ ] Open in browser and check:
```bash
open /Users/admin/Desktop/pensionable/contact.html
```

- [ ] Commit:
```bash
cd /Users/admin/Desktop/pensionable && \
git add contact.html && \
git commit -m "feat: build contact page"
```

---

## Task 9: Cross-page polish pass

- [ ] Open all four pages in browser tabs. Check:
  - Nav active link styling (current page link highlights in purple)
  - All internal links work (nav, CTAs, footer)
  - Fonts loaded correctly on all pages
  - No white text on pastel backgrounds (only on `--dark`)
  - Reveal animations trigger on scroll
  - Mobile: resize browser to 375px width — nav links hidden, layout collapses to 1-col, text readable
  - Demo iframe fills its container
  - No "pensionable.ai" with wrong casing anywhere
  - No em dashes in any copy

- [ ] Add active nav state: add a small inline `<script>` to each page that adds `class="active"` to the current page's nav link based on `window.location.pathname` — or simply hardcode `class="nav-link active"` on the correct link in each page's nav HTML.

- [ ] Commit any polish fixes:
```bash
cd /Users/admin/Desktop/pensionable && \
git add -A && \
git commit -m "fix: cross-page polish and nav active states"
```

---

## Task 10: Configure GitHub Pages and push

- [ ] Push all commits to remote:
```bash
cd /Users/admin/Desktop/pensionable && git push
```

- [ ] Enable GitHub Pages in the repo settings:
  - Go to https://github.com/crvmpmaiaa/pensionable-ai/settings/pages
  - Source: Deploy from branch
  - Branch: `main`, folder: `/ (root)`
  - Save

- [ ] Note the GitHub Pages URL (will be `https://crvmpmaiaa.github.io/pensionable-ai/`) and verify the site loads within ~2 minutes of enabling Pages

- [ ] Final check on the live URL: all pages reachable, iframe loads, fonts render, no 404s on assets

---

## Done

Site is live on GitHub Pages. All four pages built and deployed. The Onyx demo iframe is embedded. Copy, brand, and design system all match the spec.
