import React, { useState } from 'react';
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
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import theme from './theme';
import Detect from './pages/Detect';
import Verify from './pages/Verify';
import About from './pages/About';
import Footer from './components/Footer';

const Navbar = () => {
  const logo = useColorModeValue('/logo-main-bright.png', '/logo-main-dark.png');
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box bg={bg} color={textColor} shadow="sm" px={{ base: '4', md: '8' }} py="3">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <img src={logo} alt="FactGuard Logo" style={{ height: '25px', width: 'auto' }} />

        {/* Links for larger screens */}
        <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
          <Link to="/">Home</Link>
          <Link to="/detect">Detect</Link>
          <Link to="/verify">Verify</Link>
          <Link to="/about">About</Link>
          <DarkModeSwitch />
        </HStack>

        {/* Hamburger Menu and Dark Mode Toggle for smaller screens */}
        <HStack spacing="2" display={{ base: 'flex', md: 'none' }}>
          {/* Dark Mode Toggle */}
          <DarkModeSwitch />

          {/* Hamburger Menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              aria-label="Toggle Navigation"
              size="md"
            />
            <MenuList>
              <MenuItem as={Link} to="/">
                Home
              </MenuItem>
              <MenuItem as={Link} to="/detect">
                Detect
              </MenuItem>
              <MenuItem as={Link} to="/verify">
                Verify
              </MenuItem>
              <MenuItem as={Link} to="/about">
                About
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

// Dark Mode Toggle
const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
      <Heading>Welcome to FactGuard</Heading>
      <Text>Discover the truth with AI-powered detection and verification.</Text>
      <Grid templateColumns={{ base: '1fr', sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} w="100%">
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">
              Detect Fake News
            </Heading>
            <Text mb="4">Paste or upload articles to analyze their authenticity.</Text>
            <Button colorScheme="blue">Analyze</Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">
              Verify Claims
            </Heading>
            <Text mb="4">Input statements and get instant verification results.</Text>
            <Button colorScheme="green">Verify</Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">
              Insights Dashboard
            </Heading>
            <Text mb="4">Track your analysis history and generate insights.</Text>
            <Button colorScheme="purple">View Insights</Button>
          </Box>
        </GridItem>
      </Grid>
    </VStack>
  );
};

// App Component
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex direction="column" minH="100vh">
          <Navbar />
          <Box
            flex="1"
            py="10"
            px="5"
            maxW="1200px"
            mx="auto"
            w="100%"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detect" element={<Detect />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
