import type { Metadata } from "next"

import { BrandMark } from "@/components/brand-mark"

export const metadata: Metadata = {
  title: "Password required",
  description: "This site is password protected.",
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const { error, next } = await searchParams

  const hasError = error === "1"
  const intended = typeof next === "string" ? next : "/"

  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-8 rounded-2xl bg-surface px-8 py-10 text-center inset-ring-1 inset-ring-border/64">
        <div className="flex flex-col items-center gap-3">
          <BrandMark className="size-9 text-foreground" />

          <div className="flex flex-col gap-1">
            <p className="font-heading text-lg leading-none font-medium">
              tori bryan
            </p>
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Password protected
            </p>
          </div>
        </div>

        <form
          method="POST"
          action="/api/login"
          className="flex w-full flex-col gap-3"
        >
          <input type="hidden" name="next" value={intended} />

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              autoFocus
              aria-invalid={hasError || undefined}
              aria-describedby={hasError ? "password-error" : undefined}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-center text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 aria-invalid:border-destructive"
            />

            {hasError && (
              <p
                id="password-error"
                role="alert"
                className="text-center text-sm text-destructive"
              >
                Incorrect password — try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
