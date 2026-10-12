import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

import { Separator } from "@/components/base/ui/separator"
import { HeaderLead } from "@/components/header-lead"
import { HeaderNav } from "@/components/header-nav"
import { HeaderSearch } from "@/components/header-search"
import { ThemeToggle } from "@/components/theme-toggle"
import { USER } from "@/features/portfolio/data/user"

const BrandContextMenu = dynamic(
  () => import("@/components/brand-context-menu")
)

export function SiteHeader() {
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

        {/* Phones use the dock at the bottom instead. */}
        <div className="flex items-center gap-4 max-sm:hidden">
          <HeaderNav className="gap-4" />
          <Separator
            orientation="vertical"
            className="data-vertical:h-5 data-vertical:self-center"
          />
          <HeaderSearch />
          <Separator
            orientation="vertical"
            className="data-vertical:h-5 data-vertical:self-center"
          />
        </div>

        <ThemeToggle />
      </div>
    </header>
  )
}
