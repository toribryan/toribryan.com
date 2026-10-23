import type { Components } from "react-markdown"

import {
  AnnotatedText,
  AnnotatedTextChip,
  type AnnotatedTextVariant,
} from "@/components/fibo/annotated-text"
import { Markdown } from "@/components/markdown"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { USER } from "@/features/portfolio/data/user"

const ID = "hello"

/*
 * The about copy marks its phrases with <mark>: `data-variant` draws an
 * annotation on it, and `data-icon` makes it a chip with that sticker.
 */
const COMPONENTS: Components = {
  mark: ({ node: _, children, ...props }) => {
    const { "data-variant": variant, "data-icon": icon } = props as Record<
      string,
      string | undefined
    >
    if (icon)
      return <AnnotatedTextChip icon={icon}>{children}</AnnotatedTextChip>
    return (
      <AnnotatedText
        variant={(variant as AnnotatedTextVariant) ?? "underline"}
        animate
      >
        {children}
      </AnnotatedText>
    )
  },
}

export function Hello() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          About
          {/* Doodle "A" is a hand-drawn smiley. */}
          <span
            className="ml-1 inline-block -rotate-6 align-middle font-doodle text-4xl/none text-muted-foreground select-none"
            aria-hidden
          >
            A
          </span>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="typeset typeset-description [&_li]:ps-0.5 [&_ul]:ps-3.5">
          <Markdown components={COMPONENTS}>{USER.about}</Markdown>
        </div>
      </PanelContent>
    </Panel>
  )
}
