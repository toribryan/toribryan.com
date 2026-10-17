"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { useAnimationsPaused } from "@/components/animations-pause"

import { SafariPhone } from "./browser-frame"

const DIR = "/case-studies/home-activation"

/* The product's own blue, so the progress here reads like the flow's footer. */
const MCH_BLUE = "#1747e6"

const PHONE_W = 200
const GAP = 28
const HOLD_MS = 2600

type Screen = { src: string; label: string; phase: number }

/*
 * `phase` follows the flow's footer: 1 to 3 are the segments of its progress
 * bar, and 0 (before) and 4 (the review) sit outside it.
 */
const SCREENS: Screen[] = [
  { src: "phone-find-your-home", label: "Find your home", phase: 0 },
  { src: "phone-welcome", label: "Welcome", phase: 0 },
  { src: "phone-confirm", label: "Confirm", phase: 1 },
  { src: "phone-photos-complete", label: "Photos", phase: 1 },
  { src: "phone-amenities", label: "Amenities", phase: 2 },
  { src: "phone-about", label: "About", phase: 2 },
  { src: "phone-care", label: "Care", phase: 3 },
  { src: "phone-rooms", label: "Rooms", phase: 3 },
  { src: "phone-price", label: "Price", phase: 3 },
  { src: "phone-review", label: "Review", phase: 4 },
  { src: "phone-submitted", label: "Submitted", phase: 4 },
]

/** How full each of the footer's three segments is on a given screen. */
function segmentFill(index: number) {
  const screen = SCREENS[index]
  return [1, 2, 3].map((phase) => {
    if (screen.phase > phase) return 1
    if (screen.phase < phase) return 0
    const inPhase = SCREENS.filter((s) => s.phase === phase)
    return (inPhase.indexOf(screen) + 1) / inPhase.length
  })
}

const RING_R = 9
const RING_C = 2 * Math.PI * RING_R

/**
 * The activation flow as a filmstrip of phone screens. It steps through on a
 * timer while in view, the footer's three-part progress filling as it goes.
 * The ring in the corner fills as the current screen holds and pauses the
 * loop; picking a screen jumps to it and restarts the timer. With reduced
 * motion it starts paused.
 */
export function ActivationFlow() {
  const frame = useRef<HTMLDivElement>(null)
  const tabs = useRef<HTMLDivElement>(null)
  const ring = useRef<SVGCircleElement>(null)
  const timer = useRef<Animation | null>(null)
  const inView = useInView(frame, { amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const paused = useAnimationsPaused()
  const [active, setActive] = useState(0)
  // Null until the viewer toggles it; until then reduced motion decides.
  const [chosen, setChosen] = useState<boolean | null>(null)
  const playing = chosen ?? !reduceMotion
  const autoplay = inView && !paused && playing

  // The ring's fill is the timer: each screen gets a fresh one, and the
  // slide advances when it finishes, so pausing holds both in step.
  useEffect(() => {
    const circle = ring.current
    if (!circle) return
    const animation = circle.animate(
      [{ strokeDashoffset: RING_C }, { strokeDashoffset: 0 }],
      { duration: HOLD_MS, easing: "linear", fill: "forwards" }
    )
    animation.pause()
    animation.onfinish = () =>
      setActive((index) => (index + 1) % SCREENS.length)
    timer.current = animation
    return () => animation.cancel()
  }, [active])

  useEffect(() => {
    if (autoplay) timer.current?.play()
    else timer.current?.pause()
  }, [autoplay, active])

  // Keeps the current tab in view when the row is wider than the card,
  // scrolling the row alone so the page stays put.
  useEffect(() => {
    const row = tabs.current
    const tab = row?.children[active] as HTMLElement | undefined
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return
    row.scrollTo({
      left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [active, reduceMotion])

  const pick = (index: number) => setActive(index)

  const fill = segmentFill(active)
  const offset = active * (PHONE_W + GAP) + PHONE_W / 2

  return (
    <figure className="not-prose my-8">
      <div
        ref={frame}
        className="overflow-hidden rounded-xl border border-line bg-card"
      >
        <div className="border-b border-line px-4 pt-3.5 pb-2 sm:px-6">
          <div
            ref={tabs}
            className="-mx-4 no-scrollbar flex gap-3.5 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)] px-4 pb-1.5 sm:-mx-6 sm:px-6"
          >
            {SCREENS.map((screen, index) => {
              const current = index === active
              return (
                <button
                  key={screen.src}
                  type="button"
                  onClick={() => pick(index)}
                  aria-pressed={current}
                  className={cn(
                    "shrink-0 cursor-pointer text-[13px] whitespace-nowrap transition-colors hover:text-foreground",
                    current
                      ? "font-medium text-foreground underline decoration-2 underline-offset-6"
                      : "text-muted-foreground"
                  )}
                  style={
                    current ? { textDecorationColor: MCH_BLUE } : undefined
                  }
                >
                  {screen.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="relative h-[500px] overflow-hidden bg-[#eef2fb] dark:bg-[#141a2b]">
          <button
            type="button"
            onClick={() => setChosen(!playing)}
            aria-label={playing ? "Pause the flow" : "Play the flow"}
            className="absolute top-3 right-3 z-10 grid size-8 cursor-pointer place-items-center rounded-full text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              className="absolute inset-0 size-8 -rotate-90"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle
                cx="12"
                cy="12"
                r={RING_R}
                fill="none"
                strokeWidth="1.5"
                className="stroke-black/10 dark:stroke-white/15"
              />
              <circle
                ref={ring}
                cx="12"
                cy="12"
                r={RING_R}
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke={MCH_BLUE}
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C}
              />
            </svg>
            {playing ? (
              <span className="flex gap-[3px]" aria-hidden>
                <span className="h-2 w-[2px] rounded-full bg-current" />
                <span className="h-2 w-[2px] rounded-full bg-current" />
              </span>
            ) : (
              <svg className="ml-px size-2" viewBox="0 0 8 8" aria-hidden>
                <path
                  d="M1.5 1.1v5.8a.5.5 0 0 0 .76.43l4.8-2.9a.5.5 0 0 0 0-.86l-4.8-2.9a.5.5 0 0 0-.76.43Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
          <div
            className="absolute inset-0"
            role="img"
            aria-label={`Activation flow, screen ${active + 1} of ${SCREENS.length}: ${SCREENS[active].label}`}
          />
          <div
            className="absolute top-1/2 left-1/2 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
            style={{ gap: GAP, transform: `translate(${-offset}px, -50%)` }}
          >
            {SCREENS.map((screen, index) => (
              <button
                key={screen.src}
                type="button"
                tabIndex={-1}
                onClick={() => pick(index)}
                className={cn(
                  "shrink-0 origin-center cursor-pointer transition-[scale,opacity] duration-500 motion-reduce:transition-none",
                  index === active ? "scale-100" : "scale-[0.86] opacity-45"
                )}
                style={{ width: PHONE_W }}
                aria-hidden
              >
                <SafariPhone width={PHONE_W}>
                  <img
                    className="block w-full"
                    src={`${DIR}/${screen.src}.webp`}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                </SafariPhone>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-line px-4 py-4 sm:px-6">
          <div className="flex gap-1" aria-hidden>
            {fill.map((amount, index) => (
              <span
                key={index}
                className="h-1 flex-1 overflow-hidden rounded-full bg-black/8 dark:bg-white/12"
              >
                <span
                  className="block h-full origin-left transition-transform duration-500 motion-reduce:transition-none"
                  style={{
                    background: MCH_BLUE,
                    transform: `scaleX(${amount})`,
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
        Eleven screens. The footer&rsquo;s three-part progress counts only the
        seven steps that build the listing. Pick a screen to jump to it, or
        pause with the timer in the corner.
      </figcaption>
    </figure>
  )
}
