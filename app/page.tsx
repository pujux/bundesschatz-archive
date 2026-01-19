import { Dashboard } from "@/components/dashboard/dashboard";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { Disclaimer } from "@/components/disclaimer";
import { Navigation } from "@/components/navigation";
import { parseCSV } from "@/lib/csv-data";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export default async function Home() {
  const dataPromise = parseCSV();

  return (
    <>
      <NuqsAdapter>
        <Navigation />
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard dataPromise={dataPromise} />
        </Suspense>
      </NuqsAdapter>
      <Disclaimer />
    </>
  );
}
