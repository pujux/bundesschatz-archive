"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOND_TYPES, BondData } from "@/lib/utils";

export const columns: ColumnDef<BondData>[] = [
  {
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={column.getToggleSortingHandler()} className="w-full">
          Date
          {column.getIsSorted() === false ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
  },
  {
    id: "1M",
    accessorFn: (row) => row["1M"] + "%",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={column.getToggleSortingHandler()} className="w-full">
          {BOND_TYPES.find((bond) => bond.value === "1M")?.label}
          {column.getIsSorted() === false ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
  },
  {
    id: "6M",
    accessorFn: (row) => row["6M"] + "%",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={column.getToggleSortingHandler()} className="w-full">
          {BOND_TYPES.find((bond) => bond.value === "6M")?.label}
          {column.getIsSorted() === false ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
  },
  {
    id: "12M",
    accessorFn: (row) => row["12M"] + "%",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={column.getToggleSortingHandler()} className="w-full">
          {BOND_TYPES.find((bond) => bond.value === "12M")?.label}
          {column.getIsSorted() === false ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
  },
  {
    id: "4Y",
    accessorFn: (row) => row["4Y"] + "%",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={column.getToggleSortingHandler()} className="w-full">
          {BOND_TYPES.find((bond) => bond.value === "4Y")?.label}
          {column.getIsSorted() === false ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
  },
  {
    id: "10Y",
    accessorFn: (row) => row["10Y"] + "%",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={column.getToggleSortingHandler()} className="w-full">
          {BOND_TYPES.find((bond) => bond.value === "10Y")?.label}
          {column.getIsSorted() === false ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
  },
];
