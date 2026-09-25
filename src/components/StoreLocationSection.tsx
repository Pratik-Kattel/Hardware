"use client";

import React from "react";
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Truck } from "lucide-react";

export function StoreLocationSection() {
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
        {/* Section Header: Plain uppercase text, no pill */}
        <div className="section-header" style={{ marginBottom: "36px" }}>
          <span className="section-tag">Store Location &amp; Central Depot</span>
          <h2 className="section-title">Visit New Adhikari Traders</h2>
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
              className="map-embed-wrapper"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                overflow: "hidden",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.366517340791!2d85.27418277626458!3d27.705967725550792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e5fa4463a1%3A0xf8d7c48a9243074a!2sNew%20adhikari%20traders!5e0!3m2!1sen!2snp!4v1790331384995!5m2!1sen!2snp"
                style={{
                  border: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="New Adhikari Traders Google Maps Location"
              />
            </div>
          </div>

          {/* Column 2: Store Details */}
          <div
            style={{
              background: "#FAFAFA",
              border: "1px solid #E5E7EB",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#4A6572",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                }}
              >
                Physical Store &amp; Depot
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.25",
                }}
              >
                New Adhikari Traders
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                    Kathmandu, Bagmati Province 44600
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
                    href="tel:9851145065"
                    style={{ fontSize: "16px", fontWeight: 700, color: "#4A6572" }}
                  >
                    985-1145065
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
                    Store Hours
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1C1E" }}>
                    7:00 AM – 8:00 PM (Open 7 Days a Week)
                  </div>
                </div>
              </div>

              {/* Valley Delivery Note */}
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
                  <Truck size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#6E6E73", textTransform: "uppercase" }}>
                    Delivery Service
                  </div>
                  <div style={{ fontSize: "13px", color: "#3A3A3C", lineHeight: "1.4" }}>
                    Same-day mini-truck &amp; van dispatch across Kathmandu, Lalitpur, and Bhaktapur.
                  </div>
                </div>
              </div>
            </div>

            {/* "Get Directions" Link to Google Maps Place */}
            <div style={{ paddingTop: "8px", borderTop: "1px solid #E5E7EB" }}>
              <a
                href="https://maps.google.com/?q=New+adhikari+traders"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-full"
                style={{
                  background: "#4A6572",
                  color: "#FFFFFF",
                  gap: "8px",
                  fontWeight: 700,
                  padding: "12px 18px",
                  textDecoration: "none",
                }}
              >
                <Navigation size={17} />
                <span>Get Directions on Google Maps</span>
              </a>
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
