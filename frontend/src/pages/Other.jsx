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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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

        <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Detections</Heading>
        <Box bg={cardBg} p="4" borderRadius="md">
          <Table variant="simple" colorScheme="gray">
            <Thead>
              <Tr>
                <Th><b>Title</b></Th>
                <Th><b>Fake</b></Th>
                <Th><b>True</b></Th>
                <Th><b>Date</b></Th>
                <Th><b>Results</b></Th>
                <Th><b>Remove</b></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>"Detection 1"</Td>
                <Td>30%</Td>
                <Td>70%</Td>
                <Td>12/22/2024</Td>
                <Td><Button size="sm">Results</Button></Td>
                <Td><Button size="sm" colorScheme="red">🗑</Button></Td>
              </Tr>
              <Tr>
                <Td>"Detection 2"</Td>
                <Td>60%</Td>
                <Td>40%</Td>
                <Td>12/20/2024</Td>
                <Td><Button size="sm">Results</Button></Td>
                <Td><Button size="sm" colorScheme="red">🗑</Button></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Claim Checks</Heading>
        <Box bg={cardBg} p="4" borderRadius="md">
          <Table variant="simple" colorScheme="gray">
            <Thead>
              <Tr>
                <Th><b>Title</b></Th>
                <Th><b>Rating</b></Th>
                <Th><b>Link</b></Th>
                <Th><b>Date</b></Th>
                <Th><b>Results</b></Th>
                <Th><b>Remove</b></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>"Claim 1"</Td>
                <Td>True</Td>
                <Td><a href="#">Link</a></Td>
                <Td>12/22/2024</Td>
                <Td><Button size="sm">Results</Button></Td>
                <Td><Button size="sm" colorScheme="red">🗑</Button></Td>
              </Tr>
              <Tr>
                <Td>"Claim 2"</Td>
                <Td>False</Td>
                <Td><a href="#">Link</a></Td>
                <Td>12/20/2024</Td>
                <Td><Button size="sm">Results</Button></Td>
                <Td><Button size="sm" colorScheme="red">🗑</Button></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};

export default Profile;
