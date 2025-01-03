import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  VStack,
  HStack,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { motion } from "framer-motion";

import theme from './theme';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Home from './components/Home';
import Detect from './pages/Detect';
import Verify from './pages/Verify';
import logoBright from './assets/logo-main-bright.png';
import logoDark from './assets/logo-main-dark.png';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const Navbar = () => {
  const logo = useColorModeValue(logoBright, logoDark);
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const loginIconBg = useColorModeValue('gray.100', 'gray.700');
  const loginHoverBg = useColorModeValue('gray.200', 'gray.600');
  const loginActiveBg = useColorModeValue('gray.300', 'gray.500');
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const logoHeight = useBreakpointValue({ base: '45px', md: '50px' });
  const gradient = 'linear(to-r, #2a8073, #3ca790, #4dcfaf)';

  return (
    <Box
      bg={bg}
      color={textColor}
      shadow="sm"
      px={{ base: '6', md: '12' }}
      py="4"
      position="sticky"
      top="0"
      zIndex="1000"
      _after={{
        content: '""',
        display: 'block',
        height: '3px',
        backgroundImage: gradient,
        width: '100%',
        position: 'absolute',
        bottom: '0',
        left: '0',
      }}
    >
      <Flex justify="space-between" align="center" mx="auto" w="100%" px={{ base: '0', custom: '5' }}>
        {/* Logo */}
        <Link to="/">
          <motion.img
            src={logo}
            alt="FactGuard Logo"
            style={{ height: logoHeight, width: 'auto', cursor: 'pointer' }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          />
        </Link>
        
        {/* Buttons, About, and Features Dropdown for larger screens */}      
        <HStack spacing="4" display={{ base: 'none', md: 'none', lg: 'flex' }}>
          <Menu>
            <MenuButton
              as={Button}
              bg="transparent"
              color={textColor}
              _hover={{ color: hoverColor }}
              size="md"
              rightIcon={<ChevronDownIcon />}
            >
              Features
            </MenuButton>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <MenuList>
                <MenuItem as={Link} to="/detect">Fake News Detection</MenuItem>
                <MenuItem as={Link} to="/verify">Verify Claims</MenuItem>
              </MenuList>
            </motion.div>
          </Menu>
          <Link to="/about">
            <Button
              bg="transparent"
              color={textColor}
              _hover={{ color: hoverColor }}
              size="md"
            >
              About
            </Button>
          </Link>
          <a
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                bg={loginIconBg}
                color={textColor}
                _hover={{ bg: loginHoverBg }}
                _active={{ bg: loginActiveBg }}
                size="md"
              >
                Login
              </Button>
            </motion.div>
          </a>
          <a
            href="/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                bg={primaryColor}
                color="white"
                _hover={{ bg: hoverColor }}
                _active={{ bg: activeColor }}
                size="md"
              >
                Sign Up
              </Button>
            </motion.div>
          </a>
          <DarkModeSwitch />
        </HStack>

        {/* Icons for smaller screens */}
        <HStack spacing="2" display={{ base: 'flex', md: 'flex', lg:'none'}}>
          <a
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              icon={<FiLogIn />}
              aria-label="Login"
              bg={loginIconBg}
              _hover={{ bg: hoverColor }}
              _active={{ bg: activeColor }}
              size="md"
            />
          </a>
          <a
            href="/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              icon={<FiUserPlus />}
              aria-label="Sign Up"
              bg={primaryColor}
              color={useColorModeValue('white', 'gray.100')}
              _hover={{ bg: hoverColor }}
              _active={{ bg: activeColor }}
              size="md"
            />
          </a>

          {/* Hamburger Menu for smaller screens */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              aria-label="Toggle Navigation"
              size="md"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <MenuList>
                <MenuItem as={Link} to="/detect">Fake News Detection</MenuItem>
                <MenuItem as={Link} to="/verify">Verify Claims</MenuItem>
                <MenuItem as={Link} to="/about">About</MenuItem>
              </MenuList>
            </motion.div>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

// Dark Mode Toggle with System Default Detection
const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();

  // Detect system color mode on initial load
  useEffect(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setColorMode(systemPreference);
  }, [setColorMode]);

  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      aria-label="Toggle Dark Mode"
      onClick={toggleColorMode}
      size="md"
    />
  );
};

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
        px={{ md: '100' }}
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
                    Use our advanced tools to verify claims instantly and combat misinformation effectively.
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

// App Component
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          {/* Auth Routes (SignUp and Login with AuthLayout) */}
          <Route
            path="/signup"
            element={
              <AuthLayout
                title="Welcome to FactGuard"
                subtitle="Register now and gain access to powerful tools to verify claims and combat misinformation."
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
          {/* Default Routes */}
          <Route
            path="*"
            element={
              <DefaultLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/detect" element={<Detect />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DefaultLayout>
            }
          />
          <Route
            path="/profile/*"
            element={<Profile />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
