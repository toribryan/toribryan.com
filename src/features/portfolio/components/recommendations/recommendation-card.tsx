"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { format } from "date-fns"
import { ArrowUpRightIcon, Maximize2Icon, XIcon } from "lucide-react"

import type { Recommendation } from "@/features/portfolio/types/recommendations"

/**
 * One recommendation as its quoted line, which opens the whole text in a
 * dialog. The line stays set off inside the whole, so it's easy to find.
 */
export function RecommendationCard({
  recommendation,
  index,
  linkedin,
}: {
  recommendation: Recommendation
  index: number
  /** LinkedIn's page of recommendations, for reading the original. */
  linkedin: string
}) {
  const { name, role, relationship, date, quote, text } = recommendation
  const number = String(index + 1).padStart(2, "0")
  const month = format(new Date(`${date}-01T00:00:00`), "MMM yyyy")

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger className="group flex h-full w-full flex-col gap-5 p-4 text-left outline-none hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
        <span className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>{number}</span>
          <span className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-100">
            Read in full
            <Maximize2Icon aria-hidden className="size-3" />
          </span>
        </span>
        <span className="flex-1 text-base/relaxed text-pretty">“{quote}”</span>
        <Byline name={name} role={role} relationship={relationship} />
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[min(40rem,calc(100dvh-2rem))] w-[calc(100vw-1.5rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border bg-popover text-popover-foreground shadow-xl transition-[opacity,scale] duration-200 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <header className="flex items-start gap-3 border-b border-line p-5">
            <div className="flex-1">
              <DialogPrimitive.Title className="font-sans text-base font-medium">
                <Byline name={name} role={role} relationship={relationship} />
              </DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="-mt-1 -mr-1 flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <XIcon className="size-4" />
            </DialogPrimitive.Close>
          </header>

          <blockquote
            cite={linkedin}
            className="flex min-h-0 flex-col gap-3 overflow-y-auto p-5 text-pretty text-muted-foreground"
          >
            {text ? (
              text
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i}>{withQuote(paragraph, quote)}</p>
                ))
            ) : (
              <p>
                …<Excerpt>{quote}</Excerpt>…
              </p>
            )}
          </blockquote>

          <footer className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 font-mono text-xs text-muted-foreground">
            <time dateTime={date}>{month}</time>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-2 hover:text-foreground hover:underline"
            >
              {text ? "On LinkedIn" : "Read it in full on LinkedIn"}
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </footer>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function Byline({
  name,
  role,
  relationship,
}: Pick<Recommendation, "name" | "role" | "relationship">) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")

  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className="flex size-10 shrink-0 items-center justify-center rounded-md bg-zinc-50/80 font-mono text-xs text-muted-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80"
      >
        {initials}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm leading-snug font-medium text-foreground">
          {name}
        </span>
        <span className="text-xs leading-snug text-muted-foreground">
          {role} · {relationship}
        </span>
      </span>
    </span>
  )
}

/** The paragraph with its quoted line set off where it sits. */
function withQuote(paragraph: string, quote: string) {
  const at = paragraph.indexOf(quote)
  if (at === -1) return paragraph
  return (
    <>
      {paragraph.slice(0, at)}
      <Excerpt>{quote}</Excerpt>
      {paragraph.slice(at + quote.length)}
    </>
  )
}

function Excerpt({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-accent box-decoration-clone px-0.5 text-foreground">
      {children}
    </mark>
  )
}
