"use client"

import type { Event } from "@/lib/events"
import { trackEvent } from "@/lib/events"
import { toggleOnSound } from "@/lib/soundcn/toggle-on"
import { useSound } from "@/hooks/soundcn/use-sound"
import type { CopyButtonProps } from "@/registry/transformed/components/copy-button"
import { CopyButton as CopyButtonPrimitive } from "@/registry/transformed/components/copy-button"

/**
 * The site's copy button: the registry primitive plus the two things every
 * copy on the site should do — sound the confirmation blip and, when the
 * caller names an event, report it.
 *
 * `onCopySuccess` is composed rather than passed through, so a caller can add
 * its own follow-up without silencing either of those.
 */
export function CopyButton({
  size = "icon-sm",
  event,
  onCopySuccess,
  ...props
}: CopyButtonProps & {
  event?: Event["name"]
}) {
  // `interrupt` so copying twice in a row restarts the blip instead of
  // layering a second one over it.
  const [playCopy] = useSound(toggleOnSound, { volume: 0.3, interrupt: true })

  return (
    <CopyButtonPrimitive
      variant="secondary"
      size={size}
      {...props}
      onCopySuccess={(copiedValue) => {
        playCopy()

        if (event) {
          trackEvent({
            name: event,
            properties: {
              code: copiedValue,
            },
          })
        }

        onCopySuccess?.(copiedValue)
      }}
    />
  )
}
