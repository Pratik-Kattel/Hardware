"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  CheckCircle2,
  HardHat,
  LogOut,
  Building,
  Plus,
} from "lucide-react";

export function CustomerAuthModal() {
  const { activeModal, closeModal, user, loginDemoUser, logout, savedAddresses, addSavedAddress } = useStore();

  const [tab, setTab] = useState<"login" | "register">("login");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [newCity, setNewCity] = useState<"Kathmandu" | "Lalitpur" | "Bhaktapur">("Kathmandu");
  const [newLandmark, setNewLandmark] = useState("");

  if (activeModal !== "auth") return null;

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArea.trim()) return;
    addSavedAddress({
      id: `addr-${Date.now()}`,
      fullName: user?.name || "Customer",
      phone: user?.phone || "9800000000",
      area: newArea.trim(),
      city: newCity,
      landmark: newLandmark.trim(),
      isDefault: false,
    });
    setNewArea("");
    setNewLandmark("");
    setShowAddAddress(false);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        style={{
          maxWidth: "520px",
          padding: 0,
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--primary-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
              }}
            >
              <User size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--primary)", margin: 0 }}>
                {user ? "Customer Account" : tab === "login" ? "Customer Sign In" : "Create Account"}
              </h3>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Adhikari Hardware Portal (Kathmandu)
              </div>
            </div>
          </div>

          <button onClick={closeModal} className="modal-close-btn" aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", maxHeight: "80vh", overflowY: "auto" }}>
          {user ? (
            /* Logged-In User Profile View */
            <div>
              {/* Profile Card */}
              <div
                style={{
                  background: "#1C1C1E",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px",
                  color: "#ffffff",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 800 }}>{user.name}</div>
                  <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "2px" }}>
                    Phone: <strong>{user.phone}</strong>
                  </div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>{user.email}</div>
                  {user.companyName && (
                    <div style={{ fontSize: "12px", color: "var(--accent-amber)", marginTop: "4px" }}>
                      {user.companyName} (PAN: {user.panNumber})
                    </div>
                  )}
                </div>

                <span
                  className="badge"
                  style={{
                    background: user.role === "contractor" ? "var(--accent-amber)" : "#ffffff",
                    color: "var(--primary)",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  {user.role === "contractor" ? "Contractor Account" : "Homeowner"}
                </span>
              </div>

              {/* Saved Addresses Section */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary)" }}>
                    Saved Delivery Addresses ({savedAddresses.length})
                  </div>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    style={{
                      fontSize: "12px",
                      color: "var(--accent-steel)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Plus size={14} />
                    <span>Add New</span>
                  </button>
                </div>

                {/* Add Address Form */}
                {showAddAddress && (
                  <form
                    onSubmit={handleCreateAddress}
                    style={{
                      background: "var(--bg-surface-secondary)",
                      borderRadius: "var(--radius-md)",
                      padding: "14px",
                      marginBottom: "14px",
                    }}
                  >
                    <div className="form-group" style={{ marginBottom: "10px" }}>
                      <label className="form-label" style={{ fontSize: "12px" }}>Street / Area *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Baneshwor, Ward 10"
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        style={{ padding: "8px 12px", fontSize: "13px" }}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: "12px" }}>City</label>
                        <select
                          className="form-select"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value as any)}
                          style={{ padding: "8px", fontSize: "12px" }}
                        >
                          <option value="Kathmandu">Kathmandu</option>
                          <option value="Lalitpur">Lalitpur</option>
                          <option value="Bhaktapur">Bhaktapur</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: "12px" }}>Landmark</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Near Bank"
                          value={newLandmark}
                          onChange={(e) => setNewLandmark(e.target.value)}
                          style={{ padding: "8px 12px", fontSize: "13px" }}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm btn-full">
                      Save Address
                    </button>
                  </form>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      style={{
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-md)",
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        background: "#ffffff",
                      }}
                    >
                      <MapPin size={16} color="var(--accent-steel)" style={{ marginTop: "2px", flexShrink: 0 }} />
                      <div style={{ flex: 1, fontSize: "13px" }}>
                        <div style={{ fontWeight: 700, color: "var(--primary)" }}>{addr.fullName}</div>
                        <div style={{ color: "var(--text-secondary)" }}>{addr.area}, {addr.city}</div>
                        {addr.landmark && (
                          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{addr.landmark}</div>
                        )}
                      </div>
                      {addr.isDefault && (
                        <span className="badge badge-green" style={{ fontSize: "9px" }}>
                          Default
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="btn btn-outline btn-full"
                style={{ color: "var(--accent-crimson)", borderColor: "var(--accent-crimson)" }}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            /* Sign In / Register Form */
            <div>
              {/* Demo Fast Login Buttons */}
              <div
                style={{
                  background: "var(--primary-surface)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  marginBottom: "20px",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                  ⚡ Quick Demo One-Click Login:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button
                    onClick={() => loginDemoUser("customer")}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: "flex-start", gap: "8px" }}
                  >
                    <User size={15} color="var(--accent-amber)" />
                    <span>Login as <strong>Suman Adhikari</strong> (Homeowner)</span>
                  </button>

                  <button
                    onClick={() => loginDemoUser("contractor")}
                    className="btn btn-accent btn-sm"
                    style={{ justifyContent: "flex-start", gap: "8px" }}
                  >
                    <HardHat size={15} />
                    <span>Login as <strong>Er. Rajesh Shrestha</strong> (Contractor)</span>
                  </button>
                </div>
              </div>

              {/* Standard Form */}
              <form onSubmit={(e) => { e.preventDefault(); loginDemoUser("customer"); }}>
                <div className="form-group">
                  <label className="form-label">Phone Number or Email</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      defaultValue="9800000000"
                      className="form-input"
                      placeholder="9800000000"
                    />
                    <Phone size={16} color="var(--text-muted)" style={{ position: "absolute", right: "12px", top: "14px" }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="password"
                      defaultValue="••••••••"
                      className="form-input"
                    />
                    <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", right: "12px", top: "14px" }} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: "10px" }}>
                  Sign In
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
