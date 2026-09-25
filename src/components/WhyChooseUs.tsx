"use client";

import React from "react";
import { ShieldCheck, HardHat, Headphones } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function WhyChooseUs() {
  const { storeInfo } = useStore();

  const yearsInBusiness = storeInfo?.stats?.yearsInBusiness || new Date().getFullYear() - 1998;
  const ordersDelivered = storeInfo?.stats?.ordersDelivered || 15400;

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
            Reliable hardware procurement built on decades of integrity, rapid site delivery, and genuine brands.
          </p>
        </div>

        {/* Varied Layout: 2 Stat Counters + 3 Inline Unboxed Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="trust-grid"
        >
          {/* Left Column: 2 Stat / Number Counters from Neon DB */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "36px",
            }}
          >
            {/* Stat 1 */}
            <div
              style={{
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "32px",
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
                {yearsInBusiness}+ <span style={{ fontSize: "20px", fontWeight: 700, color: "#4A6572" }}>Years</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                Decades in Hardware Distribution
              </div>
              <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: "1.5", margin: 0 }}>
                Supplying verified construction materials, power tools, and industrial fittings since 1998 from our Kathmandu central depot.
              </p>
            </div>

            {/* Stat 2 */}
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
                {ordersDelivered.toLocaleString()}+ <span style={{ fontSize: "20px", fontWeight: 700, color: "#4A6572" }}>Orders</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                Verified Site Deliveries Completed
              </div>
              <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: "1.5", margin: 0 }}>
                Direct mini-truck and van dispatches delivered to residential construction gates, civil contractors, and workshop counters across Kathmandu Valley.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Inline Features */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              paddingLeft: "16px",
              borderLeft: "1px solid #E5E7EB",
            }}
            className="trust-features-col"
          >
            {/* Feature 1 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
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
                  color: "#4A6572",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                  100% Genuine Manufacturer Guarantee
                </h3>
                <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: "1.5", margin: 0 }}>
                  Every power tool and electrical item comes with verifiable serial numbers, authorized Nepal distributor warranty cards, and genuine spare parts availability.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
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
                  color: "#4A6572",
                  flexShrink: 0,
                }}
              >
                <HardHat size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                  Contractor Wholesale Pricing
                </h3>
                <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: "1.5", margin: 0 }}>
                  Volume tier discounts for builders, licensed plumbers, electricians, and sub-contractors with dedicated credit and payment terms.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
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
                  color: "#4A6572",
                  flexShrink: 0,
                }}
              >
                <Headphones size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                  Technical Material Consultation
                </h3>
                <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: "1.5", margin: 0 }}>
                  Experienced hardware specialists to guide material take-offs, CPVC pipe sizing, electrical load requirements, and industrial adhesive selection.
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
          .trust-features-col {
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid #E5E7EB !important;
            padding-top: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
