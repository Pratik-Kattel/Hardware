import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/db-service";

export const revalidate = 120;

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
