import React, { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from "framer-motion";

import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const SignUp = () => {
  const navigate = useNavigate();
  // For development only
  const BACKEND_URL = `${window.location.protocol}//${window.location.hostname}:5001`;

  // For production
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    
  const [alert, setAlert] = useState(null);
  const [emailAlert, setEmailAlert] = useState(null);
  const [passwordAlert, setPasswordAlert] = useState(null);
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

  useEffect(() => {
    if (emailAlert) {
      const timer = setTimeout(() => setEmailAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [emailAlert]);

  useEffect(() => {
    if (passwordAlert) {
      const timer = setTimeout(() => setPasswordAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [passwordAlert]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    resetAlerts();

    const email = event.target.email.value;
    const username = event.target.username.value || email.split("@")[0];
    const password = event.target.password.value;
    const last_access = new Date().toISOString();

    if (!termsChecked) {
      setCheckboxAlert("You must agree to the Privacy Policy and Terms & Conditions.");
      setTimeout(() => setCheckboxAlert(null), 3000);
      return;
    }

    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format.");
      setTimeout(() => setEmailAlert(null), 3000);
      return;
    }
    if (!validatePassword(password, email, username)) {
      setPasswordValid(false);
      setPasswordAlert(
        "Password cannot match your username or email and must include 1 uppercase, 6-20 characters, and no invalid characters."
      );
      setTimeout(() => setPasswordAlert(null), 5000);
      return;
    }

    try {
      const emailResponse = await fetch(`${BACKEND_URL}/check-email?email=${encodeURIComponent(email)}`);
      const emailData = await emailResponse.json();
      if (emailData.exists) {
        setAlert({ type: "info", message: "User already registered. Redirecting to Login..." });
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          last_access,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSigningUpMessage("Signing up... Please wait.");
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          navigate("/profile");
        }, 3000);
      } else {
        setAlert({ type: "error", message: "Error signing up. If the issue persists, please contact the administrator." });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setAlert({ type: "error", message: "Error signing up. If the issue persists, please contact the administrator." });
      setTimeout(() => setAlert(null), 3000);
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
        const response = await fetch(`${BACKEND_URL}/check-email?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        if (data.exists) {
          setAlert({ type: "info", message: "User already registered. Redirecting to Login..." });
          setTimeout(() => navigate("/login"), 3000);
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
    <motion.div
      style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
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
            <motion.img
              src={logo}
              alt="FactGuard Logo"
              style={{
                height: logoHeight,
                width: 'auto',
                margin: '0 auto',
                display: 'block',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />
          </Box>
          <Heading mb="6" textAlign="center">Sign Up</Heading>
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: alert || emailAlert || passwordAlert || checkboxAlert || signingUpMessage ? "auto" : 0,
            }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <AnimatePresence>
              {alert && (
                <motion.div
                  key="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: "8px" }}
                >
                  <Alert status={alert.type}>
                    <AlertIcon />
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
              {emailAlert && (
                <motion.div
                  key="emailAlert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: "8px" }}
                >
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{emailAlert}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
              {passwordAlert && (
                <motion.div
                  key="passwordAlert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: "8px" }}
                >
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{passwordAlert}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
              {checkboxAlert && (
                <motion.div
                  key="checkboxAlert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: "8px" }}
                >
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{checkboxAlert}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
              {signingUpMessage && (
                <motion.div
                  key="signingUpMessage"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: "8px" }}
                >
                  <Alert status="success">
                    <AlertIcon />
                    <AlertDescription>{signingUpMessage}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
              <FormControl id="email" isInvalid={!emailValid}>
                <FormLabel>Email <Text as="span" color={useColorModeValue("red.500", "red.300")}>*</Text></FormLabel>
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
              <FormControl id="password" isInvalid={!passwordValid}>
                <FormLabel>Password <Text as="span" color={useColorModeValue("red.500", "red.300")}>*</Text></FormLabel>
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
                  By checking this box, I agree to the <ChakraLink href="/terms" color={primaryColor} isExternal>Terms & Conditions</ChakraLink> and <ChakraLink href="/privacy" color={primaryColor} isExternal>Privacy Policy</ChakraLink>.
                </Checkbox>
              </FormControl>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
                  width={"100%"}
                >
                  Continue
                </Button>
              </motion.div>
            </VStack>
          </form>
          <Box textAlign="center" mt="4">
            <Text fontSize="sm" color={textColor} mb="2">
              Empowering Clarity. Enabling Trust
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
    </motion.div>
  );
};

export default SignUp;
