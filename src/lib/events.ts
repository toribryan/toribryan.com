import posthog from "posthog-js"

import { op } from "./openpanel"

/** The closed set of analytics events; add a name here before tracking it. */
type EventName =
  | "copy_code_block"
  | "copy_email"
  | "toc_inline_toggle"
  | "toc_inline_item_click"
  | "resume_menu_action"
  | "component_page_action"
  | "site_search_select"
  | "case_study_read"
  | "outbound_click"
  | "project_card_click"
  | "contact_intent"

export type Event = {
  name: EventName
  properties?: Record<string, string | number | boolean | null>
}

/** Events that also count as a reader reaching out, keyed to their `via`. */
const CONTACT_VIA: Partial<Record<EventName, string>> = {
  copy_email: "email",
  resume_menu_action: "resume",
}

export function trackEvent(event: Event) {
  op.track(event.name, event.properties)
  posthog.capture(event.name, event.properties ?? undefined)

  const via = CONTACT_VIA[event.name]
  if (via) trackEvent({ name: "contact_intent", properties: { via } })
}
