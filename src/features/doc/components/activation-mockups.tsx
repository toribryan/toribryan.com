"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { useAnimationsPaused } from "@/components/animations-pause"
import { LaptopMockupCard } from "@/components/mockups/laptop-mockup-card"

import { SafariFrame, SafariPhone } from "./browser-frame"

const DIR = "/case-studies/home-activation/mock"
const W = 1200
const H = 675

/**
 * A fixed 1200x675 canvas scaled to the column's width, so each scene is laid
 * out once in pixels and keeps its composition at any size. The clips inside
 * play only while the scene is in view, and not at all with reduced motion,
 * where each shows its first frame.
 */
function Scene({
  className,
  children,
  label,
}: {
  className?: string
  children: React.ReactNode
  label: string
}) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const inView = useInView(box, { amount: 0.25 })
  const paused = useAnimationsPaused()
  const reduceMotion = useReducedMotion()
  const plays = inView && !paused && !reduceMotion

  useLayoutEffect(() => {
    const element = box.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / W)
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    box.current?.querySelectorAll("video").forEach((video) => {
      if (plays) video.play().catch(() => {})
      else video.pause()
    })
  }, [plays])

  return (
    <div
      ref={box}
      role="img"
      aria-label={label}
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden rounded-xl inset-ring-1 inset-ring-black/10",
        className
      )}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
        aria-hidden
      >
        {children}
      </div>
    </div>
  )
}

/** A screen recording, muted and looping; its Scene starts and stops it. */
function Clip({ src, className }: { src: string; className?: string }) {
  return (
    <video
      src={`${DIR}/${src}.mp4`}
      className={cn("block size-full bg-white", className)}
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}

const BLUE_STAGE =
  "bg-[radial-gradient(90%_80%_at_28%_18%,#4b74f5_0%,#1747e6_42%,#0d2c9e_100%)]"
const STUDIO =
  "bg-[radial-gradient(70%_60%_at_50%_30%,#ffffff_0%,#f1f4fb_45%,#dfe5f3_100%)]"

function Phone({ clip, width }: { clip: string; width: number }) {
  return (
    <SafariPhone width={width}>
      <Clip src={clip} className="h-auto object-top" />
    </SafariPhone>
  )
}

/**
 * Scales its child to a fixed width. LaptopMockupCard sizes itself by the
 * viewport's breakpoint, so the scene measures it and scales to fit.
 */
function Fit({
  width,
  children,
}: {
  width: number
  children: React.ReactNode
}) {
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const element = inner.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setScale(width / entry.contentRect.width)
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [width])

  return (
    <div style={{ width }}>
      <div
        ref={inner}
        className="w-max origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}

function Safari({
  clip,
  width,
  className,
  style,
}: {
  clip: string
  width: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <SafariFrame size={44} className={className} style={{ width, ...style }}>
      <div className="aspect-[16/10]">
        <Clip src={clip} />
      </div>
    </SafariFrame>
  )
}

/** ActivationPanel from the product: a framed, double-bordered panel. */
function Panel({ src, width }: { src: string; width: number }) {
  return (
    <div className="rounded-[14px] border border-[#e5e7eb] bg-white p-[5px] shadow-[0_6px_14px_-10px_rgba(8,22,80,.18)]">
      <div className="overflow-hidden rounded-[9px] border border-[#e5e7eb]">
        <img
          src={`${DIR}/${src}.webp`}
          alt=""
          loading="lazy"
          draggable={false}
          className="block"
          style={{ width }}
        />
      </div>
    </div>
  )
}

export function ActivationDevices() {
  return (
    <Scene
      className={STUDIO}
      label="The flow playing on a laptop and a phone: the care step on the laptop, the care checklist being scrolled on the phone"
    >
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(transparent,rgba(190,200,225,.4))]" />
      <div className="absolute" style={{ left: 40, top: 46 }}>
        <Fit width={900}>
          <LaptopMockupCard variant="gray">
            <Clip src="care-camera" className="object-contain" />
          </LaptopMockupCard>
        </Fit>
      </div>
      <div className="absolute" style={{ left: 880, top: 120 }}>
        <Phone clip="phone-care" width={260} />
      </div>
    </Scene>
  )
}

export function ActivationSafari() {
  return (
    <Scene
      className={BLUE_STAGE}
      label="The amenities step playing in a Safari window, each amenity adding its object to the yard"
    >
      <Safari
        clip="amenities-yard"
        width={1180}
        className="absolute"
        style={{ left: 110, top: 70 }}
      />
    </Scene>
  )
}

export function ActivationPhones() {
  return (
    <Scene
      className={STUDIO}
      label="Three phones playing the flow: amenities being picked, rooms added, and a starting price typed in"
    >
      {[
        { clip: "phone-amenities", left: 140 },
        { clip: "phone-rooms", left: 457 },
        { clip: "phone-price", left: 774 },
      ].map((phone) => (
        <div
          key={phone.clip}
          className="absolute"
          style={{ left: phone.left, top: 40 }}
        >
          <Phone clip={phone.clip} width={286} />
        </div>
      ))}
    </Scene>
  )
}

function Tile({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-[20px] shadow-[0_0_0_1px_rgba(10,20,60,.06)]",
        className
      )}
    >
      {children}
    </div>
  )
}

const TINT = "bg-[radial-gradient(90%_90%_at_30%_10%,#f7f9fe,#e8edf9)]"
const BLUE_TILE =
  "bg-[radial-gradient(120%_120%_at_20%_0%,#4b74f5,#1747e6_50%,#0d2c9e)]"

export function ActivationDetails() {
  return (
    <Scene
      className="bg-[#f4f6fb]"
      label="Close-ups: the welcome house, the ADL Support checklist, the $4,200 price field, and the license search playing in a browser"
    >
      <div className="absolute inset-0 grid grid-cols-[1fr_1.2fr_1fr] grid-rows-2 gap-[14px] p-[14px]">
        <Tile className="row-span-2 bg-white">
          <img src={`${DIR}/iso-house.webp`} alt="" className="w-[88%]" />
        </Tile>
        <Tile className={TINT}>
          <Panel src="care" width={340} />
        </Tile>
        <Tile className={cn("row-span-2", TINT)}>
          <Safari
            clip="find-home"
            width={900}
            className="absolute"
            style={{ left: 28, top: 110 }}
          />
        </Tile>
        <Tile className={BLUE_TILE}>
          <Panel src="price" width={400} />
        </Tile>
      </div>
    </Scene>
  )
}

/** The Up close set: every mockup in one system of frames, playing its clips. */
export function ActivationMockups() {
  return (
    <div className="not-prose my-8 flex flex-col gap-3">
      <ActivationDevices />
      <ActivationSafari />
      <ActivationPhones />
      <ActivationDetails />
    </div>
  )
}
