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
  Textarea,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
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
import { useNavigate, Routes, Route, Link } from "react-router-dom";
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

const StartNewDetection = () => {
  const logo = useColorModeValue('/logo-detect-bright.png', '/logo-detect-dark.png');
  return (
    <Box>
      <Flex justify="space-between" align="center" mb="4">
        <Heading>Detect Fake News</Heading>
        <Flex direction="column" align="center">
          <img src={logo} alt="Detect Logo" style={{ height: '50px', width: 'auto' }} />
        </Flex>
      </Flex>
      <Text mb="4">Paste or upload a news article to analyze its authenticity:</Text>
      <Textarea placeholder="Paste your article here..." mb="4" />
      <Text mb="2">Confidence Threshold:</Text>
      <Slider defaultValue={50} min={0} max={100} step={5} mb="4">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button colorScheme="teal">Analyze</Button>
    </Box>
  );
};

const MyNewsDetections = () => {
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');
  const textColorAvatar = useColorModeValue('gray.500', 'gray.300');
  return (
    <Box>
      <Heading mb="4">My News Detections</Heading>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr borderBottom={`2px solid ${tableBorderColor}`}>
            <Th width="25%" color={textColorAvatar}><b>Title</b></Th>
            <Th width="15%" color={textColorAvatar}><b>Fake (%)</b></Th>
            <Th width="15%" color={textColorAvatar}><b>True (%)</b></Th>
            <Th width="15%" color={textColorAvatar}><b>Date</b></Th>
            <Th width="15%" color={textColorAvatar}><b>Status</b></Th>
            <Th width="15%" color={textColorAvatar}><b>Details</b></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>"Detection 1"</Td>
            <Td>30%</Td>
            <Td>70%</Td>
            <Td>12/22/2024</Td>
            <Td>Completed</Td>
            <Td><Button size="sm">View</Button></Td>
          </Tr>
          <Tr>
            <Td>"Detection 2"</Td>
            <Td>60%</Td>
            <Td>40%</Td>
            <Td>12/20/2024</Td>
            <Td>Pending</Td>
            <Td><Button size="sm">View</Button></Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });
  const [openDropdown, setOpenDropdown] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const logo = useColorModeValue(logoBright, logoDark);
  const bg = useColorModeValue("gray.50", "gray.800");
  const sidebarBgColor = useColorModeValue(sidebarLight, sidebarDark);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} minH="100vh" bg={bg}>
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
            <img src={logo} alt="FactGuard Logo" style={{ height: '50px', width: "auto" }} />
          </HStack>
          <Button
            variant="ghost"
            justifyContent="space-between"
            onClick={() => navigate("/profile/start-new-detection")}
            size="md"
            color="white"
          >
            Start New Detection
          </Button>
          <Button
            variant="ghost"
            justifyContent="space-between"
            onClick={() => navigate("/profile/my-news-detections")}
            size="md"
            color="white"
          >
            My News Detections
          </Button>
          <Button
            leftIcon={<FaSignOutAlt />}
            colorScheme="red"
            variant="solid"
            onClick={handleLogout}
            size="md"
            width="100%"
          >
            Logout
          </Button>
        </VStack>
      </Box>
      <Box flex="1" p="8">
        <Routes>
          <Route path="/start-new-detection" element={<StartNewDetection />} />
          <Route path="/my-news-detections" element={<MyNewsDetections />} />
          <Route path="/" element={<Heading>Welcome to the Dashboard</Heading>} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default Profile;
