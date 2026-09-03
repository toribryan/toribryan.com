import { Pipeline, Stage } from "./mdx-pipeline"

/**
 * Cover visual for the Design Skills Infrastructure post: the pipeline the
 * writing describes (prototype, skill, Figma, code), built entirely from
 * icons already in the codebase rather than a screenshot of the real
 * internal tooling, which isn't something to publish externally.
 *
 * Kept as a named component because the post refers to it as its hero. The
 * layout itself is `Pipeline`, which any doc can compose directly.
 */
export function PipelineHero() {
  return (
    <Pipeline>
      <Stage label="Prototype" detail="Built in Claude Code" mark="terminal" />
      <Stage label="Skill" detail="One command per phase" mark="claude" />
      <Stage label="Figma" detail="MCP + Code Connect" mark="figma" />
      <Stage
        label="Production code"
        detail="Aligned to the design system"
        mark="react"
      />
    </Pipeline>
  )
}
