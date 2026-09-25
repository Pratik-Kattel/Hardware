"use client";

import React from "react";
import { TopHeader } from "@/components/TopHeader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";

// Global interactive modals & drawers
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderConfirmationModal } from "@/components/OrderConfirmationModal";
import { OrderTrackingModal } from "@/components/OrderTrackingModal";
import { RequestQuoteModal } from "@/components/RequestQuoteModal";
import { CustomerAuthModal } from "@/components/CustomerAuthModal";
import { ToastNotification } from "@/components/ToastNotification";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Utility Top Bar */}
      <TopHeader />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Page Content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Complete Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Interactive Modals & Drawers */}
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
