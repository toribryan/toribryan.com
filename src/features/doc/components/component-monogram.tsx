/**
 * Brand libraries are identified by their short name, so the list tile shows a
 * monogram rather than a logo — none of these systems have shipped a mark yet.
 */
export function ComponentMonogram({ title }: { title: string }) {
  return (
    <span className="font-heading text-[0.6875rem] leading-none font-semibold tracking-wide">
      {title.slice(0, 2).toUpperCase()}
    </span>
  )
}
