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

const Verify = () => {
  const logo = useColorModeValue('/logo-verify-bright.png', '/logo-verify-dark.png'); // Page-specific logo

  return (
    <Box>
      <Flex align="center" mb="4">
        <img src={logo} alt="Verify Logo" style={{ height: '30px', width: 'auto', marginRight: '10px' }} />
        <Heading>Verify Claims</Heading>
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
