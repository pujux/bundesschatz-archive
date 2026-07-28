"use client";

import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { columns } from "./columns";
import { DEFAULT_BONDS, type BondData, type BondKey } from "@/lib/utils";

interface DataTableProps {
  data: BondData[];
  selectedBonds: BondKey[];
}

export function DataTable({ data, selectedBonds }: DataTableProps) {
  "use no memo"; // Tanstack Table

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table hook is safe here.
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility: DEFAULT_BONDS.reduce((acc, key) => ({ ...acc, [key]: selectedBonds.includes(key) }), {}),
    },
    initialState: {
      pagination: { pageSize: 8 },
      sorting: [{ id: "Date", desc: true }],
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead key={header.id} className={index === 0 ? "sticky left-0 z-10 bg-card" : undefined}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="py-3.5">
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={cell.id} className={index === 0 ? "sticky left-0 z-10 bg-card text-center" : "text-center"}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between p-4">
        <div className="flex gap-2">
          <Button variant={"outline"} className="w-9 h-9 p-0" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft className="h-5 w-5" />
          </Button>
          <Button variant={"outline"} className="w-9 h-9 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant={"outline"} className="w-9 h-9 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button variant={"outline"} className="w-9 h-9 p-0" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
            <ChevronsRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
          </span>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Rows</span>
            <select
              className="h-9 rounded-md border bg-card px-2 text-sm text-foreground"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[8, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </>
  );
}
