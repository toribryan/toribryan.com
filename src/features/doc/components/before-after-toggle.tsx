"use client"

import { cn } from "@/lib/utils"

const CHOICES = [
  { label: "Before", value: false },
  { label: "After", value: true },
]

export function BeforeAfterToggle({
  label,
  isAfter,
  onChange,
}: {
  label: string
  isAfter: boolean
  onChange: (isAfter: boolean) => void
}) {
  return (
    <span
      role="group"
      aria-label={label}
      className="flex h-8 rounded-[min(var(--radius-lg),10px)] border border-line p-0.5 font-sans"
    >
      {CHOICES.map(({ label, value }) => (
        <button
          key={label}
          type="button"
          aria-pressed={isAfter === value}
          onClick={() => onChange(value)}
          className={cn(
            "rounded-[7px] px-2.5 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring-subtle",
            isAfter === value
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </span>
  )
}
