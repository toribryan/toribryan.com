import { cn } from "@/lib/utils"

/*
 * Hello Scratchy Doodles draws its arrows on letters: N is a squiggle that
 * curls down, J points up, I left, and L loops off to the right.
 */
const ARROWS = {
  down: "N",
  up: "J",
  left: "I",
  right: "L",
} as const

type ThoughtPoint = keyof typeof ARROWS

/**
 * A handwritten aside in a case study: what I was thinking at that point,
 * jotted in lowercase Caveat beside the figure or passage it's about, with a
 * Hello Scratchy doodle for the arrow. Write it lowercase. `point`
 * aims the arrow at it, `down` for what comes next and `up` for what came
 * before; `align="end"` hangs the note from the right.
 *
 * Props are strings on purpose; see the note in `mdx-figure.tsx`.
 */
export function Thought({
  point = "down",
  align = "start",
  className,
  children,
}: {
  point?: ThoughtPoint
  align?: "start" | "end"
  className?: string
  children: React.ReactNode
}) {
  const arrow = (
    <span
      className={cn(
        "shrink-0 font-doodle text-6xl/none select-none",
        point === "down" && "translate-y-3",
        point === "up" && "-translate-y-1"
      )}
      aria-hidden
    >
      {ARROWS[point]}
    </span>
  )
  const arrowFirst = point === "up" || point === "left"

  return (
    <p
      data-slot="thought"
      className={cn(
        "not-prose my-6 flex w-fit max-w-[85%] items-center gap-2 font-handwritten text-[1.75rem]/tight font-medium text-pretty text-info",
        align === "end" ? "ml-auto rotate-2" : "-rotate-2",
        className
      )}
    >
      {arrowFirst && arrow}
      <span>{children}</span>
      {!arrowFirst && arrow}
    </p>
  )
}
