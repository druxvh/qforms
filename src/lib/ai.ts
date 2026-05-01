import { createGoogleGenerativeAI } from "@ai-sdk/google";

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("Missing Google Generative AI API key. Please set the GOOGLE_GENERATIVE_AI_API_KEY environment variable.");
}

export const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
})