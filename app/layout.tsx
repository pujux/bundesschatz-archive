import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
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
      <body className={cn("bg-slate-50 tk-halyard-text")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BondProvider>
            <Navigation />
            {children}
          </BondProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
