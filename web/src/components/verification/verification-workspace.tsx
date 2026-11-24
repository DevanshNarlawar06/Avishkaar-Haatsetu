"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  CloudOff,
  FileCheck,
  Info,
  Maximize2,
  Minimize2,
  ShieldCheck,
  User,
  XCircle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { approveArtisan, fetchArtisanDetail, requestMoreInfo, type ArtisanDetail } from "@/lib/api";
import { cn } from "@/lib/utils";

const QUEUE = "/console/verification";

const CHECKS = [
  { key: "nameMatches", label: "Name matches the submitted profile" },
  { key: "dobMatches", label: "Date of birth and state match" },
  { key: "detailsMatch", label: "No sign of tampering or mismatch" },
  { key: "manualReviewCompleted", label: "I have reviewed this record myself" },
] as const;

type CheckKey = (typeof CHECKS)[number]["key"];

const REASONS = [
  "Identity details don't match the submitted profile",
  "Document image is unclear or unreadable",
  "Additional producer proof required",
  "Workspace evidence required (photos or video)",
  "Other discrepancy in the application",
];

type Load = { status: "loading" } | { status: "error" } | { status: "ready"; artisan: ArtisanDetail };
type Notice = { tone: "ok" | "bad"; text: string } | null;

function Field({ label, value, mono }: { label: string; value?: string | number | null; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className={cn("mt-0.5 text-base font-medium", mono && "font-mono text-sm")}>
        {value === undefined || value === null || value === "" ? (
          <span className="text-muted-foreground">Not provided</span>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

export function VerificationWorkspace({ artisanId }: { artisanId: string }) {
  const router = useRouter();
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [checks, setChecks] = useState<Record<CheckKey, boolean>>({
    nameMatches: false,
    dobMatches: false,
    detailsMatch: false,
    manualReviewCompleted: false,
  });
  const [notice, setNotice] = useState<Notice>(null);
  const [busy, setBusy] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);

  useEffect(() => {
    let cancelled = false;
    fetchArtisanDetail(artisanId).then((a) => {
      if (!cancelled) setLoad(a ? { status: "ready", artisan: a } : { status: "error" });
    });
    return () => {
      cancelled = true;
    };
  }, [artisanId]);

  if (load.status === "loading") {
    return <p className="py-24 text-center text-base text-muted-foreground">Loading the producer record…</p>;
  }

  if (load.status === "error") {
    return (
      <Card className="mx-auto max-w-lg">
        <CardContent className="flex flex-col items-center py-6 text-center">
          <CloudOff className="size-10 text-brick" aria-hidden />
          <h2 className="mt-3 text-xl font-bold">This record could not be loaded</h2>
          <p className="mt-1 text-base text-muted-foreground">
            The HaatSetu API did not answer, or no producer has the ID <span className="font-mono">{artisanId}</span>.
          </p>
          <Button asChild className="mt-5">
            <Link href={QUEUE}>Back to the queue</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const artisan = load.artisan;
  const complete = CHECKS.every((c) => checks[c.key]);

  async function approve() {
    if (!complete) {
      setNotice({ tone: "bad", text: "Tick every Level 1 check before approving." });
      return;
    }
    setBusy(true);
    const ok = await approveArtisan(artisanId);
    setBusy(false);
    if (ok) {
      setNotice({ tone: "ok", text: `${artisan.name} is approved for Level 1. Returning to the queue…` });
      setTimeout(() => router.push(QUEUE), 1500);
    } else {
      setNotice({ tone: "bad", text: "The approval was not saved. Nothing has changed — please try again." });
    }
  }

  async function sendRequest() {
    setBusy(true);
    const ok = await requestMoreInfo(artisanId, reason);
    setBusy(false);
    setReasonOpen(false);
    if (ok) {
      setNotice({ tone: "ok", text: `Marked as action required: ${reason}. Returning to the queue…` });
      setTimeout(() => router.push(QUEUE), 1500);
    } else {
      setNotice({ tone: "bad", text: "The request was not saved. Nothing has changed — please try again." });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link href={QUEUE} aria-label="Back to the queue">
              <ArrowLeft aria-hidden />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{artisan.name}</h2>
            <p className="text-sm text-muted-foreground">
              ID <span className="font-mono">{artisan.id}</span> · Submitted {artisan.submitted_date}
            </p>
          </div>
        </div>
        <Badge className="self-start border-ink bg-saffron text-ink sm:self-auto">Pending Level 1 review</Badge>
      </div>

      <div aria-live="polite">
        {notice ? (
          <p
            className={cn(
              "flex items-start gap-2 rounded-xl border-2 p-3 text-base font-semibold",
              notice.tone === "ok" ? "border-teal bg-teal/10 text-teal" : "border-brick bg-brick/10 text-brick",
            )}
          >
            {notice.tone === "ok" ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden /> : <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />}
            {notice.text}
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="h-fit lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5 text-brick" aria-hidden />
              Profile
            </CardTitle>
            <CardDescription>As submitted at onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <Field label="Phone" value={artisan.phone} mono />
              <Field label="District" value={artisan.district} />
              <Field label="State" value={artisan.state} />
              <Field label="Trade" value={artisan.craft} />
              <Field label="Cluster" value={artisan.cluster} />
              <Field label="Welfare scheme" value={artisan.scheme && artisan.scheme !== "none" ? artisan.scheme.replace(/_/g, " ") : null} />
              <Field label="Producer ID (Pehchan / NRLM)" value={artisan.pehchan_id} mono />
              <Field
                label="Monthly income at intake"
                value={artisan.intake_monthly_income != null ? `₹${artisan.intake_monthly_income.toLocaleString("en-IN")}` : null}
              />
              <Field label="Products listed" value={artisan.product_count} />
            </dl>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="size-5 text-brick" aria-hidden />
              Identity document
            </CardTitle>
            <CardDescription>Compare photo, name and address with the profile</CardDescription>
            <CardAction className="flex gap-1">
              <Button variant="outline" size="icon" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}>
                <ZoomOut aria-hidden />
              </Button>
              <Button variant="outline" size="icon" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}>
                <ZoomIn aria-hidden />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label={fullscreen ? "Exit full screen" : "Full screen"}
                onClick={() => setFullscreen((f) => !f)}
              >
                {fullscreen ? <Minimize2 aria-hidden /> : <Maximize2 aria-hidden />}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="flex items-start gap-2 rounded-xl bg-accent p-3 text-sm text-accent-foreground">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              Having a document on file is not verification. Check it against the profile before ticking anything.
            </p>
            <div
              className={cn(
                "relative flex min-h-[340px] items-center justify-center overflow-auto rounded-xl border-2 border-ink/15 bg-secondary p-4",
                fullscreen && "fixed inset-4 z-50 border-ink bg-paper p-8 shadow-2xl",
              )}
            >
              {fullscreen ? (
                <Button variant="outline" className="absolute right-3 top-3 z-10" onClick={() => setFullscreen(false)}>
                  <Minimize2 aria-hidden />
                  Exit full screen
                </Button>
              ) : null}
              {artisan.verification_document_url ? (
                <div className="origin-center transition-transform" style={{ transform: `scale(${zoom})` }}>
                  {/* Remote, signed storage URL: next/image would need every bucket host whitelisted. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artisan.verification_document_url}
                    alt={`Identity document submitted by ${artisan.name}`}
                    className="max-h-[380px] w-auto rounded-lg border bg-white object-contain shadow-md"
                  />
                </div>
              ) : (
                <p className="text-center text-base text-muted-foreground">
                  <AlertCircle className="mx-auto mb-2 size-8 text-brick" aria-hidden />
                  No identity document has been uploaded for this producer.
                </p>
              )}
            </div>
            <p className="tabular text-sm text-muted-foreground">Zoom {Math.round(zoom * 100)}%</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-teal" aria-hidden />
              Verification
            </CardTitle>
            <CardDescription>Three levels. Level 1 is required today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <fieldset className="rounded-xl border-2 border-ink p-4">
              <legend className="px-1 text-sm font-bold uppercase tracking-wider">Level 1 · Identity</legend>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className={cn("size-4", artisan.verification_document_url ? "text-teal" : "text-brick")} aria-hidden />
                {artisan.verification_document_url ? "Document on file" : "No document on file"}
              </p>
              <div className="mt-2 space-y-1">
                {CHECKS.map((c) => (
                  <label key={c.key} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-1 text-base hover:bg-secondary">
                    <input
                      type="checkbox"
                      checked={checks[c.key]}
                      onChange={() => {
                        setChecks((prev) => ({ ...prev, [c.key]: !prev[c.key] }));
                        setNotice(null);
                      }}
                      className="size-5 accent-[var(--hs-indigo)]"
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="rounded-xl border-2 border-dashed border-ink/25 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Level 2 · Credential</p>
                <Badge variant="secondary">Coming next</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Status: {artisan.pehchan_status || "Not started"}</p>
            </div>

            <div className="rounded-xl border-2 border-dashed border-ink/25 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Level 3 · Workspace</p>
                <Badge variant="secondary">Optional</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                If credentials cannot establish authenticity, ask for photos or a video of the workspace to filter out resellers.
              </p>
              <Button
                variant="outline"
                className="mt-3 w-full"
                onClick={() => {
                  setReason(REASONS[3]);
                  setReasonOpen(true);
                }}
              >
                <Building2 aria-hidden />
                Ask for workspace evidence
              </Button>
            </div>

            <div className="space-y-2 border-t-2 border-ink/10 pt-4">
              <Button size="lg" className="w-full bg-teal hover:bg-teal/90" onClick={approve} disabled={busy}>
                <CheckCircle2 aria-hidden />
                Approve Level 1
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-brick text-brick hover:bg-brick/10"
                onClick={() => setReasonOpen(true)}
                disabled={busy}
              >
                <XCircle aria-hidden />
                Ask the producer for more
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Sheet open={reasonOpen} onOpenChange={setReasonOpen}>
        <SheetContent side="right" className="w-full border-l-2 border-ink bg-cream sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Ask for more information</SheetTitle>
            <SheetDescription>Choose what is missing. It is saved on the producer&apos;s record as action required.</SheetDescription>
          </SheetHeader>
          <fieldset className="space-y-2 px-4">
            <legend className="sr-only">Reason</legend>
            {REASONS.map((r) => (
              <label
                key={r}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 p-3 text-base",
                  reason === r ? "border-ink bg-accent" : "border-ink/15 hover:bg-secondary",
                )}
              >
                <input
                  type="radio"
                  name="reason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="size-5 accent-[var(--hs-indigo)]"
                />
                {r}
              </label>
            ))}
          </fieldset>
          <SheetFooter className="flex-row justify-end">
            <Button variant="outline" onClick={() => setReasonOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-brick hover:bg-brick/90" onClick={sendRequest} disabled={busy}>
              Send request
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
