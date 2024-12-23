import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  FaUser,
  FaNewspaper,
  FaShieldAlt,
  FaSignOutAlt,
  FaPlus,
  FaChartBar,
  FaCogs,
  FaTasks,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const sidebarBgColor = '#c9ebdf';
const avatarBgColor = '#3ca790';
const gradient = "linear-gradient(to bottom, #2a8073, #3ca790, #4dcfaf)";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });
  const [openDropdown, setOpenDropdown] = useState(null);

  const logo = useColorModeValue(logoBright, logoDark);
  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.200", "gray.600");
  const activeBg = useColorModeValue('gray.300', 'gray.500');
  const textColor = useColorModeValue('black', 'white');
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const logoHeight = useBreakpointValue({ base: '45px', md: '50px' });

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5001/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setUser({ username: data.username, email: data.email });
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} minH="100vh" bg={bg}>
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "275px" }}
        bg={sidebarBgColor}
        p="6"
        shadow="lg"
        position={{ base: "relative", md: "sticky" }}
        top="0"
        h={{ base: "auto", md: "100vh" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderRightWidth="3px"
        borderRightStyle="solid"
        borderRightColor="transparent"
        style={{ borderImage: gradient, borderImageSlice: 1 }}
      >
        <VStack spacing="8" align="flex-start">
          <HStack mb="4">
            <img src={logo} alt="FactGuard Logo" style={{ height: logoHeight, width: "auto" }} />
          </HStack>
          <HStack>
            <Avatar name={user.username} size="lg" bg={avatarBgColor} />
            <Box>
              <Text fontWeight="bold" isTruncated>{user.username}</Text>
              <Text fontSize="sm" color="gray.500" isTruncated>
                {user.email}
              </Text>
            </Box>
          </HStack>
          <VStack spacing="4" align="stretch">
            <Button
              leftIcon={<FaChartBar />}
              variant="ghost"
              justifyContent="flex-start"
              _hover={{ bg: hoverBg }}
              _active={{ bg: activeBg }}
              size={{ base: "sm", md: "md" }}
              color={textColor}
            >
              Dashboard
            </Button>
            <Box>
              <Button
                leftIcon={<FaNewspaper />}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                justifyContent="flex-start"
                _hover={{ bg: hoverBg }}
                _active={{ bg: activeBg }}
                size={{ base: "sm", md: "md" }}
                onClick={() => toggleDropdown("detect")}
                color={textColor}
              >
                Detect Fake News
              </Button>
              {openDropdown === "detect" && (
                <VStack align="stretch" pl="4" mt="2">
                  <Button
                    leftIcon={<FaPlus />}
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    _hover={{ color: hoverColor }}
                    color={textColor}
                  >
                    Start New Detection
                  </Button>
                  <Button
                    leftIcon={<FaTasks />}
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    _hover={{ color: hoverColor }}
                    color={textColor}
                  >
                    My News Detections
                  </Button>
                </VStack>
              )}
            </Box>
            <Box>
              <Button
                leftIcon={<FaShieldAlt />}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                justifyContent="flex-start"
                _hover={{ bg: hoverBg }}
                _active={{ bg: activeBg }}
                size={{ base: "sm", md: "md" }}
                onClick={() => toggleDropdown("verify")}
                color={textColor}
              >
                Verify Claims
              </Button>
              {openDropdown === "verify" && (
                <VStack align="stretch" pl="4" mt="2">
                  <Button
                    leftIcon={<FaPlus />}
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    _hover={{ color: hoverColor }}
                    color={textColor}
                  >
                    Start New Claim Check
                  </Button>
                  <Button
                    leftIcon={<FaTasks />}
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    _hover={{ color: hoverColor }}
                    color={textColor}
                  >
                    My Claim Checks
                  </Button>
                </VStack>
              )}
            </Box>
            <Box>
              <Button
                leftIcon={<FaCogs />}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                justifyContent="flex-start"
                _hover={{ bg: hoverBg }}
                _active={{ bg: activeBg }}
                size={{ base: "sm", md: "md" }}
                onClick={() => toggleDropdown("settings")}
                color={textColor}
              >
                Settings
              </Button>
              {openDropdown === "settings" && (
                <VStack align="stretch" pl="4" mt="2">
                  <Button
                    leftIcon={<FaUser />}
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    _hover={{ color: hoverColor }}
                    color={textColor}
                  >
                    Account Details
                  </Button>
                </VStack>
              )}
            </Box>
          </VStack>
        </VStack>
        <Button
            leftIcon={<FaSignOutAlt />}
            colorScheme="red"
            variant="solid"
            onClick={handleLogout}
            size={{ base: "sm", md: "md" }}
          >
            Logout
          </Button>
      </Box>

      {/* Main Content */}
      <Box flex="1" p="8">
        <Heading mb="4">Welcome, {user.username}</Heading>
        <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>

        {/* Features */}
        <Flex wrap="wrap" gap="6">
          <Box bg={cardBg} p="6" borderRadius="md" flex="1">
            <Heading size="sm">Detect AI Content</Heading>
            <Text>Use tools to detect AI-generated content or plagiarism.</Text>
          </Box>
          <Box bg={cardBg} p="6" borderRadius="md" flex="1">
            <Heading size="sm">API Integration</Heading>
            <Text>Integrate FactGuard APIs into your workflow.</Text>
          </Box>
          <Box bg={cardBg} p="6" borderRadius="md" flex="1">
            <Heading size="sm">Team Management</Heading>
            <Text>Invite team members and manage shared credits.</Text>
          </Box>
        </Flex>

        {/* Graphs Section */}
        <Heading size="md" my="6">This Week</Heading>
        <Flex wrap="wrap" gap="6">
          <Box bg={cardBg} p="6" borderRadius="md" flex="1">
            <Heading size="sm">Detections Over Time</Heading>
            <Text>Graph Placeholder</Text>
          </Box>
          <Box bg={cardBg} p="6" borderRadius="md" flex="1">
            <Heading size="sm">Claim Checks</Heading>
            <Text>Graph Placeholder</Text>
          </Box>
          <Box bg={cardBg} p="6" borderRadius="md" flex="1">
            <Heading size="sm">Usage Statistics</Heading>
            <Text>Graph Placeholder</Text>
          </Box>
        </Flex>

        {/* Recent Content Section */}
        <Heading size="md" my="6">Recent Detections</Heading>
        <Box bg={cardBg} p="4" borderRadius="md">
          <Flex justify="space-between" borderBottom="1px solid" pb="2" mb="4">
            <Text>Title</Text>
            <Text>Date</Text>
          </Flex>
          <VStack align="stretch">
            <Flex justify="space-between">
              <Text>"Detection 1"</Text>
              <Text>12/22/2024</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>"Detection 2"</Text>
              <Text>12/20/2024</Text>
            </Flex>
          </VStack>
        </Box>

        <Heading size="md" my="6">Claim Checks</Heading>
        <Box bg={cardBg} p="4" borderRadius="md">
          <Flex justify="space-between" borderBottom="1px solid" pb="2" mb="4">
            <Text>Claim</Text>
            <Text>Date</Text>
          </Flex>
          <VStack align="stretch">
            <Flex justify="space-between">
              <Text>"Claim 1"</Text>
              <Text>12/22/2024</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>"Claim 2"</Text>
              <Text>12/20/2024</Text>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Profile;
