"use client"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/base/ui/popover"

/**
 * A library that is listed but not yet readable.
 *
 * Rendered as a button rather than a link, so there is nothing to follow and
 * nothing for a crawler to index as a dead end. It stays focusable on purpose:
 * `disabled` would drop it out of the tab order and take the explanation with
 * it, so the row is styled as unavailable and says why when opened.
 */
export function ComponentItemComingSoon({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Popover>
      <PopoverTrigger
        className="flex w-full cursor-not-allowed items-center gap-4 p-4 pr-2 text-left opacity-60 transition-[opacity,background-color] ease-out hover:bg-accent-muted hover:opacity-75"
        aria-label={`${title}: coming soon`}
      >
        {children}
      </PopoverTrigger>

      <PopoverContent className="w-64" align="start" side="bottom">
        <PopoverHeader>
          <PopoverTitle className="font-medium">Coming soon</PopoverTitle>
          <PopoverDescription className="text-muted-foreground">
            {title} is still being built. It will publish here once the
            foundations are in place.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
