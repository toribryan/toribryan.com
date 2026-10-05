/**
 * Copies fibo's components.meta.json into
 * src/features/portfolio/data/fibo-catalog.json, so /components lists every
 * fibo part with the same title, description, shelf, group and status as
 * fibo's Storybook Catalog. Run it after installing or updating parts from
 * fibo.
 *
 * Usage:
 *   node scripts/sync-fibo-catalog.mjs [--repo <path>]
 *
 * `--repo` defaults to a `fibo` checkout beside this one (../fibo),
 * overridable with the FIBO_REPO environment variable.
 */

import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const flag = process.argv.indexOf("--repo")
const repo = path.resolve(
  root,
  flag > -1
    ? process.argv[flag + 1]
    : (process.env.FIBO_REPO ?? path.join(root, "..", "fibo"))
)

const source = path.join(repo, "packages/ui/components.meta.json")
const target = path.join(root, "src/features/portfolio/data/fibo-catalog.json")

const meta = JSON.parse(fs.readFileSync(source, "utf8"))
delete meta.$comment
fs.writeFileSync(target, `${JSON.stringify(meta, null, 2)}\n`)
console.log(
  `Wrote ${Object.keys(meta).length} parts to ${path.relative(root, target)}`
)
