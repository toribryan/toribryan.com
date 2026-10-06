"use client"

import { useEffect, useRef, useState } from "react"
import type { ComponentType } from "react"
import dynamic from "next/dynamic"
import {
  BookmarkIcon,
  CalendarIcon,
  CircleDashedIcon,
  CompassIcon,
  DatabaseIcon,
  GitBranchIcon,
  HouseIcon,
  InboxIcon,
  MessageSquareIcon,
  SearchIcon,
  SearchXIcon,
  SignalHighIcon,
  TagIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Avatar, AvatarFallback } from "@/components/fibo/avatar"
import { Badge } from "@/components/fibo/badge"
import { Button } from "@/components/fibo/button"
import { Calendar, type CalendarEvent } from "@/components/fibo/calendar"
import {
  ChapterScrubber,
  type Chapter,
} from "@/components/fibo/chapter-scrubber"
import {
  ChatComposerAttachments,
  ChatComposerCommonActions,
  ChatComposerFooter,
  ChatComposerFrame,
  ChatComposerHeader,
  ChatComposerInput,
  ChatComposerProvider,
  ChatComposerSubmit,
  type ChatComposerActions,
} from "@/components/fibo/chat-composer"
import { CommandMenu } from "@/components/fibo/command-menu"
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableBulkActions,
  DataTableCards,
  DataTableFilters,
  DataTableSearch,
  DataTableToolbar,
  useDataTable,
} from "@/components/fibo/data-table"
import { DateRangePicker } from "@/components/fibo/date-picker"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/components/fibo/empty-state"
import {
  FilterMenu,
  type FilterField,
  type FilterValue,
} from "@/components/fibo/filter-menu"
import {
  FloatingNav,
  type FloatingNavItem,
} from "@/components/fibo/floating-nav"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/fibo/input-group"
import {
  IntegrationVisual,
  type IntegrationItem,
} from "@/components/fibo/integration-visual"
import { JumpBar, type JumpBarProps } from "@/components/fibo/jump-bar"
import { Kbd } from "@/components/fibo/kbd"
import { MessageList, type ChatMessage } from "@/components/fibo/message-list"
import { Reactions, type Reaction } from "@/components/fibo/reactions"
import { StatusDot, type StatusDotStatus } from "@/components/fibo/status-dot"
import { StickerAvatar } from "@/components/fibo/sticker-avatar"
import { TokenFlow, type TokenRow } from "@/components/fibo/token-flow"
import {
  TypingIndicator,
  type TypingPerson,
} from "@/components/fibo/typing-indicator"
import { GROUPS } from "@/features/components/examples/command-menu-data"
import { useRabbit } from "@/features/components/examples/sticker-avatar-data"
import { VoiceMemoCover } from "@/features/doc/components/voice-memo-cover"

import { ScaledStage } from "./scaled-stage"
import { useCycle } from "./use-cycle"

type CoverProps = { active: boolean }

/*
 * Each cover holds still at rest and loops a short demo of its part while
 * `active`, using only the part's own props and the events a person would
 * send it. Sample data is from fibo's stories.
 */

/*
 * Runs `act` with the cover's inert lifted, since inert swallows the clicks
 * and key presses the demos send.
 */
function uninerted(node: Element | null, act: () => void) {
  const cover = node?.closest<HTMLElement>("[inert]")
  if (cover) cover.inert = false
  act()
  if (cover) cover.inert = true
}

const TOKEN_ROWS: TokenRow[] = [
  {
    base: "oklch(0.205 0 0)",
    primitive: "neutral-900",
    semantic: "bg-primary",
    dark: { base: "oklch(0.985 0 0)", primitive: "neutral-50" },
  },
  {
    base: "oklch(0.505 0.213 27.518)",
    primitive: "red-700",
    semantic: "text-destructive",
    dark: { base: "oklch(0.704 0.191 22.216)", primitive: "red-400" },
  },
  {
    base: "oklch(0.922 0 0)",
    primitive: "neutral-200",
    semantic: "border-border",
    dark: { base: "oklch(1 0 0 / 10%)", primitive: "white / 10%" },
  },
]

/**
 * Flips the rows to the other theme's values and back every few seconds, so
 * they scramble each way. The part stacks its rows below `sm` by the
 * viewport, so a phone gets one row rather than a column too tall for the
 * cover.
 */
function TokenFlowCover({ active }: CoverProps) {
  const { resolvedTheme } = useTheme()
  const narrow = useMediaQuery("(max-width: 639px)")
  const flipped = useCycle(2, 3000, active) === 1
  const other = resolvedTheme === "dark" ? "light" : "dark"

  return (
    <ScaledStage width={narrow ? 320 : 520}>
      <TokenFlow
        rows={narrow ? TOKEN_ROWS.slice(0, 1) : TOKEN_ROWS}
        theme={flipped ? other : undefined}
        className="flex h-full flex-col justify-center rounded-none border-0 bg-transparent"
      />
    </ScaledStage>
  )
}

const TOOLS: IntegrationItem[] = [
  { title: "Database", icon: <DatabaseIcon /> },
  { title: "Repository", icon: <GitBranchIcon /> },
  { title: "Chat", icon: <MessageSquareIcon /> },
  { title: "Calendar", icon: <CalendarIcon /> },
]

/** Pulses run in along the routes, with the halo breathing, while active. */
function IntegrationVisualCover({ active }: CoverProps) {
  return (
    <ScaledStage width={400}>
      <IntegrationVisual
        items={TOOLS}
        pulse={active ? "inward" : "none"}
        halo={active}
        className="h-full bg-transparent"
      />
    </ScaledStage>
  )
}

const CHAPTERS: Chapter[] = Array.from({ length: 19 }, (_, i) => ({
  id: `chapter-${i}`,
  title: `Chapter ${i + 1}`,
}))

/**
 * Sweeps a pointer along the rail and back, over and over, the way a person
 * would scrub it, so the marks swell and settle under the crest.
 */
function ChapterScrubberCover({ active }: CoverProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = root.current?.querySelector<HTMLElement>('[role="listbox"]')
    if (!active || !rail) return

    const sweepMs = 2400
    const startedAt = performance.now()
    let frame = 0
    const loop = (now: number) => {
      const phase = ((now - startedAt) % sweepMs) / sweepMs
      const t = 0.5 - 0.5 * Math.cos(phase * 2 * Math.PI)
      const rect = rail.getBoundingClientRect()
      rail.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          clientX: rect.left + t * rect.width,
          clientY: rect.top + rect.height / 2,
        })
      )
      frame = window.requestAnimationFrame(loop)
    }
    frame = window.requestAnimationFrame(loop)

    return () => {
      window.cancelAnimationFrame(frame)
      rail.dispatchEvent(new PointerEvent("pointerout", { bubbles: true }))
    }
  }, [active])

  return (
    <div ref={root} className="flex size-full items-center justify-center">
      <ChapterScrubber
        chapters={CHAPTERS}
        orientation="horizontal"
        preview="none"
        defaultCurrentIndex={4}
      />
    </div>
  )
}

const SEEDED: Reaction[] = [
  { emoji: "👍", label: "Thumbs up", count: 5 },
  { emoji: "❤️", label: "Heart", count: 3, active: true },
  { emoji: "😂", label: "Laughing", count: 1 },
]

/**
 * Taps the first pill when the card goes active, so the count ticks up and
 * the emoji burst plays, and taps it again on the way out.
 */
function ReactionsCover({ active }: CoverProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    const tap = () => {
      const pill = root.current?.querySelector<HTMLButtonElement>(
        "button[aria-pressed]"
      )
      uninerted(pill ?? null, () => pill?.click())
    }
    tap()
    return tap
  }, [active])

  return (
    <div ref={root} className="flex size-full items-center justify-center">
      <Reactions defaultReactions={SEEDED} />
    </div>
  )
}

const FIELDS: FilterField[] = [
  {
    id: "status",
    label: "Status",
    icon: <CircleDashedIcon />,
    options: [
      { value: "todo", label: "Todo" },
      { value: "in-progress", label: "In progress" },
    ],
  },
  {
    id: "priority",
    label: "Priority",
    icon: <SignalHighIcon />,
    options: [
      { value: "urgent", label: "Urgent" },
      { value: "high", label: "High" },
      { value: "low", label: "Low" },
    ],
  },
  {
    id: "label",
    label: "Label",
    icon: <TagIcon />,
    options: [{ value: "bug", label: "Bug" }],
  },
]

const FILTERED: FilterValue = { priority: ["urgent"] }

function typeInto(input: HTMLInputElement, text: string) {
  Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )?.set?.call(input, text)
  input.dispatchEvent(new Event("input", { bubbles: true }))
}

/**
 * The menu with its Search filters button, run the way a person would: it
 * clears, opens, slides over to search, "urg" is typed, Enter picks Urgent
 * and a chip appears beside the trigger. Then it closes and starts again. At
 * rest it holds the Urgent chip. The popup renders inside the cover rather
 * than at the end of the page.
 */
function FilterMenuCover({ active }: CoverProps) {
  const [stage, setStage] = useState<HTMLDivElement | null>(null)
  // The popup's own layer over the row, so its portal never takes a place
  // in the row and nudges the chips.
  const [layer, setLayer] = useState<HTMLDivElement | null>(null)
  const [value, setValue] = useState<FilterValue>(FILTERED)
  const labelOf = (fieldId: string, optionValue: string) =>
    FIELDS.find((f) => f.id === fieldId)?.options.find(
      (o) => o.value === optionValue
    )?.label ?? optionValue

  useEffect(() => {
    if (!active || !stage) return
    const trigger = () =>
      stage.querySelector<HTMLElement>("[data-slot=filter-menu-trigger]")
    const input = () => stage.querySelector<HTMLInputElement>("input")
    const timers: number[] = []
    const at = (ms: number, act: () => void) =>
      timers.push(window.setTimeout(() => uninerted(stage, act), ms))

    const run = () => {
      // Every timer from the last run has fired by now.
      timers.length = 0
      setValue({})
      at(700, () => trigger()?.click())
      at(1600, () =>
        stage
          .querySelector<HTMLElement>("[data-slot=filter-menu-search-button]")
          ?.click()
      )
      ;["u", "ur", "urg"].forEach((text, i) =>
        at(2100 + i * 220, () => {
          const box = input()
          if (box) typeInto(box, text)
        })
      )
      at(3200, () =>
        input()?.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
        )
      )
      at(4200, () => trigger()?.click())
      timers.push(window.setTimeout(run, 6600))
    }
    run()

    return () => {
      timers.forEach((id) => window.clearTimeout(id))
      if (stage.querySelector("[data-slot=filter-menu]"))
        uninerted(stage, () => trigger()?.click())
      setValue(FILTERED)
    }
  }, [active, stage])

  return (
    <ScaledStage width={340}>
      <div ref={setStage} className="relative h-full">
        <div className="flex flex-wrap content-start items-center gap-2 p-5">
          <FilterMenu
            fields={FIELDS}
            value={value}
            onValueChange={setValue}
            search="button"
            container={layer}
          />
          {Object.entries(value).map(([fieldId, values]) => (
            <span
              key={fieldId}
              className="inline-flex h-8 animate-in items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm fade-in-0 zoom-in-95"
            >
              <span className="text-muted-foreground">
                {FIELDS.find((f) => f.id === fieldId)?.label}
              </span>
              {values.map((v) => labelOf(fieldId, v)).join(", ")}
            </span>
          ))}
        </div>
        <div ref={setLayer} className="absolute inset-0" />
      </div>
    </ScaledStage>
  )
}

/**
 * The palette in its default view, then the step that brings in the preview:
 * the highlight moves down to Assign to and it's clicked, so its page of
 * people opens, the dialog widens and the preview pane comes in. The
 * highlight steps through two people so the pane follows, then Backspace
 * steps back out and the pane leaves. It never takes focus or locks the
 * page's scroll.
 */
function CommandMenuCover({ active }: CoverProps) {
  const [stage, setStage] = useState<HTMLDivElement | null>(null)
  const [layer, setLayer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!active || !stage) return
    const input = () =>
      stage.querySelector<HTMLInputElement>("[data-slot=command-menu] input")
    const press = (key: string) =>
      input()?.dispatchEvent(
        new KeyboardEvent("keydown", { key, bubbles: true })
      )
    const timers: number[] = []
    const at = (ms: number, act: () => void) =>
      timers.push(window.setTimeout(() => uninerted(stage, act), ms))

    const run = () => {
      // Every timer from the last run has fired by now.
      timers.length = 0
      // New file is highlighted to start; four steps down is Assign to.
      ;[0, 1, 2, 3].forEach((i) => at(1000 + i * 420, () => press("ArrowDown")))
      at(3000, () =>
        [
          ...stage.querySelectorAll<HTMLElement>(
            "[data-slot=command-menu-item]"
          ),
        ]
          .find((item) => item.textContent?.startsWith("Assign to"))
          ?.click()
      )
      at(4800, () => press("ArrowDown"))
      at(6000, () => press("ArrowDown"))
      at(7600, () => press("Backspace"))
      timers.push(window.setTimeout(run, 8800))
    }
    run()

    return () => {
      timers.forEach((id) => window.clearTimeout(id))
      // Back to the default view if it stopped on a page.
      if (stage.querySelector("[data-slot=command-menu-back]"))
        uninerted(stage, () => press("Backspace"))
    }
  }, [active, stage])

  return (
    <ScaledStage width={640}>
      {/* The dialog opens into the layer, without the page's scrim. */}
      <div
        ref={setStage}
        className="relative h-full [&_[data-slot=command-menu-backdrop]]:hidden"
      >
        {layer && (
          <CommandMenu
            groups={GROUPS}
            variant="inset"
            open
            modal={false}
            hotkey={null}
            trigger={null}
            container={layer}
            // The dialog grows to make room for the pane, which shows once
            // the dialog is wide enough for it and then fades in from the
            // side it opens on.
            popupClassName="top-1/2 h-[340px] -translate-y-1/2 w-[440px] max-w-none transition-[width] duration-300 ease-out data-preview:w-[600px] data-preview:max-w-none [&_[data-slot=command-menu-preview]]:animate-in [&_[data-slot=command-menu-preview]]:duration-300 [&_[data-slot=command-menu-preview]]:fade-in-0 [&_[data-slot=command-menu-preview]]:slide-in-from-right-2"
          />
        )}
        <div ref={setLayer} className="absolute inset-0" />
      </div>
    </ScaledStage>
  )
}

const NAV_ITEMS: FloatingNavItem[] = [
  { value: "home", label: "Home", icon: <HouseIcon /> },
  { value: "explore", label: "Explore", icon: <CompassIcon /> },
  { value: "saved", label: "Saved", icon: <BookmarkIcon /> },
  { value: "profile", label: "Profile", icon: <UserIcon /> },
]

/** Steps the current item along the bar while active, so the pill slides. */
function FloatingNavCover({ active }: CoverProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!active) return
    // Long enough for the spring and the label's reveal to settle before
    // the next item, so it reads as a glide rather than a jitter.
    const id = window.setInterval(
      () => setCurrent((index) => (index + 1) % NAV_ITEMS.length),
      1800
    )
    return () => window.clearInterval(id)
  }, [active])

  return (
    <div className="flex size-full items-center justify-center">
      <FloatingNav
        aria-label="Floating nav"
        position="static"
        size="sm"
        items={NAV_ITEMS}
        value={NAV_ITEMS[current]!.value}
      />
    </div>
  )
}

type CoverMember = {
  id: string
  name: string
  initials: string
  team: string
  role: string
  status: keyof typeof COVER_STATUS
}

const COVER_STATUS = { Active: "success", Away: "warning" } as const

const COVER_MEMBERS: CoverMember[] = [
  {
    id: "maya",
    name: "Maya Okafor",
    initials: "MO",
    team: "Design",
    role: "Admin",
    status: "Active",
  },
  {
    id: "priya",
    name: "Priya Raman",
    initials: "PR",
    team: "Engineering",
    role: "Editor",
    status: "Away",
  },
  {
    id: "jordan",
    name: "Jordan Alvarez",
    initials: "JA",
    team: "Marketing",
    role: "Viewer",
    status: "Active",
  },
]

const coverMember = createDataTableColumnHelper<CoverMember>()

// The name titles each card and the status sits beside it; the other two
// columns become its fields, in this order.
const COVER_COLUMNS = coverMember.columns([
  coverMember.accessor("name", {
    header: "Member",
    meta: {
      type: "person",
      avatar: (member: CoverMember) => ({ fallback: member.initials }),
    },
  }),
  coverMember.accessor("team", { header: "Team" }),
  coverMember.accessor("role", { header: "Role" }),
  coverMember.accessor("status", {
    header: "Status",
    meta: { type: "status" },
    cell: ({ getValue }) => (
      <Badge variant={COVER_STATUS[getValue()]}>{getValue()}</Badge>
    ),
  }),
])

// One row, two, the whole page, then nothing. At rest it shows the first,
// so the cover always opens on the selection toolbar.
const COVER_SELECTIONS: string[][] = [
  ["maya"],
  ["maya", "priya"],
  ["maya", "priya", "jordan"],
  [],
]

const coverSelection = (step: number) =>
  Object.fromEntries(COVER_SELECTIONS[step]!.map((id) => [id, true as const]))

/**
 * The table as it looks on a phone: a card per member, with select all in
 * the toolbar. While active, cards are selected one by one until the page is,
 * and the toolbar swaps to bulk actions and back.
 */
function DataTableCover({ active }: CoverProps) {
  const step = useCycle(COVER_SELECTIONS.length, 1600, active)
  const table = useDataTable({
    data: COVER_MEMBERS,
    columns: COVER_COLUMNS,
    initialState: { rowSelection: coverSelection(0) },
  })
  // Each step sets the table's own selection, as a person ticking cards
  // would, so the toolbar and cards follow it through their subscriptions.
  useEffect(() => {
    table.setRowSelection(coverSelection(step))
  }, [table, step])
  return (
    <ScaledStage width={375}>
      {/* Top-aligned, so the toolbar where the selection shows stays in view
          and the cards run off the bottom like a phone screen, fading out. */}
      <div className="h-full mask-b-from-60% px-5 pt-5">
        {/* White in the light theme rather than the site's warm page color;
            the dark theme keeps its own background. Also eases the checkbox
            and card colors, and fades the toolbar's contents in as it swaps
            between idle and selecting. */}
        <div className="[--background:oklch(1_0_0)] dark:[--background:inherit] [&_[data-slot=checkbox]]:transition-[background-color,border-color,color] [&_[data-slot=checkbox]]:duration-200 [&_[data-slot=data-table-card]]:transition-colors [&_[data-slot=data-table-card]]:duration-300 [&_[data-slot=data-table-toolbar]>*]:animate-in [&_[data-slot=data-table-toolbar]>*]:duration-300 [&_[data-slot=data-table-toolbar]>*]:fade-in-0">
          <DataTable
            table={table}
            aria-label="Members"
            noun={{ one: "member", other: "members" }}
            narrowLayout="cards"
          >
            <DataTableToolbar>
              <DataTableFilters
                search={
                  <DataTableSearch
                    placeholder="Search members"
                    aria-label="Search members"
                  />
                }
              />
              <DataTableBulkActions onDelete={() => {}} />
            </DataTableToolbar>
            <DataTableCards />
          </DataTable>
        </div>
      </div>
    </ScaledStage>
  )
}

const STICKER_STATUSES: StatusDotStatus[] = ["present", "away", "offline"]

/** fibo as a sticker. While active his status steps through each shape. */
function StickerAvatarCover({ active }: CoverProps) {
  const rabbit = useRabbit()
  const step = useCycle(STICKER_STATUSES.length, 1100, active)

  return (
    <div className="flex size-full items-center justify-center">
      {/* He's drawn on a canvas in the browser; until then the cover stays
          empty rather than flashing his initials. */}
      {rabbit ? (
        <StickerAvatar name="fibo" src={rabbit} pixelated size={96}>
          <StatusDot status={STICKER_STATUSES[step]} />
        </StickerAvatar>
      ) : null}
    </div>
  )
}

const TYPISTS: TypingPerson[] = [
  { id: "ana", name: "Ana" },
  { id: "ben", name: "Ben" },
  { id: "cy", name: "Cy" },
  { id: "dara", name: "Dara" },
]

// How many are typing at each step: one, two, three, then too many to name.
const TYPING_STEPS = [1, 2, 3, 4]

/**
 * The indicator on its own. While active, people join one at a time until it
 * gives up naming them; at rest the dots hold still.
 */
function TypingIndicatorCover({ active }: CoverProps) {
  const step = useCycle(TYPING_STEPS.length, 1400, active)
  return (
    <div className="flex size-full items-center justify-center">
      <TypingIndicator
        people={TYPISTS.slice(0, active ? TYPING_STEPS[step] : 2)}
        className={cn(
          "max-w-full",
          !active && "[&_[data-slot=typing-indicator-dots]>span]:animate-none"
        )}
      />
    </div>
  )
}

const PRESENCE: StatusDotStatus[] = ["present", "away", "offline"]
const MEMBERS = ["AR", "BK", "CY"]

/**
 * Three avatars, one in each status. While active each steps on to the next
 * shape, a beat out of step with its neighbours.
 */
function StatusDotCover({ active }: CoverProps) {
  const step = useCycle(PRESENCE.length, 1200, active)
  return (
    <div className="flex size-full items-center justify-center gap-4">
      {MEMBERS.map((initials, i) => (
        <Avatar key={initials} size="lg">
          <AvatarFallback>{initials}</AvatarFallback>
          <StatusDot status={PRESENCE[(i + step) % PRESENCE.length]!} />
        </Avatar>
      ))}
    </div>
  )
}

const EMPTY_STATES = [
  {
    icon: <UsersIcon />,
    title: "No members yet",
    description: "Invite people to work on this project with you.",
    action: (
      <Button size="sm" tabIndex={-1}>
        Invite members
      </Button>
    ),
  },
  {
    icon: <SearchXIcon />,
    title: "No matching members",
    description: "Try another search, or clear the filters.",
    action: (
      <Button size="sm" variant="outline" tabIndex={-1}>
        Clear filters
      </Button>
    ),
  },
  {
    icon: <InboxIcon />,
    title: "You're all caught up",
  },
]

/**
 * The empty states from fibo's stories. While active it steps from first run
 * to no matches to caught up; at rest it holds on first run.
 */
function EmptyStateCover({ active }: CoverProps) {
  const step = useCycle(EMPTY_STATES.length, 1800, active)
  const state = EMPTY_STATES[active ? step : 0]!
  return (
    <div className="flex size-full items-center justify-center">
      <EmptyState
        key={state.title}
        className="animate-in py-0 duration-300 fade-in-0"
      >
        <EmptyStateMedia>{state.icon}</EmptyStateMedia>
        <EmptyStateTitle>{state.title}</EmptyStateTitle>
        {state.description ? (
          <EmptyStateDescription>{state.description}</EmptyStateDescription>
        ) : null}
        {state.action ? (
          <EmptyStateActions>{state.action}</EmptyStateActions>
        ) : null}
      </EmptyState>
    </div>
  )
}

const COVER_ANA = { id: "ana", name: "Ana Ruiz" }
const COVER_BEN = { id: "ben", name: "Ben Okafor" }

const COVER_LINES: [ChatMessage["author"], number, string][] = [
  [COVER_BEN, 12, "Looked through it. Is dark mode in there too?"],
  [COVER_BEN, 13, "The diff is in #58."],
  [COVER_ANA, 15, "Both themes, and the drift check passes."],
  [COVER_ANA, 16, "Merging after lunch unless anyone shouts."],
  [COVER_BEN, 18, "Ship it."],
]

const COVER_MESSAGES: ChatMessage[] = COVER_LINES.map(
  ([author, minute, content], i) => ({
    id: String(i),
    author,
    sentAt: new Date(2026, 9, 1, 9, minute),
    content,
  })
)

/**
 * A morning's conversation. While active, messages arrive one at a time and
 * fold into their author's group; at rest it holds the first three.
 */
function MessageListCover({ active }: CoverProps) {
  const step = useCycle(COVER_MESSAGES.length - 1, 1400, active)
  return (
    <ScaledStage width={360}>
      <div className="flex size-full flex-col justify-end px-4 py-5">
        <MessageList
          aria-label="Sample conversation"
          messages={COVER_MESSAGES.slice(0, active ? step + 2 : 3)}
        />
      </div>
    </ScaledStage>
  )
}

const QUERY = "Lovelace"

/**
 * A search field. While active it takes focus, "Lovelace" is typed a letter
 * at a time and the clear button replaces the key hint, then it holds and
 * starts over; at rest it's empty.
 */
function InputGroupCover({ active }: CoverProps) {
  const step = useCycle(QUERY.length + 6, 180, active)
  const value = active ? QUERY.slice(0, Math.max(0, step - 1)) : ""
  return (
    <div className="flex size-full items-center justify-center">
      <InputGroup
        className={cn(
          "w-56",
          active && "border-ring ring-[3px] ring-ring-subtle"
        )}
      >
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Search people"
          placeholder="Search people"
          value={value}
          readOnly
          tabIndex={-1}
        />
        <InputGroupAddon align="inline-end">
          {value ? (
            <XIcon aria-hidden="true" className="size-3.5" />
          ) : (
            <Kbd>/</Kbd>
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

const JUMP_STEPS: Pick<JumpBarProps, "type" | "count">[] = [
  { type: "unread-above", count: 12 },
  { type: "new-below", count: 3 },
  { type: "history" },
]

// Widths of the stand-in messages, so the conversation has a ragged edge.
const JUMP_LINES = ["w-3/4", "w-1/2", "w-2/3", "w-5/6", "w-2/5", "w-3/5"]

/**
 * A stand-in conversation with a bar over it. While active it steps through
 * unread above, new below and history; at rest it shows the unread bar.
 */
function JumpBarCover({ active }: CoverProps) {
  const step = useCycle(JUMP_STEPS.length, 1800, active)
  const bar = JUMP_STEPS[active ? step : 0]!
  return (
    // Laid out wider than the cover, so the bar fits with Mark as read.
    <ScaledStage width={360}>
      <div className="flex size-full items-center justify-center p-6">
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-line bg-card">
          <div className="flex flex-col gap-3 px-4 pt-14">
            {JUMP_LINES.map((width, i) => (
              <div key={i} className={cn("h-2 rounded-full bg-muted", width)} />
            ))}
          </div>
          <JumpBar type={bar.type} count={bar.count} onMarkRead={() => {}} />
        </div>
      </div>
    </ScaledStage>
  )
}

const COMPOSER_MESSAGE = "Both files from the review."
const COMPOSER_FILES = [
  { id: "a", name: "token-audit.pdf", size: 482_000 },
  { id: "b", name: "button-states.png", size: 1_830_000 },
]
// Typing, a beat, sending, then a beat on the cleared box before it repeats.
const COMPOSER_STEPS = COMPOSER_MESSAGE.length + 18
const COMPOSER_IDLE: ChatComposerActions = {
  setValue() {},
  addAttachments() {},
  removeAttachment() {},
  submit() {},
}

/**
 * Types a message under two attachments, sends it and clears, while active.
 * At rest it's the empty composer with its placeholder.
 */
function ChatComposerCover({ active }: CoverProps) {
  const step = useCycle(COMPOSER_STEPS, 70, active)
  const typed = COMPOSER_MESSAGE.length
  const sent = step >= typed + 10
  return (
    <ScaledStage width={420}>
      <div className="flex h-full items-center px-6">
        <ChatComposerProvider
          state={{
            value: sent ? "" : COMPOSER_MESSAGE.slice(0, step),
            attachments: step > 0 && !sent ? COMPOSER_FILES : [],
            submitting: step >= typed + 3 && !sent,
          }}
          actions={COMPOSER_IDLE}
        >
          <ChatComposerFrame>
            <ChatComposerHeader className="empty:hidden">
              <ChatComposerAttachments />
            </ChatComposerHeader>
            <ChatComposerInput placeholder="Message #design" />
            <ChatComposerFooter>
              <ChatComposerCommonActions />
              <ChatComposerSubmit />
            </ChatComposerFooter>
          </ChatComposerFrame>
        </ChatComposerProvider>
      </div>
    </ScaledStage>
  )
}

const COVER_MONTH = new Date(2026, 9, 1)
const coverAt = (day: number, hour: number, minute = 0) =>
  new Date(2026, 9, day, hour, minute)

const COVER_EVENTS: CalendarEvent[] = [
  { id: "planning", title: "Quarterly planning", start: coverAt(1, 9) },
  { id: "review", title: "Design review", start: coverAt(5, 10) },
  { id: "ana", title: "1:1 with Ana", start: coverAt(5, 14) },
  { id: "offsite", title: "Team offsite", start: coverAt(8, 0), allDay: true },
  { id: "standup", title: "Standup", start: coverAt(14, 9, 30) },
  { id: "launch", title: "Launch prep", start: coverAt(14, 13) },
  { id: "crit", title: "Crit", start: coverAt(16, 11) },
  { id: "dentist", title: "Dentist", start: coverAt(20, 16, 30) },
  { id: "workshop", title: "Research workshop", start: coverAt(21, 13) },
  { id: "release", title: "Release 0.3", start: coverAt(23, 0), allDay: true },
  { id: "retro", title: "Retro", start: coverAt(27, 15) },
  { id: "party", title: "Halloween party", start: coverAt(30, 18) },
]

// The busy days the selection steps through while the card is active, all
// in the middle of the month the cover zooms in on.
const COVER_DAYS = [14, 16, 21, 20, 8, 23]

/**
 * October in the month view, its events as cards in the day cells, zoomed in
 * on the middle of the month so the cards read at card size. While active the
 * selection steps from one busy day to the next; at rest it holds on the 14th.
 */
function CalendarCover({ active }: CoverProps) {
  const step = useCycle(COVER_DAYS.length, 1200, active)
  const day = COVER_DAYS[active ? step : 0]!
  return (
    <ScaledStage width={960}>
      {/* White in the light theme, like the plate, rather than the site's
          warm page color; the dark theme keeps its own background. */}
      <div className="flex h-full origin-center scale-[1.7] flex-col p-5 [--background:oklch(1_0_0)] dark:[--background:inherit]">
        <Calendar
          type="month"
          events={COVER_EVENTS}
          month={COVER_MONTH}
          value={new Date(2026, 9, day)}
        />
      </div>
    </ScaledStage>
  )
}

const PICKER_START = new Date(2026, 9, 5)
// The first pick, the end sweeping out a day at a time, then a hold.
const PICKER_STEPS = 22

function rangeAt(step: number) {
  if (step === 0) return { from: PICKER_START }
  const days = Math.min(step, 16)
  return {
    from: PICKER_START,
    to: new Date(2026, 9, PICKER_START.getDate() + days),
  }
}

/**
 * The range trigger over its open calendar. While active a start is picked
 * and the end sweeps out across the month, the trigger following; at rest it
 * holds a week.
 */
function DatePickerCover({ active }: CoverProps) {
  const step = useCycle(PICKER_STEPS, 140, active)
  const range = active ? rangeAt(step) : rangeAt(6)
  return (
    <ScaledStage width={500}>
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <DateRangePicker
          label="Report period"
          type="popover"
          value={range.to ? { from: range.from, to: range.to } : null}
          placeholder="Pick an end date"
          tabIndex={-1}
          className="w-72"
        />
        <div className="w-72 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg">
          <Calendar
            mode="range"
            defaultMonth={PICKER_START}
            value={range}
            className="p-3"
          />
        </div>
      </div>
    </ScaledStage>
  )
}

/**
 * The device from the Voice memo project's card. It plays on its own terms,
 * on hover or focus of the card around it.
 */
function VoiceMemoPartCover() {
  return (
    <div className="@container size-full">
      <VoiceMemoCover />
    </div>
  )
}

const RichTextEditorCover = dynamic(() =>
  import("./rich-text-editor-cover").then((m) => m.RichTextEditorCover)
)

export const COVERS: Record<string, ComponentType<CoverProps>> = {
  "data-table": DataTableCover,
  "chat-composer": ChatComposerCover,
  "rich-text-editor": RichTextEditorCover,
  "filter-menu": FilterMenuCover,
  "chapter-scrubber": ChapterScrubberCover,
  "integration-visual": IntegrationVisualCover,
  reactions: ReactionsCover,
  "token-flow": TokenFlowCover,
  "command-menu": CommandMenuCover,
  "floating-nav": FloatingNavCover,
  "sticker-avatar": StickerAvatarCover,
  "typing-indicator": TypingIndicatorCover,
  "status-dot": StatusDotCover,
  "input-group": InputGroupCover,
  "empty-state": EmptyStateCover,
  "message-list": MessageListCover,
  "jump-bar": JumpBarCover,
  calendar: CalendarCover,
  "date-picker": DatePickerCover,
  "voice-memo": VoiceMemoPartCover,
}
