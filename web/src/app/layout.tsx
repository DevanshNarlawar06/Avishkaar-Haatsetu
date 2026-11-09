import type { Metadata } from "next";
import { JetBrains_Mono, Mukta, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { BRAND } from "@/lib/brand";

/* Plus Jakarta Sans for the interface: friendly, readable, and its figures
   hold up in dense tables. Mukta carries the Devanagari, so Hindi labels sit
   at the same weight as the English beside them. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["devanagari", "latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} Programme Console`,
  description: BRAND.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrains.variable} ${mukta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
