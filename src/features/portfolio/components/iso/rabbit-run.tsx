"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

import {
  box,
  DETAIL,
  ETCH,
  FRONT,
  HAIR,
  LINE,
  MONO,
  P,
  PRESS,
  PRESSED,
  rabbit,
  SIDE,
  TOP,
  type Point,
} from "./iso"

/*
 * Rabbit run: steer the lead rabbit to carrots on a board etched with the
 * golden tiling. Each carrot is a month, and the family behind it grows by
 * the Fibonacci sequence; running into the edge or the family ends the run.
 * The floor lights up under the family and fades once the tail has passed.
 * The scene is redrawn as markup each step rather than through React.
 */

const PHI = (1 + Math.sqrt(5)) / 2
const fib = (n: number) => {
  let a = 0
  let b = 1
  for (let i = 0; i < n; i++) [a, b] = [b, a + b]
  return a
}
const GOAL = 9

/* 13 × 8 cells is exactly the golden tiling of 1, 1, 2, 3, 5 and 8. */
const COLS = 13
const ROWS = 8
const CELL = 34
const BASE = { w: 680, d: 430, h: 14 }
const BX = 30
const BY = 92
const BZ = BASE.h + 6
const DISPLAY = { x: 40, y: 16, w: 330, d: 26, h: 100 }
const PAD = { x: 575, y: 250 }

type Square = {
  x: number
  y: number
  w: number
  s: number
  start: Point
  center: Point
  end: Point
}

/* Each square sits on the long side of everything so far; its quarter arc carries on the last. */
const TILING: Square[] = (() => {
  type Raw = {
    x: number
    y: number
    s: number
    start: Point
    center: Point
    end: Point
  }
  type Dir = "right" | "down" | "left" | "up"
  const out: Raw[] = [
    { x: 0, y: 0, s: 1, start: [0, 1], center: [1, 1], end: [1, 0] },
  ]
  const bb = { x: 0, y: 0, w: 1, h: 1 }
  const turn: Record<Dir, Dir[]> = {
    right: ["down", "up"],
    down: ["left", "right"],
    left: ["up", "down"],
    up: ["right", "left"],
  }
  const same = (p: Point, q: Point) => p[0] === q[0] && p[1] === q[1]
  let dir: Dir = "right"
  for (let k = 1; k < 6; k++) {
    let sq: { x: number; y: number; s: number }
    let a: Point
    let b: Point
    if (dir === "right") {
      sq = { x: bb.x + bb.w, y: bb.y, s: bb.h }
      a = [sq.x, bb.y]
      b = [sq.x, bb.y + sq.s]
      bb.w += sq.s
    } else if (dir === "down") {
      sq = { x: bb.x, y: bb.y + bb.h, s: bb.w }
      a = [bb.x, sq.y]
      b = [bb.x + sq.s, sq.y]
      bb.h += sq.s
    } else if (dir === "left") {
      sq = { x: bb.x - bb.h, y: bb.y, s: bb.h }
      a = [bb.x, bb.y]
      b = [bb.x, bb.y + sq.s]
      bb.x -= sq.s
      bb.w += sq.s
    } else {
      sq = { x: bb.x, y: bb.y - bb.w, s: bb.w }
      a = [bb.x, bb.y]
      b = [bb.x + sq.s, bb.y]
      bb.y -= sq.s
      bb.h += sq.s
    }
    const prev = out[out.length - 1].end
    const start = same(prev, a) ? a : b
    const center = same(prev, a) ? b : a
    const corners: Point[] = [
      [sq.x, sq.y],
      [sq.x + sq.s, sq.y],
      [sq.x + sq.s, sq.y + sq.s],
      [sq.x, sq.y + sq.s],
    ]
    const end = corners.find(
      (c) =>
        !same(c, start) &&
        !same(c, center) &&
        (c[0] === center[0] || c[1] === center[1])
    )!
    out.push({ ...sq, start, center, end })
    const sides: Record<Dir, boolean> = {
      right: end[0] === bb.x + bb.w,
      left: end[0] === bb.x,
      up: end[1] === bb.y,
      down: end[1] === bb.y + bb.h,
    }
    dir = turn[dir].find((d) => sides[d])!
  }
  const mx = Math.min(...out.map((q) => q.x))
  const my = Math.min(...out.map((q) => q.y))
  const m = (p: Point): Point => [(p[0] - mx) * CELL, (p[1] - my) * CELL]
  return out.map((q) => ({
    x: (q.x - mx) * CELL,
    y: (q.y - my) * CELL,
    w: q.s * CELL,
    s: q.s,
    start: m(q.start),
    center: m(q.center),
    end: m(q.end),
  }))
})()

function board() {
  const W = COLS * CELL
  const H = ROWS * CELL
  let s = box(BX - 10, BY - 10, BASE.h, W + 20, H + 20, 6, 8)
  s += `<g transform="${TOP(BX, BY, BZ)}">`
  for (let i = 1; i < COLS; i++)
    s += `<path class="${DETAIL}" d="M${i * CELL} 0V${H}"/>`
  for (let j = 1; j < ROWS; j++)
    s += `<path class="${DETAIL}" d="M0 ${j * CELL}H${W}"/>`
  for (const q of TILING) {
    const [cx, cy] = q.center
    const cross =
      (q.start[0] - cx) * (q.end[1] - cy) - (q.start[1] - cy) * (q.end[0] - cx)
    s += `<rect class="${ETCH}" x="${q.x}" y="${q.y}" width="${q.w}" height="${q.w}" rx="3"/>`
    s += `<path class="${ETCH}" stroke-width="1.3" stroke-linecap="round" d="M${q.start[0]} ${q.start[1]}A${q.w} ${q.w} 0 0 ${cross > 0 ? 1 : 0} ${q.end[0]} ${q.end[1]}"/>`
    if (q.s > 1)
      s += `<text class="fill-muted-foreground ${MONO}" x="${q.x + q.w - 5}" y="${q.y + 12}" font-size="9" text-anchor="end">${q.s}</text>`
  }
  return s + `<rect class="${ETCH}" width="${W}" height="${H}" rx="4"/></g>`
}

function display() {
  const { x, y, w, d, h } = DISPLAY
  let s = box(x - 8, y - 6, BASE.h, w + 16, d + 12, 5, 4)
  s += box(x, y, BASE.h + 5, w, d, h, 6)
  s += `<g transform="${FRONT(x, y + d, BASE.h + 5 + h)}">
    <rect class="fill-background ${LINE} ${HAIR}" x="12" y="11" width="${w - 24}" height="${h - 22}" rx="6"/><g data-screen></g></g>`
  s += `<g transform="${SIDE(x + w, y + d, BASE.h + 5 + h)}">`
  for (let k = 0; k < 6; k++)
    s += `<path class="${DETAIL}" d="M7 ${20 + k * 12}H${d - 7}"/>`
  return s + `</g>`
}

type DirName = "up" | "right" | "down" | "left"
/* The pad's keys point along the board's axes, so each arrow goes where it looks. */
const DIRS: Record<DirName, Point> = {
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
}
const GLYPH: Record<DirName, string> = {
  up: "↑",
  right: "→",
  down: "↓",
  left: "←",
}

function pad() {
  const k = 36
  const gap = 40
  const spots: Record<DirName, Point> = {
    up: [0, -gap],
    left: [-gap, 0],
    right: [gap, 0],
    down: [0, gap],
  }
  let s = box(PAD.x - 66, PAD.y - 66, BASE.h, 132, 132, 4, 14)
  for (const name of ["up", "left", "right", "down"] as DirName[]) {
    const [dx, dy] = spots[name]
    const x = PAD.x + dx - k / 2
    const y = PAD.y + dy - k / 2
    s += `<g class="${PRESS}" data-dir="${name}" role="button" aria-label="Hop ${name}">${box(x, y, BASE.h + 4, k, k, 9, 6)}
      <g transform="${TOP(x, y, BASE.h + 13)}"><text class="fill-muted-foreground ${MONO}" x="${k / 2}" y="${k / 2 + 5}" font-size="15" text-anchor="middle">${GLYPH[name]}</text></g></g>`
  }
  const sx = PAD.x - 56
  const sy = PAD.y + 90
  s += `<g class="${PRESS}" data-act="start" role="button" aria-label="Start or pause">${box(sx, sy, BASE.h, 112, 34, 10, 8)}
    <g transform="${TOP(sx, sy, BASE.h + 10)}"><text data-start class="fill-muted-foreground ${MONO}" x="56" y="21" font-size="10" letter-spacing="2" text-anchor="middle">START</text></g></g>`
  return s
}

type Mode = "easy" | "medium" | "hard"
const MODES: Mode[] = ["easy", "medium", "hard"]
/* Milliseconds per hop: where each mode starts, how much faster each month gets, and its floor. */
const SPEEDS: Record<Mode, { start: number; step: number; min: number }> = {
  easy: { start: 300, step: 10, min: 180 },
  medium: { start: 220, step: 11, min: 115 },
  hard: { start: 150, step: 7, min: 80 },
}
const CHOSEN = [
  "translate-y-[3px]",
  "[&_:is(rect,.wall)]:stroke-foreground",
  "[&_text]:fill-foreground",
]

/* The speed keys run along the front edge of the base, under the board. */
function modeKeys() {
  const w = 76
  const d = 26
  const gap = 10
  const y = BASE.d - d - 14
  return MODES.map((mode, k) => {
    const x = 70 + k * (w + gap)
    return `<g class="${PRESS}" data-mode="${mode}" role="button" aria-label="${mode} speed">${box(x, y, BASE.h, w, d, 8, 6)}
      <g transform="${TOP(x, y, BASE.h + 8)}"><text class="fill-muted-foreground ${MONO}" x="${w / 2}" y="${d / 2 + 3.5}" font-size="9" letter-spacing="1.5" text-anchor="middle">${mode.toUpperCase()}</text></g></g>`
  }).join("")
}

/* An orange carrot standing in the board, its tip narrowing into the ground. */
const ORANGE =
  "[&_:is(rect,.wall)]:fill-[#f28a2e] [&_:is(rect,.wall)]:stroke-[#c8621a]"

function carrot(cx: number, cy: number, z: number) {
  return (
    `<g class="${ORANGE}">${box(cx - 2.5, cy - 2.5, z, 5, 5, 5, 2)}${box(cx - 4, cy - 4, z + 5, 8, 8, 9, 3)}</g>` +
    box(cx - 4, cy - 1, z + 14, 2, 2, 8, 0.8) +
    box(cx - 1, cy - 1, z + 14, 2, 2, 11, 0.8) +
    box(cx + 2, cy - 1, z + 14, 2, 2, 7, 0.8)
  )
}

const cellCenter = (i: number, j: number): Point => [
  BX + (i + 0.5) * CELL,
  BY + (j + 0.5) * CELL,
]

const VIEWBOX = (() => {
  const pts: number[][] = []
  for (const x of [0, BASE.w])
    for (const y of [0, BASE.d])
      for (const z of [0, BASE.h]) pts.push(P(x, y, z))
  pts.push(
    P(DISPLAY.x, DISPLAY.y, BASE.h + 5 + DISPLAY.h),
    P(DISPLAY.x + DISPLAY.w, DISPLAY.y, BASE.h + 5 + DISPLAY.h),
    P(BX, BY, BZ + 50),
    P(BX + COLS * CELL, BY, BZ + 50)
  )
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const x0 = Math.min(...xs)
  const x1 = Math.max(...xs)
  const y0 = Math.min(...ys)
  const y1 = Math.max(...ys)
  const mx = (x1 - x0) * 0.02
  const my = (y1 - y0) * 0.03
  return `${x0 - mx} ${y0 - my} ${x1 - x0 + 2 * mx} ${y1 - y0 + 2 * my}`
})()

const SCENE =
  box(0, 0, 0, BASE.w, BASE.d, BASE.h, 14) +
  board() +
  display() +
  pad() +
  modeKeys()

const BEST_KEY = "rabbit-run-best"
const MODE_KEY = "rabbit-run-mode"
const KEYS: Record<string, DirName> = {
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down",
  ArrowLeft: "left",
  w: "up",
  d: "right",
  s: "down",
  a: "left",
}

type Cell = { i: number; j: number; f: Point }
type Status = "ready" | "running" | "paused" | "over" | "won"

export function RabbitRun({
  demo = false,
  className,
}: {
  /** Plays itself while in view and takes no input, for a card cover. */
  demo?: boolean
  className?: string
}) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    svg.innerHTML =
      SCENE +
      `<g data-floor transform="${TOP(BX, BY, BZ)}"></g><g data-world></g>`
    const world = svg.querySelector<SVGGElement>("[data-world]")!
    const floor = svg.querySelector<SVGGElement>("[data-floor]")!
    const screen = svg.querySelector<SVGGElement>("[data-screen]")!
    const startLabel = svg.querySelector<SVGTextElement>("[data-start]")!
    const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches

    // Floor tiles light up under the family and fade once the tail has gone.
    const FADE = 0.72
    const LIT = 0.5
    const glow = new Float32Array(COLS * ROWS)
    floor.innerHTML = Array.from({ length: COLS * ROWS }, (_, n) => {
      const i = n % COLS
      const j = Math.floor(n / COLS)
      return `<rect class="fill-foreground transition-opacity duration-200 ease-linear motion-reduce:transition-none" style="opacity:0" x="${i * CELL + 2}" y="${j * CELL + 2}" width="${CELL - 4}" height="${CELL - 4}" rx="3"/>`
    }).join("")
    const tiles = [...floor.children] as SVGRectElement[]

    let mode: Mode = "medium"
    try {
      const saved = localStorage.getItem(MODE_KEY) as Mode | null
      if (saved && MODES.includes(saved)) mode = saved
    } catch {}
    // Each speed keeps its own best.
    const loadBest = () => {
      try {
        return Number(localStorage.getItem(`${BEST_KEY}-${mode}`)) || 0
      } catch {
        return 0
      }
    }
    let best = loadBest()

    const state = {
      status: "ready" as Status,
      month: 1,
      tick: 0,
      grow: 0,
      family: [] as Cell[],
      dir: "right" as DirName,
      queue: [] as DirName[],
      carrot: { i: 0, j: 0 },
      why: "",
    }
    let timer = 0

    const lightFloor = () => {
      for (let n = 0; n < glow.length; n++)
        glow[n] = glow[n] < 0.02 ? 0 : glow[n] * FADE
      for (const c of state.family) glow[c.j * COLS + c.i] = 1
    }

    const placeCarrot = () => {
      const taken = new Set(state.family.map((c) => `${c.i},${c.j}`))
      const free: Point[] = []
      for (let i = 0; i < COLS; i++)
        for (let j = 0; j < ROWS; j++)
          if (!taken.has(`${i},${j}`)) free.push([i, j])
      const [i, j] = free[Math.floor(Math.random() * free.length)]
      state.carrot = { i, j }
    }

    const reset = () => {
      Object.assign(state, {
        status: "ready",
        month: 1,
        tick: 0,
        grow: 0,
        family: [{ i: 3, j: 4, f: DIRS.right }],
        dir: "right",
        queue: [],
        why: "",
      })
      placeCarrot()
      glow.fill(0)
      lightFloor()
    }

    const render = () => {
      tiles.forEach((t, n) => {
        t.style.opacity = (glow[n] * LIT).toFixed(3)
      })
      const hopping = state.status === "running" && !reduced()
      const things = state.family.map((c, n) => {
        const [x, y] = cellCenter(c.i, c.j)
        const lift = hopping && (state.tick + n) % 2 === 0 ? 4 : 0
        return {
          depth: c.i + c.j + (n === 0 ? 0.01 : 0),
          html: rabbit(x, y, BZ + lift, c.f, n === 0 ? 1 : 0.6, n === 0),
        }
      })
      if (state.status !== "won") {
        const [x, y] = cellCenter(state.carrot.i, state.carrot.j)
        things.push({
          depth: state.carrot.i + state.carrot.j - 0.01,
          html: carrot(x, y, BZ),
        })
      }
      world.innerHTML = things
        .sort((a, b) => a.depth - b.depth)
        .map((t) => t.html)
        .join("")

      const n = state.month
      const pairs = fib(n)
      const prev = fib(n - 1)
      const gain = fib(n + 1) - pairs
      const ratio =
        n > 1 ? `${pairs} ÷ ${prev} = ${(pairs / prev).toFixed(4)}` : "1 ÷ —"
      const msg = {
        ready: "PRESS SPACE OR AN ARROW TO HOP",
        running: `NEXT CARROT · +${gain} ${gain === 1 ? "RABBIT" : "RABBITS"}`,
        paused: "PAUSED · SPACE TO HOP ON",
        over: `${state.why.toUpperCase()} · SPACE TO RETRY`,
        won: `${pairs} PAIRS · φ REACHED · SPACE TO PLAY AGAIN`,
      }[state.status]
      const seq = Array.from({ length: GOAL }, (_, i) => {
        const on = i < n
        return `<text class="${on ? "fill-foreground" : "fill-muted-foreground"} ${MONO}" x="${146 + i * 19}" y="44" font-size="9" text-anchor="middle"${on ? "" : ' opacity=".45"'}>${fib(i + 1)}</text>`
      }).join("")
      screen.innerHTML = `
        <text class="fill-muted-foreground ${MONO}" x="22" y="27" font-size="7.5" letter-spacing="1.5">${msg}</text>
        <text class="fill-foreground ${MONO}" x="22" y="58" font-size="26">${pairs}</text>
        <text class="fill-muted-foreground ${MONO}" x="22" y="70" font-size="7" letter-spacing="1.2">${pairs === 1 ? "PAIR" : "PAIRS"} · MONTH ${n}</text>
        ${seq}
        <text class="fill-foreground ${MONO}" x="142" y="62" font-size="8.5">${ratio}</text>
        <text class="fill-muted-foreground ${MONO}" x="142" y="73" font-size="7">φ = ${PHI.toFixed(4)} · BEST ${best} · ${mode.toUpperCase()}</text>`
      svg.querySelectorAll<SVGGElement>("[data-mode]").forEach((key) => {
        const on = key.dataset.mode === mode
        CHOSEN.forEach((c) => key.classList.toggle(c, on))
        key.setAttribute("aria-pressed", String(on))
      })
      startLabel.textContent =
        state.status === "running"
          ? "PAUSE"
          : state.status === "paused"
            ? "RESUME"
            : state.status === "ready"
              ? "START"
              : "AGAIN"
    }

    const speed = () => {
      const { start, step, min } = SPEEDS[mode]
      return Math.max(min, start - state.month * step)
    }
    // A new speed takes effect from the next hop.
    const choose = (next: Mode) => {
      mode = next
      best = loadBest()
      try {
        localStorage.setItem(MODE_KEY, mode)
      } catch {}
      render()
    }

    const record = () => {
      if (demo) return
      const pairs = fib(state.month)
      if (pairs <= best) return
      best = pairs
      try {
        localStorage.setItem(`${BEST_KEY}-${mode}`, String(best))
      } catch {}
    }

    const end = (why: string) => {
      state.status = "over"
      state.why = why
      record()
      render()
      if (!reduced())
        world.animate(
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(4px)" },
            { transform: "translateX(-2px)" },
            { transform: "translateX(0)" },
          ],
          { duration: 320, easing: "ease-out" }
        )
    }

    // The demo's player: the shortest way to the carrot around the family,
    // or any safe hop when there is none.
    const autoSteer = () => {
      const head = state.family[0]
      const body = new Set(
        state.family.slice(0, -1).map((c) => `${c.i},${c.j}`)
      )
      const free = (i: number, j: number) =>
        i >= 0 && j >= 0 && i < COLS && j < ROWS && !body.has(`${i},${j}`)
      const from = new Map<string, DirName | null>([
        [`${head.i},${head.j}`, null],
      ])
      const queue: [number, number, DirName | null][] = [[head.i, head.j, null]]
      while (queue.length) {
        const [i, j, first] = queue.shift()!
        if (i === state.carrot.i && j === state.carrot.j) {
          if (first) state.dir = first
          return
        }
        for (const name of Object.keys(DIRS) as DirName[]) {
          const [a, b] = DIRS[name]
          const key = `${i + a},${j + b}`
          if (!free(i + a, j + b) || from.has(key)) continue
          from.set(key, first ?? name)
          queue.push([i + a, j + b, first ?? name])
        }
      }
      const safe = (Object.keys(DIRS) as DirName[]).find((name) =>
        free(head.i + DIRS[name][0], head.j + DIRS[name][1])
      )
      if (safe) state.dir = safe
    }

    const step = () => {
      if (state.status !== "running") return
      if (demo) autoSteer()
      const next_ = state.queue.shift()
      if (next_) state.dir = next_
      const f = DIRS[state.dir]
      const head = state.family[0]
      const next: Cell = { i: head.i + f[0], j: head.j + f[1], f }
      const body = state.family.slice(0, state.grow === 0 ? -1 : undefined)
      if (next.i < 0 || next.j < 0 || next.i >= COLS || next.j >= ROWS)
        return end("hit the edge")
      if (body.some((c) => c.i === next.i && c.j === next.j))
        return end("ran into the family")

      state.family.unshift(next)
      // Each one behind faces the rabbit ahead of it.
      for (let n = 1; n < state.family.length; n++) {
        const a = state.family[n - 1]
        const b = state.family[n]
        if (a.i !== b.i || a.j !== b.j) b.f = [a.i - b.i, a.j - b.j]
      }
      if (state.grow > 0) state.grow--
      else state.family.pop()

      if (next.i === state.carrot.i && next.j === state.carrot.j) {
        state.month++
        state.grow += fib(state.month) - fib(state.month - 1)
        if (state.month >= GOAL) {
          state.status = "won"
          record()
          lightFloor()
          return render()
        }
        placeCarrot()
      }
      state.tick++
      lightFloor()
      render()
      timer = window.setTimeout(step, speed())
    }

    const begin = () => {
      if (state.status === "over" || state.status === "won") reset()
      state.status = "running"
      window.clearTimeout(timer)
      timer = window.setTimeout(step, speed())
      render()
    }
    const pause = () => {
      if (state.status !== "running") return
      state.status = "paused"
      window.clearTimeout(timer)
      render()
    }
    const toggle = () => (state.status === "running" ? pause() : begin())

    const steer = (name: DirName) => {
      const last = state.queue.length
        ? state.queue[state.queue.length - 1]
        : state.dir
      const [a, b] = DIRS[name]
      const [c, d] = DIRS[last]
      if (a === -c && b === -d && state.family.length > 1) return
      if (name !== last && state.queue.length < 2) state.queue.push(name)
      if (state.status !== "running" && state.status !== "paused") begin()
    }

    const bump = (el: Element | null) => {
      if (!el) return
      el.classList.add(...PRESSED)
      window.setTimeout(() => el.classList.remove(...PRESSED), 110)
    }

    const onClick = (e: MouseEvent) => {
      const p = (e.target as Element).closest<SVGGElement>(
        "[data-dir], [data-act], [data-mode]"
      )
      if (!p) return
      bump(p)
      if (p.dataset.dir) steer(p.dataset.dir as DirName)
      else if (p.dataset.mode) choose(p.dataset.mode as Mode)
      else toggle()
    }
    // Keys only steer while the board has focus, so the page still scrolls.
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const name = KEYS[e.key] ?? KEYS[e.key.toLowerCase()]
      if (name) {
        e.preventDefault()
        bump(svg.querySelector(`[data-dir="${name}"]`))
        steer(name)
      } else if (e.key >= "1" && e.key <= "3") {
        e.preventDefault()
        const next = MODES[Number(e.key) - 1]
        bump(svg.querySelector(`[data-mode="${next}"]`))
        choose(next)
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        if (e.repeat) return
        bump(svg.querySelector('[data-act="start"]'))
        toggle()
      }
    }
    const onPointerDown = () => svg.focus({ preventScroll: true })

    reset()
    render()

    if (demo) {
      // Runs while on screen, starting over a moment after each run ends.
      let restart = 0
      const watch = new MutationObserver(() => {
        if (state.status !== "over" && state.status !== "won") return
        window.clearTimeout(restart)
        restart = window.setTimeout(begin, 1400)
      })
      watch.observe(screen, { childList: true })
      const seen = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !reduced()) begin()
        else pause()
      })
      seen.observe(svg)
      return () => {
        window.clearTimeout(timer)
        window.clearTimeout(restart)
        watch.disconnect()
        seen.disconnect()
      }
    }

    svg.addEventListener("click", onClick)
    svg.addEventListener("keydown", onKey)
    svg.addEventListener("pointerdown", onPointerDown)
    svg.addEventListener("blur", pause)

    return () => {
      window.clearTimeout(timer)
      svg.removeEventListener("click", onClick)
      svg.removeEventListener("keydown", onKey)
      svg.removeEventListener("pointerdown", onPointerDown)
      svg.removeEventListener("blur", pause)
    }
  }, [demo])

  return (
    <figure className={cn("m-0", className)}>
      <svg
        ref={svgRef}
        viewBox={VIEWBOX}
        tabIndex={demo ? -1 : 0}
        role={demo ? "img" : "application"}
        aria-label="Rabbit run. Steer the lead rabbit to carrots with the arrow keys or the pad; each carrot is a month and the family behind it grows by the Fibonacci sequence. Hitting the edge or the family ends the run. Space starts and pauses; 1, 2 and 3 set easy, medium and hard speed."
        className="block h-auto w-full touch-manipulation outline-none select-none focus-visible:[&_[data-act=start]_rect]:stroke-foreground"
      />
    </figure>
  )
}
