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
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#4dcfaf';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#77e4c4';
const primaryColor = '#4dcfaf';
const sidebarLight = '#c9ebdf';
const sidebarDark = '#0b7b6b';
const gradient = "linear-gradient(to bottom, #2a8073, #3ca790, #4dcfaf)";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });
  const [openDropdown, setOpenDropdown] = useState(null);

  const logo = useColorModeValue(logoBright, logoDark);
  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue('black', 'white');
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const logoHeight = useBreakpointValue({ base: '45px', md: '50px' });
  const sidebarBgColor = useColorModeValue(sidebarLight, sidebarDark);
  const avatarBgColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const textColorAvatar = useColorModeValue('gray.500', 'gray.300');

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
        py="6"
        px="6"
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
              <Text fontSize="sm" color={textColorAvatar} isTruncated>
                {user.email}
              </Text>
            </Box>
          </HStack>
          <VStack spacing="4" align="stretch">
            <Button
              leftIcon={<FaChartBar />}
              variant="ghost"
              justifyContent="flex-start"
              _hover={{ bg: hoverColor }}
              _active={{ bg: activeColor }}
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
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
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
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
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
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
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
        <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }}>Welcome, {user.username}</Heading>
        <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>

        {/* Features */}
        <Heading size="lg" mb="4">Recent Pages</Heading>
        <Flex wrap="wrap" gap="6">
          <Box bg={cardBg} p="6" borderRadius="md" flex="1" textAlign="center">
            <FaNewspaper size="50px" color={primaryColor} style={{ margin: "auto" }} />
            <Heading size="md" mt="4">Fake News Detection</Heading>
            <Text mt="2">FactGuard Detect makes use of an accurate DL model to detect fake news and identify misleading content.</Text>
          </Box>
          <Box bg={cardBg} p="6" borderRadius="md" flex="1" textAlign="center">
            <FaShieldAlt size="50px" color={primaryColor} style={{ margin: "auto" }} />
            <Heading size="md" mt="4">Claim Check</Heading>
            <Text mt="2">FactGuard Verify makes use of the API of Google FactCheck Claim Search to validate claims effectively and efficiently.</Text>
          </Box>
          <Box bg={cardBg} p="6" borderRadius="md" flex="1" textAlign="center">
            <FaUsers size="50px" color={primaryColor} style={{ margin: "auto" }} />
            <Heading size="md" mt="4">Team Management</Heading>
            <Text mt="2">Invite other people to use FactGuard and collaborate in detecting and preventing misinformation.</Text>
          </Box>
        </Flex>

        {/* Graphs Section */}
        <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">This Week</Heading>
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
        <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Detections</Heading>
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

        <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Claim Checks</Heading>
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
