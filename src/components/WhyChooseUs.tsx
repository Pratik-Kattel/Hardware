"use client";

import React from "react";
import { ShieldCheck, HardHat, Headphones } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section
      style={{
        padding: "72px 0",
        background: "#F8F9FA",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div className="container">
        {/* Section Header: Plain uppercase label, NO pill background */}
        <div className="section-header" style={{ marginBottom: "48px" }}>
          <span className="section-tag">The Adhikari Hardware Advantage</span>
          <h2 className="section-title">Why Kathmandu Trusts Us</h2>
          <p className="section-subtitle">
            Reliable hardware procurement built on two decades of integrity, rapid site delivery, and genuine brands.
          </p>
        </div>

        {/* Varied Layout: 3 JP Engineering-style Stat Counters + 3 Inline Unboxed Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="trust-grid"
        >
          {/* Left Column: 3 Stat / Number Counters (JP Engineering Style) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            {/* Stat 1 */}
            <div
              style={{
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 800,
                  color: "#0F1B2D",
                  lineHeight: "1",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                20+ <span style={{ fontSize: "20px", fontWeight: 700, color: "#F15A24" }}>Years</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#0F1B2D", marginBottom: "4px" }}>
                Two Decades in Hardware Distribution
              </div>
              <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: "1.5" }}>
                Supplying verified construction materials, power tools, and industrial fittings since 2004 from our Kalanki central depot.
              </p>
            </div>

            {/* Stat 2 */}
            <div
              style={{
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 800,
                  color: "#0F1B2D",
                  lineHeight: "1",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                2,400+ <span style={{ fontSize: "20px", fontWeight: 700, color: "#F15A24" }}>Orders</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#0F1B2D", marginBottom: "4px" }}>
                Verified Site Deliveries Completed
              </div>
              <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: "1.5" }}>
                Direct mini-truck and van dispatches delivered to residential construction gates, civil contractors, and workshop counters across Kathmandu Valley.
              </p>
            </div>

            {/* Stat 3 */}
            <div>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 800,
                  color: "#0F1B2D",
                  lineHeight: "1",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                100% <span style={{ fontSize: "20px", fontWeight: 700, color: "#F15A24" }}>Tax Invoiced</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#0F1B2D", marginBottom: "4px" }}>
                Official 13% Government VAT Bills
              </div>
              <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: "1.5" }}>
                Fully compliant IRD billing with verifiable PAN (602918239) for audit-ready contractor accounting and transparent wholesale purchases.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Inline Features (Icon + Text Inline, NOT Boxed Cards) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              paddingLeft: "16px",
              borderLeft: "1px solid #E5E7EB",
            }}
            className="inline-features-col"
          >
            {/* Feature 1 */}
            <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-md)",
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <ShieldCheck size={22} color="#F15A24" />
              </div>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0F1B2D", marginBottom: "6px" }}>
                  100% Manufacturer Genuine Guarantee
                </h3>
                <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.6" }}>
                  Zero counterfeits. Direct manufacturer warranties with verifiable serial numbers on every Bosch, Makita, DeWalt, and Astral item.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-md)",
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <HardHat size={22} color="#F15A24" />
              </div>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0F1B2D", marginBottom: "6px" }}>
                  Contractor Wholesale Rates &amp; Quotations
                </h3>
                <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.6" }}>
                  Tiered commercial pricing and fast turnaround quotations for civil engineers, licensed master plumbers, and certified electricians.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-md)",
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <Headphones size={22} color="#F15A24" />
              </div>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0F1B2D", marginBottom: "6px" }}>
                  Master Technical Material Sizing
                </h3>
                <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.6" }}>
                  Consult our veteran Kalanki store staff to accurately calculate pipe diameters, circuit breaker ratings, and primer square footage prior to ordering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .trust-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .inline-features-col {
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid #E5E7EB;
            padding-top: 32px;
          }
        }
      `}</style>
    </section>
  );
}
