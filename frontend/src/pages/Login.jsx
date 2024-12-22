import React, { useState } from 'react';
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
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const Login = () => {
  const navigate = useNavigate(); 
  const [alert, setAlert] = useState(null);
  const [emailAlert, setEmailAlert] = useState(null);
  const [passwordAlert, setPasswordAlert] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const resetAlerts = () => {
    setAlert(null);
    setEmailAlert(null);
    setPasswordAlert(null);
    setEmailValid(true);
    setPasswordValid(true);
  };

  const handleEmailBlur = async (event) => {
    const email = event.target.value;
    resetAlerts();
    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/check-login-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      if (!response.ok) {
        setEmailAlert(null); // Clear any previous email alerts
        setAlert({ type: "info", message: "User not registered. Redirecting to Sign Up..." });
        setTimeout(() => {
          resetAlerts();
          navigate("/signup");
        }, 2500);
      } else {
        setEmailValid(true);
        setEmailAlert(null);
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setAlert({ type: "error", message: "Error checking email. Please try again." });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    resetAlerts();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format. Please provide a valid email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ type: "success", message: "Login successful. Redirecting to profile..." });
        setTimeout(() => {
          resetAlerts();
          localStorage.setItem("token", data.token);
          navigate("/profile");
        }, 2500);
      } else {
        if (data.error === "User not found") {
          setAlert({ type: "info", message: "User not registered. Redirecting to Sign Up..." });
          setTimeout(() => {
            resetAlerts();
            navigate("/signup");
          }, 2500);
        } else if (data.error === "Invalid credentials") {
          setPasswordValid(false);
          setPasswordAlert("The email or password you entered is incorrect. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert({ type: "error", message: "Login failed! Please try again." });
      setTimeout(() => resetAlerts(), 2500);
    }
  };

  const logo = useColorModeValue(logoBright, logoDark);
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const logoHeight = useBreakpointValue({ base: '45px', md: '50px' });

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
            height: logoHeight,
            width: 'auto',
            margin: '0 auto',
            display: 'block',
          }}
        />
      </Box>
      <Heading mb="6" textAlign="center">Login</Heading>
      {alert && (
        <Alert status={alert.type} mb="4">
          <AlertIcon />
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      {emailAlert && (
        <Alert status="error" mb="4">
          <AlertIcon />
          <AlertDescription>{emailAlert}</AlertDescription>
        </Alert>
      )}
      {passwordAlert && (
        <Alert status="error" mb="4">
          <AlertIcon />
          <AlertDescription>{passwordAlert}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <VStack spacing="4" align="stretch">
          <FormControl id="email" isRequired isInvalid={!emailValid}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.500" />
              </InputLeftElement>
              <Input type="email" name="email" placeholder="Enter your email" onBlur={handleEmailBlur} />
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired isInvalid={!passwordValid} mb="2">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.500" />
              </InputLeftElement>
              <Input type="password" name="password" placeholder="Enter your password" />
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
