import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

import { MAIN_NAV } from "@/config/site"
import { Separator } from "@/components/base/ui/separator"
import { HeaderLead } from "@/components/header-lead"
import { NavDesktop } from "@/components/nav-desktop"
import { ThemeToggle } from "@/components/theme-toggle"
import { getLatestPosts, getWorkDocs } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"
import { USER } from "@/features/portfolio/data/user"
import { SiteSearch, type SearchDoc } from "@/features/search/site-search"

// What the search needs from each doc, and nothing else, so the header
// doesn't ship every case study's body to the browser.
function toSearchDoc(doc: Doc, kind: "work" | "latest"): SearchDoc {
  const m = doc.metadata
  const base = kind === "work" ? "/work" : "/latest"
  return {
    href: m.href ?? `${base}/${doc.slug}`,
    title: m.title,
    description: m.claim ?? m.description,
    kind,
    image: m.image,
    period: m.period,
    keywords: [...(m.skills ?? []), m.company, m.type].filter(
      (k): k is string => Boolean(k)
    ),
  }
}

const BrandContextMenu = dynamic(
  () => import("@/components/brand-context-menu")
)

export function SiteHeader() {
  const docs = [
    ...getWorkDocs().map((doc) => toSearchDoc(doc, "work")),
    ...getLatestPosts().map((doc) => toSearchDoc(doc, "latest")),
  ]
  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-2">
      <div className="screen-line-top screen-line-bottom mx-auto flex h-(--header-height) items-center gap-2 border-x border-line pr-2 pl-4 group-has-data-[slot=layout-wide]/layout:container after:z-1 after:bg-border sm:gap-4 md:max-w-3xl">
        <HeaderLead>
          <BrandContextMenu>
            <Link href="/" aria-label="Home">
              <Image
                className="size-8 shrink-0 select-none"
                src={USER.headerAvatar}
                alt=""
                width={165}
                height={166}
                priority
                unoptimized
              />
            </Link>
          </BrandContextMenu>
        </HeaderLead>

        <div className="flex-1" />

        <NavDesktop items={MAIN_NAV} />

        <div className="flex items-center">
          {MAIN_NAV.length > 0 && (
            <Separator
              orientation="vertical"
              className="mr-2 max-sm:hidden data-vertical:h-5 data-vertical:self-center"
            />
          )}
          <SiteSearch docs={docs} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
