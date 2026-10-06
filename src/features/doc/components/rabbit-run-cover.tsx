"use client"

import { RabbitRun } from "@/features/portfolio/components/iso/rabbit-run"
import { FullscreenToggle } from "@/features/portfolio/components/rabbit-run/fullscreen-toggle"

/** Rabbit run on its card, playing itself while the card is on screen. */
export function RabbitRunCover() {
  return (
    <div className="flex size-full items-center justify-center p-3 [&_svg]:h-full [&_svg]:w-auto">
      <RabbitRun demo className="h-full" />
    </div>
  )
}

/** The game itself at the top of its project page, with a way to full screen. */
export function RabbitRunProjectHero() {
  return (
    <>
      <RabbitRun id="rabbit-run-hero" className="w-full max-w-3xl px-2 pt-4" />
      <FullscreenToggle target="rabbit-run-hero" className="mt-2" />
    </>
  )
}
