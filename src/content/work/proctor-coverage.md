---
title: "Proctor Coverage"
excerpt: "Embedded analytics that turn proctor coverage from an assumption into evidence, one session at a time."
category: "Product Design"
company: "Proctorio"
role: "Lead Product Designer, End-to-End Product Design"
team: "Product, Engineering, Support"
timeline: "Q2 2025 – Q3 2025"
stack: "Figma, Claude Code, Azure"
problem: "Instructors and third-party proctor providers had no visibility into how a proctor spent a session, or whether their device and network held up — coverage ran on trust and the honor system, with zero evidence."
task: "Design an embedded analytics surface — inside the existing LMS review dashboard, with zero added UI for students — that turns proctor coverage from an assumption into per-session evidence."
process: "The first fork was a live monitoring console versus a per-session evidence view. Chose the evidence timeline — instructors wanted proof coverage had happened, not another real-time screen to watch during an exam. From there, embedding the surface in the existing review dashboard and committing early to anonymized-but-resolvable identity and keyboard/ARIA accessibility shaped everything downstream."
outcome: "A swimlane session timeline with glanceable gap, degradation, and device-status markers, plus an anonymized-but-resolvable identity model — fully keyboard accessible and currently in pilot."
hero: "./placeholder.jpg"
cardSize: "Large"
featured: false
draft: false
---

## Context

Proctorio provides exam proctoring across LMS assessment sessions, using both internal proctors and third-party proctor providers. But neither instructors nor providers had any way to see how a proctor actually spent a session — where their attention landed, or whether their device and network connection held up throughout. Coverage was a vibes-based conversation: instructors trusted that a proctor was watching, proctors ran on the honor system, and there was no evidence that coverage had actually been seamless.

The surface had to work inside real constraints:

- Live inside the instructor's existing LMS review dashboard, not a separate tool
- Add zero new UI for students — the exam experience itself couldn't change
- Keep proctor identity anonymized in analytics by default, but resolvable when an escalation required it
- Be fully keyboard accessible, with intentional ARIA labeling

## Guiding principles

- Evidence over surveillance — build proof, not a live monitor.
- Anonymized by default, resolvable on demand.
- Zero new UI for students, no matter what.
- Accessible from day one, not retrofitted.

## The solution

An analytics surface embedded directly in the instructor's review dashboard: a swimlane timeline of every proctor in a session, with glanceable markers for coverage gaps, connection degradation, and device issues. Proctor identity is anonymized by default but resolvable when an escalation requires it, and the whole surface is fully keyboard accessible.

![The swimlane session timeline embedded in the instructor's review dashboard](./placeholder.jpg)

## Key components

- A swimlane session timeline as the core evidence pattern
- Status markers distinguishing coverage gaps, connection degradation, and device issues
- A scaling control for zooming into a specific window of the session
- An anonymized identity chip that resolves to a real proctor identity on demand

![Coverage gap and device-status markers, zoomed into a session window](./placeholder.jpg)

## Usability testing

*Mock section — replace with real testing methodology and results.*

Walked instructors and proctor-provider admins through the swimlane timeline prototype, focused on finding a specific gap, resolving an identity, and navigating with keyboard only.

**What worked**

- The swimlane layout matched how participants already mentally modeled a session — who, when, and where the gaps were.
- Status markers were glanceable without needing a legend.

**What we fixed**

- The scaling control for zooming into a session window wasn't discoverable on first pass.
- Keyboard-only navigation missed a focus state on the identity-resolve action.

## How we got there

**Evidence timeline, not a live monitoring console.** Instructors wanted proof that coverage had happened after the fact — not another real-time screen to watch during an exam.

**Embedded in the existing review dashboard, not a standalone tool.** It kept coverage evidence where instructors already look for everything else.

**Anonymized-but-resolvable identity and keyboard/ARIA accessibility, decided early.** Both shaped everything downstream rather than getting bolted on later.

## What we heard

- Stakeholders consistently wanted evidence over a live feed — proof after the fact, not something to monitor in real time.
- A swimlane timeline matched how they already thought about a session: who was proctoring, when, and where the gaps were.
- Coverage gaps, connection degradation, and device issues all needed to be glanceable, not something you had to dig for.
- Anonymized-but-resolvable proctor identity came up repeatedly as essential for trust on both sides.

## Where it stands

Proctor Coverage is pre-launch. The intended outcome is per-session proctor engagement visibility with zero added UI for students, and it'll be measured in pilot against gap detection, instructor confidence, and accessibility.

## What I learned

- Evidence over a live feed reframed the whole problem — instructors didn't want to watch, they wanted proof coverage had happened.
- Anonymized-but-resolvable identity turned out to be the detail that earned trust from both instructors and proctors.
- The zero-student-UI constraint concentrated all the design value into the instructor-facing surface.
- Accessibility had to be designed in from the start, not bolted on at the end.

**If I had more time**

*Mock section — replace with real next steps.*

- Pilot the anonymized-but-resolvable identity model with proctor providers directly, not just instructors.
- Explore a lightweight coverage summary instructors could share with a student who disputes a session.
- Study whether the swimlane pattern scales to multi-day or multi-session exams.
