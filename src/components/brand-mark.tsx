/**
 * Tori Bryan's mark — an abstracted lotus, carried over from the lotus-pond
 * motif the previous site was built around. Three petals over a still-water
 * line, on a square grid.
 *
 * This replaces the template author's mark, which his TRADEMARK.md excludes
 * from the MIT grant.
 */

const MARK_PATHS = [
  // Centre petal.
  "M128 32c22 26 33 50 33 72s-11 40-33 56c-22-16-33-34-33-56s11-46 33-72Z",
  // Left petal.
  "M40 96c31 4 53 15 67 31s19 37 15 62c-25-5-43-16-54-33s-16-38-28-60Z",
  // Right petal.
  "M216 96c-31 4-53 15-67 31s-19 37-15 62c25-5 43-16 54-33s16-38 28-60Z",
  // Water line.
  "M32 208h192v24H32z",
]

export function BrandMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 256 256"
      aria-hidden
      {...props}
    >
      {MARK_PATHS.map((d) => (
        <path key={d} fill="currentColor" d={d} />
      ))}
    </svg>
  )
}

export function getMarkSVG() {
  const paths = MARK_PATHS.map((d) => `<path fill="currentColor" d="${d}"/>`)
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">${paths.join("")}</svg>`
}
