import { useMode } from "./context/ModeContext";

export default function ModeToggle() {
  const { mode, toggleMode } = useMode();

  const isHeadOffice = mode === "head office";

    return (
            <div
      onClick={toggleMode}
      style={{
        width: "70px",
        height: "30px",
        borderRadius: "20px",
        background: isHeadOffice ? "#e58033" : "#777",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "3px",
        transition: "background 0.8s ease",
      }}
    >
      <div
        style={{
          background: "#fff",
          height: "24px",
          width: "24px",
          borderRadius: "50%",
          transform: isHeadOffice ? "translateX(38px)" : "translateX(0px)",
          transition: "transform 0.25s ease",
        }}
      />
    </div>
  );
}