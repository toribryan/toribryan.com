"use client"

import { toast } from "sonner"

import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { DiscordIcon } from "@/components/icons"
import { DISCORD_HANDLE } from "@/features/portfolio/data/social-links"

/** Discord, as a username to copy, beside the header's social links. */
export function DiscordButton({ className }: { className?: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_HANDLE)
      toast.success(`Discord username copied: ${DISCORD_HANDLE}`)
    } catch {
      toast.error("Couldn't copy the username")
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={className}
            variant="outline"
            size="icon-sm"
            onClick={copy}
          />
        }
      >
        <DiscordIcon />
        <span className="sr-only">Copy Discord username {DISCORD_HANDLE}</span>
      </TooltipTrigger>
      <TooltipContent>Discord ({DISCORD_HANDLE})</TooltipContent>
    </Tooltip>
  )
}
