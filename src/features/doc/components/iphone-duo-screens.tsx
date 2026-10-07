"use client"

import { useEffect, useRef, type ReactNode, type Ref } from "react"
import { getFontEmbedCSS, toPng } from "html-to-image"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Calendar, type CalendarEvent } from "@/components/fibo/calendar"

const OCTOBER = new Date(2026, 9, 1)
const SELECTED = new Date(2026, 9, 14)
const at = (day: number, hour: number, minute = 0) =>
  new Date(2026, 9, day, hour, minute)

const EVENTS: CalendarEvent[] = [
  { id: "planning", title: "Quarterly planning", start: at(1, 9) },
  { id: "review", title: "Design review", start: at(5, 10) },
  { id: "ana", title: "1:1 with Ana", start: at(5, 14) },
  { id: "offsite", title: "Team offsite", start: at(8, 0), allDay: true },
  { id: "standup", title: "Standup", start: at(14, 9, 30) },
  { id: "launch", title: "Launch prep", start: at(14, 13) },
  { id: "crit", title: "Crit", start: at(16, 11) },
  { id: "dentist", title: "Dentist", start: at(20, 16, 30) },
  { id: "workshop", title: "Research workshop", start: at(21, 13) },
  { id: "release", title: "Release 0.3", start: at(23, 0), allDay: true },
  { id: "retro", title: "Retro", start: at(27, 15) },
  { id: "party", title: "Halloween party", start: at(30, 18) },
]

/*
 * The renderer's two screen textures are 3072 by 2160 for the inner display
 * and 1536 by 2234 for the cover. The inner one is laid out 1100 CSS pixels
 * wide, past the month view's widest breakpoint, so its events show as cards
 * with the agenda beside them; the cover at a phone's width.
 */
const TEXTURE = { inner: 3072, cover: 1536 }
const INNER = { width: 1100, height: (1100 * 1080) / 1536 }
const COVER = { width: 384, height: (384 * 1117) / 768 }

export type DuoScreenImages = { inner: string; cover: string }

/**
 * Draws fibo's Calendar into the phone's two screen images, October with the
 * 14th picked: across the inner display its events sit as cards in the day
 * cells, and on the narrow cover, the layout it takes on a phone, they turn
 * to dots with the picked day's agenda below. Both are laid out off screen,
 * captured and handed to `onCapture`, and again whenever the theme changes,
 * so the screens follow it.
 */
export function DuoScreenCapture({
  onCapture,
}: {
  onCapture: (images: DuoScreenImages) => void
}) {
  const { resolvedTheme } = useTheme()
  const inner = useRef<HTMLDivElement>(null)
  const cover = useRef<HTMLDivElement>(null)
  const report = useRef(onCapture)
  useEffect(() => {
    report.current = onCapture
  })

  useEffect(() => {
    let cancelled = false
    const capture = async () => {
      await document.fonts.ready
      // Two frames, so the theme's colors have landed before anything is
      // drawn.
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
      if (cancelled || !inner.current || !cover.current) return
      const fontEmbedCSS = await getFontEmbedCSS(inner.current)
      const [innerImage, coverImage] = await Promise.all([
        toPng(inner.current, {
          fontEmbedCSS,
          pixelRatio: TEXTURE.inner / INNER.width,
        }),
        toPng(cover.current, {
          fontEmbedCSS,
          pixelRatio: TEXTURE.cover / COVER.width,
        }),
      ])
      if (!cancelled) report.current({ inner: innerImage, cover: coverImage })
    }
    capture().catch(() => {})
    return () => {
      cancelled = true
    }
  }, [resolvedTheme])

  return (
    <div
      aria-hidden
      inert
      className="pointer-events-none fixed top-0 -left-[10000px]"
    >
      <Screen ref={inner} size={INNER} className="px-8 pb-5">
        <October />
      </Screen>
      <Screen
        ref={cover}
        size={COVER}
        statusClassName="pr-20"
        className="px-5 pb-6"
      >
        <October />
      </Screen>
    </div>
  )
}

function Screen({
  ref,
  size,
  statusClassName,
  className,
  children,
}: {
  ref: Ref<HTMLDivElement>
  size: { width: number; height: number }
  /** Room for the cover's camera, at its top right. */
  statusClassName?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      ref={ref}
      // A picture of a screen has nothing to scroll, so no scrollbars.
      className="fibo-palette relative flex flex-col overflow-hidden bg-background text-foreground [&_*]:[scrollbar-width:none]"
      style={size}
    >
      <StatusBar className={statusClassName} />
      <div className={cn("flex min-h-0 flex-1 flex-col pt-3", className)}>
        {children}
      </div>
    </div>
  )
}

function October() {
  return (
    <Calendar
      type="month"
      events={EVENTS}
      defaultMonth={OCTOBER}
      defaultValue={SELECTED}
    />
  )
}

/** 9:41, signal and battery, clear of the screen's rounded corners. */
function StatusBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-14 items-end justify-between px-10 pb-1 text-[15px] font-semibold tabular-nums",
        className
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <span className="flex h-3 items-end gap-0.5">
          {[0.4, 0.6, 0.8, 1].map((height) => (
            <span
              key={height}
              className="w-[3px] rounded-[1px] bg-current"
              style={{ height: `${height * 100}%` }}
            />
          ))}
        </span>
        <span className="ml-1 h-3 w-6 rounded-[4px] border border-current/40 p-px">
          <span className="block h-full w-4/5 rounded-[2px] bg-current" />
        </span>
      </span>
    </div>
  )
}
