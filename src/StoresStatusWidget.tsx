
import { Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  online: number;
  offline: number;
}

export default function StoresStatusWidget({ online, offline }: Props) {
  const data = [
    { name: "Online", value: online },
    { name: "Offline", value: offline },
  ];

  const COLORS = ["#4caf50", "#e53935"]; // green = online, red = offline

  return (
    <Card
    sx={{
        background: "var(--card-bg)",
        color: "var(--text)",
        height: "100%",
        width: "100%",
        borderRadius: 1,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    }}
    >
    <CardContent sx={{ flex: 1 }}>
        {/* Header */}
        <Typography
        variant="body2"
        sx={{
            fontWeight: 600,
            color: "var(--accent)",
            textTransform: "uppercase",
            mb: 1,
        }}
        >
        Stores Status
        </Typography>

        {/* --- FLEX ROW: TEXT LEFT | DONUT RIGHT --- */}
        <div
        style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
        }}
        >
        {/* LEFT SIDE — TEXT */}
        <div style={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {online + offline} Total Stores
            </Typography>

            <Typography
            sx={{
                fontSize: "0.9rem",
                marginTop: "0.2rem",
                opacity: 0.8,
            }}
            >
            🟢 {online} Online
            </Typography>

            <Typography
            sx={{
                fontSize: "0.9rem",
                opacity: 0.8,
            }}
            >
            🔴 {offline} Offline
            </Typography>
        </div>

        {/* RIGHT SIDE — DONUT CHART */}
        <div style={{ width: 130, height: 130 }}>
            <ResponsiveContainer>
            <PieChart>
                <Pie
                data={data}
                dataKey="value"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                >
                {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                ))}
                </Pie>

                <Tooltip
                contentStyle={{
                    background: "var(--panel-bg)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "0.8rem",
                }}
                />
            </PieChart>
            </ResponsiveContainer>
        </div>
        </div>
    </CardContent>
    </Card>
  );
}
