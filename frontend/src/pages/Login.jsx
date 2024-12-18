import React from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const Login = () => {
  const navigate = useNavigate(); 
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/profile"); // Redirect to profile
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Login failed!");
    }
  };

  const logo = useColorModeValue(logoBright, logoDark);
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);

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
        <Box textAlign="center" mb="6">
          <img
            src={logo}
            alt="FactGuard Logo"
            style={{
              height: '40px',
              width: 'auto',
              margin: '0 auto',
              display: 'block',
            }}
          />
        </Box>
      <Heading mb="6" textAlign="center">Login</Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing="4" align="stretch">
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.500" />
              </InputLeftElement>
              <Input type="email" placeholder="Enter your email" />
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired mb="2">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.500" />
              </InputLeftElement>
              <Input type="password" placeholder="Enter your password" />
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            bg={primaryColor}
            color="white"
            _hover={{
              bg: hoverColor,
            }}
            _active={{
              bg: activeColor,
            }}
            size="md"
          >
            Continue
          </Button>
        </VStack>
      </form>
      <Box textAlign="center" mt="4">
        <Text fontSize="sm" color={textColor} mb="2">
          Empowering Truth: Delivering Clarity in a World of Misinformation
        </Text>
        <Text mt="2" fontSize="sm">
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: hoverColor,
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
