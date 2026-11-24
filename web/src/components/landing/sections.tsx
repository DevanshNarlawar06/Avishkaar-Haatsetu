import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CircleCheck,
  CloudUpload,
  Download,
  Hand,
  Images,
  IndianRupee,
  Languages,
  LoaderCircle,
  Mic,
  QrCode,
  Save,
  Send,
  ShieldCheck,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

import type { LandingCopy, Status } from "@/content/landing";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ shared */

function Section({
  id,
  tone,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone: "indigo" | "paper" | "peach" | "saffron";
  labelledBy: string;
  className?: string;
  children: React.ReactNode;
}) {
  const tones = {
    indigo: "bg-indigo text-cream",
    paper: "bg-paper text-ink",
    peach: "bg-peach text-ink",
    saffron: "bg-saffron text-ink",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-4", tones[tone], className)}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">{children}</div>
    </section>
  );
}

function Heading({
  id,
  eyebrow,
  title,
  eyebrowClass = "text-brick",
}: {
  id: string;
  eyebrow: string;
  title: string;
  eyebrowClass?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className={cn("hs-eyebrow", eyebrowClass)}>{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-bold leading-tight text-balance sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

const statusStyle: Record<Status, string> = {
  built: "bg-teal text-white",
  partial: "bg-saffron text-ink",
  designed: "bg-peach text-ink",
};

function StatusPill({ status, label }: { status: Status; label: string }) {
  return <span className={cn("hs-pill self-start px-3 py-1 text-xs uppercase tracking-wide", statusStyle[status])}>{label}</span>;
}

const primaryBtn =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-ink bg-saffron px-5 py-3 text-base font-bold text-ink shadow-[4px_4px_0_0_var(--hs-ink)] transition-transform hover:-translate-y-0.5";
const secondaryBtn =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-cream/60 px-5 py-3 text-base font-bold text-cream transition-colors hover:bg-cream/10";

/* -------------------------------------------------------------------- hero */

export function Hero({ t }: { t: LandingCopy }) {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-indigo text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-12">
        <div>
          <h1 id="hero-title" className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">{t.hero.lines[0]}</span>
            <span className="block">{t.hero.lines[1]}</span>
            <span className="block text-saffron">{t.hero.lines[2]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">{t.hero.body}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={BRAND.apk} className={primaryBtn}>
              <Download className="size-5" aria-hidden />
              {t.hero.primary}
            </a>
            <Link href="/console" className={secondaryBtn}>
              {t.hero.secondary}
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Principles">
            {t.hero.tags.map((tag, i) => (
              <li
                key={tag}
                className={cn("hs-pill", i === 0 ? "bg-brick text-white" : i === 1 ? "bg-saffron text-ink" : "bg-cream text-ink")}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div aria-hidden className="absolute -right-10 -top-10 size-[115%] rounded-full bg-brick" />
          <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border-4 border-cream shadow-[8px_8px_0_0_var(--hs-saffron)]">
            <Image
              src="/img/haat-illustration.webp"
              alt={t.hero.imageAlt}
              width={800}
              height={1114}
              priority
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="border-y-2 border-ink bg-saffron py-3 text-ink">
        <p className="mx-auto max-w-6xl px-4 text-center font-heading text-sm font-bold uppercase tracking-[0.14em] sm:text-base">
          {t.ticker.map((item, i) => (
            <span key={item}>
              {i > 0 && <span aria-hidden className="px-2">·</span>}
              <span lang={/[ऀ-ॿ]/.test(item) ? "hi" : undefined}>{item}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- problem */

export function Problem({ t }: { t: LandingCopy }) {
  return (
    <Section tone="paper" labelledBy="problem-title">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Heading id="problem-title" eyebrow={t.problem.eyebrow} title={t.problem.title} />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.problem.body}</p>
          <p className="mt-4 text-sm text-muted-foreground">{t.problem.source}</p>
        </div>
        <dl className="grid gap-4">
          {t.problem.stats.map((s, i) => (
            <div key={s.label} className={cn("hs-card flex items-baseline gap-4 p-5", i === 1 && "bg-saffron")}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="tabular shrink-0 whitespace-nowrap font-heading text-3xl font-extrabold text-indigo sm:text-4xl">{s.value}</dd>
              <dd className="min-w-0 text-base font-medium leading-snug">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------- idea */

export function Idea({ t }: { t: LandingCopy }) {
  const tagTone = ["bg-brick text-white", "bg-ink text-cream", "bg-indigo text-cream"];
  return (
    <Section id="how" tone="indigo" labelledBy="idea-title">
      <Heading id="idea-title" eyebrow={t.idea.eyebrow} title={t.idea.title} eyebrowClass="text-saffron" />

      <ol className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-10">
        {t.idea.cards.map((c, i) => (
          <li key={c.tag} className="relative">
            <div className={cn("hs-card hs-card-saffron flex h-full flex-col p-6", i === 1 && "bg-saffron")}>
              <span className={cn("hs-pill self-start uppercase tracking-wide", tagTone[i])}>{c.tag}</span>
              <h3 className="mt-4 text-2xl font-bold leading-snug">{c.title}</h3>
              <p className="mt-3 text-base leading-relaxed">{c.body}</p>
              {c.foot ? (
                <p className="mt-auto border-t-2 border-ink pt-4 text-base font-semibold leading-snug">{c.foot}</p>
              ) : null}
            </div>
            {i < 2 ? (
              <>
                <ArrowRight aria-hidden className="absolute -right-8 top-1/2 hidden size-6 -translate-y-1/2 text-saffron lg:block" />
                <ArrowDown aria-hidden className="mx-auto mt-4 size-6 text-saffron lg:hidden" />
              </>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <span className="hs-eyebrow text-saffron">{t.idea.alsoTo}</span>
        {t.idea.channels.map((c) => (
          <span key={c} className="hs-pill bg-cream text-ink">
            {c}
          </span>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- cycle */

const cycleIcons: LucideIcon[] = [Mic, Languages, Images, IndianRupee, Send, QrCode];

export function Cycle({ t }: { t: LandingCopy }) {
  return (
    <Section tone="paper" labelledBy="cycle-title">
      <Heading id="cycle-title" eyebrow={t.cycle.eyebrow} title={t.cycle.title} />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.cycle.steps.map((s, i) => {
          const Icon = cycleIcons[i];
          return (
            <li key={s.title} className="hs-card flex gap-4 p-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-saffron">
                <Icon className="size-7" aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-bold">
                  <span className="tabular text-brick">{i + 1}</span> · {s.title}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/* ----------------------------------------------------------------- offline */

const stateIcons: LucideIcon[] = [Save, WifiOff, CloudUpload, LoaderCircle, Hand, CircleCheck];

export function Offline({ t }: { t: LandingCopy }) {
  return (
    <Section id="offline" tone="peach" labelledBy="offline-title">
      <Heading id="offline-title" eyebrow={t.offline.eyebrow} title={t.offline.title} />

      <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {t.offline.states.map((s, i) => {
          const Icon = stateIcons[i];
          const tone = i === 4 ? "bg-saffron" : i === 5 ? "bg-teal text-white" : "bg-lavender";
          return (
            <li key={s} className={cn("rounded-2xl border-2 border-ink p-4 shadow-[3px_3px_0_0_var(--hs-ink)]", tone)}>
              <Icon className="size-6" aria-hidden />
              <p className="mt-3 text-xs font-bold uppercase tracking-wider opacity-80">
                {i + 1}
              </p>
              <p className="font-heading text-lg font-bold leading-tight">{s}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {t.offline.cards.map((c) => (
          <div key={c.title} className="hs-card p-6">
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ agents */

export function Agents({ t }: { t: LandingCopy }) {
  return (
    <Section id="agents" tone="paper" labelledBy="agents-title">
      <Heading id="agents-title" eyebrow={t.agents.eyebrow} title={t.agents.title} />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {t.agents.list.map((a) => (
            <li key={a.name} className="hs-card flex flex-col gap-3 p-5">
              <h3 className="text-lg font-bold">{a.name}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{a.body}</p>
              <StatusPill status={a.status} label={t.status[a.status]} />
            </li>
          ))}
        </ul>
        <div className="hs-card hs-card-saffron bg-indigo p-6 text-cream lg:p-8">
          <p className="hs-eyebrow flex items-center gap-2 text-saffron">
            <ShieldCheck className="size-5" aria-hidden />
            {t.agents.guardrailsTitle}
          </p>
          <ol className="mt-5 space-y-4 text-lg font-semibold leading-snug">
            {t.agents.guardrails.map((g, i) => (
              <li key={g} className="flex gap-3">
                <span className="tabular text-saffron">{i + 1}.</span>
                <span>{g}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="mt-8 max-w-3xl text-lg font-semibold leading-relaxed">{t.agents.foot}</p>
    </Section>
  );
}

/* ------------------------------------------------------------------ market */

export function Market({ t }: { t: LandingCopy }) {
  return (
    <Section id="market" tone="saffron" labelledBy="market-title">
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
          <div className="overflow-hidden rounded-t-[999px] rounded-b-3xl border-4 border-ink bg-cream shadow-[8px_8px_0_0_var(--hs-ink)]">
            <Image
              src="/img/bag-model.webp"
              alt={t.market.imageAlt}
              width={1086}
              height={1448}
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="aspect-[3/4] h-auto w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 size-28 overflow-hidden rounded-full border-4 border-ink bg-cream sm:size-32">
            <Image src="/img/bag-studio.webp" alt="" width={256} height={256} className="size-full object-cover" />
          </div>
        </div>
        <div>
          <Heading id="market-title" eyebrow={t.market.eyebrow} title={t.market.title} eyebrowClass="text-ink" />
          <ul className="mt-8 space-y-4">
            {t.market.rows.map((r) => (
              <li key={r.title} className="hs-card p-5">
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- roadmap */

export function Roadmap({ t }: { t: LandingCopy }) {
  return (
    <Section tone="indigo" labelledBy="roadmap-title">
      <Heading id="roadmap-title" eyebrow={t.roadmap.eyebrow} title={t.roadmap.title} eyebrowClass="text-saffron" />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.roadmap.phases.map((p, i) => (
          <li key={p.title} className={cn("hs-card hs-card-saffron p-6", i === 0 && "bg-saffron")}>
            <p className={cn("hs-eyebrow", i === 0 ? "text-ink" : "text-brick")}>{p.when}</p>
            <h3 className="mt-2 text-2xl font-bold">{p.title}</h3>
            <p className="mt-2 text-base leading-relaxed">{p.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* --------------------------------------------------------------- cta+foot */

export function ClosingCta({ t }: { t: LandingCopy }) {
  return (
    <Section tone="paper" labelledBy="cta-title">
      <div className="hs-card flex flex-col items-start gap-6 bg-indigo p-8 text-cream sm:p-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-3xl font-extrabold sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mt-3 text-lg text-cream/90">{t.cta.body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a href={BRAND.apk} className={primaryBtn}>
            <Download className="size-5" aria-hidden />
            {t.cta.primary}
          </a>
          <a href={BRAND.repo} className={secondaryBtn}>
            {t.cta.secondary}
          </a>
        </div>
      </div>
    </Section>
  );
}

export function Footer({ t }: { t: LandingCopy }) {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-semibold text-ink">{BRAND.name}</span> · {t.footer.note}
        </p>
        <a href={BRAND.repo} className="font-semibold text-indigo underline underline-offset-4">
          {t.footer.code}
        </a>
      </div>
    </footer>
  );
}
