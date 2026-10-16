"use client"

import { Dialog } from "@base-ui/react/dialog"
import { MaximizeIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

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
                  loop
                  muted
                  playsInline
                />
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
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
