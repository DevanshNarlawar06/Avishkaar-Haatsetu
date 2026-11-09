"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { activitySeries } from "@/lib/data";

const config = {
  listings: { label: "Listings created", color: "var(--chart-2)" },
  orders: { label: "Orders fulfilled", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function ActivityChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Listings and orders
        </CardTitle>
        <CardDescription className="text-xs">
          Whether catalogued goods are converting into sales
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="h-[248px] w-full">
          <BarChart data={activitySeries} margin={{ left: 4, right: 8, top: 4 }}>
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
              width={38}
              fontSize={11}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="listings"
              fill="var(--chart-2)"
              radius={[3, 3, 0, 0]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="orders"
              fill="var(--chart-3)"
              radius={[3, 3, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
