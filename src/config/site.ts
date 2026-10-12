import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { USER } from "@/features/portfolio/data/user"

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.toribryan.com"

export const SITE_INFO = {
  name: USER.displayName,
  url: SITE_URL,
  ogImage: USER.ogImage,
  /**
   * The social card's animated version. Messages on iPhone and Mac download a
   * direct MP4 named here and play it in the link bubble; everywhere else
   * falls back to `ogImage`. Messages caps preview assets at 10 MB. Absolute,
   * because Next resolves `metadataBase` for images but not for videos.
   */
  ogVideo: {
    url: `${SITE_URL}/og-tori-bryan-left.mp4`,
    secureUrl: `${SITE_URL}/og-tori-bryan-left.mp4`,
    type: "video/mp4",
    width: 1200,
    height: 630,
  },
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#fdfcfb",
  dark: "#0f0f0f",
}

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Blog",
    href: "/latest",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Components",
    href: "/components",
  },
]

/** The floating nav's destinations on phones, written out. */
export const MOBILE_NAV: NavItem<Route>[] = [
  { title: "Home", href: "/" },
  { title: "Components", href: "/components" },
  { title: "Blog", href: "/latest" },
]

/** Every page, in the menu beside the floating nav. */
export const MOBILE_MENU: NavItem<Route>[] = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Components", href: "/components" },
  { title: "Fibo lore", href: "/fibo" },
  { title: "Blog", href: "/latest" },
]

export const UTM_PARAMS = {
  utm_source: "toribryan.com",
}
