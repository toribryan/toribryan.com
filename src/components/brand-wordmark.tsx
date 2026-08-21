/**
 * Tori Bryan's wordmark — set in Nohemi, lowercase, matching how the name was
 * always rendered on the previous site.
 *
 * This replaces the template author's wordmark, which his TRADEMARK.md
 * excludes from the MIT grant.
 *
 * Note: the copyable string from `getWordmarkSVG` uses live text rather than
 * outlined paths, so it renders in Nohemi only where that font is available.
 * Outline it in a vector editor if you need a portable asset.
 */

const WORDMARK_TEXT = "tori bryan"

export function BrandWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1024 256"
      role="img"
      aria-label={WORDMARK_TEXT}
      {...props}
    >
      <text
        x="0"
        y="192"
        fill="currentColor"
        fontFamily="var(--font-display), Inter, sans-serif"
        fontSize="224"
        fontWeight="600"
        letterSpacing="-6"
      >
        {WORDMARK_TEXT}
      </text>
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1024 256"><text x="0" y="192" fill="currentColor" font-family="Nohemi, Inter, sans-serif" font-size="224" font-weight="600" letter-spacing="-6">${WORDMARK_TEXT}</text></svg>`
}
