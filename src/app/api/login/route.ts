import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import {
  createSessionToken,
  passwordMatches,
  SESSION_TTL_MS,
  SITE_AUTH_COOKIE,
} from "@/lib/site-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Only same-origin paths, so `?next=` can't be turned into an open redirect. */
function safeRedirectPath(value: FormDataEntryValue | null): string {
  const path = typeof value === "string" ? value : ""

  if (!path.startsWith("/") || path.startsWith("//")) {
    return "/"
  }

  return path
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const submitted = formData.get("password")?.toString() ?? ""
  const next = safeRedirectPath(formData.get("next"))

  const expected = process.env.SITE_PASSWORD

  if (!expected || !(await passwordMatches(submitted, expected))) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("error", "1")
    if (next !== "/") {
      loginUrl.searchParams.set("next", next)
    }

    // 303 so the browser follows with GET rather than re-POSTing.
    return NextResponse.redirect(loginUrl, 303)
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303)

  response.cookies.set(SITE_AUTH_COOKIE, await createSessionToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  })

  return response
}
