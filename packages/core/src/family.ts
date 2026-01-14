import { z } from "zod";

export const ModelFamilyValues = [
  // OpenAI/GPT style
  "gpt",
  "gpt-codex",
  "gpt-pro",
  "gpt-mini",
  "gpt-nano",
  "gpt-oss",

  // OpenAI o-series (reasoning models)
  "o",
  "o-mini",
  "o-pro",

  // Anthropic style
  "claude-haiku",
  "claude-sonnet",
  "claude-opus",

  // Gemini style
  "gemini-pro",
  "gemini-flash",
  "gemini-flash-lite",

  // GLM (zai)
  "glm",
  "glmv",
  "glm-air",
  "glm-flash",

  // Meta Llama
  "llama",

  // Alibaba Qwen
  "qwen",

  // DeepSeek
  "deepseek",
  "deepseek-thinking",

  // Microsoft Phi
  "phi",

  // Moonshot Kimi
  "kimi",
  "kimi-thinking",

  // TODO: Additional model families that need to be added:
  // The following families are currently in use but not in the enum. Decisions needed on whether
  // to add them as new families or map them to existing ones:
  // 
  // Embedding models: text-embedding-ada, text-embedding-3, text-embedding-3-small, 
  //   text-embedding-3-large, gemini-embedding, glm-4-embed, cohere-embed, voyage-code, etc.
  // 
  // Mistral family: mistral, mistral-7b, mistral-large, mistral-medium, mistral-small, mistral-nemo,
  //   ministral, ministral-3b, ministral-8b, ministral-14b, codestral, devstral, etc.
  // 
  // Other major models: gemma, gemma-2, gemma-3, grok, grok-2, grok-3, grok-4, grok-code, minimax,
  //   nova, nova-pro, nova-lite, nova-micro, sora, etc.
  //
  // Specialized models: flux (image), imagen (image), dall-e-3 (image), whisper (audio), 
  //   stable-diffusion (image), runway (video), etc.
  //
  // GLM variants still need mapping: glm-4, glm-4.5, glm-4.6, glm-4.7, glm-4-air, glm-4.5-air, 
  //   glm-4.5-flash → should map to glm, glm-air, or glm-flash based on tier
] as const;

export const ModelFamily = z.enum(ModelFamilyValues);
export type ModelFamily = z.infer<typeof ModelFamily>;
