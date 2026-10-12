"use client"

import { useReducedMotion } from "motion/react"

import { PartCoverPlate } from "@/features/portfolio/components/components/component-card-list"

/** A part's plate that plays, except for the still, which captures with reduced motion. */
export function LivePartCover({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  return (
    <PartCoverPlate name={name} active={!reduceMotion} className={className} />
  )
}
