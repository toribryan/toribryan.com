"use client"

import type { ComponentType } from "react"
import Image from "next/image"
import { motion } from "motion/react"

import { TextReveal } from "@/components/ui/text-reveal"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/base/ui/tabs"
import { AuthorProofGrader } from "@/features/review/components/author-proof-grader"
import { AuthorProofPrototype } from "@/features/review/components/author-proof-prototype"
import { AuthorProofRadar } from "@/features/review/components/author-proof-radar"
import { PinnedFlow } from "@/features/review/components/pinned-flow"
import { ProctorioLogo } from "@/features/review/components/proctorio-logo"
import { SuiteReel } from "@/features/review/components/suite-reel"
import {
  BRIEFED_JOURNEYS,
  BRIEFED_STEPS,
  CONSTRAINT_STATS,
  PITCHED_STEPS,
  SUITES,
} from "@/features/review/data/author-proof"
import { REVIEW_LINKS } from "@/features/review/data/links"
import type { SlideData, Slide as SlideType } from "@/features/review/types"

import {
  Card,
  EASE,
  Frame,
  HairlineGrid,
  Kicker,
  Lede,
  LinkOut,
  LinkRow,
  Reveal,
  Slide,
  Stack,
  Stat,
  StatRow,
  Steps,
  Title,
} from "../slide-primitives"

function Suite() {
  return (
    <Slide>
      <Kicker>01 · AuthorProof / where it sits</Kicker>
      <Title>Three suites, and one new product I took from brief to MVP.</Title>
      <Lede>
        At Proctorio I led cross-product design across three suites, for
        institutions and for proctoring agencies. The product I chose to walk
        through today comes from the Origin suite: AuthorProof.
      </Lede>
      <Reveal>
        <SuiteReel items={SUITES} />
      </Reveal>
    </Slide>
  )
}

function Cover() {
  return (
    <Slide className="flex-1 justify-center">
      <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr]">
        <Stack>
          <Kicker>01 · The project</Kicker>
          <Reveal>
            <ProctorioLogo className="h-7 w-auto text-foreground" />
          </Reveal>
          <Title size="xl">AuthorProof</Title>
          <Lede>
            Plagiarism checkers read the document. This one asks the student
            about the paper they turned in.
          </Lede>
          <LinkRow>
            <LinkOut href={REVIEW_LINKS.authorProof.product}>
              Product page
            </LinkOut>
            <LinkOut href={REVIEW_LINKS.authorProof.caseStudy}>
              Full case study
            </LinkOut>
          </LinkRow>
        </Stack>
        <Reveal>
          <Frame>
            <video
              className="aspect-square w-full rounded-xl bg-surface object-cover"
              src="/images/review/authorproof-cover.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-label="AuthorProof in motion"
            />
          </Frame>
        </Reveal>
      </div>
    </Slide>
  )
}

function Task() {
  return (
    <Slide>
      <Kicker>AuthorProof / task</Kicker>
      <Stack className="gap-2">
        <Title>
          The task that landed on my desk: prove the work is theirs.
        </Title>
        <Lede>
          A new AI product in the Origin suite: verify authorship of written
          work with a quiz generated from the student’s own submission, inside
          the instructor’s existing Canvas workflow.
        </Lede>
      </Stack>
      <HairlineGrid columns="1fr 1.4fr">
        <Reveal className="flex flex-col justify-center gap-2 px-6 py-4">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            The gap
          </p>
          <p className="font-heading text-2xl/tight font-medium text-balance md:text-3xl/tight">
            Every existing tool answers “is this original?”
          </p>
          <p className="text-base/relaxed text-pretty text-muted-foreground md:text-lg/relaxed">
            None of them answer the question instructors actually have: did you
            write this?
          </p>
        </Reveal>
        <Reveal className="p-2">
          <AuthorProofRadar className="aspect-[4/3] w-full" />
        </Reveal>
      </HairlineGrid>
      <Steps
        items={[
          {
            title: "No binary pass or fail.",
            body: "A score ships with a confidence level. The instructor decides what to do with it.",
          },
          {
            title: "Transparency into what was evaluated.",
            body: "Every generated question sits beside the student’s own words that prompted it and beside the assessment of the answer, so a score traces back to something a person can read.",
          },
        ]}
      />
    </Slide>
  )
}

const THESIS =
  "If a student submits an essay, they should be able to answer questions about what they wrote."

/** When the thesis starts arriving, and how long the words take to land. */
const THESIS_DELAY = 0.6
const THESIS_DURATION = 2.4

function Thesis() {
  const settled = THESIS_DELAY + THESIS_DURATION + 0.4

  return (
    <Slide className="flex-1 justify-center gap-6">
      <Kicker>AuthorProof / statement</Kicker>
      <HairlineGrid columns="3fr 2fr">
        <div className="flex flex-col justify-center gap-6 px-6 py-4">
          <Reveal>
            <p className="text-sm text-muted-foreground">thesis:</p>
          </Reveal>
          <h2 className="font-heading text-3xl/tight font-medium tracking-normal text-balance md:text-4xl/tight">
            <TextReveal
              text={THESIS}
              startOnView={false}
              delay={THESIS_DELAY}
              stagger={0.09}
              maxDuration={THESIS_DURATION}
            />
          </h2>
          <motion.p
            className="font-heading text-3xl text-muted-foreground md:text-4xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: settled, ease: EASE }}
          >
            …right?
          </motion.p>
        </div>
        <motion.div
          className="flex items-center justify-center p-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: settled + 0.2, ease: EASE }}
        >
          <Image
            className="w-full max-w-72"
            src="/images/review/thesis-visual.svg"
            alt="A pixel-art pug with a lit bulb over its head, beside a small crab"
            width={400}
            height={329}
            unoptimized
          />
        </motion.div>
      </HairlineGrid>
    </Slide>
  )
}

function Brief() {
  return (
    <Slide>
      <Kicker>AuthorProof / the brief as it arrived</Kicker>
      <Title>The architecture I was handed for the first concept.</Title>
      <Stack className="gap-3">
        {BRIEFED_JOURNEYS.map((journey) => (
          <Reveal key={journey.label}>
            <PinnedFlow label={journey.label} steps={journey.steps} />
          </Reveal>
        ))}
      </Stack>
    </Slide>
  )
}

function Constraints() {
  return (
    <Slide>
      <Kicker>AuthorProof / four constraints</Kicker>
      <Title>Sounded great, but I identified a few problems…</Title>
      <HairlineGrid>
        <Card label="01 · Tooling" title="Quiz tooling is one-to-many">
          A quiz is authored once and assigned to a class. A fresh quiz per
          submission fights that at every step and gets fragile when a whole
          class submits at once.
        </Card>
        <Card
          label="02 · Timing"
          title="Ten minutes is the whole attack window"
        >
          Fetch, generate, create, assign, notify. The gap is exactly the time a
          student needs to pull the essay back up, so the architecture worked
          against the one thing the product had to prove.
        </Card>
        <Card label="03 · Notifications" title="Students turn them off">
          Inboxes go unchecked, and email timing varies by institution. The
          fallback would have been “instructors remind students,” which lands
          the burden on the person we were trying to help.
        </Card>
        <Card label="04 · Grading" title="Two disconnected things to grade">
          A separate quiz item means the submission and the quiz live in
          different places, with no unified view for the instructor.
        </Card>
      </HairlineGrid>
      <StatRow>
        {CONSTRAINT_STATS.map((stat) => (
          <Stat key={stat.value} value={stat.value} label={stat.label} />
        ))}
      </StatRow>
    </Slide>
  )
}

function Pivot() {
  return (
    <Slide>
      <Kicker>AuthorProof / the pivot</Kicker>
      <Title>
        A revised solution: a smaller, tighter flow that kept the promise.
      </Title>
      <Reveal>
        <Tabs defaultValue="pitched">
          <TabsList>
            <TabsTrigger value="briefed">As briefed</TabsTrigger>
            <TabsTrigger value="pitched">As pitched</TabsTrigger>
          </TabsList>
          <TabsContent value="briefed">
            <PinnedFlow steps={BRIEFED_STEPS} />
          </TabsContent>
          <TabsContent value="pitched">
            <PinnedFlow steps={PITCHED_STEPS} />
          </TabsContent>
        </Tabs>
      </Reveal>
      <HairlineGrid>
        <Card label="What the pivot bought" title="One move, three constraints">
          It collapsed the timing gap, removed the notification dependency, and
          stepped out of the quiz tooling entirely, which left the instructor
          one thing to read.
        </Card>
        <Card label="What it cost" title="Named before engineering found it">
          Short pieces written directly in the LMS editor were excluded, and how
          proctoring coexists with the embedded flow stayed an open question.
        </Card>
      </HairlineGrid>
    </Slide>
  )
}

function Prototype() {
  return (
    <Slide>
      <Kicker>AuthorProof / the flow, rebuilt</Kicker>
      <Title>Try it: upload an essay, and the quiz is already there.</Title>
      <Lede>
        The original design files are under NDA, so I rebuilt the flow in code
        for this walkthrough. The screens are new. The decisions are the ones I
        made on the product.
      </Lede>
      <Reveal>
        <AuthorProofPrototype />
      </Reveal>
      <HairlineGrid columns={3}>
        <Card label="Setup" title="Every control explained">
          Each setting says what it changes for the student, so an instructor
          never has to guess what a control does.
        </Card>
        <Card label="Student" title="No notification to miss">
          The quiz appears inside the assignment, seconds after upload, with no
          second place to go and find it.
        </Card>
        <Card label="Result" title="A score someone can check">
          Every question sits beside the student’s own words and the assessment
          of the answer. Confidence is a word, never a color alone.
        </Card>
      </HairlineGrid>
    </Slide>
  )
}

function Review() {
  return (
    <Slide>
      <Kicker>AuthorProof / the reviewing side</Kicker>
      <Title>Grade the paper and read the quiz in one place.</Title>
      <Lede>
        I pitched putting AuthorProof inside SpeedGrader, where instructors
        already grade: the quiz results on the left, the paper in the middle,
        and the grading panel they already trust on the right. What was built is
        the results panel on its own.
      </Lede>
      <Reveal>
        <AuthorProofGrader />
      </Reveal>
      <HairlineGrid columns={3}>
        <Card label="Why the left" title="Results before the grade">
          The instructor reads what the student could answer before deciding on
          a grade, not after.
        </Card>
        <Card label="Why the middle" title="Every question points home">
          Selecting a question marks the passage it came from, so the AI’s
          reasoning is checked against the paper itself.
        </Card>
        <Card label="Why the right" title="Nothing they trust removed">
          The grading panel and the similarity badge stay as they are.
          AuthorProof answers a second question beside the first.
        </Card>
      </HairlineGrid>
    </Slide>
  )
}

function Shipped() {
  return (
    <Slide>
      <Kicker>AuthorProof / shipped</Kicker>
      <Stack>
        <Title>The prototype was the spec.</Title>
        <Lede>
          Concept to production-ready MVP in four to six weeks. I designed the
          quiz settings, the report card, the quiz results, and the emails
          students receive, and built working prototypes of all of it in HTML,
          CSS, and vanilla JavaScript. Engineering built from the prototypes,
          not from a document about them.
        </Lede>
      </Stack>
      <HairlineGrid>
        <Card label="Proof of concept" title="The briefed idea shipped first">
          The Canvas quiz architecture from the brief became the proof of
          concept: the fastest way to put a working product in front of pilot
          instructors.
        </Card>
        <Card label="Long-term vision" title="The pivot became the roadmap">
          The embedded flow I proposed was adopted as the official long-term
          vision for the product, with the quiz appearing inside the assignment
          seconds after upload.
        </Card>
      </HairlineGrid>
      <StatRow>
        <Stat value="~5" label="Institutions in the spring 2026 pilot" />
        <Stat value="4 to 6 wks" label="Concept to production-ready MVP" />
        <Stat
          value="0"
          label="Steps added to the instructor’s grading workflow"
        />
        <Stat
          value="95% / <5%"
          label="First-semester goals: quiz completion and false positives"
        />
      </StatRow>
      <Reveal>
        <p className="max-w-2xl font-heading text-xl/tight font-medium text-balance md:text-2xl/tight">
          Sweeping positive feedback from customers on the new product concept.
        </p>
      </Reveal>
      <LinkRow>
        <LinkOut href={REVIEW_LINKS.authorProof.product} variant="default">
          Product page
        </LinkOut>
        <LinkOut href={REVIEW_LINKS.authorProof.caseStudy}>
          Full case study
        </LinkOut>
      </LinkRow>
    </Slide>
  )
}

function Overruled() {
  return (
    <Slide>
      <Kicker>AuthorProof / overruled</Kicker>
      <Title>I was overruled on what shipped first.</Title>
      <Lede>
        I pitched the embedded flow as the MVP. Proctorio shipped the briefed
        architecture first, as the fastest way to put a working product in front
        of pilot instructors, and adopted the embedded flow as the product’s
        long-term direction.
      </Lede>
      <HairlineGrid>
        <Card label="The hole in my pitch" title="Proctoring was still open">
          How proctoring would work alongside the embedded flow was an open
          question when the direction was decided. I had flagged it, but I had
          not answered it.
        </Card>
        <Card
          label="What I would do differently"
          title="Test it with proctoring sooner"
        >
          Prototype the embedded flow beside a proctored session before the
          direction decision, not after.
        </Card>
      </HairlineGrid>
      <Reveal>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          What I would design next
        </p>
      </Reveal>
      <Steps
        items={[
          {
            title: "Let instructors review questions.",
            body: "Before a generated quiz reaches a student.",
          },
          {
            title: "Pick the quiz language.",
            body: "Beyond the default of the submission’s language.",
          },
        ]}
      />
    </Slide>
  )
}

export const AUTHOR_PROOF_CONTENT: Record<
  string,
  ComponentType<{ slide: SlideType; data: SlideData }>
> = {
  suite: Suite,
  cover: Cover,
  task: Task,
  thesis: Thesis,
  brief: Brief,
  constraints: Constraints,
  pivot: Pivot,
  prototype: Prototype,
  review: Review,
  shipped: Shipped,
  overruled: Overruled,
}
