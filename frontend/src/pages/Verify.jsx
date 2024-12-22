import React from 'react';
import { Box, Flex, Heading, useColorModeValue, Text } from '@chakra-ui/react';
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
    <Box p="6" mx="auto">
      <Flex justify="space-between" align="center" mb="4">
        <Heading>Verify Claims</Heading>
        <Flex direction="column" align="center">
          <img src={logo} alt="Verify Logo" style={{ height: '50px', width: 'auto' }} />
        </Flex>
      </Flex>
      <Text>
        FactGuard Verify: The claim verification tool that makes use of the Google FactCheck API. In case there are no direct results, LLMs will be used to carry out sophisticated semantic analysis.
      </Text>
    </Box>
  );
};

export default Verify;
