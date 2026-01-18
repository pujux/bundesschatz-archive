const fs = require("node:fs");

const csvFilePath = "bundesschatz.csv";
const apiUrl = "https://www.bundesschatz.at/customer-backend/api/public-products";

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

async function fetchData() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const data = await res.json().then((json) => json?.data);

    if (!data) {
      throw new Error("No data returned from API");
    }

    const existing = loadExistingLines(csvFilePath);

    const newLines = new Set();

    for (const product of data) {
      const { productDisplayInfo, interestRates } = product ?? {};

      if (!productDisplayInfo || !interestRates?.length) {
        continue;
      }

      const { productKey, periodInterval, periodValue, green } = productDisplayInfo;

      for (const rate of interestRates) {
        const { date, interestRate } = rate ?? {};

        if (!date) {
          continue;
        }

        const line = [productKey, periodInterval, periodValue, date, interestRate, green].map(csvEscape).join(",");

        if (!existing.has(line)) {
          newLines.add(line);
        }
      }
    }

    if (newLines.size === 0) {
      console.log("No new rows to append.");
      return;
    }

    // Sort by date (4th column)
    const sorted = Array.from(newLines).sort((a, b) => {
      const da = a.split(",", 5)[3];
      const db = b.split(",", 5)[3];
      if (da < db) return -1;
      if (da > db) return 1;
      return 0;
    });

    const needsLeadingNewline =
      fs.existsSync(csvFilePath) && fs.statSync(csvFilePath).size > 0 && !fs.readFileSync(csvFilePath).subarray(-1).equals(Buffer.from("\n"));

    const prefix = needsLeadingNewline ? "\n" : "";
    fs.appendFileSync(csvFilePath, prefix + sorted.join("\n") + "\n", "utf8");

    console.log(`Appended ${sorted.length} new row(s) to CSV successfully.`);
  } catch (err) {
    console.error("An error occurred while fetching data:", err);
  }
}

fetchData();
