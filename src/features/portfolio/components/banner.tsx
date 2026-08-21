"use client"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { ShaderBackground } from "@/components/ui/hero"
import { haptic } from "@/registry/lib/haptic"

/**
 * The profile header's dithering field, plus what a tap feels like.
 *
 * The shader owns the ripple; this owns the feedback around it. Kept apart
 * from `ShaderBackground` so that component stays a renderer with no opinion
 * about sound, and separate from `ProfileHeader` so that can stay a server
 * component — a server component can't hand a callback to a client one.
 *
 * Both signals are self-gating: `haptic()` no-ops on anything without a coarse
 * pointer, and `useSound` goes quiet under prefers-reduced-motion. Audio needs
 * a user gesture to start, and a tap is one, so the context resumes on first
 * use rather than being blocked.
 */
export function Banner({ className }: { className?: string }) {
  const [playClick] = useClickSound()

  return (
    <ShaderBackground
      className={className}
      onTap={() => {
        playClick()
        haptic()
      }}
    />
  )
}
