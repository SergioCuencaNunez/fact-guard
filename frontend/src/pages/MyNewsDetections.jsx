import React, { useState } from "react";
import {
  HStack,
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Checkbox,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const primaryColor = "#4dcfaf";

import logoDetectBright from "../assets/logo-detect-bright.png";
import logoDetectDark from "../assets/logo-detect-dark.png";

const MyNewsDetections = ({ detections, deleteDetection }) => {
  const navigate = useNavigate();

  const logo = useColorModeValue(logoDetectBright, logoDetectDark);
  const logoHeight = useBreakpointValue({ base: '40px', md: '45px' });
  
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detectionToDelete, setDetectionToDelete] = useState(null);
  const [selectedDetections, setSelectedDetections] = useState([]);

  const handleDelete = (detection) => {
    setDetectionToDelete(detection);
    onOpen();
  };

  const confirmDelete = async () => {
    try {
      if (detectionToDelete) {
        // Delete a single detection
        await deleteDetection(detectionToDelete.id);
      } else {
        // Delete selected detections
        for (const detection of selectedDetections) {
          await deleteDetection(detection.id);
        }
        setSelectedDetections([]);
      }
      onClose();
    } catch (error) {
      console.error("Error deleting detection(s):", error);
    }
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedDetections(detections);
    } else {
      setSelectedDetections([]);
    }
  };

  const handleSelectDetection = (detection, isChecked) => {
    if (isChecked) {
      setSelectedDetections((prev) => [...prev, detection]);
    } else {
      setSelectedDetections((prev) => prev.filter((item) => item.id !== detection.id));
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("en-GB", options).replace(",", ""); // DD/MM/YYYY HH:MM
  };

  const getTextColor = (value, type) => {
    if (type === "percentage") {
      if (value >= 60) return "red.500";
      if (value >= 30) return "orange.500";
      return "green.500";
    }
    return "black";
  };

  return (
    <Box>
      <Flex direction="column">
        <Flex justify="space-between" align="center">
          <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }}>My News Detections</Heading>                    
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

        {detections.length > 0 ? (
          <>
            <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
              <Thead>
                <Tr>
                  <Th width="25%"><b>Title</b></Th>
                  <Th width="12.5%" textAlign="center"><b>Fake</b></Th>
                  <Th width="12.5%" textAlign="center"><b>True</b></Th>
                  <Th width="15%" textAlign="center"><b>Date</b></Th>
                  <Th width="15%" textAlign="center"><b>Results</b></Th>
                  <Th width="10%" textAlign="center"><b>Remove</b></Th>
                  <Th width="10%" textAlign="center"><b>Select</b></Th>
                </Tr>
              </Thead>
              <Tbody>
                {detections.map((detection) => (
                  <Tr key={detection.id}>
                    <Td>{detection.title}</Td>
                    <Td textAlign="center">
                      <Text color={getTextColor(detection.fakePercentage || "70", "percentage")}>
                        {detection.fakePercentage || "70%"}
                      </Text>
                    </Td>
                    <Td textAlign="center">
                      <Text color={getTextColor(detection.truePercentage || "30", "percentage")}>
                        {detection.truePercentage || "30%"}
                      </Text>
                    </Td>
                    <Td textAlign="center">{formatDate(detection.date)}</Td>
                    <Td textAlign="center">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate("/profile/detection-results", {
                            state: { detection },
                          })
                        }
                      >
                        Results
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button size="sm" color={primaryColor} onClick={() => handleDelete(detection)}>
                        <FaTrashAlt />
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Checkbox
                        isChecked={selectedDetections.some((item) => item.id === detection.id)}
                        onChange={(e) => handleSelectDetection(detection, e.target.checked)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex justify="space-between" align="center" mb="4">
              <Checkbox
                isChecked={selectedDetections.length === detections.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              >
                Select All
              </Checkbox>
              <Button
                colorScheme="red"
                onClick={() => {
                  setDetectionToDelete(null);
                  onOpen();
                }}
                isDisabled={selectedDetections.length === 0}
                visibility={selectedDetections.length > 0 ? "visible" : "hidden"}
              >
                Delete Selected
              </Button>
            </Flex>
          </>
        ) : (
          <Flex align="center" justify="center" h="60vh">
            <Text fontSize="lg" color="gray.500" textAlign="center">
              No detections found. Start detecting fake news with FactGuard Detect by analyzing news articles to identify and prevent misinformation. Get started now!
            </Text>
          </Flex>
        )}

        {/* Confirmation Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {detectionToDelete
                ? "Are you sure you want to delete this detection?"
                : "Are you sure you want to delete all selected detections?"}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                Delete
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default MyNewsDetections;
