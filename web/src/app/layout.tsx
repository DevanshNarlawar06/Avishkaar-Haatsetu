import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Lexend, Mukta, Noto_Sans } from "next/font/google";
import "./globals.css";

import { BRAND } from "@/lib/brand";

/* Lexend for headings: it was designed to improve reading fluency, which
   matters for first-time and low-literacy readers. Noto Sans for body text,
   because the Noto family covers every Indian script we will add next.
   Mukta carries Devanagari at a matching weight. */
const display = Lexend({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const deva = Mukta({
  variable: "--font-deva",
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} · ${BRAND.headline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.description,
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1E2A78",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${deva.variable} ${code.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
