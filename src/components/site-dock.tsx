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
  BookOpenIcon,
  BoxIcon,
  BriefcaseIcon,
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
  { id: "awards", title: "Achievements", icon: <AwardIcon /> },
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
            <DrawerContent className="fibo-palette mb-[max(--spacing(2),env(safe-area-inset-bottom))] border bg-muted p-1 pt-0 [--drawer-bleed-background:transparent] [--drawer-inset:--spacing(2)] data-[swipe-direction=down]:rounded-2xl sm:mx-auto sm:max-w-xl">
              {/* Search's inset look, at its sizes: a muted shell holding the
                  header, and the groups in a card raised above it. */}
              <DrawerHeader className="flex-row items-center gap-2.5 px-3 pt-1 pb-2.5 text-left">
                {}
                <img
                  src={USER.headerAvatar}
                  alt=""
                  className="size-8 shrink-0"
                />
                <div className="flex flex-col items-start text-left">
                  <DrawerTitle className="font-sans text-sm leading-tight font-medium">
                    {USER.displayName}
                  </DrawerTitle>
                  <DrawerDescription className="text-xs leading-tight">
                    {USER.discipline}
                  </DrawerDescription>
                </div>
              </DrawerHeader>

              <div className="min-h-0 overflow-y-auto rounded-xl border bg-popover p-2 shadow-xs">
                <MenuGroup label="Pages">
                  {MENU.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={
                          isCurrent(pathname, item.href) ? "page" : undefined
                        }
                        onClick={() => setMenuOpen(false)}
                        className={MENU_ROW}
                      >
                        {PAGE_ICONS[item.href]}
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </MenuGroup>

                <MenuGroup label="About me">
                  {ABOUT.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={MENU_ROW}
                        onClick={() => goHome(item.id)}
                      >
                        {item.icon}
                        {item.title}
                      </button>
                    </li>
                  ))}
                </MenuGroup>

                <MenuGroup label="Get in touch">
                  <li>
                    <button
                      type="button"
                      className={cn(MENU_ROW, copied && "text-success")}
                      onClick={copyEmail}
                    >
                      <CopyIcon />
                      {copied ? "Email copied" : "Copy email"}
                    </button>
                  </li>
                  {SOCIALS.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener"
                        className={MENU_ROW}
                      >
                        {social.icon}
                        <span className="flex-1">{social.title}</span>
                        <ArrowUpRightIcon />
                      </a>
                    </li>
                  ))}
                </MenuGroup>
              </div>
              <div className="h-1 shrink-0" />
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

/** A row at the command menu's size, so the menu and search read as one. */
const MENU_ROW =
  "flex h-9 w-full items-center gap-2 rounded-md px-2 text-left text-sm outline-none hover:bg-accent focus-visible:bg-accent aria-[current=page]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground"

function MenuGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="not-first:mt-2">
      <h2 className="px-2 pt-1 pb-1.5 text-xs text-muted-foreground">
        {label}
      </h2>
      <ul>{children}</ul>
    </section>
  )
}
