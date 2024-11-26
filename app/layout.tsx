import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import { BondProvider } from "@/hooks/bond-context";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bundesschatz Archiv",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn("bg-slate-50")}>
        <BondProvider>
          <Navigation />
          {children}
        </BondProvider>
      </body>
    </html>
  );
}
