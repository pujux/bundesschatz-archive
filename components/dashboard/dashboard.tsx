"use client";

import { use, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DataTable } from "./data-table";
import { DateRangePicker } from "./date-range-picker";
import { StatsCards } from "./stats-cards";
import { BOND_TYPES, type BondData } from "@/lib/utils";
import { format } from "date-fns";
import { useBondQueryState, useDateRangeQueryState, useTabQueryState } from "@/hooks/query-state";

type DashboardProps = {
  dataPromise: Promise<BondData[]>;
};

export function Dashboard({ dataPromise }: DashboardProps) {
  const data = use(dataPromise);

  const defaultRange = useMemo(() => {
    return {
      from: new Date(new Date(data[0].Date).toDateString()),
      to: new Date(new Date(data[data.length - 1].Date).toDateString()),
    };
  }, [data]);

  const [selectedBonds] = useBondQueryState();
  const [tab, setTab] = useTabQueryState();
  const [dateRange, setDateRange] = useDateRangeQueryState(defaultRange);

  const rangeData = useMemo(() => {
    return data.filter((item) => {
      const itemDate = new Date(new Date(item.Date).toDateString());

      if (itemDate < dateRange.from || itemDate > dateRange.to) {
        return false;
      }

      return true;
    });
  }, [data, dateRange]);

  return (
    <main className="grow w-full space-y-4 p-4 md:p-8 py-6 max-w-7xl mx-auto">
      <StatsCards data={data} />

      <Tabs
        defaultValue={tab}
        onValueChange={(value) => {
          if (value === "chart" || value === "table") {
            setTab(value);
          }
        }}
      >
        <div className="flex flex-col-reverse gap-2 sm:flex-row items-start sm:items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <DateRangePicker
            date={{ from: dateRange.from, to: dateRange.to }}
            setDate={(range) => {
              if (!range?.from || !range?.to) return;
              setDateRange(range);
            }}
            onReset={() => setDateRange(defaultRange)}
          />
        </div>

        <TabsContent value="chart">
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
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <DataTable data={rangeData} selectedBonds={selectedBonds} />
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
