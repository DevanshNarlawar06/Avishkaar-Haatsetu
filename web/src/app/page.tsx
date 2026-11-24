import { LandingHeader } from "@/components/landing/landing-header";
import {
  Agents,
  ClosingCta,
  Cycle,
  Footer,
  Hero,
  Idea,
  Market,
  Offline,
  Problem,
  Roadmap,
} from "@/components/landing/sections";
import { COPY, resolveLocale } from "@/content/landing";

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const locale = resolveLocale((await searchParams).lang);
  const t = COPY[locale];

  return (
    // Font stacks fall back glyph-by-glyph to Mukta for Devanagari, so headings
    // keep Lexend for Latin text inside Hindi copy.
    <div lang={locale}>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <LandingHeader t={t} locale={locale} />
      <main id="main">
        <Hero t={t} />
        <Problem t={t} />
        <Idea t={t} />
        <Cycle t={t} />
        <Offline t={t} />
        <Agents t={t} />
        <Market t={t} />
        <Roadmap t={t} />
        <ClosingCta t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
