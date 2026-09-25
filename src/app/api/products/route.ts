import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/db-service";

export const revalidate = 60; // ISR cache 60s

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") || undefined;
    const brand = searchParams.get("brand") || undefined;
    const q = searchParams.get("q") || undefined;
    const sort = (searchParams.get("sort") as any) || "featured";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const minPrice = searchParams.has("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.has("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;
    const inStock = searchParams.has("inStock")
      ? searchParams.get("inStock") === "true"
      : undefined;
    const isBestDeal = searchParams.has("isBestDeal")
      ? searchParams.get("isBestDeal") === "true"
      : undefined;

    const result = await getProducts({
      category,
      brand,
      minPrice,
      maxPrice,
      inStock,
      isBestDeal,
      q,
      sort,
      page,
      limit,
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
