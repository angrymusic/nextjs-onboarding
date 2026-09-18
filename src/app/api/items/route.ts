import { NextRequest, NextResponse } from "next/server";
import { db, delay, type Item } from "@/lib/db";

// GET /api/items?page=1&pageSize=10&sort=price&desc=true
export async function GET(req: NextRequest) {
  await delay();
  const sp = req.nextUrl.searchParams;
  const result = db.list({
    page: Number(sp.get("page") ?? 1),
    pageSize: Number(sp.get("pageSize") ?? 10),
    sort: (sp.get("sort") as keyof Item) ?? undefined,
    desc: sp.get("desc") === "true",
  });
  return NextResponse.json(result);
}

// POST /api/items  body: { name, category, price }
export async function POST(req: NextRequest) {
  await delay();
  const body = await req.json();
  if (!body?.name || !body?.category || typeof body?.price !== "number") {
    return NextResponse.json(
      { error: "name, category, price 필수" },
      { status: 400 },
    );
  }
  return NextResponse.json(db.create(body), { status: 201 });
}
