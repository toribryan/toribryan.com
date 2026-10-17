"use client"

import { Fragment, useState } from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { SafariFrame } from "./browser-frame"

const DIR = "/case-studies/home-activation/step"
const MCH_BLUE = "#1747e6"

const TABS = [
  { label: "Search", video: `${DIR}/find-home.mp4` },
  {
    label: "Welcome",
    image: `${DIR}/welcome.webp`,
    alt: "Welcome screen: Let's get Sunrise Gardens in front of families, with the three phases listed beside an isometric house with a map pin",
  },
  {
    label: "Confirm",
    image: `${DIR}/confirm.webp`,
    alt: "Confirm screen: Is this your home? Name, address, care type, capacity and license pulled from the Arizona record",
  },
]

/** The first three screens of the flow, one at a time, picked by tab. */
export function ActivationFindHome() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-line bg-card">
      <div
        role="tablist"
        aria-label="Find your home screens"
        className="flex items-center gap-3 border-b border-line px-4 pt-3.5 sm:px-6"
      >
        {TABS.map((item, index) => {
          const current = index === active
          return (
            <Fragment key={item.label}>
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
                  "-mb-px cursor-pointer border-b-2 pb-2.5 text-[13px] transition-colors hover:text-foreground",
                  current
                    ? "font-medium text-foreground"
                    : "border-transparent text-muted-foreground"
                )}
                style={current ? { borderColor: MCH_BLUE } : undefined}
              >
                {item.label}
              </button>
            </Fragment>
          )
        })}
      </div>
      <div role="tabpanel" aria-label={tab.label} className="p-4 sm:p-6">
        <SafariFrame size={30}>
          {tab.video ? (
            <video
              key={tab.video}
              className="block aspect-[2100/1312] w-full object-cover object-top"
              src={tab.video}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              key={tab.image}
              className="block aspect-[2100/1312] w-full object-cover object-top"
              src={tab.image}
              alt={tab.alt}
            />
          )}
        </SafariFrame>
      </div>
    </figure>
  )
}
