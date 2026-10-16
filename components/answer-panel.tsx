"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { FinalAnswer } from "@/lib/types";
import {
  BookMarked,
  Check,
  ChevronRight,
  Copy,
  HelpCircle,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AnswerPanelProps {
  answer?: FinalAnswer;
}

export function AnswerPanel({ answer }: AnswerPanelProps) {
  const [copied, setCopied] = useState(false);

  if (!answer) return null;

  const handleCopy = async () => {
    const text = [
      `# ${answer.title}`,
      "",
      answer.directResponse,
      "",
      ...answer.sections.map((section) => `## ${section.heading}\n${section.content}`),
      "",
      "## Key Takeaways",
      ...answer.bullets.map((bullet) => `- ${bullet}`),
      "",
      "## Referenced Notes",
      ...answer.noteReferences.map((ref) => `- [[${ref}]]`),
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Card className="card-surface overflow-hidden">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
                <MessageSquareText className="h-4 w-4" />
              </div>
              Final answer
            </CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Structured response generated from local markdown context and
              downstream agent collaboration.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-9 rounded-xl border-border/70 bg-background/80 text-xs shadow-sm"
          >
            {copied ? (
              <>
                <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Copy answer
              </>
            )}
          </Button>
        </div>

        <div className="rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-4 dark:border-blue-900/40 dark:from-blue-950/25 dark:via-slate-900 dark:to-indigo-950/20">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] text-white hover:bg-blue-600">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Structured output
            </Badge>
            {answer.noteReferences.length > 0 && (
              <Badge
                variant="outline"
                className="rounded-full border-blue-200/80 bg-white/80 px-2.5 py-1 text-[11px] dark:border-blue-900/50 dark:bg-slate-900/60"
              >
                {answer.noteReferences.length} referenced note
                {answer.noteReferences.length === 1 ? "" : "s"}
              </Badge>
            )}
          </div>

          <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground">
            {answer.title}
          </h2>

          <div className="prose prose-sm mt-4 max-w-none leading-7 dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {answer.directResponse}
            </ReactMarkdown>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {answer.sections.length > 0 && (
          <div className="space-y-4">
            {answer.sections.map((section, index) => (
              <div
                key={`${section.heading}-${index}`}
                className="rounded-xl border border-border/60 bg-muted/20 px-4 py-4"
              >
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                  {section.heading}
                </h3>
                <div className="prose prose-sm max-w-none pl-6 dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {section.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}

        {answer.bullets.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Key takeaways
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {answer.bullets.map((bullet, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 px-3.5 py-3"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {answer.noteReferences.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <BookMarked className="h-3.5 w-3.5" />
                Referenced notes
              </h3>
              <div className="flex flex-wrap gap-2">
                {answer.noteReferences.map((ref) => (
                  <Badge
                    key={ref}
                    variant="secondary"
                    className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-mono"
                  >
                    [[{ref}]]
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {answer.followUpQuestions.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <HelpCircle className="h-3.5 w-3.5" />
                Follow-up questions
              </h3>
              <div className="space-y-2">
                {answer.followUpQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/60 bg-muted/20 px-3.5 py-3"
                  >
                    <p className="text-sm leading-6 text-muted-foreground">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}