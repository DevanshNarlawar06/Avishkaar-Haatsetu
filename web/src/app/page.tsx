import { ActivityChart } from "@/components/dashboard/activity-chart";
import { ChannelSplit } from "@/components/dashboard/channel-split";
import { ClusterTable } from "@/components/dashboard/cluster-table";
import { IncomeChart } from "@/components/dashboard/income-chart";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { PassportCard } from "@/components/dashboard/passport-card";
import { SchemeProgress } from "@/components/dashboard/scheme-progress";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { kpis } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import { Mic, Camera, IndianRupee, QrCode } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-full flex-1">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title="Programme overview"
          subtitle="Digital market linkage for every rural producer. Pilot vertical: handicraft artisans"
        />

        <main className="flex-1 space-y-5 p-6">
          <section className="relative overflow-hidden rounded-2xl bg-[var(--brand-leaf)] p-6 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-[var(--brand-marigold)]/25 blur-2xl"
            />
            <div className="relative flex flex-col gap-5">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F7C979]">
                  {BRAND.tagline}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-snug tracking-tight">
                  Any rural producer: one voice note and one photo become a priced, verified listing on every market.
                </h2>
              </div>
              <ul className="flex flex-wrap gap-2 text-xs">
                {[
                  { icon: Mic, label: "Speak any language" },
                  { icon: Camera, label: "AI photo studio" },
                  { icon: IndianRupee, label: "Fair-price floor" },
                  { icon: QrCode, label: "Signed passport" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-white/10 px-3 py-2.5 ring-1 ring-white/15"
                  >
                    <Icon className="size-4 shrink-0 text-[#F7C979]" />
                    <span className="leading-tight">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <IncomeChart />
            </div>
            <SchemeProgress />
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <ActivityChart />
            </div>
            <ChannelSplit />
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-3">
              <ClusterTable />
            </div>
            <PassportCard />
          </section>

          <p className="pt-1 text-xs text-[var(--brand-ink-faint)]">
            Prototype interface. All figures shown are sample data and are not
            drawn from any live scheme record.
          </p>
        </main>
      </div>
    </div>
  );
}
