import {
  ClaudeIcon,
  CursorIcon,
  GitHubIcon,
  NextJsIcon,
  ReactIcon,
  ShadcnIcon,
  TailwindCssIcon,
  TsIcon,
  VercelIcon,
} from "@/components/icons"

export type TechEntry = {
  title: string
  href: string
  /** Omit for a tool we have no brand mark for. The badge renders text only. */
  icon?: React.ReactElement
}

/** Brand marks that ship as SVGs under /public rather than as icon components. */
function BrandMark({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="size-3.5 shrink-0" aria-hidden />
}

/**
 * Every tool that can appear as a badge, keyed by slug.
 *
 * One catalog, two consumers: the home page Stack panel picks from it by key
 * (`features/portfolio/data/tech-stack.tsx` says which keys and under which
 * categories) and MDX reaches it through `<Tech name="…" />`. A tool added
 * here is immediately available to both, and being listed here does not put it
 * on the home page. Only the Stack data file decides that.
 */
export const TECH = {
  figma: {
    title: "Figma",
    href: "https://figma.com",
    icon: <BrandMark src="/Figma.svg" />,
  },
  adobe: {
    title: "Adobe",
    href: "https://adobe.com",
    icon: <BrandMark src="/Adobe.svg" />,
  },
  framer: {
    title: "Framer",
    href: "https://framer.com",
    icon: <BrandMark src="/Framer.svg" />,
  },
  webflow: {
    title: "Webflow",
    href: "https://webflow.com",
    icon: <BrandMark src="/Webflow.svg" />,
  },
  "claude-code": {
    title: "Claude Code",
    href: "https://claude.com/claude-code",
    icon: <ClaudeIcon />,
  },
  cursor: {
    title: "Cursor",
    href: "https://cursor.com",
    icon: <CursorIcon />,
  },
  nextjs: {
    title: "Next.js",
    href: "https://nextjs.org",
    icon: <NextJsIcon />,
  },
  react: {
    title: "React",
    href: "https://react.dev",
    icon: <ReactIcon />,
  },
  typescript: {
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
    icon: <TsIcon />,
  },
  tailwindcss: {
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
    icon: <TailwindCssIcon />,
  },
  "shadcn-ui": {
    title: "shadcn/ui",
    href: "https://ui.shadcn.com",
    icon: <ShadcnIcon />,
  },
  storybook: {
    title: "Storybook",
    href: "https://storybook.js.org",
    icon: <BrandMark src="/storybook-icon.svg" />,
  },
  vercel: {
    title: "Vercel",
    href: "https://vercel.com",
    icon: <VercelIcon />,
  },
  mobbin: {
    title: "Mobbin",
    href: "https://mobbin.com",
  },
  usertesting: {
    title: "UserTesting",
    href: "https://www.usertesting.com",
    icon: <BrandMark src="/UserTesting.svg" />,
  },
  loom: {
    title: "Loom",
    href: "https://loom.com",
    icon: <BrandMark src="/Loom.svg" />,
  },
  github: {
    title: "GitHub",
    href: "https://github.com",
    icon: <GitHubIcon />,
  },
  webstorm: {
    title: "WebStorm",
    href: "https://www.jetbrains.com/webstorm",
    icon: <BrandMark src="/webstorm.svg" />,
  },
  vscode: {
    title: "VS Code",
    href: "https://code.visualstudio.com",
    icon: <BrandMark src="/vscode.svg" />,
  },
  notion: {
    title: "Notion",
    href: "https://notion.com",
    icon: <BrandMark src="/notion.svg" />,
  },
  obsidian: {
    title: "Obsidian",
    href: "https://obsidian.md",
    icon: <BrandMark src="/obsidian.svg" />,
  },
} satisfies Record<string, TechEntry>

export type TechKey = keyof typeof TECH

/**
 * Read one entry from the catalog.
 *
 * Go through this rather than indexing `TECH` directly. `satisfies` keeps each
 * entry's literal type so `TechKey` stays a union of real keys, but it also
 * means an entry with no `icon` makes `icon` absent from the union, and
 * `TECH[key].icon` stops type-checking. Widening to `TechEntry` here gives
 * callers the optional property back without giving up the key inference.
 */
export function getTech(key: TechKey): TechEntry {
  return TECH[key]
}
