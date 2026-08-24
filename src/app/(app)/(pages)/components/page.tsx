import type { Metadata, Route } from "next"
import Image from "next/image"
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
import { ComponentItemComingSoon } from "./component-item-coming-soon"

const title = "Components"
const description = "Design System work I have designed and built"

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
        {/* `-mt-12` cancels the pt-12 the (pages) layout applies, so the banner
            sits flush under the site header. Scoped here rather than changed in
            the layout, which /latest shares. */}
        <figure className="screen-line-bottom relative -mt-12 h-[112px] overflow-hidden bg-[#1A1423]">
          <Image
            className="object-cover object-center"
            src="/images/blog/components-banner.webp"
            alt="A painted still life of flowers in a stone urn: poppies, roses, tulips and irises against a dark ground, with a pocket watch resting on the ledge."
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            priority
            unoptimized
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/50 to-transparent"
            aria-hidden
          />

          <figcaption className="pointer-events-none absolute right-2 bottom-2 text-sm leading-none tracking-wide text-white/80 select-none sm:right-4 sm:bottom-4">
            Abraham Mignon.
          </figcaption>
        </figure>

        <PageHeading className="pt-5">
          <PageHeadingTagline>Components</PageHeadingTagline>
          <PageHeadingTitle>Design Systems by Brand</PageHeadingTitle>
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
            {c.metadata.comingSoon ? (
              <ComponentItemComingSoon title={c.metadata.title}>
                <ComponentItemBody doc={c} />
              </ComponentItemComingSoon>
            ) : (
              <ComponentItem
                href={(c.metadata.href ?? `/components/${c.slug}`) as Route}
              >
                <ComponentItemBody doc={c} />
              </ComponentItem>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The row's contents, shared by the link and the coming-soon variants. */
function ComponentItemBody({ doc }: { doc: Doc }) {
  const m = doc.metadata

  return (
    <>
      <ComponentItemIcon>
        <ComponentMonogram title={m.title} />
        {(m.new || m.updated) && (
          <ComponentItemDot aria-label={m.new ? "New" : "Updated"} />
        )}
      </ComponentItemIcon>

      <div className="flex min-w-0 flex-1 flex-col">
        <ComponentItemTitle as="h3">{m.title}</ComponentItemTitle>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {m.brand !== m.title ? m.brand : m.status}
        </p>
      </div>
    </>
  )
}
