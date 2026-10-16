import { generateObject } from "ai";
import { model } from "../ai/model";
import {
  ValidatorSchema,
  type ValidatorOutput,
  type WriterOutput,
  type LinkingOutput,
} from "../ai/schemas";
import { VALIDATOR_SYSTEM_PROMPT } from "../ai/prompts";

interface ValidatorInput {
  writer: WriterOutput;
  linking: LinkingOutput;
  existingSlugs: string[];
}

export async function runValidatorAgent(
  input: ValidatorInput
): Promise<ValidatorOutput> {
  const { object } = await generateObject({
    model,
    schema: ValidatorSchema,
    system: VALIDATOR_SYSTEM_PROMPT,
    prompt: `Writer output:
${JSON.stringify(input.writer, null, 2)}

Linking output:
${JSON.stringify(input.linking, null, 2)}

Existing note slugs:
${JSON.stringify(input.existingSlugs)}

Return structured output.`,
  });

  return object;
}
