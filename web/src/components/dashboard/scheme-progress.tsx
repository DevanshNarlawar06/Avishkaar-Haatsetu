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
        <CardTitle>
          Beneficiaries by scheme
        </CardTitle>
        <CardDescription>
          Onboarded producers against the target for each category
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {schemes.map((scheme) => {
          const pct = Math.round((scheme.beneficiaries / scheme.target) * 100);
          return (
            <div key={scheme.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold">{scheme.name}</span>
                <span className="tabular text-sm text-muted-foreground">
                  {scheme.beneficiaries.toLocaleString("en-IN")} of{" "}
                  {scheme.target.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={pct} aria-label={`${scheme.name}: ${pct}% of target`} />
                <span className="tabular w-11 shrink-0 text-right text-sm font-bold">
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
