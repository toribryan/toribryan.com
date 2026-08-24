import type { Metadata, Route } from "next"
import { notFound, redirect } from "next/navigation"
import type { TechArticle, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { DocPage } from "@/features/doc/components/doc-page"
import { getComponentDocs, getDocBySlug } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  return getComponentDocs().map((doc) => ({ slug: doc.slug }))
}

function findComponentDoc(slug: string) {
  const doc = getDocBySlug(slug)
  return doc && doc.metadata.category === "components" ? doc : undefined
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const doc = findComponentDoc(slug)

  if (!doc) {
    return notFound()
  }

  const { title, brand, description, image, createdAt, updatedAt } =
    doc.metadata
  const url = `/components/${doc.slug}`
  // The doc title is a short brand name ("Iron"); the full name disambiguates
  // it in search results and social cards.
  const metaTitle = brand && brand !== title ? `${title} — ${brand}` : title

  return {
    title: metaTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      type: "article",
      publishedTime: new Date(createdAt).toISOString(),
      modifiedTime: new Date(updatedAt).toISOString(),
      ...(image && {
        images: { url: image, width: 1200, height: 630, alt: metaTitle },
      }),
    },
  }
}

function getTechArticleJsonLd(doc: Doc): WithContext<TechArticle> {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": absoluteUrl(`/components/${doc.slug}`),
    headline: doc.metadata.title,
    description: doc.metadata.description,
    url: absoluteUrl(`/components/${doc.slug}`),
    datePublished: new Date(doc.metadata.createdAt).toISOString(),
    dateModified: new Date(doc.metadata.updatedAt).toISOString(),
    author: { "@id": JSON_LD_ID.person },
    isPartOf: {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/components"),
      name: "Components",
      url: absoluteUrl("/components"),
    },
  }
}

export default async function Page({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params
  const doc = findComponentDoc(slug)

  if (!doc) {
    notFound()
  }

  // A library whose story is told elsewhere has no page of its own. The doc
  // still exists so the Components list can render a row for it; the route
  // forwards to wherever that row points.
  if (doc.metadata.href) {
    redirect(doc.metadata.href as Route)
  }

  return (
    <>
      <JsonLdScript data={getTechArticleJsonLd(doc)} />
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Components", href: "/components" },
          { name: doc.metadata.title, href: `/components/${slug}` },
        ])}
      />

      <DocPage doc={doc} backHref="/components" backLabel="Components" />
    </>
  )
}
