import { getLastModified } from "@/lib/csv-data";
import { formatRelative } from "date-fns";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default async function Footer() {
  const lastModified = await getLastModified();

  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-wrap sm:flex-row items-center justify-between gap-2 md:gap-4">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ by{" "}
          <Link
            href="https://pufler.dev"
            target="_blank"
            className="font-medium text-foreground border-b border-foreground hover:border-[#c8102e] hover:text-[#c8102e] transition-colors"
            aria-label="Visit Julian Pufler's website"
          >
            Julian Pufler
          </Link>
        </p>
        <ul className="flex gap-2">
          <li>
            <Link
              href="https://github.com/pujux"
              target="_blank"
              className="text-muted-foreground hover:text-[#c8102e] transition-colors border-2 border-muted-foreground hover:border-[#c8102e] rounded-lg p-0.5 flex items-center"
              aria-label="Visit Julian Pufler's GitHub profile"
            >
              <Github className="h-5 w-5" />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/julianpufler/"
              target="_blank"
              className="text-muted-foreground hover:text-[#c8102e] transition-colors border-2 border-muted-foreground hover:border-[#c8102e] rounded-lg p-0.5 flex items-center"
              aria-label="Visit Julian Pufler's LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </li>
        </ul>
        <p className="text-sm text-muted-foreground" aria-label="Last updated timestamp" title={lastModified.toLocaleString()}>
          Last updated <time dateTime={lastModified.toISOString()}>{formatRelative(lastModified, new Date(), { weekStartsOn: 1 })}</time>
        </p>
      </div>
    </footer>
  );
}
