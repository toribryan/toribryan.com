import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { cn } from "@/lib/utils"
import { PAGE_COVERS } from "@/features/covers/iso-covers"
import {
  CoverPlate,
  DocCoverPlate,
} from "@/features/doc/components/doc-cover-plate"
import { getOgFrames } from "@/features/og/frames"
import { LivePartCover } from "@/features/og/live-part-cover"

/*
 * Each route's social preview as a 1200x630 page, drawing the same covers as
 * the cards and the site search. `npm run og` captures every one listed on
 * the bare /og-frame index into public/og/.
 */
export const metadata: Metadata = {
  title: "Social frame",
  robots: { index: false, follow: false },
}

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { route: [] },
    ...getOgFrames().map((frame) => ({
      route: frame.route.slice(1).split("/"),
    })),
  ]
}

export default async function OgFrame({
  params,
}: PageProps<"/og-frame/[[...route]]">) {
  const { route = [] } = await params
  const frames = getOgFrames()

  if (route.length === 0) {
    return (
      <ul className="p-6 font-mono text-sm">
        {frames.map((frame) => (
          <li key={frame.route}>
            <a href={`/og-frame${frame.route}`}>{frame.route}</a>
          </li>
        ))}
      </ul>
    )
  }

  const frame = frames.find((f) => f.route === `/${route.join("/")}`)
  if (!frame) notFound()
  const Page = frame.page ? PAGE_COVERS[frame.page] : undefined
  const covers = [
    ...(Page
      ? [
          <CoverPlate key="page" className="rounded-xl">
            <Page loop />
          </CoverPlate>,
        ]
      : []),
    ...(frame.docs ?? []).map((doc) => (
      <DocCoverPlate
        key={doc.slug}
        slug={doc.slug}
        image={doc.image}
        className="rounded-xl"
      />
    )),
    ...(frame.parts ?? []).map((name) => (
      <LivePartCover key={name} name={name} />
    )),
  ]

  return (
    <main className="flex h-[630px] w-[1200px] gap-12 overflow-hidden bg-background p-12">
      <div className="flex w-[400px] shrink-0 flex-col justify-between">
        <p className="font-mono text-lg text-muted-foreground">toribryan.com</p>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-lg text-muted-foreground">
            {frame.kicker}
          </p>
          <h1 className="text-6xl leading-[1.05] font-medium tracking-tight text-balance">
            {frame.title}
          </h1>
        </div>
      </div>
      <div
        className={cn(
          "grid flex-1 content-center gap-4",
          covers.length > 1 && "grid-cols-2"
        )}
      >
        {covers}
      </div>
    </main>
  )
}
