import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useColorModeValue } from "@chakra-ui/react";

const DailyInteractionBreakdown = ({ detections, claimChecks }) => {
  const axisColor = useColorModeValue("#4A4A4A", "#E0E0E0");
  const gridColor = useColorModeValue("#B0B0B0", "#888888");

  // Combine and group detections and claim checks by date
  const combined = [
    ...detections.map((d) => ({ ...d, type: "detection" })),
    ...claimChecks.map((c) => ({ ...c, type: "claim" })),
  ];
  
  const combinedMap = new Map();
  
  combined.forEach((item) => {
    const dateObj = new Date(item.date);
      const dateKey =
      dateObj.getFullYear() +
      "-" +
      String(dateObj.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateObj.getDate()).padStart(2, "0");
  
    if (!combinedMap.has(dateKey)) {
      combinedMap.set(dateKey, {
        rawDate: dateKey,
        formattedDate: dateObj.toLocaleDateString("es-ES"),
        detections: 0,
        claims: 0,
      });
    }
  
    const entry = combinedMap.get(dateKey);
    if (item.type === "detection") {
      entry.detections += 1;
    } else {
      entry.claims += 1;
    }
  });
  
  const chartData = Array.from(combinedMap.values())
    .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
    .map(({ formattedDate, detections, claims }) => {
      const total = detections + claims;
      return {
        date: formattedDate,
        detections: total > 0 ? (detections / total) * 100 : 0,
        claims: total > 0 ? (claims / total) * 100 : 0,
      };
    });

  const maxBarSize = 55;
  const dynamicBarSize = Math.min(maxBarSize, 1000 / chartData.length);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        {/* Set a dotted grid */}
        <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke={axisColor} tickFormatter={(date) => date}/>
        <YAxis
          stroke={axisColor}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          allowDecimals={false}
        />
        <Tooltip
          formatter={(value) => `${Math.round(value)}%`}
          cursor={{
            fill: useColorModeValue("#A0AEC0", "#CBD5E0"),
            fillOpacity: 0.2,
          }}
          contentStyle={{
            backgroundColor: useColorModeValue("#ffffff", "#1A202C"),
            color: useColorModeValue("#1A202C", "#EDF2F7"),
            border: "1px solid",
            borderColor: useColorModeValue("#CBD5E0", "#4A5568"),
            borderRadius: "6px",
            fontSize: "14px",
          }}
          labelStyle={{
            color: useColorModeValue("#2D3748", "#E2E8F0"),
            fontWeight: "bold",
          }}
          itemStyle={{
            color: useColorModeValue("#2D3748", "#E2E8F0"),
            fontSize: "13px",
          }}
        />
        <Legend />
        <Bar dataKey="detections" fill="#4dcfaf" stackId="a" name="Detections" barSize={dynamicBarSize}/>
        <Bar dataKey="claims" fill="#f56565" stackId="a" name="Claims" barSize={dynamicBarSize}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyInteractionBreakdown;