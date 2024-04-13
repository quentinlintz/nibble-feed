"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Nibble, nibbles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

interface CreateNibbleParams {
  topic: string;
}

export async function createNibble(params: CreateNibbleParams) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not found.");
  }

  db.insert(nibbles).values({
    topic: params.topic,
    userId,
    status: "creating",
  });
}

export async function getNibbles(): Promise<Nibble[]> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/nibbles");
  }

  return db.select().from(nibbles).where(eq(nibbles.userId, userId));
}

export async function getNibble(id: string): Promise<Nibble> {
  const result = await db.select().from(nibbles).where(eq(nibbles.id, id));

  if (result.length === 0) {
    notFound();
  }

  return result[0];
}
