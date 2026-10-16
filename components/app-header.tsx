"use client";

import { Badge } from "@/components/ui/badge";
import { BookOpen, BrainCircuit, Sparkles, Workflow } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/10">
              <BookOpen className="h-5 w-5 text-white" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-[1.35rem]">
                  Compiled Knowledge Agent
                </h1>
                <Badge
                  variant="secondary"
                  className="rounded-full border border-blue-200/70 bg-blue-50/80 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300"
                >
                  Flexi CA3 MVP
                </Badge>
              </div>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                A markdown-first multi-agent system that reads existing notes,
                creates structured knowledge, and links related topics across runs.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-border/70 bg-card/70 px-2.5 py-1 text-xs font-medium shadow-sm"
            >
              <Workflow className="mr-1.5 h-3.5 w-3.5 text-indigo-600" />
              5 Agents
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-border/70 bg-card/70 px-2.5 py-1 text-xs font-medium shadow-sm"
            >
              <BookOpen className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
              Markdown Memory
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-border/70 bg-card/70 px-2.5 py-1 text-xs font-medium shadow-sm"
            >
              <BrainCircuit className="mr-1.5 h-3.5 w-3.5 text-blue-600" />
              No Vector DB
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-full border border-amber-200/70 bg-amber-50/80 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Compiled knowledge
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}