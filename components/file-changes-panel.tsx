"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FileChange } from "@/lib/types";
import { FileText, FolderOpen, HardDrive, Info } from "lucide-react";

interface FileChangesPanelProps {
  changes?: FileChange[];
  storageMode?: "local" | "vercel-tmp";
}

export function FileChangesPanel({
  changes,
  storageMode,
}: FileChangesPanelProps) {
  if (!changes || changes.length === 0) return null;

  return (
    <Card className="card-surface">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                <FolderOpen className="h-4 w-4" />
              </div>
              Files changed
            </CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Notes created or updated during the current run, including the
              reason for each knowledge change.
            </p>
          </div>

          <Badge variant="secondary" className="w-fit rounded-full px-2.5 py-1 text-[11px]">
            {changes.length} file{changes.length === 1 ? "" : "s"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {changes.map((change) => (
          <div
            key={`${change.slug}-${change.action}`}
            className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background/80 shadow-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {change.title}
                    </p>
                    <code className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {change.path}
                    </code>
                  </div>
                </div>
              </div>

              <Badge
                variant="outline"
                className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  change.action === "create"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/25 dark:text-emerald-300"
                    : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/25 dark:text-amber-300"
                }`}
              >
                {change.action === "create" ? "Created" : "Updated"}
              </Badge>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="rounded-xl border border-border/60 bg-background/70 px-3.5 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Why this changed
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {change.reason}
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/70 px-3.5 py-3 lg:min-w-[180px]">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <HardDrive className="h-3.5 w-3.5" />
                  Related links
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {change.related.length > 0 ? (
                    change.related.map((rel) => (
                      <Badge
                        key={rel}
                        variant="secondary"
                        className="rounded-full px-2 py-0.5 text-[11px] font-mono"
                      >
                        [[{rel}]]
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      No related links
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {storageMode === "vercel-tmp" && (
          <div className="flex items-start gap-3 rounded-xl border border-blue-200/70 bg-blue-50/70 px-4 py-3 text-sm dark:border-blue-900/40 dark:bg-blue-950/20">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-300" />
            <p className="leading-6 text-blue-900 dark:text-blue-100">
              Live demo uses ephemeral <code>/tmp</code> markdown storage on
              Vercel. Local development persists note updates on disk.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}