"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

import { ditherField } from "@/lib/pixel/pixel-fx"
import { cn } from "@/lib/utils"

/*
 * The profile header's fibo dither: a bunny in earbuds under a bank of
 * clouds, built from paper on load, then idling with a few cells blinking.
 * A window of the photo sits still over his face and ears, and a press
 * ripples the cells. The cell data and photo come from pixel-studio's `poster --field` export;
 * regenerate them there rather than editing the JSON.
 */

const FIELD = "/images/header/bunny-field.json"
const PHOTO = "/images/header/bunny-field-photo.jpg"

// The site's surface and ink for a theme, read from its tokens. In dark mode
// the cells invert too: light cells draw the white bunny on the dark page,
// where only swapping the colors would turn the photo into a negative. Light
// mode inks in pure black: the gaps between cells wash the foreground out, so
// the strip reads paler than text in the same color.
function themeTokens(theme: "light" | "dark") {
  const probe = document.createElement("div")
  probe.className = theme
  probe.hidden = true
  document.body.append(probe)
  const style = getComputedStyle(probe)
  const tokens = {
    paper: style.getPropertyValue("--background").trim(),
    ink:
      theme === "light"
        ? "#000"
        : style.getPropertyValue("--foreground").trim(),
    invert: theme === "dark",
  }
  probe.remove()
  return tokens
}

export function HeroDither({
  id,
  className,
}: {
  id?: string
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const photo = useRef<HTMLImageElement | null>(null)
  const built = useRef(false)
  const [field, setField] = useState<Record<string, unknown> | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let canceled = false
    const img = new Image()
    img.src = PHOTO
    photo.current = img
    fetch(FIELD)
      .then((res) => res.json())
      .then((data) => {
        if (!canceled) setField(data as Record<string, unknown>)
      })
      .catch(() => {})
    return () => {
      canceled = true
    }
  }, [])

  // Builds from paper once; a theme switch redraws the finished field.
  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !field || !resolvedTheme) return
    const stop = ditherField(canvas, field, {
      ...themeTokens(resolvedTheme === "dark" ? "dark" : "light"),
      photo: photo.current,
      build: !built.current,
      lens: null,
      pinWindow: true,
      align: "center",
    })
    built.current = true
    return stop
  }, [field, resolvedTheme])

  return (
    <div id={id} className={cn("overflow-hidden", className)}>
      {/* The field covers the strip from its middle, so narrow screens crop
          both ends and keep the bunny. */}
      <canvas
        ref={ref}
        role="img"
        aria-label="A white bunny in earbuds under a bank of clouds, drawn in 1-bit dither"
        className="absolute inset-0 size-full"
      />
    </div>
  )
}
