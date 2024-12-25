import React from "react";
import {
    Box,
    VStack,
    Heading,
    Text,
    Divider,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const DetectionResults = () => {
  const location = useLocation();
  const { detection } = location.state || {};

  const textColor = useColorModeValue("black", "white");

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString("en-GB", options).replace(",", ""); // DD/MM/YYYY HH:MM
  };

  if (!detection) {
    return (
      <Flex align="center" justify="center" h="100vh">        
        <Text fontSize="lg" color="gray.500" textAlign="center">No detection found.</Text>
      </Flex>
    );
  }

  return (
    <Box p="6">
      <Heading mb="4" fontSize={{ base: "xl", md: "2xl" }} color={textColor}>
        Detection Results: {detection.title}
      </Heading>
      
      {/* Article Details */}
      <Box mb="4">
        <Heading size="md" mb="2" color={textColor}>Article Summary</Heading>
        <Text fontSize="md" mb="2"><b>Title:</b> {detection.title}</Text>
        <Text fontSize="md" mb="2"><b>Content:</b> {detection.content}</Text>
        <Text fontSize="md" mb="2"><b>Date Analyzed:</b> {formatDate(detection.date)}</Text>
      </Box>

      <Divider mb="4" />

      {/* Analysis Details */}
      <Box mb="4">
        <Heading size="md" mb="2" color={textColor}>Analysis</Heading>
        <VStack align="flex-start" spacing="2">
          <Text fontSize="md"><b>Fake Probability:</b> {detection.fakePercentage || "70%"}</Text>
          <Text fontSize="md"><b>True Probability:</b> {detection.truePercentage || "30%"}</Text>
        </VStack>
      </Box>

      <Divider mb="4" />

      {/* Insights */}
      <Box>
        <Heading size="md" mb="2" color={textColor}>Insights</Heading>
        <Text fontSize="md" mb="2">
          This analysis was performed using an advanced fake news detection model.
        </Text>
        <Text fontSize="md">
          The probabilities indicate the likelihood of the article being fake or true based on textual analysis.
          For further investigation, verify the article’s claims against trusted fact-checking databases.
        </Text>
      </Box>
    </Box>
  );
};

export default DetectionResults;
