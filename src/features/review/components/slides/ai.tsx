"use client"

import type { ComponentType } from "react"

import { REVIEW_LINKS } from "@/features/review/data/links"
import type { SlideData, Slide as SlideType } from "@/features/review/types"

import {
  Card,
  Flow,
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

function Workflow() {
  return (
    <Slide>
      <Kicker>03 · AI in my workflow / where it sits</Kicker>
      <Title>AI sits in every phase of my work, not only the last one.</Title>
      <Lede>
        At Proctorio I gave the design team one shared way to run each phase: a
        Claude Code skill per phase, grounded in our brand goals and product
        context, in one repository every designer cloned.
      </Lede>
      <Reveal>
        <Flow
          stages={[
            {
              label: "Research",
              detail:
                "/research-synthesis turns raw interview notes into findings",
            },
            {
              label: "Copy",
              detail: "/ux-copy drafts the interface copy on brand",
            },
            {
              label: "Prototype",
              detail: "Built in Claude Code, and it stays the source of truth",
            },
            {
              label: "Spec",
              detail: "/write-spec turns the prototype into the spec",
            },
            {
              label: "Handoff",
              detail: "/handoff packages it and logs later changes",
            },
          ]}
        />
      </Reveal>
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
        <Card label="What engineering gets">
          The three documents you just saw: the handoff, the style guide, and
          the test plan. I shaped the format through feedback loops with
          engineers, keeping what helped them build.
        </Card>
        <Card label="What stays mine">
          The prototype, and the judgment in it. The specs follow the prototype
          instead of being kept up beside it.
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

function Tools() {
  return (
    <Slide>
      <Kicker>03 · AI in my workflow / tools I built</Kicker>
      <Title>I build my own tools, and checks an agent has to pass.</Title>
      <HairlineGrid>
        <Card label="Research" title="What a model does left alone">
          Run with Proctorio’s lead front-end engineer: same design, same
          prompt, changing only how much of our component library the model
          could see. Left alone it rebuilt components from scratch and hardcoded
          the colors it could see.
        </Card>
        <Card label="fibo" title="A component kit an agent has to pass">
          My own open source kit, built solo with Claude Code. Lint, Figma
          drift, build, types, tests and an accessibility check run on every
          pull request. An agent added a voice memo component and the pull
          request came in complete, with 396 passing tests.
        </Card>
        <Card label="AuthorProof" title="The rebuild you just used">
          The original files are under NDA, so I rebuilt the flow in code with
          Claude Code on my own components: three views, sample data, and the
          decisions from the product.
        </Card>
        <Card label="This deck" title="Built the same way">
          This deck and the site around it run on fibo’s parts, and I build all
          of it with Claude Code.
        </Card>
      </HairlineGrid>
      <HairlineGrid>
        <Card label="What I learned" title="Checks beat docs.">
          Every early fix was something I handed the agent, and nothing checked
          whether it listened. Rules an agent can run and fix against hold.
          Rules it is only told about do not.
        </Card>
        <Card label="What a person still does" title="Taste and fit.">
          An agent can draft most of a component’s metadata. The last part, the
          things a team learned the hard way, a person has to write.
        </Card>
      </HairlineGrid>
      <LinkRow>
        <LinkOut href={REVIEW_LINKS.agenticDesignSystem}>
          Agentic Design System
        </LinkOut>
        <LinkOut href={REVIEW_LINKS.fibo}>fibo</LinkOut>
      </LinkRow>
    </Slide>
  )
}

export const AI_CONTENT: Record<
  string,
  ComponentType<{ slide: SlideType; data: SlideData }>
> = {
  workflow: Workflow,
  tools: Tools,
}
