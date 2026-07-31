"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground transition-colors hover:text-accent"
        >
          <Terminal className="h-5 w-5 text-accent-secondary" />
          <span className="font-display text-lg font-bold tracking-tight">
            {SITE.name.split(" ")[0]}
          </span>
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted">
            v1.0
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-border hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

          {/* Theme toggle + mobile */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="rounded-md p-2 text-muted transition-colors hover:bg-border hover:text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-border bg-background px-6 pb-4 md:hidden animate-in slide-in-from-top-2 fade-in duration-200">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-border hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
