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
        <Tooltip />
        <Legend />
        <Bar dataKey="detections" fill="#4dcfaf" />
        <Bar dataKey="claimChecks" fill="#f56565" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageStatistics;