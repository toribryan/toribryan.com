import { Caveat, Fraunces } from "next/font/google"
import localFont from "next/font/local"
import { GeistMono } from "geist/font/mono"
import { GeistPixelSquare } from "geist/font/pixel"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

// Geist sans carries over unchanged from the Astro site. --font-mono is set to
// Geist Pixel (Square) below; Geist Mono stays loaded for its fallback.
const fontSans = GeistSans
const fontMono = GeistMono

// Nohemi is the display face: the wordmark, page headings, and section titles.
// Self-hosted; only Medium and SemiBold were ever licensed/shipped.
const fontDisplay = localFont({
  src: [
    { path: "../assets/fonts/Nohemi-Medium.woff2", weight: "500" },
    { path: "../assets/fonts/Nohemi-SemiBold.woff2", weight: "600" },
  ],
  display: "swap",
  fallback: ["Inter", "sans-serif"],
  variable: "--font-display",
})

// Fraunces was named in the Astro theme but never actually loaded — there was
// no @font-face and no import, so it silently fell back to Iowan Old Style.
// Loading it properly here is the fix.
const fontSerif = Fraunces({
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-serif",
})

const fontHandwritten = Caveat({
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-handwritten",
})

// Hello Scratchy (Studio Funshop) is the accent face: a marker scrawl, caps
// only, for small handwritten asides. Doodles is its dingbat set (smileys,
// arrows, stars, squiggles); Outlines is the hollow cut, loaded on first use.
const fontAccent = localFont({
  src: "../assets/fonts/Hello-Scratchy-Solid.woff2",
  display: "swap",
  fallback: ["cursive"],
  variable: "--font-accent",
})

const fontAccentOutline = localFont({
  src: "../assets/fonts/Hello-Scratchy-Outlines.woff2",
  display: "swap",
  preload: false,
  fallback: ["cursive"],
  variable: "--font-accent-outline",
})

const fontDoodle = localFont({
  src: "../assets/fonts/Hello-Scratchy-Doodles.woff2",
  display: "block",
  preload: false,
  variable: "--font-doodle",
})

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  GeistPixelSquare.variable,
  fontDisplay.variable,
  fontSerif.variable,
  fontHandwritten.variable,
  fontAccent.variable,
  fontAccentOutline.variable,
  fontDoodle.variable,
  "[--font-sans:var(--font-geist-sans)]",
  "[--font-mono:var(--font-geist-pixel-square)]"
)
