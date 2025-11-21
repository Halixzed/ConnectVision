import React from "react";
import { Responsive } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import useMeasure from "react-use-measure";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./WidgetsPanel.css";
import PowerWidget from "./PowerWidget";
import TemperatureWidget from "./TemperatureWidget";
import FanSpeedWidget from "./FanSpeedWidget";
import StoresStatusWidget from "./StoresStatusWidget";

const LOCAL_STORAGE_KEY = "grid-layout";

const defaultLayout: Layout[] = [
  { i: "a", x: 0, y: 0, w: 2, h: 2 },
  { i: "b", x: 2, y: 0, w: 2, h: 2 },
  { i: "c", x: 4, y: 0, w: 2, h: 2 },
  { i: "d", x: 0, y: 2, w: 2, h: 2 },
];

const loadSavedLayout = (): Layout[] => {
  if (typeof window === "undefined") return defaultLayout;
  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return defaultLayout;

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length) {
      return parsed as Layout[];
    }
  } catch {
    // fall back to defaults on parse errors
  }

  return defaultLayout;
};

const WidgetsPanel: React.FC = () => {
  const [layout, setLayout] = React.useState<Layout[]>(() => loadSavedLayout());
  const [ref, bounds] = useMeasure();

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(layout));
  }, [layout]);

  const handleLayoutChange = React.useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
  }, []);

  const computedWidth =
    bounds.width ||
    (typeof window !== "undefined" ? window.innerWidth : 0);

  return (
    <div ref={ref} className="widgets-panel-wrapper">
      <div className="widgets-panel-inner">
        {computedWidth > 0 && (
          <Responsive
            className="layout"
            layouts={{ lg: layout }}
            onLayoutChange={handleLayoutChange}
            cols={{ lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 }}
            rowHeight={120}
            width={computedWidth}
            isResizable
            isDraggable
            compactType="vertical"
            preventCollision={false}
            useCSSTransforms
            onResizeStop={() => window.dispatchEvent(new Event("resize"))}
            onDragStop={() => window.dispatchEvent(new Event("resize"))}
          >
            <div key="a">
              <TemperatureWidget />
            </div>

            <div key="b">
              <PowerWidget />
            </div>

            <div key="c">
              <FanSpeedWidget />
            </div>

            <div key="d">
              <StoresStatusWidget online={120} offline={30} />
            </div>
          </Responsive>
        )}
      </div>
    </div>
  );
};

export default WidgetsPanel;
