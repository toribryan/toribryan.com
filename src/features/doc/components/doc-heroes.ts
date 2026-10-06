import type { ComponentType } from "react"

import { RabbitRunProjectHero } from "./rabbit-run-cover"
import { VoiceMemoProjectHero } from "./voice-memo-hero"

/**
 * Interactive pieces that take the place of the live cover at the top of a
 * doc's page, for a doc whose page is the thing itself rather than a write-up
 * about it. The live cover still shows on the doc's card.
 */
export const DOC_HEROES: Record<string, ComponentType> = {
  "rabbit-run": RabbitRunProjectHero,
  "voice-memo": VoiceMemoProjectHero,
}
