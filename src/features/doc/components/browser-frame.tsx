import { cn } from "@/lib/utils"
import { PhoneMockupCard } from "@/components/mockups/phone-mockup-card"

const HOST = "moderncarehomes.com"

function Icon({ d }: { d: string }) {
  return (
    <svg
      className="size-[1em]"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  )
}

function Lock() {
  return (
    <svg
      className="h-[0.9em] w-auto"
      viewBox="0 0 9 11"
      fill="currentColor"
      aria-hidden
    >
      <path d="M1.5 5V3.5a3 3 0 0 1 6 0V5h.3c.4 0 .7.3.7.7v4.6c0 .4-.3.7-.7.7H1.2a.7.7 0 0 1-.7-.7V5.7c0-.4.3-.7.7-.7h.3Zm1.3 0h3.4V3.5a1.7 1.7 0 0 0-3.4 0V5Z" />
    </svg>
  )
}

/**
 * A desktop Safari window around a screen: traffic lights, sidebar and arrows,
 * the address field and the toolbar. Sized in `em` from `size`, the toolbar's
 * height in pixels, so it scales with any frame.
 */
export function SafariFrame({
  children,
  size = 34,
  className,
  style,
}: {
  children: React.ReactNode
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn("overflow-hidden rounded-[0.35em] bg-white", className)}
      style={{
        fontSize: size,
        boxShadow:
          "0 0 0 1px rgba(15,25,60,.12), 0 8px 20px -14px rgba(8,20,70,.18)",
        ...style,
      }}
    >
      <div className="relative flex h-[1em] items-center gap-[0.4em] border-b border-[#e2e4e9] bg-[linear-gradient(#f8f8fa,#efeff2)] px-[0.45em] text-[#8a8f98]">
        <span className="flex gap-[0.22em]">
          <i className="block size-[0.34em] rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
          <i className="block size-[0.34em] rounded-full bg-[#febc2e] ring-1 ring-black/10" />
          <i className="block size-[0.34em] rounded-full bg-[#28c840] ring-1 ring-black/10" />
        </span>
        <span className="ml-[0.2em] flex gap-[0.4em] text-[0.46em]">
          <Icon d="M2 3.5h12v9H2zM6 3.5v9" />
          <Icon d="M10 3 5 8l5 5" />
          <Icon d="M6 3l5 5-5 5" />
        </span>
        <span className="absolute left-1/2 flex h-[0.64em] w-[44%] -translate-x-1/2 items-center justify-center gap-[0.18em] rounded-[0.18em] bg-[#e6e7eb] text-[#3c4049]">
          <span className="flex items-center gap-[0.5em] text-[0.36em]">
            <span className="text-[#6b7280]">
              <Lock />
            </span>
            {HOST}
          </span>
        </span>
        <span className="ml-auto flex gap-[0.45em] text-[0.46em]">
          <Icon d="M8 10V2M5 5l3-3 3 3M3 8v5h10V8" />
          <Icon d="M8 3v10M3 8h10" />
          <Icon d="M5 2h9v9M2 5h9v9H2z" />
        </span>
      </div>
      {children}
    </div>
  )
}

/**
 * iOS status bar. The dynamic island is a fixed 66px, so the time and icons
 * each center in the space beside it, on the island's center line.
 */
function StatusBar() {
  return (
    <div
      className="grid h-[38px] shrink-0 grid-cols-[1fr_76px_1fr] items-center font-semibold text-black"
      style={{ fontSize: "clamp(10px, calc(var(--phone-w) * 0.052), 15px)" }}
    >
      <span className="justify-self-center tracking-[-0.01em] tabular-nums">
        9:41
      </span>
      <span />
      <span
        className="flex items-center gap-[0.28em] justify-self-center"
        aria-hidden
      >
        <svg
          className="h-[0.7em] w-auto"
          viewBox="0 0 18 12"
          fill="currentColor"
        >
          <rect x="0" y="8" width="3.2" height="4" rx="0.8" />
          <rect x="4.9" y="5.5" width="3.2" height="6.5" rx="0.8" />
          <rect x="9.8" y="3" width="3.2" height="9" rx="0.8" />
          <rect x="14.7" y="0" width="3.2" height="12" rx="0.8" />
        </svg>
        <svg
          className="h-[0.7em] w-auto"
          viewBox="0 0 16 12"
          fill="currentColor"
        >
          <path d="M8 11.8 5.6 9.3a3.4 3.4 0 0 1 4.8 0L8 11.8Zm-4.3-4.4L2.2 5.9a8.2 8.2 0 0 1 11.6 0l-1.5 1.5a6 6 0 0 0-8.6 0ZM.7 4.4-.8 2.9a12.4 12.4 0 0 1 17.6 0l-1.5 1.5a10.3 10.3 0 0 0-14.6 0Z" />
        </svg>
        <svg className="h-[0.72em] w-auto" viewBox="0 0 27 13">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3.5"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".35"
          />
          <rect
            x="2"
            y="2"
            width="16.5"
            height="9"
            rx="2.2"
            fill="currentColor"
          />
          <path
            d="M24.5 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z"
            fill="currentColor"
            fillOpacity=".4"
          />
        </svg>
      </span>
    </div>
  )
}

/** Mobile Safari's bottom toolbar: the address pill above the tab controls. */
function MobileSafariBar() {
  return (
    <div className="shrink-0 border-t border-black/5 bg-[#f7f7f8]/95 px-[5%] pt-[3%] pb-[7%]">
      <div className="flex h-[2.1em] items-center justify-center gap-[0.35em] rounded-[0.9em] bg-white text-[0.62em] text-[#3c4049] shadow-[0_1px_3px_rgba(0,0,0,.08)] ring-1 ring-black/5">
        <span className="text-[#6b7280]">
          <Lock />
        </span>
        {HOST}
      </div>
      <div className="mt-[4%] flex justify-between px-[4%] text-[0.75em] text-[#1747e6]/80">
        <Icon d="M10 3 5 8l5 5" />
        <Icon d="M6 3l5 5-5 5" />
        <Icon d="M8 10V2M5 5l3-3 3 3M3 8v5h10V8" />
        <Icon d="M3 4h10M3 8h10M3 12h10" />
        <Icon d="M5 2h9v9M2 5h9v9H2z" />
      </div>
    </div>
  )
}

/**
 * A phone running a screen in mobile Safari, the address bar at the bottom.
 * `children` is the page: an image or a clip that fills the width.
 */
export function SafariPhone({
  children,
  width,
  className,
  style,
}: {
  children: React.ReactNode
  width: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <PhoneMockupCard
      variant="white"
      className={className}
      style={{
        ...style,
        width,
        fontSize: width / 15,
        ["--phone-w" as string]: `${width}px`,
      }}
    >
      <div className="flex size-full flex-col bg-white">
        <StatusBar />
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        <MobileSafariBar />
      </div>
    </PhoneMockupCard>
  )
}

/** A screen recording or still in a Safari window, for MDX. */
export function BrowserShot({
  src,
  alt = "",
  caption,
}: {
  src: string
  alt?: string
  caption?: React.ReactNode
}) {
  const isVideo = src.endsWith(".mp4")
  return (
    <figure className="not-prose my-8">
      <SafariFrame size={30}>
        {isVideo ? (
          <video
            className="block w-full"
            src={src}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img className="block w-full" src={src} alt={alt} loading="lazy" />
        )}
      </SafariFrame>
      {caption && (
        <figcaption className="mt-3 text-sm text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** A phone screen recording or still in mobile Safari, for MDX. */
export function PhoneShot({
  src,
  alt = "",
  width = 240,
}: {
  src: string
  alt?: string
  width?: number
}) {
  return (
    <SafariPhone width={width}>
      {src.endsWith(".mp4") ? (
        <video
          className="block w-full"
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img className="block w-full" src={src} alt={alt} loading="lazy" />
      )}
    </SafariPhone>
  )
}
