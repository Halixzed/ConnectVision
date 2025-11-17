import React from "react";

interface WelcomeMessageProps {
  user?: string;
}

export default function WelcomeMessage({ user = "Guest" }: WelcomeMessageProps) {
  return (
    <div
      style={{
        width: "100%",
        padding: "1.2rem 1.4rem",
               
        
        

        fontFamily: "Inter, sans-serif",
        color: "var(--text",

        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
      }}
    >
      <div
        style={{
          fontSize: "1.4rem",
          fontWeight: 600,
          color: "#e58033",
          letterSpacing: "0.5px",
        }}
      >
        Welcome back,
      </div>

      <div
        style={{
          fontSize: "1.9rem",
          fontWeight: 700,
          color: "var(--text)",
        }}
      >
        {user}
      </div>

      <div
        style={{
          fontSize: "0.85rem",
          opacity: 0.7,
          marginTop: "0.4rem",
        }}
      >
        
      </div>
    </div>
  );
}
