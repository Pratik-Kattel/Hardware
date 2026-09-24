"use client";

import React, { useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import {
  Filter,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Search,
  Check,
  X,
  PackageOpen,
} from "lucide-react";
import { ProductCategory } from "@/types";

export function ProductCatalog() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    inStockOnly,
    setInStockOnly,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    viewMode,
    setViewMode,
  } = useStore();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesSubcat = product.subcategory.toLowerCase().includes(query);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesSubcat && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== "all" && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
      // featured default
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedBrand, inStockOnly, sortOption, priceRange]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setInStockOnly(false);
    setSortOption("featured");
    setPriceRange([0, 20000]);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    inStockOnly ||
    priceRange[1] < 20000;

  return (
    <section id="shop-section" style={{ padding: "60px 0", background: "var(--bg-page)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "30px" }}>
          <span className="section-tag">Complete Nepal Hardware Catalog</span>
          <h2 className="section-title">Hardware Store &amp; Materials</h2>
          <p className="section-subtitle">
            Browse verified authentic tools, plumbing fittings, paints, and raw construction materials.
          </p>
        </div>

        {/* Layout Grid: Left Filters + Right Products */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "30px",
            alignItems: "start",
          }}
          className="shop-layout-grid"
        >
          {/* Filter Sidebar */}
          <aside
            style={{
              background: "#ffffff",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              boxShadow: "var(--shadow-sm)",
              position: "sticky",
              top: "100px",
            }}
          >
            {/* Sidebar Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "16px",
                borderBottom: "1px solid var(--border-light)",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "var(--primary)" }}>
                <SlidersHorizontal size={18} color="var(--accent-orange)" />
                <span>Filters</span>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--accent-orange)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* In Stock Toggle */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-main)",
                }}
              >
                <span>In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "var(--accent-orange)",
                    cursor: "pointer",
                  }}
                />
              </label>
            </div>

            {/* Category Filter List */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: "12px",
                }}
              >
                Categories
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  maxHeight: "220px",
                  overflowY: "auto",
                  paddingRight: "6px",
                }}
              >
                <button
                  onClick={() => setSelectedCategory("all")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "7px 10px",
                    borderRadius: "var(--radius-sm)",
                    background: selectedCategory === "all" ? "var(--primary-surface)" : "transparent",
                    color: selectedCategory === "all" ? "var(--accent-orange)" : "var(--text-secondary)",
                    fontSize: "13px",
                    fontWeight: selectedCategory === "all" ? 700 : 500,
                    textAlign: "left",
                  }}
                >
                  <span>All Categories</span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{PRODUCTS.length}</span>
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "7px 10px",
                      borderRadius: "var(--radius-sm)",
                      background: selectedCategory === cat.id ? "var(--primary-surface)" : "transparent",
                      color: selectedCategory === cat.id ? "var(--accent-orange)" : "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: selectedCategory === cat.id ? 700 : 500,
                      textAlign: "left",
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      {PRODUCTS.filter((p) => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter List */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: "12px",
                }}
              >
                Brands
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  maxHeight: "180px",
                  overflowY: "auto",
                  paddingRight: "6px",
                }}
              >
                <button
                  onClick={() => setSelectedBrand("all")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 10px",
                    borderRadius: "var(--radius-sm)",
                    background: selectedBrand === "all" ? "var(--primary-surface)" : "transparent",
                    color: selectedBrand === "all" ? "var(--accent-orange)" : "var(--text-secondary)",
                    fontSize: "13px",
                    fontWeight: selectedBrand === "all" ? 700 : 500,
                    textAlign: "left",
                  }}
                >
                  <span>All Brands</span>
                </button>

                {BRANDS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBrand(b.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 10px",
                      borderRadius: "var(--radius-sm)",
                      background: selectedBrand === b.name ? "var(--primary-surface)" : "transparent",
                      color: selectedBrand === b.name ? "var(--accent-orange)" : "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: selectedBrand === b.name ? 700 : 500,
                      textAlign: "left",
                    }}
                  >
                    <span>{b.name}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      {PRODUCTS.filter((p) => p.brand.toLowerCase() === b.name.toLowerCase()).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--primary)",
                  marginBottom: "8px",
                }}
              >
                <span>Max Price</span>
                <span style={{ color: "var(--accent-orange)" }}>
                  NPR {priceRange[1].toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                style={{
                  width: "100%",
                  accentColor: "var(--accent-orange)",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                }}
              >
                <span>NPR 0</span>
                <span>NPR 20,000+</span>
              </div>
            </div>
          </aside>

          {/* Right Section: Catalog Controls & Grid */}
          <div>
            {/* Top Toolbar */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
                marginBottom: "20px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Count & Active Pills */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary)" }}>
                  Showing {filteredProducts.length} Products
                </span>

                {selectedCategory !== "all" && (
                  <span
                    className="badge badge-amber"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedCategory("all")}
                  >
                    <span>{CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span>
                    <X size={12} />
                  </span>
                )}

                {selectedBrand !== "all" && (
                  <span
                    className="badge badge-orange"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedBrand("all")}
                  >
                    <span>Brand: {selectedBrand}</span>
                    <X size={12} />
                  </span>
                )}
              </div>

              {/* Sort & View Mode */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>
                    Sort by:
                  </span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-medium)",
                      background: "#ffffff",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--primary)",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="featured">Featured / Best Sellers</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Highest Customer Rating</option>
                    <option value="discount">Biggest Discount %</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--border-medium)",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setViewMode("grid")}
                    style={{
                      padding: "6px 10px",
                      background: viewMode === "grid" ? "var(--primary)" : "#ffffff",
                      color: viewMode === "grid" ? "#ffffff" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                    }}
                    title="Grid View"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    style={{
                      padding: "6px 10px",
                      background: viewMode === "list" ? "var(--primary)" : "#ffffff",
                      color: viewMode === "list" ? "#ffffff" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                    }}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-light)",
                  padding: "60px 20px",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "var(--primary-surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    color: "var(--accent-orange)",
                  }}
                >
                  <PackageOpen size={36} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--primary)", marginBottom: "8px" }}>
                  No Products Match Your Filter
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px", maxWidth: "450px", margin: "0 auto 20px auto" }}>
                  Try relaxing your price range or selecting a different hardware category. You can also call us directly for custom site procurement.
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  <RotateCcw size={16} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    viewMode === "grid"
                      ? "repeat(auto-fill, minmax(260px, 1fr))"
                      : "1fr",
                  gap: "20px",
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .shop-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
