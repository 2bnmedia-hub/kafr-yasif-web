import { NextResponse } from "next/server";
import { db } from "@/db";
import { pageViews } from "@/db/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { path?: string };
    const path = typeof body.path === "string" ? body.path.slice(0, 500) : "/";
    await db.insert(pageViews).values({ path });
    return NextResponse.json({ ok: true });
  } catch {
    // Analytics logging must never break the page — swallow errors.
    return NextResponse.json({ ok: false });
  }
}
