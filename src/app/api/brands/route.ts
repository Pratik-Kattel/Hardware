import { NextResponse } from "next/server";
import { getBrands } from "@/lib/db-service";

export const revalidate = 120; // 2 mins cache

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json(brands, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("GET /api/brands error:", error);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}
