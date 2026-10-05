"use client"

import type { ReactNode } from "react"
import { PlusIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/fibo/button"
import { Calendar, type CalendarEvent } from "@/components/fibo/calendar"
import { ScaledStage } from "@/features/portfolio/components/components/covers"

import { AnatomyMap, slot, type Callout } from "../components/anatomy-map"

const OCTOBER = new Date(2026, 9, 1)

/**
 * The bordered frame fibo's stories give a calendar. It may shrink below
 * the calendar's width, so a two-month range stacks rather than scrolls.
 */
function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-full min-w-0 rounded-xl border border-line bg-card p-3">
      {children}
    </div>
  )
}

export function Default() {
  return (
    <Frame>
      <Calendar defaultMonth={OCTOBER} defaultValue={new Date(2026, 9, 15)} />
    </Frame>
  )
}

export function Range() {
  return (
    <Frame>
      <Calendar
        mode="range"
        months={2}
        defaultMonth={OCTOBER}
        defaultValue={{ from: new Date(2026, 9, 6), to: new Date(2026, 9, 12) }}
      />
    </Frame>
  )
}

const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6

export function DisabledDays() {
  return (
    <Frame>
      <Calendar
        defaultMonth={OCTOBER}
        minDate={new Date(2026, 9, 5)}
        maxDate={new Date(2026, 10, 20)}
        isDateDisabled={isWeekend}
      />
    </Frame>
  )
}

export function WeekStartsMonday() {
  return (
    <Frame>
      <Calendar
        weekStartsOn={1}
        defaultMonth={OCTOBER}
        defaultValue={new Date(2026, 9, 15)}
      />
    </Frame>
  )
}

export function Locale() {
  return (
    <Frame>
      <div lang="fr">
        <Calendar
          mode="range"
          months={2}
          locale="fr-FR"
          weekStartsOn={1}
          defaultMonth={OCTOBER}
          defaultValue={{
            from: new Date(2026, 9, 15),
            to: new Date(2026, 9, 15),
          }}
        />
      </div>
    </Frame>
  )
}

export function DoDisable() {
  return <Calendar defaultMonth={OCTOBER} minDate={new Date(2026, 9, 5)} />
}

export function DontRejectAfter() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Calendar defaultMonth={OCTOBER} defaultValue={new Date(2026, 9, 2)} />
      <p className="text-sm text-destructive">Pick a day from October 5.</p>
    </div>
  )
}

const PARTS: Callout[] = [
  {
    label: "Previous",
    side: "left",
    find: slot("calendar-previous"),
  },
  { label: "Next", side: "right", find: slot("calendar-next") },
  {
    label: "Grid",
    side: "left",
    find: slot("calendar-grid"),
    outline: true,
  },
  { label: "Range bar", side: "right", find: slot("calendar-range-bar") },
  {
    label: "Day",
    side: "right",
    find: (root) =>
      root.querySelector('[data-slot=calendar-day][data-date="2026-10-31"]'),
  },
]

/** A range across one month, with each part labeled. */
export function Anatomy() {
  return (
    <AnatomyMap callouts={PARTS}>
      <div className="flex justify-center px-10 py-8">
        <div data-anatomy-subject>
          <Calendar
            mode="range"
            defaultMonth={OCTOBER}
            defaultValue={{
              from: new Date(2026, 9, 13),
              to: new Date(2026, 9, 22),
            }}
          />
        </div>
      </div>
    </AnatomyMap>
  )
}

const at = (day: number, hour: number, minute = 0) =>
  new Date(2026, 9, day, hour, minute)

// fibo's month stories' October.
const MONTH_EVENTS: CalendarEvent[] = [
  {
    id: "planning",
    title: "Quarterly planning",
    start: at(1, 9),
    end: at(1, 11),
  },
  { id: "review-5", title: "Design review", start: at(5, 10), end: at(5, 11) },
  { id: "one-on-one", title: "1:1 with Ana", start: at(5, 14) },
  { id: "offsite", title: "Team offsite", start: at(8, 0), allDay: true },
  { id: "standup", title: "Standup", start: at(14, 9, 30) },
  { id: "launch", title: "Launch prep", start: at(14, 13), end: at(14, 15) },
  { id: "review-20", title: "Design review", start: at(20, 10) },
  { id: "dentist", title: "Dentist", start: at(20, 16, 30) },
  { id: "workshop", title: "Research workshop", start: at(21, 13) },
  { id: "release", title: "Release 0.3", start: at(23, 0), allDay: true },
  { id: "retro", title: "Retro", start: at(27, 15), end: at(27, 16) },
  { id: "party", title: "Halloween party", start: at(30, 18) },
]

/*
 * The month view switches layout by its own width, and this page's column is
 * narrower than its desktop layout, so the desktop examples lay out at 1100
 * pixels and scale to fit, like a screenshot of a wide screen.
 */
function Desktop({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="relative w-full overflow-hidden rounded-xl border border-line bg-background"
      style={{ aspectRatio: "1100 / 720" }}
    >
      <ScaledStage width={1100}>
        <div className="flex h-full flex-col p-6">{children}</div>
      </ScaledStage>
    </div>
  )
}

export function Month() {
  return (
    <Desktop label="Month view on a wide screen">
      <Calendar
        type="month"
        events={MONTH_EVENTS}
        defaultMonth={OCTOBER}
        defaultValue={new Date(2026, 9, 14)}
      />
    </Desktop>
  )
}

export function MonthWithActions() {
  return (
    <Desktop label="Month view with search and a new event button">
      <Calendar
        type="month"
        events={MONTH_EVENTS}
        defaultMonth={OCTOBER}
        defaultValue={new Date(2026, 9, 14)}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Search"
        >
          <SearchIcon aria-hidden="true" />
        </Button>
        <Button type="button" size="sm">
          <PlusIcon aria-hidden="true" data-icon="inline-start" />
          New event
        </Button>
      </Calendar>
    </Desktop>
  )
}

export function MonthOnAPhone() {
  return (
    <div className="mx-auto flex h-[720px] w-full max-w-[390px] flex-col rounded-[2rem] border border-line bg-background p-4">
      <Calendar
        type="month"
        events={MONTH_EVENTS}
        defaultMonth={OCTOBER}
        defaultValue={new Date(2026, 9, 20)}
      />
    </div>
  )
}
