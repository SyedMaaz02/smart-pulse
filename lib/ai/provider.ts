import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

export function getModel() {
  if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    return openai("gpt-4o-mini");
  }

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    return google("gemini-2.0-flash");
  }

  throw new Error(
    "Missing AI provider key. Set OPENAI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY."
  );
}
