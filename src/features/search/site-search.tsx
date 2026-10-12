"use client"

import { useMemo, type ReactNode } from "react"
import type { Route } from "next"
import { usePathname, useRouter } from "next/navigation"
import { copyToClipboardWithEvent } from "@/utils/copy"
import { decodeEmail } from "@/utils/string"
import {
  AwardIcon,
  BadgeCheckIcon,
  BookOpenIcon,
  BotIcon,
  BoxIcon,
  BriefcaseIcon,
  Building2Icon,
  CopyIcon,
  FileTextIcon,
  FolderIcon,
  FolderKanbanIcon,
  Gamepad2Icon,
  GraduationCapIcon,
  HeartIcon,
  HomeIcon,
  LayersIcon,
  LayoutGridIcon,
  LibraryIcon,
  MicIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  QuoteIcon,
  RabbitIcon,
  SmartphoneIcon,
  SunIcon,
} from "lucide-react"
import { useReducedMotion } from "motion/react"
import { useTheme } from "next-themes"

import OG_ROUTES from "@/config/og-routes.json"
import { trackEvent } from "@/lib/events"
import { revealHash } from "@/hooks/use-hash-target"
import {
  CommandMenu,
  type CommandMenuGroup,
  type CommandMenuItem,
} from "@/components/fibo/command-menu"
import { DocCoverPlate } from "@/features/doc/components/doc-cover-plate"
import { PartCoverPlate } from "@/features/portfolio/components/components/component-card-list"
import { FigmaIcon } from "@/features/portfolio/components/fibo-hero/brand-icons"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import {
  CATALOG,
  fiboStorybookUrl,
} from "@/features/portfolio/data/fibo-catalog"
import { NICHE_PARTS } from "@/features/portfolio/data/fibo-niche"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

// One mark per project, so results tell apart at a glance. A new project
// without one here falls back to a folder.
const PROJECT_ICONS: Record<string, ReactNode> = {
  "/work/design-system-overhaul": <LayoutGridIcon />,
  "/work/voice-memo": <MicIcon />,
  "/fibo": <RabbitIcon />,
  "/work/modern-care-homes": <Building2Icon />,
  "/work/agentic-design-system": <BotIcon />,
  "/work/folder-art": <FolderIcon />,
  "/work/real-wedding-submissions": <HeartIcon />,
  "/work/storybook-kit": <LibraryIcon />,
  "/work/iphone-duo": <SmartphoneIcon />,
  "/work/rabbit-run": <Gamepad2Icon />,
}

// The first two bullets of a role's description, as plain text.
function firstLines(markdown?: string) {
  return (markdown ?? "")
    .split("\n")
    .slice(0, 2)
    .map((line) =>
      line.replace(/^-\s*/, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    )
    .join(" ")
}

// A role's span in years, such as 2023–2026, or 2026–now while ongoing.
function years({ start, end }: { start: string; end?: string }) {
  const from = start.slice(-4)
  const to = end ? end.slice(-4) : "now"
  return from === to ? from : `${from}–${to}`
}

/** What the header hands over about each case study and post. */
export type SearchDoc = {
  slug: string
  href: string
  title: string
  description: string
  /** `work` or `latest`. */
  kind: string
  image?: string
  period?: string
  keywords: string[]
}

// A page's social preview still, once `npm run og` has made one.
function ogStill(href: string) {
  return (OG_ROUTES as string[]).includes(href) ? `/og${href}.png` : undefined
}

// The command menu's own lead example listens for Cmd+K on its doc page.
const OWN_HOTKEY_PAGE = "/components/command-menu"

function Preview({
  cover,
  image,
  title,
  meta,
  children,
}: {
  /** A cover plate, drawn in place of the image. */
  cover?: ReactNode
  image?: string
  title: string
  meta?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      {cover ??
        (image ? (
          // Covers are already sized at export time, like the cards'.
          <img
            src={image}
            alt=""
            className="aspect-1200/630 w-full rounded-md object-cover inset-ring-1 inset-ring-black/10"
            loading="lazy"
          />
        ) : null)}
      <div className="flex flex-col gap-1">
        <p className="font-medium text-balance text-foreground">{title}</p>
        {meta ? (
          <p className="font-mono text-xs text-muted-foreground">{meta}</p>
        ) : null}
      </div>
      <p className="text-pretty text-muted-foreground">{children}</p>
    </div>
  )
}

/**
 * Search for the whole site: pages, case studies, posts and every fibo part,
 * plus theme and contact actions. Opens from the dock or with Cmd+K.
 */
export function SiteSearch({
  docs,
  open,
  onOpenChange,
}: {
  docs: SearchDoc[]
  /** Whether the menu is open; the dock's search button sets it. */
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { setTheme } = useTheme()
  const reduceMotion = useReducedMotion()

  const groups = useMemo<CommandMenuGroup[]>(() => {
    const go = (href: string) => () => router.push(href as Route)
    // A section or role on the home page. Already there, the hash changes in
    // place so the section can open and scroll to itself.
    const home = (id: string) => () =>
      pathname === "/" ? revealHash(id) : router.push(`/#${id}` as Route)
    const away = (href: string) => () =>
      window.open(href, "_blank", "noopener,noreferrer")

    const page = (
      value: string,
      label: string,
      href: string,
      icon: ReactNode,
      about: string,
      keywords: string[] = []
    ): CommandMenuItem => ({
      value,
      label,
      icon,
      keywords,
      onSelect: href.startsWith("/#") ? home(href.slice(2)) : go(href),
      preview: (
        <Preview image={ogStill(href)} title={label}>
          {about}
        </Preview>
      ),
    })

    const doc = (d: SearchDoc): CommandMenuItem => ({
      value: `${d.kind}:${d.href}`,
      label: d.title,
      icon:
        d.kind === "work" ? (
          (PROJECT_ICONS[d.href] ?? <FolderKanbanIcon />)
        ) : (
          <FileTextIcon />
        ),
      keywords: d.keywords,
      onSelect: go(d.href),
      preview: (
        <Preview
          cover={<DocCoverPlate slug={d.slug} image={d.image} />}
          title={d.title}
          meta={d.period}
        >
          {d.description}
        </Preview>
      ),
    })

    const pages = new Set(NICHE_PARTS.map((part) => part.name))
    const email = decodeEmail(USER.emailB64)

    return [
      {
        label: "Pages",
        items: [
          page(
            "home",
            "Home",
            "/",
            <HomeIcon />,
            "Who I am, what I'm working on, and the newest projects."
          ),
          page(
            "projects",
            "Projects",
            "/projects",
            <BriefcaseIcon />,
            "Every case study, from design systems to shipped product.",
            ["work", "case studies", "portfolio"]
          ),
          page(
            "blog",
            "Blog",
            "/latest",
            <BookOpenIcon />,
            "Posts on tools, process and the things I'm building.",
            ["latest", "posts", "writing"]
          ),
          page(
            "components",
            "Components",
            "/components",
            <BoxIcon />,
            "Every part in fibo, base and special, each installable with one shadcn command.",
            ["fibo", "design system", "ui"]
          ),
          page(
            "fibo",
            "fibo lore",
            "/fibo",
            <RabbitIcon />,
            "The story behind fibo: a pixel rabbit, and the puzzle that started the Fibonacci sequence.",
            ["rabbit", "fibonacci", "design system"]
          ),
          page(
            "figma",
            "fibo in Figma",
            "/fibo/figma",
            <FigmaIcon />,
            "fibo's Figma library: variables, components and how they map to code.",
            ["figma", "library"]
          ),
          page(
            "recommendations",
            "Recommendations",
            "/recommendations",
            <QuoteIcon />,
            "What people I've worked with say about working with me.",
            ["testimonials", "references"]
          ),
        ],
      },
      {
        label: "About me",
        items: [
          page(
            "experience",
            "Experience",
            "/#experience",
            <BriefcaseIcon />,
            "Every role I've held, from design intern to staff product designer, with what I shipped in each.",
            ["work history", "jobs", "resume", "career"]
          ),
          page(
            "education",
            "Education",
            "/#education",
            <GraduationCapIcon />,
            "Where I studied.",
            ["school", "degree"]
          ),
          page(
            "stack",
            "Tech stack",
            "/#stack",
            <LayersIcon />,
            "The tools I design and build with.",
            ["tools", "software", "skills"]
          ),
          page(
            "awards",
            "Awards",
            "/#awards",
            <AwardIcon />,
            "Recognition for my work.",
            ["honors"]
          ),
          page(
            "certifications",
            "Certifications",
            "/#certs",
            <BadgeCheckIcon />,
            "Courses and certificates I've completed.",
            ["certs", "courses"]
          ),
          ...EXPERIENCES.flatMap((company) =>
            company.positions.map((role): CommandMenuItem => ({
              value: `role:${role.id}`,
              label: `${role.title}, ${company.companyName}`,
              icon: <BriefcaseIcon />,
              keywords: [
                "experience",
                "work history",
                "resume",
                company.companyName,
                ...(role.skills ?? []),
              ],
              context: years(role.employmentPeriod),
              onSelect: home(`role-${role.id}`),
              preview: (
                <Preview
                  title={`${role.title}, ${company.companyName}`}
                  meta={`${role.employmentPeriod.start} – ${role.employmentPeriod.end ?? "Present"}`}
                >
                  {firstLines(role.description)}
                </Preview>
              ),
            }))
          ),
        ],
      },
      {
        label: "Projects",
        items: docs.filter((d) => d.kind === "work").map(doc),
      },
      {
        label: "Blog",
        items: docs.filter((d) => d.kind === "latest").map(doc),
      },
      {
        label: "Components",
        items: CATALOG.filter((part) => part.status !== "deprecated").map(
          (part): CommandMenuItem => ({
            value: `part:${part.name}`,
            label: part.title,
            icon: <BoxIcon />,
            keywords: [part.group, part.shelf.replace("-", " "), "fibo"],
            onSelect: pages.has(part.name)
              ? go(`/components/${part.name}`)
              : away(fiboStorybookUrl(part.name)),
            preview: (
              <Preview
                cover={
                  <PartCoverPlate
                    name={part.name}
                    active={!reduceMotion}
                    className="rounded-md"
                  />
                }
                title={part.title}
                meta={
                  pages.has(part.name)
                    ? part.group
                    : `${part.group} · opens Storybook`
                }
              >
                {part.description}
              </Preview>
            ),
          })
        ),
      },
      {
        label: "Actions",
        items: [
          {
            value: "theme",
            label: "Change theme",
            icon: <PaletteIcon />,
            keywords: ["dark", "light", "mode"],
            placeholder: "Pick a theme…",
            preview: (
              <Preview title="Change theme">
                Light, dark, or whatever your system is set to. D toggles
                between light and dark from anywhere.
              </Preview>
            ),
            items: [
              {
                value: "theme-light",
                label: "Light",
                icon: <SunIcon />,
                onSelect: () => setTheme("light"),
              },
              {
                value: "theme-dark",
                label: "Dark",
                icon: <MoonIcon />,
                onSelect: () => setTheme("dark"),
              },
              {
                value: "theme-system",
                label: "System",
                icon: <MonitorIcon />,
                onSelect: () => setTheme("system"),
              },
            ],
          },
          {
            value: "copy-email",
            label: "Copy email",
            icon: <CopyIcon />,
            keywords: ["contact", "mail", "hire"],
            onSelect: () =>
              void copyToClipboardWithEvent(email, {
                name: "copy_email",
                properties: { source: "search" },
              }),
            preview: <Preview title="Copy email">{email}</Preview>,
          },
          {
            value: "linkedin",
            label: "LinkedIn",
            icon: SOCIAL_ICONS.linkedin,
            keywords: ["contact", "social"],
            onSelect: away(SOCIAL.linkedin.href),
            preview: (
              <Preview title="LinkedIn">
                Opens my LinkedIn profile in a new tab.
              </Preview>
            ),
          },
          {
            value: "github",
            label: "GitHub",
            icon: SOCIAL_ICONS.github,
            keywords: ["code", "repos", "social"],
            onSelect: away(SOCIAL.github.href),
            preview: (
              <Preview title="GitHub">
                Opens my GitHub in a new tab, fibo and this site included.
              </Preview>
            ),
          },
          {
            value: "x",
            label: "X",
            icon: SOCIAL_ICONS.x,
            keywords: ["twitter", "social"],
            onSelect: away(SOCIAL.x.href),
            preview: (
              <Preview title="X">Opens my X profile in a new tab.</Preview>
            ),
          },
        ],
      },
    ]
  }, [docs, router, setTheme, pathname, reduceMotion])

  return (
    <CommandMenu
      groups={groups}
      variant="inset"
      open={open}
      onOpenChange={onOpenChange}
      trigger={null}
      // fibo's own neutrals: the site's dark theme uses one gray for the
      // popover, the muted shell and the highlight, so none of them show.
      // On a phone the dialog sits near the top, short enough to stay above
      // the keyboard, and drops the key hints a touch screen can't use.
      popupClassName="site-search fibo-palette max-sm:top-[calc(env(safe-area-inset-top,0px)+0.75rem)] max-sm:h-[min(26rem,52svh)] max-sm:w-[calc(100vw-1.5rem)] max-sm:[&_[data-slot=command-menu-hints]]:hidden"
      label="Search the site"
      placeholder="Search projects, posts and components…"
      emptyText="Nothing matches that yet"
      storageKey="site-search-recent"
      hotkey={pathname === OWN_HOTKEY_PAGE ? null : "k"}
      onSelect={(item) =>
        trackEvent({
          name: "site_search_select",
          properties: { item: item.value },
        })
      }
    />
  )
}
