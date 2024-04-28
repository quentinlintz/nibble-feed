"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Nibble, nibbles, steps, StepType } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { getUser, deductCredits } from "./user";
import { NIBBLE_CREDIT_COST } from "@/constants";
import { formatTopic } from "@/lib/langchain";
import { qstashClient } from "@/lib/qstash";
import * as actions from "@/actions";

interface CreateNibbleParams {
  inputTopic: string;
  stepList: StepType[];
}

export async function createNibble(
  params: CreateNibbleParams
): Promise<Nibble> {
  const session = await auth();
  const userId = session?.user?.id;
  const { inputTopic, stepList } = params;

  if (!userId) {
    redirect(paths.signIn());
  }

  const user = await getUser(userId);

  if (user.credits < NIBBLE_CREDIT_COST) {
    throw new Error("You do not have enough credits to create a Nibble.");
  }

  const topic = await formatTopic(inputTopic);

  const [nibble] = await db
    .insert(nibbles)
    .values({
      topic,
      userId,
      status: "creating",
    })
    .returning();

  await Promise.all(
    stepList.map(async (stepType, index) => {
      const step = await actions.createStep({
        nibbleId: nibble.id,
        stepNumber: index + 1,
        stepType,
      });
      return qstashClient.publishJSON({
        url: `${process.env.APP_URL}/api/step`,
        body: {
          id: step.id,
          topic,
          stepType: step.stepType,
        },
      });
    })
  );

  await deductCredits(userId, NIBBLE_CREDIT_COST);
  revalidatePath(paths.nibblesList());

  return nibble;
}

export async function getNibbles(): Promise<Nibble[]> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect(`${paths.signIn()}?callbackUrl=/nibbles`);
  }

  return db
    .select()
    .from(nibbles)
    .where(eq(nibbles.userId, userId))
    .orderBy(desc(nibbles.createdAt));
}

export async function getNibble(id: string): Promise<Nibble> {
  const [result] = await db
    .select()
    .from(nibbles)
    .where(eq(nibbles.id, id))
    .limit(1);

  if (!result) {
    notFound();
  }

  return result;
}

export async function deleteNibble(nibble: Nibble): Promise<void> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect(`${paths.signIn()}?callbackUrl=/nibbles`);
  }

  if (userId === nibble.userId) {
    await db.delete(nibbles).where(eq(nibbles.id, nibble.id));
  } else {
    notFound();
  }

  revalidatePath(paths.nibblesList());
}

export async function updateNibbleStatus(
  id: string,
  status: string
): Promise<Nibble> {
  const [nibble] = await db
    .update(nibbles)
    .set({ status: "complete" })
    .where(eq(nibbles.id, id))
    .returning();

  return nibble;
}
