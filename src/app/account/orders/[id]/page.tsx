import React from "react";
import { Metadata } from "next";
import { OrderDetailClient } from "./OrderDetailClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order #${id} Details | New Adhikari Traders`,
    description: `Track status, view delivery timeline, and inspect details for order #${id} at New Adhikari Traders, Kathmandu.`,
  };
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <OrderDetailClient orderId={id} />;
}
