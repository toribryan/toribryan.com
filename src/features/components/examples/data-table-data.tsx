"use client"

import * as React from "react"
import { EllipsisIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { Badge } from "@/components/fibo/badge"
import { Button } from "@/components/fibo/button"
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableAction,
  DataTableActions,
  DataTableBulkActions,
  DataTableCards,
  DataTableColumns,
  DataTableContent,
  DataTableFacetFilter,
  DataTableFilters,
  DataTableFooter,
  DataTablePagination,
  DataTableSearch,
  DataTableToolbar,
  useDataTable,
  type DataTableOptions,
} from "@/components/fibo/data-table"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/fibo/menu"

/*
 * Sample data, columns and the table the examples share, ported from fibo's
 * data-table.stories.tsx.
 */

export const STATUS = {
  Active: "success",
  Away: "warning",
  Invited: "info",
  Deactivated: "secondary",
} as const

export type Member = {
  id: string
  name: string
  initials: string
  email: string
  team: string
  role: string
  status: keyof typeof STATUS
  projects: number
  lastActive: string
  lock?: string
}

export const MEMBERS: Member[] = [
  {
    id: "maya",
    name: "Maya Okafor",
    initials: "MO",
    email: "maya@example.com",
    team: "Design",
    role: "Admin",
    status: "Active",
    projects: 12,
    lastActive: "Today",
  },
  {
    id: "priya",
    name: "Priya Raman",
    initials: "PR",
    email: "priya@example.com",
    team: "Engineering",
    role: "Editor",
    status: "Away",
    projects: 8,
    lastActive: "Yesterday",
  },
  {
    id: "jordan",
    name: "Jordan Alvarez",
    initials: "JA",
    email: "jordan@example.com",
    team: "Marketing",
    role: "Editor",
    status: "Active",
    projects: 5,
    lastActive: "Today",
  },
  {
    id: "sam",
    name: "Sam Whitfield",
    initials: "SW",
    email: "sam@example.com",
    team: "Support",
    role: "Viewer",
    status: "Invited",
    projects: 0,
    lastActive: "Never",
  },
  {
    id: "elena",
    name: "Elena Marsh",
    initials: "EM",
    email: "elena@example.com",
    team: "Operations",
    role: "Owner",
    status: "Active",
    projects: 21,
    lastActive: "Today",
    lock: "The workspace owner can't be removed",
  },
  {
    id: "rosa",
    name: "Rosa Delgado",
    initials: "RD",
    email: "rosa@example.com",
    team: "Engineering",
    role: "Viewer",
    status: "Deactivated",
    projects: 3,
    lastActive: "Aug 14",
  },
]

export const MEMBER_NOUN = { one: "member", other: "members" }

export function RowActions({ name }: { name: string }) {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Actions for ${name}`}
          />
        }
      >
        <EllipsisIcon />
      </MenuTrigger>
      <MenuContent align="end">
        <MenuItem>
          <PencilIcon />
          Edit
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <Trash2Icon />
          Remove
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}

const member = createDataTableColumnHelper<Member>()

// Columns live outside the component, so the table's models aren't rebuilt
// on every render.
function memberColumns({ secondary }: { secondary: boolean }) {
  return member.columns([
    member.accessor("name", {
      header: "Member",
      meta: {
        type: "person",
        className: "w-56",
        avatar: (row: Member) => ({ fallback: row.initials }),
        secondary: secondary ? (row: Member) => row.email : undefined,
      },
    }),
    member.accessor("team", {
      header: "Team",
      filterFn: "arrHas",
      meta: { className: "w-44" },
    }),
    member.accessor("role", {
      header: "Role",
      filterFn: "arrHas",
      meta: { className: "w-32" },
    }),
    member.accessor("status", {
      header: "Status",
      filterFn: "arrHas",
      meta: { type: "status" },
      cell: ({ getValue }) => (
        <Badge variant={STATUS[getValue()]}>{getValue()}</Badge>
      ),
    }),
    member.accessor("projects", {
      header: "Projects",
      meta: { type: "numeric" },
    }),
    member.accessor("lastActive", {
      header: "Last active",
      enableSorting: false,
      meta: { className: "w-32" },
    }),
    member.display({
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      enableHiding: false,
      meta: { type: "actions", label: "Actions" },
      cell: ({ row }) => <RowActions name={row.original.name} />,
    }),
  ])
}

export const COLUMNS = memberColumns({ secondary: false })
export const COLUMNS_WITH_EMAIL = memberColumns({ secondary: true })

const PINNED = { start: ["name"], end: ["actions"] }
const UNPINNED = { start: [], end: [] }

/** A row selection holding these ids. */
export function selection(ids: readonly string[]) {
  return Object.fromEntries(ids.map((id) => [id, true as const]))
}

type MembersTableProps = Omit<
  React.ComponentProps<typeof DataTable>,
  "table" | "children"
> & {
  members?: Member[]
  columns?: typeof COLUMNS
  pageSize?: number
  pinned?: boolean
  initialSelection?: string[]
  hiddenColumns?: string[]
  atoms?: DataTableOptions<Member>["atoms"]
  toolbar?: React.ReactNode
  footer?: React.ReactNode
}

export function MembersTable({
  members = MEMBERS,
  columns = COLUMNS,
  pageSize,
  pinned = true,
  initialSelection = [],
  hiddenColumns = [],
  atoms,
  toolbar,
  footer,
  ...props
}: MembersTableProps) {
  const table = useDataTable({
    data: members,
    columns,
    atoms,
    lockedReason: (row) => row.lock,
    initialState: {
      columnPinning: pinned ? PINNED : UNPINNED,
      columnVisibility: Object.fromEntries(
        hiddenColumns.map((id) => [id, false])
      ),
      rowSelection: selection(initialSelection),
      ...(pageSize ? { pagination: { pageIndex: 0, pageSize } } : {}),
    },
  })
  return (
    <DataTable table={table} aria-label="Members" noun={MEMBER_NOUN} {...props}>
      {toolbar}
      <DataTableContent />
      <DataTableCards />
      {footer}
    </DataTable>
  )
}

export function MembersToolbar({
  children,
}: {
  /** The bulk actions shown while rows are selected. */
  children?: React.ReactNode
}) {
  return (
    <DataTableToolbar>
      <DataTableFilters
        search={
          <DataTableSearch
            placeholder="Search members"
            aria-label="Search members"
          />
        }
      >
        <DataTableFacetFilter column="status" />
        <DataTableFacetFilter column="team" />
      </DataTableFilters>
      <DataTableActions>
        <DataTableColumns />
        <DataTableAction icon={<PlusIcon data-icon="inline-start" />}>
          Add member
        </DataTableAction>
      </DataTableActions>
      {children ?? <DataTableBulkActions onDelete={() => {}} />}
    </DataTableToolbar>
  )
}

export const PAGINATION = (
  <DataTableFooter className="justify-end">
    <DataTablePagination />
  </DataTableFooter>
)
