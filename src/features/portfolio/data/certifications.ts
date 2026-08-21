import type { Certification } from "@/features/portfolio/types/certifications"

/**
 * Credential IDs and verification URLs weren't recorded anywhere in the Astro
 * site, so they're left blank rather than invented. Fill them in and the cards
 * become links automatically.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    title: "IRB – Social and Behavioral Research",
    issuer: "CITI Program",
    issueDate: "2023-01-01",
    credentialID: "",
    credentialURL: "",
  },
  {
    title: "Search Engine Optimization",
    issuer: "Stukent",
    issueDate: "2022-01-01",
    credentialID: "",
    credentialURL: "",
  },
]
