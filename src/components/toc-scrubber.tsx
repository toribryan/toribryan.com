"use client"

import { useMemo, useRef } from "react"

import { uMiniMapOpenSound } from "@/lib/soundcn/u-mini-map-open"
import { useSound } from "@/hooks/soundcn/use-sound"
import { ChapterScrubber } from "@/components/fibo/chapter-scrubber"

import { useActiveHeading, type TOCItemType } from "./toc-minimap"

/**
 * The page's outline as fibo's chapter scrubber: one mark per heading in the
 * margin, swelling under the pointer like the Dock with the heading's name
 * beside the crest. The mark for the section being read stays current as
 * the page scrolls, and choosing a mark scrolls to its heading. The
 * minimap's open sound plays as the pointer first reaches the rail.
 */
export function TOCScrubber({
  items,
  className,
}: {
  items: TOCItemType[]
  className?: string
}) {
  const ids = useMemo(
    () => items.map((item) => item.url.replace("#", "")),
    [items]
  )
  const chapters = useMemo(
    () =>
      items.map((item) => ({
        id: item.url,
        title: typeof item.title === "string" ? item.title : item.url,
      })),
    [items]
  )
  const active = useActiveHeading(ids)
  const current = Math.max(0, active ? ids.indexOf(active) : 0)

  const [play] = useSound(uMiniMapOpenSound, { volume: 0.3 })
  const engaged = useRef(false)

  if (!items.length) return null

  return (
    <ChapterScrubber
      chapters={chapters}
      orientation="vertical"
      side="left"
      preview="label"
      label="On this page"
      currentIndex={current}
      onCurrentIndexChange={(_, chapter) => scrollToHeading(chapter.id)}
      onActiveChange={(chapter) => {
        if (chapter && !engaged.current) play()
        engaged.current = Boolean(chapter)
      }}
      className={className}
    />
  )
}

function scrollToHeading(url: string) {
  history.pushState(null, "", url)
  document
    .getElementById(url.replace("#", ""))
    ?.scrollIntoView({ behavior: "smooth" })
}
