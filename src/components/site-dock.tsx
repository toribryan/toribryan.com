"use client"

import { useRef, useState } from "react"
import type { Route } from "next"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { copyToClipboardWithEvent } from "@/utils/copy"
import { decodeEmail } from "@/utils/string"
import {
  ArrowUpRightIcon,
  AwardIcon,
  BadgeCheckIcon,
  BookOpenIcon,
  BoxIcon,
  BriefcaseIcon,
  ChevronRightIcon,
  CopyIcon,
  GraduationCapIcon,
  HomeIcon,
  LayersIcon,
  QuoteIcon,
  RabbitIcon,
  SearchIcon,
} from "lucide-react"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react"

import { MENU } from "@/config/site"
import { cn } from "@/lib/utils"
import { revealHash } from "@/hooks/use-hash-target"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Kbd } from "@/components/ui/kbd"
import { Button as BaseButton } from "@/components/base/ui/button"
import { Separator } from "@/components/base/ui/separator"
import { haptic } from "@/registry/lib/haptic"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"
import { SiteSearch, type SearchDoc } from "@/features/search/site-search"

// Past this distance from the top, scrolling down tucks the dock away. Small
// moves are ignored so momentum scrolling doesn't make it flicker.
const HIDE_AFTER = 64
const SCROLL_THRESHOLD = 8

const PAGE_ICONS: Record<string, React.ReactNode> = {
  "/": <HomeIcon />,
  "/projects": <BriefcaseIcon />,
  "/latest": <BookOpenIcon />,
  "/components": <BoxIcon />,
  "/fibo": <RabbitIcon />,
  "/recommendations": <QuoteIcon />,
}

// Sections of the home page, reached by their anchors.
const ABOUT = [
  { id: "experience", title: "Experience", icon: <BriefcaseIcon /> },
  { id: "education", title: "Education", icon: <GraduationCapIcon /> },
  { id: "stack", title: "Tech stack", icon: <LayersIcon /> },
  { id: "awards", title: "Awards", icon: <AwardIcon /> },
  { id: "certs", title: "Certifications", icon: <BadgeCheckIcon /> },
]

const SOCIALS = (["linkedin", "github", "x", "twentyFirstDev"] as const).map(
  (name) => ({
    name,
    ...SOCIAL[name],
    icon: SOCIAL_ICONS[name],
  })
)

function isCurrent(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * The site's navigation on every screen: one floating split button at the
 * bottom. Search opens the command menu; the menu button opens a drawer with
 * every page, the home page's sections and ways to get in touch. The dock
 * steps aside while the page scrolls down and comes back on the way up.
 */
export function SiteDock({ docs }: { docs: SearchDoc[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  // iOS only raises the keyboard for a field focused inside the tap itself,
  // and the search field doesn't exist until the dialog opens. So the tap
  // focuses this stand-in, and the keyboard stays up as focus moves on.
  const keyboard = useRef<HTMLInputElement>(null)
  const opening = useRef(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? 0)
    if (Math.abs(delta) < SCROLL_THRESHOLD) return
    setHidden(delta > 0 && y > HIDE_AFTER)
  })

  const goHome = (id: string) => {
    setMenuOpen(false)
    if (pathname === "/") revealHash(id)
    else router.push(`/#${id}` as Route)
  }

  const copyEmail = async () => {
    await copyToClipboardWithEvent(decodeEmail(USER.emailB64), {
      name: "copy_email",
      properties: { source: "menu" },
    })
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      <motion.div
        initial={false}
        animate={
          hidden && !menuOpen
            ? { y: "calc(100% + 2rem)", opacity: 0 }
            : { y: 0, opacity: 1 }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 520, damping: 40, mass: 0.8 }
        }
        // Tabbing into a hidden dock brings it back.
        onFocus={() => setHidden(false)}
        className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-50 flex justify-center px-4"
      >
        <nav
          aria-label="Site"
          className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-border bg-popover-overlay p-1 shadow-lg backdrop-blur-md"
        >
          <Button
            variant="ghost"
            className="h-9 gap-2 rounded-full pr-2 pl-3 text-sm"
            aria-haspopup="dialog"
            onClick={() => {
              haptic()
              opening.current = true
              keyboard.current?.focus({ preventScroll: true })
              setSearchOpen(true)
            }}
          >
            <SearchIcon aria-hidden />
            Search
            <Kbd className="max-sm:hidden">⌘K</Kbd>
          </Button>

          <Separator
            orientation="vertical"
            className="data-vertical:h-5 data-vertical:self-center"
          />

          <Drawer
            open={menuOpen}
            onOpenChange={(open) => {
              haptic()
              setMenuOpen(open)
            }}
            showSwipeHandle
          >
            <DrawerTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-9 gap-2 rounded-full pr-3 pl-2.5 text-sm"
                >
                  <span aria-hidden className="flex w-4 flex-col gap-1">
                    <span className="h-0.5 rounded-[1px] bg-foreground" />
                    <span className="h-0.5 rounded-[1px] bg-foreground" />
                  </span>
                  Menu
                </Button>
              }
            />
            <DrawerContent className="mb-[max(--spacing(2),env(safe-area-inset-bottom))] border [--drawer-bleed-background:transparent] [--drawer-inset:--spacing(2)] data-[swipe-direction=down]:rounded-3xl sm:mx-auto sm:max-w-xl">
              {/* The home page's grid: rails at the column's edges, a line
                  across the sheet between sections. */}
              <div className="relative flex min-h-0 flex-1 flex-col">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 inset-y-0 border-x border-line"
                />
                <DrawerHeader className="flex-row items-center gap-3 border-b border-line px-7 pt-6 pb-3 text-left">
                  {}
                  <img
                    src={USER.headerAvatar}
                    alt=""
                    className="size-10 shrink-0"
                  />
                  <div className="flex flex-col items-start text-left">
                    <DrawerTitle className="font-sans text-lg leading-tight">
                      {USER.displayName}
                    </DrawerTitle>
                    <DrawerDescription className="leading-tight">
                      {USER.discipline}
                    </DrawerDescription>
                  </div>
                </DrawerHeader>

                <div className="flex min-h-0 flex-col overflow-y-auto pb-4">
                  <ul className="flex flex-col border-b border-line px-5 py-1.5">
                    {MENU.map((item) => {
                      const current = isCurrent(pathname, item.href)
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={current ? "page" : undefined}
                            onClick={() => setMenuOpen(false)}
                            className="flex h-11 items-center gap-3 rounded-lg px-2 font-sans text-lg font-normal outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-accent [&_svg]:size-5 [&_svg]:text-muted-foreground"
                          >
                            {PAGE_ICONS[item.href]}
                            <span className="flex-1">{item.title}</span>
                            <ChevronRightIcon aria-hidden className="size-4!" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>

                  <section
                    aria-labelledby="menu-about"
                    className="flex flex-col gap-2 border-b border-line px-5 py-4"
                  >
                    <h2
                      id="menu-about"
                      className="px-2 font-mono text-xs tracking-wide text-muted-foreground uppercase"
                    >
                      About me
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {ABOUT.map((item) => (
                        <Button
                          key={item.id}
                          variant="outline"
                          size="sm"
                          className="gap-1.5 rounded-full"
                          onClick={() => goHome(item.id)}
                        >
                          {item.icon}
                          {item.title}
                        </Button>
                      ))}
                    </div>
                  </section>

                  <section
                    aria-labelledby="menu-connect"
                    className="flex flex-col gap-2 px-5 py-4"
                  >
                    <h2
                      id="menu-connect"
                      className="px-2 font-mono text-xs tracking-wide text-muted-foreground uppercase"
                    >
                      Get in touch
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "gap-1.5 rounded-full",
                          copied && "text-success"
                        )}
                        onClick={copyEmail}
                      >
                        <CopyIcon />
                        {copied ? "Email copied" : "Copy email"}
                      </Button>
                      {SOCIALS.map((social) => (
                        <BaseButton
                          key={social.name}
                          variant="outline"
                          size="sm"
                          className="gap-1.5 rounded-full"
                          nativeButton={false}
                          render={
                            <a
                              href={social.href}
                              target="_blank"
                              rel="noopener"
                            />
                          }
                        >
                          {social.icon}
                          {/* X's mark already says its name. */}
                          {social.name === "x" ? (
                            <span className="sr-only">{social.title}</span>
                          ) : (
                            social.title
                          )}
                          <ArrowUpRightIcon className="text-muted-foreground" />
                        </BaseButton>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </nav>
      </motion.div>

      <input
        ref={keyboard}
        aria-hidden
        tabIndex={-1}
        // The dialog hands focus back here as it closes; let it go, or the
        // keyboard would come straight back up.
        onFocus={(event) => {
          if (opening.current) opening.current = false
          else event.currentTarget.blur()
        }}
        className="pointer-events-none fixed top-3 left-1/2 size-px text-base opacity-0"
      />
      <SiteSearch docs={docs} open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
