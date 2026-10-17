"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useReducedMotion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

type TextScrambleProps = {
  children: string
  /** Seconds the whole line takes to resolve. */
  duration?: number
  /** Seconds between frames of noise. */
  speed?: number
  /** Seconds to wait before scrambling, for staging several lines. */
  delay?: number
  characterSet?: string
  as?: React.ElementType
  className?: string
  /** Scrambles each time this turns true. */
  trigger?: boolean
  onScrambleComplete?: () => void
} & MotionProps

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

/**
 * Text that resolves left to right out of random characters.
 *
 * The final string is laid out transparently underneath the noise, so the
 * line holds its width while it runs; in a proportional face a scrambled `W`
 * and a settled `i` would otherwise shove the rest of the line around.
 */
export function TextScramble({
  children: text,
  duration = 0.8,
  speed = 0.04,
  delay = 0,
  characterSet = DEFAULT_CHARS,
  className,
  as: Component = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  // Created once per tag: a new motion component each render would remount
  // the element on every frame of noise.
  const MotionComponent = useMemo(
    () => motion.create(Component as keyof React.JSX.IntrinsicElements),
    [Component]
  )
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(text)
  const complete = useRef(onScrambleComplete)
  complete.current = onScrambleComplete

  useEffect(() => {
    if (!trigger || reduceMotion) return
    const steps = duration / speed
    let step = 0
    let interval: number | undefined

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        const progress = step / steps
        let scrambled = ""
        for (let i = 0; i < text.length; i++) {
          scrambled +=
            text[i] === " " || progress * text.length > i
              ? text[i]
              : characterSet[Math.floor(Math.random() * characterSet.length)]
        }
        setDisplay(scrambled)
        step++
        if (step > steps) {
          window.clearInterval(interval)
          setDisplay(text)
          complete.current?.()
        }
      }, speed * 1000)
    }, delay * 1000)

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
      setDisplay(text)
    }
  }, [trigger, reduceMotion, text, duration, speed, delay, characterSet])

  return (
    <MotionComponent className={cn("grid", className)} {...props}>
      {/* The real text, transparent: what screen readers hear and what a
          selection copies, while the noise on top is only for show. */}
      <span className="text-transparent [grid-area:1/1]">{text}</span>
      <span aria-hidden="true" className="select-none [grid-area:1/1]">
        {display}
      </span>
    </MotionComponent>
  )
}
