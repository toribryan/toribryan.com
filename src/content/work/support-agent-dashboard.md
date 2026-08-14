---
title: "Support Agent Dashboard"
excerpt: "A support agent's queue for in-exam chat — arriving with session context, so agents resolve friction before the exam window closes."
category: "Product Design"
company: "Proctorio"
role: "Staff Designer"
team: "Support, Product, Engineering"
type: "Product Redesign"
order: 3
timeline: "Q4 2024 – Q1 2025"
stack: "Figma, internal chat platform"
problem: "Test-takers who hit friction mid-exam had one option: leave the exam, email support, and wait — with no live channel to a human, and no session context attached by the time an agent picked it up."
task: "Design the agent-facing side of an in-exam support chat: route test-taker conversations to a human in real time, arriving with enough session context that the agent isn't starting cold."
process: "The core decision was to route chat with session context attached — where the test-taker is, what they were doing when they got stuck — rather than a blank conversation an agent has to reconstruct by asking. Chat state was designed to persist through a paused exam, so a test-taker stepping away doesn't cost the agent their place in the thread."
outcome: "The majority of \"I couldn't finish because ___\" tickets no longer exist — they're resolved in-session, by an agent working from context instead of reconstructing it after the fact."
heroSrc: "/case-studies/support-agent-dashboard-context-panel.svg"
gallery:
  - "/case-studies/support-agent-dashboard-conversation.svg"
cardSize: "Tall"
featured: false
draft: false
---

## The problem

When a test-taker hit friction mid-exam, the standard path was to leave the exam, email support, and wait. By the time an agent picked up the ticket, the exam window had often already closed — and the agent was starting cold, with no idea what the test-taker had been doing when they got stuck.

## Research & insights

*Mock section — replace with real research findings.*

- Talked with support agents about what made a mid-exam ticket hard to resolve quickly.
- The most common complaint: reconstructing what a test-taker had already tried before they could help.
- Agents wanted the conversation to start where the test-taker's frustration started, not from a blank slate.
- Test-takers said the fear of losing exam time was worse than the friction itself.

## Guiding principles

- Never pull the test-taker out of the exam to get help.
- Give the agent context before they ask for it.
- A paused session should never cost anyone their place in the conversation.

## The solution

A chat that lives inside the exam UI and routes straight to a support agent — arriving with the context of where the test-taker is in their session, so the agent isn't starting from zero. It resolves in real time without pulling the test-taker out of the exam, and the thread persists if the session is paused, so stepping away doesn't cost the agent their place in the conversation.

![The support agent's conversation thread, showing session context attached to the chat](/case-studies/support-agent-dashboard-conversation.svg)

## Usability testing

*Mock section — replace with real testing methodology and results.*

Shadowed support agents handling live and simulated in-exam chats, focused on how quickly they could orient to a new conversation and resolve it.

**What worked**

- Agents resolved tickets faster once session context arrived with the conversation instead of being requested.
- The persistent thread meant a paused exam didn't reset the conversation.

**What we fixed**

- Agents wanted a lighter-weight way to flag a ticket for follow-up without losing the thread.

## Impact

The majority of "I couldn't finish because ___" tickets no longer exist. They're resolved in-session, by an agent working from context instead of reconstructing it after the fact.

## What I learned

Routing with context, not just routing to a human, was the detail that mattered — an agent who already knows where someone got stuck resolves the ticket faster than one starting fresh. Keeping the exam session intact rather than pulling the test-taker out of it kept the fix inside the moment of friction instead of after it.

**If I had more time**

*Mock section — replace with real next steps.*

- Explore proactive routing — surfacing likely help topics before the test-taker types anything.
- Study whether agents want a saved-response library for the most common friction points.
