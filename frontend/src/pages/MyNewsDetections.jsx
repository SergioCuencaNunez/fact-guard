import React from "react";
import {
  HStack,
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const primaryColor = '#4dcfaf';

import logoDetectBright from '../assets/logo-detect-bright.png';
import logoDetectDark from '../assets/logo-detect-dark.png';

const MyNewsDetections = () => {
  const logo = useColorModeValue(logoDetectBright, logoDetectDark);
  const { colorMode, toggleColorMode } = useColorMode();

  const getTextColor = (value, type) => {
    if (type === "percentage") {
      if (value >= 60) return "red.500";
      if (value >= 30) return "orange.500";
      return "green.500";
    }
    if (type === "rating") {
      return value === "True" ? "green.500" : "red.500";
    }
    return "black";
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb="4">
        <Heading>My News Detections</Heading>
        <Flex direction="column" align="center">
          <HStack spacing="4"> 
            <img src={logo} alt="Detect Logo" style={{ height: "50px", width: "auto" }} />
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
      </Flex>
      <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"}>
        <Thead>
          <Tr>
            <Th width="25%"><b>Title</b></Th>
            <Th width="15%"><b>Fake</b></Th>
            <Th width="15%"><b>True</b></Th>
            <Th width="15%"><b>Date</b></Th>
            <Th width="15%"><b>Results</b></Th>
            <Th width="15%"><b>Remove</b></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>"Detection 1"</Td>
            <Td><Text color={getTextColor(30, "percentage")}>30%</Text></Td>
            <Td><Text color={getTextColor(70, "percentage")}>70%</Text></Td>
            <Td>12/22/2024</Td>
            <Td><Button size="sm">Results</Button></Td>
            <Td><Button size="sm" color={primaryColor}><FaTrashAlt /></Button></Td>
          </Tr>
          <Tr>
            <Td>"Detection 2"</Td>
            <Td><Text color={getTextColor(60, "percentage")}>60%</Text></Td>
            <Td><Text color={getTextColor(40, "percentage")}>40%</Text></Td>
            <Td>12/20/2024</Td>
            <Td><Button size="sm">Results</Button></Td>
            <Td><Button size="sm" color={primaryColor}><FaTrashAlt /></Button></Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default MyNewsDetections;
