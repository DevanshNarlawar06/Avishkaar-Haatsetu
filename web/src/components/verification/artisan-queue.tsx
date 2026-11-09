"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchPendingVerifications, PendingArtisan } from "@/lib/api";
import { CheckCircle2, Clock, ShieldAlert, ArrowRight, RefreshCw, FileText } from "lucide-react";

export function ArtisanQueue() {
  const [artisans, setArtisans] = useState<PendingArtisan[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQueue = async () => {
    setLoading(true);
    const data = await fetchPendingVerifications();
    setArtisans(data.filter((a) => !a.is_verified));
    setLoading(false);
  };

  useEffect(() => {
    loadQueue();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review Queue</CardTitle>
            <Clock className="size-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular">{artisans.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Aadhaar documents awaiting manual verification</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Stage</CardTitle>
            <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">
              Level 1 Active
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Manual Identity Cross-Check</div>
            <p className="text-xs text-muted-foreground mt-1">Level 2 & 3 available as upcoming stages</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Protocol</CardTitle>
            <ShieldAlert className="size-4 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-xs font-mono text-muted-foreground leading-relaxed">
              Retrieve Document &rarr; Cross-Check Details &rarr; Manual Officer Approval
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-semibold">Artisan Onboarding Queue</CardTitle>
            <CardDescription className="text-xs mt-1">
              Select an artisan to open the secure Level 1 verification workspace.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadQueue} disabled={loading} className="gap-2">
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Queue
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
              Loading pending verification queue...
            </div>
          ) : artisans.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <CheckCircle2 className="size-10 text-[var(--brand-success)] mb-3" />
              <h3 className="font-semibold text-base">Queue Fully Cleared</h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                All submitted artisan identity documents have been manually reviewed and approved.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/40">
                  <TableHead>Artisan Details</TableHead>
                  <TableHead>Location & State</TableHead>
                  <TableHead>Craft Category</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Credentials</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {artisans.map((artisan) => (
                  <TableRow key={artisan.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      <div className="font-semibold text-foreground">{artisan.name}</div>
                      <div className="text-xs font-mono text-muted-foreground">ID: {artisan.id}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{artisan.district || "District"}</div>
                      <div className="text-xs text-muted-foreground">{artisan.state}</div>
                    </TableCell>
                    <TableCell className="text-sm">{artisan.craft || "Handicrafts"}</TableCell>
                    <TableCell className="text-sm tabular text-muted-foreground">
                      {artisan.submitted_date}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FileText className="size-3.5 text-amber-600" />
                        <span>Pehchan ID: {artisan.pehchan_id || "Available"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-amber-400 bg-amber-50 text-amber-800 font-normal">
                        <Clock className="size-3 mr-1" />
                        {artisan.verification_status || "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 gap-1.5">
                        <Link href={`/artisan-verification/${artisan.id}`}>
                          Review
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
