"use client"

import { DM_Sans } from "next/font/google"
import { InfoIcon, PanelLeftIcon, PlusIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScaledStage } from "@/features/portfolio/components/components/scaled-stage"

import { SafariPhone } from "./browser-frame"

/** The Manage dashboard's own face. */
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] })

const PHONE_W = 250
/** The dashboard screen is laid out at a phone's 390px and zoomed to fit. */
const SCREEN_ZOOM = (PHONE_W - 7) / 390
const TABS = ["Availability", "Photos", "About", "Amenities"]
const DETAILS = ["Private room", "Private bathroom", "Furnished"]

/**
 * The Manage dashboard's Availability page on a phone before any rooms are
 * added, drawn from its markup since there is no mobile frame of it.
 */
function EmptyRooms() {
  return (
    <div
      className={cn(dmSans.className, "bg-white text-[#14151a]")}
      style={{ width: 390, zoom: SCREEN_ZOOM }}
    >
      <div className="flex items-center gap-3 px-6 pt-4 pb-3 text-[17px]">
        <PanelLeftIcon className="size-5" strokeWidth={1.75} />
        <span className="flex-1">Availability</span>
        <SearchIcon className="size-5" strokeWidth={1.75} />
      </div>
      <div className="flex gap-2 overflow-hidden px-4 pb-6 text-[15px]">
        {TABS.map((tab, index) => (
          <span
            key={tab}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5",
              index === 0
                ? "border-[#14151a] bg-[#14151a] text-white"
                : "border-[#d9dbe1] text-[#4b4f5c]"
            )}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="px-4">
        <div className="flex flex-col gap-5 rounded-2xl border border-[#e3e5ea] px-5 py-7">
          <div className="flex flex-col gap-2">
            <p className="text-[22px] font-bold">Add your first room</p>
            <p className="text-[15px] leading-[1.45] text-[#5f6472]">
              Families filter by room type, bathroom, and furnishing. Rooms you
              add show here, and you can open or close each one.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 rounded-lg border border-dashed border-[#c9ccd4] p-4 opacity-70">
            <div className="flex items-center gap-2">
              <span className="flex-1 text-[15px] font-medium">
                Garden Room
              </span>
              <span className="flex h-[22px] w-[38px] items-center justify-end rounded-full bg-[#1747e6] p-[3px]">
                <span className="size-4 rounded-full bg-white" />
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DETAILS.map((detail) => (
                <span
                  key={detail}
                  className="rounded-full border border-[#d9dbe1] px-2.5 py-0.5 text-[13px] text-[#4b4f5c]"
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>
          <span className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#1747e6] text-[16px] font-medium text-white">
            <PlusIcon className="size-4" strokeWidth={2.25} />
            Add
          </span>
        </div>
        <p className="mt-4 mb-10 flex items-center gap-2 rounded-md bg-[#f2f3f5] px-4 py-2.5 text-[14px] text-[#4b4f5c]">
          <InfoIcon className="size-4 shrink-0" strokeWidth={1.75} />
          Until you add rooms, the home will be set to unavailable.
        </p>
      </div>
    </div>
  )
}

/**
 * Two phones in mobile Safari: the amenities step of onboarding, and the
 * Manage dashboard waiting for its first room once the home is live.
 */
export function HomeListingOnboardingCover() {
  return (
    <div className="absolute inset-0 bg-[#eef2fb] dark:bg-[#141a2b]">
      <ScaledStage width={1200} zoom>
        <div className="relative h-full">
          <SafariPhone
            width={PHONE_W}
            className="absolute top-[56px] right-[620px] drop-shadow-[0_18px_28px_rgb(15_30_80/0.16)]"
          >
            <img
              className="block w-full"
              src="/case-studies/home-activation/phone-amenities.webp"
              alt=""
              draggable={false}
            />
          </SafariPhone>
          <SafariPhone
            width={PHONE_W}
            className="absolute top-[56px] left-[620px] drop-shadow-[0_18px_28px_rgb(15_30_80/0.16)]"
          >
            <EmptyRooms />
          </SafariPhone>
        </div>
      </ScaledStage>
    </div>
  )
}
