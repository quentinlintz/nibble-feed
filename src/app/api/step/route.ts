import { createStep } from "@/actions/step";
import {
  FLASHCARD_STEP_PROMPT,
  QUIZ_STEP_PROMPT,
  SUMMARY_STEP_PROMPT,
  TEXT_STEP_PROMPT,
} from "@/lib/constants";
import { generateStep } from "@/lib/langchain";
import {
  FlashcardStepSchema,
  QuizStepSchema,
  SummaryStepSchema,
  TextStepSchema,
} from "@/lib/schemas";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

async function handler(request: NextRequest) {
  const body = await request.json();
  const { nibbleId, stepNumber, topic, stepType } = body;
  let prompt: string;
  let schema: z.Schema;

  switch (stepType) {
    case "text":
      prompt = TEXT_STEP_PROMPT;
      schema = TextStepSchema;
      break;
    case "flashcard":
      prompt = FLASHCARD_STEP_PROMPT;
      schema = FlashcardStepSchema;
      break;
    case "quiz":
      prompt = QUIZ_STEP_PROMPT;
      schema = QuizStepSchema;
      break;
    case "summary":
      prompt = SUMMARY_STEP_PROMPT;
      schema = SummaryStepSchema;
      break;
    default:
      throw new Error("Invalid stepType provided");
  }

  const stepJson = await generateStep(topic, prompt, schema);
  const content = JSON.stringify(stepJson);
  await createStep({
    nibbleId,
    stepNumber,
    stepType,
    content,
  });

  return NextResponse.json({
    success: true,
    nibbleId,
    stepNumber,
    stepType,
  });
}

export const POST = verifySignatureAppRouter(handler);
