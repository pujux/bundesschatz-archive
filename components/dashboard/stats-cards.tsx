"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BOND_TYPES, BondData, BondKey } from "@/lib/utils";

interface StatsCardsProps {
  data: BondData[];
  selectedBonds: BondKey[];
}

export function StatsCards({ data, selectedBonds }: StatsCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {selectedBonds
        .sort((a, b) => BOND_TYPES.findIndex((bond) => bond.value === a) - BOND_TYPES.findIndex((bond) => bond.value === b))
        .map((bond) => {
          return (
            <Card key={bond} className="relative flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="min-w-[127px] text-2xl whitespace-nowrap font-extrabold">
                  {BOND_TYPES.find((b) => b.value === bond)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl whitespace-nowrap text-[#c8102e] font-semibold">
                  {data.at(-1)![bond].toFixed(2)}% <span className="text-sm font-normal">p.a.</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
