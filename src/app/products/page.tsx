import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ChevronRight, ShieldCheck, Truck, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Complete Hardware & Tools Inventory | New Adhikari Traders Kathmandu",
  description:
    "Browse over 300+ genuine hardware products: Bosch power tools, Taparia hand tools, Astral pipes, Asian Paints, and cement in Kathmandu Nepal. Direct site delivery. Phone: 985-1145065.",
};

export default function ProductsPage() {
  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* Header Banner */}
      <div
        style={{
          background: "#1E293B",
          color: "#FFFFFF",
          padding: "36px 0 40px 0",
          borderBottom: "1px solid #334155",
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#94A3B8",
              marginBottom: "14px",
            }}
          >
            <Link
              href="/"
              style={{ color: "#CBD5E1", textDecoration: "none" }}
            >
              Home
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>Hardware Catalog</span>
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#94A3B8",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Store Inventory &amp; Wholesale Supplies
              </span>
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  marginBottom: "8px",
                }}
              >
                Complete Hardware Catalog
              </h1>
              <p style={{ fontSize: "14px", color: "#CBD5E1", maxWidth: "600px" }}>
                Filter across 11+ hardware departments, certified brands (Bosch, Makita, Astral, Asian Paints), and instant dispatch availability in Kathmandu Valley.
              </p>
            </div>

            {/* Quick Guarantees */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "12px",
                color: "#CBD5E1",
                background: "rgba(15, 23, 42, 0.6)",
                padding: "10px 18px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={16} color="var(--accent-steel)" />
                <span>100% Genuine</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Truck size={16} color="var(--accent-steel)" />
                <span>Same-Day Site Delivery</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={16} color="var(--accent-steel)" />
                <span>Open Daily 7AM – 8PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Body with Suspense */}
      <Suspense
        fallback={
          <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
            <div style={{ fontSize: "15px", color: "#6E6E73", fontWeight: 600 }}>
              Loading Hardware Catalog...
            </div>
          </div>
        }
      >
        <ProductCatalog />
      </Suspense>
    </div>
  );
}
