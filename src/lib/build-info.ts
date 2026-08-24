import { USER } from "@/features/portfolio/data/user"

import packageJson from "../../package.json"

/**
 * Reads the Vercel deployment environment variables, which are server-side
 * only — do not import this from a client component. Set them in `.env.local`
 * to exercise the non-development rendering.
 */

const SHORT_SHA_LENGTH = 7

export type BuildEnvironment = "production" | "preview" | "development"

export type BuildInfo = {
  commitShortSha: string | null
  /** Null while running locally, where HEAD is often unpushed. */
  commitUrl: string | null
  environment: BuildEnvironment
  /** YYYY-MM-DD, in the site owner's time zone. */
  date: string
}

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: USER.timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

/** Stamped by `next.config.ts` at build time. */
const BUILD_DATE = dateFormatter.format(
  process.env.BUILD_TIMESTAMP
    ? new Date(process.env.BUILD_TIMESTAMP)
    : new Date()
)

function resolveEnvironment(): BuildEnvironment {
  const vercelEnv = process.env.VERCEL_ENV
  return vercelEnv === "production" || vercelEnv === "preview"
    ? vercelEnv
    : "development"
}

export function getBuildInfo(): BuildInfo {
  const environment = resolveEnvironment()
  // Vercel's variable on a deploy; HEAD stamped by `next.config.ts` otherwise,
  // so the field reads the same locally as it does in production instead of
  // going blank. The link is still withheld locally: HEAD is often unpushed.
  const commitSha =
    process.env.VERCEL_GIT_COMMIT_SHA || process.env.LOCAL_GIT_COMMIT_SHA
  const owner = process.env.VERCEL_GIT_REPO_OWNER
  const slug = process.env.VERCEL_GIT_REPO_SLUG
  const repoSlug = owner && slug ? `${owner}/${slug}` : null

  return {
    commitShortSha: commitSha?.slice(0, SHORT_SHA_LENGTH) ?? null,
    // Vercel exposes the repo slug and provider, so the commit link is derived
    // rather than hardcoded to one repository.
    commitUrl:
      commitSha && environment !== "development" && repoSlug
        ? `https://github.com/${repoSlug}/commit/${commitSha}`
        : null,
    environment,
    date: BUILD_DATE,
  }
}

const STACK_DEPENDENCIES = ["next", "react", "tailwindcss"]

const declaredVersions: Record<string, string | undefined> = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
}

/** The stack in npm spec form: `["next@16.3.0", …]`. */
export function getStack(): string[] {
  return STACK_DEPENDENCIES.flatMap((dependency) => {
    // Drops the range prefix, so `^4.3.3` reads as a version.
    const version = declaredVersions[dependency]?.replace(/^[^\d]*/, "")
    return version ? [`${dependency}@${version}`] : []
  })
}
