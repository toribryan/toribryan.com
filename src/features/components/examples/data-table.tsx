"use client"

import * as React from "react"
import { useCreateAtom, useSelector } from "@tanstack/react-store"
import {
  CheckIcon,
  DownloadIcon,
  FileTextIcon,
  PencilIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/fibo/button"
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableBulkAction,
  DataTableBulkActions,
  dataTableCodecs,
  DataTableContent,
  DataTableFooter,
  DataTableSelectionCount,
  useDataTable,
  useSearchParamsAtom,
} from "@/components/fibo/data-table"
import { MenuItem } from "@/components/fibo/menu"

import {
  COLUMNS_WITH_EMAIL,
  MEMBERS,
  MembersTable,
  MembersToolbar,
  PAGINATION,
  selection,
} from "./data-table-data"

/*
 * Pages hold five rows, so Select all matching has a sixth to offer, as in
 * fibo's playground.
 */
export function Default() {
  return (
    <div className="w-full">
      <MembersTable
        pageSize={5}
        toolbar={<MembersToolbar />}
        footer={PAGINATION}
      />
    </div>
  )
}

const PAGE_OF_FOUR = dataTableCodecs.pagination(4)

/*
 * The panel shows what the atoms write, from their own values, rather than
 * reading the URL during render, so the server and the first client render
 * agree.
 */
export function UrlSynced() {
  const sorting = useSearchParamsAtom("sort", dataTableCodecs.sorting)
  const globalFilter = useSearchParamsAtom("q", dataTableCodecs.text)
  const columnFilters = useSearchParamsAtom(
    "filters",
    dataTableCodecs.columnFilters
  )
  const page = useSearchParamsAtom("page", PAGE_OF_FOUR)
  const values = {
    sort: dataTableCodecs.sorting.serialize(useSelector(sorting)),
    q: dataTableCodecs.text.serialize(useSelector(globalFilter)),
    filters: dataTableCodecs.columnFilters.serialize(
      useSelector(columnFilters)
    ),
    page: PAGE_OF_FOUR.serialize(useSelector(page)),
  }
  const shown = Object.entries(values).flatMap(([key, value]) =>
    value === null ? [] : [`${key}=${value}`]
  )
  return (
    <div className="flex w-full flex-col gap-3">
      <MembersTable
        atoms={{ sorting, globalFilter, columnFilters, pagination: page }}
        toolbar={<MembersToolbar />}
        footer={PAGINATION}
      />
      <output
        aria-label="Search params"
        className="rounded-md border border-border px-3 py-2 font-mono text-xs break-all text-muted-foreground"
      >
        {shown.length ? `?${shown.join("&")}` : "No search params yet"}
      </output>
    </div>
  )
}

export function FacetedFilters() {
  return (
    <div className="w-full">
      <MembersTable toolbar={<MembersToolbar />} />
    </div>
  )
}

export function ColumnVisibility() {
  return (
    <div className="w-full max-w-2xl">
      <MembersTable
        hiddenColumns={["lastActive"]}
        toolbar={<MembersToolbar />}
      />
    </div>
  )
}

export function Locked() {
  return (
    <div className="w-full">
      <MembersTable members={MEMBERS.slice(3, 6)} />
    </div>
  )
}

export function SecondaryText() {
  return (
    <div className="w-full">
      <MembersTable columns={COLUMNS_WITH_EMAIL} initialSelection={["priya"]} />
    </div>
  )
}

export function WithPagination() {
  return (
    <div className="w-full">
      <MembersTable
        pageSize={4}
        toolbar={<MembersToolbar />}
        footer={PAGINATION}
      />
    </div>
  )
}

type Document = { id: string; title: string; access: string }

const DOCUMENTS: Document[] = [
  { id: "onboarding", title: "Onboarding checklist", access: "Workspace" },
  { id: "brand", title: "Brand guidelines", access: "Public" },
  { id: "release", title: "Release notes", access: "Public" },
]

const doc = createDataTableColumnHelper<Document>()
const DOCUMENT_COLUMNS = doc.columns([
  doc.accessor("title", {
    header: "Title",
    meta: { type: "primary", icon: <FileTextIcon /> },
  }),
  doc.accessor("access", { header: "Access" }),
])

export function Picker() {
  const table = useDataTable({
    data: DOCUMENTS,
    columns: DOCUMENT_COLUMNS,
    initialState: { rowSelection: selection(["onboarding", "release"]) },
  })
  return (
    <div className="w-full">
      <DataTable
        table={table}
        aria-label="Documents"
        noun={{ one: "document", other: "documents" }}
      >
        <DataTableContent />
        <DataTableFooter>
          <DataTableSelectionCount />
        </DataTableFooter>
      </DataTable>
    </div>
  )
}

const PATTERNS: [string, React.ReactNode][] = [
  ["Delete only", <DataTableBulkActions key="a" onDelete={() => {}} />],
  [
    "Export",
    <DataTableBulkActions key="b" onDelete={() => {}}>
      <DataTableBulkAction icon={<DownloadIcon data-icon="inline-start" />}>
        Export
      </DataTableBulkAction>
    </DataTableBulkActions>,
  ],
  [
    "Several",
    <DataTableBulkActions
      key="c"
      onDelete={() => {}}
      moreActions={
        <>
          <MenuItem>Add to project</MenuItem>
          <MenuItem>Resend invite</MenuItem>
        </>
      }
    >
      <DataTableBulkAction>Change role</DataTableBulkAction>
      <DataTableBulkAction>Change team</DataTableBulkAction>
    </DataTableBulkActions>,
  ],
  [
    "One item, with two selected",
    <DataTableBulkActions key="d" onDelete={() => {}}>
      <DataTableBulkAction
        single
        icon={<PencilIcon data-icon="inline-start" />}
      >
        Edit
      </DataTableBulkAction>
    </DataTableBulkActions>,
  ],
]

export function BulkActionPatterns() {
  return (
    <div className="flex w-full flex-col gap-6">
      {PATTERNS.map(([label, bulk]) => (
        <section key={label} aria-label={label} className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">{label}</h3>
          <MembersTable
            members={MEMBERS.slice(0, 2)}
            initialSelection={["maya", "priya"]}
            toolbar={<MembersToolbar>{bulk}</MembersToolbar>}
          />
        </section>
      ))}
    </div>
  )
}

export function ReviewQueue() {
  return (
    <div className="w-full">
      <MembersTable
        columns={COLUMNS_WITH_EMAIL}
        initialSelection={["priya", "sam"]}
        toolbar={
          <MembersToolbar>
            <DataTableBulkActions>
              <Button size="sm">
                <CheckIcon data-icon="inline-start" />
                Approve
              </Button>
              <Button variant="destructive" size="sm">
                <XIcon data-icon="inline-start" />
                Deny
              </Button>
            </DataTableBulkActions>
          </MembersToolbar>
        }
      />
    </div>
  )
}

/*
 * The app owns Show selected only: it keeps the selection in an atom it
 * reads, and passes the table only the selected rows.
 */
export function Directory() {
  const [showSelectedOnly, setShowSelectedOnly] = React.useState(false)
  const rowSelection = useCreateAtom<Record<string, true>>({})
  const selected = useSelector(rowSelection)
  const members = React.useMemo(
    () =>
      showSelectedOnly ? MEMBERS.filter((row) => selected[row.id]) : MEMBERS,
    [showSelectedOnly, selected]
  )
  return (
    <div className="w-full">
      <MembersTable
        members={members}
        pageSize={5}
        atoms={{ rowSelection }}
        showSelectedOnly={showSelectedOnly}
        onShowSelectedOnlyChange={setShowSelectedOnly}
        toolbar={<MembersToolbar />}
        footer={PAGINATION}
      />
    </div>
  )
}

export function NarrowScroll() {
  return (
    <div className="w-full max-w-[375px]">
      <MembersTable narrowLayout="scroll" toolbar={<MembersToolbar />} />
    </div>
  )
}

export function NarrowCards() {
  return (
    <div className="w-full max-w-[375px]">
      <MembersTable
        narrowLayout="cards"
        initialSelection={["priya"]}
        toolbar={
          <MembersToolbar>
            <DataTableBulkActions onDelete={() => {}}>
              <DataTableBulkAction icon={<DownloadIcon />}>
                Export
              </DataTableBulkAction>
            </DataTableBulkActions>
          </MembersToolbar>
        }
      />
    </div>
  )
}
