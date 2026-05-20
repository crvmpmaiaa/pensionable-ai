# Brand Reference — pensionable.ai / Diorama

## Identity

- **Company name**: pensionable.ai (always lowercase, with the dot)
- **Product name**: Diorama (always capitalised, never all-caps)
- **Tagline options** (choose context-appropriate):
  - "Every assumption explicit. Every calculation testable."
  - "The pension engine that starts from the real evidence pack."
  - "Deterministic. Auditable. Built around your scheme."

---

## Colour Palette

```css
/* Base */
--white:    #ffffff;
--ink:      #1a1a2e;       /* ALL body text */
--ink-sub:  rgba(26,26,46,0.65);
--ink-dim:  rgba(26,26,46,0.42);
--rule:     rgba(26,26,46,0.09);

/* Single accent — used sparingly */
--purple:   #6C47FF;

/* Pastel fills — section backgrounds, cards, badges */
--lavender: #e0dbff;   /* purple-adjacent — Diorama/engine sections */
--mint:     #c8f5e0;   /* green — trust/validation/pass sections */
--yellow:   #fef9c3;   /* warning/callout/constraint sections */
--pink:     #ffd6ea;   /* highlight/feature sections */
--peach:    #ffd8b0;   /* warm CTA sections */
--blue:     #d0eaff;   /* process/flow sections */

/* Dark panel — one hero or statement block per page */
--dark:     #1a1a2e;
```

**Rules:**
- Default background: `#ffffff`
- Section backgrounds rotate through pastels — never the same pastel twice in a row
- Purple (`#6C47FF`) used only on: primary CTA button, nav hover, key accent text, wordmark dot
- `--dark` (`#1a1a2e`) used for one high-impact block per page (typically the problem or hero statement)
- **White text only on `--dark` backgrounds. Everywhere else: `--ink`.**

---

## Typography

Single font family throughout: **Inter** (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

```css
font-family: "Inter", system-ui, sans-serif;
-webkit-font-smoothing: antialiased;
```

### Type Scale

| Role | Size | Weight | Letter-spacing |
|---|---|---|---|
| Hero headline | clamp(44px, 6vw, 80px) | 900 | -0.055em |
| Section headline | 36-44px | 900 | -0.045em |
| Card title | 20-24px | 800 | -0.03em |
| Body | 16-17px | 400 | -0.01em |
| Body strong | 16-17px | 600 | -0.01em |
| Caption / label | 11-12px | 700 | 0.12-0.18em + uppercase |
| Nav links | 13px | 600 | -0.01em |

---

## Spacing

| Token | Value | Use |
|---|---|---|
| xs | 8px | tight gaps |
| sm | 16px | component padding |
| md | 24px | card padding |
| lg | 40px | section padding top/bottom |
| xl | 72px | section top/bottom on desktop |
| 2xl | 120px | hero top/bottom |

Section padding: `padding: 80px 0` on desktop, `padding: 48px 0` on mobile.

---

## Components

### Navigation
```css
/* Sticky, frosted glass */
position: sticky; top: 0; z-index: 100;
background: rgba(255,255,255,0.94);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--rule);
height: 64px;
```
- Max-width container: 1100px, centred
- Left: `pensionable.` wordmark (Inter 900, 19px, -0.04em) + purple dot
- Right: nav links + one outlined CTA button ("Book a call")

### Buttons
```css
/* Primary */
background: var(--purple);
color: #ffffff;
padding: 14px 28px;
border-radius: 10px;
font-weight: 700;
font-size: 15px;
letter-spacing: -0.01em;
border: none;
cursor: pointer;
transition: opacity 150ms, transform 150ms;

/* Primary hover */
opacity: 0.88;
transform: translateY(-1px);

/* Outlined */
background: transparent;
border: 1.5px solid rgba(26,26,46,0.20);
color: var(--ink);
/* hover: border-color purple, color purple */
```

### Cards
```css
background: #ffffff;
border-radius: 18px;
padding: 32px;
border: 1px solid var(--rule);
/* Optional: box-shadow: 0 1px 0 var(--rule); */
```

### Section label (eyebrow)
```css
font-size: 11px;
font-weight: 700;
letter-spacing: 0.18em;
text-transform: uppercase;
color: var(--purple);
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 16px;
/* Optional decorative line: */
/* ::before { content:''; width:20px; height:1.5px; background:var(--purple); } */
```

### Stage / process steps
Numbered 01, 02, 03, 04 in purple mono style. Each has:
- Number badge (purple background, white text, 32px circle or pill)
- Title (Inter 700, 18px)
- Description (Inter 400, 15px, ink-sub colour)
- Connector line between stages on desktop

### Trust signal block
Dark background (`--dark`), white text. Grid of 5 items, each with:
- Icon or number (purple or mint accent)
- Short bold claim (Inter 700, 17px, white)
- One-line explanation (Inter 400, 14px, rgba(255,255,255,0.70))

---

## Layout

Container: `max-width: 1100px; margin: 0 auto; padding: 0 40px;`
Mobile: `padding: 0 20px;`

Grid patterns:
- 2-col: `grid-template-columns: 1fr 1fr; gap: 24px;`
- 3-col: `grid-template-columns: repeat(3, 1fr); gap: 20px;`
- 4-col metrics: `grid-template-columns: repeat(4, 1fr); gap: 14px;`

All grids collapse to 1-col on mobile (`max-width: 640px`).

---

## Copy Voice

**Do:**
- Short sentences. Active voice.
- Technical but not jargon-dense. Explain the *why* not just the *what*.
- "The actuary owns the deliverable." Not "Our AI helps actuaries."
- Confident assertions. "Diorama does not generate scheme logic from prose."
- Specificity over vagueness: "weeks, not months" not "faster"

**Don't:**
- Superlatives: "revolutionary", "game-changing", "world-class"
- Em dashes or double dashes
- Passive voice where avoidable
- Marketing clichés: "seamless", "cutting-edge", "harness the power of"
- Anything that sounds like it was written by an AI

---

## Brand Logo / Wordmark

Render as HTML text — no image file needed:

```html
<span class="wordmark">pensionable<span class="dot">.</span>ai</span>
```

```css
.wordmark {
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 19px;
  letter-spacing: -0.04em;
  color: var(--ink);
}
.dot { color: #6C47FF; }
```
