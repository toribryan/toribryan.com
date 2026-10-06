"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useInView } from "motion/react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useAnimationsPaused } from "@/components/animations-pause"

import type { GalleryMediaItem } from "../data/gallery"

/**
 * One piece at its own aspect ratio. A clip loops while it's on screen,
 * unless the reader paused animations or asks for reduced motion, in which
 * case it holds its first frame.
 */
export function GalleryMedia({
  item,
  sizes,
  eager,
  className,
}: {
  item: GalleryMediaItem
  sizes: string
  eager?: boolean
  className?: string
}) {
  if (item.kind === "video") {
    return <GalleryVideo item={item} className={className} />
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      sizes={sizes}
      loading={eager ? "eager" : undefined}
      unoptimized={item.src.endsWith(".svg")}
      className={className}
    />
  )
}

function GalleryVideo({
  item,
  className,
}: {
  item: GalleryMediaItem
  className?: string
}) {
  const video = useRef<HTMLVideoElement>(null)
  const inView = useInView(video, { amount: 0.25 })
  const paused = useAnimationsPaused()
  const reducedMotion = usePrefersReducedMotion()
  const plays = inView && !paused && !reducedMotion

  useEffect(() => {
    const element = video.current
    if (!element) return
    if (plays) element.play().catch(() => {})
    else element.pause()
  }, [plays])

  return (
    <video
      ref={video}
      src={`${item.src}#t=0.001`}
      width={item.width}
      height={item.height}
      aria-label={item.alt}
      loop
      muted
      playsInline
      preload="metadata"
      className={cn("bg-muted", className)}
    />
  )
}
