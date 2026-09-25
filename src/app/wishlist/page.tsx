import React from "react";
import { Metadata } from "next";
import { WishlistClient } from "./WishlistClient";

export const metadata: Metadata = {
  title: "My Wishlist | New Adhikari Traders Kathmandu",
  description:
    "View your saved power tools, plumbing fixtures, electrical cables, and construction supplies for easy reordering at New Adhikari Traders, Kathmandu.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
