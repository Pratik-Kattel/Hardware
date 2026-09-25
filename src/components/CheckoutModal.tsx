"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  Phone,
  Building,
} from "lucide-react";
import { CustomerAddress, PaymentMethod } from "@/types";

export function CheckoutModal() {
  const {
    activeModal,
    closeModal,
    cart,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    cartTotal,
    user,
    savedAddresses,
    placeOrder,
  } = useStore();

  // Form states
  const [fullName, setFullName] = useState(user?.name || "Suman Adhikari");
  const [phone, setPhone] = useState(user?.phone || "985-1145065");
  const [email, setEmail] = useState(user?.email || "suman.adhikari@gmail.com");
  const [city, setCity] = useState<"Kathmandu" | "Lalitpur" | "Bhaktapur" | "Outside Valley">("Kathmandu");
  const [area, setArea] = useState("Ring Road, Ward 14");
  const [landmark, setLandmark] = useState("Behind Global IME Bank");
  const [isContractorOrder, setIsContractorOrder] = useState(false);
  const [companyPan, setCompanyPan] = useState("602918239");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [esewaId, setEsewaId] = useState("985-1145065");
  const [khaltiPhone, setKhaltiPhone] = useState("985-1145065");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState("");

  if (activeModal !== "checkout") return null;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !area.trim()) {
      setFormError("Please enter your recipient name, mobile number, and delivery area so we can dispatch your materials.");
      return;
    }
    setFormError("");

    setIsProcessing(true);

    const deliveryAddress: CustomerAddress = {
      id: `addr-${Date.now()}`,
      fullName,
      phone,
      city,
      area,
      landmark,
    };

    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(deliveryAddress, paymentMethod, fullName, phone, email);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        style={{
          maxWidth: "760px",
          padding: 0,
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <div style={{ fontSize: "12px", color: "var(--accent-steel)", fontWeight: 700, textTransform: "uppercase" }}>
              Secure Kathmandu Checkout
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary)" }}>
              Complete Your Hardware Order
            </h3>
          </div>

          <button onClick={closeModal} className="modal-close-btn" aria-label="Close checkout">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCompleteOrder} style={{ padding: "24px 30px", maxHeight: "80vh", overflowY: "auto" }}>
          {/* Section 1: Customer Contact & Delivery Details */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "var(--primary)",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                1
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--primary)" }}>
                Recipient &amp; Kathmandu Delivery Address
              </h4>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="checkout-two-col">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Suman Adhikari"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone Number * (Used for Delivery Call)</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                  />
                  <Phone size={15} color="var(--text-muted)" style={{ position: "absolute", right: "12px", top: "14px" }} />
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="checkout-two-col">
              <div className="form-group">
                <label className="form-label">Email (For Digital VAT Bill)</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">City / Region *</label>
                <select
                  className="form-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value as any)}
                >
                  <option value="Kathmandu">Kathmandu (All Wards)</option>
                  <option value="Lalitpur">Lalitpur (Patan, Kumaripati, Jhamsikhel)</option>
                  <option value="Bhaktapur">Bhaktapur (Suryabinayak, Thimi, Sallaghari)</option>
                  <option value="Outside Valley">Outside Valley (Express Courier Transport)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Street Address / Area / Construction Site Location *</label>
              <input
                type="text"
                required
                className="form-input"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Kalanki Chowk, Sitapaila Road, Baneshwor, etc."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nearest Landmark (Helps our delivery driver)</label>
              <input
                type="text"
                className="form-input"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Opposite Nepal Police Station, Behind Global Bank"
              />
            </div>

            {/* Contractor / Tax VAT bill checkbox */}
            <div
              style={{
                background: "var(--primary-surface)",
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                id="contractor-vat-check"
                checked={isContractorOrder}
                onChange={(e) => setIsContractorOrder(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--accent-steel)" }}
              />
              <label htmlFor="contractor-vat-check" style={{ fontSize: "13px", fontWeight: 600, color: "var(--primary)", cursor: "pointer" }}>
                I need a Commercial Tax Invoice / Company VAT Bill for this order
              </label>
            </div>

            {isContractorOrder && (
              <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label className="form-label">Company PAN Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={companyPan}
                    onChange={(e) => setCompanyPan(e.target.value)}
                    placeholder="9-digit PAN"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Registered Business Name</label>
                  <input
                    type="text"
                    className="form-input"
                    defaultValue="Himalayan Builders Pvt Ltd"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Payment Method */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "var(--primary)",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                2
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--primary)" }}>
                Select Payment Method
              </h4>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }} className="checkout-two-col">
              {/* COD Option */}
              <div
                onClick={() => setPaymentMethod("cod")}
                style={{
                  border: paymentMethod === "cod" ? "2px solid var(--accent-steel)" : "1.5px solid var(--border-medium)",
                  background: paymentMethod === "cod" ? "var(--accent-steel-light)" : "#ffffff",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  style={{ marginTop: "4px", accentColor: "var(--accent-steel)" }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "var(--primary)", fontSize: "14px" }}>
                    <Banknote size={18} color="var(--accent-steel)" />
                    <span>Cash on Delivery</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                    Pay cash to our delivery driver upon arrival at your site.
                  </div>
                </div>
              </div>

              {/* eSewa Option */}
              <div
                onClick={() => setPaymentMethod("esewa")}
                style={{
                  border: paymentMethod === "esewa" ? "2px solid var(--esewa-green)" : "1.5px solid var(--border-medium)",
                  background: paymentMethod === "esewa" ? "var(--esewa-bg)" : "#ffffff",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "esewa"}
                  onChange={() => setPaymentMethod("esewa")}
                  style={{ marginTop: "4px", accentColor: "var(--esewa-green)" }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#065f46", fontSize: "14px" }}>
                    <span style={{ background: "var(--esewa-green)", color: "#fff", padding: "1px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: 800 }}>
                      eSewa
                    </span>
                    <span>Pay with eSewa</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                    Instant verification via eSewa ID or QR Code.
                  </div>
                </div>
              </div>

              {/* Khalti Option */}
              <div
                onClick={() => setPaymentMethod("khalti")}
                style={{
                  border: paymentMethod === "khalti" ? "2px solid var(--khalti-purple)" : "1.5px solid var(--border-medium)",
                  background: paymentMethod === "khalti" ? "var(--khalti-bg)" : "#ffffff",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "khalti"}
                  onChange={() => setPaymentMethod("khalti")}
                  style={{ marginTop: "4px", accentColor: "var(--khalti-purple)" }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "var(--khalti-purple)", fontSize: "14px" }}>
                    <span style={{ background: "var(--khalti-purple)", color: "#fff", padding: "1px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: 800 }}>
                      Khalti
                    </span>
                    <span>Pay with Khalti</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                    Pay using Khalti Wallet, Mobile Banking, or QR.
                  </div>
                </div>
              </div>

              {/* Bank / Fonepay Option */}
              <div
                onClick={() => setPaymentMethod("bank_fonepay")}
                style={{
                  border: paymentMethod === "bank_fonepay" ? "2px solid var(--fonepay-red)" : "1.5px solid var(--border-medium)",
                  background: paymentMethod === "bank_fonepay" ? "#fef2f2" : "#ffffff",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "bank_fonepay"}
                  onChange={() => setPaymentMethod("bank_fonepay")}
                  style={{ marginTop: "4px", accentColor: "var(--fonepay-red)" }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "var(--primary)", fontSize: "14px" }}>
                    <QrCode size={18} color="var(--fonepay-red)" />
                    <span>Fonepay / Bank QR</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                    Scan QR code from any Nepali Mobile Banking app.
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Payment Details Mockup */}
            {paymentMethod === "esewa" && (
              <div
                style={{
                  background: "var(--esewa-bg)",
                  border: "1.5px solid #86efac",
                  borderRadius: "var(--radius-md)",
                  padding: "18px",
                  animation: "fadeIn 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ fontWeight: 700, color: "#065f46", fontSize: "14px" }}>
                    eSewa Instant Checkout Interface
                  </div>
                  <span className="badge badge-green">Verified Merchant</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label className="form-label" style={{ color: "#065f46" }}>eSewa ID / Mobile Number</label>
                    <input
                      type="text"
                      value={esewaId}
                      onChange={(e) => setEsewaId(e.target.value)}
                      className="form-input"
                      style={{ borderColor: "#86efac" }}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ color: "#065f46" }}>4-Digit MPIN / Password</label>
                    <input
                      type="password"
                      defaultValue="••••"
                      className="form-input"
                      style={{ borderColor: "#86efac" }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "#065f46", marginTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Lock size={13} />
                  <span>Amount NPR {cartTotal.toLocaleString()} will be debited to Adhikari Hardware Pvt Ltd</span>
                </div>
              </div>
            )}

            {paymentMethod === "khalti" && (
              <div
                style={{
                  background: "var(--khalti-bg)",
                  border: "1.5px solid #d8b4fe",
                  borderRadius: "var(--radius-md)",
                  padding: "18px",
                  animation: "fadeIn 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ fontWeight: 700, color: "var(--khalti-purple)", fontSize: "14px" }}>
                    Khalti Payment Gateway Simulation
                  </div>
                  <span className="badge badge-amber">Instant Settlement</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label className="form-label" style={{ color: "var(--khalti-purple)" }}>Khalti Registered Number</label>
                    <input
                      type="text"
                      value={khaltiPhone}
                      onChange={(e) => setKhaltiPhone(e.target.value)}
                      className="form-input"
                      style={{ borderColor: "#d8b4fe" }}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ color: "var(--khalti-purple)" }}>Khalti MPIN</label>
                    <input
                      type="password"
                      defaultValue="••••"
                      className="form-input"
                      style={{ borderColor: "#d8b4fe" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank_fonepay" && (
              <div
                style={{
                  background: "#fff5f5",
                  border: "1.5px solid #fca5a5",
                  borderRadius: "var(--radius-md)",
                  padding: "18px",
                  animation: "fadeIn 0.2s",
                }}
              >
                <div style={{ fontWeight: 700, color: "#991b1b", fontSize: "14px", marginBottom: "8px" }}>
                  Scan Fonepay QR to Pay NPR {cartTotal.toLocaleString()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "#ffffff",
                      border: "1px solid #fca5a5",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <QrCode size={70} color="#b91c1c" />
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                    <div><strong>Account Name:</strong> New Adhikari Traders</div>
                    <div><strong>Bank:</strong> Global IME Bank Ltd (Kathmandu Branch)</div>
                    <div><strong>Account No:</strong> 01201010049281</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Order Summary & Place Order Button */}
          <div
            style={{
              background: "var(--primary-surface)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              border: "1px solid var(--border-light)",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--primary)", marginBottom: "12px", fontSize: "15px" }}>
              Order Review ({cart.length} Hardware Items)
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: "var(--primary)" }}>NPR {cartSubtotal.toLocaleString()}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Kathmandu Valley Delivery</span>
                <span style={{ fontWeight: 600, color: deliveryFee === 0 ? "var(--success)" : "var(--primary)" }}>
                  {deliveryFee === 0 ? "FREE (Kathmandu Express)" : `NPR ${deliveryFee.toLocaleString()}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-crimson)", fontWeight: 600 }}>
                  <span>Discounts</span>
                  <span>- NPR {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "12px" }}>
                <span>Nepal 13% VAT (Included)</span>
                <span>NPR {Math.round(cartSubtotal * 0.13).toLocaleString()}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--primary)",
                  paddingTop: "10px",
                  borderTop: "1px solid var(--border-light)",
                }}
              >
                <span>Grand Total</span>
                <span style={{ color: "var(--accent-steel)" }}>NPR {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            {formError && (
              <div
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  color: "#991B1B",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary btn-full btn-lg"
              style={{ gap: "8px", minHeight: "48px" }}
            >
              {isProcessing ? (
                <span>Generating Order &amp; Invoice...</span>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Confirm Order (NPR {cartTotal.toLocaleString()})</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "12px",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              <ShieldCheck size={16} color="var(--success)" />
              <span>We verify your order by calling {phone || "985-1145065"} before sending our van.</span>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .checkout-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
