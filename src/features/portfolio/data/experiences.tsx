import {
  CodeIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
  LayoutGridIcon,
  PaletteIcon,
  PenToolIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

/**
 * Start of the design career, used for the "N yrs" stamp on the Experience
 * panel. Dated from the first full-time design role, not freelance work.
 */
export const DESIGN_CAREER_START = "06.2021"

/**
 * Sourced from the master résumé, which is the record of every role, date and
 * figure. Two things there look odd and are correct: the independent practice
 * overlaps the Proctorio staff role because contracting ran through it the
 * whole time, and Proctorio appears twice because the return in 2025 was a
 * rehire at a higher level.
 */
export const EXPERIENCES: Experience[] = [
  {
    id: "tbds",
    companyName: "Tori Bryan Design Services",
    location: "Phoenix, Arizona",
    locationType: "Remote",
    positions: [
      {
        id: "tbds-design-engineer",
        title: "Design Engineer",
        employmentPeriod: {
          start: "08.2026",
        },
        employmentType: "Self-employed",
        icon: <CodeIcon />,
        description: `- Shifted my career toward design engineering to harden my front-end skills.
- Design systems, product design, and production front end for SLV Technologies' clients, including [Modern Care Homes](https://www.moderncarehomes.com/).
- Ship production code to SLV's codebase through GitHub PR review.
- Built and ship [this site](/latest/portfolio-website) in Next.js, React, Tailwind, shadcn, and Base UI.
- Built [fibo](/fibo), my own design system, published as a shadcn registry you install as source.`,
        skills: [
          "Design Systems",
          "Design Engineering",
          "React",
          "Next.js",
          "Tailwind CSS",
          "Storybook",
          "Claude Code",
        ],
      },
      {
        id: "tbds-product-designer",
        title: "Product Designer",
        employmentPeriod: {
          start: "02.2023",
          end: "07.2026",
        },
        employmentType: "Self-employed",
        icon: <PenToolIcon />,
        description: `- Partnered with SLV Technologies on web and product design for their clients.
- Designed the Review Center video player and action bar in Proctorio's [Integrity](https://proctorio.com/solutions/integrity).
- Designed Proctorio internal tools, dashboards, and 12+ documented design system components.
- Redesigned Proctorio's [help center](https://proctorio.com/support/hc) for students, administrators, and IT admins.
- Built brand identities for Hydra Endura and Mincredo.`,
        skills: [
          "Design Systems",
          "Product Design",
          "Web Design",
          "Information Architecture",
          "Wireframing",
          "Brand Design",
          "UX Writing",
          "Figma",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "proctorio",
    companyName: "Proctorio",
    companyWebsite: "https://proctorio.com",
    location: "Scottsdale, Arizona",
    positions: [
      {
        id: "proctorio-staff",
        title: "Staff Product Designer",
        employmentPeriod: {
          start: "09.2025",
          end: "08.2026",
        },
        employmentType: "Full-time",
        icon: <DraftingCompassIcon />,
        description: `- Owned the multi-brand design system and its governance across three products, on a [platform](https://proctorio.com/solutions) serving 8 million test takers.
- Coached designers and mentored juniors through structured critique.

Design system: [RDS v2 overhaul](/work/design-system-overhaul)

- Rebuilt 37 components with two engineers, MVP in 60 days.
- Cut card variants 94% and button variants 59%.
- Took buttons from 40% failing WCAG to 100% AAA.

Design operations: [Claude Code skill framework](/latest/design-skills-infrastructure)

- Cut spec production from up to 2 weeks to under 30 minutes, with full team adoption.
- Built [agentic handoff](/work/agentic-design-system) that syncs prototype changes into specs and release notes.

Product: [WebSweep](https://proctorio.com/solutions/vault), in Vault

- Shipped the first product on the new system. [Case study](/work/websweep).

Product: [AuthorProof](https://proctorio.com/solutions/origin), in Origin

- Took it from brief to production-ready MVP in 4 to 6 weeks. [Case study](/work/author-proof).

Product: [Integrity](https://proctorio.com/solutions/integrity), Proctorio's proctoring

- Designed Proctor Coverage Analytics and the Support Agent Dashboard.
- Shipped features for the session review product.
- Brought usability testing back with the Exam Precheck study.`,
        skills: [
          "Design Systems",
          "Design System Governance",
          "Token Architecture",
          "DesignOps",
          "End-to-end Product Design",
          "Data-dense Interfaces",
          "Prototyping",
          "Usability Testing",
          "Accessibility",
          "Mentorship",
          "Figma",
          "Claude Code",
          "Azure DevOps",
        ],
      },
      {
        id: "proctorio-product-designer",
        title: "Product Designer",
        employmentPeriod: {
          start: "06.2025",
          end: "09.2025",
        },
        employmentType: "Full-time",
        icon: <PenToolIcon />,
        description: `- Rejoined after two years of contracting, and stepped into Staff 90 days later.
- Shipped two product surfaces and the ProctorioX conference agenda site.
- Wrote the strategy proposal that became the design system overhaul.`,
        skills: [
          "Product Design",
          "Design Systems",
          "Design Strategy",
          "Figma",
        ],
      },
      {
        id: "proctorio-multimedia-designer",
        title: "Multimedia Designer",
        employmentPeriod: {
          start: "2022",
          end: "08.2023",
        },
        employmentType: "Full-time",
        icon: <PaletteIcon />,
        description: `- Led the full Proctorio rebrand: logo, color, visual language, and assets.
- Built Proctorio's first design system, then moved into product UI.
- Designed the ProctorioX conference branding.`,
        skills: [
          "Brand Design",
          "Visual Design",
          "Design Systems",
          "UI Design",
          "Web Design",
          "User Research",
          "Figma",
        ],
      },
      {
        id: "proctorio-multimedia-intern",
        title: "Multimedia Design Intern",
        employmentPeriod: {
          start: "06.2021",
          end: "2022",
        },
        employmentType: "Internship",
        icon: <GraduationCapIcon />,
        description: `- Proctorio's first full-time design intern.
- Designed conference and sales landing pages, print collateral, and the brand template system.`,
        skills: [
          "Graphic Design",
          "Print Design",
          "Template Systems",
          "Adobe Creative Suite",
        ],
      },
    ],
  },
  {
    id: "modern-care-homes",
    companyName: "Modern Care Homes",
    companyWebsite: "https://www.moderncarehomes.com/",
    locationType: "Remote",
    positions: [
      {
        id: "mch-product-designer",
        title: "Product Designer",
        employmentPeriod: {
          start: "2024",
        },
        employmentType: "Contract",
        icon: <LayoutGridIcon />,
        description: `- Defined the design system for the agent platform, via SLV Technologies.
- Designed the [senior living marketplace](/work/modern-care-homes) search end to end.
- Own the visual language: type, color, components, and page templates.`,
        skills: [
          "Design Systems",
          "Product Design",
          "Web Design",
          "Marketplace UX",
          "Figma",
        ],
      },
    ],
  },
  {
    id: "iron-diamond-media",
    companyName: "Iron Diamond Media",
    companyWebsite: "https://azbridemag.com/",
    locationType: "Remote",
    positions: [
      {
        id: "idm-web-designer",
        title: "Web Designer",
        employmentPeriod: {
          start: "2024",
        },
        employmentType: "Contract",
        icon: <LayoutGridIcon />,
        description: `- Redesigned the editorial site and vendor platform for seven bridal brands, via SLV Technologies.
- Built one themed design system the seven publications share, starting with [Arizona Bride](/work/arizona-bride).
- Designed a two-sided dashboard connecting vendors and couples.`,
        skills: [
          "Design Systems",
          "Web Design",
          "Editorial Design",
          "Multi-brand Theming",
          "HTML / CSS",
          "Figma",
        ],
      },
    ],
  },
]
