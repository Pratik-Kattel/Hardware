"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import {
  Wrench,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { ProductCategory } from "@/types";

export function Footer() {
  const { setSelectedCategory, openModal } = useStore();

  const handleCategoryNav = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    const shopEl = document.getElementById("shop-section");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        background: "#1C1C1E",
        color: "#D1D5DB",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        paddingTop: "56px",
        paddingBottom: "32px",
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1.1fr",
            gap: "40px",
            marginBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Store Story */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "var(--radius-sm)",
                  background: "#2C2C2E",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4A6572",
                }}
              >
                <Wrench size={19} />
              </div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                <span>ADHIKARI</span>{" "}
                <span style={{ color: "#4A6572" }}>HARDWARE</span>
              </div>
            </div>

            <p style={{ fontSize: "13px", color: "#9CA3AF", lineHeight: "1.65", marginBottom: "18px" }}>
              Adhikari Hardware is Nepal&apos;s leading hardware store and building materials distributor located in Kalanki, Kathmandu. Serving contractors, tradesmen, and builders with genuine tools, electrical supplies, pipes, and official 13% VAT invoices.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <MapPin size={15} color="#4A6572" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>Kalanki Chowk, Ring Road, Kathmandu, Nepal</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={15} color="#4A6572" style={{ flexShrink: 0 }} />
                <a href="tel:9800000000" style={{ color: "#FFFFFF", fontWeight: 700 }}>
                  9800000000
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={15} color="#4A6572" style={{ flexShrink: 0 }} />
                <span>Open 7:00 AM – 8:00 PM (Daily)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Hardware Categories
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", fontSize: "13px" }}>
              <li>
                <button
                  onClick={() => handleCategoryNav("power-tools")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Power Tools (Bosch, Makita)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav("hand-tools")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Hand Tools (Stanley, Taparia)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav("plumbing")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Plumbing (Astral CPVC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav("electrical")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Electrical (Havells Pure Copper)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav("paint-supplies")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Paints (Asian Paints)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav("construction-materials")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Cement &amp; TMT Steel Rebars
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contractor Services & Orders */}
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Contractor &amp; Support
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", fontSize: "13px" }}>
              <li>
                <button
                  onClick={() => openModal("track_order")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Track Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal("request_quote")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Request Contractor Bulk Quote
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal("auth")}
                  style={{ color: "#D1D5DB", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Customer Account &amp; History
                </button>
              </li>
              <li>
                <a
                  href="#deals-section"
                  style={{ color: "#C1512D", fontWeight: 600 }}
                >
                  Weekly Flash Deals
                </a>
              </li>
              <li>
                <span style={{ color: "#9CA3AF" }}>Kathmandu Valley Same-Day Dispatch</span>
              </li>
              <li>
                <span style={{ color: "#9CA3AF" }}>Official 13% VAT Invoices</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Nepal Payment Partners as Plain Logo Chips (NO colored pill backgrounds) */}
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Payment Methods
            </div>
            <p style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: "1.5", marginBottom: "14px" }}>
              We accept direct digital payments or Cash on Delivery at your construction site.
            </p>

            {/* Plain Logo Chips (NO colored pill backgrounds) */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
              <span
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                eSewa
              </span>

              <span
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Khalti
              </span>

              <span
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Fonepay QR
              </span>

              <span
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Cash on Delivery
              </span>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 12px",
                fontSize: "11px",
                color: "#9CA3AF",
                lineHeight: "1.4",
              }}
            >
              <strong>Govt. Registered Firm:</strong> PAN 602918239 • Department of Commerce &amp; Supply Management Nepal.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "12px",
            color: "#9CA3AF",
          }}
        >
          <div>
            © 2026 <strong>Adhikari Hardware</strong> (Kathmandu, Nepal). All rights reserved.
          </div>

          <div style={{ display: "flex", gap: "18px" }}>
            <span>Toll-Free Phone: 9800000000</span>
            <span>Currency: NPR (Rs.)</span>
            <span>Kalanki, Kathmandu</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
