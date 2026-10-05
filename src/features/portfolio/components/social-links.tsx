import { addQueryParams } from "@/utils/url"
import { FileTextIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { ResumeMenu } from "@/components/resume-menu"
import { DiscordButton } from "@/features/portfolio/components/discord-button"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"

const BUTTON =
  "text-foreground/80 shadow-none [&_svg:not([class*='size-'])]:size-4.5"

/**
 * The resume, then the social profiles, as icon buttons, then Discord as a
 * username to copy. The resume opens the same menu of formats as the footer. LinkedIn sits in the overview instead,
 * as a line of its own.
 */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Social links"
    >
      <li>
        <Tooltip>
          <ResumeMenu
            side="bottom"
            align="start"
            render={
              <TooltipTrigger
                render={
                  <Button className={BUTTON} variant="outline" size="icon-sm" />
                }
              />
            }
          >
            <FileTextIcon />
          </ResumeMenu>
          <TooltipContent>Resume</TooltipContent>
        </Tooltip>
      </li>

      {SOCIAL_LINKS.filter((item) => item.name !== "linkedin").map((item) => (
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
      ))}

      <li>
        <DiscordButton className={BUTTON} />
      </li>
    </ul>
  )
}
