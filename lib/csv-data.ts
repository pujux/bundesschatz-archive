import { promises as fs } from "fs";
import { execSync } from "child_process";
import { parse } from "csv-parse";
import path from "path";
import { isBondKey, type BondData } from "./utils.ts";

type CSVData = {
  "Product Key": string;
  "Period Interval": string;
  "Period Value": string;
  Date: string;
  "Interest Rate": string;
  Green: string;
};

export function transformCSVData(data: CSVData[]): BondData[] {
  const transformedData: BondData[] = [];

  let currentItem: Partial<BondData> = {};
  for (const item of data) {
    if (currentItem.Date !== item.Date) {
      // date changed, start a new item
      if (currentItem.Date) {
        transformedData.push(currentItem as BondData);
      }
      currentItem = { Date: item.Date };
    }

    const bondKey = `${item["Period Value"]}${item["Period Interval"]}`;
    if (isBondKey(bondKey)) {
      currentItem[bondKey] = Number(item["Interest Rate"]);
    }
  }

  if (currentItem.Date) {
    transformedData.push(currentItem as BondData);
  }

  return transformedData;
}

export async function getLastModified() {
  const csvPath = path.join(process.cwd(), "bundesschatz.csv");

  // The fs mtime in CI is the checkout time, which would show the build time
  // instead of when the data last changed — prefer the git commit time.
  try {
    const gitDate = execSync("git log -1 --format=%cI -- bundesschatz.csv", { encoding: "utf8" }).trim();
    if (gitDate) {
      return new Date(gitDate);
    }
  } catch {
    // not a git checkout — fall through to the file mtime
  }

  try {
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
