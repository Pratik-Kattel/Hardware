"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ShieldCheck,
  Truck,
  ReceiptText,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  HardHat,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCategory } from "@/types";

interface HeroSlide {
  id: string;
  categoryTag: string;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaAction: "category" | "quote";
  categoryId?: ProductCategory;
  mainImage: string;
  detailImage: string;
  detailBadge: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "power-tools",
    categoryTag: "POWER TOOLS & MACHINERY",
    headline: "Heavy-Duty Power Tools & Professional Equipment",
    subtext:
      "Direct authorized dealer inventory from Bosch, Makita, and DeWalt with verifiable manufacturer warranty, genuine spare parts, and fast site delivery across Kathmandu Valley.",
    ctaText: "Shop Power Tools",
    ctaAction: "category",
    categoryId: "power-tools",
    mainImage: "/images/hero/hero-power-tools-main.webp",
    detailImage: "/images/hero/hero-power-tools-detail.webp",
    detailBadge: "Verified Serial Warranties",
  },
  {
    id: "plumbing",
    categoryTag: "PLUMBING & PIPES",
    headline: "Commercial CPVC, PVC & High-Pressure Brass Fittings",
    subtext:
      "Astral CPVC pressure pipes, industrial ball valves, sanitary fittings, and water pumps stocked in contractor quantities with immediate site dispatch.",
    ctaText: "Shop Plumbing & Pipes",
    ctaAction: "category",
    categoryId: "plumbing",
    mainImage: "/images/hero/hero-plumbing-pipes-main.webp",
    detailImage: "/images/hero/hero-plumbing-detail.webp",
    detailBadge: "Pressure Tested Schedules",
  },
  {
    id: "cement-steel",
    categoryTag: "CEMENT & STEEL",
    headline: "53-Grade Portland Cement & Structural TMT Steel Rebars",
    subtext:
      "Direct depot wholesale pricing with official 13% VAT invoices and dedicated mini-truck delivery straight to your construction gate.",
    ctaText: "Request Contractor Bulk Quote",
    ctaAction: "quote",
    categoryId: "construction-materials",
    mainImage: "/images/hero/hero-cement-steel-main.webp",
    detailImage: "/images/hero/hero-steel-detail.webp",
    detailBadge: "53-Grade & Fe-500D Grade",
  },
];

export function HeroSection() {
  const { openModal, setSelectedCategory } = useStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Embla setup with touch swipe support, manual arrows, and pause on hover/touch
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 25 },
    [Autoplay({ delay: 5500, stopOnMouseEnter: true, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleCtaClick = (slide: HeroSlide) => {
    if (slide.ctaAction === "quote") {
      openModal("request_quote");
    } else if (slide.categoryId) {
      setSelectedCategory(slide.categoryId);
      const shopEl = document.getElementById("shop-section");
      if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* 1. Hero Slider with Layered Multi-Photo Set per Slide */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
        }}
        aria-label="Featured Hardware Categories"
      >
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", userSelect: "none" }}>
            {HERO_SLIDES.map((slide) => (
              <div
                key={slide.id}
                style={{
                  flex: "0 0 100%",
                  minWidth: "100%",
                  position: "relative",
                  padding: "54px 0 60px 0",
                  background: "#FAFAFA",
                }}
              >
                <div className="container">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.05fr 0.95fr",
                      gap: "48px",
                      alignItems: "center",
                    }}
                    className="hero-slide-grid"
                  >
                    {/* Left Column: Heading, Value Prop, CTAs */}
                    <div>
                      {/* Category Eyebrow: Muted Steel-Blue plain uppercase text */}
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          color: "#4A6572",
                          textTransform: "uppercase",
                          marginBottom: "12px",
                        }}
                      >
                        {slide.categoryTag}
                      </div>

                      {/* Main Headline */}
                      <h1
                        style={{
                          fontSize: "38px",
                          fontWeight: 800,
                          lineHeight: "1.2",
                          color: "#1C1C1E",
                          letterSpacing: "-0.02em",
                          marginBottom: "16px",
                        }}
                        className="hero-headline"
                      >
                        {slide.headline}
                      </h1>

                      {/* Subtext */}
                      <p
                        style={{
                          fontSize: "15px",
                          lineHeight: "1.65",
                          color: "#3A3A3C",
                          marginBottom: "28px",
                          maxWidth: "560px",
                        }}
                      >
                        {slide.subtext}
                      </p>

                      {/* CTAs in Muted Steel-Blue Palette */}
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                        <button
                          onClick={() => handleCtaClick(slide)}
                          className="btn btn-primary btn-lg"
                          style={{
                            background: "#4A6572",
                            color: "#FFFFFF",
                            border: "none",
                            gap: "8px",
                            fontWeight: 700,
                          }}
                        >
                          <span>{slide.ctaText}</span>
                          <ArrowRight size={17} />
                        </button>

                        <button
                          onClick={() => openModal("request_quote")}
                          className="btn btn-outline btn-lg"
                          style={{
                            background: "#FFFFFF",
                            color: "#1C1C1E",
                            border: "1px solid #D1D5DB",
                            gap: "8px",
                            fontWeight: 600,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#1C1C1E";
                            e.currentTarget.style.background = "#F4F4F6";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#D1D5DB";
                            e.currentTarget.style.background = "#FFFFFF";
                          }}
                        >
                          <HardHat size={17} color="#4A6572" />
                          <span>Contractor Rates</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Layered Multi-Photo Set (2-3 authentic store & warehouse shots) */}
                    <div style={{ position: "relative" }} className="hero-photo-cluster">
                      {/* Main Primary Warehouse Shot */}
                      <div
                        style={{
                          width: "88%",
                          height: "360px",
                          borderRadius: "var(--radius-lg)",
                          overflow: "hidden",
                          border: "1px solid #E5E7EB",
                          boxShadow: "0 8px 24px -6px rgba(0, 0, 0, 0.08)",
                          background: "#FFFFFF",
                        }}
                      >
                        <img
                          src={slide.mainImage}
                          alt={slide.headline}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Overlapping Inset Detail Shot (Workbench / Close-up photo) */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-20px",
                          right: "0",
                          width: "56%",
                          height: "220px",
                          borderRadius: "var(--radius-md)",
                          overflow: "hidden",
                          border: "3px solid #FFFFFF",
                          boxShadow: "0 12px 28px -6px rgba(0, 0, 0, 0.14)",
                          background: "#FFFFFF",
                          zIndex: 3,
                        }}
                      >
                        <img
                          src={slide.detailImage}
                          alt="Detail workbench view"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />

                        {/* Factual Quality Badge Chip */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "8px",
                            background: "rgba(28, 28, 30, 0.85)",
                            color: "#FFFFFF",
                            padding: "3px 8px",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "10px",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <CheckCircle2 size={11} color="#A4B8C4" />
                          <span>{slide.detailBadge}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next Manual Arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-sm)",
            background: "#FFFFFF",
            color: "#1C1C1E",
            border: "1px solid #D1D5DB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.15s, background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4A6572";
            e.currentTarget.style.background = "#F4F4F6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#D1D5DB";
            e.currentTarget.style.background = "#FFFFFF";
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={scrollNext}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-sm)",
            background: "#FFFFFF",
            color: "#1C1C1E",
            border: "1px solid #D1D5DB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.15s, background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4A6572";
            e.currentTarget.style.background = "#F4F4F6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#D1D5DB";
            e.currentTarget.style.background = "#FFFFFF";
          }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Dot Indicators restyled in Muted Steel-Blue #4A6572 */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: selectedIndex === idx ? "26px" : "8px",
                height: "6px",
                borderRadius: "3px",
                background: selectedIndex === idx ? "#4A6572" : "#D1D5DB",
                border: "none",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. Plain Thin Info-Bar Below Hero (Single Row, Icon + Text, No Card Backgrounds) */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "16px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
            className="info-bar-grid"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ShieldCheck size={20} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>100% Genuine Brands</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>Direct manufacturer warranty</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Truck size={20} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>Same-Day Dispatch</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>Across Kathmandu Valley</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ReceiptText size={20} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>13% Official VAT Bills</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>Tax compliant invoicing</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Clock size={20} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>Open Daily 7AM – 8PM</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>Kalanki Ring Road Depot</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Plain Counter Row (JP Engineering style: Real Numbers, Plain Layout) */}
      <section
        style={{
          background: "#FAFAFA",
          borderBottom: "1px solid #E5E7EB",
          padding: "36px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="counter-grid"
          >
            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.1",
                  marginBottom: "4px",
                }}
              >
                20+
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#3A3A3C" }}>
                Years in Business
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "2px" }}>
                Supplying hardware since 2004
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.1",
                  marginBottom: "4px",
                }}
              >
                2,400+
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#3A3A3C" }}>
                Orders Delivered
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "2px" }}>
                Direct to sites &amp; workshops
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.1",
                  marginBottom: "4px",
                }}
              >
                12+
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#3A3A3C" }}>
                Authorized Brand Lines
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "2px" }}>
                Bosch, Makita, Astral &amp; more
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.1",
                  marginBottom: "4px",
                }}
              >
                100%
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#3A3A3C" }}>
                VAT &amp; Tax Compliant
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "2px" }}>
                Official PAN 602918239
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 992px) {
          .hero-slide-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-photo-cluster {
            max-width: 520px;
            margin: 0 auto;
          }
          .info-bar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .counter-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .hero-headline {
            font-size: 28px !important;
          }
        }
        @media (max-width: 600px) {
          .info-bar-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .counter-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .hero-headline {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
