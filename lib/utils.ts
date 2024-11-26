import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BOND_TYPES = [
  { value: "1M", label: "1 Month" },
  { value: "6M", label: "6 Months" },
  { value: "12M", label: "12 Months" },
  { value: "4Y", label: "4 Years" },
  { value: "10Y", label: "10 Years" },
] as const;

export type BondKey = (typeof BOND_TYPES)[number]["value"];

export type BondData = {
  Date: string;
} & Record<BondKey, number>;
