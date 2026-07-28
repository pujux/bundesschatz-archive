import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortBondList(bonds: BondKey[]) {
  return [...bonds].sort((a, b) => BOND_TYPES.findIndex((bond) => bond.value === a) - BOND_TYPES.findIndex((bond) => bond.value === b));
}

// chartColor/dash are fixed per bond so lines keep their identity when the
// selection changes; the distinct dash patterns keep the lines apart for
// colorblind readers.
export const BOND_TYPES = [
  { value: "1M", label: "1 Month", chartColor: "hsl(var(--chart-1))", dash: undefined },
  { value: "6M", label: "6 Months", chartColor: "hsl(var(--chart-2))", dash: "6 3" },
  { value: "12M", label: "12 Months", chartColor: "hsl(var(--chart-3))", dash: "2 3" },
  { value: "4Y", label: "4 Years", chartColor: "hsl(var(--chart-4))", dash: "10 4" },
  { value: "10Y", label: "10 Years", chartColor: "hsl(var(--chart-5))", dash: "8 3 2 3" },
] as const;

export const BOND_INFO = Object.fromEntries(BOND_TYPES.map((bond) => [bond.value, bond])) as Record<BondKey, (typeof BOND_TYPES)[number]>;

export type BondKey = (typeof BOND_TYPES)[number]["value"];

export const DEFAULT_BONDS: BondKey[] = ["1M", "6M", "12M", "4Y", "10Y"];

export const TAB_VALUES = ["chart", "table"] as const;
export type TabValue = (typeof TAB_VALUES)[number];
export const DEFAULT_TAB: TabValue = "chart";

export type BondData = {
  Date: string;
} & Record<BondKey, number>;

export const isTabValue = (value: string): value is TabValue => TAB_VALUES.includes(value as TabValue);
export const isBondKey = (value: string): value is BondKey => BOND_TYPES.some((bond) => bond.value === value);
