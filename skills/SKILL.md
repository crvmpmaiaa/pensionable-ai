---
name: pensionable-site
description: >
  Build the pensionable.ai / Diorama marketing and demo website. Use this skill
  whenever the user asks to build, update, or iterate on the pensionable.ai website,
  the Diorama product pages, the live demo section, or any page for the pension
  calculation engine platform. Also triggers for: "build the site", "update the hero",
  "add a section about Diorama", "pensionable landing page", "go to market site",
  "pension tech website", "add the demo page", "build the Onyx demo route".
  Produces a full multi-page Next.js App Router site (TypeScript) with: a marketing
  home page, a live Diorama demo page, a how-it-works page, and a contact page.
  Uses the maiaa.ai brand system — Inter font, white base, pastel accents,
  single purple accent (#6C47FF), dark navy ink (#1a1a2e).
  Primary audience: actuaries and pension professionals.
---

# pensionable.ai Website Builder

You are building the go-to-market website for **pensionable.ai** and its flagship
product **Diorama** — a pension calculation engine that is about to fundamentally
change what is possible in DB pension scheme automation.

Read these reference files before writing any code or copy:
- `references/brand.md` — design system, colours, type, components
- `references/product.md` — what Diorama is, safe claims, IP protection rules
- `references/sections.md` — page structures, copy guidelines, CTAs
- `references/routing.md` — multi-page architecture, file structure, routing

---

## Core Constraints

**IP Protection**: Impress without revealing implementation detail.
- Show WHAT Diorama does and the outcomes it delivers. Not HOW internally.
- Never mention: specific model names, dual-model review pattern, internal pipeline
  architecture, specific Python package names, six-phase anonymisation detail.
- Safe: deterministic compute, AI-assisted structuring, audit trail, actuary owns the
  deliverable, no AI in the runtime path, witness-anchored validation.

**Primary audience**: Actuaries and pension professionals.
- Write for people who know what GMP equalisation is.
- Do not over-explain pensions terminology.
- Do not write down to them. They are technical, experienced, sceptical of hype.
- Lead with rigour and auditability — not speed or AI glamour.
- Speed ("weeks not months") is a proof point, not the headline.

**Tone**: Confident. Direct. No superlatives. Let the capability speak.

---

## Site Architecture

This is a **Next.js App Router** project (TypeScript). Read `references/routing.md`
for the full file structure. Default pages:

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Marketing home — hero, problem, product, trust, CTA |
| `/how-it-works` | `app/how-it-works/page.tsx` | Detailed 4-stage process page |
| `/demo` | `app/demo/page.tsx` | Live Diorama demo — Onyx audit trail embed + interactive elements |
| `/contact` | `app/contact/page.tsx` | Book a conversation |
| Shared | `app/layout.tsx` | Root layout with Nav and Footer |
| Shared | `app/globals.css` | Design tokens, base styles |
| Shared | `components/Nav.tsx` | Sticky nav component |
| Shared | `components/Footer.tsx` | Footer component |

---

## Build Process

### Step 1 — Read all reference files
Before writing a single line:
```
references/brand.md     — colours, fonts, spacing, component patterns
references/product.md   — claims, IP rules, FAQ copy
references/sections.md  — page-by-page copy and layout guidance
references/routing.md   — Next.js file structure, shared components
```

### Step 2 — Scaffold the project structure
Output files in this order:
1. `app/globals.css` — all design tokens and base styles
2. `components/Nav.tsx` — shared navigation
3. `components/Footer.tsx` — shared footer
4. `app/layout.tsx` — root layout importing Nav + Footer
5. `app/page.tsx` — home page
6. `app/how-it-works/page.tsx`
7. `app/demo/page.tsx`
8. `app/contact/page.tsx`

If the user asks for just one page, output that page plus the shared files it depends on.

### Step 3 — Write each page

Follow brand system exactly (see `references/brand.md`).

Key rules for every file:
- Single font: Inter — import via `next/font/google`, not a `<link>` tag in Next.js
- White base (`#ffffff`), pastel section backgrounds via CSS custom properties
- Purple `#6C47FF` sparingly — primary CTAs, accent text, wordmark dot only
- `#1a1a2e` for all text — no white text on coloured/pastel backgrounds
  (exception: white text ONLY on the dark `#1a1a2e` panel backgrounds)
- No em dashes anywhere in copy
- No double dashes in visible text
- `scroll-margin-top: 72px` on all anchor-targeted sections
- Mobile-first responsive — grid collapses at 640px breakpoint

### Step 4 — The demo page (`/demo`)

This is the centrepiece. Read `references/sections.md#demo-page` carefully.

The demo page should:
- Explain what the visitor is about to see (brief intro — actuaries are the audience,
  so be precise: "This is the audit trail from a real DB scheme implementation")
- Embed or link to the Onyx audit trail HTML (use an `<iframe>` with a placeholder
  `src` the user will update, or a prominent CTA if embedding is not appropriate)
- Include interactive callout cards that annotate what the demo shows:
  - "Every £ figure is clickable — opens the full citation chain"
  - "Tranche-level pass/fail visible at a glance"
  - "Oracle comparison shows engine vs workbook to £0.005 tolerance"
- CTA at bottom: "Want to see this on your scheme? Book a conversation"

The demo page must NOT expose internal architecture. It shows the output, not the machinery.

### Step 5 — Validate before outputting each file
- [ ] No IP-sensitive detail
- [ ] No white text on pastel/green/lavender/yellow/pink backgrounds
- [ ] All internal links use Next.js `<Link>` not `<a href>`
- [ ] All nav links match actual routes
- [ ] No `style=""` sprawl — use CSS modules or global CSS classes
- [ ] No placeholder lorem ipsum — real copy from product reference only
- [ ] CTAs have hover states defined in CSS

---

## Iteration

When the user asks to change one page or section:
1. Output only the changed file(s)
2. State which files changed and which are unaffected
3. Re-validate the checklist for changed files

When adding a new page:
- Add the route to `references/routing.md` mentally
- Add a nav link in `Nav.tsx`
- Match the layout pattern of existing pages exactly

---

## Common User Requests

| Request | Action |
|---|---|
| "build the full site" | Scaffold all files, Step 2 → 5 |
| "just build the home page" | Output globals.css, Nav, Footer, layout, page.tsx |
| "build the demo page" | Output app/demo/page.tsx — read sections.md#demo carefully |
| "update the hero" | Output updated app/page.tsx only |
| "add a pricing section" | No price list. Output a "Speak to us" engagement model section |
| "add more how-it-works detail" | High-level stage copy only. No architecture detail |
| "deploy" | Guide: `npx create-next-app`, drop files in, `npm run dev` to test, Vercel for deploy |
| "add the Onyx demo" | iframe embed in /demo with placeholder src and annotation cards |

---

## Do Not

- Invent features not in `references/product.md`
- Use `<img>` placeholder tags — use SVG or CSS shapes for illustrations
- Add cookie banners, analytics, or GDPR popups without being asked
- Use `any` TypeScript types — keep types explicit
- Use Tailwind unless the user explicitly confirms it is installed
- Write lorem ipsum anywhere
- Reveal the dual-model architecture, specific model names, or internal pipeline detail
