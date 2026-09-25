import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductDetailClient } from "./ProductDetailClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | New Adhikari Traders",
    };
  }

  const category = CATEGORIES.find((c) => c.id === product.category);

  return {
    title: `${product.name} | NPR ${product.price.toLocaleString()} | New Adhikari Traders`,
    description: `Buy ${product.name} (${product.brand}) in Kathmandu, Nepal. NPR ${product.price.toLocaleString()}. Genuine product with warranty. Same-day site delivery across Kathmandu Valley. Phone: 985-1145065.`,
    keywords: [
      product.name,
      product.brand,
      product.subcategory,
      category ? category.name : "Hardware",
      "Kathmandu Nepal",
      "New Adhikari Traders",
    ],
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.id === product.category);
  const categoryName = category ? category.name : product.category;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <ProductDetailClient
      product={product}
      categoryName={categoryName}
      relatedProducts={relatedProducts}
    />
  );
}
