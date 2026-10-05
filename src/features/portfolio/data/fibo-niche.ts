export type NichePart = {
  /** The part's file name in fibo; its doc page and registry item are keyed on it. */
  name: string
  title: string
  description: string
  /** fibo's shelf: playful, specific special parts, or standard base ones. */
  shelf: "special" | "base"
  /** `false` keeps the part off the home page; it still has a card on /components. */
  home?: boolean
  /** The part's page in fibo's Figma library, as a node id. Left out until it has one. */
  figma?: string
}

/**
 * The fibo parts this site shows, as fibo's components.meta.json names them:
 * its special components, and the base ones worth a page of their own. Each
 * is installed from fibo.toribryan.com/r into `src/components/fibo/` and has
 * a doc page at `/components/<name>`. Parts for real product work come first,
 * then the playful ones, and the cards keep this order.
 */
export const NICHE_PARTS: NichePart[] = [
  {
    name: "data-table",
    figma: "230-2",
    title: "Data table",
    shelf: "base",
    description:
      "A table for lists people work through: selection, bulk actions, locked rows, pinned columns and a phone layout.",
  },
  {
    name: "chat-composer",
    figma: "509-2",
    title: "Chat composer",
    shelf: "base",
    description:
      "A message box built from parts around one draft, so each chat surface composes its own.",
    home: false,
  },
  {
    name: "filter-menu",
    title: "Filter menu",
    shelf: "special",
    description:
      "A filter menu of fields and values that turns into a search as you type.",
  },
  {
    name: "chapter-scrubber",
    figma: "371-4",
    title: "Chapter scrubber",
    shelf: "special",
    description:
      "A rail of marks that swell under the pointer like the Dock, previewing the chapter at the crest.",
  },
  {
    name: "floating-nav",
    figma: "601-74",
    title: "Floating nav",
    shelf: "special",
    description:
      "A pill of destinations that floats above the bottom of a phone screen and steps aside while you scroll.",
  },
  {
    name: "typing-indicator",
    figma: "567-9878",
    title: "Typing indicator",
    shelf: "base",
    description:
      "Says who's typing in a conversation, naming up to three people.",
    home: false,
  },
  {
    name: "status-dot",
    figma: "691-2",
    title: "Status dot",
    shelf: "base",
    description:
      "A small mark for whether someone is present, away or offline, told apart by shape.",
    home: false,
  },
  {
    name: "input-group",
    figma: "707-59",
    title: "Input group",
    shelf: "base",
    description:
      "An input with an icon, text or button beside it, drawn as one field.",
    home: false,
  },
  {
    name: "empty-state",
    figma: "710-144",
    title: "Empty state",
    shelf: "base",
    description:
      "What shows where content would be: a title, why it's empty, and what to do next.",
    home: false,
  },
  {
    name: "message-list",
    figma: "567-9879",
    title: "Message list",
    shelf: "base",
    description:
      "A conversation that groups each person's messages under one heading, with a single tab stop.",
    home: false,
  },
  {
    name: "jump-bar",
    figma: "567-9880",
    title: "Jump bar",
    shelf: "base",
    description:
      "Takes people to unread messages, new messages or the present in a conversation.",
    home: false,
  },
  {
    name: "map-pin",
    figma: "601-75",
    title: "Map pin",
    shelf: "special",
    description:
      "A dot, icon or labeled pill for a point on a map, with a preview card that springs open on click or tap.",
    home: false,
  },
  {
    name: "reactions",
    figma: "169-18",
    title: "Reactions",
    shelf: "special",
    description: "Lets people respond to content with an emoji in one tap.",
    home: false,
  },
  {
    name: "sticker-avatar",
    title: "Sticker avatar",
    shelf: "special",
    description:
      "An avatar cut out like a die-cut sticker, with a paper edge that follows its shape and a status told by shape.",
  },
  {
    name: "pixel-snail",
    title: "Pixel snail",
    shelf: "special",
    description:
      "A one-color pixel snail that crawls on a loop while something loads.",
    home: false,
  },
  {
    name: "command-menu",
    figma: "526-6",
    title: "Command menu",
    shelf: "special",
    description:
      "A Cmd+K palette with nested pages, recent commands, ranked search and a preview pane.",
  },
  {
    name: "integration-visual",
    figma: "371-5",
    title: "Integration visual",
    shelf: "special",
    description:
      "A hub and the tools wired into it, with pulses along the routes.",
    home: false,
  },
  {
    name: "token-flow",
    figma: "371-6",
    title: "Token flow",
    shelf: "special",
    description:
      "Walks a color token from raw value to primitive to semantic role.",
    home: false,
  },
]

const FIGMA_LIBRARY =
  "https://www.figma.com/design/LJZ5Tt4Ba7NPPi8Xnq8i0e/Fibo-DS"

export function nicheFigmaUrl(name: string) {
  const node = NICHE_PARTS.find((part) => part.name === name)?.figma
  return node ? `${FIGMA_LIBRARY}?node-id=${node}` : undefined
}

/*
 * fibo's sidebar files base parts under their group, so their docs live at
 * base-components-<group>-<name>; special parts sit straight under their
 * shelf. The groups are the ones in fibo's components.meta.json, for the base
 * parts this site links to.
 */
const BASE_GROUPS: Record<string, string> = {
  avatar: "display",
  badge: "display",
  button: "actions",
  "chat-composer": "forms",
  checkbox: "forms",
  "data-table": "display",
  field: "forms",
  "empty-state": "feedback",
  input: "forms",
  "input-group": "forms",
  "jump-bar": "actions",
  kbd: "display",
  menu: "overlays",
  "message-list": "display",
  pagination: "navigation",
  select: "forms",
  sheet: "overlays",
  "status-dot": "display",
  table: "display",
  tooltip: "overlays",
  "typing-indicator": "feedback",
}

/** The part's docs in fibo's Storybook; a name not on this site counts as a base part. */
export function fiboStorybookUrl(name: string) {
  const shelf = NICHE_PARTS.find((part) => part.name === name)?.shelf ?? "base"
  const group = BASE_GROUPS[name]
  const path =
    shelf === "special"
      ? `special-components-${name}`
      : group
        ? `base-components-${group}-${name}`
        : `base-components-${name}`
  return `https://fibo.toribryan.com/?path=/docs/${path}--docs`
}
