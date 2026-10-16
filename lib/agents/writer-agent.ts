import { generateObject } from "ai";
import { model } from "../ai/model";
import {
  WriterSchema,
  type WriterOutput,
  type ResearchOutput,
  type SummarizerOutput,
  type LinkingOutput,
} from "../ai/schemas";
import { WRITER_SYSTEM_PROMPT } from "../ai/prompts";
import type { NoteExcerpt } from "../types";

interface WriterInput {
  query: string;
  research: ResearchOutput;
  summary: SummarizerOutput;
  linking: LinkingOutput;
  selectedNotes: NoteExcerpt[];
}

export async function runWriterAgent(
  input: WriterInput
): Promise<WriterOutput> {
  const { object } = await generateObject({
    model,
    schema: WriterSchema,
    system: WRITER_SYSTEM_PROMPT,
    prompt: `User query:
${input.query}

Research output:
${JSON.stringify(input.research, null, 2)}

Summary output:
${JSON.stringify(input.summary, null, 2)}

Linking plan:
${JSON.stringify(input.linking, null, 2)}

Relevant existing notes:
${JSON.stringify(input.selectedNotes, null, 2)}

Return structured output.`,
  });

  // Enforce max 3 notes
  object.notes = object.notes.slice(0, 3);

  return object;
}
