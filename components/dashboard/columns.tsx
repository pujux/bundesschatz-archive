"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { BOND_TYPES, type BondData, type BondKey } from "@/lib/utils";
import type { Column, ColumnDef } from "@tanstack/react-table";

function SortableHeader({ column, label }: { column: Column<BondData, unknown>; label: string }) {
  return (
    <Button variant="ghost" onClick={column.getToggleSortingHandler()} className="w-full">
      {label}
      {column.getIsSorted() === false ? (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : null}
    </Button>
  );
}

function bondColumn(bond: BondKey, label: string): ColumnDef<BondData, number> {
  return {
    id: bond,
    // sort on the numeric rate, render with the percent suffix
    accessorFn: (row) => row[bond],
    cell: ({ getValue }) => {
      const rate = getValue();
      return rate == null ? "–" : `${rate}%`;
    },
    header: ({ column }) => <SortableHeader column={column} label={label} />,
  };
}

export const columns: ColumnDef<BondData, unknown>[] = [
  {
    id: "Date",
    // sort on the ISO string, render in local convention
    accessorKey: "Date",
    cell: ({ getValue }) => format(new Date(getValue() as string), "dd.MM.yyyy"),
    header: ({ column }) => <SortableHeader column={column} label="Date" />,
  },
  ...BOND_TYPES.map((bond) => bondColumn(bond.value, bond.label) as ColumnDef<BondData, unknown>),
];
