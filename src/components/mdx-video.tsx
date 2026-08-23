import { cn } from "@/lib/utils"

/**
 * A short demo clip, looping and muted by default like an animated
 * screenshot. `controls` stays on so a reader can pause it or turn the sound
 * on if the source has any.
 */
export function Video({
  src,
  caption,
  className,
}: {
  /** Path under `public/`, e.g. `/case-studies/foo.mov`. */
  src: string
  caption?: React.ReactNode
  className?: string
}) {
  return (
    <figure className={cn("not-prose my-8", className)}>
      <video
        className="w-full rounded-xl bg-black inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15"
        src={src}
        autoPlay
        loop
        muted
        playsInline
        controls
      />

      {caption && (
        <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
