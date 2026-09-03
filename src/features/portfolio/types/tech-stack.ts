import type { TechKey } from "@/lib/tech"

/**
 * One entry in the home page Stack panel: which tool, and which groups it
 * shows under. The tool's title, link and icon come from the shared catalog
 * in `@/lib/tech` rather than being repeated here.
 */
export type TechStack = {
  key: TechKey
  categories: string[]
}
