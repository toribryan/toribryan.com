"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { useAnimationsPaused } from "@/components/animations-pause"

import { SafariFrame } from "./browser-frame"

type Shot = { src: string; label: string; alt?: string }

const STEP = 5

/** MDX here passes strings only, so earlier passes come in "|"-separated lists. */
const list = (value?: string) =>
  (value ?? "").split("|").map((part) => part.trim())

/**
 * Two versions of a design in one frame, with a handle to wipe between them:
 * the earlier pass on the left, the shipped one on the right. With more than
 * one earlier pass, the left label picks which one sits under the wipe. On
 * first view the handle nudges once, so it reads as something to drag.
 */
export function CompareWipe({
  before,
  beforeLabel,
  beforeAlt,
  after,
  afterLabel,
  afterAlt,
  width,
  height,
  frame = "browser",
  caption,
}: {
  /** One earlier pass, or several separated by "|", with labels and alts to match. */
  before: string
  beforeLabel: string
  beforeAlt?: string
  after: string
  afterLabel: string
  afterAlt?: string
  /** The shots' shared size; earlier passes that differ are fit inside it. */
  width: number | string
  height: number | string
  frame?: "browser" | "plain"
  caption?: React.ReactNode
}) {
  const labels = list(beforeLabel)
  const alts = list(beforeAlt)
  const passes: Shot[] = list(before).map((src, index) => ({
    src,
    label: labels[index] ?? "",
    alt: alts[index] || undefined,
  }))
  const shipped: Shot = { src: after, label: afterLabel, alt: afterAlt }
  const [pass, setPass] = useState(0)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const nudged = useRef(false)
  const inView = useInView(stage, { amount: 0.6, once: true })
  const reduceMotion = useReducedMotion()
  const paused = useAnimationsPaused()

  // One small back-and-forth the first time it's seen, then it waits for the reader.
  useEffect(() => {
    if (!inView || nudged.current || reduceMotion || paused) return
    nudged.current = true
    const controls = animate(50, [50, 38, 60, 50], {
      duration: 1.4,
      ease: "easeInOut",
      delay: 0.3,
      onUpdate: setPos,
    })
    return () => controls.stop()
  }, [inView, reduceMotion, paused])

  function moveTo(clientX: number) {
    const box = stage.current?.getBoundingClientRect()
    if (!box) return
    const next = ((clientX - box.left) / box.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const keys: Record<string, number> = {
      ArrowLeft: pos - STEP,
      ArrowDown: pos - STEP,
      ArrowRight: pos + STEP,
      ArrowUp: pos + STEP,
      Home: 0,
      End: 100,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    setPos(Math.min(100, Math.max(0, keys[event.key])))
  }

  const image = "absolute inset-0 size-full object-contain object-top"

  const body = (
    <div
      ref={stage}
      className="relative w-full cursor-ew-resize touch-pan-y overflow-hidden bg-white select-none"
      style={{ aspectRatio: `${width} / ${height}` }}
      onPointerDown={(event) => {
        // Leave the pass picker's buttons to their own clicks.
        if ((event.target as HTMLElement).closest("button")) return
        event.currentTarget.setPointerCapture(event.pointerId)
        setDragging(true)
        moveTo(event.clientX)
      }}
      onPointerMove={(event) => dragging && moveTo(event.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img
        className={image}
        src={shipped.src}
        alt={shipped.alt ?? shipped.label}
        loading="lazy"
        draggable={false}
      />
      <div
        className={cn(
          "absolute inset-0",
          !dragging && "transition-[clip-path] duration-300 ease-out"
        )}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {passes.map((shot, index) => (
          <img
            key={shot.src}
            className={cn(
              image,
              "bg-white transition-opacity duration-300 ease-out",
              index === pass ? "opacity-100" : "opacity-0"
            )}
            src={shot.src}
            alt={index === pass ? (shot.alt ?? shot.label) : ""}
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>

      {/* Labels in each corner, fading as the wipe covers them. */}
      <div
        className="absolute top-3 left-3 z-2 transition-opacity duration-200"
        style={{ opacity: pos < 18 ? 0 : 1 }}
      >
        {passes.length > 1 ? (
          <div className="flex rounded-full bg-black/70 p-0.5 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm">
            {passes.map((shot, index) => (
              <button
                key={shot.src}
                type="button"
                aria-pressed={index === pass}
                onClick={() => setPass(index)}
                className={cn(
                  "cursor-pointer rounded-full px-2.5 py-1 transition-colors duration-200",
                  index === pass
                    ? "bg-white text-black"
                    : "text-white/75 hover:text-white"
                )}
              >
                {shot.label}
              </button>
            ))}
          </div>
        ) : (
          <Tag>{passes[0].label}</Tag>
        )}
      </div>
      <div
        className="absolute top-3 right-3 z-2 transition-opacity duration-200"
        style={{ opacity: pos > 82 ? 0 : 1 }}
      >
        <Tag>{shipped.label}</Tag>
      </div>

      {/* The handle: a line the height of the frame and a grip to hold. */}
      <div
        className={cn(
          "absolute inset-y-0 z-1 w-0",
          !dragging && "transition-[left] duration-300 ease-out"
        )}
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_0_12px_rgb(0_0_0/0.15)]" />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${passes[pass].label} with ${shipped.label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${passes[pass].label}`}
          onKeyDown={onKeyDown}
          className={cn(
            "absolute top-1/2 left-0 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-white text-[#3c4049] shadow-[0_0_0_1px_rgb(0_0_0/0.1),0_4px_14px_rgb(0_0_0/0.18)] transition-transform duration-200 ease-out outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            dragging ? "scale-110" : "hover:scale-105"
          )}
        >
          <Chevron flip />
          <Chevron />
        </div>
      </div>
    </div>
  )

  return (
    <figure className="not-prose my-8">
      {frame === "browser" ? (
        <SafariFrame size={30}>{body}</SafariFrame>
      ) : (
        <div className="relative overflow-hidden rounded-xl">
          {body}
          <div className="pointer-events-none absolute inset-0 z-3 rounded-xl inset-ring-1 inset-ring-black/10 dark:inset-ring-white/15" />
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="block rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm">
      {children}
    </span>
  )
}

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={cn("size-3", flip && "-scale-x-100")}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4.5 2.5 8 6l-3.5 3.5" />
    </svg>
  )
}
