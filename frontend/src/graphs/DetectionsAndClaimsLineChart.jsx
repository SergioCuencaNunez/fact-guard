import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useColorModeValue } from "@chakra-ui/react";

const DetectionsAndClaimsLineChart = ({ detections, claimChecks }) => {
  const axisColor = useColorModeValue("#4A4A4A", "#E0E0E0");
  const gridColor = useColorModeValue("#B0B0B0", "#888888");

  // Combine detections and claims into a single dataset grouped by date
  const combinedData = [...detections, ...claimChecks].reduce((acc, item) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString("es-ES");
    acc[formattedDate] = acc[formattedDate] || { date: formattedDate, detections: 0, claims: 0 };

    if (detections.some((d) => d.id === item.id)) {
      acc[formattedDate].detections++;
    } else {
      acc[formattedDate].claims++;
    }

    return acc;
  }, {});

  const chartData = Object.values(combinedData).sort((a, b) => 
    new Date(a.date.split("/").reverse().join("-")) - new Date(b.date.split("/").reverse().join("-"))
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke={axisColor} tickFormatter={(date) => date} />
        <YAxis stroke={axisColor} />
        <Tooltip />
        <Line type="monotone" dataKey="detections" stroke="#4dcfaf" />
        <Line type="monotone" dataKey="claims" stroke="#f56565" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DetectionsAndClaimsLineChart;
