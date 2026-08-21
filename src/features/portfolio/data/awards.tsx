import { ClaudeIcon } from "@/components/icons"

import type { Award } from "../types/awards"

/**
 * The Astro site framed these as "highlights" — outcome metrics rather than
 * awards. They map onto the Awards panel because it's the only section built
 * for a headline figure plus context.
 */
export const AWARDS: Award[] = [
  {
    id: "spec-time",
    prize: "<30 min",
    title: "Design-to-dev spec time, down from 3 days–2 weeks",
    date: "2026",
    grade: "Proctorio",
    icon: <ClaudeIcon />,
    description: `- Built a shared Claude Code skills infrastructure that generates design-to-dev specs directly from prototypes.
- Hooks sync prototype changes into specs and release notes automatically.`,
  },
  {
    id: "adoption",
    prize: "100%",
    title: "Design team adoption of the new handoff process",
    date: "2026",
    grade: "Proctorio",
    description: `- Every designer on the team moved onto the prototype-forward handoff process.`,
  },
  {
    id: "variant-reduction",
    prize: "94%",
    title: "Fewer card variants after the design system overhaul",
    date: "2025",
    grade: "Proctorio",
    description: `- Consolidated a sprawling card inventory down to a governed set.`,
  },
]
