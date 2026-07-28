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
        {/* set the theme class before first paint to avoid a flash; falls back to the system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="493778c3-89f0-4689-b635-228a6788d8e4" />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        {children}
        <Footer />
      </body>
    </html>
  );
}
