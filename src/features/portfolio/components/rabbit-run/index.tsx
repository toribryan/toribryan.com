import Link from "next/link"

import { ArrowRightIcon } from "@/components/animated-icons/arrow-right-icon"
import { Button } from "@/components/base/ui/button"
import { RabbitRun } from "@/features/portfolio/components/iso/rabbit-run"
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"

const ID = "rabbit-run"

/** The game, playable on the home page, with a way to its project page. */
export function RabbitRunSection() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Rabbit run</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <RabbitRun className="px-2 py-4" />

      <div className="screen-line-top flex justify-center py-4">
        <Button
          className="gap-2 pr-2.5 pl-3"
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href="/work/rabbit-run" />}
        >
          About the game
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
