---
title: "Author Proof"
excerpt: "A Canvas-integrated academic-integrity tool that verifies authorship — not originality — with a personalized comprehension quiz generated from each student's own submission."
category: "Product Design"
company: "Proctorio"
role: "Lead Product Designer, End-to-End Product Design"
timeline: "4–6 week MVP"
stack: "Figma, Claude Code, Azure"
problem: "Detectors analyze the document, not the student — a paraphrase, AI-rewrite, or ghostwriter pass clears every existing check. Instructors had no scalable way to verify authorship inside their existing Canvas workflow."
task: "Design the Phase 1 MVP end-to-end within a 4–6 week timeline: the instructor quiz-settings panel inside the Canvas assignment editor, AI-generated comprehension questions, the student quiz flow, and the SpeedGrader badge → Review Center pathway — inside Canvas's iframe and FERPA constraints."
outcome: "An MVP built around a color-independent status pattern — since Canvas's badge-color logic is inverted from Author Proof's own scoring — targeting 95%+ quiz completion, sub-30-second generation, and under 5% false positives in first-semester pilot."
cardSize: "Wide"
featured: false
draft: false
---

## Context

Plagiarism and AI-writing detectors share a structural blind spot: they analyze the *document*, not the *student*. A learner can paraphrase a source, use AI to rewrite someone else's draft, or hire a ghostwriter, and still pass every existing check. Instructors know this but have no scalable way to act on it. Existing integrity tools answer "Is this original?" — none answer "Did you write this?"

Author Proof was scoped as a Phase 1 MVP on a 4–6 week timeline, integrating directly into Canvas via the Similarity Detection API. That meant designing inside real constraints from day one: the tool has to render inside Canvas's iframe (both the assignment editor and SpeedGrader), it requires an institutional admin to register it as an approved LTI tool, and FERPA rules out storing submission content beyond quiz generation or logging any PII. The trickiest constraint: the SpeedGrader score-badge color is Canvas-controlled, and it's *inverted* relative to Author Proof's own scoring — an 80% score shows red — so the UI could never rely on color alone to communicate a result.

## The solution

Instructors turn on Author Proof from a quiz-settings panel built inline into the Canvas assignment editor. On submission, Author Proof generates a personalized comprehension quiz from the student's own writing, in the submission's own language. The student answers it in a follow-up flow, and the result surfaces as a score badge directly in SpeedGrader — Canvas's existing grading surface — which links out to a full session in the Proctorio Review Center for anyone who wants to dig deeper.

## Key components

- The Canvas-embedded quiz-settings config panel
- A proctored-environment dropdown with an embedded upgrade CTA
- The SpeedGrader score badge, built around a color-independent status pattern
- The Review Center session view for deeper review

## How we got there

The core decision was the SpeedGrader-badge → Review Center pathway, chosen over building a dedicated report card, which was deferred to a future phase. It minimized new surface area for instructors already living in SpeedGrader every day, and it was the only path that fit the 4–6 week timeline. From there, the Canvas iframe and FERPA constraints shaped the rest of the design, and the inverted badge-color problem got resolved with color-independent copy rather than a Canvas-side color override we didn't control.

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

Narrowing to one provable claim — did you write this — kept the MVP honest about what it could and couldn't prove. Designing with the platform's constraints, rather than around them, is what produced the color-independent status pattern. And treating fairness as a core requirement, not a nice-to-have, meant the product had to read as *confidence*, not *verdict* — evidence for a human conversation, never an automated judgment.
