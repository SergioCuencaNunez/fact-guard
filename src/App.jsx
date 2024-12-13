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
  VStack,
  HStack,
  Text,
  Grid,
  GridItem,
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
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import logoBright from './assets/logo-main-bright.png';
import logoDark from './assets/logo-main-dark.png';
import { FiLogIn, FiUserPlus } from 'react-icons/fi'; // Icons for Login and Sign Up

const Navbar = () => {
  const logo = useColorModeValue(logoBright, logoDark);
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const loginIconBg = useColorModeValue('gray.100', 'gray.700');
  const loginIconHoverBg = useColorModeValue('gray.200', 'gray.600');
  const loginIconActiveBg = useColorModeValue('gray.300', 'gray.500');

  return (
    <Box bg={bg} color={textColor} shadow="sm" px={{ base: '4', md: '8' }} py="3" position="sticky" top="0" zIndex="1000">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="FactGuard Logo" style={{ height: '50px', width: 'auto', cursor: 'pointer' }} />
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
              _hover={{ bg: loginIconHoverBg }}
              _active={{ bg: loginIconActiveBg }}
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
              bg={useColorModeValue('teal.400', 'teal.300')}
              color="white"
              _hover={{
                bg: useColorModeValue('teal.500', 'teal.400'),
              }}
              _active={{
                bg: useColorModeValue('teal.600', 'teal.500'),
              }}
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
              _hover={{ bg: loginIconHoverBg }}
              _active={{ bg: loginIconActiveBg }}
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
              bg={useColorModeValue('teal.400', 'teal.300')}
              color={useColorModeValue('white', 'gray.100')}
              _hover={{
                bg: useColorModeValue('teal.500', 'teal.400'),
              }}
              _active={{
                bg: useColorModeValue('teal.600', 'teal.500'),
              }}
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

// Home Page
const Home = () => {
  const boxBg = useColorModeValue('white', 'gray.700');
  const boxColor = useColorModeValue('black', 'white');

  return (
    <VStack spacing="10" py="10" px="5" maxW="1200px" mx="auto">
      <Heading>Welcome to Fact Guard</Heading>
      <Text>Discover the truth with AI-powered detection and verification.</Text>
      <Grid templateColumns={{ base: '1fr', sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} w="100%">
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">Detect Fake News</Heading>
            <Text mb="4">Paste or upload articles to analyze their authenticity.</Text>
            <Link to="/detect">
              <Button colorScheme="blue">Analyze</Button>
            </Link>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">Verify Claims</Heading>
            <Text mb="4">Input statements and get instant verification results.</Text>
            <Link to="/verify">
              <Button colorScheme="green">Verify</Button>
            </Link>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">Insights Dashboard</Heading>
            <Text mb="4">Track your analysis history and generate insights.</Text>
            <Link to="/insights">
              <Button colorScheme="purple">View Insights</Button>
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </VStack>
  );
};

const AuthLayout = ({ children, title, subtitle }) => {
  const boxBg = useColorModeValue('white', 'gray.700');
  const boxColor = useColorModeValue('black', 'white');
  const bg = useColorModeValue('teal.400', '#2a8073');

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh">
      {/* Left Section with Additional Content */}
      <Box
        flex="1"
        display={{ base: 'none', md: 'flex' }}
        flexDirection="column"
        justifyContent="center"
        bg={bg}
        px={{md: '100' }}
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
      px={{ base: '4', md: '8' }}
      maxW="1200px"
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
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;