"use client"

import { useEffect, useRef } from "react"

import { trackEvent } from "@/lib/events"

/** Sits at the end of a case study and reports once when it scrolls into view. */
export function CaseStudyRead({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      trackEvent({ name: "case_study_read", properties: { slug } })
      observer.disconnect()
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [slug])

  return <div ref={ref} aria-hidden />
}
