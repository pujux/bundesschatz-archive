import { test } from "node:test";
import assert from "node:assert/strict";

import { transformCSVData } from "./csv-data.ts";

function row(date: string, periodValue: string, periodInterval: string, rate: string) {
  return {
    "Product Key": `BS${periodValue}${periodInterval}`,
    "Period Interval": periodInterval,
    "Period Value": periodValue,
    Date: date,
    "Interest Rate": rate,
    Green: "false",
  };
}

test("groups contiguous rows of one date into a single item", () => {
  const data = transformCSVData([row("2026-07-29", "1", "M", "2.2"), row("2026-07-29", "10", "Y", "3.2")]);
  assert.deepEqual(data, [{ Date: "2026-07-29", "1M": 2.2, "10Y": 3.2 }]);
});

test("every group carries its own Date, including single-row groups", () => {
  const data = transformCSVData([
    row("2026-07-29", "1", "M", "2.2"),
    row("2026-07-30", "1", "M", "2.3"),
    row("2026-07-31", "1", "M", "2.4"),
  ]);
  assert.deepEqual(data, [
    { Date: "2026-07-29", "1M": 2.2 },
    { Date: "2026-07-30", "1M": 2.3 },
    { Date: "2026-07-31", "1M": 2.4 },
  ]);
});

test("returns an empty array for empty input instead of a phantom item", () => {
  assert.deepEqual(transformCSVData([]), []);
});
