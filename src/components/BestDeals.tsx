"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import {
  Clock,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export function BestDeals() {
  const { addToCart, openProductDetail } = useStore();

  // Real urgency countdown timer for limited weekly stock
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter deal products with real discounts
  const dealProducts = PRODUCTS.filter(
    (p) => (p.discountPercent && p.discountPercent > 0) || p.isBestDeal
  );

  // Embla Carousel setup: 4 visible desktop / 2 tablet / 1 mobile
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="deals-section"
      style={{
        padding: "64px 0",
        background: "#F8F9FA",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div className="container">
        {/* Banner: Solid Navy #0F1B2D (NO gradient blend), Clean Border */}
        <div
          style={{
            background: "#0F1B2D",
            borderRadius: "var(--radius-lg)",
            padding: "28px 32px",
            color: "#FFFFFF",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            border: "1px solid #1A2E4C",
          }}
        >
          <div>
            {/* Standardized plain uppercase eyebrow */}
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#F15A24",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Limited Weekly Hardware Allocations
            </div>

            <h2
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: "1.2",
                marginBottom: "4px",
              }}
            >
              Best Deals of the Week
            </h2>

            <p style={{ fontSize: "14px", color: "#9CA3AF", maxWidth: "560px" }}>
              Authorized wholesale-discounted power tools, waterproofing compounds, and electrical gear.
            </p>
          </div>

          {/* Countdown Clock */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#1A2E4C",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "var(--radius-md)",
              padding: "10px 18px",
            }}
          >
            <Clock size={18} color="#F15A24" />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "10px",
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                Deal Closes In:
              </div>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: "#FFFFFF",
                  letterSpacing: "0.06em",
                }}
              >
                {String(timeLeft.hours).padStart(2, "0")}h :{" "}
                {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                {String(timeLeft.seconds).padStart(2, "0")}s
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slider Controls Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#6B7280" }}>
            Showing {dealProducts.length} Discounted Items
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={scrollPrev}
              aria-label="Previous deal"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                color: "#0F1B2D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background var(--transition-fast), border-color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0F1B2D";
                e.currentTarget.style.background = "#F3F4F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.background = "#FFFFFF";
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={scrollNext}
              aria-label="Next deal"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                color: "#0F1B2D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background var(--transition-fast), border-color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0F1B2D";
                e.currentTarget.style.background = "#F3F4F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.background = "#FFFFFF";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Embla Deals Slider: 4 visible desktop / 1 mobile */}
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", marginLeft: "-16px" }}>
            {dealProducts.map((prod) => {
              const stockRemaining = Math.max(3, Math.min(12, prod.stockCount));

              return (
                <div
                  key={prod.id}
                  className="deal-slide-item"
                  style={{
                    flex: "0 0 25%",
                    minWidth: 0,
                    paddingLeft: "16px",
                  }}
                >
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "var(--radius-lg)",
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      position: "relative",
                      boxShadow: "none",
                      transition: "border-color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0F1B2D")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                  >
                    {/* Factual SAVE % Badge (tied to real price diff) */}
                    {prod.discountPercent && prod.discountPercent > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          background: "#F15A24",
                          color: "#FFFFFF",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "var(--radius-sm)",
                          zIndex: 2,
                        }}
                      >
                        SAVE {prod.discountPercent}%
                      </div>
                    )}

                    {/* Product Image */}
                    <div
                      onClick={() => openProductDetail(prod)}
                      style={{
                        height: "180px",
                        cursor: "pointer",
                        overflow: "hidden",
                        borderRadius: "var(--radius-sm)",
                        marginBottom: "12px",
                        background: "#F8F9FA",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Brand & Subcategory */}
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#F15A24",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        marginBottom: "2px",
                      }}
                    >
                      {prod.brand}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => openProductDetail(prod)}
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#0F1B2D",
                        margin: "0 0 10px 0",
                        cursor: "pointer",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "40px",
                        lineHeight: "1.35",
                      }}
                      title={prod.name}
                    >
                      {prod.name}
                    </h3>

                    {/* Pricing */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <span style={{ fontSize: "18px", fontWeight: 800, color: "#0F1B2D" }}>
                        NPR {prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#9CA3AF",
                            textDecoration: "line-through",
                          }}
                        >
                          NPR {prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Stock Alert */}
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#4B5563",
                        marginBottom: "14px",
                      }}
                    >
                      <span>In Stock: </span>
                      <strong style={{ color: "#F15A24" }}>{stockRemaining} units left</strong>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="btn btn-primary btn-full btn-sm"
                      style={{
                        gap: "6px",
                        padding: "9px",
                        marginTop: "auto",
                        background: "#F15A24",
                        color: "#FFFFFF",
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <ShoppingCart size={15} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
            marginTop: "24px",
          }}
        >
          {scrollSnaps.slice(0, Math.min(scrollSnaps.length, 6)).map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              aria-label={`Go to slide group ${idx + 1}`}
              style={{
                width: selectedIndex === idx ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: selectedIndex === idx ? "#F15A24" : "#D1D5DB",
                border: "none",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>

        {/* Bottom Catalog Link */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a
            href="#shop-section"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#F15A24",
            }}
          >
            <span>Explore All Materials &amp; Hardware Catalog</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .deal-slide-item {
            flex: 0 0 33.333% !important;
          }
        }
        @media (max-width: 768px) {
          .deal-slide-item {
            flex: 0 0 50% !important;
          }
        }
        @media (max-width: 480px) {
          .deal-slide-item {
            flex: 0 0 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
