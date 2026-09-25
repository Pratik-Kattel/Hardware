"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { TestimonialData } from "@/types";
import { testimonialsData } from "@/lib/seed-data";
import { clientFetch } from "@/lib/api-client";

export function ReviewsSection() {
  const { storeInfo } = useStore();
  const [reviews, setReviews] = useState<TestimonialData[]>(testimonialsData);

  useEffect(() => {
    clientFetch("/api/testimonials")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {});
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

  const ordersCount = storeInfo?.stats?.ordersDelivered || 15400;

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

          {/* Dynamic Rating Summary Bar */}
          <div
            style={{
              background: "#FAFAFA",
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
                  color: "#1C1C1E",
                  lineHeight: "1",
                }}
              >
                4.9<span style={{ fontSize: "14px", color: "#6E6E73", fontWeight: 500 }}>/5.0</span>
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
                color: "#3A3A3C",
                borderLeft: "1px solid #E5E7EB",
                paddingLeft: "14px",
                maxWidth: "240px",
                lineHeight: "1.4",
              }}
            >
              <strong>{ordersCount.toLocaleString()}+ Verified Orders</strong> delivered across Kathmandu, Lalitpur, and Bhaktapur.
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
            aria-label="Next review"
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

        {/* Reviews Carousel Slider */}
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", marginLeft: "-20px" }}>
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="review-slide-item"
                style={{
                  flex: "0 0 33.333%",
                  minWidth: 0,
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    background: "#FAFAFA",
                    border: "1px solid #E5E7EB",
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    position: "relative",
                    transition: "border-color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4A6572")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
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
                    {[...Array(Math.floor(rev.rating))].map((_, i) => (
                      <Star key={i} size={14} fill="#D97706" color="#D97706" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#1C1C1E",
                      lineHeight: "1.6",
                      marginBottom: "18px",
                      flex: 1,
                    }}
                  >
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>

                  {/* Project Tag */}
                  <div style={{ marginBottom: "14px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#4A6572",
                        background: "#EBF0F2",
                        padding: "3px 8px",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      Project: {rev.projectTag}
                    </span>
                  </div>

                  {/* Author Info using Next.js Image */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      paddingTop: "14px",
                      borderTop: "1px solid #E5E7EB",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0,
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <Image
                        src={rev.photoUrl}
                        alt={rev.name}
                        width={42}
                        height={42}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#1C1C1E",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span>{rev.name}</span>
                        {rev.isVerified && (
                          <span title="Verified Site Buyer" style={{ display: "inline-flex" }}>
                            <CheckCircle2 size={13} color="#1E824C" />
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6E6E73" }}>
                        {rev.role} · {rev.location}
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
            gap: "6px",
            marginTop: "28px",
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
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .review-slide-item {
            flex: 0 0 50% !important;
          }
        }
        @media (max-width: 640px) {
          .review-slide-item {
            flex: 0 0 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
