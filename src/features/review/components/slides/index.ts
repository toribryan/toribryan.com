import type { ComponentType } from "react"
import { createElement } from "react"

import type { Slide, SlideData } from "@/features/review/types"

import { AI_CONTENT } from "./ai"
import { AUTHOR_PROOF_CONTENT } from "./author-proof"
import { BACKGROUND_CONTENT } from "./background"
import { DESIGN_SYSTEM_CONTENT } from "./design-system"
import { HANDOFF_CONTENT } from "./handoff"
import { OBSERVATIONS_CONTENT } from "./observations"
import { PROCESS_CONTENT } from "./process"

const CONTENT: Record<
  Slide["section"],
  Record<string, ComponentType<{ slide: Slide; data: SlideData }>>
> = {
  background: BACKGROUND_CONTENT,
  process: PROCESS_CONTENT,
  product: AUTHOR_PROOF_CONTENT,
  handoff: HANDOFF_CONTENT,
  outcome: AUTHOR_PROOF_CONTENT,
  "design-system": DESIGN_SYSTEM_CONTENT,
  ai: AI_CONTENT,
  observations: OBSERVATIONS_CONTENT,
}

/** The body for a slide. Throws if a data entry has no component, which a build surfaces. */
export function renderSlide(slide: Slide, data: SlideData) {
  const Content = CONTENT[slide.section][slide.slug]
  if (!Content) {
    throw new Error(`No slide content for ${slide.section}/${slide.slug}`)
  }
  return createElement(Content, { slide, data })
}
