import { NextRequest, NextResponse } from "next/server";
import { getCategoryBySlug } from "@/lib/db-service";

export const revalidate = 60; // ISR cache 60s

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/categories/[slug] error:", error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}
