"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, CloudOff, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchPendingVerifications, type PendingArtisan } from "@/lib/api";

type QueueState = { status: "loading" } | { status: "error" } | { status: "ready"; items: PendingArtisan[] };

const protocol = ["Retrieve document", "Cross-check details", "Officer approves"];

export function ArtisanQueue() {
  const [state, setState] = useState<QueueState>({ status: "loading" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    const data = await fetchPendingVerifications();
    setState(data ? { status: "ready", items: data.filter((a) => !a.is_verified) } : { status: "error" });
  }, []);

  useEffect(() => {
    // Initial fetch on mount; the queue is client-side so the Refresh button can reuse it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const count = state.status === "ready" ? state.items.length : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">Waiting for review</p>
              <Clock className="size-5 text-brick" aria-hidden />
            </div>
            <p className="tabular font-heading text-3xl font-bold">{count ?? "—"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-muted-foreground">Active stage</p>
            <p className="font-heading text-xl font-bold">Level 1 · Identity</p>
            <p className="text-sm text-muted-foreground">Levels 2 and 3 come next</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-muted-foreground">Protocol</p>
            <ol className="mt-1 space-y-1 text-sm font-medium">
              {protocol.map((p, i) => (
                <li key={p}>
                  <span className="tabular text-brick">{i + 1}.</span> {p}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Onboarding queue</CardTitle>
          <CardDescription>Open a producer to check their documents and approve them.</CardDescription>
          <CardAction>
            <Button variant="outline" onClick={load} disabled={state.status === "loading"}>
              <RefreshCw className={state.status === "loading" ? "animate-spin" : undefined} aria-hidden />
              Refresh
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="px-0" aria-live="polite">
          {state.status === "loading" ? (
            <p className="px-5 py-16 text-center text-base text-muted-foreground">Loading the queue…</p>
          ) : state.status === "error" ? (
            <div className="flex flex-col items-center px-5 py-12 text-center">
              <CloudOff className="size-10 text-brick" aria-hidden />
              <h3 className="mt-3 text-lg font-bold">Could not reach the HaatSetu API</h3>
              <p className="mt-1 max-w-md text-base text-muted-foreground">
                The queue is unavailable right now. Nothing has been changed. Try again in a moment.
              </p>
              <Button className="mt-4" onClick={load}>
                Try again
              </Button>
            </div>
          ) : state.items.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-12 text-center">
              <CheckCircle2 className="size-10 text-teal" aria-hidden />
              <h3 className="mt-3 text-lg font-bold">Queue is clear</h3>
              <p className="mt-1 max-w-md text-base text-muted-foreground">
                Every submitted producer has been reviewed.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5">Producer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Trade</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-5 text-right">
                    <span className="sr-only">Action</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.items.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="pl-5">
                      <div className="text-base font-semibold">{a.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{a.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>{a.district ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{a.state}</div>
                    </TableCell>
                    <TableCell>{a.craft ?? "—"}</TableCell>
                    <TableCell className="tabular text-muted-foreground">{a.submitted_date}</TableCell>
                    <TableCell>
                      <Badge className="border-ink bg-saffron text-ink">
                        <Clock aria-hidden />
                        {a.verification_status || "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <Button asChild size="sm">
                        <Link href={`/console/verification/${encodeURIComponent(a.id)}`}>
                          Review <span className="sr-only">{a.name}</span>
                          <ArrowRight aria-hidden />
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
