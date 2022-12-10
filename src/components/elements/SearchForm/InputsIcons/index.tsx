import {
  Box,
} from '@chakra-ui/react';
import { PinIcon, PositionIcon } from 'components/icons';
import React from 'react';

interface Props {
  size: number,
  index: number
}

const InputsIcons: React.FC<Props> = function ({ size, index }) {
  return (
    <Box
      color="blue.brand"
      lineHeight="1em"
      w="23px"
      textAlign="center"
      h="50px"
      data-testid="input-icon"
    >
      <Box
        bg="white"
        borderTop="3px solid white"
        borderBottom="3px solid white"
        transform="translateY(10px)"
      >
        {
          index !== size - 1
            ? (
              <Box
                fontSize="16px"
                data-testid="position-icon"
              >
                <PositionIcon />
              </Box>
            )
            : (
              <Box fontSize="20px" data-testid="pin-icon">
                <PinIcon />
              </Box>
            )
        }

      </Box>
    </Box>
  );
};

export default InputsIcons;
