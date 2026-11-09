"use client";

import {
  BarChart3,
  Boxes,
  FileBadge2,
  LayoutDashboard,
  MapPinned,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Wordmark } from "@/components/shell/wordmark";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard, ready: true },
  { href: "/producer-verification", label: "Producer Verification", icon: ShieldCheck, ready: true },
  { href: "/beneficiaries", label: "Beneficiaries", icon: Users, ready: true },
  { href: "/clusters", label: "Clusters", icon: MapPinned, ready: true },
  { href: "/catalogue", label: "Catalogue", icon: Boxes, ready: true },
  { href: "/passports", label: "Origin Passports", icon: FileBadge2, ready: true },
  { href: "/reports", label: "Reports", icon: BarChart3, ready: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex h-[72px] items-center border-b border-sidebar-border px-5">
        <Wordmark showTagline onDark />
      </div>

      <p className="px-6 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/45">
        Programme
      </p>
      <nav className="flex-1 space-y-0.5 px-3">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const className = cn(
            "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
            active
              ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:rounded-full before:bg-sidebar-primary"
              : item.ready
                ? "text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground"
                : "cursor-default text-sidebar-foreground/40",
          );

          if (!item.ready) {
            return (
              <div key={item.href} className={className} aria-disabled>
                <item.icon className="size-4" />
                <span className="flex-1">{item.label}</span>
                <span className="rounded-full border px-1.5 py-px text-[10px] leading-tight">
                  Planned
                </span>
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={className}>
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-3 rounded-xl border border-sidebar-border bg-white/[0.04] p-3.5">
        <p className="text-[11px] font-semibold text-sidebar-accent-foreground">Producer verticals</p>
        <ul className="mt-2 space-y-1.5 text-[11px] text-sidebar-foreground/70">
          {[
            ["Handicraft artisans", "Live"],
            ["Handloom weavers", "Pilot"],
            ["SHG food products", "Pilot"],
            ["Forest produce", "Next"],
            ["Rural micro-manufacturing", "Next"],
          ].map(([label, stage]) => (
            <li key={label} className="flex items-center justify-between gap-2">
              <span>{label}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide",
                  stage === "Live"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "bg-white/10 text-sidebar-foreground/70",
                )}
              >
                {stage}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/50">
          <Settings className="size-4" />
          Settings
        </div>
        <p className="px-3 pt-2 text-[11px] leading-relaxed text-sidebar-foreground/45">
          {BRAND.console}
        </p>
      </div>
    </aside>
  );
}
