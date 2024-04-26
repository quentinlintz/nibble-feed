"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Nibble, nibbles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { getUser, deductCredits } from "./user";
import { NIBBLE_CREDIT_COST } from "@/constants";
import { formatTopic } from "@/lib/langchain";
import { qstashClient } from "@/lib/qstash";

interface CreateNibbleParams {
  topic: string;
}

export async function createNibble(
  params: CreateNibbleParams
): Promise<Nibble> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect(paths.signIn());
  }

  const user = await getUser(userId);

  if (user.credits < NIBBLE_CREDIT_COST) {
    throw new Error("You do not have enough credits to create a Nibble.");
  }

  const topic = await formatTopic(params.topic);

  const [nibble] = await db
    .insert(nibbles)
    .values({
      topic,
      userId,
      status: "creating",
    })
    .returning();

  const stepTypes = ["text", "flashcard", "quiz", "summary"];
  await Promise.all(
    stepTypes.map((stepType, index) =>
      qstashClient.publishJSON({
        url: `${process.env.APP_URL}/api/step`,
        body: {
          nibbleId: nibble.id,
          stepNumber: index + 1,
          topic,
          stepType,
        },
      })
    )
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

  return db.select().from(nibbles).where(eq(nibbles.userId, userId));
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
