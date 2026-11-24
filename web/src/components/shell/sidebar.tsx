"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CONSOLE_NAV, VERTICALS, isActive } from "@/components/shell/nav";
import { Wordmark } from "@/components/shell/wordmark";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** Navigation list, shared by the desktop sidebar and the phone menu sheet. */
export function ConsoleNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Console" className="space-y-1">
      {CONSOLE_NAV.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-colors",
              active
                ? "bg-saffron font-semibold text-ink shadow-[3px_3px_0_0_var(--hs-ink)]"
                : "text-cream/85 hover:bg-cream/10 hover:text-cream",
            )}
          >
            <item.icon className="size-5 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function VerticalsPanel() {
  return (
    <div className="rounded-2xl border-2 border-cream/15 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-saffron">Producer verticals</p>
      <ul className="mt-3 space-y-2 text-sm text-cream/85">
        {VERTICALS.map(({ label, stage }) => (
          <li key={label} className="flex items-center justify-between gap-2">
            <span>{label}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
                stage === "Live" ? "bg-saffron text-ink" : "bg-cream/15 text-cream",
              )}
            >
              {stage}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col gap-6 overflow-y-auto bg-sidebar px-4 py-5 text-sidebar-foreground lg:flex">
      <Link href="/" className="rounded-xl px-2" aria-label={`${BRAND.name} home`}>
        <Wordmark showTagline onDark />
      </Link>
      <ConsoleNav />
      <div className="mt-auto space-y-4">
        <VerticalsPanel />
        <p className="px-2 text-xs leading-relaxed text-cream/70">{BRAND.console}</p>
      </div>
    </aside>
  );
}
