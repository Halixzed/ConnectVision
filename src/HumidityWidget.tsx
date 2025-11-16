import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const humidity = 47;

const trendData = [
  { time: "10:00", humidity: 44 },
  { time: "10:05", humidity: 46 },
  { time: "10:10", humidity: 47 },
  { time: "10:15", humidity: 48 },
  { time: "10:20", humidity: 47 },
];

const HumidityWidget: React.FC = () => {
  const gaugeData = [{ name: "Humidity", value: humidity, fill: "#33bde5" }];

  return (
    <Card
      sx={{
        height: "100%",
        background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 24px rgba(51,189,229,0.4)",
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* --- Header --- */}
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: "#33bde5", textTransform: "uppercase", fontWeight: 600 }}
          >
            Humidity
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mt: 0.5, color: "#fff" }}
          >
            {humidity}%
          </Typography>
        </div>

        {/* --- Circular Gauge --- */}
        <div style={{ width: "100%", height: 120, position: "relative" }}>
            <ResponsiveContainer>
                <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                barSize={12}
                data={gaugeData}
                startAngle={180}
                endAngle={0}
                >
                <RadialBar
                    dataKey="value"
                    cornerRadius={20}
                    animationBegin={0}
                    animationDuration={800}
                />
                </RadialBarChart>
            </ResponsiveContainer>
            <div
                style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#33bde5",
                fontSize: "1.2rem",
                fontWeight: 700,
                }}
            >
                {humidity}%
            </div>
        </div>


        {/* --- Trend Line --- */}
        <div style={{ width: "100%", height: 60 }}>
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <XAxis dataKey="time" hide />
              <YAxis domain={["auto", "auto"]} hide />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#33bde5"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumidityWidget;
