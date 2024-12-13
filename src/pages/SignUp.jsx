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

const SignUp = () => {
  const handleSignUp = (event) => {
    event.preventDefault();
    alert('Sign Up successful!');
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex="1">
      <Box
        maxW="md"
        w="full"
        p="6"
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        bg={bgColor}
      >
        <Heading mb="6" textAlign="center">Sign Up</Heading>
        <form onSubmit={handleSignUp}>
          <VStack spacing="4">
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="Enter your username" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
