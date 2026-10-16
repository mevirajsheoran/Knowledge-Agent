import { z } from "zod";

export const ResearchSchema = z.object({
  primaryTopic: z.string(),
  relevantFindings: z.array(
    z.object({
      noteSlug: z.string(),
      noteTitle: z.string(),
      evidence: z.string(),
    })
  ),
  gaps: z.array(z.string()),
  relatedTopics: z.array(z.string()),
  reusableSnippets: z.array(z.string()),
  confidence: z.enum(["low", "medium", "high"]),
});

export const SummarizerSchema = z.object({
  summary: z.string(),
  keyPoints: z.array(z.string()),
  answerSections: z.array(
    z.object({
      heading: z.string(),
      bullets: z.array(z.string()),
    })
  ),
  noteOutline: z.array(
    z.object({
      title: z.string(),
      slug: z.string(),
      focus: z.string(),
    })
  ),
  relatedTopics: z.array(z.string()),
});

export const LinkingSchema = z.object({
  operations: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      action: z.enum(["create", "update"]),
      reason: z.string(),
      related: z.array(z.string()),
    })
  ),
  crossLinks: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      reason: z.string(),
    })
  ),
});

export const WriterSchema = z.object({
  answer: z.object({
    title: z.string(),
    directResponse: z.string(),
    sections: z.array(
      z.object({
        heading: z.string(),
        content: z.string(),
      })
    ),
    bullets: z.array(z.string()),
    noteReferences: z.array(z.string()),
    followUpQuestions: z.array(z.string()),
  }),
  notes: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      summary: z.string(),
      keyPoints: z.array(z.string()),
      related: z.array(z.string()),
      bodySections: z.array(
        z.object({
          heading: z.string(),
          bullets: z.array(z.string()),
        })
      ),
      updateReason: z.string(),
    })
  ),
});

export const ValidatorSchema = z.object({
  approved: z.boolean(),
  issues: z.array(z.string()),
  safeToWrite: z.boolean(),
});

export type ResearchOutput = z.infer<typeof ResearchSchema>;
export type SummarizerOutput = z.infer<typeof SummarizerSchema>;
export type LinkingOutput = z.infer<typeof LinkingSchema>;
export type WriterOutput = z.infer<typeof WriterSchema>;
export type ValidatorOutput = z.infer<typeof ValidatorSchema>;
