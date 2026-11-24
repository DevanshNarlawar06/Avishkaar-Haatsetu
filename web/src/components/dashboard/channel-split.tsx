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
        <CardTitle>Sales by channel</CardTitle>
        <CardDescription>
          One listing is published to every channel at once
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex h-4 w-full overflow-hidden rounded-full border-2 border-ink">
          {channels.map((c, i) => (
            <div
              key={c.channel}
              style={{ width: `${c.share}%`, background: tones[i] }}
              role="presentation"
            />
          ))}
        </div>

        <ul className="mt-5 space-y-3">
          {channels.map((c, i) => (
            <li key={c.channel} className="flex items-center gap-3 text-sm">
              <span
                className="size-3.5 shrink-0 rounded-[4px] border border-ink"
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
