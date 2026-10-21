"use client";

import React from "react";
import { Phone, MapPin, Clock, Truck, FileText } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function TopHeader() {
  const { openModal, storeInfo } = useStore();

  const phone = storeInfo?.phone || "985-1145065";
  const rawAddress = storeInfo?.address || "Kathmandu, Bagmati Province 44600";
  const address = rawAddress.includes("Bagmati") || rawAddress.includes("44600")
    ? rawAddress
    : `${rawAddress}, ${storeInfo?.province || "Bagmati Province 44600"}`;
  const hours = storeInfo?.hours || "7:00 AM – 8:00 PM (Daily)";

  return (
    <div className="top-utility-bar">
      <div className="header-container">
        <div className="top-bar-inner">
          {/* Left Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div className="top-bar-item">
              <MapPin size={13} color="#FB923C" />
              <span>{address}</span>
            </div>

            <div className="top-bar-item">
              <Phone size={13} color="#FB923C" />
              <a
                href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                style={{ color: "#FFFFFF", fontWeight: 700, letterSpacing: "0.02em" }}
              >
                {phone}
              </a>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>(Site Helpline &amp; WhatsApp)</span>
            </div>

            <div className="top-bar-item">
              <Clock size={13} color="#94A3B8" />
              <span>{hours}</span>
            </div>
          </div>

          {/* Right Links & Delivery Notice */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div className="top-bar-item" style={{ color: "#FFFFFF" }}>
              <Truck size={13} color="#FB923C" />
              <span>
                Same-Day Site Delivery to <strong>Kathmandu, Lalitpur &amp; Bhaktapur</strong>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => openModal("request_quote")}
                style={{
                  color: "#FB923C",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "rgba(251, 146, 60, 0.12)",
                  border: "1px solid rgba(251, 146, 60, 0.3)",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(251, 146, 60, 0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(251, 146, 60, 0.12)";
                }}
              >
                <FileText size={12} />
                <span>Contractor / Bulk Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
