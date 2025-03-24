import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useColorModeValue } from "@chakra-ui/react";

const UsageStatistics = ({ detections, claimChecks }) => {
  const axisColor = useColorModeValue("#4A4A4A", "#E0E0E0");
  const gridColor = useColorModeValue("#B0B0B0", "#888888");

  // Combine and group detections and claim checks by date
  const combinedData = [...detections, ...claimChecks].reduce((acc, item) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString("es-ES"); // Format date as DD/MM/YYYY
    acc[formattedDate] = acc[formattedDate] || { date: formattedDate, detections: 0, claimChecks: 0 };

    if (detections.some((d) => d.id === item.id)) {
      acc[formattedDate].detections++;
    } else {
      acc[formattedDate].claimChecks++;
    }

    return acc;
  }, {});

  // Format data for the graph
  const chartData = Object.values(combinedData).sort((a, b) => 
    new Date(a.date.split("/").reverse().join("-")) - new Date(b.date.split("/").reverse().join("-"))
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        {/* Set a dotted grid */}
        <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke={axisColor} tickFormatter={(date) => date}/>
        <YAxis stroke={axisColor} />
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
        <Legend />
        <Bar dataKey="detections" fill="#4dcfaf" />
        <Bar dataKey="claimChecks" fill="#f56565" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageStatistics;