"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { BOND_TYPES, BondData, BondKey, cn } from "@/lib/utils";

interface StatsCardsProps {
  data: BondData[];
  selectedBonds: BondKey[];
}

export function StatsCards({ data, selectedBonds }: StatsCardsProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {selectedBonds
        .sort((a, b) => BOND_TYPES.findIndex((bond) => bond.value === a) - BOND_TYPES.findIndex((bond) => bond.value === b))
        .map((bond) => {
          return (
            <Card key={bond} className="relative flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="min-w-[127px] text-3xl whitespace-nowrap font-extrabold">
                  {BOND_TYPES.find((b) => b.value === bond)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl whitespace-nowrap">
                  {data[0][bond].toFixed(2)}% <span className="text-base font-normal">p.a.</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
