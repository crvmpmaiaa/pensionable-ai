# pensionable.ai Website — Design Spec
**Date:** 2026-05-20  
**Status:** Approved for implementation

---

## Overview

A four-page static marketing website for pensionable.ai and its flagship product Diorama — a pension calculation engine for complex DB schemes. Built in vanilla HTML/CSS/JS. Deployed to GitHub Pages from the `main` branch of `github.com/crvmpmaiaa/pensionable-ai`.

Primary audience: actuaries and senior pension professionals. Tone: confident, direct, rigorous. No hype, no superlatives, no em dashes.

---

## Stack

- **HTML**: Four plain HTML files — `index.html`, `how-it-works.html`, `demo.html`, `contact.html`
- **CSS**: Single `css/main.css` — all design tokens in `:root`, all styles in one file
- **JS**: `js/main.js` — Lenis smooth scroll + IntersectionObserver fade-in only. No WebGL, no shaders, no canvas
- **Font**: Inter via Google Fonts (weights 400–900)
- **Deployment**: GitHub Pages, served from `main` branch root

No build step. No framework. No dependencies beyond Lenis (CDN).

---

## Design System

### Colours

```css
:root {
  --white:    #ffffff;
  --ink:      #1a1a2e;
  --ink-sub:  rgba(26,26,46,0.65);
  --ink-dim:  rgba(26,26,46,0.42);
  --rule:     rgba(26,26,46,0.09);
  --purple:   #6C47FF;
  --dark:     #1a1a2e;
  --lavender: #e0dbff;
  --mint:     #c8f5e0;
  --yellow:   #fef9c3;
  --pink:     #ffd6ea;
  --peach:    #ffd8b0;
  --blue:     #d0eaff;
}
```

Rules:
- Default background: `--white`
- Section backgrounds rotate through pastels — never the same twice in a row
- `--purple` used only on: primary CTA button, nav hover/active state, wordmark dot, eyebrow labels
- `--dark` used for one high-impact panel per page (problem section on home, intro strip on demo)
- White text only on `--dark` backgrounds. All other backgrounds use `--ink`

### Typography

Single family: Inter

| Role | Size | Weight | Letter-spacing |
|---|---|---|---|
| Hero headline | clamp(44px, 6vw, 80px) | 900 | -0.055em |
| Section headline | 36–44px | 900 | -0.045em |
| Card title | 20–24px | 800 | -0.03em |
| Body | 16–17px | 400 | -0.01em |
| Caption / label | 11–12px | 700 | 0.15em + uppercase |
| Nav links | 13px | 600 | -0.01em |

### Spacing

Container: `max-width: 1100px; margin: 0 auto; padding: 0 40px`  
Mobile: `padding: 0 20px`  
Section padding: `96px 0` desktop, `56px 0` mobile

### Components

**Nav**: sticky, `height: 64px`, frosted glass (`rgba(255,255,255,0.94)` + `backdrop-filter: blur(12px)`), 1px bottom rule. Left: wordmark. Right: page links + outlined "Book a call" CTA. Mobile: wordmark + "Book a call" only (no hamburger).

**Wordmark**: `pensionable<span class="dot">.</span>ai` — Inter 900, 19px, -0.04em, ink colour, purple dot.

**Primary button**: `--purple` background, white text, 14px 28px padding, 10px radius, 700 weight. Hover: `opacity: 0.88; transform: translateY(-1px)`.

**Outlined button**: transparent background, `1.5px solid rgba(26,26,46,0.20)`, ink text. Hover: border and text turn purple.

**Cards**: white background, 18px radius, 32px padding, `1px solid var(--rule)`.

**Eyebrow label**: 11px, 700, 0.18em letter-spacing, uppercase, purple, optional 20px decorative line before.

**Stage numbers**: 01–04, purple pill badge, Inter 700.

---

## Motion

- **Smooth scroll**: Lenis, default settings
- **Fade-in on scroll**: IntersectionObserver on elements with class `.reveal`. Entry: `opacity: 0; transform: translateY(24px)`. Animated to natural position over 400ms ease. Staggered siblings: 100ms delay increments, max 4 in a group
- **`prefers-reduced-motion`**: all animation disabled, elements rendered at final state immediately
- No scroll-triggered parallax, no canvas, no WebGL

---

## Pages

### Home (`index.html`)

Eight sections in order:

1. **Nav** — sticky, shared across all pages
2. **Hero** — white background. Eyebrow: "Pension calculation. Rebuilt." Headline: "Every assumption explicit. Every calculation testable." Subheadline (60ch max): Diorama turns scheme rules, factor tables, spreadsheets, and worked examples into structured, deterministic, auditable calculation capability. The actuary stays in control. Two CTAs: purple "Book a conversation" (links to contact.html) + text link "See how it works →" (links to how-it-works.html)
3. **Problem** — dark panel. Eyebrow: "The old world." Headline: "The hard part does not go away." Body paragraph. Three pain cards (dark card, pastel accent label): Rules that do not fit the table shape / Exceptions that cannot be ignored / Bespoke patches that accumulate
4. **What Diorama does** — lavender background. Eyebrow: "A different premise." Headline: "The engine adapts to the scheme. Not the other way around." Left body copy. Right: three feature pills (Scheme-specific by construction / Auditable from day one / In your code conventions)
5. **How it works** — white background. Eyebrow: "The process." Headline: "Four stages from evidence pack to auditable output." Horizontal stage cards on desktop, vertical stack mobile: 01 Ingest / 02 Structure / 03 Validate / 04 Compute and audit
6. **Trust signals** — dark panel. Eyebrow: "Built to be defensible." Headline: "Five structural answers to the question every serious buyer asks." Grid of 5 trust items: actuary owns deliverable / no AI in runtime / every output testable / witness-anchored validation / personal data never touches AI
7. **Who it's for** — peach background. Eyebrow: "Who this is built for." Headline: "For actuaries and the teams who build calculation systems." Two-column split: actuaries left, developers right. Benefit bullets under each
8. **CTA + Footer** — lavender CTA block: "Ready to see what this looks like on your scheme?" Purple button. Footer below: white background, wordmark + tagline left, nav links centre, email right, copyright line

---

### How it works (`how-it-works.html`)

Same nav and footer. Single-column page with expanded detail on each of the four stages. Each stage gets: number badge, title, 2–3 paragraph body, and a callout block highlighting the key proof point for that stage. High level only — no internal architecture detail. Pastel background alternates per stage section (lavender, mint, peach, blue).

---

### Demo (`demo.html`)

1. **Dark intro strip** — eyebrow: "Live audit trail." Headline: "A real DB scheme. Every figure traceable to its rule." Tight body copy written for actuaries (no explanation of what a tranche is). States: 203 deferred-pension values validated within £0.005. 7 test members.
2. **Annotation cards** (3 cards, white background row) — lavender: "Click any figure" / mint: "Pass / fail at a glance" / peach: "Oracle comparison"
3. **Iframe embed** — `<iframe src="demo/onyx-audit-trail.html">`. Height: `80vh`, min-height `600px`. Rounded corners (20px), 1px rule border, subtle box shadow. The Onyx HTML file is copied from `assets/onyx-rebuild (3).html` to `demo/onyx-audit-trail.html`
4. **Bottom CTA** — "Want to see this on your scheme?" Purple button "Book a conversation" linking to contact.html. Secondary: "Or email hello@pensionable.ai"

---

### Contact (`contact.html`)

Simple single-section page. Dark intro strip: headline "Let's talk about your scheme." Sub: "Every engagement starts with a conversation — the scheme, the evidence pack, what the team needs. No generic demos." Two CTAs: purple button (Calendly placeholder href) "Book a conversation" + plain text "hello@pensionable.ai" email link. Same nav and footer.

---

## File Structure

```
pensionable/
├── index.html
├── how-it-works.html
├── demo.html
├── contact.html
├── css/
│   └── main.css
├── js/
│   └── main.js
├── demo/
│   └── onyx-audit-trail.html   (copied from assets/)
├── assets/
│   └── (brand assets as added)
├── skills/                      (reference only, not served)
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-20-pensionable-site-design.md
```

---

## Copy Rules

- No em dashes. Use a full stop, new sentence, or colon
- No double dashes
- "Diorama" always capitalised
- "pensionable.ai" always lowercase with the dot
- No superlatives: revolutionary, game-changing, seamless, cutting-edge
- Do not name specific AI models
- Do not reference internal architecture: dual-model pattern, six-phase anonymisation, specific Python packages
- Safe framing for AI: "Frontier AI models accelerate the structuring of messy scheme material into candidates that humans review"
- Numbers under ten: spell out. Ten and above: numerals
- Lead with rigour, not speed. "Actuary owns the deliverable" before "weeks not months"

---

## Deployment

GitHub Pages served from `main` branch root. No build step required. Push HTML/CSS/JS and it is live. Custom domain (pensionable.ai) to be configured in repo settings when ready.
