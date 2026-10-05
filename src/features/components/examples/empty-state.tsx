"use client"

import { InboxIcon, SearchXIcon, UsersIcon } from "lucide-react"

import { Button } from "@/components/fibo/button"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/components/fibo/empty-state"

import { AnatomyMap, slot, type Callout } from "../components/anatomy-map"

function NoMembers() {
  return (
    <EmptyState>
      <EmptyStateMedia>
        <UsersIcon />
      </EmptyStateMedia>
      <EmptyStateTitle>No members yet</EmptyStateTitle>
      <EmptyStateDescription>
        Invite people to work on this project with you.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button size="sm">Invite members</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}

export function Default() {
  return (
    <div className="w-96 max-w-full rounded-lg border border-line">
      <NoMembers />
    </div>
  )
}

export function Small() {
  return (
    <div className="w-64 max-w-full rounded-xl border border-line bg-popover shadow-lg">
      <EmptyState size="sm">
        <EmptyStateTitle>No matching filters</EmptyStateTitle>
      </EmptyState>
    </div>
  )
}

export function NoMatches() {
  return (
    <div className="w-96 max-w-full rounded-lg border border-line">
      <EmptyState>
        <EmptyStateMedia>
          <SearchXIcon />
        </EmptyStateMedia>
        <EmptyStateTitle>No matching members</EmptyStateTitle>
        <EmptyStateDescription>
          Try another search, or clear the filters.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button variant="outline" size="sm">
            Clear filters
          </Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  )
}

export function TitleOnly() {
  return (
    <div className="w-96 max-w-full rounded-lg border border-line">
      <EmptyState>
        <EmptyStateMedia>
          <InboxIcon />
        </EmptyStateMedia>
        <EmptyStateTitle>You&apos;re all caught up</EmptyStateTitle>
      </EmptyState>
    </div>
  )
}

export function DoNextStep() {
  return (
    <EmptyState className="py-6">
      <EmptyStateMedia>
        <UsersIcon />
      </EmptyStateMedia>
      <EmptyStateTitle>No members yet</EmptyStateTitle>
      <EmptyStateActions>
        <Button size="sm">Invite members</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}

export function DontDeadEnd() {
  return (
    <EmptyState className="py-6">
      <EmptyStateTitle>Nothing here</EmptyStateTitle>
      <EmptyStateDescription>
        There is no data to display at this time.
      </EmptyStateDescription>
    </EmptyState>
  )
}

const PARTS: Callout[] = [
  { label: "Media", side: "left", find: slot("empty-state-media") },
  { label: "Title", side: "right", find: slot("empty-state-title") },
  {
    label: "Description",
    side: "left",
    find: slot("empty-state-description"),
  },
  { label: "Actions", side: "right", find: slot("empty-state-actions") },
  {
    label: "Empty state",
    side: "right",
    find: slot("empty-state"),
    outline: true,
    point: (part) => ({ x: part.right + 4, y: part.bottom }),
  },
]

/** The default example, with each part labeled. */
export function Anatomy() {
  return (
    <AnatomyMap callouts={PARTS}>
      <div className="flex justify-center px-10 py-12">
        <div data-anatomy-subject className="w-80 max-w-full">
          <NoMembers />
        </div>
      </div>
    </AnatomyMap>
  )
}
