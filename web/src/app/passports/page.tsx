import { Topbar } from "@/components/shell/topbar";
import { Sidebar } from "@/components/shell/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { FileBadge2 } from "lucide-react";

export default function PassportsPage() {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar title="Craft Passports" subtitle="Cryptographic Ed25519 product provenance verification" />
        <main className="flex-1 space-y-5 p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <FileBadge2 className="size-8 text-muted-foreground mb-3" />
              <h3 className="font-semibold text-base">Craft Passport Issuance & Verification</h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                Passports scan and verification metrics are active on the main Overview panel.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
