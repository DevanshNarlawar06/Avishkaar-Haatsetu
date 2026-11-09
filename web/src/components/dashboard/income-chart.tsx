"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { incomeSeries } from "@/lib/data";

const config = {
  current: { label: "On HaatSetu", color: "var(--chart-1)" },
  intake: { label: "At intake", color: "var(--chart-5)" },
} satisfies ChartConfig;

/**
 * The chart the ministry actually cares about. Income at intake is a flat
 * reference line, so the gap between the two series is the programme effect
 * rather than something the viewer has to compute.
 */
export function IncomeChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Median monthly producer income
        </CardTitle>
        <CardDescription className="text-xs">
          Compared against income recorded at intake
        </CardDescription>
        <CardAction>
          <Badge
            variant="outline"
            className="border-[var(--brand-success)]/40 text-[var(--brand-success)]"
          >
            Up 34.6 percent
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="h-[248px] w-full">
          <AreaChart data={incomeSeries} margin={{ left: 4, right: 8, top: 4 }}>
            <defs>
              <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={11}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={46}
              fontSize={11}
              tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <span className="flex w-full justify-between gap-4">
                      <span className="text-muted-foreground">
                        {config[name as keyof typeof config]?.label ?? name}
                      </span>
                      <span className="tabular font-medium">
                        ₹{Number(value).toLocaleString("en-IN")}
                      </span>
                    </span>
                  )}
                />
              }
            />
            {/* Animation off. A dashboard should be readable the instant it
                paints, and the entry transition also makes the chart blank in
                any static capture. */}
            <Area
              dataKey="intake"
              type="monotone"
              stroke="var(--chart-5)"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              fill="none"
              isAnimationActive={false}
            />
            <Area
              dataKey="current"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#fillCurrent)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
