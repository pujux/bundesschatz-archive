"use client";

import { Check } from "lucide-react";
import { BOND_TYPES, type BondKey, cn, sortBondList } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { useBondQueryState } from "@/hooks/query-state";

export function BondSelector() {
  const [selected, setSelected] = useBondQueryState();
  const [open, setOpen] = useState(false);

  const toggleSelection = (value: BondKey) => {
    if (selected.includes(value) && selected.length === 1) {
      return;
    }

    setSelected((bonds) => {
      return sortBondList(bonds.includes(value) ? bonds.filter((item) => item !== value) : [...bonds, value]);
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-50 justify-between">
          Select bonds...
          <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="Search bonds..." className="h-9" />
          <CommandEmpty>No bonds found.</CommandEmpty>
          <CommandGroup>
            {BOND_TYPES.map((bond) => (
              <CommandItem key={bond.value} onSelect={() => toggleSelection(bond.value)}>
                <Check className={cn("mr-2 h-4 w-4", selected.includes(bond.value) ? "opacity-100" : "opacity-0")} />
                {bond.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
