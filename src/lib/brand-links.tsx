import { NextJsIcon, ShadcnIcon } from "@/components/icons"

export type BrandLinkEntry = {
  label: string
  href: string
  icon: React.ReactElement
}

/** Brand marks that ship as image files under /public rather than as icon components. */
function BrandMark({ src, className }: { src: string; className?: string }) {
  return <img src={src} alt="" aria-hidden className={className} />
}

/**
 * Brand logo + link, keyed for `<BrandLink brand="..." />` in MDX. Add an
 * entry here once a logo exists — see `mdx-brand-link.tsx` for how it's
 * rendered next to headings and inline tool names.
 */
export const BRAND_LINKS: Record<string, BrandLinkEntry> = {
  framer: {
    label: "Framer",
    href: "https://framer.com",
    icon: <BrandMark src="/Framer.svg" />,
  },
  nextjs: {
    label: "Next.js",
    href: "https://nextjs.org",
    icon: <NextJsIcon />,
  },
  "21st-dev": {
    label: "21st.dev",
    href: "https://21st.dev",
    icon: <BrandMark src="/21st-dev.svg" />,
  },
  shadcn: {
    label: "shadcn/ui",
    href: "https://ui.shadcn.com",
    icon: <ShadcnIcon />,
  },
  lovable: {
    label: "Lovable",
    href: "https://lovable.dev",
    icon: <BrandMark src="/lovable.svg" />,
  },
  elevenlabs: {
    label: "ElevenLabs",
    href: "https://elevenlabs.io",
    icon: <BrandMark src="/elevenlabsai.svg" />,
  },
  "github-desktop": {
    label: "GitHub Desktop",
    href: "https://desktop.github.com",
    icon: <BrandMark src="/github-desktop.png" />,
  },
  obsidian: {
    label: "Obsidian",
    href: "https://obsidian.md",
    icon: <BrandMark src="/obsidian.svg" />,
  },
  notion: {
    label: "Notion",
    href: "https://notion.so",
    icon: <BrandMark src="/notion.svg" />,
  },
  vscode: {
    label: "VS Code",
    href: "https://code.visualstudio.com",
    icon: <BrandMark src="/vscode.svg" />,
  },
  storybook: {
    label: "Storybook",
    href: "https://storybook.js.org",
    icon: <BrandMark src="/storybook-icon.svg" />,
  },
  subframe: {
    label: "Subframe",
    href: "https://subframe.com",
    icon: <BrandMark src="/subframe.jpeg" className="rounded-[3px]" />,
  },
  webstorm: {
    label: "WebStorm",
    href: "https://www.jetbrains.com/webstorm",
    icon: <BrandMark src="/webstorm.svg" />,
  },
}
