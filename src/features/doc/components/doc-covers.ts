import type { ComponentType } from "react"

import { AgenticDesignSystemCover } from "./agentic-design-system-cover"
import { DesignSystemOverhaulCover } from "./design-system-overhaul-cover"
import { FiboCover } from "./fibo-cover"
import { ModernCareHomesCover } from "./modern-care-homes-cover"
import { RabbitRunCover } from "./rabbit-run-cover"
import { RealWeddingSubmissionsCardCover } from "./real-wedding-submissions-cover"
import { StorybookKitCover } from "./storybook-kit-cover"
import { VoiceMemoCover } from "./voice-memo-cover"

/**
 * Live covers that stand in for a doc's cover image on its card, keyed by
 * slug. The image still serves as the doc's social preview.
 */
export const DOC_COVERS: Record<string, ComponentType<{ loop?: boolean }>> = {
  "agentic-design-system": AgenticDesignSystemCover,
  "design-system-overhaul": DesignSystemOverhaulCover,
  fibo: FiboCover,
  "modern-care-homes": ModernCareHomesCover,
  "rabbit-run": RabbitRunCover,
  "real-wedding-submissions": RealWeddingSubmissionsCardCover,
  "storybook-kit": StorybookKitCover,
  "voice-memo": VoiceMemoCover,
}
