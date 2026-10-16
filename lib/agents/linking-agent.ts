import { generateObject } from "ai";
import { model } from "../ai/model";
import {
  LinkingSchema,
  type LinkingOutput,
  type ResearchOutput,
  type SummarizerOutput,
} from "../ai/schemas";
import { LINKING_SYSTEM_PROMPT } from "../ai/prompts";

interface LinkingInput {
  query: string;
  research: ResearchOutput;
  summary: SummarizerOutput;
  existingSlugs: string[];
}

export async function runLinkingAgent(
  input: LinkingInput
): Promise<LinkingOutput> {
  const { object } = await generateObject({
    model,
    schema: LinkingSchema,
    system: LINKING_SYSTEM_PROMPT,
    prompt: `User query:
${input.query}

Research output:
${JSON.stringify(input.research, null, 2)}

Summary output:
${JSON.stringify(input.summary, null, 2)}

Existing note slugs:
${JSON.stringify(input.existingSlugs)}

Return structured output.`,
  });

  // Enforce max 3 operations
  object.operations = object.operations.slice(0, 3);

  return object;
}
