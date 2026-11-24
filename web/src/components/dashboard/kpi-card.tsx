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

import { Card, CardContent } from "@/components/ui/card";
import type { Kpi } from "@/lib/data";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  artisans: Users,
  active: UserCheck,
  income: IndianRupee,
  gmv: ShoppingBag,
};

const trendStyle = {
  up: { icon: ArrowUpRight, tone: "bg-teal text-white", word: "up" },
  down: { icon: ArrowDownRight, tone: "bg-brick text-white", word: "down" },
  flat: { icon: Minus, tone: "bg-secondary text-ink", word: "unchanged" },
} as const;

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const trend = trendStyle[kpi.trend];
  const KpiIcon = icons[kpi.id] ?? Users;

  return (
    <Card className="gap-0">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-muted-foreground">{kpi.label}</p>
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-saffron text-ink">
            <KpiIcon className="size-5" aria-hidden />
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="tabular font-heading text-3xl font-bold tracking-tight">{kpi.value}</span>
          <span className={cn("flex items-center gap-0.5 rounded-full px-2 py-0.5 text-sm font-bold", trend.tone)}>
            <trend.icon className="size-4" aria-hidden />
            <span className="sr-only">{trend.word} </span>
            {kpi.change}%
          </span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{kpi.note}</p>
      </CardContent>
    </Card>
  );
}
