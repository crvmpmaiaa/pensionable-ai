# Routing Reference — pensionable.ai Next.js Site

## Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules + `app/globals.css` for design tokens
- **Font**: `next/font/google` (Inter) — NOT a `<link>` tag
- **Deployment target**: Vercel (primary) or any Node.js host

## Setup command (tell user if they ask)

```bash
npx create-next-app@latest pensionable-site \
  --typescript \
  --no-tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Then drop the generated files into the `src/` directory.

---

## Full File Structure

```
pensionable-site/
├── src/
│   ├── app/
│   │   ├── globals.css              # Design tokens, base reset, utility classes
│   │   ├── layout.tsx               # Root layout — imports Nav, Footer, Inter font
│   │   ├── page.tsx                 # Home — marketing page
│   │   ├── how-it-works/
│   │   │   └── page.tsx             # Detailed 4-stage process
│   │   ├── demo/
│   │   │   └── page.tsx             # Live Diorama / Onyx audit trail demo
│   │   └── contact/
│   │       └── page.tsx             # Book a conversation
│   └── components/
│       ├── Nav.tsx                  # Sticky nav — shared across all pages
│       ├── Footer.tsx               # Footer — shared across all pages
│       ├── Button.tsx               # Reusable button (primary + outlined variants)
│       ├── SectionLabel.tsx         # Eyebrow label component
│       └── StageCard.tsx            # Numbered stage card for how-it-works sections
├── public/
│   └── (static assets — no images needed by default, use SVG inline)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## globals.css — Design Tokens

All CSS custom properties go here. Every component uses these tokens — no hardcoded hex
values in component files.

```css
/* app/globals.css */

:root {
  --white:      #ffffff;
  --ink:        #1a1a2e;
  --ink-sub:    rgba(26,26,46,0.65);
  --ink-dim:    rgba(26,26,46,0.42);
  --ink-fade:   rgba(26,26,46,0.25);
  --rule:       rgba(26,26,46,0.09);

  --purple:     #6C47FF;
  --dark:       #1a1a2e;

  --lavender:   #e0dbff;
  --mint:       #c8f5e0;
  --yellow:     #fef9c3;
  --pink:       #ffd6ea;
  --peach:      #ffd8b0;
  --blue:       #d0eaff;

  --radius-sm:  10px;
  --radius:     16px;
  --radius-lg:  20px;
  --radius-xl:  24px;

  --nav-height: 64px;

  --container:  1100px;
  --gap:        24px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--white);
  color: var(--ink);
  font-family: var(--font-inter), system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Anchor scroll offset for sticky nav */
[id] {
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 640px) {
  .container { padding: 0 20px; }
}

::selection {
  background: var(--purple);
  color: #fff;
}
```

---

## layout.tsx — Root Layout

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'pensionable.ai — Diorama Pension Calculation Engine',
  description:
    'Diorama turns DB scheme rules, factor tables, and worked examples into ' +
    'structured, auditable, scheme-specific calculation capability. ' +
    'Every assumption explicit. Every calculation testable.',
  openGraph: {
    title: 'pensionable.ai',
    description: 'The pension engine that starts from the real evidence pack.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## Nav.tsx — Shared Navigation

```tsx
// src/components/Nav.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const links = [
  { href: '/',              label: 'Product'      },
  { href: '/how-it-works',  label: 'How it works' },
  { href: '/demo',          label: 'Demo'         },
  { href: '/contact',       label: 'Contact'      },
]

export default function Nav() {
  const pathname = usePathname()
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.wordmark}>
          pensionable<span className={styles.dot}>.</span>ai
        </Link>
        <nav className={styles.links}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" className={styles.cta}>
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

```css
/* src/components/Nav.module.css */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--rule);
  height: var(--nav-height);
}

.inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.wordmark {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--ink);
  text-decoration: none;
}

.dot { color: var(--purple); }

.links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.link {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-sub);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  transition: background 120ms, color 120ms;
}

.link:hover, .link.active {
  background: rgba(108,71,255,0.07);
  color: var(--purple);
}

.cta {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1.5px solid rgba(26,26,46,0.20);
  margin-left: 8px;
  transition: border-color 120ms, color 120ms;
}

.cta:hover {
  border-color: var(--purple);
  color: var(--purple);
}

@media (max-width: 640px) {
  .links { display: none; }
}
```

---

## Page Patterns

### Section wrapper pattern
Every section uses this pattern:
```tsx
<section className={styles.section} id="section-id">
  <div className="container">
    {/* content */}
  </div>
</section>
```

```css
.section {
  padding: 96px 0;
}
@media (max-width: 640px) {
  .section { padding: 56px 0; }
}
```

### Dark panel pattern (used for Problem and Trust sections)
```css
.darkSection {
  background: var(--dark);
  color: #ffffff;
}
/* Only use white text inside .darkSection */
```

### Pastel section backgrounds
Rotate through pastels. Never use the same background twice in a row:
- Home hero: white
- Problem: dark (`--dark`)
- What Diorama does: `--lavender`
- How it works: white
- Trust: `--dark`
- Who it's for: `--peach`
- CTA: `--lavender` or `--mint`

---

## Deployment

User asks "how do I deploy?":

1. `npx create-next-app@latest pensionable-site --typescript --no-tailwind --app --src-dir`
2. Replace generated files with the skill-produced files
3. `npm run dev` to test locally at `localhost:3000`
4. Push to GitHub
5. Connect repo to Vercel — zero config, auto-deploys on push
6. Custom domain: add in Vercel dashboard, update DNS A record / CNAME

Alternatively for a fast test: `npm run build && npm run start`
