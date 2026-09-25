"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Wrench,
  Flame,
  FileSpreadsheet,
  ChevronDown,
  PhoneCall,
  CheckCircle,
  ArrowRight,
  Drill,
  Hammer,
  Zap,
  Boxes,
  Paintbrush,
  Building2,
  ShieldCheck,
  Trees,
  Bath,
  FlaskConical,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { ProductCategory } from "@/types";

// Helper for consistent mega-menu Lucide icons
function getCategoryIcon(iconName: string, size = 18) {
  const props = { size, strokeWidth: 2, color: "#4A6572" };
  switch (iconName) {
    case "Drill":
      return <Drill {...props} />;
    case "Hammer":
      return <Hammer {...props} />;
    case "Wrench":
      return <Wrench {...props} />;
    case "Zap":
      return <Zap {...props} />;
    case "Boxes":
      return <Boxes {...props} />;
    case "Paintbrush":
      return <Paintbrush {...props} />;
    case "Building2":
      return <Building2 {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    case "Trees":
      return <Trees {...props} />;
    case "Bath":
      return <Bath {...props} />;
    case "FlaskConical":
      return <FlaskConical {...props} />;
    default:
      return <Wrench {...props} />;
  }
}

// 5 Main categories shown inline on desktop
const TOP_INLINE_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "power-tools", label: "Power Tools" },
  { id: "hand-tools", label: "Hand Tools" },
  { id: "plumbing", label: "Plumbing" },
  { id: "electrical", label: "Electrical" },
  { id: "paint-supplies", label: "Paint & Supplies" },
];

// Remaining 6 categories in "More" dropdown
const MORE_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "construction-materials", label: "Cement & Steel" },
  { id: "fasteners", label: "Fasteners & Hardware" },
  { id: "safety-equipment", label: "Safety Gear" },
  { id: "gardening", label: "Gardening & Agri" },
  { id: "bathroom-sanitary", label: "Bathroom & Sanitary" },
  { id: "adhesives-sealants", label: "Adhesives & Sealants" },
];

export function Navbar() {
  const router = useRouter();
  const {
    cartCount,
    cartSubtotal,
    wishlistCount,
    openModal,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    user,
    categories,
    storeInfo,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [matchingProducts, setMatchingProducts] = useState<any[]>([]);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search query by 300ms for live autocomplete suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch live autocomplete suggestions from /api/search
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMatchingProducts([]);
      return;
    }
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery.trim())}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.products && Array.isArray(data.products)) {
          setMatchingProducts(data.products.slice(0, 5));
        }
      })
      .catch(() => {});
  }, [debouncedQuery]);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchFocused(false);
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/products");
    }
  };

  const handleCategoryNav = (catId: ProductCategory) => {
    setSelectedCategory(catId);
    setMegaMenuOpen(false);
    setMoreDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push(`/category/${catId}`);
  };

  return (
    <header className="main-navbar">
      {/* Primary Brand Navigation Row */}
      <div className="header-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
            gap: "28px",
            flexWrap: "nowrap",
          }}
          className="navbar-top-row"
        >
          {/* Logo & Mobile Menu Trigger */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                padding: "8px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-surface-secondary)",
                color: "var(--primary)",
                border: "none",
                cursor: "pointer",
              }}
              className="mobile-hamburger-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  background: "#4A6572",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  flexShrink: 0,
                }}
              >
                <Wrench size={20} strokeWidth={2.2} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--primary)",
                    lineHeight: "1.1",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>NEW ADHIKARI</span>
                  <span style={{ color: "var(--accent-steel)" }}>TRADERS</span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "1.2",
                    marginTop: "2px",
                  }}
                >
                  GENUINE HARDWARE
                </div>
              </div>
            </Link>
          </div>

          {/* Unified Amazon/Daraz Style Search Bar */}
          <div
            ref={searchContainerRef}
            style={{
              flex: "1 1 360px",
              maxWidth: "680px",
              minWidth: "220px",
              position: "relative",
            }}
            className="navbar-search-wrapper"
          >
            <form onSubmit={handleSearchSubmit} style={{ margin: 0, width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  background: "#FFFFFF",
                  borderRadius: "6px",
                  border: searchFocused
                    ? "2px solid var(--accent-steel)"
                    : "1.5px solid var(--border-medium)",
                  height: "42px",
                  boxSizing: "border-box",
                  transition: "all var(--transition-fast)",
                  boxShadow: searchFocused
                    ? "0 0 0 3px rgba(74, 101, 114, 0.18)"
                    : "none",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    minWidth: 0,
                    padding: "0 6px 0 12px",
                  }}
                >
                  <Search
                    size={17}
                    color="var(--accent-steel)"
                    style={{ marginRight: "8px", flexShrink: 0 }}
                  />
                  <input
                    type="text"
                    placeholder="Search tools, pipes, paint..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--text-main)",
                      height: "100%",
                      padding: 0,
                    }}
                    aria-label="Search hardware products"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      style={{
                        padding: "4px",
                        color: "var(--text-muted)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                      aria-label="Clear search input"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Docked Right "Search" Button (Zero gap, unified control) */}
                <button
                  type="submit"
                  style={{
                    background: "var(--accent-steel)",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "0 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    flexShrink: 0,
                    transition: "background-color 0.15s ease",
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#344955")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent-steel)")}
                  aria-label="Submit search"
                >
                  <Search size={14} />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Debounced Live Autocomplete Suggestions Box */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  right: 0,
                  background: "#ffffff",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-xl)",
                  border: "1px solid var(--border-light)",
                  zIndex: 999,
                  overflow: "hidden",
                  animation: "fadeIn 0.2s ease-out",
                }}
              >
                <div
                  style={{
                    padding: "10px 16px",
                    background: "var(--bg-surface-secondary)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: "1px solid var(--border-light)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Product Matches ({matchingProducts.length})</span>
                  {searchQuery !== debouncedQuery && (
                    <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--accent-steel)" }}>
                      Searching...
                    </span>
                  )}
                </div>

                {matchingProducts.length === 0 ? (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                      fontSize: "14px",
                    }}
                  >
                    No exact match for &quot;{debouncedQuery || searchQuery}&quot;. Try searching for{" "}
                    <em>drill</em>, <em>grinder</em>, <em>paint</em>, or <em>pipe</em>.
                  </div>
                ) : (
                  matchingProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSearchFocused(false);
                        router.push(`/product/${prod.id}`);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 16px",
                        borderBottom: "1px solid var(--border-light)",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--primary-surface)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          position: "relative",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-light)",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={
                            (Array.isArray(prod.images) && typeof prod.images[0] === "string"
                              ? prod.images[0]
                              : prod.images?.[0]?.imageUrl) || "/images/placeholder.webp"
                          }
                          alt={prod.name}
                          fill
                          sizes="44px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "var(--primary)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {prod.name}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--text-muted)",
                          }}
                        >
                          Brand: <strong>{prod.brand}</strong> • {prod.subcategory}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "var(--accent-steel)",
                            fontSize: "14px",
                          }}
                        >
                          NPR {prod.price.toLocaleString()}
                        </div>
                        {prod.inStock ? (
                          <div
                            style={{
                              fontSize: "11px",
                              color: "var(--success)",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            <CheckCircle size={11} /> In Stock
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
                <div
                  style={{
                    padding: "10px 16px",
                    background: "#FAFAFA",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleSearchSubmit()}
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--accent-steel)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>View all matching results in Hardware Catalog</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Quote, Wishlist, My Orders, Cart (Single-line, standardized 42px height) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              flexWrap: "nowrap",
            }}
          >
            {/* 1. Contractor Request Quote Button */}
            <button
              onClick={() => openModal("request_quote")}
              className="contractor-nav-btn header-nav-btn"
              style={{
                height: "42px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#FFFFFF",
                border: "1.5px solid var(--border-medium)",
                color: "var(--primary)",
                padding: "0 12px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                transition: "all 0.15s",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-steel)";
                e.currentTarget.style.background = "var(--bg-surface-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-medium)";
                e.currentTarget.style.background = "#FFFFFF";
              }}
              title="Request Contractor Bulk Quote"
              aria-label="Request Quote"
            >
              <FileSpreadsheet size={16} color="var(--accent-steel)" />
              <span>Quote</span>
            </button>

            {/* 2. Wishlist Button */}
            <Link
              href="/wishlist"
              className="header-nav-btn"
              style={{
                height: "42px",
                padding: "0 12px",
                borderRadius: "6px",
                color: "var(--primary)",
                background: "#FFFFFF",
                border: "1.5px solid var(--border-medium)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "13px",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
                flexShrink: 0,
                minWidth: "90px",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-steel)";
                e.currentTarget.style.background = "var(--bg-surface-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-medium)";
                e.currentTarget.style.background = "#FFFFFF";
              }}
              aria-label={`Wishlist (${wishlistCount} saved items)`}
              title="View your saved items in Wishlist"
            >
              <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <Heart size={16} color="var(--accent-steel)" />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-8px",
                      background: "var(--highlight-rust)",
                      color: "#FFFFFF",
                      fontSize: "9px",
                      fontWeight: 800,
                      width: "14px",
                      height: "14px",
                      borderRadius: "7px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #FFFFFF",
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="nav-btn-label">Wishlist</span>
            </Link>

            {/* 3. My Orders Button */}
            <Link
              href="/account/orders"
              className="header-nav-btn"
              style={{
                height: "42px",
                padding: "0 12px",
                borderRadius: "6px",
                background: "#FFFFFF",
                color: "var(--primary)",
                fontSize: "13px",
                fontWeight: 600,
                border: "1.5px solid var(--border-medium)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
                flexShrink: 0,
                minWidth: "100px",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-steel)";
                e.currentTarget.style.background = "var(--bg-surface-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-medium)";
                e.currentTarget.style.background = "#FFFFFF";
              }}
              aria-label="My Orders"
              title="View your order history & status"
            >
              <User size={16} color="var(--accent-steel)" />
              <span className="nav-btn-label">My Orders</span>
            </Link>

            {/* 4. My Cart Button (Single Line: Cart · NPR 0, filled steel-blue accent) */}
            <button
              onClick={() => openModal("cart")}
              className="header-nav-btn header-nav-cart"
              style={{
                height: "42px",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "0 16px",
                borderRadius: "6px",
                background: "#4A6572",
                color: "#ffffff",
                transition: "background-color 0.15s ease",
                border: "1.5px solid #4A6572",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                minWidth: "145px",
                justifyContent: "center",
                marginLeft: "4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#344955")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#4A6572")}
              aria-label={`My Cart with ${cartCount} items`}
              title="Open My Cart"
            >
              <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <ShoppingCart size={16} color="#ffffff" />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-7px",
                      right: "-9px",
                      background: "var(--highlight-rust)",
                      color: "#ffffff",
                      fontSize: "9px",
                      fontWeight: 800,
                      width: "14px",
                      height: "14px",
                      borderRadius: "7px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1.5px solid #4A6572",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                }}
              >
                Cart · NPR {cartSubtotal.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Bar: Categories & Quick Links */}
      <div
        style={{
          background: "var(--primary-surface)",
          borderTop: "1px solid var(--border-light)",
          padding: "8px 0",
        }}
      >
        <div className="header-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              position: "relative",
            }}
          >
            {/* 1. All Categories Dropdown Mega-Menu Trigger */}
            <div ref={megaMenuRef} style={{ position: "relative" }}>
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#4A6572",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                  fontWeight: 700,
                  transition: "background-color 0.15s",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#344955")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#4A6572")}
                aria-expanded={megaMenuOpen}
              >
                <Menu size={16} />
                <span>All Categories</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: megaMenuOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                />
              </button>

              {/* Clean, well-spaced Mega-Menu Panel */}
              {megaMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    width: "720px",
                    maxWidth: "calc(100vw - 32px)",
                    background: "#ffffff",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.16)",
                    border: "1px solid var(--border-light)",
                    zIndex: 999,
                    overflow: "hidden",
                    animation: "fadeIn 0.2s ease-out",
                  }}
                >
                  {/* Mega-menu Header */}
                  <div
                    style={{
                      padding: "14px 20px",
                      background: "#F8FAFC",
                      borderBottom: "1px solid var(--border-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "#64748B",
                        }}
                      >
                        Hardware Departments
                      </span>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "var(--primary)",
                        }}
                      >
                        Browse All Store Categories
                      </div>
                    </div>
                    <Link
                      href="/products"
                      onClick={() => setMegaMenuOpen(false)}
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--accent-steel)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span>Full Inventory Catalog ({storeInfo?.stats?.productsCataloged || 2500} items)</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Mega-menu Multi-Column Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "10px",
                      padding: "16px 20px",
                      maxHeight: "440px",
                      overflowY: "auto",
                    }}
                    className="mega-menu-grid"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id || cat.slug}
                        href={`/category/${cat.slug || cat.id}`}
                        onClick={() => setMegaMenuOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          padding: "10px 12px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid transparent",
                          transition: "all 0.15s ease",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#F1F5F9";
                          e.currentTarget.style.borderColor = "#CBD5E1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.borderColor = "transparent";
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "var(--radius-sm)",
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {getCategoryIcon(cat.iconName, 18)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "8px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "var(--primary)",
                              }}
                            >
                              {cat.name}
                            </span>
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#64748B",
                                background: "#E2E8F0",
                                padding: "1px 6px",
                                borderRadius: "4px",
                                flexShrink: 0,
                              }}
                            >
                              {cat.productCount}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#64748B",
                              marginTop: "2px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {cat.popularSubcategories.slice(0, 3).join(" • ")}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Mega-menu Footer Banner */}
                  <div
                    style={{
                      padding: "12px 20px",
                      background: "#F8FAFC",
                      borderTop: "1px solid var(--border-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#475569",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Truck size={14} color="var(--accent-steel)" />
                      <span>Direct site delivery to Kalanki, Koteshwor, Chabahil &amp; all Valley points</span>
                    </div>
                    <button
                      onClick={() => {
                        setMegaMenuOpen(false);
                        openModal("request_quote");
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent-steel)",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Request Bulk Rates →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Top 5 Categories Inline + "More" Dropdown + Best Sellers */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "nowrap",
              }}
              className="quick-category-nav"
            >
              {TOP_INLINE_CATEGORIES.map((item) => (
                <Link
                  key={item.id}
                  href={`/category/${item.id}`}
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    padding: "6px 10px",
                    borderRadius: "var(--radius-sm)",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent-steel)";
                    e.currentTarget.style.background = "rgba(74, 101, 114, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-main)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* "More" Dropdown for remaining 6 categories */}
              <div ref={moreDropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    padding: "6px 10px",
                    borderRadius: "var(--radius-sm)",
                    background: moreDropdownOpen
                      ? "rgba(74, 101, 114, 0.08)"
                      : "transparent",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  aria-expanded={moreDropdownOpen}
                >
                  <span>More</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transform: moreDropdownOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>

                {moreDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      width: "240px",
                      background: "#ffffff",
                      borderRadius: "var(--radius-md)",
                      boxShadow: "var(--shadow-xl)",
                      border: "1px solid var(--border-light)",
                      zIndex: 999,
                      padding: "6px 0",
                      animation: "fadeIn 0.2s ease-out",
                    }}
                  >
                    {MORE_CATEGORIES.map((moreCat) => (
                      <Link
                        key={moreCat.id}
                        href={`/category/${moreCat.id}`}
                        onClick={() => setMoreDropdownOpen(false)}
                        style={{
                          display: "block",
                          padding: "8px 16px",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "var(--primary)",
                          textDecoration: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "var(--bg-surface-secondary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {moreCat.label}
                      </Link>
                    ))}
                    <div
                      style={{
                        height: "1px",
                        background: "var(--border-light)",
                        margin: "4px 0",
                      }}
                    />
                    <Link
                      href="/products"
                      onClick={() => setMoreDropdownOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 16px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--accent-steel)",
                        textDecoration: "none",
                      }}
                    >
                      <span>All Products Catalog</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Best Sellers Link with Warm Rust Flame */}
              <Link
                href="/products?filter=deals"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#C1512D",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "6px 10px",
                  borderRadius: "var(--radius-sm)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(193, 81, 45, 0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <Flame size={14} color="#C1512D" />
                <span>Best Sellers</span>
              </Link>
            </nav>

            {/* 3. Quick Phone Call Helpline - FIXED to never wrap */}
            <div
              className="nav-helpline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--primary)",
                whiteSpace: "nowrap",
                flexShrink: 0,
                minWidth: "max-content",
              }}
            >
              <PhoneCall
                size={14}
                color="var(--accent-steel)"
                style={{ flexShrink: 0 }}
              />
              <span className="call-us-prefix" style={{ whiteSpace: "nowrap" }}>
                Call Us:
              </span>
              <a
                href={`tel:${(storeInfo?.phone || "985-1145065").replace(/[^0-9]/g, "")}`}
                style={{
                  color: "var(--accent-steel)",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {storeInfo?.phone || "985-1145065"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(28, 28, 30, 0.7)",
            zIndex: 1000,
            display: "flex",
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: "84%",
              maxWidth: "340px",
              background: "#ffffff",
              height: "100%",
              overflowY: "auto",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "var(--primary)",
                  fontSize: "16px",
                }}
              >
                NEW ADHIKARI TRADERS
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={() => {
                  openModal("request_quote");
                  setMobileMenuOpen(false);
                }}
                className="btn btn-accent btn-full"
                style={{ minHeight: "44px" }}
              >
                <FileSpreadsheet size={16} />
                <span>Contractor Bulk Quote</span>
              </button>

              <Link
                href="/account/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline btn-full"
                style={{
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <User size={16} />
                <span>My Orders</span>
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline btn-full"
                style={{
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <Heart size={16} />
                <span>My Wishlist ({wishlistCount})</span>
              </Link>
            </div>

            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "10px",
                }}
              >
                Hardware Departments
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 12px",
                    borderRadius: "var(--radius-sm)",
                    background: "#F8FAFC",
                    color: "var(--primary)",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <span>All Products Catalog</span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    {storeInfo?.stats?.productsCataloged || 2500}+
                  </span>
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug || cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--primary)",
                      fontWeight: 500,
                      fontSize: "14px",
                      textDecoration: "none",
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      {cat.productCount}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: "auto",
                borderTop: "1px solid var(--border-light)",
                paddingTop: "16px",
              }}
            >
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Support &amp; Order Desk
              </div>
              <a
                href={`tel:${(storeInfo?.phone || "985-1145065").replace(/[^0-9]/g, "")}`}
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--accent-steel)",
                  display: "inline-block",
                  padding: "4px 0",
                }}
              >
                {storeInfo?.phone || "985-1145065"}
              </a>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                }}
              >
                Kathmandu, Bagmati Province 44600
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for Navbar Breakpoints & Robust Non-wrapping */}
      <style jsx>{`
        .nav-helpline {
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          min-width: max-content !important;
        }

        @media (max-width: 1200px) {
          .call-us-prefix {
            display: none !important;
          }
          .contractor-nav-btn {
            display: none !important;
          }
        }

        @media (max-width: 1024px) {
          .nav-helpline {
            display: none !important;
          }
          .nav-btn-label {
            display: none !important;
          }
          .header-nav-btn {
            min-width: 42px !important;
            padding: 0 10px !important;
          }
          .header-nav-cart {
            min-width: 42px !important;
          }
          .quick-category-nav {
            overflow-x: auto;
            scrollbar-width: none;
          }
        }

        @media (min-width: 1025px) {
          .navbar-top-row {
            gap: clamp(24px, 2.5vw, 40px) !important;
          }
          .navbar-search-wrapper {
            margin: 0 clamp(8px, 1.5vw, 24px);
          }
        }

        @media (max-width: 768px) {
          .mobile-hamburger-btn {
            display: flex !important;
          }
          .navbar-top-row {
            flex-wrap: wrap !important;
            gap: 10px !important;
          }
          .navbar-search-wrapper {
            order: 3;
            width: 100% !important;
            max-width: 100% !important;
          }
          .user-name-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
