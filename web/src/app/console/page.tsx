import { Camera, IndianRupee, Mic, QrCode } from "lucide-react";

import { ActivityChart } from "@/components/dashboard/activity-chart";
import { ChannelSplit } from "@/components/dashboard/channel-split";
import { ClusterTable } from "@/components/dashboard/cluster-table";
import { IncomeChart } from "@/components/dashboard/income-chart";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { PassportCard } from "@/components/dashboard/passport-card";
import { SchemeProgress } from "@/components/dashboard/scheme-progress";
import { SampleDataNote } from "@/components/dashboard/sample-data-note";
import { Topbar } from "@/components/shell/topbar";
import { kpis } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export const metadata = { title: "Overview" };

const pillars = [
  { icon: Mic, label: "Speak any language" },
  { icon: Camera, label: "AI photo studio" },
  { icon: IndianRupee, label: "Fair-price floor" },
  { icon: QrCode, label: "Signed passport" },
];

export default function OverviewPage() {
  return (
    <>
      <Topbar
        title="Programme overview"
        subtitle="Digital market linkage for rural producers. Pilot vertical: handicraft artisans."
      />

      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <section aria-labelledby="mission" className="hs-card hs-card-saffron bg-indigo p-6 text-cream">
          <p className="hs-eyebrow text-saffron">{BRAND.tagline}</p>
          <h2 id="mission" className="mt-2 max-w-3xl text-2xl font-bold leading-snug">
            One voice note and one photo become a priced, verified listing on every market.
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {pillars.map(({ icon: Icon, label }) => (
              <li key={label} className="hs-pill bg-cream text-ink">
                <Icon className="size-4 text-brick" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Key figures" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <IncomeChart />
          </div>
          <SchemeProgress />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ActivityChart />
          </div>
          <ChannelSplit />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="min-w-0 xl:col-span-3">
            <ClusterTable />
          </div>
          <PassportCard />
        </section>

        <SampleDataNote />
      </main>
    </>
  );
}
