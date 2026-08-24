import type { TOCItemType } from "fumadocs-core/toc"
import GithubSlugger from "github-slugger"

/**
 * `getTableOfContents` reads the raw MDX source, so a heading that embeds JSX
 * (`## Framer <BrandLink brand="framer" />`) lands in the TOC with the tag
 * still in the title, and with an anchor slugged from that same raw string,
 * which never matches the id `rehype-slug` gives the rendered heading.
 *
 * Strip the JSX out of the titles and re-slug in document order so both the
 * label and the anchor line up with what the page actually renders.
 */
export function cleanTableOfContents(items: TOCItemType[]): TOCItemType[] {
  const slugger = new GithubSlugger()

  return items.map((item) => {
    if (typeof item.title !== "string") {
      return item
    }

    // Slug the stripped string as-is. `rehype-slug` sees the same text the JSX
    // leaves behind, trailing space and all, so trimming here would produce an
    // anchor that misses the heading.
    const stripped = item.title.replace(/<[^>]*>/g, "")

    return {
      ...item,
      title: stripped.replace(/\s+/g, " ").trim(),
      url: `#${slugger.slug(stripped)}`,
    }
  })
}
