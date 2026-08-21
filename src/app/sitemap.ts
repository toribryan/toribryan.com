import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import {
  getComponentDocs,
  getLatestPosts,
  getWorkDocs,
} from "@/features/doc/data/documents"

export const revalidate = false
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/components", "/latest"].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const docRoutes = [
    ...getComponentDocs().map((doc) => ["/components", doc] as const),
    ...getLatestPosts().map((doc) => ["/latest", doc] as const),
    ...getWorkDocs().map((doc) => ["/work", doc] as const),
  ].map(([base, doc]) => ({
    url: `${SITE_INFO.url}${base}/${doc.slug}`,
    lastModified: new Date(doc.metadata.updatedAt).toISOString(),
  }))

  return [...staticRoutes, ...docRoutes]
}
