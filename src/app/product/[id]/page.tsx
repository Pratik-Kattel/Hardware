import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlugOrId, getProducts, getStoreInfo } from "@/lib/db-service";
import { ProductDetailClient } from "./ProductDetailClient";
import { Product } from "@/types";

export const revalidate = 60; // ISR cache 60s

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const result = await getProducts({ limit: 50 });
  return (result.products || []).map((product) => ({
    id: product.slug || product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const [product, storeInfo] = await Promise.all([
    getProductBySlugOrId(id),
    getStoreInfo(),
  ]);

  if (!product) {
    return {
      title: `Product Not Found | ${storeInfo.businessName}`,
    };
  }

  const brandName = (product as any).brand?.name || (product as any).brand || "Hardware";
  const categoryName = (product as any).category?.name || (product as any).category || "Hardware";

  return {
    title: `${product.name} | NPR ${product.price.toLocaleString()} | ${storeInfo.businessName}`,
    description: `Buy ${product.name} (${brandName}) in Kathmandu, Nepal. NPR ${product.price.toLocaleString()}. Genuine product with warranty. Same-day site delivery across Kathmandu Valley. Phone: ${storeInfo.phone}.`,
    keywords: [
      product.name,
      brandName,
      categoryName,
      "Kathmandu Nepal",
      storeInfo.businessName,
    ],
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const productData = await getProductBySlugOrId(id);

  if (!productData) {
    notFound();
  }

  const categoryName = (productData as any).category?.name || (productData as any).category || "Hardware";

  const normalizedProduct: Product = {
    id: productData.id,
    name: productData.name,
    brand: (productData as any).brand?.name || (productData as any).brand || "Authorized",
    category: (productData as any).category?.slug || (productData as any).category || "power-tools",
    subcategory: (productData as any).subcategory || "",
    price: productData.price,
    originalPrice: productData.compareAtPrice || (productData as any).originalPrice,
    compareAtPrice: productData.compareAtPrice || undefined,
    discountPercent: (productData as any).deals?.[0]?.discountPercent || (productData.compareAtPrice ? Math.round(((productData.compareAtPrice - productData.price) / productData.compareAtPrice) * 100) : 0),
    rating: productData.ratingAvg || (productData as any).rating || 5.0,
    reviewsCount: productData.ratingCount || (productData as any).reviewsCount || 10,
    inStock: productData.isInStock ?? (productData as any).inStock ?? true,
    stockCount: productData.stockQuantity ?? (productData as any).stockCount ?? 8,
    sku: productData.sku,
    unit: productData.unit || "Piece",
    description: productData.description || "",
    specifications: (productData.technicalSpecs as any) || (productData as any).specifications || {},
    images: Array.isArray(productData.images)
      ? productData.images.map((img: any) => (typeof img === "string" ? img : img.imageUrl))
      : ["/images/placeholder.webp"],
    tags: (productData as any).tags || [categoryName],
  };

  const rawRelated = (productData as any).relatedProducts || [];
  const relatedProducts: Product[] = rawRelated.map((p: any) => ({
    id: p.id,
    name: p.name,
    brand: p.brand?.name || p.brand || "Authorized",
    category: normalizedProduct.category,
    subcategory: p.subcategory || "",
    price: p.price,
    originalPrice: p.compareAtPrice || p.originalPrice,
    compareAtPrice: p.compareAtPrice,
    discountPercent: p.deals?.[0]?.discountPercent || (p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : 0),
    rating: p.ratingAvg || p.rating || 5.0,
    reviewsCount: p.ratingCount || p.reviewsCount || 8,
    inStock: p.isInStock ?? p.inStock ?? true,
    stockCount: p.stockQuantity ?? p.stockCount ?? 6,
    sku: p.sku,
    unit: p.unit || "Piece",
    description: p.description || "",
    specifications: p.technicalSpecs || p.specifications || {},
    images: Array.isArray(p.images)
      ? p.images.map((img: any) => (typeof img === "string" ? img : img.imageUrl))
      : ["/images/placeholder.webp"],
    tags: p.tags || [],
  }));

  return (
    <ProductDetailClient
      product={normalizedProduct}
      categoryName={categoryName}
      relatedProducts={relatedProducts}
    />
  );
}
