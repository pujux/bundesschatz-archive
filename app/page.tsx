import Dashboard from "@/components/dashboard/dashboard";
import { parseCSV } from "@/lib/csv-data";
import { Suspense } from "react";

export default async function Home() {
  const data = await parseCSV();

  return (
    <Suspense>
      <Dashboard data={data} />
    </Suspense>
  );
}
