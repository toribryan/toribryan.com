/** A post about Tori's work, copied by hand since there's no API call at build. */
export type Tweet = {
  name: string
  handle: string
  /** A square crop of their avatar under `public/`. */
  avatar: string
  verified?: boolean
  /** The post, verbatim. */
  text: string
  /** What the post answers: a quote or a reply, and where that lives. */
  context: { label: string; href: string }
}

const TOKEN_FLOW = "https://21st.dev/@iamtoribryan/components/token-flow"

/** Posts about Token flow, the hero of the recommendations page. */
export const TWEETS: Tweet[] = [
  {
    name: "Shadcn Space",
    handle: "ShadcnSpace",
    avatar: "/images/recommendations/shadcnspace.png",
    verified: true,
    text: "Love seeing the Integration Card inspire something completely new a theme aware token visualizer for design systems.",
    context: { label: "Quoting my Token flow post", href: TOKEN_FLOW },
  },
  {
    name: "void.",
    handle: "voidyaps",
    avatar: "/images/recommendations/voidyaps.png",
    verified: true,
    text: "🤯",
    context: { label: "Replying to my Token flow post", href: TOKEN_FLOW },
  },
]
