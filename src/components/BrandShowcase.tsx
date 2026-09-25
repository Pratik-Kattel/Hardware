"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

// Evenly sized Brand Vector SVG Logos calibrated to uniform cap-height (28px height, sitting on one baseline)
function BrandLogoBaselineSvg({ brandId }: { brandId: string }) {
  const normalizedId = brandId.toLowerCase().replace(/\s+/g, "-");
  switch (normalizedId) {
    case "bosch":
      return (
        <svg viewBox="0 0 130 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="11" stroke="#DC2626" strokeWidth="2.8" fill="none" />
          <path d="M9 14h10M14 9v10" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
          <text x="32" y="21" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="19" fontWeight="900" letterSpacing="0.04em">
            BOSCH
          </text>
        </svg>
      );
    case "makita":
      return (
        <svg viewBox="0 0 110 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="21" fill="#00758F" fontFamily="Poppins, sans-serif" fontSize="21" fontStyle="italic" fontWeight="900" letterSpacing="-0.02em">
            makita
          </text>
        </svg>
      );
    case "dewalt":
      return (
        <svg viewBox="0 0 115 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="3" width="115" height="22" fill="#F1A024" rx="2" />
          <text x="7" y="19" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="17" fontWeight="900" letterSpacing="0.08em">
            DEWALT
          </text>
        </svg>
      );
    case "asian-paints":
      return (
        <svg viewBox="0 0 135 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="14" r="8" fill="#E11D48" />
          <circle cx="18" cy="10" r="5" fill="#F59E0B" />
          <text x="28" y="20" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="15" fontWeight="800">
            asianpaints
          </text>
        </svg>
      );
    case "astral":
      return (
        <svg viewBox="0 0 115 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14L14 5l10 9-10 9L4 14z" fill="#0284C7" />
          <text x="28" y="21" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.06em">
            ASTRAL
          </text>
        </svg>
      );
    case "havells":
      return (
        <svg viewBox="0 0 115 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="21" fill="#DC2626" fontFamily="Poppins, sans-serif" fontSize="20" fontWeight="900" letterSpacing="0.08em">
            HAVELLS
          </text>
        </svg>
      );
    case "jaquar":
      return (
        <svg viewBox="0 0 105 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="4" y="20" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="19" fontWeight="700" letterSpacing="0.04em">
            jaquar
          </text>
        </svg>
      );
    case "stanley":
      return (
        <svg viewBox="0 0 115 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="3" width="115" height="22" fill="#1C1C1E" rx="2" />
          <path d="M0 3h20l-5 22H0V3z" fill="#F59E0B" />
          <text x="22" y="19" fill="#FFFFFF" fontFamily="Poppins, sans-serif" fontSize="15" fontWeight="900" letterSpacing="0.08em">
            STANLEY
          </text>
        </svg>
      );
    case "taparia":
      return (
        <svg viewBox="0 0 110 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="4" y="21" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="18" fontWeight="800" letterSpacing="0.08em">
            TAPARIA
          </text>
        </svg>
      );
    case "dr-fixit":
      return (
        <svg viewBox="0 0 105 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="22" height="20" fill="#F59E0B" rx="2" />
          <text x="5" y="19" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="13" fontWeight="900">
            Dr
          </text>
          <text x="28" y="20" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="17" fontWeight="900">
            FIXIT
          </text>
        </svg>
      );
    case "kirloskar":
      return (
        <svg viewBox="0 0 115 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="14" r="8" stroke="#059669" strokeWidth="2.5" fill="none" />
          <text x="26" y="20" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="16" fontWeight="800">
            Kirloskar
          </text>
        </svg>
      );
    case "karam":
      return (
        <svg viewBox="0 0 105 28" height="28" style={{ width: "auto", display: "block" }} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="21" fill="#1C1C1E" fontFamily="Poppins, sans-serif" fontSize="20" fontWeight="900" letterSpacing="0.1em">
            KARAM
          </text>
        </svg>
      );
    default:
      return (
        <div style={{ fontSize: "16px", fontWeight: 800, color: "#1C1C1E", lineHeight: "28px" }}>
          {brandId.toUpperCase()}
        </div>
      );
  }
}

export function BrandShowcase() {
  const router = useRouter();
  const { brands, setSelectedBrand } = useStore();
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    router.push(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  // Repeated array for seamless continuous marquee loop
  const marqueeBrands = [...brands, ...brands];

  return (
    <section
      style={{
        padding: "54px 0",
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "28px" }}>
          <span className="section-tag">Authorized Brand Partners</span>
          <h2 className="section-title">Direct Factory Distribution</h2>
          <p className="section-subtitle">
            Direct authorized partnerships guaranteeing authentic serial numbers, factory warranties, and manufacturer spare parts.
          </p>
        </div>
      </div>

      {/* Horizontal Auto-Scroll Logo Row */}
      <div className="brand-strip-wrapper">
        <div className="brand-strip-track">
          {marqueeBrands.map((b, index) => (
            <div
              key={`${b.id || b.slug}-${index}`}
              onClick={() => handleBrandClick(b.name)}
              onMouseEnter={() => setHoveredBrand(`${b.id || b.slug}-${index}`)}
              onMouseLeave={() => setHoveredBrand(null)}
              className="brand-logo-item"
              title={`View ${b.name} Products`}
            >
              {/* Logo sitting on uniform 28px cap-height baseline */}
              <div
                style={{
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  filter:
                    hoveredBrand === `${b.id || b.slug}-${index}`
                      ? "none"
                      : "grayscale(100%) opacity(0.85)",
                  transition: "filter 0.15s ease",
                }}
              >
                <BrandLogoBaselineSvg brandId={b.slug || b.id} />
              </div>

              {/* Authorized Partner Tick */}
              {b.isAuthorizedPartner && (
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "8px",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "var(--accent-steel)",
                    background: "rgba(74, 101, 114, 0.08)",
                    padding: "2px 5px",
                    borderRadius: "2px",
                  }}
                >
                  DEALER
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brand-strip-wrapper {
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
          user-select: none;
          padding: 8px 0;
        }
        .brand-strip-wrapper::-webkit-scrollbar {
          display: none;
        }
        .brand-strip-track {
          display: flex;
          align-items: center;
          gap: 20px;
          width: max-content;
          animation: marqueeScroll 45s linear infinite;
        }
        .brand-strip-wrapper:hover .brand-strip-track {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .brand-logo-item {
          flex-shrink: 0;
          height: 64px;
          min-width: 150px;
          padding: 0 20px;
          background: #FAFAFA;
          border: 1px solid #E5E7EB;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justifyContent: center;
          cursor: pointer;
          position: relative;
          transition: all 0.15s ease;
        }
        .brand-logo-item:hover {
          background: #FFFFFF;
          border-color: #4A6572;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </section>
  );
}
