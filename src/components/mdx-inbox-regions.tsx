import { Embed } from "./mdx-embed"

/**
 * The Integrity Console's Inbox, with a picker that brings one region forward
 * and drops the rest to 20%.
 *
 * This exists as a component rather than an `<Embed>` with props in the MDX
 * because expression attributes don't survive the trip through the MDX
 * pipeline: `@mdx-js/mdx` compiles `height={760}` and `focusOptions={[…]}`
 * correctly — verified against this exact file — but by the time the client
 * component renders, only the string attributes have arrived and the rest are
 * back at their defaults. String props (`src`, `title`, `caption`) are fine.
 *
 * So anything that isn't a string is configured here, in TSX, where it works.
 * The same applies to any future embed needing numbers or objects.
 *
 * The region values are the contract with the story on the other side — see
 * `InboxRegions.stories.tsx` in the bab repo, which listens for the message
 * `Embed` posts.
 */
export function InboxRegions() {
  return (
    <Embed
      src="/storybook/bab/iframe.html?id=inbox-regions--default&viewMode=story"
      title="Inbox — regions"
      width={1280}
      height={760}
      focusOptions={[
        { value: "list", label: "Queue" },
        { value: "header", label: "Header" },
        { value: "thread", label: "Thread" },
        { value: "composer", label: "Composer" },
        { value: "context", label: "Context" },
      ]}
      caption="Queue, header, thread, composer, context. It opens on Jordan Lee's conversation, the one carrying session context — which is what the Context panel is showing."
    />
  )
}
