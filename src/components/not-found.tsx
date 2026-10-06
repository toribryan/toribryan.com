import Link from "next/link"

import { ArrowLeftIcon } from "@/components/animated-icons/arrow-left-icon"
import { Button } from "@/components/base/ui/button"
import { StaticTv } from "@/features/portfolio/components/iso/static-tv"

export function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center px-4 py-12">
      <section className="grid w-full max-w-4xl items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <StaticTv className="mx-auto w-full max-w-md" />
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-5xl font-semibold tracking-tight">Oops!</h1>
          <p className="max-w-xs text-xl text-balance text-muted-foreground">
            We couldn’t find the page you were looking for.
          </p>
          <Button
            className="mt-2"
            nativeButton={false}
            render={
              <Link href="/">
                <ArrowLeftIcon />
                Go home
              </Link>
            }
          />
        </div>
      </section>
    </div>
  )
}
