import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The HaatSetu mark: a bridge arch (setu) over a market stall awning (haat).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={cn("size-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" fill="var(--brand-marigold)" />
      {/* awning */}
      <path
        d="M7 13.5 9.5 9h13l2.5 4.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5c0 1.4-1.1 2.5-2.5 2.5S7 14.9 7 13.5Z"
        fill="#133429"
      />
      {/* bridge */}
      <path
        d="M6 25c2.6-4.2 6.1-6.3 10-6.3s7.4 2.1 10 6.3"
        fill="none"
        stroke="#FFF7E8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M11 21.2v3.8M16 18.8v6.2M21 21.2v3.8"
        stroke="#FFF7E8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  showTagline = false,
  onDark = false,
}: {
  className?: string;
  showTagline?: boolean;
  onDark?: boolean;
}) {
  const [first, second] = BRAND.nameParts;
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <div className="flex min-w-0 flex-col">
        <span
          className={cn(
            "text-[19px] font-extrabold leading-none tracking-tight",
            onDark ? "text-white" : "text-[var(--brand-leaf)]",
          )}
        >
          {first}
          <span className="text-[var(--brand-marigold)]">{second}</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1 truncate font-[family-name:var(--font-mukta)] text-[11px] leading-none",
              onDark ? "text-sidebar-foreground/65" : "text-muted-foreground",
            )}
          >
            {BRAND.taglineHi}
          </span>
        ) : null}
      </div>
    </div>
  );
}
