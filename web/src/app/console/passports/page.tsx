import { KeyRound, QrCode, ScanLine } from "lucide-react";

import { PassportCard } from "@/components/dashboard/passport-card";
import { SampleDataNote } from "@/components/dashboard/sample-data-note";
import { Topbar } from "@/components/shell/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Origin passports" };

const steps = [
  { icon: KeyRound, title: "Signed at publish", body: "When a producer approves a listing, the server signs who made it, where, and how long it took with an Ed25519 key." },
  { icon: QrCode, title: "Printed as a QR code", body: "The signed record travels with the product as a QR code on the tag and in every channel listing." },
  { icon: ScanLine, title: "Checked by the buyer", body: "A scan checks the signature against the published key. Any edit to the record breaks the signature." },
];

export default function PassportsPage() {
  return (
    <>
      <Topbar title="Origin passports" subtitle="Signed provenance that buyers and auditors can check" />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>How a passport works</CardTitle>
              <CardDescription>Provenance is verified, not claimed</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="grid gap-4 md:grid-cols-3">
                {steps.map((s, i) => (
                  <li key={s.title} className="rounded-xl border-2 border-ink/15 bg-paper p-4">
                    <s.icon className="size-6 text-brick" aria-hidden />
                    <h3 className="mt-2 text-base font-bold">
                      {i + 1}. {s.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <PassportCard />
        </div>
        <SampleDataNote />
      </main>
    </>
  );
}
