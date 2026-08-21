import { BrandMark } from "@/components/brand-mark"
import { ShaderBackground } from "@/components/ui/hero"
import { AvatarLights } from "@/features/portfolio/components/avatar-lights"
import { USER } from "@/features/portfolio/data/user"

import { AvatarLightsToggle } from "./avatar-lights-toggle"
import { FlipSentences } from "./flip-sentences"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x border-line">
      {/* The template author's interactive isometric logo sat here. It's part
          of his brand, so this is a generative WebGL field instead, with the
          mark sitting over it. */}
      <figure className="relative col-span-2 aspect-[2/1] overflow-hidden bg-zinc-950 sm:col-span-1 sm:col-start-2 sm:aspect-auto">
        <ShaderBackground className="absolute inset-0" />

        <BrandMark
          className="absolute inset-0 m-auto size-20 text-white drop-shadow-sm sm:size-24"
          aria-hidden
        />

        <figcaption className="pointer-events-none absolute right-2 bottom-2 text-sm leading-none tracking-wide text-white/70 tabular-nums select-none sm:right-4 sm:bottom-4">
          Fig. 1.
        </figcaption>
      </figure>

      <div className="flex flex-col sm:row-span-2 sm:row-start-1">
        <div className="screen-line-top mt-auto shrink-0 border-r border-line">
          <AvatarLightsToggle className="group/avatar-lights-toggle mx-0.5 my-0.75 flex outline-none">
            <AvatarLights
              className="ring-border ring-offset-background group-focus-visible/avatar-lights-toggle:ring-1 group-focus-visible/avatar-lights-toggle:ring-offset-2"
              variants={USER.avatarVariants}
            />
          </AvatarLightsToggle>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="z-1 mt-auto border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px font-heading text-[2rem]/none font-medium tracking-tight">
              {USER.displayName}
            </h1>

            <VerifiedIcon className="size-4.5 select-none" aria-hidden />
          </div>

          <FlipSentences className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            {USER.flipSentences}
          </FlipSentences>
        </div>
      </div>
    </div>
  )
}
