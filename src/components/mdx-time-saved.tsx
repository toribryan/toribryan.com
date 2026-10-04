import { cn } from "@/lib/utils"

/*
 * Spec production time before and after the handoff skill, in working hours:
 * 3 days to 2 weeks before (24 to 80), under 30 minutes after.
 */
const MAX = 80
const ROWS = [
  {
    label: "Before",
    from: 24,
    to: 80,
    value: "3 days–2 weeks",
    detail: "24 to 80 working hours, written and kept up by hand",
  },
  {
    label: "After",
    from: 0.5,
    to: 0.5,
    value: "Under 30 min",
    detail: "Generated from the prototype by the handoff skill",
  },
] as const

const TICKS = [
  { at: 0, label: "0" },
  { at: 40, label: "1 week" },
  { at: 80, label: "2 weeks" },
]

const pct = (hours: number) => `${(hours / MAX) * 100}%`

/**
 * Two bars on one working-hours axis. Before is a range: solid to its
 * shortest, hatched on to its longest. After is drawn true to scale, which
 * leaves it a sliver.
 */
export function TimeSavedChart() {
  return (
    <figure className="not-prose my-8 rounded-xl p-5 inset-ring-1 inset-ring-border/64">
      <figcaption className="mb-5 flex flex-col gap-1">
        <span className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Spec production time
        </span>
        <span className="font-heading text-2xl leading-tight font-medium">
          Over 99% less time per spec
        </span>
      </figcaption>

      <div className="flex flex-col gap-4">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 sm:grid-cols-[4.5rem_1fr_8rem]"
          >
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span className="text-sm tabular-nums sm:order-last">
              {row.value}
            </span>
            <div className="relative col-span-2 flex h-7 items-center sm:col-span-1">
              {/* Bigger than the bar, so the sliver can be hovered too. */}
              <span
                tabIndex={0}
                aria-label={`${row.label}: ${row.value}. ${row.detail}.`}
                className="peer absolute inset-y-0 left-0 z-10 min-w-10 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                style={{ width: pct(row.to) }}
              />
              <span
                aria-hidden
                className="h-5 shrink-0 rounded-r-[4px] bg-foreground"
                style={{ width: `max(3px, ${pct(row.from)})` }}
              />
              {row.to > row.from ? (
                <span
                  aria-hidden
                  className="ml-0.5 h-5 shrink-0 rounded-r-[4px] [background-image:repeating-linear-gradient(135deg,currentColor_0_1.5px,transparent_1.5px_5px)] text-foreground/45 inset-ring-1 inset-ring-foreground/30"
                  style={{ width: `calc(${pct(row.to - row.from)} - 2px)` }}
                />
              ) : null}
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-max max-w-64 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity duration-150 peer-hover:opacity-100 peer-focus-visible:opacity-100"
              >
                <span className="font-medium">{row.value}</span>
                <span className="block text-muted-foreground">
                  {row.detail}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* The axis, under the bars' track. */}
      <div className="mt-3 grid grid-cols-1 gap-x-3 sm:grid-cols-[4.5rem_1fr_8rem]">
        <span className="max-sm:hidden" />
        <div className="relative h-5 border-t border-line">
          {TICKS.map((tick) => (
            <span
              key={tick.at}
              className={cn(
                "absolute top-1.5 font-mono text-xs text-muted-foreground",
                tick.at === 0
                  ? "left-0"
                  : tick.at === MAX
                    ? "right-0"
                    : "-translate-x-1/2"
              )}
              style={
                tick.at > 0 && tick.at < MAX
                  ? { left: pct(tick.at) }
                  : undefined
              }
            >
              {tick.label}
            </span>
          ))}
        </div>
      </div>

      <table className="sr-only">
        <caption>Spec production time, in working hours</caption>
        <thead>
          <tr>
            <th scope="col">Process</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
