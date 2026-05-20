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

## Global Rules

- The nav and footer are identical on every page. Do not vary them per page.
- The footer "Home" link in the nav column links to `index.html` and is labelled "Home" (not "Product") to avoid ambiguity with a missing product page.
- All pages include shared meta tags (description, OG title, OG description, OG type). No `og:image` in v1. No favicon in v1.
- Outlined buttons appear in the nav ("Book a call") only in v1. No other outlined button placements.
- The iframe placeholder card uses the standard card component (white background, `--rule` border, 18px radius, 32px padding, centred text).
- `--delay` stagger values are applied as `style="--delay: Xms"` inline attributes set by JS on sibling `.reveal` elements at page load.

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
- `--dark` used for one high-impact panel per page
- White text only on `--dark` backgrounds. All other backgrounds use `--ink`

### Typography

Single family: Inter

| Role | Size | Weight | Letter-spacing |
|---|---|---|---|
| Hero headline | clamp(44px, 6vw, 80px) | 900 | -0.055em |
| Section headline | clamp(32px, 4vw, 44px) | 900 | -0.045em |
| Card title | 20px | 800 | -0.03em |
| Body | 16px | 400 | -0.01em |
| Caption / label | 11px | 700 | 0.15em + uppercase |
| Nav links | 13px | 600 | -0.01em |

### Spacing

Container: `max-width: 1100px; margin: 0 auto; padding: 0 40px`  
Mobile: `padding: 0 20px`  
Section padding: `96px 0` desktop, `56px 0` mobile

### Components

**Nav**: sticky, `height: 64px`, frosted glass (`rgba(255,255,255,0.94)` + `backdrop-filter: blur(12px)`), 1px bottom rule. Left: wordmark. Right: page links + outlined "Book a call" CTA. Mobile: wordmark + "Book a call" button only — page links `display: none` at 640px. No hamburger.

**Wordmark**: `pensionable<span class="dot">.</span>ai` — Inter 900, 19px, -0.04em, `--ink` colour, `--purple` dot.

**Primary button**: `--purple` background, white text, 14px 28px padding, 10px radius, 700 weight. Hover: `opacity: 0.88; transform: translateY(-1px)`.

**Outlined button**: transparent background, `1.5px solid rgba(26,26,46,0.20)`, `--ink` text. Hover: border-color and text color both become `--purple`.

**Cards**: white background, 18px radius, 32px padding, `1px solid var(--rule)`.

**Eyebrow label**: 11px, 700, 0.15em letter-spacing, uppercase, `--purple`. Optional `::before` pseudo-element: 20px wide, 1.5px tall, `--purple`, displayed inline-block with 10px gap before the text.

**Feature pills**: block-level elements in a flex column, white background, `1px solid var(--rule)`, 10px radius, 16px 20px padding. Bold label (Inter 700, 15px) followed by body text (Inter 400, 14px, `--ink-sub`) on the same line separated by " — ".

**Stage number badge**: 32px circle, `--purple` background, white text, Inter 700, 14px. Sits above the stage title with 16px gap.

**Trust signal items**: bold label (Inter 700, 16px, white on dark) + one-line body (Inter 400, 14px, `rgba(255,255,255,0.70)`). No icon.

**Bullet lists ("Who it's for" section)**: `<ul>` with `list-style: none`, each `<li>` preceded by a `::before` pseudo-element containing "–" in `--purple`, 16px gap between marker and text.

**Callout block (How it works page)**: white card, `1px solid var(--rule)`, 16px radius, 24px padding, 4px left border in `--purple`. Contains one sentence of proof-point copy in Inter 600, 15px.

---

## Motion

- **Smooth scroll**: Lenis via CDN, default settings
- **Fade-in on scroll**: IntersectionObserver on all `.reveal` elements. Entry: `opacity: 0; transform: translateY(24px)`. Animated to `opacity: 1; transform: translateY(0)` over 400ms ease. Stagger: JS sets `style="--delay: Xms"` on sibling `.reveal` elements (0ms, 100ms, 200ms, 300ms max). CSS: `transition: opacity 400ms ease var(--delay, 0ms), transform 400ms ease var(--delay, 0ms)`
- **`prefers-reduced-motion`**: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true, skip Lenis init (native scroll only) and skip adding `.reveal` class — elements render at final state
- No parallax, no canvas, no WebGL

---

## Pages

### Home (`index.html`)

| # | Section | Background |
|---|---|---|
| 1 | Nav | white (sticky) |
| 2 | Hero | white |
| 3 | Problem | `--dark` |
| 4 | What Diorama does | `--lavender` |
| 5 | How it works (preview) | white |
| 6 | Trust signals | `--dark` |
| 7 | Who it's for | `--peach` |
| 8 | CTA | `--mint` |
| — | Footer | white |

**Section 2 — Hero**  
Eyebrow: "Pension calculation. Rebuilt."  
Headline: "Every assumption explicit. Every calculation testable."  
Subheadline (60ch max): "Diorama turns scheme rules, factor tables, spreadsheets, and worked examples into structured, deterministic, auditable calculation capability. The actuary stays in control. The audit trail is built in from the start."  
CTAs: purple "Book a conversation" (links to `contact.html`) + text link "See how it works →" (links to `how-it-works.html`)

**Section 3 — Problem**  
Eyebrow: "The old world"  
Headline: "The hard part does not go away."  
Body: "Even when a platform has reusable functions, standard factor logic, and configurable tables, the hard part does not go away. The team still has to interpret messy scheme rules, reconcile conflicting source material, squeeze unusual benefit structures into someone else's abstraction, bolt on exceptions, and prove the result really matches the scheme's intended behaviour. The scheme still has to live by the system's rules."  
Three pain cards (dark card, mint label):  
- "Rules that do not fit the table shape" — The platform expected one thing. The scheme did something else. The team spends months finding workarounds.  
- "Exceptions that cannot be ignored" — Every complex scheme has them. Most platforms leave them in expensive corners. They still have to be answered.  
- "Bespoke patches that accumulate" — The final implementation becomes a pile of overrides built around someone else's abstraction. Hard to maintain. Harder to audit.

**Section 4 — What Diorama does**  
Eyebrow: "A different premise"  
Headline: "The engine adapts to the scheme. Not the other way around."  
Two-column layout: left 55%, right 45%.  
Left body: "Diorama starts from the actual evidence pack — deeds, rules, amendments, spreadsheets, factor tables, worked examples, prior calculations, admin notes. The source material is the raw input. The target is the exact validated logic the scheme needs."  
Right: three feature pills stacked vertically:  
- "Scheme-specific by construction — not configured from generic functions, built from the scheme's actual rules"  
- "Auditable from day one — every formula traceable to the specification, every output testable against worked examples"  
- "In your code conventions — artefacts delivered in Python, Excel, or whatever the team already uses"

**Section 5 — How it works (preview)**  
Eyebrow: "The process"  
Headline: "Four stages from evidence pack to auditable output."  
Four stage cards in a horizontal row on desktop (2-col grid on tablet, 1-col on mobile). Each card: badge + title + 2-line descriptor.  
- 01 Ingest — "The evidence pack as it actually exists. Rules, amendments, spreadsheets, examples. No pretence that the documents are clean."  
- 02 Structure — "Frontier AI models produce structured candidates: rule areas, factor references, methodology choices, provenance back to source. Weeks of manual interpretation cut to hours."  
- 03 Validate — "Candidates go through discipline checks. Humans review and approve the basis before anything is implemented."  
- 04 Compute and audit — "Deterministic runtime. Replay against worked examples with documented tolerances. Auditable outputs in the consumer's own conventions."  
Below cards: text link "See the full process →" linking to `how-it-works.html`

**Section 6 — Trust signals**  
Eyebrow: "Built to be defensible"  
Headline: "Five structural answers to the question every serious buyer asks."  
Grid layout: 3 items top row, 2 items bottom row, centred. Each item: bold label + one-line body, white text on dark.  
1. "The actuary owns the deliverable" — The human directs the engagement, makes the judgement calls, and signs off the answer. Accountability never moves.  
2. "No AI in the runtime path" — The runtime is deterministic. The same inputs produce the same outputs every time. AI assists in building the calculator, not in running it.  
3. "Every output testable" — Formulas are mechanical translations of rule text. A regression harness asserts outputs match worked examples on every rebuild.  
4. "Witness-anchored validation" — Candidates are verified against worked examples with documented tolerances before entering the compute path.  
5. "Personal data never touches the AI" — Anonymisation is built into the pipeline before any AI access. The structuring step sees only structure, not member data.

**Section 7 — Who it's for**  
Eyebrow: "Who this is built for"  
Headline: "For actuaries and the teams who build calculation systems."  
Two equal columns (50/50, collapse to 1-col on mobile).  
Left — "For actuaries and pension professionals": "Finally, a system that is not asking you to flatten the scheme into a generic box and hope the exceptions survive." Bullets: fewer hidden assumptions / clearer challenge points in the rule basis / better use of worked examples in validation / faster route from rule understanding to tested outputs  
Right — "For developers at consultancies and admin houses": "Stop spending months building bespoke infrastructure around every awkward scheme." Bullets: less time on interpretation plumbing / more time on genuine domain capability / new implementations in your existing code conventions / regression harness built in from the start

**Section 8 — CTA**  
Headline: "Ready to see what this looks like on your scheme?"  
Body: "Every engagement starts with a conversation about the scheme, the evidence pack, and what the team needs. No generic demos. No off-the-shelf pitch."  
Purple button: "Book a conversation" → `contact.html`  
Secondary text: "Or email us at hello@pensionable.ai"

**Footer (shared — identical on all pages)**  
White background, `1px solid var(--rule)` top border. Three columns (collapse to 1-col on mobile), `padding: 40px 0`:  
- Left: wordmark + tagline "Every assumption explicit. Every calculation testable." (`--ink-dim`, 13px, below wordmark)  
- Centre: nav links — Home (`index.html`), How it works (`how-it-works.html`), Demo (`demo.html`), Contact (`contact.html`) — `--ink-sub`, 13px  
- Right: `hello@pensionable.ai` email link (`--ink-sub`, 13px)  
- Full-width bottom row: "© 2026 pensionable.ai · All rights reserved" — `--ink-dim`, 12px, centred

---

### How it works (`how-it-works.html`)

| # | Section | Background |
|---|---|---|
| 1 | Nav | white (sticky) |
| 2 | Intro | `--dark` |
| 3 | Stage 01 — Ingest | `--lavender` |
| 4 | Stage 02 — Structure | `--mint` |
| 5 | Stage 03 — Validate | `--peach` |
| 6 | Stage 04 — Compute | `--blue` |
| 7 | CTA | white |
| — | Footer | white |

**Section 2 — Intro strip**  
Eyebrow: "The process"  
Headline: "Four stages from evidence pack to auditable output."  
Body: "Every Diorama engagement follows the same four-stage discipline. Each stage has a clear input, a clear output, and a clear human review point. High-level only — no architecture detail on this page."

**Sections 3–6 — Stage sections**  
Each contains: stage badge + title, 2 paragraphs of body copy, one callout block.

Stage 01 — Ingest  
Body: "Diorama starts from the evidence pack as it actually exists. Deeds as amended. Spreadsheets from the last reconciliation. Admin notes that explain the gaps. Worked examples from a previous implementation. Prior calculations where they can be found. There is no clean starting point requirement. The messiness is the input. The first stage is about gathering everything that describes how the scheme should work, without filtering or pretending the source material is tidy."  
Callout: "No pretence that the documents are clean. Diorama starts from real evidence packs — the deeds as amended, the spreadsheets as they are, the reconciliation notes from a decade ago."

Stage 02 — Structure  
Body: "Frontier AI models read the evidence pack and produce structured candidates: typed rule objects, factor table extracts, methodology choices, provenance back to source. The candidates are not the final answer. They are the raw material for human review. The acceleration here is in the front end of the process — turning weeks of manual interpretation into hours of structured output that humans can actually interrogate, challenge, and approve. Nothing moves forward without sign-off."  
Callout: "The time from messy evidence pack to structured candidates ready for human review drops from weeks to hours."

Stage 03 — Validate  
Body: "Candidates go through the engine's discipline layer. Required fields must be present. Date logic must be coherent. Factor coverage must be complete. Methodology choices must be explicit. Contradictions between source documents surface as open items, not silent assumptions. The actuary reviews the structured basis and approves it before anything enters the compute path. This is the point where professional judgement operates. The engine surfaces the choices. The actuary makes them."  
Callout: "The actuary reviews and approves the basis. Nothing enters the compute path without human sign-off."

Stage 04 — Compute and audit  
Body: "The approved basis enters a deterministic runtime. The same inputs produce the same outputs every time. No AI in the money path. Outputs replay against worked examples with documented tolerances — a regression harness that runs automatically on every rebuild. Test failure surfaces before anything ships. Calculation artefacts are delivered in the consumer's own code conventions: Python modules, Excel proformas, regression harnesses, calculation packs, audit trails. No platform migration required."  
Callout: "The same inputs produce the same outputs, every time. Deterministic runtime. No AI in the money path."

**Section 7 — CTA**  
Headline: "Ready to see the audit trail?"  
Purple button: "View the demo →" → `demo.html`  
Secondary: "Or book a conversation" → `contact.html`

---

### Demo (`demo.html`)

| # | Section | Background |
|---|---|---|
| 1 | Nav | white (sticky) |
| 2 | Intro strip | `--dark` |
| 3 | Annotation cards | white |
| 4 | Iframe embed | white |
| 5 | Bottom CTA | `--lavender` |
| — | Footer | white |

**Section 2 — Intro strip**  
Eyebrow: "Live audit trail"  
Headline: "A real DB scheme. Every figure traceable to its rule."  
Body: "What you are looking at is the complete audit trail from a live Diorama implementation. Every preserved-retirement and revaluation figure is clickable. Every click opens the full citation chain: the scheme rule, the statute, the workbook cell, and the Python code that produced it. 203 deferred-pension values validated against the workbook oracle within £0.005. Seven test members. Every excess shape the scheme operates."

**Section 3 — Annotation cards**  
Three cards in a 3-column row (collapse to 1-col on mobile):  
- Lavender background: label "Click any figure" — "Every monetary value opens a drawer showing the authority chain: deed clause, statute reference, workbook cell, and tolerance-checked oracle match."  
- Mint background: label "Pass / fail at a glance" — "Tranche-level results are colour-coded. Green rows passed against the workbook oracle. Each fail carries a reason string pointing at the specific open item."  
- Peach background: label "Oracle comparison" — "Each member shows engine output against the cached workbook value with the exact difference. £0.005 tolerance. Every deviation classified and explained."

**Section 4 — Iframe embed**  
`<iframe src="demo/onyx-audit-trail.html" title="Onyx Audit Trail">`. The Onyx file (`assets/onyx-rebuild (3).html`) is copied to `demo/onyx-audit-trail.html` as part of setup. `height: 80vh; min-height: 600px; width: 100%; border: none`. Wrapper: `border-radius: 20px; overflow: hidden; border: 1px solid var(--rule); box-shadow: 0 4px 32px rgba(26,26,46,0.10)`.  
If file missing: render placeholder card (standard card component, centred text): "Place onyx-audit-trail.html in /demo/ to activate the live demo."

**Section 5 — Bottom CTA**  
Headline: "Want to see this on your scheme?"  
Body: "Every engagement starts from your actual evidence pack. We do not need a clean starting point."  
Purple button: "Book a conversation" → `contact.html`  
Secondary: "Or email hello@pensionable.ai"

---

### Contact (`contact.html`)

| # | Section | Background |
|---|---|---|
| 1 | Nav | white (sticky) |
| 2 | Intro strip | `--dark` |
| 3 | CTA block | `--lavender` |
| — | Footer | white |

**Section 2 — Intro strip**  
Headline: "Let's talk about your scheme."  
Body: "Every engagement starts with a conversation about the scheme, the evidence pack, and what the team needs. No generic demos. No off-the-shelf pitch."

**Section 3 — CTA block**  
Purple button: "Book a conversation" — `href="#"` placeholder (Calendly URL to be added before launch)  
Secondary: email link `<a href="mailto:hello@pensionable.ai">hello@pensionable.ai</a>`

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
│   └── onyx-audit-trail.html   (copied from assets/onyx-rebuild (3).html)
├── assets/
│   └── (brand assets as added)
├── skills/                      (reference only, not served)
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-20-pensionable-site-design.md
```

---

## Copy Rules (applies to all copy on the site)

- No em dashes. Use a full stop, a new sentence, or a colon
- No double dashes
- "Diorama" always capitalised
- "pensionable.ai" always lowercase with the dot
- Nav CTA: "Book a call". All other CTAs: "Book a conversation"
- No superlatives: revolutionary, game-changing, seamless, cutting-edge
- Do not name specific AI models
- Do not reference internal architecture: dual-model pattern, six-phase anonymisation, specific Python packages
- Safe AI framing: "Frontier AI models accelerate the structuring of messy scheme material into candidates that humans review"
- Numbers in prose: spell out under ten, numerals for ten and above. Statistics and data points always use numerals regardless
- Lead with rigour. "Actuary owns the deliverable" before "weeks not months"

---

## Deployment

GitHub Pages served from `main` branch root. No build step. Push and it is live. Custom domain (pensionable.ai) configured in repo settings when ready.
