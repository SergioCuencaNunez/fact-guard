import React from 'react';
import { Box, Button, Image, VStack, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';
import notFoundImage from '../assets/404.png';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const NotFound = () => {
  const logo = useColorModeValue(logoBright, logoDark);
  const textColor = useColorModeValue('black', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);

  return (
    <Box
      textAlign="center"
      px={{ base: '6', md: '10' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={notFoundImage}
        alt="404 Not Found"
        mx="auto"
        mb="5"
        maxWidth="290px"
      />

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

      <Link to="/">
        <Button
          bg={primaryColor}
          color="white"
          _hover={{ bg: hoverColor }}
          _active={{ bg: activeColor }}
          size="lg"
        >
          Go Back Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
