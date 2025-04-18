import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  HStack,
  Button,
  IconButton,
  Avatar,
  Flex,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,

} from "@chakra-ui/react";
import {
  FaNewspaper,
  FaShieldAlt,
  FaUsers,
  FaUser,
  FaSignOutAlt,
  FaChartBar,
  FaCogs,
  FaTrashAlt,
} from "react-icons/fa";

import { SunIcon, MoonIcon, ChevronDownIcon, CheckCircleIcon, WarningIcon, WarningTwoIcon, InfoIcon } from "@chakra-ui/icons";

import { Helmet } from "react-helmet-async";
import { useNavigate, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

import AccountDetails from "./AccountDetails";
import NotFound from "../pages/NotFound"; 

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';
const sidebarLight = '#c9ebdf';
const sidebarDark = '#0b7b6b';
const gradient = "linear-gradient(to bottom, #2a8073, #3ca790, #4dcfaf)";

const AdminProfile = () => {
  const navigate = useNavigate();
  // For development only
  const BACKEND_URL = `${window.location.protocol}//${window.location.hostname}:5001`;

    // For production
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalDetections: 0,
    totalClaims: 0,
    recentUsers: [],
    recentDetections: [],
    recentClaims: [],
  });

  const [detections, setDetections] = useState([]);
  const [claimChecks, setClaimsChecks] = useState([]);

  const [user, setUser] = useState({ username: "", email: "" });
  const [openDropdown, setOpenDropdown] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const logo = useColorModeValue(logoBright, logoDark);
  const logoHeight = useBreakpointValue({ base: '45px', md: '50px' });
  
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
  
  const borderRight = useBreakpointValue({ base: "none", md: "solid" });
  const borderBottom = useBreakpointValue({ base: "solid", md: "none" });

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

  // Fetch admin data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/admin/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setOverview(data);
          setUser({ username: data.username, email: data.email });
          setDetections(data.detections || []);
          setClaimsChecks(data.claims || []);
        } else if (response.status === 403) {
          navigate("/access-denied", {
            state: {
              message: data.error || "Not authorized to access admin panel",
            },
          });
        } else {
          console.error("Failed to fetch admin data:", data.error);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        navigate("/login");
      }    
    };

    fetchAdminData();
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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("es-ES", options).replace(",", ""); // DD/MM/YYYY HH:MM
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    onUserModalOpen();
  };

  const [userToDelete, setUserToDelete] = useState(null);
  const {
    isOpen: isUserModalOpen,
    onOpen: onUserModalOpen,
    onClose: onUserModalClose,
  } = useDisclosure();

  const confirmDeleteUser = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`${BACKEND_URL}/admin/delete-user/${userToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.ok) {
        setOverview((prev) => ({
          ...prev,
          users: prev.users.filter((u) => u.id !== userToDelete.id),
          totalUsers: prev.totalUsers - 1,
        }));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete user:", errorData.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      onUserModalClose();
    }
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
        // Delete a single claim check
        await deleteClaimCheck(claimCheckToDelete.id);
      }
      onClaimModalClose();
    } catch (error) {
      console.error("Error deleting claim check(s):", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>FactGuard - Admin Profile</title>
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
            borderRight: borderRight,
            borderBottom: borderBottom,
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
                  onClick={() => navigate("/admin/profile")}
                >
                  <HStack w="100%" justifyContent="space-between">
                    <HStack>
                      <FaChartBar />
                      <Text>Dashboard</Text>
                    </HStack>
                  </HStack>
                </Button>
              </motion.div>
              
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
                          onClick={() => navigate("/admin/profile/account-details")}
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
          overflowY="auto"
        >
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
                  
                  {/* Admin Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Heading size="lg" mb="4">Admin Overview</Heading>
                    <Flex wrap="wrap" justify="space-between" gap="6">
                      {[
                        {
                          icon: <FaUsers size="50px" color={primaryColor} style={{ margin: "auto" }} />,
                          title: "Total Users",
                          value: overview?.totalUsers ?? "-",
                        },
                        {
                          icon: <FaNewspaper size="50px" color={primaryColor} style={{ margin: "auto" }} />,
                          title: "Total Detections",
                          value: overview?.totalDetections ?? "-",
                        },
                        {
                          icon: <FaShieldAlt size="50px" color={primaryColor} style={{ margin: "auto" }} />,
                          title: "Total Claims",
                          value: overview?.totalClaims ?? "-",
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
                            <Text fontSize="3xl" fontWeight="bold" mt="2" color={textColor}>
                              {item.value}
                            </Text>
                          </Box>
                        </motion.div>
                      ))}
                    </Flex>
                  </motion.div>

                  {/* Recent Content Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Users</Heading>
                      <Box bg={cardBg} p="5" borderRadius="md" overflowX="auto" shadow="md">
                      {Array.isArray(overview.users) && overview.users.length > 0 ? (
                          <>
                            <Box overflowX="auto">
                              <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                                <Thead>
                                  <Tr>
                                    <Th width="15%" textAlign="center"><b>ID</b></Th>
                                    <Th width="30%" textAlign="center"><b>Username</b></Th>
                                    <Th width="30%" textAlign="center"><b>Email</b></Th>
                                    <Th width="20%" textAlign="center"><b>Last Access</b></Th>
                                    <Th width="5%" textAlign="center"><b>Remove</b></Th>
                                  </Tr>
                                </Thead>
                                <Tbody as={motion.tbody}>
                                  <AnimatePresence>
                                    {overview.users.slice(0, 5).map((user) => (
                                      <motion.tr
                                        key={user.id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <Td textAlign="center">{user.id}</Td>
                                        <Td textAlign="center">{user.username}</Td>
                                        <Td textAlign="center">{user.email}</Td> 
                                        <Td textAlign="center">{formatDate(user.last_access)}</Td>
                                        <Td textAlign="center">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Button size="sm" color={primaryColor} onClick={() => handleDeleteUser(user)}>
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
                                No users have registered.
                              </Text>
                            </Flex>
                          </motion.div>
                        )}
                      </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Detections</Heading>
                      <Box bg={cardBg} p="5" borderRadius="md" overflowX="auto" shadow="md">
                        {Array.isArray(detections) && detections.length > 0 ? (
                          <>
                            <Box overflowX="auto">
                              <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                                <Thead>
                                  <Tr>
                                    <Th width="10%" textAlign="center"><b>Detection ID</b></Th>
                                    <Th width="55%" textAlign="center"><b>Title</b></Th>
                                    <Th width="10%" textAlign="center"><b>User ID</b></Th>
                                    <Th width="20%" textAlign="center"><b>Date</b></Th>
                                    <Th width="5%" textAlign="center"><b>Remove</b></Th>
                                  </Tr>
                                </Thead>
                                <Tbody as={motion.tbody}>
                                  <AnimatePresence>
                                    {detections.slice(0, 5).map((detection) => (
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
                                        <Td textAlign="center">{detection.user_id}</Td>
                                        <Td textAlign="center">{formatDate(detection.date)}</Td>
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
                                No detections have been made.
                              </Text>
                            </Flex>
                          </motion.div>
                        )}
                      </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Claims</Heading>
                      <Box bg={cardBg} p="5" borderRadius="md" overflowX="auto" shadow="md">
                        {Array.isArray(claimChecks) && claimChecks.length > 0 ? (
                          <>
                            <Box overflowX="auto">
                              <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                                <Thead>
                                  <Tr>
                                    <Th width="10%" textAlign="center"><b>Claim ID</b></Th>
                                    <Th width="55%" textAlign="center"><b>Query</b></Th>
                                    <Th width="10%" textAlign="center"><b>User ID</b></Th>
                                    <Th width="20%" textAlign="center"><b>Date</b></Th>
                                    <Th width="5%" textAlign="center"><b>Remove</b></Th>
                                  </Tr>
                                </Thead>
                                <Tbody as={motion.tbody}>
                                  <AnimatePresence>
                                    {claimChecks.slice(0, 5).map((claim) => (
                                      <motion.tr
                                        key={claim.id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <Td textAlign="center">#{claim.id}</Td>
                                        <Td textAlign="justify">{claim.query}</Td>
                                        <Td textAlign="center">{claim.user_id}</Td>
                                        <Td textAlign="center">{formatDate(claim.date)}</Td>
                                        <Td textAlign="center">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Button size="sm" color={primaryColor} onClick={() => handleDeleteClaimCheck(claim)}>
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
                                No claims checks have been made.
                              </Text>
                            </Flex>
                          </motion.div>
                        )}
                      </Box>
                  </motion.div>
                </Flex>
              }
            />
            <Route path="/account-details" element={<AccountDetails />} />
            <Route
              path="*"
              element={
                <Flex flex="1" justify="center" align="center" flexDirection="column" height="100%">
                  <NotFound buttonText="Go Back to Admin Dashboard" redirectPath="/admin/profile" />
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

          {/* Users Confirmation Modal */}
          <Modal isOpen={isUserModalOpen} onClose={onUserModalClose} isCentered>
            <ModalOverlay />
              <ModalContent
                width={{ base: "90%"}}
              >
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to delete user <b>{userToDelete?.username}</b> and all their data (claims and detections)?
              </ModalBody>
              <ModalFooter>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button colorScheme="red" mr={3} onClick={confirmDeleteUser}>
                    Delete
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button onClick={onUserModalClose}>
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

export default AdminProfile;