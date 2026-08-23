import type { BRAND_LINKS } from "@/lib/brand-links"

import { BrandLink } from "./mdx-brand-link"

/**
 * A bolded tool name with its brand logo, for the standalone-paragraph
 * pattern in review-style posts — e.g. `<ToolLabel name="Framer" brand="framer" />`
 * in place of `**Framer**`.
 *
 * Text and logo sit inside one flex row so they center against each other
 * by layout rather than by tuning `vertical-align` — the same fix `Heading`
 * uses, since eyeballing a vertical-align offset against arbitrary icon art
 * doesn't hold up across icons.
 */
export function ToolLabel({
  name,
  brand,
}: {
  name: string
  brand: keyof typeof BRAND_LINKS
}) {
  return (
    <strong className="inline-flex items-center gap-1.5">
      {name}
      <BrandLink brand={brand} />
    </strong>
  )
}
