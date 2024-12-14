import React from 'react';
import {
  Box,
  VStack,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const EnhancedHome = () => {
  const primaryColor = '#4dcfaf';
  const primaryHoverLight = '#3ca790';
  const primaryHoverDark = '#77e4c4';
  const primaryActiveLight = '#2a8073';
  const primaryActiveDark = '#91edd0';

  const logo = useColorModeValue(logoBright, logoDark);

  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);

  const gradient = 'linear(to-r, #2a8073, #3ca790, #4dcfaf)';

  const boxBg = useColorModeValue('white', 'gray.700');
  const boxColor = useColorModeValue('black', 'white');
  const bgHighlight = primaryColor;

  return (
    <VStack spacing="10" py="10" px="5" maxW="1200px" mx="auto">
      {/* Hero Section */}
      <Box
        bgGradient={gradient}
        color="white"
        p="10"
        borderRadius="md"
        textAlign="center"
      >
        <Heading mb="4">Join a Community Committed to Accuracy</Heading>
        <Text mb="6">
          FactGuard supports transparency with state-of-the-art tools for fake news detection, claim verification, and responsible content sharing.
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
        bg={useColorModeValue('gray.200', 'gray.800')} // Match footer background
        py="4"
        my="6"
        >
        {/* Marquee Wrapper */}
        <Box
            display="inline-flex"
            alignItems="center"
            style={{
            animation: 'marquee 15s linear infinite', // Smooth scrolling animation
            }}
        >
            {/* Repeatable Content */}
            {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
                <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.400')}
                style={{
                    marginRight: '40px',
                    whiteSpace: 'nowrap', // Prevent text wrapping
                    lineHeight: '1.5',
                }}
                >
                Empowering Truth
                </Text>
                <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.400')}
                style={{
                    marginRight: '40px',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.5',
                }}
                >
                Fact-Checking Simplified
                </Text>
                <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.400')}
                style={{
                    marginRight: '40px',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.5',
                }}
                >
                Verify Claims Instantly
                </Text>
                <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.400')}
                style={{
                    marginRight: '40px',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.5',
                }}
                >
                AI-Powered Verification
                </Text>
                <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.400')}
                style={{
                    marginRight: '40px',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.5',
                }}
                >
                Promoting Media Literacy
                </Text>
            </React.Fragment>
            ))}
        </Box>

        {/* Keyframes for Smooth Animation */}
        <style>
            {`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); } /* Move only by half the content's width */
            }
            `}
        </style>
        </Box>

      {/* Features Section */}
      <Heading size="lg" textAlign="left">Why Choose FactGuard?</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">AI-Driven Accuracy</Heading>
            <Text mb="4">
              Advanced algorithms to identify misinformation and ensure content integrity.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">Global Verification Network</Heading>
            <Text mb="4">
              Collaborate with a global community to improve content authenticity worldwide.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">User-Centric Design</Heading>
            <Text mb="4">
              Tools tailored for ease of use, accessibility, and maximum impact.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">Real-Time Insights</Heading>
            <Text mb="4">
              Receive actionable insights to prevent the spread of fake news.
            </Text>
          </Box>
        </GridItem>
      </Grid>

      {/* Detailed Benefits Section */}
      <Heading size="lg" textAlign="left" mt="10">
        Benefits of Using FactGuard
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">Enhanced Content Trust</Heading>
            <Text>
              Build trust in your brand by ensuring the authenticity of your content.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
            <Heading size="md" mb="2">Comprehensive Fact-Checking</Heading>
            <Text>
              Utilize advanced tools to verify claims and enhance credibility.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="5" bg={boxBg} color={boxColor} shadow="md" borderRadius="md">
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
        <Heading mb="4">Be Part of the Solution</Heading>
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

export default EnhancedHome;
