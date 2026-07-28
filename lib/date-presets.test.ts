import { test } from "node:test";
import assert from "node:assert/strict";

import { DATE_PRESETS, presetRange } from "./date-presets.ts";

const fullRange = {
  from: new Date(2024, 3, 22), // Apr 22 2024
  to: new Date(2026, 6, 30), // Jul 30 2026
};

test("exposes the presets in display order", () => {
  assert.deepEqual(
    DATE_PRESETS.map((p) => p.label),
    ["3M", "6M", "1Y", "YTD", "All"],
  );
});

test("All returns the full data range", () => {
  assert.deepEqual(presetRange("All", fullRange), fullRange);
});

test("3M returns the last three months of data", () => {
  const range = presetRange("3M", fullRange);
  assert.deepEqual(range, { from: new Date(2026, 3, 30), to: fullRange.to });
});

test("1Y returns the last year of data", () => {
  assert.deepEqual(presetRange("1Y", fullRange), { from: new Date(2025, 6, 30), to: fullRange.to });
});

test("YTD starts at January 1st of the latest data year", () => {
  assert.deepEqual(presetRange("YTD", fullRange), { from: new Date(2026, 0, 1), to: fullRange.to });
});

test("presets never start before the data begins", () => {
  const shortRange = { from: new Date(2026, 5, 1), to: new Date(2026, 6, 30) };
  assert.deepEqual(presetRange("1Y", shortRange), shortRange);
  assert.deepEqual(presetRange("YTD", shortRange), shortRange);
});
