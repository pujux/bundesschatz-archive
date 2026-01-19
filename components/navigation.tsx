import { Suspense } from "react";
import { BondSelector } from "./dashboard/bond-selector";
import { BondSelectorSkeleton } from "./dashboard/bond-selector-skeleton";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-xs">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between py-6 max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl text-center sm:text-left font-extrabold tracking-tight text-[#c8102e]">Bundesschatz Archive</h2>
        <Suspense fallback={<BondSelectorSkeleton />}>
          <BondSelector />
        </Suspense>
      </div>
    </nav>
  );
}
