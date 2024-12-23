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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  FaUser,
  FaNewspaper,
  FaShieldAlt,
  FaSignOutAlt,
  FaPlus,
  FaChartBar,
  FaCogs,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });

  const bg = useColorModeValue("gray.50", "gray.800");
  const sidebarBg = useColorModeValue("purple.700", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("white", "gray.200");
  const primaryColor = "#4dcfaf";
  const logo = useColorModeValue(logoBright, logoDark);

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

  return (
    <Flex direction={{ base: "column", md: "row" }} minH="100vh" bg={bg}>
      {/* Sidebar */}
      <Box w="275px" bg={sidebarBg} color={textColor} p="6">
        <VStack align="stretch" spacing="6">
          <img src={logo} alt="FactGuard Logo" style={{ height: "50px" }} />
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FaNewspaper />}
              rightIcon={<FaChevronDown />}
              justifyContent="flex-start"
              bg="transparent"
              _hover={{ bg: "gray.600" }}
              size="sm"
            >
              Detect Fake News
            </MenuButton>
            <MenuList bg={sidebarBg}>
              <MenuItem icon={<FaPlus />} color={textColor} _hover={{ bg: "gray.600" }}>
                Start New Detection
              </MenuItem>
              <MenuItem color={textColor} _hover={{ bg: "gray.600" }}>
                My News Detections
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FaShieldAlt />}
              rightIcon={<FaChevronDown />}
              justifyContent="flex-start"
              bg="transparent"
              _hover={{ bg: "gray.600" }}
              size="sm"
            >
              Verify Claims
            </MenuButton>
            <MenuList bg={sidebarBg}>
              <MenuItem icon={<FaPlus />} color={textColor} _hover={{ bg: "gray.600" }}>
                Start New Claim Check
              </MenuItem>
              <MenuItem color={textColor} _hover={{ bg: "gray.600" }}>
                My Claim Checks
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FaCogs />}
              rightIcon={<FaChevronDown />}
              justifyContent="flex-start"
              bg="transparent"
              _hover={{ bg: "gray.600" }}
              size="sm"
            >
              Settings
            </MenuButton>
            <MenuList bg={sidebarBg}>
              <MenuItem color={textColor} _hover={{ bg: "gray.600" }}>
                Account Details
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            leftIcon={<FaSignOutAlt />}
            colorScheme="red"
            variant="solid"
            onClick={handleLogout}
            size="sm"
          >
            Logout
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p="8">
        <Heading mb="4">Welcome, {user.username}</Heading>
        <Box borderBottom="2px" borderColor="gray.300" mb="4"></Box>

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
