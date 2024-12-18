"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DateRangePicker } from "./date-range-picker";
import { StatsCards } from "./stats-cards";
import { BOND_TYPES, BondData } from "@/lib/utils";
import { useBondContext } from "@/hooks/bond-context";
import { format } from "date-fns";
import { parseAsString, useQueryState, createParser, useQueryStates } from "nuqs";

type DashboardProps = {
  data: BondData[];
};

const dateParser = createParser({
  eq: (a: Date, b: Date) => a.getTime() === b.getTime(),
  parse: (value) => {
    const date = new Date(+value);
    return !isNaN(date.getTime()) ? date : null;
  },
  serialize: (value) => new Date(value.toDateString()).getTime().toString(),
});

export default function Dashboard({ data }: DashboardProps) {
  const defaultRange = useMemo(() => {
    return {
      from: new Date(new Date(data[0].Date).toDateString()),
      to: new Date(new Date(data[data.length - 1].Date).toDateString()),
    };
  }, [data]);

  const { selectedBonds } = useBondContext();
  const [tab, setTab] = useQueryState("tab", parseAsString.withDefault("chart"));
  const [dateRange, setDateRange] = useQueryStates({
    from: dateParser.withDefault(defaultRange.from),
    to: dateParser.withDefault(defaultRange.to),
  });

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
    <div className="flex-1 space-y-4 p-4 md:p-8 py-6 max-w-7xl mx-auto">
      <StatsCards data={data} selectedBonds={selectedBonds} />

      <Tabs defaultValue={tab} className="space-y-4" onValueChange={(value) => setTab(value)}>
        <div className="flex flex-col-reverse gap-2 sm:flex-row items-start sm:items-center justify-between">
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

        <TabsContent value="chart" className="space-y-4">
          <Card className="p-2 sm:p-6">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={rangeData} margin={{ top: 15, right: 40, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" tickFormatter={(value) => format(new Date(value), "LLL dd, y")} />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip
                  labelFormatter={(value) => format(new Date(value), "LLL dd, y")}
                  formatter={(value, name) => [value, BOND_TYPES.find((b) => b.value === name)?.label]}
                />
                <Legend formatter={(value) => BOND_TYPES.find((bond) => bond.value === value)?.label} />
                {selectedBonds
                  .sort((a, b) => BOND_TYPES.findIndex((bond) => bond.value === a) - BOND_TYPES.findIndex((bond) => bond.value === b))
                  .map((bond, index) => (
                    <Line key={bond} type="monotone" dataKey={bond} stroke={`hsl(var(--chart-${(index % 5) + 1}))`} strokeWidth={2} dot={false} />
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
