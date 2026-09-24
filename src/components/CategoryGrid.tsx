"use client";

import React from "react";
import { CATEGORIES } from "@/data/categories";
import { useStore } from "@/context/StoreContext";
import {
  Wrench,
  Hammer,
  Zap,
  Boxes,
  Paintbrush,
  Building2,
  ShieldCheck,
  Trees,
  Bath,
  FlaskConical,
  ArrowRight,
} from "lucide-react";
import { ProductCategory } from "@/types";

// Consistent Lucide icon mapping with uniform strokeWidth={2}
const getCategoryIcon = (iconName: string) => {
  const iconProps = { size: 24, strokeWidth: 2, color: "#1C1C1E" };
  switch (iconName) {
    case "Drill":
    case "Wrench":
      return <Wrench {...iconProps} />;
    case "Hammer":
      return <Hammer {...iconProps} />;
    case "Zap":
      return <Zap {...iconProps} />;
    case "Boxes":
      return <Boxes {...iconProps} />;
    case "Paintbrush":
      return <Paintbrush {...iconProps} />;
    case "Building2":
      return <Building2 {...iconProps} />;
    case "ShieldCheck":
      return <ShieldCheck {...iconProps} />;
    case "Trees":
      return <Trees {...iconProps} />;
    case "Bath":
      return <Bath {...iconProps} />;
    case "FlaskConical":
      return <FlaskConical {...iconProps} />;
    default:
      return <Wrench {...iconProps} />;
  }
};

export function CategoryGrid() {
  const { setSelectedCategory, selectedCategory } = useStore();

  const handleCategoryClick = (catId: ProductCategory) => {
    setSelectedCategory(catId);
    const shopEl = document.getElementById("shop-section");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={{ padding: "64px 0", background: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}>
      <div className="container">
        {/* Section Header: Standardized steel-blue plain uppercase eyebrow, NO pill */}
        <div className="section-header">
          <span className="section-tag">Explore Hardware Inventory</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Find the exact tools, fittings, structural supplies, and safety gear for your project in Kathmandu.
          </p>
        </div>

        {/* Categories Grid - White cards with 1px border #E5E7EB */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  background: "#FFFFFF",
                  border: isSelected ? "1.5px solid #4A6572" : "1px solid #E5E7EB",
                  borderRadius: "var(--radius-lg)",
                  padding: "22px",
                  cursor: "pointer",
                  transition: "border-color var(--transition-fast)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.borderColor = "#4A6572";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.borderColor = "#E5E7EB";
                }}
              >
                {/* Top Icon & Count */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-md)",
                      background: "#FAFAFA",
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getCategoryIcon(cat.iconName)}
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#6E6E73",
                      background: "#F4F4F6",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {cat.productCount} Items
                  </span>
                </div>

                {/* Name & Nepali Name */}
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#1C1C1E",
                    marginBottom: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <span>{cat.name}</span>
                  {cat.nepaliName && (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#6E6E73",
                      }}
                    >
                      {cat.nepaliName}
                    </span>
                  )}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "13px",
                    color: "#3A3A3C",
                    lineHeight: "1.5",
                    marginBottom: "16px",
                    flex: 1,
                  }}
                >
                  {cat.description}
                </p>

                {/* Subcategories tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "16px",
                  }}
                >
                  {cat.popularSubcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      style={{
                        fontSize: "11px",
                        color: "#6E6E73",
                        background: "#FAFAFA",
                        border: "1px solid #E5E7EB",
                        padding: "2px 7px",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Link in Steel-Blue */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#4A6572",
                    marginTop: "auto",
                  }}
                >
                  <span>Browse Products</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
