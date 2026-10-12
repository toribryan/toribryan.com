"use client"

import { useEffect, useRef, useState, type ComponentProps } from "react"

import { useHashTarget } from "@/hooks/use-hash-target"
import { Collapsible } from "@/components/base/collapsible-animated"

/**
 * A role's collapsible that a link to `#<anchor>`, such as a site search
 * result, opens and scrolls into view. Client-only so the role's content,
 * a server-rendered Markdown block, can stay on the server.
 */
export function RevealCollapsible({
  anchor,
  defaultOpen = false,
  ...props
}: Omit<ComponentProps<typeof Collapsible>, "open" | "onOpenChange"> & {
  anchor: string
}) {
  const target = useHashTarget()
  const [open, setOpen] = useState(defaultOpen)
  const [seen, setSeen] = useState<string | null>(null)
  if (target !== seen) {
    setSeen(target)
    if (target === anchor) setOpen(true)
  }

  // Waits a beat so Show more can open around the role first.
  const node = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (target !== anchor) return
    const timer = window.setTimeout(
      () =>
        node.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80
    )
    return () => window.clearTimeout(timer)
  }, [target, anchor])

  return (
    <Collapsible
      {...props}
      ref={node}
      id={anchor}
      open={open}
      onOpenChange={setOpen}
    />
  )
}
