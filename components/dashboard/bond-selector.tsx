"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { BOND_TYPES, BondKey, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BondSelectorProps {
  selected: BondKey[];
  onSelectionChange: (selection: BondKey[]) => void;
}

export function BondSelector({ selected, onSelectionChange }: BondSelectorProps) {
  const [open, setOpen] = React.useState(false);

  const toggleSelection = (value: BondKey) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter((item) => item !== value));
    } else {
      onSelectionChange([...selected, value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          Select bonds...
          <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
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
