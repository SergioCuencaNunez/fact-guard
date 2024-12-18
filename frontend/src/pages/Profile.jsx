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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaUser, FaNewspaper, FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "Admin", email: "admin@example.com" });

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.200", "gray.600");
  const primaryColor = "#4dcfaf";

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Flex minH="100vh" bg={bg}>
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "250px" }}
        bg={cardBg}
        p="6"
        shadow="lg"
        position="sticky"
        top="0"
        h="100vh"
      >
        <VStack spacing="8" align="flex-start">
          <Heading size="md" color={primaryColor}>
            Dashboard
          </Heading>
          <HStack>
            <Avatar name={user.username} size="lg" />
            <Box>
              <Text fontWeight="bold">{user.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {user.email}
              </Text>
            </Box>
          </HStack>
          <VStack spacing="4" align="stretch">
            <Button
              leftIcon={<FaUser />}
              variant="ghost"
              justifyContent="flex-start"
              _hover={{ bg: hoverBg }}
            >
              Profile
            </Button>
            <Button
              leftIcon={<FaNewspaper />}
              variant="ghost"
              justifyContent="flex-start"
              _hover={{ bg: hoverBg }}
            >
              Detect Fake News
            </Button>
            <Button
              leftIcon={<FaShieldAlt />}
              variant="ghost"
              justifyContent="flex-start"
              _hover={{ bg: hoverBg }}
            >
              Verify Claims
            </Button>
          </VStack>
          <Button
            leftIcon={<FaSignOutAlt />}
            colorScheme="red"
            variant="solid"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p="8">
        <Tabs variant="enclosed">
          <TabList mb="4">
            <Tab _selected={{ color: primaryColor, borderColor: primaryColor }}>
              Profile Data
            </Tab>
            <Tab _selected={{ color: primaryColor, borderColor: primaryColor }}>
              Detect
            </Tab>
            <Tab _selected={{ color: primaryColor, borderColor: primaryColor }}>
              Verify
            </Tab>
          </TabList>
          <TabPanels>
            {/* Profile Data */}
            <TabPanel>
              <Heading size="lg" mb="4">
                Your Profile
              </Heading>
              <Box bg={cardBg} p="6" borderRadius="md" shadow="sm">
                <Text mb="2">
                  <strong>Username:</strong> {user.username}
                </Text>
                <Text mb="2">
                  <strong>Email:</strong> {user.email}
                </Text>
                <Text>
                  <strong>Role:</strong> Admin
                </Text>
              </Box>
            </TabPanel>

            {/* Detect Page */}
            <TabPanel>
              <Heading size="lg" mb="4">
                Detect Fake News
              </Heading>
              <Box bg={cardBg} p="6" borderRadius="md" shadow="sm">
                <Text mb="4">
                  Enter or upload content to check for authenticity.
                </Text>
                <textarea
                  placeholder="Paste the article or text here..."
                  style={{
                    width: "100%",
                    height: "150px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid gray",
                    marginBottom: "20px",
                  }}
                ></textarea>
                <Button colorScheme="teal">Analyze</Button>
              </Box>
            </TabPanel>

            {/* Verify Page */}
            <TabPanel>
              <Heading size="lg" mb="4">
                Verify Claims
              </Heading>
              <Box bg={cardBg} p="6" borderRadius="md" shadow="sm">
                <Text mb="4">
                  Input a claim or statement to verify its accuracy.
                </Text>
                <input
                  type="text"
                  placeholder="Enter a claim to verify..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid gray",
                    marginBottom: "20px",
                  }}
                />
                <Button colorScheme="teal">Verify</Button>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Profile;
