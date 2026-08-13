---
title: "Author Proof"
excerpt: "A Canvas-integrated integrity tool that verifies authorship, not originality — a personalized comprehension quiz generated from each student's own submission."
category: "Product Design"
company: "Proctorio"
role: "Lead Product Designer, End-to-End Product Design"
timeline: "4–6 week MVP"
stack: "Figma, Claude Code, Azure"
problem: "Plagiarism detectors analyze the document, not the student — a paraphrase, an AI rewrite, or a ghostwriter pass clears every existing check. Instructors had no scalable way to verify authorship inside their Canvas workflow."
task: "Design the Phase 1 MVP end-to-end in 4–6 weeks: the instructor quiz-settings panel in the Canvas assignment editor, AI-generated comprehension questions, the student quiz flow, and the SpeedGrader badge → Review Center pathway — inside Canvas's iframe and FERPA constraints."
process: "Chose the SpeedGrader-badge → Review Center pathway over a dedicated report card — it minimized new surface area for instructors already living in SpeedGrader, and was the only path that fit the 4–6 week timeline. From there, Canvas's iframe and FERPA constraints shaped the rest, and the inverted badge-color problem got resolved with color-independent copy instead of a Canvas-side override we didn't control."
outcome: "An MVP built around a color-independent status pattern — Canvas's badge-color logic runs inverted from Author Proof's own scoring — targeting 95%+ completion, sub-30-second generation, and under 5% false positives in the first-semester pilot."
cardSize: "Wide"
featured: false
draft: false
---

## Context

Plagiarism and AI-writing detectors share a structural blind spot: they analyze the *document*, not the *student*. A learner can paraphrase a source, use AI to rewrite someone else's draft, or hire a ghostwriter, and still pass every existing check. Instructors know this but have no scalable way to act on it. Existing integrity tools answer "Is this original?" — none answer "Did you write this?"

Author Proof was scoped as a Phase 1 MVP on a 4–6 week timeline, integrating directly into Canvas via the Similarity Detection API. That meant designing inside real constraints from day one:

- Render inside Canvas's iframe — both the assignment editor and SpeedGrader
- Get registered as an approved LTI tool by an institutional admin
- Stay FERPA-compliant — no storing submission content beyond quiz generation, no logging PII
- Work around an inverted badge color: the SpeedGrader score-badge color is Canvas-controlled, and it's *inverted* relative to Author Proof's own scoring — an 80% score shows red — so the UI could never rely on color alone to communicate a result

## The solution

Instructors turn on Author Proof from a quiz-settings panel built inline into the Canvas assignment editor. From there:

1. On submission, Author Proof generates a personalized comprehension quiz from the student's own writing, in the submission's own language.
2. The student answers it in a follow-up flow.
3. The result surfaces as a score badge directly in SpeedGrader — Canvas's existing grading surface.
4. The badge links out to a full session in the Proctorio Review Center for anyone who wants to dig deeper.

![The instructor quiz-settings panel inline in the Canvas assignment editor](./placeholder.jpg)

## Key components

- The Canvas-embedded quiz-settings config panel
- A proctored-environment dropdown with an embedded upgrade CTA
- The SpeedGrader score badge, built around a color-independent status pattern
- The Review Center session view for deeper review

![The SpeedGrader score badge, built around a color-independent status pattern](./placeholder.jpg)

## How we got there

**SpeedGrader badge → Review Center, not a dedicated report card.** It minimized new surface area for instructors already living in SpeedGrader every day, and it was the only path that fit the 4–6 week timeline. The report card idea was deferred to a future phase.

**Designed inside Canvas's constraints, not around them.** The iframe and FERPA requirements shaped the rest of the design.

**Color-independent copy, not a Canvas-side override.** The inverted badge-color problem got resolved with wording the UI could rely on regardless of color — a fix within our control, instead of one that wasn't.

## Success criteria

Six targets define the MVP's bar for the first-semester pilot:

- 95%+ quiz completion rate
- Under 30 seconds to generate a quiz
- 3+ assignments per instructor enabling Author Proof after first use
- +40% SpeedGrader dwell time
- Under 5% false positives
- Under 0.5% LTI errors

## Where it stands

Author Proof is a pre-launch MVP. Impact will be measured in the first-semester pilot against the six targets above.

## What I learned

- Narrowing to one provable claim — did you write this — kept the MVP honest about what it could and couldn't prove.
- Designing with the platform's constraints, rather than around them, is what produced the color-independent status pattern.
- Treating fairness as a core requirement, not a nice-to-have, meant the product had to read as *confidence*, not *verdict* — evidence for a human conversation, never an automated judgment.
