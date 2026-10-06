import meta from "./fibo-catalog.json"

export type CatalogShelf = "base-components" | "special-components"

export type CatalogPart = {
  /** The part's file name in fibo. */
  name: string
  title: string
  description: string
  shelf: CatalogShelf
  /** The job it does, such as Forms or Feedback, as fibo groups it. */
  group: string
  status?: "new" | "beta" | "deprecated"
}

// fibo parts this site leaves off its list.
const HIDDEN = new Set(["pixel-snail", "map-pin"])

/**
 * Every fibo part, from a copy of fibo's components.meta.json that
 * `npm run sync:fibo-catalog` refreshes. It is the same file fibo's own
 * Catalog page, sidebar and registry read.
 */
export const CATALOG: CatalogPart[] = Object.entries(
  meta as Record<
    string,
    {
      title: string
      description: string
      tier: string
      group: string
      status?: string
    }
  >
)
  .filter(([name]) => !HIDDEN.has(name))
  .map(([name, part]) => ({
    name,
    title: part.title,
    description: part.description,
    shelf: part.tier as CatalogShelf,
    group: part.group,
    status: part.status as CatalogPart["status"],
  }))

/** fibo's two shelves, special first. */
export const SHELVES: {
  id: CatalogShelf
  title: string
  description: string
}[] = [
  {
    id: "special-components",
    title: "Special components",
    description:
      "Playful parts built for one kind of moment, such as a diagram, a reading rail or a reaction. Some use the motion library, which installs along with them.",
  },
  {
    id: "base-components",
    title: "Base components",
    description:
      "The parts most interfaces need. They depend on nothing beyond Base UI, class-variance-authority and lucide-react.",
  },
]

/** A group's name as a card shows it, where fibo's own is too terse. */
export function groupLabel(group: string) {
  return group === "Display" ? "Data display" : group
}

/** The part's docs in fibo's Storybook, where base parts sit under their group. */
export function fiboStorybookUrl(name: string) {
  const part = CATALOG.find((entry) => entry.name === name)
  const path = !part
    ? `base-components-${name}`
    : part.shelf === "base-components"
      ? `base-components-${part.group.toLowerCase()}-${name}`
      : `special-components-${name}`
  return `https://fibo.toribryan.com/?path=/docs/${path}--docs`
}
