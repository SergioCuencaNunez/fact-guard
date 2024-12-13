import React from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    alert('Login successful!');
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
    maxW="md"
    w="full"
    p="6"
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    bg={bgColor}
    >
    <Heading mb="6" textAlign="center">Login</Heading>
    <form onSubmit={handleLogin}>
        <VStack spacing="4">
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
            Login
        </Button>
        </VStack>
    </form>
      </Box>
  );
};

export default Login;
