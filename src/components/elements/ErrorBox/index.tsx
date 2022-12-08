import { Flex } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface Props {
  children: string | ReactElement
}

const ErrorBox: React.FC<Props> = function ({ children }) {
  return (
    <Flex
      h="100px"
      justifyContent="center"
      alignItems="center"
      border="1px solid"
      borderColor="orange.300"
      bg="orange.100"
      fontSize="14px"
      data-testid="error-box"
    >
      {children}
    </Flex>
  );
};

export default ErrorBox;
