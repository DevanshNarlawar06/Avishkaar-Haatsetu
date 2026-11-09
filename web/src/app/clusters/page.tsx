import { Topbar } from "@/components/shell/topbar";
import { Sidebar } from "@/components/shell/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinned } from "lucide-react";

export default function ClustersPage() {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar title="Producer Clusters" subtitle="Performance of rural producer clusters across verticals" />
        <main className="flex-1 space-y-5 p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <MapPinned className="size-8 text-muted-foreground mb-3" />
              <h3 className="font-semibold text-base">Producer Clusters</h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                Cluster analytics table is available on the main Overview dashboard.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
