"use server";

import { db } from "@/db";
import { User, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getUser(id: string): Promise<User> {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function deductCredits(
  userId: string,
  amount: number
): Promise<void> {
  if (amount < 0) {
    throw new Error("Invalid amount");
  }

  await db
    .update(users)
    .set({ credits: sql`${users.credits} - ${amount}` })
    .where(eq(users.id, userId));
}
