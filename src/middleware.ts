import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { SITE_AUTH_COOKIE, verifySessionToken } from "@/lib/site-auth"

export async function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD

  // No password configured — leave the site open rather than lock everyone
  // out. This is what keeps local dev and preview builds usable without a
  // secret; set SITE_PASSWORD in the environment to turn the gate on.
  if (!password) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SITE_AUTH_COOKIE)?.value

  if (await verifySessionToken(token, password)) {
    return NextResponse.next()
  }

  const loginUrl = new URL("/login", request.url)

  // Send them back where they were headed once they're through the gate.
  // Path only — a full URL here would be an open-redirect.
  const intended = request.nextUrl.pathname + request.nextUrl.search
  if (intended !== "/") {
    loginUrl.searchParams.set("next", intended)
  }

  const response = NextResponse.redirect(loginUrl)

  // An expired or tampered cookie is worse than none: clear it so the browser
  // stops replaying it on every request.
  if (token) {
    response.cookies.delete(SITE_AUTH_COOKIE)
  }

  return response
}

export const config = {
  /**
   * Everything is gated except the login route itself, its form handler, and
   * Next's own build output. Images and other files under `public/` are
   * deliberately included — an unlisted case-study image is still private.
   */
  matcher: [
    "/((?!_next/static|_next/image|login|api/login|favicon.ico|favicon.svg).*)",
  ],
}
