import {
  DraftingCompassIcon,
  LayoutGridIcon,
  PenToolIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "proctorio",
    companyName: "Proctorio",
    companyWebsite: "https://proctorio.com",
    location: "Arizona, United States",
    locationType: "Remote",
    positions: [
      {
        id: "proctorio-staff",
        title: "Staff Product Designer",
        employmentPeriod: {
          start: "2024",
        },
        employmentType: "Full-time",
        icon: <DraftingCompassIcon />,
        description: `- Own end-to-end product design across three products, the design system and its governance, and the standards for how work moves from concept into production.
- Built a shared Claude Code skills infrastructure that generates design-to-dev specs directly from prototypes — spec production dropped from 3 days–2 weeks to under 30 minutes, returning up to ~80 hours per handoff cycle to design work, with 100% design team adoption.
- Led the design system overhaul that cut card variants by 94%.
- Shipped Proctor Coverage, embedded analytics that turn proctor coverage from an assumption into evidence.
- Redesigned the Support Agent Dashboard so agents arrive at in-exam chats already holding session context.
- Lead product design decisions across all products from user data rather than opinion.`,
        skills: [
          "End-to-end Product Design",
          "Design Systems",
          "DesignOps",
          "Figma",
          "Claude Code",
          "Prototyping",
          "Usability Testing",
          "Azure",
        ],
      },
      {
        id: "proctorio-product",
        title: "Product Designer",
        employmentPeriod: {
          start: "2021",
          end: "2024",
        },
        employmentType: "Full-time",
        icon: <PenToolIcon />,
        description: `- Designed across the exam-integrity product surface, from student-facing precheck flows to internal proctoring tools.
- Ran usability testing and user interviews to define problems under ambiguity.
- Authored PRDs, handoff specs, test plans, and UX copy.`,
        skills: [
          "Product Design",
          "User Research",
          "Figma",
          "UX Writing",
          "Documentation",
        ],
      },
    ],
    isCurrentEmployer: true,
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
        description: `- Built the Senior Living design system from scratch and designed the marketing site on top of it.
- Owned the visual language end to end: type scale, colour, components, and page templates.`,
        skills: ["Design Systems", "Web Design", "Figma"],
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
          start: "2023",
        },
        employmentType: "Contract",
        icon: <LayoutGridIcon />,
        description: `- Partnered with engineering on a redesign of the editorial website and vendor platform across seven sister brands, starting with Arizona Bride.`,
        skills: ["Web Design", "Editorial Design", "Figma"],
      },
    ],
  },
]
