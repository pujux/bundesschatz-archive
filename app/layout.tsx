import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bundesschatz Archive",
  description: "Historic return rates from bonds available at https://bundesschatz.at",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="493778c3-89f0-4689-b635-228a6788d8e4" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50">
        {children}
        <Footer />
      </body>
    </html>
  );
}
