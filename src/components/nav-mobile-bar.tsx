import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { NavMobile } from "@/components/nav-mobile"

/**
 * The floating nav for small screens.
 *
 * `NavDesktop` is `max-sm:hidden`, so below `sm` the header carries no links
 * at all and the only way out of a page is the logo. This puts the menu back,
 * anchored to the bottom of the viewport where a thumb reaches rather than the
 * top where the header already is.
 *
 * Holds the bottom-right corner. `ScrollToTop` moves to the left below `sm`
 * to make room, so the two sit on one baseline at opposite edges rather than
 * stacking. The outer track is `pointer-events-none` so the page underneath
 * stays scrollable everywhere except the pill itself.
 */
export function NavMobileBar({ items }: { items: NavItem<Route>[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "[--bottom:0.5rem]",
        "pointer-events-none fixed inset-x-0 bottom-[calc(var(--bottom)+env(safe-area-inset-bottom,0))] z-50",
        "flex justify-end pr-4 sm:hidden"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full p-1.5",
          "bg-background/85 shadow-lg backdrop-blur-md",
          "inset-ring-1 inset-ring-border"
        )}
      >
        <NavMobile items={items} />
      </div>
    </div>
  )
}
