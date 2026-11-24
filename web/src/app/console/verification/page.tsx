import { Topbar } from "@/components/shell/topbar";
import { ArtisanQueue } from "@/components/verification/artisan-queue";

export const metadata = { title: "Producer verification" };

export default function VerificationQueuePage() {
  return (
    <>
      <Topbar title="Producer verification" subtitle="Review queue for new producers awaiting identity checks" />
      <main className="flex-1 p-4 sm:p-6">
        <ArtisanQueue />
      </main>
    </>
  );
}
