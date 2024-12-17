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
  Image
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle,
  FaShieldAlt,
  FaRobot,
  FaGlobe,
  FaUserAlt,
  FaBolt,
  FaSearch,
  FaBookOpen,
  FaLightbulb,
  FaChartLine,
} from 'react-icons/fa';
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
        <Heading mb="4" fontSize="3xl">
          Empowering **Truth** in a World of Noise
        </Heading>
        <Text fontSize="lg" mb="6">
          FactGuard leverages AI to detect fake news, validate claims, and uphold accuracy across the globe. 
          Join thousands of journalists, educators, and creators in building a **trustworthy media ecosystem**.
        </Text>
        <Button
          bg={primaryColor}
          color="white"
          _hover={{ bg: hoverColor }}
          _active={{ bg: activeColor }}
          size="md"
        >
          Get Started Today
        </Button>
      </Box>

      {/* Features Section */}
      <Heading size="lg" textAlign="left">Why FactGuard Stands Out?</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        <FeatureCard
          icon={<FaCheckCircle size="24px" />}
          title="AI-Powered Detection"
          description="Accurately detect misinformation using cutting-edge AI tools trained to ensure precision."
        />
        <FeatureCard
          icon={<FaShieldAlt size="24px" />}
          title="Real-Time Claim Validation"
          description="Verify news claims instantly to combat the spread of fake or manipulated information."
        />
        <FeatureCard
          icon={<FaChartLine size="24px" />}
          title="Actionable Analytics"
          description="Receive insightful reports to enhance transparency and decision-making."
        />
        <FeatureCard
          icon={<FaUserAlt size="24px" />}
          title="User-Centric Design"
          description="Built for journalists, educators, and creators to streamline verification effortlessly."
        />
        <FeatureCard
          icon={<FaGlobe size="24px" />}
          title="Global Verification Network"
          description="Collaborate across borders for verified, trustworthy content."
        />
        <FeatureCard
          icon={<FaLightbulb size="24px" />}
          title="Educational Tools"
          description="Promote digital literacy through tools designed to teach and train fact-checking."
        />
      </Grid>

      {/* Benefits Section */}
      <Heading size="lg" textAlign="left" mt="10">
        How FactGuard Benefits You
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        <BenefitCard
          title="Boost Content Trust"
          description="Earn your audience's confidence by sharing verified, factual content."
        />
        <BenefitCard
          title="Save Time with Automation"
          description="AI tools streamline claim verification, saving you hours of manual effort."
        />
        <BenefitCard
          title="Enhance Media Integrity"
          description="Contribute to a media environment free from misinformation and bias."
        />
        <BenefitCard
          title="Customized for Your Needs"
          description="Scalable solutions for journalists, businesses, and educators."
        />
        <BenefitCard
          title="Real-Time Results"
          description="Stay ahead with instantaneous verification and reporting."
        />
        <BenefitCard
          title="Reduce Legal Risks"
          description="Avoid costly legal pitfalls by ensuring all published content is accurate."
        />
      </Grid>

      {/* CTA Section */}
      <Box
        bgGradient={gradient}
        color="white"
        p="10"
        borderRadius="md"
        textAlign="center"
      >
        <Heading mb="4">Ready to Join the Fight Against Misinformation?</Heading>
        <Text mb="6">
          Empower your team with FactGuard and ensure every piece of content upholds truth and integrity.
        </Text>
        <Link to="/signup">
          <Button
            bg={primaryColor}
            color="white"
            _hover={{ bg: hoverColor }}
            _active={{ bg: activeColor }}
          >
            Sign Up Now
          </Button>
        </Link>
      </Box>
    </VStack>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <GridItem>
    <Box p="5" bg="white" color="black" shadow="md" borderRadius="md">
      <HStack mb="2">
        {icon}
        <Heading size="md">{title}</Heading>
      </HStack>
      <Text>{description}</Text>
    </Box>
  </GridItem>
);

const BenefitCard = ({ title, description }) => (
  <GridItem>
    <Box p="5" bg="white" color="black" shadow="md" borderRadius="md">
      <Heading size="md" mb="2">{title}</Heading>
      <Text>{description}</Text>
    </Box>
  </GridItem>
);

export default EnhancedHome;
