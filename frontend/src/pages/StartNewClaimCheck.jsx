import React, { useState } from "react";
import {
  HStack,
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Input,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  Collapse,
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
import { SunIcon, MoonIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const primaryColor = "#4dcfaf";
const primaryHoverLight = "#3ca790";
const primaryHoverDark = "#77e4c4";
const primaryActiveLight = "#2a8073";
const primaryActiveDark = "#91edd0";

import logoVerifyBright from "../assets/logo-verify-bright.png";
import logoVerifyDark from "../assets/logo-verify-dark.png";
import logoGoogleFactCheckLogoBright from "../assets/logo-google-fact-check-bright.png";
import logoGoogleFactCheckLogoDark from "../assets/logo-google-fact-check-dark.png";

const StartNewClaimCheck = ({ addClaimCheck }) => {
  const navigate = useNavigate();
  // For development only
  const BACKEND_URL = `${window.location.protocol}//${window.location.hostname}:5001`;

  // For production
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  const logo = useColorModeValue(logoVerifyBright, logoVerifyDark);
  const logoHeight = useBreakpointValue({ base: '40px', md: '45px' });
  const logoGoogleFactCheckLogo = useColorModeValue(logoGoogleFactCheckLogoBright, logoGoogleFactCheckLogoDark);
  const logoGoogleFactCheckLogoHeight = useBreakpointValue({ base: '15px', md: '20px' });

  const cardBg = useColorModeValue("white", "gray.700");
  
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const { colorMode, toggleColorMode } = useColorMode();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [showTransparency, setShowTransparency] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen: isSpinnerOpen, onOpen: onSpinnerOpen, onClose: onSpinnerClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();

  const toggleTransparency = () => setShowTransparency(!showTransparency);

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
        
        const response = await fetch(`${BACKEND_URL}/claims`, {
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Box px={{ md: 4 }} py={{ md: 6 }}>
        <Flex direction="column" bg={cardBg} p={8} borderRadius="md" shadow="md">
          <Flex justify="space-between" align="center" mb="4">
            <Heading fontSize={{ base: '3xl', md: '4xl' }}>Verify Claims</Heading>          
            <HStack spacing="4" display={{ base: "none", lg: "flex" }}>
              <motion.img
                src={logo}
                alt="Verify Logo"
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
                  alt="Verify Logo"
                  maxHeight={logoHeight}
                  maxWidth="120px"
                  objectFit="contain"
                />
              </motion.div>
            </HStack>
          </Flex>
          <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>
          <Text mb="4">Enter a claim to verify its authenticity against reliable sources:</Text>
          <Select 
            placeholder="Select the language" 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)} 
            mb="4"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </Select>
          <Input
            placeholder="Enter a claim to verify"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb="6"
            _placeholder={{
              color: useColorModeValue("gray.500", "gray.400"),
            }}
          />
          <Flex justify="center" mb="4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
            </motion.div>
          </Flex>

          {/* Powered by Google Fact Check Tools API */}
          <HStack justify="flex-end" mb="4">
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

          {/* Transparency Section */}
          <Flex direction="column">
            <Flex align="center" cursor="pointer" onClick={toggleTransparency} color={useColorModeValue("gray.500", "gray.400")}>
              <Text fontSize="sm" fontWeight="bold" mr={2}>
                More Information and Details
              </Text>
              <InfoOutlineIcon />
            </Flex>
            <Collapse in={showTransparency}>
              <Box mt={4} p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.800")}>
                <Text fontSize="sm" textAlign="justify">
                  {useBreakpointValue({
                    base: "FactGuard Verify uses the Google Fact Check API to validate claims and provide reliable results.",
                    lg: "FactGuard Verify integrates directly with the Google Fact Check Tools API to validate the accuracy of claims. By leveraging a comprehensive database of verified information from trusted fact-checking organizations, it ensures users receive precise and reliable results when assessing the truthfulness of claims.",
                  })}
                </Text>
                <Text mt={2} fontSize="sm" textAlign="justify">
                  {useBreakpointValue({
                    base: "The system is continuously improved to enhance reliability and user experience.",
                    lg: "This integration with the Google Fact Check Tools API ensures robust claim validation, offering users a reliable tool for uncovering the truth. FactGuard Verify is continuously improved to provide enhanced reliability, transparency, and a seamless user experience in combating misinformation.",
                  })}
                </Text>
              </Box>
            </Collapse>
          </Flex>

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
    </motion.div>
  );
};

export default StartNewClaimCheck;
