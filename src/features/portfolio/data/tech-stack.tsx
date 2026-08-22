import {
  ClaudeIcon,
  CursorIcon,
  NextJsIcon,
  ReactIcon,
  TsIcon,
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
    key: "lovable",
    title: "Lovable",
    href: "https://lovable.dev",
    icon: <BrandMark src="/lovable.svg" alt="" />,
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
    key: "nextjs",
    title: "Next.js",
    href: "https://nextjs.org",
    icon: <NextJsIcon />,
    categories: ["Engineering"],
  },
  {
    key: "typescript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
    icon: <TsIcon />,
    categories: ["Engineering"],
  },
  {
    key: "azure",
    title: "Azure",
    href: "https://azure.microsoft.com",
    icon: <BrandMark src="/azure.svg" alt="" />,
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
    key: "elevenlabs",
    title: "ElevenLabs",
    href: "https://elevenlabs.io",
    icon: <BrandMark src="/elevenlabsai.svg" alt="" />,
    categories: ["Research"],
  },
]
