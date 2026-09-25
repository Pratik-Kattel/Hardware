import { NextResponse } from "next/server";
import { getHeroSlides } from "@/lib/db-service";

export const revalidate = 60;

export async function GET() {
  try {
    const slides = await getHeroSlides();
    return NextResponse.json(slides, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/hero-slides error:", error);
    return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
  }
}
