import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ⚙️ Settings Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#e58033",
          fontSize: "1.2rem",
        }}
      >
        ⚙️
      </button>

      {/* 🟧 Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
        />
      )}

      {/* 🟧 Slide-in Settings Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-260px",
          width: "260px",
          height: "100%",
          background: "rgba(30,30,30,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "-2px 0 20px rgba(0,0,0,0.3)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          transition: "right 0.3s ease",
          zIndex: 1100,
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h2
          style={{
            color: "#e58033",
            fontFamily: "Inter",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}
        >
          Settings
        </h2>

        {/* Theme Toggle Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#ccc",
            fontFamily: "Inter",
            fontSize: "1rem",
          }}
        >
          <span>Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
