import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
} from '@chakra-ui/react';

import logoVerifyBright from '../assets/logo-verify-bright.png';
import logoVerifyDark from '../assets/logo-verify-dark.png';

const Verify = () => {
  const logo = useColorModeValue(logoVerifyBright, logoVerifyDark);

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
        <Heading>Verify Claims</Heading>
        {/* Right: Logo */}
        <Flex direction="column" align="center">
          <img src={logo} alt="Verify Logo" style={{ height: '50px', width: 'auto' }} />
        </Flex>
      </Flex>
      <Text mb="4">Input a statement to verify its authenticity:</Text>
      <Input placeholder="Enter a claim..." mb="4" />
      <Text mb="2">Confidence Threshold:</Text>
      <Slider defaultValue={75} min={0} max={100} step={5} mb="4">
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
        Verify
      </Button>
    </Box>
  );
};

export default Verify;
