import Image from "next/image"

import { TextScramble } from "@/components/ui/text-scramble"
import { USER } from "@/features/portfolio/data/user"

import { SocialLinks } from "./social-links"
import { VerifiedIcon } from "./verified-icon"

/** Avatar, name, and role: the first block under the site header. */
export function ProfileHeader() {
  return (
    <div className="screen-line-top relative border-x border-line">
      {/* The screen-wide bottom line. Elsewhere two panels' lines overlap at
          each seam, so it's layered twice to match. */}
      <div className="pointer-events-none absolute bottom-0 left-[-100vw] z-11 h-px w-[200vw] bg-line bg-[linear-gradient(var(--color-line),var(--color-line))]" />

      <div className="grid grid-cols-[auto_1fr]">
        <div className="flex items-center border-r border-line">
          <div className="mx-0.5 my-0.75 flex">
            <Image
              className="size-25 rounded-full object-cover select-none min-[22.5rem]:size-30 min-[23.4375rem]:size-34 sm:size-35"
              src={USER.headshot}
              alt={USER.displayName}
              width={400}
              height={400}
              priority
              unoptimized
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 py-1.5 pl-4">
            <h1 className="translate-y-0.5 font-heading text-[2rem]/9 font-medium tracking-normal">
              {USER.displayName}
            </h1>
            <VerifiedIcon className="size-5 select-none" aria-hidden />
            {/* A scrawled aside in Hello Scratchy's hollow cut: the doodle "I" is its
                left arrow, pointing back at the name. */}
            <span
              className="ml-2 hidden translate-y-1 -rotate-4 items-center gap-1 font-accent-outline text-2xl/none text-muted-foreground select-none sm:inline-flex"
              aria-hidden
            >
              <span className="font-doodle text-4xl/none">I</span>
              Hi there!
            </span>
          </div>

          <div className="flex flex-col gap-0.5 border-t border-line py-1.5 pl-4 font-sans text-sm font-normal text-balance text-muted-foreground sm:text-[0.9375rem]">
            {USER.headerLines.map((line, index) => (
              <TextScramble key={line} delay={0.2 + index * 0.3}>
                {line}
              </TextScramble>
            ))}
          </div>

          <SocialLinks className="border-t border-line py-2 pl-4" />
        </div>
      </div>
    </div>
  )
}
