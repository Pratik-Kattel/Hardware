"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  Package,
  ChevronRight,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  ReceiptText,
} from "lucide-react";

export function OrdersListClient() {
  const router = useRouter();
  const { orders } = useStore();
  const [lookupId, setLookupId] = useState("");
  const [lookupError, setLookupError] = useState("");

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = lookupId.trim();
    if (!cleanId) return;

    // Check if order exists in store orders
    const matched = orders.find(
      (o) => o.id.toLowerCase() === cleanId.toLowerCase()
    );

    if (matched) {
      router.push(`/account/orders/${matched.id}`);
    } else {
      // Direct navigation to ID anyway
      router.push(`/account/orders/${cleanId.toUpperCase()}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return {
          bg: "#EAF5EE",
          color: "#166534",
          border: "#C4E3D1",
          icon: <CheckCircle2 size={14} />,
        };
      case "Out for Delivery":
      case "Dispatched":
        return {
          bg: "#EBF0F2",
          color: "#4A6572",
          border: "#CFDCE2",
          icon: <Truck size={14} />,
        };
      default:
        return {
          bg: "#FEF3C7",
          color: "#92400E",
          border: "#FDE68A",
          icon: <Clock size={14} />,
        };
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
            <span style={{ color: "#CBD5E1" }}>My Account</span>
            <ChevronRight size={14} />
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>My Orders</span>
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
                  fontSize: "14px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#94A3B8",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Account &amp; Purchase History
              </span>
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
                My Orders
              </h1>
              <p style={{ fontSize: "16px", color: "#CBD5E1", maxWidth: "600px" }}>
                Review all your hardware purchases, view delivery timelines, download tax invoices, and reorder site supplies.
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
                fontSize: "14px",
              }}
            >
              <Phone size={18} color="var(--accent-steel)" />
              <div>
                <span style={{ color: "#94A3B8", fontSize: "12px", display: "block" }}>
                  Need Order Support?
                </span>
                <a
                  href="tel:9851145065"
                  style={{ color: "#FFFFFF", fontWeight: 700, textDecoration: "none" }}
                >
                  985-1145065
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "32px" }}>
        {/* Quick Order Lookup by ID Bar */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Search size={18} color="#4A6572" />
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", margin: 0 }}>
              Quick Order Lookup
            </h2>
          </div>
          <p style={{ fontSize: "14px", color: "#6E6E73", marginBottom: "16px" }}>
            Have a printed store bill or order reference ID? Enter it below to inspect its detailed status timeline.
          </p>

          <form
            onSubmit={handleLookupSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              maxWidth: "540px",
            }}
          >
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ADH-98412)"
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
              style={{
                flex: 1,
                padding: "11px 16px",
                border: "1px solid #CBD5E1",
                borderRadius: "var(--radius-sm)",
                fontSize: "16px",
                color: "#1C1C1E",
                outline: "none",
                minHeight: "44px",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                background: "#4A6572",
                color: "#FFFFFF",
                minHeight: "44px",
                padding: "10px 22px",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              View Order
            </button>
          </form>
          {lookupError && (
            <div style={{ color: "#C1512D", fontSize: "14px", marginTop: "8px" }}>
              {lookupError}
            </div>
          )}
        </div>

        {/* Orders List Section */}
        {orders.length === 0 ? (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #E5E7EB",
              padding: "60px 24px",
              textAlign: "center",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            <Package size={48} color="#9CA3AF" style={{ margin: "0 auto 16px auto" }} />
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1C1C1E", marginBottom: "8px" }}>
              No Orders Found
            </h2>
            <p style={{ fontSize: "15px", color: "#6E6E73", marginBottom: "24px" }}>
              You haven&apos;t placed any orders yet. Browse our hardware inventory to place your first site delivery order.
            </p>
            <Link
              href="/products"
              className="btn btn-primary btn-lg"
              style={{
                background: "#4A6572",
                color: "#FFFFFF",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Explore Hardware Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", margin: 0 }}>
                Past &amp; Active Orders ({orders.length})
              </h2>
              <span style={{ fontSize: "14px", color: "#6E6E73" }}>
                Click any order to view full delivery status &amp; timeline
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {orders.map((order) => {
                const badge = getStatusBadge(order.orderStatus);

                return (
                  <div
                    key={order.id}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid #E5E7EB",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                      transition: "border-color 0.15s",
                    }}
                  >
                    {/* Top Row: Order ID, Date, Status */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px",
                        paddingBottom: "14px",
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E" }}>
                          Order #{order.id}
                        </span>
                        <span style={{ fontSize: "14px", color: "#6E6E73" }}>
                          Placed: <strong>{order.createdAt}</strong>
                        </span>
                      </div>

                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          background: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                          fontSize: "14px",
                          fontWeight: 700,
                          padding: "5px 12px",
                          borderRadius: "var(--radius-full)",
                        }}
                      >
                        {badge.icon}
                        <span>{order.orderStatus}</span>
                      </div>
                    </div>

                    {/* Middle: Items Preview */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "20px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: "60px",
                              height: "60px",
                              background: "#F8F9FA",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid #E5E7EB",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                            title={`${item.name} (${item.quantity}x)`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
                            />
                          </div>
                        ))}

                        <div>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: "#1C1C1E" }}>
                            {order.items.map((i) => i.name).join(", ")}
                          </div>
                          <div style={{ fontSize: "14px", color: "#6E6E73", marginTop: "2px" }}>
                            Delivery destination: {order.deliveryAddress.area}, {order.deliveryAddress.city}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: "13px", color: "#6E6E73" }}>Order Total</div>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: "#1C1C1E" }}>
                          NPR {order.total.toLocaleString()}
                        </div>
                        <div style={{ fontSize: "12px", color: "#166534", fontWeight: 600 }}>
                          13% VAT Bill Included
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action: Click Order opens Detail Page */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "14px",
                        borderTop: "1px solid #E5E7EB",
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#6E6E73" }}>
                        Estimated delivery: <strong>{order.estimatedDelivery}</strong>
                      </span>

                      <Link
                        href={`/account/orders/${order.id}`}
                        className="btn btn-outline"
                        style={{
                          borderColor: "#4A6572",
                          color: "#4A6572",
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
                        <span>View Order Details &amp; Status</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
