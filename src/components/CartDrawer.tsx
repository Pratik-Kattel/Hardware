"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
} from "lucide-react";

export function CartDrawer() {
  const {
    activeModal,
    closeModal,
    cart,
    cartCount,
    cartSubtotal,
    deliveryLocation,
    setDeliveryLocation,
    deliveryFee,
    couponCode,
    discountAmount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    openModal,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState("");

  if (activeModal !== "cart") return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      const ok = applyCoupon(inputCoupon.trim());
      if (ok) setInputCoupon("");
    }
  };

  const handleProceedToCheckout = () => {
    closeModal();
    openModal("checkout");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(14, 34, 56, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={closeModal}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-xl)",
          position: "relative",
          animation: "slideInRight 0.25s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-light)",
            background: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={22} color="var(--accent-steel)" />
            <span style={{ fontSize: "17px", fontWeight: 800, color: "var(--primary)" }}>
              Shopping Cart ({cartCount})
            </span>
          </div>

          <button onClick={closeModal} className="modal-close-btn" aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Bar Progress */}
        <div
          style={{
            background: "var(--primary-surface)",
            padding: "10px 24px",
            borderBottom: "1px solid var(--border-light)",
            fontSize: "12px",
          }}
        >
          {cartSubtotal >= 5000 ? (
            <div style={{ color: "var(--success)", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
              <Truck size={14} />
              <span>Congratulations! You unlocked FREE Kathmandu Valley Delivery!</span>
            </div>
          ) : (
            <div style={{ color: "var(--text-secondary)" }}>
              Add <strong>NPR {(5000 - cartSubtotal).toLocaleString()}</strong> more to get{" "}
              <strong style={{ color: "var(--accent-steel)" }}>FREE Valley Delivery</strong>!
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "var(--primary-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
                Your cart is empty
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "260px" }}>
                Add power tools, pipes, cements, or fasteners from our Kathmandu inventory.
              </p>
              <button onClick={closeModal} className="btn btn-primary" style={{ marginTop: "10px" }}>
                Browse Hardware Store
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: "flex",
                  gap: "14px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--border-light)",
                  alignItems: "center",
                }}
              >
                {/* Thumbnail */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)",
                    background: "#f8fafc",
                    flexShrink: 0,
                  }}
                />

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent-steel)", textTransform: "uppercase" }}>
                    {item.product.brand}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: "4px",
                    }}
                    title={item.product.name}
                  >
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)" }}>
                    NPR {item.product.price.toLocaleString()}
                    <span style={{ fontSize: "11px", fontWeight: 400, color: "var(--text-muted)", marginLeft: "4px" }}>
                      / {item.product.unit}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid var(--border-medium)",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        background: "#ffffff",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ padding: "4px 8px", color: "var(--text-secondary)", display: "flex" }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ padding: "0 10px", fontSize: "12px", fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ padding: "4px 8px", color: "var(--text-secondary)", display: "flex" }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        color: "var(--text-muted)",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Subtotal for Item */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--primary)" }}>
                    NPR {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--border-light)",
              background: "#ffffff",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Delivery Destination Selector */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                Delivery Destination:
              </label>
              <select
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value as any)}
                className="form-select"
                style={{ padding: "8px 12px", fontSize: "13px" }}
              >
                <option value="inside_ring_road">Inside Ring Road (Kathmandu / Lalitpur) - NPR 150</option>
                <option value="outside_ring_road">Outside Ring Road / Bhaktapur / Kirtipur - NPR 250</option>
                <option value="outside_valley">Outside Valley Courier (All Nepal) - NPR 500</option>
              </select>
            </div>

            {/* Coupon Code Input */}
            <div style={{ marginBottom: "16px" }}>
              {couponCode ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "var(--success-light)",
                    padding: "8px 12px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "13px",
                    color: "#065f46",
                    fontWeight: 600,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Tag size={15} />
                    <span>Coupon <strong>{couponCode}</strong> Active!</span>
                  </div>
                  <button onClick={removeCoupon} style={{ color: "#065f46" }}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    placeholder="Coupon (e.g. ADHIKARI10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="form-input"
                    style={{ padding: "8px 12px", fontSize: "13px", textTransform: "uppercase" }}
                  />
                  <button type="submit" className="btn btn-outline btn-sm">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: "var(--primary)" }}>NPR {cartSubtotal.toLocaleString()}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Delivery Fee</span>
                <span style={{ fontWeight: 600, color: deliveryFee === 0 ? "var(--success)" : "var(--primary)" }}>
                  {deliveryFee === 0 ? "FREE" : `NPR ${deliveryFee.toLocaleString()}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-crimson)", fontWeight: 600 }}>
                  <span>Discount</span>
                  <span>- NPR {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 800, color: "var(--primary)", paddingTop: "8px", borderTop: "1px solid var(--border-light)" }}>
                <span>Total</span>
                <span style={{ color: "var(--accent-steel)" }}>NPR {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="btn btn-primary btn-full btn-lg"
              style={{ gap: "8px" }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <ShieldCheck size={14} color="var(--success)" />
              <span>Authentic Nepali Payment (eSewa / Khalti / Cash on Delivery)</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
