"use client"

import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"

import { BOARD_FOLDERS } from "./board-folders"
import { Folder, FOLDERS } from "./folders"

const DOWNLOADS = "/images/folder-art"

const ALL = [...FOLDERS, ...BOARD_FOLDERS]
const bySlug = (slug: string) => ALL.find((f) => f.slug === slug)!

// Shuffled once, so the colour and the ink-and-paper folders sit mixed
// together.
const FIBO_ORDER = [
  "bondi",
  "window",
  "hello",
  "garden",
  "quilt",
  "tiling",
  "tufted",
  "felt",
  "paper",
  "seeds",
  "heat",
  "terminal",
  "glyphs",
  "sunflower",
  "print",
]

const SET = FIBO_ORDER.map(bySlug)

/**
 * The set, each folder with its 1024px PNG. The link is what takes focus,
 * so tabbing to it lifts the folder the same way a pointer does.
 */
export function FolderArtGallery() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <section className="w-full px-2 pt-4">
        <ul className="grid w-full grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4">
          {SET.map((entry, i) => (
            <li
              key={entry.slug}
              className="group/folder flex flex-col items-center gap-1"
            >
              <Folder
                entry={entry}
                id={`folder-art-${entry.slug}`}
                title={`${entry.title} folder`}
                className="w-full transition-transform duration-300 ease-out group-hover/folder:-translate-y-1 motion-reduce:transition-none"
              />
              <p className="font-mono text-xs text-muted-foreground tabular-nums">
                No. {i + 1}
              </p>
              <a
                className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                href={`${DOWNLOADS}/${entry.slug}.png`}
                download={`folder-${entry.slug}.png`}
              >
                {entry.title}
                <DownloadIcon className="size-3.5 text-muted-foreground" />
                <span className="sr-only">PNG</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Button
        className="gap-2"
        variant="outline"
        size="sm"
        nativeButton={false}
        render={<a href={`${DOWNLOADS}/folder-art.zip`} download />}
      >
        <DownloadIcon />
        Download all {SET.length}
      </Button>
    </div>
  )
}

const COVER = ["paper", "quilt", "hello", "heat"]

/**
 * Four folders from both sets on the project card. Hovering the card lifts
 * what is tucked behind each front, and the card's own hover brings the
 * colour back.
 */
export function FolderArtCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {COVER.map((slug) => {
        const entry = bySlug(slug)
        return (
          <Folder
            key={slug}
            entry={entry}
            id={`folder-art-cover-${slug}`}
            className="-mx-[3.5%] w-[30%] shrink-0"
          />
        )
      })}
    </div>
  )
}
