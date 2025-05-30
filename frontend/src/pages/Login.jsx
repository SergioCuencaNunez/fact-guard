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
  useColorModeValue,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from "framer-motion";

import logoBright from '../assets/logo-main-bright.png';
import logoDark from '../assets/logo-main-dark.png';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#77e4c4';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

const Login = () => {
  const navigate = useNavigate(); 
  // For development only
  const BACKEND_URL = `${window.location.protocol}//${window.location.hostname}:5001`;

  // For production
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
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

  useEffect(() => {
      if (emailAlert) {
        const timer = setTimeout(() => setEmailAlert(null), 3000);
        return () => clearTimeout(timer);
      }
    }, [emailAlert]);
  
  useEffect(() => {
    if (passwordAlert) {
      const timer = setTimeout(() => setPasswordAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordAlert]);

  const handleEmailBlur = async (event) => {
    const email = event.target.value;
    resetAlerts();
    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format.");
      setTimeout(() => setEmailAlert(null), 3000);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/check-login-email?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        setEmailAlert(null);
        setAlert({ type: "info", message: "User not registered. Redirecting to Sign Up..." });
        setTimeout(() => {
          resetAlerts();
          navigate("/signup");
        }, 3000);
      } else {
        setEmailValid(true);
        setEmailAlert(null);
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setAlert({ type: "error", message: "Error checking email. Please try again." });
      setTimeout(() => setAlert(null), 3000);
    }
    
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    resetAlerts();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const last_access = new Date().toISOString();

    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailAlert("Invalid email format. Please provide a valid email.");
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, last_access }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ type: "success", message: "Login successful. Redirecting to profile..." });
        setTimeout(() => {
          resetAlerts();
          localStorage.setItem("token", data.token);
          const decoded = JSON.parse(atob(data.token.split('.')[1]));
          if (decoded.role === 'admin') {
            navigate("/admin/profile");
          } else {
            navigate("/profile");
          }
        }, 3000);
      } else {
        if (data.error === "User not found") {
          setAlert({ type: "info", message: "User not registered. Redirecting to Sign Up..." });
          setTimeout(() => {
            resetAlerts();
            navigate("/signup");
          }, 3000);
        } else if (data.error === "Invalid credentials") {
          setPasswordValid(false);
          setPasswordAlert("The password you entered is incorrect. Please try again.");
          setTimeout(() => setAlert(null), 3000);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert({ type: "error", message: "Login failed. Please try again." });
      setTimeout(() => resetAlerts(), 3000);
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

          <Heading mb="6" textAlign="center">Login</Heading>
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: alert || emailAlert || passwordAlert ? "auto" : 0,
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
                  style={{ marginBottom: '16px' }}
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
                  style={{ marginBottom: '16px' }}
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
                  style={{ marginBottom: '16px' }}
                >
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{passwordAlert}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
                  width="100%"
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
      </Box>
    </motion.div>
  );
};

export default Login;
