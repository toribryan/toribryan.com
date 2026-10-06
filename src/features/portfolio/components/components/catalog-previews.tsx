import type { ReactNode } from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  LoaderCircleIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/fibo/badge"
import { Button } from "@/components/fibo/button"
import { Checkbox } from "@/components/fibo/checkbox"
import { Input } from "@/components/fibo/input"
import { Kbd, KbdGroup } from "@/components/fibo/kbd"
import { Skeleton } from "@/components/fibo/skeleton"

/**
 * Still previews for the fibo parts with no page or cover on this site,
 * ported from the cards on fibo's Catalog page. Labels, Textareas and
 * Spinners aren't installed here, so theirs are drawn. The skeleton's own
 * muted fill matches this site's cover plate, so its preview uses the border
 * color to show its shapes.
 */
export const PREVIEWS: Record<string, ReactNode> = {
  button: (
    <div className="flex gap-2">
      <Button size="sm">Save</Button>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
    </div>
  ),
  badge: (
    <div className="flex gap-2">
      <Badge>Live</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">v2</Badge>
    </div>
  ),
  checkbox: (
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked />
      <span className="text-sm">Remember me</span>
    </div>
  ),
  input: <Input placeholder="you@example.com" className="w-48" />,
  spinner: <LoaderCircleIcon className="size-6 text-muted-foreground" />,
  label: (
    <div className="flex w-48 flex-col gap-1.5">
      <span className="text-sm leading-none font-medium">Email</span>
      <div className="h-8 rounded-lg border border-input" />
    </div>
  ),
  textarea: (
    <span className="flex h-16 w-52 rounded-sm border border-input bg-input-subtle px-3 py-2 text-sm text-muted-foreground">
      Leave a note
    </span>
  ),
  switch: (
    <div className="flex items-center gap-3">
      {[true, false].map((on) => (
        <span
          key={String(on)}
          className={cn(
            "flex h-[18px] w-8 items-center rounded-full p-px",
            on ? "justify-end bg-primary" : "bg-input"
          )}
        >
          <span
            className={cn(
              "size-4 rounded-full shadow-sm",
              on ? "bg-primary-foreground" : "bg-background"
            )}
          />
        </span>
      ))}
    </div>
  ),
  "radio-group": (
    <div className="flex flex-col gap-2">
      {["Monthly", "Yearly"].map((label, index) => (
        <span key={label} className="flex items-center gap-2 text-sm">
          <span
            className={cn(
              "flex size-4 items-center justify-center rounded-full border",
              index === 0
                ? "border-primary bg-primary"
                : "border-input bg-input-subtle"
            )}
          >
            {index === 0 ? (
              <span className="size-2 rounded-full bg-primary-foreground" />
            ) : null}
          </span>
          {label}
        </span>
      ))}
    </div>
  ),
  select: (
    <span className="flex h-9 w-44 items-center justify-between rounded-sm border border-input bg-input-subtle px-3 text-sm">
      Blueberry
      <ChevronDownIcon className="size-4 text-muted-foreground" />
    </span>
  ),
  slider: (
    <span className="relative flex h-4 w-44 items-center">
      <span className="h-1.5 w-full rounded-full bg-input" />
      <span className="absolute left-0 h-1.5 w-[60%] rounded-full bg-primary" />
      <span className="absolute left-[calc(60%-8px)] size-4 rounded-full border border-primary bg-background shadow-sm" />
    </span>
  ),
  field: (
    <span className="flex w-40 flex-col gap-1.5 text-left">
      <span className="text-xs font-medium">Work email</span>
      <span className="h-7 rounded-sm border border-input bg-input-subtle" />
      <span className="text-[10px] text-muted-foreground">
        We send receipts here.
      </span>
    </span>
  ),
  count: (
    <span className="flex items-center gap-3 text-sm font-medium">
      <span className="rounded-full border border-border px-2 py-0.5">99+</span>
      <span className="text-muted-foreground">1.2K</span>
      <span>+4</span>
    </span>
  ),
  separator: (
    <span className="flex w-40 items-center gap-3 text-xs text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      Today
      <span className="h-px flex-1 bg-border" />
    </span>
  ),
  avatar: (
    <div className="flex -space-x-2">
      {["AL", "GH", "KJ"].map((initials) => (
        <span
          key={initials}
          className="flex size-10 items-center justify-center rounded-full bg-muted text-xs ring-2 ring-background"
        >
          {initials}
        </span>
      ))}
    </div>
  ),
  pagination: (
    <div className="flex items-center gap-1 text-sm">
      <span className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground">
        <ChevronLeftIcon className="size-4" />
      </span>
      <span className="min-w-12 text-center tabular-nums">1 / 400</span>
      <span className="flex size-8 items-center justify-center rounded-full border border-border">
        <ChevronRightIcon className="size-4" />
      </span>
    </div>
  ),
  table: (
    <div className="w-48 overflow-hidden rounded-md border border-border text-xs">
      <div className="flex h-6 items-center bg-muted px-2 font-medium">
        Member
      </div>
      {["Maya Okafor", "Priya Raman", "Sam Whitfield"].map((name) => (
        <div
          key={name}
          className="flex h-7 items-center border-t border-border px-2"
        >
          {name}
        </div>
      ))}
    </div>
  ),
  sheet: (
    <div className="relative h-44 w-64 overflow-hidden rounded-lg border border-border bg-background shadow-sm">
      <div className="flex flex-col gap-2 p-3">
        <span className="h-2 w-16 rounded-full bg-border" />
        {[0, 1, 2].map((row) => (
          <span key={row} className="flex items-center gap-2">
            <span className="size-5 rounded-full bg-muted" />
            <span className="h-1.5 w-20 rounded-full bg-muted" />
          </span>
        ))}
      </div>
      <div className="absolute inset-0 bg-backdrop" />
      <div className="absolute inset-y-0 right-0 flex w-36 flex-col gap-2.5 border-l border-border bg-background p-3 shadow-lg">
        <span className="flex items-start justify-between">
          <span className="flex flex-col gap-0.5">
            <span className="text-xs font-medium">Edit profile</span>
            <span className="text-[9px] text-muted-foreground">
              Saved when you&apos;re done.
            </span>
          </span>
          <XIcon className="size-3 text-muted-foreground" />
        </span>
        {["Name", "Email"].map((label) => (
          <span key={label} className="flex flex-col gap-1">
            <span className="text-[9px] font-medium">{label}</span>
            <span className="h-5 rounded-sm border border-input bg-input-subtle" />
          </span>
        ))}
        <span className="mt-auto flex justify-end gap-1.5">
          <Button size="xs" variant="outline">
            Cancel
          </Button>
          <Button size="xs">Save</Button>
        </span>
      </div>
    </div>
  ),
  menu: (
    <div className="flex w-36 flex-col rounded-lg border border-border bg-popover p-1 text-sm shadow-md">
      <span className="rounded-md bg-accent px-2 py-1.5">Edit</span>
      <span className="px-2 py-1.5">Duplicate</span>
      <span className="-mx-1 my-1 h-px bg-border" />
      <span className="px-2 py-1.5 text-destructive">Delete</span>
    </div>
  ),
  tooltip: (
    <div className="flex flex-col items-center gap-1.5">
      <span className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
        Add to library
      </span>
      <span className="flex h-8 items-center rounded-sm border border-border bg-background px-3 text-sm">
        Hover
      </span>
    </div>
  ),
  kbd: (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
  progress: (
    <div className="flex w-48 flex-col gap-2 text-sm">
      <div className="flex justify-between">
        <span className="font-medium">Uploading</span>
        <span className="font-mono text-muted-foreground">60%</span>
      </div>
      <span className="h-1.5 w-full rounded-full bg-input">
        <span className="block h-full w-[60%] rounded-full bg-primary" />
      </span>
    </div>
  ),
  skeleton: (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
      <Skeleton className="size-10 rounded-full bg-border" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-32 bg-border" />
        <Skeleton className="h-3 w-20 bg-border" />
      </div>
    </div>
  ),
  toast: (
    <span className="flex w-56 items-center gap-2.5 rounded-xl border border-border bg-popover p-3 text-sm shadow-md">
      <CircleCheckIcon className="size-4 text-success" />
      <span className="flex-1 font-medium">Changes saved</span>
      <XIcon className="size-3.5 text-muted-foreground" />
    </span>
  ),
  "voice-memo": (
    <span className="flex items-start gap-2">
      <span className="relative block h-[3.6rem] w-[5.6rem] rounded-[7%/11%] border border-border bg-muted shadow-sm">
        <span className="absolute top-2 right-2 size-1 rounded-full bg-destructive" />
        <span className="absolute bottom-1.5 left-2 font-serif text-lg leading-none text-muted-foreground">
          fibo
        </span>
      </span>
      <span className="flex w-28 flex-col gap-1 rounded-lg border border-border bg-popover p-2 text-[9px] leading-snug shadow-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <span className="size-1 rounded-full bg-destructive" />
          Listening…
        </span>
        <span>
          Quick note for the design review.{" "}
          <span className="text-muted-foreground">The token</span>
        </span>
      </span>
    </span>
  ),
}
