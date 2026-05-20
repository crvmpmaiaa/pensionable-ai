# maiaa.ai Full Site Overhaul — Design Spec

**Date:** 2026-05-12  
**Status:** Approved for implementation

---

## Overview

maiaa.ai is pivoting from a single-service "website in 3 days" offer to a full-service digital marketing studio. The site requires a full visual and content overhaul to reflect this expanded positioning. The reference aesthetic is healthytogether.co — clean, editorial, lavender-tinted, massive Inter typography, Lenis smooth scroll.

Website-in-3-days is retained as one of five services, not the primary hero message.

---

## Positioning

**Tagline:** Profitable marketing for the AI generation.  
**Sub-copy:** No jargon. No fluff. Just smart ideas and sharp execution from a team that gets it.  
**Value prop:** More leads, increased visibility, and sustainable growth — from one team that handles everything.

---

## Services (final)

| # | Name | Copy |
|---|------|------|
| 01 | Website Design | Premium sites delivered in 3 days. Fixed price, no delays, pixel-perfect every time. |
| 02 | SEO Campaigns | Long-term organic growth that compounds. We build authority that outlasts algorithm changes. |
| 03 | Paid Advertising | Immediate visibility across Google and social with optimized return on ad spend. |
| 04 | Digital Strategy | A tailored roadmap that connects your channels and turns activity into measurable revenue. |
| 05 | AI Consulting | Navigate the AI shift. We help businesses understand and apply AI to their marketing — so you stay ahead, not behind. |

No pricing shown. Contact-to-engage model.

---

## Visual Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#F5F3FF` | Page background (lavender tint) |
| `--white` | `#FFFFFF` | Alternating sections |
| `--dark` | `#101722` | Body text, nav |
| `--purple` | `#6C47FF` | Accent, eyebrows, card numbers, CTAs |
| `--purple-deep` | `#2D1599` | Dark CTA section background |
| `--purple-light` | `#EDE9FF` | Card hover state, subtle fills |
| `--muted` | `#6B7280` | Body copy, descriptions |
| `--border` | `rgba(108,71,255,0.12)` | Subtle card borders |

### Typography
- **Font:** Inter (Google Fonts), weights 400/500/600/700/800/900
- **H1:** `clamp(64px, 8.5vw, 112px)`, weight 900, `letter-spacing: -0.05em`, `line-height: 1.0` (not 0.92 — avoids descender clipping on multi-line headings)
- **H2:** `clamp(44px, 6vw, 80px)`, weight 900, `letter-spacing: -0.045em`, `line-height: 1.0`
- **Section eyebrow:** `12px`, weight 700, `letter-spacing: 0.12em`, uppercase, color `--purple`
- **Body / hero sub:** `18px` desktop, `16px` mobile; weight 400–500; `line-height: 1.65`; color `--muted`
- **Card description:** `15px`, weight 400, `line-height: 1.7`, color `--muted`
- **Card h3:** `22px`, weight 800, `letter-spacing: -0.03em`

### Spacing
- Section padding: `160px 64px`
- Card padding: `44px`
- Card border-radius: `20px`
- Button border-radius: `12px`

### Scroll & Animation
- **Lenis smooth scroll:** `lerp: 0.1, wheelMultiplier: 0.7, infinite: false, gestureOrientation: 'vertical', normalizeWheel: false, smoothTouch: false` — exact settings from healthytogether.co
- **Scroll reveal:** Elements start at `opacity: 0; transform: translateY(2rem)` and transition to `opacity: 1; transform: translateY(0)` on IntersectionObserver trigger (`threshold: 0.12`)
- **Transition:** `0.75s ease` for opacity and transform
- **Stagger:** Sequential cards/steps use `transition-delay` in 70ms increments
- **Hero elements:** Triggered immediately on load via `setTimeout` stagger (no scroll needed)
- **Hover:** Cards lift `translateY(-4px)` with border-color shift to `--purple`; primary buttons add `box-shadow` on hover

---

## Page Structure

### `index.html` — Full Rewrite

#### 1. Nav
- Fixed, `backdrop-filter: blur(12px)`, lavender-tinted background
- Logo: `maiaa` + `.ai` in `--purple`
- Links: "Services" (→ `#services`), "Portfolio" (→ `portfolio.html`), "Process" (→ `#process`)
- CTA button: "Book a Call" → `https://calendar.app.google/mcwL3QfnGBo8TwRH8` (dark fill, `target="_blank"`)
- Mobile: hamburger → full-screen overlay, same links, overlay background `--dark`, links in white
- Mobile overlay close: clicking hamburger again or any link closes it

#### 2. Hero
- Full-viewport height
- Two decorative blobs (radial gradients, `--purple`, animated `pulse`)
- Eyebrow: "Digital Marketing Studio"
- H1: "Profitable marketing for the AI generation." — key word(s) in `--purple`
- Sub: "No jargon. No fluff. Just smart ideas and sharp execution from a team that gets it."
- Two CTAs: "Start a Project" (purple fill → calendar link) + "See Our Work" (ghost → portfolio.html)
- No canvas, no loader, no custom cursor

#### 3. Brag Bar
- Light strip below hero
- Label: "Trusted by"
- Client logo row: Miracle of Aloe, Spencer Lynch, Native Nature (+ placeholders for future clients)

#### 4. Services Section (`#services`)
- White background
- Eyebrow + H2: "Everything your brand needs online."
- 3-column grid (rows of 3 + 2, last row left-aligned)
- Cards: `--bg` fill, hover to `--purple-light` with border
- Card content (number / title / description):
  - **01 / Website Design** / "Premium sites delivered in 3 days. Fixed price, no delays, pixel-perfect every time."
  - **02 / SEO Campaigns** / "Long-term organic growth that compounds. We build authority that outlasts algorithm changes."
  - **03 / Paid Advertising** / "Immediate visibility across Google and social with optimized return on ad spend."
  - **04 / Digital Strategy** / "A tailored roadmap that connects your channels and turns activity into measurable revenue."
  - **05 / AI Consulting** / "Navigate the AI shift. We help businesses understand and apply AI to their marketing — so you stay ahead, not behind."

#### 5. Process Section (`#process`)
- Lavender background (`--bg`)
- Eyebrow + H2: "Simple process. Real results."
- 4-column step grid on white cards with large ghost step numbers
- Step content:
  - **01 Brief** — "Share your vision. We nail down scope, goals, and what success looks like for you."
  - **02 Strategy** — "We build a plan — which channels, which tactics, and in what order to move the needle."
  - **03 Execute** — "Fast, clean delivery. Sites, campaigns, content — on time without the back-and-forth."
  - **04 Grow** — "We track what's working, double down on results, and keep improving every month."

#### 6. Portfolio Teaser
- White background
- 2-column layout: left = copy + CTA, right = 2×2 thumbnail grid
- Eyebrow: "Our work"
- H2: "Results you can see."
- CTA: "View Portfolio" → `portfolio.html`
- Thumbnails: pull from existing `assets/portfolio/` images

#### 7. Dark CTA
- `--purple-deep` background with radial blob overlay
- H2: "Ready to grow your business online?"
- Sub: "No fluff. Just a straight conversation about what's right for you."
- Button: white fill, "Book a Free Call" → Google Calendar link

---

### `css/main.css` — Full Rewrite
- Remove all dark-theme rules, canvas styles, cursor styles, loader styles, tilt/magnetic styles
- Implement new design tokens as CSS custom properties on `:root`
- Max content width: `1280px` centered with `margin: 0 auto`
- Section padding: `160px 64px` desktop → `80px 24px` mobile
- Responsive breakpoints: mobile-first, key breakpoints at `768px` and `1024px`
- Nav mobile menu: hamburger → full-screen `--dark` overlay with white links
- Service grid: 3 columns desktop → 1 column mobile
- Process grid: 4 columns desktop → 2 columns at 768px → 1 column mobile
- Portfolio teaser: 2 columns desktop → stacked mobile

### `js/effects.js` — Delete
- File is removed entirely. No other file references it (it is loaded only via a `<script>` tag in `index.html` which will be rewritten).

### `js/main.js` — Significant Rewrite
- Remove: canvas animation, custom cursor, magnetic buttons, tilt cards, loader
- Add: Lenis initialization (CDN), IntersectionObserver reveal system
- Keep: mobile nav toggle, smooth scroll to anchor links, any portfolio filtering logic


### `portfolio.html` — Style Update
- Update color scheme to match new design system
- Keep existing portfolio grid and content
- No structural changes

---

## Assets

- Lenis: CDN `https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js` (official package, not the old studio-freight org which 404s)
- Inter: Google Fonts embed
- Portfolio thumbnails (2×2 grid, 4 images — all in `assets/portfolio/`): `spengali.png` (alt: "Spencer Lynch"), `blueshed.png` (alt: "Blue Shed"), `dfc.png` (alt: "DFC"), `wabc.png` (alt: "WABC") — `aspect-ratio: 4/3`, `object-fit: cover`
- Client logos in brag bar: text-only placeholders ("Miracle of Aloe", "Spencer Lynch", "Native Nature") — no SVGs required at this stage

---

## What's Removed

| Feature | Reason |
|---------|--------|
| Canvas hero animation | Replaced by CSS blob animations |
| Page loader | Not appropriate for new positioning |
| Custom cursor | Unnecessary complexity |
| Magnetic buttons | Unnecessary complexity |
| Tilt cards | Replaced by clean hover lift |
| `js/effects.js` logic | All replaced |
| Dark color theme | Full light theme overhaul |

---

## Success Criteria

- Site loads without the old dark theme flashing
- Lenis scroll matches healthytogether.co feel on desktop
- All 5 service cards visible and readable on mobile
- "Book a Call" / "Book a Free Call" links work (Google Calendar)
- Portfolio teaser links correctly to `portfolio.html`
- No broken images or layout shifts on load
