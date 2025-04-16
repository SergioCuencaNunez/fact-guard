import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useColorModeValue } from "@chakra-ui/react";

const DetectionsAndClaimsLineChart = ({ detections, claimChecks }) => {
  const axisColor = useColorModeValue("#4A4A4A", "#E0E0E0");
  const gridColor = useColorModeValue("#B0B0B0", "#888888");

  // Combine detections and claims into a single dataset grouped by date
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
    .map(({ formattedDate, detections, claims }) => ({
      date: formattedDate,
      detections,
      claims,
    }));  

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke={axisColor} tickFormatter={(date) => date} />
        <YAxis
          stroke={axisColor}
          allowDecimals={false}
          domain={[0, 'dataMax']}
          tickCount={Math.max(...chartData.map(d => Math.max(d.detections, d.claims))) + 1}
        />
        <Tooltip
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
        <Line type="monotone" dataKey="detections" stroke="#4dcfaf" />
        <Line type="monotone" dataKey="claims" stroke="#f56565" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DetectionsAndClaimsLineChart;
