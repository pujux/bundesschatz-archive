import Dashboard from "@/components/dashboard/dashboard";
import { parseCSV } from "@/lib/csv-data";

export default async function Home() {
  const data = await parseCSV();

  return <Dashboard data={data} />;
}
