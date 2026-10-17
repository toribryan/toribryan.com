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
  // Feeds the site meta description (see config/site.ts), so it needs to read
  // as a description of the work. The header's lines live in headerLines.
  bio: "Product Designer specializing in design systems. Five years building B2B and B2B2C products, component libraries, and the tooling that connects design to production code.",
  headerLines: ["Designing: Products + Systems", "Medium: Code + Canvas"],
  address: "Arizona, United States",
  emailB64: "dG9yaWJyeWFuLmRlc2lnbkBnbWFpbC5jb20=", // toribryan.design@gmail.com
  website: "https://toribryan.com",
  jobTitle: "Product Designer",
  /** Shown under the name in the hero; broader than the job title. */
  discipline: "Product Designer",
  jobs: [
    {
      title: "Staff Product Designer",
      company: "Proctorio",
      website: "https://proctorio.com",
      experienceId: "proctorio",
    },
  ],
  about: `- I’m a Product Designer who uses a <mark data-variant="wavy">design systems approach</mark> to crafting interfaces.
- Five years building B2B and B2B2C products, component libraries, and the tooling that connects design to <mark data-variant="bracket">production code</mark>.
- Always exploring new tools and ways to create. I custom-built my own <mark data-icon="🖥️">PC</mark> by hand, and I’m currently learning the <mark data-icon="🥁">drums</mark> and studying the history of the <mark data-icon="🐚">golden ratio</mark> and its relevance to design today.
`,
  avatar: "/images/about/photo-1.jpg",
  headerAvatar: "/images/header/avatar.svg",
  headshot: "/images/header/profile-photo.webp",
  portrait: "/images/header/avatar-square.webp",
  avatarVariants: {
    lightOff: "/images/about/photo-1.jpg",
    lightOn: "/images/about/photo-1.jpg",
    darkOff: "/images/about/photo-1.jpg",
    darkOn: "/images/about/photo-1.jpg",
  },
  /**
   * The 1200x630 social card, not a photo: it is what renders when the link is
   * texted or pasted into Slack.
   */
  ogImage: "/og-tori-bryan-left.png",
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
