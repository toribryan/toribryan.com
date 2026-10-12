"use client"

import type { ReactNode } from "react"

import {
  BOTTOM,
  FRONT_H,
  FRONT_TOP,
  PixelText,
  Sheet,
  W,
  X0,
  X1,
  type Art,
  type FolderEntry,
} from "./folders"

/*
 * The second set, closer to the board that started this: loud colour, print
 * grain, materials and a little face. Same folder body as the fibo set,
 * none of its rules.
 */

const CX = X0 + W / 2
const CY = FRONT_TOP + FRONT_H / 2

/** Print grain: dark speckles from fractal noise, laid over the front. */
function grainFilter(id: string, freq = 0.85, seed = 3) {
  return (
    <filter
      id={`${id}-grain`}
      filterUnits="userSpaceOnUse"
      x={X0}
      y={FRONT_TOP}
      width={W}
      height={FRONT_H}
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency={freq}
        numOctaves={2}
        seed={seed}
        stitchTiles="stitch"
      />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 -0.6"
      />
    </filter>
  )
}

function Grain({ id, opacity }: { id: string; opacity: number }) {
  return (
    <rect
      x={X0}
      y={FRONT_TOP}
      width={W}
      height={FRONT_H}
      filter={`url(#${id}-grain)`}
      opacity={opacity}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Quilt                                                                      */
/* -------------------------------------------------------------------------- */

const YELLOW = "#f2e641"
const OLIVE = "#c4bd2f"
const BLUE = "#1f45d6"
const RED = "#e2321f"

function Sunburst({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g fill={YELLOW}>
      <circle cx={cx} cy={cy} r={r * 0.55} />
      {Array.from({ length: 12 }, (_, k) => (
        <rect
          key={k}
          x={cx - r * 0.13}
          y={cy - r}
          width={r * 0.26}
          height={r * 0.5}
          rx={r * 0.13}
          transform={`rotate(${k * 30} ${cx} ${cy})`}
        />
      ))}
    </g>
  )
}

const quilt: Art = {
  back: RED,
  front: YELLOW,
  rim: "#ff8a6e",
  peek: <Sheet />,
  defs: (id) => grainFilter(id, 0.9, 7),
  frontArt: (id) => (
    <>
      <g fill={OLIVE}>
        {Array.from({ length: 16 }, (_, k) => {
          const i = k % 4
          const j = Math.floor(k / 4)
          return (i + j) % 2 ? (
            <rect
              key={k}
              x={X0 + i * 128}
              y={FRONT_TOP + j * 128}
              width={128}
              height={128}
            />
          ) : null
        })}
      </g>
      <path
        d={`M${X0 + 128} ${FRONT_TOP} L${X0 + 256} ${FRONT_TOP + 128} L${X0 + 384} ${FRONT_TOP} Z`}
        fill={BLUE}
      />
      <path
        d={`M${X0} ${BOTTOM - 128} L${X0 + 128} ${BOTTOM} L${X0} ${BOTTOM} Z`}
        fill={RED}
      />
      <rect
        x={X0 + 512}
        y={FRONT_TOP}
        width={48}
        height={FRONT_H}
        fill={BLUE}
      />
      <path
        d={`M${X0 + 560} ${FRONT_TOP} H${X1} L${X0 + 560} ${FRONT_TOP + 272} Z`}
        fill={BLUE}
      />
      <circle cx={X1 - 68} cy={FRONT_TOP + 204} r={34} fill={RED} />
      <rect
        x={X0 + 560}
        y={FRONT_TOP + 272}
        width={272}
        height={FRONT_H - 272}
        fill="#a9bbea"
      />
      <Sunburst cx={X1 + 4} cy={FRONT_TOP + 400} r={120} />
      <Grain id={id} opacity={0.45} />
    </>
  ),
}

/* -------------------------------------------------------------------------- */
/* Garden                                                                     */
/* -------------------------------------------------------------------------- */

const FLOWERS: [number, number, number, string][] = [
  [230, 420, 74, "#f07aa0"],
  [480, 640, 96, "#e8547f"],
  [770, 410, 82, "#f6b3c8"],
  [300, 760, 62, "#f6b3c8"],
  [860, 730, 78, "#f07aa0"],
  [620, 340, 52, "#e8547f"],
]

function Flower({
  x,
  y,
  r,
  color,
}: {
  x: number
  y: number
  r: number
  color: string
}) {
  return (
    <g>
      {Array.from({ length: 6 }, (_, k) => (
        <ellipse
          key={k}
          cx={x}
          cy={y - r * 0.5}
          rx={r * 0.3}
          ry={r * 0.55}
          fill={color}
          transform={`rotate(${k * 60 + r} ${x} ${y})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.24} fill="#f7c93a" />
    </g>
  )
}

const garden: Art = {
  back: "#c84a6a",
  front: "#1d2416",
  rim: "#e9839b",
  peek: <Sheet />,
  defs: (id) => grainFilter(id, 0.8, 11),
  frontArt: (id) => {
    const cell = 26
    const cols = Math.ceil(W / cell)
    const rows = Math.ceil(FRONT_H / cell)
    const marks: ReactNode[] = []
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
        const d = Math.abs(i - cols / 2) + Math.abs(j - rows / 2)
        if ((i + j) % 2 === 0 && Math.floor(d) % 8 < 4)
          marks.push(
            <rect
              key={`${i}:${j}`}
              x={X0 + i * cell}
              y={FRONT_TOP + j * cell}
              width={cell}
              height={cell}
            />
          )
      }
    return (
      <>
        <g fill="#4f8a3c">
          {FLOWERS.map(([x, y, r], k) => (
            <ellipse
              key={k}
              cx={x + r * 0.9}
              cy={y + r * 0.5}
              rx={r * 0.8}
              ry={r * 0.28}
              transform={`rotate(${-30 + k * 25} ${x} ${y})`}
            />
          ))}
        </g>
        {FLOWERS.map(([x, y, r, c], k) => (
          <Flower key={k} x={x} y={y} r={r} color={c} />
        ))}
        <g fill="#f2ea3a" shapeRendering="crispEdges">
          {marks}
        </g>
        <Grain id={id} opacity={0.3} />
      </>
    )
  },
}

/* -------------------------------------------------------------------------- */
/* Heat                                                                       */
/* -------------------------------------------------------------------------- */

function starPath(cx: number, cy: number, outer: number, inner: number) {
  const pts = Array.from({ length: 10 }, (_, k) => {
    const r = k % 2 ? inner : outer
    const a = -Math.PI / 2 + (k * Math.PI) / 5 + 0.2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const
  })
  // Round every corner by curving through it between the edge midpoints.
  const mid = (a: readonly number[], b: readonly number[]) =>
    `${((a[0]! + b[0]!) / 2).toFixed(1)} ${((a[1]! + b[1]!) / 2).toFixed(1)}`
  let d = `M${mid(pts[9]!, pts[0]!)}`
  pts.forEach((p, k) => {
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${mid(p, pts[(k + 1) % 10]!)}`
  })
  return d + "Z"
}

const heat: Art = {
  back: "#d9261c",
  front: "#ff2b1c",
  rim: "#ff7a5e",
  peek: <Sheet />,
  defs: (id) => (
    <>
      {grainFilter(id, 0.95, 5)}
      <filter
        id={`${id}-blur`}
        filterUnits="userSpaceOnUse"
        x={X0 - 100}
        y={FRONT_TOP - 100}
        width={W + 200}
        height={FRONT_H + 200}
      >
        <feGaussianBlur stdDeviation={46} />
      </filter>
      <radialGradient id={`${id}-sun`}>
        <stop offset="0" stopColor="#ffe14a" />
        <stop offset="1" stopColor="#ff7a00" />
      </radialGradient>
    </>
  ),
  frontArt: (id) => (
    <>
      <g filter={`url(#${id}-blur)`}>
        <circle cx={300} cy={420} r={170} fill="#ff8a00" />
        <circle cx={800} cy={620} r={130} fill="#3038ff" />
        <circle cx={640} cy={330} r={140} fill="#ff2fa0" />
        <circle cx={560} cy={780} r={160} fill="#b8001a" />
      </g>
      <circle cx={290} cy={690} r={118} fill={`url(#${id}-sun)`} />
      <path
        d={starPath(CX + 90, CY + 10, 210, 100)}
        fill="none"
        stroke="#2b39ff"
        strokeWidth={14}
        strokeLinejoin="round"
      />
      <path
        d={starPath(CX + 90, CY + 10, 210, 100)}
        fill="none"
        stroke="#ffd6c2"
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d={`M${CX - 120} ${FRONT_TOP + 70} l26 -26 l26 26 l26 -26 l26 26 l26 -26 l26 26`}
        fill="none"
        stroke="#1a0d0d"
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Grain id={id} opacity={0.4} />
    </>
  ),
}

/* -------------------------------------------------------------------------- */
/* Hello                                                                      */
/* -------------------------------------------------------------------------- */

const PHOSPHOR = "#3dff6e"

const hello: Art = {
  back: "#1a1a1a",
  front: (id) => `url(#${id}-screen)`,
  rim: "#363636",
  peek: <Sheet />,
  defs: (id) => (
    <>
      <radialGradient id={`${id}-screen`} cx="0.4" cy="0.45" r="0.8">
        <stop offset="0" stopColor="#0f1d11" />
        <stop offset="1" stopColor="#040604" />
      </radialGradient>
      <filter id={`${id}-glow`} x="-10%" y="-20%" width="120%" height="140%">
        <feGaussianBlur stdDeviation={7} result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <pattern
        id={`${id}-scan`}
        width={8}
        height={8}
        patternUnits="userSpaceOnUse"
      >
        <rect y={5} width={8} height={3} fill="#000" opacity={0.45} />
      </pattern>
    </>
  ),
  frontArt: (id) => (
    <>
      <g filter={`url(#${id}-glow)`}>
        <PixelText
          text="hello,"
          x={X0 + 89}
          y={FRONT_TOP + 89}
          pixel={13}
          fill={PHOSPHOR}
        />
        <PixelText
          text="world!!"
          x={X0 + 89}
          y={FRONT_TOP + 89 + 130}
          pixel={13}
          fill={PHOSPHOR}
        />
        <rect
          className="folder-caret"
          x={X0 + 89}
          y={FRONT_TOP + 89 + 260}
          width={65}
          height={13}
          fill={PHOSPHOR}
        />
      </g>
      <rect
        x={X0}
        y={FRONT_TOP}
        width={W}
        height={FRONT_H}
        fill={`url(#${id}-scan)`}
      />
    </>
  ),
}

/* -------------------------------------------------------------------------- */
/* Felt                                                                       */
/* -------------------------------------------------------------------------- */

const FACE = "#2b2b2e"

const felt: Art = {
  back: "#6f7075",
  front: "#8e8f94",
  rim: "#b4b5b9",
  peek: <Sheet />,
  defs: (id) => grainFilter(id, 1.3, 9),
  frontArt: (id) => (
    <>
      <Grain id={id} opacity={0.5} />
      <rect
        x={X0 + 21}
        y={FRONT_TOP + 21}
        width={W - 42}
        height={FRONT_H - 42}
        rx={24}
        fill="none"
        stroke="#c8c9cd"
        strokeWidth={5}
        strokeDasharray="16 12"
        strokeLinecap="round"
      />
      <g fill="#e59aa6" opacity={0.7}>
        <ellipse cx={CX - 128} cy={CY + 52} rx={30} ry={15} />
        <ellipse cx={CX + 128} cy={CY + 52} rx={30} ry={15} />
      </g>
      {/* Asleep until you hover. */}
      <g
        className="folder-rest"
        stroke={FACE}
        strokeWidth={13}
        strokeLinecap="round"
        fill="none"
      >
        <path d={`M${CX - 124} ${CY} q38 30 76 0`} />
        <path d={`M${CX + 48} ${CY} q38 30 76 0`} />
      </g>
      <g className="folder-hover" fill={FACE}>
        <circle cx={CX - 86} cy={CY + 8} r={21} />
        <circle cx={CX + 86} cy={CY + 8} r={21} />
      </g>
      <path
        d={`M${CX - 14} ${CY + 46} q7 8 14 0 q7 8 14 0`}
        stroke={FACE}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
}

/* -------------------------------------------------------------------------- */
/* Bondi                                                                      */
/* -------------------------------------------------------------------------- */

const bondi: Art = {
  back: "#0b7d8c",
  front: (id) => `url(#${id}-plastic)`,
  frontOpacity: 0.84,
  rim: "#9cecf3",
  peek: <Sheet fill="#ffffff" />,
  defs: (id) => (
    <>
      <linearGradient id={`${id}-plastic`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3fcad6" />
        <stop offset="1" stopColor="#0c8696" />
      </linearGradient>
      <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
        <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </>
  ),
  frontArt: (id) => (
    <>
      <g fill="#ffffff" opacity={0.1}>
        {Array.from({ length: Math.floor(W / 21) }, (_, k) => (
          <rect
            key={k}
            x={X0 + 8 + k * 21}
            y={FRONT_TOP}
            width={7}
            height={FRONT_H}
          />
        ))}
      </g>
      <rect
        x={X0}
        y={FRONT_TOP}
        width={W}
        height={FRONT_H}
        fill={`url(#${id}-sheen)`}
      />
    </>
  ),
}

/* -------------------------------------------------------------------------- */
/* Tufted                                                                     */
/* -------------------------------------------------------------------------- */

const TUFT = 96

const tufted: Art = {
  back: "#121212",
  front: (id) => `url(#${id}-tuft)`,
  rim: "#3d3d3d",
  peek: <Sheet />,
  defs: (id) => (
    <>
      <radialGradient id={`${id}-puff`} r="0.72">
        <stop offset="0" stopColor="#3e3e3e" />
        <stop offset="1" stopColor="#0e0e0e" />
      </radialGradient>
      <pattern
        id={`${id}-tuft`}
        width={TUFT}
        height={TUFT}
        patternUnits="userSpaceOnUse"
        patternTransform={`translate(${CX} ${CY}) rotate(45)`}
      >
        <rect width={TUFT} height={TUFT} fill={`url(#${id}-puff)`} />
        <path
          d={`M0 0H${TUFT}V${TUFT}H0Z`}
          fill="none"
          stroke="#050505"
          strokeWidth={4}
        />
        {[
          [0, 0],
          [TUFT, 0],
          [0, TUFT],
          [TUFT, TUFT],
        ].map(([x, y]) => (
          <g key={`${x}:${y}`}>
            <circle cx={x} cy={y} r={8} fill="#060606" />
            <circle cx={x! - 2} cy={y! - 2} r={3} fill="#5a5a5a" />
          </g>
        ))}
      </pattern>
    </>
  ),
  frontArt: () => (
    <rect
      x={X0 + 13}
      y={FRONT_TOP + 13}
      width={W - 26}
      height={FRONT_H - 26}
      rx={30}
      fill="none"
      stroke="#2e2e2e"
      strokeWidth={5}
    />
  ),
}

/* -------------------------------------------------------------------------- */

export const BOARD_FOLDERS: FolderEntry[] = [
  { slug: "quilt", title: "Quilt", art: quilt },
  { slug: "garden", title: "Garden", art: garden },
  { slug: "heat", title: "Heat", art: heat },
  { slug: "hello", title: "Hello", art: hello },
  { slug: "felt", title: "Felt", art: felt },
  { slug: "bondi", title: "Bondi", art: bondi },
  { slug: "tufted", title: "Tufted", art: tufted },
]
