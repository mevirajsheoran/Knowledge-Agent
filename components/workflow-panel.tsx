"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkflowStep } from "@/lib/types";
import {
  CheckCircle2,
  Circle,
  FlaskConical,
  Link2,
  Loader2,
  PenTool,
  Save,
  ScanSearch,
  ShieldCheck,
  Timer,
  Workflow,
  XCircle,
  FileText,
} from "lucide-react";

interface WorkflowPanelProps {
  steps?: WorkflowStep[];
  isLoading?: boolean;
}

const STEP_ICONS: Record<string, React.ReactNode> = {
  scan: <ScanSearch className="h-4 w-4" />,
  research: <FlaskConical className="h-4 w-4" />,
  summarizer: <FileText className="h-4 w-4" />,
  linking: <Link2 className="h-4 w-4" />,
  writer: <PenTool className="h-4 w-4" />,
  validator: <ShieldCheck className="h-4 w-4" />,
  persist: <Save className="h-4 w-4" />,
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />,
  running: <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />,
  completed: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />,
  failed: <XCircle className="h-3.5 w-3.5 text-red-500" />,
};

function LoadingSkeleton() {
  const placeholderSteps = [
    "Scan knowledge base",
    "Research Agent",
    "Summarizer Agent",
    "Linking Agent",
    "Writer Agent",
    "Validator Agent",
    "Persist notes",
  ];

  return (
    <div className="space-y-2">
      {placeholderSteps.map((label, index) => (
        <div
          key={label}
          className={`rounded-xl border px-3.5 py-3 ${
            index === 0
              ? "border-blue-200/70 bg-blue-50/80 dark:border-blue-900/40 dark:bg-blue-950/20"
              : "border-border/60 bg-muted/20"
          }`}
        >
          <div className="flex items-center gap-3">
            {index === 0 ? (
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground/40" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <Skeleton className="mt-2 h-3 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getStatusStyles(status: WorkflowStep["status"]) {
  switch (status) {
    case "running":
      return "border-blue-200/70 bg-blue-50/80 dark:border-blue-900/40 dark:bg-blue-950/20";
    case "completed":
      return "border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/15";
    case "failed":
      return "border-red-200/70 bg-red-50/70 dark:border-red-900/40 dark:bg-red-950/15";
    default:
      return "border-border/60 bg-muted/20";
  }
}

function getStatusText(status: WorkflowStep["status"]) {
  switch (status) {
    case "running":
      return "Running";
    case "completed":
      return "Done";
    case "failed":
      return "Failed";
    default:
      return "Pending";
  }
}

export function WorkflowPanel({ steps, isLoading }: WorkflowPanelProps) {
  return (
    <Card className="card-surface">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300">
                <Workflow className="h-4 w-4" />
              </div>
              Workflow trace
            </CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Visible orchestration across scanning, research, summarization,
              linking, writing, validation, and persistence.
            </p>
          </div>

          {steps && steps.length > 0 && (
            <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-[11px]">
              {steps.length} steps
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isLoading && !steps ? (
          <LoadingSkeleton />
        ) : steps && steps.length > 0 ? (
          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`rounded-xl border px-3.5 py-3 transition-colors ${getStatusStyles(
                  step.status
                )}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-muted-foreground">
                    {STEP_ICONS[step.id] ?? <Circle className="h-4 w-4" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {step.label}
                      </p>
                      <Badge
                        variant="outline"
                        className="rounded-full border-border/60 bg-background/60 px-2 py-0.5 text-[10px] font-medium"
                      >
                        {getStatusText(step.status)}
                      </Badge>
                    </div>

                    {step.details && (
                      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                        {step.details}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {step.durationMs !== undefined && (
                      <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-2 py-1 text-[10px] font-medium text-muted-foreground">
                        <Timer className="h-3 w-3" />
                        {(step.durationMs / 1000).toFixed(1)}s
                      </div>
                    )}
                    {STATUS_ICONS[step.status]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-8 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60">
              <Workflow className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              No workflow yet
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Run a query to watch the orchestrator coordinate all agents and
              persist markdown updates.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}