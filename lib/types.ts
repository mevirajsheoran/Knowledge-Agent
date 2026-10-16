export type NoteAction = "create" | "update";

export interface KnowledgeNote {
  title: string;
  slug: string;
  summary: string;
  keyPoints: string[];
  related: string[];
  updatedAt: string;
  markdown: string;
  path: string;
}

export interface NoteExcerpt {
  title: string;
  slug: string;
  summary: string;
  keyPoints: string[];
  related: string[];
  excerpt: string;
  path: string;
  score?: number;
}

export interface WorkflowStep {
  id: string;
  label: string;
  status: "pending" | "running" | "completed" | "failed";
  details?: string;
  durationMs?: number;
}

export interface FileChange {
  slug: string;
  title: string;
  action: NoteAction;
  path: string;
  reason: string;
  related: string[];
  markdown: string;
}

export interface FinalAnswer {
  title: string;
  directResponse: string;
  sections: {
    heading: string;
    content: string;
  }[];
  bullets: string[];
  noteReferences: string[];
  followUpQuestions: string[];
}

export interface RunResult {
  query: string;
  answer: FinalAnswer;
  workflow: WorkflowStep[];
  selectedNotes: NoteExcerpt[];
  fileChanges: FileChange[];
  storageMode: "local" | "vercel-tmp";
}
