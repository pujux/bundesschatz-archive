"use client";

import { format } from "date-fns";
import { useSyncExternalStore } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBondQueryState } from "@/hooks/query-state";
import { BOND_TYPES, type BondData } from "@/lib/utils";

interface StatsCardsProps {
  data: BondData[];
}

const emptySubscribe = () => () => {};

export function StatsCards({ data }: StatsCardsProps) {
  const [selectedBonds] = useBondQueryState();
  const lastData = data.at(-1);

  // "today" only exists after hydration — the prerendered HTML must not
  // depend on the build date.
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!lastData) {
    return null;
  }

  const isUpcoming = hydrated && lastData.Date > format(new Date(), "yyyy-MM-dd");

  return (
    <div>
      <div className="grid gap-2 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {selectedBonds.map((bond) => {
          if (lastData[bond] == null) {
            return null;
          }

          return (
            <Card key={bond} className="relative flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-1 sm:p-6 sm:pb-2">
                <CardTitle className="sm:min-w-31.75 text-lg sm:text-2xl whitespace-nowrap font-extrabold">
                  {BOND_TYPES.find((b) => b.value === bond)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="text-lg sm:text-xl whitespace-nowrap text-brand font-semibold">
                  {lastData[bond].toFixed(2)}% <span className="text-sm font-normal">p.a.</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {isUpcoming && (
        <p className="mt-1.5 text-xs text-muted-foreground">Rates valid from {format(new Date(lastData.Date), "dd.MM.yyyy")}</p>
      )}
    </div>
  );
}
