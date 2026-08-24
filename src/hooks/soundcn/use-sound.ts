"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"

import {
  decodeAudioData,
  getAudioContext,
  soundSource,
} from "@/lib/soundcn/sound-engine"
import type {
  SoundAsset,
  UseSoundOptions,
  UseSoundReturn,
} from "@/lib/soundcn/sound-types"

export function useSound(
  sound: SoundAsset,
  options: UseSoundOptions = {}
): UseSoundReturn {
  const {
    volume = 0.5,
    playbackRate = 1,
    interrupt = false,
    soundEnabled: _soundEnabled = true,
    onPlay,
    onEnd,
    onPause,
    onStop,
  } = options

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState<number | null>(
    sound.duration ?? null
  )
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const bufferRef = useRef<AudioBuffer | null>(null)

  const shouldReduceMotion = useReducedMotion()
  const soundEnabled = _soundEnabled && !shouldReduceMotion

  const sourceUrl = soundSource(sound)

  useEffect(() => {
    let cancelled = false
    decodeAudioData(sourceUrl).then((buffer) => {
      if (!cancelled) {
        bufferRef.current = buffer
        setDuration(buffer.duration)
      }
    })
    return () => {
      cancelled = true
    }
  }, [sourceUrl])

  const stop = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop()
      } catch {
        // Already stopped
      }
      sourceRef.current = null
    }
    setIsPlaying(false)
    onStop?.()
  }, [onStop])

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled || !bufferRef.current) return

      const ctx = getAudioContext()

      if (ctx.state === "suspended") {
        ctx.resume()
      }

      if (interrupt && sourceRef.current) {
        stop()
      }

      const source = ctx.createBufferSource()
      const gain = ctx.createGain()

      source.buffer = bufferRef.current
      source.playbackRate.value = overrides?.playbackRate ?? playbackRate
      gain.gain.value = overrides?.volume ?? volume

      source.connect(gain)
      gain.connect(ctx.destination)

      source.onended = () => {
        setIsPlaying(false)
        onEnd?.()
      }

      source.start(0)
      sourceRef.current = source
      gainRef.current = gain
      setIsPlaying(true)
      onPlay?.()
    },
    [soundEnabled, playbackRate, volume, interrupt, stop, onPlay, onEnd]
  )

  const pause = useCallback(() => {
    stop()
    onPause?.()
  }, [stop, onPause])

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume
    }
  }, [volume])

  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop()
        } catch {
          // Already stopped
        }
      }
    }
  }, [])

  return [play, { stop, pause, isPlaying, duration, sound }] as const
}
