import { dateQueryParser } from "@/lib/query-parsers";
import { BOND_TYPES, DEFAULT_BONDS, DEFAULT_TAB, sortBondList, TAB_VALUES } from "@/lib/utils";
import { parseAsArrayOf, parseAsStringEnum, useQueryState, useQueryStates } from "nuqs";
import { useMemo } from "react";
import type { DateRange } from "react-day-picker";

export function useTabQueryState() {
  return useQueryState("tab", parseAsStringEnum([...TAB_VALUES]).withDefault(DEFAULT_TAB));
}

export function useBondQueryState() {
  const [selectedBonds, setSelectedBonds] = useQueryState(
    "bond",
    parseAsArrayOf(parseAsStringEnum(BOND_TYPES.map((bond) => bond.value))).withDefault(DEFAULT_BONDS),
  );

  const sortedSelectedBonds = useMemo(() => sortBondList(selectedBonds), [selectedBonds]);

  return [sortedSelectedBonds, setSelectedBonds] as const;
}

type FullyDefined<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};

export function useDateRangeQueryState(defaultRange: FullyDefined<DateRange>) {
  return useQueryStates({
    from: dateQueryParser.withDefault(defaultRange.from),
    to: dateQueryParser.withDefault(defaultRange.to),
  });
}
