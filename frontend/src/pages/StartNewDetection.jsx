import React, { useState } from "react";
import {
  HStack,
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Textarea,
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

import logoDetectBright from "../assets/logo-detect-bright.png";
import logoDetectDark from "../assets/logo-detect-dark.png";

const StartNewDetection = ({ addDetection }) => {
  const logo = useColorModeValue(logoDetectBright, logoDetectDark);
  const logoHeight = useBreakpointValue({ base: '40px', md: '45px' });
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const { colorMode, toggleColorMode } = useColorMode();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen: isSpinnerOpen, onOpen: onSpinnerOpen, onClose: onSpinnerClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();

  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!title || !content) {
      onAlertOpen();
      return;
    }
  
    onSpinnerOpen();
  
    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
  
        const detection = {
          title,
          content,
          fakePercentage: "70%", // Placeholder
          truePercentage: "30%", // Placeholder
          date: new Date().toISOString(),
        };
  
        const response = await fetch("http://localhost:5001/detections", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(detection),
        });
  
        if (response.ok) {
          const newDetection = await response.json();
          addDetection(newDetection); // Add detection to parent state
          navigate("/profile/detection-results", { state: { detection: newDetection } });
        } else if (response.status === 409) {
          console.warn("Duplicate detection.");
          setErrorMessage("This detection already exists. Please check your list of detections.");
          onErrorOpen();
        } else {
          console.error("Failed to analyze detection:", await response.text());
          setErrorMessage(`Failed to analyze detection: ${await response.text()}`);
          onErrorOpen();
        }
      } catch (error) {
        console.error("Error during detection analysis:", error);
        setErrorMessage(`Error during detection analysis: ${error.message}`);
        onErrorOpen();
      } finally {
        onSpinnerClose();
      }
    }, 5000);
  };  

  return (
    <Box>
      <Flex direction="column">
        <Flex justify="space-between" align="center">
          <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }}>Detect Fake News</Heading>          
          <HStack spacing="4" display={{ base: "none", md: "flex" }}>
            <img src={logo} alt="Detect Logo" style={{ height: logoHeight, width: "auto" }} />
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </HStack>
          <HStack spacing="4" display={{ base: "flex", md: "none" }}>
          <Box
              as="img"
              src={logo}
              alt="Detect Logo"
              maxHeight={logoHeight}
              maxWidth="120px"
              objectFit="contain"
            />
          </HStack>
        </Flex>
        <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>
        <Text mb="4">Enter the title and paste/upload a news article to analyze its authenticity:</Text>
        <Input
          placeholder="Enter article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb="4"
        />
        <Textarea
          placeholder="Paste your article content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          mb="4"
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
            onClick={handleAnalyze}
          >
            Analyze
          </Button>
        </Flex>
    
        {/* Spinner Modal */}
        <Modal isOpen={isSpinnerOpen} onClose={onSpinnerClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody textAlign="center" py="6">
              <Spinner size="xl" />
              <Text mt="4">Analyzing News... Please wait.</Text>
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
              Please fill in both the title and content fields to proceed with detecting fake news. 
              These details are essential to analyze the authenticity of the article.
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

export default StartNewDetection;
