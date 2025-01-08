import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Heading } from "@chakra-ui/react";

const RatingsAndPredictionsPieChart = ({ detections, claimChecks }) => {
  // Aggregate Detections Data
  const detectionCounts = detections.reduce(
    (acc, detection) => {
      const prediction = detection.final_prediction || "Uncertain";
      acc[prediction] = (acc[prediction] || 0) + 1;
      return acc;
    },
    { Fake: 0, True: 0, Uncertain: 0 }
  );

  const detectionData = Object.keys(detectionCounts).map((key) => ({
    name: key,
    value: detectionCounts[key],
  }));

  const detectionColors = { Fake: "red", True: "green", Uncertain: "orange" };

  // Aggregate Claim Checks Data with Correct Logic
  const getAggregateRating = (ratings) => {
    const categories = {
      true: ["true", "yes", "verdadero", "si"],
      false: ["false", "incorrect", "not true", "no", "fake", "falso", "incorrecto", "no verdadero"],
      inconclusive: ["mixture", "altered", "misleading", "engañoso", "alterado", "descontextualizado", "sin contexto"],
    };

    let trueCount = 0;
    let falseCount = 0;
    let inconclusiveCount = 0;

    ratings.map((rating) => {
      const lowerRating = rating.toLowerCase();
      if (categories.true.includes(lowerRating)) trueCount++;
      else if (categories.false.includes(lowerRating)) falseCount++;
      else if (categories.inconclusive.includes(lowerRating)) inconclusiveCount++;
    });

    if (trueCount > falseCount && trueCount > inconclusiveCount) return "True";
    if (falseCount > trueCount && falseCount > inconclusiveCount) return "False";
    if (inconclusiveCount > trueCount && inconclusiveCount > falseCount) return "Misleading";
    return "Inconclusive";
  };

  const claimCounts = claimChecks.reduce(
    (acc, claimCheck) => {
      const rating = getAggregateRating(claimCheck.ratings);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    { True: 0, False: 0, Misleading: 0, Inconclusive: 0 }
  );

  const claimData = Object.keys(claimCounts).map((key) => ({
    name: key,
    value: claimCounts[key],
  }));

  const claimColors = { True: "green", False: "red", Misleading: "orange", Inconclusive: "gray" };

  return (
    <Box p="4" borderRadius="md" textAlign="center">
      <Heading size="sm" mb="4">Detections and Claims Overview</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          {/* Detections */}
          <Pie
            data={detectionData}
            dataKey="value"
            nameKey="name"
            cx="30%"
            cy="50%"
            innerRadius={20}
            outerRadius={50}
            label={({ name }) => `${name}`}
            labelStyle={{ fontSize: "10px" }}
          >
            {detectionData.map((entry) => (
              <Cell key={entry.name} fill={detectionColors[entry.name]} />
            ))}
          </Pie>

          {/* Claims */}
          <Pie
            data={claimData}
            dataKey="value"
            nameKey="name"
            cx="70%"
            cy="50%"
            innerRadius={20}
            outerRadius={50}
            label={({ name }) => `${name}`}
            labelStyle={{ fontSize: "10px" }}
          >
            {claimData.map((entry) => (
              <Cell key={entry.name} fill={claimColors[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RatingsAndPredictionsPieChart;
