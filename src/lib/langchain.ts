import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  FlashcardStepSchema,
  FlashcardStepType,
  QuizStepSchema,
  QuizStepType,
  SummaryStepSchema,
  SummaryStepType,
  TextStepSchema,
  TextStepType,
} from "./schemas";
import {
  OutputFixingParser,
  StructuredOutputParser,
} from "langchain/output_parsers";
import {
  CREATE_NIBBLE_TOPIC_PROMPT,
  FLASHCARD_STEP_PROMPT,
  GPT_3_5_TURBO,
  GPT_4_1106_PREVIEW,
  QUIZ_STEP_PROMPT,
  SUMMARY_STEP_PROMPT,
  TEXT_STEP_PROMPT,
} from "./constants";
import { z } from "zod";

export async function formatTopic(topic: string): Promise<string> {
  const model = new ChatOpenAI({
    model: GPT_3_5_TURBO,
    temperature: 0,
    maxTokens: 64,
  });

  const res = await model.invoke([
    new SystemMessage(CREATE_NIBBLE_TOPIC_PROMPT),
    new HumanMessage(topic),
  ]);

  return res.lc_kwargs.content;
}

async function generateStep<T>(
  topic: string,
  prompt: string,
  schema: z.Schema<T>
) {
  const parser = StructuredOutputParser.fromZodSchema(schema);
  const formatInstructions = parser.getFormatInstructions();
  const fixParser = OutputFixingParser.fromLLM(
    new ChatOpenAI({
      model: GPT_4_1106_PREVIEW,
      temperature: 0,
      maxTokens: 256,
    }),
    parser
  );

  const model = new ChatOpenAI({
    model: GPT_4_1106_PREVIEW,
    temperature: 0,
    maxTokens: 256,
    modelKwargs: {
      response_format: {
        type: "json_object",
      },
    },
    maxRetries: 2,
  });

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", prompt],
    ["human", "{topic}"],
  ]);

  const response = await promptTemplate.pipe(model).invoke({
    learning_language: "English",
    formatInstructions,
    topic,
  });

  try {
    return await parser.parse(response.lc_kwargs.content);
  } catch (e) {
    return await fixParser.parse(response.lc_kwargs.content);
  }
}

export async function generateTextStep(topic: string): Promise<TextStepType> {
  return generateStep(topic, TEXT_STEP_PROMPT, TextStepSchema);
}

export async function generateQuizStep(topic: string): Promise<QuizStepType> {
  return generateStep(topic, QUIZ_STEP_PROMPT, QuizStepSchema);
}

export async function generateFlashcardStep(
  topic: string
): Promise<FlashcardStepType> {
  return generateStep(topic, FLASHCARD_STEP_PROMPT, FlashcardStepSchema);
}

export async function generateSummaryStep(
  topic: string
): Promise<SummaryStepType> {
  return generateStep(topic, SUMMARY_STEP_PROMPT, SummaryStepSchema);
}
