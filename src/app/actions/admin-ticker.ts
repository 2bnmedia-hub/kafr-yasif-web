"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { tickerItems } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Unauthorized");
}

function afterTickerChange() {
  revalidatePath("/");
  revalidatePath("/admin/ticker");
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createTickerItemAction(formData: FormData) {
  await requireAdmin();
  const text = str(formData, "text");
  const href = str(formData, "href") || null;
  if (!text) return;

  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(tickerItems);
  await db.insert(tickerItems).values({ text, href, sortOrder: count });
  afterTickerChange();
}

export async function updateTickerItemAction(id: number, formData: FormData) {
  await requireAdmin();
  const text = str(formData, "text");
  const href = str(formData, "href") || null;
  const active = formData.get("active") === "on";
  if (!text) return;

  await db.update(tickerItems).set({ text, href, active }).where(eq(tickerItems.id, id));
  afterTickerChange();
}

export async function deleteTickerItemAction(id: number) {
  await requireAdmin();
  await db.delete(tickerItems).where(eq(tickerItems.id, id));
  afterTickerChange();
}

export async function reorderTickerItemsAction(orderedIds: number[]) {
  await requireAdmin();
  await Promise.all(orderedIds.map((id, position) => db.update(tickerItems).set({ sortOrder: position }).where(eq(tickerItems.id, id))));
  afterTickerChange();
}
