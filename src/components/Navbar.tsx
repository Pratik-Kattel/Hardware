"use client";

import React, { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ProductCategory } from "@/types";

export function Navbar() {
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
    openProductDetail,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filtered search preview items
  const matchingProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (catId: ProductCategory | "all") => {
    setSelectedCategory(catId);
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    const shopEl = document.getElementById("shop-section");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="main-navbar">
      {/* Primary Brand Navigation Row */}
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 0",
            gap: "20px",
          }}
        >
          {/* Logo & Mobile Menu Trigger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                padding: "8px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-surface-secondary)",
                color: "var(--primary)",
              }}
              className="mobile-hamburger-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-steel)",
                  border: "1px solid var(--border-medium)",
                }}
              >
                <Wrench size={22} strokeWidth={2.2} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--primary)",
                    lineHeight: "1.1",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>ADHIKARI</span>
                  <span style={{ color: "var(--accent-steel)" }}>HARDWARE</span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Kathmandu, Nepal • Genuine Tools & Materials
                </div>
              </div>
            </a>
          </div>

          {/* Interactive Live Search Bar */}
          <div
            ref={searchContainerRef}
            style={{
              flex: 1,
              maxWidth: "580px",
              position: "relative",
            }}
            className="navbar-search-wrapper"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "var(--bg-surface-secondary)",
                borderRadius: "var(--radius-full)",
                border: searchFocused
                  ? "2px solid var(--accent-steel)"
                  : "2px solid var(--border-medium)",
                padding: "2px 6px 2px 18px",
                transition: "all var(--transition-fast)",
                boxShadow: searchFocused ? "0 0 0 3px rgba(74, 101, 114, 0.18)" : "none",
              }}
            >
              <Search size={18} color="var(--text-muted)" style={{ marginRight: "10px", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search power tools, pipes, Asian Paints, cement, screws..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: "14px",
                  padding: "9px 0",
                  color: "var(--text-main)",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    padding: "4px",
                    color: "var(--text-muted)",
                    marginRight: "4px",
                  }}
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => {
                  setSearchFocused(false);
                  const shopEl = document.getElementById("shop-section");
                  if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn btn-primary"
                style={{
                  borderRadius: "var(--radius-full)",
                  padding: "8px 18px",
                  fontSize: "13px",
                }}
              >
                Search
              </button>
            </div>

            {/* Live Autocomplete Suggestions Box */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
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
                  }}
                >
                  Product Matches ({matchingProducts.length})
                </div>

                {matchingProducts.length === 0 ? (
                  <div style={{ padding: "20px", textAlign: "center", color: "var(--text-muted)" }}>
                    No exact match for &quot;{searchQuery}&quot;. Try searching for <em>drill</em>, <em>grinder</em>, <em>paint</em>, or <em>pipe</em>.
                  </div>
                ) : (
                  matchingProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        openProductDetail(prod);
                        setSearchFocused(false);
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
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-surface)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        style={{
                          width: "42px",
                          height: "42px",
                          objectFit: "cover",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-light)",
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "var(--primary)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {prod.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          Brand: <strong>{prod.brand}</strong> • {prod.subcategory}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontWeight: 700, color: "var(--accent-steel)", fontSize: "13px" }}>
                          NPR {prod.price.toLocaleString()}
                        </div>
                        {prod.inStock ? (
                          <div style={{ fontSize: "10px", color: "var(--success)", display: "flex", alignItems: "center", gap: "2px" }}>
                            <CheckCircle size={10} /> In Stock
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Action Buttons: Contractor Quote, Wishlist, Cart, Account */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Contractor Request Quote Button */}
            <button
              onClick={() => openModal("request_quote")}
              className="contractor-nav-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "#FFFFFF",
                border: "1px solid var(--border-medium)",
                color: "var(--primary)",
                padding: "8px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: "13px",
                fontWeight: 600,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.background = "var(--bg-surface-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-medium)";
                e.currentTarget.style.background = "#FFFFFF";
              }}
            >
              <FileSpreadsheet size={16} color="var(--accent-steel)" />
              <span>Request Quote</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                const shopEl = document.getElementById("shop-section");
                if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                position: "relative",
                padding: "9px",
                borderRadius: "var(--radius-md)",
                color: "var(--primary)",
                background: "#FFFFFF",
                border: "1px solid var(--border-light)",
                transition: "all 0.15s",
              }}
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    background: "var(--accent-steel)",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 700,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => openModal("cart")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "7px 14px",
                borderRadius: "var(--radius-md)",
                background: "var(--primary)",
                color: "#ffffff",
                transition: "background 0.15s",
                boxShadow: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary)")}
              aria-label="Shopping Cart"
            >
              <div style={{ position: "relative" }}>
                <ShoppingCart size={20} color="#ffffff" />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
                      background: "var(--accent-steel)",
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: 800,
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #ffffff",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <div style={{ textAlign: "left", display: "flex", flexDirection: "column" }} className="cart-text-wrapper">
                <span style={{ fontSize: "11px", color: "#94a3b8", lineHeight: "1" }}>Cart</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", lineHeight: "1.2" }}>
                  NPR {cartSubtotal.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Account / Auth Trigger */}
            <button
              onClick={() => openModal("auth")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-surface-secondary)",
                color: "var(--primary)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <User size={18} />
              <span className="user-name-wrapper">{user ? user.name.split(" ")[0] : "Sign In"}</span>
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
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            {/* All Categories Dropdown Trigger */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--primary)",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                <Menu size={16} />
                <span>All Categories</span>
                <ChevronDown size={14} />
              </button>

              {categoryDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: 0,
                    width: "280px",
                    background: "#ffffff",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-xl)",
                    border: "1px solid var(--border-light)",
                    zIndex: 999,
                    padding: "8px 0",
                    animation: "fadeIn 0.2s ease-out",
                  }}
                >
                  <button
                    onClick={() => handleCategorySelect("all")}
                    style={{
                      width: "100%",
                      padding: "8px 18px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: selectedCategory === "all" ? 700 : 500,
                      color: selectedCategory === "all" ? "var(--accent-steel)" : "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-surface-secondary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span>View All Products</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{PRODUCTS.length}</span>
                  </button>

                  <div style={{ height: "1px", background: "var(--border-light)", margin: "4px 0" }} />

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      style={{
                        width: "100%",
                        padding: "8px 18px",
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: selectedCategory === cat.id ? 700 : 500,
                        color: selectedCategory === cat.id ? "var(--accent-steel)" : "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-surface-secondary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span>{cat.name}</span>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{cat.productCount}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Horizontal Category Quick Links */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                overflowX: "auto",
                whiteSpace: "nowrap",
                scrollbarWidth: "none",
              }}
              className="quick-category-nav"
            >
              {[
                { id: "power-tools", label: "Power Tools" },
                { id: "hand-tools", label: "Hand Tools" },
                { id: "plumbing", label: "Plumbing" },
                { id: "electrical", label: "Electrical" },
                { id: "paint-supplies", label: "Paint & Supplies" },
                { id: "construction-materials", label: "Cement & Steel" },
                { id: "fasteners", label: "Fasteners" },
                { id: "safety-equipment", label: "Safety Gear" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCategorySelect(item.id as ProductCategory)}
                  style={{
                    fontSize: "13px",
                    fontWeight: selectedCategory === item.id ? 700 : 500,
                    color: selectedCategory === item.id ? "var(--accent-steel)" : "var(--text-main)",
                    padding: "4px 8px",
                    borderRadius: "var(--radius-sm)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-steel)")}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== item.id) {
                      e.currentTarget.style.color = "var(--text-main)";
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}

              <a
                href="#deals-section"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--highlight-rust)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                }}
              >
                <Flame size={14} color="var(--highlight-rust)" />
                <span>Best Sellers</span>
              </a>
            </nav>

            {/* Quick Phone Call Helpline */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--primary)",
              }}
              className="nav-helpline"
            >
              <PhoneCall size={14} color="var(--accent-steel)" />
              <span>
                Call Us:{" "}
                <a href="tel:9800000000" style={{ color: "var(--accent-steel)", fontWeight: 700 }}>
                  9800000000
                </a>
              </span>
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
              width: "82%",
              maxWidth: "320px",
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 800, color: "var(--primary)", fontSize: "16px" }}>
                ADHIKARI HARDWARE
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
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
              >
                <FileSpreadsheet size={16} />
                <span>Contractor Bulk Quote</span>
              </button>

              <button
                onClick={() => {
                  openModal("track_order");
                  setMobileMenuOpen(false);
                }}
                className="btn btn-outline btn-full"
              >
                <span>Track Your Order</span>
              </button>
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
                Shop By Category
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <button
                  onClick={() => handleCategorySelect("all")}
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    borderRadius: "var(--radius-sm)",
                    background: selectedCategory === "all" ? "var(--primary-surface)" : "transparent",
                    color: selectedCategory === "all" ? "var(--accent-steel)" : "var(--primary)",
                    fontWeight: 600,
                  }}
                >
                  All Products
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      background: selectedCategory === cat.id ? "var(--primary-surface)" : "transparent",
                      color: selectedCategory === cat.id ? "var(--accent-steel)" : "var(--primary)",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-light)", paddingTop: "16px" }}>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Support & Order Desk</div>
              <a
                href="tel:9800000000"
                style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent-steel)" }}
              >
                9800000000
              </a>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                Kalanki, Ring Road, Kathmandu
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for Navbar Breakpoints */}
      <style jsx>{`
        @media (max-width: 992px) {
          .nav-helpline {
            display: none !important;
          }
          .contractor-nav-btn {
            display: none !important;
          }
          .cart-text-wrapper {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .mobile-hamburger-btn {
            display: flex !important;
          }
          .navbar-search-wrapper {
            order: 3;
            width: 100%;
            max-width: 100%;
          }
          .main-navbar .container > div:first-child {
            flex-wrap: wrap;
          }
          .user-name-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
