import React from 'react';
import { Box, Container, Flex, HStack, Icon, Link, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { SiGithub, SiLinkedin } from 'react-icons/si';

const Footer = () => {
  const bg = useColorModeValue('gray.200', 'gray.800'); // Background color adjusts to color mode
  const textColor = useColorModeValue('gray.800', 'gray.300'); // Text color adjusts to color mode
  const hoverColor = useColorModeValue('blue.600', 'blue.400'); // Hover color for icons
  const logo = useColorModeValue('/logo-main-bright.png', '/logo-main-dark.png'); // Logo adjusts to color mode

  return (
    <Box bg={bg} color={textColor} w="100%" py="6" mt="auto">
      <Container maxW="1200px" px={{ base: '4', md: '8' }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          textAlign={{ base: 'center', md: 'left' }}
          gap="4"
        >
          {/* Left Section with Logo */}
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing="1">
            <img src={logo} alt="FactGuard Logo" style={{ height: '20px', width: 'auto' }} />
            <Text fontSize="sm">© 2024 Fact Guard. All Rights Reserved</Text>
            <Text fontSize="sm">Version 0.1</Text>
          </VStack>

          {/* Right Section with Icons */}
          <HStack spacing="4">
            <Link href="https://github.com/SergioCuencaNunez" isExternal aria-label="GitHub">
              <Icon as={SiGithub} boxSize="6" color={textColor} _hover={{ color: hoverColor }} />
            </Link>
            <Link href="https://www.linkedin.com/in/sergio-cuenca-núñez-b8a391223/" isExternal aria-label="LinkedIn">
              <Icon as={SiLinkedin} boxSize="6" color={textColor} _hover={{ color: hoverColor }} />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
