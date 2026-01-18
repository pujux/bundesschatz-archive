import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortBondList(bonds: BondKey[]) {
  return [...bonds].sort((a, b) => BOND_TYPES.findIndex((bond) => bond.value === a) - BOND_TYPES.findIndex((bond) => bond.value === b));
}

export const BOND_TYPES = [
  { value: "1M", label: "1 Month" },
  { value: "6M", label: "6 Months" },
  { value: "12M", label: "12 Months" },
  { value: "4Y", label: "4 Years" },
  { value: "10Y", label: "10 Years" },
] as const;

export type BondKey = (typeof BOND_TYPES)[number]["value"];

export const DEFAULT_BONDS: BondKey[] = ["1M", "6M", "12M", "4Y", "10Y"];

export const TAB_VALUES = ["chart", "table"] as const;
export type TabValue = (typeof TAB_VALUES)[number];
export const DEFAULT_TAB: TabValue = "chart";

export type BondData = {
  Date: string;
} & Record<BondKey, number>;
