"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

export function WishlistClient() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  // Resolve saved products from store wishlist IDs
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach((product) => {
      if (product.inStock) {
        addToCart(product, 1);
      }
    });
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
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>My Wishlist</span>
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
                Saved Hardware Supplies
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
                My Wishlist
              </h1>
              <p style={{ fontSize: "16px", color: "#CBD5E1", maxWidth: "600px" }}>
                Keep track of essential tools, plumbing fittings, paints, and construction supplies for your upcoming projects.
              </p>
            </div>

            {savedProducts.length > 0 && (
              <button
                onClick={handleAddAllToCart}
                className="btn btn-primary btn-lg"
                style={{
                  background: "#4A6572",
                  color: "#FFFFFF",
                  minHeight: "48px",
                  padding: "12px 24px",
                  fontSize: "15px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <ShoppingCart size={18} />
                <span>Add All In-Stock to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "32px" }}>
        {savedProducts.length === 0 ? (
          /* Empty State */
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #E5E7EB",
              padding: "64px 24px",
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(193, 81, 45, 0.1)",
                color: "#C1512D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
              }}
            >
              <Heart size={32} />
            </div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#1C1C1E",
                marginBottom: "10px",
              }}
            >
              Your Wishlist is Empty
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#6E6E73",
                lineHeight: "1.6",
                marginBottom: "28px",
              }}
            >
              You haven&apos;t saved any hardware products yet. Explore our store catalog to bookmark tools, materials, and equipment for your next site order.
            </p>
            <Link
              href="/products"
              className="btn btn-primary btn-lg"
              style={{
                background: "#4A6572",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "48px",
                padding: "12px 28px",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <span>Explore Hardware Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* Wishlist Items List */
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "12px",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#1C1C1E" }}>
                {savedProducts.length} Saved {savedProducts.length === 1 ? "Product" : "Products"}
              </span>
              <span style={{ fontSize: "14px", color: "#6E6E73" }}>
                Prices include 13% Official Nepal VAT
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid #E5E7EB",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {/* Top Image & Info Row */}
                  <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                    <Link
                      href={`/product/${product.id}`}
                      style={{
                        width: "90px",
                        height: "90px",
                        background: "#F8F9FA",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid #E5E7EB",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "6px",
                        }}
                      />
                    </Link>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "#4A6572",
                          letterSpacing: "0.04em",
                          marginBottom: "4px",
                        }}
                      >
                        {product.brand} • {product.subcategory}
                      </div>

                      <Link
                        href={`/product/${product.id}`}
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#1C1C1E",
                          lineHeight: "1.35",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textDecoration: "none",
                          marginBottom: "8px",
                        }}
                      >
                        {product.name}
                      </Link>

                      {product.inStock ? (
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#166534",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <CheckCircle2 size={14} />
                          <span>In Stock</span>
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#C1512D",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <AlertCircle size={14} />
                          <span>Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "8px",
                      marginBottom: "16px",
                      paddingTop: "12px",
                      borderTop: "1px solid #E5E7EB",
                    }}
                  >
                    <span style={{ fontSize: "20px", fontWeight: 800, color: "#1C1C1E" }}>
                      NPR {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#9CA3AF",
                          textDecoration: "line-through",
                        }}
                      >
                        NPR {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span style={{ fontSize: "14px", color: "#6E6E73" }}>
                      per {product.unit}
                    </span>
                  </div>

                  {/* Action Buttons: Add to Cart & Remove (both >= 44px tap target) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "auto",
                    }}
                  >
                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={!product.inStock}
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        background: "#4A6572",
                        color: "#FFFFFF",
                        minHeight: "44px",
                        fontSize: "14px",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        opacity: product.inStock ? 1 : 0.5,
                        cursor: product.inStock ? "pointer" : "not-allowed",
                      }}
                      aria-label={`Add ${product.name} to Cart`}
                    >
                      <ShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="btn btn-outline"
                      style={{
                        minHeight: "44px",
                        minWidth: "44px",
                        padding: "8px 14px",
                        borderColor: "#D1D5DB",
                        color: "#6E6E73",
                        fontSize: "14px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                      title="Remove from Wishlist"
                      aria-label={`Remove ${product.name} from Wishlist`}
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contractor / Support Callout */}
        <div
          style={{
            marginTop: "48px",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "var(--radius-lg)",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E", marginBottom: "4px" }}>
              Ordering Bulk Quantities for Project Sites?
            </h3>
            <p style={{ fontSize: "14px", color: "#6E6E73", margin: 0 }}>
              Direct contractor volume rates and same-day delivery available across Kathmandu Valley.
            </p>
          </div>

          <a
            href="tel:9851145065"
            className="btn btn-outline"
            style={{
              borderColor: "#4A6572",
              color: "#4A6572",
              minHeight: "44px",
              padding: "10px 20px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Phone size={16} />
            <span>Call Us: 985-1145065</span>
          </a>
        </div>
      </div>
    </div>
  );
}
