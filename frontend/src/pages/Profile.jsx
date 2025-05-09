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
  Badge,
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
import { SunIcon, MoonIcon, ChevronDownIcon, CheckCircleIcon, WarningIcon, WarningTwoIcon, InfoIcon } from "@chakra-ui/icons";
import {
  FaUser,
  FaNewspaper,
  FaShieldAlt,
  FaSignOutAlt,
  FaPlus,
  FaChartBar,
  FaCogs,
  FaTasks,
  FaUsers,
  FaTrashAlt,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useNavigate, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';
import logoGoogleFactCheckLogoBright from "../assets/logo-google-fact-check-bright.png";
import logoGoogleFactCheckLogoDark from "../assets/logo-google-fact-check-dark.png";

import BlurOverlay from "../components/BlurOverlay";

import StartNewDetection from "./StartNewDetection";
import MyNewsDetections from "./MyNewsDetections";
import DetectionResults from "./DetectionResults";
import StartNewClaimCheck from "./StartNewClaimCheck";
import MyClaimChecks from "./MyClaimChecks";
import ClaimCheckResults from "./ClaimCheckResults";
import AccountDetails from "./AccountDetails";
import NotFound from "../pages/NotFound"; 

import RatingsAndPredictionsPieChart from "../graphs/RatingsAndPredictionsPieChart";
import DetectionsAndClaimsLineChart from "../graphs/DetectionsAndClaimsLineChart";
import DailyInteractionBreakdown from "../graphs/DailyInteractionBreakdown";

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';
const sidebarLight = '#c9ebdf';
const sidebarDark = '#0b7b6b';
const gradient = "linear-gradient(to bottom, #2a8073, #3ca790, #4dcfaf)";

const Profile = () => {
  const navigate = useNavigate();
  // For development only
  const BACKEND_URL = `${window.location.protocol}//${window.location.hostname}:5001`;

  // For production
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState({ username: "", email: "" });
  const [openDropdown, setOpenDropdown] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const logo = useColorModeValue(logoBright, logoDark);
  const logoHeight = useBreakpointValue({ base: '45px', md: '50px' });
  const logoGoogleFactCheckLogo = useColorModeValue(logoGoogleFactCheckLogoBright, logoGoogleFactCheckLogoDark);
  const logoGoogleFactCheckLogoHeight = useBreakpointValue({ base: '15px', md: '20px' });

  const bg = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue('black', 'white');
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const sidebarBgColor = useColorModeValue(sidebarLight, sidebarDark);
  const avatarTextColor = useColorModeValue("white", "black");
  const avatarBgColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const textColorAvatar = useColorModeValue('gray.500', 'gray.300');
  const dateFormat = useBreakpointValue({ base: 'small', md: 'medium', lg: 'full', xl: 'full' });

  const getRatingColor = (rating) => {
    const lowerRating = rating.toLowerCase();
    if (["false", "incorrect", "not true", "no", "fake", "falso", "incorrecto", "no verdadero"].some((term) => lowerRating.includes(term))) {
      return "red";
    } else if (["true", "yes", "verdadero", "si"].some((term) => lowerRating.includes(term))) {
      return "green";
    } else if (["mixture", "altered", "misleading", "engañoso", "alterado", "descontextualizado", "sin contexto"].some((term) => lowerRating.includes(term))) {
      return "orange";
    } else {
      return "gray";
    }
  };
  
  const getRatingIcon = (rating) => {
    const lowerRating = rating.toLowerCase();
    if (["false", "incorrect", "not true", "no", "fake", "falso", "incorrecto", "no verdadero"].some((term) => lowerRating.includes(term))) {
      return <WarningTwoIcon color="red.500" />;
    } else if (["true", "yes", "verdadero", "si"].some((term) => lowerRating.includes(term))) {
      return <CheckCircleIcon color="green.500" />;
    } else if (["mixture", "altered", "misleading", "engañoso", "alterado", "descontextualizado", "sin contexto"].some((term) => lowerRating.includes(term))) {
      return <WarningIcon color="orange.500" />;
    } else {
      return <InfoIcon color="gray.500" />;
    }
  };
  
  const getAggregateRating = (ratings) => {
    const normalizedRatings = ratings.map((rating) => rating.toLowerCase());
  
    const categories = {
      true: ["true", "yes", "verdadero", "si"],
      false: ["false", "incorrect", "not true", "no", "fake", "falso", "incorrecto", "no verdadero"],
      inconclusive: ["mixture", "altered", "misleading", "engañoso", "alterado", "descontextualizado", "sin contexto"],
    };
  
    let trueCount = 0;
    let falseCount = 0;
    let inconclusiveCount = 0;
  
    normalizedRatings.forEach((rating) => {
      if (categories.true.includes(rating)) {
        trueCount++;
      } else if (categories.false.includes(rating)) {
        falseCount++;
      } else if (categories.inconclusive.includes(rating)) {
        inconclusiveCount++;
      }
    });
  
    if (trueCount > falseCount && trueCount > inconclusiveCount) {
      return "True";
    } else if (falseCount > trueCount && falseCount > inconclusiveCount) {
      return "False";
    } else if (inconclusiveCount > trueCount && inconclusiveCount > falseCount) {
      return "Misleading";
    } else if (
      (trueCount > 0 && falseCount > 0 && inconclusiveCount === 0) ||
      (trueCount > 0 && inconclusiveCount > 0 && falseCount === 0) ||
      (falseCount > 0 && inconclusiveCount > 0 && trueCount === 0)
    ) {
      return "Inconclusive";
    } else if (normalizedRatings.length === 1) {
      return ratings[0];
    }
  
    return "Inconclusive";
  };

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
  
  const getCurrentDate = (dateFormat) => {
    const now = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayName = dayNames[now.getDay()];
    const monthName = monthNames[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();

    const dateSuffix =
      date % 10 === 1 && date !== 11
        ? "st"
        : date % 10 === 2 && date !== 12
        ? "nd"
        : date % 10 === 3 && date !== 13
        ? "rd"
        : "th";

    if (dateFormat == 'small') {
      const day = String(date).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const shortYear = String(year).slice(-2);
      return `${day}/${month}/${shortYear}`;
    }

    if (dateFormat == 'medium') {
      const shortDayName = dayName.slice(0, 3);
      return `${shortDayName}, ${monthName} ${date}${dateSuffix}, ${year}`;
    }

    return `${dayName}, ${monthName} ${date}${dateSuffix}, ${year}`;
  };

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setUser({ username: data.username, email: data.email });
        } else if (response.status === 403) {
          navigate("/access-denied", {
            state: {
              message: data.error || "To access the profile, use the Admin Panel.",
            },
          });
        } else {
          console.error("Failed to fetch user data:", data.error);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const {
    isOpen: isLogoutModalOpen,
    onOpen: onLogoutModalOpen,
    onClose: onLogoutModalClose,
  } = useDisclosure();
  
  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const [detections, setDetections] = useState([]);

  useEffect(() => {
    const fetchDetections = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/detections`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setDetections(data);
        } else {
          console.error("Failed to fetch detections:", data.error);
        }
      } catch (error) {
        console.error("Error fetching detections:", error);
      }
    };

    fetchDetections();
  }, [navigate]);

  // Add a detection to server
  const addDetection = (newDetection) => {
    setDetections((prev) => [...prev, newDetection]);
  };

  // Delete a detection from server
  const deleteDetection = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BACKEND_URL}/detections/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setDetections((prev) => prev.filter((d) => d.id !== id));
      } else {
        console.error("Failed to delete detection.");
      }
    } catch (error) {
      console.error("Error deleting detection:", error);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "No Available Date";
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("en-GB", options).replace(",", ""); // DD/MM/YYYY HH:MM
  };

  const [sortOrder] = useState("desc");
  
  const sortedDetections = [...detections].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const {
    isOpen: isDetectionModalOpen,
    onOpen: onDetectionModalOpen,
    onClose: onDetectionModalClose,
  } = useDisclosure();
  const [detectionToDelete, setDetectionToDelete] = useState(null);

  const handleDeleteDetection = (detection) => {
    setDetectionToDelete(detection);
    onDetectionModalOpen();
  };

  const confirmDeleteDetection = async () => {
    try {
      if (detectionToDelete) {
        // Delete a single detection
        await deleteDetection(detectionToDelete.id);
      }
      onDetectionModalClose();
    } catch (error) {
      console.error("Error deleting detection(s):", error);
    }
  };

  const [claimChecks, setClaimsChecks] = useState([]);

  useEffect(() => {
    const fetchClaimsCheck = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/claims`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setClaimsChecks(data);
        } else {
          console.error("Failed to fetch claim checks:", data.error);
        }
      } catch (error) {
        console.error("Error fetching claim checks:", error);
      }
    };

    fetchClaimsCheck();
  }, [navigate]);

  // Add a claim check to server
  const addClaimCheck = (newClaimCheck) => {
    setClaimsChecks((prev) => [...prev, newClaimCheck]);
  };

  // Delete a claim check from server
  const deleteClaimCheck = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BACKEND_URL}/claims/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setClaimsChecks((prev) => prev.filter((d) => d.id !== id));
      } else {
        console.error("Failed to delete claim check.");
      }
    } catch (error) {
      console.error("Error deleting claim check:", error);
    }
  };

  const sortedClaimChecks = [...claimChecks].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const {
    isOpen: isClaimModalOpen,
    onOpen: onClaimModalOpen,
    onClose: onClaimModalClose,
  } = useDisclosure();
  const [claimCheckToDelete, setClaimCheckToDelete] = useState(null);

  const handleDeleteClaimCheck = (claimCheck) => {
    setClaimCheckToDelete(claimCheck);
    onClaimModalOpen();
  };

  const confirmDeleteClaimCheck = async () => {
    try {
      if (claimCheckToDelete) {
        // Delete a single claim checks
        await deleteClaimCheck(claimCheckToDelete.id);
      }
      onClaimModalClose();
    } catch (error) {
      console.error("Error deleting claim check(s):", error);
    }
  };

  const isStatsAvailable = () => {
    return (
      Array.isArray(detections) &&
      detections.length > 0 &&
      Array.isArray(claimChecks) &&
      claimChecks.length > 0
    );
  }; 
  
  const hasTwoDaysOfData = () => {
    const dates = [
      ...(Array.isArray(detections) ? detections : []),
      ...(Array.isArray(claimChecks) ? claimChecks : []),
    ]
      .map((item) => item.date?.split("T")[0])
      .filter(Boolean);
  
    const uniqueDates = [...new Set(dates)];
    return uniqueDates.length > 1;
  };  
  
  return (
    <>
      <Helmet>
        <title>FactGuard - Profile</title>
      </Helmet>
      <Flex direction={{ base: "column", md: "row" }} bg={bg}>
        {/* Sidebar */}
        <Box
          w={{ base: "full", md: "300px" }}
          bg={sidebarBgColor}
          px={{ base: "4", md: "6" }}
          py={{ base: "6", md: "8" }}      
          shadow="lg"
          position={{ base: "relative", md: "sticky" }}
          top="0"
          h={{ base: "auto", md: "100vh" }}
          overflowY="auto"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          borderRightWidth="3px"
          borderRightStyle="solid"
          borderRightColor="transparent"
          style={{
            borderImage: gradient,
            borderImageSlice: 1,
            borderRight: useBreakpointValue({ base: "none", md: "solid" }),
            borderBottom: useBreakpointValue({ base: "solid", md: "none" }),
          }}      
        >
          <VStack spacing={{base: "4", md: "8"}} align="flex-start">
            <HStack justifyContent={{ base: "center", md: "flex-start" }} w="100%">
              <motion.img
                src={logo}
                alt="FactGuard Logo"
                style={{ height: logoHeight, width: 'auto'}}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              />
            </HStack>

            {/* User Info and Logout Button (Mobile only) */}
            <HStack
              display={{ base: "flex", md: "none" }}
              justifyContent="space-between"
              w="100%"
            >
              <HStack>
                <Avatar name={user.username} size="lg" bg={avatarBgColor} color={avatarTextColor}/>
                <Box>
                  <Text fontWeight="bold" isTruncated>{user.username}</Text>
                  <Text fontSize="sm" color={textColorAvatar} isTruncated>
                    {user.email}
                  </Text>
                </Box>
              </HStack>
              <Button
                colorScheme="red"
                variant="solid"
                onClick={onLogoutModalOpen}
                size="sm"
              >
                <FaSignOutAlt />
              </Button>
            </HStack>

            {/* User Info (Desktop only) */}
            <HStack display={{ base: "none", md: "flex" }}>
              <Avatar name={user.username} size="lg" bg={avatarBgColor} color={avatarTextColor}/>
              <Box>
                <Text fontWeight="bold" isTruncated>{user.username}</Text>
                <Text fontSize="sm" color={textColorAvatar} isTruncated>
                  {user.email}
                </Text>
              </Box>
            </HStack>

            {/* Sidebar Buttons */}
            <VStack spacing="4" align="stretch" w="100%">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  justifyContent="space-between"
                  _hover={{ color: hoverColor }}
                  _active={{ color: activeColor }}
                  size={{ base: "sm", md: "md" }}
                  color={textColor}
                  width="100%"
                  onClick={() => navigate("/profile")}
                >
                  <HStack w="100%" justifyContent="space-between">
                    <HStack>
                      <FaChartBar />
                      <Text>Dashboard</Text>
                    </HStack>
                  </HStack>
                </Button>
              </motion.div>
              
              {/* Detect Fake News Dropdown */}
              <Box>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    justifyContent="space-between"
                    _hover={{ color: hoverColor }}
                    _active={{ color: activeColor }}
                    size={{ base: "sm", md: "md" }}
                    onClick={() => toggleDropdown("detect")}
                    color={textColor}
                    width="100%"
                  >
                    <HStack w="100%" justifyContent="space-between">
                      <HStack>
                        <FaNewspaper />
                        <Text>Detect Fake News</Text>
                      </HStack>
                      <ChevronDownIcon />
                    </HStack>
                  </Button> 
                </motion.div>
                <AnimatePresence initial={false}>             
                  {openDropdown === "detect" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                    <VStack align="stretch" pl="4" mt="2">
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                        _hover={{ color: hoverColor }}
                        _active={{ color: activeColor }}
                        color={textColor}
                        width="100%"
                        onClick={() => navigate("/profile/start-new-detection")}
                      >
                        <HStack>
                          <FaPlus />
                          <Text>Start New Detection</Text>
                        </HStack>
                      </Button>
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                        _hover={{ color: hoverColor }}
                        _active={{ color: activeColor }}
                        color={textColor}
                        width="100%"
                        onClick={() => navigate("/profile/my-news-detections")}
                      >
                        <HStack>
                          <FaTasks />
                          <Text>My News Detections</Text>
                        </HStack>
                      </Button>
                    </VStack>
                  </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              {/* Verify Claims Dropdown */}
              <Box>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    justifyContent="space-between"
                    _hover={{ color: hoverColor }}
                    _active={{ color: activeColor }}
                    size={{ base: "sm", md: "md" }}
                    onClick={() => toggleDropdown("verify")}
                    color={textColor}
                    width="100%"
                  >
                    <HStack w="100%" justifyContent="space-between">
                      <HStack>
                        <FaShieldAlt />
                        <Text>Verify Claims</Text>
                      </HStack>
                      <ChevronDownIcon />
                    </HStack>
                  </Button>
                </motion.div>
                <AnimatePresence initial={false}>
                  {openDropdown === "verify" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                    <VStack align="stretch" pl="4" mt="2">
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                        _hover={{ color: hoverColor }}
                        _active={{ color: activeColor }}
                        color={textColor}
                        width="100%"
                        onClick={() => navigate("/profile/start-new-claim-check")}
                      >
                        <HStack>
                          <FaPlus />
                          <Text>Start New Claim Check</Text>
                        </HStack>
                      </Button>
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                        _hover={{ color: hoverColor }}
                        _active={{ color: activeColor }}
                        color={textColor}
                        width="100%"
                        onClick={() => navigate("/profile/my-claim-checks")}
                      >
                        <HStack>
                          <FaTasks />
                          <Text>My Claim Checks</Text>
                        </HStack>
                      </Button>
                    </VStack>
                  </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              {/* Settings Dropdown */}
              <Box>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    justifyContent="space-between"
                    _hover={{ color: hoverColor }}
                    _active={{ color: activeColor }}
                    size={{ base: "sm", md: "md" }}
                    onClick={() => toggleDropdown("settings")}
                    color={textColor}
                    width="100%"
                  >
                    <HStack w="100%" justifyContent="space-between">
                      <HStack>
                        <FaCogs />
                        <Text>Settings</Text>
                      </HStack>
                      <ChevronDownIcon />
                    </HStack>
                  </Button>
                </motion.div>
                <AnimatePresence initial={false}>
                  {openDropdown === "settings" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <VStack align="stretch" pl="4" mt="2">
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          size="sm"
                          _hover={{ color: hoverColor }}
                          _active={{ color: activeColor }}
                          color={textColor}
                          width="100%"
                          onClick={() => navigate("/profile/account-details")}
                        >
                          <HStack>
                            <FaUser />
                            <Text>Account Details</Text>
                          </HStack>
                        </Button>
                      </VStack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </VStack>
          </VStack>
          
          {/* Logout Button (Desktop only) */}
          <HStack display={{ base: 'none', md: 'flex' }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ width: '100%' }}>
              <Button
                leftIcon={<FaSignOutAlt />}
                colorScheme="red"
                variant="solid"
                onClick={onLogoutModalOpen}
                size={{ base: "sm", md: "md" }}
                width="100%"
              >
                Logout
              </Button>
            </motion.div>
          </HStack>
        </Box>
        
        {/* Main Content */}
        <Box 
          flex="1"
          px={{base: 8, md: 8}}
          py={{base: 10, md: 8}}
          overflowY="auto">
          <Routes>
            <Route
              path="/"
              element={
                <Flex direction="column">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      bg={cardBg} 
                      p="5" 
                      borderRadius="md"
                      shadow="md"
                      mb="4" // Add margin-bottom
                    >
                      <Flex justify="space-between" align="center">
                        <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }}>Welcome, {user.username}</Heading>
                        <HStack spacing="4" display={{ base: "none", lg: "flex" }}>
                          <Text fontSize="sm" letterSpacing="wide" color={textColor}>{getCurrentDate(dateFormat)}</Text>
                          <IconButton
                            aria-label="Toggle theme"
                            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            onClick={toggleColorMode}
                            _hover={{
                              bg: colorMode === "light" ? "gray.200" : "gray.600",
                              transform: "scale(1.1)",
                            }}
                            _active={{
                              bg: colorMode === "light" ? "gray.300" : "gray.500",
                              transform: "scale(0.9)",
                            }}
                          />
                        </HStack>
                        <HStack spacing="4" display={{ base: "flex", md: "flex", lg: "none" }}>
                          <Text fontSize="sm" letterSpacing="wide" textAlign="right" color={textColor}>{getCurrentDate(dateFormat)}</Text>
                        </HStack>
                      </Flex>
                      <Box borderBottom="1px" borderColor="gray.300"></Box>
                    </Box>
                  </motion.div>

                  {/* Key Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Heading size="lg" mb="4">Key Features</Heading>
                    <Flex wrap="wrap" justify="space-between" gap="6">
                      {[
                        {
                          icon: <FaNewspaper size="50px" color={primaryColor} style={{ margin: "auto" }} />,
                          title: "Fake News Detection",
                          text: {
                            base: "Detect fake news using our AI models.",
                            md: "Detect fake news using our AI models.",
                            lg: "FactGuard Detect makes use of an accurate AI models to detect fake news and identify misleading content.",
                          },
                        },
                        {
                          icon: <FaShieldAlt size="50px" color={primaryColor} style={{ margin: "auto" }} />,
                          title: "Claim Check",
                          text: {
                            base: "Validate claims with Google FactCheck API.",
                            md: "Validate claims with Google FactCheck API.",
                            lg: "FactGuard Verify makes use of the API of Google FactCheck Claim Search to validate claims effectively and efficiently.",
                          },
                        },
                        {
                          icon: <FaUsers size="50px" color={primaryColor} style={{ margin: "auto" }} />,
                          title: "Team Management",
                          text: {
                            base: "Collaborate in detecting disinformation.",
                            md: "Invite other people and collaborate in detecting disinformation.",
                            lg: "Invite other people to use FactGuard and collaborate in detecting and preventing disinformation.",
                          },
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{ flex: "1 1 calc(33.333% - 1rem)", minWidth: "250px" }}
                        >
                          <Box
                            bg={cardBg}
                            p="5"
                            borderRadius="md"
                            textAlign="center"
                            shadow="md"
                            height="100%"
                            _hover={{
                              bg: useColorModeValue("gray.50", "gray.600"),
                            }}
                          >
                            {item.icon}
                            <Heading size="md" mt="4">{item.title}</Heading>
                            <Text mt="2">{useBreakpointValue(item.text)}</Text>
                          </Box>
                        </motion.div>
                      ))}
                    </Flex>
                  </motion.div>

                  {/* Graphs Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Trends & Statistics</Heading>
                    <Flex wrap="wrap" gap="6" align="flex-start">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ flex: "1 1 calc(33.333% - 1rem)", minWidth: "250px" }}
                      >
                        <Box
                          position="relative" 
                          bg={cardBg} 
                          p="5" 
                          borderRadius="md"
                          height="100%"
                          flex="1"
                          shadow="md"
                          display="flex" 
                          flexDirection="column" 
                          justifyContent="flex-start" 
                          alignItems="center" 
                          textAlign="center"
                          _hover={{
                            bg: useColorModeValue("gray.50", "gray.600"),
                          }}                
                        >
                          <Heading size="md" mb="4">Detections and Claims Over Time</Heading>
                          <DetectionsAndClaimsLineChart detections={detections} claimChecks={claimChecks} />
                          {!hasTwoDaysOfData() && (
                            <BlurOverlay message="At least two days of data are required to visualize trends." />
                          )}
                        </Box>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ flex: "1 1 calc(33.333% - 1rem)", minWidth: "250px" }}
                      >
                        <Box
                          position="relative"
                          bg={cardBg} 
                          p="5" 
                          borderRadius="md"
                          height="100%"
                          flex="1"
                          shadow="md"
                          display="flex" 
                          flexDirection="column" 
                          justifyContent="flex-start" 
                          alignItems="center" 
                          textAlign="center"
                          _hover={{
                            bg: useColorModeValue("gray.50", "gray.600"),
                          }}                
                        >
                          <Heading size="md" mb="4">Predictions and Ratings Overview</Heading>
                          <RatingsAndPredictionsPieChart detections={detections} claimChecks={claimChecks} />
                          {!isStatsAvailable() && (
                            <BlurOverlay message="Make some predictions and claim checks to unlock this section." />
                          )}
                        </Box>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ flex: "1 1 calc(33.333% - 1rem)", minWidth: "250px" }}
                      >
                        <Box
                          position="relative" 
                          bg={cardBg} 
                          p="5" 
                          borderRadius="md"
                          height="100%"
                          flex="1"
                          shadow="md"
                          display="flex" 
                          flexDirection="column" 
                          justifyContent="flex-start" 
                          alignItems="center" 
                          textAlign="center"
                          _hover={{
                            bg: useColorModeValue("gray.50", "gray.600"),
                          }}               
                        >
                          <Heading size="md" mb="4">Daily Interaction Breakdown</Heading>
                          <DailyInteractionBreakdown detections={detections} claimChecks={claimChecks} />
                          {!isStatsAvailable() && (
                            <BlurOverlay message="Make some predictions and claim checks to unlock this section." />
                          )}
                        </Box>
                      </motion.div>
                    </Flex>
                  </motion.div>

                  {/* Recent Content Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Detections</Heading>
                      <Box bg={cardBg} p="5" borderRadius="md" overflowX="auto" shadow="md">
                        {detections.length > 0 ? (
                          <>
                            <Box overflowX="auto">
                              <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                                <Thead>
                                  <Tr>
                                    <Th width="10%" textAlign="center"><b>ID</b></Th>
                                    <Th width="45%" textAlign="center"><b>Title</b></Th>
                                    <Th width="15%" textAlign="center"><b>Prediction</b></Th>
                                    <Th width="10%" textAlign="center"><b>Date</b></Th>
                                    <Th width="10%" textAlign="center"><b>Results</b></Th>
                                    <Th width="10%" textAlign="center"><b>Remove</b></Th>
                                  </Tr>
                                </Thead>
                                <Tbody as={motion.tbody}>
                                  <AnimatePresence>
                                    {sortedDetections.slice(0, 5).map((detection) => (
                                      <motion.tr
                                        key={detection.id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <Td textAlign="center">#{detection.id}</Td>
                                        <Td textAlign="justify">{detection.title}</Td>
                                        <Td textAlign="center">
                                          <Badge
                                            colorScheme={getPredictionColor(detection.final_prediction)}
                                            fontSize="md"
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            gap="2"
                                            whiteSpace="normal"
                                          >
                                            {getPredictionIcon(detection.final_prediction)}
                                            <Text as="span" fontSize="md">
                                              {detection.final_prediction}
                                            </Text>
                                          </Badge>
                                        </Td>
                                        <Td textAlign="center">{formatDate(detection.date)}</Td>
                                        <Td textAlign="center">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Button
                                              size="sm"
                                              onClick={() =>
                                                navigate(`/profile/detection-results/${detection.id}`, {
                                                  state: { detection },
                                                })
                                              }
                                            >
                                              Results
                                            </Button>
                                          </motion.div>
                                        </Td>
                                        <Td textAlign="center">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Button size="sm" color={primaryColor} onClick={() => handleDeleteDetection(detection)}>
                                              <FaTrashAlt />
                                            </Button>
                                          </motion.div>
                                        </Td>
                                      </motion.tr>
                                    ))}
                                  </AnimatePresence>
                                </Tbody>
                              </Table>
                            </Box>
                          </>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Flex align="center" justify="center" direction="column" h="15vh">
                              <WarningIcon boxSize="6" color="gray.500" mb="2" />
                              <Text fontSize="lg" color="gray.500" textAlign="center">
                                No detections found.
                              </Text>
                              <Text fontSize="md" color="gray.400" textAlign="center">
                                Start detecting fake news with FactGuard Detect by analyzing articles and preventing disinformation today.
                              </Text>
                            </Flex>
                          </motion.div>
                        )}
                      </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Claim Checks</Heading>
                    <Box bg={cardBg} p="5" borderRadius="md" overflowX="auto" shadow="md">
                        {claimChecks.length > 0 ? (
                          <>
                            <Box overflowX="auto">
                              <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                                <Thead>
                                  <Tr>
                                    <Th width="10%" textAlign="center"><b>ID</b></Th>
                                    <Th width="45%" textAlign="center"><b>Query</b></Th>
                                    <Th width="15%" textAlign="center"><b>Rating</b></Th>
                                    <Th width="10%" textAlign="center"><b>Date</b></Th>
                                    <Th width="10%" textAlign="center"><b>Results</b></Th>
                                    <Th width="10%" textAlign="center"><b>Remove</b></Th>
                                  </Tr>
                                </Thead>
                                <Tbody as={motion.tbody}>
                                  <AnimatePresence>
                                    {sortedClaimChecks.slice(0, 5).map((claimCheck) => (
                                      <motion.tr
                                        key={claimCheck.id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <Td textAlign="center">#{claimCheck.id}</Td>
                                        <Td textAlign="justify">{claimCheck.query}</Td>
                                        <Td textAlign="center">
                                          <Badge
                                            colorScheme={getRatingColor(getAggregateRating(claimCheck.ratings))}
                                            fontSize="md"
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            gap="2"
                                            whiteSpace="normal"
                                          >
                                            {getRatingIcon(getAggregateRating(claimCheck.ratings))}
                                            <Text as="span" fontSize="sm">
                                              {getAggregateRating(claimCheck.ratings)}
                                            </Text>
                                          </Badge>
                                        </Td>
                                        <Td textAlign="center">{formatDate(claimCheck.date)}</Td>
                                        <Td textAlign="center">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Button
                                              size="sm"
                                              onClick={() =>
                                                navigate(`/profile/claim-check-results/${claimCheck.id}`, {
                                                  state: { claimCheck },
                                                })
                                              }
                                            >
                                              Results
                                            </Button>
                                          </motion.div>
                                        </Td>
                                        <Td textAlign="center">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Button size="sm" color={primaryColor} onClick={() => handleDeleteClaimCheck(claimCheck)}>
                                              <FaTrashAlt />
                                            </Button>
                                          </motion.div>
                                        </Td>
                                      </motion.tr>
                                    ))}
                                  </AnimatePresence>
                                </Tbody>
                              </Table>
                            </Box>
                          </>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Flex align="center" justify="center" direction="column" h={{ base: "auto", md: "15vh" }} mb={{ base: "4", md: "0" }}>
                              <WarningIcon boxSize="6" color="gray.500" mb="2" />
                              <Text fontSize="lg" color="gray.500" textAlign="center">
                                No claims checks found.
                              </Text>
                              <Text fontSize="md" color="gray.400" textAlign="center">
                                Start verifying claims with FactGuard Verify by evaluating their reliability using trusted sources and robust fact-checking methods.
                              </Text>
                            </Flex>
                          </motion.div>
                        )}
                        {/* Powered by Google Fact Check Tools API*/}
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
                      </Box>
                  </motion.div>
                </Flex>
              }
            />
            <Route
              path="/start-new-detection"
              element={<StartNewDetection addDetection={addDetection}/>}
              />
            <Route
              path="/my-news-detections"
              element={
                <MyNewsDetections
                  detections={detections}
                  deleteDetection={deleteDetection}
                />
              }
            />
            <Route path="/detection-results/:id" element={<DetectionResults />} />
            <Route
              path="/start-new-claim-check"
              element={<StartNewClaimCheck addClaimCheck={addClaimCheck}/>}
              />
            <Route
              path="/my-claim-checks"
              element={
                <MyClaimChecks
                  claimChecks={claimChecks}
                  deleteClaimCheck={deleteClaimCheck}
                />
              }
            />
            <Route path="/claim-check-results/:id" element={<ClaimCheckResults />} />
            <Route path="/account-details" element={<AccountDetails />} />
            <Route
              path="*"
              element={
                <Flex flex="1" justify="center" align="center" flexDirection="column" height="100%">
                  <NotFound buttonText="Go Back to Dashboard" redirectPath="/profile" />
                </Flex>
              }
            />
          </Routes>

          {/* Logout Confirmation Modal */}
          <Modal isOpen={isLogoutModalOpen} onClose={onLogoutModalClose} isCentered>
            <ModalOverlay />
              <ModalContent
                width={{ base: "90%"}}
              >
              <ModalHeader>Confirm Logout</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to log out of your account?
              </ModalBody>
              <ModalFooter>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button colorScheme="red" mr={3} onClick={confirmLogout}>
                    Logout
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button onClick={onLogoutModalClose}>
                    Cancel
                  </Button>
                </motion.div>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Detections Confirmation Modal */}
          <Modal isOpen={isDetectionModalOpen} onClose={onDetectionModalClose} isCentered>
            <ModalOverlay />
              <ModalContent
                width={{ base: "90%"}}
              >
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {detectionToDelete
                  ? "Are you sure you want to delete this detection?"
                  : "Are you sure you want to delete the selected detections?"}
              </ModalBody>
              <ModalFooter>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button colorScheme="red" mr={3} onClick={confirmDeleteDetection}>
                    Delete
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button onClick={onDetectionModalClose}>
                    Cancel
                  </Button>
                </motion.div>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Claim Checks Confirmation Modal */}
          <Modal isOpen={isClaimModalOpen} onClose={onClaimModalClose} isCentered>
            <ModalOverlay />
              <ModalContent
                width={{ base: "90%"}}
              >
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {claimCheckToDelete
                  ? "Are you sure you want to delete this claim check?"
                  : "Are you sure you want to delete the selected claim checks?"}
              </ModalBody>
              <ModalFooter>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button colorScheme="red" mr={3} onClick={confirmDeleteClaimCheck}>
                    Delete
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button onClick={onClaimModalClose}>
                    Cancel
                  </Button>
                </motion.div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </>
  );
};

export default Profile;