"use client"

import { useEffect, useRef } from "react"
import type { Editor } from "@tiptap/react"

import { RichTextEditor } from "@/components/fibo/rich-text-editor"

import { useCycle } from "./use-cycle"

const NOTE_HEADING = "Tokens 2.0"
const NOTE_BOLD = "Ship"
const NOTE_REST = " the new roles on Friday."
const NOTE_TYPED = NOTE_HEADING.length + NOTE_BOLD.length + NOTE_REST.length
const NOTE_DONE = `<h2>${NOTE_HEADING}</h2><p><strong>${NOTE_BOLD}</strong>${NOTE_REST}</p>`

/** The note after `count` characters, with the caret's marks at its end. */
function noteAt(count: number) {
  const heading = NOTE_HEADING.slice(0, count)
  const bold = NOTE_BOLD.slice(0, Math.max(0, count - NOTE_HEADING.length))
  const rest = NOTE_REST.slice(
    0,
    Math.max(0, count - NOTE_HEADING.length - NOTE_BOLD.length)
  )
  if (!bold) return `<h2>${heading}</h2>`
  return `<h2>${heading}</h2><p><strong>${bold}</strong>${rest}</p>`
}

/**
 * A short release note. While active it's typed a letter at a time, a
 * heading then a bold word, and the toolbar presses Heading and Bold as the
 * caret passes through them; at rest it's the finished note.
 */
export function RichTextEditorCover({ active }: { active: boolean }) {
  const step = useCycle(NOTE_TYPED + 16, 90, active)
  const html = active ? noteAt(step) : NOTE_DONE
  const frame = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Tiptap hangs the editor on its element, and the editor mounts after
    // the first render, so it's looked up on each step.
    const editor = frame.current?.querySelector<
      HTMLElement & { editor?: Editor }
    >("[data-slot=rich-text-editor-content]")?.editor
    if (!editor || editor.isDestroyed) return
    editor
      .chain()
      .setContent(html, { emitUpdate: false })
      .setTextSelection(editor.state.doc.content.size)
      .run()
  }, [html])

  return (
    <div ref={frame} className="flex size-full items-center justify-center">
      <RichTextEditor
        label="Release note"
        tools={["heading", "bold", "italic", "bullet", "link"]}
        minHeight={84}
        defaultValue={NOTE_DONE}
        className="w-64"
      />
    </div>
  )
}
