"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Nibble, nibbles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { getUser, deductCredits } from "./user";

const NIBBLE_CREDIT_COST = 5;

interface CreateNibbleParams {
  topic: string;
}

export async function createNibble(params: CreateNibbleParams): Promise<void> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect(paths.signIn());
  }

  // Deduct the user's credit balance
  const user = await getUser(userId);

  if (user.credits < NIBBLE_CREDIT_COST) {
    throw new Error("Insufficient credits");
  }

  const [{ nibbleId }] = await db
    .insert(nibbles)
    .values({
      topic: params.topic,
      userId,
      status: "creating",
    })
    .returning({ nibbleId: nibbles.id });

  await deductCredits(userId, NIBBLE_CREDIT_COST);

  await redirect(paths.nibblesShow(nibbleId));
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
