"use client"

import type { ComponentType } from "react"

import { TweetQuote } from "@/components/ui/tweet-card"
import { USER } from "@/features/portfolio/data/user"
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

/** What the post says, for when X does not answer. */
const TWEET_FALLBACK = {
  text: "Words don't do justice to the liberating feeling that comes with replacing the design-dev handoff with a PR review.",
  href: "https://x.com/iamtoribryan/status/2097051500044513414",
}

function Threads({ data }: { data: SlideData }) {
  return (
    <Slide>
      <Kicker>Wrap / three habits</Kicker>
      <Title>Three habits you just saw.</Title>
      <HairlineGrid columns={3}>
        <Card label="01" title="Test the brief before building it.">
          The briefed architecture was mapped and timed against the platform
          before engineering spent a day on it, and the map is what changed the
          product.
        </Card>
        <Card label="02" title="Build the decision into what ships.">
          Confidence reads as text because the host colors the badge the
          opposite way from the score. Every question sits beside the words it
          came from, so the AI’s reasoning can be checked.
        </Card>
        <Card label="03" title="Ship what you design.">
          Engineering built AuthorProof from working prototypes, not a document
          about them. Fewer handoffs mean fewer places for a decision to drift.
        </Card>
      </HairlineGrid>
      <Reveal className="max-w-2xl">
        {data.tweet ? (
          <TweetQuote tweet={data.tweet} avatar={USER.headerAvatar} />
        ) : (
          <figure className="flex flex-col gap-4 rounded-2xl border border-line bg-background p-6">
            <blockquote className="text-lg/relaxed">
              {TWEET_FALLBACK.text}
            </blockquote>
            <figcaption className="text-sm text-muted-foreground">
              <a
                className="link-underline"
                href={TWEET_FALLBACK.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {USER.displayName} on X
              </a>
            </figcaption>
          </figure>
        )}
      </Reveal>
    </Slide>
  )
}

function Role() {
  return (
    <Slide>
      <Kicker>Wrap / for Avantos</Kicker>
      <Title>What you asked to see, and where it was.</Title>
      <HairlineGrid columns={3}>
        <Card label="01" title="Works alone.">
          AuthorProof went from an assigned brief to a production-ready MVP in
          four to six weeks, with me as its designer end to end, handed off as
          one repo engineering built from.
        </Card>
        <Card label="02" title="At more than one altitude.">
          At the top, moving where the product lives instead of how a screen
          looks. At the bottom, a confidence badge that reads as text because
          the host colors it the wrong way.
        </Card>
        <Card label="03" title="AI already in the work.">
          An AI feature designed so its reasoning can be checked, skills a whole
          design team adopted, and the rebuild you just used.
        </Card>
      </HairlineGrid>
      <StatRow>
        <Stat value="4 to 6 wks" label="AuthorProof, brief to MVP" />
        <Stat
          value="Seconds"
          label="Upload to quiz in the pitched flow, down from about ten minutes"
        />
        <Stat
          value="<30 min"
          label="Spec production with the shared skills, down from days"
        />
        <Stat value="100%" label="Design team adoption of the skills" />
      </StatRow>
      <LinkRow>
        <LinkOut href={REVIEW_LINKS.authorProof.caseStudy}>
          AuthorProof case study
        </LinkOut>
        <LinkOut href={REVIEW_LINKS.handoff.repo}>Handoff repo</LinkOut>
        <LinkOut href={REVIEW_LINKS.designSkills}>
          Design Skills Infrastructure
        </LinkOut>
      </LinkRow>
    </Slide>
  )
}

function Thanks() {
  return (
    <Slide className="gap-6">
      <Kicker>Wrap / thank you</Kicker>
      <Title size="xl">Questions?</Title>
      <Lede>Everything from today in one place.</Lede>
      <Reveal>
        <ul className="screen-line-top screen-line-bottom grid gap-x-8 divide-y divide-line sm:grid-cols-2">
          {[
            ["Portfolio", REVIEW_LINKS.portfolio],
            ["AuthorProof case study", REVIEW_LINKS.authorProof.caseStudy],
            ["AuthorProof product page", REVIEW_LINKS.authorProof.product],
            ["Agentic Design System", REVIEW_LINKS.agenticDesignSystem],
            ["AuthorProof handoff repo", REVIEW_LINKS.handoff.repo],
            ["AuthorProof prototype", REVIEW_LINKS.handoff.prototype],
            ["fibo", REVIEW_LINKS.fibo],
            ["Design Skills Infrastructure", REVIEW_LINKS.designSkills],
            ["Résumé", REVIEW_LINKS.resume],
          ].map(([label, href]) => (
            <li key={href} className="py-3">
              <a
                className="text-base link-underline md:text-lg"
                href={href}
                target={
                  /^https?:|^\/storybook|\.pdf$/.test(href)
                    ? "_blank"
                    : undefined
                }
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Slide>
  )
}

export const OBSERVATIONS_CONTENT: Record<
  string,
  ComponentType<{ slide: SlideType; data: SlideData }>
> = {
  threads: Threads,
  role: Role,
  thanks: Thanks,
}
