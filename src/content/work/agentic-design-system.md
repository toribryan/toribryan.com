---
title: "Agentic Design System"
excerpt: "A design system built for machines to read: three-tier tokens, JSON component contracts, and one canonical source of truth."
category: "Design Systems"
company: "Proctorio"
role: "Staff Designer"
stack: "Figma, Figma MCP, Claude Code"
problem: "Every handoff carries a translation layer — the gap between what a designer meant and what an engineer builds. Structure the design system so a model can read it directly, and the deliverable stops being documentation. It becomes software."
task: "Lead an overhaul of Proctorio's legacy design system, aligned to a company rebrand, into one structured for both human and machine consumers."
outcome: "One canonical source — components linked to Figma via Code Connect — that every token, doc, and prototype derives from. No more hardcoded values, no more conflicting sources of truth."
heroSrc: "/case-studies/agentic-design-system-cover.svg"
cardSize: "Large"
featured: true
draft: false
---

## What change is needed

An agent doesn't read your design system the way a human does. It needs clear structure, not prose.

Three failure points do most of the damage:

- Raw tokens the agent hardcodes
- Component docs written for humans
- Conflicting sources of truth

The fixes: a three-tier token architecture, JSON component metadata, and one canonical source everything else derives from.

## Fix 1: Tokens the agent can reason about

Raw values are the first thing that breaks. Hand an agent `#008b8b` and it will cheerfully hardcode that hex in forty places. The moment you rebrand, every one of them is wrong, and no amount of prompting reliably stops it.

- **Primitives** are raw values — `teal-500: #008b8b`, `space-4: 16px`. The agent should never see these. If it does, it hardcodes them.
- **Semantics** are intent-named aliases — `color/action/primary`, `color/danger/background`. This is the only layer the agent reads and writes. The name describes the job, not the value, so a rebrand updates one alias and everything downstream follows.
- **Component tokens** are optional — `button/background/default → color/action/primary`. Skip them until you're doing multi-brand work.

![The three-tier token architecture: primitives → semantics → component tokens](/case-studies/agentic-design-system-tokens.svg)

## Fix 2: Component metadata

Most component documentation is written in prose, for humans. An agent needs a contract with explicit keys, explicit values, no ambiguity. The emerging consensus — surfaced across talks from Indeed, GitHub, and others at the AI Design Systems Conference 2026 — is JSON metadata per component, covering four things:

- **Props** — the states and variants that already exist in Figma. Five states in Figma, five states in the metadata. No interpretation.
- **Relationships** — what the agent must know before placing the component. Is it a form child? A toolbar item? What can it not sit next to? This is the context a human infers and an agent can't.
- **Tokens** — which semantic tokens the component consumes. Load-bearing in an agentic system, not decorative.
- **Usage** — what it's for, and the anti-patterns. Not the obvious ones ("don't put two primary buttons side by side"), but the specific ones only your team knows.

An agent can auto-generate the first draft of this metadata, but it comes back about 80% right and 20% generic. It'll list the obvious anti-patterns and miss the ones that actually bite: "never use a destructive button in onboarding," "loading state shows after 200ms, not immediately."

![Semantic token definitions layered on top of the raw primitives](/case-studies/agentic-design-system-semantic-tokens.svg)

## Fix 3: One source of truth

The fix is architectural, not editorial. Pick one canonical source — for us, the design system components linked to Figma via Code Connect (or rich component descriptions, which do the same job without enterprise tooling).

Everything else derives from it or maps to it:

- The Figma library
- The docs site
- The token files

None of them are independent truth. They're all projections of the one contract.

## What it changed

No more hardcoded values creeping into forty places the moment a token changes. No more agent guessing which source to trust — the Figma library, the docs site, and the token files all resolve to one contract instead of competing with each other.
