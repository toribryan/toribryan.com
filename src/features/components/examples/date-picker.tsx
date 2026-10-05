"use client"

import { useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/fibo/calendar"
import {
  DatePicker,
  DateRangePicker,
  defaultDatePresets,
  type DatePreset,
  type DateRange,
  type DateRangePreset,
} from "@/components/fibo/date-picker"
import { ScaledStage } from "@/features/portfolio/components/components/covers"

const october = new Date(2026, 9, 1)

const week: DateRange = {
  from: new Date(2026, 9, 5),
  to: new Date(2026, 9, 11),
}

export function Default() {
  return (
    <DatePicker
      label="Due date"
      placeholder="Select a date"
      defaultValue={new Date(2026, 9, 14)}
    />
  )
}

export function Range() {
  return <DateRangePicker label="Date range" defaultValue={week} />
}

export function WithPresets() {
  return (
    <DatePicker
      label="Due date"
      placeholder="Select a date"
      presets={defaultDatePresets}
    />
  )
}

function nextWeekday(today: Date, weekday: number) {
  const ahead = (weekday - today.getDay() + 7) % 7 || 7
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + ahead
  )
}

const weekdays: DatePreset[] = [
  { label: "Next Monday", date: (today) => nextWeekday(today, 1) },
  { label: "Next Friday", date: (today) => nextWeekday(today, 5) },
]

export function MinAndMax() {
  return (
    <DatePicker
      label="Delivery"
      placeholder="Select a date"
      presets={weekdays}
      minDate={new Date(2026, 9, 7)}
      maxDate={new Date(2026, 9, 30)}
      isDateDisabled={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  )
}

export function Controlled() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 9, 14))
  return (
    <div className="flex flex-col items-start gap-3">
      <DatePicker label="Due date" value={date} onChange={setDate} />
      <p className="text-sm text-muted-foreground">
        {date ? date.toDateString() : "Nothing picked"}
      </p>
    </div>
  )
}

export function OnAPhone() {
  return (
    <DatePicker
      label="Due date"
      type="drawer"
      defaultValue={new Date(2026, 9, 14)}
    />
  )
}

export function RangeControlled() {
  const [range, setRange] = useState<DateRange | null>(week)
  return (
    <div className="flex flex-col items-start gap-3">
      <DateRangePicker
        label="Report period"
        value={range}
        onChange={setRange}
      />
      <p className="text-sm text-muted-foreground">
        {range
          ? `${range.from.toDateString()} to ${range.to.toDateString()}`
          : "No range"}
      </p>
    </div>
  )
}

const sprints: DateRangePreset[] = [
  {
    label: "This sprint",
    range: (today) => {
      const start = new Date(2026, 0, 5)
      const days = Math.floor((today.getTime() - start.getTime()) / 86_400_000)
      const from = new Date(2026, 0, 5 + Math.floor(days / 14) * 14)
      return {
        from,
        to: new Date(from.getFullYear(), from.getMonth(), from.getDate() + 13),
      }
    },
  },
  {
    label: "Next 14 days",
    range: (today) => ({
      from: today,
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 13),
    }),
  },
  {
    label: "Next 90 days",
    range: (today) => ({
      from: today,
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 89),
    }),
  },
]

export function RangeCustomPresets() {
  return <DateRangePicker label="Sprint" presets={sprints} weekStartsOn={1} />
}

export function RangeOneMonth() {
  return (
    <DateRangePicker label="Stay" presets={[]} months={1} defaultValue={week} />
  )
}

export function RangeOnAPhone() {
  return (
    <DateRangePicker label="Date range" type="drawer" defaultValue={week} />
  )
}

/**
 * A fixed-size screen scaled down to fit the exhibit, so the open panel
 * keeps its real layout on a phone-width page. The stage's transform makes
 * it the containing block for the panel's fixed layers, so a panel
 * portalled into it opens inside it rather than over the page.
 */
function Screen({
  width,
  height,
  label,
  className,
  children,
}: {
  width: number
  height: number
  label: string
  className?: string
  children: (container: HTMLElement) => ReactNode
}) {
  const [stage, setStage] = useState<HTMLDivElement | null>(null)
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "relative w-full overflow-hidden border border-border bg-background text-foreground",
        className
      )}
      style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
    >
      <ScaledStage width={width}>
        <div ref={setStage} className="relative h-full">
          {stage ? children(stage) : null}
        </div>
      </ScaledStage>
    </div>
  )
}

/** A 390 by 720 phone screen, scaled to fit, with rounded corners. */
function PhoneFrame({
  label,
  children,
}: {
  label: string
  children: (container: HTMLElement) => ReactNode
}) {
  return (
    <Screen width={390} height={720} label={label} className="rounded-[2rem]">
      {children}
    </Screen>
  )
}

// `open` with no onOpenChange holds each panel open, and `modal={false}`
// keeps it from taking focus, which would scroll the page to it on load.

/** The range panel open as a popover, the way it opens on a desktop. */
export function DesktopPanel() {
  return (
    <Screen
      width={760}
      height={480}
      label="Date range picker, open as a popover"
      className="rounded-xl"
    >
      {(container) => (
        <div className="p-4">
          <DateRangePicker
            label="Report period"
            type="popover"
            open
            modal={false}
            container={container}
            defaultValue={week}
          />
        </div>
      )}
    </Screen>
  )
}

/** DatePicker open as a drawer on a phone. */
export function PhoneDrawer() {
  return (
    <PhoneFrame label="Date picker, open as a drawer on a phone">
      {(container) => (
        <div className="p-4">
          <DatePicker
            label="Due date"
            type="drawer"
            open
            modal={false}
            container={container}
            defaultValue={new Date(2026, 9, 14)}
          />
        </div>
      )}
    </PhoneFrame>
  )
}

/** DateRangePicker open as a drawer on a phone. */
export function RangePhoneDrawer() {
  return (
    <PhoneFrame label="Date range picker, open as a drawer on a phone">
      {(container) => (
        <div className="p-4">
          <DateRangePicker
            label="Report period"
            type="drawer"
            open
            modal={false}
            container={container}
            defaultValue={week}
          />
        </div>
      )}
    </PhoneFrame>
  )
}

export function StateEmpty() {
  return <DateRangePicker type="popover" />
}

export function StateFilled() {
  return <DateRangePicker type="popover" defaultValue={week} />
}

export function StatePicking() {
  return (
    <Calendar
      mode="range"
      defaultMonth={october}
      value={{ from: new Date(2026, 9, 14) }}
    />
  )
}

export function StatePicked() {
  return (
    <Calendar
      mode="range"
      defaultMonth={october}
      value={{ from: new Date(2026, 9, 14), to: new Date(2026, 9, 23) }}
    />
  )
}

export function StateDisabledDays() {
  return (
    <Calendar
      defaultMonth={october}
      minDate={new Date(2026, 9, 12)}
      isDateDisabled={(date) => date.getDay() === 0}
    />
  )
}

export function StateDisabled() {
  return <DatePicker type="popover" disabled />
}

export function DoOneRange() {
  return (
    <DateRangePicker label="Report period" type="popover" defaultValue={week} />
  )
}

export function DontTwoPickers() {
  return (
    <div className="flex flex-wrap gap-2">
      <DatePicker label="From" type="popover" placeholder="From" />
      <DatePicker label="To" type="popover" placeholder="To" />
    </div>
  )
}
