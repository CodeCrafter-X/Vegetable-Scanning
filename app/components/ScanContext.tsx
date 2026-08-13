"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ScanResult = {
  isVegetableOrFruit: boolean;
  detectedItem: string;
  freshnessScore: number;
  condition: string;
  diseaseDetected: boolean;
  diseaseName: string | null;
  diseaseSymptoms: string | null;
  recommendation: string;
};

type ScanContextType = {
  result: ScanResult | null;
  setResult: (r: ScanResult | null) => void;
  scanning: boolean;
  setScanning: (b: boolean) => void;
};

const ScanContext = createContext<ScanContextType | null>(null);

export function ScanProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  return (
    <ScanContext.Provider value={{ result, setResult, scanning, setScanning }}>
      {children}
    </ScanContext.Provider>
  );
}

export function useScan() {
  const ctx = useContext(ScanContext);
  if (!ctx) throw new Error("useScan must be used inside ScanProvider");
  return ctx;
}
