"use client";

import { BondKey } from "@/lib/utils";
import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface BondContextType {
  selectedBonds: BondKey[];
  setSelectedBonds: React.Dispatch<React.SetStateAction<BondKey[]>>;
}

const initialBonds: BondKey[] = ["1M", "6M", "12M", "4Y", "10Y"];

const BondContext = createContext<BondContextType | undefined>(undefined);

export const BondProvider = ({ children }: PropsWithChildren) => {
  const [selectedBonds, setSelectedBonds] = useState<BondKey[]>(initialBonds);

  return <BondContext.Provider value={{ selectedBonds, setSelectedBonds }}>{children}</BondContext.Provider>;
};

export const useBondContext = () => {
  const context = useContext(BondContext);
  if (!context) {
    throw new Error("useBondContext must be used within a BondProvider");
  }
  return context;
};
