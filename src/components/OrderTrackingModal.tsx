"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  ShieldCheck,
} from "lucide-react";

export function OrderTrackingModal() {
  const { activeModal, closeModal, trackingOrder, trackOrderById } = useStore();
  const [inputOrderId, setInputOrderId] = useState(trackingOrder?.id || "ADH-98412");

  if (activeModal !== "track_order") return null;

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOrderId.trim()) {
      trackOrderById(inputOrderId.trim());
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        style={{
          maxWidth: "720px",
          padding: 0,
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ fontSize: "12px", color: "var(--accent-orange)", fontWeight: 700, textTransform: "uppercase" }}>
              Kathmandu Delivery Status
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary)" }}>
              Live Order &amp; Site Dispatch Tracking
            </h3>
          </div>

          <button onClick={closeModal} className="modal-close-btn" aria-label="Close tracking">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px 30px", maxHeight: "80vh", overflowY: "auto" }}>
          {/* Tracking Search Input Form */}
          <form onSubmit={handleSearchOrder} style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ADH-98412)"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "38px", textTransform: "uppercase" }}
              />
              <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "14px" }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: "0 20px" }}>
              Track
            </button>
          </form>

          {trackingOrder && (
            <div>
              {/* Order Status Banner */}
              <div
                style={{
                  background: "#0F1B2D",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px 24px",
                  color: "#ffffff",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "var(--accent-amber)", fontWeight: 700 }}>
                    ORDER REFERENCE: #{trackingOrder.id}
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 800, margin: "2px 0" }}>
                    Status: {trackingOrder.orderStatus}
                  </div>
                  <div style={{ fontSize: "13px", color: "#cbd5e1" }}>
                    Recipient: {trackingOrder.customerName} • {trackingOrder.deliveryAddress.city}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "var(--radius-md)",
                    padding: "10px 16px",
                    textAlign: "right",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "#cbd5e1" }}>Estimated Arrival:</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent-amber)" }}>
                    {trackingOrder.estimatedDelivery}
                  </div>
                </div>
              </div>

              {/* Delivery Van Info */}
              <div
                style={{
                  background: "var(--bg-surface-secondary)",
                  borderRadius: "var(--radius-md)",
                  padding: "14px 18px",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-orange)",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Truck size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)" }}>
                      Express Delivery Van (Route: Ring Road / Kalanki / Sitapaila)
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      Driver: Ram Bahadur Adhikari • Vehicle: Ba 2 Cha 4920
                    </div>
                  </div>
                </div>

                <a
                  href="tel:9800000000"
                  className="btn btn-outline btn-sm"
                  style={{ gap: "6px" }}
                >
                  <Phone size={13} />
                  <span>Call Dispatch Driver</span>
                </a>
              </div>

              {/* Vertical Step Timeline */}
              <div style={{ paddingLeft: "10px", marginBottom: "28px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary)", marginBottom: "16px" }}>
                  Dispatch Milestones
                </div>

                <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Vertical Line */}
                  <div
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "14px",
                      bottom: "14px",
                      width: "2px",
                      background: "var(--border-medium)",
                      zIndex: 1,
                    }}
                  />

                  {trackingOrder.trackingTimeline.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      {/* Step Circle Marker */}
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          background: step.done
                            ? "var(--success)"
                            : step.current
                            ? "var(--accent-orange)"
                            : "#ffffff",
                          border: step.done
                            ? "none"
                            : step.current
                            ? "2px solid var(--accent-orange)"
                            : "2px solid var(--border-medium)",
                          color: step.done ? "#ffffff" : "var(--text-muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: step.current ? "0 0 0 4px rgba(234, 88, 12, 0.2)" : "none",
                        }}
                      >
                        {step.done ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                      </div>

                      {/* Step Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: step.done || step.current ? 700 : 500,
                            color: step.done || step.current ? "var(--primary)" : "var(--text-muted)",
                            fontSize: "14px",
                          }}
                        >
                          {step.status}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                          {step.location}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                          {step.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in this order */}
              <div
                style={{
                  background: "var(--primary-surface)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)", marginBottom: "10px" }}>
                  Items in Shipment:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {trackingOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Package size={14} color="var(--accent-orange)" />
                        <span>{it.name} (x{it.quantity})</span>
                      </div>
                      <span style={{ fontWeight: 700 }}>NPR {(it.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
