"use client"

import { useState, type ComponentProps } from "react"
import dynamic from "next/dynamic"
import { BookOpenIcon, MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/fibo/button"
import { Slider } from "@/components/fibo/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/fibo/tooltip"

import { DuoScreenCapture, type DuoScreenImages } from "./iphone-duo-screens"

// WebGL, and a 4.8 MB model, so it loads on this page alone and only in the
// browser.
const IphoneDuoMockup = dynamic(() => import("./iphone-duo-mockup"), {
  ssr: false,
})

/**
 * The foldable on its project page: drag to turn it, scroll or pinch to
 * zoom, and fold it with the button or the slider. The inner display shows
 * fibo's Calendar as a month of event cards; the cover shows it as it looks
 * on a phone, dots and the picked day's agenda.
 */
export function IphoneDuoProjectHero() {
  const [screens, setScreens] = useState<
    (DuoScreenImages & { version: number }) | null
  >(null)

  return (
    <div className="w-full">
      <DuoScreenCapture
        onCapture={(images) =>
          setScreens((previous) => ({
            ...images,
            version: (previous?.version ?? 0) + 1,
          }))
        }
      />
      <div className="aspect-4/3 w-full sm:aspect-960/680">
        <IphoneDuoMockup
          ariaLabel="Foldable phone"
          screenLabel="fibo's Calendar for October, a month of events on the inner display and the 14th's agenda on the cover"
          image={screens ? { src: screens.inner } : undefined}
          outerImage={screens ? { src: screens.cover } : undefined}
          contentKey={screens?.version}
          initialFold={70}
          deviceScale={1.15}
          textColor="var(--foreground)"
          surface="color-mix(in oklab, var(--foreground) 4%, transparent)"
          loadingColor="var(--muted-foreground)"
          padding="16px 16px 0"
          renderControls={(controls: DuoControlsState) => (
            <DuoControls {...controls} />
          )}
        />
      </div>
    </div>
  )
}

type DuoControlsState = {
  ready: boolean
  fold: number
  scrub: (fold: number) => void
  toggleFold: () => void
  foldAction: string
  open: boolean
  zoomIn: () => void
  zoomOut: () => void
  canZoomIn: boolean
  canZoomOut: boolean
  resetView: () => void
}

/**
 * The mockup's controls drawn with fibo's parts: zoom, fold and reset in one
 * tray, and the fold angle on a Slider whose control is a full 40px tall, so a
 * thumb can catch it.
 */
function DuoControls({
  ready,
  fold,
  scrub,
  toggleFold,
  foldAction,
  open,
  zoomIn,
  zoomOut,
  canZoomIn,
  canZoomOut,
  resetView,
}: DuoControlsState) {
  return (
    <div className="flex w-full flex-col items-center gap-2 px-4">
      <div className="flex items-center gap-0.5 rounded-full border border-border bg-background p-1">
        <DuoControl
          label="Zoom out"
          disabled={!ready || !canZoomOut}
          onClick={zoomOut}
        >
          <MinusIcon />
        </DuoControl>
        <DuoControl
          label="Zoom in"
          disabled={!ready || !canZoomIn}
          onClick={zoomIn}
        >
          <PlusIcon />
        </DuoControl>
        <DuoControl
          label={foldAction}
          disabled={!ready}
          aria-expanded={open}
          onClick={toggleFold}
        >
          <BookOpenIcon />
        </DuoControl>
        <DuoControl label="Reset view" disabled={!ready} onClick={resetView}>
          <RotateCcwIcon />
        </DuoControl>
      </div>

      <div className="flex w-full max-w-xs items-center gap-3 text-xs text-muted-foreground">
        <span aria-hidden>Shut</span>
        <Slider
          className="[&_[data-slot=slider-control]]:h-10 [&_[data-slot=slider-thumb]]:size-5"
          aria-label="Fold angle"
          min={0}
          max={100}
          step={0.1}
          value={fold * 100}
          disabled={!ready}
          onValueChange={(value) => scrub((value as number) / 100)}
        />
        <span aria-hidden>Open</span>
      </div>
    </div>
  )
}

function DuoControl({
  label,
  ...props
}: ComponentProps<typeof Button> & { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label={label}
            {...props}
          />
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
