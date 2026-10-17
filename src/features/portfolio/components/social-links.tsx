import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { DiscordButton } from "@/features/portfolio/components/discord-button"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import {
  SOCIAL_LINKS,
  type SocialName,
} from "@/features/portfolio/data/social-links"

const BUTTON =
  "text-foreground/80 shadow-none [&_svg:not([class*='size-'])]:size-4.5"

// Profiles the overview already lists as lines of their own.
const IN_OVERVIEW: SocialName[] = ["linkedin", "github"]

/**
 * The career index first, then the social profiles, as icon buttons, then
 * Discord as a username to copy. LinkedIn and GitHub sit in the overview
 * instead, as lines of their own; the resume lives in the footer.
 */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Social links"
    >
      {SOCIAL_LINKS.filter((item) => !IN_OVERVIEW.includes(item.name)).map(
        (item) => (
          <li key={item.name}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className={BUTTON}
                    variant="outline"
                    size="icon-sm"
                    nativeButton={false}
                    render={
                      <a
                        href={addQueryParams(item.href, UTM_PARAMS)}
                        target="_blank"
                        rel="noopener"
                      >
                        {SOCIAL_ICONS[item.name]}
                        <span className="sr-only">{item.title}</span>
                      </a>
                    }
                  />
                }
              />
              <TooltipContent>
                {item.title} ({item.handle})
              </TooltipContent>
            </Tooltip>
          </li>
        )
      )}

      <li>
        <DiscordButton className={BUTTON} />
      </li>
    </ul>
  )
}
