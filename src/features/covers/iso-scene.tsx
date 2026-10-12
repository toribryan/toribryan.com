import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"
import { box, fmt, P, TOP } from "@/features/portfolio/components/iso/iso"

/** A box as iso.ts draws it, given as x, y, z, width, depth, height, radius. */
export type Box = [number, number, number, number, number, number, number?]

/** Raw iso markup, from iso.ts's string builders. */
export const Raw = ({ html }: { html: string }) => (
  <g dangerouslySetInnerHTML={{ __html: html }} />
)

export const boxHtml = ([x, y, z, w, d, h, r = 0]: Box) =>
  box(x, y, z, w, d, h, r)

/** A group that plays one of the iso keyframes in globals.css. */
export function Anim({
  name,
  duration,
  delay = 0,
  style,
  children,
}: {
  name: string
  duration: number
  delay?: number
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <g
      className="iso-anim"
      style={{
        animation: `${name} ${duration}s ease-in-out ${delay}s infinite`,
        ...style,
      }}
    >
      {children}
    </g>
  )
}

/** Children drawn flat on the top face at height z, from (x, y). */
export const OnTop = ({
  x,
  y,
  z,
  children,
}: {
  x: number
  y: number
  z: number
  children: ReactNode
}) => <g transform={TOP(x, y, z)}>{children}</g>

/** The viewBox that fits these boxes, with a margin. */
function frame(boxes: Box[], pad: number) {
  const pts = boxes.flatMap(([x, y, z, w, d, h]) =>
    [x, x + w].flatMap((px) =>
      [y, y + d].flatMap((py) => [z, z + h].map((pz) => P(px, py, pz)))
    )
  )
  const xs = pts.map(([x]) => x)
  const ys = pts.map(([, y]) => y)
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad
  return [
    minX,
    minY,
    Math.max(...xs) + pad - minX,
    Math.max(...ys) + pad - minY,
  ]
    .map(fmt)
    .join(" ")
}

/**
 * An isometric line-art cover, framed to `bounds`. It plays with `loop`, on
 * its card's hover, or anywhere nothing can hover, and holds its rest pose
 * otherwise and with reduced motion.
 */
export function IsoScene({
  bounds,
  pad = 12,
  loop = false,
  fill = false,
  className,
  children,
}: {
  bounds: Box[]
  pad?: number
  loop?: boolean
  /** Fill the plate edge to edge, for wide scenes. */
  fill?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div
      data-loop={loop || undefined}
      className={cn(
        "iso-cover flex size-full items-center justify-center",
        className
      )}
    >
      <svg
        viewBox={frame(bounds, pad)}
        className={cn(
          "overflow-visible",
          fill ? "h-[94%] max-w-[96%]" : "h-[78%] max-w-[88%]"
        )}
        aria-hidden
      >
        {children}
      </svg>
    </div>
  )
}
