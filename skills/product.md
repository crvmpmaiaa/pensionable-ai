# Product Reference — Diorama by pensionable.ai

## What Diorama Is

Diorama is a pension calculation engine built by pensionable.ai.

It is designed specifically for complex DB (defined benefit) pension schemes. Its central
proposition: rather than forcing the scheme to fit a generic platform, the engine adapts to
the scheme's actual evidence pack and produces auditable, scheme-specific calculation
capability.

---

## The Core Problem It Solves

Traditional pension calculation platforms make a promise:
> "We have the standard functions. Fit your scheme into our model."

This works for the standardised parts. The pain lives in the gaps:
- Rules that do not fit the table shape
- GMP interactions that are scheme-specific
- Exceptions that cannot be ignored
- Sections and categories that cut across standard function sets
- The final result: a pile of overrides and bespoke patches inside someone else's abstraction

Teams lose months in those gaps. Diorama is built to eliminate them.

---

## What Diorama Does — Safe to Say

These claims are cleared for the website. Use them directly.

### The paradigm shift
- Diorama starts from the real evidence pack: deeds, rules, spreadsheets, worked examples,
  prior calculations, factor tables, admin guides.
- It turns unstructured scheme material into structured, reviewable, scheme-specific
  calculation capability.
- The old world: unstructured material → humans interpret everything → bespoke development.
- The new world: unstructured material → AI-assisted structuring → structured rule basis →
  generated scheme-specific functionality → deterministic compute → replay and audit.

### What the engine produces
- A deterministic calculation path (no guesswork in the runtime)
- An auditable output — every formula traceable to the specification
- A regression harness that re-runs automatically on every rebuild
- Calculation artefacts in the consumer's own code conventions (Python modules, Excel proformas,
  regression harnesses, calculation packs, audit trails)

### Trust and safety (all cleared)
1. **The actuary owns the deliverable.** The human directs the engagement, makes actuarial
   judgement calls, decides on interpretive readings, and signs off the answer. Accountability
   never moves.
2. **No AI in the runtime path.** The runtime is deterministic. The same inputs produce the
   same outputs every time. AI assists in building the calculator — it does not enter the audit
   trail of any individual calculation.
3. **Every output is testable.** Formulas are mechanical translations of rule text. A regression
   harness asserts that outputs match worked examples on every rebuild. Test failure surfaces
   before anything ships.
4. **Witness-anchored validation.** Candidates are verified against worked examples with
   documented tolerances before they enter the compute path.
5. **Personal data protection built into the pipeline.** Anonymisation happens before any
   AI access. The classifier sees only structure — not member data.

### Speed claims (cleared)
- "Weeks, not months" from evidence pack to working calculation capability.
- Shrinks the time from messy evidence pack to structured candidates from weeks to hours.

### Who built it (cleared)
- Decades of pensions administration experience.
- People who have built pension administration and calculation systems from scratch (not
  configured someone else's platform — built systems).
- Frontier AI fluency from the moment these models became capable of structured technical work.

### What it handles (cleared)
- Hard GMP equalisation logic, deterministically
- Tranche-oriented modelling
- Factor and rate-table mechanics
- Standard DB calculation surface: revaluation, early/late retirement, commutation, section
  and category logic, benefit specs
- DC and CARE schemes (structurally simpler, same engine applies)

---

## What NOT to Say — IP Protection

Never include on the website:

- The names of specific AI models used (Claude, GPT, Gemini, etc.)
- "Two LLMs working in tandem" or any reference to the dual-model review pattern
- Specific architectural details: "six-phase anonymisation pipeline", "structure-only extraction",
  "substitution map held locally"
- Internal code terminology: specific Python package names, framework names
- The exact workflow stages or their internal names
- Anything about how the AI-assisted structuring works internally
- Claims about being "the only" or "the first" (unverifiable, risky)
- Specific client names or scheme names without explicit permission

**Safe framing for the AI assistance**: 
"Frontier AI models accelerate the structuring of messy scheme material into candidates
that humans review." No more detail than this on the public site.

---

## Positioning

### Against traditional platforms
Not a direct attack. Frame as a different category:
> "We are not trying to force complex DB schemes into a fixed catalogue of standard functions.
> We built an engine that adapts to the scheme."

### Against bespoke development
Frame as dramatically faster with the same rigour:
> "Weeks, not months. Auditable from day one. In your own code conventions."

### Unique differentiator (safe to state)
The combination of:
1. Genuine pensions domain depth (not AI applied to a domain it does not understand)
2. AI-accelerated structuring (turning the evidence pack into candidates fast)
3. Deterministic, witness-anchored compute path (no AI in the money path)

This combination is what no off-the-shelf platform and no general AI tool provides.

---

## Stage Flow (High Level — Safe for Website)

Present as four stages. No internal detail:

**Stage 1: Ingest**
The evidence pack as it really exists — rules, amendments, spreadsheets, examples, notes.
No pretence that the documents are clean.

**Stage 2: Structure**
Frontier AI models read the evidence pack and produce structured candidates — rule areas,
factor references, methodology choices, provenance back to source.

**Stage 3: Validate**
Candidates go through the engine's discipline layer — coherence checks, required fields,
methodology confirmation, contradiction detection. Humans review and approve the basis.

**Stage 4: Compute and audit**
Deterministic runtime. Replay against worked examples. Auditable outputs in the consumer's
own conventions.

---

## CTA Strategy

Primary CTA: "Book a conversation" or "Request a demo"
- No pricing on the site
- No self-serve sign-up
- Contact drives to: a Calendly link (placeholder), or an email address

Secondary CTA (optional): "See the audit trail" — links to the Onyx demo if available

---

## Frequently Asked Questions (copy for FAQ section if needed)

**Is this an AI tool that generates pension calculations?**
No. AI accelerates the structuring of scheme material into candidates that humans review.
The runtime is deterministic Python — the same inputs produce the same outputs every time.
No AI enters the audit trail of any individual calculation.

**Who owns the deliverable?**
The actuary. Always. The engine and the AI are tools that accelerate execution. The human
in the loop directs the engagement, makes the judgement calls, and signs off the answer.
Accountability never moves.

**Does it work with our existing codebase?**
Yes. Artefacts are delivered in your own code conventions. New scheme implementations
read, run, and maintain like everything else already on your shelf.

**What about GDPR and personal data?**
Personal data protection is built into the pipeline before any AI access. The AI-assisted
structuring step sees only structure — never member data.

**Does it handle GMP equalisation?**
Yes. GMP equalisation logic is handled deterministically with the full range of methods.
