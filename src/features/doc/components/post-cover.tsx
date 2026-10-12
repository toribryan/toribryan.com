import { cn } from "@/lib/utils"
import { box, fmt, P, TOP } from "@/features/portfolio/components/iso/iso"

/** The page's lines along x, with the gap below each, in page units. */
const LINES = [
  { w: 74, h: 7, gap: 14 },
  { w: 112, h: 3, gap: 9 },
  { w: 104, h: 3, gap: 9 },
  { w: 116, h: 3, gap: 9 },
  { w: 64, h: 3, gap: 16 },
  { w: 108, h: 3, gap: 9 },
  { w: 90, h: 3, gap: 0 },
]
const W = 150
const D = 116
const SHEET = 3
const STACK = [
  [-6, 4, 0],
  [-3, 2, 6],
  [0, 0, 12],
] as const
const TOP_Z = STACK[2][2] + SHEET

const corners = STACK.flatMap(([x, y, z]) =>
  [
    [x, y, z],
    [x + W, y, z],
    [x, y + D, z],
    [x + W, y + D, z + SHEET],
    [x, y, z + SHEET],
  ].map(([a, b, c]) => P(a, b, c))
)
const xs = corners.map(([x]) => x)
const ys = corners.map(([, y]) => y)
const PAD = 14
const VIEW = [
  Math.min(...xs) - PAD,
  Math.min(...ys) - PAD,
  Math.max(...xs) - Math.min(...xs) + PAD * 2,
  Math.max(...ys) - Math.min(...ys) + PAD * 2,
].map(fmt)

let top = 18
const lines = LINES.map((line, n) => {
  const y = top
  top += line.h + line.gap
  return `<rect class="post-cover-line" style="--d:${n * 0.32}s" x="18" y="${y}" width="${line.w}" height="${line.h}" rx="${line.h / 2}"/>`
}).join("")

const SCENE =
  STACK.map(([x, y, z]) => box(x, y, z, W, D, SHEET, 4)).join("") +
  `<g transform="${TOP(0, 0, TOP_Z)}">${lines}</g>`

/**
 * The blog's cover for a post with no art of its own: a stack of pages in
 * isometric line art whose top sheet writes itself, holds, then clears. It
 * plays on a card's hover, or always with `loop`; with reduced motion it
 * shows the finished page.
 */
export function PostCover({
  loop = false,
  className,
}: {
  loop?: boolean
  className?: string
}) {
  return (
    <div
      data-loop={loop || undefined}
      className={cn(
        "post-cover flex size-full items-center justify-center",
        className
      )}
    >
      <style>{`
        .post-cover-line {
          fill: color-mix(in oklab, var(--muted-foreground) 60%, var(--card));
          transform-box: fill-box;
          transform-origin: left center;
        }
        .post-cover-line:first-child { fill: var(--foreground); }
        @keyframes post-cover-write {
          0% { transform: scaleX(0); }
          10%, 78% { transform: scaleX(1); }
          88%, 100% { transform: scaleX(0); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .post-cover[data-loop] .post-cover-line,
          [data-cover-host]:hover .post-cover .post-cover-line {
            animation: post-cover-write 6s var(--d) ease-in-out infinite both;
          }
          @media (hover: none) {
            .post-cover .post-cover-line {
              animation: post-cover-write 6s var(--d) ease-in-out infinite both;
            }
          }
        }
      `}</style>
      <svg
        viewBox={VIEW.join(" ")}
        className="h-[72%] w-auto overflow-visible"
        aria-hidden
        dangerouslySetInnerHTML={{ __html: SCENE }}
      />
    </div>
  )
}
