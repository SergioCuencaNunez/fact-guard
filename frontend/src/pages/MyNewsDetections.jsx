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
import { SunIcon, MoonIcon, ChevronDownIcon, ChevronUpIcon, WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const primaryColor = "#4dcfaf";

import logoDetectBright from "../assets/logo-detect-bright.png";
import logoDetectDark from "../assets/logo-detect-dark.png";

const MyNewsDetections = ({ detections, deleteDetection }) => {
  const navigate = useNavigate();

  const logo = useColorModeValue(logoDetectBright, logoDetectDark);
  const logoHeight = useBreakpointValue({ base: '40px', md: '45px' });
  const cardBg = useColorModeValue("white", "gray.700");
  
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detectionToDelete, setDetectionToDelete] = useState(null);
  const [selectedDetections, setSelectedDetections] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

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
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  const green = useColorModeValue("green.600", "green.300");
  const orange = useColorModeValue("orange.600", "orange.300");
  const gray = useColorModeValue("gray.600", "gray.300");
  const red = useColorModeValue("red.600", "red.300");

  const getTextColor = (value, type) => {  
    if (type === "True") {
      if (value >= 70) return green;
      if (value >= 40) return orange;
      return gray;
    } else if (type === "False") {
      if (value >= 70) return red;
      if (value >= 40) return orange;
      return gray;
    }
    return gray;
  };
  
  const sortedDetections = [...detections].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <Box px={{ md: 4 }} py={{ md: 6 }}  sx={{
      "@media screen and (min-height: 930px)": {
        minHeight: "100vh",
      },
    }}>
      <Flex direction="column" bg={cardBg} p={8} borderRadius="md" shadow="md">
        <Flex justify="space-between" align="center" mb="4">
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>My News Detections</Heading>                    
          <HStack spacing="4" display={{ base: "none", md: "none", lg: "flex" }}>
            <img src={logo} alt="Detect Logo" style={{ height: logoHeight, width: "auto" }} />
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
                alt="Detect Logo"
                maxHeight={logoHeight}
                maxWidth="120px"
                objectFit="contain"
              />
          </HStack>
        </Flex>
        <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>
        {detections.length > 0 ? (
          <>
            <Box overflowX="auto">
              <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                <Thead>
                  <Tr>
                    <Th width="5%" textAlign="center"><b>ID</b></Th>
                    <Th width="30%" textAlign="left"><b>Title</b></Th>
                    <Th width="10%" textAlign="center"><b>Fake</b></Th>
                    <Th width="10%" textAlign="center"><b>True</b></Th>
                    <Th width="15%" textAlign="center">
                      <Flex align="center" justify="center">
                        <b>Date</b>
                        <IconButton
                          aria-label="Toggle Sort Order"
                          icon={sortOrder === "desc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
                          size="xs"
                          variant="ghost"
                          onClick={toggleSortOrder}
                          ml="1"
                        />
                      </Flex>
                    </Th>
                    <Th width="15%" textAlign="center"><b>Results</b></Th>
                    <Th width="10%" textAlign="center"><b>Remove</b></Th>
                    <Th width="5%" textAlign="center"><b>Select</b></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sortedDetections.map((detection) => (
                    <Tr key={detection.id}>
                      <Td textAlign="center">#{detection.id}</Td>
                      <Td textAlign="left">{detection.title}</Td>
                      <Td textAlign="center">
                        <Text fontSize="xl" color={getTextColor(detection.falsePercentage || 70, "False")}>
                          {detection.falsePercentage || "70%"}
                        </Text>
                      </Td>
                      <Td textAlign="center">
                        <Text fontSize="xl" color={getTextColor(detection.truePercentage || 30, "True")}>
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
            </Box>
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
          <Flex align="center" justify="center" direction="column" h={{ base: "auto", md: "15vh" }}>
            <WarningIcon boxSize="6" color="gray.500" mb="2" />
            <Text fontSize="lg" color="gray.500" textAlign="center">
              No detections found.
            </Text>
            <Text fontSize="md" color="gray.400" textAlign="center">
              Start detecting fake news with FactGuard Detect by analyzing articles and preventing misinformation today.
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
                : "Are you sure you want to delete the selected detections?"}
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
