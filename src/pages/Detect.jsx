import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Textarea,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
} from '@chakra-ui/react';

import logoDetectBright from '../assets/logo-detect-bright.png';
import logoDetectDark from '../assets/logo-detect-dark.png';

const Detect = () => {
  const logo = useColorModeValue(logoDetectBright, logoDetectDark);

  const primaryColor = '#4dcfaf';
  const primaryHoverLight = '#3ca790';
  const primaryHoverDark = '#77e4c4';
  const primaryActiveLight = '#2a8073';
  const primaryActiveDark = '#91edd0';

  const hoverColor = useColorModeValue(primaryHoverLight, primaryHoverDark);
  const activeColor = useColorModeValue(primaryActiveLight, primaryActiveDark);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb="4">
        {/* Left: Title */}
        <Heading>Detect Fake News</Heading>
        {/* Right: Logo */}
        <Flex direction="column" align="center">
          <img src={logo} alt="Detect Logo" style={{ height: '50px', width: 'auto' }} />
        </Flex>
      </Flex>
      <Text mb="4">Paste or upload a news article to analyze its authenticity:</Text>
      <Textarea placeholder="Paste your article here..." mb="4" />
      <Text mb="2">Confidence Threshold:</Text>
      <Slider defaultValue={50} min={0} max={100} step={5} mb="4">
        <SliderTrack>
          <SliderFilledTrack bg={primaryColor} />
        </SliderTrack>
        <SliderThumb boxSize={6} bg={primaryColor} />
      </Slider>
      <Button
        bg={primaryColor}
        color="white"
        _hover={{ bg: hoverColor }}
        _active={{ bg: activeColor }}
      >
        Analyze
      </Button>
    </Box>
  );
};

export default Detect;
