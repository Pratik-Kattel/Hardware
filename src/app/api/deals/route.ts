import { NextResponse } from "next/server";
import { getDeals } from "@/lib/db-service";

export const revalidate = 60; // 60s cache

export async function GET() {
  try {
    const deals = await getDeals();
    return NextResponse.json(deals, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/deals error:", error);
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}
