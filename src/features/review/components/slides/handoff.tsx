"use client"

import type { ComponentType } from "react"

import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/base/ui/tabs"
import { REVIEW_LINKS } from "@/features/review/data/links"
import type { SlideData, Slide as SlideType } from "@/features/review/types"

import {
  Card,
  HairlineGrid,
  Kicker,
  Lede,
  LinkOut,
  LinkRow,
  Reveal,
  Slide,
  Title,
} from "../slide-primitives"

const REPO = REVIEW_LINKS.handoff

/** The repo's top level, as the README draws it. */
const TREE: [string, string][] = [
  ["docs/01-handoff.md", "What and why"],
  ["docs/02-style-guide.md", "How it looks"],
  ["docs/03-test-plan.md", "How to know it’s right"],
  ["prototype/", "The spec: every screen and state, in code"],
  ["CHANGELOG.md", "What changed, and when"],
]

/** A monospaced block with hairlines, for file trees and spec excerpts. */
function Excerpt({
  label,
  href,
  children,
}: {
  label: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Reveal className="overflow-hidden rounded-xl border border-line bg-background">
      <div className="flex h-9 items-center justify-between gap-3 border-b border-line px-3">
        <p className="truncate font-mono text-xs text-muted-foreground">
          {label}
        </p>
        {href && (
          <a
            className="shrink-0 text-xs text-muted-foreground link-underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on GitHub
          </a>
        )}
      </div>
      {children}
    </Reveal>
  )
}

function Repo() {
  return (
    <Slide>
      <Kicker>03 · Handoff / the repo</Kicker>
      <Title>The prototype was the spec. The repo was the handoff.</Title>
      <Lede>
        Engineering got one repository: the prototype that shows every screen
        and state, and three short documents beside it, each with one job. The
        Figma file mirrors the prototype under the same names, for review and
        annotation.
      </Lede>
      <Excerpt label="ap-handoff" href={REPO.repo}>
        <ul className="divide-y divide-line">
          {TREE.map(([path, job]) => (
            <li
              key={path}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3"
            >
              <span className="font-mono text-sm">{path}</span>
              <span className="text-sm text-muted-foreground">{job}</span>
            </li>
          ))}
        </ul>
      </Excerpt>
      <HairlineGrid columns={3}>
        <Card label="Rule 01" title="The prototype wins.">
          When a document and the prototype disagree, the prototype is right and
          the document gets corrected.
        </Card>
        <Card label="Rule 02" title="Point, don’t restate.">
          The documents link to a screen and its state instead of describing it
          again, so there is nothing to keep in sync.
        </Card>
        <Card label="Rule 03" title="Changes leave a trail.">
          Every change gets a changelog line, and every new behaviour gets a row
          in the test plan.
        </Card>
      </HairlineGrid>
      <LinkRow>
        <LinkOut href={REPO.repo} variant="default">
          Open the repo
        </LinkOut>
        <LinkOut href={REPO.prototype}>Open the prototype</LinkOut>
        <LinkOut href={REVIEW_LINKS.figma}>Figma file</LinkOut>
      </LinkRow>
    </Slide>
  )
}

/** The handoff's feature breakdown, condensed from docs/01-handoff.md. */
const FEATURES: {
  id: string
  name: string
  who: string
  journey: string[]
  logic: string[]
  navigate: string[]
  files: string[]
}[] = [
  {
    id: "F1",
    name: "Setup",
    who: "Instructor",
    journey: [
      "Opens the assignment in the editor",
      "Turns on AuthorProof and picks the questions, time and retakes",
      "Saves; every submission now gets a quiz",
    ],
    logic: [
      "3 to 5 questions, default 5, each from the student’s essay",
      "5, 10 or 15 minutes, starting when the quiz appears",
      "Second attempt off by default; a retake draws new questions",
      "Changing a setting starts the quiz over",
    ],
    navigate: [
      "flow.html → 1 · Setup",
      "Change a setting; the summary updates",
      "Save and view as the student",
    ],
    files: [
      "prototype/js/flow.js · renderSetup",
      "Figma · Student flow 01",
      "Test plan · SF-02, SF-03, RS-03",
    ],
  },
  {
    id: "F2",
    name: "Submit and quiz",
    who: "Student",
    journey: [
      "Opens the assignment and uploads the essay",
      "Sees the quiz appear on the same page, seconds later",
      "Answers within the limit and submits",
      "Reads that it is not a grade; retakes if allowed",
    ],
    logic: [
      "No notification and no second place to go",
      "As many questions as the setup asks for",
      "Submit disabled until one answer; blanks submit as “No answer”",
      "A retake is offered only when the setup allows one",
    ],
    navigate: ["flow.html → 2 · Student → Upload", "Answer, then Submit quiz"],
    files: [
      "prototype/js/flow.js · startUpload, renderStudent",
      "Figma · Student flow 02 to 05",
      "Test plan · SF-01, SF-04 to SF-06",
    ],
  },
  {
    id: "F3",
    name: "Result",
    who: "Instructor",
    journey: [
      "Opens the submission to grade, as they already do",
      "Reads the result beside the essay",
      "Checks a question against its passage",
      "Decides what to do, including talking to the student",
    ],
    logic: [
      "Confidence is a word: High at 80% matched, Medium at 50%",
      "Each question sits beside the passage it came from",
      "Badges are words with an icon, never pass or fail",
    ],
    navigate: [
      "Take the quiz, then View as the instructor",
      "Or open 3 · Result for the sample",
    ],
    files: [
      "prototype/js/flow.js · renderResult",
      "prototype/js/ui.js · confidence",
      "Test plan · RS-01 to RS-03",
    ],
  },
  {
    id: "F4",
    name: "Emails",
    who: "Student, briefed flow",
    journey: [
      "Submits the essay",
      "Gets the ready email ten minutes later and goes to find the quiz",
      "Gets a reminder, then a receipt or a closed notice",
    ],
    logic: [
      "Reminder only if the quiz has not been started",
      "Second-attempt email only when retakes are on",
      "Window closed is neutral, never a failure",
    ],
    navigate: ["emails.html", "Pick a state above the email"],
    files: [
      "prototype/js/emails.js",
      "Figma · Emails",
      "Test plan · EM-01 to EM-05",
    ],
  },
  {
    id: "F5",
    name: "Grading view",
    who: "Instructor",
    journey: [
      "Opens SpeedGrader on a submission",
      "Reads AuthorProof’s results before grading",
      "Selects a question to see its passage in the paper",
      "Grades on the right without leaving the view",
    ],
    logic: [
      "Selecting a question marks and scrolls to its passage",
      "Selecting it again clears the mark",
      "The similarity score is a neutral badge, never a pass",
    ],
    navigate: ["grading.html → As pitched → Question 4", "Then As built"],
    files: [
      "prototype/js/grading.js",
      "Figma · Grading view",
      "Test plan · GV-01 to GV-05",
    ],
  },
]

function Column({
  label,
  items,
  ordered,
  mono,
}: {
  label: string
  items: string[]
  ordered?: boolean
  mono?: boolean
}) {
  const List = ordered ? "ol" : "ul"
  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <List
        className={cn(
          "flex flex-col gap-1.5 text-sm/relaxed text-pretty",
          ordered ? "list-decimal pl-4" : "list-disc pl-4",
          mono && "list-none pl-0 font-mono text-xs/relaxed"
        )}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </div>
  )
}

function Decisions() {
  return (
    <Slide>
      <Kicker>Handoff / 01 · what and why</Kicker>
      <Title>The handoff was a feature breakdown.</Title>
      <Lede>
        For every feature: the user journey through it, the business logic it
        has to follow, how to walk the prototype to see it, and links to every
        related file. The principles and decisions sat underneath.
      </Lede>
      <Excerpt
        label="docs/01-handoff.md · Feature breakdown"
        href={`${REPO.handoff}#feature-breakdown`}
      >
        {/* Arrow keys move between the tabs here, not the slides. */}
        <div onKeyDown={(event) => event.stopPropagation()}>
          <Tabs defaultValue="F2">
            <TabsList className="overflow-x-auto px-4">
              {FEATURES.map((f) => (
                <TabsTrigger key={f.id} value={f.id}>
                  {f.id} · {f.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {FEATURES.map((f) => (
              <TabsContent key={f.id} value={f.id}>
                <div className="grid divide-line max-md:divide-y md:grid-cols-2 md:[&>*]:border-line md:[&>*:nth-child(-n+2)]:border-b md:[&>*:nth-child(odd)]:border-r">
                  <Column
                    label={`User journey · ${f.who}`}
                    items={f.journey}
                    ordered
                  />
                  <Column label="Business logic" items={f.logic} />
                  <Column
                    label="Navigate the prototype"
                    items={f.navigate}
                    ordered
                  />
                  <Column label="Related files" items={f.files} mono />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Excerpt>
    </Slide>
  )
}

function Style() {
  return (
    <Slide>
      <Kicker>Handoff / 02 · how it looks</Kicker>
      <Title>One name in the code, the Figma file and the docs.</Title>
      <Lede>
        Tokens and components carry the same name everywhere, and the style
        guide says what each one is for. Engineers build with the name, never
        the hex, and the rule that matters lives in the component.
      </Lede>
      <Excerpt label="docs/02-style-guide.md" href={REPO.styleGuide}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="text-xs tracking-wide text-muted-foreground uppercase">
              <tr className="border-b border-line">
                <th className="px-4 py-2 font-normal">Code</th>
                <th className="px-4 py-2 font-normal">Figma</th>
                <th className="px-4 py-2 font-normal">The rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                [
                  "--success-subtle",
                  "Color / success-subtle",
                  "Only behind “Matches”, never as a pass.",
                ],
                [
                  ".badge--neutral",
                  "Badge · tone=Neutral",
                  "The similarity score, so it can’t read as cleared.",
                ],
                [
                  ".notice--neutral",
                  "Notice · tone=Neutral",
                  "The closed-window email: a missed quiz is not a failure.",
                ],
              ].map(([code, figma, rule]) => (
                <tr key={code}>
                  <td className="px-4 py-3 font-mono text-xs">{code}</td>
                  <td className="px-4 py-3 text-muted-foreground">{figma}</td>
                  <td className="px-4 py-3 text-pretty">{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Excerpt>
      <HairlineGrid>
        <Card label="Copy that ships word for word">
          “It is not a grade, and it does not pass or fail you.” Changing it is
          a product decision, not an implementation detail, and the guide says
          so.
        </Card>
        <Card label="Accessibility, written in">
          Results never depend on color alone, focus is always visible, and
          motion respects reduced-motion settings, all stated as rules rather
          than left to review.
        </Card>
      </HairlineGrid>
    </Slide>
  )
}

function TestPlan() {
  return (
    <Slide>
      <Kicker>Handoff / 03 · how to know it’s right</Kicker>
      <Title>Behaviour written so a bug report can name it.</Title>
      <Lede>
        The test plan writes every behaviour as given, when, then, with an ID.
        Each row can be checked against the prototype, and a review comment can
        say <span className="whitespace-nowrap">“fails GV-01 on a phone”</span>{" "}
        instead of describing a screen.
      </Lede>
      <Excerpt label="docs/03-test-plan.md" href={REPO.testPlan}>
        <ul className="divide-y divide-line">
          {[
            [
              "SF-01",
              "The student is on the assignment",
              "They upload the essay",
              "The quiz appears on the same page within seconds",
            ],
            [
              "EM-04",
              "The window closed with no quiz",
              "The email is read",
              "The notice is neutral and the button is an outline",
            ],
            [
              "GV-01",
              "The grading view, as pitched",
              "The instructor selects question 4",
              "Its passage is marked in the paper and scrolled into view; on a phone, the page scrolls to it",
            ],
          ].map(([id, given, when, then]) => (
            <li
              key={id}
              className="grid gap-2 px-4 py-3 sm:grid-cols-[4.5rem_1fr]"
            >
              <span className="font-mono text-sm">{id}</span>
              <dl className="grid gap-1 text-sm/relaxed sm:grid-cols-3 sm:gap-4">
                {[
                  ["Given", given],
                  ["When", when],
                  ["Then", then],
                ].map(([term, text]) => (
                  <div key={term} className="flex flex-col gap-0.5">
                    <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                      {term}
                    </dt>
                    <dd className="text-pretty">{text}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </Excerpt>
      <HairlineGrid columns={3}>
        <Card label="For QA" title="A checklist with answers">
          Every row points at a state the prototype already shows.
        </Card>
        <Card label="For review" title="A shared vocabulary">
          Comments and bugs name a row, so nobody re-explains a screen.
        </Card>
        <Card label="For change" title="Behaviour has a home">
          A new behaviour isn’t done until it has a row.
        </Card>
      </HairlineGrid>
      <LinkRow>
        <LinkOut href={REPO.repo} variant="default">
          Walk the repo
        </LinkOut>
      </LinkRow>
    </Slide>
  )
}

export const HANDOFF_CONTENT: Record<
  string,
  ComponentType<{ slide: SlideType; data: SlideData }>
> = {
  repo: Repo,
  decisions: Decisions,
  style: Style,
  "test-plan": TestPlan,
}
