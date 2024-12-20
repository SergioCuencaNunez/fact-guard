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
  Spinner,
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

const SignUp = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [passwordAlert, setPasswordAlert] = useState(null);
  const [emailAlert, setEmailAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [signingUpMessage, setSigningUpMessage] = useState(null);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}/.test(password);

  const handleEmailBlur = async (event) => {
    const email = event.target.value;
    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format.");
      return;
    }
    setEmailValid(true);
    setEmailAlert(null);

    setCheckingEmail(true);
    try {
      const response = await fetch(`http://localhost:5001/check-email?email=${email}`);
      const data = await response.json();

      if (data.exists) {
        setAlert({ type: "info", message: "User exists. Redirecting to Login..." });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setAlert({ type: "success", message: "Email is available." });
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setAlert({ type: "error", message: "Could not check email. Try again later." });
    } finally {
      setCheckingEmail(false);
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

  const handleSignUp = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
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
      setSigningUpMessage("Signing up... Please wait.");
      const response = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email.split("@")[0],
          email,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSigningUpMessage(null);
        navigate("/profile");
      } else {
        setSigningUpMessage(null);
        if (data.error === "User already exists") {
          setAlert({ type: "info", message: "Redirecting to Login..." });
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setAlert({ type: "error", message: "Error signing up!" });
        }
      }
    } catch (error) {
      setSigningUpMessage(null);
      console.error("Sign-up error:", error);
      setAlert({ type: "error", message: "Error signing up! Please try again." });
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
        {passwordAlert && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <AlertDescription>{passwordAlert}</AlertDescription>
          </Alert>
        )}
        {signingUpMessage && (
          <Alert status="info" mb="4">
            <AlertIcon />
            <AlertDescription>{signingUpMessage}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSignUp}>
          <VStack spacing="4" align="stretch">
            <FormControl id="email" isRequired isInvalid={!emailValid}>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AtSignIcon color="gray.500" />
                </InputLeftElement>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  onBlur={handleEmailBlur} 
                />
              </InputGroup>
              {checkingEmail && <Text color="gray.500" fontSize="sm">Checking email...</Text>}
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
              isLoading={isLoading}
              spinner={<Spinner size="sm" />}
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

/***
 * Keep this version and just touch these things:

Get rid of the spinner and just show a correct message for Signing up... in the form and then in a few seconds go to profile, but please a few seconds don't do it instantly, wait for the message to show up
For the email check, just do the checking once the button is clicked as you are not managing to the automatic check.
Please keep the rest of the validations.

make the edits in the canvas
*/