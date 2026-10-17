"use client"

import { useEffect, useRef, useState } from "react"
import { MaximizeIcon, PauseIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const SPEEDS = [1, 1.5, 2, 0.5]

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00"
  const whole = Math.floor(seconds)
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`
}

/**
 * A clip with an action bar: play and pause, a scrubber with the time, speed,
 * and an optional button to open it full size. The bar rises in while the
 * clip is hovered, focused or paused. The clips are silent, so there's no
 * volume.
 */
export function VideoPlayer({
  src,
  poster,
  label,
  autoPlay = true,
  loop = true,
  onExpand,
  className,
  videoClassName,
}: {
  src: string
  poster?: string
  label?: string
  autoPlay?: boolean
  loop?: boolean
  onExpand?: () => void
  className?: string
  videoClassName?: string
}) {
  const video = useRef<HTMLVideoElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(autoPlay)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [scrubbing, setScrubbing] = useState(false)

  useEffect(() => {
    const element = video.current
    if (element && element.readyState >= 1) setDuration(element.duration)
    if (element) setPlaying(!element.paused)
  }, [])

  useEffect(() => {
    if (!playing) return
    let frame = 0
    const tick = () => {
      if (video.current) setTime(video.current.currentTime)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  const toggle = () => {
    const element = video.current
    if (!element) return
    if (element.paused) element.play().catch(() => {})
    else element.pause()
  }

  const seekTo = (fraction: number) => {
    const element = video.current
    if (!element || !duration) return
    element.currentTime = Math.min(Math.max(fraction, 0), 1) * duration
    setTime(element.currentTime)
  }

  const seekFromPointer = (clientX: number) => {
    const rect = track.current?.getBoundingClientRect()
    if (rect) seekTo((clientX - rect.left) / rect.width)
  }

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]
    if (video.current) video.current.playbackRate = next
    setSpeed(next)
  }

  const progress = duration ? (time / duration) * 100 : 0

  return (
    <div
      className={cn("group/player relative overflow-hidden", className)}
      data-paused={!playing || undefined}
    >
      <video
        ref={video}
        className={cn("block w-full cursor-pointer", videoClassName)}
        src={src}
        poster={poster}
        aria-label={label}
        autoPlay={autoPlay}
        loop={loop}
        muted
        playsInline
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
      />

      <div
        className={cn(
          "absolute inset-x-2 bottom-2 flex translate-y-2 items-center gap-1 rounded-2xl bg-[#111]/60 p-1 text-white opacity-0 blur-[2px] backdrop-blur-md transition-[opacity,translate,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-xl sm:-translate-x-1/2",
          "group-focus-within/player:translate-y-0 group-focus-within/player:opacity-100 group-focus-within/player:blur-none group-hover/player:translate-y-0 group-hover/player:opacity-100 group-hover/player:blur-none group-data-paused/player:translate-y-0 group-data-paused/player:opacity-100 group-data-paused/player:blur-none",
          "motion-reduce:translate-y-0 motion-reduce:blur-none motion-reduce:transition-opacity",
          scrubbing && "translate-y-0 opacity-100 blur-none"
        )}
      >
        <BarButton label={playing ? "Pause" : "Play"} onClick={toggle}>
          {playing ? (
            <PauseIcon className="size-4 fill-current" />
          ) : (
            <PlayIcon className="size-4 fill-current" />
          )}
        </BarButton>

        <span className="w-9 shrink-0 text-right font-mono text-[11px] text-white/80 tabular-nums">
          {formatTime(time)}
        </span>

        <div
          ref={track}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(time)}
          aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
          className="group/track relative mx-1.5 flex h-6 flex-1 cursor-pointer touch-none items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            setScrubbing(true)
            seekFromPointer(event.clientX)
          }}
          onPointerMove={(event) => {
            if (scrubbing) seekFromPointer(event.clientX)
          }}
          onPointerUp={() => setScrubbing(false)}
          onPointerCancel={() => setScrubbing(false)}
          onKeyDown={(event) => {
            if (!duration) return
            const step = event.shiftKey ? 0.1 : 0.05
            if (event.key === "ArrowRight") seekTo(time / duration + step)
            else if (event.key === "ArrowLeft") seekTo(time / duration - step)
            else if (event.key === "Home") seekTo(0)
            else if (event.key === "End") seekTo(1)
            else return
            event.preventDefault()
          }}
        >
          <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/25 transition-[height] duration-150 group-hover/track:h-1.5">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </span>
          <span
            className="absolute size-3 -translate-x-1/2 scale-0 rounded-full bg-white shadow transition-transform duration-150 group-hover/track:scale-100 group-focus-visible/track:scale-100"
            style={{ left: `${progress}%` }}
          />
        </div>

        <span className="w-9 shrink-0 font-mono text-[11px] text-white/60 tabular-nums">
          {formatTime(duration)}
        </span>

        <BarButton label={`Playback speed, ${speed}x`} onClick={cycleSpeed}>
          <span className="font-mono text-[11px] tabular-nums">{speed}x</span>
        </BarButton>

        {onExpand && (
          <BarButton
            label={`Open ${label ?? "video"} full size`}
            onClick={onExpand}
          >
            <MaximizeIcon className="size-4" />
          </BarButton>
        )}
      </div>
    </div>
  )
}

function BarButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex h-8 min-w-8 shrink-0 items-center justify-center rounded-xl px-1.5 transition-[background-color,scale] duration-150 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none active:scale-90"
    >
      {children}
    </button>
  )
}
