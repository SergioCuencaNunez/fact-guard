import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const primaryColor = "#4dcfaf";
const primaryHoverLight = "#3ca790";
const primaryHoverDark = "#4dcfaf";
const primaryActiveLight = "#2a8073";
const primaryActiveDark = "#77e4c4";

const AccountDetails = () => {
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);

  const { colorMode, toggleColorMode } = useColorMode();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [oldPasswordValid, setOldPasswordValid] = useState(true);
  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const cardBg = useColorModeValue("white", "gray.700");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}/.test(password);

  const resetAlert = () => {
    setTimeout(() => setAlert(null), 3000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setName(data.username);
        setEmail(data.email);
        setOriginalName(data.username);
        setOriginalEmail(data.email);
      }
    };

    fetchProfile();
  }, []);

  const checkIfProfileChanged = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5001/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (response.ok) {
      setOriginalName(data.username);
      setOriginalEmail(data.email);
      return data.username === name && data.email === email;
    }
    return false;
  };

  const handleSaveChanges = async () => {
    if (!validateEmail(email)) {
      setAlert({ type: "error", message: "Invalid email format." });
      setEmailValid(false);
      return;
    }

    const isUnchanged = await checkIfProfileChanged();
    if (isUnchanged) {
      setAlert({
        type: "info",
        message:
          "Name and email are not updated because they are the same as the current values.",
      });
      resetAlert();
      return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5001/account-update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    });
    if (response.ok) {
      setAlert({ type: "success", message: "Profile updated successfully." });
    } else {
      setAlert({ type: "error", message: "Failed to update profile." });
    }
    resetAlert();
  };

  const handleResetPassword = async () => {
    if (!oldPassword && !newPassword && !confirmPassword) {
      setAlert({
        type: "error",
        message: "Please fill in all the password fields.",
      });
      return;
    }

    if (newPassword === oldPassword) {
      setAlert({
        type: "error",
        message: "The new password cannot be the same as the current password.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match." });
      setPasswordValid(false);
      setConfirmPasswordValid(false);
      return;
    } else {
      setPasswordValid(true);
      setConfirmPasswordValid(true);
    }

    if (!validatePassword(newPassword)) {
      setAlert({
        type: "error",
        message:
          "Password must include 1 uppercase, 6-20 characters, and no invalid characters.",
      });
      setPasswordValid(false);
      return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5001/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (response.ok) {
      setAlert({ type: "success", message: "Password reset successfully." });
      resetAlert();
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordValid(true);
      setOldPasswordValid(true);
    } else {
      setAlert({
        type: "error",
        message: "Incorrect current password. Please try again.",
      });
      setOldPasswordValid(false);
    }
  };

  return (
    <Box px={{ md: 4 }} py={{ md: 6 }}>
      <Flex direction="column" bg={cardBg} p={8} borderRadius="md" shadow="md">
        <Flex justify="space-between" align="center" mb="4">
          <Heading fontSize={{ base: "3xl", md: "4xl" }}>Account Details</Heading>
          <HStack spacing="4">
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
        <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>
        {alert && (
          <Alert status={alert.type} mb={4}>
            <AlertIcon />
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        <VStack spacing="4" align="stretch">
          <Flex
            direction={{ base: "column", lg: "row" }}
            spacing="4"
            alignItems={{ base: "flex-start", lg: "center" }}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl isInvalid={!emailValid}>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailValid(validateEmail(email))}
                placeholder="Enter your email"
              />
            </FormControl>
          </Flex>
          <Flex
            direction={{ base: "column", lg: "row" }}
            spacing="4"
            alignItems={{ base: "flex-start", lg: "center" }}
          >
            <FormControl isInvalid={!oldPasswordValid}>
              <FormLabel>Old Password</FormLabel>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
            <FormControl isInvalid={!passwordValid}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl isInvalid={!confirmPasswordValid || !passwordValid} >
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </Flex>
          <HStack spacing="4" justify="center" mt="4">
            <Button
              bg={primaryColor}
              color="white"
              onClick={handleSaveChanges}
              _hover={{ bg: hoverColor }}
              _active={{ bg: activeColor }}
            >
              Save Changes
            </Button>
            <Button
              bg={primaryColor}
              color="white"
              onClick={handleResetPassword}
              _hover={{ bg: hoverColor }}
              _active={{ bg: activeColor }}
            >
              Reset Password
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default AccountDetails;
