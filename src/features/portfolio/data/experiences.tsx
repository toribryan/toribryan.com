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
        description: `- Intentional career pivot toward hardening front-end technical skills through independent design engineering work.
- Full time since August 2026: design systems, product design, and the production front end that ships them, mainly through SLV Technologies for their clients.
- Contribute production code to the SLV Technologies codebase through GitHub PR review, deployed to production: Next.js, React, Tailwind, shadcn, Base UI, Astro, and Storybook.
- Built and ship [this site](/latest/portfolio-website) as a live Next.js codebase in React, Tailwind, shadcn, and Base UI.`,
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
        description: `- Independent practice partnering with SLV Technologies to deliver web and product design for their clients, alongside direct clients including Proctorio, Hydra Endura, and Mincredo.
- Contracted with Proctorio as a design system contributor and product designer: designed the Review Center video player and action bar in [Integrity](https://proctorio.com/solutions/integrity), internal tools and dashboards, and 12+ documented design system components.
- Redesigned Proctorio's multi-audience [help center](https://proctorio.com/support/hc) from scratch for students, administrators, and IT admins, with article taxonomy, role-based content visibility, and an internal CMS.
- Built brand identities for Hydra Endura and Mincredo: logo, brand guidelines, core UI components, and social strategy.`,
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
        description: `- Owned the multi-brand design system, its governance, and the technical design standards the design team and the engineering org build from, leading design across three products and eight surfaces on a [platform](https://proctorio.com/solutions) serving 8 million test takers.
- Coached designers on the system, reviewed work against its standards, and mentored junior designers and interns through structured critique.

Design system: [RDS v2 overhaul](/work/design-system-overhaul)

- Led a legacy overhaul with two engineers: 37 components, MVP in 60 days, button variants down 59% (1,160 to 480) and card variants down 94% (587 to 32).
- Took contrast from roughly 40% of button variants failing WCAG to a 100% AAA pass.
- Shipped the v2 Card in 1.5 days against 2 weeks for v1.

Design operations: [Claude Code skill framework](/latest/design-skills-infrastructure)

- Rebuilt design-to-engineering handoff around [agentic tooling](/work/agentic-design-system) and prototype-forward delivery: spec production and review dropped from 3 days to 2 weeks down to under 30 minutes, returning roughly 80 hours per cycle to design work, with 100% team adoption.
- Authored the shared skill framework behind it and the hooks that cascade prototype changes into specs and release notes automatically.

Product: [WebSweep](https://proctorio.com/solutions/vault), in Vault

- Shipped it as the first product surface on the overhauled system, establishing its design language and adding two components to the system: a graph and a table that collapses to cards on mobile. [Case study](/work/websweep).

Product: [AuthorProof](https://proctorio.com/solutions/origin), in Origin

- Took it from an assigned brief to a production-ready MVP in 4 to 6 weeks: tested the pre-chosen solution against user research, pitched a smaller flow, and designed it through. [Case study](/work/author-proof).

Product: [Integrity](https://proctorio.com/solutions/integrity), Proctorio's proctoring

- Designed the operational screens where dense exam and staffing data has to be read fast, including Proctor Coverage Analytics and the Support Agent Dashboard.
- Shipped features for a review product used by instructors, administrators, and proctoring agents, each opening the same session recording for a different reason.
- Made the case for putting usability testing back in the process, then ran it: the in-person Exam Precheck study, six participants across three demographics, made transparency a core design principle, and the 30+ customer beta reported majority high satisfaction on every targeted area.`,
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
        description: `- Rejoined Proctorio after two years of contracting with them, and stepped into the Staff role 90 days later.
- In those 90 days, designed and shipped two product surfaces, designed the ProctorioX conference agenda interface, and wrote the 60-day strategy proposal that became the design system overhaul.`,
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
        description: `- Led the full Proctorio rebrand (logo, color palette, visual language, and asset library), grounded in user personas, market strategy, user research, and EdTech competitive analysis.
- Built a first design system from scratch, then moved into product UI: components and screens for the product design system, guide sites reaching thousands of test-takers and institutions, and interfaces for internal tools and dashboards.
- Designed ProctorioX conference branding and managed material production across departments and attendees.`,
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
        description: `- First full-time design intern, helping kickstart Proctorio's design internship program.
- Designed landing pages for conferences and sales, print and conference collateral, and the digital brand template system, managing production vendors end to end.`,
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
        description: `- Via SLV Technologies: defined the design system for the agent platform and redesigned the [senior living search and discovery marketplace](/work/modern-care-homes), partnering with engineering.
- Designed the family-facing search end to end, for a tool that did not previously exist: multi-criteria filtering, facility listings, and profiles.
- Own the visual language: type scale, color, components, and page templates.`,
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
        description: `- Via SLV Technologies: partnered with engineering on a redesign of the editorial website and vendor platform across seven sister brands, starting with [Arizona Bride](/work/arizona-bride) and Minnesota Bride.
- Built one themed design system the seven publications share, and shipped its front-end styling and markup.
- Designed a two-sided dashboard connecting vendors and couples, and standardized ad placements to industry sizing.`,
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
