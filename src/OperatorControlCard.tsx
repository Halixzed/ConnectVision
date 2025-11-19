import { useState } from "react";
 // adjust path


interface ZoneActions {
  label: string;
  onTurnOn?: () => void;
  onTurnOff?: () => void;
  onSet75?: () => void;
  onSet85?: () => void;
}

interface Props {
  unitName: string;
  zone1: ZoneActions;
  zone2: ZoneActions;
}

// --- Small Reusable Button (ActionButton) component is kept as is ---
function ActionButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "0.6rem 1rem",
        borderRadius: "6px",
        background: hover
          ? "rgba(var(--text-rgb), 0.18)"
          : "rgba(var(--text-rgb), 0.10)",
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",
        fontSize: "0.95rem",
        color: "var(--text)",
        transition: "all 0.2s ease",
        boxShadow:
          hover ? "0 3px 10px rgba(0,0,0,0.2)" : "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      {text}
    </div>
  );
}
// ----------------------------------------------------------------------


export default function OperatorControlCard({ unitName, zone1, zone2 }: Props) {
  // openZone tracks the index of the currently open zone (0 or 1)
  const [openZone, setOpenZone] = useState<null | number>(null);

  const zones = [
    { title: "Zone 1", actions: zone1 },
    { title: "Zone 2", actions: zone2 },
  ];

  // Helper function to render a single Zone block, including header and dropdown
  const renderZoneBlock = (zone: typeof zones[number], index: number) => (
    <div
      key={index}
      style={{
        marginBottom: "1rem",
        position: "relative",
      }}
    >
      {/* Zone Header */}
      <div
        onClick={() => setOpenZone(openZone === index ? null : index)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.2rem",
          borderRadius: "6px",
          background: "rgba(var(--text-rgb), 0.1)",
          cursor: "pointer",
          
          transition: "background 0.3s ease",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text)",
          }}
        >
          {zone.title}
        </span>

        <span
          style={{
            fontSize: "1.1rem",
            transform: openZone === index ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
            opacity: 0.7,
          }}
        >
          ▼
        </span>
      </div>

      {/* Overlay Dropdown */}
      {openZone === index && (
        <div
          style={{
            position: "absolute",
            top: "3.4rem",
            left: 0,
            width: "100%",
            background: "var(--panel-bg)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            padding: "0.8rem",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            animation: "fadeIn 0.2s ease", // Assuming keyframes are defined
          }}
        >
          {/* Action buttons using the ActionButton component */}
          <ActionButton text="Turn ON" onClick={zone.actions.onTurnOn} />
          <ActionButton text="Turn OFF" onClick={zone.actions.onTurnOff} />
          <ActionButton text="Set Temp 75°C" onClick={zone.actions.onSet75} />
          <ActionButton text="Set Temp 85°C" onClick={zone.actions.onSet85} />
        </div>
      )}
    </div>
  );


  // --- MAIN COMPONENT RENDER WITH RESTRUCTURED LAYOUT ---

  return (
    <div
      style={{
        width: "auto",
        background: "var(--card-bg)",
        color: "var(--text)",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        display: "flex",                  // Master Flexbox for vertical stacking
        flexDirection: "column",
        height: "500px",                  // Defined height for 20%/80% split
      }}
    >
      {/* 1. TOP HEADER SECTION (20% Height) */}
      <div
        style={{
          height: "20%",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--text)", // Only the bottom border
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Unit Title */}
        <h2
          style={{
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontSize: "1.2rem", // Slightly larger header
            fontWeight: 700,
            color: "var(--accent)",
            textAlign: "center",
          }}
        >
          {unitName}
        </h2>
      </div>

      {/* 2. BOTTOM CONTENT SECTION (80% Height) */}
      <div
        style={{
          flex: 1,                       // Takes up the remaining vertical space
          display: "flex",               // Flexbox for horizontal splitting (columns)
          flexDirection: "column",
          
          gap: "1rem",
        }}
      >
        {/* COLUMN 1 (50% Width) - Contains Zone 1 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            
            justifyContent: "space-around",
          }}>
          {zones[0] && renderZoneBlock(zones[0], 0)}
          {zones[1] && renderZoneBlock(zones[1], 1)}
        </div>
      </div>
    </div>
  );
}
