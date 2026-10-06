/*
 * Isometric line art as plain SVG, shared by the fibo section's component
 * desk and Rabbit run. Every face is a flat shape placed on its plane by one
 * matrix, so scenes are built as markup strings. +x runs down-right, +y
 * down-left and +z up; the viewer sees the top and the faces at the largest
 * x and y.
 */

export type Point = [number, number]
export type V3 = [number, number, number]

export const C = Math.cos(Math.PI / 6)
const S = Math.sin(Math.PI / 6)
export const P = (x: number, y: number, z: number) => [
  (x - y) * C,
  (x + y) * S - z,
]
const plane = (o: V3, u: V3, v: V3) => {
  const [ox, oy] = P(...o)
  const [ux, uy] = P(...u)
  const [vx, vy] = P(...v)
  return `matrix(${ux} ${uy} ${vx} ${vy} ${ox} ${oy})`
}
export const TOP = (x: number, y: number, z: number) =>
  plane([x, y, z], [1, 0, 0], [0, 1, 0])
export const FRONT = (x: number, y: number, z: number) =>
  plane([x, y, z], [1, 0, 0], [0, 0, -1])
export const SIDE = (x: number, y: number, z: number) =>
  plane([x, y, z], [0, -1, 0], [0, 0, -1])

export const HAIR = "[vector-effect:non-scaling-stroke] [stroke-linejoin:round]"
/* Structure lines sit halfway between the muted text color and the page. */
export const LINE =
  "stroke-[color-mix(in_oklab,var(--muted-foreground)_45%,var(--background))]"
export const FACE = `fill-muted ${LINE} ${HAIR}`
export const DECK = `fill-card ${LINE} ${HAIR}`
export const DETAIL = `fill-none stroke-border ${HAIR}`
export const ETCH = `fill-none stroke-line ${HAIR}`
export const MONO = "font-mono"

/* A part you can press: it drops and outlines while held. */
export const PRESS = "cursor-pointer transition-transform duration-75 ease-out"
export const PRESSED = [
  "translate-y-1",
  "[&_:is(rect,.wall)]:stroke-foreground",
]

/*
 * A box is its rounded top face over one wall. The wall is the top's outline
 * dropped by the box's height: the half of the outline facing the viewer at
 * the bottom, joined to the same half at the top, so rounded corners curve
 * into the sides without a seam. A square box shows its front edge.
 */
const ARC_STEPS = 6
function outline(x: number, y: number, w: number, d: number, r: number) {
  const k = Math.min(r, w / 2, d / 2)
  const corners: [number, number, number][] = [
    [x + w - k, y + k, -Math.PI / 2],
    [x + w - k, y + d - k, 0],
    [x + k, y + d - k, Math.PI / 2],
    [x + k, y + k, Math.PI],
  ]
  const pts: Point[] = []
  for (const [cx, cy, a0] of corners)
    for (let n = 0; n <= (k > 0 ? ARC_STEPS : 0); n++) {
      const a = a0 + (n / ARC_STEPS) * (Math.PI / 2)
      pts.push([cx + k * Math.cos(a), cy + k * Math.sin(a)])
    }
  return pts
}
export const fmt = (n: number) => Math.round(n * 100) / 100

export function box(
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
  r = 0
) {
  const pts = outline(x, y, w, d, r)
  const sx = pts.map(([px, py]) => px - py)
  const left = sx.indexOf(Math.min(...sx))
  const right = sx.indexOf(Math.max(...sx))
  // The run from the leftmost point to the rightmost that passes nearest the viewer.
  const run = (from: number, to: number, dir: number) => {
    const out = [pts[from]]
    for (let n = from; n !== to;) {
      n = (n + dir + pts.length) % pts.length
      out.push(pts[n])
    }
    return out
  }
  const a = run(left, right, 1)
  const b = run(left, right, -1)
  const depth = (c: Point[]) =>
    c.reduce((sum, [px, py]) => sum + px + py, 0) / c.length
  const front = depth(a) > depth(b) ? a : b
  const at = (z0: number) => front.map(([px, py]) => P(px, py, z0))
  const bottom = at(z)
  const top = at(z + h).reverse()
  const wall = [...bottom, ...top]
    .map(([px, py], n) => `${n ? "L" : "M"}${fmt(px)} ${fmt(py)}`)
    .join("")
  const [ex, ey] = P(x + w, y + d, z)
  const edge =
    r < 1 ? `<path class="${FACE}" d="M${fmt(ex)} ${fmt(ey)}v${-h}"/>` : ""
  return (
    `<path class="wall ${FACE}" d="${wall}Z"/>` +
    edge +
    `<g transform="${TOP(x, y, z + h)}"><rect class="${DECK}" width="${w}" height="${d}" rx="${Math.min(r, w / 2, d / 2)}"/></g>`
  )
}

/*
 * A rabbit faces along f; l is its left. Boxes are given in its own frame
 * (u forward, v left, z up) and turned onto the board as axis-aligned boxes.
 */
export type Part = [number, number, number, number, number, number, number]
const PARTS: Record<"tail" | "body" | "head", Part> = {
  tail: [-17, -3, 6, 5, 6, 6, 2],
  body: [-12, -8, 0, 26, 16, 15, 5],
  head: [10, -6, 9, 14, 12, 13, 4],
}
export type Placed = {
  x: number
  y: number
  z: number
  w: number
  d: number
  h: number
  r: number
}
export function placed(
  cx: number,
  cy: number,
  z: number,
  f: Point,
  k: number,
  [u, v, zz, w, d, h, r]: Part
): Placed {
  const l = [-f[1], f[0]]
  const a = [cx + (f[0] * u + l[0] * v) * k, cy + (f[1] * u + l[1] * v) * k]
  const b = [
    cx + (f[0] * (u + w) + l[0] * (v + d)) * k,
    cy + (f[1] * (u + w) + l[1] * (v + d)) * k,
  ]
  return {
    x: Math.min(a[0], b[0]),
    y: Math.min(a[1], b[1]),
    z: z + zz * k,
    w: Math.abs(b[0] - a[0]),
    d: Math.abs(b[1] - a[1]),
    h: h * k,
    r: r * k,
  }
}
export const drawBox = (q: Placed) => box(q.x, q.y, q.z, q.w, q.d, q.h, q.r)

/*
 * A bunny ear: a flat leaf, narrow at the base and round at the tip, standing
 * across the rabbit's facing. Each is drawn twice a little apart for its
 * thickness, leans out from the head, and shows its inner ear from the front.
 */
const EAR = { u: 15, v: 3.4, z: 20, w: 5.6, h: 17, lean: 10, depth: 1.6 }
const earPath = (w: number, h: number) =>
  `M${-w * 0.28} 0C${-w * 0.75} ${-h * 0.4} ${-w * 0.6} ${-h} 0 ${-h}C${w * 0.6} ${-h} ${w * 0.75} ${-h * 0.4} ${w * 0.28} 0Z`

function ears(cx: number, cy: number, z: number, f: Point, k: number) {
  const l: Point = [-f[1], f[0]]
  const toward = f[0] + f[1] > 0
  // Ears stand in the plane across the facing: x = const if the rabbit faces along x.
  const across = f[0] !== 0
  // Which way the rabbit's left runs in that plane's own x.
  const leftward = across ? -l[1] : l[0]
  const w = EAR.w * k
  const h = EAR.h * k
  const one = (v: number, tall: number) => {
    const at = (u: number): V3 => [
      cx + (f[0] * u + l[0] * v) * k,
      cy + (f[1] * u + l[1] * v) * k,
      z + EAR.z * k,
    ]
    const t = (pt: V3) => (across ? SIDE(...pt) : FRONT(...pt))
    const tilt = Math.sign(v) * leftward * EAR.lean
    const shape = (u: number, inner: boolean) =>
      `<g transform="${t(at(u))} rotate(${tilt})">
        <path class="wall ${DECK}" d="${earPath(w, h * tall)}"/>
        ${inner ? `<path class="fill-border" transform="translate(0 ${-1.2 * k}) scale(.5 .78)" d="${earPath(w, h * tall)}"/>` : ""}
      </g>`
    // Back copy first, then the face nearer the viewer.
    const near = toward ? EAR.u : EAR.u - EAR.depth
    const far = toward ? EAR.u - EAR.depth : EAR.u
    return shape(far, false) + shape(near, toward)
  }
  const pair = [
    { v: -EAR.v, tall: 1 },
    { v: EAR.v, tall: 0.9 },
  ].map(({ v, tall }) => ({
    depth: f[0] + l[0] * Math.sign(v) + (f[1] + l[1] * Math.sign(v)),
    html: one(v, tall),
  }))
  return pair
    .sort((a, b) => a.depth - b.depth)
    .map((e) => e.html)
    .join("")
}

export function rabbit(
  cx: number,
  cy: number,
  z: number,
  f: Point,
  k: number,
  leader: boolean
) {
  const p = (name: keyof typeof PARTS) => placed(cx, cy, z, f, k, PARTS[name])
  const head = p("head")
  // Facing the viewer: two shiny eyes, a nose and cheeks on the front of the
  // head. Facing away: one eye on the side that shows, near the front.
  const toward = f[0] + f[1] > 0
  const onX = toward === (f[0] !== 0)
  const onFace = (draw: (w: number, h: number) => string) =>
    onX
      ? `<g transform="${SIDE(head.x + head.w, head.y + head.d, head.z + head.h)}">${draw(head.d, head.h)}</g>`
      : `<g transform="${FRONT(head.x, head.y + head.d, head.z + head.h)}">${draw(head.w, head.h)}</g>`
  const eye = (x: number, y: number) =>
    `<ellipse class="fill-foreground" cx="${x}" cy="${y}" rx="${1.8 * k}" ry="${2.2 * k}"/>` +
    `<circle class="fill-card" cx="${x - 0.6 * k}" cy="${y - 0.8 * k}" r="${0.7 * k}"/>`
  const face = toward
    ? onFace(
        (w, h) =>
          `<ellipse class="fill-border" cx="${w / 2 - 4.4 * k}" cy="${h * 0.66}" rx="${1.5 * k}" ry="${0.9 * k}"/>` +
          `<ellipse class="fill-border" cx="${w / 2 + 4.4 * k}" cy="${h * 0.66}" rx="${1.5 * k}" ry="${0.9 * k}"/>` +
          eye(w / 2 - 2.9 * k, h * 0.45) +
          eye(w / 2 + 2.9 * k, h * 0.45) +
          `<ellipse class="fill-foreground" cx="${w / 2}" cy="${h * 0.66}" rx="${1 * k}" ry="${0.7 * k}"/>`
      )
    : onFace((w, h) => eye(onX ? w * 0.7 : w * 0.3, h * 0.45))
  const parts = toward
    ? drawBox(p("tail")) +
      drawBox(p("body")) +
      drawBox(p("head")) +
      face +
      ears(cx, cy, z, f, k)
    : drawBox(p("head")) +
      face +
      ears(cx, cy, z, f, k) +
      drawBox(p("body")) +
      drawBox(p("tail"))
  return `<g class="${leader ? "[&_:is(rect,.wall)]:stroke-foreground" : ""}">${parts}</g>`
}
