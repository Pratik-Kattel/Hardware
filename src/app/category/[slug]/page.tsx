import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategories, getCategoryBySlug, getStoreInfo } from "@/lib/db-service";
import { ProductCard } from "@/components/ProductCard";
import {
  ChevronRight,
  HardHat,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Package,
} from "lucide-react";
import { Product } from "@/types";

export const revalidate = 60; // ISR cache for 60 seconds

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug || category.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const storeInfo = await getStoreInfo();

  if (!category) {
    return {
      title: "Category Not Found | New Adhikari Traders",
    };
  }

  const nepaliName = category.nameNp || (category as any).nepaliName || "";
  const subcategories = (category as any).popularSubcategories || [];

  return {
    title: `${category.name} in Kathmandu | ${storeInfo.businessName}`,
    description: `${category.description || category.name} Genuine wholesale & retail stock with direct site delivery across Kathmandu Valley. Phone: ${storeInfo.phone}.`,
    keywords: [
      category.name,
      nepaliName,
      ...subcategories,
      "Kathmandu hardware",
      storeInfo.businessName,
    ],
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, allCategories, storeInfo] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getStoreInfo(),
  ]);

  if (!category) {
    notFound();
  }

  const rawProducts = (category as any).products || [];
  const categoryProducts: Product[] = rawProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    brand: p.brand?.name || p.brand || "Authorized",
    category: category.slug as any,
    subcategory: p.subcategory || "",
    price: p.price,
    originalPrice: p.compareAtPrice || p.originalPrice,
    compareAtPrice: p.compareAtPrice,
    discountPercent: p.deals?.[0]?.discountPercent || (p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : 0),
    rating: p.ratingAvg || p.rating || 5.0,
    reviewsCount: p.ratingCount || p.reviewsCount || 10,
    inStock: p.isInStock ?? p.inStock ?? true,
    stockCount: p.stockQuantity ?? p.stockCount ?? 8,
    sku: p.sku,
    unit: p.unit || "Piece",
    description: p.description || "",
    specifications: p.technicalSpecs || p.specifications || {},
    images: Array.isArray(p.images)
      ? p.images.map((img: any) => (typeof img === "string" ? img : img.imageUrl))
      : ["/images/placeholder.webp"],
    tags: p.tags || [category.name],
  }));

  const subcategories = (category as any).popularSubcategories || [];
  const nepaliName = category.nameNp || (category as any).nepaliName;

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* Category Hero / Header */}
      <div
        style={{
          background: "#1E293B",
          color: "#FFFFFF",
          padding: "36px 0 42px 0",
          borderBottom: "1px solid #334155",
        }}
      >
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#94A3B8",
              marginBottom: "16px",
            }}
          >
            <Link
              href="/"
              style={{ color: "#CBD5E1", textDecoration: "none", transition: "color 0.15s" }}
            >
              Home
            </Link>
            <ChevronRight size={13} />
            <Link
              href="/products"
              style={{ color: "#CBD5E1", textDecoration: "none", transition: "color 0.15s" }}
            >
              Hardware Catalog
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{category.name}</span>
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "12px",
                }}
              >
                <HardHat size={13} color="#CBD5E1" />
                <span>Kathmandu Warehouse Department</span>
              </div>

              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: "1.15",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span>{category.name}</span>
                {nepaliName && (
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "#94A3B8",
                    }}
                  >
                    ({nepaliName})
                  </span>
                )}
              </h1>

              <p
                style={{
                  fontSize: "15px",
                  color: "#CBD5E1",
                  lineHeight: "1.6",
                  margin: "0 0 20px 0",
                }}
              >
                {category.description}
              </p>

              {/* Subcategory Filter Pills */}
              {subcategories.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {subcategories.map((sub: string) => (
                    <span
                      key={sub}
                      style={{
                        fontSize: "12px",
                        color: "#E2E8F0",
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        padding: "4px 12px",
                        borderRadius: "var(--radius-sm)",
                        fontWeight: 500,
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Guarantees Box */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "var(--radius-md)",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                minWidth: "260px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                <ShieldCheck size={18} color="#94A3B8" />
                <span style={{ color: "#E2E8F0" }}>100% Genuine Brand Stock</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                <Truck size={18} color="#94A3B8" />
                <span style={{ color: "#E2E8F0" }}>Site Delivery in Valley</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                <CheckCircle2 size={18} color="#94A3B8" />
                <span style={{ color: "#E2E8F0" }}>Official Manufacturer Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: "36px" }}>
        {/* Section Title & Product Count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "12px",
            paddingBottom: "16px",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1C1C1E", margin: "0 0 4px 0" }}>
              Available Products in {category.name}
            </h2>
            <div style={{ fontSize: "13px", color: "#6E6E73" }}>
              Showing {categoryProducts.length} verified products with real-time stock
            </div>
          </div>

          <Link
            href="/products"
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#4A6572",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "var(--radius-sm)",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
            }}
          >
            <span>View All Hardware Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product Cards Grid */}
        {categoryProducts.length === 0 ? (
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "var(--radius-lg)",
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1C1C1E", marginBottom: "8px" }}>
              Direct Stock Arrival in Progress
            </h3>
            <p style={{ fontSize: "14px", color: "#6E6E73", maxWidth: "420px", margin: "0 auto 20px auto" }}>
              Our {category.name} inventory is actively being cataloged from the warehouse. Call our supply desk directly for instantaneous availability.
            </p>
            <a
              href={`tel:${storeInfo.phone.replace(/[^0-9]/g, "")}`}
              className="btn btn-primary"
              style={{
                background: "#4A6572",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
              }}
            >
              Call {storeInfo.phone}
            </a>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
              marginBottom: "48px",
            }}
          >
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}

        {/* Bottom Procurement Banner */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "var(--radius-lg)",
            padding: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#4A6572",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "4px",
              }}
            >
              Direct Contractor Procurement
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", margin: "0 0 6px 0" }}>
              Need bulk quantities for a construction or renovation site?
            </h3>
            <p style={{ fontSize: "13px", color: "#6E6E73", margin: 0, lineHeight: "1.5" }}>
              {storeInfo.businessName} provides direct site delivery and volume-discounted wholesale prices for building contractors, plumbers, electricians, and interior fabricators in Kathmandu Valley.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={`tel:${storeInfo.phone.replace(/[^0-9]/g, "")}`}
              className="btn btn-outline"
              style={{
                borderColor: "#4A6572",
                color: "#4A6572",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Call {storeInfo.phone}
            </a>
            <Link
              href="/account/orders"
              className="btn btn-primary"
              style={{
                background: "#4A6572",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                minHeight: "44px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <Package size={16} />
              <span>My Orders</span>
            </Link>
          </div>
        </div>

        {/* Other Categories Explorer */}
        <div style={{ marginTop: "48px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#1C1C1E",
              marginBottom: "16px",
            }}
          >
            Explore Other Hardware Departments
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "12px",
            }}
          >
            {allCategories
              .filter((c) => (c.slug || c.id) !== (category.slug || category.id))
              .map((otherCat) => (
                <Link
                  key={otherCat.slug || otherCat.id}
                  href={`/category/${otherCat.slug || otherCat.id}`}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "var(--radius-md)",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1C1C1E" }}>
                      {otherCat.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "#6E6E73" }}>
                      {otherCat.productCount} Products
                    </div>
                  </div>
                  <ArrowRight size={14} color="#4A6572" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
