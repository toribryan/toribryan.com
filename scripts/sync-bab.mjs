/**
 * Pulls the two deployable artifacts out of the `bab` repo
 * (https://github.com/Vbryan25/bab) into `public/`, so they ship with this site
 * instead of living on their own host.
 *
 *   public/prototype/bab/    the Integrity Console clickthrough (static, no build)
 *   public/storybook/bab/    the design system's Storybook (built here)
 *
 * Why copy rather than deploy separately: `src/middleware.ts` gates everything
 * under `public/` behind SITE_PASSWORD. Serving these from the portfolio puts
 * them behind that same gate; a standalone Vercel project would not be.
 *
 * Usage:
 *   node scripts/sync-bab.mjs [--repo <path>] [--skip-build]
 *
 * `--repo` defaults to a `bab` checkout beside this one (../bab), overridable
 * with the BAB_REPO environment variable. `--skip-build` reuses an existing
 * storybook-static, which is worth it when only the prototype changed.
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const args = process.argv.slice(2)
const skipBuild = args.includes("--skip-build")
const repoFlag = args.indexOf("--repo")

const BAB = path.resolve(
  repoFlag !== -1 && args[repoFlag + 1]
    ? args[repoFlag + 1]
    : (process.env.BAB_REPO ?? path.join(ROOT, "..", "bab"))
)

const PROTOTYPE_OUT = path.join(ROOT, "public", "prototype", "bab")
const STORYBOOK_OUT = path.join(ROOT, "public", "storybook", "bab")
const DESIGN_SYSTEM = path.join(BAB, "design-system")

function fail(message) {
  console.error(`\n✗ ${message}\n`)
  process.exit(1)
}

/** Wipe first: a stale file left behind is worse than a slow copy. */
function replaceDir(from, to) {
  fs.rmSync(to, { recursive: true, force: true })
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.cpSync(from, to, { recursive: true })
}

function run(command, commandArgs, cwd) {
  execFileSync(command, commandArgs, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1" },
  })
}

if (!fs.existsSync(BAB)) {
  fail(
    `No bab checkout at ${BAB}.\n` +
      `  git clone https://github.com/Vbryan25/bab.git "${BAB}"\n` +
      `  …or point at an existing one: node scripts/sync-bab.mjs --repo <path>`
  )
}

// --- prototype: plain files, nothing to build ------------------------------

console.log(`→ prototype from ${BAB}`)

fs.rmSync(PROTOTYPE_OUT, { recursive: true, force: true })
fs.mkdirSync(PROTOTYPE_OUT, { recursive: true })
fs.copyFileSync(
  path.join(BAB, "index.html"),
  path.join(PROTOTYPE_OUT, "index.html")
)
for (const dir of ["css", "js"]) {
  replaceDir(path.join(BAB, dir), path.join(PROTOTYPE_OUT, dir))
}

// --- storybook: pnpm, per the lockfile in design-system/ -------------------

const storybookStatic = path.join(DESIGN_SYSTEM, "storybook-static")

if (skipBuild) {
  if (!fs.existsSync(storybookStatic)) {
    fail(`--skip-build was passed but ${storybookStatic} doesn't exist yet.`)
  }
  console.log("→ storybook (reusing existing build)")
} else {
  console.log("→ storybook: installing")
  // Playwright arrives via @vitest/browser-playwright and wants to download
  // browsers on install. The static build never runs a test, so skip them.
  run("corepack", ["pnpm", "install", "--frozen-lockfile"], DESIGN_SYSTEM)

  console.log("→ storybook: building")
  run("corepack", ["pnpm", "run", "build-storybook"], DESIGN_SYSTEM)
}

replaceDir(storybookStatic, STORYBOOK_OUT)

console.log(
  [
    "",
    "✓ synced",
    `    ${path.relative(ROOT, PROTOTYPE_OUT)}  →  /prototype/bab/index.html`,
    `    ${path.relative(ROOT, STORYBOOK_OUT)}  →  /storybook/bab/index.html`,
    "",
  ].join("\n")
)
