"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  PhoneCall,
  MapPin,
  Clock,
  Send,
  FileSpreadsheet,
  CheckCircle,
} from "lucide-react";

export function ContactCTASection() {
  const { openModal, addToast } = useStore();
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryText, setInquiryText] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryPhone.trim()) return;
    setSent(true);
    addToast(
      "Callback Requested",
      `Thank you! Our Kathmandu store team will call ${inquiryPhone} shortly.`,
      "success"
    );
    setTimeout(() => {
      setSent(false);
      setInquiryName("");
      setInquiryPhone("");
      setInquiryText("");
    }, 4000);
  };

  return (
    <section
      style={{
        padding: "64px 0",
        background: "#0F1B2D",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Call & Store Info */}
          <div>
            {/* Plain uppercase orange eyebrow, NO pill background */}
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#F15A24",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Hardware Procurement Helpline
            </div>

            <h2
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: "1.2",
                marginBottom: "14px",
                letterSpacing: "-0.02em",
              }}
            >
              Need Immediate Materials on Your Construction Site?
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "#D1D5DB",
                lineHeight: "1.6",
                marginBottom: "28px",
              }}
            >
              Call our central dispatch desk directly or visit our Kalanki hardware superstore. We dispatch mini-trucks and delivery vans across Kathmandu, Lalitpur, and Bhaktapur every 2 hours.
            </p>

            {/* Direct Phone Highlight Box - Clean border, no gradient */}
            <div
              style={{
                background: "#1A2E4C",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "var(--radius-md)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "var(--radius-sm)",
                  background: "#F15A24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  flexShrink: 0,
                }}
              >
                <PhoneCall size={24} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#9CA3AF",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  Direct Dispatch Helpline
                </div>
                <a
                  href="tel:9800000000"
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "0.02em",
                  }}
                >
                  9800000000
                </a>
              </div>
            </div>

            {/* Location & Timings */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "13px",
                color: "#D1D5DB",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <MapPin size={16} color="#F15A24" style={{ flexShrink: 0 }} />
                <span>Adhikari Hardware, Kalanki Chowk (Ring Road), Kathmandu, Nepal</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Clock size={16} color="#F15A24" style={{ flexShrink: 0 }} />
                <span>Open 7 Days a Week: 7:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Callback Form */}
          <div>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                padding: "32px",
                color: "#1F2937",
                border: "1px solid #E5E7EB",
                boxShadow: "none",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0F1B2D",
                  marginBottom: "4px",
                }}
              >
                Request an Instant Callback
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "20px",
                }}
              >
                Leave your number and requirement. A hardware specialist will call you within 15 minutes.
              </p>

              {sent ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <CheckCircle size={36} color="#10B981" style={{ margin: "0 auto 10px auto" }} />
                  <div style={{ fontWeight: 700, color: "#0F1B2D" }}>
                    Callback Request Received
                  </div>
                  <p style={{ fontSize: "13px", color: "#4B5563", marginTop: "4px" }}>
                    We are connecting you with our site logistics manager.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Ramesh Thapa"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="98XXXXXXXX"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Materials Needed</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      placeholder="e.g. 50 bags cement, CPVC pipes, angle grinder"
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      style={{ resize: "none" }}
                    />
                  </div>

                  {/* "Call Me Back" button: solid orange #F15A24, NO glow/shadow */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-full btn-lg"
                    style={{
                      background: "#F15A24",
                      color: "#FFFFFF",
                      border: "none",
                      boxShadow: "none",
                      gap: "8px",
                      fontWeight: 700,
                    }}
                  >
                    <Send size={15} />
                    <span>Call Me Back</span>
                  </button>
                </form>
              )}

              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button
                  onClick={() => openModal("request_quote")}
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#F15A24",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <FileSpreadsheet size={14} />
                  <span>Looking for contractor bulk order? Click here</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
