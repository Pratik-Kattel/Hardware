import { NextRequest, NextResponse } from "next/server";
import { getSearchSuggestions } from "@/lib/db-service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    const suggestions = await getSearchSuggestions(q);
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json({ error: "Failed to fetch search suggestions" }, { status: 500 });
  }
}
