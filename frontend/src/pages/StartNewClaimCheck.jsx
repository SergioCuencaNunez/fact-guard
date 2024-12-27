import React, { useState } from "react";
import {
  HStack,
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const primaryColor = "#4dcfaf";
const primaryHoverLight = "#3ca790";
const primaryHoverDark = "#4dcfaf";
const primaryActiveLight = "#2a8073";
const primaryActiveDark = "#91edd0";

import logoVerifyBright from "../assets/logo-verify-bright.png";
import logoVerifyDark from "../assets/logo-verify-dark.png";
import logoGoogleFactCheckLogoBright from "../assets/logo-google-fact-check-bright.png";
import logoGoogleFactCheckLogoDark from "../assets/logo-google-fact-check-dark.png";

const StartNewClaimCheck = ({ addClaimCheck }) => {
  const logo = useColorModeValue(logoVerifyBright, logoVerifyDark);
  const logoHeight = useBreakpointValue({ base: '40px', md: '45px' });
  const logoGoogleFactCheckLogo = useColorModeValue(logoGoogleFactCheckLogoBright, logoGoogleFactCheckLogoDark);
  const logoGoogleFactCheckLogoHeight = useBreakpointValue({ base: '15px', md: '20px' });

  const cardBg = useColorModeValue("white", "gray.700");
  
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen: isSpinnerOpen, onOpen: onSpinnerOpen, onClose: onSpinnerClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();

  const handleVerify = () => {
    if (!title) {
      onAlertOpen();
      return;
    }
  
    onSpinnerOpen();
  
    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
  
        const claim = {
          title,
          rating: "Misleading", // Placeholder
          link: "https://example.com", // Placeholder
          date: new Date().toISOString(),
        };
  
        const response = await fetch("http://localhost:5001/claims", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(claim),
        });
  
        if (response.ok) {
          const newClaimCheck = await response.json();
          addClaimCheck(newClaimCheck); // Add claim to parent state
          navigate("/profile/claim-check-results", { state: { claimCheck: newClaimCheck } });
        } else if (response.status === 409) {
          console.warn("Duplicate claim.");
          setErrorMessage("This claim has already been verified. Please check your list of claim checks.");
          onErrorOpen();
        } else {
          console.error("Failed to verify claim:", await response.text());
          setErrorMessage(`Failed to verify claim: ${await response.text()}`);
          onErrorOpen();
        }
      } catch (error) {
        console.error("Error while verifying the claim:", error);
        setErrorMessage(`Error while verifying the claim: ${error.message}`);
        onErrorOpen();
      } finally {
        onSpinnerClose();
      }
    }, 5000);
  };  

  return (
    <Box px={{ md: 4 }} py={{ md: 6 }}  sx={{
      "@media screen and (min-height: 930px)": {
        minHeight: "100vh",
      },
    }}>
      <Flex direction="column" bg={cardBg} p={8} borderRadius="md" shadow="md">
        <Flex justify="space-between" align="center" mb="4">
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>Verify Claims</Heading>          
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
        <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>
        <Text mb="4">Enter a claim to verify its authenticity against reliable sources:</Text>
        <Input
          placeholder="Enter a claim..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb="6"
        />
        <Flex justify="center" mb="4">
          <Button
            bg={primaryColor}
            color="white"
            _hover={{ bg: hoverColor }}
            _active={{ bg: activeColor }}
            size="md"
            width="fit-content"
            px="8"
            onClick={handleVerify}
          >
            Verify
          </Button>
        </Flex>

        {/* Powered by Google Fact Check Tools API */}
        <HStack justify="flex-end">
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
              Powered by
            </Text>
            <a href="https://toolbox.google.com/factcheck/explorer/search/list:recent" target="_blank" rel="noopener noreferrer">
              <Box
                as="img"
                src={logoGoogleFactCheckLogo}
                alt="Google Fact Check Tools API Logo"
                height={logoGoogleFactCheckLogoHeight}
                _hover={{ opacity: 0.8 }}
                _active={{ transform: "scale(0.95)" }}
              />
            </a>
        </HStack>

        {/* Spinner Modal */}
        <Modal isOpen={isSpinnerOpen} onClose={onSpinnerClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody textAlign="center" py="6">
              <Spinner size="xl" />
              <Text mt="4">Verifying Claim... Please wait.</Text>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Alert Modal */}
        <Modal isOpen={isAlertOpen} onClose={onAlertClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Missing Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Please input the claim in the provided field to proceed with verification. 
              This detail is essential to evaluate the reliability and credibility of the claim.
            </ModalBody>
            <ModalFooter>
              <Button
                bg={primaryColor}
                color="white"
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
                size="md"
                onClick={onAlertClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Error Modal */}
        <Modal isOpen={isErrorOpen} onClose={onErrorClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{errorMessage}</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                bg={primaryColor}
                color="white"
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
                size="md"
                onClick={onErrorClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </Flex>
    </Box>
  );
};

export default StartNewClaimCheck;
