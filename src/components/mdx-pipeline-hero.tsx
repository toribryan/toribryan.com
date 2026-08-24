import { ArrowRightIcon } from "lucide-react"

import { ClaudeIcon, ReactIcon, TerminalIcon } from "@/components/icons"
import { IconTile } from "@/components/ui/icon-tile"

const STAGES = [
  {
    label: "Prototype",
    detail: "Built in Claude Code",
    icon: <TerminalIcon className="size-5" />,
  },
  {
    label: "Skill",
    detail: "One command per phase",
    icon: <ClaudeIcon className="size-5" />,
  },
  {
    label: "Figma",
    detail: "MCP + Code Connect",
    icon: <img src="/Figma.svg" alt="" aria-hidden className="size-5" />,
  },
  {
    label: "Production code",
    detail: "Aligned to the design system",
    icon: <ReactIcon className="size-5" />,
  },
]

/**
 * Cover visual for the Design Skills Infrastructure post — the pipeline the
 * writing describes (prototype, skill, Figma, code), built entirely from
 * icons already in the codebase rather than a screenshot of the real
 * internal tooling, which isn't something to publish externally.
 */
export function PipelineHero() {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl bg-surface-warm inset-ring-1 inset-ring-border/64">
      <div className="grid grid-cols-2 divide-y divide-border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {STAGES.map((stage, index) => (
          <div
            key={stage.label}
            className="relative flex flex-col items-center gap-2 p-6 text-center"
          >
            <IconTile className="size-10 [&_svg:not([class*='size-'])]:size-5">
              {stage.icon}
            </IconTile>

            <div className="font-medium text-surface-foreground">
              {stage.label}
            </div>
            <div className="text-xs text-muted-foreground">
              {stage.detail}
            </div>

            {index < STAGES.length - 1 && (
              <ArrowRightIcon
                className="pointer-events-none absolute top-1/2 -right-3 z-1 hidden size-4 -translate-y-1/2 text-muted-foreground/50 sm:block"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
