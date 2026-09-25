import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import {
  ChevronRight,
  HardHat,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  SlidersHorizontal,
  Package,
} from "lucide-react";
import { ProductCategory } from "@/types";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.id === slug);

  if (!category) {
    return {
      title: "Category Not Found | New Adhikari Traders",
    };
  }

  return {
    title: `${category.name} in Kathmandu | New Adhikari Traders`,
    description: `${category.description} Genuine wholesale & retail stock with direct site delivery across Kathmandu Valley. Phone: 985-1145065.`,
    keywords: [
      category.name,
      category.nepaliName || "",
      ...category.popularSubcategories,
      "Kathmandu hardware",
      "New Adhikari Traders",
    ],
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  // Find all products matching this category
  const categoryProducts = PRODUCTS.filter((p) => p.category === category.id);

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
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#94A3B8",
                  marginBottom: "8px",
                }}
              >
                <span>Department</span>
                {category.nepaliName && (
                  <span style={{ color: "var(--accent-steel)" }}>• {category.nepaliName}</span>
                )}
              </div>

              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  marginBottom: "10px",
                  lineHeight: "1.2",
                }}
              >
                {category.name}
              </h1>

              <p
                style={{
                  fontSize: "15px",
                  color: "#CBD5E1",
                  lineHeight: "1.6",
                  marginBottom: "18px",
                }}
              >
                {category.description}
              </p>

              {/* Trust Badges Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  fontSize: "12px",
                  color: "#94A3B8",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={16} color="var(--accent-steel)" />
                  <span>100% Genuine Authorized Stock</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Truck size={16} color="var(--accent-steel)" />
                  <span>Same-Day Site Delivery in Kathmandu Valley</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Box */}
            <div
              style={{
                background: "#0F172A",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                minWidth: "220px",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", fontWeight: 700 }}>
                Inventory Status
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: "4px 0",
                }}
              >
                {categoryProducts.length} Items
              </div>
              <div style={{ fontSize: "12px", color: "#64748B", display: "flex", alignItems: "center", gap: "4px" }}>
                <CheckCircle2 size={13} color="#22C55E" />
                <span>Ready for Instant Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategories Filter Pills Bar */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "14px 0",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#6E6E73",
                textTransform: "uppercase",
                marginRight: "6px",
                flexShrink: 0,
              }}
            >
              Subcategories:
            </span>

            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#FFFFFF",
                background: "#4A6572",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              All {category.name} ({categoryProducts.length})
            </span>

            {category.popularSubcategories.map((sub) => (
              <span
                key={sub}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#3A3A3C",
                  background: "#F4F4F6",
                  border: "1px solid #E5E7EB",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Product Grid Container */}
      <div className="container" style={{ marginTop: "36px" }}>
        {/* Active Grid Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#1C1C1E",
                margin: 0,
              }}
            >
              Available Products in {category.name}
            </h2>
            <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "2px" }}>
              Showing {categoryProducts.length} verified products with direct wholesale &amp; retail pricing
            </div>
          </div>

          <Link
            href="/products"
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#4A6572",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>Explore All 300+ Hardware Items</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product Cards Grid */}
        {categoryProducts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #E5E7EB",
              padding: "60px 24px",
              textAlign: "center",
            }}
          >
            <SlidersHorizontal size={40} color="#9CA3AF" style={{ margin: "0 auto 16px auto" }} />
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1C1C1E", marginBottom: "8px" }}>
              Stock Update in Progress
            </h3>
            <p style={{ fontSize: "14px", color: "#6E6E73", maxWidth: "460px", margin: "0 auto 20px auto" }}>
              Additional inventory items for {category.name} are being added daily to our Kathmandu store catalog.
            </p>
            <Link href="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        )}

        {/* Contractor Bulk Quote CTA Callout Card */}
        <div
          style={{
            marginTop: "48px",
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
          <div style={{ maxWidth: "600px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--accent-steel)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "4px",
              }}
            >
              Contractor &amp; Project Supply Desk
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1C1C1E", marginBottom: "6px" }}>
              Ordering {category.name} in Bulk for Site Work?
            </h3>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
              New Adhikari Traders provides direct site delivery, official 13% VAT bills, and volume-discounted wholesale prices for building contractors, plumbers, electricians, and interior fabricators in Kathmandu Valley.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="tel:9851145065"
              className="btn btn-outline"
              style={{
                borderColor: "#4A6572",
                color: "#4A6572",
                fontWeight: 700,
              }}
            >
              Call 985-1145065
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
            {CATEGORIES.filter((c) => c.id !== category.id).map((otherCat) => (
              <Link
                key={otherCat.id}
                href={`/category/${otherCat.id}`}
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
