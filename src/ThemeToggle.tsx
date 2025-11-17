import React from "react";
import { useTheme } from "./theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div
      onClick={toggleTheme}
      style={{
        width: "50px",
        height: "26px",
        borderRadius: "20px",
        background: isDark ? "#e58033" : "#888",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s ease",
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          background: "#fff",
          borderRadius: "50%",
          position: "absolute",
          top: "2px",
          left: isDark ? "26px" : "2px",
          transition: "left 0.25s ease",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}
