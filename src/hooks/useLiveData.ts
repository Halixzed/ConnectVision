import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return data;
};
