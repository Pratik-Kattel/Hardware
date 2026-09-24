"use client";

import React from "react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInWishlist, toggleWishlist, openProductDetail } = useStore();

  const isFavorite = isInWishlist(product.id);

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "var(--radius-lg)",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color var(--transition-fast)",
        position: "relative",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#1C1C1E";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E5E7EB";
      }}
    >
      {/* Badges Overlay - Factual Discount only, NO arbitrary Best Deal pill */}
      {product.discountPercent && product.discountPercent > 0 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              background: "#C1512D",
              color: "#FFFFFF",
              padding: "2px 7px",
              borderRadius: "var(--radius-sm)",
            }}
          >
            -{product.discountPercent}%
          </span>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 3,
          width: "32px",
          height: "32px",
          borderRadius: "var(--radius-sm)",
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.15s",
          color: isFavorite ? "#C1512D" : "#6E6E73",
        }}
        aria-label="Toggle Wishlist"
      >
        <Heart size={16} fill={isFavorite ? "#C1512D" : "none"} />
      </button>

      {/* Product Image Container */}
      <div
        onClick={() => openProductDetail(product)}
        style={{
          width: "100%",
          height: "210px",
          background: "#F8F9FA",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Quick View Button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openProductDetail(product);
          }}
          style={{
            position: "absolute",
            bottom: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1C1C1E",
            color: "#FFFFFF",
            padding: "5px 12px",
            borderRadius: "var(--radius-sm)",
            fontSize: "11px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            border: "none",
            opacity: 0.9,
          }}
        >
          <Eye size={13} />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Card Details */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Brand & Subcategory */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "4px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "#4A6572",
            }}
          >
            {product.brand}
          </span>
          <span style={{ fontSize: "11px", color: "#6E6E73" }}>
            {product.subcategory}
          </span>
        </div>

        {/* Product Title */}
        <h4
          onClick={() => openProductDetail(product)}
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#1C1C1E",
            lineHeight: "1.35",
            marginBottom: "8px",
            cursor: "pointer",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "38px",
          }}
          title={product.name}
        >
          {product.name}
        </h4>

        {/* Rating & Stock Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#1C1C1E",
              }}
            >
              <Star size={12} fill="#D97706" color="#D97706" />
              <span>{product.rating}</span>
            </div>
            <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
              ({product.reviewsCount})
            </span>
          </div>

          {product.inStock ? (
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#1E824C",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <CheckCircle2 size={12} />
              <span>In Stock</span>
            </div>
          ) : (
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#C1512D",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <AlertCircle size={12} />
              <span>Out of Stock</span>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Action */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "1px solid #E5E7EB",
            gap: "8px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "#1C1C1E",
                lineHeight: "1.1",
              }}
            >
              NPR {product.price.toLocaleString()}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#9CA3AF",
                  textDecoration: "line-through",
                }}
              >
                NPR {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="btn btn-primary btn-sm"
            style={{
              padding: "7px 12px",
              gap: "5px",
              background: "#4A6572",
              color: "#FFFFFF",
              border: "none",
              boxShadow: "none",
              opacity: product.inStock ? 1 : 0.5,
            }}
            aria-label={`Add ${product.name} to Cart`}
          >
            <ShoppingCart size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
