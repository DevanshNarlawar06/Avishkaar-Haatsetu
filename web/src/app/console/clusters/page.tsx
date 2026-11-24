import { ClusterTable } from "@/components/dashboard/cluster-table";
import { SampleDataNote } from "@/components/dashboard/sample-data-note";
import { Topbar } from "@/components/shell/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { clusters, crore } from "@/lib/data";

export const metadata = { title: "Clusters" };

export default function ClustersPage() {
  const byVertical = Object.entries(
    clusters.reduce<Record<string, { producers: number; gmv: number }>>((acc, c) => {
      const v = (acc[c.vertical] ??= { producers: 0, gmv: 0 });
      v.producers += c.artisans;
      v.gmv += c.gmv;
      return acc;
    }, {}),
  ).sort((a, b) => b[1].gmv - a[1].gmv);

  return (
    <>
      <Topbar title="Producer clusters" subtitle="How each cluster is performing, grouped by vertical" />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <section aria-label="By vertical" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {byVertical.map(([vertical, v]) => (
            <Card key={vertical}>
              <CardContent>
                <p className="text-sm font-semibold text-indigo">{vertical}</p>
                <p className="tabular font-heading text-2xl font-bold">{crore(v.gmv)}</p>
                <p className="text-sm text-muted-foreground">{v.producers.toLocaleString("en-IN")} producers</p>
              </CardContent>
            </Card>
          ))}
        </section>
        <ClusterTable />
        <SampleDataNote />
      </main>
    </>
  );
}
