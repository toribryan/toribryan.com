"use client"

import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  compose,
  invert,
  Runs,
  type RabbitGrid,
} from "@/features/portfolio/components/fibo-hero/pixel-rabbit"

import { textCells } from "./pixel-font"

/*
 * Folder art in fibo's language: ink and paper, no brand hue, sizes on the
 * Fibonacci sequence and cuts on 0.618. Colour only arrives through the
 * dithered photo plates, as it does everywhere else in fibo.
 *
 * Every folder is drawn on a 1024 canvas, the size macOS asks for. The body
 * is 832 wide and its front 514 tall, a golden rectangle, and the tab takes
 * the minor section of the width, 318.
 */

const INK = "#0a0a0a"
const PAPER = "#f3f3f1"
export const N = {
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
}

export const X0 = 96
export const X1 = 928
export const W = X1 - X0
const TAB = 318
const TAB_TOP = 196
const BACK_TOP = 244
export const FRONT_TOP = 314
export const BOTTOM = 828
export const FRONT_H = BOTTOM - FRONT_TOP
const R = 40

const BACK_PATH = [
  `M${X0} ${TAB_TOP + R}`,
  `Q${X0} ${TAB_TOP} ${X0 + R} ${TAB_TOP}`,
  `H${X0 + TAB - 28}`,
  `C${X0 + TAB + 6} ${TAB_TOP} ${X0 + TAB + 10} ${BACK_TOP} ${X0 + TAB + 44} ${BACK_TOP}`,
  `H${X1 - R}`,
  `Q${X1} ${BACK_TOP} ${X1} ${BACK_TOP + R}`,
  `V${BOTTOM - R}`,
  `Q${X1} ${BOTTOM} ${X1 - R} ${BOTTOM}`,
  `H${X0 + R}`,
  `Q${X0} ${BOTTOM} ${X0} ${BOTTOM - R}`,
  "Z",
].join(" ")

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

/** 1-bit ordered dither: a mark wherever the density beats the Bayer threshold. */
function dither(
  x: number,
  y: number,
  w: number,
  h: number,
  cell: number,
  density: (u: number, v: number) => number
) {
  const marks: ReactNode[] = []
  for (let j = 0; j * cell < h; j++)
    for (let i = 0; i * cell < w; i++) {
      const t = (BAYER[j % 8]![i % 8]! + 0.5) / 64
      if (density((i + 0.5) / (w / cell), (j + 0.5) / (h / cell)) > t)
        marks.push(
          <rect
            key={`${i}:${j}`}
            x={x + i * cell}
            y={y + j * cell}
            width={cell - 2}
            height={cell - 2}
          />
        )
    }
  return marks
}

/** fibo at a whole-number scale, his top left corner at x, y. */
function Rabbit({
  x,
  y,
  pixel,
  grid,
  line,
  fill,
}: {
  x: number
  y: number
  pixel: number
  grid: RabbitGrid
  line: string
  fill: string
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${pixel})`}
      shapeRendering="crispEdges"
    >
      <g fill={fill}>
        <Runs grid={grid} value={2} />
      </g>
      <g fill={line}>
        <Runs grid={grid} value={1} />
      </g>
    </g>
  )
}

/** A line of pixel type, each cell `pixel` wide. */
export function PixelText({
  text,
  x,
  y,
  pixel,
  fill,
}: {
  text: string
  x: number
  y: number
  pixel: number
  fill: string
}) {
  return (
    <g fill={fill} shapeRendering="crispEdges">
      {textCells(text).map(([cx, cy]) => (
        <rect
          key={`${cx}:${cy}`}
          x={x + cx * pixel}
          y={y + cy * pixel}
          width={pixel}
          height={pixel}
        />
      ))}
    </g>
  )
}

// A loose sheet tucked behind the front, lifted into view on hover.
export function Sheet({ fill = N[100], line = N[300] }) {
  return (
    <g>
      <rect
        x={X0 + 55}
        y={FRONT_TOP - 21}
        width={W - 110}
        height={420}
        rx={13}
        fill={fill}
        stroke={line}
        strokeWidth={3}
      />
      {[0, 1, 2].map((k) => (
        <rect
          key={k}
          x={X0 + 89}
          y={FRONT_TOP + 13 + k * 21}
          width={k === 2 ? 233 : 377}
          height={5}
          fill={line}
        />
      ))}
    </g>
  )
}

type Fill = string | ((id: string) => string)

export type Art = {
  /** A colour, or a function of the folder's id for a fill from its defs. */
  back: Fill
  front: Fill
  /** Below 1 for a see-through front, so the peek shows behind it. */
  frontOpacity?: number
  /** A lighter line along the top of the front, where light catches its edge. */
  rim: string
  /** Sits between back and front and rises on hover. */
  peek?: ReactNode
  /** How far the peek rises, in canvas units. */
  lift?: number
  /** Drawn on the back panel, clipped to it. */
  backArt?: ReactNode
  /** Drawn on the front panel, clipped to it. */
  frontArt?: (id: string) => ReactNode
  /** Patterns and other defs, keyed by the folder's id. */
  defs?: (id: string) => ReactNode
}

export type FolderEntry = {
  slug: string
  title: string
  art: Art
}

const RESTING = compose({})
const PERKED = compose({ ears: "perk", mouth: 1 })

/* -------------------------------------------------------------------------- */
/* No. 1 · Paper                                                              */
/* -------------------------------------------------------------------------- */

const paper: Art = {
  back: N[300],
  front: PAPER,
  rim: "#ffffff",
  lift: 21,
  peek: (
    <>
      <g className="folder-rest">
        <Rabbit
          x={560}
          y={60}
          pixel={13}
          grid={RESTING}
          line={INK}
          fill={PAPER}
        />
      </g>
      <g className="folder-hover">
        <Rabbit
          x={560}
          y={60}
          pixel={13}
          grid={PERKED}
          line={INK}
          fill={PAPER}
        />
      </g>
    </>
  ),
  defs: (id) => (
    <pattern
      id={`${id}-dots`}
      x={X0}
      y={FRONT_TOP}
      width={34}
      height={34}
      patternUnits="userSpaceOnUse"
    >
      <rect x={16} y={16} width={3} height={3} fill={N[300]} />
    </pattern>
  ),
  frontArt: (id) => {
    const cutX = X0 + W / 1.618
    const cutY = FRONT_TOP + FRONT_H / 1.618
    return (
      <>
        <rect
          x={X0}
          y={FRONT_TOP}
          width={W}
          height={FRONT_H}
          fill={`url(#${id}-dots)`}
        />
        <g stroke={N[400]} strokeWidth={2} fill="none">
          <line x1={cutX} y1={FRONT_TOP} x2={cutX} y2={BOTTOM} />
          <line x1={cutX} y1={cutY} x2={X1} y2={cutY} />
          <line
            x1={X0}
            y1={BOTTOM}
            x2={X1}
            y2={FRONT_TOP}
            strokeDasharray="8 8"
          />
          <line
            x1={cutX}
            y1={FRONT_TOP}
            x2={X1}
            y2={cutY}
            strokeDasharray="8 8"
          />
        </g>
      </>
    )
  },
}

/* -------------------------------------------------------------------------- */
/* No. 1 · Ink                                                                */
/* -------------------------------------------------------------------------- */

const INVERTED = invert(RESTING)
const BASELINE = BOTTOM - 89

const ink: Art = {
  back: N[800],
  front: N[900],
  rim: N[700],
  // The other half of the pair in Fibonacci's puzzle, who only comes up on hover.
  lift: 144,
  peek: (
    <Rabbit
      x={X0 + 89}
      y={FRONT_TOP + 10 - 16}
      pixel={8}
      grid={PERKED}
      line={INK}
      fill={PAPER}
    />
  ),
  frontArt: () => (
    <>
      <line
        x1={X0 + 55}
        y1={BASELINE + 1.5}
        x2={X1 - 55}
        y2={BASELINE + 1.5}
        stroke={N[600]}
        strokeWidth={3}
        strokeDasharray="13 8"
      />
      <Rabbit
        x={X0 + W / 1.618 + (W - W / 1.618 - 260) / 2}
        y={BASELINE - 23 * 13}
        pixel={13}
        grid={INVERTED}
        line={N[900]}
        fill={PAPER}
      />
      <PixelText
        text="1202"
        x={X0 + 55}
        y={BASELINE - 34 - 56}
        pixel={8}
        fill={N[500]}
      />
    </>
  ),
}

/* -------------------------------------------------------------------------- */
/* No. 2 · Tiling                                                             */
/* -------------------------------------------------------------------------- */

const U = 64
const tx = (n: number) => X0 + n * U
const ty = (n: number) => FRONT_TOP + n * U

const tiling: Art = {
  back: N[400],
  front: PAPER,
  rim: "#ffffff",
  peek: <Sheet />,
  frontArt: () => (
    <>
      {/* 8: dither falling off along the diagonal */}
      <g fill={INK}>
        {dither(
          tx(0),
          ty(0),
          8 * U,
          8 * U,
          16,
          (u, v) => 1.15 - (u + v) * 0.62
        )}
      </g>
      {/* 5: a half-square triangle, as quilts cut them */}
      <rect x={tx(8)} y={ty(0)} width={5 * U} height={5 * U} fill={INK} />
      <path
        d={`M${tx(8)} ${ty(5)} L${tx(13)} ${ty(0)} L${tx(13)} ${ty(5)} Z`}
        fill={N[400]}
      />
      {/* 3: a checker */}
      <rect x={tx(10)} y={ty(5)} width={3 * U} height={3 * U} fill={PAPER} />
      <g fill={INK}>
        {Array.from({ length: 16 }, (_, k) => {
          const i = k % 4
          const j = Math.floor(k / 4)
          return (i + j) % 2 ? null : (
            <rect
              key={k}
              x={tx(10) + i * 48}
              y={ty(5) + j * 48}
              width={48}
              height={48}
            />
          )
        })}
      </g>
      {/* 2, 1, 1 */}
      <rect x={tx(8)} y={ty(6)} width={2 * U} height={2 * U} fill={N[600]} />
      <path
        d={`M${tx(8)} ${ty(6)} L${tx(10)} ${ty(6)} L${tx(8)} ${ty(8)} Z`}
        fill={PAPER}
      />
      <rect x={tx(8)} y={ty(5)} width={U} height={U} fill={INK} />
      <rect x={tx(9)} y={ty(5)} width={U} height={U} fill={N[300]} />
      <g fill="none" stroke={PAPER} strokeWidth={6}>
        {[
          [0, 0, 8],
          [8, 0, 5],
          [10, 5, 3],
          [8, 6, 2],
          [8, 5, 1],
          [9, 5, 1],
        ].map(([x, y, s]) => (
          <rect
            key={`${x}:${y}`}
            x={tx(x!)}
            y={ty(y!)}
            width={s! * U}
            height={s! * U}
          />
        ))}
      </g>
    </>
  ),
}

/* -------------------------------------------------------------------------- */
/* No. 3 · Seeds                                                              */
/* -------------------------------------------------------------------------- */

const GOLDEN_ANGLE = 137.50776
const SEED_COUNT = 610
const SEED_CX = X0 + W / 1.618
const SEED_CY = FRONT_TOP + FRONT_H / 1.618 - 21

const seeds: Art = {
  back: N[800],
  front: PAPER,
  rim: "#ffffff",
  peek: <Sheet />,
  frontArt: () => (
    <g fill={INK}>
      {Array.from({ length: SEED_COUNT }, (_, i) => {
        const a = i * GOLDEN_ANGLE
        const r = 14.5 * Math.sqrt(i + 1)
        const x = SEED_CX + r * Math.cos((a * Math.PI) / 180)
        const y = SEED_CY + r * Math.sin((a * Math.PI) / 180)
        const s = 5 + 9 * Math.sqrt((i + 1) / SEED_COUNT)
        return (
          <rect
            key={i}
            x={(x - s / 2).toFixed(1)}
            y={(y - s / 2).toFixed(1)}
            width={s.toFixed(1)}
            height={s.toFixed(1)}
            transform={`rotate(${(a % 360).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})`}
          />
        )
      })}
    </g>
  ),
}

/* -------------------------------------------------------------------------- */
/* No. 5 · Sunflower, No. 8 · Window                                          */
/* -------------------------------------------------------------------------- */

/*
 * The dither plates from the fibo page, cropped so the colour window lands on
 * the front. Each plate is 1080 × 1350, drawn 1:1 with the canvas.
 */
function plate(src: string, cropX: number, cropY: number) {
  return function PlateArt() {
    return (
      <image
        href={src}
        x={X0 - cropX}
        y={FRONT_TOP - cropY}
        width={1080}
        height={1350}
        preserveAspectRatio="none"
      />
    )
  }
}

// Half-size copies of the fibo plates. Browsers sample an SVG image without
// averaging, so the full plates' 1px gutters alias away to paper at icon
// sizes. The PNG export swaps the full plates back in.
const PLATES = {
  sunflower: "/images/folder-art/plate-sunflower.webp",
  bunny: "/images/folder-art/plate-bunny.webp",
}

const sunflower: Art = {
  back: N[700],
  front: N[800],
  rim: N[600],
  peek: <Sheet />,
  frontArt: plate(PLATES.sunflower, 168, 210),
}

const windowArt: Art = {
  back: N[300],
  front: PAPER,
  rim: "#ffffff",
  peek: <Sheet />,
  frontArt: plate(PLATES.bunny, 200, 300),
}

/* -------------------------------------------------------------------------- */
/* No. 13 · Terminal                                                          */
/* -------------------------------------------------------------------------- */

const LINE_H = 80
const TEXT_X = X0 + 55
const TEXT_Y = FRONT_TOP + 89

const terminal: Art = {
  back: N[800],
  front: INK,
  rim: N[700],
  peek: <Sheet />,
  frontArt: () => (
    <>
      <PixelText
        text="$ fibo --count"
        x={TEXT_X}
        y={TEXT_Y}
        pixel={8}
        fill={N[500]}
      />
      <PixelText
        text="1 1 2 3 5 8 13"
        x={TEXT_X}
        y={TEXT_Y + LINE_H}
        pixel={8}
        fill={PAPER}
      />
      <PixelText
        text="21 34 55 89"
        x={TEXT_X}
        y={TEXT_Y + LINE_H * 2}
        pixel={8}
        fill={PAPER}
      />
      <rect
        className="folder-caret"
        x={TEXT_X + 12 * 48}
        y={TEXT_Y + LINE_H * 2}
        width={40}
        height={56}
        fill={PAPER}
      />
    </>
  ),
}

/* -------------------------------------------------------------------------- */
/* No. 21 · Glyphs                                                            */
/* -------------------------------------------------------------------------- */

// 34 by 21 cells of 24: two numbers off the sequence, centred on the front.
const CELL = 24
const COLS = 34
const ROWS = 21
const GX = X0 + (W - COLS * CELL) / 2
const GY = FRONT_TOP + (FRONT_H - ROWS * CELL) / 2
const GHOST_COL = 13
const GHOST_ROW = 1

const hash = (x: number, y: number) =>
  (((x * 73856093) ^ (y * 19349663)) >>> 0) % 1000

// Dense at the edges, thinning toward the light behind the rabbit, whose
// lines come through solid and whose body clears to dots.
function glyphDensity(col: number, row: number) {
  const g = RESTING[row - GHOST_ROW + 3]?.[col - GHOST_COL]
  if (g === 1) return 0.97
  if (g === 2) return 0.1
  const dx = (col - (GHOST_COL + 8)) / COLS
  const dy = (row - ROWS / 2) / ROWS
  const d = Math.hypot(dx * 1.4, dy)
  return Math.min(
    1,
    Math.max(0, d * 1.6 - 0.3 + (hash(col, row) / 1000 - 0.5) * 0.3)
  )
}

// The five glyphs of fibo's pixel texture, lightest last.
function Glyph({ x, y, d }: { x: number; y: number; d: number }) {
  const c = CELL - 2
  if (d > 0.8) return <rect x={x} y={y} width={c} height={c} />
  if (d > 0.6)
    return (
      <>
        <path
          d={`M${x} ${y}h${c}v${c}h-${c}Z M${x + 5} ${y + 5}v${c - 10}h${c - 10}v-${c - 10}Z`}
          fillRule="evenodd"
        />
        <rect x={x + c / 2 - 2} y={y + c / 2 - 2} width={4} height={4} />
      </>
    )
  if (d > 0.4)
    return (
      <path
        d={`M${x} ${y}h${c}v${c}h-${c}Z M${x + 5} ${y + 5}v${c - 10}h${c - 10}v-${c - 10}Z`}
        fillRule="evenodd"
      />
    )
  if (d > 0.2)
    return <rect x={x + c / 2 - 4} y={y + c / 2 - 4} width={8} height={8} />
  if (d > 0.05)
    return <rect x={x + c / 2 - 1.5} y={y + c / 2 - 1.5} width={3} height={3} />
  return null
}

const glyphs: Art = {
  back: N[200],
  front: PAPER,
  rim: "#ffffff",
  peek: <Sheet />,
  frontArt: () => (
    <g fill={INK} shapeRendering="crispEdges">
      {Array.from({ length: COLS * ROWS }, (_, k) => {
        const col = k % COLS
        const row = Math.floor(k / COLS)
        return (
          <Glyph
            key={k}
            x={GX + col * CELL + 1}
            y={GY + row * CELL + 1}
            d={glyphDensity(col, row)}
          />
        )
      })}
    </g>
  ),
}

/* -------------------------------------------------------------------------- */

export const FOLDERS: FolderEntry[] = [
  {
    slug: "paper",
    title: "Paper",
    art: paper,
  },
  {
    slug: "ink",
    title: "Ink",
    art: ink,
  },
  {
    slug: "tiling",
    title: "Tiling",
    art: tiling,
  },
  {
    slug: "seeds",
    title: "Seeds",
    art: seeds,
  },
  {
    slug: "sunflower",
    title: "Sunflower",
    art: sunflower,
  },
  {
    slug: "window",
    title: "Window",
    art: windowArt,
  },
  {
    slug: "terminal",
    title: "Terminal",
    art: terminal,
  },
  {
    slug: "glyphs",
    title: "Glyphs",
    art: glyphs,
  },
]

const paint = (fill: Fill, id: string) =>
  typeof fill === "function" ? fill(id) : fill

/**
 * One folder as a standalone SVG. `id` keeps its defs apart from any other
 * copy on the page. Hover and focus on an ancestor `group/folder` or
 * `group/doc-card` lift whatever is tucked behind the front.
 */
export function Folder({
  entry,
  id,
  title,
  className,
}: {
  entry: FolderEntry
  id: string
  /** An accessible name. Leave it out where the folder is decoration. */
  title?: string
  className?: string
}) {
  const { art } = entry
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn("folder-art", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <clipPath id={`${id}-back`}>
          <path d={BACK_PATH} />
        </clipPath>
        <clipPath id={`${id}-front`}>
          <rect x={X0} y={FRONT_TOP} width={W} height={FRONT_H} rx={R} />
        </clipPath>
        <filter
          id={`${id}-shadow`}
          x="-10%"
          y="-10%"
          width="120%"
          height="130%"
        >
          <feDropShadow
            dx="0"
            dy="13"
            stdDeviation="13"
            floodColor="#000"
            floodOpacity="0.22"
          />
        </filter>
        {art.defs?.(id)}
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        <path d={BACK_PATH} fill={paint(art.back, id)} />
        {art.backArt && <g clipPath={`url(#${id}-back)`}>{art.backArt}</g>}
      </g>

      {art.peek && (
        <g
          className="folder-peek"
          style={{ "--lift": `${-(art.lift ?? 55)}px` } as CSSProperties}
        >
          {art.peek}
        </g>
      )}

      <g className="folder-front" filter={`url(#${id}-shadow)`}>
        <rect
          x={X0}
          y={FRONT_TOP}
          width={W}
          height={FRONT_H}
          rx={R}
          fill={paint(art.front, id)}
          fillOpacity={art.frontOpacity}
        />
        {art.frontArt && (
          <g clipPath={`url(#${id}-front)`}>{art.frontArt(id)}</g>
        )}
        <path
          d={`M${X0 + R - 6} ${FRONT_TOP + 3} H${X1 - R + 6}`}
          stroke={art.rim}
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
