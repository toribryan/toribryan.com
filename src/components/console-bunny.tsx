"use client"

import { useEffect } from "react"

const BUNNY = String.raw`
       (\(\
       ( •.•)     well hello there snooper
      o_(")(")
`

/* Says hi in DevTools, once per page load. */
export function ConsoleBunny() {
  useEffect(() => {
    const w = window as Window & { __bunny?: boolean }
    if (w.__bunny) return
    w.__bunny = true
    console.log(
      `%c${BUNNY}`,
      "font-family: ui-monospace, monospace; font-size: 12px; line-height: 1.4;"
    )
  }, [])
  return null
}
