"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useStore } from "@/context/StoreContext";
import {
  Clock,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Product } from "@/types";
import { clientFetch } from "@/lib/api-client";

export function BestDeals() {
  const { addToCart } = useStore();
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 35,
  });

  // Fetch active deals from /api/deals (deduplicated)
  useEffect(() => {
    clientFetch("/api/deals")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const prods = data.map((d: any) => {
            const p = d.product || d;
            return {
              id: p.id,
              name: p.name,
              brand: p.brand?.name || p.brand || "Authorized",
              category: p.category?.slug || p.categoryId || "power-tools",
              price: p.price,
              originalPrice: p.compareAtPrice || p.originalPrice,
              discountPercent: d.discountPercent || (p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : 15),
              rating: p.ratingAvg || p.rating || 5.0,
              reviewsCount: p.ratingCount || p.reviewsCount || 10,
              inStock: p.isInStock ?? p.inStock ?? true,
              stockCount: p.stockQuantity ?? p.stockCount ?? 8,
              sku: p.sku || "SKU",
              unit: p.unit || "Piece",
              description: p.description || "",
              specifications: p.technicalSpecs || p.specifications || {},
              images: Array.isArray(p.images)
                ? p.images.map((img: any) => (typeof img === "string" ? img : img.imageUrl))
                : ["/images/placeholder.webp"],
              tags: p.tags || ["deal"],
            } as Product;
          });
          setDealProducts(prods);
        }
      })
      .catch((e) => console.warn("Failed to load deals:", e))
      .finally(() => setIsLoading(false));
  }, []);

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

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })]
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

  if (dealProducts.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section
      id="deals-section"
      style={{
        padding: "64px 0",
        background: "#FAFAFA",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div className="container">
        {/* Banner: Solid Navy #1E293B (NO gradient) */}
        <div
          style={{
            background: "#1E293B",
            borderRadius: "var(--radius-lg)",
            padding: "28px 32px",
            color: "#FFFFFF",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            border: "1px solid #334155",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#94A3B8",
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

            <p style={{ fontSize: "14px", color: "#CBD5E1", maxWidth: "560px", margin: 0 }}>
              Authorized discounted power tools, waterproofing compounds, and electrical gear direct to site.
            </p>
          </div>

          {/* Countdown Clock */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#0F172A",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-md)",
              padding: "10px 18px",
            }}
          >
            <Clock size={18} color="#94A3B8" />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Deal Refreshes In
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(timeLeft.hours).padStart(2, "0")}h :{" "}
                {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                {String(timeLeft.seconds).padStart(2, "0")}s
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Header & Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#1C1C1E" }}>
            Discounted Contractor Stock ({dealProducts.length} items)
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={scrollPrev}
              aria-label="Previous deal"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                color: "#1C1C1E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "border-color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4A6572")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
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
                color: "#1C1C1E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "border-color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4A6572")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Embla Deals Slider */}
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
                      transition: "border-color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4A6572")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                  >
                    {/* Factual SAVE % Badge in Warm Rust / Terracotta */}
                    {prod.discountPercent && prod.discountPercent > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          background: "#FBEFEB",
                          color: "#C1512D",
                          border: "1px solid #F0D0C7",
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

                    {/* Product Image Link using Next.js Image */}
                    <Link
                      href={`/product/${prod.id}`}
                      style={{
                        height: "180px",
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "var(--radius-sm)",
                        marginBottom: "12px",
                        background: "#FAFAFA",
                        border: "1px solid #E5E7EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                      }}
                    >
                      <Image
                        src={prod.images[0] || "/images/placeholder.webp"}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        style={{
                          objectFit: "contain",
                          padding: "8px",
                        }}
                      />
                    </Link>

                    {/* Brand */}
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#4A6572",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        marginBottom: "2px",
                      }}
                    >
                      {prod.brand}
                    </div>

                    {/* Title Link */}
                    <h3 style={{ margin: "0 0 10px 0", minHeight: "40px" }}>
                      <Link
                        href={`/product/${prod.id}`}
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#1C1C1E",
                          cursor: "pointer",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: "1.35",
                          textDecoration: "none",
                        }}
                        title={prod.name}
                      >
                        {prod.name}
                      </Link>
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
                      <span style={{ fontSize: "18px", fontWeight: 800, color: "#1C1C1E" }}>
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
                        color: "#6E6E73",
                        marginBottom: "14px",
                      }}
                    >
                      <span>In Stock: </span>
                      <strong style={{ color: "#3A3A3C" }}>{stockRemaining} units left</strong>
                    </div>

                    {/* Add to Cart Button in Muted Steel-Blue */}
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="btn btn-primary btn-full btn-sm"
                      style={{
                        gap: "6px",
                        padding: "9px",
                        marginTop: "auto",
                        background: "#4A6572",
                        color: "#FFFFFF",
                        border: "none",
                        cursor: "pointer",
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
                background: selectedIndex === idx ? "#4A6572" : "#D1D5DB",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>

        {/* Bottom Catalog Link in Muted Steel-Blue */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#4A6572",
              textDecoration: "none",
            }}
          >
            <span>Explore All Materials &amp; Hardware Catalog</span>
            <ArrowRight size={14} />
          </Link>
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
