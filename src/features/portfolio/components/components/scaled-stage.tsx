"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Lays its child out at `width` and scales it to fill the cover's width, so
 * a part draws its full layout rather than its narrow one. Hidden until the
 * cover has been measured.
 */
export function ScaledStage({
  width,
  zoom = false,
  children,
}: {
  width: number
  /**
   * Scale with CSS zoom rather than a transform. A transformed stage is
   * rasterized again at slightly different sub-pixel offsets whenever
   * something inside it animates, so small icons shimmer; a zoomed one lays
   * out at the final size and holds still. Popups that measure the page
   * expect a transform, so the fibo part covers keep it.
   */
  zoom?: boolean
  children: ReactNode
}) {
  const frame = useRef<HTMLDivElement>(null)
  const [coverWidth, setCoverWidth] = useState<number | null>(null)
  const scale = coverWidth === null ? null : coverWidth / width

  useEffect(() => {
    const element = frame.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      setCoverWidth(entry.contentRect.width)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={frame} className="absolute inset-0">
      <div
        className={cn(
          "relative origin-top-left transition-opacity duration-300",
          scale === null && "opacity-0"
        )}
        style={{
          width,
          // Zoom scales the layout box itself, so the stage needs only the
          // cover's height; a transform scales after layout and needs more.
          ...(zoom
            ? { height: "100%", zoom: scale ?? 1 }
            : {
                height: scale ? `${100 / scale}%` : "100%",
                transform: `scale(${scale ?? 1})`,
              }),
        }}
      >
        {children}
      </div>
    </div>
  )
}
