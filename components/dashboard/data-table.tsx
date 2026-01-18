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
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
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
        <div></div>
      </div>
    </>
  );
}
