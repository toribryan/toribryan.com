import type { Metadata } from "next"
import Link from "next/link"

import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { ArrowUpRightIcon } from "@/components/animated-icons/arrow-up-right-icon"
import { AnimationsPauseToggle } from "@/components/animations-pause"
import { Button } from "@/components/base/ui/button"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { CatalogList } from "@/features/portfolio/components/components/component-card-list"
import {
  FigmaIcon,
  GithubIcon,
  StorybookIcon,
} from "@/features/portfolio/components/fibo-hero/brand-icons"
import { FIBO } from "@/features/portfolio/components/fibo-hero/links"
import { FiboInstall } from "@/features/portfolio/components/fibo-install"

const title = "Components"
const description =
  "Every part in fibo, base and special. Each installs as source with one shadcn command."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/components" },
  openGraph: { url: "/components", type: "website" },
}

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: title, href: "/components" },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>fibo</PageHeadingTagline>
        <div className="relative">
          <PageHeadingTitle className="pr-14">Components</PageHeadingTitle>
          <AnimationsPauseToggle className="absolute top-1/2 right-3 -translate-y-1/2" />
        </div>
        <PageHeadingDescription>{description}</PageHeadingDescription>
      </PageHeading>

      <div className="screen-line-bottom flex flex-wrap gap-2 p-4">
        <Button
          size="sm"
          nativeButton={false}
          render={<a href={FIBO.catalog} target="_blank" rel="noreferrer" />}
        >
          <StorybookIcon data-icon="inline-start" />
          All of fibo in Storybook
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          nativeButton={false}
          render={<Link href="/fibo/figma" />}
        >
          <FigmaIcon data-icon="inline-start" />
          Figma
        </Button>
        <Button
          size="sm"
          variant="outline"
          nativeButton={false}
          render={<a href={FIBO.github} target="_blank" rel="noreferrer" />}
        >
          <GithubIcon data-icon="inline-start" />
          GitHub
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
      </div>

      <div className="screen-line-bottom">
        <FiboInstall />
      </div>

      <CatalogList />

      <div className="screen-line-top h-4" />
    </>
  )
}
