"use client"

import { useState } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { VideoPlayer } from "@/components/video-player"

/** The clip at full size over the page, titled with its label. */
function FullView({
  src,
  poster,
  label,
}: {
  src: string
  poster?: string
  label: string
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
          <VideoPlayer
            src={src}
            poster={poster}
            label={label}
            className="max-h-full max-w-full rounded-lg bg-white"
            videoClassName="max-h-[calc(100dvh-6rem)] w-auto max-w-full md:max-h-[calc(100dvh-8rem)]"
          />
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  )
}

/**
 * A short demo clip, looping and muted like an animated screenshot. With
 * `label`, it gets an action bar (play, scrub, speed) and can open full size;
 * without one it stays a plain clip with no chrome.
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
  /** Names the clip and gives it an action bar and a full view. */
  label?: string
  poster?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const frame =
    "w-full rounded-xl bg-black inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15"
  const square = fit === "square" && "aspect-square max-w-md object-cover"

  return (
    <figure className={cn("not-prose my-8", className)}>
      {label ? (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <VideoPlayer
            src={src}
            poster={poster}
            label={label}
            onExpand={() => setOpen(true)}
            className={cn("rounded-xl", square)}
            videoClassName={cn(frame, square)}
          />
          <FullView src={src} poster={poster} label={label} />
        </Dialog.Root>
      ) : (
        <video
          className={cn(frame, square)}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {caption && (
        <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
