"use client"

import { useSetAtom } from "jotai"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { siteSearchOpenAtom } from "@/features/search/search-open"

/** The header's way into the site search, beside its Cmd+K shortcut. */
export function HeaderSearch() {
  const setOpen = useSetAtom(siteSearchOpenAtom)

  return (
    <Button
      variant="ghost"
      className="gap-2 px-2 text-muted-foreground hover:text-foreground"
      aria-haspopup="dialog"
      aria-label="Search"
      onClick={() => setOpen(true)}
    >
      <SearchIcon aria-hidden />
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>
  )
}
