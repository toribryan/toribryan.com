"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/fibo/avatar"
import { Badge } from "@/components/fibo/badge"
import { StatusDot } from "@/components/fibo/status-dot"
import { StickerAvatar } from "@/components/fibo/sticker-avatar"

import { AnatomyMap, type Callout } from "../components/anatomy-map"
import { BONZO } from "./sticker-avatar-data"

const STATUSES = ["present", "away", "offline"] as const
const SIZES = ["xs", "sm", "default", "lg"] as const

export function Default() {
  return <StatusDot status="present" />
}

export function Statuses() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {STATUSES.map((status) => (
        <span key={status} className="flex items-center gap-2 text-sm">
          <StatusDot status={status} label={null} />
          <span className="capitalize">{status}</span>
        </span>
      ))}
    </div>
  )
}

export function Mono() {
  return (
    <div className="flex items-center gap-4">
      {STATUSES.map((status) => (
        <StatusDot key={status} status={status} variant="mono" />
      ))}
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex items-end gap-4">
      {SIZES.map((size) => (
        <StatusDot key={size} status="present" size={size} />
      ))}
    </div>
  )
}

export function OnAvatars() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={BONZO} alt="Bonzo" />
          <AvatarFallback>BO</AvatarFallback>
          <StatusDot status="present" />
        </Avatar>
      ))}
      <StickerAvatar name="Bonzo" src={BONZO} size={56}>
        <StatusDot status="away" />
      </StickerAvatar>
    </div>
  )
}

export function InABadge() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* The badge's text already says the status, so the dot stays quiet. */}
      <Badge variant="outline">
        <StatusDot status="present" label={null} />
        Online
      </Badge>
      <Badge variant="outline">
        <StatusDot status="away" label={null} />
        Away
      </Badge>
      <Badge variant="outline">
        <StatusDot status="offline" label={null} />
        Offline
      </Badge>
    </div>
  )
}

export function DoSilence() {
  return (
    <span className="flex items-center gap-2 text-sm">
      <StatusDot status="away" label={null} />
      Away
    </span>
  )
}

export function DontSpeakTwice() {
  return (
    <span className="flex items-center gap-2 text-sm">
      <StatusDot status="away" />
      Away
    </span>
  )
}

const dot = (root: HTMLElement) => root.querySelector("[data-slot=status-dot]")

const PARTS: Callout[] = [
  {
    label: "Disc",
    side: "left",
    find: (root) => dot(root)?.querySelector("circle"),
  },
  {
    label: "Mark",
    side: "right",
    find: (root) => dot(root)?.querySelectorAll("circle")[1],
  },
]

/** A large away dot, with the disc and the mark labeled. */
export function Anatomy() {
  return (
    <AnatomyMap callouts={PARTS}>
      <div className="flex justify-center px-10 py-12">
        <div data-anatomy-subject>
          <StatusDot status="away" className="size-16" />
        </div>
      </div>
    </AnatomyMap>
  )
}
