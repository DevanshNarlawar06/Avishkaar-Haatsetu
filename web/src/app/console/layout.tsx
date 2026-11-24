import type { Metadata } from "next";

import { Sidebar } from "@/components/shell/sidebar";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: { default: "Programme console", template: `%s · ${BRAND.name} console` },
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1">
      <a href="#console-main" className="skip-link">
        Skip to content
      </a>
      <Sidebar />
      <div id="console-main" className="flex min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
