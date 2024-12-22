import React from 'react';
import { Box, Flex, Heading, useColorModeValue, Text } from '@chakra-ui/react';
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
    <Box p="6" mx="auto">
      <Flex justify="space-between" align="center" mb="4">
        <Heading>Detect Fake News</Heading>
        <Flex direction="column" align="center">
          <img src={logo} alt="Detect Logo" style={{ height: '50px', width: 'auto' }} />
        </Flex>
      </Flex>
      <Text>
        FactGuard Detect: The fake news detection system, implemented using Deep Learning models such as BERT or RoBERTa and other types of architectures such as LSTMs.
      </Text>
    </Box>
  );
};

export default Detect;
