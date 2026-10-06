"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import { DuoScreenCapture, type DuoScreenImages } from "./iphone-duo-screens"

// WebGL, and a 4.8 MB model, so it loads on this page alone and only in the
// browser.
const IphoneDuoMockup = dynamic(() => import("./iphone-duo-mockup"), {
  ssr: false,
})

/**
 * The foldable on its project page: drag to turn it, scroll or pinch to
 * zoom, and fold it with the button or the slider. The inner display shows
 * fibo's Calendar as a month of event cards; the cover shows it as it looks
 * on a phone, dots and the picked day's agenda.
 */
export function IphoneDuoProjectHero() {
  const [screens, setScreens] = useState<
    (DuoScreenImages & { version: number }) | null
  >(null)

  return (
    <div className="w-full">
      <DuoScreenCapture
        onCapture={(images) =>
          setScreens((previous) => ({
            ...images,
            version: (previous?.version ?? 0) + 1,
          }))
        }
      />
      <div className="aspect-4/3 w-full sm:aspect-960/680">
        <IphoneDuoMockup
          ariaLabel="Foldable phone"
          screenLabel="fibo's Calendar for October, a month of events on the inner display and the 14th's agenda on the cover"
          image={screens ? { src: screens.inner } : undefined}
          outerImage={screens ? { src: screens.cover } : undefined}
          contentKey={screens?.version}
          initialFold={70}
          deviceScale={1.15}
          textColor="var(--foreground)"
          surface="color-mix(in oklab, var(--foreground) 4%, transparent)"
          loadingColor="var(--muted-foreground)"
          padding="16px 16px 0"
        />
      </div>
    </div>
  )
}
