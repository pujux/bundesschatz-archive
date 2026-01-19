import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBondQueryState } from "@/hooks/query-state";
import { BOND_TYPES, type BondData } from "@/lib/utils";

interface StatsCardsProps {
  data: BondData[];
}

export function StatsCards({ data }: StatsCardsProps) {
  const [selectedBonds] = useBondQueryState();
  const lastData = data.at(-1);

  if (!lastData) {
    return null;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {selectedBonds.map((bond) => {
        if (!lastData[bond]) {
          return null;
        }

        return (
          <Card key={bond} className="relative flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="min-w-31.75 text-2xl whitespace-nowrap font-extrabold">
                {BOND_TYPES.find((b) => b.value === bond)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl whitespace-nowrap text-[#c8102e] font-semibold">
                {lastData[bond].toFixed(2)}% <span className="text-sm font-normal">p.a.</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
