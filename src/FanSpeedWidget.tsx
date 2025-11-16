import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useLiveData } from "./hooks/useLiveData";

interface RPMPoint {
  time: string;
  value: number;
}

const FanSpeedWidget: React.FC = () => {
  const liveData = useLiveData();
  const [history, setHistory] = useState<RPMPoint[]>([]);

  // Keep rolling history
  useEffect(() => {
    if (!liveData?.fan_speed) return;

    const timestamp = new Date().toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    });

    setHistory((prev) => {
      const updated = [...prev, { time: timestamp, value: liveData.fan_speed }];
      return updated.slice(-30); // last 30 samples
    });
  }, [liveData?.fan_speed]);

  const rpm = liveData?.fan_speed ?? 0;
  const maxRPM = 2000;
  const percent = Math.min(100, Math.round((rpm / maxRPM) * 100));

  const radialData = [
    {
      name: "Fan",
      value: percent,
      fill: "#e58033",
    },
  ];

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
        color: "#fff",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >

      {/* inline keyframes for fan spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <CardContent sx={{ flex: 1 }}>
        
        {/* HEADER */}
        <Typography variant="body2" sx={{ color: "#e58033", fontWeight: 600 }}>
          Fan Speed
        </Typography>

        <Typography variant="h5" sx={{ mb: 1 }}>
          {rpm ? `${rpm} RPM` : "--"}
        </Typography>

        {/* FAN SPINNER */}
        

        {/* RADIAL GAUGE */}
        

        {/* RPM TREND CHART */}
        <div style={{ width: "100%", height: 80 }}>
          <ResponsiveContainer>
            <AreaChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#777", fontSize: 10 }}
                axisLine={false}
              />
              <YAxis hide domain={["dataMin - 50", "dataMax + 50"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "none",
                  color: "#fff",
                  borderRadius: 4,
                  fontSize: 12,
                }}
              />
              <defs>
                <linearGradient id="rpmGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e58033" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#e58033" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#e58033"
                fill="url(#rpmGradient)"
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FanSpeedWidget;
