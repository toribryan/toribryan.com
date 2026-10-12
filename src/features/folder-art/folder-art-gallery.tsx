"use client"

import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"

import { Folder, FOLDERS } from "./folders"

const DOWNLOADS = "/images/folder-art"

/**
 * The whole set, numbered along the sequence, each with its 1024px PNG. The
 * link is what takes focus, so tabbing to it lifts the folder the same way a
 * pointer does.
 */
export function FolderArtGallery() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ul className="grid w-full grid-cols-2 gap-x-2 gap-y-4 px-2 pt-4 sm:grid-cols-4">
        {FOLDERS.map((entry) => (
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
              No. {entry.no}
            </p>
            <a
              className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              href={`${DOWNLOADS}/${entry.slug}.png`}
              download={`fibo-folder-${entry.slug}.png`}
            >
              {entry.title}
              <DownloadIcon className="size-3.5 text-muted-foreground" />
              <span className="sr-only">PNG</span>
            </a>
          </li>
        ))}
      </ul>
      <Button
        className="gap-2"
        variant="outline"
        size="sm"
        nativeButton={false}
        render={<a href={`${DOWNLOADS}/fibo-folder-art.zip`} download />}
      >
        <DownloadIcon />
        Download all eight
      </Button>
    </div>
  )
}

const COVER = ["paper", "tiling", "sunflower", "terminal"]

/**
 * Four of the folders on the project card. Hovering the card lifts what is
 * tucked behind each front, and the card's own hover brings the photo's
 * colour back.
 */
export function FolderArtCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {COVER.map((slug) => {
        const entry = FOLDERS.find((f) => f.slug === slug)!
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
