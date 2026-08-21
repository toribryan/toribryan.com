import type { Metadata, Route } from "next"
import type { CollectionPage, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl, cn } from "@/lib/utils"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { ComponentMonogram } from "@/features/doc/components/component-monogram"
import { getComponentDocs } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

import {
  ComponentItem,
  ComponentItemDot,
  ComponentItemIcon,
  ComponentItemTitle,
} from "./component-item"

const title = "Components"
const description =
  "Design system work, one library per brand. Foundations first — components publish as they're built."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/components" },
  openGraph: { url: "/components", type: "website" },
}

function getCollectionPageJsonLd(docs: Doc[]): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/components"),
    name: title,
    description,
    url: absoluteUrl("/components"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: docs.length,
      itemListElement: docs.map((doc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: doc.metadata.title,
        url: absoluteUrl(`/components/${doc.slug}`),
      })),
    },
    isPartOf: { "@id": JSON_LD_ID.website },
  }
}

export default function Page() {
  const libraries = getComponentDocs()
    .slice()
    .sort((a, b) =>
      a.metadata.title.localeCompare(b.metadata.title, "en", {
        sensitivity: "base",
      })
    )

  return (
    <>
      <JsonLdScript data={getCollectionPageJsonLd(libraries)} />
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Components", href: "/components" },
        ])}
      />

      <div>
        <PageHeading>
          <PageHeadingTagline>Components</PageHeadingTagline>
          <PageHeadingTitle>One library per brand.</PageHeadingTitle>
          <PageHeadingDescription>{description}</PageHeadingDescription>
        </PageHeading>

        <div className="flex h-10 items-center pl-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            {libraries.length} libraries
          </h2>
        </div>

        <div className="screen-line-bottom h-px" />

        <ComponentList items={libraries} />

        <div className="screen-line-top h-4 before:-top-px" />
      </div>
    </>
  )
}

function ComponentList({ items }: { items: Doc[] }) {
  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 max-sm:hidden sm:grid-cols-2 md:grid-cols-3">
        <div className="border-r border-line" />
        <div className="border-r border-line max-md:hidden" />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {items.map((c) => (
          <li
            key={c.slug}
            className={cn(
              "max-sm:screen-line-bottom",
              "sm:max-md:nth-[2n+1]:screen-line-bottom",
              "md:nth-[3n+1]:screen-line-bottom"
            )}
          >
            <ComponentItem href={`/components/${c.slug}` as Route}>
              <ComponentItemIcon>
                <ComponentMonogram title={c.metadata.title} />
                {(c.metadata.new || c.metadata.updated) && (
                  <ComponentItemDot
                    aria-label={c.metadata.new ? "New" : "Updated"}
                  />
                )}
              </ComponentItemIcon>

              <div className="flex min-w-0 flex-1 flex-col">
                <ComponentItemTitle as="h3">
                  {c.metadata.title}
                </ComponentItemTitle>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {c.metadata.brand !== c.metadata.title
                    ? c.metadata.brand
                    : c.metadata.status}
                </p>
              </div>
            </ComponentItem>
          </li>
        ))}
      </ul>
    </div>
  )
}
