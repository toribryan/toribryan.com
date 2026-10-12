import type { Metadata } from "next"

import { SITE_INFO } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { ArrowUpRightIcon } from "@/components/animated-icons/arrow-up-right-icon"
import { Button } from "@/components/base/ui/button"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { RecommendationCard } from "@/features/portfolio/components/recommendations/recommendation-card"
import { TweetWall } from "@/features/portfolio/components/recommendations/tweet-wall"
import {
  recommendationId,
  RECOMMENDATIONS,
} from "@/features/portfolio/data/recommendations"
import { SOCIAL } from "@/features/portfolio/data/social-links"

const title = "Recommendations"
const description = "What people have said about my work, on X and on LinkedIn."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recommendations" },
  openGraph: {
    url: "/recommendations",
    type: "website",
    images: [SITE_INFO.ogImage],
    videos: [SITE_INFO.ogVideo],
  },
}

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: title, href: "/recommendations" },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>Kind words</PageHeadingTagline>
        <PageHeadingTitle>{title}</PageHeadingTitle>
        <PageHeadingDescription>{description}</PageHeadingDescription>
      </PageHeading>

      <section aria-labelledby="on-x" className="screen-line-bottom">
        <h2 id="on-x" className="sr-only">
          On X
        </h2>
        <TweetWall />
      </section>

      <section aria-labelledby="on-linkedin">
        <header className="screen-line-bottom flex items-center justify-between gap-4 p-4">
          <h2 id="on-linkedin" className="font-heading text-2xl/9 font-medium">
            From LinkedIn
          </h2>
          <Button
            className="gap-1.5"
            variant="outline"
            size="sm"
            nativeButton={false}
            render={
              <a
                href={LINKEDIN_RECOMMENDATIONS}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            View on LinkedIn
            <ArrowUpRightIcon />
          </Button>
        </header>

        <ol className="grid sm:grid-cols-2">
          {RECOMMENDATIONS.map((recommendation, index) => (
            <li
              key={recommendation.name}
              id={recommendationId(recommendation.name)}
              className="screen-line-bottom scroll-mt-[calc(var(--header-height)+1rem)] sm:odd:border-r sm:odd:border-line"
            >
              <RecommendationCard
                recommendation={recommendation}
                index={index}
                linkedin={LINKEDIN_RECOMMENDATIONS}
              />
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

const LINKEDIN_RECOMMENDATIONS = `${SOCIAL.linkedin.href}details/recommendations/`
