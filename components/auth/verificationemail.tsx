import * as React from "react";

type VerificationEmailProps = {
  userName?: string;
  verifyUrl: string;
};

export const VerificationEmail: React.FC<VerificationEmailProps> = ({ userName, verifyUrl }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        backgroundColor: "#f9fafb",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "22px",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          Verify your email
        </h1>

        {/* Body */}
        <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.6" }}>Hi {userName ?? "there"},</p>

        <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.6" }}>
          Welcome to <strong>Devflow</strong>! Please confirm your email address to activate your account.
        </p>

        {/* CTA Button */}
        <div style={{ margin: "28px 0" }}>
          <a
            href={verifyUrl}
            style={{
              display: "inline-block",
              padding: "12px 20px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Verify Email
          </a>
        </div>

        {/* Fallback */}
        <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.6" }}>
          If the button doesn’t work, copy and paste this link into your browser:
        </p>

        <p
          style={{
            fontSize: "12px",
            color: "#2563eb",
            wordBreak: "break-all",
          }}
        >
          {verifyUrl}
        </p>

        {/* Footer */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e5e7eb",
            margin: "32px 0",
          }}
        />

        <p style={{ fontSize: "12px", color: "#9ca3af" }}>
          This link will expire in 1 hour. If you didn’t create a Devflow account, you can safely ignore this email.
        </p>

        <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "16px" }}>— Devflow Team</p>
      </div>
    </div>
  );
};
