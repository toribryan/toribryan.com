import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

/**
 * The id the URL's hash points at, without the `#`. Null on the server, so
 * the first render matches it, then the real hash once hydrated.
 */
export function useHashTarget() {
  return useSyncExternalStore(
    subscribe,
    () => decodeURIComponent(window.location.hash.slice(1)) || null,
    () => null
  )
}

/** Points the hash at an element on the current page, even if it already did. */
export function revealHash(id: string) {
  if (window.location.hash === `#${id}`) {
    history.replaceState(null, "", window.location.pathname)
  }
  window.location.hash = id
}
