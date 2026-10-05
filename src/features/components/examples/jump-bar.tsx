"use client"

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { SendIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/fibo/button"
import { Input } from "@/components/fibo/input"
import {
  JumpBar,
  jumpTo,
  useAtBottom,
  type JumpBarProps,
} from "@/components/fibo/jump-bar"
import { TypingIndicator } from "@/components/fibo/typing-indicator"

import { AnatomyMap, slot, type Callout } from "../components/anatomy-map"

const SINCE = new Date(2026, 9, 1, 15, 42)

/** The frame fibo's stories give a bar: a relative box, as over a conversation. */
function Frame({
  className = "h-32 w-96",
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "relative max-w-full overflow-hidden rounded-xl border border-line bg-card",
        className
      )}
    >
      {children}
    </div>
  )
}

function Bar(props: JumpBarProps) {
  return (
    <Frame>
      <JumpBar {...props} />
    </Frame>
  )
}

export function Default() {
  return <Bar type="unread-above" count={12} since={SINCE} />
}

export function NewBelow() {
  return <Bar type="new-below" count={3} />
}

export function Capped() {
  return <Bar type="new-below" count={128} />
}

export function History() {
  return <Bar type="history" />
}

export function DoCount() {
  return (
    <Frame className="h-16 w-64">
      <JumpBar type="new-below" count={3} />
    </Frame>
  )
}

export function DontHideCount() {
  return (
    <Frame className="h-16 w-64">
      <JumpBar
        type="new-below"
        count={3}
        strings={{ newBelow: () => "Scroll down" }}
      />
    </Frame>
  )
}

const ME = "me"

const PEOPLE: Record<string, { id: string; name: string }> = {
  ana: { id: "ana", name: "Ana Ruiz" },
  ben: { id: "ben", name: "Ben Okafor" },
  me: { id: ME, name: "You" },
}

const LINES = [
  ["ana", "Morning. Status tokens are up for review."],
  ["ben", "Looking now."],
  ["ben", "Warning reads a bit dark on cards."],
  ["ana", "It's the 700 step so it clears AA at badge size."],
  ["me", "Makes sense to me."],
  ["ben", "Fine by me too."],
  ["ana", "Next up: the chat timeline."],
  ["ana", "Typing indicator is in review."],
  ["ben", "Message list after that?"],
  ["ana", "Yes, stacked on it."],
  ["me", "I'll take the jump bar."],
  ["ben", "Does the divider move as you read?"],
  ["me", "No, it stays where it was when you opened the channel."],
  ["ana", "Like Discord's red line."],
  ["ben", "And Esc marks it read?"],
  ["me", "Esc, sending a message, or the button."],
  ["ana", "Lunch?"],
  ["ben", "Ten minutes."],
  ["ana", "Pushed the divider styles."],
  ["ben", "The New label is a nice touch."],
  ["ana", "Colour alone wasn't enough."],
  ["ben", "Checked it in dark mode too."],
  ["ana", "Merging after the review."],
  ["ben", "Ship it."],
] as const

const FIRST_UNREAD = 16

type Message = { id: string; author: string; sentAt: Date; content: string }

const HISTORY: Message[] = LINES.map(([who, text], i) => ({
  id: `m${i}`,
  author: who,
  sentAt: new Date(2026, 9, 1, 9, i * 3),
  content: text,
}))

const REPLIES = [
  "One more thing on the tokens.",
  "Never mind, found it.",
  "Back after the standup.",
]

const time = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "2-digit",
})

/**
 * A plain stand-in for fibo's Message list, which this site doesn't install:
 * each message is an article the bars can jump to, with an unread divider
 * labeled "New" so the marker isn't colour alone.
 */
function Messages({
  messages,
  unreadFrom,
  onKeyDown,
}: {
  messages: Message[]
  unreadFrom?: string
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      role="log"
      aria-label="#design-system"
      className="flex flex-col gap-2"
      onKeyDown={onKeyDown}
    >
      {messages.map((message) => (
        <Fragment key={message.id}>
          {message.id === unreadFrom ? (
            <div
              role="separator"
              aria-label="New"
              data-unread
              className="flex items-center gap-2 text-xs font-medium text-destructive"
            >
              <span className="h-px flex-1 bg-destructive" />
              New
            </div>
          ) : null}
          <article
            data-slot="message"
            data-id={message.id}
            tabIndex={-1}
            className="flex flex-col rounded-md px-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex items-baseline gap-2">
              <span className="font-medium">
                {PEOPLE[message.author]!.name}
              </span>
              <time
                dateTime={message.sentAt.toISOString()}
                className="text-xs text-muted-foreground"
              >
                {time.format(message.sentAt)}
              </time>
            </span>
            <span className="text-muted-foreground">{message.content}</span>
          </article>
        </Fragment>
      ))}
    </div>
  )
}

export function InATimeline() {
  const [messages, setMessages] = useState(HISTORY)
  // Frozen when the conversation opens; reading doesn't move it.
  const [unreadFrom, setUnreadFrom] = useState<string | undefined>(
    HISTORY[FIRST_UNREAD]!.id
  )
  const [scroller, setScroller] = useState<HTMLDivElement | null>(null)
  const atBottom = useAtBottom(scroller)
  // Set by the scroll that opens the conversation at its end.
  const [dividerAbove, setDividerAbove] = useState(false)
  const [far, setFar] = useState(false)
  const [newBelow, setNewBelow] = useState(0)
  const [draft, setDraft] = useState("")
  const [typing, setTyping] = useState(false)
  const composer = useRef<HTMLInputElement>(null)
  const snap = useRef(true)

  useEffect(() => {
    if (!scroller || !snap.current) return
    snap.current = false
    scroller.scrollTo({ top: scroller.scrollHeight })
  }, [scroller, messages])

  const unreadCount = unreadFrom
    ? messages.length - messages.findIndex((m) => m.id === unreadFrom)
    : 0

  function article(id: string) {
    return scroller?.querySelector<HTMLElement>(
      `[data-slot="message"][data-id="${id}"]`
    )
  }

  function markRead() {
    setUnreadFrom(undefined)
    // The button that was focused is about to disappear.
    composer.current?.focus()
  }

  function jumpToPresent() {
    setNewBelow(0)
    const last = messages[messages.length - 1]
    const target = last && article(last.id)
    if (target) jumpTo(target, { container: scroller, block: "end" })
  }

  function receive() {
    setTyping(false)
    if (!atBottom) setNewBelow((n) => n + 1)
    else snap.current = true
    setMessages((list) => [
      ...list,
      {
        id: `in${list.length}`,
        author: "ben",
        sentAt: new Date(2026, 9, 1, 12, list.length),
        content: REPLIES[list.length % REPLIES.length]!,
      },
    ])
  }

  function send() {
    const text = draft.trim()
    if (!text) return
    setDraft("")
    setUnreadFrom(undefined)
    setNewBelow(0)
    snap.current = true
    setMessages((list) => [
      ...list,
      {
        id: `out${list.length}`,
        author: ME,
        sentAt: new Date(2026, 9, 1, 12, list.length),
        content: text,
      },
    ])
  }

  function onListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const onMessage = (event.target as HTMLElement).dataset.slot === "message"
    if (event.key === "Escape" && onMessage) markRead()
  }

  const bottom =
    newBelow > 0 ? "new-below" : !atBottom && far ? "history" : null

  return (
    <div className="flex w-[28rem] max-w-full flex-col gap-2">
      <div className="relative">
        <div
          ref={setScroller}
          className="h-96 overflow-y-auto rounded-xl border border-line bg-card p-3"
          onScroll={(event) => {
            const box = event.currentTarget
            const divider = box.querySelector("[data-unread]")
            setDividerAbove(
              !!divider &&
                divider.getBoundingClientRect().top <
                  box.getBoundingClientRect().top
            )
            setFar(
              box.scrollHeight - box.scrollTop - box.clientHeight >
                box.clientHeight * 2
            )
            if (box.scrollHeight - box.scrollTop - box.clientHeight <= 150) {
              setNewBelow(0)
            }
          }}
        >
          <Messages
            messages={messages}
            unreadFrom={unreadFrom}
            onKeyDown={onListKeyDown}
          />
        </div>
        {unreadFrom && dividerAbove ? (
          <JumpBar
            type="unread-above"
            count={unreadCount}
            since={HISTORY[FIRST_UNREAD]!.sentAt}
            onJump={() => {
              const target = article(unreadFrom)
              if (target) jumpTo(target, { container: scroller })
            }}
            onMarkRead={markRead}
          />
        ) : null}
        {bottom ? (
          <JumpBar type={bottom} count={newBelow} onJump={jumpToPresent} />
        ) : null}
      </div>
      <TypingIndicator
        people={typing ? [PEOPLE.ben!] : []}
        currentUserId={ME}
        announceDelay={500}
      />
      <form
        className="flex items-center gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          send()
        }}
      >
        <Input
          ref={composer}
          aria-label="Message #design-system"
          placeholder="Message #design-system"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") markRead()
          }}
          className="flex-1"
        />
        <Button type="submit" size="icon" aria-label="Send">
          <SendIcon />
        </Button>
      </form>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setTyping(true)}>
          Ben starts typing
        </Button>
        <Button size="sm" variant="outline" onClick={receive}>
          Ben sends a message
        </Button>
      </div>
    </div>
  )
}

const PARTS: Callout[] = [
  {
    label: "Jump button",
    side: "left",
    find: (root) => root.querySelector("[data-slot=jump-bar] button"),
  },
  {
    label: "Mark as read",
    side: "right",
    find: (root) =>
      root.querySelector("[data-slot=jump-bar] button:last-of-type"),
  },
  {
    label: "Bar",
    side: "right",
    find: slot("jump-bar"),
    outline: true,
    point: (part) => ({ x: part.right + 4, y: part.bottom }),
  },
]

/** The unread bar, with each part labeled. */
export function Anatomy() {
  return (
    <AnatomyMap callouts={PARTS}>
      <div className="flex justify-center px-10 py-12">
        <div data-anatomy-subject>
          <Frame className="h-24 w-96">
            <JumpBar type="unread-above" count={12} since={SINCE} />
          </Frame>
        </div>
      </div>
    </AnatomyMap>
  )
}
