"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  CheckCircle2,
  Truck,
  PhoneCall,
  MapPin,
  FileText,
  X,
  Share2,
  Package,
} from "lucide-react";

export function OrderConfirmationModal() {
  const router = useRouter();
  const { activeModal, closeModal, currentOrder, storeInfo } = useStore();

  if (activeModal !== "order_confirmation" || !currentOrder) {
    return null;
  }

  const handleViewOrder = () => {
    closeModal();
    router.push(`/account/orders/${currentOrder.id}`);
  };

  return (
    <div
      className="modal-overlay"
      onClick={closeModal}
      style={{
        padding: "20px 16px",
      }}
    >
      <div
        className="modal-content"
        style={{
          maxWidth: "680px",
          width: "100%",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          margin: "auto 0",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header (flex-shrink: 0) */}
        <div
          style={{
            flexShrink: 0,
            background: "#1C1C1E",
            color: "#ffffff",
            padding: "22px 24px 18px 24px",
            textAlign: "center",
            position: "relative",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              color: "#cbd5e1",
              background: "rgba(255, 255, 255, 0.12)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Close confirmation dialog"
          >
            <X size={18} />
          </button>

          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.2)",
              border: "2.5px solid #10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px auto",
              color: "#34d399",
            }}
          >
            <CheckCircle2 size={30} />
          </div>

          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--accent-amber)",
              background: "rgba(245, 158, 11, 0.15)",
              padding: "3px 10px",
              borderRadius: "var(--radius-full)",
              display: "inline-block",
            }}
          >
            Order Confirmed
          </span>

          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "8px 0 4px 0" }}>
            Dhanyabad! Your Hardware Order is Confirmed
          </h2>

          <p style={{ fontSize: "13px", color: "#cbd5e1", maxWidth: "480px", margin: "0 auto" }}>
            Order <strong style={{ color: "#FFFFFF" }}>#{currentOrder.id}</strong> has been received by our Kathmandu warehouse dispatch team.
          </p>
        </div>

        {/* Scrollable Middle Section (flex: 1; overflow-y: auto) */}
        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            padding: "20px 24px",
            background: "#FFFFFF",
          }}
          className="order-confirmation-scroll-area"
        >
          {/* Timeline Quick Preview */}
          <div
            style={{
              background: "var(--bg-surface-secondary)",
              borderRadius: "var(--radius-md)",
              padding: "14px 16px",
              marginBottom: "20px",
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
              onClick={handleViewOrder}
              className="btn btn-primary btn-sm"
              style={{ gap: "6px" }}
            >
              <Package size={15} />
              <span>View Order Status</span>
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
            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-steel)", textTransform: "uppercase", marginBottom: "8px" }}>
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

          {/* Pricing Breakdown */}
          <div
            style={{
              background: "var(--primary-surface)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              fontSize: "13px",
              marginBottom: "8px",
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
              <span style={{ color: "var(--accent-steel)" }}>NPR {currentOrder.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Pinned Bottom Action Footer (flex-shrink: 0, ALWAYS visible) */}
        <div
          style={{
            flexShrink: 0,
            background: "#FFFFFF",
            borderTop: "1px solid #E5E7EB",
            padding: "16px 24px",
            boxShadow: "0 -4px 14px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={handleViewOrder}
              className="btn btn-primary"
              style={{
                flex: "1 1 200px",
                background: "#4A6572",
                color: "#FFFFFF",
                minHeight: "44px",
                fontSize: "15px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                borderRadius: "var(--radius-md)",
                border: "none",
              }}
            >
              <Truck size={18} />
              <span>View in My Orders</span>
            </button>

            <button
              onClick={closeModal}
              className="btn btn-secondary"
              style={{
                flex: "1 1 150px",
                minHeight: "44px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                borderRadius: "var(--radius-md)",
              }}
            >
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Dispatch Helpline */}
          <div
            style={{
              textAlign: "center",
              marginTop: "12px",
              fontSize: "12px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <PhoneCall size={14} color="var(--accent-steel)" />
            <span>
              Queries regarding delivery? Call our dispatch desk:{" "}
              <a
                href={`tel:${(storeInfo?.phone || "985-1145065").replace(/[^0-9]/g, "")}`}
                style={{ color: "var(--accent-steel)", fontWeight: 700, textDecoration: "none" }}
              >
                {storeInfo?.phone || "985-1145065"}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
