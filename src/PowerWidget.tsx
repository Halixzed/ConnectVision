import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useLiveData } from "./hooks/useLiveData";

const PowerWidget: React.FC = () => {
  const liveData = useLiveData();
  const [history, setHistory] = useState<{ time: string; value: number }[]>([]);
  const power = typeof liveData?.power === "number" ? liveData.power : null;

  // Append new power data to history
  useEffect(() => {
    if (power === null) return;

    const timestamp = new Date().toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    });

    setHistory((prev) => {
      const updated = [...prev, { time: timestamp, value: power }];
      return updated.slice(-30); // keep last 30 readings
    });
  }, [power]);

  return (
    <Card
      sx={{
        background: "var(--card-bg)",
        color: "var(--text)",
        height: "100%",
        borderRadius: 1,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        
        
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        {/* --- Header --- */}
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            color: "#e58033",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Power
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {power !== null ? `${power.toFixed(2)} kW` : "--"}
        </Typography>

        {/* --- Area Chart --- */}
        <div style={{ width: "100%", height: 120 }}>
          <ResponsiveContainer>
            <AreaChart
              data={history}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              {/* Subtle grid for reference */}
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#777", fontSize: 10 }}
                axisLine={false}
                ////tickLine={false}
              />
              <YAxis
                //hide
                domain={["dataMin - 0.1", "dataMax + 0.1"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "none",
                  color: "#fff",
                  borderRadius: 4,
                  fontSize: 12,
                }}
              />
              {/* Gradient fill for modern look */}
              <defs>
                <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e58033" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#e58033" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#e58033"
                strokeWidth={2}
                fill="url(#powerGradient)"
                isAnimationActive={false}
                animationDuration={500}
                animationEasing="ease-in-out"
                
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerWidget;
