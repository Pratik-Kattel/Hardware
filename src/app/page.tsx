"use client";

import React from "react";
import { TopHeader } from "@/components/TopHeader";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BestDeals } from "@/components/BestDeals";
import { ProductCatalog } from "@/components/ProductCatalog";
import { BrandShowcase } from "@/components/BrandShowcase";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactCTASection } from "@/components/ContactCTASection";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";

// Interactive Modals
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderConfirmationModal } from "@/components/OrderConfirmationModal";
import { OrderTrackingModal } from "@/components/OrderTrackingModal";
import { RequestQuoteModal } from "@/components/RequestQuoteModal";
import { CustomerAuthModal } from "@/components/CustomerAuthModal";
import { ToastNotification } from "@/components/ToastNotification";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Utility Top Bar */}
      <TopHeader />

      {/* Main Navigation with Live Search */}
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section with Quick CTAs & Value Props */}
        <HeroSection />

        {/* Shop By Category Grid (11+ Categories) */}
        <CategoryGrid />

        {/* Flash Deals & Limited Stock Countdown */}
        <BestDeals />

        {/* Full Shop / Interactive Product Catalog with Filters */}
        <ProductCatalog />

        {/* Authorized Brands Showcase */}
        <BrandShowcase />

        {/* Why Choose Adhikari Hardware Trust Pillars */}
        <WhyChooseUs />

        {/* Verified Customer & Contractor Reviews */}
        <ReviewsSection />

        {/* Contact & Site Delivery Helpline Section */}
        <ContactCTASection />
      </main>

      {/* Complete Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />

      {/* Dynamic Popups & Dialogs */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackingModal />
      <RequestQuoteModal />
      <CustomerAuthModal />
      <ToastNotification />
    </div>
  );
}
