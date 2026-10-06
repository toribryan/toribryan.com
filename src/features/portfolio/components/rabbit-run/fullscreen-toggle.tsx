"use client"

import { useEffect, useState } from "react"
import { MaximizeIcon, MinimizeIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"

/*
 * Puts the element with `target` as its id full screen, then hands focus to
 * the game inside so its keys work straight away. Where the browser can't put
 * an element full screen (iPhone Safari), the element fills the window
 * instead, through its `data-full` styles, and Esc brings it back.
 */
export function FullscreenToggle({ target }: { target: string }) {
  const [full, setFull] = useState(false)

  useEffect(() => {
    const element = document.getElementById(target)
    if (!element) return
    const sync = () =>
      setFull(
        document.fullscreenElement === element ||
          element.hasAttribute("data-full")
      )
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !element.hasAttribute("data-full")) return
      element.removeAttribute("data-full")
      sync()
    }
    document.addEventListener("fullscreenchange", sync)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("fullscreenchange", sync)
      document.removeEventListener("keydown", onKey)
    }
  }, [target])

  const toggle = () => {
    const element = document.getElementById(target)
    if (!element) return
    const focusGame = () =>
      element.querySelector<SVGElement>("svg")?.focus({ preventScroll: true })
    if (document.fullscreenElement === element) {
      document.exitFullscreen().catch(() => {})
    } else if (element.hasAttribute("data-full")) {
      element.removeAttribute("data-full")
      setFull(false)
    } else if (document.fullscreenEnabled) {
      element.requestFullscreen().then(focusGame, () => {})
    } else {
      element.setAttribute("data-full", "")
      setFull(true)
      focusGame()
    }
  }

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      className="text-muted-foreground"
      aria-label={full ? "Exit full screen" : "Play full screen"}
      aria-pressed={full}
      onClick={toggle}
    >
      {full ? <MinimizeIcon /> : <MaximizeIcon />}
    </Button>
  )
}
