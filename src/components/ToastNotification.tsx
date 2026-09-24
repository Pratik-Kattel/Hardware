"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";

export function ToastNotification() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "380px",
        width: "calc(100% - 32px)",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isInfo = toast.type === "info";
        const isWarning = toast.type === "warning";
        const isError = toast.type === "error";

        const borderColor = isSuccess
          ? "var(--success)"
          : isInfo
          ? "var(--info)"
          : isWarning
          ? "var(--warning)"
          : "var(--error)";

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: "auto",
              background: "#ffffff",
              borderRadius: "var(--radius-md)",
              padding: "14px 16px",
              boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.2)",
              borderLeft: `5px solid ${borderColor}`,
              borderTop: "1px solid var(--border-light)",
              borderRight: "1px solid var(--border-light)",
              borderBottom: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              animation: "fadeIn 0.25s ease-out",
            }}
          >
            <div style={{ marginTop: "2px", flexShrink: 0 }}>
              {isSuccess && <CheckCircle2 size={20} color="var(--success)" />}
              {isInfo && <Info size={20} color="var(--info)" />}
              {isWarning && <AlertTriangle size={20} color="var(--warning)" />}
              {isError && <XCircle size={20} color="var(--error)" />}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "var(--primary)",
                  marginBottom: "2px",
                }}
              >
                {toast.title}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.4",
                }}
              >
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: "var(--text-muted)",
                padding: "2px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close Notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
