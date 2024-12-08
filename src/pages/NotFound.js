import React from 'react';
import { Box, Button, Image, VStack, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const notFoundImage = '/404.png';
  const logo = useColorModeValue('/logo-main-bright.png', '/logo-main-dark.png');
  const textColor = useColorModeValue('black', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      textAlign="center"
      px={{ base: '6', md: '10' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Static 404 Image */}
      <Image
        src={notFoundImage}
        alt="404 Not Found"
        mx="auto"
        mb="5"
        maxWidth="290px"
      />

      {/* Text and Logo */}
      <VStack spacing="4" mb="6" px={{ base: '4', md: '8' }}>
        <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} color={textColor}>
          Not Found
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color={textColor}>
          Work In Progress
        </Text>
        <Text fontSize="md" color={subTextColor}>
          This page is not available at the moment. It might be under construction or no longer exists.
          Please check back later. Apologies for any inconvenience caused, and thank you for your understanding.
        </Text>
        {/* Logo */}
        <Image
          src={logo}
          alt="Fact Guard Logo"
          mx="auto"
          height="50px"
          mb="5"
        />
      </VStack>

      {/* Button */}
      <Link to="/">
        <Button colorScheme="teal" size="lg">
          Go Back Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
