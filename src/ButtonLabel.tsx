import { useState } from "react";


interface Props {
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

export default function ButtonLabel({ title, subtitle, onClick }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",

        border: "1px solid rgba(0, 0, 0, 0.5)",
        boxShadow: hover
          ? "0 4px 12px rgba(0, 0, 0, 0.2)"
          : "0 2px 6px rgba(0, 0, 0, 0.1)",

        backgroundColor: hover
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(255, 255, 255, 0.2)",

        transform: hover ? "translateY(-2px)" : "translateY(0)",

        padding: "0.8rem 1rem",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        margin: "0.9rem 0",

        transition: "background-color 0.3s ease, transform 0.2s ease",
      }}
    >
      <span
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "0.03rem",
        }}
      >
        {title}
      </span>

      {subtitle && (
        <span
          style={{
            marginTop: "0.2rem",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: "rgba(var(--text-rgb), 0.6)",
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}
