import { BOND_TYPES, type BondData, type BondKey } from "@/lib/utils";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { Card } from "../ui/card";
import { format } from "date-fns";

interface DataChartProps {
  rangeData: BondData[];
  selectedBonds: BondKey[];
}

export function DataChart({ rangeData, selectedBonds }: DataChartProps) {
  return (
    <Card className="p-2 sm:p-6">
      <ResponsiveContainer width="100%" height={491.5}>
        <LineChart data={rangeData} margin={{ top: 15, right: 40, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" tickFormatter={(value) => format(new Date(value), "LLL dd, y")} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            labelFormatter={(value) => format(new Date(value), "LLL dd, y")}
            formatter={(value, name) => [value, BOND_TYPES.find((b) => b.value === name)?.label]}
          />
          <Legend formatter={(value) => BOND_TYPES.find((bond) => bond.value === value)?.label} />
          {selectedBonds.map((bond, index) => (
            <Line key={bond} type="monotone" dataKey={bond} stroke={`hsl(var(--chart-${(index % 5) + 1}))`} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
