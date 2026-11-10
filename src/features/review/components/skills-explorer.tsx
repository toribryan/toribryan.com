"use client"

import { useState } from "react"
import {
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  LayersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The design-skills collection as a small file explorer: the tree on the
 * left, the selected file on the right. Content is taken from the
 * collection's README and its skill and reviewer tables in fibo.
 */

type FileNode = { kind: "file"; name: string; id: string }
type FolderNode = {
  kind: "folder"
  name: string
  id: string
  /** Phase folders draw a stack icon, as the docs do. */
  phase?: boolean
  children: TreeNode[]
}
type TreeNode = FileNode | FolderNode

/** What each skill produces, from the collection's skill tables. */
const PRODUCES: Record<string, string> = {
  "design-discovery": "Problem statement, assumption map, research plan",
  "user-research": "Interview guides, screeners, synthesis, insights",
  "reference-research":
    "Annotated reference board and pattern comparison matrix",
  "design-brief":
    "A brief with success metrics, scope, non-goals, and options considered",
  "information-architecture":
    "Sitemap, user flows, and a screen-state inventory",
  wireframing: "Three or more genuinely different concept directions",
  "layout-and-hierarchy": "Grids, spacing, and hierarchy that read at a glance",
  "ux-writing": "Interface copy: actions, errors, empty states",
  "interface-polish": "The detail pass that takes UI from done to excellent",
  "usability-testing": "Test plan, tasks, and a findings report",
  "design-critique": "Structured critique with severity ratings",
  "accessibility-review": "A WCAG 2.2 AA audit with fixes",
  "design-tokens": "Tiered tokens in DTCG and CSS, synced with Figma variables",
  "color-system": "OKLCH ramps and semantic roles with measured contrast",
  "typography-system": "Typefaces, scale, fluid sizes, and type roles",
  iconography: "Icon grid, style rules, library choice, SVG hygiene",
  "component-api-design": "Component anatomy, variants, states, and a spec",
  "design-system-docs": "Component and foundations docs people and agents use",
  "design-system-audit": "Inventory, drift report, and a prioritized roadmap",
  "design-handoff":
    "A handoff package with states, specs, and acceptance criteria",
  "design-to-code": "High-fidelity UI built on existing tokens and components",
  "visual-qa": "Implementation checked against design at every breakpoint",
  "design-case-study": "Portfolio case studies that show the thinking",
  "brand-strategy": "Positioning, attributes, and a brand platform",
  "brand-voice": "Voice attributes, a tone map, and word lists",
  "brand-identity": "Logo, color, type, imagery, and identity guidelines",
  "art-direction": "Named direction territories, moodboards, style tiles",
  "motion-language":
    "Motion principles, duration and easing tokens, a pattern map",
  "motion-implementation": "Animations in CSS, Motion, GSAP, Rive, or Lottie",
  "micro-interactions": "Trigger, rules, feedback, and loops for small moments",
  "landing-page-design":
    "Marketing pages that explain, persuade, and load fast",
}

/** What each read-only reviewer checks. */
const CHECKS: Record<string, string> = {
  "accessibility-auditor": "WCAG 2.2 AA, from source and rendered page",
  "brand-reviewer": "Work against identity guidelines and art direction",
  "component-reviewer":
    "A component, its stories, and docs against house conventions",
  "copy-reviewer": "Interface copy against voice and UX writing standards",
  "design-critic": "Goal fit, hierarchy, heuristics, states, craft",
  "token-auditor":
    "Hard-coded values, primitive leaks, opacity modifiers, Figma drift",
  "visual-qa-reviewer": "Built UI vs. design, per breakpoint, theme, and state",
}

const GROUPS: [string, string[], boolean][] = [
  [
    "1. Discover",
    ["design-discovery", "user-research", "reference-research"],
    true,
  ],
  ["2. Define", ["design-brief", "information-architecture"], true],
  [
    "3. Design",
    ["wireframing", "layout-and-hierarchy", "ux-writing", "interface-polish"],
    true,
  ],
  [
    "4. Validate",
    ["usability-testing", "design-critique", "accessibility-review"],
    true,
  ],
  [
    "5. Systematize",
    [
      "design-tokens",
      "color-system",
      "typography-system",
      "iconography",
      "component-api-design",
      "design-system-docs",
      "design-system-audit",
    ],
    true,
  ],
  ["6. Ship", ["design-handoff", "design-to-code", "visual-qa"], true],
  ["7. Tell", ["design-case-study"], true],
  [
    "Brand",
    ["brand-strategy", "brand-voice", "brand-identity", "art-direction"],
    true,
  ],
  [
    "Motion",
    ["motion-language", "motion-implementation", "micro-interactions"],
    true,
  ],
  ["Marketing", ["landing-page-design"], true],
]

const ROUTER = "skills/product-design-process/SKILL.md"

const TREE: TreeNode[] = [
  { kind: "file", name: "README.md", id: "README.md" },
  {
    kind: "folder",
    name: "agents",
    id: "agents",
    children: Object.keys(CHECKS).map((name) => ({
      kind: "file",
      name: `${name}.md`,
      id: `agents/${name}.md`,
    })),
  },
  {
    kind: "folder",
    name: "skills",
    id: "skills",
    children: [
      {
        kind: "folder",
        name: "product-design-process",
        id: "skills/product-design-process",
        children: [{ kind: "file", name: "SKILL.md", id: ROUTER }],
      },
      ...GROUPS.map(([group, skills, phase]): FolderNode => ({
        kind: "folder",
        name: group,
        id: `group/${group}`,
        phase,
        children: skills.map((skill): FolderNode => ({
          kind: "folder",
          name: skill,
          id: `skills/${skill}`,
          children: [
            { kind: "file", name: "SKILL.md", id: `skills/${skill}/SKILL.md` },
          ],
        })),
      })),
    ],
  },
]

const title = (slug: string) =>
  slug
    .split("-")
    .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
    .replace(/\bux\b/i, "UX")
    .replace(/\bqa\b/i, "QA")
    .replace(/\bapi\b/i, "API")

/** The group a skill sits in, for its file view. */
const groupOf = (skill: string) =>
  GROUPS.find(([, skills]) => skills.includes(skill))?.[0] ?? ""

/** The right-hand pane for a file id. */
function FileView({ id }: { id: string }) {
  if (id === ROUTER) {
    return (
      <Doc
        name="product-design-process"
        description="Runs a product design effort end to end: discover, define, design, validate, systematize, ship, and tell the story, by routing each phase to the right skill and reviewer and keeping a running project log."
        heading="Product design process"
      >
        <p>
          The router for the whole collection. It decides which phase the work
          is in, loads the skill for that phase, runs the reviewer that checks
          it, and records each decision so the next phase starts from what was
          learned instead of from scratch. It does not do the phase work itself.
        </p>
        <h4 className="font-heading text-base font-medium text-foreground">
          When to use
        </h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            A new feature, product, or redesign with no clear starting point
          </li>
          <li>
            Work that crosses phases: research this, then design it, then build
            it
          </li>
          <li>
            Picking the work back up after a break and needing to know what
            comes next
          </li>
          <li>Planning a design effort’s steps and timeline</li>
        </ul>
      </Doc>
    )
  }
  if (id === "README.md") {
    return (
      <Doc
        name="design-skills"
        description="Claude skills for the whole product design process: discovery through shipped code, plus design systems, interface craft, motion, and brand."
        heading="Design skills"
      >
        <p>
          32 skills and 7 read-only reviewer subagents, as plain folders you
          copy or link into Claude Code. Ask for the outcome, and Claude loads
          the matching skill from its description.
        </p>
        <p>
          When work spans phases, product-design-process routes it. Fibo is the
          worked example throughout: procedural skills that point at models, a
          definition of done, and reviewers that end in a verdict.
        </p>
      </Doc>
    )
  }
  const agent = id.match(/^agents\/(.+)\.md$/)?.[1]
  if (agent) {
    return (
      <Doc
        name={agent}
        description="Read-only. Reads what it needs, checks a numbered list, reports only failures with their location, and ends with ready or N blocking issues."
        heading={title(agent)}
      >
        <p>
          <span className="text-foreground">Checks: </span>
          {CHECKS[agent]}
        </p>
      </Doc>
    )
  }
  const skill = id.match(/^skills\/(.+)\/SKILL\.md$/)?.[1]
  if (skill && PRODUCES[skill]) {
    return (
      <Doc name={skill} description={PRODUCES[skill]} heading={title(skill)}>
        <p>
          <span className="text-foreground">Group: </span>
          {groupOf(skill)}
        </p>
        <p>
          Loaded on its own when the ask is a single task, or by the router when
          the work spans phases.
        </p>
      </Doc>
    )
  }
  return null
}

function Doc({
  name,
  description,
  heading,
  children,
}: {
  name: string
  description: string
  heading: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5 rounded-lg border border-line bg-muted/60 p-3">
        <p className="font-mono text-sm font-medium">{name}</p>
        <p className="text-sm/relaxed text-pretty text-muted-foreground">
          {description}
        </p>
      </div>
      <h3 className="font-heading text-2xl font-medium">{heading}</h3>
      <div className="flex flex-col gap-3 text-sm/relaxed text-pretty text-muted-foreground md:text-base/relaxed">
        {children}
      </div>
    </div>
  )
}

/** Folders open by default: the shape of the docs page’s Workflow tab. */
const OPEN = new Set(["agents", "skills", "skills/product-design-process"])

function Tree({
  nodes,
  depth,
  open,
  toggle,
  selected,
  select,
}: {
  nodes: TreeNode[]
  depth: number
  open: Set<string>
  toggle: (id: string) => void
  selected: string
  select: (id: string) => void
}) {
  return (
    <ul aria-label={depth === 0 ? "Files" : undefined}>
      {nodes.map((node) => {
        const pad = { paddingLeft: `${depth * 14 + 8}px` }
        if (node.kind === "file") {
          const on = selected === node.id
          return (
            <li key={node.id}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-md py-1 pr-2 text-left font-mono text-xs text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                  on && "bg-foreground/[0.07] font-medium text-foreground"
                )}
                style={pad}
                aria-current={on ? "true" : undefined}
                onClick={() => select(node.id)}
              >
                <span className="size-3 shrink-0" />
                <FileTextIcon className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{node.name}</span>
              </button>
            </li>
          )
        }
        const isOpen = open.has(node.id)
        const Icon = node.phase
          ? LayersIcon
          : isOpen
            ? FolderOpenIcon
            : FolderIcon
        return (
          <li key={node.id}>
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-2 rounded-md py-1 pr-2 text-left text-xs outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                node.phase
                  ? "font-medium text-foreground"
                  : "font-mono text-muted-foreground"
              )}
              style={pad}
              aria-expanded={isOpen}
              onClick={() => toggle(node.id)}
            >
              <ChevronRightIcon
                className={cn(
                  "size-3 shrink-0 transition-transform",
                  isOpen && "rotate-90"
                )}
                aria-hidden
              />
              <Icon className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{node.name}</span>
            </button>
            {isOpen && (
              <Tree
                nodes={node.children}
                depth={depth + 1}
                open={open}
                toggle={toggle}
                selected={selected}
                select={select}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function SkillsExplorer({
  repoUrl,
  className,
}: {
  repoUrl: string
  className?: string
}) {
  const [open, setOpen] = useState(() => new Set(OPEN))
  const [selected, setSelected] = useState(ROUTER)

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-xs text-muted-foreground">
        32 skills, 7 reviewer agents, 97 files
      </p>
      <div
        className="grid overflow-hidden rounded-xl border border-line bg-background md:h-[24rem] md:grid-cols-[15rem_minmax(0,1fr)]"
        // The deck turns the page on Space and the arrows; inside the
        // explorer those keys belong to its buttons.
        onKeyDown={(event) => event.stopPropagation()}
      >
        <div className="max-h-64 overflow-y-auto overscroll-contain border-b border-line p-2 md:max-h-none md:border-r md:border-b-0">
          <Tree
            nodes={TREE}
            depth={0}
            open={open}
            toggle={toggle}
            selected={selected}
            select={setSelected}
          />
        </div>
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
            <p className="truncate font-mono text-xs text-muted-foreground">
              design-skills/{selected}
            </p>
            <a
              className="shrink-0 text-xs text-muted-foreground link-underline"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 md:p-5">
            <FileView id={selected} />
          </div>
        </div>
      </div>
    </div>
  )
}
