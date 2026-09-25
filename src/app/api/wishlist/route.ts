import { NextRequest, NextResponse } from "next/server";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/lib/db-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "guest-session";

    const items = await getWishlist(userId);
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/wishlist error:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "guest-session", productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const item = await addToWishlist(userId, productId);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/wishlist error:", error);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get("userId");
    let productId = searchParams.get("productId");

    if (!productId) {
      try {
        const body = await request.json();
        userId = body.userId || userId;
        productId = body.productId || productId;
      } catch {
        // no body
      }
    }

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const result = await removeFromWishlist(userId || "guest-session", productId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE /api/wishlist error:", error);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
