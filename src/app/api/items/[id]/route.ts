import { NextRequest, NextResponse } from "next/server";
import { db, delay } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> }; // Next 15: params는 Promise

export async function GET(_req: NextRequest, ctx: Ctx) {
  await delay();
  const { id } = await ctx.params;
  const item = db.get(Number(id));
  if (!item) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  await delay();
  const { id } = await ctx.params;
  const item = db.update(Number(id), await req.json());
  if (!item) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  await delay();
  const { id } = await ctx.params;
  if (!db.remove(Number(id))) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
