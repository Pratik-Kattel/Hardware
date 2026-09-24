"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import {
  CheckCircle2,
  Printer,
  Truck,
  PhoneCall,
  MapPin,
  FileText,
  X,
  Share2,
} from "lucide-react";

export function OrderConfirmationModal() {
  const { activeModal, closeModal, currentOrder, openModal } = useStore();

  if (activeModal !== "order_confirmation" || !currentOrder) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleTrack = () => {
    closeModal();
    openModal("track_order");
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        style={{
          maxWidth: "700px",
          padding: "0",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: "#0F1B2D",
            color: "#ffffff",
            padding: "32px 30px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              color: "#cbd5e1",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.2)",
              border: "3px solid #10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              color: "#34d399",
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--accent-amber)",
              background: "rgba(245, 158, 11, 0.15)",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
            }}
          >
            Order Confirmed
          </span>

          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", margin: "10px 0 6px 0" }}>
            Dhanyabad! Your Hardware Order is Confirmed
          </h2>

          <p style={{ fontSize: "14px", color: "#cbd5e1", maxWidth: "500px", margin: "0 auto" }}>
            Order <strong>#{currentOrder.id}</strong> has been received by our Kalanki warehouse dispatch team.
          </p>
        </div>

        {/* Body Content */}
        <div style={{ padding: "24px 30px", maxHeight: "65vh", overflowY: "auto" }}>
          {/* Timeline Quick Preview */}
          <div
            style={{
              background: "var(--bg-surface-secondary)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Estimated Delivery:</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--primary)" }}>
                {currentOrder.estimatedDelivery}
              </div>
            </div>

            <button
              onClick={handleTrack}
              className="btn btn-primary btn-sm"
              style={{ gap: "6px" }}
            >
              <Truck size={15} />
              <span>Track Live Delivery</span>
            </button>
          </div>

          {/* Delivery Details Card */}
          <div
            style={{
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              marginBottom: "20px",
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-orange)", textTransform: "uppercase", marginBottom: "8px" }}>
              Delivery Destination
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <MapPin size={18} color="var(--primary)" style={{ marginTop: "2px", flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
                <div style={{ fontWeight: 700, color: "var(--primary)" }}>
                  {currentOrder.customerName} ({currentOrder.customerPhone})
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  {currentOrder.deliveryAddress.area}, {currentOrder.deliveryAddress.city}
                </div>
                {currentOrder.deliveryAddress.landmark && (
                  <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                    Landmark: {currentOrder.deliveryAddress.landmark}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Items Summary Table */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary)", marginBottom: "10px" }}>
              Purchased Materials ({currentOrder.items.length})
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {currentOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border-light)",
                    fontSize: "13px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "var(--radius-sm)",
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--primary)" }}>{item.name}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        Qty: {item.quantity} {item.unit} @ NPR {item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontWeight: 700, color: "var(--primary)" }}>
                    NPR {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & VAT Bill Breakdown */}
          <div
            style={{
              background: "var(--primary-surface)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              fontSize: "13px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 600 }}>NPR {currentOrder.subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
              <span>Kathmandu Delivery:</span>
              <span style={{ fontWeight: 600 }}>
                {currentOrder.deliveryFee === 0 ? "FREE" : `NPR ${currentOrder.deliveryFee.toLocaleString()}`}
              </span>
            </div>
            {currentOrder.discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-crimson)" }}>
                <span>Discount:</span>
                <span style={{ fontWeight: 600 }}>- NPR {currentOrder.discount.toLocaleString()}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "12px" }}>
              <span>Included 13% Nepal VAT:</span>
              <span>NPR {currentOrder.vatAmount.toLocaleString()}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--primary)",
                paddingTop: "8px",
                borderTop: "1px solid var(--border-light)",
              }}
            >
              <span>Total Paid / Payable:</span>
              <span style={{ color: "var(--accent-orange)" }}>NPR {currentOrder.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={handlePrint}
              className="btn btn-outline"
              style={{ flex: 1, gap: "6px" }}
            >
              <Printer size={16} />
              <span>Print Official VAT Bill</span>
            </button>

            <button
              onClick={closeModal}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Hotline */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "12px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <PhoneCall size={14} color="var(--accent-orange)" />
            <span>
              Have queries regarding your delivery? Call our dispatch desk:{" "}
              <a href="tel:9800000000" style={{ color: "var(--accent-orange)", fontWeight: 700 }}>
                9800000000
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
