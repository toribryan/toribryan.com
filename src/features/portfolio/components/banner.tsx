"use client"

import { celebrationSound } from "@/lib/soundcn/celebration"
import { notificationSound } from "@/lib/soundcn/notification"
import { isAudioReady } from "@/lib/soundcn/sound-engine"
import { useSound } from "@/hooks/soundcn/use-sound"
import { ShaderBackground } from "@/components/ui/hero"
import { haptic } from "@/registry/lib/haptic"

/**
 * The profile header's dithering field, plus what a press feels like.
 *
 * The shader owns the ripple; this owns the feedback around it. Kept apart
 * from `ShaderBackground` so that component stays a renderer with no opinion
 * about sound, and separate from `ProfileHeader` so that can stay a server
 * component: a server component can't hand a callback to a client one.
 *
 * Both signals are self-gating. `haptic()` no-ops on anything without a coarse
 * pointer, so a mouse press is silent to the hand and audible only, and
 * `useSound` goes quiet under prefers-reduced-motion. Audio needs a user
 * gesture to start, and a press is one, so the context resumes on first use
 * rather than being blocked.
 */
export function Banner({ className }: { className?: string }) {
  // `interrupt` so a run of quick presses restarts the blip instead of piling
  // copies of it on top of each other.
  const [playPress] = useSound(notificationSound, {
    volume: 0.3,
    interrupt: true,
  })
  // The sweep clip runs three seconds, so `interrupt` matters more here: a
  // second pass restarts it rather than playing over the tail of the first.
  const [playSweep] = useSound(celebrationSound, {
    volume: 0.25,
    interrupt: true,
  })

  return (
    <ShaderBackground
      className={className}
      onTap={() => {
        playPress()
        haptic()
      }}
      onSweep={() => {
        // A moving cursor is not a gesture a browser unblocks audio for, and
        // playing into a suspended context only queues the clip up to fire at
        // some later click. Skip the pass instead.
        if (!isAudioReady()) return
        playSweep()
      }}
    />
  )
}
