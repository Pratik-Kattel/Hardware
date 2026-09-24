"use client";

import React from "react";
import { BRANDS, BrandInfo } from "@/data/brands";
import { useStore } from "@/context/StoreContext";

// Authentic Brand Vector SVG Logos
function BrandLogoSvg({ brandId }: { brandId: string }) {
  switch (brandId) {
    case "bosch":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bosch Magneto Icon */}
          <circle cx="18" cy="19" r="14" stroke="#DC2626" strokeWidth="3.5" fill="none" />
          <path d="M12 19h12M18 13v12" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          {/* BOSCH text */}
          <text x="38" y="26" fill="#0F1B2D" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="900" letterSpacing="0.05em">
            BOSCH
          </text>
        </svg>
      );
    case "makita":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="5" y="27" fill="#00758F" fontFamily="Arial, Helvetica, sans-serif" fontSize="26" fontStyle="italic" fontWeight="900" letterSpacing="-0.02em">
            makita
          </text>
        </svg>
      );
    case "dewalt":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="136" height="28" fill="#F15A24" rx="2" />
          <text x="10" y="26" fill="#0F1B2D" fontFamily="Impact, Arial Black, sans-serif" fontSize="22" fontWeight="900" letterSpacing="0.08em">
            DEWALT
          </text>
        </svg>
      );
    case "asian-paints":
      return (
        <svg viewBox="0 0 150 38" width="120" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="19" r="10" fill="#E11D48" />
          <circle cx="22" cy="15" r="7" fill="#F59E0B" />
          <text x="36" y="25" fill="#0F1B2D" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" fontWeight="800">
            asianpaints
          </text>
        </svg>
      );
    case "astral":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19L18 8l14 11-14 11L4 19z" fill="#0284C7" />
          <text x="36" y="26" fill="#0F1B2D" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="900" letterSpacing="0.06em">
            ASTRAL
          </text>
        </svg>
      );
    case "havells":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="6" y="26" fill="#DC2626" fontFamily="Arial, Helvetica, sans-serif" fontSize="23" fontWeight="900" letterSpacing="0.08em">
            HAVELLS
          </text>
        </svg>
      );
    case "jaquar":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="8" y="26" fill="#0F1B2D" fontFamily="Georgia, serif" fontSize="23" fontWeight="700" letterSpacing="0.04em">
            jaquar
          </text>
        </svg>
      );
    case "stanley":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="6" width="136" height="26" fill="#0F1B2D" rx="3" />
          <path d="M2 6h24l-6 26H2V6z" fill="#F59E0B" />
          <text x="26" y="25" fill="#FFFFFF" fontFamily="Arial, Helvetica, sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.08em">
            STANLEY
          </text>
        </svg>
      );
    case "taparia":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="8" y="26" fill="#0F1B2D" fontFamily="Arial, Helvetica, sans-serif" fontSize="21" fontWeight="800" letterSpacing="0.08em">
            TAPARIA
          </text>
        </svg>
      );
    case "dr-fixit":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="28" height="26" fill="#F59E0B" rx="3" />
          <text x="8" y="25" fill="#0F1B2D" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fontWeight="900">
            Dr
          </text>
          <text x="38" y="26" fill="#0F1B2D" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="900">
            FIXIT
          </text>
        </svg>
      );
    case "kirloskar":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="19" r="10" stroke="#059669" strokeWidth="3" fill="none" />
          <text x="32" y="25" fill="#0F1B2D" fontFamily="Arial, Helvetica, sans-serif" fontSize="18" fontWeight="800">
            Kirloskar
          </text>
        </svg>
      );
    case "karam":
      return (
        <svg viewBox="0 0 140 38" width="110" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="6" y="26" fill="#0F1B2D" fontFamily="Arial, Helvetica, sans-serif" fontSize="23" fontWeight="900" letterSpacing="0.1em">
            KARAM
          </text>
        </svg>
      );
    default:
      return (
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#0F1B2D" }}>
          {brandId.toUpperCase()}
        </div>
      );
  }
}

export function BrandShowcase() {
  const { setSelectedBrand } = useStore();

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    const shopEl = document.getElementById("shop-section");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Duplicate brands array to achieve seamless infinite marquee loop
  const marqueeBrands: BrandInfo[] = [...BRANDS, ...BRANDS];

  return (
    <section
      style={{
        padding: "64px 0",
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section Header: Plain uppercase label, NO pill background */}
        <div className="section-header">
          <span className="section-tag">Authorized Brand Partners</span>
          <h2 className="section-title">Direct Factory Brand Distribution</h2>
          <p className="section-subtitle">
            Direct supply chain agreements with global manufacturers to guarantee authentic serial numbers and official warranties.
          </p>
        </div>
      </div>

      {/* Horizontal Auto-Scroll Logo Marquee Slider (JP Engineering style) */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeBrands.map((b, index) => (
            <div
              key={`${b.id}-${index}`}
              onClick={() => handleBrandClick(b.name)}
              className="brand-logo-card"
              title={`View ${b.name} Products`}
            >
              {/* Brand Logo Vector */}
              <div
                style={{
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                }}
              >
                <BrandLogoSvg brandId={b.id} />
              </div>

              {/* Plain small text under brand (NO orange pill/badge styling) */}
              <div
                style={{
                  fontSize: "11px",
                  color: "#6B7280",
                  fontWeight: 500,
                  lineHeight: "1.3",
                  textAlign: "center",
                }}
              >
                {b.category}
              </div>

              <div
                style={{
                  fontSize: "10px",
                  color: "#9CA3AF",
                  marginTop: "2px",
                  textAlign: "center",
                }}
              >
                {b.country}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 10px 0;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 20px;
          width: max-content;
          animation: marqueeScroll 35s linear infinite;
        }

        .marquee-track:hover {
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

        .brand-logo-card {
          width: 190px;
          flex-shrink: 0;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: var(--radius-md);
          padding: 16px 14px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
          transition: border-color var(--transition-fast);
          box-shadow: none;
        }

        .brand-logo-card:hover {
          border-color: #0F1B2D;
        }
      `}</style>
    </section>
  );
}
