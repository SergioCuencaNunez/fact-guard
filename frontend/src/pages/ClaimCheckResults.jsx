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
import { SunIcon, MoonIcon, ArrowBackIcon } from "@chakra-ui/icons";

import logoVerifyBright from "../assets/logo-verify-bright.png";
import logoVerifyDark from "../assets/logo-verify-dark.png";

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const ClaimCheckResults = () => {
  const navigate = useNavigate();

  const logo = useColorModeValue(logoVerifyBright, logoVerifyDark);
  const logoHeight = useBreakpointValue({ base: '40px', md: '45px' });
  const cardBg = useColorModeValue("white", "gray.700");

  const location = useLocation();
  const { claimCheck } = location.state || {};

  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue('black', 'white');
  const allClaimChecksBg = useColorModeValue('gray.100', 'gray.600');
  const startNewClaimCheckHoverBg = useColorModeValue('gray.200', 'gray.500');
  const startNewClaimCheckActiveBg = useColorModeValue('gray.300', 'gray.400');
  const allClaimChecksHoverBg = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const allClaimChecksActiveBg = useColorModeValue(primaryActiveLight, primaryActiveDark);
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  if (!claimCheck) {
    return (
      <Flex align="center" justify="center" h="100vh">        
        <Text fontSize="lg" color="gray.500" textAlign="center">No claim check found.</Text>
      </Flex>
    );
  }

  return (
    <Box px={{ md: 4 }} py={{ md: 6 }} minHeight="100vh">
      <Flex direction="column" bg={cardBg} p={8} borderRadius="md" shadow="md">
        <Flex justify="space-between" align="center" mb="4">
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>Claim Check Results</Heading>                    
          <HStack spacing="4" display={{ base: "none", md: "none", lg: "flex" }}>
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
        <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>

        {/* Claim Details */}
        <Box mb="4">
            <Heading size="md" mb="2" color={textColor}>Claim Summary</Heading>
            <VStack align="flex-start" spacing="2">#{claimCheck.id}
                <Text fontSize="md"><b>Claim Check ID:</b> #{claimCheck.id}</Text>
                <Text fontSize="md"><b>Title:</b> {claimCheck.title}</Text>
                <Text fontSize="md"><b>Date Analyzed:</b> {formatDate(claimCheck.date)}</Text>
            </VStack>
        </Box>

        <Divider mb="4" />

        {/* Analysis Details */}
        <Box mb="4">
            <Heading size="md" mb="2" color={textColor}>Analysis</Heading>
            <Stack direction={{ base: "column", md: "row" }} justify="flex-start" spacing="2" flexWrap="wrap" >
                <Badge fontSize="md" p={2} textAlign="center"><b>Rating:</b> {claimCheck.rating || "Unverified"}</Badge>
            </Stack>
        </Box>

        <Divider mb="4" />

        {/* Insights */}
        <Box>
            <Heading size="md" mb="2" color={textColor}>Insights</Heading>
            <Text fontSize="md" mb="2">
            This analysis was performed using Google Fact Check Tools API.
            </Text>
            <Text fontSize="md">
            The probabilities indicate the likelihood of the article being fake or true based on textual analysis.
            For further investigation, verify the article’s claims against trusted fact-checking databases.
            </Text>
        </Box>

        {/* Navigation Buttons */}
        <Flex justify="center" mt="8">
          <Stack direction={{ base: "column", md: "row" }} spacing="4">
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
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClaimCheckResults;
