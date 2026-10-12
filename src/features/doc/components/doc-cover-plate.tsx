import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { DOC_COVERS } from "./doc-covers"
import { PostCover } from "./post-cover"

/**
 * The plate a cover sits on in search and the social frames. Its edge is an
 * overlay, since an inset ring paints under a cover that fills the plate.
 */
export function CoverPlate({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "relative aspect-1200/630 w-full overflow-hidden rounded-md bg-cover-plate",
        className
      )}
      aria-hidden
      inert
    >
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] inset-ring-1 inset-ring-black/10 dark:inset-ring-white/15" />
    </div>
  )
}

/**
 * A doc's cover as its card draws it, live where it has one and the blog's
 * cover where it has no image, without the card's hover treatment. Shared by
 * the site search and the social frames.
 */
export function DocCoverPlate({
  slug,
  image,
  className,
}: {
  slug: string
  image?: string
  className?: string
}) {
  const Cover = DOC_COVERS[slug]
  return (
    <CoverPlate className={className}>
      {Cover ? (
        <Cover loop />
      ) : image ? (
        // Covers are already sized at export time, like the cards'.
        <img src={image} alt="" className="size-full object-cover" />
      ) : (
        <PostCover loop />
      )}
    </CoverPlate>
  )
}
