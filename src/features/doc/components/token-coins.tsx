"use client"

import {
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

import { Plate } from "./fibo-blocks"

type Mode = "light" | "dark"
type Swatch = { primitive: string; hex: string }

/** Each role holds 7:1 or better on surface-card in both themes. */
const ROLES: {
  role: string
  sample: string
  light: Swatch
  dark: Swatch
}[] = [
  {
    role: "text-primary",
    sample: "Continue",
    light: { primitive: "neutral-900", hex: "#171717" },
    dark: { primitive: "neutral-50", hex: "#FAFAFA" },
  },
  {
    role: "action-primary",
    sample: "Submit",
    light: { primitive: "green-800", hex: "#166534" },
    dark: { primitive: "green-400", hex: "#4ADE80" },
  },
  {
    role: "status-info",
    sample: "Details",
    light: { primitive: "blue-800", hex: "#1E40AF" },
    dark: { primitive: "blue-300", hex: "#93C5FD" },
  },
  {
    role: "status-success",
    sample: "Passed",
    light: { primitive: "emerald-800", hex: "#065F46" },
    dark: { primitive: "emerald-400", hex: "#34D399" },
  },
  {
    role: "status-warning",
    sample: "Review",
    light: { primitive: "amber-800", hex: "#92400E" },
    dark: { primitive: "amber-300", hex: "#FCD34D" },
  },
  {
    role: "status-danger",
    sample: "Remove",
    light: { primitive: "red-800", hex: "#991B1B" },
    dark: { primitive: "red-300", hex: "#FCA5A5" },
  },
]

const SURFACES: Record<Mode, { card: string; text: string; muted: string }> = {
  light: { card: "#FFFFFF", text: "#171717", muted: "#525252" },
  dark: { card: "#171717", text: "#FAFAFA", muted: "#A3A3A3" },
}

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const x = luminance(a)
  const y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

const grade = (ratio: number) =>
  ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "fail"

/** One coin per point of contrast, up to a stack of ten. */
const MAX_COINS = 10

function measure(index: number, mode: Mode) {
  const { role, sample } = ROLES[index]
  const { primitive, hex } = ROLES[index][mode]
  const surface = SURFACES[mode]
  const ratio = contrast(hex, surface.card)
  const [label, labelRatio] = [surface.card, surface.text]
    .map((on) => [on, contrast(hex, on)] as const)
    .sort((a, b) => b[1] - a[1])[0]
  return {
    role,
    sample,
    primitive,
    hex,
    ratio,
    label,
    labelRatio,
    coins: Math.max(1, Math.min(MAX_COINS, Math.floor(ratio))),
  }
}

/*
 * Isometric projection. +x runs down-right, +y down-left, +z up. A plane is
 * an SVG matrix, so flat shapes drawn in a face's own units land on it.
 */
const C = Math.cos(Math.PI / 6)
const S = Math.sin(Math.PI / 6)
const P = (x: number, y: number, z: number) => [(x - y) * C, (x + y) * S - z]
type V3 = [number, number, number]
const plane = (o: V3, u: V3, v: V3) => {
  const [ox, oy] = P(...o)
  const [ux, uy] = P(...u)
  const [vx, vy] = P(...v)
  return `matrix(${ux} ${uy} ${vx} ${vy} ${ox} ${oy})`
}
const TOP = (x: number, y: number, z: number) =>
  plane([x, y, z], [1, 0, 0], [0, 1, 0])
const FRONT = (x: number, y: number, z: number) =>
  plane([x, y, z], [1, 0, 0], [0, 0, -1])
const SIDE = (x: number, y: number, z: number) =>
  plane([x, y, z], [0, -1, 0], [0, 0, -1])

const HAIR = "[vector-effect:non-scaling-stroke] [stroke-linejoin:round]"
const FACE = cn("fill-muted stroke-muted-foreground", HAIR)
const DECK = cn("fill-card stroke-muted-foreground", HAIR)
const DETAIL = cn("fill-none stroke-border", HAIR)
const LIVE =
  "group-data-selected/stack:stroke-foreground group-focus-visible/stack:stroke-foreground"

function Box({
  x,
  y,
  z,
  w,
  d,
  h,
  r = 0,
  top = DECK,
}: {
  x: number
  y: number
  z: number
  w: number
  d: number
  h: number
  r?: number
  top?: string
}) {
  const side = Math.min(r, h / 4)
  return (
    <>
      <rect
        transform={SIDE(x + w, y + d, z + h)}
        width={d}
        height={h}
        rx={side}
        className={FACE}
      />
      <rect
        transform={FRONT(x, y + d, z + h)}
        width={w}
        height={h}
        rx={side}
        className={FACE}
      />
      <rect
        transform={TOP(x, y, z + h)}
        width={w}
        height={d}
        rx={r}
        className={top}
      />
    </>
  )
}

const DESK = { w: 560, d: 380, h: 20 }
const R = 34
const T = 6
const SPOTS: [number, number][] = [
  [120, 160],
  [230, 160],
  [340, 160],
  [120, 280],
  [230, 280],
  [340, 280],
]
const LIFT = 14

/* A circle on the desk projects to an ellipse with level axes. */
const RX = R * Math.SQRT2 * C
const RY = R * Math.SQRT2 * S
const RIDGES = Array.from({ length: 17 }, (_, k) => {
  const f = ((k + 1) * Math.PI) / 18
  return [RX * Math.cos(f), RY * Math.sin(f)]
})

function Coin({
  cx,
  cy,
  z,
  live,
  children,
}: {
  cx: number
  cy: number
  z: number
  live?: boolean
  children?: ReactNode
}) {
  const [bx, by] = P(cx, cy, z)
  const ty = by - T
  return (
    <>
      <path
        d={`M${bx - RX} ${by}A${RX} ${RY} 0 0 0 ${bx + RX} ${by}L${bx + RX} ${ty}A${RX} ${RY} 0 0 1 ${bx - RX} ${ty}Z`}
        className={cn(FACE, live && LIVE)}
      />
      {RIDGES.map(([dx, dy], k) => (
        <path
          key={k}
          d={`M${bx + dx} ${by + dy - 1}V${ty + dy + 1}`}
          className={DETAIL}
        />
      ))}
      <g transform={TOP(cx, cy, z + T)}>
        <circle r={R} className={cn(DECK, live && LIVE)} />
        {children}
      </g>
    </>
  )
}

function Stack({
  index,
  mode,
  selected,
  animate,
  onSelect,
}: {
  index: number
  mode: Mode
  selected: boolean
  animate: boolean
  onSelect: (index: number) => void
}) {
  const [cx, cy] = SPOTS[index]
  const m = measure(index, mode)

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${m.role}, ${m.hex}, ${m.ratio.toFixed(1)} to 1 on surface-card`}
      data-selected={selected || undefined}
      onClick={() => onSelect(index)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect(index)
        }
      }}
      className="group/stack cursor-pointer outline-none active:translate-y-1"
    >
      {Array.from({ length: m.coins }, (_, k) => {
        const top = k === m.coins - 1
        const coin = (
          <Coin cx={cx} cy={cy} z={DESK.h + k * T} live={top}>
            {top && (
              <>
                <circle r={R - 8} className={DETAIL} />
                <circle
                  r={15}
                  style={{ fill: m.hex }}
                  className={cn("stroke-muted-foreground", HAIR, LIVE)}
                />
                <text className="fill-muted-foreground font-mono text-[5.4px] tracking-[1px] uppercase group-focus-visible/stack:fill-foreground group-data-selected/stack:fill-foreground">
                  <textPath href="#token-coins-rim">
                    {`${index + 1} · ${m.role} · ${m.ratio.toFixed(1)}:1 ·`}
                  </textPath>
                </text>
              </>
            )}
          </Coin>
        )
        return (
          <motion.g
            key={k}
            initial={animate ? { y: -22, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 0.35,
              bounce: 0.3,
            }}
          >
            {top ? (
              <g className="transition-transform duration-200 ease-out group-data-selected/stack:-translate-y-3.5">
                {coin}
              </g>
            ) : (
              coin
            )}
          </motion.g>
        )
      })}
    </g>
  )
}

const SWITCH = { x: 432, y: 140, w: 92, d: 44, h: 8 }
const KNOB_TRAVEL = 40

function Switch({ mode, onFlip }: { mode: Mode; onFlip: () => void }) {
  const { x, y, w, d, h } = SWITCH
  const z = DESK.h
  const [tx, ty] = P(KNOB_TRAVEL, 0, 0)
  return (
    <g
      role="switch"
      tabIndex={0}
      aria-checked={mode === "dark"}
      aria-label="Dark theme values"
      onClick={onFlip}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onFlip()
        }
      }}
      className="group/stack cursor-pointer outline-none active:translate-y-1"
    >
      <Box x={x} y={y} z={z} w={w} d={d} h={h} r={6} />
      <g transform={TOP(x, y, z + h)}>
        <rect
          x={5}
          y={5}
          width={w - 10}
          height={d - 10}
          rx={5}
          className={DETAIL}
        />
      </g>
      <g
        className="transition-transform duration-200 ease-out"
        style={{
          transform: mode === "dark" ? `translate(${tx}px, ${ty}px)` : "none",
        }}
      >
        <Box
          x={x + 7}
          y={y + 6}
          z={z + h}
          w={38}
          d={32}
          h={11}
          r={4}
          top={cn(
            "fill-foreground stroke-muted-foreground group-focus-visible/stack:stroke-foreground",
            HAIR
          )}
        />
        <g transform={TOP(x + 7, y + 6, z + h + 11)}>
          {[10, 16, 22, 28].map((v) => (
            <path
              key={v}
              d={`M${v} 7V25`}
              className={cn("fill-none stroke-background", HAIR)}
            />
          ))}
        </g>
      </g>
    </g>
  )
}

const CARD = { x: 40, y: 26, w: 260, d: 12, h: 160 }

function Card({ index, mode }: { index: number; mode: Mode }) {
  const m = measure(index, mode)
  const surface = SURFACES[mode]
  const { x, y, w, d, h } = CARD
  const z = DESK.h + 6
  return (
    <g transform={FRONT(x, y + d, z + h)} aria-hidden>
      <rect
        width={w}
        height={h}
        rx={4}
        style={{ fill: surface.card }}
        className={cn("stroke-muted-foreground", HAIR)}
      />
      <text
        x={14}
        y={20}
        className="font-mono text-[7px] tracking-[1.4px] uppercase"
        style={{ fill: surface.muted }}
      >
        {`Role ${index + 1}/6 · ${mode}`}
      </text>
      <text
        x={14}
        y={42}
        className="font-mono text-[15px]"
        style={{ fill: surface.text }}
      >
        {m.role}
      </text>
      <text
        x={14}
        y={56}
        className="font-mono text-[7px]"
        style={{ fill: surface.muted }}
      >
        {`${m.primitive} · ${m.hex}`}
      </text>
      <rect
        x={14}
        y={70}
        width={86}
        height={28}
        rx={6}
        style={{ fill: m.hex }}
      />
      <text
        x={57}
        y={88}
        textAnchor="middle"
        className="font-sans text-[9.5px] font-semibold"
        style={{ fill: m.label }}
      >
        {m.sample}
      </text>
      <rect
        x={112}
        y={74}
        width={80}
        height={20}
        rx={10}
        style={{ fill: `color-mix(in srgb, ${m.hex} 14%, ${surface.card})` }}
      />
      <text
        x={152}
        y={87}
        textAnchor="middle"
        className="font-sans text-[8px] font-semibold"
        style={{ fill: m.hex }}
      >
        {m.role.replace(/^(status|action|text)-/, "")}
      </text>
      <text
        x={14}
        y={120}
        className="font-sans text-[11px]"
        style={{ fill: m.hex }}
      >
        Text set in this role
      </text>
      <text
        x={14}
        y={142}
        className="font-mono text-[7px]"
        style={{ fill: surface.muted }}
      >
        {`${m.ratio.toFixed(2)}:1 on surface-card · ${grade(m.ratio)} · label ${m.labelRatio.toFixed(1)}:1`}
      </text>
    </g>
  )
}

const VIEWBOX = (() => {
  const points: number[][] = []
  for (const x of [0, DESK.w])
    for (const y of [0, DESK.d])
      for (const z of [0, DESK.h]) points.push(P(x, y, z))
  for (const x of [CARD.x, CARD.x + CARD.w])
    points.push(P(x, CARD.y, DESK.h + 6 + CARD.h))
  for (const [x, y] of SPOTS)
    for (const [dx, dy] of [
      [-R, R],
      [R, -R],
      [-R, -R],
    ])
      points.push(P(x + dx, y + dy, DESK.h + MAX_COINS * T + LIFT))
  const xs = points.map((p) => p[0])
  const ys = points.map((p) => p[1])
  const [x0, x1, y0, y1] = [
    Math.min(...xs),
    Math.max(...xs),
    Math.min(...ys),
    Math.max(...ys),
  ]
  const mx = (x1 - x0) * 0.04
  const my = (y1 - y0) * 0.05
  return `${x0 - mx} ${y0 - my} ${x1 - x0 + 2 * mx} ${y1 - y0 + 2 * my}`
})()

/** Painted back to front: whatever sits nearer the viewer comes later. */
const ORDER = [
  ...SPOTS.map(([x, y], index) => ({ depth: x + y, index })),
  { depth: SWITCH.x + SWITCH.w / 2 + SWITCH.y + SWITCH.d / 2, index: -1 },
].sort((a, b) => a.depth - b.depth)

/** next-themes sets the site's theme as a class on the root. */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

/**
 * The semantic roles as coins on a desk, one stack per role and one coin per
 * point of contrast on the card surface. The switch swaps every role to its
 * dark-theme value: the stacks restack, the roles stay. It starts on the
 * site's theme and follows it when that changes.
 */
export function TokenCoins() {
  const site = useSyncExternalStore<Mode>(
    subscribeToTheme,
    () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    () => "light"
  )
  // A flip holds only until the site's own theme changes.
  const [picked, setPicked] = useState<{ mode: Mode; site: Mode } | null>(null)
  const [selected, setSelected] = useState(1)
  const [touched, setTouched] = useState(false)
  const reduceMotion = Boolean(useReducedMotion())
  const mode = picked?.site === site ? picked.mode : site

  const flip = () => {
    setTouched(true)
    setPicked({ mode: mode === "light" ? "dark" : "light", site })
  }
  const m = measure(selected, mode)

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const key = event.key.toLowerCase()
    const index = Number.parseInt(key, 10) - 1
    if (key === "t") flip()
    else if (index >= 0 && index < ROLES.length) setSelected(index)
    else return
    event.preventDefault()
  }

  return (
    <Plate
      meta={
        <span aria-live="polite">
          {`${mode} · ${m.role} · ${m.ratio.toFixed(1)}:1 · ${grade(m.ratio).toLowerCase()}`}
        </span>
      }
      caption="Each stack is a role, with one coin per point of contrast on the card surface. Flip the switch: every value changes, the roles stay, and each still clears 7:1. Press a stack, or 1–6 and T."
      className="p-0 sm:p-0"
    >
      <svg
        viewBox={VIEWBOX}
        role="group"
        aria-label="Semantic color roles as coin stacks on a desk"
        onKeyDown={onKeyDown}
        className="block h-auto w-full touch-manipulation select-none"
      >
        <defs>
          <path
            id="token-coins-rim"
            d="M-29 0a29 29 0 1 1 58 0a29 29 0 1 1-58 0"
          />
        </defs>
        <Box x={0} y={0} z={0} w={DESK.w} d={DESK.d} h={DESK.h} r={10} />
        <g transform={TOP(0, 0, DESK.h)}>
          <rect
            x={14}
            y={14}
            width={DESK.w - 28}
            height={DESK.d - 28}
            rx={6}
            className={DETAIL}
          />
          {Array.from({ length: 13 }, (_, k) => (
            <path
              key={`x${k}`}
              d={`M${40 + k * 40} 14V366`}
              className={DETAIL}
            />
          ))}
          {Array.from({ length: 8 }, (_, k) => (
            <path
              key={`y${k}`}
              d={`M14 ${40 + k * 40}H546`}
              className={DETAIL}
            />
          ))}
        </g>
        <g
          transform={TOP(424, 192, DESK.h)}
          className="fill-muted-foreground font-mono text-[7px] tracking-[2px]"
          aria-hidden
        >
          <text x={10} y={8}>
            LIGHT
          </text>
          <text x={62} y={8}>
            DARK
          </text>
        </g>
        <Box x={30} y={16} z={DESK.h} w={280} d={36} h={6} r={4} />
        <Box
          x={CARD.x}
          y={CARD.y}
          z={DESK.h + 6}
          w={CARD.w}
          d={CARD.d}
          h={CARD.h}
          r={4}
        />
        <Card index={selected} mode={mode} />
        {ORDER.map(({ index }) =>
          index < 0 ? (
            <Switch key="switch" mode={mode} onFlip={flip} />
          ) : (
            <Stack
              key={index}
              index={index}
              mode={mode}
              selected={index === selected}
              animate={touched && !reduceMotion}
              onSelect={setSelected}
            />
          )
        )}
      </svg>
    </Plate>
  )
}
