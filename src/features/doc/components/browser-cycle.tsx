"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

import { SafariFrame } from "./browser-frame"

/**
 * Stills of one screen in different states, crossfading inside a Safari
 * window while in view. Holds the last state with reduced motion. `srcs` is
 * comma-separated, as MDX props are strings.
 */
export function BrowserCycle({
  srcs,
  alt,
  caption,
  interval = "2600",
}: {
  srcs: string
  alt: string
  caption?: React.ReactNode
  interval?: string
}) {
  const frames = srcs.split(",").map((src) => src.trim())
  const box = useRef<HTMLDivElement>(null)
  const inView = useInView(box, { amount: 0.4 })
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const id = window.setInterval(
      () => setShown((index) => (index + 1) % frames.length),
      Number(interval) || 2600
    )
    return () => window.clearInterval(id)
  }, [inView, reduceMotion, interval, frames.length])

  const active = reduceMotion ? frames.length - 1 : shown

  return (
    <figure className="not-prose my-8">
      <SafariFrame size={30}>
        <div ref={box} className="grid" role="img" aria-label={alt}>
          {frames.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              className="col-start-1 row-start-1 block w-full transition-opacity duration-700"
              style={{ opacity: index === active ? 1 : 0 }}
            />
          ))}
        </div>
      </SafariFrame>
      {caption && (
        <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
