"use client"

import { useState, type ReactNode } from "react"

import { Avatar, AvatarFallback } from "@/components/fibo/avatar"
import { Button } from "@/components/fibo/button"
import { RichTextEditor } from "@/components/fibo/rich-text-editor"

import { AnatomyMap, slot, type Callout } from "../components/anatomy-map"

// As wide as fibo's stories, so the editor reads at document width.
function Frame({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-xl">{children}</div>
}

export function Default() {
  return (
    <Frame>
      <RichTextEditor />
    </Frame>
  )
}

export function WithLimit() {
  return (
    <Frame>
      <RichTextEditor
        maxLength={120}
        defaultValue="<p>Keep release notes short: what changed, who it affects, and what to do next. Link the pull request, not the diff.</p>"
      />
    </Frame>
  )
}

export function MinimalTools() {
  return (
    <Frame>
      <RichTextEditor
        tools={["bold", "italic", "link"]}
        minHeight={80}
        placeholder="Add a comment…"
        label="Comment"
      />
    </Frame>
  )
}

const RELEASE_NOTE =
  "<h2>Tokens 2.0</h2><p>Every part now reads <strong>semantic tokens</strong> only. Named roles replace opacity modifiers:</p><ul><li><p><code>-subtle</code> for tints</p></li><li><p><code>-hover</code> for pointer states</p></li></ul><blockquote><p>Figma and code use the same name.</p></blockquote>"

export function ReadOnly() {
  return (
    <Frame>
      <RichTextEditor
        editable={false}
        minHeight={0}
        label="Release note"
        defaultValue={RELEASE_NOTE}
      />
    </Frame>
  )
}

export function ProposalReplyBox() {
  const [html, setHtml] = useState("")
  const [sent, setSent] = useState<string[]>([])
  const [round, setRound] = useState(0)
  return (
    <Frame>
      <div className="flex flex-col gap-4">
        {sent.map((message, index) => (
          <div key={index} className="flex gap-3">
            <Avatar size="sm">
              <AvatarFallback>TB</AvatarFallback>
            </Avatar>
            <div
              className="min-w-0 flex-1 text-sm text-foreground [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <span
            id="proposal-reply-label"
            className="text-sm leading-none font-medium"
          >
            Reply to the proposal
          </span>
          <p id="proposal-reply-hint" className="text-sm text-muted-foreground">
            Up to 500 characters. The team sees it in the proposal thread.
          </p>
          <RichTextEditor
            key={round}
            aria-labelledby="proposal-reply-label"
            aria-describedby="proposal-reply-hint"
            placeholder="Share what works and what you'd change…"
            tools={["bold", "italic", "bullet", "link"]}
            minHeight={96}
            maxLength={500}
            onChange={(value) => setHtml(value)}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={!html}
              onClick={() => {
                setHtml("")
                setRound((value) => value + 1)
              }}
            >
              Discard
            </Button>
            <Button
              size="sm"
              disabled={!html}
              onClick={() => {
                setSent((current) => [...current, html])
                setHtml("")
                setRound((value) => value + 1)
              }}
            >
              Send reply
            </Button>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export function DoTrimTools() {
  return (
    <RichTextEditor
      className="w-72"
      label="Comment"
      tools={["bold", "italic", "link"]}
      minHeight={60}
      placeholder="Add a comment…"
    />
  )
}

export function DontEveryTool() {
  return (
    <RichTextEditor
      className="w-72"
      label="Comment"
      minHeight={60}
      placeholder="Add a comment…"
    />
  )
}

const PARTS: Callout[] = [
  {
    label: "Frame",
    side: "left",
    find: slot("rich-text-editor"),
    outline: true,
    point: (part) => ({ x: part.left - 4, y: part.bottom - 12 }),
  },
  { label: "Toolbar", side: "left", find: slot("rich-text-editor-toolbar") },
  {
    label: "Tool",
    side: "right",
    find: (root) => root.querySelector("[data-tool=bold]"),
    point: (part) => ({ x: part.right, y: part.top - 4 }),
  },
  { label: "Content", side: "left", find: slot("rich-text-editor-content") },
  { label: "Count", side: "right", find: slot("rich-text-editor-count") },
]

/** An editor near its limit, with each part labeled. */
export function Anatomy() {
  return (
    <AnatomyMap callouts={PARTS}>
      <div className="flex justify-center px-10 py-12">
        <div data-anatomy-subject className="w-96">
          <RichTextEditor
            tools={["heading", "bold", "italic", "bullet", "link"]}
            minHeight={96}
            maxLength={64}
            defaultValue="<p><strong>Ship</strong> the tokens on Friday, after the drift check passes.</p>"
          />
        </div>
      </div>
    </AnatomyMap>
  )
}
