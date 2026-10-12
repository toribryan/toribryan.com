import { BadgeCheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { TWEETS, type Tweet } from "@/features/portfolio/data/tweets"

/** The posts as staggered cards on the page's grid, each one marked at its corner. */
export function TweetWall() {
  return (
    <div className="grid gap-10 px-8 pt-10 pb-12 sm:grid-cols-2 sm:gap-8 sm:pb-20">
      {TWEETS.map((tweet, index) => (
        <TweetFigure
          key={tweet.handle}
          tweet={tweet}
          className={cn(index % 2 === 1 && "sm:translate-y-8")}
        />
      ))}
    </div>
  )
}

function TweetFigure({
  tweet,
  className,
}: {
  tweet: Tweet
  className?: string
}) {
  const profile = `https://x.com/${tweet.handle}`
  // A post that's only an emoji or two reads as a reaction, so it's drawn big.
  const reaction = [...tweet.text].length <= 3

  return (
    <figure
      className={cn(
        "relative flex flex-col justify-between gap-6 bg-background p-6",
        className
      )}
    >
      <div aria-hidden className="absolute -inset-y-3 -left-px w-px bg-line" />
      <div aria-hidden className="absolute -inset-y-3 -right-px w-px bg-line" />
      <div aria-hidden className="absolute -inset-x-3 -top-px h-px bg-line" />
      <div
        aria-hidden
        className="absolute -inset-x-3 -bottom-px h-px bg-line"
      />
      <Crosshair />

      <a
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${tweet.name} on X`}
        className="absolute top-5 right-5 text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-4"
      >
        {SOCIAL_ICONS.x}
      </a>

      <blockquote>
        <p
          className={cn(
            "text-pretty",
            reaction ? "text-5xl leading-none" : "text-base/relaxed"
          )}
        >
          {tweet.text}
        </p>
      </blockquote>

      <figcaption className="flex flex-col gap-3">
        <a
          href={tweet.context.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit font-mono text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          {tweet.context.label}
        </a>
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-fit items-center gap-3"
        >
          <img
            src={tweet.avatar}
            alt=""
            className="size-10 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background transition-shadow group-hover:ring-muted-foreground"
          />
          <span className="flex flex-col">
            <cite className="flex items-center gap-1 text-sm font-medium not-italic">
              {tweet.name}
              {tweet.verified && (
                <BadgeCheckIcon
                  aria-label="Verified"
                  className="size-3.5 text-info"
                />
              )}
            </cite>
            <span className="text-xs text-muted-foreground">
              @{tweet.handle}
            </span>
          </span>
        </a>
      </figcaption>
    </figure>
  )
}

function Crosshair() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className="pointer-events-none absolute top-0 left-0 z-1 size-3.5 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] text-muted-foreground"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
