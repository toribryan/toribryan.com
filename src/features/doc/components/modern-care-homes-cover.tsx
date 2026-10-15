"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import { ScaledStage } from "@/features/portfolio/components/components/scaled-stage"

import { CoverVideo } from "./cover-video"
import { ModernCareHomesLogo } from "./modern-care-homes-logo"

/** The recordings are 440 by 960, drawn here at a phone's width on the stage. */
const SCREEN_WIDTH = 124
const SCREEN_HEIGHT = (SCREEN_WIDTH * 960) / 440

const PHONES = [
  {
    poster: "/case-studies/cover-mobile-filters-mch.webp",
    src: "/case-studies/mobile-filters-mch.mp4",
    className: "top-[58px] left-[78px]",
  },
  {
    poster: "/case-studies/cover-home-profile-mch.webp",
    src: "/case-studies/home-profile-mobile-mch.mp4",
    start: 3,
    className: "top-[58px] right-[78px]",
  },
]

/**
 * The marketplace on two phones: the filters sheet, and a home profile's room
 * gallery, under the Modern Care Homes lockup. Each phone shows its starting
 * frame at rest and plays its recording while the card is hovered or focused,
 * or on a loop with `loop` or on a touch screen. The phones sit lower than
 * they did to clear the logo, and run off the bottom edge as before.
 */
export function ModernCareHomesCover({ loop = false }: { loop?: boolean }) {
  return (
    <div className="absolute inset-0 bg-cover-plate">
      <ScaledStage width={440} zoom>
        <div className="relative h-full">
          {/* Whose marketplace it is, over the screens it runs on. */}
          <ModernCareHomesLogo className="absolute top-[14px] left-1/2 w-[120px] -translate-x-1/2" />
          {PHONES.map(({ poster, src, start, className }) => (
            <div
              key={src}
              className={cn(
                "absolute rounded-[22px] bg-[#101114] p-[3px] shadow-[0_8px_20px_rgb(0_0_0/0.16)] ring-1 ring-white/15",
                className
              )}
            >
              <div
                className="relative overflow-hidden rounded-[19px] bg-white"
                style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
              >
                <Image
                  className="object-cover"
                  src={poster}
                  alt=""
                  fill
                  sizes="124px"
                  unoptimized
                />
                <CoverVideo
                  className="absolute inset-0 size-full object-cover"
                  src={src}
                  start={start}
                  autoplay={loop}
                />
              </div>
            </div>
          ))}
        </div>
      </ScaledStage>
    </div>
  )
}
