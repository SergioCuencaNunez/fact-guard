import React from 'react';
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
  Button,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import theme from './theme';
import Detect from './pages/Detect';
import Verify from './pages/Verify';
import About from './pages/About';
import Footer from './components/Footer';

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

// Navbar Component
const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  return (
    <Box bg={bg} color={textColor} shadow="sm" px="5" py="3">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Heading size="md" color="brand.600">
          FactGuard
        </Heading>
        <HStack spacing="5">
          <Link to="/">Home</Link>
          <Link to="/detect">Detect</Link>
          <Link to="/verify">Verify</Link>
          <Link to="/about">About</Link>
          <DarkModeSwitch />
        </HStack>
      </Flex>
    </Box>
  );
};

// Home Page
const Home = () => {
  const boxBg = useColorModeValue('white', 'gray.700');
  const boxColor = useColorModeValue('black', 'white');

  return (
    <VStack spacing="10" py="10">
      <Heading>Welcome to FactGuard</Heading>
      <Text>Discover the truth with AI-powered detection and verification.</Text>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
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
        {/* Wrap the entire app in a Flex container */}
        <Flex direction="column" minH="100vh">
          {/* Navbar remains at the top */}
          <Navbar />
          
          {/* Main content area */}
          <Box
            flex="1" // Ensures this section grows to fill remaining space
            py="10"
            px="5"
            maxW="1200px"
            mx="auto"
            w="100%" // Ensures proper width in all layouts
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detect" element={<Detect />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          
          {/* Footer at the bottom */}
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
