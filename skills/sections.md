# Page Sections Reference — pensionable.ai Website

## Page Structure (Default)

```
Nav
Hero
Problem (dark panel)
Paradigm shift / What Diorama does
How it works (4 stages)
Trust signals
Who it's for (actuaries + developers)
CTA / Book a conversation
Footer
```

Each section has a recommended background colour listed below. Rotate through pastels
so no two adjacent sections share the same background.

---

## Section 1: Navigation

**Background**: white, frosted glass (sticky)

**Left**: `pensionable.` wordmark with purple dot

**Right**: 
- Links: "Product", "How it works", "Trust", "For teams" (or whatever sections exist)
- CTA button (outlined): "Book a call"

**Nav IDs to target**: `#product`, `#how-it-works`, `#trust`, `#for-teams`, `#contact`

---

## Section 2: Hero

**Background**: white
**Padding**: generous top (80px minimum), clear breathing room

**Eyebrow label**: "Pension calculation. Rebuilt."
or: "pensionable.ai · Diorama"

**Headline options** (choose one, do not mix):
- "Every assumption explicit. Every calculation testable."
- "The pension engine that starts from the real evidence pack."
- "Complex DB schemes deserve an engine built around them."
- "From messy evidence pack to auditable calculation. In weeks."

**Subheadline** (60ch max):
> Diorama is a pension calculation engine that turns scheme rules, factor tables, spreadsheets,
> and worked examples into structured, reviewable, deterministic calculation capability.
> The actuary stays in control. The audit trail is built in from the start.

**CTAs**:
- Primary (purple button): "Book a conversation"
- Secondary (text link or outlined): "See how it works →"

**No hero image required.** Consider: a large typographic treatment, or an abstract
SVG diagram of the 4-stage flow, or simply strong typography with a pastel background
strip behind the CTA area.

---

## Section 3: Problem

**Background**: dark panel (`#1a1a2e`) — white text allowed here
**ID**: `#problem`

**Eyebrow**: "The old world"

**Headline**: "The hard part does not go away."
or: "Existing platforms move the cost. They do not remove it."

**Body**:
Even when a platform has reusable functions and configurable tables, teams still have to:
interpret messy scheme rules, reconcile conflicting source material, squeeze unusual
benefit structures into someone else's abstraction, bolt on exceptions, and prove the
result really matches the scheme's intended behaviour.

The scheme still has to live by the system's rules.

**Three pain cards** (dark cards, mint or lavender accent on label):
1. **Rules that do not fit the table shape** — The platform expected one thing. The scheme
   did something else. The team spends months finding workarounds.
2. **Exceptions that cannot be ignored** — Every complex scheme has them. Most platforms
   leave them in expensive corners. They still have to be answered.
3. **Bespoke patches that accumulate** — The final implementation becomes a pile of
   overrides built around someone else's abstraction. Hard to maintain. Harder to audit.

---

## Section 4: What Diorama Does

**Background**: lavender (`#e0dbff`) or white
**ID**: `#product`

**Eyebrow**: "A different premise"

**Headline**: "The engine adapts to the scheme. Not the other way around."

**Two-column layout** (or single wide):

Left / top:
> Diorama starts from the actual evidence pack — deeds, rules, amendments, spreadsheets,
> factor tables, worked examples, prior calculations, admin notes.
>
> The source material is the raw input. The target is the exact validated logic the scheme needs.

Right / bottom (3 feature pills or cards):
- **Scheme-specific by construction** — not configured from generic functions, built from
  the scheme's actual rules
- **Auditable from day one** — every formula traceable to the specification, every output
  testable against worked examples
- **In your code conventions** — artefacts delivered as Python, Excel, or whatever the
  consumer already uses. No platform migration required.

---

## Section 5: How It Works

**Background**: white (or very light lavender)
**ID**: `#how-it-works`

**Eyebrow**: "The process"

**Headline**: "Four stages from evidence pack to auditable output."

**Stage cards** (horizontal flow on desktop, vertical stack on mobile):

**01 — Ingest**
The evidence pack as it actually exists. Rules, amendments, spreadsheets, examples, notes
from prior reconciliations. No pretence that the documents are clean.

**02 — Structure**
Frontier AI models read the evidence pack and produce structured candidates: rule areas,
factor references, methodology choices, provenance back to source. The acceleration point
that cuts weeks of manual interpretation down to hours.

**03 — Validate**
Candidates go through discipline checks. Required fields, coherent date logic, valid factor
coverage, explicit methodology choices. Humans review and approve the basis before
anything is implemented.

**04 — Compute and audit**
Deterministic runtime. Replay against worked examples with documented tolerances.
Auditable outputs in the consumer's own conventions. The same inputs always produce
the same outputs.

**Note**: Do NOT add internal implementation detail to these stages. High level only.

---

## Section 6: Trust Signals

**Background**: dark panel (`#1a1a2e`) — white text
**ID**: `#trust`

**Eyebrow** (in lavender or mint on dark): "Built to be defensible"

**Headline**: "Five structural answers to the question every serious buyer asks."
or: "How we make this safe for actuarial work."

**Five trust items** (grid of 5, or 3+2):

1. **The actuary owns the deliverable**
   The human directs the engagement throughout, makes the actuarial judgement calls,
   and signs off the answer. Accountability never moves.

2. **No AI in the runtime path**
   The runtime is deterministic. AI assists in building the calculator. It does not enter the
   audit trail of any individual calculation. The same code produces the same outputs, every time.

3. **Every output testable**
   Formulas are mechanical translations of rule text. A regression harness asserts that
   outputs match worked examples on every rebuild. Test failure surfaces before anything ships.

4. **Witness-anchored validation**
   Candidates are verified against worked examples with documented tolerances before they
   enter the compute path. The quality gate is structural, not procedural.

5. **Personal data never touches the AI**
   For engagements with member data, anonymisation is built into the pipeline before
   any AI access. The AI-assisted structuring step sees only structure, not member data.

---

## Section 7: Who It's For

**Background**: white or peach (`#ffd8b0`)
**ID**: `#for-teams`

**Eyebrow**: "Who this is built for"

**Headline**: "For actuaries and the teams who build calculation systems."

**Two-column split:**

### For actuaries and pension professionals
> Finally, a system that is not asking you to flatten the scheme into a generic box and hope
> the exceptions survive.

Benefits:
- Fewer hidden assumptions
- Clearer challenge points in the rule basis
- Better use of worked examples in validation
- Easier review of what has actually been implemented
- Faster route from rule understanding to tested outputs

### For developers at consultancies and admin houses
> Stop spending months building bespoke infrastructure around every awkward scheme.
> Use an engine that already knows the domain and can generate the missing scheme-specific
> functionality from the evidence pack itself.

Benefits:
- Less time on interpretation plumbing and spreadsheet archaeology
- More time reviewing real rule choices and extending genuine domain capability
- New scheme implementations in your existing code conventions
- Regression harness built in from the start

---

## Section 8: CTA

**Background**: lavender (`#e0dbff`) or peach (`#ffd8b0`)
**ID**: `#contact`

**Headline**: "Ready to see what this looks like on your scheme?"
or: "Let's talk about your evidence pack."

**Subheadline**:
> Every engagement starts with a conversation about the scheme, the evidence pack,
> and what the team needs. No generic demos. No off-the-shelf pitch.

**CTA button** (purple): "Book a conversation"
**Secondary text**: "Or email us at hello@pensionable.ai" (placeholder)

---

## Footer

**Background**: white, thin top rule
**Content**:
- Left: `pensionable.` wordmark + "ai" + tagline (small, ink-dim)
- Centre: nav links repeated (small)
- Right: "hello@pensionable.ai" + LinkedIn icon (SVG, no external library)
- Bottom line: "© 2026 pensionable.ai · All rights reserved"

**No cookie banner, no analytics snippet, no social pixel** unless specifically requested.

---

## Copy Rules (Reinforced)

- No em dashes. Use a full stop, a new sentence, or a colon.
- No double dashes.
- Numbers under ten: spell out. Ten and above: numerals.
- "Diorama" is always capitalised.
- "pensionable.ai" is always lowercase with the dot.
- Avoid: "revolutionary", "game-changing", "seamless", "cutting-edge", "harness"
- Use instead: "structurally different", "week-to-weeks faster", "built in from the start"

---

## Demo Page (`/demo`) {#demo-page}

**Purpose**: Show the Onyx audit trail running against a real DB scheme. This is the
single most powerful proof point — not a video, not a diagram, a live working system.

**Audience note**: This page is for actuaries and pension professionals. Do not explain
what a tranche is. Do not explain GMP. Write for people who already know.

**Background**: white, with a dark intro strip at the top

---

### Demo page structure

#### 1. Intro strip (dark background, white text)

**Eyebrow**: "Live audit trail"

**Headline**: "A real DB scheme. Every figure traceable to its rule."

**Body** (keep tight — these readers do not need the sales pitch):
> What you are looking at is the complete audit trail from a live Onyx implementation
> of the Onyx Pension Scheme. Every preserved-retirement and revaluation figure is
> clickable. Every click opens the full citation chain: the scheme rule, the statute,
> the workbook cell, and the Python code that produced it.
>
> 203 deferred-pension values validated against the workbook oracle within £0.005.
> 7 test members. Every excess shape the scheme operates.

---

#### 2. Annotation cards (3 cards, white background, mint/lavender/peach fills)

These annotate what the visitor should look for in the demo. Keep them short and precise.

**Card 1 — Lavender**
**Label**: "Click any figure"
**Body**: Every monetary value in the audit trail opens a drawer showing the authority
chain — deed clause, statute reference, workbook cell, and tolerance-checked oracle match.

**Card 2 — Mint**
**Label**: "Pass / Fail at a glance"
Tranche-level results are colour-coded. Green rows passed against the workbook oracle.
The fail classification carries a reason string pointing at the specific open item.

**Card 3 — Peach**
**Label**: "Oracle comparison"
Each member shows engine output against the BCUK cached workbook value with the
exact difference. £0.005 tolerance. Every deviation classified and explained.

---

#### 3. Demo embed

```tsx
<div className={styles.demoFrame}>
  <iframe
    src="/demo/onyx-audit-trail.html"  {/* user places file in /public/demo/ */}
    title="Onyx Audit Trail"
    className={styles.iframe}
  />
</div>
```

```css
.demoFrame {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--rule);
  box-shadow: 0 4px 32px rgba(26,26,46,0.10);
  margin: 40px 0;
  height: 80vh;
  min-height: 600px;
}

.iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
```

**If the user has not yet placed the audit trail file**: render a placeholder card instead:

```tsx
<div className={styles.placeholder}>
  <p>Place your <code>onyx-audit-trail.html</code> in <code>/public/demo/</code></p>
  <p>It will appear here as a fully interactive embedded demo.</p>
</div>
```

---

#### 4. Bottom CTA

**Headline**: "Want to see this on your scheme?"

**Body**: Every engagement starts from your actual evidence pack — the rules, amendments,
factor tables, and worked examples that already exist. We do not need a clean starting point.

**Button**: "Book a conversation" (purple, links to /contact)

**Secondary**: "Or email hello@pensionable.ai"

---

### What NOT to put on the demo page

- No explanation of how the audit trail was generated
- No mention of the AI-assisted structuring that built it
- No internal architecture language
- No "this took X weeks" claims (save that for the conversation)
- The demo speaks for itself — let it

---

## Audience-First Framing (applies to ALL pages)

The primary reader is an **actuary or senior pension professional**. Adjust every page accordingly:

**What they care about most**:
1. Can I defend this to trustees and the regulator?
2. Does the actuary retain control and accountability?
3. Is it actually auditable — or is "auditable" just a word?
4. Will it handle our specific scheme, not just a generic one?
5. How long does it actually take?

**What they are sceptical about**:
- Any claim that AI "understands" pensions
- Speed claims without evidence
- Platforms that over-promise and leave the hard bits to them
- Loss of professional accountability

**How to write for them**:
- Lead with rigour, not speed
- "Actuary owns the deliverable" before "weeks not months"
- Show the audit trail evidence before the headline claim
- Be precise. "203 deferred-pension values validated within £0.005" beats "accurate results"
- Acknowledge the hard parts honestly. They know them.
