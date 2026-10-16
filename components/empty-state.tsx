"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Link2,
  Sparkles,
} from "lucide-react";

export function EmptyState() {
  return (
    <Card className="card-surface overflow-hidden border-dashed">
      <CardContent className="px-6 py-14 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-blue-500/20">
            <BookOpen className="h-8 w-8 text-white" />
          </div>

          <div className="mt-6">
            <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Ready to compile knowledge
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Turn a query into reusable markdown memory
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Run the agent workflow to scan local notes, synthesize structured
              context, create or update wiki-style markdown files, and build
              links across related topics.
            </p>
          </div>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-4">
              <BrainCircuit className="h-5 w-5 text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-foreground">
                Multi-agent reasoning
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Research, summarize, link, write, and validate through a visible
                orchestrated flow.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-4">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <p className="mt-3 text-sm font-semibold text-foreground">
                Markdown-first storage
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Notes live as structured markdown files instead of vector-backed
                memory.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-4">
              <Link2 className="h-5 w-5 text-indigo-600" />
              <p className="mt-3 text-sm font-semibold text-foreground">
                Wiki-style linking
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Related topics are connected so future queries benefit from
                compiled knowledge.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5">
              Enter query
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
            <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5">
              Run 5 agents
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
            <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5">
              Update markdown notes
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}