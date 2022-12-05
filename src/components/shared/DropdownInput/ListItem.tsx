import {
  Box, HStack, Text,
} from '@chakra-ui/react';
import { LocationIcon } from 'components/icons';
import React from 'react';

interface Props {
  value: string,
  onClick: (value: string) => void,
  children: string
}

const ListItem: React.FC<Props> = function ({ value, onClick, children }) {
  return (
    <HStack
      cursor="pointer"
      px="19px"
      py="6px"
      spacing="10px"
      _hover={{
        bg: 'gray.hoverBg',
      }}
      onClick={() => onClick(value)}
      data-testid="dropdown-input-list-item"
    >
      <Box color="blue.brand" fontSize="18px" transform="translateY(-1px)">
        <LocationIcon />
      </Box>
      <Text fontSize="14px" fontWeight="500">{children}</Text>
    </HStack>
  );
};

export default ListItem;
