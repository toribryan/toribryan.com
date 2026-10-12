"use client"

import { usePathname } from "next/navigation"

import { MENU } from "@/config/site"
import { Nav } from "@/components/nav"

// The avatar already goes home; fibo lore and Recommendations stay in the
// dock's menu.
const HEADER_PAGES = new Set(["/projects", "/latest", "/components"])

/** The main pages, in the header from sm up. */
export function HeaderNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <Nav
      items={MENU.filter((item) => HEADER_PAGES.has(item.href))}
      activeId={pathname}
      className={className}
    />
  )
}
