import { SampleDataNote } from "@/components/dashboard/sample-data-note";
import { SchemeProgress } from "@/components/dashboard/scheme-progress";
import { Topbar } from "@/components/shell/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { schemes } from "@/lib/data";

export const metadata = { title: "Beneficiaries" };

export default function BeneficiariesPage() {
  const reached = schemes.reduce((n, s) => n + s.beneficiaries, 0);
  const target = schemes.reduce((n, s) => n + s.target, 0);
  const gap = [...schemes].sort((a, b) => a.beneficiaries / a.target - b.beneficiaries / b.target)[0];

  return (
    <>
      <Topbar title="Beneficiaries" subtitle="Producers onboarded under each welfare scheme, against target" />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <section aria-label="Totals" className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent>
              <p className="text-sm font-semibold text-muted-foreground">Onboarded</p>
              <p className="tabular font-heading text-3xl font-bold">{reached.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm font-semibold text-muted-foreground">Target</p>
              <p className="tabular font-heading text-3xl font-bold">{target.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>
          <Card className="bg-saffron">
            <CardContent>
              <p className="text-sm font-semibold">Furthest from target</p>
              <p className="font-heading text-xl font-bold leading-snug">{gap.name}</p>
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <SchemeProgress />
          <Card>
            <CardHeader>
              <CardTitle>How a producer is counted</CardTitle>
              <CardDescription>The rule behind every number on this page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-base leading-relaxed">
              <p>A producer counts as onboarded once an officer has approved their identity (Level 1 verification) and they have published at least one listing.</p>
              <p>Scheme is taken from the beneficiary record linked at intake. A producer belongs to at most one scheme here, so totals never double count.</p>
            </CardContent>
          </Card>
        </div>
        <SampleDataNote />
      </main>
    </>
  );
}
