import {
  ClaudeIcon,
  CursorIcon,
  GitHubIcon,
  ReactIcon,
  ShadcnIcon,
  TailwindCssIcon,
} from "@/components/icons"

import type { TechStack } from "../types/tech-stack"

/** Brand marks that ship as SVGs under /public rather than as icon components. */
function BrandMark({ src, alt }: { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="size-3.5 shrink-0" aria-hidden />
}

export const TECH_STACK: TechStack[] = [
  {
    key: "figma",
    title: "Figma",
    href: "https://figma.com",
    icon: <BrandMark src="/Figma.svg" alt="" />,
    categories: ["Design"],
  },
  {
    key: "framer",
    title: "Framer",
    href: "https://framer.com",
    icon: <BrandMark src="/Framer.svg" alt="" />,
    categories: ["Web"],
  },
  {
    key: "adobe",
    title: "Adobe",
    href: "https://adobe.com",
    icon: <BrandMark src="/Adobe.svg" alt="" />,
    categories: ["Design"],
  },
  {
    key: "webflow",
    title: "Webflow",
    href: "https://webflow.com",
    icon: <BrandMark src="/Webflow.svg" alt="" />,
    categories: ["Web"],
  },

  {
    key: "claude-code",
    title: "Claude Code",
    href: "https://claude.com/claude-code",
    icon: <ClaudeIcon />,
    categories: ["Prototyping"],
  },
  {
    key: "cursor",
    title: "Cursor",
    href: "https://cursor.com",
    icon: <CursorIcon />,
    categories: ["Prototyping"],
  },

  {
    key: "react",
    title: "React",
    href: "https://react.dev",
    icon: <ReactIcon />,
    categories: ["Engineering"],
  },
  {
    key: "tailwindcss",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
    icon: <TailwindCssIcon />,
    categories: ["Engineering"],
  },
  {
    key: "shadcn-ui",
    title: "shadcn/ui",
    href: "https://ui.shadcn.com",
    icon: <ShadcnIcon />,
    categories: ["Engineering"],
  },
  {
    key: "storybook",
    title: "Storybook",
    href: "https://storybook.js.org",
    icon: <BrandMark src="/storybook-icon.svg" alt="" />,
    categories: ["Engineering"],
  },

  {
    key: "usertesting",
    title: "UserTesting",
    href: "https://www.usertesting.com",
    icon: <BrandMark src="/UserTesting.svg" alt="" />,
    categories: ["Research"],
  },
  {
    key: "loom",
    title: "Loom",
    href: "https://loom.com",
    icon: <BrandMark src="/Loom.svg" alt="" />,
    categories: ["Research"],
  },

  {
    key: "github",
    title: "GitHub",
    href: "https://github.com",
    icon: <GitHubIcon />,
    categories: ["Workflow"],
  },
  {
    key: "webstorm",
    title: "WebStorm",
    href: "https://www.jetbrains.com/webstorm",
    icon: <BrandMark src="/webstorm.svg" alt="" />,
    categories: ["Workflow"],
  },
  {
    key: "vscode",
    title: "VS Code",
    href: "https://code.visualstudio.com",
    icon: <BrandMark src="/vscode.svg" alt="" />,
    categories: ["Workflow"],
  },
  {
    key: "notion",
    title: "Notion",
    href: "https://notion.com",
    icon: <BrandMark src="/notion.svg" alt="" />,
    categories: ["Workflow"],
  },
  {
    key: "obsidian",
    title: "Obsidian",
    href: "https://obsidian.md",
    icon: <BrandMark src="/obsidian.svg" alt="" />,
    categories: ["Workflow"],
  },
]
