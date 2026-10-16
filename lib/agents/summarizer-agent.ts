import { generateObject } from "ai";
import { model } from "../ai/model";
import { SummarizerSchema, type SummarizerOutput, type ResearchOutput } from "../ai/schemas";
import { SUMMARIZER_SYSTEM_PROMPT } from "../ai/prompts";

interface SummarizerInput {
  query: string;
  research: ResearchOutput;
}

export async function runSummarizerAgent(
  input: SummarizerInput
): Promise<SummarizerOutput> {
  const { object } = await generateObject({
    model,
    schema: SummarizerSchema,
    system: SUMMARIZER_SYSTEM_PROMPT,
    prompt: `User query:
${input.query}

Research output:
${JSON.stringify(input.research, null, 2)}

Return structured output.`,
  });

  return object;
}
