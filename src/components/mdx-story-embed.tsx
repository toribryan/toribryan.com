import { Embed } from "./mdx-embed"

/**
 * One story out of the bab Storybook, framed.
 *
 * `width` and `height` are strings rather than numbers because expression
 * attributes don't survive the MDX pipeline — `height={200}` arrives as the
 * default while `height="200"` comes through intact (see the note in
 * `mdx-inbox-regions.tsx`). Parsing them here is the price of authoring these
 * from MDX at all.
 *
 * `height` only sizes the frame before the real measurement lands — `Embed`'s
 * `autoHeight` reads the story's actual content height off the iframe (the
 * Storybook build is same-origin, so this works despite iframes usually being
 * unmeasurable from outside) and shrink-wraps to it, so no story ever scrolls
 * or floats in leftover space regardless of what `height` says.
 *
 * `width` sets the scale, since the frame is laid out at `width` and scaled
 * down to the doc column. Narrower means closer to 1:1 — worth it for small
 * controls, which are otherwise rendered at three-quarter size for no reason.
 */
export function StoryEmbed({
  id,
  title,
  width = "1000",
  height = "320",
  caption,
}: {
  /** Storybook story id, e.g. `ui-button--all-variants`. */
  id: string
  /** Labels the chrome bar and names the frame for screen readers. */
  title: string
  width?: string
  height?: string
  caption?: React.ReactNode
}) {
  return (
    <Embed
      src={`/storybook/bab/iframe.html?id=${id}&viewMode=story`}
      title={title}
      width={Number(width) || 1000}
      height={Number(height) || 320}
      autoHeight
      caption={caption}
    />
  )
}
