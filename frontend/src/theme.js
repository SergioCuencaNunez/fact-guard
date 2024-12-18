import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.100', 'gray.900')(props),
        color: mode('black', 'white')(props),
        fontFamily: 'Muli, sans-serif',
      },
    }),
  },
  fonts: {
    heading: 'Muli, sans-serif',
    body: 'Muli, sans-serif',
  },
});

export default theme;
