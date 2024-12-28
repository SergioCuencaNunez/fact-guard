import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, ChevronDownIcon, WarningIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaNewspaper, FaShieldAlt, FaSignOutAlt, FaPlus, FaTasks, FaTrashAlt } from "react-icons/fa";
import { useNavigate, Routes, Route } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });
  const [openDropdown, setOpenDropdown] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const sidebarBgColor = useColorModeValue("#c9ebdf", "#0b7b6b");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");

  const [detections, setDetections] = useState([]);
  const [claimChecks, setClaimsChecks] = useState([]);
  const [detectionToDelete, setDetectionToDelete] = useState(null);
  const [claimCheckToDelete, setClaimCheckToDelete] = useState(null);

  const { isOpen: isDetectionModalOpen, onOpen: onDetectionModalOpen, onClose: onDetectionModalClose } = useDisclosure();
  const { isOpen: isClaimModalOpen, onOpen: onClaimModalOpen, onClose: onClaimModalClose } = useDisclosure();

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetch user data logic
    };
    const fetchDetections = async () => {
      // Fetch detections logic
    };
    const fetchClaimsCheck = async () => {
      // Fetch claim checks logic
    };

    fetchUserData();
    fetchDetections();
    fetchClaimsCheck();
  }, []);

  const handleDeleteDetection = (detection) => {
    setDetectionToDelete(detection);
    onDetectionModalOpen();
  };

  const confirmDeleteDetection = async () => {
    // Delete detection logic
  };

  const handleDeleteClaimCheck = (claimCheck) => {
    setClaimCheckToDelete(claimCheck);
    onClaimModalOpen();
  };

  const confirmDeleteClaimCheck = async () => {
    // Delete claim check logic
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Flex direction={{ base: "column", md: "row" }} bg={sidebarBgColor}>
        {/* Sidebar */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5 }}
        >
          <Box w={{ base: "full", md: "275px" }} bg={sidebarBgColor} px={{ base: "4", md: "6" }} py="8">
            {/* Sidebar Content */}
            <VStack spacing="8" align="flex-start">
              <HStack>
                <Avatar name={user.username} size="lg" />
                <Box>
                  <Text fontWeight="bold">{user.username}</Text>
                  <Text fontSize="sm" color={textColor}>{user.email}</Text>
                </Box>
              </HStack>
              <Button onClick={() => navigate("/profile")}>Dashboard</Button>
            </VStack>
          </Box>
        </motion.div>

        {/* Main Content */}
        <Box flex="1" px={{ base: 8, md: 8 }} py={{ base: 10, md: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Heading>Welcome {user.username}</Heading>} />
              {/* Add other routes */}
            </Routes>
          </motion.div>
        </Box>

        {/* Modals */}
        <Modal isOpen={isDetectionModalOpen} onClose={onDetectionModalClose} isCentered>
          <ModalOverlay />
          <ModalContent as={motion.div} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ duration: 0.3 }}>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this detection?
            </ModalBody>
            <ModalFooter>
              <Button onClick={confirmDeleteDetection}>Delete</Button>
              <Button onClick={onDetectionModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isClaimModalOpen} onClose={onClaimModalClose} isCentered>
          <ModalOverlay />
          <ModalContent as={motion.div} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ duration: 0.3 }}>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this claim check?
            </ModalBody>
            <ModalFooter>
              <Button onClick={confirmDeleteClaimCheck}>Delete</Button>
              <Button onClick={onClaimModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </motion.div>
  );
};

export default Profile;
