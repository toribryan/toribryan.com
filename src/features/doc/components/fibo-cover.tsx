import { ThemedImage } from "./sprite-cover"

/**
 * fibo's cover art from the Fibo-DS Figma file, one per theme. The art is
 * 16:9 and the card is wider, so it sits whole on its own page color rather
 * than cropping through the frame drawn around it.
 */
export function FiboCover() {
  return (
    <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#0a0a0a]">
      <ThemedImage
        className="size-full object-contain"
        src={{ light: "/cover-fibo-light.webp", dark: "/cover-fibo-dark.webp" }}
        width={1600}
        height={900}
      />
    </div>
  )
}
