"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Filter, Search, X, Settings2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterColumn?: string // Column to filter by (e.g., "name")
  searchPlaceholder?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  searchPlaceholder = "Filter...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full flex flex-col h-full bg-background">
      {/* Action Bar (Cursor Docs Style) */}
      <div className="flex items-center justify-between py-3 px-6 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 flex-1">
          {filterColumn && (
            <div className="relative group max-w-sm w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <input
                placeholder={searchPlaceholder}
                value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                }
                className="h-8 w-full bg-input border border-border hover:border-muted-foreground/30 focus:border-primary/50 rounded-sm pl-8 pr-8 text-[13px] outline-none transition-all placeholder:text-muted-foreground/70"
              />
              {!!table.getColumn(filterColumn)?.getFilterValue() && (
                <button
                  onClick={() => table.getColumn(filterColumn)?.setFilterValue("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* Active Filter Pills (Placeholder for future complex filters) */}
          <div className="flex items-center gap-2">
            {/* Add Filter Button */}
            <button className="h-8 px-2.5 border border-dashed border-border rounded-sm text-[12px] font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 hover:bg-accent transition-all flex items-center gap-1.5">
              <Filter size={12} />
              Filter
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-8 px-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors">
            <Settings2 size={14} />
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto">
        <table className="w-full caption-bottom text-sm text-left border-collapse">
          <thead className="sticky top-0 z-20 bg-background shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="h-9 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-[11px] uppercase tracking-wider select-none"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-border/50 transition-colors hover:bg-accent/50 data-[state=selected]:bg-accent/80 group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-3 align-middle [&:has([role=checkbox])]:pr-0 text-[13px] text-foreground group-hover:text-foreground"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground text-[13px]"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-background/50 text-[12px] text-muted-foreground shrink-0">
        <div className="flex-1 text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6">
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 border border-border rounded-sm hover:bg-secondary/50 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-2 py-1 border border-border rounded-sm hover:bg-secondary/50 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

