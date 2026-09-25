"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { Order } from "@/types";
import {
  Package,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  ReceiptText,
} from "lucide-react";

interface OrderDetailClientProps {
  orderId: string;
}

export function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const { orders, storeInfo } = useStore();

  // Find order in store orders (or fall back to first order for demo resilience)
  const order: Order =
    orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase()) ||
    orders[0];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
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
              fontSize: "14px",
              color: "#94A3B8",
              marginBottom: "14px",
            }}
          >
            <Link href="/" style={{ color: "#CBD5E1", textDecoration: "none" }}>
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/account/orders" style={{ color: "#CBD5E1", textDecoration: "none" }}>
              My Orders
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>Order #{order.id}</span>
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
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#94A3B8",
                  }}
                >
                  Order Details &amp; Status Timeline
                </span>
                <span
                  style={{
                    background: "#22C55E",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  {order.orderStatus}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  marginBottom: "8px",
                }}
              >
                Order Reference #{order.id}
              </h1>
              <p style={{ fontSize: "16px", color: "#CBD5E1" }}>
                Placed on <strong>{order.createdAt}</strong> • Estimated Delivery:{" "}
                <strong>{order.estimatedDelivery}</strong>
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={handlePrint}
                className="btn btn-outline"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "#FFFFFF",
                  minHeight: "44px",
                  padding: "10px 18px",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Printer size={16} />
                <span>Print Order Summary</span>
              </button>

              <Link
                href="/account/orders"
                className="btn btn-primary"
                style={{
                  background: "#4A6572",
                  color: "#FFFFFF",
                  minHeight: "44px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <ArrowLeft size={16} />
                <span>All Orders</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "32px" }}>
        {/* Status Timeline Progress Stepper (The ONLY place order tracking lives) */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid #E5E7EB",
            padding: "32px",
            marginBottom: "32px",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#4A6572",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Live Status Progress
            </span>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#1C1C1E", margin: "4px 0 0 0" }}>
              Delivery Dispatch Stepper
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${order.trackingTimeline.length}, 1fr)`,
              gap: "16px",
              position: "relative",
            }}
            className="order-detail-stepper"
          >
            {order.trackingTimeline.map((step, idx) => (
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
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: step.done
                      ? "#166534"
                      : step.current
                      ? "#4A6572"
                      : "#E2E8F0",
                    color: step.done || step.current ? "#FFFFFF" : "#94A3B8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    boxShadow: step.current ? "0 0 0 4px rgba(74, 101, 114, 0.2)" : "none",
                  }}
                >
                  <CheckCircle2 size={22} />
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#1C1C1E" }}>
                  {step.status}
                </div>
                <div style={{ fontSize: "14px", color: "#64748B", marginTop: "4px" }}>
                  {step.location}
                </div>
                <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>
                  {step.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Info Grid: Delivery Address & Order Financial Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "32px",
          }}
          className="order-info-two-col"
        >
          {/* Col 1: Delivery Address & Recipient */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #E5E7EB",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#4A6572",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "8px",
              }}
            >
              Site Delivery Destination
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", marginBottom: "14px" }}>
              Recipient Details
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={18} color="#4A6572" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ color: "#1C1C1E" }}>
                    {order.deliveryAddress.area}, Near {order.deliveryAddress.landmark}
                  </strong>
                  <div style={{ color: "#64748B", fontSize: "14px" }}>
                    {order.deliveryAddress.city}, Bagmati Province
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={18} color="#4A6572" style={{ flexShrink: 0 }} />
                <span>
                  Customer Contact: <strong>{order.customerPhone}</strong> ({order.customerName})
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Truck size={18} color="#4A6572" style={{ flexShrink: 0 }} />
                <span>
                  Dispatched from: <strong>New Adhikari Traders Kathmandu Central Depot</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Payment & Financial Summary */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #E5E7EB",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#4A6572",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "8px",
              }}
            >
              Order &amp; Payment Summary
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", marginBottom: "14px" }}>
              Order Cost Breakdown
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                <span>Subtotal ({order.items.length} items):</span>
                <span>NPR {order.subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                <span>Valley Site Delivery Fee:</span>
                <span>{order.deliveryFee === 0 ? "FREE" : `NPR ${order.deliveryFee.toLocaleString()}`}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#C1512D" }}>
                  <span>Promotional Discount:</span>
                  <span>-NPR {order.discount.toLocaleString()}</span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                  borderTop: "1px solid #E5E7EB",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                }}
              >
                <span>Total Paid / Payable:</span>
                <span>NPR {order.total.toLocaleString()}</span>
              </div>

              <div style={{ fontSize: "13px", color: "#166534", fontWeight: 600, marginTop: "4px" }}>
                Payment Method: {order.paymentMethod.toUpperCase()} • Status: {order.paymentStatus.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Order Products Table */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid #E5E7EB",
            padding: "28px",
            marginBottom: "32px",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", marginBottom: "16px" }}>
            Ordered Hardware Items ({order.items.length})
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  background: "#F8FAFC",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid #E2E8F0",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "#FFFFFF",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid #E5E7EB",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={52}
                      height={52}
                      style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
                    />
                  </div>

                  <div>
                    <Link
                      href={`/product/${item.productId}`}
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1C1C1E",
                        textDecoration: "none",
                      }}
                    >
                      {item.name}
                    </Link>
                    <div style={{ fontSize: "14px", color: "#64748B", marginTop: "2px" }}>
                      Quantity: <strong>{item.quantity} {item.unit}</strong> • Rate: NPR {item.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "13px", color: "#64748B" }}>Subtotal</div>
                  <div style={{ fontSize: "17px", fontWeight: 800, color: "#1C1C1E" }}>
                    NPR {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Assistance Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E" }}>
              Questions about this order or site delivery?
            </div>
            <div style={{ fontSize: "14px", color: "#6E6E73" }}>
              Speak directly with our Kathmandu dispatch warehouse team.
            </div>
          </div>

          <a
            href={`tel:${(storeInfo?.phone || "985-1145065").replace(/[^0-9]/g, "")}`}
            className="btn btn-outline"
            style={{
              borderColor: "#4A6572",
              color: "#4A6572",
              minHeight: "44px",
              padding: "10px 20px",
              fontSize: "15px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Phone size={16} />
            <span>Call Us: {storeInfo?.phone || "985-1145065"}</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .order-detail-stepper {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
          .order-info-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
