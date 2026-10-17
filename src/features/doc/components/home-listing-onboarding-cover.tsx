"use client"

import { ScaledStage } from "@/features/portfolio/components/components/scaled-stage"

import { SafariPhone } from "./browser-frame"

const DIR = "/case-studies/home-activation"
const PHONE_W = 250
/** The yard is drawn on near-white; the plate matches it so the edges vanish. */
const PLATE = "#fdfdfd"

/**
 * The finished care yard, every service placed, beside the flow's first
 * screen on a phone: the welcome, the house and the license search.
 */
export function HomeListingOnboardingCover() {
  return (
    <div className="absolute inset-0" style={{ background: PLATE }}>
      <ScaledStage width={1200} zoom>
        <div className="relative h-full">
          <img
            className="absolute top-[34px] left-[-10px] w-[900px]"
            src={`${DIR}/care-yard-build-poster.webp`}
            alt=""
            draggable={false}
          />
          <SafariPhone
            width={PHONE_W}
            className="absolute top-[56px] left-[910px] drop-shadow-[0_18px_28px_rgb(15_30_80/0.16)]"
          >
            <img
              className="block w-full"
              src={`${DIR}/mock/phone-find-your-home.webp`}
              alt=""
              draggable={false}
            />
          </SafariPhone>
        </div>
      </ScaledStage>
    </div>
  )
}
