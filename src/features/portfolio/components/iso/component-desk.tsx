"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

import {
  box,
  C,
  DETAIL,
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
 * The component desk: the rabbit beside a working set of design system parts
 * (button with a count badge, switch, checkbox, slider, radio group, tabs,
 * number stepper and a toast trigger) and an inspector monitor that shows the
 * code for whichever part was last used. The rabbit turns to watch each one.
 */

const DESK = { w: 580, d: 390, h: 18 }
const Z = DESK.h
const MONITOR = { x: 40, y: 26, w: 270, d: 18, h: 150 }
const RABBIT = { x: 452, y: 132, k: 2.5 }
const BUTTON = { x: 40, y: 104, w: 120, d: 50, h: 12, r: 12 }
const SWITCH = { x: 200, y: 110, w: 84, d: 40, h: 9, r: 20, travel: 44 }
const CHECK = { x: 326, y: 108, w: 44, d: 44, h: 11, r: 8 }
const SLIDER = { x: 40, y: 208, w: 250, d: 12, h: 5, r: 6, knob: 26 }
const RADIO = { x: 330, y: 200, s: 34, gap: 16, options: ["sm", "md", "lg"] }
const TABS = {
  x: 40,
  y: 284,
  w: 222,
  d: 40,
  names: ["overview", "specs", "code"],
}
const STEPPER = { x: 296, y: 286, key: 34, d: 36, disp: 48, max: 10 }
const TOAST = { x: 452, y: 286, w: 96, d: 38, h: 10, r: 10 }

type Part =
  | "button"
  | "switch"
  | "checkbox"
  | "slider"
  | "radio"
  | "tabs"
  | "stepper"
  | "toast"

const SPOTS: Record<Part, Point> = {
  button: [BUTTON.x + BUTTON.w / 2, BUTTON.y + BUTTON.d / 2],
  switch: [SWITCH.x + SWITCH.w / 2, SWITCH.y + SWITCH.d / 2],
  checkbox: [CHECK.x + CHECK.w / 2, CHECK.y + CHECK.d / 2],
  slider: [SLIDER.x + SLIDER.w / 2, SLIDER.y],
  radio: [RADIO.x + RADIO.s * 1.5 + RADIO.gap, RADIO.y + RADIO.s / 2],
  tabs: [TABS.x + TABS.w / 2, TABS.y + TABS.d / 2],
  stepper: [STEPPER.x + 58, STEPPER.y + STEPPER.d / 2],
  toast: [TOAST.x + TOAST.w / 2, TOAST.y + TOAST.d / 2],
}

const INK = `fill-muted-foreground ${MONO}`
const LIT = `fill-foreground ${MONO}`
/* A part that is on fills with the foreground, its label cut out of it. */
const ON = [
  "[&_:is(rect,.wall)]:fill-foreground",
  "[&_:is(rect,.wall)]:stroke-foreground",
  "[&_text]:fill-card",
]

const label = (
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  text: string,
  size = 10
) =>
  `<g transform="${TOP(x, y, z)}"><text class="${INK}" x="${w / 2}" y="${d / 2 + size * 0.36}" font-size="${size}" letter-spacing="1" text-anchor="middle">${text}</text></g>`

function monitor() {
  const { x, y, w, d, h } = MONITOR
  let s =
    box(x + w / 2 - 40, y - 6, Z, 80, d + 22, 5, 6) +
    box(x + w / 2 - 8, y + 2, Z + 5, 16, 8, 26, 3) +
    box(x, y, Z + 26, w, d, h, 8)
  s += `<g transform="${FRONT(x, y + d, Z + 26 + h)}">
    <rect class="fill-background ${LINE} ${HAIR}" x="12" y="12" width="${w - 24}" height="${h - 24}" rx="7"/>
    <g data-screen></g>
    <g data-toast class="opacity-0 translate-y-2 transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none">
      <rect class="fill-card ${LINE} ${HAIR}" x="${w - 122}" y="40" width="98" height="30" rx="6"/>
      <circle class="fill-foreground" cx="${w - 110}" cy="55" r="3"/>
      <text class="${LIT}" x="${w - 102}" y="53" font-size="9">Saved</text>
      <text class="${INK}" data-toast-note x="${w - 102}" y="63" font-size="6.5">STORED · 0</text>
    </g></g>`
  s += `<g transform="${SIDE(x + w, y + d, Z + 26 + h)}">`
  for (let k = 0; k < 8; k++)
    s += `<path class="${DETAIL}" d="M5 ${24 + k * 13}H${d - 5}"/>`
  return s + "</g>"
}

function button() {
  const { x, y, w, d, h, r } = BUTTON
  // A count badge rides on the button's corner and goes down with it.
  const bx = x + w - 30
  const by = y - 4
  return `<g class="${PRESS}" data-part="button" role="button" aria-label="Button">${box(x, y, Z, w, d, h, r)}${label(x, y, Z + h, w, d, "BUTTON", 11)}
    <g class="${ON.join(" ")}">${box(bx, by, Z + h, 32, 18, 7, 9)}<g transform="${TOP(bx, by, Z + h + 7)}"><text class="${INK}" data-badge x="16" y="12.5" font-size="10" text-anchor="middle">0</text></g></g></g>`
}

function toggle() {
  const { x, y, w, d, h, r } = SWITCH
  return `<g class="${PRESS}" data-part="switch" role="switch" aria-label="Switch">
    <g data-track>${box(x, y, Z, w, d, h, r)}</g>
    <g data-knob class="transition-transform duration-150 ease-out motion-reduce:transition-none">${box(x + 4, y + 4, Z + h, d - 8, d - 8, 8, (d - 8) / 2)}</g>
  </g>`
}

function checkbox() {
  const { x, y, w, d, h, r } = CHECK
  return `<g class="${PRESS}" data-part="checkbox" role="checkbox" aria-label="Checkbox">${box(x, y, Z, w, d, h, r)}
    <g transform="${TOP(x, y, Z + h)}"><path data-check class="fill-none stroke-foreground opacity-0 transition-opacity duration-100 ${HAIR}" stroke-width="2" stroke-linecap="round" d="M${w * 0.26} ${d * 0.52}L${w * 0.43} ${d * 0.7}L${w * 0.75} ${d * 0.32}"/></g></g>`
}

function slider() {
  const { x, y, w, d, h, r } = SLIDER
  let s = `<g data-part="slider" class="cursor-pointer" role="slider" aria-label="Slider">${box(x, y, Z, w, d, h, r)}<g transform="${TOP(x, y, Z + h)}">`
  for (let k = 0; k <= 10; k++)
    s += `<path class="${DETAIL}" d="M${12 + (k * (w - 24)) / 10} ${d / 2 - 2}v4"/>`
  return (
    s +
    `</g><g data-fill></g></g><g data-part="slider" data-slider-knob class="cursor-grab"></g>`
  )
}

function radio(i: number) {
  const { x, y, s, gap, options } = RADIO
  const o = options[i]
  const rx = x + i * (s + gap)
  return `<g class="${PRESS}" data-part="radio" data-option="${o}" role="radio" aria-label="${o}">${box(rx, y, Z, s, s, 9, s / 2)}
    <g transform="${TOP(rx, y, Z + 9)}"><circle data-dot class="fill-foreground" cx="${s / 2}" cy="${s / 2}" r="${s * 0.2}" style="opacity:0"/></g>
    ${label(rx, y + s + 2, Z, s, 14, o.toUpperCase(), 8)}</g>`
}

function tabs() {
  const { x, y, w, d, names } = TABS
  const seg = (w - 12) / names.length
  return (
    box(x, y, Z, w, d, 6, 12) +
    names
      .map((n, i) => {
        const sx = x + 6 + i * seg
        return `<g class="${PRESS}" data-part="tabs" data-tab="${n}" role="tab" aria-label="${n}"><g data-tab-face>${box(sx + 1, y + 5, Z + 6, seg - 2, d - 10, 5, 8)}${label(sx + 1, y + 5, Z + 11, seg - 2, d - 10, n.toUpperCase(), 7.5)}</g></g>`
      })
      .join("")
  )
}

function stepper() {
  const { x, y, key, d, disp } = STEPPER
  const k = (kx: number, step: number, glyph: string) =>
    `<g class="${PRESS}" data-part="stepper" data-step="${step}" role="button" aria-label="${step > 0 ? "Increase" : "Decrease"}">${box(kx, y, Z, key, d, 9, 8)}${label(kx, y, Z + 9, key, d, glyph, 14)}</g>`
  const dx = x + key + 4
  return (
    k(x, -1, "−") +
    box(dx, y + 2, Z, disp, d - 4, 4, 5) +
    `<g transform="${TOP(dx, y + 2, Z + 4)}"><text class="${LIT}" data-count x="${disp / 2}" y="${(d - 4) / 2 + 5}" font-size="14" text-anchor="middle">0</text></g>` +
    k(dx + disp + 4, 1, "+")
  )
}

function toastKey() {
  const { x, y, w, d, h, r } = TOAST
  return `<g class="${PRESS}" data-part="toast" role="button" aria-label="Toast">${box(x, y, Z, w, d, h, r)}${label(x, y, Z + h, w, d, "TOAST", 10)}</g>`
}

const SCENE = (() => {
  let s = box(0, 0, 0, DESK.w, DESK.d, DESK.h, 16)
  s += `<g transform="${TOP(0, 0, Z)}"><rect class="${DETAIL}" x="14" y="${DESK.d - 40}" width="${DESK.w - 28}" height="26" rx="6"/></g>`
  s += monitor()
  // Back to front: whatever sits nearer the viewer is drawn later.
  const items = [
    { k: BUTTON.x + BUTTON.y, html: button() },
    { k: SWITCH.x + SWITCH.y, html: toggle() },
    { k: CHECK.x + CHECK.y, html: checkbox() },
    { k: SLIDER.x + SLIDER.y, html: slider() },
    ...RADIO.options.map((_, i) => ({
      k: RADIO.x + i * (RADIO.s + RADIO.gap) + RADIO.y + RADIO.s,
      html: radio(i),
    })),
    { k: TABS.x + TABS.y, html: tabs() },
    { k: STEPPER.x + STEPPER.y, html: stepper() },
    { k: TOAST.x + TOAST.y, html: toastKey() },
    { k: RABBIT.x + RABBIT.y + 20, html: "<g data-rabbit></g>" },
  ]
  return (
    s +
    items
      .sort((a, b) => a.k - b.k)
      .map((i) => i.html)
      .join("")
  )
})()

const VIEWBOX = (() => {
  const pts: number[][] = []
  for (const x of [0, DESK.w])
    for (const y of [0, DESK.d])
      for (const z of [0, DESK.h]) pts.push(P(x, y, z))
  pts.push(
    P(MONITOR.x, MONITOR.y, Z + 26 + MONITOR.h),
    P(MONITOR.x + MONITOR.w, MONITOR.y, Z + 26 + MONITOR.h),
    P(RABBIT.x - 40, RABBIT.y - 40, Z + 40 * RABBIT.k + 20)
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

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;")

export function ComponentDesk({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    svg.innerHTML = SCENE
    const q = <T extends Element>(sel: string) => svg.querySelector<T>(sel)!
    const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches

    const state = {
      clicks: 0,
      on: false,
      checked: false,
      value: 62,
      option: "md",
      tab: "overview",
      count: 3,
      toasts: 0,
      last: "button" as Part,
      facing: [0, 1] as Point,
    }

    const CODE: Record<Part, () => string[]> = {
      button: () => [
        "<Button",
        "  onClick={count}",
        ">Save</Button>",
        `clicked ${state.clicks}×`,
      ],
      switch: () => [
        "<Switch",
        `  checked={${state.on}}`,
        "/>",
        state.on ? "on" : "off",
      ],
      checkbox: () => [
        "<Checkbox",
        `  checked={${state.checked}}`,
        "/>",
        state.checked ? "checked" : "unchecked",
      ],
      slider: () => [
        "<Slider",
        `  value={[${state.value}]}`,
        "/>",
        `${state.value} of 100`,
      ],
      radio: () => [
        "<RadioGroup",
        `  value="${state.option}"`,
        "/>",
        `size ${state.option}`,
      ],
      tabs: () => ["<Tabs", `  value="${state.tab}"`, "/>", `tab ${state.tab}`],
      stepper: () => [
        "<NumberField",
        `  value={${state.count}}`,
        "/>",
        `${state.count} of ${STEPPER.max}`,
      ],
      toast: () => ["toast(", '  "Saved"', ")", `shown ${state.toasts}×`],
    }

    const rabbitEl = q<SVGGElement>("[data-rabbit]")
    const drawRabbit = () => {
      rabbitEl.innerHTML = rabbit(
        RABBIT.x,
        RABBIT.y,
        Z,
        state.facing,
        RABBIT.k,
        false
      )
    }
    // The rabbit looks at whatever was touched, keeping its face to the viewer.
    const look = (part: Part) => {
      const [px, py] = SPOTS[part]
      const dx = px - RABBIT.x
      const dy = py - RABBIT.y
      state.facing =
        Math.abs(dx) > Math.abs(dy) * 1.4 && dx > 0 ? [1, 0] : [0, 1]
      drawRabbit()
      if (!reduced())
        rabbitEl.animate(
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-16px)", offset: 0.45 },
            { transform: "translateY(0)" },
          ],
          { duration: 340, easing: "cubic-bezier(.3,0,.4,1)" }
        )
    }

    const [tx, ty] = P(SWITCH.travel, 0, 0)
    const render = () => {
      const track = q<SVGGElement>("[data-track]")
      ON.forEach((c) => track.classList.toggle(c, state.on))
      q<SVGGElement>("[data-knob]").style.transform = state.on
        ? `translate(${tx}px, ${ty}px)`
        : "none"
      q<SVGGElement>('[data-part="switch"]').setAttribute(
        "aria-checked",
        String(state.on)
      )
      q<SVGPathElement>("[data-check]").style.opacity = state.checked
        ? "1"
        : "0"
      q<SVGGElement>('[data-part="checkbox"]').setAttribute(
        "aria-checked",
        String(state.checked)
      )
      svg.querySelectorAll<SVGGElement>("[data-option]").forEach((g) => {
        const on = g.dataset.option === state.option
        g.querySelector<SVGCircleElement>("[data-dot]")!.style.opacity = on
          ? "1"
          : "0"
        g.setAttribute("aria-checked", String(on))
      })
      svg.querySelectorAll<SVGGElement>("[data-tab]").forEach((g) => {
        const on = g.dataset.tab === state.tab
        const face = g.querySelector("[data-tab-face]")!
        ON.forEach((c) => face.classList.toggle(c, on))
        g.setAttribute("aria-selected", String(on))
      })
      q("[data-badge]").textContent =
        state.clicks > 99 ? "99+" : String(state.clicks)
      q("[data-count]").textContent = String(state.count)

      const { x, y, w, d, h, knob: ks } = SLIDER
      const kx = x + 10 + ((w - 20) * state.value) / 100
      q("[data-fill]").innerHTML =
        `<g transform="${TOP(x, y, Z + h)}"><rect class="fill-foreground" x="4" y="${d / 2 - 1.5}" width="${kx - x - 4}" height="3" rx="1.5"/></g>`
      q("[data-slider-knob]").innerHTML = box(
        kx - ks / 2,
        y + d / 2 - ks / 2,
        Z + h,
        ks,
        ks,
        10,
        ks / 2
      )
      q('[data-part="slider"]').setAttribute(
        "aria-valuenow",
        String(state.value)
      )

      const lines = CODE[state.last]()
      const mh = MONITOR.h
      q("[data-screen]").innerHTML = `
        <text class="${INK}" x="24" y="32" font-size="8" letter-spacing="1.6">INSPECTOR · ${state.last.toUpperCase()}</text>
        ${lines
          .slice(0, 3)
          .map(
            (t, i) =>
              `<text class="${i === 1 ? LIT : INK}" x="${t.startsWith(" ") ? 44 : 24}" y="${58 + i * 18}" font-size="12">${esc(t.trim())}</text>`
          )
          .join("")}
        <text class="${LIT}" x="24" y="${mh - 40}" font-size="9" letter-spacing="1.2">${esc(lines[3]).toUpperCase()}</text>
        <text class="${INK}" x="24" y="${mh - 24}" font-size="8" letter-spacing="1">${state.on ? "ON" : "OFF"} · ${state.checked ? "✓" : "—"} · ${state.value} · ${state.option.toUpperCase()} · ${state.tab.toUpperCase()} · ${state.count}</text>`
    }

    const bump = (el: Element | null) => {
      if (!el) return
      el.classList.add(...PRESSED)
      window.setTimeout(() => el.classList.remove(...PRESSED), 110)
    }

    let toastTimer = 0
    const act = (
      part: Part,
      data: DOMStringMap | Record<string, string> = {}
    ) => {
      if (part === "button") state.clicks++
      if (part === "switch") state.on = !state.on
      if (part === "checkbox") state.checked = !state.checked
      if (part === "radio" && data.option) state.option = data.option
      if (part === "tabs" && data.tab) state.tab = data.tab
      if (part === "stepper")
        state.count = Math.max(
          0,
          Math.min(STEPPER.max, state.count + Number(data.step))
        )
      if (part === "toast") {
        state.toasts++
        const card = q<SVGGElement>("[data-toast]")
        q("[data-toast-note]").textContent = `STORED · ${state.toasts}`
        card.classList.remove("opacity-0", "translate-y-2")
        window.clearTimeout(toastTimer)
        toastTimer = window.setTimeout(
          () => card.classList.add("opacity-0", "translate-y-2"),
          1800
        )
      }
      state.last = part
      look(part)
      render()
    }

    const setValue = (v: number, settle = false) => {
      state.value = Math.max(0, Math.min(100, Math.round(v)))
      if (state.last !== "slider" || settle) {
        state.last = "slider"
        look("slider")
      }
      render()
    }

    // The pointer's screen x maps back to a position along the slider's track.
    const valueAt = (e: PointerEvent) => {
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const sp = pt.matrixTransform(svg.getScreenCTM()!.inverse())
      const { x, y, w, d } = SLIDER
      const wx = sp.x / C + (y + d / 2)
      return ((wx - x - 10) / (w - 20)) * 100
    }

    let dragging = false
    const onPointerDown = (e: PointerEvent) => {
      const part = (e.target as Element).closest<SVGGElement>("[data-part]")
      svg.focus({ preventScroll: true })
      if (!part) return
      if (part.dataset.part === "slider") {
        dragging = true
        svg.setPointerCapture(e.pointerId)
        setValue(valueAt(e), true)
        return
      }
      bump(part)
      act(part.dataset.part as Part, part.dataset)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (dragging) setValue(valueAt(e))
    }
    const release = () => {
      dragging = false
    }
    // Keys only work while the desk has focus, so the page still scrolls.
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      const keyed: Record<string, Part> = {
        b: "button",
        s: "switch",
        c: "checkbox",
        o: "toast",
      }
      let handled = true
      if (keyed[k]) {
        bump(q(`[data-part="${keyed[k]}"]`))
        act(keyed[k])
      } else if (k === "1" || k === "2" || k === "3") {
        const option = RADIO.options[Number(k) - 1]
        bump(q(`[data-option="${option}"]`))
        act("radio", { option })
      } else if (k === "t") {
        const tab =
          TABS.names[(TABS.names.indexOf(state.tab) + 1) % TABS.names.length]
        bump(q(`[data-tab="${tab}"]`))
        act("tabs", { tab })
      } else if (k === "-" || k === "=" || k === "+") {
        const step = k === "-" ? "-1" : "1"
        bump(q(`[data-step="${step}"]`))
        act("stepper", { step })
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setValue(state.value + (e.key === "ArrowRight" ? 5 : -5), true)
      } else handled = false
      if (handled) e.preventDefault()
    }

    svg.addEventListener("pointerdown", onPointerDown)
    svg.addEventListener("pointermove", onPointerMove)
    svg.addEventListener("pointerup", release)
    svg.addEventListener("pointercancel", release)
    svg.addEventListener("keydown", onKey)

    drawRabbit()
    render()

    return () => {
      window.clearTimeout(toastTimer)
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
        aria-label="A desk with a rabbit beside design system parts: a button with a count badge, a switch, a checkbox, a slider, a radio group, tabs, a number stepper and a toast trigger, and an inspector monitor that shows the code for the last one used. Click them, drag the slider, or use the keys B, S, C, T and O, 1 to 3, the left and right arrows, and minus and plus."
        className="block h-auto w-full touch-pan-y outline-none select-none"
      />
    </figure>
  )
}
