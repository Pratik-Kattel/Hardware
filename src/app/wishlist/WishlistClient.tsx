"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Product } from "@/types";

export function WishlistClient() {
  const { wishlist, toggleWishlist, addToCart, storeInfo } = useStore();
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch product details for wishlist items
  useEffect(() => {
    if (wishlist.length === 0) {
      setSavedProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/products?limit=100")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.products && Array.isArray(data.products)) {
          const list = data.products
            .filter((p: any) => wishlist.includes(p.id) || wishlist.includes(p.slug))
            .map((p: any) => ({
              id: p.id,
              name: p.name,
              brand: p.brand?.name || p.brand || "Authorized",
              category: p.category?.slug || p.categoryId || "power-tools",
              subcategory: p.subcategory || "",
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
          setSavedProducts(list);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [wishlist]);

  const handleAddAllToCart = () => {
    savedProducts.forEach((product) => {
      if (product.inStock) {
        addToCart(product, 1);
      }
    });
  };

  const phoneNum = storeInfo?.phone || "985-1145065";

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
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "10px",
                }}
              >
                <Heart size={13} fill="#C1512D" color="#C1512D" />
                <span>Saved Hardware &amp; Materials</span>
              </div>
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: "0 0 6px 0",
                }}
              >
                Saved For Your Project
              </h1>
              <p style={{ fontSize: "15px", color: "#CBD5E1", margin: 0 }}>
                Keep track of items you need for upcoming construction phases in Kathmandu Valley.
              </p>
            </div>

            {savedProducts.length > 0 && (
              <button
                onClick={handleAddAllToCart}
                className="btn btn-primary btn-lg"
                style={{
                  background: "#4A6572",
                  color: "#FFFFFF",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  minHeight: "44px",
                  padding: "10px 22px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <ShoppingCart size={17} />
                <span>Add All In-Stock to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: "36px" }}>
        {savedProducts.length === 0 && !loading ? (
          /* Empty State */
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "var(--radius-lg)",
              padding: "70px 24px",
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
                background: "#FAFAFA",
                border: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                color: "#6E6E73",
              }}
            >
              <Heart size={28} />
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
                Real-time Kathmandu depot availability
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
                        position: "relative",
                      }}
                    >
                      <Image
                        src={product.images[0] || "/images/placeholder.webp"}
                        alt={product.name}
                        fill
                        sizes="90px"
                        style={{
                          objectFit: "contain",
                          padding: "6px",
                        }}
                      />
                    </Link>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "#4A6572",
                          letterSpacing: "0.04em",
                          marginBottom: "4px",
                        }}
                      >
                        {product.brand}
                      </div>

                      <Link
                        href={`/product/${product.id}`}
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#1C1C1E",
                          textDecoration: "none",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: "1.35",
                          marginBottom: "8px",
                        }}
                      >
                        {product.name}
                      </Link>

                      <div style={{ fontSize: "17px", fontWeight: 800, color: "#1C1C1E" }}>
                        NPR {product.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Stock status indicator */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      marginBottom: "16px",
                    }}
                  >
                    {product.inStock ? (
                      <>
                        <CheckCircle2 size={15} color="#1E824C" />
                        <span style={{ color: "#1E824C", fontWeight: 600 }}>In Stock</span>
                        <span style={{ color: "#6E6E73" }}>· Ready for dispatch</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: "#DC2626", fontWeight: 600 }}>Out of Stock</span>
                        <span style={{ color: "#6E6E73" }}>· Available on pre-order</span>
                      </>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "auto",
                      paddingTop: "14px",
                      borderTop: "1px solid #E5E7EB",
                    }}
                  >
                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={!product.inStock}
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        background: product.inStock ? "#4A6572" : "#E5E7EB",
                        color: product.inStock ? "#FFFFFF" : "#9CA3AF",
                        cursor: product.inStock ? "pointer" : "not-allowed",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        minHeight: "40px",
                        fontSize: "14px",
                        fontWeight: 700,
                        border: "none",
                      }}
                    >
                      <ShoppingCart size={15} />
                      <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "var(--radius-sm)",
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#DC2626",
                        cursor: "pointer",
                      }}
                      title="Remove from saved list"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Procurement Banner */}
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
            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1C1C1E", margin: "0 0 4px 0" }}>
              Looking for commercial bulk quotation?
            </h3>
            <p style={{ fontSize: "14px", color: "#6E6E73", margin: 0 }}>
              Direct contractor volume rates and same-day delivery available across Kathmandu Valley.
            </p>
          </div>

          <a
            href={`tel:${phoneNum.replace(/[^0-9]/g, "")}`}
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
              textDecoration: "none",
            }}
          >
            <Phone size={16} />
            <span>Call Us: {phoneNum}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
