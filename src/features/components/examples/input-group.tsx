"use client"

import { useState } from "react"
import { AtSignIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/fibo/button"
import { Field, FieldDescription, FieldLabel } from "@/components/fibo/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/fibo/input-group"
import { Kbd } from "@/components/fibo/kbd"

import { AnatomyMap, slot, type Callout } from "../components/anatomy-map"

function Search({ size }: { size?: "sm" | "default" }) {
  return (
    <InputGroup size={size} className="w-72 max-w-full">
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput type="search" placeholder="Search" aria-label="Search" />
    </InputGroup>
  )
}

export function Default() {
  return <Search />
}

export function Small() {
  return <Search size="sm" />
}

export function Ghost() {
  return (
    <div className="w-72 max-w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
      <InputGroup variant="ghost" className="h-11 border-b border-border">
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Type a command" aria-label="Command" />
        <InputGroupAddon align="inline-end">
          <Kbd>Esc</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <p className="px-3 py-6 text-center text-sm text-muted-foreground">
        Recent commands show here.
      </p>
    </div>
  )
}

export function WithAButton() {
  const [value, setValue] = useState("Lovelace")
  return (
    <InputGroup className="w-72 max-w-full">
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search people"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {value ? (
        <InputGroupAddon align="inline-end">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Clear search"
            onClick={() => setValue("")}
          >
            <XIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export function InAField() {
  return (
    <Field className="w-72 max-w-full" invalid>
      <FieldLabel>Handle</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <AtSignIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput defaultValue="ada" />
      </InputGroup>
      <FieldDescription>Letters, numbers and dashes.</FieldDescription>
    </Field>
  )
}

export function DoIconInside() {
  return (
    <InputGroup className="w-56">
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput aria-label="Search" placeholder="Search" />
    </InputGroup>
  )
}

export function DontIconOutside() {
  return (
    <div className="flex w-56 items-center gap-2">
      <SearchIcon aria-hidden="true" className="size-4 text-muted-foreground" />
      <InputGroup>
        <InputGroupInput aria-label="Search" placeholder="Search" />
      </InputGroup>
    </div>
  )
}

const PARTS: Callout[] = [
  { label: "Addon", side: "left", find: slot("input-group-addon") },
  { label: "Input", side: "right", find: slot("input-group-control") },
  {
    label: "Group",
    side: "right",
    find: slot("input-group"),
    outline: true,
    point: (part) => ({ x: part.right + 4, y: part.bottom }),
  },
]

/** A search field, with each part labeled. */
export function Anatomy() {
  return (
    <AnatomyMap callouts={PARTS}>
      <div className="flex justify-center px-10 py-12">
        <div data-anatomy-subject>
          <InputGroup className="w-56">
            <InputGroupAddon>
              <SearchIcon aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput aria-label="Search" placeholder="Search" />
          </InputGroup>
        </div>
      </div>
    </AnatomyMap>
  )
}
