"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/types";
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Share2,
  FileCheck,
  Plus,
  Minus,
  Check,
} from "lucide-react";

export function ProductDetailModal() {
  const {
    activeModal,
    closeModal,
    selectedProduct,
    addToCart,
    openModal,
    isInWishlist,
    toggleWishlist,
    openProductDetail,
    addToast,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "delivery">("specs");

  // Fix image/product mismatch bug: always reset activeImageIndex and quantity when selectedProduct changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [selectedProduct?.id]);

  if (activeModal !== "product_detail" || !selectedProduct) {
    return null;
  }

  const isFavorite = isInWishlist(selectedProduct.id);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!selectedProduct) return;
    fetch(`/api/products?category=${encodeURIComponent(selectedProduct.category)}&limit=4`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.products && Array.isArray(data.products)) {
          const list = data.products
            .filter((p: any) => p.id !== selectedProduct.id)
            .slice(0, 3)
            .map((p: any) => ({
              id: p.id,
              name: p.name,
              brand: p.brand?.name || p.brand || "Authorized",
              category: p.category?.slug || p.categoryId || selectedProduct.category,
              price: p.price,
              originalPrice: p.compareAtPrice || p.originalPrice,
              discountPercent: p.deals?.[0]?.discountPercent || 0,
              rating: p.ratingAvg || p.rating || 5.0,
              reviewsCount: p.ratingCount || p.reviewsCount || 10,
              inStock: p.isInStock ?? p.inStock ?? true,
              stockCount: p.stockQuantity ?? p.stockCount ?? 8,
              sku: p.sku,
              unit: p.unit || "Piece",
              description: p.description || "",
              specifications: p.technicalSpecs || p.specifications || {},
              images: Array.isArray(p.images)
                ? p.images.map((img: any) => (typeof img === "string" ? img : img.imageUrl))
                : ["/images/placeholder.webp"],
              tags: p.tags || [],
            } as Product));
          setRelatedProducts(list);
        }
      })
      .catch(() => {});
  }, [selectedProduct?.id, selectedProduct?.category]);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    closeModal();
    openModal("checkout");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast("Link Copied", "Product link copied to clipboard.", "info");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(28, 28, 30, 0.6)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end",
        transition: "opacity 0.2s ease",
      }}
      onClick={closeModal}
    >
      {/* Slide-in Drawer from Right at Full Viewport Height */}
      <div
        style={{
          width: "100%",
          maxWidth: "840px",
          height: "100vh",
          background: "#FFFFFF",
          boxShadow: "-10px 0 35px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          animation: "slideInDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 32px",
            borderBottom: "1px solid #E5E7EB",
            position: "sticky",
            top: 0,
            background: "#FFFFFF",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#4A6572",
                background: "#EBF0F2",
                padding: "3px 8px",
                borderRadius: "var(--radius-sm)",
              }}
            >
              SKU: {selectedProduct.sku}
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#1C1C1E",
                background: "#F4F4F6",
                padding: "3px 8px",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {selectedProduct.brand} Official Partner
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={handleShare}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                background: "#FAFAFA",
                border: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3A3A3C",
                transition: "border-color var(--transition-fast)",
              }}
              title="Share Product Link"
            >
              <Share2 size={16} />
            </button>

            <button
              onClick={closeModal}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                background: "#FAFAFA",
                border: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1C1C1E",
                transition: "border-color var(--transition-fast)",
              }}
              aria-label="Close product view"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Drawer Body - Spacious 50/50 Grid */}
        <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "36px" }}>
          {/* Main Product Info: 50% Image Column, 50% Info Column */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "36px",
              alignItems: "start",
            }}
            className="product-detail-grid"
          >
            {/* Left 50%: Large Image & Thumbnails */}
            <div>
              {/* Primary Large Image */}
              <div
                style={{
                  width: "100%",
                  height: "380px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  background: "#FAFAFA",
                  border: "1px solid #E5E7EB",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Image
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0] || "/images/placeholder.webp"}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: "contain",
                    padding: "16px",
                  }}
                />
              </div>

              {/* Large Thumbnails Strip */}
              {selectedProduct.images.length > 1 && (
                <div style={{ display: "flex", gap: "12px" }}>
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: "76px",
                        height: "76px",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        border:
                          activeImageIndex === idx
                            ? "2px solid #4A6572"
                            : "1px solid #E5E7EB",
                        background: "#FAFAFA",
                        cursor: "pointer",
                        padding: "4px",
                        transition: "border-color var(--transition-fast)",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={img}
                        alt="thumbnail"
                        fill
                        sizes="76px"
                        style={{ objectFit: "contain", padding: "2px" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right 50%: Details & Purchase Actions with Generous Whitespace */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Brand & Subcategory */}
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#4A6572",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                {selectedProduct.brand} • {selectedProduct.subcategory}
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.3",
                  marginBottom: "14px",
                }}
              >
                {selectedProduct.name}
              </h1>

              {/* Rating & Stock Availability */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "18px",
                  borderBottom: "1px solid #E5E7EB",
                  marginBottom: "22px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      background: "#FEF3C7",
                      color: "#D97706",
                      padding: "2px 8px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    <Star size={13} fill="#D97706" color="#D97706" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <span style={{ fontSize: "12px", color: "#6E6E73" }}>
                    ({selectedProduct.reviewsCount} verified reviews)
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: selectedProduct.inStock ? "#1E824C" : "#C1512D",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircle2 size={14} />
                  <span>
                    {selectedProduct.inStock
                      ? `In Stock (${selectedProduct.stockCount} ${selectedProduct.unit}s)`
                      : "Currently Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Price Block - Generous Spacing */}
              <div style={{ marginBottom: "26px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "32px", fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.02em" }}>
                    NPR {selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span style={{ fontSize: "16px", color: "#6E6E73", textDecoration: "line-through" }}>
                      NPR {selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {selectedProduct.discountPercent && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        background: "#FBEFEB",
                        color: "#C1512D",
                        border: "1px solid #F0D0C7",
                        padding: "3px 8px",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      SAVE {selectedProduct.discountPercent}%
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "#6E6E73" }}>
                  Unit: <strong>{selectedProduct.unit}</strong> • Genuine hardware guarantee
                </div>
              </div>

              {/* Kathmandu Express Shipping Note */}
              <div
                style={{
                  background: "#FAFAFA",
                  border: "1px solid #E5E7EB",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Truck size={18} color="#4A6572" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: "12px", color: "#3A3A3C", lineHeight: "1.4" }}>
                  <strong>Same-Day Dispatch in Kathmandu Valley:</strong> Orders confirmed before 2:00 PM are dispatched directly from our central Kathmandu depot.
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                {/* Stepper */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #D1D5DB",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    height: "46px",
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      padding: "0 14px",
                      height: "100%",
                      background: "#FAFAFA",
                      color: "#1C1C1E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span
                    style={{
                      padding: "0 16px",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "#1C1C1E",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      padding: "0 14px",
                      height: "100%",
                      background: "#FAFAFA",
                      color: "#1C1C1E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Add to Cart in Muted Steel-Blue */}
                <button
                  onClick={() => addToCart(selectedProduct, quantity)}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    height: "46px",
                    fontSize: "14px",
                    fontWeight: 700,
                    background: "#4A6572",
                    color: "#FFFFFF",
                  }}
                >
                  <ShoppingCart size={17} />
                  <span>Add to Cart</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid #D1D5DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isFavorite ? "#C1512D" : "#6E6E73",
                    background: "#FFFFFF",
                  }}
                  title="Save to Wishlist"
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={19} fill={isFavorite ? "#C1512D" : "none"} />
                </button>
              </div>

              {/* Instant Checkout / Buy Now */}
              <button
                onClick={handleBuyNow}
                className="btn btn-secondary btn-full"
                style={{
                  height: "46px",
                  fontSize: "14px",
                  fontWeight: 700,
                  background: "#1C1C1E",
                  color: "#FFFFFF",
                }}
              >
                <span>Instant Checkout (Buy Now)</span>
              </button>
            </div>
          </div>

          {/* Plain 3-Column Trust Row (Clean icon+text row, NOT a boxed card block) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              padding: "20px 0",
              borderTop: "1px solid #E5E7EB",
              borderBottom: "1px solid #E5E7EB",
            }}
            className="trust-row-grid"
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <ShieldCheck size={20} color="#4A6572" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13px", color: "#1C1C1E", display: "block" }}>
                  100% Genuine Guarantee
                </strong>
                <span style={{ fontSize: "12px", color: "#6E6E73" }}>
                  Official brand warranties with verified serial numbers
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <Truck size={20} color="#4A6572" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13px", color: "#1C1C1E", display: "block" }}>
                  Kathmandu Valley Delivery
                </strong>
                <span style={{ fontSize: "12px", color: "#6E6E73" }}>
                  Direct delivery to site gate or workshop
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <RotateCcw size={20} color="#4A6572" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13px", color: "#1C1C1E", display: "block" }}>
                  7-Day Replacement
                </strong>
                <span style={{ fontSize: "12px", color: "#6E6E73" }}>
                  Hassle-free replacement for defective tools and accessories
                </span>
              </div>
            </div>
          </div>

          {/* Details & Specs Tabs - Restyled in Poppins + Steel-Blue Active Tab */}
          <div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                borderBottom: "1px solid #E5E7EB",
                marginBottom: "24px",
              }}
            >
              {[
                { id: "specs", label: "Technical Specifications" },
                { id: "desc", label: "Product Description" },
                { id: "delivery", label: "Kathmandu Valley Delivery" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: "10px 16px",
                    fontSize: "14px",
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? "#4A6572" : "#6E6E73",
                    borderBottom: activeTab === tab.id ? "2px solid #4A6572" : "2px solid transparent",
                    background: "none",
                    transition: "color var(--transition-fast)",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Specs */}
            {activeTab === "specs" && (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <tbody>
                    {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                      <tr
                        key={key}
                        style={{
                          background: idx % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px 14px",
                            fontWeight: 600,
                            color: "#1C1C1E",
                            width: "35%",
                          }}
                        >
                          {key}
                        </td>
                        <td style={{ padding: "10px 14px", color: "#3A3A3C" }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 2: Description */}
            {activeTab === "desc" && (
              <div style={{ fontSize: "14px", color: "#3A3A3C", lineHeight: "1.7" }}>
                <p style={{ marginBottom: "14px" }}>{selectedProduct.description}</p>
                <div style={{ marginTop: "16px" }}>
                  <div style={{ fontWeight: 700, color: "#1C1C1E", marginBottom: "8px" }}>
                    Standard Package Includes:
                  </div>
                  <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <li>1x Genuine {selectedProduct.name}</li>
                    <li>Official Manufacturer Warranty Certificate (Nepal)</li>
                    <li>Technical Operation Manual &amp; Safety Guide</li>
                    <li>Standard Authorized Service Coverage at Kathmandu Center</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: Delivery */}
            {activeTab === "delivery" && (
              <div style={{ fontSize: "14px", color: "#3A3A3C", lineHeight: "1.7" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div
                    style={{
                      background: "#FAFAFA",
                      border: "1px solid #E5E7EB",
                      borderRadius: "var(--radius-md)",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                      Kathmandu, Lalitpur &amp; Bhaktapur
                    </div>
                    <p style={{ fontSize: "13px", color: "#6E6E73" }}>
                      Same-day courier and site delivery for orders placed before 2:00 PM. Flat delivery charge: NPR 150 (Free for orders above NPR 10,000).
                    </p>
                  </div>

                  <div
                    style={{
                      background: "#FAFAFA",
                      border: "1px solid #E5E7EB",
                      borderRadius: "var(--radius-md)",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#1C1C1E", marginBottom: "4px" }}>
                      Bulk Heavy Freight / Cement &amp; Steel
                    </div>
                    <p style={{ fontSize: "13px", color: "#6E6E73" }}>
                      Dedicated mini-truck site delivery dispatched directly from Kathmandu depot. Delivery scheduled within 4 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Products Strip */}
          {relatedProducts.length > 0 && (
            <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "24px" }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1C1C1E", marginBottom: "16px" }}>
                Other {selectedProduct.subcategory} Options
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      openProductDetail(rel);
                      setActiveImageIndex(0);
                    }}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "var(--radius-md)",
                      padding: "12px",
                      cursor: "pointer",
                      transition: "border-color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1C1C1E")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "contain",
                        marginBottom: "8px",
                      }}
                    />
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#4A6572" }}>{rel.brand}</div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#1C1C1E",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: "4px",
                      }}
                    >
                      {rel.name}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1C1C1E" }}>
                      NPR {rel.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInDrawer {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .trust-row-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
