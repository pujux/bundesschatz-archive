import { startOfYear, subMonths, subYears } from "date-fns";

export type DateRangeValue = { from: Date; to: Date };
export type PresetLabel = "3M" | "6M" | "1Y" | "YTD" | "All";

export const DATE_PRESETS: { label: PresetLabel }[] = [
  { label: "3M" },
  { label: "6M" },
  { label: "1Y" },
  { label: "YTD" },
  { label: "All" },
];

export function presetRange(preset: PresetLabel, fullRange: DateRangeValue): DateRangeValue {
  const { from, to } = fullRange;

  const clamp = (start: Date) => ({ from: start < from ? from : start, to });

  switch (preset) {
    case "3M":
      return clamp(subMonths(to, 3));
    case "6M":
      return clamp(subMonths(to, 6));
    case "1Y":
      return clamp(subYears(to, 1));
    case "YTD":
      return clamp(startOfYear(to));
    case "All":
      return fullRange;
  }
}
