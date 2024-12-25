import React from "react";
import {
  HStack,
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const primaryColor = '#4dcfaf';
const primaryHoverLight = '#3ca790';
const primaryHoverDark = '#4dcfaf';
const primaryActiveLight = '#2a8073';
const primaryActiveDark = '#91edd0';

import logoDetectBright from '../assets/logo-detect-bright.png';
import logoDetectDark from '../assets/logo-detect-dark.png';

const StartNewDetection = () => {
  const logo = useColorModeValue(logoDetectBright, logoDetectDark);
  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Box>
      <Flex justify="space-between" align="center" mb="4">
        <Heading>Detect Fake News</Heading>
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
      <Text mb="4">Paste or upload a news article to analyze its authenticity:</Text>
      <Textarea placeholder="Paste your article here..." mb="4" />
      <Text mb="2">Confidence Threshold:</Text>
      <Slider defaultValue={50} min={0} max={100} step={5} mb="4">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button
        bg={primaryColor}
        color="white"
        _hover={{ bg: hoverColor }}
        _active={{ bg: activeColor }}
        size="md"
      >
        Analyze
      </Button>
    </Box>
  );
};

export default StartNewDetection;
