/**
 * Moves the iPhone Duo mockup between this checkout and the site's private
 * Vercel Blob store. It's a paid Framer Marketplace component, so its code
 * and model stay out of this public repo.
 *
 * Usage:
 *   node scripts/iphone-duo.mjs fetch    # module from Blob into src/
 *   node scripts/iphone-duo.mjs upload   # .private/iphone-duo/* up to Blob
 *
 * `fetch` runs before dev, build and type checks. Without Blob credentials
 * on a local checkout it keeps the module already there, or writes a stand-in
 * that draws nothing, so the site still builds; on Vercel it fails the build
 * instead, so a deploy never ships without the phone. Credentials come from
 * the environment: BLOB_STORE_ID with VERCEL_OIDC_TOKEN, as Vercel provides
 * them and `vercel env pull` writes them, or a BLOB_READ_WRITE_TOKEN.
 */

import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import { get, put } from "@vercel/blob"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const local = path.join(root, ".private/iphone-duo")
const target = path.join(
  root,
  "src/features/doc/components/iphone-duo-mockup.js"
)
const MODULE = "iphone-duo/iphone-duo-mockup.js"

const CONTENT_TYPES = {
  ".js": "text/javascript",
  ".glb": "model/gltf-binary",
  ".png": "image/png",
}

const STAND_IN = `"use client"
// Written by scripts/iphone-duo.mjs because the private Blob store holding
// the iPhone Duo mockup couldn't be reached. Pull the project's environment
// with \`vercel env pull .env.development.local\` and run it again.
// Takes the real component's props, so the page type checks against it.
export default function IPhoneDuoMockup(props) {
  void props
  return null
}
`

const hasCredentials = () =>
  Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
    (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN)
  )

async function fetchModule() {
  try {
    if (!hasCredentials()) throw new Error("no Blob credentials")
    const result = await get(MODULE, { access: "private", useCache: false })
    if (!result || result.statusCode !== 200) throw new Error("not in Blob")
    const code = await new Response(result.stream).text()
    fs.writeFileSync(target, code)
    console.log(`iphone-duo: fetched ${MODULE}`)
  } catch (error) {
    if (process.env.VERCEL) {
      console.error(`iphone-duo: couldn't fetch ${MODULE}: ${error.message}`)
      process.exit(1)
    }
    if (fs.existsSync(target)) {
      console.warn(`iphone-duo: ${error.message}; keeping the local module`)
    } else {
      fs.writeFileSync(target, STAND_IN)
      console.warn(`iphone-duo: ${error.message}; wrote a stand-in`)
    }
  }
}

async function upload() {
  if (!hasCredentials()) {
    console.error("iphone-duo: no Blob credentials; run `vercel env pull`")
    process.exit(1)
  }
  for (const name of fs.readdirSync(local)) {
    const contentType = CONTENT_TYPES[path.extname(name)]
    if (!contentType) continue
    await put(`iphone-duo/${name}`, fs.readFileSync(path.join(local, name)), {
      access: "private",
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    console.log(`iphone-duo: uploaded ${name}`)
  }
}

const command = process.argv[2]
if (command === "fetch") await fetchModule()
else if (command === "upload") await upload()
else {
  console.error("Usage: node scripts/iphone-duo.mjs fetch|upload")
  process.exit(1)
}
