"use server";

import { db } from "@/db";
import { Step, steps } from "@/db/schema";

interface CreateStepParams {
  nibbleId: string;
  stepNumber: number;
  stepType: string;
  content: string;
}

export async function createStep(params: CreateStepParams): Promise<Step> {
  const { nibbleId, stepNumber, stepType, content } = params;

  const [step] = await db
    .insert(steps)
    .values({
      nibbleId,
      stepNumber,
      stepType,
      content,
    })
    .returning();

  return step;
}
