import type { Metadata } from "next"

import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { AnimationsPauseToggle } from "@/components/animations-pause"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { GalleryGrid } from "@/features/gallery/components/gallery-grid"
import { GALLERY } from "@/features/gallery/data/gallery"

const title = "Gallery"

export const metadata: Metadata = {
  title,
  description: "Screens, covers and design artifacts from my work.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery", type: "website" },
}

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: title, href: "/gallery" },
        ])}
      />

      <PageHeading className="screen-line-bottom">
        <PageHeadingTagline>Work</PageHeadingTagline>
        <div className="relative">
          <PageHeadingTitle className="pr-14">Gallery</PageHeadingTitle>
          <AnimationsPauseToggle className="absolute top-1/2 right-3 -translate-y-1/2" />
        </div>
      </PageHeading>

      <div className="p-2 pb-4">
        <GalleryGrid items={GALLERY} />
      </div>
    </>
  )
}
