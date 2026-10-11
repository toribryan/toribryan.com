import { op } from "./openpanel"

/** The closed set of analytics events; add a name here before tracking it. */
type EventName =
  | "copy_code_block"
  | "copy_email"
  | "toc_inline_toggle"
  | "toc_inline_item_click"
  | "resume_menu_action"
  | "component_page_action"

export type Event = {
  name: EventName
  properties?: Record<string, string | number | boolean | null>
}

export function trackEvent(event: Event) {
  op.track(event.name, event.properties)
}
