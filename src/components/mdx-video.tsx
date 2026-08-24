import { cn } from "@/lib/utils"

/**
 * A short demo clip, looping and muted like an animated screenshot. No
 * `controls`: the chrome only appeared on hover, which put a scrub bar over
 * the part of the clip a reader had just moved to look at.
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
      />

      {caption && (
        <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
