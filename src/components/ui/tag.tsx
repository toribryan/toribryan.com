import React from "react"

import { cn } from "@/lib/utils"

function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex h-6 items-center gap-1.25 rounded-md bg-zinc-50/80 px-2 font-mono text-xs text-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80",
        "[&_svg]:shrink-0 [&_svg]:text-muted-foreground/80 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

export { Tag }
