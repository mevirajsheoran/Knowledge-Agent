"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Loader2, Search, Sparkles, X } from "lucide-react";

interface QueryFormProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function QueryForm({
  query,
  onQueryChange,
  onSubmit,
  isLoading,
}: QueryFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (trimmed && !isLoading) {
      onSubmit(trimmed);
    }
  };

  return (
    <Card className="card-surface overflow-hidden">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
                <Search className="h-4 w-4" />
              </div>
              Ask the system
            </CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter a topic, comparison, or note creation request. The workflow
              will scan markdown notes, coordinate agents, and write updates back
              to the knowledge base.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            <BrainCircuit className="h-3.5 w-3.5 text-blue-600" />
            Research + linking + validation
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Structured markdown output
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              id="query-input"
              placeholder="Example: Explain RAG vs fine-tuning for support bots and update the relevant notes."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              disabled={isLoading}
              className="min-h-[132px] resize-none rounded-xl border-border/70 bg-background/70 px-4 py-3 text-sm leading-6 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/30"
            />
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                Tip: comparisons and “create a note on…” prompts demo the workflow best.
              </span>
              <span className="hidden tabular-nums sm:inline">
                {query.trim().length} chars
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              id="submit-button"
              type="submit"
              disabled={!query.trim() || isLoading}
              className="h-11 flex-1 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running workflow...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Run agents
                </>
              )}
            </Button>

            {query && !isLoading && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onQueryChange("")}
                className="h-11 w-11 rounded-xl border-border/70 bg-background/80"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/25 px-3.5 py-3">
            <p className="text-xs leading-5 text-muted-foreground">
              <span className="font-medium text-foreground">Output includes:</span>{" "}
              structured answer, workflow trace, files created or updated, and
              markdown note previews.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}