import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  useColorModeValue,
  VStack,
  Text,
} from '@chakra-ui/react';
import { motion } from "framer-motion";

import theme from './theme';

import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import AdminProfile from './pages/AdminProfile';
import Detect from './pages/Detect';
import Verify from './pages/Verify';

import NotFound from './pages/NotFound';
import AccessDenied from './pages/AccessDenied';

import Navbar from './components/Navbar'; 
import Home from './components/Home';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const AuthLayout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const boxBg = useColorModeValue('white', 'gray.700');
  const boxColor = useColorModeValue('black', 'white');
  const gradient = 'linear(to-r, #2a8073, #3ca790, #4dcfaf)';

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh">
      {/* Left Section with Additional Content */}
      <Box
        flex="1"
        display={{ base: 'none', md: 'flex' }}
        flexDirection="column"
        justifyContent="center"
        bgGradient={gradient} // Apply gradient background
        px={{ md: '50', lg: '100' }}
        py="10"
        maxW="50%"
        color="white"
      >
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Box>
              <Heading mb="4" textAlign="center">
                {title}
              </Heading>
              <Text fontSize="lg" mb="6" textAlign="center">
                {subtitle}
              </Text>
            </Box>

            {/* Cards Section */}
            <VStack spacing="6" align="center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ width: '100%' }}
              >
                <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md" w="full">
                  <Heading size="md" mb="2">Real-Time Fact Checking</Heading>
                  <Text mb="4">
                    Use our advanced tools to verify claims instantly and combat disinformation effectively.
                  </Text>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ width: '100%' }}
              >
              <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md" w="full">
                  <Heading size="md" mb="2">AI-Powered Insights</Heading>
                  <Text mb="4">
                    Harness the power of AI to analyze trends, detect fake news, and gain actionable insights.
                  </Text>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ width: '100%' }}
              >
                <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md" w="full">
                  <Heading size="md" mb="2">Built for Trust</Heading>
                  <Text mb="4">
                    A reliable platform designed to ensure authenticity and credibility in the information you consume.
                  </Text>
                </Box>
              </motion.div>
            </VStack>
          </motion.div>
          </Box>

          {/* Right Section with Form */}
          <Box
            flex="1"
            display="flex"
            justifyContent={{ base: 'flex-start', md: 'center' }}
            alignItems="center"
            px="8"
            py="10"
            maxW={{md: "50%"}}
          >
            {children}  
      </Box>
    </Flex>
  );
};

// Default Layout (with Navbar and Footer)
const DefaultLayout = ({ children }) => (
  <Flex direction="column" minH="100vh">
    <Navbar />
    <Box
      flex="1"
      py={{ base: '6', md: '12' }}
      px={{ base: '6', md: '12' }}
      mx="auto"
      w="100%"
    >
      {children}
    </Box>
    <Footer />
  </Flex>
);

// Not Found Layout (with Navbar and Footer)
const NotFoundLayout = ({ children }) => (
  <Flex direction="column" minH="100vh">
    <Navbar />
    <Box
      flex="1"
      display="flex"
      justifyContent="center"
      py={{ base: '6', md: '12' }}
      px={{ base: '6', md: '12' }}
      mx="auto"
      w="100%"
    >
      {children}
    </Box>
    <Footer />
  </Flex>
);

// Access Denied Layout (with Navbar and Footer)
const AccessDeniedLayout = ({ children }) => (
  <Flex direction="column" minH="100vh">
    <Navbar />
    <Box
      flex="1"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={{ base: '6', md: '12' }}
      px={{ base: '6', md: '12' }}
      mx="auto"
      w="100%"
    >
      {children}
    </Box>
    <Footer />
  </Flex>
);

// App Component
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes (SignUp and Login with AuthLayout) */}
          <Route
            path="/signup"
            element={
              <AuthLayout
                title="Welcome to FactGuard"
                subtitle="Register now and gain access to powerful tools to verify claims and combat disinformation."
              >
                <SignUp />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout
                title="Welcome Back"
                subtitle="Log in to access your dashboard and continue ensuring authenticity in the information you consume."
              >
                <Login />
              </AuthLayout>
            }
          />
          {/* Default Layout (For Main Pages) */}
          <Route
            path="/"
            element={<DefaultLayout><Home /></DefaultLayout>}
          />
          <Route
            path="/about"
            element={<DefaultLayout><About /></DefaultLayout>}
          />
          <Route
            path="/detect"
            element={<DefaultLayout><Detect /></DefaultLayout>}
          />
          <Route
            path="/verify"
            element={<DefaultLayout><Verify /></DefaultLayout>}
          />
          {/* Profile Route */}
          <Route path="/profile/*" element={<Profile />} />
          {/* Admin Profile Route */}
          <Route path="/admin/profile/*" element={<AdminProfile />} />
          {/* Not Found */}
          <Route
            path="*"
            element={<NotFoundLayout><NotFound /></NotFoundLayout>}
          />
          {/* Access Denied */}
          <Route
            path="/access-denied"
            element={<AccessDeniedLayout><AccessDenied /></AccessDeniedLayout>}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
