import React from "react";
import {
  Flex,
  Box,
  VStack,
  HStack,
  Stack,
  Heading,
  Button,
  Text,
  Divider,
  Badge,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, ArrowBackIcon, WarningTwoIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

import logoDetectBright from "../assets/logo-detect-bright.png";
import logoDetectDark from "../assets/logo-detect-dark.png";

const primaryColor = "#4dcfaf";
const primaryHoverLight = "#3ca790";
const primaryHoverDark = "#77e4c4";
const primaryActiveLight = "#2a8073";
const primaryActiveDark = "#91edd0";

const DetectionResults = () => {
  const navigate = useNavigate();

  const logo = useColorModeValue(logoDetectBright, logoDetectDark);
  const logoHeight = useBreakpointValue({ base: "40px", md: "45px" });
  const cardBg = useColorModeValue("white", "gray.700");

  const location = useLocation();
  const { detection } = location.state || {};

  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("black", "white");
  const allDetectionsBg = useColorModeValue("gray.100", "gray.600");
  const startNewDetectionHoverBg = useColorModeValue("gray.200", "gray.500");
  const startNewDetectionActiveBg = useColorModeValue("gray.300", "gray.400");
  const allDetectionsHoverBg = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const allDetectionsActiveBg = useColorModeValue(primaryActiveLight, primaryActiveDark);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  if (!detection) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Text fontSize="lg" color="gray.500" textAlign="center">
          No detection found.
        </Text>
      </Flex>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Box px={{ md: 4 }} py={{ md: 6 }}>
        <Flex direction="column" bg={cardBg} p={8} borderRadius="md" shadow="md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Flex justify="space-between" align="center" mb="4">
              <Heading fontSize={{ base: "3xl", md: "4xl" }}>Detection Results</Heading>
              <HStack spacing="4" display={{ base: "none", lg: "flex" }}>
                <motion.img
                    src={logo}
                    alt="Detect Logo"
                    style={{ height: logoHeight, width: 'auto'}}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                  />
                <IconButton
                  aria-label="Toggle theme"
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                />
              </HStack>
              <HStack spacing="4" display={{ base: "flex", md: "flex", lg: "none" }}>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  style={{ display: 'inline-block' }}
                >
                  <Box
                    as="img"
                    src={logo}
                    alt="Detect Logo"
                    maxHeight={logoHeight}
                    maxWidth="120px"
                    objectFit="contain"
                  />
                </motion.div>
              </HStack>
            </Flex>
          </motion.div>

          <Divider mb="4" />

          {/* Article Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Box mb="4">
              <Heading size="md" mb="2" color={textColor}>
                Article Summary
              </Heading>
              <VStack align="flex-start" spacing="2">
                <Text fontSize="md">
                  <b>Detection ID:</b> #{detection.id}
                </Text>
                <Text fontSize="md">
                  <b>Title:</b> {detection.title}
                </Text>
                <Text fontSize="md">
                  <b>Content:</b> {detection.content}
                </Text>
                <Text fontSize="md">
                  <b>Date Analyzed:</b> {formatDate(detection.date)}
                </Text>
              </VStack>
            </Box>
          </motion.div>

          <Divider mb="4" />

          {/* Analysis Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Box mb="4">
              <Heading size="md" mb="2" color={textColor}>
                Analysis
              </Heading>
              <Stack
                direction={{ base: "column", md: "row" }}
                justify="flex-start"
                spacing="2"
                flexWrap="wrap"
              >
                <Badge
                  fontSize="md"
                  p={2}
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  colorScheme="red"
                >
                  <Flex align="center" justify="center" direction="row" gap="2">
                    <WarningTwoIcon />
                    <Text>
                      <b>Fake Probability:</b> {detection.fakePercentage || "70%"}
                    </Text>
                  </Flex>
                </Badge>
                <Badge
                  fontSize="md"
                  p={2}
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  colorScheme="green"
                >
                  <Flex align="center" justify="center" direction="row" gap="2">
                    <CheckCircleIcon />
                    <Text>
                      <b>True Probability:</b> {detection.truePercentage || "30%"}
                    </Text>
                  </Flex>
                </Badge>
              </Stack>
            </Box>
          </motion.div>

          <Divider mb="4" />

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Box>
              <Heading size="md" mb="2" color={textColor}>
                Insights
              </Heading>
              <Text fontSize="md" mb="2">
                This analysis was performed using an advanced fake news detection model.
              </Text>
              <Text fontSize="md">
                The probabilities indicate the likelihood of the article being fake or true based on textual analysis.
                For further investigation, verify the article’s claims against trusted fact-checking databases.
              </Text>
            </Box>
          </motion.div>

          {/* Navigation Buttons */}
          <Flex justify="center" mt="8">
            <Stack direction={{ base: "column", md: "row" }} spacing="4" align="center">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  size="md"
                  bg={allDetectionsBg}
                  color={textColor}
                  _hover={{ bg: startNewDetectionHoverBg }}
                  _active={{ bg: startNewDetectionActiveBg }}
                  onClick={() => navigate("/profile/start-new-detection")}
                >
                  Start New Detection
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="md"
                  bg={primaryColor}
                  color="white"
                  _hover={{ bg: allDetectionsHoverBg }}
                  _active={{ bg: allDetectionsActiveBg }}
                  onClick={() => navigate("/profile/my-news-detections")}
                >
                  All Detections
                </Button>
              </motion.div>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default DetectionResults;
