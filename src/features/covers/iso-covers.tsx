import type { ComponentProps, ComponentType, CSSProperties } from "react"
import { TerminalIcon } from "lucide-react"

import {
  ClaudeIcon,
  FigmaIcon,
  FramerIcon,
  GhosttyIcon,
  GitHubIcon,
  NextJsIcon,
  NotionIcon,
  ReactIcon,
  ShadcnIcon,
  StorybookIcon,
  TailwindCssIcon,
  WebStormIcon,
} from "@/components/icons"
import { HeroDither } from "@/features/portfolio/components/hero-dither"
import {
  DETAIL,
  FRONT,
  HAIR,
  rabbit,
} from "@/features/portfolio/components/iso/iso"
import { AWARDS } from "@/features/portfolio/data/awards"

import { Anim, boxHtml, IsoScene, OnTop, Raw, type Box } from "./iso-scene"

type Glyph = ComponentType<ComponentProps<"svg">>
type CoverProps = { loop?: boolean }

const INK = "fill-foreground"
const SOFT =
  "fill-[color-mix(in_oklab,var(--muted-foreground)_60%,var(--card))]"
const OUTLINE = `fill-muted stroke-border ${HAIR}`

/**
 * A slab of keycaps, each with a mark printed on its top, that press (or lift)
 * in turn.
 */
function KeyGrid({
  marks,
  cols,
  size = 30,
  gap = 8,
  motion = "iso-press",
  loop,
}: {
  marks: Glyph[]
  cols: number
  size?: number
  gap?: number
  motion?: "iso-press" | "iso-lift"
  loop?: boolean
}) {
  const rows = Math.ceil(marks.length / cols)
  const pitch = size + gap
  const base: Box = [
    -10,
    -10,
    0,
    cols * pitch - gap + 20,
    rows * pitch - gap + 20,
    8,
    8,
  ]
  const inset = size * 0.24
  const step = motion === "iso-press" ? 0.35 : 0.18
  return (
    <IsoScene bounds={[base, [0, 0, 8, base[3], base[4], 14]]} loop={loop}>
      <Raw html={boxHtml(base)} />
      {marks.map((Mark, n) => {
        const c = n % cols
        const r = Math.floor(n / cols)
        const x = c * pitch
        const y = r * pitch
        return (
          <Anim
            key={n}
            name={motion}
            duration={motion === "iso-press" ? 3.2 : 2.8}
            delay={(motion === "iso-press" ? n : c + r) * step}
          >
            <Raw html={boxHtml([x, y, 8, size, size, 8, 6])} />
            <OnTop x={x + inset} y={y + inset} z={16}>
              <g className="text-foreground" fill="currentColor">
                <Mark width={size - inset * 2} height={size - inset * 2} />
              </g>
            </OnTop>
          </Anim>
        )
      })}
    </IsoScene>
  )
}

/* Small UI glyphs for the Components cover, one per kind of part. */
const ui = (children: React.ReactNode): Glyph =>
  function UiGlyph(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {children}
      </svg>
    )
  }
const UI_GLYPHS: Glyph[] = [
  ui(<rect x="2" y="7" width="20" height="10" rx="5" />),
  ui(
    <>
      <rect x="2" y="7" width="20" height="10" rx="5" fill="none" />
      <circle cx="17" cy="12" r="3" />
    </>
  ),
  ui(
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" fill="none" />
      <path d="m8 12 3 3 5-6" fill="none" />
    </>
  ),
  ui(
    <>
      <path d="M3 12h18" fill="none" />
      <circle cx="9" cy="12" r="3.5" />
    </>
  ),
  ui(
    <>
      <circle cx="12" cy="9" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" fill="none" />
    </>
  ),
  ui(
    <>
      <rect x="2" y="6" width="20" height="12" rx="3" fill="none" />
      <path d="M7 10v4" fill="none" />
    </>
  ),
  ui(
    <>
      <rect x="3" y="8" width="18" height="8" rx="4" fill="none" />
      <circle cx="8" cy="12" r="1.5" />
    </>
  ),
  ui(
    <>
      <circle cx="12" cy="12" r="8" fill="none" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  ui(<path d="M4 7h16M4 12h16M4 17h10" fill="none" />),
]

/** /components: a slab of UI keycaps that lift in a wave. */
export function ComponentsCover({ loop }: CoverProps) {
  return <KeyGrid marks={UI_GLYPHS} cols={3} motion="iso-lift" loop={loop} />
}

/** The home page's Stack: the tools as keycaps. */
export function TechStackCover({ loop }: CoverProps) {
  return (
    <KeyGrid
      marks={[
        FigmaIcon,
        ReactIcon,
        NextJsIcon,
        TailwindCssIcon,
        StorybookIcon,
        ClaudeIcon,
        WebStormIcon,
        FramerIcon,
      ]}
      cols={4}
      loop={loop}
    />
  )
}

/** The Design Engineering a Portfolio post: the stack it settled on. */
export function PortfolioPostCover({ loop }: CoverProps) {
  return (
    <KeyGrid
      marks={[NextJsIcon, FramerIcon, WebStormIcon, GhosttyIcon]}
      cols={2}
      size={40}
      gap={10}
      loop={loop}
    />
  )
}

/** /projects: a stack of case-study folders, the top one lifting. */
export function ProjectsCover({ loop }: CoverProps) {
  const folder = (n: number) => {
    const x = (2 - n) * -8
    const y = (2 - n) * 8
    const z = n * 10
    return { x, y, z }
  }
  const draw = (n: number) => {
    const { x, y, z } = folder(n)
    return (
      <>
        <Raw html={boxHtml([x + 6, y - 8, z, 40, 12, 5, 4])} />
        <Raw html={boxHtml([x, y, z, 124, 84, 5, 5])} />
      </>
    )
  }
  const top = folder(2)
  return (
    <IsoScene
      bounds={[
        [-16, -8, 0, 140, 108, 40],
        [top.x, top.y - 8, top.z, 124, 92, 12],
      ]}
      loop={loop}
    >
      {draw(0)}
      {draw(1)}
      <Anim name="iso-lift" duration={3}>
        {draw(2)}
        <OnTop x={top.x} y={top.y} z={top.z + 5}>
          <rect
            className={OUTLINE}
            x="12"
            y="12"
            width="54"
            height="40"
            rx="3"
          />
          <rect className={INK} x="76" y="16" width="34" height="5" rx="2.5" />
          <rect className={SOFT} x="76" y="27" width="28" height="3" rx="1.5" />
          <rect className={SOFT} x="76" y="35" width="32" height="3" rx="1.5" />
          <rect className={SOFT} x="12" y="62" width="70" height="3" rx="1.5" />
        </OnTop>
      </Anim>
    </IsoScene>
  )
}

/** /fibo: the rabbit, hopping on Fibonacci's golden tiling. */
export function FiboLoreCover({ loop }: CoverProps) {
  const u = 1.6
  const squares = [
    [0, 0, 40],
    [40, 0, 24],
    [48, 24, 16],
    [40, 32, 8],
    [40, 24, 8],
  ].map(([x, y, s]) => [x * u, y * u, s * u])
  const spiral =
    "M0 64A64 64 0 0 1 64 0A38.4 38.4 0 0 1 102.4 38.4A25.6 25.6 0 0 1 76.8 64A12.8 12.8 0 0 1 64 51.2A12.8 12.8 0 0 1 76.8 38.4"
  return (
    <IsoScene
      bounds={[
        [-2, -2, 0, 108, 70, 6],
        [12, 12, 6, 40, 40, 44],
      ]}
      loop={loop}
    >
      <Raw html={boxHtml([-2, -2, 0, 108, 70, 6, 6])} />
      <OnTop x={0} y={0} z={6}>
        {squares.map(([x, y, s]) => (
          <rect
            key={`${x}-${y}`}
            className={DETAIL}
            x={x}
            y={y}
            width={s}
            height={s}
          />
        ))}
        <path
          className={`fill-none stroke-muted-foreground ${HAIR}`}
          d={spiral}
        />
      </OnTop>
      <Anim name="iso-hop" duration={1.8}>
        <Raw html={rabbit(32, 32, 6, [0, 1], 1, true)} />
      </Anim>
    </IsoScene>
  )
}

/** /recommendations: two quote cards, lifting in turn. */
export function RecommendationsCover({ loop }: CoverProps) {
  const card = (x: number, y: number, z: number, delay: number) => (
    <Anim name="iso-lift" duration={3.2} delay={delay}>
      <Raw html={boxHtml([x, y, z, 96, 60, 5, 6])} />
      <OnTop x={x} y={y} z={z + 5}>
        <text className={`${INK} font-serif`} x="8" y="44" fontSize="52">
          &ldquo;
        </text>
        <rect className={SOFT} x="34" y="16" width="52" height="3" rx="1.5" />
        <rect className={SOFT} x="34" y="24" width="44" height="3" rx="1.5" />
        <rect className={SOFT} x="34" y="32" width="48" height="3" rx="1.5" />
        <rect className={INK} x="10" y="46" width="26" height="4" rx="2" />
      </OnTop>
    </Anim>
  )
  return (
    <IsoScene bounds={[[0, 0, 0, 132, 104, 26]]} loop={loop}>
      {card(0, 0, 0, 0)}
      {card(36, 44, 16, 1.6)}
    </IsoScene>
  )
}

/** /fibo/figma: Figma's mark and fibo's, with the library flowing between. */
export function FiboFigmaCover({ loop }: CoverProps) {
  return (
    <IsoScene bounds={[[0, 0, 0, 152, 60, 18]]} loop={loop}>
      <Raw html={boxHtml([0, 0, 0, 152, 60, 6, 8])} />
      <OnTop x={0} y={0} z={6}>
        <path className={DETAIL} d="M54 30H98" strokeDasharray="3 3" />
      </OnTop>
      <OnTop x={54} y={30} z={6}>
        <Anim
          name="iso-travel"
          duration={2.4}
          style={{ "--to": "44px" } as CSSProperties}
        >
          <circle className={INK} r="3" />
        </Anim>
      </OnTop>
      <Raw html={boxHtml([12, 10, 6, 40, 40, 10, 8])} />
      <OnTop x={22} y={20} z={16}>
        <g className="text-foreground" fill="currentColor">
          <FigmaIcon width={20} height={20} />
        </g>
      </OnTop>
      <Raw html={boxHtml([100, 10, 6, 40, 40, 10, 8])} />
      <OnTop x={100} y={10} z={16}>
        <text
          className={`${INK} font-display`}
          x="20"
          y="25"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          letterSpacing="-0.4"
        >
          fibo
        </text>
      </OnTop>
    </IsoScene>
  )
}

/** The home page's Achievements: one column per headline figure, lit in turn. */
export function AchievementsCover({ loop }: CoverProps) {
  const heights = [26, 44, 62]
  const prizes = AWARDS.slice(0, 3).map((award) => award.prize)
  return (
    <IsoScene bounds={[[0, 0, 0, 120, 50, 68]]} loop={loop}>
      <Raw html={boxHtml([0, 0, 0, 120, 50, 6, 8])} />
      {heights.map((h, n) => {
        const x = 10 + n * 36
        return (
          <g key={x}>
            <Raw html={boxHtml([x, 11, 6, 28, 28, h, 3])} />
            <g transform={FRONT(x, 39, 6 + h)}>
              <text
                className={`${INK} font-mono`}
                x="14"
                y="12"
                fontSize="7"
                textAnchor="middle"
              >
                {prizes[n]}
              </text>
            </g>
            <OnTop x={x} y={11} z={6 + h}>
              <Anim name="iso-glow" duration={3.6} delay={n * 0.9}>
                <rect className={INK} width="28" height="28" rx="3" />
              </Anim>
            </OnTop>
          </g>
        )
      })}
    </IsoScene>
  )
}

/** The home page's top: the header's bunny in earbuds, dithered live. */
export function HomeCover() {
  return <HeroDither className="absolute inset-0" />
}

/** What a monitor shows of the work, in the screen's own units (90x42). */
const SCREENS = {
  work: (
    <>
      <path className={INK} d="M36 4 58 18 36 32Z" />
      <rect className="fill-border" x="0" y="38" width="90" height="2" rx="1" />
      <Anim
        name="iso-travel"
        duration={4}
        style={{ "--to": "86px" } as CSSProperties}
      >
        <rect className={INK} x="0" y="35" width="3" height="8" rx="1" />
      </Anim>
    </>
  ),
  ui: (
    <>
      <rect className="fill-border" width="90" height="5" rx="1" />
      <rect className={OUTLINE} x="0" y="10" width="38" height="30" rx="2" />
      <rect className={SOFT} x="46" y="12" width="40" height="3" rx="1.5" />
      <rect className={SOFT} x="46" y="19" width="34" height="3" rx="1.5" />
      <rect className={SOFT} x="46" y="26" width="38" height="3" rx="1.5" />
      <rect className={INK} x="46" y="34" width="20" height="6" rx="3" />
      <Anim
        name="iso-travel"
        duration={3.6}
        style={{ "--to": "38px" } as CSSProperties}
      >
        <path className={INK} d="M18 22v9l2.4-2.2 1.8 3.8 1.4-.7-1.8-3.6H25Z" />
      </Anim>
    </>
  ),
  systems: (
    <>
      {[0, 1, 2].flatMap((c) =>
        [0, 1].map((r) => (
          <g key={`${c}-${r}`}>
            <rect
              className={OUTLINE}
              x={c * 31}
              y={r * 23}
              width="28"
              height="19"
              rx="2"
            />
            <Anim name="iso-glow" duration={3} delay={(r * 3 + c) * 0.5}>
              <rect
                className={INK}
                x={c * 31}
                y={r * 23}
                width="28"
                height="19"
                rx="2"
              />
            </Anim>
          </g>
        ))
      )}
    </>
  ),
  code: (
    <>
      <text className={`${INK} font-mono`} x="0" y="9" fontSize="9">
        &lt;/&gt;
      </text>
      {[
        [0, 60],
        [8, 44],
        [8, 70],
        [0, 30],
      ].map(([indent, w], n) => (
        <Anim key={n} name="iso-write" duration={4} delay={n * 0.3}>
          <rect
            className={n % 2 ? SOFT : INK}
            x={indent}
            y={15 + n * 7}
            width={w}
            height="3"
            rx="1.5"
          />
        </Anim>
      ))}
      <Anim name="iso-blink" duration={1}>
        <rect className={INK} x="34" y="36" width="2" height="6" />
      </Anim>
    </>
  ),
} satisfies Record<string, React.ReactNode>

/** Logos in a grid on a screen, each lifting in turn. */
function AppGrid({
  marks,
  cols,
  size,
  gap,
}: {
  marks: Glyph[]
  cols: number
  size: number
  gap: number
}) {
  return marks.map((Mark, n) => {
    const x = (n % cols) * (size + gap)
    const y = Math.floor(n / cols) * (size + gap)
    return (
      <Anim key={n} name="iso-lift" duration={3.6} delay={n * 0.45}>
        <rect
          className={OUTLINE}
          x={x}
          y={y}
          width={size}
          height={size}
          rx={size / 4}
        />
        <g className="text-foreground" fill="currentColor">
          <Mark
            x={x + size * 0.2}
            y={y + size * 0.2}
            width={size * 0.6}
            height={size * 0.6}
          />
        </g>
      </Anim>
    )
  })
}

/** A logo from a file under /public, inked like the icon components. */
const fileMark = (src: string): Glyph =>
  function FileMark(props) {
    return (
      <svg viewBox="0 0 24 24" {...props}>
        <image
          href={src}
          width="24"
          height="24"
          className="brightness-0 dark:invert"
        />
      </svg>
    )
  }
const AdobeMark = fileMark("/Adobe.svg")
const UserTestingMark = fileMark("/UserTesting.svg")
function FigmaMcpMark(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <FigmaIcon x="5" y="0" width="14" height="14" />
      <text
        className="font-mono"
        x="12"
        y="23"
        fontSize="7.5"
        fontWeight="600"
        textAnchor="middle"
      >
        MCP
      </text>
    </svg>
  )
}

type Screen = keyof typeof SCREENS | Glyph[]

/** What sits on the desk at one point in the career. */
type Setup = {
  width: number
  screens: Screen[]
  tower?: "mini" | "pc"
  ipad?: boolean
  laptop?: Glyph[]
}

const SETUPS = {
  intern: { width: 200, screens: ["work"], tower: "mini" },
  multimedia: {
    width: 224,
    screens: ["work", "ui"],
    tower: "mini",
    ipad: true,
  },
  product: {
    width: 244,
    screens: ["ui", "systems"],
    tower: "mini",
    ipad: true,
    laptop: [FigmaIcon, UserTestingMark, NotionIcon, TailwindCssIcon],
  },
  staff: {
    width: 268,
    screens: ["systems", [ClaudeIcon, TerminalIcon, FigmaMcpMark, GitHubIcon]],
    tower: "pc",
    ipad: true,
    laptop: [FigmaIcon, UserTestingMark, NotionIcon, TailwindCssIcon],
  },
  engineer: {
    width: 268,
    screens: [
      "code",
      [
        WebStormIcon,
        GhosttyIcon,
        StorybookIcon,
        FigmaIcon,
        ReactIcon,
        ShadcnIcon,
      ],
    ],
    tower: "pc",
    ipad: true,
    laptop: [FigmaIcon, UserTestingMark, NotionIcon, TailwindCssIcon],
  },
} satisfies Record<string, Setup>

export type CareerStage = keyof typeof SETUPS

/** Each role's desk, by its id in `EXPERIENCES`. */
const ROLE_STAGES: Record<string, CareerStage> = {
  "proctorio-multimedia-intern": "intern",
  "proctorio-multimedia-designer": "multimedia",
  "tbds-product-designer": "product",
  "proctorio-product-designer": "product",
  "mch-product-designer": "product",
  "idm-web-designer": "product",
  "proctorio-staff": "staff",
  "tbds-design-engineer": "engineer",
}
export const careerStage = (roleId: string): CareerStage =>
  ROLE_STAGES[roleId] ?? "product"

function Monitor({ x, screen }: { x: number; screen: Screen }) {
  return (
    <>
      <Raw html={boxHtml([x + 41, 20, 6, 14, 6, 16, 2])} />
      <Raw html={boxHtml([x, 26, 22, 96, 6, 58, 4])} />
      <g transform={FRONT(x, 32, 80)}>
        <rect
          className={`fill-card stroke-border ${HAIR}`}
          x="4"
          y="4"
          width="88"
          height="50"
          rx="3"
        />
        <g transform="translate(7 8) scale(.9)">
          {Array.isArray(screen) ? (
            <g
              transform={
                screen.length > 4 ? "translate(8 0)" : "translate(0 12)"
              }
            >
              <AppGrid
                marks={screen}
                cols={screen.length > 4 ? 3 : 4}
                size={screen.length > 4 ? 19 : 18}
                gap={screen.length > 4 ? 9 : 6}
              />
            </g>
          ) : (
            SCREENS[screen]
          )}
        </g>
      </g>
    </>
  )
}

/**
 * A role on the home page: the desk at that point in the career, growing a
 * monitor, an iPad, a laptop and a PC build along the way, its screens
 * showing the work and tools of the time.
 */
export function RoleCover({
  stage,
  loop,
}: CoverProps & { stage: CareerStage }) {
  const setup: Setup = SETUPS[stage]
  const w = setup.width
  const monitors = setup.screens.length === 1 ? [(w - 96) / 2 - 14] : [12, 112]
  return (
    <IsoScene bounds={[[0, 0, 0, w, 112, 84]]} pad={4} fill loop={loop}>
      <Raw html={boxHtml([0, 0, 0, w, 112, 6, 6])} />
      {monitors.map((x, n) => (
        <Monitor key={x} x={x} screen={setup.screens[n]} />
      ))}
      {setup.tower === "mini" && (
        <Raw html={boxHtml([w - 38, 34, 6, 28, 28, 7, 5])} />
      )}
      {setup.tower === "pc" && (
        <>
          <Raw html={boxHtml([w - 36, 12, 6, 28, 52, 70, 3])} />
          <g transform={FRONT(w - 36, 64, 76)}>
            {[10, 16, 22, 28].map((y) => (
              <path key={y} className={DETAIL} d={`M6 ${y}H22`} />
            ))}
            <Anim name="iso-blink" duration={2}>
              <circle className={INK} cx="14" cy="60" r="2" />
            </Anim>
          </g>
        </>
      )}
      {setup.ipad && (
        <>
          <Raw html={boxHtml([10, 64, 6, 48, 36, 2, 4])} />
          <OnTop x={13} y={67} z={8}>
            <rect
              className={`fill-card stroke-border ${HAIR}`}
              width="42"
              height="30"
              rx="2"
            />
            <g className="text-foreground" fill="currentColor">
              <AdobeMark x="14" y="8" width="14" height="14" />
            </g>
          </OnTop>
        </>
      )}
      <Raw html={boxHtml([66, 70, 6, 70, 24, 3, 3])} />
      {setup.laptop && (
        <>
          <Raw html={boxHtml([w - 104, 62, 6, 60, 40, 3, 3])} />
          <Raw html={boxHtml([w - 104, 62, 9, 60, 3, 38, 3])} />
          <g transform={FRONT(w - 104, 65, 47)}>
            <rect
              className={`fill-card stroke-border ${HAIR}`}
              x="3"
              y="3"
              width="54"
              height="32"
              rx="2"
            />
            <g transform="translate(8 8)">
              <AppGrid marks={setup.laptop} cols={4} size={9} gap={3} />
            </g>
          </g>
        </>
      )}
    </IsoScene>
  )
}

function ExperienceCover({ loop }: CoverProps) {
  return <RoleCover stage="engineer" loop={loop} />
}

/** /latest: an open book whose pages write themselves. */
export function BlogCover({ loop }: CoverProps) {
  const lines = (offset: number) =>
    [48, 56, 40, 52, 30].map((w, n) => (
      <Anim key={n} name="iso-write" duration={5} delay={offset + n * 0.25}>
        <rect
          className={n === 0 ? INK : SOFT}
          x="8"
          y={10 + n * 12}
          width={w}
          height={n === 0 ? 5 : 3}
          rx="1.5"
        />
      </Anim>
    ))
  return (
    <IsoScene bounds={[[0, 0, 0, 152, 100, 10]]} loop={loop}>
      <Raw html={boxHtml([0, 0, 0, 152, 100, 3, 4])} />
      <Raw html={boxHtml([4, 4, 3, 70, 92, 6, 3])} />
      <Raw html={boxHtml([78, 4, 3, 70, 92, 6, 3])} />
      <OnTop x={4} y={4} z={9}>
        {lines(0)}
      </OnTop>
      <OnTop x={78} y={4} z={9}>
        {lines(1.4)}
      </OnTop>
    </IsoScene>
  )
}

/** The covers for search's page and section entries, keyed by entry. */
export const PAGE_COVERS: Record<string, ComponentType<CoverProps>> = {
  home: HomeCover,
  projects: ProjectsCover,
  blog: BlogCover,
  components: ComponentsCover,
  fibo: FiboLoreCover,
  figma: FiboFigmaCover,
  recommendations: RecommendationsCover,
  experience: ExperienceCover,
  stack: TechStackCover,
  awards: AchievementsCover,
}
