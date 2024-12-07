import React from 'react';
import { Box, Heading, Text, Button, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

const Verify = () => {
  return (
    <Box>
      <Heading mb="4">Verify Claims</Heading>
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
