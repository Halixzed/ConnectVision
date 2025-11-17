import React, { useEffect, useState } from "react";

export default function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const date = now.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        fontFamily: "Inter, sans-serif",
        color: "var(--text)",
        lineHeight: "1.1",
      }}
    >
      <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>{date}</span>
      <span
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#ff7b00",
          letterSpacing: "1px",
        }}
      >
        {time}
      </span>
    </div>
  );
}
