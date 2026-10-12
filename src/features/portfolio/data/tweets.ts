/** A post about Tori's work, copied by hand since there's no API call at build. */
export type Tweet = {
  name: string
  handle: string
  /** A square crop of their avatar under `public/`. */
  avatar: string
  verified?: boolean
  /** The post, verbatim. */
  text: string
  /** The handle it replies to, shown above the text the way X does. */
  replyingTo?: string
  /** The post it quotes, drawn inside it. */
  quoting?: QuotedPost
}

export type QuotedPost = {
  /** Shown as `M/D/YY`, the way X does. */
  date: string
  /** The text before its link. */
  text: string
  /** The link at its end, as X shortens it. */
  link: { label: string; href: string }
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
    quoting: {
      date: "9/17/26",
      text: 'Built a theme-aware token visualizer for my design system case studies, inspired by @ShadcnSpace "Integration Card" 😁',
      link: { label: "21st.dev/@iamtoribryan/…", href: TOKEN_FLOW },
    },
  },
  {
    name: "void.",
    handle: "voidyaps",
    avatar: "/images/recommendations/voidyaps.png",
    verified: true,
    replyingTo: "iamtoribryan",
    text: "🤯",
  },
]
