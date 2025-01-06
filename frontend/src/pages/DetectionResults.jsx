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
  Collapse,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { SunIcon, MoonIcon, ArrowBackIcon, ChevronDownIcon, ChevronUpIcon, WarningIcon, WarningTwoIcon, CheckCircleIcon } from "@chakra-ui/icons";
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
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const allDetectionsBg = useColorModeValue("gray.100", "gray.600");
  const startNewDetectionHoverBg = useColorModeValue("gray.200", "gray.500");
  const startNewDetectionActiveBg = useColorModeValue("gray.300", "gray.400");
  const allDetectionsHoverBg = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const allDetectionsActiveBg = useColorModeValue(primaryActiveLight, primaryActiveDark);

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

  const {models, true_probabilities, fake_probabilities, predictions, final_prediction} = detection;

  const getPredictionColor = (prediction) => {
    if (prediction === "Fake") return "red";
    if (prediction === "True") return "green";
    return "orange";
  };
  
  const getPredictionIcon = (prediction) => {
    if (prediction === "Fake") return <WarningTwoIcon color="red.500" />;
    if (prediction === "True") return <CheckCircleIcon color="green.500" />;
    return <WarningIcon color="orange.500" />;
  };
  
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
                <Box
                  maxH="150px"
                  overflowY="auto"
                  border="1px"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  p={2}
                  borderRadius="md"
                  textAlign="justify"
                >
                  <Text fontSize="md" whiteSpace="pre-wrap">
                  <b>Content:</b> {detection.content}
                  </Text>
                </Box>
                <Text fontSize="md">
                  <b>Date Analyzed:</b> {formatDate(detection.date)}
                </Text>
              </VStack>
            </Box>
          </motion.div>

          <Divider mb="4" />

          {/* Final Prediction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Box mb="4">
              <Heading size="md" mb="2" color={textColor}>
                Final Prediction
              </Heading>
              <Badge
                colorScheme={final_prediction === "Fake" ? "red" : "green"}
                fontSize="lg"
                px={4}
                py={2}
                display="flex"
                alignItems="center"
                gap="2"
                justifyContent="center"
                textAlign="center"
                whiteSpace="normal"
              >
                {getPredictionIcon(final_prediction)}
                <Text as="span" fontSize="lg">
                  {final_prediction}
                </Text>
              </Badge>
            </Box>

            {/* Advanced Options */}
            <Box>
              <Flex align="center" mb="4" justify={{ base: "center", md: "flex-start" }}>
                <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("gray.500", "gray.400")}>
                  Detailed Model Analysis
                </Text>
                <IconButton
                  aria-label="Toggle Detailed Model Analysis"
                  icon={showAdvanced ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  size="sm"
                  ml={2}
                />
              </Flex>
            </Box>
            <Collapse in={showAdvanced} animateOpacity style={{ overflow: "visible" }}>
              <Text mb="2" fontSize="md" textAlign="justify">
                {useBreakpointValue({
                  base: (
                    <span>
                      Models classify the article as <strong>True</strong>, <strong>Fake</strong>, or <strong>Uncertain</strong>.
                    </span>
                  ),
                  md: (
                    <span>
                      Models classify the article as <strong>True</strong>, <strong>Fake</strong>, or <strong>Uncertain</strong>, determined by analyzing the each models' probabilities.
                    </span>
                  ),
                  lg: (
                    <span>
                      Models classify the article as <strong>True</strong>, <strong>Fake</strong>, or <strong>Uncertain</strong>. Each classification is determined by analyzing the probabilities calculated by the models.
                    </span>
                  ),
                })}
              </Text>
              <Box as="ul" pl={5} mb="2" textAlign="justify">
                <Box as="li" mb="1">
                  <Text fontSize="md">
                    {useBreakpointValue({
                      base: (
                        <span>
                          <strong>True:</strong> The majority of models consider the article credible.
                          </span>
                      ),
                      md: (
                        <span>
                          <strong>True:</strong> The majority of models consider the article credible, with probabilities surpassing the confidence threshold.
                        </span>
                      ),
                      lg: (
                        <span>
                          <strong>True:</strong> The majority of models consider the article credible, with probabilities surpassing the confidence threshold.
                        </span>
                      ),
                    })}
                  </Text>
                </Box>
                <Box as="li" mb="1">
                  <Text fontSize="md">
                    {useBreakpointValue({
                        base: (
                          <span>
                            <strong>Fake:</strong> The models identify significant indicators of falsehood.
                          </span>
                        ),
                        md: (
                          <span>
                            <strong>Fake:</strong> The models identify significant indicators of falsehood, with probabilities exceeding the confidence threshold.
                          </span>
                        ),
                        lg: (
                          <span>
                            <strong>Fake:</strong> The models identify significant indicators of falsehood, with probabilities meeting or exceeding the confidence threshold.
                          </span>
                        ),
                      })}
                  </Text>
                </Box>
                <Box as="li" mb="1">
                  <Text fontSize="md">
                    {useBreakpointValue({
                        base: (
                          <span>
                            <strong>Uncertain:</strong> Occurs when the models either fail to reach a strong consensus.
                          </span>
                        ),
                        md: (
                          <span>
                            <strong>Uncertain:</strong> Occurs when the models either fail to reach a strong consensus, indicating the need for further review.
                          </span>
                        ),
                        lg: (
                          <span>
                            <strong>Uncertain:</strong> Occurs when the models either fail to reach a strong consensus or their confidence scores fall below the predefined threshold, indicating the need for further review.
                          </span>
                        ),
                      })}
                  </Text>
                </Box>
              </Box>
              <Text mb="4" fontSize="md" textAlign="justify">
                {useBreakpointValue({
                  base: (
                    <span>
                      The final prediction for the article is determined using <strong>majority voting</strong>. In the event of a tie, the prediction defaults to <strong>Uncertain</strong>.
                      </span>
                  ),
                  md: (
                    <span>
                      The final prediction for the article is determined using a <strong>majority voting</strong> mechanism. In the event of a tie, the prediction defaults to <strong>Uncertain</strong>, emphasizing the need for human review.
                      </span>
                  ),
                  lg: (
                    <span>
                      The final prediction for the article is determined using a <strong>majority voting</strong> mechanism. Each model contributes its classification, and the category with the highest number of votes is chosen as the final prediction. In the event of a tie, the prediction defaults to <strong>Uncertain</strong>, emphasizing the need for human review.
                    </span>
                  ),
                })}
              </Text>
              {/* Machine Learning Models */}
              <Heading size="md" mb="2" color={textColor}>
                Machine Learning Models
              </Heading>
              <Flex wrap="wrap" direction={{ base: "column", md: "row" }} justify="space-between" mb="6" gap="6">
                {models.slice(0, 3).map((model, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ flex: "1 1 calc(33.333% - 1rem)"}}
                  >
                    <Box
                      key={index}
                      flex="1 1 calc(33% - 1rem)"
                      p="5"
                      bg={useColorModeValue("gray.50", "gray.800")}
                      borderRadius="md"
                      shadow="md"
                      textAlign="justify"
                    >
                      <Text fontSize="lg" fontWeight="bold" mb="2" textAlign="center">
                        {model}
                      </Text>
                      <Divider mb={4} />
                      <Flex justify="space-between" px={{base: "2", md: "14", lg: "12"}} mb="4">
                        <Box textAlign="center">
                          <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" color={useColorModeValue("gray.500", "gray.400")}>
                            True
                          </Text>
                          <Text fontSize="2xl" fontWeight="medium">
                            {true_probabilities[index]}
                          </Text>
                        </Box>
                        <Box textAlign="center">
                          <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" color={useColorModeValue("gray.500", "gray.400")}>
                            Fake
                          </Text>
                          <Text fontSize="2xl" fontWeight="medium">
                            {fake_probabilities[index]}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex justify="center">
                        <Badge
                          colorScheme={getPredictionColor(predictions[index])}
                          fontSize="md"
                          px={4}
                          py={2}
                          display="flex"
                          alignItems="center"
                          gap="2"
                          justifyContent="center"
                          textAlign="center"
                          whiteSpace="normal"
                        >
                          {getPredictionIcon(predictions[index])}
                          <Text as="span" fontSize="md">
                          {predictions[index]}
                          </Text>
                        </Badge>
                      </Flex>
                    </Box>
                  </motion.div>
                ))}
              </Flex>
              
              {/* Deep Learning Models */}
              <Heading size="md" mb="2" color={textColor}>
                Deep Learning Models
              </Heading>
              <Flex wrap="wrap" direction={{ base: "column", md: "row" }} justify="space-between" mb="6" gap="8">
                {models.slice(3).map((model, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ flex: "1 1 calc(33.333% - 1rem)"}}
                  >
                    <Box
                      key={index}
                      flex="1 1 calc(33% - 1rem)"
                      p="5"
                      bg={useColorModeValue("gray.50", "gray.800")}
                      borderRadius="md"
                      shadow="md"
                      textAlign="justify"
                    >
                      <Text fontSize="lg" fontWeight="bold" mb="2" textAlign="center">
                        {model}
                      </Text>
                      <Divider mb={4} /> 
                      <Flex justify="space-between" px={{base: "2", md: "14", lg: "24"}}  mb="2">
                        <Box textAlign="center">
                          <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" color={useColorModeValue("gray.500", "gray.400")}>
                            True
                          </Text>
                          <Text fontSize="2xl" fontWeight="medium">
                            {true_probabilities[index]}
                          </Text>
                        </Box>
                        <Box textAlign="center">
                          <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" color={useColorModeValue("gray.500", "gray.400")}>
                            Fake
                          </Text>
                          <Text fontSize="2xl" fontWeight="medium">
                            {fake_probabilities[index]}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex justify="center">
                        <Badge
                          colorScheme={getPredictionColor(predictions[index])}
                          fontSize="md"
                          px={4}
                          py={2}
                          display="flex"
                          alignItems="center"
                          gap="2"
                          justifyContent="center"
                          textAlign="center"
                          whiteSpace="normal"
                        >
                          {getPredictionIcon(predictions[index])}
                          <Text as="span" fontSize="md">
                          {predictions[index]}
                          </Text>
                        </Badge>
                      </Flex>
                    </Box>
                  </motion.div>
                ))}
              </Flex>
            </Collapse>
          </motion.div>
          
          <Divider mb="4" />

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Box textAlign="justify">
              <Heading size="md" mb="2" color={textColor}>
                Insights
              </Heading>
              <Text fontSize="md" mb="2">
                {useBreakpointValue({
                  base: "This analysis aggregates results from models for a holistic evaluation.",
                  md: "This analysis integrates results from multiple ML and DL models to ensure a holistic evaluation.",
                  lg: "This analysis integrates results from multiple machine learning and deep learning models to ensure a holistic evaluation of the article.",
                })}
              </Text>
              <Text fontSize="md">
                {useBreakpointValue({
                  base: "The probabilities provided are used to inform the final prediction through majority voting. For further investigation, please use trusted fact-checking sources such as ",
                  md: "The probabilities provided by each model are used to inform the final prediction through majority voting. For further investigation, it is advised to compare the article's claims with trusted fact-checking sources, such as ",
                  lg: "The probabilities and classifications provided by each model are used to inform the final prediction through a majority voting approach, ensuring transparency and accuracy in the assessment. For further investigation, it is advised to compare the article's claims with trusted fact-checking databases or reliable sources or databases, such as ",
                })}
                <Link
                  to="/profile/start-new-claim-check"
                  style={{
                    color: hoverColor,
                    fontWeight: 'bold',
                  }}
                >
                  FactGuard Verify
                </Link>
                .
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
