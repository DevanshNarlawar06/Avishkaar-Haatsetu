"use client";

import { CalendarRange, Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wordmark } from "@/components/shell/wordmark";

export function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
      <div className="flex h-[72px] items-center gap-4 px-6">
        <div className="lg:hidden">
          <Wordmark />
        </div>

        <div className="hidden min-w-0 flex-1 lg:block">
          <h1 className="truncate text-lg font-bold leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>

          <Select defaultValue="fy26">
            <SelectTrigger className="h-9 w-[172px] rounded-lg bg-card text-xs">
              <CalendarRange className="size-3.5 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fy26">Financial year 2026</SelectItem>
              <SelectItem value="q3">Quarter 3</SelectItem>
              <SelectItem value="m">This month</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" className="h-9 gap-2 rounded-lg text-xs">
            <Download className="size-3.5" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
