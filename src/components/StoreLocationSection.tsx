"use client";

import React from "react";
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Truck } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function StoreLocationSection() {
  const { storeInfo } = useStore();

  const businessName = storeInfo?.businessName || "New Adhikari Traders";
  const address = storeInfo?.address
    ? `${storeInfo.address}, ${storeInfo.province || storeInfo.city}`
    : "Kathmandu, Bagmati Province 44600";
  const phone = storeInfo?.phone || "985-1145065";
  const hours = storeInfo?.hours || "7:00 AM – 8:00 PM (Every Day)";

  return (
    <section
      id="location-section"
      style={{
        padding: "64px 0",
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        borderBottom: "1px solid #E5E7EB",
      }}
      aria-label="Store Location and Directions"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "36px" }}>
          <span className="section-tag">Store Location &amp; Central Depot</span>
          <h2 className="section-title">Visit {businessName}</h2>
          <p className="section-subtitle">
            Walk into our Kathmandu store counter or arrange dedicated site delivery across Kathmandu Valley.
          </p>
        </div>

        {/* Two-Column Layout on Desktop / Stack on Mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "40px",
            alignItems: "center",
          }}
          className="map-store-grid"
        >
          {/* Column 1: Map Embed */}
          <div>
            <div
              style={{
                width: "100%",
                height: "380px",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid #E5E7EB",
                boxShadow: "none",
                background: "#F8F9FA",
                position: "relative",
              }}
            >
              <iframe
                title="New Adhikari Traders Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.6462141578!2d85.25607736412086!3d27.708955944371424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "12px",
                fontSize: "12px",
                color: "#6E6E73",
              }}
            >
              <span>Central Kathmandu Depot · On-site Contractor Parking</span>
              <a
                href="https://maps.google.com/?q=Kathmandu+Nepal"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#4A6572",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  textDecoration: "none",
                }}
              >
                <Navigation size={13} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Column 2: Clean Store Details Card */}
          <div
            style={{
              background: "#FAFAFA",
              border: "1px solid #E5E7EB",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#4A6572",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "8px",
              }}
            >
              <CheckCircle2 size={13} />
              <span>Depot Counter &amp; Pickup</span>
            </div>

            <h3
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#1C1C1E",
                lineHeight: "1.25",
                marginBottom: "20px",
              }}
            >
              {businessName}
            </h3>

            {/* Info Items List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "28px" }}>
              {/* Address */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--radius-sm)",
                    background: "#EBF0F2",
                    color: "#4A6572",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#6E6E73", textTransform: "uppercase" }}>
                    Address
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1C1E", lineHeight: "1.4" }}>
                    {address}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--radius-sm)",
                    background: "#EBF0F2",
                    color: "#4A6572",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#6E6E73", textTransform: "uppercase" }}>
                    Phone Orders &amp; Inquiries
                  </div>
                  <a
                    href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                    style={{ fontSize: "16px", fontWeight: 700, color: "#4A6572", textDecoration: "none" }}
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--radius-sm)",
                    background: "#EBF0F2",
                    color: "#4A6572",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#6E6E73", textTransform: "uppercase" }}>
                    Depot Hours
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1C1E" }}>
                    {hours}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "2px" }}>
                    Emergency site deliveries on request
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Dispatch Banner */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "var(--radius-sm)",
                padding: "14px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Truck size={20} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "12px", lineHeight: "1.4", color: "#3A3A3C" }}>
                <strong style={{ color: "#1C1C1E" }}>Construction Site Van Dispatch:</strong> Same-day delivery inside Ring Road &amp; Kathmandu Valley.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .map-store-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
