"use client"

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const MCH_BLUE = "#1747e6"
/** Each half of a step change: the old one fading out, the new one in. */
const FADE_MS = 160

type StepTabProps = { label: string; children: ReactNode }

/** One step inside `StepTabs`; renders only when it's the open step. */
export function StepTab({ children }: StepTabProps) {
  return <>{children}</>
}

/**
 * A run of steps read one at a time. Wide screens list the steps down the
 * left, numbered and joined by a rail that fills in up to the open step, with
 * the step's MDX body (text and media) beside it. Narrow screens turn the
 * list into a row of numbered chips above the body. Next at the foot walks
 * the reader through in order.
 */
export function StepTabs({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<StepTabProps> =>
      isValidElement<StepTabProps>(child) && Boolean(child.props.label)
  )
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const stack = useRef<HTMLDivElement>(null)

  // Only the open step's recording plays, from its start each time it opens.
  useEffect(() => {
    const panels = stack.current?.children
    if (!panels) return
    Array.from(panels).forEach((panel, index) => {
      panel.querySelectorAll("video").forEach((video) => {
        if (index === active) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    })
  }, [active])
  const reduceMotion = useReducedMotion()
  const next = steps[active + 1]

  function select(index: number, focus = false) {
    const clamped = Math.max(0, Math.min(steps.length - 1, index))
    setActive(clamped)
    if (focus) tabs.current[clamped]?.focus()
    // On a phone the chips scroll sideways; bring the chosen one into the
    // row without moving the page.
    const tab = tabs.current[clamped]
    const row = tab?.parentElement
    if (tab && row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({
        left: tab.offsetLeft - row.clientWidth / 2 + tab.offsetWidth / 2,
        behavior: "smooth",
      })
    }
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: steps.length - 1,
    }
    if (!(event.key in moves)) return
    event.preventDefault()
    select(moves[event.key], true)
  }

  return (
    <div className="not-prose my-8 grid overflow-hidden rounded-xl border border-line bg-card sm:grid-cols-[11.5rem_minmax(0,1fr)]">
      <div
        role="tablist"
        aria-label="Steps"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="no-scrollbar flex gap-1.5 overflow-x-auto border-b border-line p-2 max-sm:[mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)] sm:flex-col sm:gap-0 sm:overflow-visible sm:border-r sm:border-b-0 sm:py-3"
      >
        {steps.map((step, index) => {
          const current = index === active
          const done = index < active
          return (
            <button
              key={step.props.label}
              ref={(node) => {
                tabs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`step-tab-${index}`}
              aria-selected={current}
              aria-controls="step-panel"
              tabIndex={current ? 0 : -1}
              onClick={() => select(index)}
              className={cn(
                "group relative flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:py-2",
                current
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {current && (
                <motion.span
                  layoutId="step-tabs-active"
                  className="absolute inset-0 rounded-lg bg-accent-muted"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.18, duration: 0.4 }
                  }
                />
              )}
              {/* The rail between numbers, filled up to the open step. */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[calc(50%+0.75rem)] left-[1.25rem] h-[calc(100%-1.5rem)] w-px bg-line max-sm:hidden"
                >
                  <span
                    className="absolute inset-0 origin-top transition-transform duration-300 ease-out"
                    style={{
                      background: MCH_BLUE,
                      transform: `scaleY(${done ? 1 : 0})`,
                    }}
                  />
                </span>
              )}
              <span
                aria-hidden
                className={cn(
                  "relative grid size-6 shrink-0 place-items-center rounded-md text-[11px] tabular-nums transition-colors duration-300",
                  current || done
                    ? "text-white"
                    : "bg-muted text-muted-foreground group-hover:text-foreground"
                )}
                style={current || done ? { background: MCH_BLUE } : undefined}
              >
                {done ? (
                  <CheckIcon className="size-3.5" strokeWidth={2.5} />
                ) : (
                  index + 1
                )}
              </span>
              <span className="relative">{step.props.label}</span>
            </button>
          )
        })}
      </div>

      <div
        id="step-panel"
        role="tabpanel"
        aria-labelledby={`step-tab-${active}`}
        className="flex min-w-0 flex-col p-4 sm:p-5"
      >
        {/* Every step stays mounted, stacked in one cell, so switching only
            changes opacity: nothing remounts, every screen is already loaded
            and the card holds its height. The open step fades out, then the
            next fades in. */}
        <div ref={stack} className="grid flex-1">
          {steps.map((step, index) => {
            const current = index === active
            return (
              <div
                key={step.props.label}
                aria-hidden={!current}
                inert={!current}
                className={cn(
                  "col-start-1 row-start-1 prose flex max-w-none flex-col prose-ncdai text-[15px] transition-opacity ease-out prose-zinc dark:prose-invert",
                  "[&>*]:my-0",
                  // Bare screens: no Safari toolbar, just a rounded, ringed frame.
                  "[&_[data-slot=safari-frame]]:rounded-lg [&_[data-slot=safari-frame]]:!shadow-none [&_[data-slot=safari-frame]]:ring-1 [&_[data-slot=safari-frame]]:ring-black/10 dark:[&_[data-slot=safari-frame]]:ring-white/15 [&_[data-slot=safari-toolbar]]:hidden",
                  !current && "pointer-events-none"
                )}
                style={{
                  opacity: current ? 1 : 0,
                  transitionDuration: reduceMotion ? "0ms" : `${FADE_MS}ms`,
                  transitionDelay:
                    current && !reduceMotion ? `${FADE_MS}ms` : "0ms",
                }}
              >
                {step}
              </div>
            )
          })}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 text-[13px]">
          <span className="text-muted-foreground tabular-nums">
            Step {active + 1} of {steps.length}
          </span>
          {next ? (
            <button
              type="button"
              onClick={() => select(active + 1)}
              className="group flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 font-medium transition-colors hover:bg-accent-muted"
            >
              Next: {next.props.label}
              <ArrowRightIcon className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => select(0)}
              className="cursor-pointer rounded-md px-2 py-1 font-medium transition-colors hover:bg-accent-muted"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
