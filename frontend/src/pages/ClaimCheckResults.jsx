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
import {
  SunIcon,
  MoonIcon,
  ArrowBackIcon,
  CheckCircleIcon,
  WarningTwoIcon,
  WarningIcon,
  QuestionIcon,
} from "@chakra-ui/icons";
import { motion } from "framer-motion";

import logoVerifyBright from "../assets/logo-verify-bright.png";
import logoVerifyDark from "../assets/logo-verify-dark.png";

const primaryColor = "#4dcfaf";
const primaryHoverLight = "#3ca790";
const primaryHoverDark = "#77e4c4";
const primaryActiveLight = "#2a8073";
const primaryActiveDark = "#91edd0";

const ClaimCheckResults = () => {
  const navigate = useNavigate();

  const logo = useColorModeValue(logoVerifyBright, logoVerifyDark);
  const logoHeight = useBreakpointValue({ base: "40px", md: "45px" });
  const cardBg = useColorModeValue("white", "gray.700");

  const location = useLocation();
  const { claimCheck } = location.state || {};

  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("black", "white");
  const allClaimChecksBg = useColorModeValue("gray.100", "gray.600");
  const startNewClaimCheckHoverBg = useColorModeValue("gray.200", "gray.500");
  const startNewClaimCheckActiveBg = useColorModeValue("gray.300", "gray.400");
  const allClaimChecksHoverBg = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const allClaimChecksActiveBg = useColorModeValue(primaryActiveLight, primaryActiveDark);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  if (!claimCheck) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Text fontSize="lg" color="gray.500" textAlign="center">
          No claim check found.
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
              <Heading fontSize={{ base: "3xl", md: "4xl" }}>Claim Check Results</Heading>
              <HStack spacing="4" display={{ base: "none", lg: "flex" }}>
                <img src={logo} alt="Verify Logo" style={{ height: logoHeight, width: "auto" }} />
                <IconButton
                  aria-label="Toggle theme"
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                />
              </HStack>
              <HStack spacing="4" display={{ base: "flex", md: "flex", lg: "none" }}>
                <Box
                  as="img"
                  src={logo}
                  alt="Verify Logo"
                  maxHeight={logoHeight}
                  maxWidth="120px"
                  objectFit="contain"
                />
              </HStack>
            </Flex>
          </motion.div>

          <Divider mb="4" />

          {/* Claim Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Box mb="4">
              <Heading size="md" mb="2" color={textColor}>
                Claim Summary
              </Heading>
              <VStack align="flex-start" spacing="2">
                <Text fontSize="md">
                  <b>Claim Check ID:</b> #{claimCheck.id}
                </Text>
                <Text fontSize="md">
                  <b>Title:</b> {claimCheck.title}
                </Text>
                <Text fontSize="md">
                  <b>Date Analyzed:</b> {formatDate(claimCheck.date)}
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
                  colorScheme={
                    claimCheck.rating === "True"
                      ? "green"
                      : claimCheck.rating === "False" || claimCheck.rating === "Mostly false"
                      ? "red"
                      : claimCheck.rating === "Misleading" || claimCheck.rating === "Mixture"
                      ? "orange"
                      : claimCheck.rating === "Mostly true"
                      ? "green"
                      : "gray"
                  }
                >
                  <Flex align="center" justify="center" direction="row" gap="2">
                    {claimCheck.rating === "True" || claimCheck.rating === "Mostly true" ? (
                      <CheckCircleIcon color="green.500" />
                    ) : claimCheck.rating === "False" || claimCheck.rating === "Mostly false" ? (
                      <WarningTwoIcon color="red.500" />
                    ) : claimCheck.rating === "Misleading" || claimCheck.rating === "Mixture" ? (
                      <WarningIcon color="orange.500" />
                    ) : (
                      <QuestionIcon color="gray.500" />
                    )}
                    <Text>
                      <b>Rating:</b> {claimCheck.rating || "Misleading"}
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
                This analysis was performed using Google Fact Check Tools API.
              </Text>
              <Text fontSize="md">
                The rating indicates the evaluation of the claim's accuracy based on trusted fact-checking sources.
                For further details, review the provided link to the fact-checking source.
              </Text>
            </Box>
          </motion.div>

          {/* Navigation Buttons */}
          <Flex justify="center" mt="8">
            <Stack direction={{ base: "column", md: "row" }} spacing="4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  size="md"
                  bg={allClaimChecksBg}
                  color={textColor}
                  _hover={{ bg: startNewClaimCheckHoverBg }}
                  _active={{ bg: startNewClaimCheckActiveBg }}
                  onClick={() => navigate("/profile/start-new-claim-check")}
                >
                  Start New Claim Check
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="md"
                  bg={primaryColor}
                  color="white"
                  _hover={{ bg: allClaimChecksHoverBg }}
                  _active={{ bg: allClaimChecksActiveBg }}
                  onClick={() => navigate("/profile/my-claim-checks")}
                >
                  All Claim Checks
                </Button>
              </motion.div>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default ClaimCheckResults;
