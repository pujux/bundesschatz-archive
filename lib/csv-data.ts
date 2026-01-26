import { promises as fs } from "fs";
import { parse } from "csv-parse";
import path from "path";
import { isBondKey, type BondData } from "./utils";

type CSVData = {
  "Product Key": string;
  "Period Interval": string;
  "Period Value": string;
  Date: string;
  "Interest Rate": string;
  Green: string;
};

function transformCSVData(data: CSVData[]): BondData[] {
  const transformedData: BondData[] = [];

  let currentItem: Partial<BondData> = {};
  for (const item of data) {
    // new item started
    if (!currentItem.Date) {
      currentItem.Date = item.Date;
    }

    if (currentItem.Date !== item.Date) {
      // item ended, reset `currentItem`
      transformedData.push(currentItem as BondData);
      currentItem = {};
    }

    const bondKey = `${item["Period Value"]}${item["Period Interval"]}`;
    if (isBondKey(bondKey)) {
      currentItem[bondKey] = Number(item["Interest Rate"]);
    }
  }

  transformedData.push(currentItem as BondData);

  return transformedData;
}

export async function getLastModified() {
  try {
    const csvPath = path.join(process.cwd(), "bundesschatz.csv");
    const metadata = await fs.stat(csvPath);
    return metadata.mtime;
  } catch (error) {
    console.error("Error reading CSV metadata:", error);
    return new Date(0);
  }
}

export async function parseCSV() {
  try {
    const csvPath = path.join(process.cwd(), "bundesschatz.csv");
    const fileContent = await fs.readFile(csvPath, "utf-8");

    return await new Promise<BondData[]>((resolve, reject) => {
      parse(
        fileContent,
        {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        },
        (err, data: CSVData[]) => {
          if (err) {
            reject(err);
          }
          resolve(transformCSVData(data));
        },
      );
    });
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return [];
  }
}
