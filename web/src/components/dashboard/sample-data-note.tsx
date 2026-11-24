import { Info } from "lucide-react";

/** Every console page says plainly that its figures are not real scheme records. */
export function SampleDataNote() {
  return (
    <p className="flex items-start gap-2 pt-1 text-sm text-muted-foreground">
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      Prototype interface. All figures shown are sample data and are not drawn from any live scheme record.
    </p>
  );
}
