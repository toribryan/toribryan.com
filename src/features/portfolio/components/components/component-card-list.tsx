"use client"

import { useRef, useState } from "react"
import type { Route } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { usePageVisible } from "@/hooks/use-page-visible"
import { useAnimationsPaused } from "@/components/animations-pause"
import {
  CATALOG,
  fiboStorybookUrl,
  SHELVES,
  type CatalogPart,
} from "@/features/portfolio/data/fibo-catalog"
import { NICHE_PARTS } from "@/features/portfolio/data/fibo-niche"

import { PREVIEWS } from "./catalog-previews"
import { COVERS } from "./covers"

// Parts whose cover is a one-off gesture rather than a loop, so it waits for
// the pointer instead of repeating on its own.
const PLAYS_ON_HOVER = new Set(["reactions"])

/**
 * fibo's parts as cover cards, two across on phones and three from md up,
 * with the live part standing in for the cover image.
 */
export function ComponentCardList({
  home = false,
}: {
  /** Only the parts the home page features, rather than every part. */
  home?: boolean
}) {
  const parts = NICHE_PARTS.filter((part) => !home || part.home !== false)
  return <CardGrid parts={parts} />
}

const HAS_PAGE = new Set(NICHE_PARTS.map((part) => part.name))

/**
 * Every fibo part laid out like fibo's Catalog page: each shelf, then its
 * groups in fibo's order, with deprecated parts last in their group. Parts
 * with a page here open it; the rest open their docs in fibo's Storybook.
 */
export function CatalogList() {
  return (
    <div className="flex flex-col">
      {SHELVES.map((shelf) => (
        <section key={shelf.id} aria-labelledby={shelf.id}>
          <header className="screen-line-bottom flex flex-col gap-1 p-4">
            <h2
              id={shelf.id}
              className="font-heading text-2xl/9 font-medium text-balance"
            >
              {shelf.title}
            </h2>
            <p className="text-balance text-muted-foreground">
              {shelf.description}
            </p>
          </header>
          {shelf.groups.map((group) => {
            const parts = CATALOG.filter(
              (part) => part.shelf === shelf.id && part.group === group
            ).sort(
              (a, b) =>
                Number(a.status === "deprecated") -
                Number(b.status === "deprecated")
            )
            if (parts.length === 0) return null
            return (
              <section
                key={group}
                aria-labelledby={`${shelf.id}-${group}`}
                className="screen-line-bottom"
              >
                <h3
                  id={`${shelf.id}-${group}`}
                  className="screen-line-bottom flex items-baseline gap-2 px-4 py-2 text-sm font-medium"
                >
                  {group}
                  <span className="font-mono text-xs text-muted-foreground">
                    {parts.length}
                  </span>
                </h3>
                <CardGrid parts={parts} details />
              </section>
            )
          })}
        </section>
      ))}
    </div>
  )
}

type CardPart = Pick<CatalogPart, "name" | "title"> &
  Partial<Pick<CatalogPart, "description" | "status">>

function CardGrid({
  parts,
  details = false,
}: {
  parts: CardPart[]
  /** Shows each part's description and status under its title. */
  details?: boolean
}) {
  // Blank cells finish the last row, so the grid's line color doesn't show
  // through as a block where cards run out: two across, and on the home page
  // three from md up. The catalog stays two across for its descriptions.
  const wide = !details
  const fillers = (columns: number) =>
    (columns - (parts.length % columns)) % columns
  const blanks = wide ? Math.max(fillers(2), fillers(3)) : fillers(2)
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-px bg-line",
        wide && "md:grid-cols-3"
      )}
    >
      {parts.map((part) => (
        <li key={part.name} className="bg-background">
          <ComponentCard part={part} details={details} />
        </li>
      ))}
      {Array.from({ length: blanks }, (_, index) => (
        <li
          key={`blank-${index}`}
          aria-hidden
          className={cn(
            "bg-background",
            wide && index >= fillers(2) && "max-md:hidden",
            wide && index >= fillers(3) && "md:hidden"
          )}
        />
      ))}
    </ul>
  )
}

/**
 * Loops the cover while the card is on screen. A hover-only cover plays while
 * the pointer is over the card or its link has focus, and while the card is
 * on screen where nothing can hover. Paused, every cover waits for the
 * pointer that way instead. Nothing plays under reduced motion or while the
 * tab is hidden.
 */
function ComponentCard({
  part,
  details,
}: {
  part: CardPart
  details: boolean
}) {
  const card = useRef<HTMLDivElement>(null)
  const noHover = useMediaQuery("(hover: none)")
  const reduceMotion = useReducedMotion()
  const paused = useAnimationsPaused()
  const visible = usePageVisible()
  const inView = useInView(card, { amount: 0.4 })
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const onHover = (paused || PLAYS_ON_HOVER.has(part.name)) && !noHover
  const active =
    !reduceMotion &&
    visible &&
    (onHover ? hovered || focused : !paused && inView)
  const Cover = COVERS[part.name]
  const preview = Cover ? null : PREVIEWS[part.name]
  const onSite = HAS_PAGE.has(part.name)

  return (
    <div
      ref={card}
      className="relative flex h-full flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent-muted"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        className="relative aspect-4/3 overflow-hidden rounded-xl bg-cover-plate select-none"
        aria-hidden
        inert
      >
        {Cover ? (
          <Cover active={active} />
        ) : preview ? (
          <div className="flex size-full items-center justify-center max-sm:[zoom:0.7]">
            {preview}
          </div>
        ) : null}
        <div className="pointer-events-none absolute inset-0 rounded-xl inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15" />
      </div>

      <div className="flex flex-col gap-1 p-1 sm:p-2">
        <h3 className="flex items-center gap-2 text-base leading-snug font-medium text-balance sm:text-lg">
          {onSite ? (
            <Link
              href={`/components/${part.name}` as Route}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            >
              <span className="absolute inset-0" aria-hidden />
              {part.title}
            </Link>
          ) : (
            <a
              href={fiboStorybookUrl(part.name)}
              target="_blank"
              rel="noreferrer"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            >
              <span className="absolute inset-0" aria-hidden />
              {part.title}
              <span className="sr-only"> (opens fibo&apos;s Storybook)</span>
            </a>
          )}
          {details && part.status ? (
            <span
              className={cn(
                "rounded-full border px-1.5 py-0.5 font-mono text-[10px] leading-none uppercase",
                part.status === "deprecated"
                  ? "border-destructive text-destructive"
                  : "border-success text-success"
              )}
            >
              {part.status}
            </span>
          ) : null}
          {!onSite ? (
            <ArrowUpRightIcon
              aria-hidden
              className="ml-auto size-4 shrink-0 text-muted-foreground"
            />
          ) : null}
        </h3>
        {details && part.description ? (
          <p className="line-clamp-3 text-sm text-muted-foreground max-sm:line-clamp-2">
            {part.description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
