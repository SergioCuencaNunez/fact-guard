import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const UsageStatistics = ({ detections, claimChecks }) => {
  // Combine and group detections and claim checks by date
  const combinedData = [...detections, ...claimChecks].reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();
    acc[date] = acc[date] || { date, detections: 0, claimChecks: 0 };

    if (detections.some((d) => d.id === item.id)) {
      acc[date].detections++;
    } else {
      acc[date].claimChecks++;
    }

    return acc;
  }, {});

  // Format data for the graph
  const chartData = Object.values(combinedData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="detections" fill="#4dcfaf" />
        <Bar dataKey="claimChecks" fill="#f56565" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageStatistics;
