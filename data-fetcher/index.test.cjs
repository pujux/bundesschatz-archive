const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const { csvEscape, buildNewLines, CSV_FILE_PATH } = require("./index.cjs");

function makeProduct(overrides = {}, rates = [{ date: "2026-07-29", interestRate: 2.2 }]) {
  return {
    id: "x",
    productDisplayInfo: {
      periodInterval: "M",
      periodValue: 1,
      green: false,
      productKey: "BS1M",
      ...overrides,
    },
    interestRates: rates,
  };
}

test("csvEscape quotes values and doubles inner quotes", () => {
  assert.equal(csvEscape('a"b'), '"a""b"');
  assert.equal(csvEscape(3.5), '"3.5"');
});

test("CSV_FILE_PATH points at the repo-root CSV regardless of cwd", () => {
  assert.ok(path.isAbsolute(CSV_FILE_PATH));
  assert.equal(CSV_FILE_PATH, path.join(__dirname, "..", "bundesschatz.csv"));
});

test("buildNewLines serializes valid products in the existing CSV format", () => {
  const lines = buildNewLines([makeProduct()], new Set());
  assert.deepEqual(lines, ['"BS1M","M","1","2026-07-29","2.2","false"']);
});

test("buildNewLines skips lines already present in the existing set", () => {
  const existing = new Set(['"BS1M","M","1","2026-07-29","2.2","false"']);
  assert.deepEqual(buildNewLines([makeProduct()], existing), []);
});

test("buildNewLines sorts output by date even when a field contains a comma", () => {
  const products = [
    makeProduct({ productKey: "BS,10J" }, [{ date: "2026-07-30", interestRate: 3.2 }]),
    makeProduct({}, [{ date: "2026-07-29", interestRate: 2.2 }]),
  ];
  const lines = buildNewLines(products, new Set());
  assert.deepEqual(lines, ['"BS1M","M","1","2026-07-29","2.2","false"', '"BS,10J","M","1","2026-07-30","3.2","false"']);
});

test("buildNewLines throws when the payload is not an array", () => {
  assert.throws(() => buildNewLines(undefined, new Set()), /array/i);
  assert.throws(() => buildNewLines({ data: [] }, new Set()), /array/i);
});

test("buildNewLines throws when the payload is an empty array", () => {
  assert.throws(() => buildNewLines([], new Set()), /empty/i);
});

test("buildNewLines throws when productDisplayInfo is missing", () => {
  const product = makeProduct();
  delete product.productDisplayInfo;
  assert.throws(() => buildNewLines([product], new Set()), /productDisplayInfo/);
});

test("buildNewLines throws when productKey is missing", () => {
  assert.throws(() => buildNewLines([makeProduct({ productKey: undefined })], new Set()), /productKey/);
});

test("buildNewLines throws when a rate has no date", () => {
  const product = makeProduct({}, [{ interestRate: 2.2 }]);
  assert.throws(() => buildNewLines([product], new Set()), /date/);
});

test("buildNewLines throws when a rate date is not YYYY-MM-DD", () => {
  const product = makeProduct({}, [{ date: "29.07.2026", interestRate: 2.2 }]);
  assert.throws(() => buildNewLines([product], new Set()), /date/);
});

test("buildNewLines throws when interestRate is missing or not a finite number", () => {
  assert.throws(() => buildNewLines([makeProduct({}, [{ date: "2026-07-29" }])], new Set()), /interestRate/);
  assert.throws(() => buildNewLines([makeProduct({}, [{ date: "2026-07-29", interestRate: "2.2" }])], new Set()), /interestRate/);
  assert.throws(() => buildNewLines([makeProduct({}, [{ date: "2026-07-29", interestRate: NaN }])], new Set()), /interestRate/);
});

test("buildNewLines throws when green is not a boolean", () => {
  assert.throws(() => buildNewLines([makeProduct({ green: "false" })], new Set()), /green/);
});

test("buildNewLines allows a product with an empty interestRates list", () => {
  const product = makeProduct({}, []);
  assert.deepEqual(buildNewLines([product, makeProduct()], new Set()), ['"BS1M","M","1","2026-07-29","2.2","false"']);
});
