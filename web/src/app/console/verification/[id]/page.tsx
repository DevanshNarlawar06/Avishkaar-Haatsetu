import { Topbar } from "@/components/shell/topbar";
import { VerificationWorkspace } from "@/components/verification/verification-workspace";

export const metadata = { title: "Verification workspace" };

export default async function VerificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Topbar title="Verification workspace" subtitle="Level 1: identity and document check" />
      <main className="flex-1 p-4 sm:p-6">
        <VerificationWorkspace artisanId={id} />
      </main>
    </>
  );
}
