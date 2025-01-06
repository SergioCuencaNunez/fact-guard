import React, { useState } from "react";
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
  Collapse,
} from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  ArrowBackIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  WarningTwoIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
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

  const location = useLocation();
  const { detection } = location.state || {};

  const { colorMode, toggleColorMode } = useColorMode();
  const logo = useColorModeValue(logoDetectBright, logoDetectDark);
  const logoHeight = useBreakpointValue({ base: "40px", md: "45px" });
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");

  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const predictions = JSON.parse(detection.predictions);
  const classifications = JSON.parse(detection.classifications);

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
                  style={{ height: logoHeight, width: "auto" }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
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
            </Flex>
          </motion.div>

          <Divider mb="4" />

          {/* Final Decision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Box mb="4">
              <Heading size="md" mb="2" color={textColor}>
                Final Decision
              </Heading>
              <Badge
                colorScheme={detection.final_decision === "Fake" ? "red" : "green"}
                fontSize="lg"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {detection.final_decision}
              </Badge>
            </Box>
          </motion.div>

          <Divider mb="4" />

          {/* Article Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
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
                <Box
                  maxH="150px"
                  overflowY="auto"
                  border="1px"
                  borderColor={useColorModeValue("gray.300", "gray.500")}
                  p={2}
                  borderRadius="md"
                >
                  <Text fontSize="md" whiteSpace="pre-wrap">
                    {detection.content}
                  </Text>
                </Box>
                <Text fontSize="md">
                  <b>Date Analyzed:</b> {formatDate(detection.date)}
                </Text>
              </VStack>
            </Box>
          </motion.div>

          <Divider mb="4" />

          {/* Advanced Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Box>
              <Flex align="center" justify="space-between" mb="4">
                <Heading size="md" color={textColor}>
                  Advanced Options
                </Heading>
                <IconButton
                  aria-label="Toggle Advanced Options"
                  icon={showAdvanced ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                />
              </Flex>
              <Collapse in={showAdvanced} animateOpacity>
                {Object.entries(predictions).map(([model, scores]) => (
                  <Box
                    key={model}
                    p={4}
                    bg={useColorModeValue("gray.50", "gray.800")}
                    borderRadius="md"
                    mb="4"
                  >
                    <Text fontSize="md" mb="2">
                      <b>Model:</b> {model}
                    </Text>
                    <Text fontSize="md">
                      <b>Fake:</b> {scores.Fake.toFixed(2)}%
                    </Text>
                    <Text fontSize="md">
                      <b>True:</b> {scores.True.toFixed(2)}%
                    </Text>
                    <Badge
                      colorScheme={classifications[model] === "Fake" ? "red" : "green"}
                      fontSize="md"
                      p={2}
                      mt="2"
                      display="inline-block"
                    >
                      Classification: {classifications[model]}
                    </Badge>
                  </Box>
                ))}
              </Collapse>
            </Box>
          </motion.div>

          {/* Navigation Buttons */}
          <Flex justify="center" mt="8">
            <Stack direction={{ base: "column", md: "row" }} spacing="4" align="center">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  size="md"
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
