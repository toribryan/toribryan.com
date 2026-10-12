// Captures every route's social preview from its /og-frame page: a PNG still
// and the MP4 that Messages plays. Run against a running site, a production
// build (`npm run build && npm start`) for the cleanest capture:
//
//   npm run og [-- http://localhost:3000]
//
// Writes public/og/<route>.{png,mp4} and src/config/og-routes.json, which the
// pages' metadata reads to point at them.

import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import ffmpeg from "ffmpeg-static"
import { chromium } from "playwright"

const base = process.argv[2] ?? "http://localhost:3000"
const size = { width: 1200, height: 630 }
const LEAD = 2 // seconds of load trimmed off the front of each recording
const CLIP = 6 // seconds kept

// Next's dev indicator, when capturing from `next dev`.
const HIDE_DEV = "nextjs-portal { display: none !important; }"

const index = await fetch(`${base}/og-frame`).then((res) => {
  if (!res.ok) throw new Error(`${base}/og-frame answered ${res.status}`)
  return res.text()
})
const routes = [...index.matchAll(/href="\/og-frame(\/[^"]+)"/g)].map(
  (m) => m[1]
)
assert.ok(routes.length > 0, "the /og-frame index lists no routes")

fs.rmSync("public/og", { recursive: true, force: true })
const browser = await chromium.launch()
const still = await browser.newContext({
  viewport: size,
  colorScheme: "light",
  // Covers show their settled last step with reduced motion.
  reducedMotion: "reduce",
})
const videoDir = fs.mkdtempSync(path.join(os.tmpdir(), "og-"))

async function open(context, route) {
  const page = await context.newPage()
  await page.goto(`${base}/og-frame${route}`, { waitUntil: "networkidle" })
  await page.addStyleTag({ content: HIDE_DEV })
  await page.evaluate(() => document.fonts.ready)
  return page
}

for (const route of routes) {
  const out = path.join("public/og", route)
  fs.mkdirSync(path.dirname(out), { recursive: true })

  const page = await open(still, route)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: `${out}.png` })
  await page.close()

  // shortcut: Playwright records a modest-bitrate WebM; switch to CDP
  // screencast frames if the MP4s look soft.
  const moving = await browser.newContext({
    viewport: size,
    colorScheme: "light",
    recordVideo: { dir: videoDir, size },
  })
  const recording = await open(moving, route)
  await recording.waitForTimeout((LEAD + CLIP) * 1000)
  await moving.close()
  execFileSync(ffmpeg, [
    "-y",
    "-loglevel",
    "error",
    "-ss",
    String(LEAD),
    "-t",
    String(CLIP),
    "-i",
    await recording.video().path(),
    "-an",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "26",
    "-movflags",
    "+faststart",
    `${out}.mp4`,
  ])

  for (const ext of ["png", "mp4"]) {
    assert.ok(fs.statSync(`${out}.${ext}`).size > 0, `${out}.${ext} is empty`)
  }
  console.log(`og ${route}`)
}

await browser.close()
fs.rmSync(videoDir, { recursive: true, force: true })
fs.writeFileSync(
  "src/config/og-routes.json",
  JSON.stringify(routes.toSorted(), null, 2) + "\n"
)
console.log(`${routes.length} previews in public/og`)
