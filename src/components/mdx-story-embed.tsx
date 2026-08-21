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
 * Both want to be close to the story's real content box:
 *
 * - `height` is content height plus Storybook's ~32px of body padding. Too much
 *   and the component floats in a field of empty ground; the frame doesn't
 *   shrink-wrap, because an iframe can't be measured from outside.
 * - `width` sets the scale, since the frame is laid out at `width` and scaled
 *   down to the doc column. Narrower means closer to 1:1 — worth it for small
 *   controls, which are otherwise rendered at three-quarter size for no reason.
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
      caption={caption}
    />
  )
}
