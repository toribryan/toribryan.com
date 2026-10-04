"use client"

import { createContext, useContext, type ReactNode } from "react"
import { atom, useAtom, useAtomValue } from "jotai"
import { PauseIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/base/ui/button"

/**
 * One pause for every looping cover on the site, so a reader who stops them
 * in one section finds them stopped in the next and on the next page. It
 * lives in memory, so it lasts until a reload.
 */
const animationsPausedAtom = atom(false)

const PauseExempt = createContext(false)

/**
 * Keeps the covers below it playing whatever the pause says, for a page with
 * no toggle on it, where a pause set elsewhere couldn't be undone.
 */
export function AnimationsPauseExempt({ children }: { children: ReactNode }) {
  return <PauseExempt.Provider value>{children}</PauseExempt.Provider>
}

/**
 * Whether the reader has paused the covers. A paused cover stops playing on
 * its own but still plays while its card is hovered or focused, since the
 * reader asked for that.
 */
export function useAnimationsPaused() {
  const paused = useAtomValue(animationsPausedAtom)
  const exempt = useContext(PauseExempt)
  return paused && !exempt
}

/**
 * Stops every looping cover, since they otherwise loop for as long as
 * they're on screen. Under reduced motion nothing loops, so it hides.
 */
export function AnimationsPauseToggle({ className }: { className?: string }) {
  const [paused, setPaused] = useAtom(animationsPausedAtom)
  return (
    <Button
      size="icon-sm"
      variant="ghost"
      className={cn("text-muted-foreground motion-reduce:hidden", className)}
      aria-label="Pause animations"
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
    >
      {paused ? <PlayIcon /> : <PauseIcon />}
    </Button>
  )
}
