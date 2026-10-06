"use client"

import { useEffect, useRef } from "react"

import {
  box,
  DETAIL,
  FRONT,
  HAIR,
  MONO,
  P,
  PRESS,
  PRESSED,
  SIDE,
  TOP,
} from "@/features/portfolio/components/iso/iso"

/*
 * Line-art figures for the agentic design system case study, drawn with the
 * home page's iso kit. Each one works: the written-down stack hands its
 * sheets to a reader, and the enforced board runs its checks.
 */

const INK = `fill-muted-foreground ${MONO}`
const LIT = `fill-foreground ${MONO}`
const LIVE = "[&_:is(rect,.wall)]:stroke-foreground"

function viewBox(pts: number[][], margin = 0.06) {
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const x0 = Math.min(...xs)
  const y0 = Math.min(...ys)
  const w = Math.max(...xs) - x0
  const h = Math.max(...ys) - y0
  const m = Math.max(w, h) * margin
  return `${x0 - m} ${y0 - m} ${w + 2 * m} ${h + 2 * m}`
}

/* Written down: three sheets an agent reads before it touches anything. */

const SHEET = { w: 180, d: 124, h: 22, gap: 5, out: 44 }
const SHEETS = ["metadata", "skills", "AGENTS.md"]
const sheetAt = (i: number) => ({
  x: i * 8,
  y: -i * 6,
  z: i * (SHEET.h + SHEET.gap),
})

function sheet(i: number) {
  const { w, d, h } = SHEET
  const { x, y, z } = sheetAt(i)
  const name = SHEETS[i]!
  let lines = ""
  const widths = [0.78, 0.62, 0.7, 0.45, 0.66]
  widths.forEach((f, k) => {
    lines += `<rect class="fill-border" x="16" y="${40 + k * 14}" width="${(w - 32) * f}" height="4" rx="2"/>`
  })
  let edges = ""
  for (let k = 3; k < h; k += 3)
    edges += `<path class="${DETAIL}" d="M6 ${k}H${d - 6}"/>`
  return `<g data-sheet="${i}" class="${PRESS}" role="button" aria-label="Read ${name}">
    <g data-slide class="transition-transform duration-200 ease-out motion-reduce:transition-none">
      ${box(x, y, z, w, d, h, 6)}
      <g transform="${TOP(x, y, z + h)}">
        <text class="${LIT}" x="16" y="24" font-size="11" letter-spacing="1">${name}</text>
        ${lines}
      </g>
      <g transform="${FRONT(x, y + d, z + h)}">
        <text class="${INK}" x="12" y="${h / 2 + 3}" font-size="8" letter-spacing="1.5">${name.toUpperCase()}</text>
      </g>
      <g transform="${SIDE(x + w, y + d, z + h)}">${edges}</g>
    </g>
  </g>`
}

const WRITTEN = {
  scene: SHEETS.map((_, i) => sheet(i)).join(""),
  viewBox: viewBox([
    P(0, SHEET.d + SHEET.out, 0),
    P(SHEET.w + 16, -12, 0),
    P(0, -12, 3 * (SHEET.h + SHEET.gap)),
    P(SHEET.w + 16, SHEET.d + SHEET.out, 0),
    P(16, -12, 3 * (SHEET.h + SHEET.gap)),
  ]),
}

/* Enforced: a board of five checks on a base, with a run button. */

const BASE = { w: 236, d: 176, h: 12 }
const BOARD = { x: 22, y: 16, w: 180, d: 12, h: 176 }
const RUN = { x: 140, y: 112, w: 72, d: 40, h: 9 }
const CHECKS = ["lint", "format", "figma drift", "build", "types · tests"]
const ROW = { top: 46, step: 24 }

function board() {
  const { x, y, w, d, h } = BOARD
  const z = BASE.h
  let rows = ""
  CHECKS.forEach((name, k) => {
    const ry = ROW.top + k * ROW.step
    rows += `<g data-check="${k}" class="cursor-pointer" role="button" aria-label="Break ${name}">
      <rect class="fill-transparent" x="8" y="${ry - 9}" width="${w - 16}" height="${ROW.step - 2}"/>
      <path class="${DETAIL}" d="M14 ${ry + ROW.step / 2}H${w - 14}"/>
      <rect data-box class="fill-card stroke-border ${HAIR}" x="14" y="${ry - 7}" width="14" height="14" rx="3"/>
      <path data-tick class="fill-none stroke-card ${HAIR}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M17.5 ${ry}L20.5 ${ry + 3}L25 ${ry - 3}"/>
      <path data-cross class="fill-none stroke-foreground ${HAIR}" stroke-width="1.4" stroke-linecap="round" d="M18 ${ry - 3}L24 ${ry + 3}M24 ${ry - 3}L18 ${ry + 3}"/>
      <text class="${LIT}" x="38" y="${ry + 3}" font-size="9" letter-spacing=".5">${name}</text>
      <text data-status class="${INK}" x="${w - 14}" y="${ry + 3}" font-size="7.5" letter-spacing="1" text-anchor="end"></text>
    </g>`
  })
  return (
    box(x, y, z, w, d, h, 6) +
    `<g transform="${FRONT(x, y + d, z + h)}">
      <text class="${INK}" x="14" y="24" font-size="8" letter-spacing="1.6">PULL REQUEST · CHECKS</text>
      <path class="${DETAIL}" d="M14 32H${w - 14}"/>
      ${rows}
    </g>
    <g transform="${SIDE(x + w, y + d, z + h)}"><path class="${DETAIL}" d="M3 10V${h - 10}"/></g>`
  )
}

const ENFORCED = {
  scene:
    box(0, 0, 0, BASE.w, BASE.d, BASE.h, 12) +
    `<g transform="${TOP(0, 0, BASE.h)}">
      <rect data-stamp-frame class="fill-none stroke-border ${HAIR}" x="18" y="${BASE.d - 58}" width="100" height="30" rx="5"/>
      <text data-stamp class="${LIT}" x="68" y="${BASE.d - 39}" font-size="10" letter-spacing="2" text-anchor="middle"></text>
    </g>` +
    board() +
    `<g data-run class="${PRESS}" role="button" aria-label="Run checks">
      ${box(RUN.x, RUN.y, BASE.h, RUN.w, RUN.d, RUN.h, 10)}
      <g transform="${TOP(RUN.x, RUN.y, BASE.h + RUN.h)}"><text class="${INK}" x="${RUN.w / 2}" y="${RUN.d / 2 + 3.5}" font-size="10" letter-spacing="2" text-anchor="middle">RUN</text></g>
    </g>`,
  viewBox: viewBox([
    P(0, BASE.d, 0),
    P(BASE.w, 0, 0),
    P(BASE.w, BASE.d, 0),
    P(BOARD.x, BOARD.y, BASE.h + BOARD.h),
    P(BOARD.x + BOARD.w, BOARD.y, BASE.h + BOARD.h),
  ]),
}

function useFigure(
  scene: string,
  wire: (svg: SVGSVGElement, say: (text: string) => void) => (() => void) | void
) {
  const svgRef = useRef<SVGSVGElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    svg.innerHTML = scene
    return wire(svg, (text) => {
      if (readoutRef.current) readoutRef.current.textContent = text
    })
    // The scene and its wiring are fixed per figure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { svgRef, readoutRef }
}

const bump = (el: Element) => {
  el.classList.add(...PRESSED)
  window.setTimeout(() => el.classList.remove(...PRESSED), 110)
}

function Frame({
  svgRef,
  readoutRef,
  viewBox,
  label,
  hint,
}: ReturnType<typeof useFigure> & {
  viewBox: string
  label: string
  hint: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <svg
        ref={svgRef}
        viewBox={viewBox}
        tabIndex={0}
        role="application"
        aria-label={label}
        className="block aspect-6/5 w-full touch-pan-y outline-none select-none"
      />
      <div className="flex flex-wrap justify-between gap-x-3 font-mono text-[10px] tracking-wider text-muted-foreground">
        <span>{hint}</span>
        <span ref={readoutRef} aria-live="polite" />
      </div>
    </div>
  )
}

function WrittenDown() {
  const refs = useFigure(WRITTEN.scene, (svg, say) => {
    const read = new Set<number>()
    let open = -1
    const [dx, dy] = P(0, SHEET.out, 0)
    const render = () => {
      svg.querySelectorAll<SVGGElement>("[data-sheet]").forEach((g) => {
        const on = Number(g.dataset.sheet) === open
        g.querySelector<SVGGElement>("[data-slide]")!.style.transform = on
          ? `translate(${dx}px, ${dy}px)`
          : ""
        g.classList.toggle(LIVE, on)
      })
      say(
        open < 0
          ? `read ${read.size} of 3`
          : `${SHEETS[open]!.toLowerCase()} · read ${read.size} of 3`
      )
    }
    const pull = (i: number) => {
      const g = svg.querySelector(`[data-sheet="${i}"]`)
      if (!g) return
      bump(g)
      open = open === i ? -1 : i
      if (open >= 0) read.add(i)
      render()
    }
    const onDown = (e: PointerEvent) => {
      svg.focus({ preventScroll: true })
      const g = (e.target as Element).closest<SVGGElement>("[data-sheet]")
      if (g) pull(Number(g.dataset.sheet))
    }
    // Keys count from the top of the stack, the order an agent reads in.
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key)
      if (n >= 1 && n <= 3) {
        e.preventDefault()
        pull(3 - n)
      }
    }
    svg.addEventListener("pointerdown", onDown)
    svg.addEventListener("keydown", onKey)
    render()
    return () => {
      svg.removeEventListener("pointerdown", onDown)
      svg.removeEventListener("keydown", onKey)
    }
  })
  return (
    <Frame
      {...refs}
      viewBox={WRITTEN.viewBox}
      label="A stack of three sheets: AGENTS.md on top, then skills, then metadata. Click a sheet, or press 1 to 3, to pull it out and read it."
      hint="click a sheet"
    />
  )
}

type Status = "pass" | "fail" | "run" | "idle"

function Enforced() {
  const refs = useFigure(ENFORCED.scene, (svg, say) => {
    const broken = new Set<number>()
    const status: Status[] = CHECKS.map(() => "pass")
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    let timers: number[] = []

    const render = () => {
      svg.querySelectorAll<SVGGElement>("[data-check]").forEach((g) => {
        const s = status[Number(g.dataset.check)]!
        const boxEl = g.querySelector("[data-box]")!
        boxEl.classList.toggle("fill-foreground", s === "pass")
        boxEl.classList.toggle(
          "stroke-foreground",
          s === "pass" || s === "fail"
        )
        g.querySelector<SVGPathElement>("[data-tick]")!.style.opacity =
          s === "pass" ? "1" : "0"
        g.querySelector<SVGPathElement>("[data-cross]")!.style.opacity =
          s === "fail" ? "1" : "0"
        g.querySelector("[data-status]")!.textContent =
          s === "run" ? "RUNNING" : s === "idle" ? "" : s.toUpperCase()
      })
      const done = status.every((s) => s === "pass" || s === "fail")
      const passed = status.filter((s) => s === "pass").length
      const stamp = svg.querySelector("[data-stamp]")!
      const frame = svg.querySelector("[data-stamp-frame]")!
      stamp.textContent = !done
        ? "CHECKING"
        : passed === CHECKS.length
          ? "MERGE OK"
          : "BLOCKED"
      frame.classList.toggle("stroke-foreground", done)
      const running = status.findIndex((s) => s === "run")
      say(
        !done
          ? `running ${CHECKS[running] ?? "checks"}`
          : `${passed} of ${CHECKS.length} passed · ${passed === CHECKS.length ? "mergeable" : "blocked"}`
      )
    }

    const run = () => {
      timers.forEach(window.clearTimeout)
      timers = []
      if (reduced) {
        CHECKS.forEach((_, k) => (status[k] = broken.has(k) ? "fail" : "pass"))
        render()
        return
      }
      CHECKS.forEach((_, k) => (status[k] = "idle"))
      CHECKS.forEach((_, k) => {
        timers.push(
          window.setTimeout(() => {
            status[k] = "run"
            render()
          }, k * 260),
          window.setTimeout(
            () => {
              status[k] = broken.has(k) ? "fail" : "pass"
              render()
            },
            k * 260 + 220
          )
        )
      })
      render()
    }

    const toggle = (k: number) => {
      if (broken.has(k)) broken.delete(k)
      else broken.add(k)
      run()
    }

    const onDown = (e: PointerEvent) => {
      svg.focus({ preventScroll: true })
      const target = e.target as Element
      const runKey = target.closest("[data-run]")
      if (runKey) {
        bump(runKey)
        run()
        return
      }
      const row = target.closest<SVGGElement>("[data-check]")
      if (row) toggle(Number(row.dataset.check))
    }
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key)
      if (e.key === "r" || e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        bump(svg.querySelector("[data-run]")!)
        run()
      } else if (n >= 1 && n <= CHECKS.length) {
        e.preventDefault()
        toggle(n - 1)
      }
    }
    svg.addEventListener("pointerdown", onDown)
    svg.addEventListener("keydown", onKey)
    render()
    return () => {
      timers.forEach(window.clearTimeout)
      svg.removeEventListener("pointerdown", onDown)
      svg.removeEventListener("keydown", onKey)
    }
  })
  return (
    <Frame
      {...refs}
      viewBox={ENFORCED.viewBox}
      label="A board of five pull request checks on a base: lint, format, Figma drift, build, and types and tests, with a run button. Click a check, or press 1 to 5, to break or fix it, and click run or press R to run them again."
      hint="click a check · run"
    />
  )
}

export const ISO_FIGURES = {
  "fibo-written": WrittenDown,
  "fibo-enforced": Enforced,
}

export type IsoFigureName = keyof typeof ISO_FIGURES
