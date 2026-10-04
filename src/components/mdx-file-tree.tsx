"use client"

import { useEffect, useRef, useState } from "react"
import {
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  Link2Icon,
} from "lucide-react"
import { useInView } from "motion/react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

type Node = {
  name: string
  /** Folders list what's inside them. */
  children?: Node[]
  /** A symlink: where it points. */
  to?: string
  note?: string
}

type Row = { node: Node; depth: number }

function flatten(nodes: Node[], depth = 0): Row[] {
  return nodes.flatMap((node) => [
    { node, depth },
    ...(node.children ? flatten(node.children, depth + 1) : []),
  ])
}

// Each row's arrival, in milliseconds after the tree comes into view.
const STEP_MS = 110

/**
 * A repository's folders and files that write themselves out, a row at a
 * time, when the tree scrolls into view: each folder opens as its first
 * file arrives. Under reduced motion it's drawn whole.
 */
function FileTree({ label, tree }: { label: string; tree: Node[] }) {
  const frame = useRef<HTMLDivElement>(null)
  const inView = useInView(frame, { once: true, amount: 0.4 })
  const reduceMotion = usePrefersReducedMotion()
  const rows = flatten(tree)
  const [shown, setShown] = useState(0)
  const visible = reduceMotion ? rows.length : shown

  useEffect(() => {
    if (!inView || reduceMotion || shown >= rows.length) return
    const id = window.setTimeout(() => setShown(shown + 1), STEP_MS)
    return () => window.clearTimeout(id)
  }, [inView, reduceMotion, shown, rows.length])

  return (
    <div
      ref={frame}
      className="not-prose my-8 rounded-xl p-5 inset-ring-1 inset-ring-border/64"
    >
      <p className="mb-4 font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <ul className="flex flex-col font-mono text-sm" aria-label={label}>
        {rows.map(({ node, depth }, index) => {
          const folder = Boolean(node.children)
          const open = folder && visible > index + 1
          const Icon = node.to
            ? Link2Icon
            : folder
              ? open
                ? FolderOpenIcon
                : FolderIcon
              : FileTextIcon
          return (
            <li
              key={`${depth}-${index}-${node.name}`}
              className={cn(
                "flex items-center gap-1.5 py-0.5 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none",
                index < visible ? "opacity-100" : "translate-x-1 opacity-0"
              )}
              style={{ paddingLeft: depth * 18 }}
            >
              <ChevronRightIcon
                aria-hidden
                className={cn(
                  "size-3.5 shrink-0 text-muted-foreground transition-transform duration-300",
                  folder ? "" : "invisible",
                  open && "rotate-90"
                )}
              />
              <Icon
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground"
              />
              <span className="text-surface-foreground">{node.name}</span>
              {node.to ? (
                <span className="text-muted-foreground">→ {node.to}</span>
              ) : null}
              {node.note ? (
                <span className="truncate text-muted-foreground">
                  {node.note}
                </span>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const skill = (name: string) => ({ name, children: [{ name: "SKILL.md" }] })

/** The team's skills repository: a folder per command, linked into Claude Code. */
export function SkillsRepoTree() {
  return (
    <FileTree
      label="design-skills/: cloned once, linked into Claude Code"
      tree={[
        {
          name: "design-skills",
          children: [
            {
              name: "skills",
              children: [
                skill("write-spec"),
                skill("research-synthesis"),
                skill("ux-copy"),
                skill("handoff"),
              ],
            },
          ],
        },
        { name: "~/.claude/skills", to: "design-skills/skills" },
      ]}
    />
  )
}

/** fibo's own skills, kept in the repo for whoever works on it next. */
export function FiboSkillsTree() {
  return (
    <FileTree
      label="fibo/: skills that ship with the system"
      tree={[
        {
          name: "fibo",
          children: [
            {
              name: ".agents/skills",
              children: [
                {
                  name: "add-component",
                  children: [{ name: "SKILL.md" }],
                },
                {
                  name: "figma-drift",
                  children: [
                    { name: "SKILL.md" },
                    { name: "read-components.js" },
                    { name: "read-variables.js" },
                  ],
                },
                {
                  name: "retire-component",
                  children: [{ name: "SKILL.md" }],
                },
              ],
            },
            { name: ".claude/skills", to: ".agents/skills" },
          ],
        },
      ]}
    />
  )
}
