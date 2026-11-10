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
      <Kicker>Observations / across both</Kicker>
      <Title>Three things both projects have in common.</Title>
      <HairlineGrid columns={3}>
        <Card label="01" title="Test the brief before building it.">
          AuthorProof’s architecture was mapped against the platform before
          engineering spent a day. Modern Care Homes started with a teardown of
          the marketplaces that had already solved search.
        </Card>
        <Card label="02" title="Put the rule in the component.">
          Confidence is carried as text because color cannot be trusted. The
          accessibility floor is 18px and 48 by 48 because the component
          enforces it.
        </Card>
        <Card label="03" title="Ship what you design.">
          Prototypes engineering built from on AuthorProof. Storybook to pull
          request to preview on Modern Care Homes. Fewer handoffs mean fewer
          places for a decision to drift.
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
      <Kicker>Observations / for Avantos</Kicker>
      <Title>What you asked to see, and where it was.</Title>
      <HairlineGrid columns={3}>
        <Card label="01" title="Works alone.">
          AuthorProof went from an assigned brief to a production-ready MVP in
          four to six weeks, end to end. At Modern Care Homes I own everything a
          family or an agent sees, with one engineer on data.
        </Card>
        <Card label="02" title="At more than one altitude.">
          At the top, moving where AuthorProof lives instead of how a screen
          looks. At the bottom, a care camera that panned at 23fps until it ran
          at 60.
        </Card>
        <Card label="03" title="AI already in the work.">
          Skills a whole design team adopted, a design system agents have to
          pass, and prototypes in code that engineering builds from.
        </Card>
      </HairlineGrid>
      <StatRow>
        <Stat value="4 to 6 wks" label="AuthorProof, concept to MVP" />
        <Stat
          value="<30 min"
          label="Spec production, down from 3 days to 2 weeks"
        />
        <Stat value="100%" label="Design team adoption of the shared skills" />
        <Stat value="60fps" label="Care camera while it pans, up from 23" />
      </StatRow>
      <LinkRow>
        <LinkOut href={REVIEW_LINKS.authorProof.caseStudy}>AuthorProof</LinkOut>
        <LinkOut href={REVIEW_LINKS.homeListingOnboarding}>
          Home Listing Onboarding
        </LinkOut>
        <LinkOut href={REVIEW_LINKS.designSkills}>
          Design Skills Infrastructure
        </LinkOut>
        <LinkOut href={REVIEW_LINKS.agenticDesignSystem}>
          Agentic Design System
        </LinkOut>
      </LinkRow>
    </Slide>
  )
}

function Thanks() {
  return (
    <Slide className="gap-6">
      <Kicker>Observations / thank you</Kicker>
      <Title size="xl">Questions?</Title>
      <Lede>Everything from today in one place. Open whichever is useful.</Lede>
      <Reveal>
        <ul className="screen-line-top screen-line-bottom grid gap-x-8 divide-y divide-line sm:grid-cols-2">
          {[
            ["Portfolio", REVIEW_LINKS.portfolio],
            ["AuthorProof case study", REVIEW_LINKS.authorProof.caseStudy],
            ["AuthorProof product page", REVIEW_LINKS.authorProof.product],
            ["Modern Care Homes, live", REVIEW_LINKS.modernCareHomes.live],
            [
              "Modern Care Homes case study",
              REVIEW_LINKS.modernCareHomes.caseStudy,
            ],
            [
              "Home Listing Onboarding case study",
              REVIEW_LINKS.homeListingOnboarding,
            ],
            ["Design Skills Infrastructure", REVIEW_LINKS.designSkills],
            ["Agentic Design System", REVIEW_LINKS.agenticDesignSystem],
            [
              "Modern Care Homes Storybook",
              REVIEW_LINKS.modernCareHomes.storybook,
            ],
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
