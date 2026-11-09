import { Topbar } from "@/components/shell/topbar";
import { Sidebar } from "@/components/shell/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar title="Reports" subtitle="Exportable administrative reports & scheme analytics" />
        <main className="flex-1 space-y-5 p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <BarChart3 className="size-8 text-muted-foreground mb-3" />
              <h3 className="font-semibold text-base">Administrative Reports</h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                Headline KPIs, channel splits, and income trajectory reports are visible on Overview.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
