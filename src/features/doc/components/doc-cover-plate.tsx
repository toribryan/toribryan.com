import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { DOC_COVERS } from "./doc-covers"
import { PostCover } from "./post-cover"

const PLATE =
  "relative aspect-1200/630 w-full overflow-hidden rounded-md bg-cover-plate inset-ring-1 inset-ring-black/10"

/** The plate a cover sits on in search and the social frames. */
export function CoverPlate({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn(PLATE, className)} aria-hidden inert>
      {children}
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
  if (Cover || !image) {
    return (
      <CoverPlate className={className}>
        {Cover ? <Cover loop /> : <PostCover loop />}
      </CoverPlate>
    )
  }
  // Covers are already sized at export time, like the cards'.
  return (
    <img src={image} alt="" className={cn(PLATE, "object-cover", className)} />
  )
}
