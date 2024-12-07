import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const About = () => {
  return (
    <Box>
      <Heading mb="4">About FactGuard</Heading>
      <VStack spacing="4" align="flex-start">
        <Text>
          FactGuard is an advanced tool designed to detect fake news and verify claims in real time.
        </Text>
        <Text>
          It uses state-of-the-art AI models like BERT and RoBERTa for news detection and the Google FactCheck API for claim verification.
        </Text>
        <Text>
          When direct matches are unavailable, FactGuard leverages sophisticated semantic analysis through large language models (LLMs).
        </Text>
      </VStack>
    </Box>
  );
};

export default About;