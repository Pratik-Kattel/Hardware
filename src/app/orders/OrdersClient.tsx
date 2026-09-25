"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Order } from "@/types";
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  ShieldCheck,
  ChevronRight,
  ReceiptText,
} from "lucide-react";

export function OrdersClient() {
  const { orders, currentOrder, trackingOrder, trackOrderById, storeInfo } = useStore();

  const [inputOrderId, setInputOrderId] = useState(
    currentOrder ? currentOrder.id : trackingOrder?.id || "ADH-98412"
  );
  const [inputPhone, setInputPhone] = useState(
    currentOrder ? currentOrder.customerPhone : storeInfo?.phone || "985-1145065"
  );

  const activeTracking: Order | undefined =
    trackingOrder ||
    orders.find((o) => o.id.toLowerCase() === inputOrderId.trim().toLowerCase()) ||
    orders[0];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOrderId.trim()) {
      trackOrderById(inputOrderId.trim());
    }
  };

  const handleSelectOrder = (orderId: string) => {
    setInputOrderId(orderId);
    trackOrderById(orderId);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", paddingBottom: "70px" }}>
      {/* Header Banner */}
      <div
        style={{
          background: "#1E293B",
          color: "#FFFFFF",
          padding: "36px 0 42px 0",
          borderBottom: "1px solid #334155",
        }}
      >
        <div className="container">
          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#94A3B8",
              marginBottom: "14px",
            }}
          >
            <Link href="/" style={{ color: "#CBD5E1", textDecoration: "none" }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>My Orders &amp; Tracking</span>
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#94A3B8",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Customer Account &amp; Site Dispatch Desk
              </span>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  marginBottom: "8px",
                }}
              >
                Orders &amp; Live Delivery Tracking
              </h1>
              <p style={{ fontSize: "14px", color: "#CBD5E1", maxWidth: "600px" }}>
                Track site dispatches across Kathmandu Valley, view past purchases, and verify manufacturer warranty receipts.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(15, 23, 42, 0.6)",
                padding: "10px 18px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "13px",
              }}
            >
              <Phone size={16} color="var(--accent-steel)" />
              <div>
                <span style={{ color: "#94A3B8", fontSize: "11px", display: "block" }}>
                  Dispatch Support Hotline:
                </span>
                <a
                  href={`tel:${(storeInfo?.phone || "985-1145065").replace(/[^0-9]/g, "")}`}
                  style={{ color: "#FFFFFF", fontWeight: 700, textDecoration: "none" }}
                >
                  {storeInfo?.phone || "985-1145065"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "32px" }}>
        {/* Search Order Tracking Form Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid #E5E7EB",
            padding: "28px 32px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#4A6572",
              marginBottom: "4px",
            }}
          >
            Live Site Dispatch Lookup
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1C1C1E", marginBottom: "18px" }}>
            Track an Order by Reference ID
          </h2>

          <form
            onSubmit={handleTrackSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr auto",
              gap: "14px",
              alignItems: "center",
            }}
            className="tracking-form-grid"
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "6px",
                }}
              >
                Order ID (e.g. ADH-98412)
              </label>
              <input
                type="text"
                placeholder="ADH-98412"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid #CBD5E1",
                  fontSize: "14px",
                  color: "#1C1C1E",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "6px",
                }}
              >
                Customer Phone Number
              </label>
              <input
                type="text"
                placeholder={storeInfo?.phone || "985-1145065"}
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid #CBD5E1",
                  fontSize: "14px",
                  color: "#1C1C1E",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ alignSelf: "flex-end" }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  background: "#4A6572",
                  color: "#FFFFFF",
                  padding: "11px 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 700,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Search size={16} />
                <span>Track Order</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Timeline Display (Shown when order found) */}
        {activeTracking && (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              marginBottom: "36px",
            }}
          >
            {/* Status Summary Banner */}
            <div
              style={{
                background: "#F8FAFC",
                borderBottom: "1px solid #E5E7EB",
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: "#1C1C1E",
                    }}
                  >
                    Order #{activeTracking.id}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#4A6572",
                      background: "#F1F5F9",
                      padding: "3px 10px",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid #CBD5E1",
                    }}
                  >
                    {activeTracking.orderStatus}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
                  Estimated Arrival: <strong>{activeTracking.estimatedDelivery}</strong>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "11px", color: "#64748B" }}>Order Total</div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E" }}>
                  NPR {activeTracking.total.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div style={{ padding: "32px 28px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${activeTracking.trackingTimeline.length}, 1fr)`,
                  gap: "16px",
                  position: "relative",
                }}
                className="order-stepper-grid"
              >
                {activeTracking.trackingTimeline.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: step.done
                          ? "#22C55E"
                          : step.current
                          ? "#4A6572"
                          : "#E2E8F0",
                        color: step.done || step.current ? "#FFFFFF" : "#94A3B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <CheckCircle2 size={18} />
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#1C1C1E" }}>
                      {step.status}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>
                      {step.location}
                    </div>
                    <div style={{ fontSize: "10px", color: "#94A3B8" }}>{step.timestamp}</div>
                  </div>
                ))}
              </div>

              {/* Delivery Details 2-Column Info Card */}
              <div
                style={{
                  marginTop: "32px",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "var(--radius-md)",
                  padding: "20px 24px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                }}
                className="delivery-details-grid"
              >
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#475569",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Delivery Destination &amp; Recipient
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                    <MapPin size={16} color="#4A6572" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "13px", color: "#1C1C1E", fontWeight: 600 }}>
                      {activeTracking.deliveryAddress.area}, {activeTracking.deliveryAddress.landmark},{" "}
                      {activeTracking.deliveryAddress.city}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginLeft: "24px" }}>
                    Customer: {activeTracking.customerName} ({activeTracking.customerPhone})
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#475569",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Ordered Hardware Items ({activeTracking.items.length})
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {activeTracking.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "13px",
                        }}
                      >
                        <span style={{ color: "#1C1C1E" }}>
                          {item.name} × {item.quantity}
                        </span>
                        <span style={{ color: "#4A6572", fontWeight: 700 }}>
                          NPR {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent & Demo Orders List */}
        <div style={{ marginTop: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", margin: 0 }}>
                Recent Store Orders
              </h2>
              <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
                Click &quot;View Live Tracking&quot; on any order below to inspect delivery progress
              </div>
            </div>

            <Link
              href="/products"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#4A6572",
                textDecoration: "none",
              }}
            >
              Order More Hardware →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {orders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "var(--radius-md)",
                  padding: "18px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#1C1C1E" }}>
                      Order #{ord.id}
                    </span>
                    <span style={{ fontSize: "12px", color: "#64748B" }}>({ord.createdAt})</span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: ord.orderStatus === "Delivered" ? "#166534" : "#4A6572",
                        background: "#F1F5F9",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {ord.orderStatus}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#475569" }}>
                    {ord.items.map((i) => `${i.name} (${i.quantity}x)`).join(", ")}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "2px" }}>
                    Destination: {ord.deliveryAddress.area}, {ord.deliveryAddress.landmark},{" "}
                    {ord.deliveryAddress.city}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", color: "#64748B" }}>Total</div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#1C1C1E" }}>
                      NPR {ord.total.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectOrder(ord.id)}
                    className="btn btn-outline btn-sm"
                    style={{
                      borderColor: "#4A6572",
                      color: "#4A6572",
                      fontWeight: 700,
                    }}
                  >
                    View Live Tracking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .tracking-form-grid {
            grid-template-columns: 1fr !important;
          }
          .order-stepper-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
          .delivery-details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
