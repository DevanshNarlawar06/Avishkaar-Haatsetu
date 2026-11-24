"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { ConsoleNav, VerticalsPanel } from "@/components/shell/sidebar";
import { Wordmark } from "@/components/shell/wordmark";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BRAND } from "@/lib/brand";

/**
 * Page header. On phones and tablets it also carries the menu, because the
 * sidebar is hidden below the lg breakpoint.
 */
export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="flex min-h-[76px] items-center gap-4 px-4 py-3 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="grid size-11 shrink-0 place-items-center rounded-xl border-2 border-ink bg-cream lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" aria-hidden />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 gap-6 overflow-y-auto border-r-2 border-ink bg-indigo p-5 text-cream [&_[data-slot=sheet-close]]:text-cream"
          >
            <SheetTitle className="sr-only">Console menu</SheetTitle>
            <SheetDescription className="sr-only">{BRAND.console}</SheetDescription>
            <Link href="/" onClick={() => setOpen(false)} className="rounded-xl">
              <Wordmark showTagline onDark />
            </Link>
            <ConsoleNav onNavigate={() => setOpen(false)} />
            <VerticalsPanel />
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold leading-tight sm:text-2xl">{title}</h1>
          {subtitle ? <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>

        <span
          className="hidden shrink-0 rounded-full border-2 border-ink bg-saffron px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink sm:inline-flex"
          title="Figures on this console are sample data"
        >
          Sample data
        </span>
      </div>
    </header>
  );
}
