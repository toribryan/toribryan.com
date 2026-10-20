"use client"

import { useEffect } from "react"

import { trackEvent } from "@/lib/events"

/**
 * One listener for the clicks that are links rather than components: links off
 * the site, mailto links, and project cards (marked `data-project-card`).
 */
export function AnalyticsClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]")
      if (!(link instanceof HTMLAnchorElement)) return

      const from = window.location.pathname
      const card = link.dataset.projectCard
      if (card) {
        trackEvent({
          name: "project_card_click",
          properties: { slug: card, from },
        })
      }

      if (link.protocol === "mailto:") {
        trackEvent({
          name: "contact_intent",
          properties: { via: "email_link", from },
        })
        return
      }

      if (
        !link.protocol.startsWith("http") ||
        link.host === window.location.host
      ) {
        return
      }

      trackEvent({
        name: "outbound_click",
        properties: {
          url: link.href,
          host: link.hostname,
          label:
            link.getAttribute("aria-label") ?? link.textContent?.trim() ?? null,
          from,
        },
      })
      if (link.hostname.endsWith("linkedin.com")) {
        trackEvent({
          name: "contact_intent",
          properties: { via: "linkedin", from },
        })
      }
    }

    document.addEventListener("click", onClick, { capture: true })
    return () =>
      document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
