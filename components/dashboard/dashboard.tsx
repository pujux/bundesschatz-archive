"use client";

import { use, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { DateRangePicker } from "./date-range-picker";
import { StatsCards } from "./stats-cards";
import { type BondData, isTabValue } from "@/lib/utils";
import { useBondQueryState, useDateRangeQueryState, useTabQueryState } from "@/hooks/query-state";
import { DataChart } from "./data-chart";

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
          if (isTabValue(value)) {
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
          <DataChart rangeData={rangeData} selectedBonds={selectedBonds} />
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
