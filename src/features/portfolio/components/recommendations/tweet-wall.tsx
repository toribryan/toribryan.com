import { BadgeCheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import {
  TWEETS,
  type QuotedPost,
  type Tweet,
} from "@/features/portfolio/data/tweets"
import { USER } from "@/features/portfolio/data/user"

/** The posts as X draws them: who, then what, with a quoted post inside. */
export function TweetWall() {
  return (
    <div className="grid items-start gap-4 p-4 sm:grid-cols-2">
      {TWEETS.map((tweet) => (
        <Post key={tweet.handle} tweet={tweet} />
      ))}
    </div>
  )
}

function Post({ tweet }: { tweet: Tweet }) {
  const profile = `https://x.com/${tweet.handle}`
  // A post that's only an emoji or two reads as a reaction, so it's drawn big.
  const reaction = [...tweet.text].length <= 3

  return (
    <figure className="relative flex flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground shadow-xs">
      <figcaption className="flex items-center gap-3 pr-8">
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-w-0 items-center gap-3"
        >
          <img src={tweet.avatar} alt="" className="size-11 rounded-full" />
          <span className="flex min-w-0 flex-col">
            <cite className="flex items-center gap-1 font-semibold not-italic group-hover:underline">
              {tweet.name}
              {tweet.verified && (
                <BadgeCheckIcon
                  aria-label="Verified"
                  className="size-4 shrink-0 fill-info text-card"
                />
              )}
            </cite>
            <span className="text-sm text-muted-foreground">
              @{tweet.handle}
            </span>
          </span>
        </a>
      </figcaption>

      <a
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${tweet.name} on X`}
        className="absolute top-5 right-5 text-foreground transition-opacity hover:opacity-70 [&_svg]:size-4"
      >
        {SOCIAL_ICONS.x}
      </a>

      <blockquote className="flex flex-col gap-3">
        {tweet.replyingTo && (
          <p className="text-sm text-muted-foreground">
            Replying to{" "}
            <a
              href={`https://x.com/${tweet.replyingTo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-info hover:underline"
            >
              @{tweet.replyingTo}
            </a>
          </p>
        )}
        <p
          className={cn(
            "text-pretty",
            reaction ? "text-4xl leading-none" : "text-base/relaxed"
          )}
        >
          {tweet.text}
        </p>
        {tweet.quoting && <Quoted post={tweet.quoting} />}
      </blockquote>
    </figure>
  )
}

/** The quoted post, Tori's own, nested the way X nests it. */
function Quoted({ post }: { post: QuotedPost }) {
  const { handle, href } = SOCIAL.x

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border p-3 text-sm">
      <p className="flex min-w-0 items-center gap-1.5">
        <img src={USER.headerAvatar} alt="" className="size-5 rounded-full" />
        <span className="font-semibold">{USER.displayName}</span>
        <span className="truncate text-muted-foreground">
          <a href={href} target="_blank" rel="noopener noreferrer">
            @{handle}
          </a>{" "}
          · {post.date}
        </span>
      </p>
      <p className="text-pretty">
        {post.text}{" "}
        <a
          href={post.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-info hover:underline"
        >
          {post.link.label}
        </a>
      </p>
    </div>
  )
}
