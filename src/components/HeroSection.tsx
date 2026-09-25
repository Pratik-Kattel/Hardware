"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
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
  bgImage: string;
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
    bgImage: "/images/hero/hero-power-tools-main.webp",
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
    bgImage: "/images/hero/hero-plumbing-pipes-main.webp",
    mainImage: "/images/hero/hero-plumbing-pipes-main.webp",
    detailImage: "/images/hero/hero-plumbing-detail.webp",
    detailBadge: "Pressure Tested Schedules",
  },
  {
    id: "electrical",
    categoryTag: "ELECTRICAL & WIRING",
    headline: "Flame-Retardant Copper Cables & Modular Switchgear",
    subtext:
      "Havells pure electrolytic copper wires, Schneider MCBs, industrial distribution boards, and commercial LED lighting direct to your construction site.",
    ctaText: "Shop Electrical Supplies",
    ctaAction: "category",
    categoryId: "electrical",
    bgImage: "/images/hero/hero-electrical-main.webp",
    mainImage: "/images/hero/hero-electrical-main.webp",
    detailImage: "/images/hero/hero-electrical-detail.webp",
    detailBadge: "1100V Pure Copper Grade",
  },
  {
    id: "cement-steel",
    categoryTag: "CEMENT & STEEL",
    headline: "53-Grade Portland Cement & Structural TMT Steel Rebars",
    subtext:
      "Direct depot wholesale pricing with official 13% VAT invoices and dedicated mini-truck delivery straight to your construction gate in Kathmandu.",
    ctaText: "Request Contractor Bulk Quote",
    ctaAction: "quote",
    categoryId: "construction-materials",
    bgImage: "/images/hero/hero-cement-steel-main.webp",
    mainImage: "/images/hero/hero-cement-steel-main.webp",
    detailImage: "/images/hero/hero-steel-detail.webp",
    detailBadge: "53-Grade & Fe-500D Grade",
  },
];

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1500,
  shouldAnimate,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  shouldAnimate: boolean;
}) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!shouldAnimate) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      if (progress < 1) {
        setDisplayValue(current.toLocaleString());
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(`${target.toLocaleString()}${suffix}`);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldAnimate, target, suffix, duration]);

  return <span>{displayValue}</span>;
}

export function HeroSection() {
  const { openModal, setSelectedCategory } = useStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // IntersectionObserver for Animated Stat Counters
  const [countersInView, setCountersInView] = useState(false);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersInView(true);
          observer.disconnect(); // Plays once
        }
      },
      { threshold: 0.3 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  const router = useRouter();

  const handleCtaClick = (slide: HeroSlide) => {
    if (slide.ctaAction === "quote") {
      openModal("request_quote");
    } else if (slide.categoryId) {
      setSelectedCategory(slide.categoryId);
      router.push(`/category/${slide.categoryId}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <div>
      {/* 1. Hero Slider with Full-Width Photo Background + Layered Multi-Photo Set per Slide */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#1C1C1E",
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
                  padding: "64px 0 74px 0",
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Solid Dark Overlay at ~40% opacity for text legibility (NO gradient) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(28, 28, 30, 0.40)",
                    zIndex: 1,
                  }}
                />

                <div className="container" style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.08fr 0.92fr",
                      gap: "48px",
                      alignItems: "center",
                    }}
                    className="hero-slide-grid"
                  >
                    {/* Left Column: Heading, Value Prop, CTAs */}
                    <div>
                      {/* Category Eyebrow: Plain uppercase text */}
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          color: "#CFDCE2",
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
                          color: "#FFFFFF",
                          letterSpacing: "-0.02em",
                          marginBottom: "16px",
                          textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
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
                          color: "#F1F5F9",
                          marginBottom: "28px",
                          maxWidth: "560px",
                          textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {slide.subtext}
                      </p>

                      {/* CTAs in Poppins & Steel-Blue Palette */}
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
                          className="btn btn-accent btn-lg"
                          style={{
                            background: "#FFFFFF",
                            color: "#1C1C1E",
                            border: "1px solid #FFFFFF",
                            gap: "8px",
                            fontWeight: 600,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#F4F4F6";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#FFFFFF";
                          }}
                        >
                          <HardHat size={17} color="#4A6572" />
                          <span>Contractor Rates</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Layered Multi-Photo Composition */}
                    <div style={{ position: "relative" }} className="hero-photo-cluster">
                      {/* Main Primary Wide Shot */}
                      <div
                        style={{
                          width: "88%",
                          height: "360px",
                          borderRadius: "var(--radius-lg)",
                          overflow: "hidden",
                          border: "2px solid rgba(255, 255, 255, 0.4)",
                          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
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

                      {/* Overlapping Inset Detail Shot */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-18px",
                          right: "0",
                          width: "56%",
                          height: "220px",
                          borderRadius: "var(--radius-md)",
                          overflow: "hidden",
                          border: "3px solid #FFFFFF",
                          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.4)",
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

                        {/* Small Factual Info Tag Chip */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "8px",
                            background: "rgba(28, 28, 30, 0.90)",
                            color: "#FFFFFF",
                            padding: "4px 9px",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "11px",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <CheckCircle2 size={12} color="#A4B8C4" />
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

        {/* Prev / Next Manual Arrows with Subtle Light Circular Background */}
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.92)",
            color: "#1C1C1E",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.92)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
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
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.92)",
            color: "#1C1C1E",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.92)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators restyled in Steel-Blue #4A6572 Accent Color */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
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
                width: selectedIndex === idx ? "28px" : "8px",
                height: "6px",
                borderRadius: "3px",
                background: selectedIndex === idx ? "#4A6572" : "rgba(255, 255, 255, 0.45)",
                border: "none",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. Plain Thin Stat-Icon Row Below Hero (Added Spacing Between Slider Dots and this Row) */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "24px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="info-bar-grid"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ShieldCheck size={22} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>100% Genuine Brands</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>Direct manufacturer warranty</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Truck size={22} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>Same-Day Dispatch</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>Across Kathmandu Valley</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ReceiptText size={22} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>13% Official VAT Bills</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>Tax compliant invoicing</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Clock size={22} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>Open Daily 7AM – 8PM</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>Kathmandu Store Depot</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Animated Stat Counters Row: Visual separation with light gray tint + top border */}
      <section
        ref={countersRef}
        style={{
          background: "#F8F9FA",
          borderTop: "1px solid #E5E7EB",
          borderBottom: "1px solid #E5E7EB",
          padding: "42px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "28px",
            }}
            className="counter-grid"
          >
            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.1",
                  marginBottom: "6px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <AnimatedCounter
                  target={20}
                  suffix="+"
                  duration={1400}
                  shouldAnimate={countersInView}
                />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#2E3A42" }}>
                Years in Business
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "3px" }}>
                Supplying hardware since 2004
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.1",
                  marginBottom: "6px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <AnimatedCounter
                  target={2400}
                  suffix="+"
                  duration={1600}
                  shouldAnimate={countersInView}
                />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#2E3A42" }}>
                Orders Delivered
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "3px" }}>
                Direct to sites &amp; workshops
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.1",
                  marginBottom: "6px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <AnimatedCounter
                  target={12}
                  suffix="+"
                  duration={1300}
                  shouldAnimate={countersInView}
                />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#2E3A42" }}>
                Authorized Brand Lines
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "3px" }}>
                Bosch, Makita, Astral &amp; more
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="counter-item">
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#1C1C1E",
                  lineHeight: "1.1",
                  marginBottom: "6px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <AnimatedCounter
                  target={100}
                  suffix="%"
                  duration={1500}
                  shouldAnimate={countersInView}
                />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#2E3A42" }}>
                VAT &amp; Tax Compliant
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "3px" }}>
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
            gap: 40px !important;
          }
          .hero-photo-cluster {
            max-width: 520px;
            margin: 0 auto;
          }
          .info-bar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
          .counter-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 28px !important;
          }
          .hero-headline {
            font-size: 28px !important;
          }
        }
        @media (max-width: 600px) {
          .info-bar-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .counter-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .hero-headline {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
