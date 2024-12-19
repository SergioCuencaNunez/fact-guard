import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
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
  FaBookOpen,
  FaCheckCircle,
  FaTasks,
  FaBrain
} from 'react-icons/fa';

import discoverBright from '../assets/discover-bright.png';
import discoverDark from '../assets/discover-dark.png';
import benefitsBright from '../assets/benefits-bright.png';
import benefitsDark from '../assets/benefits-dark.png';

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

  const discoverImage = useColorModeValue(discoverBright, discoverDark);
  const benefitsImage = useColorModeValue(benefitsBright, benefitsDark);
  
  const heroText = useBreakpointValue({
    base: "FactGuard supports transparency for fake news detection, claim verification, and responsible content sharing. Join a community committed to building a trustworthy and reliable media ecosystem.",
    md: "FactGuard supports transparency with state-of-the-art tools for fake news detection, claim verification, and responsible content sharing. By leveraging Deep Learning, it is able to detect misinformation and uphold accuracy across the globe. Join a community committed to building a trustworthy and reliable media ecosystem.",
  });

  const discoverText = useBreakpointValue({
    base: "FactGuard combats misinformation with powerful AI tools. Leverage real-time fact-checking to promote trust.",
    md: "Our tools are designed to combat misinformation and empower users worldwide. Leverage our advanced DL-driven solutions to promote factual content and foster trust. FactGuard is not just a tool—it’s a commitment to ensuring the credibility of online information.",
  });

  const discoverTextLg = useBreakpointValue({
    md: "With FactGuard, you’ll access real-time fact-checking capabilities, educational resources, and a global network of verification partners. Whether you’re an individual, a team, or an organization, FactGuard is here to help you navigate a world of information with confidence.",
  });

  return (
    <VStack spacing="10" py="5" px={{ base: '0', custom: '5' }} w="100%">
      {/* Welcome Section */}
      <HStack
        align="center"
        justify="space-between"
        w="100%"
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        mb="5"
      >
        <Box w={{ base: '100%', md: '55%' }} textAlign={{ base: 'center', md: 'left' }}>
          <Heading mb="2" fontSize={{ base: '3xl', md: '4xl' }}>
            Discover the Power of FactGuard
          </Heading>
          <Text mb="5" fontSize={{ base: 'md', md: 'lg' }}>
            {discoverText}
          </Text>
          <Text mb="5" fontSize={{ md: 'lg' }}>
            {discoverTextLg}
          </Text>
        </Box>
        <Image
          src={discoverImage}
          alt="Fake news detection illustration"
          w={{ base: '80%', md: '35%' }}
          mx={{ base: 'auto', md: '0' }}
        />
      </HStack>

      {/* Hero Section */}
      <Box
        bgGradient={gradient}
        color="white"
        p={{ base: '6', md: '10' }}
        borderRadius="md"
        textAlign="center"
      >
        <Heading mb="4" fontSize={{ base: '2xl', md: '3xl' }}>Empowering Truth in a World of Noise</Heading>
        <Text mb="6" fontSize={{ base: 'sm', md: 'md' }}>
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
      py="5"
      my="5"
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
      <Heading textAlign="center" fontSize={{ base: '2xl', md: '3xl' }}>
        Why Choose FactGuard?
      </Heading>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
        {[
        {
            icon: FaShieldAlt,
            title: 'AI-Powered Security',
            text: 'Secure, accurate fact-checking using ML algorithms.',
        },
        {
            icon: FaSearch,
            title: 'Real-Time Fact Checking',
            text: 'Quickly verify the authenticity of content in real time.',
        },
        {
            icon: FaRobot,
            title: 'AI Efficiency',
            text: 'Let AI handle the heavy lifting to save you time.',
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
            display="flex"
            flexDirection="column"
            height="100%"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s ease-in-out', bg: useColorModeValue('gray.50', 'gray.600') }}
            >
            <HStack justify="center" spacing="3" mb="5">
                <Box fontSize={{ base: 'sm', md: 'md' }} color={primaryColor}>
                <feature.icon />
                </Box>
                <Heading size={{ base: 'sm', md: 'md' }}>{feature.title}</Heading>
            </HStack>
            <Text fontSize={{ base: 'sm', md: 'md' }}>{feature.text}</Text>
            </Box>
        </GridItem>
        ))}
      </Grid>

      {/* Benefits Section */}
      <Heading textAlign="left" mt="5" fontSize={{ base: '2xl', md: '3xl' }}>
            Benefits of Using FactGuard
      </Heading>
      <HStack
          align="start"
          justify="space-between"
          w="100%"
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          mb='5'
        >
          <Image
            src={benefitsImage}
            alt="FactGuard benefits illustration"
            w={{ base: '80%', md: '38%' }}
            mx={{ base: 'auto', md: '0' }}
            mb={{ base: '5'}}
          />
          <VStack spacing="8" w={{ base: '100%', md: '50%' }} align="start">
            <Grid templateColumns={{ base: '1fr', md: '1fr' }} gap={6}>
              <GridItem>
                <Box
                  p="5"
                  bg={boxBg}
                  color={boxColor}
                  shadow="md"
                  borderRadius="md"
                  _hover={{ transform: 'scale(1.05)', transition: '0.3s ease-in-out', bg: useColorModeValue('gray.50', 'gray.600') }}
                >
                  <HStack justify="start" mb="2">
                    <Box fontSize="lg" color={primaryColor}>
                      <FaCheckCircle />
                    </Box>
                    <Heading size="md">Enhanced Content Trust</Heading>
                  </HStack>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>
                    Build trust in your brand by ensuring the authenticity of your content. 
                    With FactGuard's tools, you can confidently share verified information with your audience.
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
                  style={{ height: '100%' }}
                >
                  <HStack justify="start" mb="2">
                    <Box fontSize="lg" color={primaryColor}>
                      <FaTasks />
                    </Box>
                    <Heading size="md">Comprehensive Fact-Checking</Heading>
                  </HStack>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>
                    Utilize advanced tools to verify claims and enhance credibility. 
                    FactGuard provides accurate results to support your decisions and messaging.
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
                  <HStack justify="start" mb="2">
                    <Box fontSize="lg" color={primaryColor}>
                      <FaBrain />
                    </Box>
                    <Heading size="md">AI-Powered Efficiency</Heading>
                  </HStack>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>
                    Save time and resources with automated fake news detection processes. 
                    Let our intelligent systems streamline your fact-checking efforts.
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </VStack>
      </HStack>

      {/* Call to Action */}
      <Box
        bgGradient={gradient}
        color="white"
        p="10"
        borderRadius="md"
        textAlign="center"
      >
        <Heading mb="4" fontSize={{ base: '2xl', md: '3xl' }}>Be Part of the Solution</Heading>
        <Text mb="6" fontSize={{ base: 'sm', md: 'md' }}>
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
