import Link from "next/link";

export function Disclaimer() {
  return (
    <div className="w-full border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col justify-between gap-2 md:gap-4">
        <p className="text-sm text-pretty text-muted-foreground">
          Bundesschatz Archive is an independent, privately operated information project. It is not affiliated with, endorsed by, or operated on
          behalf of the Republic of Austria or the Austrian Treasury. The data published on this website is provided for informational and archival
          purposes only. No guarantee is given as to the accuracy, completeness, or timeliness of the information.
        </p>
        <p className="text-sm text-pretty text-muted-foreground">
          Note: Data prior to Nov 26, 2024 was manually added from a{" "}
          <Link
            href="https://www.sparzinsen.at/?s=bundesschatz"
            target="_blank"
            rel="noreferrer"
            className="border-b border-muted-foreground hover:border-[#c8102e] hover:text-[#c8102e] transition-colors"
          >
            different source
          </Link>
          {", "}
          thanks to{" "}
          <Link
            href="https://github.com/MichelKSteinbauer"
            target="_blank"
            rel="noreferrer"
            className="border-b border-muted-foreground hover:border-[#c8102e] hover:text-[#c8102e] transition-colors"
          >
            Michael Karl Steinbauer
          </Link>
          {", "}
          and may differ in accuracy or completeness. Data after this date is sourced automatically.
        </p>
      </div>
    </div>
  );
}
