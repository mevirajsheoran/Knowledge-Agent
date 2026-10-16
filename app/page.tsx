"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { QueryForm } from "@/components/query-form";
import { ExampleChips } from "@/components/example-chips";
import { WorkflowPanel } from "@/components/workflow-panel";
import { AnswerPanel } from "@/components/answer-panel";
import { FileChangesPanel } from "@/components/file-changes-panel";
import { NotesPanel } from "@/components/notes-panel";
import { EmptyState } from "@/components/empty-state";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import type { RunResult } from "@/lib/types";
import {
  AlertCircle,
  BrainCircuit,
  Loader2,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);

  const handleSubmit = async (submittedQuery: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: submittedQuery }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      const data: RunResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleSelect = (exampleQuery: string) => {
    setQuery(exampleQuery);
    handleSubmit(exampleQuery);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),transparent_28%),radial-gradient(circle_at_right,rgba(99,102,241,0.08),transparent_24%),linear-gradient(to_bottom,rgba(248,250,252,0.85),rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_24%),radial-gradient(circle_at_right,rgba(99,102,241,0.12),transparent_20%),linear-gradient(to_bottom,rgba(2,6,23,1),rgba(2,6,23,0.96))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/40 to-transparent dark:from-slate-900/20" />
      <AppHeader />

      <main className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300">
              <WandSparkles className="h-3.5 w-3.5" />
              Markdown-first memory with visible multi-agent orchestration
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Compile answers into reusable knowledge notes
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              Ask a topic, compare concepts, or create a new note. The system reads
              local markdown files, updates structured knowledge, and links related
              concepts without relying on a vector database.
            </p>
          </div>

          {result && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                <BrainCircuit className="h-3.5 w-3.5 text-blue-600" />
                {result.workflow.length} workflow steps
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                {result.fileChanges.length} note file
                {result.fileChanges.length === 1 ? "" : "s"} changed
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[390px_minmax(0,1fr)] xl:gap-8">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <QueryForm
              query={query}
              onQueryChange={setQuery}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <ExampleChips
              onSelect={handleExampleSelect}
              disabled={isLoading}
            />

            <WorkflowPanel
              steps={result?.workflow}
              isLoading={isLoading}
            />
          </aside>

          <section className="space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="border-red-200/80 bg-red-50/80 text-red-950 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-100"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Workflow failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!result && !isLoading && !error && <EmptyState />}

            {isLoading && !result && (
              <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/80 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)] backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10 sm:py-20">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
                    <Loader2 className="h-7 w-7 animate-spin text-white" />
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    Running agent workflow
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Scanning local markdown notes, compiling research, drafting the
                    response, and persisting note updates. This usually takes
                    15–30 seconds.
                  </p>

                  <div className="mt-6 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-left">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Step 1
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        Scan notes
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-left">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Step 2
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        Agent collaboration
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-left">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Step 3
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        Update markdown
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {result && (
              <>
                <AnswerPanel answer={result.answer} />
                <FileChangesPanel
                  changes={result.fileChanges}
                  storageMode={result.storageMode}
                />
                <NotesPanel fileChanges={result.fileChanges} />
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}