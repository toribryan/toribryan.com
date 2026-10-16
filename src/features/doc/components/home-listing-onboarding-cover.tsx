"use client"

import { cn } from "@/lib/utils"
import { ScaledStage } from "@/features/portfolio/components/components/scaled-stage"

import { SafariPhone } from "./browser-frame"

const DIR = "/case-studies/home-activation"

const PHONES = [
  { src: "phone-welcome", width: 196, className: "top-[112px] left-[234px]" },
  { src: "phone-review", width: 196, className: "top-[112px] right-[234px]" },
  {
    src: "phone-care",
    width: 230,
    className: "top-[76px] left-1/2 z-10 -translate-x-1/2",
  },
]

/**
 * The flow on three phones in mobile Safari, the same mockups as the case
 * study's step-through: welcome, the care step in front, and the review.
 */
export function HomeListingOnboardingCover() {
  return (
    <div className="absolute inset-0 bg-[#eef2fb] dark:bg-[#141a2b]">
      <ScaledStage width={1200} zoom>
        <div className="relative h-full">
          {PHONES.map(({ src, width, className }) => (
            <SafariPhone
              key={src}
              width={width}
              className={cn(
                "absolute drop-shadow-[0_18px_28px_rgb(15_30_80/0.16)]",
                className
              )}
            >
              <img
                className="block w-full"
                src={`${DIR}/${src}.webp`}
                alt=""
                draggable={false}
              />
            </SafariPhone>
          ))}
        </div>
      </ScaledStage>
    </div>
  )
}
