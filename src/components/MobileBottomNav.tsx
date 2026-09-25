"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Home, Store, ShoppingCart, User, Heart } from "lucide-react";

export function MobileBottomNav() {
  const { cartCount, wishlistCount, openModal } = useStore();

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
        padding: "4px 4px 6px 4px",
        zIndex: 899,
        boxShadow: "0 -4px 14px rgba(0, 0, 0, 0.08)",
        height: "60px",
        boxSizing: "border-box",
      }}
      aria-label="Mobile Navigation Bar"
    >
      <Link
        href="/"
        style={{
          minWidth: "48px",
          minHeight: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          color: "var(--primary)",
          fontSize: "12px",
          fontWeight: 600,
          textDecoration: "none",
        }}
        aria-label="Home"
      >
        <Home size={20} />
        <span>Home</span>
      </Link>

      <Link
        href="/products"
        style={{
          minWidth: "48px",
          minHeight: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          color: "var(--text-secondary)",
          fontSize: "12px",
          fontWeight: 600,
          textDecoration: "none",
        }}
        aria-label="Product Catalog"
      >
        <Store size={20} />
        <span>Catalog</span>
      </Link>

      <Link
        href="/wishlist"
        style={{
          minWidth: "48px",
          minHeight: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          color: "var(--accent-steel)",
          fontSize: "12px",
          fontWeight: 600,
          textDecoration: "none",
          position: "relative",
        }}
        aria-label={`Wishlist (${wishlistCount} saved items)`}
      >
        <div style={{ position: "relative" }}>
          <Heart size={20} />
          {wishlistCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "var(--highlight-rust)",
                color: "#ffffff",
                fontSize: "10px",
                fontWeight: 800,
                minWidth: "16px",
                height: "16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 2px",
              }}
            >
              {wishlistCount}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </Link>

      <button
        onClick={() => openModal("cart")}
        style={{
          minWidth: "48px",
          minHeight: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          color: "var(--text-secondary)",
          fontSize: "12px",
          fontWeight: 600,
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        aria-label={`My Cart with ${cartCount} items`}
      >
        <div style={{ position: "relative" }}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "var(--highlight-rust)",
                color: "#ffffff",
                fontSize: "10px",
                fontWeight: 800,
                minWidth: "16px",
                height: "16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 2px",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
        <span>My Cart</span>
      </button>

      <Link
        href="/account/orders"
        style={{
          minWidth: "48px",
          minHeight: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          color: "var(--text-secondary)",
          fontSize: "12px",
          fontWeight: 600,
          textDecoration: "none",
        }}
        aria-label="My Orders"
      >
        <User size={20} />
        <span>My Orders</span>
      </Link>

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
