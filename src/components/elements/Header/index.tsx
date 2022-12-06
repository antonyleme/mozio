import {
  Box, Image, Text,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import MozioLogo from 'assets/mozio.png';

interface Props {
  children: string | ReactElement
}
const Header: React.FC<Props> = function ({ children }) {
  return (
    <Box textAlign="center" data-testid="header">
      <Image mx="auto" src={MozioLogo} data-testid="logo-image" />
      <Text fontSize="14px" mb="24px" data-testid="welcome-message">
        {children}
      </Text>
    </Box>
  );
};

export default Header;
