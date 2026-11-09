import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { channels } from "@/lib/data";

const tones = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

/** Where published listings actually sell. */
export function ChannelSplit() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Sales by channel</CardTitle>
        <CardDescription className="text-xs">
          One listing is published to every channel at once
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex h-2 w-full overflow-hidden rounded-full">
          {channels.map((c, i) => (
            <div
              key={c.channel}
              style={{ width: `${c.share}%`, background: tones[i] }}
              title={`${c.channel} ${c.share} percent`}
            />
          ))}
        </div>

        <ul className="mt-5 space-y-3">
          {channels.map((c, i) => (
            <li key={c.channel} className="flex items-center gap-3 text-xs">
              <span
                className="size-2.5 shrink-0 rounded-[3px]"
                style={{ background: tones[i] }}
              />
              <span className="flex-1 font-medium">{c.channel}</span>
              <span className="tabular text-muted-foreground">
                {c.orders.toLocaleString("en-IN")} orders
              </span>
              <span className="tabular w-9 text-right font-medium">
                {c.share}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
