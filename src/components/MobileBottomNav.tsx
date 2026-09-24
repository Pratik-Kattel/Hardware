"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { Home, Store, ShoppingCart, User, HardHat } from "lucide-react";

export function MobileBottomNav() {
  const { cartCount, openModal, setSelectedCategory } = useStore();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShopClick = () => {
    setSelectedCategory("all");
    const shopEl = document.getElementById("shop-section");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#ffffff",
        borderTop: "1px solid var(--border-medium)",
        display: "none",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "8px 0 10px 0",
        zIndex: 899,
        boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <button
        onClick={handleHomeClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          color: "var(--primary)",
          fontSize: "11px",
          fontWeight: 600,
        }}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        onClick={handleShopClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          color: "var(--text-secondary)",
          fontSize: "11px",
          fontWeight: 600,
        }}
      >
        <Store size={20} />
        <span>Shop</span>
      </button>

      <button
        onClick={() => openModal("request_quote")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          color: "var(--accent-steel)",
          fontSize: "11px",
          fontWeight: 700,
        }}
      >
        <HardHat size={20} />
        <span>Quote</span>
      </button>

      <button
        onClick={() => openModal("cart")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          color: "var(--text-secondary)",
          fontSize: "11px",
          fontWeight: 600,
          position: "relative",
        }}
      >
        <div style={{ position: "relative" }}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "var(--accent-steel)",
                color: "#ffffff",
                fontSize: "10px",
                fontWeight: 800,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      <button
        onClick={() => openModal("auth")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          color: "var(--text-secondary)",
          fontSize: "11px",
          fontWeight: 600,
        }}
      >
        <User size={20} />
        <span>Account</span>
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
