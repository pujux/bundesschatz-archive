import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
const skeletonBlock = "animate-pulse rounded-md bg-slate-200/80";

export function DashboardSkeleton() {
  return (
    <main className="grow w-full space-y-4 p-4 md:p-8 py-6 max-w-7xl mx-auto">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={`stat-skeleton-${index}`} className="relative flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className={cn(skeletonBlock, "h-8 w-24")} />
            </CardHeader>
            <CardContent>
              <div className={cn(skeletonBlock, "h-7 w-20")} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col-reverse gap-2 sm:flex-row items-start sm:items-center justify-between">
          <div className={cn(skeletonBlock, "h-10 w-32")} />
          <div className={cn(skeletonBlock, "h-10 w-60")} />
        </div>
        <Card className={"p-2 sm:p-6"}>
          <div className={cn(skeletonBlock, "h-[491.5px] w-full")} />
        </Card>
      </div>
    </main>
  );
}
