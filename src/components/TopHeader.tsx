"use client";

import React from "react";
import { Phone, MapPin, Clock, Truck, FileText } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function TopHeader() {
  const { openModal, storeInfo } = useStore();

  const phone = storeInfo?.phone || "985-1145065";
  const address = storeInfo?.address
    ? `${storeInfo.address}, ${storeInfo.province || storeInfo.city}`
    : "Kathmandu, Bagmati Province 44600";
  const hours = storeInfo?.hours || "7:00 AM – 8:00 PM (Daily)";

  return (
    <div className="top-utility-bar">
      <div className="header-container">
        <div className="top-bar-inner">
          {/* Left Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
            <div className="top-bar-item">
              <MapPin size={13} color="var(--accent-steel)" />
              <span>{address}</span>
            </div>

            <div className="top-bar-item">
              <Phone size={13} color="var(--accent-steel)" />
              <a
                href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                style={{ color: "#FFFFFF", fontWeight: 600, letterSpacing: "0.02em" }}
              >
                {phone}
              </a>
            </div>

            <div className="top-bar-item">
              <Clock size={13} color="#9CA3AF" />
              <span>{hours}</span>
            </div>
          </div>

          {/* Right Links & Delivery Notice */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className="top-bar-item" style={{ color: "#FFFFFF" }}>
              <Truck size={13} color="var(--accent-steel)" />
              <span>
                Same-Day Delivery across <strong>Kathmandu Valley</strong>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <button
                onClick={() => openModal("request_quote")}
                style={{
                  color: "var(--accent-steel)",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
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
