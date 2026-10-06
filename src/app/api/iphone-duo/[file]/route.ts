import { get } from "@vercel/blob"

/*
 * The iPhone Duo mockup's model and still fallbacks. They're a paid Framer
 * Marketplace component's assets, kept in the site's private Blob store
 * rather than in public/, and streamed from here to the page that draws
 * them, behind the same password gate as the rest of the site.
 */
const FILES: Record<string, string> = {
  "iphone-duo.glb": "model/gltf-binary",
  "fallback-closed.png": "image/png",
  "fallback-mid.png": "image/png",
  "fallback-open.png": "image/png",
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params
  const contentType = FILES[file]
  if (!contentType) return new Response(null, { status: 404 })

  const result = await get(`iphone-duo/${file}`, {
    access: "private",
    ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
  }).catch(() => null)
  if (!result) return new Response(null, { status: 404 })

  // The files only change when they're uploaded again, so browsers keep
  // them a day and check the ETag after that.
  const headers = {
    "Cache-Control": "private, max-age=86400",
    ETag: result.blob.etag,
  }
  if (result.statusCode === 304) {
    return new Response(null, { status: 304, headers })
  }
  // No Content-Length: Blob sends some files compressed, and then reports a
  // size of 0 for what the stream decompresses to.
  return new Response(result.stream, {
    headers: { ...headers, "Content-Type": contentType },
  })
}
