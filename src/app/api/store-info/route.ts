import { NextResponse } from "next/server";
import { getStoreInfo } from "@/lib/db-service";

export const revalidate = 60;

export async function GET() {
  try {
    const storeInfo = await getStoreInfo();
    return NextResponse.json(storeInfo, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/store-info error:", error);
    return NextResponse.json({ error: "Failed to fetch store info" }, { status: 500 });
  }
}
