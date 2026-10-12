import { COMPONENTS } from "@/features/components/data/registry"
import { getRegistryDocs } from "@/features/components/data/registry-docs"
import { getLatestPosts, getWorkDocs } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"
import { HOME_PARTS } from "@/features/portfolio/data/fibo-niche"

/** One route's social preview: what it says and which covers it draws. */
export type OgFrame = {
  route: string
  kicker: string
  title: string
  docs?: { slug: string; image?: string }[]
  parts?: string[]
}

const cover = (doc: Doc) => ({ slug: doc.slug, image: doc.metadata.image })

/** Every route `npm run og` makes a preview for. */
export function getOgFrames(): OgFrame[] {
  const work = getWorkDocs()
  const posts = getLatestPosts()
  return [
    {
      route: "/components",
      kicker: "fibo",
      title: "Components",
      parts: HOME_PARTS.slice(0, 4),
    },
    {
      route: "/projects",
      kicker: "Portfolio",
      title: "Projects",
      docs: work.slice(0, 4).map(cover),
    },
    {
      route: "/latest",
      kicker: "Writing",
      title: "Blog",
      docs: posts.slice(0, 4).map(cover),
    },
    {
      route: "/fibo",
      kicker: "fibo",
      title: "The story of fibo",
      docs: [{ slug: "fibo" }],
    },
    ...work.map((doc) => ({
      route: `/work/${doc.slug}`,
      kicker: "Case study",
      title: doc.metadata.title,
      docs: [cover(doc)],
    })),
    ...posts.map((doc) => ({
      route: `/latest/${doc.slug}`,
      kicker: "Post",
      title: doc.metadata.title,
      docs: [cover(doc)],
    })),
    ...getRegistryDocs()
      .filter((doc) => doc.slug in COMPONENTS)
      .map((doc) => ({
        route: `/components/${doc.slug}`,
        kicker: "fibo component",
        title: doc.metadata.title,
        parts: [doc.slug],
      })),
  ]
}
