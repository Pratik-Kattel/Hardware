"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
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

  if (activeModal !== "product_detail" || !selectedProduct) {
    return null;
  }

  const isFavorite = isInWishlist(selectedProduct.id);

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
  ).slice(0, 3);

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
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        style={{
          maxWidth: "880px",
          padding: "0",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="badge badge-navy" style={{ fontSize: "11px" }}>
              SKU: {selectedProduct.sku}
            </span>
            <span className="badge badge-amber" style={{ fontSize: "11px" }}>
              {selectedProduct.brand} Official
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={handleShare}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--bg-surface-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
              }}
              title="Share Product"
            >
              <Share2 size={16} />
            </button>

            <button
              onClick={closeModal}
              className="modal-close-btn"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px 30px", maxHeight: "calc(88vh - 80px)", overflowY: "auto" }}>
          {/* Main Product Info Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              gap: "30px",
              marginBottom: "32px",
            }}
            className="product-detail-grid"
          >
            {/* Left: Images */}
            <div>
              {/* Primary Large Image */}
              <div
                style={{
                  width: "100%",
                  height: "320px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  background: "#f8fafc",
                  border: "1px solid var(--border-light)",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div style={{ display: "flex", gap: "10px" }}>
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        border:
                          activeImageIndex === idx
                            ? "2px solid var(--accent-orange)"
                            : "1px solid var(--border-medium)",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  background: "var(--primary-surface)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--primary)" }}>
                  <ShieldCheck size={16} color="var(--accent-orange)" />
                  <span><strong>100% Genuine Guarantee</strong> with Nepal Brand Warranty</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--primary)" }}>
                  <FileCheck size={16} color="var(--success)" />
                  <span><strong>Official 13% VAT Bill</strong> provided for Tax Compliance</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--primary)" }}>
                  <RotateCcw size={16} color="var(--info)" />
                  <span><strong>7-Day Replacement</strong> for manufacturing defects</span>
                </div>
              </div>
            </div>

            {/* Right: Details & Purchase */}
            <div>
              {/* Brand & Subcategory */}
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-orange)", textTransform: "uppercase", marginBottom: "4px" }}>
                {selectedProduct.brand} • {selectedProduct.subcategory}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "var(--primary)",
                  lineHeight: "1.3",
                  marginBottom: "12px",
                }}
              >
                {selectedProduct.name}
              </h2>

              {/* Rating & Stock */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--border-light)",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      background: "var(--accent-amber-light)",
                      color: "var(--accent-amber-dark)",
                      padding: "2px 8px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    <Star size={13} fill="var(--accent-amber)" color="var(--accent-amber)" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    ({selectedProduct.reviewsCount} verified Nepal reviews)
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: selectedProduct.inStock ? "var(--success)" : "var(--error)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircle2 size={14} />
                  <span>In Stock ({selectedProduct.stockCount} {selectedProduct.unit}s available)</span>
                </div>
              </div>

              {/* Price Block */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "30px", fontWeight: 800, color: "var(--primary)" }}>
                    NPR {selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span style={{ fontSize: "16px", color: "var(--text-muted)", textDecoration: "line-through" }}>
                      NPR {selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {selectedProduct.discountPercent && (
                    <span className="badge badge-crimson" style={{ fontSize: "12px", fontWeight: 800 }}>
                      -{selectedProduct.discountPercent}% OFF
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Unit: <strong>{selectedProduct.unit}</strong> • Inclusive of all Nepali taxes &amp; 13% VAT
                </div>
              </div>

              {/* Kathmandu Express Shipping Notice */}
              <div
                style={{
                  background: "var(--bg-surface-secondary)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Truck size={20} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: "12px", color: "var(--text-main)" }}>
                  <strong>Same-Day Delivery in Kathmandu Valley:</strong> Order before 2:00 PM for dispatch today from Kalanki warehouse.
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                {/* Stepper */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1.5px solid var(--border-medium)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    height: "44px",
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      padding: "0 14px",
                      height: "100%",
                      background: "var(--bg-surface-secondary)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    style={{
                      padding: "0 18px",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "var(--primary)",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      padding: "0 14px",
                      height: "100%",
                      background: "var(--bg-surface-secondary)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(selectedProduct, quantity)}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    height: "44px",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "var(--radius-md)",
                    border: "1.5px solid var(--border-medium)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isFavorite ? "var(--accent-crimson)" : "var(--text-muted)",
                    background: "#ffffff",
                  }}
                  title="Save to Wishlist"
                >
                  <Heart size={20} fill={isFavorite ? "var(--accent-crimson)" : "none"} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="btn btn-secondary btn-full"
                style={{
                  height: "44px",
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                <span>Instant Checkout (Buy Now)</span>
              </button>
            </div>
          </div>

          {/* Details & Specs Tabs */}
          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "24px" }}>
            <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border-light)", marginBottom: "20px" }}>
              {[
                { id: "specs", label: "Technical Specifications" },
                { id: "desc", label: "Product Description" },
                { id: "delivery", label: "Kathmandu Valley Delivery" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: "10px 18px",
                    fontSize: "14px",
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? "var(--accent-orange)" : "var(--text-muted)",
                    borderBottom: activeTab === tab.id ? "3px solid var(--accent-orange)" : "3px solid transparent",
                    background: "none",
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
                          background: idx % 2 === 0 ? "var(--bg-surface-secondary)" : "#ffffff",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px 16px",
                            fontWeight: 600,
                            color: "var(--primary)",
                            width: "35%",
                            borderBottom: "1px solid var(--border-light)",
                          }}
                        >
                          {key}
                        </td>
                        <td
                          style={{
                            padding: "10px 16px",
                            color: "var(--text-secondary)",
                            borderBottom: "1px solid var(--border-light)",
                          }}
                        >
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 2: Description */}
            {activeTab === "desc" && (
              <div style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                <p style={{ marginBottom: "14px" }}>{selectedProduct.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                  {selectedProduct.tags.map((tag) => (
                    <span key={tag} className="badge badge-navy" style={{ fontSize: "11px" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Delivery */}
            {activeTab === "delivery" && (
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                <div style={{ fontWeight: 700, color: "var(--primary)", marginBottom: "8px" }}>
                  Dispatch from Adhikari Hardware Central Hub (Kalanki, Kathmandu):
                </div>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <li><strong>Inside Ring Road (Kathmandu/Lalitpur):</strong> NPR 150 (FREE for orders above NPR 5,000). Delivered within 3-6 hours.</li>
                  <li><strong>Outside Ring Road / Bhaktapur / Kirtipur:</strong> NPR 250 flat fee.</li>
                  <li><strong>Outside Kathmandu Valley (Pokhara, Narayangarh, Butwal, Biratnagar, etc.):</strong> NPR 500 via trusted transport courier.</li>
                  <li><strong>Store Pickup:</strong> Free instant collection at our Kalanki store counter.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "36px", paddingTop: "24px", borderTop: "1px solid var(--border-light)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--primary)", marginBottom: "16px" }}>
                Frequently Bought Together
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => openProductDetail(rel)}
                    style={{
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      padding: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "#ffffff",
                    }}
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "var(--radius-sm)",
                      }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--primary)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {rel.name}
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-orange)" }}>
                        NPR {rel.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
