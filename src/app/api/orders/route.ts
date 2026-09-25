import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrdersByUserOrPhone } from "@/lib/db-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || searchParams.get("phone");

    if (!userId) {
      return NextResponse.json(
        { error: "userId or phone query parameter required" },
        { status: 400 }
      );
    }

    const orders = await getOrdersByUserOrPhone(userId);
    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      phone,
      deliveryAddress,
      landmark,
      deliveryFee = 0,
      subtotal,
      total,
      userId,
      items,
    } = body;

    if (!customerName || !phone || !deliveryAddress || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required order fields: customerName, phone, deliveryAddress, items" },
        { status: 400 }
      );
    }

    const order = await createOrder({
      customerName,
      phone,
      deliveryAddress,
      landmark,
      deliveryFee,
      subtotal: subtotal || items.reduce((acc: number, item: any) => acc + item.unitPrice * item.quantity, 0),
      total: total || subtotal + deliveryFee,
      userId,
      items,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
