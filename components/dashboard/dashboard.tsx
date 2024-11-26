"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DateRangePicker } from "./date-range-picker";
import { StatsCards } from "./stats-cards";
import { BondSelector } from "./bond-selector";
import { BOND_TYPES, BondData, BondKey } from "@/lib/utils";
import { useBondContext } from "@/hooks/bond-context";
import { format } from "date-fns";

type DashboardProps = {
  data: BondData[];
};

export default function Dashboard({ data }: DashboardProps) {
  const { selectedBonds } = useBondContext();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(data[0].Date),
    to: new Date(data[data.length - 1].Date),
  });

  const rangeData = useMemo(() => {
    if (!dateRange?.from || !dateRange.to) return [];

    const from = new Date(dateRange.from.toDateString());
    const to = new Date(dateRange.to.toDateString());

    return data.filter((item) => {
      const itemDate = new Date(new Date(item.Date).toDateString());

      if (dateRange?.from && itemDate < from) {
        return false;
      }
      if (dateRange?.to && itemDate > to) {
        return false;
      }
      return true;
    });
  }, [data, dateRange]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <StatsCards data={data} selectedBonds={selectedBonds} />

      <Tabs defaultValue="chart" className="space-y-4">
        <div className="flex flex-col-reverse gap-2 sm:flex-row items-start sm:items-center justify-between">
          <TabsList>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <DateRangePicker date={dateRange} setDate={setDateRange} />
        </div>

        <TabsContent value="chart" className="space-y-4">
          <Card className="p-2 sm:p-6">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={rangeData} margin={{ top: 15, right: 40, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" tickFormatter={(value) => format(new Date(value), "LLL dd, y")} />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => format(new Date(value), "LLL dd, y")}
                  formatter={(value, name) => [value, BOND_TYPES.find((b) => b.value === name)?.label]}
                />
                <Legend formatter={(value) => BOND_TYPES.find((bond) => bond.value === value)?.label} />
                {selectedBonds
                  .sort((a, b) => BOND_TYPES.findIndex((bond) => bond.value === a) - BOND_TYPES.findIndex((bond) => bond.value === b))
                  .map((bond, index) => (
                    <Line key={bond} type="monotone" dataKey={bond} stroke={`hsl(var(--chart-${(index % 5) + 1}))`} strokeWidth={2} />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <DataTable columns={columns} data={rangeData} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
