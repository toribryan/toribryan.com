import Link from "next/link"

import { ArrowLeftIcon } from "@/components/animated-icons/arrow-left-icon"
import { Button } from "@/components/base/ui/button"
import { StaticTv } from "@/features/portfolio/components/iso/static-tv"

export function NotFound() {
  return (
    <div className="isolate overflow-x-clip px-2">
      <div className="mx-auto flex min-h-svh flex-col border-x border-line md:max-w-3xl">
        <div className="screen-line-bottom flex-1" />
        <div className="stripe-divider" />
        <section className="screen-line-top screen-line-bottom grid items-center md:grid-cols-[1.2fr_1fr]">
          <StaticTv className="mx-auto w-full max-w-md p-6 md:p-8" />
          <div className="flex flex-col items-start gap-4 border-t border-line p-6 md:justify-center md:self-stretch md:border-t-0 md:border-l md:p-8">
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
        <div className="stripe-divider" />
        <div className="screen-line-top flex-1" />
      </div>
    </div>
  )
}
