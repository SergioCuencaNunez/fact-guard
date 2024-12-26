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
import { SunIcon, MoonIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
import { useNavigate, Routes, Route } from "react-router-dom";
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';
import StartNewDetection from "./StartNewDetection";
import MyNewsDetections from "./MyNewsDetections";
import DetectionResults from "./DetectionResults";

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#4dcfaf';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#77e4c4';
const sidebarLight = '#c9ebdf';
const sidebarDark = '#0b7b6b';
const gradient = "linear-gradient(to bottom, #2a8073, #3ca790, #4dcfaf)";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });
  const [openDropdown, setOpenDropdown] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

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

  const getTextColor = (value, type) => {
    if (type === "percentage") {
      if (value >= 60) return "red.500";
      if (value >= 30) return "orange.500";
      return "green.500";
    }
    if (type === "rating") {
      return value === "True" ? "green.500" : "red.500";
    }
    return "black";
  };

  const getCurrentDate = () => {
    const now = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayName = dayNames[now.getDay()].slice(0, 3);
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
    return `${dayName} ${monthName} ${date}${dateSuffix}, ${year}`;
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

  const [detections, setDetections] = useState([]);

  useEffect(() => {
    const fetchDetections = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/detections", {
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
  const addDetection = async (detection) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5001/detections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(detection),
      });

      if (response.ok) {
        const newDetection = await response.json();
        setDetections((prev) => [...prev, newDetection]);
      } else {
        console.error("Failed to add detection.");
      }
    } catch (error) {
      console.error("Error adding detection:", error);
    }
  };

  // Delete a detection from server
  const deleteDetection = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5001/detections/${id}`, {
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detectionToDelete, setDetectionToDelete] = useState(null);

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
  
  return (
    <Flex direction={{ base: "column", md: "row" }} bg={bg}>
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "275px" }}
        bg={sidebarBgColor}
        px={{ base: "4", md: "6" }}
        py={{ base: "6", md: "10" }}      
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
        <VStack spacing="8" align="flex-start">
          <HStack justifyContent={{ base: "center", md: "flex-start" }} w="100%">
            <img src={logo} alt="FactGuard Logo" style={{ height: logoHeight, width: "auto" }} />
          </HStack>

          {/* User Info and Logout Button (Mobile only) */}
          <HStack
            display={{ base: "flex", md: "none" }}
            justifyContent="space-between"
            w="100%"
          >
            <HStack>
              <Avatar name={user.username} size="lg" bg={avatarBgColor} />
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
              onClick={handleLogout}
              size="sm"
            >
              <FaSignOutAlt />
            </Button>
          </HStack>

          {/* User Info (Desktop only) */}
          <HStack display={{ base: "none", md: "flex" }}>
            <Avatar name={user.username} size="lg" bg={avatarBgColor} />
            <Box>
              <Text fontWeight="bold" isTruncated>{user.username}</Text>
              <Text fontSize="sm" color={textColorAvatar} isTruncated>
                {user.email}
              </Text>
            </Box>
          </HStack>

          {/* Sidebar Buttons */}
          <VStack spacing="4" align="stretch" w="100%">
            <Button
              variant="ghost"
              justifyContent="space-between"
              _hover={{ bg: hoverColor }}
              _active={{ bg: activeColor }}
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
            <Box>
              <Button
                variant="ghost"
                justifyContent="space-between"
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
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
              {openDropdown === "detect" && (
                <VStack align="stretch" pl="4" mt="2">
                  <Button
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    _hover={{ color: hoverColor }}
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
              )}
            </Box>
            <Box>
              <Button
                variant="ghost"
                justifyContent="space-between"
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
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
              {openDropdown === "verify" && (
                <VStack align="stretch" pl="4" mt="2">
                  <Button
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    _hover={{ color: hoverColor }}
                    color={textColor}
                    width="100%"
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
                    color={textColor}
                    width="100%"
                  >
                    <HStack>
                      <FaTasks />
                      <Text>My Claim Checks</Text>
                    </HStack>
                  </Button>
                </VStack>
              )}
            </Box>
            <Box>
              <Button
                variant="ghost"
                justifyContent="space-between"
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
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
              {openDropdown === "settings" && (
                <VStack align="stretch" pl="4" mt="2">
                  <Button
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    _hover={{ color: hoverColor }}
                    color={textColor}
                    width="100%"
                  >
                    <HStack>
                      <FaUser />
                      <Text>Account Details</Text>
                    </HStack>
                  </Button>
                </VStack>
              )}
            </Box>
          </VStack>
        </VStack>
        
        {/* Logout Button (Desktop only) */}
        <HStack display={{ base: 'none', md: 'flex' }} mt='4'>
          <Button
            leftIcon={<FaSignOutAlt />}
            colorScheme="red"
            variant="solid"
            onClick={handleLogout}
            size={{ base: "sm", md: "md" }}
            width="100%"
          >
            Logout
          </Button>
        </HStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p="8" overflowY="auto">
        <Routes>
          <Route
            path="/"
            element={
              <Flex direction="column">
                <Flex justify="space-between" align="center">
                  <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }}>Welcome, {user.username}</Heading>
                  <HStack spacing="4" display={{ base: "none", md: "none", lg: "flex" }}>
                    <Text fontSize="sm" letterSpacing="wide" color={textColor}>{getCurrentDate()}</Text>
                    <IconButton
                      aria-label="Toggle theme"
                      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                      onClick={toggleColorMode}
                    />
                  </HStack>
                  <HStack spacing="4" display={{ base: "flex", md: "flex", lg: "none" }}>
                    <Text fontSize="sm" letterSpacing="wide" textAlign="right" color={textColor}>{getCurrentDate()}</Text>
                  </HStack>
                </Flex>
                <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>

                {/* Features */}
                <Heading size="lg" mb="4">Recent Pages</Heading>
                <Flex wrap="wrap" gap="6">
                  <Box bg={cardBg} p="5" borderRadius="md" flex="1" textAlign="center" shadow="md">
                    <FaNewspaper size="50px" color={primaryColor} style={{ margin: "auto" }} />
                    <Heading size="md" mt="4">Fake News Detection</Heading>
                    <Text mt="2">
                      {useBreakpointValue({
                        base: "Detect fake news using our DL model.",
                        md: "Detect fake news using our DL model.",
                        lg: "FactGuard Detect makes use of an accurate DL model to detect fake news and identify misleading content.",
                      })}
                    </Text>
                  </Box>
                  <Box bg={cardBg} p="5" borderRadius="md" flex="1" textAlign="center" shadow="md">
                    <FaShieldAlt size="50px" color={primaryColor} style={{ margin: "auto" }} />
                    <Heading size="md" mt="4">Claim Check</Heading>
                    <Text mt="2">
                      {useBreakpointValue({
                        base: "Validate claims with Google FactCheck API.",
                        md: "Validate claims with Google FactCheck API.",
                        lg: "FactGuard Verify makes use of the API of Google FactCheck Claim Search to validate claims effectively and efficiently.",
                      })}
                    </Text>
                  </Box>
                  <Box bg={cardBg} p="5" borderRadius="md" flex="1" textAlign="center" shadow="md">
                    <FaUsers size="50px" color={primaryColor} style={{ margin: "auto" }} />
                    <Heading size="md" mt="4">Team Management</Heading>
                    <Text mt="2">
                      {useBreakpointValue({
                        base: "Collaborate in detecting misinformation.",
                        md: "Invite other people and collaborate in detecting misinformation.",
                        lg: "Invite other people to use FactGuard and collaborate in detecting and preventing misinformation.",
                      })}
                    </Text>
                  </Box>
                </Flex>

                {/* Graphs Section */}
                <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">This Week</Heading>
                <Flex wrap="wrap" gap="6">
                  <Box bg={cardBg} p="5" borderRadius="md" flex="1" shadow="md">
                    <Heading size="sm">Detections Over Time</Heading>
                    <Text>Graph Placeholder</Text>
                  </Box>
                  <Box bg={cardBg} p="5" borderRadius="md" flex="1" shadow="md">
                    <Heading size="sm">Claim Checks</Heading>
                    <Text>Graph Placeholder</Text>
                  </Box>
                  <Box bg={cardBg} p="5" borderRadius="md" flex="1" shadow="md">
                    <Heading size="sm">Usage Statistics</Heading>
                    <Text>Graph Placeholder</Text>
                  </Box>
                </Flex>

                {/* Recent Content Section */}
                <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Detections</Heading>
                  <Box bg={cardBg} p="5" borderRadius="md" overflowX="auto" shadow="md">
                    {detections.length > 0 ? (
                      <>
                        <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                          <Thead>
                            <Tr>
                              <Th width="5%" textAlign="center"><b>ID</b></Th>
                              <Th width="30%" textAlign="left"><b>Title</b></Th>
                              <Th width="12.5%" textAlign="center"><b>Fake</b></Th>
                              <Th width="12.5%" textAlign="center"><b>True</b></Th>
                              <Th width="15%" textAlign="center"><b>Date</b></Th>
                              <Th width="15%" textAlign="center"><b>Results</b></Th>
                              <Th width="10%" textAlign="center"><b>Remove</b></Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {sortedDetections.slice(0, 5).map((detection) => (
                              <Tr key={detection.id}>
                                <Td textAlign="center">#{detection.id}</Td>
                                <Td textAlign="left">{detection.title}</Td>
                                <Td textAlign="center">
                                  <Text color={getTextColor(detection.fakePercentage || "70", "percentage")}>
                                    {detection.fakePercentage || "70%"}
                                  </Text>
                                </Td>
                                <Td textAlign="center">
                                  <Text color={getTextColor(detection.truePercentage || "30", "percentage")}>
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
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </>
                    ) : (
                      <Flex align="center" justify="center" h="60vh">
                        <Text fontSize="lg" color="gray.500" textAlign="center">
                          No detections found. Start detecting fake news with FactGuard Detect by analyzing news articles to identify and prevent misinformation. Get started now!
                        </Text>
                      </Flex>
                    )}
                  </Box>

                <Heading fontSize={{ base: '2xl', md: '3xl' }} my="6">Recent Claim Checks</Heading>
                <Box bg={cardBg} p="5" borderRadius="md" overflowX="auto" shadow="md">
                  <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"}>
                    <Thead>
                        <Tr>
                          <Th width="25%"><b>Title</b></Th>
                          <Th width="15%"><b>Rating</b></Th>
                          <Th width="15%"><b>Link</b></Th>
                          <Th width="15%"><b>Date</b></Th>
                          <Th width="15%"><b>Results</b></Th>
                          <Th width="15%"><b>Remove</b></Th>
                        </Tr>
                      </Thead>
                    <Tbody>
                      <Tr>
                        <Td>"Claim 1"</Td>
                        <Td><Text color={getTextColor("True", "rating")}>True</Text></Td>
                        <Td><a href="#">Link</a></Td>
                        <Td>12/22/2024</Td>
                        <Td><Button size="sm">Results</Button></Td>
                        <Td><Button size="sm" color={primaryColor}><FaTrashAlt /></Button></Td>
                        </Tr>
                      <Tr>
                        <Td>"Claim 2"</Td>
                        <Td><Text color={getTextColor("False", "rating")}>False</Text></Td>
                        <Td><a href="#">Link</a></Td>
                        <Td>12/20/2024</Td>
                        <Td><Button size="sm">Results</Button></Td>
                        <Td><Button size="sm" color={primaryColor}><FaTrashAlt /></Button></Td>
                        </Tr>
                    </Tbody>
                  </Table>
                </Box>
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
          <Route path="/detection-results" element={<DetectionResults />} />
        </Routes>
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
      </Box>
    </Flex>
  );
};

export default Profile;