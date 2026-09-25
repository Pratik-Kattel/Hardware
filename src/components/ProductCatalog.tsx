"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import {
  RotateCcw,
  LayoutGrid,
  List,
  Search,
  X,
  PackageOpen,
  Loader2,
} from "lucide-react";
import { Product, ProductCategory } from "@/types";

export function ProductCatalog() {
  const searchParams = useSearchParams();
  const {
    categories,
    brands,
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

  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sync URL search params
  useEffect(() => {
    if (!searchParams) return;
    const search = searchParams.get("search");
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const filter = searchParams.get("filter");

    if (search !== null) setSearchQuery(search);
    if (brand !== null) setSelectedBrand(brand);
    if (category !== null) setSelectedCategory(category as ProductCategory);
    if (filter === "deals") setSortOption("discount");
  }, [searchParams, setSearchQuery, setSelectedBrand, setSelectedCategory, setSortOption]);

  // Fetch products from /api/products based on active filters
  const fetchProductsList = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchQuery.trim()) query.set("q", searchQuery.trim());
      if (selectedCategory !== "all") query.set("category", selectedCategory);
      if (selectedBrand !== "all") query.set("brand", selectedBrand);
      if (inStockOnly) query.set("inStock", "true");
      if (priceRange[0] > 0) query.set("minPrice", String(priceRange[0]));
      if (priceRange[1] < 100000) query.set("maxPrice", String(priceRange[1]));
      if (sortOption) query.set("sort", sortOption);
      query.set("limit", "50");

      const res = await fetch(`/api/products?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        const rawProducts = data.products || [];
        const normalized = rawProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          brand: p.brand?.name || p.brand || "Authorized",
          category: p.category?.slug || p.categoryId || "power-tools",
          subcategory: p.subcategory || "",
          price: p.price,
          originalPrice: p.compareAtPrice || p.originalPrice,
          compareAtPrice: p.compareAtPrice,
          discountPercent: p.deals?.[0]?.discountPercent || (p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : 0),
          rating: p.ratingAvg || p.rating || 5.0,
          reviewsCount: p.ratingCount || p.reviewsCount || 12,
          inStock: p.isInStock ?? p.inStock ?? true,
          stockCount: p.stockQuantity ?? p.stockCount ?? 10,
          sku: p.sku,
          unit: p.unit || "Piece",
          description: p.description || "",
          specifications: p.technicalSpecs || p.specifications || {},
          images: Array.isArray(p.images)
            ? p.images.map((img: any) => (typeof img === "string" ? img : img.imageUrl))
            : ["/images/placeholder.webp"],
          tags: p.tags || [p.brand?.name || "hardware"],
          isFeatured: p.isBestDeal || false,
        } as Product));

        setProducts(normalized);
        setTotalCount(data.pagination?.total || normalized.length);
      }
    } catch (e) {
      console.warn("Failed to fetch products:", e);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedBrand, inStockOnly, priceRange, sortOption]);

  useEffect(() => {
    fetchProductsList();
  }, [fetchProductsList]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setInStockOnly(false);
    setSortOption("featured");
    setPriceRange([0, 100000]);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    inStockOnly ||
    priceRange[1] < 100000;

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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: "1px solid var(--border-light)",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--primary)" }}>
                Filter Products
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent-steel)",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
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

            {/* In-Stock Only Toggle */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--primary)",
                }}
              >
                <span>In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "var(--accent-steel)",
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
                    color: selectedCategory === "all" ? "var(--accent-steel)" : "var(--text-secondary)",
                    fontSize: "13px",
                    fontWeight: selectedCategory === "all" ? 700 : 500,
                    textAlign: "left",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span>All Categories</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id || cat.slug}
                    onClick={() => setSelectedCategory((cat.slug || cat.id) as ProductCategory)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "7px 10px",
                      borderRadius: "var(--radius-sm)",
                      background:
                        selectedCategory === cat.slug || selectedCategory === cat.id
                          ? "var(--primary-surface)"
                          : "transparent",
                      color:
                        selectedCategory === cat.slug || selectedCategory === cat.id
                          ? "var(--accent-steel)"
                          : "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight:
                        selectedCategory === cat.slug || selectedCategory === cat.id ? 700 : 500,
                      textAlign: "left",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      {cat.productCount}
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
                    color: selectedBrand === "all" ? "var(--accent-steel)" : "var(--text-secondary)",
                    fontSize: "13px",
                    fontWeight: selectedBrand === "all" ? 700 : 500,
                    textAlign: "left",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span>All Brands</span>
                </button>

                {brands.map((b) => (
                  <button
                    key={b.id || b.slug}
                    onClick={() => setSelectedBrand(b.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 10px",
                      borderRadius: "var(--radius-sm)",
                      background: selectedBrand === b.name ? "var(--primary-surface)" : "transparent",
                      color: selectedBrand === b.name ? "var(--accent-steel)" : "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: selectedBrand === b.name ? 700 : 500,
                      textAlign: "left",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span>{b.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Area */}
          <div>
            {/* Toolbar */}
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
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary)" }}>
                  Showing {products.length} of {totalCount} Products
                </span>

                {selectedCategory !== "all" && (
                  <span
                    className="badge badge-steel"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedCategory("all")}
                  >
                    <span>{categories.find((c) => c.slug === selectedCategory || c.id === selectedCategory)?.name || selectedCategory}</span>
                    <X size={12} />
                  </span>
                )}

                {selectedBrand !== "all" && (
                  <span
                    className="badge badge-steel"
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
                      border: "none",
                      cursor: "pointer",
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
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid or Empty / Loading State */}
            {isLoading ? (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-light)",
                  padding: "60px 20px",
                  textAlign: "center",
                }}
              >
                <Loader2
                  size={32}
                  color="#4A6572"
                  style={{ animation: "spin 1s linear infinite", margin: "0 auto 12px auto" }}
                />
                <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
                  Fetching verified hardware catalog from warehouse...
                </p>
              </div>
            ) : products.length === 0 ? (
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
                    color: "var(--accent-steel)",
                  }}
                >
                  <PackageOpen size={36} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--primary)", marginBottom: "8px" }}>
                  No Products Match Your Filter
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px", maxWidth: "450px", margin: "0 auto 20px auto" }}>
                  Try relaxing your search query or selecting a different hardware category. You can also call us directly for custom site procurement.
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
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 992px) {
          .shop-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
