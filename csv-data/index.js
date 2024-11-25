import { appendFileSync } from "fs";

async function fetchData() {
  try {
    const url = "https://www.bundesschatz.at/customer-backend/api/public-products";
    const response = await fetch(url);
    const { data } = await response.json();

    let csvContent = "";

    for (const product of data) {
      const { productDisplayInfo, interestRates } = product;
      const { productKey, periodInterval, periodValue } = productDisplayInfo;

      if (interestRates.length === 0) {
        console.warn(`No interest rates found for product ${productKey}`);
        continue;
      }

      const { date, interestRate } = interestRates[0];

      csvContent += `"${productKey}","${periodInterval}","${periodValue}","${date}","${interestRate}"\n`;
    }

    const csvFilePath = "bundesschatz.csv";
    appendFileSync(csvFilePath, csvContent, {});

    console.log("Data fetched and appended to CSV successfully.");
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

fetchData();
