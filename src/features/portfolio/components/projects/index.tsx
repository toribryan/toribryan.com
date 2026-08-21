import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { DocCardList } from "@/features/doc/components/doc-card-list"
import { getWorkDocs } from "@/features/doc/data/documents"

const ID = "projects"

export function Projects() {
  const projects = getWorkDocs()

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Projects</a>
          <PanelTitleSup>({projects.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="px-2 pb-4">
        <DocCardList
          docs={projects}
          basePath="/work"
          emptyMessage="No projects published yet."
        />
      </div>
    </Panel>
  )
}
