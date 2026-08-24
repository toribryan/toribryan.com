import { DocList } from "@/features/doc/components/doc-list"
import { getLatestPosts } from "@/features/doc/data/documents"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"

const ID = "blog"

/**
 * The posts from `content/latest/`, in the same order and rows the `/latest`
 * page uses. Cover-less on purpose: Projects sits right above with cards, so
 * rows here keep the two sections from reading as one long grid.
 */
export function Blog() {
  const posts = getLatestPosts()

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Blog</a>
          <PanelTitleSup>({posts.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <DocList docs={posts} basePath="/latest" emptyMessage="No posts yet." />
    </Panel>
  )
}
