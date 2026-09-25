import { NextRequest, NextResponse } from "next/server";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "@/lib/db-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "guest-session";

    const items = await getCart(userId);
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "guest-session", productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const item = await addToCart(userId, productId, quantity);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "guest-session", productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { error: "productId and quantity are required" },
        { status: 400 }
      );
    }

    const result = await updateCartQuantity(userId, productId, quantity);
    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH /api/cart error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get("userId");
    let productId = searchParams.get("productId");
    let clearAll = searchParams.get("clearAll") === "true";

    try {
      const body = await request.json();
      userId = body.userId || userId;
      productId = body.productId || productId;
      if (body.clearAll) clearAll = true;
    } catch {
      // no body
    }

    const effectiveUserId = userId || "guest-session";

    if (clearAll) {
      const result = await clearCart(effectiveUserId);
      return NextResponse.json(result);
    }

    if (!productId) {
      return NextResponse.json({ error: "productId or clearAll required" }, { status: 400 });
    }

    const result = await removeFromCart(effectiveUserId, productId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}
