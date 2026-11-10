"use client"

import type { ComponentType } from "react"

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
  Steps,
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

function Decisions() {
  return (
    <Slide>
      <Kicker>Handoff / 01 · what and why</Kicker>
      <Title>Every decision written down, with what it cost.</Title>
      <Lede>
        The handoff opens with the principles that don’t bend, then records each
        decision: what was chosen, why, and what it cost. It is there so a
        well-meant fix doesn’t undo a deliberate choice.
      </Lede>
      <Steps
        items={[
          {
            title: "No pass or fail.",
            body: "A result ships with a confidence level; the instructor decides what to do with it.",
          },
          {
            title: "Every score traces back to the student’s own words.",
            body: "Each question sits beside the passage it came from, so the AI’s reasoning can be checked.",
          },
          {
            title: "Never color alone.",
            body: "The host colors its badge the opposite way from the score, so results always read as words.",
          },
          {
            title: "Nothing added to the instructor’s grading workflow.",
          },
        ]}
      />
      <Excerpt label="docs/01-handoff.md · D2" href={REPO.handoff}>
        <dl className="grid divide-y divide-line">
          {[
            [
              "Chose",
              "AuthorProof’s results on the left of SpeedGrader, the paper in the middle, the grading panel on the right, unchanged.",
            ],
            [
              "Why",
              "The instructor checks the AI against the paper without leaving the grading view, and nothing they already trust moves.",
            ],
            ["Built instead", "The results panel on its own."],
            ["Cost of that", "Two places to read before one grade."],
          ].map(([term, text]) => (
            <div
              key={term}
              className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"
            >
              <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                {term}
              </dt>
              <dd className="text-sm/relaxed text-pretty">{text}</dd>
            </div>
          ))}
        </dl>
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
