import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
    FaShieldAlt,
    FaRobot,
    FaGlobe,
    FaBolt,
    FaSearch,
    FaBookOpen
  } from 'react-icons/fa';

const Home = () => {
  const primaryColor = '#4dcfaf';
  const primaryHoverLight = '#3ca790';
  const primaryHoverDark = '#77e4c4';
  const primaryActiveLight = '#2a8073';
  const primaryActiveDark = '#91edd0';

  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);

  const gradient = 'linear(to-r, #2a8073, #3ca790, #4dcfaf)';

  const boxBg = useColorModeValue('white', 'gray.700');
  const boxColor = useColorModeValue('black', 'white');

  const heroText = useBreakpointValue({
    base: "FactGuard supports transparency with state-of-the-art tools for fake news detection, claim verification, and responsible content sharing. Join a community committed to building a trustworthy and reliable media ecosystem",
    md: "FactGuard supports transparency with state-of-the-art tools for fake news detection, claim verification, and responsible content sharing. By leveraging Deep Learning, FactGuard is able to detect misinformation and uphold accuracy across the globe. Join a community committed to building a trustworthy and reliable media ecosystem.",
  });

  return (
    <VStack spacing="10" py="5" px={{ base: '0', custom: '5' }} w="100%">
      {/* Hero Section */}
      <Box
        bgGradient={gradient}
        color="white"
        p={{ base: '6', md: '10' }}
        borderRadius="md"
        textAlign="center"
      >
        <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }}>Empowering Truth in a World of Noise</Heading>
        <Text mb="6" fontSize={{ base: 'sm', md: 'lg' }}>
          {heroText}
        </Text>
        <a href="/signup" target="_blank" rel="noopener noreferrer">
          <Button
            bg={primaryColor}
            color="white"
            _hover={{ bg: hoverColor }}
            _active={{ bg: activeColor }}
            size="md"
          >
            Get Started
          </Button>
        </a>
      </Box>

      {/* Moving Line Section */}
      <Box
      w="100%"
      overflow="hidden"
      position="relative"
      bgGradient={useColorModeValue(
          'linear(to-r, gray.100, gray.300)',
          'linear(to-r, gray.700, gray.900)'
      )}
      borderTop="2px solid"
      borderBottom="2px solid"
      borderColor={useColorModeValue('gray.300', 'gray.600')}
      py="4"
      my="4"
      >
      {/* Marquee Wrapper */}
      <Box
          display="flex"
          alignItems="center"
          style={{
              animation: 'marquee 15s linear infinite',
          }}
          width="fit-content"
      >
          {/* Repeatable Content */}
          {[
          "Empowering Truth",
          "Fact-Checking Simplified",
          "Verify Claims Instantly",
          "AI-Powered Verification",
          "Promoting Media Literacy",
          ]
          .concat(
              // Duplicate the content for seamless looping
              [
              "Empowering Truth",
              "Fact-Checking Simplified",
              "Verify Claims Instantly",
              "AI-Powered Verification",
              "Promoting Media Literacy",
              ]
          )
          .map((phrase, i) => (
              <Text
              key={i}
              fontSize="lg"
              fontWeight="semibold"
              color={useColorModeValue('gray.800', 'gray.100')}
              style={{
                  marginRight: '40px',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.5',
              }}
              >
              {phrase}
              </Text>
          ))}
      </Box>

        {/* Smooth Animation */}
        <style>
            {`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            `}
        </style>
        </Box>
        
      {/* Features Section */}
      <Heading textAlign="center" fontSize={{ base: '2xl', md: '4xl' }}>
        Why Choose FactGuard?
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
        {[
        {
            icon: FaShieldAlt,
            title: 'AI-Powered Security',
            text: 'Secure, accurate fact-checking using machine learning algorithms.',
        },
        {
            icon: FaSearch,
            title: 'Real-Time Fact Checking',
            text: 'Quickly verify the authenticity of content in real time.',
        },
        {
            icon: FaRobot,
            title: 'AI Efficiency',
            text: 'Let AI handle the heavy lifting to save you time and resources.',
        },
        {
            icon: FaGlobe,
            title: 'Global Coverage',
            text: 'Access a global network of fact-checking partners.',
        },
        {
            icon: FaBookOpen,
            title: 'Educational Resources',
            text: 'Learn tools and techniques to identify misinformation.',
        },
        {
            icon: FaBolt,
            title: 'Instant Results',
            text: 'Fast, actionable insights for media professionals.',
        },
        ].map((feature, index) => (
        <GridItem key={index}>
            <Box
            p="5"
            bg={boxBg}
            color={boxColor}
            shadow="lg"
            borderRadius="md"
            textAlign="center"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s ease-in-out', bg: useColorModeValue('gray.50', 'gray.600') }}
            >
            <HStack justify="center" spacing="3" mb="4">
                <Box fontSize="2xl" color={primaryColor}>
                <feature.icon />
                </Box>
                <Heading size="md">{feature.title}</Heading>
            </HStack>
            <Text>{feature.text}</Text>
            </Box>
        </GridItem>
        ))}
      </Grid>

      {/* Detailed Benefits Section */}
      <Heading textAlign="left" mt="10" fontSize={{ base: '2xl', md: '4xl' }}>
        Benefits of Using FactGuard
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        <GridItem>
          <Box
            p="5"
            bg={boxBg}
            color={boxColor}
            shadow="md"
            borderRadius="md"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s ease-in-out', bg: useColorModeValue('gray.50', 'gray.600') }}
          >
            <Heading size="md" mb="2">Enhanced Content Trust</Heading>
            <Text>
              Build trust in your brand by ensuring the authenticity of your content.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            p="5"
            bg={boxBg}
            color={boxColor}
            shadow="md"
            borderRadius="md"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s ease-in-out', bg: useColorModeValue('gray.50', 'gray.600') }}
          >
            <Heading size="md" mb="2">Comprehensive Fact-Checking</Heading>
            <Text>
              Utilize advanced tools to verify claims and enhance credibility.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            p="5"
            bg={boxBg}
            color={boxColor}
            shadow="md"
            borderRadius="md"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s ease-in-out', bg: useColorModeValue('gray.50', 'gray.600') }}
          >
            <Heading size="md" mb="2">AI-Powered Efficiency</Heading>
            <Text>
              Save time and resources with automated fake news detection processes.
            </Text>
          </Box>
        </GridItem>
      </Grid>

      {/* Call to Action */}
      <Box
        bgGradient={gradient}
        color="white"
        p="10"
        borderRadius="md"
        textAlign="center"
      >
        <Heading mb="4" fontSize={{ base: '3xl', md: '4xl' }}>Be Part of the Solution</Heading>
        <Text mb="6">
          Empower yourself and your community by promoting factual, unbiased content.
        </Text>
        <Link to="/about">
          <Button
            bg={primaryColor}
            color="white"
            _hover={{ bg: hoverColor }}
            _active={{ bg: activeColor }}
          >
            Learn More
          </Button>
        </Link>
      </Box>
    </VStack>
  );
};

export default Home;
