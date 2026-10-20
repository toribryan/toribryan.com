import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /**
   * Stamped once per build and inlined. Reading the clock at render time would
   * instead report whenever a page was regenerated, which drifts on the ISR
   * routes and disagrees with the fully static ones.
   */
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
    /**
     * Local fallback for the footer's Build field. Vercel supplies
     * `VERCEL_GIT_COMMIT_SHA` on deploys; off Vercel there is no such variable,
     * so read HEAD here. Empty string when git isn't available (a tarball
     * checkout, say), which `getBuildInfo` treats as "no sha".
     */
    LOCAL_GIT_COMMIT_SHA: (() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        return require("node:child_process")
          .execSync("git rev-parse HEAD", {
            stdio: ["ignore", "pipe", "ignore"],
          })
          .toString()
          .trim()
      } catch {
        return ""
      }
    })(),
  },
  reactStrictMode: true,
  typedRoutes: true,
  transpilePackages: ["next-mdx-remote"],
  devIndicators: false,
  experimental: {
    // Rewrite barrel imports to deep imports so a single icon doesn't pull the
    // whole package into the module graph. Next already optimizes lucide-react,
    // @tabler/icons-react, date-fns and lodash-es by default; these are the
    // heavy icon packages this app uses that are NOT on that default list.
    optimizePackageImports: [
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "@phosphor-icons/react",
      "@remixicon/react",
    ],
  },
  images: {
    qualities: [75, 100],
  },
  compiler:
    process.env.NODE_ENV === "production"
      ? {
          removeConsole: {
            exclude: ["error"],
          },
        }
      : undefined,
  async redirects() {
    return [
      {
        source: "/components/all",
        destination: "/components",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/components/:slug(map-marker|map-pin|pixel-snail)/:path*",
        destination: "/components",
        permanent: true,
      },
      {
        source: "/components/:slug(map-marker|map-pin|pixel-snail)",
        destination: "/components",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/components/:slug.md",
        destination: "/components/:slug/markdown",
      },
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ]
  },
  // PostHog's API paths end in a slash; Next's redirect would break them.
  skipTrailingSlashRedirect: true,
}

export default nextConfig
