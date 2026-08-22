import type { Metadata } from "next"
import type { Blog, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { DocList } from "@/features/doc/components/doc-list"
import { getLatestPosts } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

const title = "Blog"
const description =
  "Projects, creative retros, and notes from the work — the things worth writing down."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/latest" },
  openGraph: { url: "/latest", type: "website" },
}

function getBlogJsonLd(posts: Doc[]): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/latest"),
    name: title,
    description,
    url: absoluteUrl("/latest"),
    author: { "@id": JSON_LD_ID.person },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/latest/${post.slug}`),
      headline: post.metadata.title,
      datePublished: new Date(post.metadata.createdAt).toISOString(),
      url: absoluteUrl(`/latest/${post.slug}`),
    })),
    isPartOf: { "@id": JSON_LD_ID.website },
  }
}

export default function Page() {
  const posts = getLatestPosts()

  return (
    <>
      <JsonLdScript data={getBlogJsonLd(posts)} />
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/latest" },
        ])}
      />

      <div>
        <PageHeading>
          <PageHeadingTagline>Blog</PageHeadingTagline>
          <PageHeadingTitle>Worth writing down.</PageHeadingTitle>
          <PageHeadingDescription>{description}</PageHeadingDescription>
        </PageHeading>

        <DocList docs={posts} basePath="/latest" emptyMessage="No posts yet." />

        <div className="h-4" />
      </div>
    </>
  )
}
