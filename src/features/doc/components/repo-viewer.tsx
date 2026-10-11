import fs from "fs"
import path from "path"

import { MDX } from "@/components/mdx"
import { STORYBOOK_KIT } from "@/features/doc/repos/storybook-kit"

import { RepoWindow } from "./repo-window"

const REPOS = { "storybook-kit": STORYBOOK_KIT }

// A literal root keeps build tracing to this folder; a computed one makes
// Next trace the whole project into the page's function.
const REPOS_DIR = path.join(process.cwd(), "src/features/doc/repos")

/**
 * A repo's documents as a window: a file tree of them beside the open one,
 * rendered as Markdown from the copies kept in `features/doc/repos/`.
 */
export function RepoViewer({
  repo,
  guide,
}: {
  repo: keyof typeof REPOS
  /** A document to offer as "Getting started" in the window's title bar. */
  guide?: string
}) {
  const { name, open, readable } = REPOS[repo]
  const documents = Object.fromEntries(
    readable.map((file) => [
      file,
      <MDX
        key={file}
        code={fs.readFileSync(path.join(REPOS_DIR, repo, file), "utf-8")}
        format="md"
      />,
    ])
  )

  return (
    <RepoWindow name={name} open={open} guide={guide} documents={documents} />
  )
}
