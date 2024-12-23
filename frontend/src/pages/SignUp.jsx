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
  Checkbox,
  useColorModeValue,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertDescription,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
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
  const [checkboxAlert, setCheckboxAlert] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [signingUpMessage, setSigningUpMessage] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password, email, username) => {
    if (password.toLowerCase() === email.split("@")[0].toLowerCase()) {
      return false;
    }
    if (password.toLowerCase() === username.toLowerCase()) {
      return false;
    }
    return /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}/.test(password);
  };

  const resetAlerts = () => {
    setAlert(null);
    setPasswordAlert(null);
    setEmailAlert(null);
    setCheckboxAlert(null);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    resetAlerts();

    const email = event.target.email.value;
    const username = event.target.username.value || email.split("@")[0];
    const password = event.target.password.value;

    if (!termsChecked) {
      setCheckboxAlert("You must agree to the Privacy Policy and Terms & Conditions.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format.");
      return;
    }
    if (!validatePassword(password, email, username)) {
      setPasswordValid(false);
      setPasswordAlert(
        "Password cannot match your username or email and must include 1 uppercase, 6-20 characters, and no invalid characters."
      );
      return;
    }

    try {
      const emailResponse = await fetch(`http://localhost:5001/check-email?email=${encodeURIComponent(email)}`);
      const emailData = await emailResponse.json();
      if (emailData.exists) {
        setAlert({ type: "info", message: "User already registered. Redirecting to Login..." });
        setTimeout(() => navigate("/login"), 2500);
        return;
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
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          navigate("/profile");
        }, 2500);
      } else {
        setAlert({ type: "error", message: "Error signing up. If the issue persists, please contact the administrator." });
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setAlert({ type: "error", message: "Error signing up. If the issue persists, please contact the administrator." });
    }
  };

  const handleEmailBlur = async (event) => {
    const email = event.target.value;
    resetAlerts();
    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format.");
    } else {
      setEmailValid(true);
      try {
        const response = await fetch(`http://localhost:5001/check-email?email=${encodeURIComponent(email)}`);
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

  const handlePasswordBlur = (event) => {
    const password = event.target.value;
    const email = event.target.form.email.value;
    const username = event.target.form.username.value || email.split("@")[0];
    resetAlerts();
    if (!validatePassword(password, email, username)) {
      setPasswordValid(false);
      setPasswordAlert(
        "Password cannot match your username or email and must include 1 uppercase, 6-20 characters, and no invalid characters."
      );
    } else {
      setPasswordValid(true);
    }
  };

  const logo = useColorModeValue(logoBright, logoDark);
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const logoHeight = useBreakpointValue({ base: '45px', md: '50px' });

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
              height: logoHeight,
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
        {passwordAlert && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <AlertDescription>{passwordAlert}</AlertDescription>
          </Alert>
        )}
        {checkboxAlert && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <AlertDescription>{checkboxAlert}</AlertDescription>
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
                <FaUser style={{color:"#718096"}} />
                </InputLeftElement>
                <Input 
                  type="text" 
                  placeholder="Enter a username" 
                  name="username"
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
                  placeholder="Enter an email" 
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
            <FormControl>
              <Checkbox
                isChecked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              >
                By checking this box, I agree to the <ChakraLink href="/terms" color="teal.500" isExternal>Terms & Conditions</ChakraLink> and <ChakraLink href="/privacy" color="teal.500" isExternal>Privacy Policy</ChakraLink>.
              </Checkbox>
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
