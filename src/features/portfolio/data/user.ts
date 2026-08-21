import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Tori",
  lastName: "Bryan",
  displayName: "Tori Bryan",
  username: "toribryan",
  // Pronouns aren't stated anywhere in the source repo, so this is left unset
  // rather than guessed. Add it here and it will flow into the profile header
  // and the JSON-LD Person node.
  // pronouns: "",
  bio: "Questioning everything, all the time.",
  flipSentences: [
    "Questioning everything, all the time.",
    "Staff Product Designer @ Proctorio.",
    "Working at the seam of product design and engineering.",
    "Design systems, and the standards that keep them honest.",
  ],
  address: "Arizona, United States",
  emailB64: "dG9yaWJyeWFuLmRlc2lnbkBnbWFpbC5jb20=", // toribryan.design@gmail.com
  website: "https://toribryan.design",
  jobTitle: "Staff Product Designer",
  jobs: [
    {
      title: "Staff Product Designer",
      company: "Proctorio",
      website: "https://proctorio.com",
      experienceId: "proctorio",
    },
  ],
  about: `- I'm Tori Bryan — a Staff Product Designer at Proctorio, where I own end-to-end product design across three products, our design system and its governance, and the standards for how work moves from concept into production.
- Five years across education technology, solving real user problems: exam integrity, proctor coverage, support tooling, and the systems that hold them together.
- Lately I work at the seam of design and engineering — building an agentic design-to-dev pipeline that cut spec production from days to under 30 minutes, with full team adoption.
- Always exploring new tools and ways to create. Currently learning the drums, and studying the history of the golden ratio and its relevance to design today.
`,
  avatar: "/images/about/photo-1.jpg",
  avatarVariants: {
    lightOff: "/images/about/photo-1.jpg",
    lightOn: "/images/about/photo-1.jpg",
    darkOff: "/images/about/photo-1.jpg",
    darkOn: "/images/about/photo-1.jpg",
  },
  ogImage: "/images/about/photo-1.jpg",
  keywords: [
    "tori bryan",
    "toribryan",
    "product designer",
    "staff product designer",
    "design systems",
    "edtech design",
    "proctorio",
    "design engineering",
    "designops",
  ],
  timeZone: "America/Phoenix",
  dateCreated: "2026-01-01",
}
