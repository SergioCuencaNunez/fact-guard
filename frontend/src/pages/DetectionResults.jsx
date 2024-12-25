import React from "react";
import {
    Flex,
    Box,
    VStack,
    HStack,
    Heading,
    Button,
    Text,
    Divider,
    IconButton,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, ArrowBackIcon } from "@chakra-ui/icons";

import logoDetectBright from "../assets/logo-detect-bright.png";
import logoDetectDark from "../assets/logo-detect-dark.png";

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const DetectionResults = () => {
  const navigate = useNavigate();

  const logo = useColorModeValue(logoDetectBright, logoDetectDark);
  const logoHeight = useBreakpointValue({ base: '40px', md: '45px' });

  const location = useLocation();
  const { detection } = location.state || {};

  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue('black', 'white');
  const allDetectionsBg = useColorModeValue('gray.100', 'gray.700');
  const allDetectionsHoverBg = useColorModeValue('gray.200', 'gray.600');
  const allDetectionsActiveBg = useColorModeValue('gray.300', 'gray.500');
  const startNewDetectionHoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const startNewDetectionActiveColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  if (!detection) {
    return (
      <Flex align="center" justify="center" h="100vh">        
        <Text fontSize="lg" color="gray.500" textAlign="center">No detection found.</Text>
      </Flex>
    );
  }

  return (
    <Box>
      <Flex direction="column">
        <Flex justify="space-between" align="center">
          <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }}>Detection Results: #{detection.id}</Heading>                    
          <HStack spacing="4">
          <img src={logo} alt="Detect Logo" style={{ height: logoHeight, width: "auto" }} />
          <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
        <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>

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

        {/* Navigation Buttons */}
        <Flex justify="center" mt="8">
          <HStack spacing="4">
            <Button
              leftIcon={<ArrowBackIcon />}
              size="md"
              bg={allDetectionsBg}
              color={textColor}
              _hover={{ bg: allDetectionsHoverBg }}
              _active={{ bg: allDetectionsActiveBg }}
              onClick={() => navigate("/profile/start-new-detection")}
            >
              Start New Detection
            </Button>
            <Button
              size="md"
              bg={primaryColor}
              color="white"
              _hover={{ bg: startNewDetectionHoverColor }}
              _active={{ bg: startNewDetectionActiveColor }}
              onClick={() => navigate("/profile/my-news-detections")}
            >
              All Detections
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DetectionResults;
