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
    "questioning everything, all the time.",
    "designing systems + products",
  ],
  address: "Arizona, United States",
  emailB64: "dG9yaWJyeWFuLmRlc2lnbkBnbWFpbC5jb20=", // toribryan.design@gmail.com
  website: "https://toribryan.com",
  jobTitle: "Design Engineer",
  /** Shown in the Overview; broader than the job title under the name. */
  discipline: "Product + Design Engineering",
  jobs: [
    {
      title: "Staff Product Designer",
      company: "Proctorio",
      website: "https://proctorio.com",
      experienceId: "proctorio",
    },
  ],
  about: `- I am Product Designer who specializes in building Design Systems. I like to focus on the Design Engineering aspect, making sure that innovative ideas come to life using the right technology.
- With over 5 years of experience in education technology design, I’m focused on addressing real user challenges and the systems that support them.
- Recently I built an agentic design-to-dev pipeline that cut spec production from days to under 30 minutes, with full team adoption.
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
