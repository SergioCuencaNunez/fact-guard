import React from 'react';
import { Box, Container, Flex, HStack, Icon, Link, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { SiGithub, SiLinkedin } from 'react-icons/si';

const Footer = () => {
  const bg = useColorModeValue('gray.200', 'gray.800'); // Background color adjusts to color mode
  const textColor = useColorModeValue('gray.800', 'gray.300'); // Text color adjusts to color mode
  const hoverColor = useColorModeValue('blue.600', 'blue.400'); // Hover color for icons

  return (
    <Box bg={bg} color={textColor} w="100%" py="6" mt="auto">
      <Container maxW="1200px">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          flexWrap="wrap"
          textAlign={{ base: 'center', md: 'left' }}
          gap="4"
        >
          {/* Left Section */}
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing="1">
            <Text fontSize="lg" fontWeight="bold">
              FactGuard
            </Text>
            <Text fontSize="sm">© 2024 FactGuard. All rights reserved.</Text>
          </VStack>

          {/* Right Section */}
          <HStack spacing="4">
            <Link href="https://github.com" isExternal aria-label="GitHub">
              <Icon as={SiGithub} boxSize="6" color={textColor} _hover={{ color: hoverColor }} />
            </Link>
            <Link href="https://linkedin.com" isExternal aria-label="LinkedIn">
              <Icon as={SiLinkedin} boxSize="6" color={textColor} _hover={{ color: hoverColor }} />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
