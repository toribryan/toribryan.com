import type { Section, Slide } from "@/features/review/types"
import { slidePath } from "@/features/review/types"

export const REVIEW_BASE_PATH = "/review"

export const SECTIONS: Section[] = [
  { slug: "background", title: "Background", endsAt: 4 },
  { slug: "process", title: "Process", endsAt: 12 },
  { slug: "product", title: "AuthorProof", endsAt: 29 },
  { slug: "handoff", title: "Handoff", endsAt: 39 },
  { slug: "outcome", title: "Outcome", endsAt: 44 },
  { slug: "observations", title: "Questions", endsAt: 60 },
]

/**
 * Every slide in presentation order, sections in the order of `SECTIONS`.
 * Only data lives here so the route can read it on the server; the slide
 * bodies are client components, looked up by path in `components/slides`.
 */
export const SLIDES: Slide[] = [
  {
    slug: "bio",
    section: "background",
    stage: "background-intro",
    title: "bio",
    notes: [
      "Pacing: four minutes for the background, eight for process, seventeen for the AuthorProof story, ten for the handoff, five for the outcome, and the rest of the hour, about sixteen minutes, for their questions. The clock in the header shows the time elapsed and the minute this section should end by.",
      "Three descriptions of me: my dad’s, my colleagues’, and my own. The one to keep is “question artist.” Interrogating the brief is the first thing I do on every project, and the project in this deck starts there.",
      "The photos are the people and places behind the work. Nothing here needs clicking.",
    ],
  },
  {
    slug: "pillars",
    section: "background",
    stage: "background-intro",
    title: "my pillars of inspiration",
    notes: [
      "Creative technologist: I prototype in code and ship the front end, so what I hand engineering is something that already runs.",
      "Bonzo is the pug. Forever student is why every project opens with a teardown of whoever already solved the problem.",
    ],
  },
  {
    slug: "agentic",
    section: "process",
    title: "end to end",
    notes: [
      "Process first, so the rest of the walkthrough makes sense. Aim to finish this section by 12 minutes.",
      "Say it out loud, briefly and honestly: the last couple of years turned my traditional design process on its head, and I went through all five stages of grief for it. Where I came out is a polished, end-to-end agentic design process.",
      "This is that process: 32 Claude skills and 7 read-only reviewer agents, from discovery through shipped code, documented in fibo.",
      "The router is the point: it places work on the phase map, loads the phase’s skill, runs the reviewer that guards it, and keeps a project log of decisions. The explorer opens on its SKILL.md; open a phase folder to show its skills, or an agent to show what it checks.",
      "Reviewers are read-only on purpose. They report failures with their location and end in a verdict: ready, or N blocking issues.",
    ],
  },
  {
    slug: "team",
    section: "process",
    title: "with a team",
    notes: [
      "In my last role I built and maintained the skills my design team used at every stage. The strip is what it did for them.",
      "Handoffs became prototype-forward, through a GitHub repository. Promise them they’ll see one: the AuthorProof handoff later in the deck.",
    ],
  },
  {
    slug: "today",
    section: "process",
    title: "today’s piece",
    notes: [
      "I’m design-system forward, but today is AuthorProof: a project I worked through entirely on my own, at a company that valued high agency.",
      "Say the NDA line here once, so it doesn’t interrupt later: most of what follows is rebuilt.",
    ],
  },
  {
    slug: "suite",
    section: "product",
    title: "where it sits",
    notes: [
      "The one piece today: a complex problem that arrived from product with its architecture already chosen, and an AI feature. The story runs to about 29 minutes on the clock, then the handoff to 39.",
      "At Proctorio I led cross-product design across three suites, for institutions and for proctoring agencies.",
      "Integrity proctors the exam, Vault protects the exam content, and Origin proves authorship. Hover a tile to see it move. This walkthrough is Origin’s product: AuthorProof.",
    ],
  },
  {
    slug: "cover",
    section: "product",
    title: "AuthorProof",
    notes: [
      "AuthorProof generates a short comprehension quiz from the student’s own writing, so someone who wrote the paper can answer it and someone who did not cannot. It is an AI feature: the questions and the assessment of each answer are generated.",
      "My role was end to end: from an assigned brief to a shippable MVP inside Canvas. The product page and the full case study are linked on the slide.",
    ],
  },
  {
    slug: "task",
    section: "product",
    title: "task",
    notes: [
      "The suite has to cover every integrity vector on the right; authorship was the one no existing tool touched.",
      "The reframe on the left is the whole product: existing tools ask “is this original?” Instructors ask “did you write this?”",
      "The two rules underneath were set before any screen was drawn: no binary pass or fail, and every score traces back to something a person can read, so an instructor can check the AI’s reasoning for themselves.",
    ],
  },
  {
    slug: "thesis",
    section: "product",
    title: "statement",
    notes: [
      "This is the assumption the brief rested on. The rest of the product section is about testing it against what the platform could actually do.",
      "It is the question-artist habit from the bio, applied to a brief.",
    ],
  },
  {
    slug: "brief",
    section: "product",
    title: "the brief",
    notes: [
      "The first concept arrived with an architecture already chosen: three journeys built on Canvas’s own quiz tooling, one quiz per submission, with the student notified to go find it.",
      "Before anyone built anything, I mapped every step against what the platform could do and timed it. The next slide is what that turned up.",
    ],
  },
  {
    slug: "constraints",
    section: "product",
    title: "four constraints",
    notes: [
      "The strip first: six steps, roughly ten minutes, and a fresh quiz per student in tooling built for one quiz per class. Ten minutes is exactly the time a student needs to reopen the essay.",
      "Each of the four is a design problem, not an engineering one: it changes where the product should live, not how a screen looks.",
      "This is how I push back on a brief: with a map of the platform rather than a list of objections.",
    ],
  },
  {
    slug: "pivot",
    section: "product",
    title: "the pivot",
    notes: [
      "Rather than report blockers, I pitched an alternative and split it into an MVP and a longer vision: embed AuthorProof in the assignment itself, so the quiz appears seconds after upload and the result writes back beside the submission.",
      "The cost is stated out loud on the slide: short pieces written in the LMS editor were excluded, and proctoring alongside the embedded flow stayed an open question. I would rather name the hole than have engineering find it.",
      "The tabs compare the student’s path as briefed and as pitched. The next slide is the pitched flow, working.",
    ],
  },
  {
    slug: "prototype",
    section: "product",
    title: "the flow, rebuilt",
    notes: [
      "A quick reminder that this is a rebuild in code with sample data, made the way the process section described: built with Claude Code on my own components.",
      "Drive it live, in the order an assignment runs. Setup: pick AuthorProof in the dropdown, open Configure quiz settings, change one setting so they see every control explained, and save. Then View as the student: upload, watch the quiz arrive in seconds, answer a couple wrong on purpose, and submit.",
      "On the result, point at one question: the student’s words, the question made from them, the answer, and the assessment, side by side. That is how an instructor checks the AI’s reasoning. The email tab, before the result, is the briefed flow’s emails in every state, from ready to the window closing: use it when the shipped slide comes up, since the briefed flow is what shipped first. The closed state is a good talking point: it stays neutral, because a missed quiz is for the instructor to follow up, not a failure.",
      "Keys inside the prototype belong to it, so click outside it or use the arrows in the header to move on.",
    ],
  },
  {
    slug: "review",
    section: "product",
    title: "the reviewing side",
    notes: [
      "The instructor’s side, rebuilt the same way. Open on As pitched: AuthorProof on the left, the student’s paper in the middle, and the grading panel with the similarity badge on the right, all in SpeedGrader.",
      "Click a question on the left and the paper scrolls to the passage it came from. That is the argument: the instructor checks the AI against the paper without leaving the grading view.",
      "Then switch to As built: the results panel on its own, with the paper and grade in another tab. Say why it went that way if you know it, and what it costs the instructor: two places to read before one grade.",
    ],
  },
  {
    slug: "repo",
    section: "handoff",
    title: "the repo",
    notes: [
      "This is the answer to how my intent reached engineering, and the repo promised in the process section. Aim to finish the section by 39 minutes.",
      "One repository: the prototype that shows every screen and state, and three documents beside it, each with one job. Figma mirrors the prototype under the same names, for review and annotation.",
      "The three rules are the working agreement. The first one matters most: the prototype wins, so the documents never drift into a second, competing spec.",
      "The original files are under NDA, so this repo is the same structure rebuilt with sample data. It is public, so they can browse it after.",
    ],
  },
  {
    slug: "decisions",
    section: "handoff",
    title: "what and why",
    notes: [
      "The handoff document was a feature breakdown, not a description of screens. Each feature had its user journey, its business logic, how to walk the prototype to see it, and links to every related file: code, Figma frames and test-plan rows.",
      "It opens on F2, the student’s submit and quiz. Click through to F5, the grading view they just saw, to show the same four parts.",
      "Under the breakdown sat the principles that don’t bend and the decisions, each with what it cost, so a well-meant fix doesn’t undo a deliberate choice.",
    ],
  },
  {
    slug: "style",
    section: "handoff",
    title: "how it looks",
    notes: [
      "One name everywhere: the CSS token, the Figma variable and the doc row are the same word. Engineers build with the name, never the hex.",
      "The third column is the point. The rule lives with the component: the similarity badge is always neutral, the closed email is always neutral. Nobody has to remember it in review.",
      "Copy that ships word for word is a product decision. Saying so in the guide stops it being edited for space.",
    ],
  },
  {
    slug: "test-plan",
    section: "handoff",
    title: "how to know it’s right",
    notes: [
      "Behaviour as given, when, then, with an ID. QA checks a row against the prototype, which already shows the answer.",
      "The phone line in GV-01 is a real example: on a phone the paper sits below the panel, so selecting a question has to scroll the page, not just the paper. That only surfaced because the row said “on a phone”.",
      "If there is time, open the repo on screen: a test-plan row, then the prototype state it describes. Otherwise move on to what shipped.",
    ],
  },
  {
    slug: "shipped",
    section: "outcome",
    title: "shipped",
    notes: [
      "What shipped, after the handoff you just saw: the briefed idea first, the pivot as the roadmap.",
      "The pivot direction became the official long-term vision for the product; the original briefed idea shipped as the proof of concept.",
      "The strip: a pilot with about five institutions in spring 2026. The 95% and under 5% are the goals set for that first semester, not results. The zero matters most to me: nothing added to the instructor’s grading workflow.",
    ],
  },
  {
    slug: "overruled",
    section: "outcome",
    title: "overruled",
    notes: [
      "The moment I was overruled. I pitched the embedded flow as the MVP; the briefed architecture shipped first because it was the fastest way to get a working product in front of pilot instructors.",
      "What I would do differently: prototype the embedded flow beside a proctored session before the direction decision. I had named that hole on the pivot slide, but naming it is not answering it.",
      "The two steps underneath are what I would design next. Good place to pause for questions before the second piece.",
    ],
  },
  {
    slug: "thanks",
    section: "observations",
    title: "thank you",
    notes: [
      "Every link from the deck in one place.",
      "Land here by about 44 minutes so the rest of the hour is theirs.",
      "One question back: what does the first ninety days of this role look like from your side?",
    ],
  },
]

/** Index of the slide a `<section>/<slug>` path names, or -1. */
export function findSlideIndex(path: string | undefined) {
  if (!path) return 0
  return SLIDES.findIndex((slide) => slidePath(slide) === path)
}

export function slideHref(slide: Slide) {
  return `${REVIEW_BASE_PATH}/${slidePath(slide)}`
}

export function firstSlideOfSection(section: Section["slug"]) {
  return SLIDES.findIndex((slide) => slide.section === section)
}
