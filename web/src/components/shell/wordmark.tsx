import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The HaatSetu mark: loom threads (the craft) under a saffron bridge (setu),
 * standing on a brick-red ground line (the haat). Same drawing as /public/logo.svg.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-9 shrink-0", className)}>
      <rect width="32" height="32" rx="8" fill="var(--hs-indigo)" />
      <path
        d="M10 9v15M14 9v15M18 9v15M22 9v15"
        stroke="var(--hs-cream)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".9"
      />
      <path
        d="M5 21.5C8.2 15.6 11.9 12.8 16 12.8s7.8 2.8 11 8.7"
        fill="none"
        stroke="var(--hs-saffron)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M5 24.5h22" stroke="var(--hs-brick)" strokeWidth="2.4" strokeLinecap="round" />
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
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={onDark ? "ring-2 ring-cream/20 rounded-lg" : undefined} />
      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            "font-heading text-xl font-bold leading-none tracking-tight",
            onDark ? "text-cream" : "text-indigo",
          )}
        >
          {BRAND.name}
        </span>
        {showTagline ? (
          <span
            lang="hi"
            className={cn(
              "mt-1 truncate font-deva text-xs leading-none",
              onDark ? "text-cream/75" : "text-muted-foreground",
            )}
          >
            {BRAND.taglineHi}
          </span>
        ) : null}
      </span>
    </span>
  );
}
