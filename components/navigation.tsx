"use client";

import { useBondContext } from "@/hooks/bond-context";
import { BondSelector } from "./dashboard/bond-selector";

export default function Navigation() {
  const { selectedBonds, setSelectedBonds } = useBondContext();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between py-6 max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-5xl text-center sm:text-left font-extrabold tracking-tight text-[#c8102e] tk-halyard-display">Bundesschatz Archiv</h2>
        <BondSelector selected={selectedBonds} onSelectionChange={setSelectedBonds} />
      </div>
    </nav>
  );
}
