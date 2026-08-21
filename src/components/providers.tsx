"use client"

import { ProgressProvider } from "@bprogress/next/app"
import { Provider as JotaiProvider } from "jotai"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider as RadixTooltipProvider } from "@/components/ui/tooltip"
import { TooltipProvider as BaseTooltipProvider } from "@/components/base/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ThemeProvider
        enableSystem
        disableTransitionOnChange
        enableColorScheme
        storageKey="theme"
        // Light by default rather than following the OS: a first-time visitor
        // sees the site the way it's meant to be seen. `enableSystem` stays on,
        // so anyone who picks System still gets it, and the choice persists.
        defaultTheme="light"
        attribute="class"
      >
        <ProgressProvider
          color="var(--foreground)"
          height="2px"
          delay={500}
          options={{ showSpinner: false }}
        >
          <BaseTooltipProvider>
            <RadixTooltipProvider>{children}</RadixTooltipProvider>
          </BaseTooltipProvider>
        </ProgressProvider>

        <Toaster position="top-center" />
      </ThemeProvider>
    </JotaiProvider>
  )
}
