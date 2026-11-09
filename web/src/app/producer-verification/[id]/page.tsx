import { Topbar } from "@/components/shell/topbar";
import { Sidebar } from "@/components/shell/sidebar";
import { VerificationWorkspace } from "@/components/verification/verification-workspace";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VerificationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const artisanId = resolvedParams.id;

  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar
          title="Verification Workspace"
          subtitle="Level 1 Identity & Document Verification Protocol"
        />
        <main className="flex-1 space-y-5 p-5">
          <VerificationWorkspace artisanId={artisanId} />
        </main>
      </div>
    </div>
  );
}
