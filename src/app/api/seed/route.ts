import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed-db";

export async function POST() {
  try {
    const results = await seedDatabase();
    return NextResponse.json({
      success: true,
      message: "Neon Database seeded successfully!",
      results,
    });
  } catch (error) {
    console.error("POST /api/seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Database seeding failed",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
