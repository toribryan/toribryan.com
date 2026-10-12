import type { Metadata } from "next"
import type { CollectionPage, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { SITE_INFO } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { AnimationsPauseToggle } from "@/components/animations-pause"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { DocCardList } from "@/features/doc/components/doc-card-list"
import { getWorkDocs } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

const title = "Projects"
// Search results and the page's JSON-LD only; the page itself shows no lead.
const description =
  "Case studies from product and design systems work: the problem, the decisions, and what shipped."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    url: "/projects",
    type: "website",
    images: [SITE_INFO.ogImage],
    videos: [SITE_INFO.ogVideo],
  },
}

function getProjectsJsonLd(projects: Doc[]): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/projects"),
    name: title,
    description,
    url: absoluteUrl("/projects"),
    author: { "@id": JSON_LD_ID.person },
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      "@id": absoluteUrl(`/work/${project.slug}`),
      name: project.metadata.title,
      url: absoluteUrl(`/work/${project.slug}`),
    })),
    isPartOf: { "@id": JSON_LD_ID.website },
  }
}

export default function Page() {
  // Every case study, fibo and Rabbit run included; the home page leaves
  // them out only because each has a section of its own there.
  const projects = getWorkDocs()

  return (
    <>
      <JsonLdScript data={getProjectsJsonLd(projects)} />
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: title, href: "/projects" },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>Work</PageHeadingTagline>
        <div className="relative">
          <PageHeadingTitle className="pr-14">Projects</PageHeadingTitle>
          <AnimationsPauseToggle className="absolute top-1/2 right-3 -translate-y-1/2" />
        </div>
      </PageHeading>

      <div className="px-2 pb-4">
        <DocCardList
          docs={projects}
          basePath="/work"
          emptyMessage="No projects published yet."
        />
      </div>
    </>
  )
}
