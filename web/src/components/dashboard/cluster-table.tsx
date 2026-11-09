import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clusters, crore } from "@/lib/data";

export function ClusterTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Cluster performance
        </CardTitle>
        <CardDescription className="text-xs">
          Ranked by value of goods sold this financial year
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Cluster</TableHead>
                <TableHead>Craft</TableHead>
                <TableHead className="text-right">Artisans</TableHead>
                <TableHead className="text-right">Listings</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Value sold</TableHead>
                <TableHead className="pr-6 text-right">Income lift</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clusters.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="pl-6">
                    <div className="font-medium">{c.cluster}</div>
                    <div className="text-xs text-muted-foreground">
                      {c.state}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.craft}
                  </TableCell>
                  <TableCell className="tabular text-right">
                    {c.artisans.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="tabular text-right">
                    {c.listings.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="tabular text-right">
                    {c.orders.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="tabular text-right font-medium">
                    {crore(c.gmv)}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Badge
                      variant="outline"
                      className="tabular gap-0.5 border-[var(--brand-success)]/35 font-medium text-[var(--brand-success)]"
                    >
                      <ArrowUpRight className="size-3" />
                      {c.lift}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
