import { Topbar } from "@/components/shell/topbar";
import { Sidebar } from "@/components/shell/sidebar";
import { ArtisanQueue } from "@/components/verification/artisan-queue";

export default function ArtisanVerificationPage() {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar
          title="Artisan Verification"
          subtitle="Internal review queue for pending artisan onboarding & identity verification"
        />
        <main className="flex-1 space-y-5 p-6">
          <ArtisanQueue />
        </main>
      </div>
    </div>
  );
}
