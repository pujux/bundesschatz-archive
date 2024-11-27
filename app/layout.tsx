import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Navigation from "@/components/navigation";
import { BondProvider } from "@/hooks/bond-context";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bundesschatz Archive",
  description: "Historic return rates from bonds available at https://bundesschatz.at",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn("bg-slate-50")}>
        <NuqsAdapter>
          <BondProvider>
            <Navigation />
            {children}
          </BondProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
