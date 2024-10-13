import OpenAI from "openai";

const apiKey = process.env.AI_API_KEY;
const baseURL = process.env.AI_BASE_URL;

if (!apiKey) {
  throw new Error("AI_API_KEY is not defined");
}

if (!baseURL) {
  throw new Error("AI_BASE_URL is not defined");
}

export const aiInstance = new OpenAI({
  apiKey,
  baseURL,
});
