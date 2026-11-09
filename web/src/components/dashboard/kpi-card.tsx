import {
  ArrowDownRight,
  ArrowUpRight,
  IndianRupee,
  Minus,
  ShoppingBag,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  artisans: Users,
  active: UserCheck,
  income: IndianRupee,
  gmv: ShoppingBag,
};

import { Card, CardContent } from "@/components/ui/card";
import type { Kpi } from "@/lib/data";
import { cn } from "@/lib/utils";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon =
    kpi.trend === "up"
      ? ArrowUpRight
      : kpi.trend === "down"
        ? ArrowDownRight
        : Minus;

  const tone =
    kpi.trend === "up"
      ? "text-[var(--brand-success)]"
      : kpi.trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  const KpiIcon = icons[kpi.id] ?? Users;

  return (
    <Card className="gap-0 py-5 transition-shadow hover:shadow-md">
      <CardContent className="px-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
            <KpiIcon className="size-4" />
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="tabular text-[28px] font-bold tracking-tight">
            {kpi.value}
          </span>
          <span
            className={cn("flex items-center gap-0.5 rounded-full bg-secondary px-1.5 py-0.5 text-xs font-semibold", tone)}
          >
            <Icon className="size-3.5" />
            {kpi.change}%
          </span>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">{kpi.note}</p>
      </CardContent>
    </Card>
  );
}
