"use client"

import { useState } from "react"
import type { Route } from "next"
import Link from "next/link"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  Maximize2Icon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

import { galleryKey, type GalleryItem } from "../data/gallery"
import { GalleryIso, isLiveIso } from "./gallery-iso"
import { GalleryMedia } from "./gallery-media"

const TILE_SIZES = "(min-width: 768px) 256px, (min-width: 640px) 33vw, 50vw"

const FRAME =
  "rounded-xl inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10"
const LIFT =
  "transition-[filter,transform] duration-300 ease-out group-hover:brightness-95 motion-safe:group-hover:scale-[1.02]"

/**
 * A masonry wall of work, pictures only. Columns fill top to bottom, so the
 * order in `GALLERY` reads down each column. A piece opens larger in a
 * lightbox, where the arrows step through the rest. Playable iso scenes stay
 * live in their tiles and open from a corner button instead.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const current = open === null ? null : items[open]

  const step = (by: number) =>
    setOpen((index) =>
      index === null ? null : (index + by + items.length) % items.length
    )

  return (
    <>
      <ul className="columns-2 gap-2 sm:columns-3">
        {items.map((item, index) => (
          <li key={galleryKey(item)} className="mb-2 break-inside-avoid">
            {item.kind === "iso" && isLiveIso(item.piece) ? (
              <div className={cn("group relative bg-card p-3", FRAME)}>
                <GalleryIso piece={item.piece} />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Open larger: ${item.alt}`}
                  onClick={() => setOpen(index)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100"
                >
                  <Maximize2Icon />
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-label={item.alt}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {item.kind === "iso" ? (
                  <div className={cn("bg-card p-3", FRAME, LIFT)}>
                    <GalleryIso piece={item.piece} />
                  </div>
                ) : (
                  <GalleryMedia
                    item={item}
                    sizes={TILE_SIZES}
                    eager={index < 6}
                    className={cn("h-auto w-full", FRAME, LIFT)}
                  />
                )}
              </button>
            )}
          </li>
        ))}
      </ul>

      <Dialog
        open={current !== null}
        onOpenChange={(next) => !next && setOpen(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="gap-3 p-3 sm:max-w-5xl"
          onKeyDown={(event) => {
            // A playable scene keeps its own arrow keys.
            if ((event.target as Element).closest("[role=application]")) return
            if (event.key === "ArrowRight") step(1)
            if (event.key === "ArrowLeft") step(-1)
          }}
        >
          {current && (
            <>
              <DialogTitle className="sr-only">{current.alt}</DialogTitle>
              <DialogDescription className="sr-only">
                Use the arrow keys to see the next or previous piece.
              </DialogDescription>
              {current.kind === "iso" ? (
                <div
                  key={current.piece}
                  className="mx-auto w-full max-w-2xl overflow-y-auto"
                >
                  <GalleryIso piece={current.piece} full />
                </div>
              ) : (
                // Sized from the piece's ratio, so the frame holds its shape before it loads.
                <div
                  className="mx-auto max-w-full"
                  style={{
                    aspectRatio: `${current.width} / ${current.height}`,
                    width: `min(100%, calc(80svh * ${current.width / current.height}))`,
                  }}
                >
                  <GalleryMedia
                    key={current.src}
                    item={current}
                    sizes="(min-width: 1024px) 1000px, 100vw"
                    eager
                    className="size-full rounded-lg"
                  />
                </div>
              )}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous"
                  onClick={() => step(-1)}
                >
                  <ArrowLeftIcon />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Next"
                  onClick={() => step(1)}
                >
                  <ArrowRightIcon />
                </Button>
                <span className="flex-1" />
                {current.href && (
                  <Button variant="ghost" size="icon-sm" asChild>
                    <Link
                      href={current.href as Route}
                      aria-label="Open the project"
                    >
                      <ArrowUpRightIcon />
                    </Link>
                  </Button>
                )}
                <DialogClose asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Close">
                    <XIcon />
                  </Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
