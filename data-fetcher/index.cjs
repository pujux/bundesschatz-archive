const fs = require("node:fs");
const path = require("node:path");

const CSV_FILE_PATH = path.join(__dirname, "..", "bundesschatz.csv");
const apiUrl = "https://www.bundesschatz.at/customer-backend/api/public-products";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function csvEscape(value) {
  const s = String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

function loadExistingLines(filePath) {
  if (!fs.existsSync(filePath)) {
    return new Set();
  }

  const content = fs.readFileSync(filePath, "utf8");
  const set = new Set();

  for (let line of content.split("\n")) {
    if (line.endsWith("\r")) {
      line = line.slice(0, -1);
    }
    if (line) {
      set.add(line);
    }
  }

  return set;
}

// Malformed products abort the run: a partially-filled row would otherwise be
// committed to the CSV by CI and permanently corrupt the dataset.
function buildNewLines(data, existing) {
  if (!Array.isArray(data)) {
    throw new Error("API payload is not an array");
  }
  if (data.length === 0) {
    throw new Error("API payload is an empty array");
  }

  const newRows = [];
  const seen = new Set();

  for (const product of data) {
    const { productDisplayInfo, interestRates } = product ?? {};

    if (!productDisplayInfo) {
      throw new Error(`Product is missing productDisplayInfo: ${JSON.stringify(product)}`);
    }

    const { productKey, periodInterval, periodValue, green } = productDisplayInfo;

    if (typeof productKey !== "string" || !productKey) {
      throw new Error(`Product has invalid productKey: ${JSON.stringify(productDisplayInfo)}`);
    }
    if (typeof periodInterval !== "string" || !periodInterval) {
      throw new Error(`Product ${productKey} has invalid periodInterval`);
    }
    if (typeof periodValue !== "number" || !Number.isFinite(periodValue)) {
      throw new Error(`Product ${productKey} has invalid periodValue`);
    }
    if (typeof green !== "boolean") {
      throw new Error(`Product ${productKey} has invalid green flag`);
    }
    if (!Array.isArray(interestRates)) {
      throw new Error(`Product ${productKey} has invalid interestRates`);
    }

    for (const rate of interestRates) {
      const { date, interestRate } = rate ?? {};

      if (typeof date !== "string" || !DATE_PATTERN.test(date)) {
        throw new Error(`Product ${productKey} has a rate with an invalid date: ${JSON.stringify(rate)}`);
      }
      if (typeof interestRate !== "number" || !Number.isFinite(interestRate)) {
        throw new Error(`Product ${productKey} has a rate with an invalid interestRate: ${JSON.stringify(rate)}`);
      }

      const line = [productKey, periodInterval, periodValue, date, interestRate, green].map(csvEscape).join(",");

      if (!existing.has(line) && !seen.has(line)) {
        seen.add(line);
        newRows.push({ date, line });
      }
    }
  }

  return newRows
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
    .map((row) => row.line);
}

async function fetchData() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const existing = loadExistingLines(CSV_FILE_PATH);
    const sorted = buildNewLines(json?.data, existing);

    if (sorted.length === 0) {
      console.log("No new rows to append.");
      return;
    }

    const needsLeadingNewline =
      fs.existsSync(CSV_FILE_PATH) &&
      fs.statSync(CSV_FILE_PATH).size > 0 &&
      !fs.readFileSync(CSV_FILE_PATH).subarray(-1).equals(Buffer.from("\n"));

    const prefix = needsLeadingNewline ? "\n" : "";
    fs.appendFileSync(CSV_FILE_PATH, prefix + sorted.join("\n") + "\n", "utf8");

    console.log(`Appended ${sorted.length} new row(s) to CSV successfully.`);
  } catch (err) {
    console.error("An error occurred while fetching data:", err);
    process.exitCode = 1;
  }
}

module.exports = { csvEscape, loadExistingLines, buildNewLines, CSV_FILE_PATH };

if (require.main === module) {
  fetchData();
}
