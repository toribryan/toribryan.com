import { cn } from "@/lib/utils"
import type { Doc } from "@/features/doc/types/document"

import { DocCard } from "./doc-card"

export function DocCardList({
  docs,
  basePath,
  emptyMessage = "Nothing here yet.",
  className,
}: {
  docs: Doc[]
  basePath: string
  emptyMessage?: string
  className?: string
}) {
  return (
    <div className={cn("relative pt-4", className)}>
      <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
        <div className="border-r border-line" />
        <div className="border-l border-line" />
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {docs.map((doc, index) => (
          <li
            key={doc.slug}
            className={cn(
              "max-sm:screen-line-top max-sm:screen-line-bottom",
              "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom"
            )}
          >
            <DocCard
              doc={doc}
              basePath={basePath}
              headingAs="h3"
              imageLoading={index <= 3 ? "eager" : "lazy"}
            />
          </li>
        ))}

        {docs.length === 0 && (
          <li className="screen-line-top screen-line-bottom p-4">
            <p className="font-mono text-sm">{emptyMessage}</p>
          </li>
        )}
      </ul>
    </div>
  )
}
