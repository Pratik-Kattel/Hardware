"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  HardHat,
  Building,
  Phone,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
} from "lucide-react";

export function RequestQuoteModal() {
  const { activeModal, closeModal, submitQuoteRequest, user } = useStore();

  const [contractorName, setContractorName] = useState(user?.name || "Rajesh Shrestha");
  const [companyName, setCompanyName] = useState(user?.companyName || "Himalayan Builders Pvt Ltd");
  const [phone, setPhone] = useState(user?.phone || "985-1145065");
  const [email, setEmail] = useState(user?.email || "rajesh.builders@gmail.com");
  const [projectLocation, setProjectLocation] = useState("Sitapaila / Ring Road, Kathmandu");
  const [projectType, setProjectType] = useState<any>("Residential Construction");
  const [urgency, setUrgency] = useState<any>("Immediate (Within 24 Hours)");
  const [itemsNeeded, setItemsNeeded] = useState(
    "150 Sacks Shivam 53-Grade OPC Cement\n3 Tons 12mm TMT Steel Rebar (NS 191)\n20 Coils Havells 2.5mm HRFR Wire\n50 Lengths Astral 1-inch CPVC Pipe"
  );
  const [taxPanNumber, setTaxPanNumber] = useState(user?.panNumber || "602918239");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedQuoteId, setGeneratedQuoteId] = useState("");
  const [formError, setFormError] = useState("");

  if (activeModal !== "request_quote") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractorName.trim() || !phone.trim() || !projectLocation.trim() || !itemsNeeded.trim()) {
      setFormError("Please enter your name, contact phone number, project site location, and material requirements.");
      return;
    }
    setFormError("");

    const newQuote = submitQuoteRequest({
      contractorName,
      companyName,
      phone,
      email,
      projectLocation,
      projectType,
      itemsNeeded,
      urgency,
      taxPanNumber,
    });
    setGeneratedQuoteId(newQuote.id);
    setIsSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        style={{
          maxWidth: "700px",
          padding: 0,
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: "#1C1C1E",
            color: "#ffffff",
            padding: "24px 30px",
            position: "relative",
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              color: "#cbd5e1",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "var(--accent-amber)",
                color: "#0e2238",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HardHat size={22} />
            </div>
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--accent-amber)",
                }}
              >
                Contractor &amp; Commercial Desk
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                Request Bulk Quotation
              </h3>
            </div>
          </div>

          <p style={{ fontSize: "13px", color: "#cbd5e1", margin: 0 }}>
            Special tiered pricing, direct mini-truck site delivery, and VAT invoices for construction projects in Nepal.
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px 30px", maxHeight: "75vh", overflowY: "auto" }}>
          {isSubmitted ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "var(--success-light)",
                  color: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px auto",
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary)", marginBottom: "8px" }}>
                Quotation Request #{generatedQuoteId} Received!
              </h4>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto 24px auto" }}>
                Thank you, <strong>{contractorName}</strong>. Our senior estimator at Adhikari Hardware is reviewing your material list. We will call you at <strong>{phone}</strong> within 2 business hours with wholesale pricing.
              </p>
              <button onClick={closeModal} className="btn btn-primary">
                Return to Store
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Form Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }} className="quote-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Contractor / Lead Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                    placeholder="e.g. Er. Rajesh Shrestha"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Company / Firm Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Himalayan Builders Pvt. Ltd."
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }} className="quote-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number (For Fast Callback) *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email (For Formal PDF Quote)</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contractor@email.com"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }} className="quote-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Project Type</label>
                  <select
                    className="form-select"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as any)}
                  >
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Commercial Building">Commercial Building</option>
                    <option value="Plumbing Project">Plumbing &amp; Sanitary Project</option>
                    <option value="Electrical Renovation">Electrical Renovation</option>
                    <option value="Interior & Painting">Interior &amp; Painting</option>
                    <option value="Road & Civil Works">Road &amp; Civil Works</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Project Site Location *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="e.g. Sitapaila, Kathmandu"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Required Materials &amp; Quantities (Paste Schedule or List) *
                </label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  value={itemsNeeded}
                  onChange={(e) => setItemsNeeded(e.target.value)}
                  placeholder="Example: 100 bags Shivam OPC, 2 tons 12mm rebar, 30 rolls Havells wire, 10 sets Jaquar mixers..."
                  style={{ resize: "vertical" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }} className="quote-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Timeline / Urgency</label>
                  <select
                    className="form-select"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                  >
                    <option value="Immediate (Within 24 Hours)">Immediate (Within 24 Hours)</option>
                    <option value="Standard (2-3 Days)">Standard (2-3 Days)</option>
                    <option value="Upcoming Project">Upcoming Project (Next Month)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Business PAN Number (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={taxPanNumber}
                    onChange={(e) => setTaxPanNumber(e.target.value)}
                    placeholder="9-digit PAN for VAT"
                  />
                </div>
              </div>

              {/* Inline Form Error */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-accent btn-full btn-lg"
                style={{ gap: "8px", minHeight: "48px" }}
              >
                <Send size={18} />
                <span>Submit Quotation Request</span>
              </button>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  marginTop: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={14} color="var(--success)" />
                <span>Or speak to our contractor lead directly at 985-1145065</span>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .quote-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
