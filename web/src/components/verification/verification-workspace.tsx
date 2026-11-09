"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ShieldCheck,
  FileCheck,
  Building2,
  Camera,
  Video,
  FileText,
  User,
  MapPin,
  Sparkles,
  XCircle,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { approveArtisan, fetchArtisanDetail, requestMoreInfo, ArtisanDetail } from "@/lib/api";

interface VerificationWorkspaceProps {
  artisanId: string;
}

export function VerificationWorkspace({ artisanId }: VerificationWorkspaceProps) {
  const router = useRouter();
  const [artisan, setArtisan] = useState<ArtisanDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Zoom & Fullscreen controls
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Checklist state for Level 1
  const [checklist, setChecklist] = useState({
    docRetrieved: true, // Document retrieved from DB
    nameMatches: false,
    dobMatches: false,
    detailsMatch: false,
    manualReviewCompleted: false,
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("Identity details don't match");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchArtisanDetail(artisanId);
      setArtisan(data);
      setLoading(false);
    }
    loadData();
  }, [artisanId]);

  const toggleCheck = (key: keyof typeof checklist) => {
    if (key === "docRetrieved") return; // Always true if document is retrieved
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
    setValidationError(null);
  };

  const isLevel1Complete =
    checklist.nameMatches &&
    checklist.dobMatches &&
    checklist.detailsMatch &&
    checklist.manualReviewCompleted;

  const handleApprove = async () => {
    if (!isLevel1Complete) {
      setValidationError(
        "Level 1 Identity Checklist incomplete. Ticking all verification items is required before manual approval."
      );
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    const success = await approveArtisan(artisanId);
    if (success) {
      setSuccessMessage("Artisan Level 1 Identity Verification Approved successfully!");
      setTimeout(() => {
        router.push("/artisan-verification");
      }, 1500);
    } else {
      setValidationError("Failed to update verification status in database. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleRequestMoreInfo = async () => {
    setIsSubmitting(true);
    await requestMoreInfo(artisanId, rejectReason);
    setSuccessMessage(`Status updated to 'Action Required': ${rejectReason}`);
    setShowRejectModal(false);
    setTimeout(() => {
      router.push("/artisan-verification");
    }, 1500);
    setIsSubmitting(false);
  };

  if (loading || !artisan) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading artisan verification workspace...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/artisan-verification">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[var(--primary)]">{artisan.name}</h1>
              <Badge variant="outline" className="border-amber-400 bg-amber-50 text-amber-800">
                Pending Level 1 Review
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Artisan ID: <span className="font-mono">{artisan.id}</span> &bull; Submitted: {artisan.submitted_date}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-slate-100 text-slate-700 border hover:bg-slate-100">
            Manual Admin Review Required
          </Badge>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-300 p-3 text-emerald-800 text-sm font-medium">
          <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {validationError && (
        <div className="flex items-center gap-2 rounded-md bg-rose-50 border border-rose-300 p-3 text-rose-800 text-sm font-medium">
          <AlertCircle className="size-5 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* 3-Column Workspace Grid */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* LEFT COLUMN: Artisan Profile (3 Cols) */}
        <Card className="lg:col-span-3 h-fit">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <User className="size-4 text-[var(--primary)]" />
              Artisan Profile
            </CardTitle>
            <CardDescription className="text-xs">Submitted onboard data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 text-xs">
            <div>
              <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Full Name</span>
              <span className="font-semibold text-sm text-foreground">{artisan.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Phone</span>
                <span className="font-mono">{artisan.phone || "Not provided"}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">State</span>
                <span className="font-medium">{artisan.state}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">District</span>
                <span>{artisan.district || "N/A"}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Craft</span>
                <span className="font-medium text-[var(--ring)]">{artisan.craft}</span>
              </div>
            </div>

            {artisan.cluster && (
              <div>
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Craft Cluster</span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3 text-muted-foreground" />
                  {artisan.cluster}
                </span>
              </div>
            )}

            <Separator />

            <div>
              <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Welfare Scheme</span>
              <Badge variant="secondary" className="mt-1 font-normal capitalize">
                {artisan.scheme ? artisan.scheme.replace("_", " ") : "None"}
              </Badge>
            </div>

            <div>
              <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Govt Credential ID</span>
              <span className="font-mono font-medium text-foreground">{artisan.pehchan_id || "PHN-BR-284731"}</span>
            </div>

            <div>
              <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Baseline Monthly Income</span>
              <span className="tabular font-mono text-foreground font-medium">
                {artisan.intake_monthly_income ? `₹${artisan.intake_monthly_income.toLocaleString("en-IN")}` : "₹4,500"}
              </span>
            </div>

            <div>
              <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Catalogued Products</span>
              <span className="tabular font-mono font-medium">{artisan.product_count} items</span>
            </div>
          </CardContent>
        </Card>

        {/* CENTER COLUMN: Aadhaar Document Viewer (5 Cols) */}
        <Card className="lg:col-span-5 flex flex-col h-full">
          <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileCheck className="size-4 text-[var(--ring)]" />
                Aadhaar Document Viewer
              </CardTitle>
              <CardDescription className="text-xs">Secure internal document inspection</CardDescription>
            </div>

            {/* Document status notice */}
            <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-800 text-[11px]">
              Document Retrieved
            </Badge>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-3 space-y-3">
            {/* Disclaimer per requirement */}
            <div className="bg-amber-50/80 border border-amber-200 rounded p-2.5 text-[11px] text-amber-900 leading-snug flex items-start gap-2">
              <HelpCircle className="size-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Manual Identity Cross-Check Protocol:</strong> Document retrieval does not constitute verification.
                Compare photo, name, and address on the document against the profile.
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between bg-muted/40 p-2 rounded border text-xs">
              <span className="text-muted-foreground font-mono">Zoom: {Math.round(zoomLevel * 100)}%</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                >
                  <ZoomOut className="size-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                >
                  <ZoomIn className="size-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize2 className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Image Viewer Container */}
            <div
              className={`relative overflow-auto border rounded bg-slate-950/5 flex items-center justify-center p-4 min-h-[340px] ${
                isFullscreen ? "fixed inset-4 z-50 bg-background shadow-2xl p-8" : ""
              }`}
            >
              {isFullscreen && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-3 right-3 z-10"
                  onClick={() => setIsFullscreen(false)}
                >
                  Exit Fullscreen
                </Button>
              )}
              {artisan.verification_document_url ? (
                <div
                  className="transition-transform duration-150 ease-out origin-center flex items-center justify-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Image tag per requirement */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artisan.verification_document_url}
                    alt="Aadhaar Verification Document"
                    className="max-h-[380px] w-auto object-contain shadow-md border rounded bg-white"
                  />
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground text-xs">
                  <AlertCircle className="size-8 text-amber-500 mx-auto mb-2" />
                  No Aadhaar document uploaded in database record.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: Verification Checklist (4 Cols) */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ShieldCheck className="size-4 text-[var(--brand-success)]" />
                Verification Pipeline
              </CardTitle>
              <CardDescription className="text-xs">3-Stage Verification Protocol</CardDescription>
            </CardHeader>

            <CardContent className="pt-4 space-y-5 text-xs">
              {/* STAGE 1: IDENTITY VERIFICATION (Functional) */}
              <div className="space-y-2 border rounded-md p-3 bg-card border-amber-300">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Badge className="bg-[var(--primary)] text-white h-5 px-1.5 text-[10px]">L1</Badge>
                    Identity Verification
                  </span>
                  <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50 text-[10px]">
                    Active Stage
                  </Badge>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer text-muted-foreground font-medium">
                    <input
                      type="checkbox"
                      checked={checklist.docRetrieved}
                      disabled
                      className="rounded border-slate-300 accent-[var(--primary)] size-4"
                    />
                    <span className="text-foreground">✓ Aadhaar document available</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-foreground hover:text-black">
                    <input
                      type="checkbox"
                      checked={checklist.nameMatches}
                      onChange={() => toggleCheck("nameMatches")}
                      className="rounded border-slate-300 accent-[var(--primary)] size-4"
                    />
                    <span>Name matches submitted profile</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-foreground hover:text-black">
                    <input
                      type="checkbox"
                      checked={checklist.dobMatches}
                      onChange={() => toggleCheck("dobMatches")}
                      className="rounded border-slate-300 accent-[var(--primary)] size-4"
                    />
                    <span>Date of birth / state details match</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-foreground hover:text-black">
                    <input
                      type="checkbox"
                      checked={checklist.detailsMatch}
                      onChange={() => toggleCheck("detailsMatch")}
                      className="rounded border-slate-300 accent-[var(--primary)] size-4"
                    />
                    <span>No document tampering or discrepancy</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-foreground font-medium pt-1">
                    <input
                      type="checkbox"
                      checked={checklist.manualReviewCompleted}
                      onChange={() => toggleCheck("manualReviewCompleted")}
                      className="rounded border-slate-300 accent-[var(--primary)] size-4"
                    />
                    <span className="text-[var(--primary)] font-semibold">Admin manual review complete</span>
                  </label>
                </div>
              </div>

              {/* STAGE 2: CREDENTIAL VERIFICATION (Prototype UI) */}
              <div className="space-y-2 border rounded-md p-3 bg-slate-50/70 border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Badge variant="outline" className="h-5 px-1.5 text-[10px]">L2</Badge>
                    Artisan Credential
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    Upcoming
                  </Badge>
                </div>
                <div className="text-xs space-y-1 pt-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pehchan ID:</span>
                    <span className="font-mono font-medium">{artisan.pehchan_id || "PHN-BR-284731"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-amber-700 font-medium">{artisan.pehchan_status}</span>
                  </div>
                </div>
              </div>

              {/* STAGE 3: WORKSPACE VERIFICATION (Prototype UI) */}
              <div className="space-y-2 border rounded-md p-3 bg-slate-50/70 border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Badge variant="outline" className="h-5 px-1.5 text-[10px]">L3</Badge>
                    Workspace / Craft
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    Optional
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  If institutional credentials cannot establish authenticity, request workspace evidence to filter mass resellers.
                </p>
                <div className="pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-7 gap-1.5 text-slate-700"
                    onClick={() => {
                      setRejectReason("Workspace evidence required (photos/video)");
                      setShowRejectModal(true);
                    }}
                  >
                    <Building2 className="size-3" />
                    Request Workspace Evidence
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>

          {/* BOTTOM ACTIONS BAR */}
          <div className="p-4 border-t space-y-2 bg-muted/20">
            <Button
              className="w-full bg-[var(--brand-success)] text-white hover:bg-[var(--brand-success)]/90 gap-2 font-medium"
              onClick={handleApprove}
              disabled={isSubmitting}
            >
              <CheckCircle2 className="size-4" />
              Approve Artisan (Level 1)
            </Button>

            <Button
              variant="outline"
              className="w-full text-rose-700 border-rose-200 hover:bg-rose-50 gap-2"
              onClick={() => setShowRejectModal(true)}
              disabled={isSubmitting}
            >
              <XCircle className="size-4" />
              Request More Information / Action Required
            </Button>
          </div>
        </Card>
      </div>

      {/* Modal for Request More Information */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-background border rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-base text-foreground">Action Required / Request Information</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowRejectModal(false)}>
                &times;
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Select the reason for marking this artisan&apos;s verification as requiring further action:
            </p>

            <div className="space-y-2 text-xs">
              {[
                "Identity details don't match submitted profile",
                "Aadhaar document image unclear or unreadable",
                "Additional artisan proof required",
                "Workspace evidence required (photos/video)",
                "Other discrepancy in application",
              ].map((reason) => (
                <label key={reason} className="flex items-center gap-2 p-2 border rounded hover:bg-muted/40 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    checked={rejectReason === reason}
                    onChange={() => setRejectReason(reason)}
                    className="accent-[var(--primary)]"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRequestMoreInfo}
                disabled={isSubmitting}
              >
                Submit Action Required
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
