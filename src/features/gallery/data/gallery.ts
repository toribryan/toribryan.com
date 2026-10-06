import type { IsoArt } from "@/components/mdx-iso-cards"

/** Pixel-studio dot art by name, or one of the working line-art scenes. */
export type IsoPiece =
  | IsoArt
  | "component-desk"
  | "static-tv"
  | "rabbit-run"
  | "fibo-written"
  | "fibo-enforced"

type Piece = {
  /** The only words a piece gets, since the page shows none. */
  alt: string
  /** The page the piece comes from, if it has one. */
  href?: string
}

export type GalleryItem =
  | (Piece & {
      kind: "image" | "video"
      /** Path under `public/`. */
      src: string
      width: number
      height: number
    })
  | (Piece & { kind: "iso"; piece: IsoPiece })

export type GalleryMediaItem = Extract<GalleryItem, { src: string }>

export const galleryKey = (item: GalleryItem) =>
  item.kind === "iso" ? item.piece : item.src

/**
 * Every piece on `/gallery`, in the order the columns fill. Projects are
 * mixed so neighbours differ; keep them that way when adding one.
 */
export const GALLERY: GalleryItem[] = [
  {
    src: "/cover-real-wedding-submissions.webp",
    kind: "image",
    width: 2400,
    height: 1260,
    alt: "Real Wedding Submissions cover",
    href: "/work/real-wedding-submissions",
  },
  {
    src: "/case-studies/mobile-filters-mch.mp4",
    kind: "video",
    width: 440,
    height: 960,
    alt: "Modern Care Homes filters on a phone",
    href: "/work/modern-care-homes",
  },
  {
    kind: "iso",
    piece: "component-desk",
    alt: "An isometric desk with a rabbit, working design system parts and a monitor showing their code",
    href: "/",
  },
  {
    src: "/cover-fibo.webp",
    kind: "image",
    width: 2400,
    height: 1260,
    alt: "fibo cover",
    href: "/fibo",
  },
  {
    src: "/case-studies/real-wedding-page-story-2x.webp",
    kind: "image",
    width: 3200,
    height: 4094,
    alt: "The story step of the real wedding submission wizard",
    href: "/work/real-wedding-submissions",
  },
  {
    kind: "iso",
    piece: "arc-start",
    alt: "Isometric dot art: where the agentic design system started",
    href: "/work/agentic-design-system",
  },
  {
    src: "/cover-agenticds.webp",
    kind: "image",
    width: 2106,
    height: 1106,
    alt: "Agentic Design System cover",
    href: "/work/agentic-design-system",
  },
  {
    kind: "iso",
    piece: "rabbit-run",
    alt: "Rabbit run, an isometric game where a rabbit family grows by the Fibonacci sequence",
    href: "/work/rabbit-run",
  },
  {
    src: "/case-studies/map-search-mch.webp",
    kind: "image",
    width: 2000,
    height: 1239,
    alt: "Modern Care Homes search in map view, with homes on the left and price pins on a map of Phoenix on the right",
    href: "/work/modern-care-homes",
  },
  {
    src: "/images/fibo/bunny-dither.webp",
    kind: "image",
    width: 1080,
    height: 1350,
    alt: "A dithered rabbit",
    href: "/fibo",
  },
  {
    kind: "iso",
    piece: "tier-primitive",
    alt: "Isometric dot art: the primitive token tier",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/author-proof-proctorio-generated-questions.webp",
    kind: "image",
    width: 1080,
    height: 1080,
    alt: "Author Proof's generated questions in Proctorio",
    href: "/work/author-proof",
  },
  {
    src: "/case-studies/design-challenge-hero.jpg",
    kind: "image",
    width: 3072,
    height: 1706,
    alt: "Config 2026 design challenge",
    href: "/latest/design-challenge",
  },
  {
    kind: "iso",
    piece: "fibo-written",
    alt: "An isometric stack of three sheets an agent reads: metadata, skills and AGENTS.md",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/real-wedding-seq-1.webp",
    kind: "image",
    width: 780,
    height: 1520,
    alt: "The who-is-submitting step on mobile",
    href: "/work/real-wedding-submissions",
  },
  {
    kind: "iso",
    piece: "exp-mcp",
    alt: "Isometric dot art: the Figma MCP experiment",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/ds-overhaul-slots-vs-booleans.mp4",
    kind: "video",
    width: 1920,
    height: 1140,
    alt: "Slots compared with boolean properties in Figma",
    href: "/work/design-system-overhaul",
  },
  {
    src: "/case-studies/framer-portfolio-concept-2-modal.webp",
    kind: "image",
    width: 2202,
    height: 1464,
    alt: "Desktop and mobile layouts of an about-me modal in Framer",
    href: "/latest/portfolio-website",
  },
  {
    kind: "iso",
    piece: "badge-background",
    alt: "Isometric dot art: a badge's background layer",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/new-dashboard-mch.png",
    kind: "image",
    width: 1241,
    height: 1241,
    alt: "The redesigned Modern Care Homes dashboard",
    href: "/work/modern-care-homes",
  },
  {
    src: "/cover-iphone-duo.webp",
    kind: "image",
    width: 1200,
    height: 630,
    alt: "iPhone Duo cover",
    href: "/work/iphone-duo",
  },
  {
    kind: "iso",
    piece: "static-tv",
    alt: "An isometric old television showing static, with a channel dial and antennas",
  },
  {
    src: "/case-studies/real-wedding-page-vendors-2x.webp",
    kind: "image",
    width: 3200,
    height: 2568,
    alt: "The vendor credits step of the real wedding submission wizard",
    href: "/work/real-wedding-submissions",
  },
  {
    kind: "iso",
    piece: "arc-contracts",
    alt: "Isometric dot art: the contracts",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/home-profile-mobile-mch.mp4",
    kind: "video",
    width: 440,
    height: 960,
    alt: "A Modern Care Homes home profile on a phone",
    href: "/work/modern-care-homes",
  },
  {
    src: "/cover-storybookkit.webp",
    kind: "image",
    width: 1200,
    height: 630,
    alt: "storybook-kit cover",
    href: "/work/storybook-kit",
  },
  {
    kind: "iso",
    piece: "tier-semantic",
    alt: "Isometric dot art: the semantic token tier",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/author-proof-proctorio-quiz-settings.webp",
    kind: "image",
    width: 1080,
    height: 1080,
    alt: "Author Proof's quiz settings in Proctorio",
    href: "/work/author-proof",
  },
  {
    src: "/case-studies/the-system.mp4",
    kind: "video",
    width: 2202,
    height: 1466,
    alt: "A portfolio design system in motion",
    href: "/latest/portfolio-website",
  },
  {
    kind: "iso",
    piece: "stack-source",
    alt: "Isometric dot art: the source of truth",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/real-wedding-widths.webp",
    kind: "image",
    width: 1600,
    height: 974,
    alt: "The your-info step at 390 pixels next to the same step from 768 up",
    href: "/work/real-wedding-submissions",
  },
  {
    src: "/images/fibo/sunflower-dither.webp",
    kind: "image",
    width: 1080,
    height: 1350,
    alt: "A dithered sunflower",
    href: "/fibo",
  },
  {
    kind: "iso",
    piece: "fibo-enforced",
    alt: "An isometric board of five pull request checks with a run button",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/figma-home-nav-mch.webp",
    kind: "image",
    width: 1820,
    height: 1180,
    alt: "Figma documentation for the Home Nav component",
    href: "/work/modern-care-homes",
  },
  {
    src: "/cover-voicememo.webp",
    kind: "image",
    width: 1200,
    height: 630,
    alt: "Voice memo cover",
    href: "/work/voice-memo",
  },
  {
    kind: "iso",
    piece: "exp-prompt",
    alt: "Isometric dot art: the DESIGN.md experiment",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/design-challenge-gallery-2.jpg",
    kind: "image",
    width: 3072,
    height: 1706,
    alt: "Config 2026 design challenge",
    href: "/latest/design-challenge",
  },
  {
    src: "/case-studies/real-wedding-seq-2.webp",
    kind: "image",
    width: 780,
    height: 1520,
    alt: "The your-info step on mobile",
    href: "/work/real-wedding-submissions",
  },
  {
    kind: "iso",
    piece: "badge-icon",
    alt: "Isometric dot art: a badge's icon layer",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/marketplace-tour-mch.mp4",
    kind: "video",
    width: 1600,
    height: 988,
    alt: "A tour of the Modern Care Homes marketplace",
    href: "/work/modern-care-homes",
  },
  {
    kind: "iso",
    piece: "arc-now",
    alt: "Isometric dot art: where the agentic design system is now",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/arizona-bride-mockup.webp",
    kind: "image",
    width: 1600,
    height: 1039,
    alt: "Arizona Bride mockup",
    href: "/work/arizona-bride",
  },
  {
    src: "/case-studies/real-wedding-page-review-2x.webp",
    kind: "image",
    width: 3200,
    height: 2308,
    alt: "The review step of the real wedding submission wizard",
    href: "/work/real-wedding-submissions",
  },
  {
    kind: "iso",
    piece: "stack-context",
    alt: "Isometric dot art: context",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/portfolio-astro-concept-work-index.webp",
    kind: "image",
    width: 3024,
    height: 1656,
    alt: "The work index page from an Astro portfolio concept",
    href: "/latest/portfolio-website",
  },
  {
    src: "/case-studies/ds-overhaul-button-properties-before.webp",
    kind: "image",
    width: 478,
    height: 812,
    alt: "A button's Figma properties before the design system overhaul",
    href: "/work/design-system-overhaul",
  },
  {
    kind: "iso",
    piece: "tier-component",
    alt: "Isometric dot art: the component token tier",
    href: "/work/agentic-design-system",
  },
  {
    src: "/cover-moderncare.webp",
    kind: "image",
    width: 1600,
    height: 845,
    alt: "Modern Care Homes cover",
    href: "/work/modern-care-homes",
  },
  {
    src: "/case-studies/filters-saved-search-mch.mp4",
    kind: "video",
    width: 1600,
    height: 992,
    alt: "Filters and saved searches on Modern Care Homes",
    href: "/work/modern-care-homes",
  },
  {
    kind: "iso",
    piece: "badge-text",
    alt: "Isometric dot art: a badge's text layer",
    href: "/work/agentic-design-system",
  },
  {
    src: "/cover-authorproof.webp",
    kind: "image",
    width: 2400,
    height: 1260,
    alt: "Author Proof cover",
    href: "/work/author-proof",
  },
  {
    src: "/case-studies/real-wedding-seq-3.webp",
    kind: "image",
    width: 780,
    height: 1520,
    alt: "The couple step on mobile",
    href: "/work/real-wedding-submissions",
  },
  {
    kind: "iso",
    piece: "exp-variable",
    alt: "Isometric dot art: the variable experiment",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/framer-portfolio-concept-2-flow.webp",
    kind: "image",
    width: 2202,
    height: 1464,
    alt: "Interaction spec for an about-me modal",
    href: "/latest/portfolio-website",
  },
  {
    kind: "iso",
    piece: "stack-agent",
    alt: "Isometric dot art: the agent",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/new-homecard-mch.png",
    kind: "image",
    width: 978,
    height: 786,
    alt: "The redesigned Modern Care Homes home card",
    href: "/work/modern-care-homes",
  },
  {
    src: "/case-studies/real-wedding-comments-2x.webp",
    kind: "image",
    width: 3200,
    height: 1442,
    alt: "Review comments pinned on the real wedding design in Figma",
    href: "/work/real-wedding-submissions",
  },
  {
    kind: "iso",
    piece: "arc-today",
    alt: "Isometric dot art: what works today",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/airbnb-research-mch.mp4",
    kind: "video",
    width: 1920,
    height: 1048,
    alt: "Research into Airbnb's listing patterns",
    href: "/work/modern-care-homes",
  },
  {
    src: "/case-studies/design-challenge-gallery-3.jpg",
    kind: "image",
    width: 3072,
    height: 1706,
    alt: "Config 2026 design challenge",
    href: "/latest/design-challenge",
  },
  {
    kind: "iso",
    piece: "badge-border",
    alt: "Isometric dot art: a badge's border layer",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/real-wedding-before-after.webp",
    kind: "image",
    width: 1600,
    height: 640,
    alt: "The first step before and after a design round",
    href: "/work/real-wedding-submissions",
  },
  {
    src: "/case-studies/foundations-mch.mp4",
    kind: "video",
    width: 1820,
    height: 1080,
    alt: "Modern Care Homes design system foundations",
    href: "/work/modern-care-homes",
  },
  {
    kind: "iso",
    piece: "stack-guardrails",
    alt: "Isometric dot art: guardrails",
    href: "/work/agentic-design-system",
  },
  {
    src: "/case-studies/real-wedding-page-who-2x.webp",
    kind: "image",
    width: 3200,
    height: 2062,
    alt: "The who-is-submitting step of the real wedding submission wizard",
    href: "/work/real-wedding-submissions",
  },
  {
    kind: "iso",
    piece: "stack-review",
    alt: "Isometric dot art: review",
    href: "/work/agentic-design-system",
  },
]
