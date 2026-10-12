export type Recommendation = {
  name: string
  role: string
  /** How they worked with Tori, as LinkedIn records it. */
  relationship: "Same team" | "Different teams"
  /** Month given, as `YYYY-MM`. */
  date: string
  /** A verbatim excerpt from the full recommendation, set off within it on the page. */
  quote: string
  /** The whole recommendation, verbatim, paragraphs split by a blank line. Until it's in, the page shows the quote and links to LinkedIn. */
  text?: string
  /** Their LinkedIn profile, linked from their name on the recommendations page. */
  profile?: string
}
