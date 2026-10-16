"use client"

import { Dialog } from "@base-ui/react/dialog"
import { MaximizeIcon, PlayIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** The clip at full size over the page, titled with its label. */
function FullView({
  src,
  poster,
  label,
  controls = false,
}: {
  src: string
  poster?: string
  label: string
  controls?: boolean
}) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
      <Dialog.Popup className="fixed inset-3 z-50 flex flex-col gap-3 outline-none md:inset-8">
        <div className="flex items-center justify-between gap-3 text-sm text-white">
          <Dialog.Title className="font-medium">{label}</Dialog.Title>
          <Dialog.Close
            className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close"
          >
            <XIcon className="size-4" />
          </Dialog.Close>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <video
            className="max-h-full max-w-full rounded-lg bg-white object-contain"
            src={src}
            poster={poster}
            aria-label={label}
            autoPlay
            loop={!controls}
            controls={controls}
            muted
            playsInline
          />
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  )
}

/**
 * A short demo clip, looping and muted like an animated screenshot. No
 * `controls`: the chrome only appeared on hover, which put a scrub bar over
 * the part of the clip a reader had just moved to look at. With `label`, a
 * button in the corner opens the clip at full size.
 */
export function Video({
  src,
  caption,
  fit,
  label,
  poster,
  className,
}: {
  /** Path under `public/`, e.g. `/case-studies/foo.mov`. */
  src: string
  caption?: React.ReactNode
  /** `square` caps a square clip at a card's width instead of the column's. */
  fit?: "square"
  /** Names the clip and makes it expandable; shown as the full view's title. */
  label?: string
  poster?: string
  className?: string
}) {
  const clip = (
    <video
      className={cn(
        "w-full rounded-xl bg-black inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15",
        fit === "square" && "aspect-square max-w-md object-cover"
      )}
      src={src}
      poster={poster}
      aria-label={label}
      autoPlay
      loop
      muted
      playsInline
    />
  )

  return (
    <figure className={cn("not-prose my-8", className)}>
      {label ? (
        <Dialog.Root>
          <div className="relative">
            {clip}
            <Dialog.Trigger
              className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label={`Open ${label} full size`}
            >
              <MaximizeIcon className="size-4" />
            </Dialog.Trigger>
          </div>
          <FullView src={src} poster={poster} label={label} />
        </Dialog.Root>
      ) : (
        clip
      )}

      {caption && (
        <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * A still of a longer clip with a play button. Nothing loads until it's
 * clicked, and then the clip plays full size with controls.
 */
export function WatchVideo({
  src,
  poster,
  label,
  duration,
  caption,
}: {
  src: string
  poster: string
  label: string
  /** Shown on the thumbnail, e.g. "0:34". */
  duration?: string
  caption?: React.ReactNode
}) {
  return (
    <figure className="not-prose my-8">
      <Dialog.Root>
        <Dialog.Trigger
          className="group/watch relative block w-full overflow-hidden rounded-xl text-left inset-ring-1 inset-ring-black/15 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:inset-ring-white/15"
          aria-label={`Watch ${label}`}
        >
          <img
            className="block w-full transition-[scale,filter] duration-300 ease-out group-hover/watch:scale-[1.015] group-hover/watch:brightness-95"
            src={poster}
            alt=""
            loading="lazy"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform duration-200 ease-out group-hover/watch:scale-105 sm:size-20">
              <PlayIcon className="ml-1 size-6 fill-current sm:size-7" />
            </span>
          </span>
          <span className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3 text-white">
            <span className="text-sm font-medium text-balance sm:text-base">
              {label}
            </span>
            {duration && (
              <span className="shrink-0 rounded-full bg-black/60 px-2 py-0.5 font-mono text-xs tabular-nums backdrop-blur-sm">
                {duration}
              </span>
            )}
          </span>
        </Dialog.Trigger>
        <FullView src={src} poster={poster} label={label} controls />
      </Dialog.Root>

      {caption && (
        <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
