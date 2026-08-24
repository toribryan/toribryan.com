"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import { tapSound } from "@/lib/soundcn/tap"
import { useSound } from "@/hooks/soundcn/use-sound"

/**
 * Base UI's collapsible, with one house rule: every open and every close
 * blips. Sitting on the root means anything collapsible on the site inherits
 * it — the experience rows, the awards and certifications lists, the inline
 * table of contents — without each one wiring up its own sound.
 */
function Collapsible({
  onOpenChange,
  ...props
}: CollapsiblePrimitive.Root.Props) {
  // `interrupt` so flipping several rows in a row restarts the blip rather
  // than layering copies of it.
  const [playToggle] = useSound(tapSound, { volume: 0.3, interrupt: true })

  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      {...props}
      onOpenChange={(open, eventDetails) => {
        playToggle()
        onOpenChange?.(open, eventDetails)
      }}
    />
  )
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
