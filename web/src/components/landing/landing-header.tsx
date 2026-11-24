import Link from "next/link";
import { Menu } from "lucide-react";

import { Wordmark } from "@/components/shell/wordmark";
import { LOCALES, type LandingCopy, type Locale } from "@/content/landing";
import { cn } from "@/lib/utils";

/**
 * Landing header. No client JS: the phone menu is a native <details>, which
 * works with a keyboard, a screen reader and a slow connection.
 */
export function LandingHeader({ t, locale }: { t: LandingCopy; locale: Locale }) {
  const links = [
    { href: "#how", label: t.nav.how },
    { href: "#agents", label: t.nav.agents },
    { href: "#offline", label: t.nav.offline },
    { href: "#market", label: t.nav.market },
  ];

  const langSwitch = (
    <div role="group" aria-label="Language" className="flex rounded-full border-2 border-cream/30 p-0.5">
      {LOCALES.map((l) => (
        <Link
          key={l.code}
          href={l.code === "en" ? "/" : `/?lang=${l.code}`}
          lang={l.code}
          aria-current={l.code === locale ? "true" : undefined}
          className={cn(
            "min-h-10 rounded-full px-3.5 py-2 text-sm font-semibold leading-6",
            l.code === locale ? "bg-saffron text-ink" : "text-cream/85 hover:text-cream",
          )}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="bg-indigo text-cream">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6">
        <Link href={locale === "en" ? "/" : `/?lang=${locale}`} aria-label="HaatSetu home" className="rounded-lg">
          <Wordmark onDark />
        </Link>

        <nav aria-label="Sections" className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-cream/85 hover:bg-cream/10 hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 sm:flex lg:ml-0">
          {langSwitch}
          <Link
            href="/console"
            className="rounded-xl border-2 border-ink bg-saffron px-4 py-2.5 text-[15px] font-bold text-ink shadow-[3px_3px_0_0_var(--hs-ink)] transition-transform hover:-translate-y-0.5"
          >
            {t.nav.console}
          </Link>
        </div>

        <details className="group relative ml-auto sm:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border-2 border-cream/30 [&::-webkit-details-marker]:hidden">
            <Menu className="size-5" aria-hidden />
            <span className="sr-only">{t.nav.menu}</span>
          </summary>
          <div className="absolute right-0 top-14 z-30 w-64 space-y-1 rounded-2xl border-2 border-ink bg-cream p-3 text-ink shadow-[4px_4px_0_0_var(--hs-saffron)]">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="block rounded-lg px-3 py-3 font-medium hover:bg-secondary">
                {l.label}
              </a>
            ))}
            <Link href="/console" className="block rounded-lg bg-indigo px-3 py-3 font-bold text-cream">
              {t.nav.console}
            </Link>
            <div className="flex gap-2 pt-2">
              {LOCALES.map((l) => (
                <Link
                  key={l.code}
                  href={l.code === "en" ? "/" : `/?lang=${l.code}`}
                  lang={l.code}
                  aria-current={l.code === locale ? "true" : undefined}
                  className={cn(
                    "flex-1 rounded-lg border-2 border-ink px-3 py-2.5 text-center font-semibold",
                    l.code === locale ? "bg-saffron" : "bg-cream",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
