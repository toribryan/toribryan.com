import type { Metadata } from "next"
import { format } from "date-fns"

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
import {
  recommendationId,
  RECOMMENDATIONS,
} from "@/features/portfolio/data/recommendations"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import type { Recommendation } from "@/features/portfolio/types/recommendations"

const title = "Recommendations"
const description =
  "What the people I've worked with wrote about me on LinkedIn, in full."

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
        <PageHeadingTagline>LinkedIn</PageHeadingTagline>
        <PageHeadingTitle>{title}</PageHeadingTitle>
        <PageHeadingDescription>{description}</PageHeadingDescription>
      </PageHeading>

      <div className="screen-line-bottom p-4">
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
      </div>

      <ol className="flex flex-col">
        {RECOMMENDATIONS.map((rec, index) => (
          <li
            key={rec.name}
            id={recommendationId(rec.name)}
            className="screen-line-bottom scroll-mt-[calc(var(--header-height)+1rem)] p-4"
          >
            <RecommendationItem {...rec} index={index} />
          </li>
        ))}
      </ol>
    </>
  )
}

const LINKEDIN_RECOMMENDATIONS = `${SOCIAL.linkedin.href}details/recommendations/`

function RecommendationItem({
  name,
  role,
  relationship,
  date,
  quote,
  text,
  profile,
  index,
}: Recommendation & { index: number }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")

  return (
    <article className="flex flex-col gap-4">
      <header className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-md bg-zinc-50/80 font-mono text-xs text-muted-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80"
        >
          {initials}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="leading-snug font-medium">
            {profile ? (
              <a
                href={profile}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </h2>
          <p className="text-sm leading-snug text-muted-foreground">
            {role} · {relationship}
          </p>
        </div>
        <div className="flex flex-col items-end font-mono text-xs leading-snug text-muted-foreground">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <time dateTime={date}>
            {format(new Date(`${date}-01T00:00:00`), "MMM yyyy")}
          </time>
        </div>
      </header>

      <blockquote
        cite={LINKEDIN_RECOMMENDATIONS}
        className="flex flex-col gap-3 text-pretty text-muted-foreground sm:pl-13"
      >
        {text ? (
          text
            .split("\n\n")
            .map((paragraph, i) => <p key={i}>{withQuote(paragraph, quote)}</p>)
        ) : (
          <p>
            …<Excerpt>{quote}</Excerpt>…
          </p>
        )}
      </blockquote>

      {!text && (
        <a
          href={LINKEDIN_RECOMMENDATIONS}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline sm:ml-13"
        >
          Read it in full on LinkedIn
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      )}
    </article>
  )
}

/** The excerpt quoted around the site, set off where it sits in the whole. */
function withQuote(paragraph: string, quote: string) {
  const at = paragraph.indexOf(quote)
  if (at === -1) return paragraph
  return (
    <>
      {paragraph.slice(0, at)}
      <Excerpt>{quote}</Excerpt>
      {paragraph.slice(at + quote.length)}
    </>
  )
}

function Excerpt({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-accent box-decoration-clone px-0.5 text-foreground">
      {children}
    </mark>
  )
}
