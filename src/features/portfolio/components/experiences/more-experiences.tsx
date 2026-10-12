"use client"

import { useState, type ReactNode } from "react"
import { ChevronDownIcon } from "lucide-react"

import { useHashTarget } from "@/hooks/use-hash-target"
import { Button } from "@/components/base/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"

// The companies past the first three, which ./index.tsx hides behind Show
// more. Keep the two in step.
const HIDDEN_ROLES = new Set(
  EXPERIENCES.slice(3).flatMap((e) => e.positions.map((p) => `role-${p.id}`))
)

/**
 * The older companies behind Show more. A link to one of their roles opens
 * the list first, so the role has somewhere to scroll to.
 */
export function MoreExperiences({ children }: { children: ReactNode }) {
  const target = useHashTarget()
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState<string | null>(null)
  if (target !== seen) {
    setSeen(target)
    if (target && HIDDEN_ROLES.has(target)) setOpen(true)
  }

  return (
    <Collapsible
      className="group/collapsible"
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleContent render={<div className="pr-2 pl-4" />}>
        {children}
      </CollapsibleContent>

      <div className="-mt-px flex items-center justify-center py-4">
        <CollapsibleTrigger
          render={
            <Button className="gap-2 pr-2.5 pl-3" variant="outline" size="sm">
              <span className="hidden group-data-closed/collapsible:block">
                Show more
              </span>

              <span className="hidden group-data-open/collapsible:block">
                Show less
              </span>

              <ChevronDownIcon className="group-data-open/collapsible:rotate-180" />
            </Button>
          }
        />
      </div>
    </Collapsible>
  )
}
