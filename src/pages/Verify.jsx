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

  return (
    <Box>
      <Flex justify="space-between" align="center" mb="4">
        {/* Left: Title */}
        <Heading>Verify Claims</Heading>
        {/* Right: Moon Icon and Logo */}
        <Flex direction="column" align="center">
          <img src={logo} alt="Verify Logo" style={{ height: '50px', width: 'auto' }} />
        </Flex>
      </Flex>
      <Text mb="4">Input a statement to verify its authenticity:</Text>
      <Input placeholder="Enter a claim..." mb="4" />
      <Text mb="2">Confidence Threshold:</Text>
      <Slider defaultValue={75} min={0} max={100} step={5} mb="4">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button colorScheme="blue">Verify</Button>
    </Box>
  );
};

export default Verify;
