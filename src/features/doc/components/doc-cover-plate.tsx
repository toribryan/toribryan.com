import { cn } from "@/lib/utils"

import { DOC_COVERS } from "./doc-covers"
import { PostCover } from "./post-cover"

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
  const plate = cn(
    "relative aspect-1200/630 w-full overflow-hidden rounded-md bg-cover-plate inset-ring-1 inset-ring-black/10",
    className
  )

  if (Cover) {
    return (
      <div className={plate} aria-hidden inert>
        <Cover loop />
      </div>
    )
  }
  if (!image) {
    return (
      <div className={plate} aria-hidden>
        <PostCover loop />
      </div>
    )
  }
  // Covers are already sized at export time, like the cards'.
  return <img src={image} alt="" className={cn(plate, "object-cover")} />
}
