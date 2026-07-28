import { BOND_INFO, BOND_TYPES, sortBondList, type BondData, type BondKey } from "@/lib/utils";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { Card } from "../ui/card";
import { format } from "date-fns";

interface DataChartProps {
  rangeData: BondData[];
  selectedBonds: BondKey[];
}

const formatDate = (value: string) => format(new Date(value), "dd.MM.yyyy");

const bondOrder = (key: unknown) => BOND_TYPES.findIndex((bond) => bond.value === key);

function LineSwatch({ bond }: { bond: BondKey }) {
  return (
    <svg aria-hidden width="20" height="8" className="shrink-0">
      <line x1="1" y1="4" x2="19" y2="4" stroke={BOND_INFO[bond].chartColor} strokeWidth="2" strokeDasharray={BOND_INFO[bond].dash} />
    </svg>
  );
}

type TooltipEntry = { dataKey?: string | number; value?: number | string };

// recharts v3 orders tooltip/legend items lexicographically by dataKey, so
// both are rendered manually in bond-term order.
function ChartTooltip({ active, label, payload }: { active?: boolean; label?: string; payload?: TooltipEntry[] }) {
  if (!active || !payload?.length) {
    return null;
  }

  const entries = [...payload].sort((a, b) => bondOrder(a.dataKey) - bondOrder(b.dataKey));

  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="mb-1 font-medium text-popover-foreground">{label ? formatDate(label) : null}</p>
      {entries.map((entry) => {
        const bond = entry.dataKey as BondKey;
        return (
          <p key={bond} className="flex items-center gap-2 text-popover-foreground">
            <LineSwatch bond={bond} />
            <span className="grow pr-3">{BOND_INFO[bond]?.label ?? bond}</span>
            <span className="font-medium tabular-nums">{Number(entry.value).toFixed(2)} %</span>
          </p>
        );
      })}
    </div>
  );
}

function ChartLegend({ bonds }: { bonds: BondKey[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-3 text-sm">
      {bonds.map((bond) => (
        <span key={bond} className="flex items-center gap-1.5">
          <LineSwatch bond={bond} />
          <span className="text-foreground">{BOND_INFO[bond].label}</span>
        </span>
      ))}
    </div>
  );
}

export function DataChart({ rangeData, selectedBonds }: DataChartProps) {
  const bonds = sortBondList(selectedBonds);

  return (
    <Card className="p-2 sm:p-6">
      <ResponsiveContainer width="100%" height={491.5}>
        <LineChart data={rangeData} margin={{ top: 15, right: 40, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="Date" tickFormatter={formatDate} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis domain={["auto", "auto"]} tickFormatter={(value) => `${value} %`} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip content={<ChartTooltip />} />
          <Legend content={<ChartLegend bonds={bonds} />} />
          {bonds.map((bond) => (
            <Line
              key={bond}
              type="monotone"
              dataKey={bond}
              stroke={BOND_INFO[bond].chartColor}
              strokeDasharray={BOND_INFO[bond].dash}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
