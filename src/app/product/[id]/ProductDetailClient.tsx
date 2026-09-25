"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";
import {
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  ReceiptText,
  Clock,
  Phone,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Share2,
  ArrowRight,
  Check,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  categoryName: string;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  categoryName,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart, isInWishlist, toggleWishlist, openModal, storeInfo } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "delivery">("specs");
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", paddingBottom: "70px" }}>
      {/* Breadcrumb Bar */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "14px 0",
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
              color: "#6E6E73",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{ color: "#1C1C1E", textDecoration: "none", fontWeight: 500 }}
            >
              Home
            </Link>
            <ChevronRight size={13} color="#9CA3AF" />
            <Link
              href="/products"
              style={{ color: "#1C1C1E", textDecoration: "none", fontWeight: 500 }}
            >
              Catalog
            </Link>
            <ChevronRight size={13} color="#9CA3AF" />
            <Link
              href={`/category/${product.category}`}
              style={{ color: "#1C1C1E", textDecoration: "none", fontWeight: 500 }}
            >
              {categoryName}
            </Link>
            <ChevronRight size={13} color="#9CA3AF" />
            <span style={{ color: "#4A6572", fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ marginTop: "28px" }}>
        {/* Main 2-Column Product Showcase */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid #E5E7EB",
            padding: "36px",
            display: "grid",
            gridTemplateColumns: "1.05fr 1.2fr",
            gap: "48px",
            marginBottom: "36px",
          }}
          className="product-detail-layout"
        >
          {/* Left Column: Gallery */}
          <div>
            {/* Primary Main Image Frame */}
            <div
              style={{
                width: "100%",
                height: "440px",
                background: "#F8F9FA",
                borderRadius: "var(--radius-md)",
                border: "1px solid #E5E7EB",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              {/* Badges */}
              {product.discountPercent && product.discountPercent > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    zIndex: 3,
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      background: "#C1512D",
                      color: "#FFFFFF",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    -{product.discountPercent}% OFF
                  </span>
                </div>
              )}

              {/* Wishlist and Share Floating Buttons */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  zIndex: 3,
                }}
              >
                <button
                  onClick={() => toggleWishlist(product.id)}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "var(--radius-sm)",
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isFavorite ? "#C1512D" : "#6E6E73",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  }}
                  aria-label="Wishlist"
                >
                  <Heart size={18} fill={isFavorite ? "#C1512D" : "none"} />
                </button>

                <button
                  onClick={handleShare}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "var(--radius-sm)",
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: copiedLink ? "var(--success)" : "#6E6E73",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  }}
                  aria-label="Share product"
                  title="Copy product link"
                >
                  {copiedLink ? <Check size={18} /> : <Share2 size={18} />}
                </button>
              </div>

              <Image
                src={product.images[activeImageIndex] || product.images[0] || "/images/placeholder.webp"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{
                  objectFit: "contain",
                  padding: "24px",
                }}
              />
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: "10px" }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "var(--radius-sm)",
                      border:
                        activeImageIndex === idx
                          ? "2px solid #4A6572"
                          : "1px solid #E5E7EB",
                      background: "#FFFFFF",
                      padding: "4px",
                      cursor: "pointer",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="72px"
                      style={{
                        objectFit: "contain",
                        padding: "2px",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Brand & Subcategory Line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Link
                href={`/products?brand=${encodeURIComponent(product.brand)}`}
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#4A6572",
                  textDecoration: "none",
                }}
              >
                Brand: {product.brand}
              </Link>

              <span
                style={{
                  fontSize: "12px",
                  color: "#6E6E73",
                  background: "#F4F4F6",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {product.subcategory}
              </span>
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#1C1C1E",
                lineHeight: "1.3",
                marginBottom: "12px",
              }}
            >
              {product.name}
            </h1>

            {/* Ratings, Reviews & SKU */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid #E5E7EB",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill={i < Math.floor(product.rating) ? "#D97706" : "#E5E7EB"}
                      color={i < Math.floor(product.rating) ? "#D97706" : "#D1D5DB"}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1C1C1E",
                    marginLeft: "4px",
                  }}
                >
                  {product.rating}
                </span>
                <span style={{ fontSize: "12px", color: "#6E6E73" }}>
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>

              <span style={{ color: "#D1D5DB" }}>•</span>

              <span style={{ fontSize: "12px", color: "#6E6E73" }}>
                SKU: <strong>{product.sku}</strong>
              </span>

              <span style={{ color: "#D1D5DB" }}>•</span>

              {product.inStock ? (
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#166534",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircle2 size={14} />
                  <span>In Stock ({product.stockCount} units in Kathmandu)</span>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
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

            {/* Pricing Box */}
            <div
              style={{
                background: "#FAFAFA",
                border: "1px solid #E5E7EB",
                borderRadius: "var(--radius-md)",
                padding: "18px 22px",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    color: "#1C1C1E",
                    lineHeight: "1",
                  }}
                >
                  NPR {product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#9CA3AF",
                      textDecoration: "line-through",
                    }}
                  >
                    NPR {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span style={{ fontSize: "12px", color: "#6E6E73" }}>
                  per {product.unit}
                </span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#6E6E73",
                  marginTop: "6px",
                }}
              >
                Wholesale contractor volume discounts available on bulk orders.
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Action */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              {/* Stepper */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #E5E7EB",
                  borderRadius: "var(--radius-md)",
                  background: "#FFFFFF",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: "40px",
                    height: "44px",
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1C1C1E",
                    cursor: "pointer",
                  }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span
                  style={{
                    width: "44px",
                    textAlign: "center",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#1C1C1E",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stockCount, q + 1))
                  }
                  style={{
                    width: "40px",
                    height: "44px",
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1C1C1E",
                    cursor: "pointer",
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Primary Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn btn-primary btn-lg"
                style={{
                  flex: 1,
                  background: "#4A6572",
                  color: "#FFFFFF",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontWeight: 700,
                  opacity: product.inStock ? 1 : 0.5,
                  cursor: product.inStock ? "pointer" : "not-allowed",
                }}
              >
                <ShoppingCart size={18} />
                <span>Add {quantity} to Cart</span>
              </button>

              {/* Contractor Quote Button */}
              <button
                onClick={() => openModal("request_quote")}
                className="btn btn-outline btn-lg"
                style={{
                  borderColor: "#4A6572",
                  color: "#4A6572",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  fontWeight: 600,
                }}
              >
                <FileSpreadsheet size={16} />
                <span>Bulk Quote</span>
              </button>
            </div>

            {/* Quick Delivery & Support Row */}
            <div
              style={{
                marginTop: "auto",
                borderTop: "1px solid #E5E7EB",
                paddingTop: "18px",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
                fontSize: "12px",
                color: "#475569",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Truck size={16} color="#4A6572" style={{ flexShrink: 0 }} />
                <span>Same-day delivery across Kathmandu Valley</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} color="#4A6572" style={{ flexShrink: 0 }} />
                <span>Guaranteed genuine Nepal official warranty</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={16} color="#4A6572" style={{ flexShrink: 0 }} />
                <span>
                  Order helpline:{" "}
                  <a
                    href={`tel:${(storeInfo?.phone || "985-1145065").replace(/[^0-9]/g, "")}`}
                    style={{ color: "#4A6572", fontWeight: 700 }}
                  >
                    {storeInfo?.phone || "985-1145065"}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Technical & Delivery Section */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid #E5E7EB",
            overflow: "hidden",
            marginBottom: "48px",
          }}
        >
          {/* Tab Navigation Headers */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #E5E7EB",
              background: "#F8F9FA",
            }}
          >
            <button
              onClick={() => setActiveTab("specs")}
              style={{
                padding: "16px 28px",
                fontSize: "14px",
                fontWeight: 700,
                color: activeTab === "specs" ? "#4A6572" : "#6E6E73",
                background: activeTab === "specs" ? "#FFFFFF" : "transparent",
                border: "none",
                borderBottom:
                  activeTab === "specs"
                    ? "2px solid #4A6572"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("desc")}
              style={{
                padding: "16px 28px",
                fontSize: "14px",
                fontWeight: 700,
                color: activeTab === "desc" ? "#4A6572" : "#6E6E73",
                background: activeTab === "desc" ? "#FFFFFF" : "transparent",
                border: "none",
                borderBottom:
                  activeTab === "desc"
                    ? "2px solid #4A6572"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Application &amp; Description
            </button>
            <button
              onClick={() => setActiveTab("delivery")}
              style={{
                padding: "16px 28px",
                fontSize: "14px",
                fontWeight: 700,
                color: activeTab === "delivery" ? "#4A6572" : "#6E6E73",
                background: activeTab === "delivery" ? "#FFFFFF" : "transparent",
                border: "none",
                borderBottom:
                  activeTab === "delivery"
                    ? "2px solid #4A6572"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Kathmandu Valley Site Dispatch
            </button>
          </div>

          {/* Tab Content Body */}
          <div style={{ padding: "32px" }}>
            {activeTab === "specs" && (
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#1C1C1E",
                    marginBottom: "16px",
                  }}
                >
                  Factory Specifications
                </h3>

                <div
                  style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                  }}
                >
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <div
                      key={key}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        padding: "12px 20px",
                        fontSize: "13px",
                        background: idx % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                        borderBottom:
                          idx < Object.entries(product.specifications).length - 1
                            ? "1px solid #E5E7EB"
                            : "none",
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#475569" }}>{key}</span>
                      <span style={{ color: "#1C1C1E", fontWeight: 700 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "desc" && (
              <div style={{ maxWidth: "800px", lineHeight: "1.7", color: "#3A3A3C" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#1C1C1E",
                    marginBottom: "12px",
                  }}
                >
                  Product Overview &amp; Site Suitability
                </h3>
                <p style={{ fontSize: "14px", marginBottom: "16px" }}>
                  {product.description}
                </p>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1C1C1E",
                    marginBottom: "8px",
                  }}
                >
                  Authorized Nepal Warranty &amp; Authenticity Notice
                </h4>
                <p style={{ fontSize: "13px", color: "#6E6E73" }}>
                  This product is supplied directly through authorized Nepal brand distribution channels by New Adhikari Traders. All items carry valid factory warranty stamps and store purchase receipts.
                </p>
              </div>
            )}

            {activeTab === "delivery" && (
              <div style={{ maxWidth: "800px", lineHeight: "1.7", color: "#3A3A3C" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#1C1C1E",
                    marginBottom: "12px",
                  }}
                >
                  Delivery Logistics &amp; Contractor Dispatch
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                  <div>
                    <strong>• Kathmandu Valley Delivery:</strong> Orders confirmed before 1:00 PM are dispatched on the same day to Kalanki, Koteshwor, Chabahil, Balaju, Maharajgunj, Lalitpur, and Bhaktapur.
                  </div>
                  <div>
                    <strong>• Site Drop-off:</strong> Heavy building materials (cement, rebar, pipes) can be delivered directly to construction sites using our store transport fleet.
                  </div>
                  <div>
                    <strong>• Tracking Your Order:</strong> Once your order is processed, track live delivery status anytime inside your{" "}
                    <Link href="/orders" style={{ color: "#4A6572", fontWeight: 700 }}>
                      My Orders &amp; Tracking page
                    </Link>
                    .
                  </div>
                  <div>
                    <strong>• Depot Pickup:</strong> Free instant self-pickup available daily 7:00 AM – 8:00 PM at our Kathmandu warehouse depot.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#1C1C1E",
                    margin: 0,
                  }}
                >
                  Related Products in {categoryName}
                </h2>
                <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "2px" }}>
                  Frequently paired tools and hardware accessories
                </div>
              </div>

              <Link
                href={`/category/${product.category}`}
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#4A6572",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  textDecoration: "none",
                }}
              >
                <span>View all in {categoryName}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Embedded Responsive Styles */}
      <style jsx>{`
        @media (max-width: 900px) {
          .product-detail-layout {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
