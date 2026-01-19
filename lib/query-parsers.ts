import { createParser } from "nuqs";

export const dateQueryParser = createParser({
  eq: (a: Date, b: Date) => a.getTime() === b.getTime(),
  parse: (value) => {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  },
  serialize: (value) => value.toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
});
