import OG_ROUTES from "@/config/og-routes.json"
import { SITE_INFO } from "@/config/site"

const generated = new Set<string>(OG_ROUTES)

/**
 * A route's own social preview, the still and the MP4 Messages plays, once
 * `npm run og` has made them. Until then, `fallback` or the site's card.
 */
export function routePreview(route: string, alt: string, fallback?: string) {
  if (!generated.has(route)) {
    return fallback
      ? { images: [{ url: fallback, alt }] }
      : { images: [SITE_INFO.ogImage], videos: [SITE_INFO.ogVideo] }
  }
  const file = `/og${route}`
  return {
    images: [{ url: `${file}.png`, width: 1200, height: 630, alt }],
    // Absolute, like the site's, since Next doesn't resolve videos.
    videos: [
      {
        ...SITE_INFO.ogVideo,
        url: `${SITE_INFO.url}${file}.mp4`,
        secureUrl: `${SITE_INFO.url}${file}.mp4`,
      },
    ],
  }
}
