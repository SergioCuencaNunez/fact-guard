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
import { SunIcon, MoonIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const primaryColor = "#4dcfaf";

import logoVerifyBright from "../assets/logo-verify-bright.png";
import logoVerifyDark from "../assets/logo-verify-dark.png";

const MyClaimChecks = ({ claimChecks, deleteClaimCheck }) => {
  const navigate = useNavigate();

  const logo = useColorModeValue(logoVerifyBright, logoVerifyDark);
  const logoHeight = useBreakpointValue({ base: '40px', md: '45px' });
  const cardBg = useColorModeValue("white", "gray.700");
  
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [claimCheckToDelete, setClaimCheckToDelete] = useState(null);
  const [selectedClaimChecks, setSelectedClaimChecks] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  const handleDelete = (claimCheck) => {
    setClaimCheckToDelete(claimCheck);
    onOpen();
  };

  const confirmDelete = async () => {
    try {
      if (claimCheckToDelete) {
        // Delete a single claim check
        await deleteClaimCheck(claimCheckToDelete.id);
      } else {
        // Delete selected claim check
        for (const claimCheck of selectedClaimChecks) {
          await deleteClaimCheck(claimCheck.id);
        }
        setSelectedClaimChecks([]);
      }
      onClose();
    } catch (error) {
      console.error("Error deleting claim check(s):", error);
    }
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedClaimChecks(claimChecks);
    } else {
      setSelectedClaimChecks([]);
    }
  };

  const handleSelectClaimCheck = (claimCheck, isChecked) => {
    if (isChecked) {
      setSelectedClaimChecks((prev) => [...prev, claimCheck]);
    } else {
      setSelectedClaimChecks((prev) => prev.filter((item) => item.id !== claimCheck.id));
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  const getTextColor = (value, type) => {
    if (type === "percentage") {
      if (value >= 60) return "red.500";
      if (value >= 30) return "orange.500";
      return "green.500";
    }
    return "black";
  };

  const sortedClaimChecks = [...claimChecks].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <Box px={{ md: 4 }} py={{ md: 6 }}>
      <Flex direction="column" bg={cardBg} p={8} borderRadius="md" shadow="md">
        <Flex justify="space-between" align="center" mb="4">
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>My Claim Checks</Heading>                    
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
        {claimChecks.length > 0 ? (
          <>
            <Box overflowX="auto">
              <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                <Thead>
                  <Tr>
                    <Th width="5%" textAlign="center"><b>ID</b></Th>
                    <Th width="30%" textAlign="left"><b>Title</b></Th>
                    <Th width="10%" textAlign="center"><b>Rating</b></Th>
                    <Th width="10%" textAlign="center"><b>Link</b></Th>
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
                  {sortedClaimChecks.map((claimCheck) => (
                    <Tr key={claimCheck.id}>
                      <Td textAlign="center">#{claimCheck.id}</Td>
                      <Td textAlign="left">{claimCheck.title}</Td>
                      <Td textAlign="center">
                        <Text color={getTextColor(claimCheck.rating || "Unverified", "percentage")}>
                          {claimCheck.rating || "70%"}
                        </Text>
                      </Td>
                      <Td textAlign="center">#{claimCheck.link}</Td>
                      <Td textAlign="center">{formatDate(claimCheck.date)}</Td>
                      <Td textAlign="center">
                        <Button
                          size="sm"
                          onClick={() =>
                            navigate("/profile/claim-check-results", {
                              state: { claimCheck },
                            })
                          }
                        >
                          Results
                        </Button>
                      </Td>
                      <Td textAlign="center">
                        <Button size="sm" color={primaryColor} onClick={() => handleDelete(claimCheck)}>
                          <FaTrashAlt />
                        </Button>
                      </Td>
                      <Td textAlign="center">
                        <Checkbox
                          isChecked={selectedClaimChecks.some((item) => item.id === claimCheck.id)}
                          onChange={(e) => handleSelectClaimCheck(claimCheck, e.target.checked)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Flex justify="space-between" align="center" mb="4">
              <Checkbox
                isChecked={selectedClaimChecks.length === claimChecks.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              >
                Select All
              </Checkbox>
              <Button
                colorScheme="red"
                onClick={() => {
                  setClaimCheckToDelete(null);
                  onOpen();
                }}
                isDisabled={selectedClaimChecks.length === 0}
                visibility={selectedClaimChecks.length > 0 ? "visible" : "hidden"}
              >
                Delete Selected
              </Button>
            </Flex>
          </>
        ) : (
          <Flex align="center" justify="center" h="15vh">
            <Text fontSize="lg" color="gray.500" textAlign="center">
              No claims checks found. Start verifying claims with FactGuard Verify by fact-checking claims to prevent misinformation.
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
              {claimCheckToDelete
                ? "Are you sure you want to delete this claim check?"
                : "Are you sure you want to delete the selected claim checks?"}
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

export default MyClaimChecks;
