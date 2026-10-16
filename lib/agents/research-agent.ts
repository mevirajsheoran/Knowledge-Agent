import { generateObject } from "ai";
import { model } from "../ai/model";
import { ResearchSchema, type ResearchOutput } from "../ai/schemas";
import { RESEARCH_SYSTEM_PROMPT } from "../ai/prompts";
import type { NoteExcerpt } from "../types";

interface ResearchInput {
  query: string;
  selectedNotes: NoteExcerpt[];
  allNoteTitles: string[];
}

export async function runResearchAgent(
  input: ResearchInput
): Promise<ResearchOutput> {
  const { object } = await generateObject({
    model,
    schema: ResearchSchema,
    system: RESEARCH_SYSTEM_PROMPT,
    prompt: `User query:
${input.query}

Existing local note excerpts:
${JSON.stringify(input.selectedNotes, null, 2)}

All available note titles/slugs:
${JSON.stringify(input.allNoteTitles)}

Return structured output.`,
  });

  return object;
}
