import {
  FileBadge2,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Console navigation. Sidebar (desktop) and the menu sheet (phone) both read this. */
export const CONSOLE_NAV: NavItem[] = [
  { href: "/console", label: "Overview", icon: LayoutDashboard },
  { href: "/console/verification", label: "Producer verification", icon: ShieldCheck },
  { href: "/console/beneficiaries", label: "Beneficiaries", icon: Users },
  { href: "/console/clusters", label: "Clusters", icon: MapPinned },
  { href: "/console/passports", label: "Origin passports", icon: FileBadge2 },
];

export const VERTICALS: { label: string; stage: "Live" | "Pilot" | "Next" }[] = [
  { label: "Handicraft artisans", stage: "Live" },
  { label: "Handloom weavers", stage: "Pilot" },
  { label: "SHG food products", stage: "Pilot" },
  { label: "Forest produce", stage: "Next" },
  { label: "Rural micro-manufacturing", stage: "Next" },
];

export function isActive(pathname: string, href: string): boolean {
  return href === "/console" ? pathname === href : pathname === href || pathname.startsWith(href + "/");
}
