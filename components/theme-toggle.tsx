"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      // storing the choice overrides the system preference from then on
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // storage unavailable (e.g. blocked) — the toggle still works for this visit
    }
  };

  return (
    <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={toggle} aria-label="Toggle dark mode">
      {/* both icons are rendered so the markup is theme-independent; CSS picks one */}
      <Sun className="h-5 w-5 dark:hidden" aria-hidden />
      <Moon className="hidden h-5 w-5 dark:block" aria-hidden />
    </Button>
  );
}
