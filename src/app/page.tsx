"use client";

import React from "react";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BestDeals } from "@/components/BestDeals";
import { ProductCard } from "@/components/ProductCard";
import { BrandShowcase } from "@/components/BrandShowcase";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactCTASection } from "@/components/ContactCTASection";
import { StoreLocationSection } from "@/components/StoreLocationSection";
import { PRODUCTS } from "@/data/products";
import { ArrowRight, Sparkles, HardHat, ShieldCheck, Truck } from "lucide-react";

export default function HomePage() {
  // 8 Curated Featured Hardware Products for Homepage Overview
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <>
      {/* 1. Hero Section with Quick CTAs & Value Props */}
      <HeroSection />

      {/* 2. Shop By Category Grid (Links out to /category/[slug]) */}
      <CategoryGrid />

      {/* 3. Flash Deals & Limited Stock Countdown (Links to /product/[id]) */}
      <BestDeals />

      {/* 4. Featured Hardware Essentials Overview (Links OUT to /products) */}
      <section
        style={{
          padding: "64px 0",
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <span className="section-tag">Direct Contractor Stock</span>
              <h2 className="section-title">Featured Hardware Essentials</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>
                Kathmandu&apos;s most requested power tools, industrial adhesives, CPVC pipes, and luxury finishes.
              </p>
            </div>

            <Link
              href="/products"
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#4A6572",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                background: "rgba(74, 101, 114, 0.08)",
                transition: "all 0.15s",
              }}
            >
              <span>View All {PRODUCTS.length} Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Featured 8 Products Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {/* Prominent Outbound Link Callout to Complete Catalog */}
          <div
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "var(--radius-lg)",
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ maxWidth: "620px" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--accent-steel)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "4px",
                }}
              >
                Comprehensive Kathmandu Warehouse Inventory
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", margin: "0 0 6px 0" }}>
                Looking for specific fasteners, conduit fittings, or architectural paints?
              </h3>
              <p style={{ fontSize: "13px", color: "#64748B", margin: 0, lineHeight: "1.5" }}>
                Browse our full catalog with advanced filters for 11+ categories, manufacturer brands, price ranges, and immediate site dispatch availability.
              </p>
            </div>

            <Link
              href="/products"
              className="btn btn-primary btn-lg"
              style={{
                background: "#4A6572",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 700,
                padding: "12px 24px",
                textDecoration: "none",
              }}
            >
              <span>Explore Complete Hardware Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Authorized Brands Showcase (Links to /products?brand=...) */}
      <BrandShowcase />

      {/* 6. Why Choose Adhikari Hardware Trust Pillars */}
      <WhyChooseUs />

      {/* 7. Verified Customer & Contractor Reviews */}
      <ReviewsSection />

      {/* 8. Contact & Site Delivery Helpline Section */}
      <ContactCTASection />

      {/* 9. Google Map + Store Location Section */}
      <StoreLocationSection />
    </>
  );
}
