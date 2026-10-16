"use client"

import { DM_Sans } from "next/font/google"
import {
  BedSingleIcon,
  InfoIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ScaledStage } from "@/features/portfolio/components/components/scaled-stage"

import { SafariPhone } from "./browser-frame"

/** The Manage dashboard's own face. */
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] })

const PHONE_W = 250
const GAP = 40
/** The dashboard screens are laid out at a phone's 390px and zoomed to fit. */
const SCREEN_ZOOM = (PHONE_W - 7) / 390
const BLUE = "#1747e6"
const TABS = ["Availability", "Photos", "About", "Amenities"]
const DETAILS = ["Private room", "Private bathroom", "Furnished"]
const ROOMS = [
  { name: "Deluxe Bedroom", open: false },
  { name: "Garden Suite", open: true },
  { name: "Premium Balcony Room", open: true },
]

/** The dashboard's header and section tabs, at the top of each screen. */
function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(dmSans.className, "bg-white text-[#14151a]")}
      style={{ width: 390, zoom: SCREEN_ZOOM }}
    >
      <div className="flex items-center gap-3 px-6 pt-4 pb-3 text-[17px]">
        <PanelLeftIcon className="size-5" strokeWidth={1.75} />
        <span className="flex-1">Home Details</span>
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
      <div className="px-4 pb-10">{children}</div>
    </div>
  )
}

/** Availability before any rooms are added, drawn from the shipped markup. */
function EmptyRooms() {
  return (
    <Dashboard>
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
            <span className="flex-1 text-[15px] font-medium">Garden Room</span>
            <span
              className="flex h-[22px] w-[38px] items-center justify-end rounded-full p-[3px]"
              style={{ background: BLUE }}
            >
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
        <span
          className="flex h-11 items-center justify-center gap-1.5 rounded-full text-[16px] font-medium text-white"
          style={{ background: BLUE }}
        >
          <PlusIcon className="size-4" strokeWidth={2.25} />
          Add
        </span>
      </div>
      <p className="mt-4 flex items-center gap-2 rounded-md bg-[#f2f3f5] px-4 py-2.5 text-[14px] text-[#4b4f5c]">
        <InfoIcon className="size-4 shrink-0" strokeWidth={1.75} />
        Until you add rooms, the home will be set to unavailable.
      </p>
    </Dashboard>
  )
}

/** Availability once rooms are added, as the shipped page draws it on a phone. */
function RoomList() {
  return (
    <div className="relative h-full">
      <Dashboard>
        <div className="flex items-start justify-between gap-3">
          <p className="text-[26px] leading-tight font-bold">Availability</p>
          <span className="mt-1 rounded-full bg-[#f2f3f5] px-2.5 py-1 text-[13px] text-[#4b4f5c]">
            Last confirmed 3 days ago
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-[1.45] text-[#5f6472]">
          Families see open rooms on your listing and in search.
        </p>
        <div className="mt-6 rounded-2xl border border-[#e3e5ea]">
          <div className="flex items-center gap-2 border-b border-[#e3e5ea] px-4 py-3">
            <span className="text-[17px] font-medium">Rooms</span>
            <span className="flex-1 text-[14px] text-[#5f6472]">
              2 of 3 rooms open
            </span>
            <span className="flex items-center gap-1 rounded-full border border-[#c9ccd4] px-3 py-1 text-[14px]">
              <PlusIcon className="size-3.5" strokeWidth={2} />
              Add room
            </span>
          </div>
          <div className="flex flex-col gap-3 p-4">
            {ROOMS.map(({ name, open }) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-xl border border-[#e3e5ea] px-4 py-3.5 shadow-[0_1px_2px_rgb(0_0_0/0.05)]"
              >
                <span className="grid size-7 place-items-center rounded-full bg-[#f2f3f5] text-[#8a8f9c]">
                  <BedSingleIcon className="size-4" strokeWidth={1.75} />
                </span>
                <span className="flex-1 text-[16px] font-medium">{name}</span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[13px]",
                    open
                      ? "bg-[#22ba4e] text-white"
                      : "bg-[#f2f3f5] text-[#5f6472]"
                  )}
                >
                  {open ? "Available" : "Unavailable"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Dashboard>
      <span
        className={cn(
          dmSans.className,
          "absolute right-[9px] bottom-[10px] flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[15px] font-medium text-white"
        )}
        style={{ background: BLUE, zoom: SCREEN_ZOOM }}
      >
        <BedSingleIcon className="size-4" strokeWidth={1.75} />
        Update Availability
      </span>
    </div>
  )
}

const PHONES = [
  {
    key: "amenities",
    screen: (
      <img
        className="block w-full"
        src="/case-studies/home-activation/phone-amenities.webp"
        alt=""
        draggable={false}
      />
    ),
  },
  { key: "empty", screen: <EmptyRooms /> },
  { key: "rooms", screen: <RoomList /> },
]

/**
 * Three phones in mobile Safari: the amenities step of onboarding, then the
 * Manage dashboard once the home is live, before and after its rooms are
 * added.
 */
export function HomeListingOnboardingCover() {
  const left = (1200 - PHONES.length * PHONE_W - (PHONES.length - 1) * GAP) / 2

  return (
    <div className="absolute inset-0 bg-[#eef2fb] dark:bg-[#141a2b]">
      <ScaledStage width={1200} zoom>
        <div className="relative h-full">
          {PHONES.map(({ key, screen }, index) => (
            <SafariPhone
              key={key}
              width={PHONE_W}
              className="absolute top-[56px] drop-shadow-[0_18px_28px_rgb(15_30_80/0.16)]"
              style={{ left: left + index * (PHONE_W + GAP) }}
            >
              {screen}
            </SafariPhone>
          ))}
        </div>
      </ScaledStage>
    </div>
  )
}
