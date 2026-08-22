import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { BlogPosting, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { DocPage } from "@/features/doc/components/doc-page"
import { getDocBySlug, getLatestPosts } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  return getLatestPosts().map((doc) => ({ slug: doc.slug }))
}

function findPost(slug: string) {
  const doc = getDocBySlug(slug)
  return doc && doc.metadata.category === "latest" ? doc : undefined
}

export async function generateMetadata({
  params,
}: PageProps<"/latest/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const doc = findPost(slug)

  if (!doc) {
    return notFound()
  }

  const { title, description, image, createdAt, updatedAt } = doc.metadata
  const url = `/latest/${doc.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      type: "article",
      publishedTime: new Date(createdAt).toISOString(),
      modifiedTime: new Date(updatedAt).toISOString(),
      ...(image && {
        images: { url: image, width: 1200, height: 630, alt: title },
      }),
    },
  }
}

function getBlogPostingJsonLd(doc: Doc): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/latest/${doc.slug}`),
    headline: doc.metadata.title,
    description: doc.metadata.description,
    url: absoluteUrl(`/latest/${doc.slug}`),
    datePublished: new Date(doc.metadata.createdAt).toISOString(),
    dateModified: new Date(doc.metadata.updatedAt).toISOString(),
    ...(doc.metadata.image && { image: doc.metadata.image }),
    author: { "@id": JSON_LD_ID.person },
    publisher: { "@id": JSON_LD_ID.person },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/latest/${doc.slug}`),
    },
  }
}

export default async function Page({ params }: PageProps<"/latest/[slug]">) {
  const { slug } = await params
  const doc = findPost(slug)

  if (!doc) {
    notFound()
  }

  return (
    <>
      <JsonLdScript data={getBlogPostingJsonLd(doc)} />
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/latest" },
          { name: doc.metadata.title, href: `/latest/${slug}` },
        ])}
      />

      <DocPage doc={doc} backHref="/latest" backLabel="Blog" />
    </>
  )
}
