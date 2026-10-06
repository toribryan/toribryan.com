"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

import {
  box,
  DETAIL,
  FRONT,
  HAIR,
  LINE,
  MONO,
  P,
  PRESS,
  PRESSED,
  SIDE,
  TOP,
} from "./iso"

/*
 * The 404 set: an old television on short legs, rabbit ears up, its screen
 * live static with the page's error on it. The channel knob changes the
 * channel, and every channel is just as lost.
 */

const LEG = 30
const TV = { w: 290, d: 120, h: 190, r: 16 }
const Z = LEG + TV.h
/* The picture tube's housing bulges out of the back of the cabinet. */
const TUBE = { x: 60, y: -66, w: 160, d: 70, inset: 38, r: 22 }
const BEZEL = { x: 14, y: 14, w: 196, h: TV.h - 28 }
const GLASS = { x: 26, y: 26, w: 172, h: TV.h - 52 }
const PANEL = { x: BEZEL.x + BEZEL.w + 8, w: TV.w - BEZEL.w - 36 }
const KNOB = { cx: PANEL.x + PANEL.w / 2, cy: 46, r: 18 }
const ANTENNA = { x: TUBE.x + TUBE.w / 2 - 14, y: TUBE.y + 26, s: 28 }
const FIRST = 3
const CHANNELS = 12

const INK = `fill-muted-foreground ${MONO}`
const pad = (n: number) => String(n).padStart(2, "0")

function screen() {
  const { x, y, w, h } = GLASS
  let lines = ""
  for (let k = 4; k < h; k += 5)
    lines += `<path class="stroke-background opacity-40" stroke-width=".8" d="M0 ${k}H${w}"/>`
  return `<g data-screen class="cursor-pointer" transform="translate(${x} ${y})">
    <clipPath id="tv-glass"><rect width="${w}" height="${h}" rx="26"/></clipPath>
    <rect class="fill-background" width="${w}" height="${h}" rx="26"/>
    <rect class="fill-background" width="${w}" height="${h}" rx="26" filter="url(#tv-static)"/>
    <g clip-path="url(#tv-glass)">
      <g data-picture>
      ${lines}
      <rect data-roll class="fill-background opacity-50" x="0" y="-24" width="${w}" height="20"/>
      <rect class="fill-background" x="16" y="14" width="44" height="15" rx="2"/>
      <text data-channel class="fill-foreground ${MONO}" x="21" y="25" font-size="9" letter-spacing="1.5">CH ${pad(FIRST)}</text>
      <rect class="fill-foreground" x="${w / 2 - 58}" y="${h / 2 - 22}" width="116" height="44" rx="3"/>
      <text class="fill-background ${MONO}" x="${w / 2 + 5}" y="${h / 2 + 10}" font-size="28" font-weight="700" letter-spacing="10" text-anchor="middle">404</text>
      </g>
      <g data-tear></g>
      <path class="fill-background opacity-40" d="M14 ${h * 0.42}C16 26 30 14 ${w * 0.42} 12C34 22 22 34 14 ${h * 0.42}Z"/>
    </g>
    <rect class="fill-none ${LINE} ${HAIR}" width="${w}" height="${h}" rx="26"/>
  </g>`
}

/* A round knob standing off the front face: a few discs stacked toward the viewer. */
function knob(cx: number, cy: number, r: number, pointer = false) {
  let s = ""
  for (let k = 0; k <= 6; k += 2)
    s += `<g transform="${FRONT(0, TV.d + k, Z)}"><circle class="${k === 6 ? "fill-card" : "fill-muted"} ${LINE} ${HAIR}" cx="${cx}" cy="${cy}" r="${r}"/></g>`
  return (
    s +
    `<g transform="${FRONT(0, TV.d + 6, Z)}">
      <circle class="${DETAIL}" cx="${cx}" cy="${cy}" r="${r * 0.62}"/>
      <g transform="translate(${cx} ${cy})">
        <g ${pointer ? "data-pointer " : ""}class="transition-transform duration-200 ease-out motion-reduce:transition-none">
          <path class="fill-none stroke-foreground ${HAIR}" stroke-width="2" stroke-linecap="round" d="M0 ${-r + 3}V${-r * 0.4}"/>
        </g>
      </g>
    </g>`
  )
}

function front() {
  const { h } = TV
  const { cx, cy, r } = KNOB
  let ticks = ""
  for (let k = 0; k < CHANNELS; k++) {
    const a = (k / CHANNELS) * Math.PI * 2 - Math.PI / 2
    const r0 = r + 4
    const r1 = r + 7
    ticks += `<path class="${DETAIL}" d="M${cx + r0 * Math.cos(a)} ${cy + r0 * Math.sin(a)}L${cx + r1 * Math.cos(a)} ${cy + r1 * Math.sin(a)}"/>`
  }
  let grille = ""
  for (let k = 0; k < 4; k++)
    grille += `<rect class="fill-background ${LINE} ${HAIR}" x="${PANEL.x + 8}" y="${128 + k * 8}" width="${PANEL.w - 16}" height="4" rx="2"/>`
  return `<g transform="${FRONT(0, TV.d, Z)}">
    <rect class="fill-muted ${LINE} ${HAIR}" x="${BEZEL.x}" y="${BEZEL.y}" width="${BEZEL.w}" height="${BEZEL.h}" rx="30"/>
    ${screen()}
    ${ticks}
    <text class="${INK}" x="${cx}" y="${cy + r + 16}" font-size="6" letter-spacing="1.5" text-anchor="middle">CHANNEL</text>
    <text class="${INK}" x="${cx}" y="${cy + r + 54}" font-size="6" letter-spacing="1.5" text-anchor="middle">VOLUME</text>
    ${grille}
    <circle class="fill-foreground" cx="${PANEL.x + 10}" cy="${h - 18}" r="2.5"/>
  </g>
  <g class="${PRESS}" data-part="dial" role="button" aria-label="Change channel">${knob(cx, cy, r, true)}</g>
  ${knob(cx, cy + r + 30, 11)}`
}

function side() {
  const { d, h } = TV
  let vents = ""
  for (let k = 0; k < 7; k++)
    vents += `<rect class="fill-background ${LINE} ${HAIR}" x="24" y="${40 + k * 12}" width="${d - 48}" height="5" rx="2.5"/>`
  return `<g transform="${SIDE(TV.w, TV.d, Z)}">
    ${vents}
    <text class="${INK}" x="${d - 16}" y="${h - 16}" font-size="10" letter-spacing="2.5" text-anchor="end">TORI BRYAN</text>
  </g>`
}

/*
 * Two telescoping rods from a little base on the tube. Each is an angle off
 * vertical and a length on screen, so dragging a tip swings and stretches it.
 */
const ROD = { min: 70, max: 190, swing: 62 }
const BASE = (() => {
  const { x, y, s } = ANTENNA
  return P(x + s / 2, y + s / 2, Z - TUBE.inset + 12)
})()
type Rod = { angle: number; length: number }
const RODS: Rod[] = [
  { angle: -25, length: 174 },
  { angle: 28, length: 187 },
]

function rods(state: Rod[]) {
  const [bx, by] = BASE
  return state
    .map(({ angle, length }, i) => {
      const a = (angle * Math.PI) / 180
      const ex = bx + Math.sin(a) * length
      const ey = by - Math.cos(a) * length
      const stem = `M${bx} ${by}L${ex} ${ey}`
      return `<path class="fill-none ${LINE} ${HAIR}" stroke-width="2.5" stroke-linecap="round" d="${stem}"/>
      <circle class="fill-card ${LINE} ${HAIR}" cx="${ex}" cy="${ey}" r="4"/>
      <path data-rod="${i}" data-stem class="cursor-grab touch-none fill-none stroke-transparent" stroke-width="14" d="${stem}"/>
      <circle data-rod="${i}" class="cursor-grab touch-none fill-transparent" cx="${ex}" cy="${ey}" r="14"/>`
    })
    .join("")
}

const SCENE = (() => {
  const { w, d, h, r } = TV
  let s = `<defs><filter id="tv-static" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.9 0.55" numOctaves="2" seed="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -1.25"/>
    <feComposite in="SourceGraphic" operator="in" result="grain"/>
    <feFlood class="[flood-color:var(--foreground)]"/>
    <feComposite in2="grain" operator="in"/>
  </filter></defs>`
  for (const [lx, ly] of [
    [w - 34, 10],
    [16, d - 30],
    [w - 34, d - 30],
  ])
    s += box(lx, ly, 0, 16, 16, LEG + 2, 4)
  s += box(
    TUBE.x,
    TUBE.y,
    LEG + TUBE.inset,
    TUBE.w,
    TUBE.d,
    h - 2 * TUBE.inset,
    TUBE.r
  )
  s += `<g transform="${SIDE(TUBE.x + TUBE.w, TUBE.y + TUBE.d, Z - TUBE.inset)}">`
  for (let k = 0; k < 5; k++)
    s += `<path class="${DETAIL}" d="M14 ${20 + k * 10}H${TUBE.d - 30}"/>`
  s += "</g>"
  s += box(
    ANTENNA.x,
    ANTENNA.y,
    Z - TUBE.inset,
    ANTENNA.s,
    ANTENNA.s,
    8,
    ANTENNA.s / 2
  )
  s += box(0, 0, LEG, w, d, h, r)
  s += `<g transform="${TOP(0, 0, Z)}"><rect class="${DETAIL}" x="10" y="10" width="${w - 20}" height="${d - 20}" rx="${r - 6}"/></g>`
  s += "<g data-antenna></g>"
  return s + front() + side()
})()

const VIEWBOX = (() => {
  const pts: number[][] = []
  for (const x of [0, TV.w])
    for (const y of [TUBE.y, TV.d + 8])
      for (const z of [0, Z]) pts.push(P(x, y, z))
  const reach = ROD.max * Math.sin((ROD.swing * Math.PI) / 180)
  pts.push([BASE[0] - reach, BASE[1] - ROD.max], [BASE[0] + reach, BASE[1]])
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const x0 = Math.min(...xs)
  const y0 = Math.min(...ys)
  const w = Math.max(...xs) - x0
  const h = Math.max(...ys) - y0
  const m = w * 0.04
  return `${x0 - m} ${y0 - m} ${w + 2 * m} ${h + 2 * m}`
})()

export function StaticTv({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    svg.innerHTML = SCENE
    const q = <T extends Element>(sel: string) => svg.querySelector<T>(sel)!
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches

    const state = { channel: FIRST, rods: RODS.map((r) => ({ ...r })) }
    const antenna = q("[data-antenna]")
    const render = () => {
      antenna.innerHTML = rods(state.rods)
      q("[data-channel]").textContent = `CH ${pad(state.channel)}`
      q<SVGGElement>("[data-pointer]").style.transform =
        `rotate(${(state.channel - FIRST) * (360 / CHANNELS)}deg)`
    }

    const turb = q<SVGFETurbulenceElement>("feTurbulence")
    const grain = q<SVGFEColorMatrixElement>("feColorMatrix")
    const picture = q<SVGGElement>("[data-picture]")
    const tear = q<SVGGElement>("[data-tear]")
    let seed = 1
    const roll = reduced
      ? null
      : q("[data-roll]").animate(
          [
            { transform: "translateY(0)" },
            { transform: `translateY(${GLASS.h + 28}px)` },
          ],
          { duration: 2600, iterations: Infinity }
        )

    const tune = (step: number) => {
      const dial = q("[data-part='dial']")
      dial.classList.add(...PRESSED)
      window.setTimeout(() => dial.classList.remove(...PRESSED), 110)
      state.channel = ((state.channel - 2 + step + CHANNELS) % CHANNELS) + 2
      turb.setAttribute("seed", String(++seed))
      roll?.play()
      if (roll) roll.currentTime = 0
      render()
    }

    /*
     * Interference: moving an antenna throws the picture into heavy, streaky
     * snow that shakes and tears, then settles once the rods are still.
     */
    let held = -1
    let level = 0
    let last = 0
    let raf = 0
    const rand = (n: number) => (Math.random() - 0.5) * n
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      if (document.hidden) return
      level = held >= 0 ? Math.max(level * 0.94, 0.3) : level * 0.9
      if (level < 0.01) level = 0
      if (t - last < (level ? 16 : 70)) return
      last = t
      turb.setAttribute("seed", String(++seed))
      turb.setAttribute("baseFrequency", `0.9 ${0.55 - level * 0.47}`)
      grain.setAttribute(
        "values",
        `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${3.4 + level * 3.6} 0 0 0 ${-1.25 - level * 1.6}`
      )
      if (roll) roll.playbackRate = 1 + level * 6
      picture.setAttribute(
        "transform",
        level ? `translate(${rand(6 * level)} ${rand(1.5 * level)})` : ""
      )
      let bands = ""
      for (let k = 0; k < Math.round(level * 4); k++)
        bands += `<rect class="${k % 2 ? "fill-foreground" : "fill-background"}" opacity="${0.4 + Math.random() * 0.5}" x="${rand(30)}" y="${Math.random() * GLASS.h}" width="${GLASS.w + 30}" height="${2 + Math.random() * 7}"/>`
      tear.innerHTML = bands
    }
    if (!reduced) raf = requestAnimationFrame(frame)

    // The pointer, in the scene's own coordinates, swings the held rod; held
    // by its tip, the rod also telescopes to reach it.
    let byTip = false
    const aim = (e: PointerEvent) => {
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const sp = pt.matrixTransform(svg.getScreenCTM()!.inverse())
      const dx = sp.x - BASE[0]
      const dy = BASE[1] - sp.y
      const angle = (Math.atan2(dx, dy) * 180) / Math.PI
      const was = state.rods[held]
      const next = {
        angle: Math.max(-ROD.swing, Math.min(ROD.swing, angle)),
        length: byTip
          ? Math.max(ROD.min, Math.min(ROD.max, Math.hypot(dx, dy)))
          : was.length,
      }
      level = Math.min(
        1,
        level +
          Math.abs(next.angle - was.angle) / 12 +
          Math.abs(next.length - was.length) / 40
      )
      state.rods[held] = next
      render()
    }

    const onPointerDown = (e: PointerEvent) => {
      svg.focus({ preventScroll: true })
      const rod = (e.target as Element).closest<SVGElement>("[data-rod]")
      if (rod) {
        held = Number(rod.dataset.rod)
        byTip = !("stem" in rod.dataset)
        svg.setPointerCapture(e.pointerId)
        svg.classList.add("cursor-grabbing")
        aim(e)
        return
      }
      if ((e.target as Element).closest("[data-part='dial'], [data-screen]"))
        tune(1)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const step =
        e.key === "ArrowUp" ||
        e.key === "ArrowRight" ||
        e.key === " " ||
        e.key === "Enter"
          ? 1
          : e.key === "ArrowDown" || e.key === "ArrowLeft"
            ? -1
            : 0
      if (!step) return
      e.preventDefault()
      tune(step)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (held >= 0) aim(e)
    }
    const release = () => {
      held = -1
      svg.classList.remove("cursor-grabbing")
    }

    svg.addEventListener("pointerdown", onPointerDown)
    svg.addEventListener("pointermove", onPointerMove)
    svg.addEventListener("pointerup", release)
    svg.addEventListener("pointercancel", release)
    svg.addEventListener("keydown", onKey)
    render()

    return () => {
      cancelAnimationFrame(raf)
      roll?.cancel()
      svg.removeEventListener("pointerdown", onPointerDown)
      svg.removeEventListener("pointermove", onPointerMove)
      svg.removeEventListener("pointerup", release)
      svg.removeEventListener("pointercancel", release)
      svg.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <figure className={cn("m-0", className)}>
      <svg
        ref={svgRef}
        viewBox={VIEWBOX}
        tabIndex={0}
        role="application"
        aria-label="An old television showing static and the number 404, with a channel dial on its front. Click the dial or use the arrow keys to change the channel, and drag the antennas to move them."
        className="block h-auto w-full touch-pan-y outline-none select-none"
      />
      <figcaption className="mt-3 flex justify-between gap-4 font-mono text-xs tracking-widest text-muted-foreground">
        <span>Fig 404</span>
      </figcaption>
    </figure>
  )
}
