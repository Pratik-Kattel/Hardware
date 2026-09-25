import React from "react";
import { Metadata } from "next";
import { OrdersListClient } from "./OrdersListClient";

export const metadata: Metadata = {
  title: "My Orders | New Adhikari Traders Kathmandu",
  description:
    "Review your hardware purchases, view delivery timelines, download tax invoices, and reorder site supplies from New Adhikari Traders, Kathmandu.",
};

export default function AccountOrdersPage() {
  return <OrdersListClient />;
}
