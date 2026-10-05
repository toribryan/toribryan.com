"use client"

import type { ReactNode } from "react"

import { Calendar } from "@/components/fibo/calendar"

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
