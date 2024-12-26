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
    Badge,
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
    <Box p={{ base: 4, md: 8 }}>
      <Flex direction="column" bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="md" shadow="md">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }} color={textColor}>Detection Results: #{detection.id}</Heading>                    
          <HStack spacing="4">
          <img src={logo} alt="Detect Logo" style={{ height: logoHeight, width: "auto" }} />
          <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
        <Divider mb="6" />

        {/* Article Details */}
        <Box mb="6">
            <Heading size="lg" mb="4" color={textColor}>Article Summary</Heading>
            <VStack align="flex-start" spacing="2">
              <Text fontSize="lg"><b>Title:</b> {detection.title}</Text>
              <Text fontSize="lg"><b>Content:</b> {detection.content}</Text>
              <Text fontSize="lg"><b>Date Analyzed:</b> {formatDate(detection.date)}</Text>
            </VStack>
        </Box>

        <Divider mb="6" />

        {/* Analysis Details */}
        <Box mb="6">
            <Heading size="lg" mb="4" color={textColor}>Analysis</Heading>
            <HStack justify="space-between">
              <Badge colorScheme="red" fontSize="lg" p={2}><b>Fake Probability:</b> {detection.fakePercentage || "70%"}</Badge>
              <Badge colorScheme="green" fontSize="lg" p={2}><b>True Probability:</b> {detection.truePercentage || "30%"}</Badge>
            </HStack>
        </Box>

        <Divider mb="6" />

        {/* Insights */}
        <Box>
            <Heading size="lg" mb="4" color={textColor}>Insights</Heading>
            <Text fontSize="lg" mb="4">
            This analysis was performed using an advanced fake news detection model.
            </Text>
            <Text fontSize="lg">
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
