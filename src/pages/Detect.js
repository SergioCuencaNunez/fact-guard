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

const Detect = () => {
  const logo = useColorModeValue('/logo-detect-bright.png', '/logo-detect-dark.png'); // Page-specific logo

  return (
    <Box>
      <Flex align="center" mb="4">
        <img src={logo} alt="Detect Logo" style={{ height: '30px', width: 'auto', marginRight: '10px' }} />
        <Heading>Detect Fake News</Heading>
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
      <Button colorScheme="teal">Analyze</Button>
    </Box>
  );
};

export default Detect;
