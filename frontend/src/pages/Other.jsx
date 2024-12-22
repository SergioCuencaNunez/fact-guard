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
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSignIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const SignUp = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [passwordAlert, setPasswordAlert] = useState(null);
  const [emailAlert, setEmailAlert] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [usernameAlert, setUsernameAlert] = useState(null);
  const [passwordValid, setPasswordValid] = useState(true);
  const [signingUpMessage, setSigningUpMessage] = useState(null);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}/.test(password);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value || email.split("@")[0];
    const password = event.target.password.value;

    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordValid(false);
      setPasswordAlert("Password requirements: 1 uppercase, 6-20 characters, no invalid characters.");
      return;
    }

    try {
      const usernameResponse = await fetch(`http://localhost:5001/check-username?username=${username}`);
      const usernameData = await usernameResponse.json();
      if (usernameData.exists) {
        setUsernameAlert("Username already in use. Please try with another one.");
        return;
      } else {
        setUsernameAlert(null);
      }

      const emailResponse = await fetch(`http://localhost:5001/check-email?email=${email}`);
      const emailData = await emailResponse.json();
      if (emailData.exists) {
        setAlert({ type: "info", message: "User already registered. Redirecting to Login..." });
        setTimeout(() => navigate("/login"), 2500);
        return;
      } else {
        setAlert(null);
      }

      const response = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSigningUpMessage("Signing up... Please wait.");
        setAlert(null);
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          navigate("/profile");
        }, 2500);
      } else {
        setAlert({ type: "error", message: "Error signing up!" });
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setAlert({ type: "error", message: "Error signing up! Please try again." });
    }
  };

  const handleEmailBlur = async (event) => {
    const email = event.target.value;
    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format.");
    } else {
      setEmailValid(true);
      setEmailAlert(null);
      try {
        const response = await fetch(`http://localhost:5001/check-email?email=${email}`);
        const data = await response.json();
        if (data.exists) {
          setAlert({ type: "info", message: "User already registered. Redirecting to Login..." });
          setTimeout(() => navigate("/login"), 2500);
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }
  };

  const handleUsernameBlur = async (event) => {
    const username = event.target.value;
    if (username) {
      try {
        const response = await fetch(`http://localhost:5001/check-username?username=${username}`);
        const data = await response.json();
        if (data.exists) {
          setUsernameAlert("Username already in use. Please try with another one.");
        } else {
          setUsernameAlert(null);
        }
      } catch (error) {
        console.error("Error checking username:", error);
      }
    }
  };

  const handlePasswordBlur = (event) => {
    const password = event.target.value;
    if (!validatePassword(password)) {
      setPasswordValid(false);
      setPasswordAlert("Password requirements: 1 uppercase, 6-20 characters, no invalid characters.");
    } else {
      setPasswordValid(true);
      setPasswordAlert(null);
    }
  };

  const logo = useColorModeValue(logoBright, logoDark);
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);

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
        <Heading mb="6" textAlign="center">Sign Up</Heading>
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
        {usernameAlert && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <AlertDescription>{usernameAlert}</AlertDescription>
          </Alert>
        )}
        {passwordAlert && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <AlertDescription>{passwordAlert}</AlertDescription>
          </Alert>
        )}
        {signingUpMessage && (
          <Alert status="success" mb="4">
            <AlertIcon />
            <AlertDescription>{signingUpMessage}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSignUp}>
          <VStack spacing="4" align="stretch">
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.500" />
                </InputLeftElement>
                <Input 
                  type="text" 
                  placeholder="Enter a username" 
                  name="username"
                  onBlur={handleUsernameBlur}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="email" isRequired isInvalid={!emailValid}>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.500" />
                </InputLeftElement>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  name="email"
                  onBlur={handleEmailBlur}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={!passwordValid}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.500" />
                </InputLeftElement>
                <Input 
                  type="password" 
                  placeholder="Create a password" 
                  name="password"
                  onBlur={handlePasswordBlur} 
                />
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
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: hoverColor,
                fontWeight: 'bold',
              }}
            >
              Login
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
