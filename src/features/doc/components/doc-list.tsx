import type { Route } from "next"
import Link from "next/link"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import type { Doc } from "@/features/doc/types/document"

/**
 * Cover-less alternative to `DocCardList` — one row per doc, no thumbnail.
 * Used where the writing is the draw and the art isn't (or doesn't exist yet).
 */
export function DocList({
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
  if (docs.length === 0) {
    return (
      <div className={cn("screen-line-top screen-line-bottom p-4", className)}>
        <p className="font-mono text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ul className={cn("flex flex-col", className)}>
      {docs.map((doc) => {
        const {
          title,
          description,
          period,
          createdAt,
          new: isNew,
          updated,
        } = doc.metadata

        return (
          <li key={doc.slug} className="screen-line-bottom">
            <Link
              href={`${basePath}/${doc.slug}` as Route}
              className="group/doc-row flex flex-col gap-1 p-4 transition-[background-color] ease-out hover:bg-accent-muted sm:flex-row sm:items-baseline sm:gap-6"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="leading-snug font-medium text-balance">
                  {title}
                  {(isNew || updated) && (
                    <span className="ml-2 inline-block size-2 -translate-y-px rounded-full bg-info">
                      <span className="sr-only">
                        {isNew ? "New" : "Updated"}
                      </span>
                    </span>
                  )}
                </h3>

                {description && (
                  <p className="line-clamp-2 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>

              <div className="shrink-0 font-mono text-xs tracking-wide text-muted-foreground tabular-nums">
                {period ?? (
                  <time dateTime={new Date(createdAt).toISOString()}>
                    {format(new Date(createdAt), "dd.MM.yyyy")}
                  </time>
                )}
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
