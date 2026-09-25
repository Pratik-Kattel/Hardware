import { NextResponse } from "next/server";
import { getCategories } from "@/lib/db-service";

export const revalidate = 60; // ISR cache 60s

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
