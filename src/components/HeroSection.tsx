"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ShieldCheck,
  Truck,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  HardHat,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { HeroSlideData, ProductCategory } from "@/types";
import { heroSlidesData } from "@/lib/seed-data";

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
  const router = useRouter();
  const { openModal, setSelectedCategory, storeInfo } = useStore();
  const [slides, setSlides] = useState<HeroSlideData[]>(heroSlidesData as any);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch dynamic hero slides from API
  useEffect(() => {
    fetch("/api/hero-slides")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(() => {});
  }, []);

  // IntersectionObserver for Animated Stat Counters
  const [countersInView, setCountersInView] = useState(false);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  const handleCtaClick = (slide: HeroSlideData) => {
    if (slide.ctaAction === "quote") {
      openModal("request_quote");
    } else if (slide.categoryId) {
      setSelectedCategory(slide.categoryId as ProductCategory);
      router.push(`/category/${slide.categoryId}`);
    } else {
      router.push("/products");
    }
  };

  const yearsInBusiness = storeInfo?.stats?.yearsInBusiness || new Date().getFullYear() - 1998;
  const ordersDelivered = storeInfo?.stats?.ordersDelivered || 15400;
  const authorizedBrands = storeInfo?.stats?.authorizedBrands || 40;

  return (
    <>
      {/* 1. Main Hero Carousel Container */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #1C1C1E 0%, #2E3A42 100%)",
          color: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", touchAction: "pan-y" }}>
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                style={{
                  flex: "0 0 100%",
                  minWidth: 0,
                  position: "relative",
                  padding: "60px 0 76px 0",
                }}
              >
                <div className="container" style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.15fr 0.85fr",
                      gap: "48px",
                      alignItems: "center",
                    }}
                    className="hero-grid"
                  >
                    {/* Left Column: Headlines & High-Contrast CTAs */}
                    <div style={{ maxWidth: "620px" }}>
                      {/* Uppercase Eyebrow Pill */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "6px 14px",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(255, 255, 255, 0.12)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#FFFFFF",
                          marginBottom: "20px",
                        }}
                      >
                        <HardHat size={14} color="#A4B8C4" />
                        <span>{slide.categoryTag}</span>
                      </div>

                      {/* Main Headline */}
                      <h1
                        style={{
                          fontSize: "44px",
                          fontWeight: 800,
                          lineHeight: "1.12",
                          letterSpacing: "-0.02em",
                          marginBottom: "18px",
                          color: "#FFFFFF",
                        }}
                        className="hero-headline"
                      >
                        {slide.headline}
                      </h1>

                      {/* Subtitle */}
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: "1.6",
                          color: "rgba(255, 255, 255, 0.85)",
                          marginBottom: "32px",
                        }}
                      >
                        {slide.subtext}
                      </p>

                      {/* Button Group */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={() => handleCtaClick(slide)}
                          style={{
                            background: "#4A6572",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "var(--radius-sm)",
                            padding: "13px 28px",
                            fontSize: "15px",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.15s ease",
                            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#3B525D";
                            e.currentTarget.style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#4A6572";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <span>{slide.ctaText}</span>
                          <ArrowRight size={17} />
                        </button>

                        <button
                          onClick={() => router.push("/products")}
                          style={{
                            background: "transparent",
                            color: "#FFFFFF",
                            border: "1.5px solid rgba(255, 255, 255, 0.4)",
                            borderRadius: "var(--radius-sm)",
                            padding: "13px 24px",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#FFFFFF";
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          Full Catalog
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Visual Showcase using Next.js Image */}
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="hero-images-wrapper"
                    >
                      {/* Main Primary Image */}
                      <div
                        style={{
                          width: "92%",
                          height: "360px",
                          borderRadius: "var(--radius-lg)",
                          overflow: "hidden",
                          position: "relative",
                          border: "2px solid rgba(255, 255, 255, 0.4)",
                          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
                          background: "#FFFFFF",
                        }}
                      >
                        <Image
                          src={slide.mainImage}
                          alt={slide.headline}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={idx === 0}
                          style={{ objectFit: "cover" }}
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
                        <Image
                          src={slide.detailImage}
                          alt={`${slide.headline} detail`}
                          fill
                          sizes="(max-width: 768px) 50vw, 30vw"
                          style={{ objectFit: "cover" }}
                        />

                        {/* Detail Tag Badge */}
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
                            zIndex: 4,
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

        {/* Carousel Controls */}
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
            cursor: "pointer",
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
            cursor: "pointer",
          }}
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 10,
          }}
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: selectedIndex === idx ? "28px" : "8px",
                height: "8px",
                borderRadius: "var(--radius-full)",
                background: selectedIndex === idx ? "#4A6572" : "rgba(255, 255, 255, 0.35)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. Trust Pillars Bar */}
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
              gridTemplateColumns: "repeat(3, 1fr)",
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
              <Clock size={22} color="#4A6572" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                <strong style={{ color: "#1C1C1E" }}>{storeInfo?.hours || "Open Daily 7AM – 8PM"}</strong>
                <div style={{ color: "#6E6E73", fontSize: "12px" }}>{storeInfo?.businessName || "New Adhikari Traders"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real Animated Stat Counters From Database */}
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
              gridTemplateColumns: "repeat(3, 1fr)",
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
                  target={yearsInBusiness}
                  suffix="+"
                  duration={1400}
                  shouldAnimate={countersInView}
                />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#2E3A42" }}>
                Years in Business
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "3px" }}>
                Supplying hardware since 1998
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
                  target={ordersDelivered}
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
                  target={authorizedBrands}
                  suffix="+"
                  duration={1300}
                  shouldAnimate={countersInView}
                />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#2E3A42" }}>
                Authorized Brands
              </div>
              <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "3px" }}>
                Direct factory dealerships
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
