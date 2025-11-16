import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  CartesianGrid,
} from "recharts";
import { useLiveData } from "./hooks/useLiveData";

interface DataPoint {
  time: string;
  value: number;
  door_opened: boolean;
}

const TemperatureWidget: React.FC = () => {
  const liveData = useLiveData();
  const [history, setHistory] = useState<DataPoint[]>([]);

  // Keep recent temperature history
  useEffect(() => {
    if (!liveData?.temperature) return;

    const timestamp = new Date().toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    });

    setHistory((prev) => {
      const updated = [
        ...prev,
        {
          time: timestamp,
          value: liveData.temperature,
          door_opened: !!liveData.door_opened,
        },
      ];
      return updated.slice(-30);
    });
  }, [liveData?.temperature, liveData?.door_opened]);

  // Points where door was opened
  const alarmPoints = history.filter((d) => d.door_opened);

  return (
    <Card
      sx={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
        color: "#fff",
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "#e54c33",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Temperature
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {liveData ? `${liveData.temperature.toFixed(2)} °C` : "--"}
        </Typography>

        <div style={{ width: "100%", height: 120 }}>
          <ResponsiveContainer>
            <AreaChart
              data={history}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#777", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide domain={["dataMin - 0.2", "dataMax + 0.2"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "none",
                  color: "#fff",
                  borderRadius: 4,
                  fontSize: 12,
                }}
              />

              {/* Orange area for temperature trend */}
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e54c33" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#e54c33" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke="#e54c33"
                strokeWidth={2}
                fill="url(#tempGradient)"
                isAnimationActive={false}
              />

              {/* Scatter for alarm events */}
              <Scatter data={alarmPoints} dataKey="value" fill="#ff0000" isAnimationActive={false} hide />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureWidget;
