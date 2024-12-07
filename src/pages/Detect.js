import React from 'react';
import { Box, Heading, Text, Button, Textarea, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

const Detect = () => {
  return (
    <Box>
      <Heading mb="4">Detect Fake News</Heading>
      <Text mb="4">Paste or upload a news article to analyze its authenticity:</Text>
      <Textarea placeholder="Paste your article here..." mb="4" />
      <Text mb="2">Confidence Threshold:</Text>
      <Slider defaultValue={50} min={0} max={100} step={5} mb="4">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button colorScheme="teal">Analyze</Button>
    </Box>
  );
};

export default Detect;