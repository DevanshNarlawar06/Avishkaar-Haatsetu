import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { schemes } from "@/lib/data";

/** Beneficiaries reached against the target set for each scheme. */
export function SchemeProgress() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Beneficiaries by scheme
        </CardTitle>
        <CardDescription className="text-xs">
          Onboarded artisans against the target for each category
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {schemes.map((scheme) => {
          const pct = Math.round((scheme.beneficiaries / scheme.target) * 100);
          return (
            <div key={scheme.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium">{scheme.name}</span>
                <span className="tabular text-xs text-muted-foreground">
                  {scheme.beneficiaries.toLocaleString("en-IN")} of{" "}
                  {scheme.target.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={pct} className="h-1.5" />
                <span className="tabular w-9 shrink-0 text-right text-xs font-medium">
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
