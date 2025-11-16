import { useState, useEffect, useRef } from "react";

interface SensorData {
  temperature: number;
  humidity: number;
  power: number;
  voltage: number;
  fan_speed: number;
  door_opened?: boolean;
}

export const useLiveData = () => {
  const [data, setData] = useState<SensorData | null>(null);

  // Holds the latest incoming data without triggering re-renders
  const latestRef = useRef<SensorData | null>(null);

  // Throttle interval (ms)
  const THROTTLE_MS = 500; // update UI every 0.5 sec

  useEffect(() => {
    const ws = new WebSocket("wss://backend-old-glitter-6811.fly.dev/ws");

    ws.onmessage = (event) => {
      const parsed: SensorData = JSON.parse(event.data);
      latestRef.current = parsed;
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);

    // Throttle updater → reads latestRef but updates state slowly
    const interval = setInterval(() => {
      if (latestRef.current) {
        setData(latestRef.current);
      }
    }, THROTTLE_MS);

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return data;
};
