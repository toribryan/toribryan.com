"use client"

import type { ComponentType } from "react"

import { SkillsExplorer } from "@/features/review/components/skills-explorer"
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
  Stat,
  StatRow,
  Title,
} from "../slide-primitives"

function Agentic() {
  return (
    <Slide>
      <Kicker>01 · Process / end to end</Kicker>
      <Title>Every phase has a skill, and a reviewer guards it.</Title>
      <Lede>
        A router places the work on the phase map, loads each phase’s skill,
        runs the reviewer that guards it, and keeps a running log of decisions.
        The reviewers are read-only: they report failures and end in a verdict.
      </Lede>
      <Reveal>
        <SkillsExplorer repoUrl={REVIEW_LINKS.designSkillsRepo} />
      </Reveal>
      <StatRow>
        <Stat value="32" label="Skills, from discovery through shipped code" />
        <Stat value="7" label="Read-only reviewer agents" />
        <Stat value="7" label="Phases, routed by one process skill" />
        <Stat value="1" label="Project log of every decision" />
      </StatRow>
      <LinkRow>
        <LinkOut href={REVIEW_LINKS.designSkillsDocs} variant="default">
          Design skills in fibo
        </LinkOut>
        <LinkOut href={REVIEW_LINKS.designSkillsRepo}>On GitHub</LinkOut>
      </LinkRow>
    </Slide>
  )
}

function Team() {
  return (
    <Slide>
      <Kicker>01 · Process / with a team</Kicker>
      <Title>My last design team ran every stage on skills I built.</Title>
      <Lede>
        In my last role I built and maintained the Claude skills the design team
        used for every stage of their process, grounded in our brand and product
        context. Handoffs became prototype-forward: a GitHub repository with the
        prototype and its specs.
      </Lede>
      <StatRow>
        <Stat
          value="<30 min"
          label="Spec production, down from 3 days to 2 weeks"
        />
        <Stat
          value="80 hrs"
          label="Returned to design work per handoff cycle, at most"
        />
        <Stat value="100%" label="Adoption across the design team" />
        <Stat
          value="4 + 3 + 1"
          label="Validated with 4 designers, 3 engineers and 1 PM"
        />
      </StatRow>
      <HairlineGrid>
        <Card label="What engineering gets" title="A repo, not a file">
          The prototype, plus three short documents: the handoff, the style
          guide and the test plan. You’ll see one later in this walkthrough.
        </Card>
        <Card label="What stays mine" title="The judgment">
          The skills make every designer’s output consistent. The decisions in
          it are still a person’s.
        </Card>
      </HairlineGrid>
      <LinkRow>
        <LinkOut href={REVIEW_LINKS.designSkills}>
          Design Skills Infrastructure
        </LinkOut>
      </LinkRow>
    </Slide>
  )
}

function Today() {
  return (
    <Slide>
      <Kicker>01 · Process / today’s piece</Kicker>
      <Title>Why AuthorProof, and why it’s rebuilt.</Title>
      <HairlineGrid columns={3}>
        <Card label="My approach" title="Design-system forward">
          Most of my product work starts from the system: tokens, components,
          and the rules that live in them.
        </Card>
        <Card label="Today’s choice" title="A project I ran on my own">
          AuthorProof I worked through entirely on my own, at a company that
          valued high agency. It is the clearest picture of how I work alone.
        </Card>
        <Card label="What you’ll see" title="Rebuilds, under NDA">
          The original work is under NDA, so most of what follows is rebuilt:
          the prototype, the grading view and the handoff repo.
        </Card>
      </HairlineGrid>
    </Slide>
  )
}

export const PROCESS_CONTENT: Record<
  string,
  ComponentType<{ slide: SlideType; data: SlideData }>
> = {
  agentic: Agentic,
  team: Team,
  today: Today,
}
