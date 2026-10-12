import { COMPONENTS } from "@/features/components/data/registry"
import { getRegistryDocs } from "@/features/components/data/registry-docs"
import { getLatestPosts, getWorkDocs } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

/** One route's social preview: what it says and which covers it draws. */
export type OgFrame = {
  route: string
  kicker: string
  title: string
  docs?: { slug: string; image?: string }[]
  parts?: string[]
  /** A page's own cover, by its key in `PAGE_COVERS`. */
  page?: string
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
      page: "components",
    },
    {
      route: "/projects",
      kicker: "Portfolio",
      title: "Projects",
      page: "projects",
    },
    {
      route: "/latest",
      kicker: "Writing",
      title: "Blog",
      page: "blog",
    },
    {
      route: "/fibo",
      kicker: "fibo",
      title: "The story of fibo",
      page: "fibo",
    },
    {
      route: "/fibo/figma",
      kicker: "fibo",
      title: "fibo in Figma",
      page: "figma",
    },
    {
      route: "/recommendations",
      kicker: "Kind words",
      title: "Recommendations",
      page: "recommendations",
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
