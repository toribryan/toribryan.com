"use client"

import type { CSSProperties, ReactNode } from "react"

import {
  MessageList,
  type ChatAuthor,
  type ChatMessage,
} from "@/components/fibo/message-list"

import { AnatomyMap, slot, type Callout } from "../components/anatomy-map"

const ana: ChatAuthor = { id: "ana", name: "Ana Ruiz" }
const ben: ChatAuthor = { id: "ben", name: "Ben Okafor" }
const bot: ChatAuthor = { id: "system", name: "fibo" }

// September 30 and October 1, 2026, so the list crosses a day.
const at = (day: 30 | 1, hour: number, minute: number) =>
  new Date(2026, day === 30 ? 8 : 9, day, hour, minute)

const CONVERSATION: ChatMessage[] = [
  {
    id: "1",
    author: ana,
    sentAt: at(30, 16, 2),
    content: "Pushed the new status tokens to the branch.",
  },
  {
    id: "2",
    author: ana,
    sentAt: at(30, 16, 3),
    content: "Success, warning and info all clear AA now.",
  },
  {
    id: "3",
    author: ben,
    sentAt: at(30, 16, 10),
    content: "Nice. I'll look first thing tomorrow.",
  },
  {
    id: "4",
    author: bot,
    sentAt: at(1, 9, 0),
    kind: "system",
    content: "Cy joined the channel.",
  },
  {
    id: "5",
    author: ben,
    sentAt: at(1, 9, 12),
    content: "Looked through it. Is dark mode in there too?",
  },
  {
    id: "6",
    author: ben,
    sentAt: at(1, 9, 13),
    content: (
      <>
        The diff is in{" "}
        <a href="#pr-58" className="underline underline-offset-2">
          #58
        </a>
        .
      </>
    ),
  },
  {
    id: "7",
    author: ana,
    sentAt: at(1, 9, 15),
    replyTo: {
      id: "5",
      name: "Ben Okafor",
      text: "Looked through it. Is dark mode in there too?",
    },
    content: "Both themes, and the drift check passes.",
  },
  {
    id: "8",
    author: ana,
    sentAt: at(1, 9, 16),
    deleted: true,
    content: "Wrong channel",
  },
  {
    id: "9",
    author: ana,
    sentAt: at(1, 9, 17),
    content: "Merging after lunch unless anyone shouts.",
  },
]

/** The width fibo's stories give it: a conversation column. */
function Column({ children }: { children: ReactNode }) {
  return <div className="w-[26rem] max-w-full">{children}</div>
}

export function Default() {
  return (
    <Column>
      <MessageList messages={CONVERSATION} />
    </Column>
  )
}

const BURST: ChatMessage[] = [0, 4, 8, 12, 16].map((minute, i) => ({
  id: `b${i}`,
  author: ana,
  sentAt: at(1, 14, minute),
  content: ["Trying a thing.", "Nope.", "Closer.", "Got it.", "Pushed."][i],
}))

export function Window() {
  return (
    <div className="grid w-[44rem] max-w-full gap-8 sm:grid-cols-2">
      {(["previous", "first"] as const).map((from) => {
        const name = from === "previous" ? "Rolling" : "Fixed"
        return (
          <section key={from} className="flex flex-col gap-3">
            <h2 className="text-xs font-medium text-muted-foreground">
              {name}, 5 minutes
            </h2>
            <MessageList
              aria-label={`${name} window`}
              messages={BURST}
              windowMinutes={5}
              windowFrom={from}
            />
          </section>
        )
      })}
    </div>
  )
}

export function Unread() {
  return (
    <Column>
      <MessageList messages={CONVERSATION} unreadFrom="7" />
    </Column>
  )
}

export function Divider() {
  return (
    <Column>
      <MessageList messages={CONVERSATION} dividers={{ "5": "New" }} />
    </Column>
  )
}

export function Spacing() {
  return (
    <Column>
      <MessageList
        messages={CONVERSATION}
        style={
          {
            "--message-gap": "0.25rem",
            "--message-group-gap": "1.5rem",
          } as CSSProperties
        }
      />
    </Column>
  )
}

export function Translated() {
  return (
    <Column>
      <div lang="es">
        <MessageList
          messages={CONVERSATION}
          locale="es"
          strings={{
            list: "Mensajes",
            label: (message, time) =>
              message.kind === "system"
                ? time
                : message.deleted
                  ? `Mensaje eliminado de ${message.author.name}, ${time}`
                  : `${message.author.name}, ${time}`,
            deleted: "Se eliminó este mensaje.",
            replyingTo: (name) => `En respuesta a ${name}`,
          }}
        />
      </div>
    </Column>
  )
}

export function Empty() {
  return (
    <Column>
      <MessageList messages={[]} />
    </Column>
  )
}

const QUICK_RUN: ChatMessage[] = [
  {
    id: "1",
    author: { id: "a", name: "Ana" },
    sentAt: new Date(2026, 9, 1, 9, 0),
    content: "Pushed it.",
  },
  {
    id: "2",
    author: { id: "a", name: "Ana" },
    sentAt: new Date(2026, 9, 1, 9, 1),
    content: "Both themes.",
  },
]

export function DoGroup() {
  return (
    <MessageList
      className="w-64"
      aria-label="Good example"
      messages={QUICK_RUN}
    />
  )
}

export function DontRepeat() {
  return (
    <MessageList
      className="w-64"
      aria-label="Bad example"
      windowMinutes={0}
      messages={QUICK_RUN}
    />
  )
}

const ANATOMY_MESSAGES = CONVERSATION.slice(4, 7)

const PARTS: Callout[] = [
  { label: "Divider", side: "right", find: slot("message-divider") },
  { label: "Avatar", side: "left", find: slot("avatar") },
  { label: "Heading", side: "right", find: slot("message-heading") },
  {
    label: "Time",
    side: "left",
    find: (root) =>
      root.querySelector('[data-position="last"] [data-slot=message-time]'),
  },
  { label: "Reply", side: "right", find: slot("message-reply") },
  {
    label: "Content",
    side: "right",
    find: (root) =>
      root.querySelector('[data-position="last"] [data-slot=message-content]'),
  },
  {
    label: "Message",
    side: "left",
    find: (root) => root.querySelector('[data-slot=message][data-id="7"]'),
    outline: true,
  },
]

/** One day's opening messages, with each part labeled. */
export function Anatomy() {
  return (
    <AnatomyMap callouts={PARTS}>
      <div className="flex justify-center px-10 py-12">
        <div data-anatomy-subject className="w-80 max-w-full">
          <MessageList
            messages={ANATOMY_MESSAGES}
            className="[&_[data-position=last]_[data-slot=message-time]]:opacity-100"
          />
        </div>
      </div>
    </AnatomyMap>
  )
}
