"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Wrench,
  MapPin,
  Phone,
  Clock,
  Send,
  FileText,
  Package,
} from "lucide-react";

export function Footer() {
  const { openModal, storeInfo, categories } = useStore();

  const businessName = storeInfo?.businessName || "New Adhikari Traders";
  const address = storeInfo?.address || "Kathmandu, Bagmati Province 44600";
  const phone = storeInfo?.phone || "985-1145065";
  const hours = storeInfo?.hours || "Open 7:00 AM – 8:00 PM (Daily)";

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
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(74, 101, 114, 0.2)",
                  border: "1px solid rgba(74, 101, 114, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4A6572",
                }}
              >
                <Wrench size={19} />
              </div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                <span>NEW ADHIKARI</span>{" "}
                <span style={{ color: "#4A6572" }}>TRADERS</span>
              </div>
            </div>

            <p style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: "1.65", marginBottom: "18px" }}>
              {businessName} is Nepal&apos;s trusted hardware store and building materials distributor located in {address}. Serving contractors, tradesmen, and builders with genuine tools, electrical supplies, plumbing, and construction materials.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <MapPin size={16} color="#4A6572" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>{address}, Nepal</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={16} color="#4A6572" style={{ flexShrink: 0 }} />
                <a
                  href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                  style={{ color: "#FFFFFF", fontWeight: 700, textDecoration: "none" }}
                >
                  {phone}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={16} color="#4A6572" style={{ flexShrink: 0 }} />
                <span>{hours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories (Dynamic from DB) */}
          <div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Hardware Categories
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", padding: 0 }}>
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id || cat.slug}>
                  <Link
                    href={`/category/${cat.slug || cat.id}`}
                    style={{ color: "#D1D5DB", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Contractor Desk
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", padding: 0 }}>
              <li>
                <Link
                  href="/account/orders"
                  style={{ color: "#D1D5DB", textDecoration: "none", transition: "color 0.15s", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  <Package size={14} />
                  <span>Track &amp; View Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  style={{ color: "#D1D5DB", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openModal("request_quote")}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "#D1D5DB",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  <FileText size={14} />
                  <span>Request Bulk Site Quote</span>
                </button>
              </li>
              <li>
                <Link
                  href="/products"
                  style={{ color: "#D1D5DB", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                >
                  Direct Depot Stock Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Verification */}
          <div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Direct Contractor Updates
            </div>
            <p style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: "1.5", marginBottom: "16px" }}>
              Get weekly wholesale commodity price alerts for cement, TMT rebars, CPVC fittings, and promotional tool kits.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! You will receive Kathmandu hardware updates.");
              }}
              style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
            >
              <input
                type="text"
                placeholder="Phone or Email"
                required
                style={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "var(--radius-sm)",
                  padding: "9px 12px",
                  fontSize: "13px",
                  color: "#FFFFFF",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#4A6572",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  padding: "0 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Subscribe"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "14px",
            color: "#9CA3AF",
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>{businessName}</strong> ({address}). All rights reserved.
          </div>

          <div style={{ display: "flex", gap: "18px" }}>
            <span>Direct Phone: {phone}</span>
            <span>Currency: NPR (Rs.)</span>
            <span>{address}</span>
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
