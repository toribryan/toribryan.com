export type DocMetadata = {
  title: string
  description: string
  /**
   * Social/OG image URL for the doc.
   * Use an absolute URL or a path under /public. Recommended size: 1200x630.
   */
  image?: string
  /**
   * Category identifier, derived from the doc's content subfolder
   * (e.g. `content/components/*` → "components"). Not declared in frontmatter;
   * injected when docs are read. Used for filtering (see getDocsByCategory).
   */
  category?: string
  /** Shows a "New" dot in list views. */
  new?: boolean
  updated?: boolean
  /** Pins the doc to the top of its list, above the date-sorted rest. */
  pinned?: boolean
  /**
   * Explicit position, lowest first. Docs that declare one are placed ahead of
   * everything else, in the order given; the rest fall back to `pinned` and
   * then newest-first. Use it to hand-pick the openers of a list.
   */
  order?: number
  /** Creation date as an ISO date string (YYYY-MM-DD). Used for sorting. */
  createdAt: string
  /** Last updated date as an ISO date string (YYYY-MM-DD). */
  updatedAt: string

  // --- Work case studies -------------------------------------------------
  /** Client or employer the work was done for. */
  company?: string
  /** Your role on the project. */
  role?: string
  /** Human-readable run dates, e.g. "04.2025 – 09.2025". Display only. */
  period?: string
  /** Tags shown on the case-study page. */
  skills?: string[]
  /** Public URL for shipped work. */
  liveUrl?: string
  /** Label for the `liveUrl` buttons. Defaults to "Visit site". */
  liveLabel?: string
  /** Team or collaborators the work ran with. */
  team?: string
  /** Engagement type, e.g. "Proof of concept". */
  type?: string
  /** The framing problem. Rendered as the case study's summary block. */
  problem?: string
  /** What you were asked to do. */
  task?: string
  /** How you got there — forks taken, constraints that shaped it. */
  process?: string
  /** What was built in answer to the problem. Sits directly under it. */
  solution?: string
  /** What shipped, and what it changed. */
  outcome?: string
  /** Additional images shown below the body. */
  gallery?: string[]

  // --- Component libraries -----------------------------------------------
  /** Full brand name, when the doc title is a short form (e.g. "Bab"). */
  brand?: string
  /** Build status shown on the library doc, e.g. "In progress". */
  status?: string
  /** Number of components published so far. */
  componentCount?: number
}

export type Doc = {
  /** Parsed frontmatter metadata from the MDX file. */
  metadata: DocMetadata
  /** Slug derived from the MDX filename (without extension). */
  slug: string
  /** MDX content body without frontmatter. */
  content: string
}

/**
 * Minimal doc data for client components that don't need the full content.
 * Reduces serialization overhead and bundle size.
 */
export type DocPreview = {
  slug: string
  title: string
  category?: string
}
