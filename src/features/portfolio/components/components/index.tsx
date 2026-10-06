import Link from "next/link"

import { ArrowRightIcon } from "@/components/animated-icons/arrow-right-icon"
import { AnimationsPauseToggle } from "@/components/animations-pause"
import { Button } from "@/components/base/ui/button"
import { NICHE_PARTS } from "@/features/portfolio/data/fibo-niche"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel"
import { PanelTitleCopy } from "../panel-title-copy"
import { ComponentCardList } from "./component-card-list"

const ID = "components"

/** fibo's parts, under the fibo hero. */
export function Components() {
  return (
    <Panel id={ID}>
      <PanelHeader className="flex items-center justify-between gap-2">
        <PanelTitle>
          <a href={`#${ID}`}>Components</a>
          <PanelTitleSup>({NICHE_PARTS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
        <AnimationsPauseToggle />
      </PanelHeader>

      <ComponentCardList />

      <div className="screen-line-top flex justify-center py-4">
        <Button
          className="gap-2 pr-2.5 pl-3"
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href="/components" />}
        >
          View all
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
