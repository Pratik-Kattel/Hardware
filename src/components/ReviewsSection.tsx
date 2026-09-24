"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CUSTOMER_REVIEWS } from "@/data/reviews";
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function ReviewsSection() {
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

  return (
    <section
      style={{
        padding: "64px 0",
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div className="container">
        {/* Header & Verified Rating Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "36px",
          }}
        >
          <div>
            <span className="section-tag">Contractor &amp; Customer Trust</span>
            <h2 className="section-title" style={{ marginBottom: "6px" }}>
              What Builders in Nepal Say
            </h2>
            <p className="section-subtitle">
              Verified feedback from civil engineers, licensed plumbers, electricians, and homeowners.
            </p>
          </div>

          {/* Clean Rating Summary Bar - No glassmorphism, 1px border #E5E7EB */}
          <div
            style={{
              background: "#F8F9FA",
              border: "1px solid #E5E7EB",
              borderRadius: "var(--radius-md)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "#0F1B2D",
                  lineHeight: "1",
                }}
              >
                4.9<span style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>/5.0</span>
              </div>
              <div style={{ display: "flex", gap: "2px", marginTop: "3px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#D97706" color="#D97706" />
                ))}
              </div>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#4B5563",
                borderLeft: "1px solid #E5E7EB",
                paddingLeft: "14px",
                maxWidth: "240px",
                lineHeight: "1.4",
              }}
            >
              <strong>2,400+ Verified Orders</strong> delivered across Kathmandu, Lalitpur, and Bhaktapur.
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={scrollPrev}
            aria-label="Previous review"
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
              transition: "border-color var(--transition-fast)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0F1B2D")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={scrollNext}
            aria-label="Next review"
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
              transition: "border-color var(--transition-fast)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0F1B2D")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Reviews Embla Carousel: 2 visible desktop / 1 mobile */}
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", marginLeft: "-20px" }}>
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="review-slide-item"
                style={{
                  flex: "0 0 50%",
                  minWidth: 0,
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    background: "#F8F9FA",
                    border: "1px solid #E5E7EB",
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {/* Subtle Quote Icon */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      color: "#E5E7EB",
                    }}
                  >
                    <Quote size={24} />
                  </div>

                  {/* Star Rating */}
                  <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#D97706" color="#D97706" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#1F2937",
                      lineHeight: "1.6",
                      marginBottom: "18px",
                      flex: 1,
                    }}
                  >
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {/* Project Tag */}
                  <div style={{ marginBottom: "14px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#4B5563",
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        padding: "3px 8px",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      Project: {rev.projectType}
                    </span>
                  </div>

                  {/* Author Info */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      paddingTop: "14px",
                      borderTop: "1px solid #E5E7EB",
                    }}
                  >
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid #E5E7EB",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0F1B2D",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span>{rev.name}</span>
                        {rev.verifiedPurchase && (
                          <span title="Verified Site Buyer" style={{ display: "inline-flex" }}>
                            <CheckCircle2 size={13} color="#10B981" />
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "12px", color: "#F15A24", fontWeight: 600 }}>
                        {rev.role}
                      </div>
                      <div style={{ fontSize: "11px", color: "#6B7280" }}>
                        {rev.location} • {rev.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              aria-label={`Go to review group ${idx + 1}`}
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
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .review-slide-item {
            flex: 0 0 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
