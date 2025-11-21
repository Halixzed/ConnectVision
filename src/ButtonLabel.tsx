import { useState } from "react";

type ModalType = "alarms" | "offline" | null;

interface Props {
  title: string;
  subtitle?: string;
  alarms?: string[];
  offlineUnits?: string[];
  onClick?: () => void;
}

export default function ButtonLabel({
  title,
  subtitle,
  alarms = [],
  offlineUnits = [],
  
}: Props) {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  const metricButton = (
    label: string,
    count: number,
    type: ModalType
  ) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        openModal(type);
      }}
      style={{
        minWidth: "52px",
        padding: "0.4rem 0.6rem",
        borderRadius: "2px",
        border: "1px solid rgba(255, 255, 255, 0.7)",
        color: "#fff",
        background: "transparent",
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.15rem",
        cursor: "pointer",
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>{count}</span>
    </button>
  );

  const modalItems =
    modalType === "alarms" ? alarms : modalType === "offline" ? offlineUnits : [];
  const modalTitle =
    modalType === "alarms" ? "Active Alarms" : "Offline Locations";

  return (
    <>
      <div
        style={{
          width: "100%",
          cursor: "default",
          fontFamily: "Inter, sans-serif",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          padding: "0.8rem 1rem",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          margin: "0.9rem 0",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
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
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          {metricButton("alarms", alarms.length, "alarms")}
          {metricButton("offline", offlineUnits.length, "offline")}
        </div>
      </div>

      {modalType && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 200,
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "420px",
              maxWidth: "90%",
              maxHeight: "70vh",
              overflowY: "auto",
              background: "var(--panel-bg)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1rem", letterSpacing: "0.1em" }}>
                {modalTitle}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text)",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {modalItems.length ? (
              <ul style={{ paddingLeft: "1rem", margin: 0, color: "var(--text)" }}>
                {modalItems.map((item, idx) => (
                  <li key={`${modalType}-${idx}`} style={{ marginBottom: "0.5rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "rgba(255,255,255,0.7)" }}>No records available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
