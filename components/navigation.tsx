import { Suspense } from "react";
import { BondSelector } from "./dashboard/bond-selector";
import { BondSelectorSkeleton } from "./dashboard/bond-selector-skeleton";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  return (
    <nav className="sm:sticky top-0 z-50 bg-card border-b shadow-xs">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-between py-3 sm:py-6 max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center sm:text-left font-extrabold tracking-tight text-brand">
          Bundesschatz Archive
        </h1>
        <div className="flex items-center gap-2">
          <Suspense fallback={<BondSelectorSkeleton />}>
            <BondSelector />
          </Suspense>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
