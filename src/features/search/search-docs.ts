import { getLatestPosts, getWorkDocs } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

import type { SearchDoc } from "./site-search"

// What the search needs from each doc, and nothing else, so the layout
// doesn't ship every case study's body to the browser.
function toSearchDoc(doc: Doc, kind: "work" | "latest"): SearchDoc {
  const m = doc.metadata
  const base = kind === "work" ? "/work" : "/latest"
  return {
    href: m.href ?? `${base}/${doc.slug}`,
    title: m.title,
    description: m.claim ?? m.description,
    kind,
    image: m.image,
    period: m.period,
    keywords: [...(m.skills ?? []), m.company, m.type].filter(
      (k): k is string => Boolean(k)
    ),
  }
}

/** Every case study and post, trimmed to what the site search shows. */
export function getSearchDocs(): SearchDoc[] {
  return [
    ...getWorkDocs().map((doc) => toSearchDoc(doc, "work")),
    ...getLatestPosts().map((doc) => toSearchDoc(doc, "latest")),
  ]
}
