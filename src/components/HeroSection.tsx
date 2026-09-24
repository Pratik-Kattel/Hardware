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
  bgImage: string;
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
    bgImage: "/images/hero/hero-power-tools.jpg",
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
    bgImage: "/images/hero/hero-plumbing-pipes.jpg",
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
    bgImage: "/images/hero/hero-cement-steel.jpg",
  },
];

export function HeroSection() {
  const { openModal, setSelectedCategory } = useStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      {/* 1. Full-Width Real Photo Auto-Rotating Slider (3 Slides Max) */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0F1B2D",
        }}
        aria-label="Featured Hardware Categories"
      >
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", userSelect: "none" }}>
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                style={{
                  flex: "0 0 100%",
                  minWidth: "100%",
                  position: "relative",
                  height: "540px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Background Photo */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${slide.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Dark Overlay ONLY for text legibility (Solid black at 40% opacity, NO gradient) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.40)",
                  }}
                />

                {/* Slide Text Content */}
                <div className="container" style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ maxWidth: "700px" }}>
                    {/* Category Eyebrow: Plain uppercase orange text, NO pill */}
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "#F15A24",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}
                    >
                      {slide.categoryTag}
                    </div>

                    {/* Headline */}
                    <h1
                      style={{
                        fontSize: "40px",
                        fontWeight: 800,
                        lineHeight: "1.2",
                        color: "#FFFFFF",
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
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#F3F4F6",
                        marginBottom: "28px",
                        maxWidth: "620px",
                      }}
                    >
                      {slide.subtext}
                    </p>

                    {/* CTA Button */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                      <button
                        onClick={() => handleCtaClick(slide)}
                        className="btn btn-primary btn-lg"
                        style={{
                          background: "#F15A24",
                          color: "#FFFFFF",
                          border: "none",
                          boxShadow: "none",
                          gap: "8px",
                          fontWeight: 700,
                        }}
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight size={17} />
                      </button>

                      {slide.ctaAction !== "quote" && (
                        <button
                          onClick={() => openModal("request_quote")}
                          className="btn btn-lg"
                          style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            color: "#FFFFFF",
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                            backdropFilter: "none",
                            gap: "8px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#FFFFFF";
                            e.currentTarget.style.color = "#0F1B2D";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                            e.currentTarget.style.color = "#FFFFFF";
                          }}
                        >
                          <HardHat size={17} />
                          <span>Contractor Rates</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "42px",
            height: "42px",
            borderRadius: "4px",
            background: "rgba(15, 27, 45, 0.7)",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0F1B2D")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(15, 27, 45, 0.7)")}
        >
          <ChevronLeft size={22} />
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
            width: "42px",
            height: "42px",
            borderRadius: "4px",
            background: "rgba(15, 27, 45, 0.7)",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0F1B2D")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(15, 27, 45, 0.7)")}
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "22px",
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
                width: selectedIndex === idx ? "28px" : "10px",
                height: "8px",
                borderRadius: "4px",
                background: selectedIndex === idx ? "#F15A24" : "rgba(255, 255, 255, 0.5)",
                border: "none",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. Plain Thin Info-Bar Below Hero (Single Row, Icon + Text, No Card Backgrounds - JP Engineering style) */}
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
              <ShieldCheck size={20} color="#F15A24" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#0F1B2D" }}>100% Genuine Brands</strong>
                <div style={{ color: "#6B7280", fontSize: "12px" }}>Direct manufacturer warranty</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Truck size={20} color="#F15A24" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#0F1B2D" }}>Same-Day Dispatch</strong>
                <div style={{ color: "#6B7280", fontSize: "12px" }}>Across Kathmandu Valley</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ReceiptText size={20} color="#F15A24" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#0F1B2D" }}>13% Official VAT Bills</strong>
                <div style={{ color: "#6B7280", fontSize: "12px" }}>Tax compliant invoicing</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Clock size={20} color="#F15A24" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#0F1B2D" }}>Open Daily 7AM – 8PM</strong>
                <div style={{ color: "#6B7280", fontSize: "12px" }}>Kalanki Ring Road Depot</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Plain Counter Row (JP Engineering style: Years of Experience / Orders Delivered, not boxed cards) */}
      <section
        style={{
          background: "#F8F9FA",
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
                  color: "#0F1B2D",
                  lineHeight: "1.1",
                  marginBottom: "4px",
                }}
              >
                20+
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>
                Years in Business
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                Supplying hardware since 2004
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#0F1B2D",
                  lineHeight: "1.1",
                  marginBottom: "4px",
                }}
              >
                2,400+
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>
                Orders Delivered
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                Direct to sites &amp; workshops
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#0F1B2D",
                  lineHeight: "1.1",
                  marginBottom: "4px",
                }}
              >
                12+
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>
                Authorized Brand Lines
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                Bosch, Makita, Astral &amp; more
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#0F1B2D",
                  lineHeight: "1.1",
                  marginBottom: "4px",
                }}
              >
                100%
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>
                VAT &amp; Tax Compliant
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                Official PAN 602918239
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 992px) {
          .info-bar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .counter-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .hero-headline {
            font-size: 30px !important;
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
