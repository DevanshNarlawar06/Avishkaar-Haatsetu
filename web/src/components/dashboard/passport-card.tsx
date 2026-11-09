import { QrCode, ShieldCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { passportStats } from "@/lib/data";

/**
 * Craft Passport is the part of the programme a ministry can audit, so it gets
 * its own panel rather than a row in a table.
 */
export function PassportCard() {
  const rate = Math.round(
    (passportStats.verified / passportStats.scanned) * 100,
  );

  const rows = [
    { label: "Passports issued", value: passportStats.issued },
    { label: "Scanned by buyers", value: passportStats.scanned },
    { label: "Signature verified", value: passportStats.verified },
  ];

  return (
    <Card className="h-full border-[var(--brand-turmeric)]/45">
      <CardHeader>
        <div className="flex items-center gap-2">
          <QrCode className="size-4 text-[var(--brand-leaf)]" />
          <CardTitle className="text-sm font-semibold">Craft Passport</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Signed provenance tied to the beneficiary record
        </CardDescription>
      </CardHeader>

      <CardContent>
        <dl className="space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between">
              <dt className="text-xs text-muted-foreground">{row.label}</dt>
              <dd className="tabular text-sm font-medium">
                {row.value.toLocaleString("en-IN")}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-start gap-2 rounded-md bg-secondary p-3">
          <ShieldCheck className="mt-px size-4 shrink-0 text-[var(--brand-success)]" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="tabular font-medium text-foreground">{rate}%</span>{" "}
            of scans verified against the issuing key. Provenance is verified,
            not claimed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
