import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import theme from './theme';
import Detect from './pages/Detect';
import Verify from './pages/Verify';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Home from './components/Home';
import logoBright from './assets/logo-main-bright.png';
import logoDark from './assets/logo-main-dark.png';
import { FiLogIn, FiUserPlus } from 'react-icons/fi'; // Icons for Login and Sign Up

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
      px={{ base: '6', md: '10' }}
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
      <Flex justify="space-between" align="center" maxW="1250px" mx="auto" w="100%">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="FactGuard Logo" style={{ height: logoHeight, width: 'auto', cursor: 'pointer' }} />
        </Link>
        {/* Links for larger screens */}
        <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
          <Link to="/">Home</Link>
          <Link to="/detect">Detect</Link>
          <Link to="/verify">Verify</Link>
          <Link to="/about">About</Link>
        </HStack>

        {/* Buttons for larger screens */}      
        <HStack spacing="4" display={{ base: 'none', md: 'flex' }}>
          <a
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              bg={loginIconBg}
              color={textColor}
              _hover={{ bg: loginHoverBg }}
              _active={{ bg: loginActiveBg }}
              size="md"
            >
              Login
            </Button>
          </a>
          <a
            href="/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              bg={primaryColor}
              color="white"
              _hover={{ bg: hoverColor }}
              _active={{ bg: activeColor }}
              size="md"
            >
              Sign Up
            </Button>
          </a>
          <DarkModeSwitch />
        </HStack>

        {/* Icons for smaller screens */}
        <HStack spacing="2" display={{ base: 'flex', md: 'none' }}>
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
            <MenuList>
              <MenuItem as={Link} to="/">Home</MenuItem>
              <MenuItem as={Link} to="/detect">Detect</MenuItem>
              <MenuItem as={Link} to="/verify">Verify</MenuItem>
              <MenuItem as={Link} to="/about">About</MenuItem>
            </MenuList>
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
        <Box>
          <Heading mb="4" textAlign="center">
            {title}
          </Heading>
          <Text fontSize="lg" mb="6" textAlign="center">
            {subtitle}
          </Text>
        </Box>

        {/* Cards Section */}
        <VStack spacing="6" align="start">
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md" w="full">
            <Heading size="md" mb="2">Real-Time Fact Checking</Heading>
            <Text mb="4">
              Use our advanced tools to verify claims instantly and combat misinformation effectively.
            </Text>
          </Box>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md" w="full">
            <Heading size="md" mb="2">AI-Powered Insights</Heading>
            <Text mb="4">
              Harness the power of AI to analyze trends, detect fake news, and gain actionable insights.
            </Text>
          </Box>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md" w="full">
            <Heading size="md" mb="2">Built for Trust</Heading>
            <Text mb="4">
              A reliable platform designed to ensure authenticity and credibility in the information you consume.
            </Text>
          </Box>
        </VStack>
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
      py={{ base: '6', md: '10' }}
      px={{ base: '6', md: '10' }}
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
          {/* Default Routes (Home, Detect, Verify, About, etc., with DefaultLayout) */}
          <Route
            path="*"
            element={
              <DefaultLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/detect" element={<Detect />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DefaultLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <DefaultLayout>
                <Profile />
              </DefaultLayout>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;