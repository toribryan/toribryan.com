import type { Metadata } from "next"

import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { routePreview } from "@/lib/og"
import { Components } from "@/features/portfolio/components/components"
import { FiboHero } from "@/features/portfolio/components/fibo-hero"
import { FiboStory } from "@/features/portfolio/components/fibo-story"

const title = "fibo"
const description =
  "The story behind fibo: a pixel rabbit, and the puzzle that started the Fibonacci sequence."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/fibo" },
  openGraph: {
    url: "/fibo",
    type: "website",
    ...routePreview("/fibo", title),
  },
  twitter: {
    card: "summary_large_image",
    images: routePreview("/fibo", title).images,
  },
}

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: title, href: "/fibo" },
        ])}
      />

      <FiboHero variant="page" />
      <div className="stripe-divider h-8 w-full" />
      <FiboStory />
      {/* The parts themselves, so the story ends somewhere to go next. */}
      <div className="stripe-divider h-8 w-full" />
      <Components />
      <div className="h-4" />
    </>
  )
}
