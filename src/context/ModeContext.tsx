import { createContext, useContext, useState } from "react";

type Mode = "operator" | "head office";

interface ModeContextProps {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextProps>({
  mode: "operator",
  toggleMode: () => {},
});

export const useMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<Mode>("operator");

  const toggleMode = () => {
    setMode((prev) => (prev === "operator" ? "head office" : "operator"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}