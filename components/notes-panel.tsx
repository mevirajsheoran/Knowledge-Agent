"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FileChange } from "@/lib/types";
import { BookOpen, FileCode2, Link2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface NotesPanelProps {
  fileChanges?: FileChange[];
}

function stripFrontmatter(markdown: string) {
  if (!markdown.startsWith("---")) return markdown;
  const match = markdown.match(/^---[\s\S]*?---\n?/);
  return match ? markdown.slice(match[0].length).trim() : markdown;
}

export function NotesPanel({ fileChanges }: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!fileChanges || fileChanges.length === 0) return null;

  const safeActiveTab = Math.min(activeTab, fileChanges.length - 1);
  const activeChange = fileChanges[safeActiveTab];

  const previewMarkdown = useMemo(
    () => (activeChange ? stripFrontmatter(activeChange.markdown) : ""),
    [activeChange]
  );

  return (
    <Card className="card-surface">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                <BookOpen className="h-4 w-4" />
              </div>
              Note previews
            </CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Preview the generated markdown content that will serve as compiled
              knowledge for future runs.
            </p>
          </div>

          <Badge variant="secondary" className="w-fit rounded-full px-2.5 py-1 text-[11px]">
            {fileChanges.length} preview{fileChanges.length === 1 ? "" : "s"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {fileChanges.map((change, index) => (
            <button
              key={`${change.slug}-${index}`}
              onClick={() => setActiveTab(index)}
              className={`group rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                index === safeActiveTab
                  ? "border-blue-200 bg-blue-50 text-blue-900 shadow-sm dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-100"
                  : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="truncate text-xs font-semibold">
                  {change.title}
                </span>
                <Badge
                  variant="outline"
                  className={`rounded-full px-2 py-0 text-[10px] ${
                    change.action === "create"
                      ? "border-emerald-200 text-emerald-700 dark:border-emerald-900/50 dark:text-emerald-300"
                      : "border-amber-200 text-amber-700 dark:border-amber-900/50 dark:text-amber-300"
                  }`}
                >
                  {change.action === "create" ? "new" : "updated"}
                </Badge>
              </div>
              <p className="mt-1 truncate text-[11px] font-mono opacity-80">
                {change.slug}.md
              </p>
            </button>
          ))}
        </div>

        {activeChange && (
          <div className="overflow-hidden rounded-2xl border border-border/60">
            <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/25 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {activeChange.title}
                  </p>
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2 py-0.5 text-[10px] font-mono"
                  >
                    {activeChange.slug}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {activeChange.path}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeChange.related.slice(0, 4).map((rel) => (
                  <Badge
                    key={rel}
                    variant="outline"
                    className="rounded-full px-2 py-0.5 text-[10px] font-mono"
                  >
                    <Link2 className="mr-1 h-3 w-3" />
                    {rel}
                  </Badge>
                ))}
              </div>
            </div>

            <ScrollArea className="h-[460px] bg-background/70">
              <div className="px-5 py-5">
                <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  <FileCode2 className="h-3.5 w-3.5" />
                  Markdown preview
                </div>
                <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:bg-muted prose-code:before:content-none prose-code:after:content-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {previewMarkdown}
                  </ReactMarkdown>
                </article>
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}