"use client";

import React from "react";
import { Phone, MapPin, Clock, Truck, FileText, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function TopHeader() {
  const { openModal } = useStore();

  return (
    <div className="top-utility-bar">
      <div className="container">
        <div className="top-bar-inner">
          {/* Left Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
            <div className="top-bar-item">
              <MapPin size={13} color="var(--accent-orange)" />
              <span>Kalanki, Ring Road, Kathmandu, Nepal</span>
            </div>

            <div className="top-bar-item">
              <Phone size={13} color="var(--accent-orange)" />
              <a
                href="tel:9800000000"
                style={{ color: "#FFFFFF", fontWeight: 600, letterSpacing: "0.02em" }}
              >
                9800000000
              </a>
            </div>

            <div className="top-bar-item">
              <Clock size={13} color="#9CA3AF" />
              <span>7:00 AM – 8:00 PM (Daily)</span>
            </div>
          </div>

          {/* Right Links & Delivery Notice */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className="top-bar-item" style={{ color: "#FFFFFF" }}>
              <Truck size={13} color="var(--accent-orange)" />
              <span>
                Same-Day Delivery across <strong>Kathmandu Valley</strong>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <button
                onClick={() => openModal("track_order")}
                style={{
                  color: "#D1D5DB",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
              >
                <Sparkles size={12} color="var(--accent-orange)" />
                <span>Track Order</span>
              </button>

              <button
                onClick={() => openModal("request_quote")}
                style={{
                  color: "var(--accent-orange)",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FileText size={12} />
                <span>Bulk / Contractor Rates</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
