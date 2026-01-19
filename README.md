# Bundesschatz Archive

Historic return rates from bonds available at https://bundesschatz.at, shown as a chart and table in a Next.js app.

## Features

- Interactive chart and data table for multiple bond terms.
- Date-range filtering and tabbed chart/table views.
- Data sourced automatically from https://bundesschatz.at on a daily basis.

## Requirements

- Node.js 24 (see `.nvmrc` / `.node-version`).
- pnpm (see `package.json` `packageManager` entry).

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Build for production (static page output is in `out` directory):

```bash
pnpm build
```

Lint:

```bash
pnpm lint
```

## Deployment

- Uses Next.js output `export` option.
- Static page is deployed to GitHub Pages.

## Data

The app reads `bundesschatz.csv` at runtime and transforms it into chart/table rows.

CSV columns:

```
"Product Key","Period Interval","Period Value","Date","Interest Rate","Green"
```

- `Period Interval` is `M` (months) or `Y` (years).
- `Period Value` + `Period Interval` map to the bond keys used in the UI (e.g. `1M`, `4Y`).

### Update the CSV

There is a small fetcher script that appends new rows from the public Bundesschatz API:

```bash
node data-fetcher/index.cjs
```

It only adds rows that are not already present in `bundesschatz.csv` and sorts new rows by date before appending.

## Disclaimer

Bundesschatz Archive is an independent, privately operated information project. It is not affiliated with, endorsed by, or operated on behalf of Bundesschatz.
