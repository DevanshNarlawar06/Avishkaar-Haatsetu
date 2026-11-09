import { Topbar } from "@/components/shell/topbar";
import { Sidebar } from "@/components/shell/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function BeneficiariesPage() {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar title="Beneficiaries" subtitle="Ministry welfare scheme beneficiary registry" />
        <main className="flex-1 space-y-5 p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <Clock className="size-8 text-muted-foreground mb-3" />
              <h3 className="font-semibold text-base">Beneficiaries Registry</h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                This section is unlocked for navigation. Full beneficiary scheme breakdown is accessible via Overview.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
