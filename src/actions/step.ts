"use server";

import { db } from "@/db";
import { Step, steps } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

interface CreateStepParams {
  nibbleId: string;
  stepNumber: number;
  stepType: string;
  content?: string;
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

export async function updateStep(
  stepId: string,
  content: string
): Promise<Step> {
  const [step] = await db
    .update(steps)
    .set({ content, status: "completed", updatedAt: new Date() })
    .where(eq(steps.id, stepId))
    .returning();

  return step;
}

export async function getStepsForNibble(nibbleId: string): Promise<Step[]> {
  return await db
    .select()
    .from(steps)
    .where(eq(steps.nibbleId, nibbleId))
    .orderBy(asc(steps.stepNumber));
}
