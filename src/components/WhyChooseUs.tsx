"use client";

import React from "react";
import { ShieldCheck, HardHat, Headphones } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section
      style={{
        padding: "72px 0",
        background: "#FAFAFA",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div className="container">
        {/* Section Header: Steel-Blue plain uppercase label, NO pill */}
        <div className="section-header" style={{ marginBottom: "48px" }}>
          <span className="section-tag">THE NEW ADHIKARI TRADERS ADVANTAGE</span>
          <h2 className="section-title">Why Kathmandu Trusts Us</h2>
          <p className="section-subtitle">
            Reliable hardware procurement built on two decades of integrity, rapid site delivery, and genuine brands.
          </p>
        </div>

        {/* Varied Layout: 3 Stat Counters + 3 Inline Unboxed Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="trust-grid"
        >
          {/* Left Column: 3 Stat / Number Counters */}
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
                  color: "#1C1C1E",
                  lineHeight: "1",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                20+ <span style={{ fontSize: "20px", fontWeight: 700, color: "#4A6572" }}>Years</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                Two Decades in Hardware Distribution
              </div>
              <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: "1.5" }}>
                Supplying verified construction materials, power tools, and industrial fittings since 2004 from our Kathmandu central depot.
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
                  color: "#1C1C1E",
                  lineHeight: "1",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                2,400+ <span style={{ fontSize: "20px", fontWeight: 700, color: "#4A6572" }}>Orders</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                Verified Site Deliveries Completed
              </div>
              <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: "1.5" }}>
                Direct mini-truck and van dispatches delivered to residential construction gates, civil contractors, and workshop counters across Kathmandu Valley.
              </p>
            </div>

            {/* Stat 3 */}
            <div>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                100% <span style={{ fontSize: "20px", fontWeight: 700, color: "#4A6572" }}>Tax Invoiced</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                Official 13% Government VAT Bills
              </div>
              <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: "1.5" }}>
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
                <ShieldCheck size={22} color="#4A6572" />
              </div>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1C1C1E", marginBottom: "6px" }}>
                  100% Manufacturer Genuine Guarantee
                </h3>
                <p style={{ fontSize: "14px", color: "#3A3A3C", lineHeight: "1.6" }}>
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
                <HardHat size={22} color="#4A6572" />
              </div>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1C1C1E", marginBottom: "6px" }}>
                  Contractor Wholesale Rates &amp; Quotations
                </h3>
                <p style={{ fontSize: "14px", color: "#3A3A3C", lineHeight: "1.6" }}>
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
                <Headphones size={22} color="#4A6572" />
              </div>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1C1C1E", marginBottom: "6px" }}>
                  Master Technical Material Sizing
                </h3>
                <p style={{ fontSize: "14px", color: "#3A3A3C", lineHeight: "1.6" }}>
                  Consult our veteran Kathmandu store staff to accurately calculate pipe diameters, circuit breaker ratings, and primer square footage prior to ordering.
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
