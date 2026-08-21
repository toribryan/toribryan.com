import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

/**
 * Renders the markup `rehype-pretty-code` emits. The `[data-rehype-pretty-code-figure]`
 * styles in globals.css do the visual work; this layer adds `not-prose` and the
 * hover copy button.
 */
export const mdxCodeBlockComponents = {
  figure({ className, ...props }: React.ComponentProps<"figure">) {
    const hasPrettyCode = "data-rehype-pretty-code-figure" in props

    return (
      <figure
        className={cn(hasPrettyCode && "not-prose", className)}
        {...props}
      />
    )
  },

  pre({
    __withMeta__,
    __rawString__,
    className,
    ...props
  }: React.ComponentProps<"pre"> & {
    __withMeta__?: boolean
    __rawString__?: string
  }) {
    return (
      <div className="group/pre rounded-[9px] border bg-code">
        <pre
          className={cn(
            __rawString__ && !__withMeta__ && "[--code-padding-right:6rem]",
            className
          )}
          {...props}
        />

        {__rawString__ && (
          <CopyButton
            data-slot="copy-button"
            className={cn(
              "absolute top-2 right-2 z-10 size-7 rounded-[5px] border-none text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
              __withMeta__ && "top-1.5 right-1.5 rounded-md",
              !__withMeta__ && "opacity-0 group-hover/pre:opacity-100"
            )}
            variant="ghost"
            size="icon-xs"
            text={__rawString__}
            event="copy_code_block"
          />
        )}
      </div>
    )
  },
}
