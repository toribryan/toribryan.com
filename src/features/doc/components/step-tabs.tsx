"use client"

import {
  Children,
  Fragment,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const MCH_BLUE = "#1747e6"

type StepTabProps = { label: string; children: ReactNode }

/** One step inside `StepTabs`; renders only when it's the open tab. */
export function StepTab({ children }: StepTabProps) {
  return <>{children}</>
}

/**
 * A run of steps read one at a time, picked from a row of tabs joined by
 * arrows so the row reads as a sequence. Each `StepTab`'s MDX body (text and
 * media) shows when its tab is open.
 */
export function StepTabs({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<StepTabProps> =>
      isValidElement<StepTabProps>(child) && Boolean(child.props.label)
  )
  const [active, setActive] = useState(0)

  return (
    <div className="my-8">
      <div
        role="tablist"
        aria-label="Steps"
        className="-mx-4 no-scrollbar flex items-center gap-2.5 overflow-x-auto border-b border-line [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)] px-4 sm:mx-0 sm:[mask-image:none] sm:px-0"
      >
        {steps.map((step, index) => {
          const current = index === active
          return (
            <Fragment key={step.props.label}>
              {index > 0 && (
                <ArrowRightIcon
                  className="mb-2.5 size-3.5 shrink-0 text-muted-foreground/60"
                  aria-hidden
                />
              )}
              <button
                type="button"
                role="tab"
                aria-selected={current}
                onClick={() => setActive(index)}
                className={cn(
                  "-mb-px shrink-0 cursor-pointer border-b-2 pb-2.5 text-[13px] whitespace-nowrap transition-colors hover:text-foreground",
                  current
                    ? "font-medium text-foreground"
                    : "border-transparent text-muted-foreground"
                )}
                style={current ? { borderColor: MCH_BLUE } : undefined}
              >
                {step.props.label}
              </button>
            </Fragment>
          )
        })}
      </div>
      <div
        role="tabpanel"
        aria-label={steps[active]?.props.label}
        className="pt-5 [&>*:first-child]:mt-0"
      >
        {steps[active]}
      </div>
    </div>
  )
}
